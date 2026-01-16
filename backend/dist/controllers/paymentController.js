"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentWebhook = void 0;
const database_1 = require("../config/database");
const apiResponse_1 = require("../utils/apiResponse");
const authUtils_1 = require("../utils/authUtils");
const orderEmail_1 = require("../utils/orderEmail");
const DASHBOARD_BASE_URL = process.env.CLIENT_DASHBOARD_URL ||
    process.env.PUBLIC_DASHBOARD_URL ||
    process.env.FRONTEND_URL ||
    "https://www.drivepixel.com";
const WEBHOOK_SHARED_SECRET = process.env.PAYMENT_WEBHOOK_SECRET;
const getOrderIdFromPayload = (body) => {
    return (body?.orderId ||
        body?.data?.orderId ||
        body?.metadata?.orderId ||
        body?.data?.metadata?.orderId ||
        body?.data?.object?.metadata?.orderId ||
        body?.object?.metadata?.orderId);
};
const getSubscriptionTypeFromPayload = (body) => {
    return (body?.subscriptionType ||
        body?.data?.subscriptionType ||
        body?.data?.object?.subscriptionType ||
        body?.data?.object?.metadata?.subscriptionType);
};
const buildDashboardLink = (token) => `${DASHBOARD_BASE_URL}/first-login?token=${token}`;
const paymentWebhook = async (req, res) => {
    try {
        // Optional shared-secret verification (non-breaking if env not set)
        if (WEBHOOK_SHARED_SECRET) {
            const provided = req.headers["x-webhook-secret"];
            if (!provided || provided !== WEBHOOK_SHARED_SECRET) {
                return res.status(401).json((0, apiResponse_1.errorResponse)("Invalid webhook signature"));
            }
        }
        const body = req.body || {};
        const provider = (body.provider || req.query.provider || "unknown").toString();
        const eventId = body.eventId || body.id;
        const paymentReference = body.payment_reference ||
            body.paymentIntentId ||
            body.payment_intent ||
            body.data?.object?.id ||
            body.data?.object?.payment_intent;
        const subscriptionType = getSubscriptionTypeFromPayload(body) || "one_time";
        if (!eventId) {
            return res.status(400).json((0, apiResponse_1.errorResponse)("Missing eventId"));
        }
        const orderId = getOrderIdFromPayload(body);
        if (!orderId) {
            return res.status(400).json((0, apiResponse_1.errorResponse)("Missing orderId in payload metadata"));
        }
        const orderResult = await (0, database_1.query)("SELECT * FROM orders WHERE id = $1", [orderId]);
        if (orderResult.rows.length === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("Order not found"));
        }
        const order = orderResult.rows[0];
        // Idempotency: skip if already processed
        const existingEvent = await (0, database_1.query)("SELECT id FROM payment_events WHERE event_id = $1", [eventId]);
        if (existingEvent.rows.length > 0) {
            return res.json((0, apiResponse_1.successResponse)("Event already processed"));
        }
        // Record event before mutating order (for traceability); relies on unique(event_id)
        await (0, database_1.query)("INSERT INTO payment_events (provider, event_id, order_id, status, payload) VALUES ($1, $2, $3, $4, $5)", [provider, eventId, orderId, body.status || "paid", body]);
        // Link or create user
        const email = order.customer_email;
        const name = order.customer_name || "";
        const [firstName, ...rest] = name.split(" ");
        const lastName = rest.join(" ") || firstName || "Customer";
        let userId = order.user_id;
        let firstLoginToken = null;
        const expiresAtSql = "NOW() + interval '48 hours'";
        if (!userId) {
            const existingUser = await (0, database_1.query)("SELECT id, password_set FROM users WHERE email = $1 LIMIT 1", [email]);
            if (existingUser.rows.length > 0) {
                userId = existingUser.rows[0].id;
            }
            else {
                const randomPassword = (0, authUtils_1.generateRandomPassword)(24);
                const hashed = await (0, authUtils_1.hashPassword)(randomPassword);
                firstLoginToken = (0, authUtils_1.generateUuidToken)();
                const createdUser = await (0, database_1.query)(`INSERT INTO users (email, password, first_name, last_name, password_set, first_login_token, first_login_token_expires_at)
           VALUES ($1, $2, $3, $4, FALSE, $5, ${expiresAtSql})
           RETURNING id`, [email, hashed, firstName || "Client", lastName || "User", firstLoginToken]);
                userId = createdUser.rows[0].id;
            }
        }
        // Ensure first-login token exists for unset passwords
        const userState = await (0, database_1.query)("SELECT id, password_set, first_login_token, first_login_token_expires_at FROM users WHERE id = $1", [userId]);
        const userRow = userState.rows[0];
        if (userRow && userRow.password_set === false) {
            const tokenExpired = userRow.first_login_token_expires_at && new Date(userRow.first_login_token_expires_at) < new Date();
            if (!userRow.first_login_token || tokenExpired) {
                firstLoginToken = (0, authUtils_1.generateUuidToken)();
                await (0, database_1.query)(`UPDATE users SET first_login_token = $1, first_login_token_expires_at = ${expiresAtSql}, first_login_consumed_at = NULL WHERE id = $2`, [firstLoginToken, userId]);
            }
            else {
                firstLoginToken = userRow.first_login_token;
                // refresh expiry
                await (0, database_1.query)(`UPDATE users SET first_login_token_expires_at = ${expiresAtSql}, first_login_consumed_at = NULL WHERE id = $1`, [userId]);
            }
        }
        // Update order with payment + linkage
        await (0, database_1.query)(`UPDATE orders
       SET payment_status = 'paid',
           status = 'completed',
           payment_reference = COALESCE($2, payment_reference),
           subscription_type = COALESCE($3, subscription_type),
           user_id = COALESCE($4, user_id),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1`, [orderId, paymentReference || null, subscriptionType || null, userId || null]);
        // Create or refresh access link token (only needed if password not set)
        let accessToken = null;
        if (userRow && userRow.password_set === false) {
            accessToken = firstLoginToken || (0, authUtils_1.generateUuidToken)();
            await (0, database_1.query)(`INSERT INTO user_access_links (user_id, order_id, token, expires_at)
         VALUES ($1, $2, $3, ${expiresAtSql})
         ON CONFLICT (token) DO UPDATE SET expires_at = EXCLUDED.expires_at, used_at = NULL, order_id = COALESCE(user_access_links.order_id, EXCLUDED.order_id)`, [userId, orderId, accessToken]);
        }
        // Prepare email items
        const itemsResult = await (0, database_1.query)(`SELECT COALESCE(p.name, 'Service') AS name, oi.quantity, oi.price_each
       FROM order_items oi
       LEFT JOIN products p ON p.id = oi.product_id
       WHERE oi.order_id = $1`, [orderId]);
        // Send email once
        const orderWithEmail = await (0, database_1.query)("SELECT confirmation_email_sent_at FROM orders WHERE id = $1", [orderId]);
        const alreadySent = orderWithEmail.rows[0]?.confirmation_email_sent_at;
        if (!alreadySent) {
            const dashboardLink = accessToken ? buildDashboardLink(accessToken) : `${DASHBOARD_BASE_URL}/dashboard`;
            try {
                await (0, orderEmail_1.sendOrderSuccessEmail)({
                    to: email,
                    customerName: order.customer_name,
                    items: itemsResult.rows,
                    subscriptionType,
                    dashboardLink,
                });
                await (0, database_1.query)("UPDATE orders SET confirmation_email_sent_at = CURRENT_TIMESTAMP WHERE id = $1", [orderId]);
            }
            catch (err) {
                // Do not fail webhook on email error; log it
                console.error("Email send failed", err);
            }
        }
        return res.json((0, apiResponse_1.successResponse)("Payment processed"));
    }
    catch (error) {
        console.error("paymentWebhook error", error);
        return res.status(500).json((0, apiResponse_1.errorResponse)("Server error", error.message));
    }
};
exports.paymentWebhook = paymentWebhook;
