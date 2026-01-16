import { Request, Response, NextFunction } from "express";
import { query } from "../config/database";

/**
 * Permission structure
 */
interface Permissions {
  all?: boolean;
  cms?: { read?: boolean; write?: boolean };
  crm?: { read?: boolean; write?: boolean };
  email?: { read?: boolean; write?: boolean };
  users?: { read?: boolean; write?: boolean };
  settings?: { read?: boolean; write?: boolean };
}

/**
 * Check if user has required permission
 */
export function hasPermission(permissions: Permissions, resource: string, action: 'read' | 'write'): boolean {
  if (!permissions) return false;
  if (permissions.all) return true;
  
  const resourcePerms = (permissions as any)[resource];
  if (!resourcePerms) return false;
  
  return resourcePerms[action] === true;
}

/**
 * Get user permissions from database
 */
export async function getUserPermissions(userId: string): Promise<Permissions> {
  try {
    // Check if user is admin (legacy role column)
    const userResult = await query("SELECT role FROM users WHERE id = $1", [userId]);
    if (userResult.rows.length > 0 && userResult.rows[0].role === 'admin') {
      return { all: true };
    }

    // Get permissions from role assignments
    const rolesResult = await query(
      `SELECT r.permissions
       FROM user_role_assignments ura
       JOIN user_roles r ON ura.role_id = r.id
       WHERE ura.user_id = $1`,
      [userId]
    );

    // Merge all role permissions
    const mergedPermissions: Permissions = {};
    
    for (const row of rolesResult.rows) {
      const perms = row.permissions;
      if (perms.all) {
        return { all: true };
      }
      
      // Merge permissions
      for (const [resource, actions] of Object.entries(perms)) {
        if (!(mergedPermissions as any)[resource]) {
          (mergedPermissions as any)[resource] = {};
        }
        for (const [action, value] of Object.entries(actions as any)) {
          if (value === true) {
            (mergedPermissions as any)[resource][action] = true;
          }
        }
      }
    }

    return mergedPermissions;
  } catch (error) {
    console.error("Error getting user permissions:", error);
    return {};
  }
}

/**
 * Middleware to check resource permission
 */
export function requirePermission(resource: string, action: 'read' | 'write') {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).userId;
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
      (req as any).permissions = permissions;
      next();
    } catch (error) {
      console.error("Permission check error:", error);
      res.status(500).json({ success: false, message: "Permission check failed" });
    }
  };
}

/**
 * Middleware to require admin role
 */
export function requireAdmin() {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).userId;
      if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }

      const permissions = await getUserPermissions(userId);
      
      if (!permissions.all) {
        return res.status(403).json({ success: false, message: "Admin access required" });
      }

      (req as any).permissions = permissions;
      next();
    } catch (error) {
      console.error("Admin check error:", error);
      res.status(500).json({ success: false, message: "Admin check failed" });
    }
  };
}

/**
 * Middleware to require editor or admin role
 */
export function requireEditor() {
  return requirePermission('cms', 'write');
}

/**
 * Middleware to require sales or admin role
 */
export function requireSales() {
  return requirePermission('crm', 'write');
}

/**
 * Assign role to user
 */
export async function assignRole(userId: string, roleName: string, assignedBy: string): Promise<boolean> {
  try {
    const roleResult = await query("SELECT id FROM user_roles WHERE name = $1", [roleName]);
    if (roleResult.rows.length === 0) {
      return false;
    }

    await query(
      `INSERT INTO user_role_assignments (user_id, role_id, assigned_by)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, role_id) DO NOTHING`,
      [userId, roleResult.rows[0].id, assignedBy]
    );

    return true;
  } catch (error) {
    console.error("Error assigning role:", error);
    return false;
  }
}

/**
 * Remove role from user
 */
export async function removeRole(userId: string, roleName: string): Promise<boolean> {
  try {
    const roleResult = await query("SELECT id FROM user_roles WHERE name = $1", [roleName]);
    if (roleResult.rows.length === 0) {
      return false;
    }

    await query(
      "DELETE FROM user_role_assignments WHERE user_id = $1 AND role_id = $2",
      [userId, roleResult.rows[0].id]
    );

    return true;
  } catch (error) {
    console.error("Error removing role:", error);
    return false;
  }
}

/**
 * Get all roles for a user
 */
export async function getUserRoles(userId: string): Promise<string[]> {
  try {
    const result = await query(
      `SELECT r.name
       FROM user_role_assignments ura
       JOIN user_roles r ON ura.role_id = r.id
       WHERE ura.user_id = $1`,
      [userId]
    );

    return result.rows.map(row => row.name);
  } catch (error) {
    console.error("Error getting user roles:", error);
    return [];
  }
}
