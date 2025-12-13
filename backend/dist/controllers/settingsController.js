"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSetting = exports.updateSetting = exports.createSetting = exports.getSettings = void 0;
const apiResponse_1 = require("../utils/apiResponse");
const database_1 = require("../config/database");
const getSettings = async (req, res) => {
    try {
        const { key } = req.query;
        if (key) {
            const result = await (0, database_1.query)("SELECT id, key, value, type, description, updated_at FROM settings WHERE key = $1", [key]);
            if (result.rows.length === 0) {
                return res.status(404).json((0, apiResponse_1.errorResponse)("Setting not found"));
            }
            return res.json((0, apiResponse_1.successResponse)("Setting retrieved successfully", result.rows[0]));
        }
        const result = await (0, database_1.query)("SELECT id, key, value, type, description, updated_at FROM settings ORDER BY key ASC", []);
        return res.json((0, apiResponse_1.successResponse)("Settings retrieved successfully", result.rows));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.getSettings = getSettings;
const createSetting = async (req, res) => {
    try {
        const data = req.body;
        const result = await (0, database_1.query)(`INSERT INTO settings (key, value, type, description) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, key, value, type, description, updated_at`, [data.key, data.value, data.type || 'string', data.description || null]);
        return res.status(201).json((0, apiResponse_1.successResponse)("Setting created successfully", result.rows[0]));
    }
    catch (error) {
        if (error.code === '23505') { // Unique violation
            return res.status(400).json((0, apiResponse_1.errorResponse)("Setting with this key already exists"));
        }
        return res.status(400).json((0, apiResponse_1.errorResponse)("Error creating setting", error.message));
    }
};
exports.createSetting = createSetting;
const updateSetting = async (req, res) => {
    try {
        const { key } = req.params;
        const { value, type, description } = req.body;
        const updateFields = [];
        const updateValues = [];
        let paramIndex = 1;
        if (value !== undefined) {
            updateFields.push(`value = $${paramIndex++}`);
            updateValues.push(value);
        }
        if (type !== undefined) {
            updateFields.push(`type = $${paramIndex++}`);
            updateValues.push(type);
        }
        if (description !== undefined) {
            updateFields.push(`description = $${paramIndex++}`);
            updateValues.push(description);
        }
        if (updateFields.length === 0) {
            return res.status(400).json((0, apiResponse_1.errorResponse)("No fields to update"));
        }
        updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
        updateValues.push(key);
        const result = await (0, database_1.query)(`UPDATE settings SET ${updateFields.join(", ")} WHERE key = $${paramIndex} 
       RETURNING id, key, value, type, description, updated_at`, updateValues);
        if (result.rows.length === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("Setting not found"));
        }
        return res.json((0, apiResponse_1.successResponse)("Setting updated successfully", result.rows[0]));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.updateSetting = updateSetting;
const deleteSetting = async (req, res) => {
    try {
        const { key } = req.params;
        const result = await (0, database_1.query)("DELETE FROM settings WHERE key = $1", [key]);
        if (result.rowCount === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("Setting not found"));
        }
        return res.json((0, apiResponse_1.successResponse)("Setting deleted successfully"));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.deleteSetting = deleteSetting;
