"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutCart = exports.removeCartItem = exports.updateCartItem = exports.addToCart = exports.getCart = void 0;
const crypto_1 = require("crypto");
const database_1 = require("../config/database");
const apiResponse_1 = require("../utils/apiResponse");
const SESSION_HEADER = "x-session-id";
const mapCartItem = (row) => ({
    id: row.id,
    productId: row.product_id,
    quantity: row.quantity,
    priceEach: Number(row.price_each),
    name: row.name,
    description: row.description,
    imageUrl: row.image_url,
});
const getSessionId = (req) => {
    return (req.headers[SESSION_HEADER] ||
        (req.body && req.body.sessionId) ||
        (req.query && req.query.sessionId) ||
        "");
};
const getOrCreateCart = async (sessionId) => {
    let currentSessionId = sessionId || (0, crypto_1.randomUUID)();
    // Find existing cart
    const existing = await (0, database_1.query)("SELECT id FROM carts WHERE session_id = $1 AND status = 'active' LIMIT 1", [
        currentSessionId,
    ]);
    if (existing.rows.length > 0) {
        return { cartId: existing.rows[0].id, sessionId: currentSessionId };
    }
    const created = await (0, database_1.query)("INSERT INTO carts (session_id, status) VALUES ($1, 'active') RETURNING id, session_id", [currentSessionId]);
    return { cartId: created.rows[0].id, sessionId: created.rows[0].session_id };
};
const getCart = async (req, res) => {
    try {
        const sessionId = getSessionId(req);
        const { cartId, sessionId: persistedSession } = await getOrCreateCart(sessionId);
        const itemsResult = await (0, database_1.query)(`SELECT ci.*, p.name, p.description, p.image_url 
       FROM cart_items ci 
       LEFT JOIN products p ON p.id = ci.product_id 
       WHERE ci.cart_id = $1`, [cartId]);
        const items = itemsResult.rows.map(mapCartItem);
        const total = items.reduce((sum, item) => sum + item.priceEach * item.quantity, 0);
        return res.json((0, apiResponse_1.successResponse)("Cart retrieved successfully", {
            sessionId: persistedSession,
            items,
            total,
        }));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message || "Error"));
    }
};
exports.getCart = getCart;
const addToCart = async (req, res) => {
    try {
        const sessionId = getSessionId(req);
        const { productId, quantity = 1 } = req.body;
        if (!productId) {
            return res.status(400).json((0, apiResponse_1.errorResponse)("productId is required"));
        }
        const { cartId, sessionId: persistedSession } = await getOrCreateCart(sessionId);
        const productResult = await (0, database_1.query)("SELECT id, price, is_active FROM products WHERE id = $1", [productId]);
        if (productResult.rows.length === 0 || productResult.rows[0].is_active === false) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("Product not available"));
        }
        const price = Number(productResult.rows[0].price);
        // See if item exists in cart
        const existing = await (0, database_1.query)("SELECT id, quantity FROM cart_items WHERE cart_id = $1 AND product_id = $2 LIMIT 1", [cartId, productId]);
        if (existing.rows.length > 0) {
            const newQty = existing.rows[0].quantity + Number(quantity);
            await (0, database_1.query)("UPDATE cart_items SET quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2", [
                newQty,
                existing.rows[0].id,
            ]);
        }
        else {
            await (0, database_1.query)("INSERT INTO cart_items (cart_id, product_id, quantity, price_each) VALUES ($1, $2, $3, $4)", [cartId, productId, Number(quantity), price]);
        }
        return (0, exports.getCart)(req, res);
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message || "Error"));
    }
};
exports.addToCart = addToCart;
const updateCartItem = async (req, res) => {
    try {
        const sessionId = getSessionId(req);
        const { itemId } = req.params;
        const { quantity } = req.body;
        if (quantity === undefined || quantity < 1) {
            return res.status(400).json((0, apiResponse_1.errorResponse)("Quantity must be at least 1"));
        }
        const { cartId } = await getOrCreateCart(sessionId);
        const result = await (0, database_1.query)("UPDATE cart_items SET quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 AND cart_id = $3 RETURNING id", [Number(quantity), itemId, cartId]);
        if (result.rowCount === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("Cart item not found"));
        }
        return (0, exports.getCart)(req, res);
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message || "Error"));
    }
};
exports.updateCartItem = updateCartItem;
const removeCartItem = async (req, res) => {
    try {
        const sessionId = getSessionId(req);
        const { itemId } = req.params;
        const { cartId } = await getOrCreateCart(sessionId);
        const result = await (0, database_1.query)("DELETE FROM cart_items WHERE id = $1 AND cart_id = $2", [itemId, cartId]);
        if (result.rowCount === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("Cart item not found"));
        }
        return (0, exports.getCart)(req, res);
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message || "Error"));
    }
};
exports.removeCartItem = removeCartItem;
const checkoutCart = async (req, res) => {
    try {
        const sessionId = getSessionId(req);
        const { customerName, customerEmail, customerPhone, customerAddress, paymentProvider } = req.body;
        if (!customerName || !customerEmail || !customerAddress) {
            return res.status(400).json((0, apiResponse_1.errorResponse)("Missing customer details"));
        }
        const { cartId, sessionId: persistedSession } = await getOrCreateCart(sessionId);
        const itemsResult = await (0, database_1.query)(`SELECT ci.*, p.name, p.description, p.image_url 
       FROM cart_items ci 
       LEFT JOIN products p ON p.id = ci.product_id 
       WHERE ci.cart_id = $1`, [cartId]);
        const items = itemsResult.rows.map(mapCartItem);
        const total = items.reduce((sum, item) => sum + item.priceEach * item.quantity, 0);
        if (items.length === 0) {
            return res.status(400).json((0, apiResponse_1.errorResponse)("Cart is empty"));
        }
        const orderResult = await (0, database_1.query)(`INSERT INTO orders 
        (cart_id, customer_name, customer_email, customer_phone, customer_address, total, payment_provider, payment_status, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending', 'pending')
       RETURNING id`, [cartId, customerName, customerEmail, customerPhone || null, customerAddress, total, paymentProvider || "manual"]);
        const orderId = orderResult.rows[0].id;
        const insertOrderItems = items.map((item) => (0, database_1.query)("INSERT INTO order_items (order_id, product_id, quantity, price_each) VALUES ($1, $2, $3, $4)", [orderId, item.productId, item.quantity, item.priceEach]));
        await Promise.all(insertOrderItems);
        await (0, database_1.query)("UPDATE carts SET status = 'ordered', updated_at = CURRENT_TIMESTAMP WHERE id = $1", [cartId]);
        return res.status(201).json((0, apiResponse_1.successResponse)("Order created and payment pending", {
            orderId,
            sessionId: persistedSession,
            total,
            paymentStatus: "pending",
        }));
    }
    catch (error) {
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message || "Error"));
    }
};
exports.checkoutCart = checkoutCart;
