"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLog = exports.getLog = exports.getLogs = exports.createLog = void 0;
const apiResponse_1 = require("../utils/apiResponse");
const database_1 = require("../config/database");
const createLog = async (req, res) => {
    try {
        const data = req.body;
        const userId = req.userId || data.userId;
        const result = await (0, database_1.query)(`INSERT INTO logs (user_id, action, resource, resource_id, details, ip_address, user_agent) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING id, user_id, action, resource, resource_id, details, ip_address, user_agent, created_at`, [
            userId || null,
            data.action,
            data.resource,
            data.resourceId || null,
            data.details || null,
            data.ipAddress || req.ip || null,
            data.userAgent || req.get('user-agent') || null,
        ]);
        return res.status(201).json((0, apiResponse_1.successResponse)("Log created successfully", result.rows[0]));
    }
    catch (error) {
        return res.status(400).json((0, apiResponse_1.errorResponse)("Error creating log", error.message));
    }
};
exports.createLog = createLog;
const getLogs = async (req, res) => {
    try {
        const { page = '1', limit = '50', resource, action, userId, startDate, endDate } = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const offset = (pageNum - 1) * limitNum;
        let whereConditions = [];
        const queryParams = [];
        let paramIndex = 1;
        if (resource) {
            whereConditions.push(`resource = $${paramIndex++}`);
            queryParams.push(resource);
        }
        if (action) {
            whereConditions.push(`action = $${paramIndex++}`);
            queryParams.push(action);
        }
        if (userId) {
            whereConditions.push(`user_id = $${paramIndex++}`);
            queryParams.push(userId);
        }
        if (startDate) {
            whereConditions.push(`created_at >= $${paramIndex++}`);
            queryParams.push(startDate);
        }
        if (endDate) {
            whereConditions.push(`created_at <= $${paramIndex++}`);
            queryParams.push(endDate);
        }
        const whereClause = whereConditions.length > 0
            ? `WHERE ${whereConditions.join(' AND ')}`
            : '';
        // Get total count
        const countResult = await (0, database_1.query)(`SELECT COUNT(*) as total FROM logs ${whereClause}`, queryParams);
        const total = parseInt(countResult.rows[0].total);
        // Get logs
        const result = await (0, database_1.query)(`SELECT l.*, u.email as user_email, u.first_name, u.last_name 
       FROM logs l 
       LEFT JOIN users u ON l.user_id = u.id 
       ${whereClause}
       ORDER BY l.created_at DESC 
       LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`, [...queryParams, limitNum, offset]);
        return res.json((0, apiResponse_1.successResponse)("Logs retrieved successfully", {
            logs: result.rows,
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
exports.getLogs = getLogs;
const getLog = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, database_1.query)(`SELECT l.*, u.email as user_email, u.first_name, u.last_name 
       FROM logs l 
       LEFT JOIN users u ON l.user_id = u.id 
       WHERE l.id = $1`, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("Log not found"));
        }
        return res.json((0, apiResponse_1.successResponse)("Log retrieved successfully", result.rows[0]));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.getLog = getLog;
const deleteLog = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, database_1.query)("DELETE FROM logs WHERE id = $1", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("Log not found"));
        }
        return res.json((0, apiResponse_1.successResponse)("Log deleted successfully"));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.deleteLog = deleteLog;
