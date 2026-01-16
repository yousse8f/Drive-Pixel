"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMyPassword = exports.getMyBilling = exports.getMyOrders = exports.getMe = void 0;
const database_1 = require("../config/database");
const apiResponse_1 = require("../utils/apiResponse");
const authUtils_1 = require("../utils/authUtils");
const getMe = async (req, res) => {
    try {
        const userId = req.userId;
        const result = await (0, database_1.query)("SELECT id, email, first_name, last_name, role FROM users WHERE id = $1", [userId]);
        if (result.rows.length === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("User not found"));
        }
        const user = result.rows[0];
        return res.json((0, apiResponse_1.successResponse)("Profile retrieved", {
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            role: user.role || "user",
        }));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.getMe = getMe;
const getMyOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await (0, database_1.query)(`SELECT id, total, payment_status, status, subscription_type, created_at
       FROM orders
       WHERE user_id = $1
       ORDER BY created_at DESC`, [userId]);
        const orderIds = orders.rows.map((o) => o.id);
        let itemsByOrder = {};
        if (orderIds.length > 0) {
            const items = await (0, database_1.query)(`SELECT oi.order_id, oi.quantity, oi.price_each, COALESCE(p.name, 'Service') AS name
         FROM order_items oi
         LEFT JOIN products p ON p.id = oi.product_id
         WHERE oi.order_id = ANY($1)`, [orderIds]);
            itemsByOrder = items.rows.reduce((acc, row) => {
                acc[row.order_id] = acc[row.order_id] || [];
                acc[row.order_id].push({
                    name: row.name,
                    quantity: row.quantity,
                    priceEach: Number(row.price_each),
                });
                return acc;
            }, {});
        }
        const mapped = orders.rows.map((o) => ({
            id: o.id,
            total: Number(o.total),
            paymentStatus: o.payment_status,
            status: o.status,
            subscriptionType: o.subscription_type,
            createdAt: o.created_at,
            items: itemsByOrder[o.id] || [],
        }));
        return res.json((0, apiResponse_1.successResponse)("Orders retrieved", mapped));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.getMyOrders = getMyOrders;
const getMyBilling = async (req, res) => {
    try {
        const userId = req.userId;
        const payments = await (0, database_1.query)(`SELECT id, total, payment_status, payment_provider, payment_reference, created_at
       FROM orders
       WHERE user_id = $1
       ORDER BY created_at DESC`, [userId]);
        const mapped = payments.rows.map((p) => ({
            id: p.id,
            amount: Number(p.total),
            status: p.payment_status,
            provider: p.payment_provider,
            reference: p.payment_reference,
            createdAt: p.created_at,
        }));
        return res.json((0, apiResponse_1.successResponse)("Billing retrieved", mapped));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.getMyBilling = getMyBilling;
const updateMyPassword = async (req, res) => {
    try {
        const userId = req.userId;
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).json((0, apiResponse_1.errorResponse)("currentPassword and newPassword are required"));
        }
        const userResult = await (0, database_1.query)("SELECT password FROM users WHERE id = $1", [userId]);
        if (userResult.rows.length === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("User not found"));
        }
        const user = userResult.rows[0];
        const valid = await (0, authUtils_1.comparePassword)(currentPassword, user.password);
        if (!valid) {
            return res.status(401).json((0, apiResponse_1.errorResponse)("Invalid current password"));
        }
        const hashed = await (0, authUtils_1.hashPassword)(newPassword);
        await (0, database_1.query)("UPDATE users SET password = $1, password_set = TRUE, updated_at = CURRENT_TIMESTAMP WHERE id = $2", [hashed, userId]);
        return res.json((0, apiResponse_1.successResponse)("Password updated successfully"));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.updateMyPassword = updateMyPassword;
