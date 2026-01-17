import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import usersRoutes from "./routes/usersRoutes";
import leadsRoutes from "./routes/leadsRoutes";
import propertiesRoutes from "./routes/propertiesRoutes";
import contentRoutes from "./routes/contentRoutes";
import settingsRoutes from "./routes/settingsRoutes";
import analyticsRoutes from "./routes/analyticsRoutes";
import logsRoutes from "./routes/logsRoutes";
import publicRoutes from "./routes/publicRoutes";
import productRoutes from "./routes/productRoutes";
import cartRoutes from "./routes/cartRoutes";
import orderRoutes from "./routes/orderRoutes";
import chatRoutes from "./routes/chatRoutes";
import chatAdminRoutes from "./routes/chatAdminRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import paypalRoutes from "./routes/paypalRoutes";
import clientRoutes from "./routes/clientRoutes";
import newsletterRoutes from "./routes/newsletterRoutes";
import contactRoutes from "./routes/contactRoutes";
import cmsRoutes from "./routes/cmsRoutes";
import crmRoutes from "./routes/crmRoutes";
import emailRoutes from "./routes/emailRoutes";
import importExportRoutes from "./routes/importExportRoutes";
import siteContentRoutes from "./routes/siteContent";
import { authMiddleware } from "./utils/authUtils";
import { adminMiddleware } from "./utils/adminMiddleware";
import { initializeDatabase } from "./config/database";
import { randomUUID } from "crypto";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  const requestId = randomUUID();
  const start = Date.now();
  (req as any).requestId = requestId;

  res.on("finish", () => {
    const durationMs = Date.now() - start;
    const userId = (req as any).userId;
    console.log(
      JSON.stringify({
        requestId,
        method: req.method,
        path: req.originalUrl,
        statusCode: res.statusCode,
        durationMs,
        userId,
      })
    );
  });

  next();
});


// Public routes (no authentication required)
app.use("/api/public", publicRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/contact", contactRoutes);

// Auth routes
app.use("/api/auth", authRoutes);
// Payment webhook (public, provider should verify signatures)
app.use("/api/payments", paymentRoutes);
// PayPal routes (public for checkout)
app.use("/api/paypal", paypalRoutes);

// Protected routes (authentication required)
app.use("/api/users", authMiddleware, usersRoutes);
app.use("/api/leads", authMiddleware, leadsRoutes);
app.use("/api/properties", authMiddleware, propertiesRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api", clientRoutes);

// Admin routes (admin authentication required)
app.use("/api/admin/content", adminMiddleware, contentRoutes);
app.use("/api/admin/settings", adminMiddleware, settingsRoutes);
app.use("/api/admin/analytics", adminMiddleware, analyticsRoutes);
app.use("/api/admin/logs", adminMiddleware, logsRoutes);
app.use("/api/admin/products", adminMiddleware, productRoutes);
app.use("/api/admin/orders", adminMiddleware, orderRoutes);
app.use("/api/admin/chat", adminMiddleware, chatAdminRoutes);
app.use("/api/admin/cms", adminMiddleware, cmsRoutes);
app.use("/api/admin/crm", adminMiddleware, crmRoutes);
app.use("/api/admin/email", adminMiddleware, emailRoutes);
app.use("/api/admin/data", adminMiddleware, importExportRoutes);
app.use("/api/admin/site-content", adminMiddleware, siteContentRoutes);

// Public email tracking routes (no auth)
app.use("/api/email", emailRoutes);

// Health check
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ success: true, message: "Server is running" });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message,
  });
});

// Start server
const startServer = async () => {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
