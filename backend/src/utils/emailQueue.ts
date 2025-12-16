import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { query } from "../config/database";

dotenv.config();

type EmailJob = {
  sessionId: string;
  to: string;
  name?: string | null;
  ipAddress?: string | null;
};

const queue: EmailJob[] = [];
let workerStarted = false;

const transporter =
  process.env.SMTP_HOST && process.env.SMTP_USER
    ? nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })
    : null;

export const enqueueThankYouEmail = async (job: EmailJob) => {
  if (!job.to) return;
  queue.push(job);
  if (!workerStarted) startWorker();
};

const startWorker = () => {
  workerStarted = true;
  setInterval(processQueue, 3000).unref();
};

const processQueue = async () => {
  if (!transporter) return;
  const job = queue.shift();
  if (!job) return;

  const { sessionId, to, name, ipAddress } = job;

  try {
    // Double-check not sent already
    const session = await query(
      "SELECT email_sent_status FROM chat_sessions WHERE id = $1",
      [sessionId]
    );
    const status = session.rows[0]?.email_sent_status;
    if (status === "sent") return;

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject: "Thank you for contacting DrivePixel",
      text: `Hello${name ? ` ${name}` : ""},\n\nThank you for reaching out. Our team will follow up shortly.\n\nSession: ${sessionId}\nIP: ${ipAddress || "unknown"}\n\nDrivePixel`,
      html: `<p>Hello${name ? ` ${name}` : ""},</p><p>Thank you for reaching out. Our team will follow up shortly.</p><p><strong>Session:</strong> ${sessionId}<br/><strong>IP:</strong> ${ipAddress || "unknown"}</p><p>DrivePixel</p>`,
    });

    await query(
      "UPDATE chat_sessions SET email_sent_status = 'sent', email_sent_at = CURRENT_TIMESTAMP, email_error = NULL WHERE id = $1",
      [sessionId]
    );
    await query(
      "INSERT INTO chat_email_logs (session_id, status) VALUES ($1, 'sent')",
      [sessionId]
    );
  } catch (error: any) {
    await query(
      "UPDATE chat_sessions SET email_sent_status = 'failed', email_error = $2 WHERE id = $1",
      [sessionId, error?.message || "send failed"]
    );
    await query(
      "INSERT INTO chat_email_logs (session_id, status, error) VALUES ($1, 'failed', $2)",
      [sessionId, error?.message || "send failed"]
    );
  }
};
