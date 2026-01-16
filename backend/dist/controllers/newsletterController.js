"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNewsletterSubscriber = exports.subscribeToNewsletter = exports.getNewsletterSubscribers = void 0;
const apiResponse_1 = require("../utils/apiResponse");
const database_1 = require("../config/database");
const getNewsletterSubscribers = async (req, res) => {
    try {
        const result = await (0, database_1.query)(`SELECT id, email, source, created_at 
       FROM newsletter_subscribers 
       ORDER BY created_at DESC`);
        return res.json((0, apiResponse_1.successResponse)("Newsletter subscribers fetched successfully", result.rows));
    }
    catch (error) {
        console.error("Error fetching newsletter subscribers:", error);
        return res.status(500).json((0, apiResponse_1.errorResponse)("Failed to fetch subscribers", error.message));
    }
};
exports.getNewsletterSubscribers = getNewsletterSubscribers;
const subscribeToNewsletter = async (req, res) => {
    try {
        const { email, source } = req.body;
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json((0, apiResponse_1.errorResponse)("Invalid email address"));
        }
        const existingSubscriber = await (0, database_1.query)(`SELECT id FROM newsletter_subscribers WHERE email = $1`, [email]);
        if (existingSubscriber.rows.length > 0) {
            return res.status(409).json((0, apiResponse_1.errorResponse)("Email already subscribed"));
        }
        const result = await (0, database_1.query)(`INSERT INTO newsletter_subscribers (email, source, created_at) 
       VALUES ($1, $2, NOW()) 
       RETURNING id, email, source, created_at`, [email, source || 'blog-page']);
        return res.json((0, apiResponse_1.successResponse)("Successfully subscribed to newsletter", result.rows[0]));
    }
    catch (error) {
        console.error("Error subscribing to newsletter:", error);
        return res.status(500).json((0, apiResponse_1.errorResponse)("Failed to subscribe", error.message));
    }
};
exports.subscribeToNewsletter = subscribeToNewsletter;
const deleteNewsletterSubscriber = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json((0, apiResponse_1.errorResponse)("Subscriber ID is required"));
        }
        await (0, database_1.query)(`DELETE FROM newsletter_subscribers WHERE id = $1`, [id]);
        return res.json((0, apiResponse_1.successResponse)("Subscriber deleted successfully"));
    }
    catch (error) {
        console.error("Error deleting subscriber:", error);
        return res.status(500).json((0, apiResponse_1.errorResponse)("Failed to delete subscriber", error.message));
    }
};
exports.deleteNewsletterSubscriber = deleteNewsletterSubscriber;
