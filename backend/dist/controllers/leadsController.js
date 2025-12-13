"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLead = exports.updateLead = exports.getLead = exports.getLeads = exports.createLead = void 0;
const validation_1 = require("../utils/validation");
const apiResponse_1 = require("../utils/apiResponse");
const database_1 = require("../config/database");
const createLead = async (req, res) => {
    try {
        const validatedData = validation_1.leadSchema.parse(req.body);
        const userId = req.userId;
        const result = await (0, database_1.query)("INSERT INTO leads (user_id, name, email, phone, status) VALUES ($1, $2, $3, $4, $5) RETURNING id, user_id, name, email, phone, status, created_at, updated_at", [userId, validatedData.name, validatedData.email, validatedData.phone || null, validatedData.status || "new"]);
        const newLead = result.rows[0];
        return res.status(201).json((0, apiResponse_1.successResponse)("Lead created successfully", newLead));
    }
    catch (error) {
        return res
            .status(400)
            .json((0, apiResponse_1.errorResponse)("Validation error", error.message));
    }
};
exports.createLead = createLead;
const getLeads = async (req, res) => {
    try {
        const userId = req.userId;
        const result = await (0, database_1.query)("SELECT id, user_id, name, email, phone, status, created_at, updated_at FROM leads WHERE user_id = $1 ORDER BY created_at DESC", [userId]);
        return res.json((0, apiResponse_1.successResponse)("Leads retrieved successfully", result.rows));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.getLeads = getLeads;
const getLead = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, database_1.query)("SELECT id, user_id, name, email, phone, status, created_at, updated_at FROM leads WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("Lead not found"));
        }
        return res.json((0, apiResponse_1.successResponse)("Lead retrieved successfully", result.rows[0]));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.getLead = getLead;
const updateLead = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, status } = req.body;
        const updateFields = [];
        const updateValues = [];
        let paramIndex = 1;
        if (name) {
            updateFields.push(`name = $${paramIndex}`);
            updateValues.push(name);
            paramIndex++;
        }
        if (email) {
            updateFields.push(`email = $${paramIndex}`);
            updateValues.push(email);
            paramIndex++;
        }
        if (phone) {
            updateFields.push(`phone = $${paramIndex}`);
            updateValues.push(phone);
            paramIndex++;
        }
        if (status) {
            updateFields.push(`status = $${paramIndex}`);
            updateValues.push(status);
            paramIndex++;
        }
        if (updateFields.length === 0) {
            return res.status(400).json((0, apiResponse_1.errorResponse)("No fields to update"));
        }
        updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
        updateValues.push(id);
        const result = await (0, database_1.query)(`UPDATE leads SET ${updateFields.join(", ")} WHERE id = $${paramIndex} RETURNING id, user_id, name, email, phone, status, created_at, updated_at`, updateValues);
        if (result.rows.length === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("Lead not found"));
        }
        return res.json((0, apiResponse_1.successResponse)("Lead updated successfully", result.rows[0]));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.updateLead = updateLead;
const deleteLead = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, database_1.query)("DELETE FROM leads WHERE id = $1", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("Lead not found"));
        }
        return res.json((0, apiResponse_1.successResponse)("Lead deleted successfully"));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.deleteLead = deleteLead;
