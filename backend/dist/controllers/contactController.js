"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContactMessageStatus = exports.deleteContactMessage = exports.submitContactMessage = exports.getContactMessages = void 0;
const apiResponse_1 = require("../utils/apiResponse");
const database_1 = require("../config/database");
const getContactMessages = async (req, res) => {
    try {
        const result = await (0, database_1.query)(`SELECT id, full_name, email, service, message, status, created_at 
       FROM contact_messages 
       ORDER BY created_at DESC`);
        return res.json((0, apiResponse_1.successResponse)("Contact messages fetched successfully", result.rows));
    }
    catch (error) {
        console.error("Error fetching contact messages:", error);
        return res.status(500).json((0, apiResponse_1.errorResponse)("Failed to fetch messages", error.message));
    }
};
exports.getContactMessages = getContactMessages;
const submitContactMessage = async (req, res) => {
    try {
        const { fullName, email, service, message } = req.body;
        if (!fullName || !email || !service || !message) {
            return res.status(400).json((0, apiResponse_1.errorResponse)("All fields are required"));
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json((0, apiResponse_1.errorResponse)("Invalid email address"));
        }
        const result = await (0, database_1.query)(`INSERT INTO contact_messages (full_name, email, service, message, status, created_at) 
       VALUES ($1, $2, $3, $4, 'unread', NOW()) 
       RETURNING id, full_name, email, service, message, status, created_at`, [fullName, email, service, message]);
        return res.json((0, apiResponse_1.successResponse)("Message sent successfully", result.rows[0]));
    }
    catch (error) {
        console.error("Error saving contact message:", error);
        return res.status(500).json((0, apiResponse_1.errorResponse)("Failed to send message", error.message));
    }
};
exports.submitContactMessage = submitContactMessage;
const deleteContactMessage = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json((0, apiResponse_1.errorResponse)("Message ID is required"));
        }
        await (0, database_1.query)(`DELETE FROM contact_messages WHERE id = $1`, [id]);
        return res.json((0, apiResponse_1.successResponse)("Message deleted successfully"));
    }
    catch (error) {
        console.error("Error deleting message:", error);
        return res.status(500).json((0, apiResponse_1.errorResponse)("Failed to delete message", error.message));
    }
};
exports.deleteContactMessage = deleteContactMessage;
const updateContactMessageStatus = async (req, res) => {
    try {
        const { id, status } = req.body;
        if (!id || !status) {
            return res.status(400).json((0, apiResponse_1.errorResponse)("Message ID and status are required"));
        }
        const result = await (0, database_1.query)(`UPDATE contact_messages 
       SET status = $1 
       WHERE id = $2 
       RETURNING id, full_name, email, service, message, status, created_at`, [status, id]);
        if (result.rows.length === 0) {
            return res.status(404).json((0, apiResponse_1.errorResponse)("Message not found"));
        }
        return res.json((0, apiResponse_1.successResponse)("Message status updated successfully", result.rows[0]));
    }
    catch (error) {
        console.error("Error updating message status:", error);
        return res.status(500).json((0, apiResponse_1.errorResponse)("Failed to update message status", error.message));
    }
};
exports.updateContactMessageStatus = updateContactMessageStatus;
