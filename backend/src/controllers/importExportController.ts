import { Request, Response } from "express";
import { query } from "../config/database";
import { createAuditLog } from "../utils/auditLogger";
import * as fs from "fs";
import * as path from "path";

// =====================================================
// IMPORT FUNCTIONS
// =====================================================

export const importContacts = async (req: Request, res: Response) => {
  try {
    const { data, type, list_id } = req.body;
    const userId = (req as any).userId;

    if (!data || !Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ success: false, message: "Data array is required" });
    }

    if (!type || !['customers', 'subscribers'].includes(type)) {
      return res.status(400).json({ success: false, message: "Type must be 'customers' or 'subscribers'" });
    }

    if (type === 'subscribers' && !list_id) {
      return res.status(400).json({ success: false, message: "list_id is required for subscriber import" });
    }

    // Create import job
    const jobResult = await query(
      `INSERT INTO import_jobs (type, file_name, total_rows, created_by, status, started_at)
       VALUES ($1, $2, $3, $4, 'processing', CURRENT_TIMESTAMP)
       RETURNING *`,
      [type, 'api_import', data.length, userId]
    );

    const jobId = jobResult.rows[0].id;

    let successCount = 0;
    let errorCount = 0;
    const errors: any[] = [];

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      try {
        if (type === 'customers') {
          await importCustomerRow(row);
        } else {
          await importSubscriberRow(row, list_id);
        }
        successCount++;
      } catch (err: any) {
        errorCount++;
        errors.push({ row: i + 1, email: row.email, error: err.message });
      }

      // Update progress every 100 rows
      if (i % 100 === 0) {
        await query(
          "UPDATE import_jobs SET processed_rows = $1 WHERE id = $2",
          [i + 1, jobId]
        );
      }
    }

    // Complete job
    await query(
      `UPDATE import_jobs 
       SET status = 'completed', processed_rows = $1, success_count = $2, error_count = $3, errors = $4, completed_at = CURRENT_TIMESTAMP
       WHERE id = $5`,
      [data.length, successCount, errorCount, JSON.stringify(errors.slice(0, 100)), jobId]
    );

    await createAuditLog(userId, "import", type, jobId, null, { successCount, errorCount }, req);

    res.json({
      success: true,
      data: {
        jobId,
        totalRows: data.length,
        successCount,
        errorCount,
        errors: errors.slice(0, 20),
      },
    });
  } catch (error) {
    console.error("Error importing contacts:", error);
    res.status(500).json({ success: false, message: "Failed to import contacts" });
  }
};

export const getImportJobs = async (req: Request, res: Response) => {
  try {
    const { type, status, page = 1, limit = 20 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let whereClause = "WHERE 1=1";
    const params: any[] = [];
    let paramIndex = 1;

    if (type) {
      whereClause += ` AND j.type = $${paramIndex++}`;
      params.push(type);
    }

    if (status) {
      whereClause += ` AND j.status = $${paramIndex++}`;
      params.push(status);
    }

    params.push(Number(limit), offset);
    const result = await query(
      `SELECT j.*, u.email as created_by_email
       FROM import_jobs j
       LEFT JOIN users u ON j.created_by = u.id
       ${whereClause}
       ORDER BY j.created_at DESC
       LIMIT $${paramIndex++} OFFSET $${paramIndex}`,
      params
    );

    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error fetching import jobs:", error);
    res.status(500).json({ success: false, message: "Failed to fetch import jobs" });
  }
};

export const getImportJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await query(
      `SELECT j.*, u.email as created_by_email
       FROM import_jobs j
       LEFT JOIN users u ON j.created_by = u.id
       WHERE j.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Import job not found" });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error fetching import job:", error);
    res.status(500).json({ success: false, message: "Failed to fetch import job" });
  }
};

// =====================================================
// EXPORT FUNCTIONS
// =====================================================

export const exportData = async (req: Request, res: Response) => {
  try {
    const { type, filters, format = 'csv' } = req.body;
    const userId = (req as any).userId;

    if (!type || !['customers', 'leads', 'subscribers', 'deals'].includes(type)) {
      return res.status(400).json({ success: false, message: "Invalid export type" });
    }

    // Create export job
    const jobResult = await query(
      `INSERT INTO export_jobs (type, filters, created_by, status, started_at)
       VALUES ($1, $2, $3, 'processing', CURRENT_TIMESTAMP)
       RETURNING *`,
      [type, filters || {}, userId]
    );

    const jobId = jobResult.rows[0].id;

    // Get data based on type
    let data: any[] = [];
    let headers: string[] = [];

    switch (type) {
      case 'customers':
        const customersResult = await getCustomersForExport(filters);
        data = customersResult.rows;
        headers = ['id', 'first_name', 'last_name', 'email', 'phone', 'company', 'status', 'source', 'created_at'];
        break;
      case 'leads':
        const leadsResult = await getLeadsForExport(filters);
        data = leadsResult.rows;
        headers = ['id', 'name', 'email', 'phone', 'status', 'created_at'];
        break;
      case 'subscribers':
        const subscribersResult = await getSubscribersForExport(filters);
        data = subscribersResult.rows;
        headers = ['email', 'first_name', 'last_name', 'status', 'list_name', 'subscribed_at'];
        break;
      case 'deals':
        const dealsResult = await getDealsForExport(filters);
        data = dealsResult.rows;
        headers = ['id', 'title', 'customer_name', 'value', 'stage', 'status', 'created_at'];
        break;
    }

    // Generate file content
    let fileContent: string;
    let contentType: string;
    let fileExtension: string;

    if (format === 'csv') {
      fileContent = generateCSV(headers, data);
      contentType = 'text/csv';
      fileExtension = 'csv';
    } else {
      // For Excel, generate CSV that Excel can open
      fileContent = generateCSV(headers, data, true);
      contentType = 'text/csv';
      fileExtension = 'csv';
    }

    // Save file
    const fileName = `export_${type}_${Date.now()}.${fileExtension}`;
    const exportDir = path.join(__dirname, '../../exports');
    
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }

    const filePath = path.join(exportDir, fileName);
    fs.writeFileSync(filePath, fileContent, 'utf8');

    // Update job
    await query(
      `UPDATE export_jobs 
       SET status = 'completed', file_path = $1, file_size = $2, row_count = $3, completed_at = CURRENT_TIMESTAMP, expires_at = CURRENT_TIMESTAMP + INTERVAL '7 days'
       WHERE id = $4`,
      [fileName, Buffer.byteLength(fileContent, 'utf8'), data.length, jobId]
    );

    await createAuditLog(userId, "export", type, jobId, null, { rowCount: data.length }, req);

    res.json({
      success: true,
      data: {
        jobId,
        fileName,
        rowCount: data.length,
        downloadUrl: `/api/admin/export/download/${jobId}`,
      },
    });
  } catch (error) {
    console.error("Error exporting data:", error);
    res.status(500).json({ success: false, message: "Failed to export data" });
  }
};

export const downloadExport = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await query("SELECT * FROM export_jobs WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Export not found" });
    }

    const job = result.rows[0];

    if (job.status !== 'completed') {
      return res.status(400).json({ success: false, message: "Export not ready" });
    }

    if (new Date(job.expires_at) < new Date()) {
      return res.status(400).json({ success: false, message: "Export has expired" });
    }

    const filePath = path.join(__dirname, '../../exports', job.file_path);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: "Export file not found" });
    }

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${job.file_path}"`);
    res.sendFile(filePath);
  } catch (error) {
    console.error("Error downloading export:", error);
    res.status(500).json({ success: false, message: "Failed to download export" });
  }
};

export const getExportJobs = async (req: Request, res: Response) => {
  try {
    const { type, status, page = 1, limit = 20 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let whereClause = "WHERE 1=1";
    const params: any[] = [];
    let paramIndex = 1;

    if (type) {
      whereClause += ` AND j.type = $${paramIndex++}`;
      params.push(type);
    }

    if (status) {
      whereClause += ` AND j.status = $${paramIndex++}`;
      params.push(status);
    }

    params.push(Number(limit), offset);
    const result = await query(
      `SELECT j.*, u.email as created_by_email
       FROM export_jobs j
       LEFT JOIN users u ON j.created_by = u.id
       ${whereClause}
       ORDER BY j.created_at DESC
       LIMIT $${paramIndex++} OFFSET $${paramIndex}`,
      params
    );

    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error fetching export jobs:", error);
    res.status(500).json({ success: false, message: "Failed to fetch export jobs" });
  }
};

// =====================================================
// EMAIL CAMPAIGN REPORT EXPORT
// =====================================================

export const exportCampaignReport = async (req: Request, res: Response) => {
  try {
    const { campaign_id } = req.params;
    const userId = (req as any).userId;

    // Get campaign details
    const campaignResult = await query(
      `SELECT c.*, l.name as list_name
       FROM email_campaigns c
       LEFT JOIN email_lists l ON c.list_id = l.id
       WHERE c.id = $1`,
      [campaign_id]
    );

    if (campaignResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Campaign not found" });
    }

    const campaign = campaignResult.rows[0];

    // Get send log details
    const sendLogResult = await query(
      `SELECT s.email, s.status, s.sent_at, s.opened_at, s.clicked_at, s.error_message,
        sub.first_name, sub.last_name
       FROM email_send_log s
       LEFT JOIN email_list_subscribers sub ON s.subscriber_id = sub.id
       WHERE s.campaign_id = $1
       ORDER BY s.sent_at`,
      [campaign_id]
    );

    const headers = ['email', 'first_name', 'last_name', 'status', 'sent_at', 'opened_at', 'clicked_at', 'error'];
    const fileContent = generateCSV(headers, sendLogResult.rows.map(row => ({
      email: row.email,
      first_name: row.first_name || '',
      last_name: row.last_name || '',
      status: row.status,
      sent_at: row.sent_at ? new Date(row.sent_at).toISOString() : '',
      opened_at: row.opened_at ? new Date(row.opened_at).toISOString() : '',
      clicked_at: row.clicked_at ? new Date(row.clicked_at).toISOString() : '',
      error: row.error_message || '',
    })), true);

    const fileName = `campaign_report_${campaign.name.replace(/[^a-z0-9]/gi, '_')}_${Date.now()}.csv`;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.send(fileContent);

    await createAuditLog(userId, "export", "email_campaign_report", campaign_id, null, { rowCount: sendLogResult.rows.length }, req);
  } catch (error) {
    console.error("Error exporting campaign report:", error);
    res.status(500).json({ success: false, message: "Failed to export campaign report" });
  }
};

// =====================================================
// HELPER FUNCTIONS
// =====================================================

async function importCustomerRow(row: any) {
  if (!row.email) {
    throw new Error("Email is required");
  }

  // Check if customer exists
  const existing = await query("SELECT id FROM crm_customers WHERE email = $1", [row.email]);
  
  if (existing.rows.length > 0) {
    // Update existing
    await query(
      `UPDATE crm_customers 
       SET first_name = COALESCE($1, first_name),
           last_name = COALESCE($2, last_name),
           phone = COALESCE($3, phone),
           company = COALESCE($4, company),
           updated_at = CURRENT_TIMESTAMP
       WHERE email = $5`,
      [row.first_name, row.last_name, row.phone, row.company, row.email]
    );
  } else {
    // Insert new
    await query(
      `INSERT INTO crm_customers (first_name, last_name, email, phone, company, source, status)
       VALUES ($1, $2, $3, $4, $5, 'import', 'new')`,
      [row.first_name || row.name || '', row.last_name || '', row.email, row.phone, row.company]
    );
  }
}

async function importSubscriberRow(row: any, listId: string) {
  if (!row.email) {
    throw new Error("Email is required");
  }

  // Check if subscriber exists in this list
  const existing = await query(
    "SELECT id FROM email_list_subscribers WHERE list_id = $1 AND email = $2",
    [listId, row.email]
  );

  if (existing.rows.length > 0) {
    // Update existing
    await query(
      `UPDATE email_list_subscribers 
       SET first_name = COALESCE($1, first_name),
           last_name = COALESCE($2, last_name),
           status = 'active'
       WHERE list_id = $3 AND email = $4`,
      [row.first_name, row.last_name, listId, row.email]
    );
  } else {
    // Insert new
    await query(
      `INSERT INTO email_list_subscribers (list_id, email, first_name, last_name)
       VALUES ($1, $2, $3, $4)`,
      [listId, row.email, row.first_name || '', row.last_name || '']
    );
  }
}

async function getCustomersForExport(filters: any) {
  let whereClause = "WHERE 1=1";
  const params: any[] = [];
  let paramIndex = 1;

  if (filters?.status) {
    whereClause += ` AND status = $${paramIndex++}`;
    params.push(filters.status);
  }

  if (filters?.source) {
    whereClause += ` AND source = $${paramIndex++}`;
    params.push(filters.source);
  }

  if (filters?.dateFrom) {
    whereClause += ` AND created_at >= $${paramIndex++}`;
    params.push(filters.dateFrom);
  }

  if (filters?.dateTo) {
    whereClause += ` AND created_at <= $${paramIndex++}`;
    params.push(filters.dateTo);
  }

  return query(
    `SELECT id, first_name, last_name, email, phone, company, status, source, created_at
     FROM crm_customers
     ${whereClause}
     ORDER BY created_at DESC`,
    params
  );
}

async function getLeadsForExport(filters: any) {
  let whereClause = "WHERE 1=1";
  const params: any[] = [];
  let paramIndex = 1;

  if (filters?.status) {
    whereClause += ` AND status = $${paramIndex++}`;
    params.push(filters.status);
  }

  if (filters?.dateFrom) {
    whereClause += ` AND created_at >= $${paramIndex++}`;
    params.push(filters.dateFrom);
  }

  if (filters?.dateTo) {
    whereClause += ` AND created_at <= $${paramIndex++}`;
    params.push(filters.dateTo);
  }

  return query(
    `SELECT id, name, email, phone, status, created_at
     FROM leads
     ${whereClause}
     ORDER BY created_at DESC`,
    params
  );
}

async function getSubscribersForExport(filters: any) {
  let whereClause = "WHERE 1=1";
  const params: any[] = [];
  let paramIndex = 1;

  if (filters?.list_id) {
    whereClause += ` AND s.list_id = $${paramIndex++}`;
    params.push(filters.list_id);
  }

  if (filters?.status) {
    whereClause += ` AND s.status = $${paramIndex++}`;
    params.push(filters.status);
  }

  return query(
    `SELECT s.email, s.first_name, s.last_name, s.status, l.name as list_name, s.subscribed_at
     FROM email_list_subscribers s
     LEFT JOIN email_lists l ON s.list_id = l.id
     ${whereClause}
     ORDER BY s.subscribed_at DESC`,
    params
  );
}

async function getDealsForExport(filters: any) {
  let whereClause = "WHERE 1=1";
  const params: any[] = [];
  let paramIndex = 1;

  if (filters?.status) {
    whereClause += ` AND d.status = $${paramIndex++}`;
    params.push(filters.status);
  }

  if (filters?.stage_id) {
    whereClause += ` AND d.stage_id = $${paramIndex++}`;
    params.push(filters.stage_id);
  }

  return query(
    `SELECT d.id, d.title, 
      CONCAT(c.first_name, ' ', c.last_name) as customer_name,
      d.value, s.name as stage, d.status, d.created_at
     FROM crm_deals d
     LEFT JOIN crm_customers c ON d.customer_id = c.id
     LEFT JOIN crm_pipeline_stages s ON d.stage_id = s.id
     ${whereClause}
     ORDER BY d.created_at DESC`,
    params
  );
}

function generateCSV(headers: string[], data: any[], excelCompatible: boolean = false): string {
  const BOM = excelCompatible ? '\uFEFF' : '';
  const headerRow = headers.join(',');
  
  const dataRows = data.map(row => {
    return headers.map(header => {
      let value = row[header];
      if (value === null || value === undefined) {
        return '';
      }
      if (typeof value === 'object') {
        value = JSON.stringify(value);
      }
      value = String(value);
      // Escape quotes and wrap in quotes if contains comma, quote, or newline
      if (value.includes(',') || value.includes('"') || value.includes('\n')) {
        value = '"' + value.replace(/"/g, '""') + '"';
      }
      return value;
    }).join(',');
  });

  return BOM + [headerRow, ...dataRows].join('\n');
}

// Parse CSV content
export function parseCSV(content: string): any[] {
  const lines = content.split(/\r?\n/).filter(line => line.trim());
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]);
  const data: any[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === headers.length) {
      const row: any = {};
      headers.forEach((header, idx) => {
        row[header.toLowerCase().replace(/\s+/g, '_')] = values[idx];
      });
      data.push(row);
    }
  }

  return data;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        current += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        current += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
  }

  result.push(current.trim());
  return result;
}
