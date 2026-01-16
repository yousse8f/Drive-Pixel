"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProducts = exports.getProduct = exports.getPublicProduct = exports.getPublicProducts = void 0;
const database_1 = require("../config/database");
const apiResponse_1 = require("../utils/apiResponse");
const mapProductRow = (row) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    imageUrl: row.image_url,
    category: row.category,
    availability: row.availability,
    isActive: row.is_active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
});
const getPublicProducts = async (req, res) => {
    try {
        const { category, search } = req.query;
        const filters = ["is_active = true"];
        const params = [];
        if (category) {
            params.push(category);
            filters.push(`LOWER(category) = LOWER($${params.length})`);
        }
        if (search) {
            params.push(`%${search}%`);
            filters.push(`(LOWER(name) LIKE LOWER($${params.length}) OR LOWER(description) LIKE LOWER($${params.length}))`);
        }
        const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
        const result = await (0, database_1.query)(`SELECT * FROM products ${whereClause} ORDER BY created_at DESC`, params);
        return res.json((0, apiResponse_1.successResponse)("Products retrieved successfully", result.rows.map(mapProductRow)));
    }
    catch (error) {
        return res
            .status(500)
            .json((0, apiResponse_1.errorResponse)("Server error", error.message || "Error"));
    }
};
exports.getPublicProducts = getPublicProducts;
const getPublicProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, database_1.query)("SELECT * FROM products WHERE id = $1 AND is_active = true", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("Product not found"));
        }
        return res.json((0, apiResponse_1.successResponse)("Product retrieved successfully", mapProductRow(result.rows[0])));
    }
    catch (error) {
        return res
            .status(500)
            .json((0, apiResponse_1.errorResponse)("Server error", error.message || "Error"));
    }
};
exports.getPublicProduct = getPublicProduct;
const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, database_1.query)("SELECT * FROM products WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("Product not found"));
        }
        return res.json((0, apiResponse_1.successResponse)("Product retrieved successfully", mapProductRow(result.rows[0])));
    }
    catch (error) {
        return res
            .status(500)
            .json((0, apiResponse_1.errorResponse)("Server error", error.message || "Error"));
    }
};
exports.getProduct = getProduct;
const getProducts = async (req, res) => {
    try {
        const { includeInactive } = req.query;
        const whereClause = includeInactive === "true" ? "" : "WHERE is_active = true";
        const result = await (0, database_1.query)(`SELECT * FROM products ${whereClause} ORDER BY created_at DESC`);
        return res.json((0, apiResponse_1.successResponse)("Products retrieved successfully", result.rows.map(mapProductRow)));
    }
    catch (error) {
        return res
            .status(500)
            .json((0, apiResponse_1.errorResponse)("Server error", error.message || "Error"));
    }
};
exports.getProducts = getProducts;
const createProduct = async (req, res) => {
    try {
        const { name, description, price, imageUrl, category, availability, isActive } = req.body;
        if (!name || price === undefined) {
            return res.status(400).json((0, apiResponse_1.errorResponse)("Name and price are required"));
        }
        const result = await (0, database_1.query)(`INSERT INTO products (name, description, price, image_url, category, availability, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`, [
            name,
            description || "",
            Number(price),
            imageUrl || null,
            category || null,
            availability !== undefined ? Number(availability) : 0,
            isActive !== false,
        ]);
        return res
            .status(201)
            .json((0, apiResponse_1.successResponse)("Product created successfully", mapProductRow(result.rows[0])));
    }
    catch (error) {
        return res
            .status(500)
            .json((0, apiResponse_1.errorResponse)("Server error", error.message || "Error"));
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, imageUrl, category, availability, isActive } = req.body;
        const updateFields = [];
        const updateValues = [];
        let paramIndex = 1;
        if (name !== undefined) {
            updateFields.push(`name = $${paramIndex++}`);
            updateValues.push(name);
        }
        if (description !== undefined) {
            updateFields.push(`description = $${paramIndex++}`);
            updateValues.push(description);
        }
        if (price !== undefined) {
            updateFields.push(`price = $${paramIndex++}`);
            updateValues.push(Number(price));
        }
        if (imageUrl !== undefined) {
            updateFields.push(`image_url = $${paramIndex++}`);
            updateValues.push(imageUrl);
        }
        if (category !== undefined) {
            updateFields.push(`category = $${paramIndex++}`);
            updateValues.push(category);
        }
        if (availability !== undefined) {
            updateFields.push(`availability = $${paramIndex++}`);
            updateValues.push(Number(availability));
        }
        if (isActive !== undefined) {
            updateFields.push(`is_active = $${paramIndex++}`);
            updateValues.push(Boolean(isActive));
        }
        if (updateFields.length === 0) {
            return res.status(400).json((0, apiResponse_1.errorResponse)("No fields to update"));
        }
        updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
        updateValues.push(id);
        const result = await (0, database_1.query)(`UPDATE products SET ${updateFields.join(", ")} WHERE id = $${paramIndex} RETURNING *`, updateValues);
        if (result.rows.length === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("Product not found"));
        }
        return res.json((0, apiResponse_1.successResponse)("Product updated successfully", mapProductRow(result.rows[0])));
    }
    catch (error) {
        return res
            .status(500)
            .json((0, apiResponse_1.errorResponse)("Server error", error.message || "Error"));
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, database_1.query)("DELETE FROM products WHERE id = $1", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("Product not found"));
        }
        return res.json((0, apiResponse_1.successResponse)("Product deleted successfully"));
    }
    catch (error) {
        return res
            .status(500)
            .json((0, apiResponse_1.errorResponse)("Server error", error.message || "Error"));
    }
};
exports.deleteProduct = deleteProduct;
