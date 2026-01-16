"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityTypes = exports.AuditActions = void 0;
exports.createAuditLog = createAuditLog;
exports.getAuditLogs = getAuditLogs;
const database_1 = require("../config/database");
/**
 * Create an audit log entry
 */
async function createAuditLog(userId, action, entityType, entityId, oldValues, newValues, req) {
    try {
        const ipAddress = req ? getClientIp(req) : null;
        const userAgent = req ? req.headers["user-agent"] : null;
        await (0, database_1.query)(`INSERT INTO audit_logs (user_id, action, entity_type, entity_id, old_values, new_values, ip_address, user_agent)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [
            userId,
            action,
            entityType,
            entityId,
            oldValues ? JSON.stringify(oldValues) : null,
            newValues ? JSON.stringify(newValues) : null,
            ipAddress,
            userAgent,
        ]);
    }
    catch (error) {
        console.error("Error creating audit log:", error);
    }
}
/**
 * Get audit logs with filtering and pagination
 */
async function getAuditLogs(options) {
    const { userId, entityType, entityId, action, dateFrom, dateTo, page = 1, limit = 50, } = options;
    let whereClause = "WHERE 1=1";
    const params = [];
    let paramIndex = 1;
    if (userId) {
        whereClause += ` AND a.user_id = $${paramIndex++}`;
        params.push(userId);
    }
    if (entityType) {
        whereClause += ` AND a.entity_type = $${paramIndex++}`;
        params.push(entityType);
    }
    if (entityId) {
        whereClause += ` AND a.entity_id = $${paramIndex++}`;
        params.push(entityId);
    }
    if (action) {
        whereClause += ` AND a.action = $${paramIndex++}`;
        params.push(action);
    }
    if (dateFrom) {
        whereClause += ` AND a.created_at >= $${paramIndex++}`;
        params.push(dateFrom);
    }
    if (dateTo) {
        whereClause += ` AND a.created_at <= $${paramIndex++}`;
        params.push(dateTo);
    }
    const countResult = await (0, database_1.query)(`SELECT COUNT(*) FROM audit_logs a ${whereClause}`, params);
    const offset = (page - 1) * limit;
    params.push(limit, offset);
    const result = await (0, database_1.query)(`SELECT a.*, u.email as user_email, u.first_name, u.last_name
     FROM audit_logs a
     LEFT JOIN users u ON a.user_id = u.id
     ${whereClause}
     ORDER BY a.created_at DESC
     LIMIT $${paramIndex++} OFFSET $${paramIndex}`, params);
    return {
        logs: result.rows,
        total: parseInt(countResult.rows[0].count),
    };
}
/**
 * Get client IP address from request
 */
function getClientIp(req) {
    const forwarded = req.headers["x-forwarded-for"];
    if (forwarded) {
        const ips = typeof forwarded === "string" ? forwarded : forwarded[0];
        return ips.split(",")[0].trim();
    }
    return req.socket?.remoteAddress || null;
}
/**
 * Log activity types
 */
exports.AuditActions = {
    CREATE: "create",
    UPDATE: "update",
    DELETE: "delete",
    RESTORE: "restore",
    LOGIN: "login",
    LOGOUT: "logout",
    EXPORT: "export",
    IMPORT: "import",
    SEND_EMAIL: "send_email",
    ASSIGN: "assign",
    STATUS_CHANGE: "status_change",
};
/**
 * Entity types for audit logging
 */
exports.EntityTypes = {
    // CMS
    CMS_PAGE: "cms_page",
    CMS_SECTION: "cms_section",
    CMS_CONTENT_BLOCK: "cms_content_block",
    CMS_COMPONENT: "cms_component",
    // CRM
    CRM_CUSTOMER: "crm_customer",
    CRM_DEAL: "crm_deal",
    CRM_NOTE: "crm_note",
    CRM_ACTIVITY: "crm_activity",
    // Email
    EMAIL_LIST: "email_list",
    EMAIL_TEMPLATE: "email_template",
    EMAIL_CAMPAIGN: "email_campaign",
    // System
    USER: "user",
    ROLE: "role",
    SETTINGS: "settings",
};
