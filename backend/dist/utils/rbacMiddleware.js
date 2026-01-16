"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasPermission = hasPermission;
exports.getUserPermissions = getUserPermissions;
exports.requirePermission = requirePermission;
exports.requireAdmin = requireAdmin;
exports.requireEditor = requireEditor;
exports.requireSales = requireSales;
exports.assignRole = assignRole;
exports.removeRole = removeRole;
exports.getUserRoles = getUserRoles;
const database_1 = require("../config/database");
/**
 * Check if user has required permission
 */
function hasPermission(permissions, resource, action) {
    if (!permissions)
        return false;
    if (permissions.all)
        return true;
    const resourcePerms = permissions[resource];
    if (!resourcePerms)
        return false;
    return resourcePerms[action] === true;
}
/**
 * Get user permissions from database
 */
async function getUserPermissions(userId) {
    try {
        // Check if user is admin (legacy role column)
        const userResult = await (0, database_1.query)("SELECT role FROM users WHERE id = $1", [userId]);
        if (userResult.rows.length > 0 && userResult.rows[0].role === 'admin') {
            return { all: true };
        }
        // Get permissions from role assignments
        const rolesResult = await (0, database_1.query)(`SELECT r.permissions
       FROM user_role_assignments ura
       JOIN user_roles r ON ura.role_id = r.id
       WHERE ura.user_id = $1`, [userId]);
        // Merge all role permissions
        const mergedPermissions = {};
        for (const row of rolesResult.rows) {
            const perms = row.permissions;
            if (perms.all) {
                return { all: true };
            }
            // Merge permissions
            for (const [resource, actions] of Object.entries(perms)) {
                if (!mergedPermissions[resource]) {
                    mergedPermissions[resource] = {};
                }
                for (const [action, value] of Object.entries(actions)) {
                    if (value === true) {
                        mergedPermissions[resource][action] = true;
                    }
                }
            }
        }
        return mergedPermissions;
    }
    catch (error) {
        console.error("Error getting user permissions:", error);
        return {};
    }
}
/**
 * Middleware to check resource permission
 */
function requirePermission(resource, action) {
    return async (req, res, next) => {
        try {
            const userId = req.userId;
            if (!userId) {
                return res.status(401).json({ success: false, message: "Unauthorized" });
            }
            const permissions = await getUserPermissions(userId);
            if (!hasPermission(permissions, resource, action)) {
                return res.status(403).json({
                    success: false,
                    message: `Access denied. Required permission: ${resource}:${action}`
                });
            }
            // Attach permissions to request for later use
            req.permissions = permissions;
            next();
        }
        catch (error) {
            console.error("Permission check error:", error);
            res.status(500).json({ success: false, message: "Permission check failed" });
        }
    };
}
/**
 * Middleware to require admin role
 */
function requireAdmin() {
    return async (req, res, next) => {
        try {
            const userId = req.userId;
            if (!userId) {
                return res.status(401).json({ success: false, message: "Unauthorized" });
            }
            const permissions = await getUserPermissions(userId);
            if (!permissions.all) {
                return res.status(403).json({ success: false, message: "Admin access required" });
            }
            req.permissions = permissions;
            next();
        }
        catch (error) {
            console.error("Admin check error:", error);
            res.status(500).json({ success: false, message: "Admin check failed" });
        }
    };
}
/**
 * Middleware to require editor or admin role
 */
function requireEditor() {
    return requirePermission('cms', 'write');
}
/**
 * Middleware to require sales or admin role
 */
function requireSales() {
    return requirePermission('crm', 'write');
}
/**
 * Assign role to user
 */
async function assignRole(userId, roleName, assignedBy) {
    try {
        const roleResult = await (0, database_1.query)("SELECT id FROM user_roles WHERE name = $1", [roleName]);
        if (roleResult.rows.length === 0) {
            return false;
        }
        await (0, database_1.query)(`INSERT INTO user_role_assignments (user_id, role_id, assigned_by)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, role_id) DO NOTHING`, [userId, roleResult.rows[0].id, assignedBy]);
        return true;
    }
    catch (error) {
        console.error("Error assigning role:", error);
        return false;
    }
}
/**
 * Remove role from user
 */
async function removeRole(userId, roleName) {
    try {
        const roleResult = await (0, database_1.query)("SELECT id FROM user_roles WHERE name = $1", [roleName]);
        if (roleResult.rows.length === 0) {
            return false;
        }
        await (0, database_1.query)("DELETE FROM user_role_assignments WHERE user_id = $1 AND role_id = $2", [userId, roleResult.rows[0].id]);
        return true;
    }
    catch (error) {
        console.error("Error removing role:", error);
        return false;
    }
}
/**
 * Get all roles for a user
 */
async function getUserRoles(userId) {
    try {
        const result = await (0, database_1.query)(`SELECT r.name
       FROM user_role_assignments ura
       JOIN user_roles r ON ura.role_id = r.id
       WHERE ura.user_id = $1`, [userId]);
        return result.rows.map(row => row.name);
    }
    catch (error) {
        console.error("Error getting user roles:", error);
        return [];
    }
}
