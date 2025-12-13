"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = void 0;
const apiResponse_1 = require("../utils/apiResponse");
const database_1 = require("../config/database");
const getUsers = async (req, res) => {
    try {
        const { page = '1', limit = '50' } = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const offset = (pageNum - 1) * limitNum;
        const countResult = await (0, database_1.query)("SELECT COUNT(*) as total FROM users", []);
        const total = parseInt(countResult.rows[0].total);
        const result = await (0, database_1.query)("SELECT id, email, first_name, last_name, role, created_at FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2", [limitNum, offset]);
        return res.json((0, apiResponse_1.successResponse)("Users retrieved successfully", {
            users: result.rows.map(user => ({
                id: user.id,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
                role: user.role || 'user',
                createdAt: user.created_at,
            })),
            pagination: {
                page: pageNum,
                limit: limitNum,
                total,
                totalPages: Math.ceil(total / limitNum),
            },
        }));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.getUsers = getUsers;
const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, database_1.query)("SELECT id, email, first_name, last_name, role, created_at FROM users WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("User not found"));
        }
        const user = result.rows[0];
        return res.json((0, apiResponse_1.successResponse)("User retrieved successfully", {
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            role: user.role || 'user',
            createdAt: user.created_at,
        }));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.getUser = getUser;
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, role } = req.body;
        const userRole = req.userRole;
        const updateFields = [];
        const updateValues = [];
        let paramIndex = 1;
        if (firstName) {
            updateFields.push(`first_name = $${paramIndex}`);
            updateValues.push(firstName);
            paramIndex++;
        }
        if (lastName) {
            updateFields.push(`last_name = $${paramIndex}`);
            updateValues.push(lastName);
            paramIndex++;
        }
        // Only admins can update roles
        if (role && userRole === 'admin') {
            updateFields.push(`role = $${paramIndex}`);
            updateValues.push(role);
            paramIndex++;
        }
        if (updateFields.length === 0) {
            return res.status(400).json((0, apiResponse_1.errorResponse)("No fields to update"));
        }
        updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
        updateValues.push(id);
        const result = await (0, database_1.query)(`UPDATE users SET ${updateFields.join(", ")} WHERE id = $${paramIndex} RETURNING id, email, first_name, last_name, role`, updateValues);
        if (result.rows.length === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("User not found"));
        }
        const user = result.rows[0];
        return res.json((0, apiResponse_1.successResponse)("User updated successfully", {
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            role: user.role || 'user',
        }));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, database_1.query)("DELETE FROM users WHERE id = $1", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("User not found"));
        }
        return res.json((0, apiResponse_1.successResponse)("User deleted successfully"));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.deleteUser = deleteUser;
