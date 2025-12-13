"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProperty = exports.updateProperty = exports.getProperty = exports.getProperties = exports.createProperty = void 0;
const validation_1 = require("../utils/validation");
const apiResponse_1 = require("../utils/apiResponse");
const database_1 = require("../config/database");
const createProperty = async (req, res) => {
    try {
        const validatedData = validation_1.propertySchema.parse(req.body);
        const userId = req.userId;
        const result = await (0, database_1.query)("INSERT INTO properties (user_id, title, description, price, location, bedrooms, bathrooms) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, user_id, title, description, price, location, bedrooms, bathrooms, created_at, updated_at", [userId, validatedData.title, validatedData.description || null, validatedData.price, validatedData.location, validatedData.bedrooms || null, validatedData.bathrooms || null]);
        const newProperty = result.rows[0];
        return res
            .status(201)
            .json((0, apiResponse_1.successResponse)("Property created successfully", newProperty));
    }
    catch (error) {
        return res
            .status(400)
            .json((0, apiResponse_1.errorResponse)("Validation error", error.message));
    }
};
exports.createProperty = createProperty;
const getProperties = async (req, res) => {
    try {
        const userId = req.userId;
        const result = await (0, database_1.query)("SELECT id, user_id, title, description, price, location, bedrooms, bathrooms, created_at, updated_at FROM properties WHERE user_id = $1 ORDER BY created_at DESC", [userId]);
        return res.json((0, apiResponse_1.successResponse)("Properties retrieved successfully", result.rows));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.getProperties = getProperties;
const getProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, database_1.query)("SELECT id, user_id, title, description, price, location, bedrooms, bathrooms, created_at, updated_at FROM properties WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("Property not found"));
        }
        return res.json((0, apiResponse_1.successResponse)("Property retrieved successfully", result.rows[0]));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.getProperty = getProperty;
const updateProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price, location, bedrooms, bathrooms } = req.body;
        const updateFields = [];
        const updateValues = [];
        let paramIndex = 1;
        if (title) {
            updateFields.push(`title = $${paramIndex}`);
            updateValues.push(title);
            paramIndex++;
        }
        if (description !== undefined) {
            updateFields.push(`description = $${paramIndex}`);
            updateValues.push(description);
            paramIndex++;
        }
        if (price) {
            updateFields.push(`price = $${paramIndex}`);
            updateValues.push(price);
            paramIndex++;
        }
        if (location) {
            updateFields.push(`location = $${paramIndex}`);
            updateValues.push(location);
            paramIndex++;
        }
        if (bedrooms !== undefined) {
            updateFields.push(`bedrooms = $${paramIndex}`);
            updateValues.push(bedrooms);
            paramIndex++;
        }
        if (bathrooms !== undefined) {
            updateFields.push(`bathrooms = $${paramIndex}`);
            updateValues.push(bathrooms);
            paramIndex++;
        }
        if (updateFields.length === 0) {
            return res.status(400).json((0, apiResponse_1.errorResponse)("No fields to update"));
        }
        updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
        updateValues.push(id);
        const result = await (0, database_1.query)(`UPDATE properties SET ${updateFields.join(", ")} WHERE id = $${paramIndex} RETURNING id, user_id, title, description, price, location, bedrooms, bathrooms, created_at, updated_at`, updateValues);
        if (result.rows.length === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("Property not found"));
        }
        return res.json((0, apiResponse_1.successResponse)("Property updated successfully", result.rows[0]));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.updateProperty = updateProperty;
const deleteProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, database_1.query)("DELETE FROM properties WHERE id = $1", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("Property not found"));
        }
        return res.json((0, apiResponse_1.successResponse)("Property deleted successfully"));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.deleteProperty = deleteProperty;
