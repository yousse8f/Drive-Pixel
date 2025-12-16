import { Request, Response } from "express";
import { query } from "../config/database";
import { errorResponse, successResponse } from "../utils/apiResponse";

export const listChatSessions = async (req: Request, res: Response) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 20, 100);
    const page = Math.max(Number(req.query.page) || 1, 1);
    const offset = (page - 1) * limit;
    const emailFilter = req.query.email ? String(req.query.email).toLowerCase() : null;
    const dateFrom = req.query.dateFrom ? String(req.query.dateFrom) : null;
    const dateTo = req.query.dateTo ? String(req.query.dateTo) : null;

    const filters: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    if (emailFilter) {
      filters.push(`LOWER(cs.email) LIKE $${paramIndex++}`);
      params.push(`%${emailFilter}%`);
    }
    if (dateFrom) {
      filters.push(`cs.created_at >= $${paramIndex++}`);
      params.push(dateFrom);
    }
    if (dateTo) {
      filters.push(`cs.created_at <= $${paramIndex++}`);
      params.push(dateTo);
    }

    const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";

    const sessionsQuery = `
      SELECT
        cs.id,
        cs.name,
        cs.email,
        cs.ip_address,
        cs.initial_email_sent,
        cs.email_sent_status,
        cs.email_sent_at,
        cs.last_activity,
        cs.created_at,
        (
          SELECT message FROM chat_messages
          WHERE session_id = cs.id
          ORDER BY created_at DESC
          LIMIT 1
        ) AS last_message,
        (
          SELECT status FROM chat_email_logs
          WHERE session_id = cs.id
          ORDER BY created_at DESC
          LIMIT 1
        ) AS last_email_status,
        (
          SELECT created_at FROM chat_email_logs
          WHERE session_id = cs.id
          ORDER BY created_at DESC
          LIMIT 1
        ) AS last_email_at
      FROM chat_sessions cs
      ${whereClause}
      ORDER BY cs.created_at DESC
      LIMIT ${limit} OFFSET ${offset};
    `;

    const countQuery = `SELECT COUNT(*) FROM chat_sessions cs ${whereClause};`;

    const [sessionsResult, countResult] = await Promise.all([
      query(sessionsQuery, params),
      query(countQuery, params),
    ]);

    const total = Number(countResult.rows[0]?.count || 0);

    return res.json(
      successResponse("Chat sessions retrieved", {
        sessions: sessionsResult.rows,
        pagination: { page, limit, total },
      })
    );
  } catch (error: any) {
    return res.status(500).json(errorResponse("Failed to load chat sessions", error.message));
  }
};

export const listChatMessages = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const messagesResult = await query(
      `SELECT id, sender, message, page_url, created_at
       FROM chat_messages
       WHERE session_id = $1
       ORDER BY created_at ASC`,
      [id]
    );
    return res.json(successResponse("Chat messages retrieved", messagesResult.rows));
  } catch (error: any) {
    return res.status(500).json(errorResponse("Failed to load chat messages", error.message));
  }
};
