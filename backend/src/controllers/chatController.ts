import { Request, Response } from "express";
import { query } from "../config/database";
import { chatMessageSchema } from "../utils/validation";
import { successResponse, errorResponse } from "../utils/apiResponse";
import { enqueueThankYouEmail } from "../utils/emailQueue";

const sanitizeText = (value?: string | null) =>
  (value || "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .slice(0, 2000);

const getClientIp = (req: Request): string => {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }
  if (Array.isArray(forwarded) && forwarded.length > 0) {
    return forwarded[0];
  }
  return req.socket.remoteAddress || "unknown";
};

export const postChatMessage = async (req: Request, res: Response) => {
  try {
    const validated = chatMessageSchema.parse(req.body);
    const ipAddress = getClientIp(req);
    const userAgent = sanitizeText(req.headers["user-agent"] || "");
    const message = sanitizeText(validated.message);
    const pageUrl = sanitizeText(validated.pageUrl || (req.headers.referer as string));
    const name = sanitizeText(validated.name);
    const email = sanitizeText(validated.email);

    // Ensure message is not empty after sanitization
    if (!message) {
      return res.status(400).json(errorResponse("Message is required"));
    }

    let sessionId = validated.sessionId;
    let sessionInitialEmailSent = false;
    let sessionEmailSentStatus: string | null = null;

    if (sessionId) {
      const existing = await query(
        "SELECT id, initial_email_sent, email_sent_status FROM chat_sessions WHERE id = $1",
        [sessionId]
      );
      if (existing.rowCount === 0) {
        sessionId = undefined; // Create a new session if provided one is invalid
      } else {
        sessionInitialEmailSent = Boolean(existing.rows[0].initial_email_sent);
        sessionEmailSentStatus = existing.rows[0].email_sent_status || null;
      }
    }

    if (!sessionId) {
      const sessionInsert = await query(
        `INSERT INTO chat_sessions (page_url, ip_address, user_agent, name, email) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING id, initial_email_sent, email_sent_status`,
        [pageUrl || null, ipAddress, userAgent || null, name || null, email || null]
      );
      sessionId = sessionInsert.rows[0].id;
      sessionInitialEmailSent = Boolean(sessionInsert.rows[0].initial_email_sent);
      sessionEmailSentStatus = sessionInsert.rows[0].email_sent_status || null;
    } else if (name || email) {
      await query(
        `UPDATE chat_sessions SET 
           name = COALESCE($2, name), 
           email = COALESCE($3, email) 
         WHERE id = $1`,
        [sessionId, name || null, email || null]
      );
    }

    const messageInsert = await query(
      `INSERT INTO chat_messages (session_id, sender, message, page_url) 
       VALUES ($1, $2, $3, $4)
       RETURNING id, created_at`,
      [sessionId, validated.sender, message, pageUrl || null]
    );

    await query(
      `UPDATE chat_sessions SET last_activity = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = $1`,
      [sessionId]
    );

    const finalSessionId = sessionId as string;

    const hasLeadDetails = Boolean(name && email);

    if (hasLeadDetails && !sessionInitialEmailSent) {
      const updated = await query(
        `UPDATE chat_sessions 
         SET initial_email_sent = TRUE, name = COALESCE($2, name), email = COALESCE($3, email) 
         WHERE id = $1 AND initial_email_sent = FALSE 
         RETURNING id`,
        [finalSessionId, name || null, email || null]
      );
      if ((updated?.rowCount || 0) > 0) {
        sessionInitialEmailSent = true;
        enqueueThankYouEmail({ sessionId: finalSessionId, to: email, name, ipAddress });
      }
    }

    // Trigger thank-you email only once per session when completed and email present
    if (validated.sessionComplete && email && !sessionInitialEmailSent && sessionEmailSentStatus !== "sent") {
      const updated = await query(
        `UPDATE chat_sessions 
         SET initial_email_sent = TRUE 
         WHERE id = $1 AND initial_email_sent = FALSE 
         RETURNING id`,
        [finalSessionId]
      );
      if ((updated?.rowCount || 0) > 0) {
        enqueueThankYouEmail({ sessionId: finalSessionId, to: email, name, ipAddress });
      }
    }

    return res.status(201).json(
      successResponse("Message stored", {
        sessionId: finalSessionId,
        messageId: messageInsert.rows[0].id,
        createdAt: messageInsert.rows[0].created_at,
      })
    );
  } catch (error: any) {
    const message = error?.issues?.[0]?.message || error.message || "Validation error";
    return res.status(400).json(errorResponse("Validation error", message));
  }
};
