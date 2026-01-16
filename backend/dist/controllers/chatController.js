"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postChatMessage = void 0;
const database_1 = require("../config/database");
const validation_1 = require("../utils/validation");
const apiResponse_1 = require("../utils/apiResponse");
const emailQueue_1 = require("../utils/emailQueue");
const sanitizeText = (value) => (value || "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .slice(0, 2000);
const getClientIp = (req) => {
    const forwarded = req.headers["x-forwarded-for"];
    if (typeof forwarded === "string") {
        return forwarded.split(",")[0].trim();
    }
    if (Array.isArray(forwarded) && forwarded.length > 0) {
        return forwarded[0];
    }
    return req.socket.remoteAddress || "unknown";
};
const postChatMessage = async (req, res) => {
    try {
        const validated = validation_1.chatMessageSchema.parse(req.body);
        const ipAddress = getClientIp(req);
        const userAgent = sanitizeText(req.headers["user-agent"] || "");
        const message = sanitizeText(validated.message);
        const pageUrl = sanitizeText(validated.pageUrl || req.headers.referer);
        const name = sanitizeText(validated.name);
        const email = sanitizeText(validated.email);
        // Ensure message is not empty after sanitization
        if (!message) {
            return res.status(400).json((0, apiResponse_1.errorResponse)("Message is required"));
        }
        let sessionId = validated.sessionId;
        let sessionInitialEmailSent = false;
        let sessionEmailSentStatus = null;
        if (sessionId) {
            const existing = await (0, database_1.query)("SELECT id, initial_email_sent, email_sent_status FROM chat_sessions WHERE id = $1", [sessionId]);
            if (existing.rowCount === 0) {
                sessionId = undefined; // Create a new session if provided one is invalid
            }
            else {
                sessionInitialEmailSent = Boolean(existing.rows[0].initial_email_sent);
                sessionEmailSentStatus = existing.rows[0].email_sent_status || null;
            }
        }
        if (!sessionId) {
            const sessionInsert = await (0, database_1.query)(`INSERT INTO chat_sessions (page_url, ip_address, user_agent, name, email) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING id, initial_email_sent, email_sent_status`, [pageUrl || null, ipAddress, userAgent || null, name || null, email || null]);
            sessionId = sessionInsert.rows[0].id;
            sessionInitialEmailSent = Boolean(sessionInsert.rows[0].initial_email_sent);
            sessionEmailSentStatus = sessionInsert.rows[0].email_sent_status || null;
        }
        else if (name || email) {
            await (0, database_1.query)(`UPDATE chat_sessions SET 
           name = COALESCE($2, name), 
           email = COALESCE($3, email) 
         WHERE id = $1`, [sessionId, name || null, email || null]);
        }
        const messageInsert = await (0, database_1.query)(`INSERT INTO chat_messages (session_id, sender, message, page_url) 
       VALUES ($1, $2, $3, $4)
       RETURNING id, created_at`, [sessionId, validated.sender, message, pageUrl || null]);
        await (0, database_1.query)(`UPDATE chat_sessions SET last_activity = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = $1`, [sessionId]);
        const finalSessionId = sessionId;
        const hasLeadDetails = Boolean(name && email);
        if (hasLeadDetails && !sessionInitialEmailSent) {
            const updated = await (0, database_1.query)(`UPDATE chat_sessions 
         SET initial_email_sent = TRUE, name = COALESCE($2, name), email = COALESCE($3, email) 
         WHERE id = $1 AND initial_email_sent = FALSE 
         RETURNING id`, [finalSessionId, name || null, email || null]);
            if ((updated?.rowCount || 0) > 0) {
                sessionInitialEmailSent = true;
                (0, emailQueue_1.enqueueThankYouEmail)({ sessionId: finalSessionId, to: email, name, ipAddress });
            }
        }
        // Trigger thank-you email only once per session when completed and email present
        if (validated.sessionComplete && email && !sessionInitialEmailSent && sessionEmailSentStatus !== "sent") {
            const updated = await (0, database_1.query)(`UPDATE chat_sessions 
         SET initial_email_sent = TRUE 
         WHERE id = $1 AND initial_email_sent = FALSE 
         RETURNING id`, [finalSessionId]);
            if ((updated?.rowCount || 0) > 0) {
                (0, emailQueue_1.enqueueThankYouEmail)({ sessionId: finalSessionId, to: email, name, ipAddress });
            }
        }
        return res.status(201).json((0, apiResponse_1.successResponse)("Message stored", {
            sessionId: finalSessionId,
            messageId: messageInsert.rows[0].id,
            createdAt: messageInsert.rows[0].created_at,
        }));
    }
    catch (error) {
        const message = error?.issues?.[0]?.message || error.message || "Validation error";
        return res.status(400).json((0, apiResponse_1.errorResponse)("Validation error", message));
    }
};
exports.postChatMessage = postChatMessage;
