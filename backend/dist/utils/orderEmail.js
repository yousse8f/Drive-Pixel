"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOrderSuccessEmail = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.transporter = process.env.SMTP_HOST && process.env.SMTP_USER
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
const sendOrderSuccessEmail = async (params) => {
    if (!exports.transporter)
        return;
    const { to, customerName, items, subscriptionType, dashboardLink } = params;
    const itemLines = items
        .map((item) => `- ${item.name} x${item.quantity} — $${Number(item.price_each).toFixed(2)}`)
        .join("\n");
    const subscriptionLabel = subscriptionType && subscriptionType !== "one_time"
        ? subscriptionType
        : "One-time";
    const htmlItems = items
        .map((item) => `<li><strong>${item.name}</strong> × ${item.quantity} — $${Number(item.price_each).toFixed(2)}</li>`)
        .join("");
    const dashboardCta = dashboardLink
        ? `<p style="margin:16px 0;"><a href="${dashboardLink}" style="background:#111827;color:#fff;padding:12px 18px;border-radius:6px;text-decoration:none;">Access Your Dashboard</a></p>`
        : `<p style="margin:16px 0;">Log in to your account to view your services.</p>`;
    await exports.transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to,
        subject: "Your DrivePixel order is confirmed",
        text: `Hello${customerName ? ` ${customerName}` : ""},

Thank you for your purchase. Your order is confirmed.

Services:
${itemLines || "-"}

Plan: ${subscriptionLabel}

${dashboardLink ? `Dashboard: ${dashboardLink}` : ""}

DrivePixel`,
        html: `<div style="font-family:Inter,Arial,sans-serif; color:#111;">
      <p>Hello${customerName ? ` ${customerName}` : ""},</p>
      <p>Thank you for your purchase. Your order is confirmed.</p>
      <p><strong>Services</strong></p>
      <ul>${htmlItems || "<li>-</li>"}</ul>
      <p><strong>Plan:</strong> ${subscriptionLabel}</p>
      ${dashboardCta}
      <p style="color:#6b7280;font-size:12px;">If you didn’t initiate this request, please ignore this email.</p>
    </div>`,
    });
};
exports.sendOrderSuccessEmail = sendOrderSuccessEmail;
