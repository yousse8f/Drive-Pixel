import { Request, Response } from "express";
import { query } from "../config/database";
import { createAuditLog } from "../utils/auditLogger";
import nodemailer from "nodemailer";

// =====================================================
// EMAIL LISTS
// =====================================================

export const getEmailLists = async (req: Request, res: Response) => {
  try {
    const { type, search, page = 1, limit = 20 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let whereClause = "WHERE 1=1";
    const params: any[] = [];
    let paramIndex = 1;

    if (type) {
      whereClause += ` AND l.type = $${paramIndex++}`;
      params.push(type);
    }

    if (search) {
      whereClause += ` AND l.name ILIKE $${paramIndex++}`;
      params.push(`%${search}%`);
    }

    const countResult = await query(
      `SELECT COUNT(*) FROM email_lists l ${whereClause}`,
      params
    );

    params.push(Number(limit), offset);
    const result = await query(
      `SELECT l.*, 
        u.email as created_by_email,
        (SELECT COUNT(*) FROM email_list_subscribers WHERE list_id = l.id AND status = 'active') as active_subscribers
       FROM email_lists l
       LEFT JOIN users u ON l.created_by = u.id
       ${whereClause}
       ORDER BY l.updated_at DESC
       LIMIT $${paramIndex++} OFFSET $${paramIndex}`,
      params
    );

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
  } catch (error) {
    console.error("Error fetching email lists:", error);
    res.status(500).json({ success: false, message: "Failed to fetch email lists" });
  }
};

export const getEmailList = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await query(
      `SELECT l.*, u.email as created_by_email
       FROM email_lists l
       LEFT JOIN users u ON l.created_by = u.id
       WHERE l.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Email list not found" });
    }

    // Get subscriber stats
    const statsResult = await query(
      `SELECT status, COUNT(*) as count
       FROM email_list_subscribers
       WHERE list_id = $1
       GROUP BY status`,
      [id]
    );

    res.json({
      success: true,
      data: {
        ...result.rows[0],
        subscriberStats: statsResult.rows,
      },
    });
  } catch (error) {
    console.error("Error fetching email list:", error);
    res.status(500).json({ success: false, message: "Failed to fetch email list" });
  }
};

export const createEmailList = async (req: Request, res: Response) => {
  try {
    const { name, description, type, segment_criteria } = req.body;
    const userId = (req as any).userId;

    if (!name) {
      return res.status(400).json({ success: false, message: "Name is required" });
    }

    const result = await query(
      `INSERT INTO email_lists (name, description, type, segment_criteria, created_by)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, description, type || 'manual', segment_criteria || {}, userId]
    );

    await createAuditLog(userId, "create", "email_list", result.rows[0].id, null, result.rows[0], req);

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error creating email list:", error);
    res.status(500).json({ success: false, message: "Failed to create email list" });
  }
};

export const updateEmailList = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, type, segment_criteria, is_active } = req.body;
    const userId = (req as any).userId;

    const oldResult = await query("SELECT * FROM email_lists WHERE id = $1", [id]);
    if (oldResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Email list not found" });
    }

    const result = await query(
      `UPDATE email_lists 
       SET name = COALESCE($1, name),
           description = COALESCE($2, description),
           type = COALESCE($3, type),
           segment_criteria = COALESCE($4, segment_criteria),
           is_active = COALESCE($5, is_active),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING *`,
      [name, description, type, segment_criteria, is_active, id]
    );

    await createAuditLog(userId, "update", "email_list", id, oldResult.rows[0], result.rows[0], req);

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error updating email list:", error);
    res.status(500).json({ success: false, message: "Failed to update email list" });
  }
};

export const deleteEmailList = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    const oldResult = await query("SELECT * FROM email_lists WHERE id = $1", [id]);
    if (oldResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Email list not found" });
    }

    await query("DELETE FROM email_lists WHERE id = $1", [id]);

    await createAuditLog(userId, "delete", "email_list", id, oldResult.rows[0], null, req);

    res.json({ success: true, message: "Email list deleted successfully" });
  } catch (error) {
    console.error("Error deleting email list:", error);
    res.status(500).json({ success: false, message: "Failed to delete email list" });
  }
};

// =====================================================
// EMAIL LIST SUBSCRIBERS
// =====================================================

export const getSubscribers = async (req: Request, res: Response) => {
  try {
    const { list_id, status, search, page = 1, limit = 50 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let whereClause = "WHERE 1=1";
    const params: any[] = [];
    let paramIndex = 1;

    if (list_id) {
      whereClause += ` AND s.list_id = $${paramIndex++}`;
      params.push(list_id);
    }

    if (status) {
      whereClause += ` AND s.status = $${paramIndex++}`;
      params.push(status);
    }

    if (search) {
      whereClause += ` AND (s.email ILIKE $${paramIndex} OR s.first_name ILIKE $${paramIndex} OR s.last_name ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    const countResult = await query(
      `SELECT COUNT(*) FROM email_list_subscribers s ${whereClause}`,
      params
    );

    params.push(Number(limit), offset);
    const result = await query(
      `SELECT s.*, l.name as list_name
       FROM email_list_subscribers s
       LEFT JOIN email_lists l ON s.list_id = l.id
       ${whereClause}
       ORDER BY s.subscribed_at DESC
       LIMIT $${paramIndex++} OFFSET $${paramIndex}`,
      params
    );

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
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    res.status(500).json({ success: false, message: "Failed to fetch subscribers" });
  }
};

export const addSubscriber = async (req: Request, res: Response) => {
  try {
    const { list_id, email, first_name, last_name, customer_id, custom_fields } = req.body;

    if (!list_id || !email) {
      return res.status(400).json({ success: false, message: "list_id and email are required" });
    }

    // Check if already subscribed
    const existing = await query(
      "SELECT id, status FROM email_list_subscribers WHERE list_id = $1 AND email = $2",
      [list_id, email]
    );

    if (existing.rows.length > 0) {
      if (existing.rows[0].status === 'active') {
        return res.status(400).json({ success: false, message: "Email already subscribed to this list" });
      }
      // Reactivate
      const result = await query(
        `UPDATE email_list_subscribers 
         SET status = 'active', unsubscribed_at = NULL, subscribed_at = CURRENT_TIMESTAMP
         WHERE id = $1
         RETURNING *`,
        [existing.rows[0].id]
      );
      return res.json({ success: true, data: result.rows[0], message: "Subscriber reactivated" });
    }

    const result = await query(
      `INSERT INTO email_list_subscribers (list_id, email, first_name, last_name, customer_id, custom_fields)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [list_id, email, first_name, last_name, customer_id, custom_fields || {}]
    );

    // Update subscriber count
    await updateSubscriberCount(list_id);

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error adding subscriber:", error);
    res.status(500).json({ success: false, message: "Failed to add subscriber" });
  }
};

export const removeSubscriber = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await query(
      `UPDATE email_list_subscribers 
       SET status = 'unsubscribed', unsubscribed_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING list_id`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Subscriber not found" });
    }

    await updateSubscriberCount(result.rows[0].list_id);

    res.json({ success: true, message: "Subscriber removed successfully" });
  } catch (error) {
    console.error("Error removing subscriber:", error);
    res.status(500).json({ success: false, message: "Failed to remove subscriber" });
  }
};

export const bulkAddSubscribers = async (req: Request, res: Response) => {
  try {
    const { list_id, subscribers } = req.body;

    if (!list_id || !subscribers || !Array.isArray(subscribers)) {
      return res.status(400).json({ success: false, message: "list_id and subscribers array are required" });
    }

    let added = 0;
    let skipped = 0;
    const errors: any[] = [];

    for (const sub of subscribers) {
      try {
        if (!sub.email) {
          errors.push({ email: sub.email, error: "Email is required" });
          continue;
        }

        const existing = await query(
          "SELECT id FROM email_list_subscribers WHERE list_id = $1 AND email = $2",
          [list_id, sub.email]
        );

        if (existing.rows.length > 0) {
          skipped++;
          continue;
        }

        await query(
          `INSERT INTO email_list_subscribers (list_id, email, first_name, last_name, custom_fields)
           VALUES ($1, $2, $3, $4, $5)`,
          [list_id, sub.email, sub.first_name, sub.last_name, sub.custom_fields || {}]
        );
        added++;
      } catch (err: any) {
        errors.push({ email: sub.email, error: err.message });
      }
    }

    await updateSubscriberCount(list_id);

    res.json({
      success: true,
      data: { added, skipped, errors: errors.length },
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Error bulk adding subscribers:", error);
    res.status(500).json({ success: false, message: "Failed to bulk add subscribers" });
  }
};

// =====================================================
// EMAIL TEMPLATES
// =====================================================

export const getEmailTemplates = async (req: Request, res: Response) => {
  try {
    const { category, search } = req.query;

    let whereClause = "WHERE t.is_active = true";
    const params: any[] = [];
    let paramIndex = 1;

    if (category) {
      whereClause += ` AND t.category = $${paramIndex++}`;
      params.push(category);
    }

    if (search) {
      whereClause += ` AND (t.name ILIKE $${paramIndex} OR t.subject ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    const result = await query(
      `SELECT t.*, u.email as created_by_email
       FROM email_templates t
       LEFT JOIN users u ON t.created_by = u.id
       ${whereClause}
       ORDER BY t.updated_at DESC`,
      params
    );

    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error fetching email templates:", error);
    res.status(500).json({ success: false, message: "Failed to fetch email templates" });
  }
};

export const getEmailTemplate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await query(
      `SELECT t.*, u.email as created_by_email
       FROM email_templates t
       LEFT JOIN users u ON t.created_by = u.id
       WHERE t.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Template not found" });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error fetching email template:", error);
    res.status(500).json({ success: false, message: "Failed to fetch email template" });
  }
};

export const createEmailTemplate = async (req: Request, res: Response) => {
  try {
    const { name, subject, html_content, text_content, variables, category } = req.body;
    const userId = (req as any).userId;

    if (!name || !subject || !html_content) {
      return res.status(400).json({ success: false, message: "name, subject, and html_content are required" });
    }

    const result = await query(
      `INSERT INTO email_templates (name, subject, html_content, text_content, variables, category, created_by, updated_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $7)
       RETURNING *`,
      [name, subject, html_content, text_content, variables || [], category, userId]
    );

    await createAuditLog(userId, "create", "email_template", result.rows[0].id, null, result.rows[0], req);

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error creating email template:", error);
    res.status(500).json({ success: false, message: "Failed to create email template" });
  }
};

export const updateEmailTemplate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, subject, html_content, text_content, variables, category, is_active } = req.body;
    const userId = (req as any).userId;

    const oldResult = await query("SELECT * FROM email_templates WHERE id = $1", [id]);
    if (oldResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Template not found" });
    }

    const result = await query(
      `UPDATE email_templates 
       SET name = COALESCE($1, name),
           subject = COALESCE($2, subject),
           html_content = COALESCE($3, html_content),
           text_content = COALESCE($4, text_content),
           variables = COALESCE($5, variables),
           category = COALESCE($6, category),
           is_active = COALESCE($7, is_active),
           updated_by = $8,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $9
       RETURNING *`,
      [name, subject, html_content, text_content, variables, category, is_active, userId, id]
    );

    await createAuditLog(userId, "update", "email_template", id, oldResult.rows[0], result.rows[0], req);

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error updating email template:", error);
    res.status(500).json({ success: false, message: "Failed to update email template" });
  }
};

export const deleteEmailTemplate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    const oldResult = await query("SELECT * FROM email_templates WHERE id = $1", [id]);
    if (oldResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Template not found" });
    }

    await query("DELETE FROM email_templates WHERE id = $1", [id]);

    await createAuditLog(userId, "delete", "email_template", id, oldResult.rows[0], null, req);

    res.json({ success: true, message: "Template deleted successfully" });
  } catch (error) {
    console.error("Error deleting email template:", error);
    res.status(500).json({ success: false, message: "Failed to delete email template" });
  }
};

// =====================================================
// EMAIL CAMPAIGNS
// =====================================================

export const getEmailCampaigns = async (req: Request, res: Response) => {
  try {
    const { status, list_id, page = 1, limit = 20 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let whereClause = "WHERE 1=1";
    const params: any[] = [];
    let paramIndex = 1;

    if (status) {
      whereClause += ` AND c.status = $${paramIndex++}`;
      params.push(status);
    }

    if (list_id) {
      whereClause += ` AND c.list_id = $${paramIndex++}`;
      params.push(list_id);
    }

    const countResult = await query(
      `SELECT COUNT(*) FROM email_campaigns c ${whereClause}`,
      params
    );

    params.push(Number(limit), offset);
    const result = await query(
      `SELECT c.*, 
        l.name as list_name,
        t.name as template_name,
        u.email as created_by_email
       FROM email_campaigns c
       LEFT JOIN email_lists l ON c.list_id = l.id
       LEFT JOIN email_templates t ON c.template_id = t.id
       LEFT JOIN users u ON c.created_by = u.id
       ${whereClause}
       ORDER BY c.updated_at DESC
       LIMIT $${paramIndex++} OFFSET $${paramIndex}`,
      params
    );

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
  } catch (error) {
    console.error("Error fetching email campaigns:", error);
    res.status(500).json({ success: false, message: "Failed to fetch email campaigns" });
  }
};

export const getEmailCampaign = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await query(
      `SELECT c.*, 
        l.name as list_name,
        t.name as template_name,
        u.email as created_by_email
       FROM email_campaigns c
       LEFT JOIN email_lists l ON c.list_id = l.id
       LEFT JOIN email_templates t ON c.template_id = t.id
       LEFT JOIN users u ON c.created_by = u.id
       WHERE c.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Campaign not found" });
    }

    // Get send stats
    const statsResult = await query(
      `SELECT status, COUNT(*) as count
       FROM email_send_log
       WHERE campaign_id = $1
       GROUP BY status`,
      [id]
    );

    res.json({
      success: true,
      data: {
        ...result.rows[0],
        sendStats: statsResult.rows,
      },
    });
  } catch (error) {
    console.error("Error fetching email campaign:", error);
    res.status(500).json({ success: false, message: "Failed to fetch email campaign" });
  }
};

export const createEmailCampaign = async (req: Request, res: Response) => {
  try {
    const { name, subject, template_id, list_id, html_content, text_content, scheduled_at } = req.body;
    const userId = (req as any).userId;

    if (!name || !subject || !list_id || !html_content) {
      return res.status(400).json({ success: false, message: "name, subject, list_id, and html_content are required" });
    }

    // Get subscriber count
    const subscriberCount = await query(
      "SELECT COUNT(*) FROM email_list_subscribers WHERE list_id = $1 AND status = 'active'",
      [list_id]
    );

    const result = await query(
      `INSERT INTO email_campaigns (name, subject, template_id, list_id, html_content, text_content, scheduled_at, total_recipients, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [name, subject, template_id, list_id, html_content, text_content, scheduled_at, parseInt(subscriberCount.rows[0].count), userId]
    );

    await createAuditLog(userId, "create", "email_campaign", result.rows[0].id, null, result.rows[0], req);

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error creating email campaign:", error);
    res.status(500).json({ success: false, message: "Failed to create email campaign" });
  }
};

export const updateEmailCampaign = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, subject, template_id, list_id, html_content, text_content, scheduled_at, status } = req.body;
    const userId = (req as any).userId;

    const oldResult = await query("SELECT * FROM email_campaigns WHERE id = $1", [id]);
    if (oldResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Campaign not found" });
    }

    // Don't allow editing sent campaigns
    if (oldResult.rows[0].status === 'sent') {
      return res.status(400).json({ success: false, message: "Cannot edit a sent campaign" });
    }

    const result = await query(
      `UPDATE email_campaigns 
       SET name = COALESCE($1, name),
           subject = COALESCE($2, subject),
           template_id = COALESCE($3, template_id),
           list_id = COALESCE($4, list_id),
           html_content = COALESCE($5, html_content),
           text_content = COALESCE($6, text_content),
           scheduled_at = COALESCE($7, scheduled_at),
           status = COALESCE($8, status),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $9
       RETURNING *`,
      [name, subject, template_id, list_id, html_content, text_content, scheduled_at, status, id]
    );

    await createAuditLog(userId, "update", "email_campaign", id, oldResult.rows[0], result.rows[0], req);

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error updating email campaign:", error);
    res.status(500).json({ success: false, message: "Failed to update email campaign" });
  }
};

export const deleteEmailCampaign = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    const oldResult = await query("SELECT * FROM email_campaigns WHERE id = $1", [id]);
    if (oldResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Campaign not found" });
    }

    await query("DELETE FROM email_campaigns WHERE id = $1", [id]);

    await createAuditLog(userId, "delete", "email_campaign", id, oldResult.rows[0], null, req);

    res.json({ success: true, message: "Campaign deleted successfully" });
  } catch (error) {
    console.error("Error deleting email campaign:", error);
    res.status(500).json({ success: false, message: "Failed to delete email campaign" });
  }
};

// =====================================================
// EMAIL SENDING
// =====================================================

export const sendCampaign = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    const campaignResult = await query("SELECT * FROM email_campaigns WHERE id = $1", [id]);
    if (campaignResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Campaign not found" });
    }

    const campaign = campaignResult.rows[0];

    if (campaign.status === 'sent') {
      return res.status(400).json({ success: false, message: "Campaign already sent" });
    }

    if (campaign.status === 'sending') {
      return res.status(400).json({ success: false, message: "Campaign is already being sent" });
    }

    // Update status to sending
    await query("UPDATE email_campaigns SET status = 'sending' WHERE id = $1", [id]);

    // Get subscribers
    const subscribersResult = await query(
      `SELECT * FROM email_list_subscribers 
       WHERE list_id = $1 AND status = 'active'`,
      [campaign.list_id]
    );

    // Create send log entries
    for (const subscriber of subscribersResult.rows) {
      await query(
        `INSERT INTO email_send_log (campaign_id, subscriber_id, email, status)
         VALUES ($1, $2, $3, 'pending')`,
        [id, subscriber.id, subscriber.email]
      );
    }

    // Start sending in background
    sendEmailsInBackground(id, campaign, subscribersResult.rows);

    await createAuditLog(userId, "send_email", "email_campaign", id, null, { status: 'sending' }, req);

    res.json({ success: true, message: "Campaign sending started", totalRecipients: subscribersResult.rows.length });
  } catch (error) {
    console.error("Error sending campaign:", error);
    res.status(500).json({ success: false, message: "Failed to send campaign" });
  }
};

export const sendTestEmail = async (req: Request, res: Response) => {
  try {
    const { campaign_id, test_email } = req.body;

    if (!campaign_id || !test_email) {
      return res.status(400).json({ success: false, message: "campaign_id and test_email are required" });
    }

    const campaignResult = await query("SELECT * FROM email_campaigns WHERE id = $1", [campaign_id]);
    if (campaignResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Campaign not found" });
    }

    const campaign = campaignResult.rows[0];

    // Send test email
    const transporter = createTransporter();
    const html = replaceVariables(campaign.html_content, {
      first_name: 'Test',
      last_name: 'User',
      email: test_email,
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@drivepixel.com',
      to: test_email,
      subject: `[TEST] ${campaign.subject}`,
      html: html,
      text: campaign.text_content,
    });

    res.json({ success: true, message: "Test email sent successfully" });
  } catch (error) {
    console.error("Error sending test email:", error);
    res.status(500).json({ success: false, message: "Failed to send test email" });
  }
};

// =====================================================
// EMAIL TRACKING
// =====================================================

export const trackEmailOpen = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await query(
      `UPDATE email_send_log 
       SET status = 'opened', opened_at = CURRENT_TIMESTAMP
       WHERE id = $1 AND opened_at IS NULL`,
      [id]
    );

    // Update campaign open count
    const logResult = await query("SELECT campaign_id FROM email_send_log WHERE id = $1", [id]);
    if (logResult.rows.length > 0) {
      await query(
        "UPDATE email_campaigns SET open_count = open_count + 1 WHERE id = $1",
        [logResult.rows[0].campaign_id]
      );
    }

    // Return 1x1 transparent pixel
    const pixel = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
    res.writeHead(200, {
      'Content-Type': 'image/gif',
      'Content-Length': pixel.length,
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    });
    res.end(pixel);
  } catch (error) {
    console.error("Error tracking email open:", error);
    res.status(200).end();
  }
};

export const trackEmailClick = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ success: false, message: "URL is required" });
    }

    // Log click
    await query(
      `INSERT INTO email_click_tracking (send_log_id, url, ip_address, user_agent)
       VALUES ($1, $2, $3, $4)`,
      [id, url, req.ip, req.headers['user-agent']]
    );

    // Update send log
    await query(
      `UPDATE email_send_log 
       SET status = 'clicked', clicked_at = CURRENT_TIMESTAMP
       WHERE id = $1`,
      [id]
    );

    // Update campaign click count
    const logResult = await query("SELECT campaign_id FROM email_send_log WHERE id = $1", [id]);
    if (logResult.rows.length > 0) {
      await query(
        "UPDATE email_campaigns SET click_count = click_count + 1 WHERE id = $1",
        [logResult.rows[0].campaign_id]
      );
    }

    // Redirect to original URL
    res.redirect(url as string);
  } catch (error) {
    console.error("Error tracking email click:", error);
    res.redirect(req.query.url as string || '/');
  }
};

export const unsubscribe = async (req: Request, res: Response) => {
  try {
    const { email, list_id, campaign_id } = req.query;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    // Update subscriber status
    if (list_id) {
      await query(
        `UPDATE email_list_subscribers 
         SET status = 'unsubscribed', unsubscribed_at = CURRENT_TIMESTAMP
         WHERE email = $1 AND list_id = $2`,
        [email, list_id]
      );
    } else {
      // Unsubscribe from all lists
      await query(
        `UPDATE email_list_subscribers 
         SET status = 'unsubscribed', unsubscribed_at = CURRENT_TIMESTAMP
         WHERE email = $1`,
        [email]
      );
    }

    // Log unsubscribe
    await query(
      `INSERT INTO email_unsubscribes (email, list_id, campaign_id)
       VALUES ($1, $2, $3)`,
      [email, list_id || null, campaign_id || null]
    );

    // Update campaign unsubscribe count
    if (campaign_id) {
      await query(
        "UPDATE email_campaigns SET unsubscribe_count = unsubscribe_count + 1 WHERE id = $1",
        [campaign_id]
      );
    }

    res.json({ success: true, message: "You have been unsubscribed successfully" });
  } catch (error) {
    console.error("Error processing unsubscribe:", error);
    res.status(500).json({ success: false, message: "Failed to process unsubscribe" });
  }
};

// =====================================================
// EMAIL STATISTICS
// =====================================================

export const getEmailStats = async (req: Request, res: Response) => {
  try {
    // Overall stats
    const overallStats = await query(`
      SELECT 
        (SELECT COUNT(*) FROM email_lists WHERE is_active = true) as total_lists,
        (SELECT COUNT(*) FROM email_list_subscribers WHERE status = 'active') as total_subscribers,
        (SELECT COUNT(*) FROM email_templates WHERE is_active = true) as total_templates,
        (SELECT COUNT(*) FROM email_campaigns) as total_campaigns,
        (SELECT COUNT(*) FROM email_campaigns WHERE status = 'sent') as sent_campaigns
    `);

    // Recent campaigns performance
    const recentCampaigns = await query(`
      SELECT id, name, subject, status, total_recipients, sent_count, open_count, click_count, sent_at
      FROM email_campaigns
      WHERE status = 'sent'
      ORDER BY sent_at DESC
      LIMIT 10
    `);

    // Subscriber growth (last 30 days)
    const subscriberGrowth = await query(`
      SELECT DATE(subscribed_at) as date, COUNT(*) as count
      FROM email_list_subscribers
      WHERE subscribed_at >= CURRENT_DATE - INTERVAL '30 days'
      GROUP BY DATE(subscribed_at)
      ORDER BY date
    `);

    res.json({
      success: true,
      data: {
        overview: overallStats.rows[0],
        recentCampaigns: recentCampaigns.rows,
        subscriberGrowth: subscriberGrowth.rows,
      },
    });
  } catch (error) {
    console.error("Error fetching email stats:", error);
    res.status(500).json({ success: false, message: "Failed to fetch email stats" });
  }
};

// =====================================================
// HELPER FUNCTIONS
// =====================================================

async function updateSubscriberCount(listId: string) {
  try {
    const result = await query(
      "SELECT COUNT(*) FROM email_list_subscribers WHERE list_id = $1 AND status = 'active'",
      [listId]
    );
    await query(
      "UPDATE email_lists SET subscriber_count = $1 WHERE id = $2",
      [parseInt(result.rows[0].count), listId]
    );
  } catch (error) {
    console.error("Error updating subscriber count:", error);
  }
}

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.office365.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function replaceVariables(content: string, data: Record<string, any>): string {
  let result = content;
  for (const [key, value] of Object.entries(data)) {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'gi');
    result = result.replace(regex, value || '');
  }
  return result;
}

async function sendEmailsInBackground(campaignId: string, campaign: any, subscribers: any[]) {
  const transporter = createTransporter();
  let sentCount = 0;
  let bounceCount = 0;

  // Rate limiting: 10 emails per second
  const RATE_LIMIT = 10;
  const DELAY = 1000 / RATE_LIMIT;

  for (const subscriber of subscribers) {
    try {
      const html = replaceVariables(campaign.html_content, {
        first_name: subscriber.first_name || '',
        last_name: subscriber.last_name || '',
        email: subscriber.email,
        ...subscriber.custom_fields,
      });

      // Add tracking pixel
      const sendLogResult = await query(
        "SELECT id FROM email_send_log WHERE campaign_id = $1 AND subscriber_id = $2",
        [campaignId, subscriber.id]
      );
      const sendLogId = sendLogResult.rows[0]?.id;

      const trackingPixel = sendLogId 
        ? `<img src="${process.env.API_URL}/api/email/track/open/${sendLogId}" width="1" height="1" style="display:none" />`
        : '';

      const htmlWithTracking = html + trackingPixel;

      await transporter.sendMail({
        from: process.env.SMTP_FROM || 'noreply@drivepixel.com',
        to: subscriber.email,
        subject: campaign.subject,
        html: htmlWithTracking,
        text: campaign.text_content,
      });

      // Update send log
      await query(
        "UPDATE email_send_log SET status = 'sent', sent_at = CURRENT_TIMESTAMP WHERE id = $1",
        [sendLogId]
      );

      sentCount++;

      // Rate limiting delay
      await new Promise(resolve => setTimeout(resolve, DELAY));
    } catch (error: any) {
      console.error(`Error sending to ${subscriber.email}:`, error);
      
      // Update send log with error
      await query(
        `UPDATE email_send_log SET status = 'failed', error_message = $1 WHERE campaign_id = $2 AND subscriber_id = $3`,
        [error.message, campaignId, subscriber.id]
      );

      if (error.responseCode === 550 || error.responseCode === 551) {
        bounceCount++;
        // Mark subscriber as bounced
        await query(
          "UPDATE email_list_subscribers SET status = 'bounced' WHERE id = $1",
          [subscriber.id]
        );
      }
    }
  }

  // Update campaign status
  await query(
    `UPDATE email_campaigns 
     SET status = 'sent', sent_at = CURRENT_TIMESTAMP, sent_count = $1, bounce_count = $2
     WHERE id = $3`,
    [sentCount, bounceCount, campaignId]
  );
}
