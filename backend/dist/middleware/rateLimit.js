"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRateLimit = void 0;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 30;
const requests = new Map();
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
const chatRateLimit = (req, res, next) => {
    const key = getClientIp(req);
    const now = Date.now();
    const entry = requests.get(key);
    if (!entry) {
        requests.set(key, { count: 1, firstRequestTs: now });
        return next();
    }
    if (now - entry.firstRequestTs > WINDOW_MS) {
        requests.set(key, { count: 1, firstRequestTs: now });
        return next();
    }
    if (entry.count >= MAX_REQUESTS) {
        return res.status(429).json({
            success: false,
            message: "Too many requests. Please wait a few minutes and try again.",
        });
    }
    entry.count += 1;
    requests.set(key, entry);
    return next();
};
exports.chatRateLimit = chatRateLimit;
// Periodic cleanup to prevent unbounded memory growth
setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of requests.entries()) {
        if (now - entry.firstRequestTs > WINDOW_MS) {
            requests.delete(key);
        }
    }
}, WINDOW_MS).unref();
