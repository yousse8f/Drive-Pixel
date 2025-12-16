import { Request, Response, NextFunction } from "express";

type RateLimitEntry = {
  count: number;
  firstRequestTs: number;
};

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 30;
const requests: Map<string, RateLimitEntry> = new Map();

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

export const chatRateLimit = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

// Periodic cleanup to prevent unbounded memory growth
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of requests.entries()) {
    if (now - entry.firstRequestTs > WINDOW_MS) {
      requests.delete(key);
    }
  }
}, WINDOW_MS).unref();
