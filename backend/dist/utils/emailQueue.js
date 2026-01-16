"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enqueueThankYouEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("../config/database");
dotenv_1.default.config();
const queue = [];
let workerStarted = false;
const transporter = process.env.SMTP_HOST && process.env.SMTP_USER
    ? nodemailer_1.default.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    })
    : null;
const enqueueThankYouEmail = async (job) => {
    if (!job.to)
        return;
    queue.push(job);
    if (!workerStarted)
        startWorker();
};
exports.enqueueThankYouEmail = enqueueThankYouEmail;
const startWorker = () => {
    workerStarted = true;
    setInterval(processQueue, 3000).unref();
};
const processQueue = async () => {
    if (!transporter)
        return;
    const job = queue.shift();
    if (!job)
        return;
    const { sessionId, to, name, ipAddress } = job;
    try {
        // Double-check not sent already
        const session = await (0, database_1.query)("SELECT email_sent_status FROM chat_sessions WHERE id = $1", [sessionId]);
        const status = session.rows[0]?.email_sent_status;
        if (status === "sent")
            return;
        await transporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to,
            subject: "Thank you for contacting DrivePixel",
            text: `Hello${name ? ` ${name}` : ""},\n\nThank you for reaching out. Our team will follow up shortly.\n\nSession: ${sessionId}\nIP: ${ipAddress || "unknown"}\n\nDrivePixel`,
            html: `<p>Hello${name ? ` ${name}` : ""},</p><p>Thank you for reaching out. Our team will follow up shortly.</p><p><strong>Session:</strong> ${sessionId}<br/><strong>IP:</strong> ${ipAddress || "unknown"}</p><p>DrivePixel</p>`,
        });
        await (0, database_1.query)("UPDATE chat_sessions SET email_sent_status = 'sent', email_sent_at = CURRENT_TIMESTAMP, email_error = NULL WHERE id = $1", [sessionId]);
        await (0, database_1.query)("INSERT INTO chat_email_logs (session_id, status) VALUES ($1, 'sent')", [sessionId]);
    }
    catch (error) {
        await (0, database_1.query)("UPDATE chat_sessions SET email_sent_status = 'failed', email_error = $2 WHERE id = $1", [sessionId, error?.message || "send failed"]);
        await (0, database_1.query)("INSERT INTO chat_email_logs (session_id, status, error) VALUES ($1, 'failed', $2)", [sessionId, error?.message || "send failed"]);
    }
};
