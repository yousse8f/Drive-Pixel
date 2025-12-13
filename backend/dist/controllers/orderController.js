"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.getOrder = exports.getOrders = void 0;
const database_1 = require("../config/database");
const apiResponse_1 = require("../utils/apiResponse");
const getOrders = async (req, res) => {
    try {
        const result = await (0, database_1.query)(`SELECT id, cart_id, customer_name, customer_email, customer_phone, customer_address, total, payment_provider, payment_status, status, created_at, updated_at 
       FROM orders 
       ORDER BY created_at DESC`);
        return res.json((0, apiResponse_1.successResponse)("Orders retrieved successfully", result.rows));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message || "Error"));
    }
};
exports.getOrders = getOrders;
const getOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const orderResult = await (0, database_1.query)(`SELECT id, cart_id, customer_name, customer_email, customer_phone, customer_address, total, payment_provider, payment_status, status, created_at, updated_at 
       FROM orders WHERE id = $1`, [id]);
        if (orderResult.rows.length === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("Order not found"));
        }
        const itemsResult = await (0, database_1.query)(`SELECT oi.id, oi.product_id, oi.quantity, oi.price_each, p.name, p.image_url 
       FROM order_items oi 
       LEFT JOIN products p ON p.id = oi.product_id 
       WHERE oi.order_id = $1`, [id]);
        return res.json((0, apiResponse_1.successResponse)("Order retrieved successfully", {
            order: orderResult.rows[0],
            items: itemsResult.rows,
        }));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message || "Error"));
    }
};
exports.getOrder = getOrder;
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, paymentStatus } = req.body;
        const fields = [];
        const values = [];
        let idx = 1;
        if (status !== undefined) {
            fields.push(`status = $${idx++}`);
            values.push(status);
        }
        if (paymentStatus !== undefined) {
            fields.push(`payment_status = $${idx++}`);
            values.push(paymentStatus);
        }
        if (fields.length === 0) {
            return res.status(400).json((0, apiResponse_1.errorResponse)("No fields to update"));
        }
        fields.push(`updated_at = CURRENT_TIMESTAMP`);
        values.push(id);
        const result = await (0, database_1.query)(`UPDATE orders SET ${fields.join(", ")} WHERE id = $${idx} RETURNING id, status, payment_status, updated_at`, values);
        if (result.rows.length === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("Order not found"));
        }
        return res.json((0, apiResponse_1.successResponse)("Order updated successfully", result.rows[0]));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message || "Error"));
    }
};
exports.updateOrderStatus = updateOrderStatus;
