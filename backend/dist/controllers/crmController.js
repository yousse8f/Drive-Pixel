"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCrmStats = exports.deleteDeal = exports.updateDeal = exports.createDeal = exports.getDeals = exports.updatePipelineStage = exports.createPipelineStage = exports.getPipelineStages = exports.logActivity = exports.getActivities = exports.deleteNote = exports.updateNote = exports.addNote = exports.convertLeadToCustomer = exports.deleteCustomer = exports.updateCustomer = exports.createCustomer = exports.getCustomer = exports.getCustomers = void 0;
const database_1 = require("../config/database");
const auditLogger_1 = require("../utils/auditLogger");
// =====================================================
// CRM CUSTOMERS
// =====================================================
const getCustomers = async (req, res) => {
    try {
        const { status, source, assigned_to, search, page = 1, limit = 20 } = req.query;
        const offset = (Number(page) - 1) * Number(limit);
        let whereClause = "WHERE 1=1";
        const params = [];
        let paramIndex = 1;
        if (status) {
            whereClause += ` AND c.status = $${paramIndex++}`;
            params.push(status);
        }
        if (source) {
            whereClause += ` AND c.source = $${paramIndex++}`;
            params.push(source);
        }
        if (assigned_to) {
            whereClause += ` AND c.assigned_to = $${paramIndex++}`;
            params.push(assigned_to);
        }
        if (search) {
            whereClause += ` AND (c.first_name ILIKE $${paramIndex} OR c.last_name ILIKE $${paramIndex} OR c.email ILIKE $${paramIndex} OR c.company ILIKE $${paramIndex})`;
            params.push(`%${search}%`);
            paramIndex++;
        }
        const countResult = await (0, database_1.query)(`SELECT COUNT(*) FROM crm_customers c ${whereClause}`, params);
        params.push(Number(limit), offset);
        const result = await (0, database_1.query)(`SELECT c.*, 
        u.email as assigned_to_email,
        u.first_name as assigned_to_first_name,
        u.last_name as assigned_to_last_name,
        (SELECT COUNT(*) FROM crm_customer_notes WHERE customer_id = c.id) as notes_count,
        (SELECT COUNT(*) FROM crm_activities WHERE customer_id = c.id) as activities_count,
        (SELECT COUNT(*) FROM crm_deals WHERE customer_id = c.id) as deals_count
       FROM crm_customers c
       LEFT JOIN users u ON c.assigned_to = u.id
       ${whereClause}
       ORDER BY c.updated_at DESC
       LIMIT $${paramIndex++} OFFSET $${paramIndex}`, params);
        res.json({
            success: true,
            data: result.rows,
            pagination: {
                total: parseInt(countResult.rows[0].count),
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(parseInt(countResult.rows[0].count) / Number(limit)),
            },
        });
    }
    catch (error) {
        console.error("Error fetching customers:", error);
        res.status(500).json({ success: false, message: "Failed to fetch customers" });
    }
};
exports.getCustomers = getCustomers;
const getCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, database_1.query)(`SELECT c.*, 
        u.email as assigned_to_email,
        u.first_name as assigned_to_first_name,
        u.last_name as assigned_to_last_name
       FROM crm_customers c
       LEFT JOIN users u ON c.assigned_to = u.id
       WHERE c.id = $1`, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }
        // Get notes
        const notesResult = await (0, database_1.query)(`SELECT n.*, u.email as user_email, u.first_name, u.last_name
       FROM crm_customer_notes n
       LEFT JOIN users u ON n.user_id = u.id
       WHERE n.customer_id = $1
       ORDER BY n.created_at DESC`, [id]);
        // Get activities
        const activitiesResult = await (0, database_1.query)(`SELECT a.*, u.email as user_email, u.first_name, u.last_name
       FROM crm_activities a
       LEFT JOIN users u ON a.user_id = u.id
       WHERE a.customer_id = $1
       ORDER BY a.created_at DESC
       LIMIT 50`, [id]);
        // Get deals
        const dealsResult = await (0, database_1.query)(`SELECT d.*, s.name as stage_name, s.color as stage_color
       FROM crm_deals d
       LEFT JOIN crm_pipeline_stages s ON d.stage_id = s.id
       WHERE d.customer_id = $1
       ORDER BY d.created_at DESC`, [id]);
        res.json({
            success: true,
            data: {
                ...result.rows[0],
                notes: notesResult.rows,
                activities: activitiesResult.rows,
                deals: dealsResult.rows,
            },
        });
    }
    catch (error) {
        console.error("Error fetching customer:", error);
        res.status(500).json({ success: false, message: "Failed to fetch customer" });
    }
};
exports.getCustomer = getCustomer;
const createCustomer = async (req, res) => {
    try {
        const { lead_id, first_name, last_name, email, phone, company, job_title, address, city, state, country, postal_code, status, source, assigned_to, tags, custom_fields } = req.body;
        const userId = req.userId;
        if (!first_name || !email) {
            return res.status(400).json({ success: false, message: "First name and email are required" });
        }
        const result = await (0, database_1.query)(`INSERT INTO crm_customers 
       (lead_id, first_name, last_name, email, phone, company, job_title, address, city, state, country, postal_code, status, source, assigned_to, tags, custom_fields)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
       RETURNING *`, [lead_id, first_name, last_name, email, phone, company, job_title, address, city, state, country, postal_code, status || 'new', source, assigned_to, tags || [], custom_fields || {}]);
        // Create activity
        await createActivity(result.rows[0].id, userId, 'customer_created', 'Customer Created', 'Customer record was created');
        await (0, auditLogger_1.createAuditLog)(userId, "create", "crm_customer", result.rows[0].id, null, result.rows[0], req);
        res.status(201).json({ success: true, data: result.rows[0] });
    }
    catch (error) {
        console.error("Error creating customer:", error);
        res.status(500).json({ success: false, message: "Failed to create customer" });
    }
};
exports.createCustomer = createCustomer;
const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, email, phone, company, job_title, address, city, state, country, postal_code, status, source, assigned_to, tags, custom_fields } = req.body;
        const userId = req.userId;
        const oldResult = await (0, database_1.query)("SELECT * FROM crm_customers WHERE id = $1", [id]);
        if (oldResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }
        const oldCustomer = oldResult.rows[0];
        const result = await (0, database_1.query)(`UPDATE crm_customers 
       SET first_name = COALESCE($1, first_name),
           last_name = COALESCE($2, last_name),
           email = COALESCE($3, email),
           phone = COALESCE($4, phone),
           company = COALESCE($5, company),
           job_title = COALESCE($6, job_title),
           address = COALESCE($7, address),
           city = COALESCE($8, city),
           state = COALESCE($9, state),
           country = COALESCE($10, country),
           postal_code = COALESCE($11, postal_code),
           status = COALESCE($12, status),
           source = COALESCE($13, source),
           assigned_to = COALESCE($14, assigned_to),
           tags = COALESCE($15, tags),
           custom_fields = COALESCE($16, custom_fields),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $17
       RETURNING *`, [first_name, last_name, email, phone, company, job_title, address, city, state, country, postal_code, status, source, assigned_to, tags, custom_fields, id]);
        // Track status change
        if (status && status !== oldCustomer.status) {
            await createActivity(id, userId, 'status_changed', 'Status Changed', `Status changed from ${oldCustomer.status} to ${status}`);
        }
        // Track assignment change
        if (assigned_to && assigned_to !== oldCustomer.assigned_to) {
            await createActivity(id, userId, 'assigned', 'Customer Assigned', `Customer assigned to new user`);
        }
        await (0, auditLogger_1.createAuditLog)(userId, "update", "crm_customer", id, oldCustomer, result.rows[0], req);
        res.json({ success: true, data: result.rows[0] });
    }
    catch (error) {
        console.error("Error updating customer:", error);
        res.status(500).json({ success: false, message: "Failed to update customer" });
    }
};
exports.updateCustomer = updateCustomer;
const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const oldResult = await (0, database_1.query)("SELECT * FROM crm_customers WHERE id = $1", [id]);
        if (oldResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }
        await (0, database_1.query)("DELETE FROM crm_customers WHERE id = $1", [id]);
        await (0, auditLogger_1.createAuditLog)(userId, "delete", "crm_customer", id, oldResult.rows[0], null, req);
        res.json({ success: true, message: "Customer deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting customer:", error);
        res.status(500).json({ success: false, message: "Failed to delete customer" });
    }
};
exports.deleteCustomer = deleteCustomer;
// Convert lead to customer
const convertLeadToCustomer = async (req, res) => {
    try {
        const { lead_id } = req.params;
        const userId = req.userId;
        // Get lead
        const leadResult = await (0, database_1.query)("SELECT * FROM leads WHERE id = $1", [lead_id]);
        if (leadResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Lead not found" });
        }
        const lead = leadResult.rows[0];
        // Check if customer already exists for this lead
        const existingCustomer = await (0, database_1.query)("SELECT id FROM crm_customers WHERE lead_id = $1", [lead_id]);
        if (existingCustomer.rows.length > 0) {
            return res.status(400).json({ success: false, message: "Customer already exists for this lead" });
        }
        // Create customer from lead
        const result = await (0, database_1.query)(`INSERT INTO crm_customers (lead_id, first_name, email, phone, status, source)
       VALUES ($1, $2, $3, $4, 'new', 'lead_conversion')
       RETURNING *`, [lead_id, lead.name, lead.email, lead.phone]);
        // Update lead status
        await (0, database_1.query)("UPDATE leads SET status = 'converted' WHERE id = $1", [lead_id]);
        await createActivity(result.rows[0].id, userId, 'lead_converted', 'Lead Converted', `Converted from lead #${lead_id}`);
        await (0, auditLogger_1.createAuditLog)(userId, "create", "crm_customer", result.rows[0].id, null, result.rows[0], req);
        res.status(201).json({ success: true, data: result.rows[0] });
    }
    catch (error) {
        console.error("Error converting lead:", error);
        res.status(500).json({ success: false, message: "Failed to convert lead" });
    }
};
exports.convertLeadToCustomer = convertLeadToCustomer;
// =====================================================
// CRM NOTES
// =====================================================
const addNote = async (req, res) => {
    try {
        const { customer_id, note, is_private } = req.body;
        const userId = req.userId;
        if (!customer_id || !note) {
            return res.status(400).json({ success: false, message: "customer_id and note are required" });
        }
        const result = await (0, database_1.query)(`INSERT INTO crm_customer_notes (customer_id, user_id, note, is_private)
       VALUES ($1, $2, $3, $4)
       RETURNING *`, [customer_id, userId, note, is_private || false]);
        await createActivity(customer_id, userId, 'note_added', 'Note Added', 'A new note was added');
        res.status(201).json({ success: true, data: result.rows[0] });
    }
    catch (error) {
        console.error("Error adding note:", error);
        res.status(500).json({ success: false, message: "Failed to add note" });
    }
};
exports.addNote = addNote;
const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { note, is_private } = req.body;
        const userId = req.userId;
        const result = await (0, database_1.query)(`UPDATE crm_customer_notes 
       SET note = COALESCE($1, note),
           is_private = COALESCE($2, is_private),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $3 AND user_id = $4
       RETURNING *`, [note, is_private, id, userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Note not found or not authorized" });
        }
        res.json({ success: true, data: result.rows[0] });
    }
    catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ success: false, message: "Failed to update note" });
    }
};
exports.updateNote = updateNote;
const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const result = await (0, database_1.query)("DELETE FROM crm_customer_notes WHERE id = $1 AND user_id = $2 RETURNING customer_id", [id, userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Note not found or not authorized" });
        }
        res.json({ success: true, message: "Note deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ success: false, message: "Failed to delete note" });
    }
};
exports.deleteNote = deleteNote;
// =====================================================
// CRM ACTIVITIES
// =====================================================
const getActivities = async (req, res) => {
    try {
        const { customer_id, activity_type, page = 1, limit = 50 } = req.query;
        const offset = (Number(page) - 1) * Number(limit);
        let whereClause = "WHERE 1=1";
        const params = [];
        let paramIndex = 1;
        if (customer_id) {
            whereClause += ` AND a.customer_id = $${paramIndex++}`;
            params.push(customer_id);
        }
        if (activity_type) {
            whereClause += ` AND a.activity_type = $${paramIndex++}`;
            params.push(activity_type);
        }
        params.push(Number(limit), offset);
        const result = await (0, database_1.query)(`SELECT a.*, u.email as user_email, u.first_name, u.last_name,
        c.first_name as customer_first_name, c.last_name as customer_last_name
       FROM crm_activities a
       LEFT JOIN users u ON a.user_id = u.id
       LEFT JOIN crm_customers c ON a.customer_id = c.id
       ${whereClause}
       ORDER BY a.created_at DESC
       LIMIT $${paramIndex++} OFFSET $${paramIndex}`, params);
        res.json({ success: true, data: result.rows });
    }
    catch (error) {
        console.error("Error fetching activities:", error);
        res.status(500).json({ success: false, message: "Failed to fetch activities" });
    }
};
exports.getActivities = getActivities;
const logActivity = async (req, res) => {
    try {
        const { customer_id, activity_type, title, description, metadata } = req.body;
        const userId = req.userId;
        if (!customer_id || !activity_type || !title) {
            return res.status(400).json({ success: false, message: "customer_id, activity_type, and title are required" });
        }
        const result = await (0, database_1.query)(`INSERT INTO crm_activities (customer_id, user_id, activity_type, title, description, metadata)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`, [customer_id, userId, activity_type, title, description, metadata || {}]);
        res.status(201).json({ success: true, data: result.rows[0] });
    }
    catch (error) {
        console.error("Error logging activity:", error);
        res.status(500).json({ success: false, message: "Failed to log activity" });
    }
};
exports.logActivity = logActivity;
// =====================================================
// CRM PIPELINE STAGES
// =====================================================
const getPipelineStages = async (req, res) => {
    try {
        const result = await (0, database_1.query)(`SELECT s.*, 
        (SELECT COUNT(*) FROM crm_deals WHERE stage_id = s.id AND status = 'open') as deal_count,
        (SELECT COALESCE(SUM(value), 0) FROM crm_deals WHERE stage_id = s.id AND status = 'open') as total_value
       FROM crm_pipeline_stages s
       WHERE s.is_active = true
       ORDER BY s."order"`, []);
        res.json({ success: true, data: result.rows });
    }
    catch (error) {
        console.error("Error fetching pipeline stages:", error);
        res.status(500).json({ success: false, message: "Failed to fetch pipeline stages" });
    }
};
exports.getPipelineStages = getPipelineStages;
const createPipelineStage = async (req, res) => {
    try {
        const { name, slug, color, order } = req.body;
        if (!name || !slug) {
            return res.status(400).json({ success: false, message: "name and slug are required" });
        }
        const result = await (0, database_1.query)(`INSERT INTO crm_pipeline_stages (name, slug, color, "order")
       VALUES ($1, $2, $3, COALESCE($4, 0))
       RETURNING *`, [name, slug, color || '#3B82F6', order]);
        res.status(201).json({ success: true, data: result.rows[0] });
    }
    catch (error) {
        console.error("Error creating pipeline stage:", error);
        res.status(500).json({ success: false, message: "Failed to create pipeline stage" });
    }
};
exports.createPipelineStage = createPipelineStage;
const updatePipelineStage = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, color, order, is_active } = req.body;
        const result = await (0, database_1.query)(`UPDATE crm_pipeline_stages 
       SET name = COALESCE($1, name),
           color = COALESCE($2, color),
           "order" = COALESCE($3, "order"),
           is_active = COALESCE($4, is_active),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $5
       RETURNING *`, [name, color, order, is_active, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Pipeline stage not found" });
        }
        res.json({ success: true, data: result.rows[0] });
    }
    catch (error) {
        console.error("Error updating pipeline stage:", error);
        res.status(500).json({ success: false, message: "Failed to update pipeline stage" });
    }
};
exports.updatePipelineStage = updatePipelineStage;
// =====================================================
// CRM DEALS
// =====================================================
const getDeals = async (req, res) => {
    try {
        const { customer_id, stage_id, status, assigned_to, page = 1, limit = 20 } = req.query;
        const offset = (Number(page) - 1) * Number(limit);
        let whereClause = "WHERE 1=1";
        const params = [];
        let paramIndex = 1;
        if (customer_id) {
            whereClause += ` AND d.customer_id = $${paramIndex++}`;
            params.push(customer_id);
        }
        if (stage_id) {
            whereClause += ` AND d.stage_id = $${paramIndex++}`;
            params.push(stage_id);
        }
        if (status) {
            whereClause += ` AND d.status = $${paramIndex++}`;
            params.push(status);
        }
        if (assigned_to) {
            whereClause += ` AND d.assigned_to = $${paramIndex++}`;
            params.push(assigned_to);
        }
        const countResult = await (0, database_1.query)(`SELECT COUNT(*) FROM crm_deals d ${whereClause}`, params);
        params.push(Number(limit), offset);
        const result = await (0, database_1.query)(`SELECT d.*, 
        s.name as stage_name, s.color as stage_color,
        c.first_name as customer_first_name, c.last_name as customer_last_name, c.email as customer_email,
        u.email as assigned_to_email
       FROM crm_deals d
       LEFT JOIN crm_pipeline_stages s ON d.stage_id = s.id
       LEFT JOIN crm_customers c ON d.customer_id = c.id
       LEFT JOIN users u ON d.assigned_to = u.id
       ${whereClause}
       ORDER BY d.updated_at DESC
       LIMIT $${paramIndex++} OFFSET $${paramIndex}`, params);
        res.json({
            success: true,
            data: result.rows,
            pagination: {
                total: parseInt(countResult.rows[0].count),
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(parseInt(countResult.rows[0].count) / Number(limit)),
            },
        });
    }
    catch (error) {
        console.error("Error fetching deals:", error);
        res.status(500).json({ success: false, message: "Failed to fetch deals" });
    }
};
exports.getDeals = getDeals;
const createDeal = async (req, res) => {
    try {
        const { customer_id, stage_id, title, value, probability, expected_close_date, assigned_to, notes } = req.body;
        const userId = req.userId;
        if (!customer_id || !title) {
            return res.status(400).json({ success: false, message: "customer_id and title are required" });
        }
        const result = await (0, database_1.query)(`INSERT INTO crm_deals (customer_id, stage_id, title, value, probability, expected_close_date, assigned_to, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`, [customer_id, stage_id, title, value || 0, probability || 50, expected_close_date, assigned_to || userId, notes]);
        await createActivity(customer_id, userId, 'deal_created', 'Deal Created', `Deal "${title}" was created`);
        await (0, auditLogger_1.createAuditLog)(userId, "create", "crm_deal", result.rows[0].id, null, result.rows[0], req);
        res.status(201).json({ success: true, data: result.rows[0] });
    }
    catch (error) {
        console.error("Error creating deal:", error);
        res.status(500).json({ success: false, message: "Failed to create deal" });
    }
};
exports.createDeal = createDeal;
const updateDeal = async (req, res) => {
    try {
        const { id } = req.params;
        const { stage_id, title, value, probability, expected_close_date, assigned_to, status, notes } = req.body;
        const userId = req.userId;
        const oldResult = await (0, database_1.query)("SELECT * FROM crm_deals WHERE id = $1", [id]);
        if (oldResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Deal not found" });
        }
        const oldDeal = oldResult.rows[0];
        const result = await (0, database_1.query)(`UPDATE crm_deals 
       SET stage_id = COALESCE($1, stage_id),
           title = COALESCE($2, title),
           value = COALESCE($3, value),
           probability = COALESCE($4, probability),
           expected_close_date = COALESCE($5, expected_close_date),
           assigned_to = COALESCE($6, assigned_to),
           status = COALESCE($7, status),
           notes = COALESCE($8, notes),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $9
       RETURNING *`, [stage_id, title, value, probability, expected_close_date, assigned_to, status, notes, id]);
        // Track stage change
        if (stage_id && stage_id !== oldDeal.stage_id) {
            await createActivity(oldDeal.customer_id, userId, 'deal_stage_changed', 'Deal Stage Changed', `Deal moved to new stage`);
        }
        // Track status change (won/lost)
        if (status && status !== oldDeal.status) {
            await createActivity(oldDeal.customer_id, userId, 'deal_status_changed', 'Deal Status Changed', `Deal status changed to ${status}`);
            // Update customer lifetime value if won
            if (status === 'won') {
                await (0, database_1.query)(`UPDATE crm_customers SET lifetime_value = lifetime_value + $1 WHERE id = $2`, [result.rows[0].value, oldDeal.customer_id]);
            }
        }
        await (0, auditLogger_1.createAuditLog)(userId, "update", "crm_deal", id, oldDeal, result.rows[0], req);
        res.json({ success: true, data: result.rows[0] });
    }
    catch (error) {
        console.error("Error updating deal:", error);
        res.status(500).json({ success: false, message: "Failed to update deal" });
    }
};
exports.updateDeal = updateDeal;
const deleteDeal = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const oldResult = await (0, database_1.query)("SELECT * FROM crm_deals WHERE id = $1", [id]);
        if (oldResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Deal not found" });
        }
        await (0, database_1.query)("DELETE FROM crm_deals WHERE id = $1", [id]);
        await (0, auditLogger_1.createAuditLog)(userId, "delete", "crm_deal", id, oldResult.rows[0], null, req);
        res.json({ success: true, message: "Deal deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting deal:", error);
        res.status(500).json({ success: false, message: "Failed to delete deal" });
    }
};
exports.deleteDeal = deleteDeal;
// =====================================================
// CRM STATISTICS
// =====================================================
const getCrmStats = async (req, res) => {
    try {
        // Customer stats by status
        const customerStats = await (0, database_1.query)(`
      SELECT status, COUNT(*) as count
      FROM crm_customers
      GROUP BY status
    `);
        // Deal stats
        const dealStats = await (0, database_1.query)(`
      SELECT 
        COUNT(*) FILTER (WHERE status = 'open') as open_deals,
        COUNT(*) FILTER (WHERE status = 'won') as won_deals,
        COUNT(*) FILTER (WHERE status = 'lost') as lost_deals,
        COALESCE(SUM(value) FILTER (WHERE status = 'open'), 0) as pipeline_value,
        COALESCE(SUM(value) FILTER (WHERE status = 'won'), 0) as won_value
      FROM crm_deals
    `);
        // Recent activities
        const recentActivities = await (0, database_1.query)(`
      SELECT a.*, u.email as user_email, c.first_name, c.last_name
      FROM crm_activities a
      LEFT JOIN users u ON a.user_id = u.id
      LEFT JOIN crm_customers c ON a.customer_id = c.id
      ORDER BY a.created_at DESC
      LIMIT 10
    `);
        // Pipeline overview
        const pipelineOverview = await (0, database_1.query)(`
      SELECT s.name, s.color, s."order",
        COUNT(d.id) as deal_count,
        COALESCE(SUM(d.value), 0) as total_value
      FROM crm_pipeline_stages s
      LEFT JOIN crm_deals d ON s.id = d.stage_id AND d.status = 'open'
      WHERE s.is_active = true
      GROUP BY s.id, s.name, s.color, s."order"
      ORDER BY s."order"
    `);
        res.json({
            success: true,
            data: {
                customersByStatus: customerStats.rows,
                dealStats: dealStats.rows[0],
                recentActivities: recentActivities.rows,
                pipelineOverview: pipelineOverview.rows,
            },
        });
    }
    catch (error) {
        console.error("Error fetching CRM stats:", error);
        res.status(500).json({ success: false, message: "Failed to fetch CRM stats" });
    }
};
exports.getCrmStats = getCrmStats;
// =====================================================
// HELPER FUNCTIONS
// =====================================================
async function createActivity(customerId, userId, activityType, title, description, metadata = {}) {
    try {
        await (0, database_1.query)(`INSERT INTO crm_activities (customer_id, user_id, activity_type, title, description, metadata)
       VALUES ($1, $2, $3, $4, $5, $6)`, [customerId, userId, activityType, title, description, metadata]);
    }
    catch (error) {
        console.error("Error creating activity:", error);
    }
}
