"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const leadsRoutes_1 = __importDefault(require("./routes/leadsRoutes"));
const propertiesRoutes_1 = __importDefault(require("./routes/propertiesRoutes"));
const contentRoutes_1 = __importDefault(require("./routes/contentRoutes"));
const settingsRoutes_1 = __importDefault(require("./routes/settingsRoutes"));
const analyticsRoutes_1 = __importDefault(require("./routes/analyticsRoutes"));
const logsRoutes_1 = __importDefault(require("./routes/logsRoutes"));
const publicRoutes_1 = __importDefault(require("./routes/publicRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const cartRoutes_1 = __importDefault(require("./routes/cartRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const chatRoutes_1 = __importDefault(require("./routes/chatRoutes"));
const chatAdminRoutes_1 = __importDefault(require("./routes/chatAdminRoutes"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
const paypalRoutes_1 = __importDefault(require("./routes/paypalRoutes"));
const clientRoutes_1 = __importDefault(require("./routes/clientRoutes"));
const newsletterRoutes_1 = __importDefault(require("./routes/newsletterRoutes"));
const contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
const cmsRoutes_1 = __importDefault(require("./routes/cmsRoutes"));
const crmRoutes_1 = __importDefault(require("./routes/crmRoutes"));
const emailRoutes_1 = __importDefault(require("./routes/emailRoutes"));
const importExportRoutes_1 = __importDefault(require("./routes/importExportRoutes"));
const authUtils_1 = require("./utils/authUtils");
const adminMiddleware_1 = require("./utils/adminMiddleware");
const database_1 = require("./config/database");
const crypto_1 = require("crypto");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((req, res, next) => {
    const requestId = (0, crypto_1.randomUUID)();
    const start = Date.now();
    req.requestId = requestId;
    res.on("finish", () => {
        const durationMs = Date.now() - start;
        const userId = req.userId;
        console.log(JSON.stringify({
            requestId,
            method: req.method,
            path: req.originalUrl,
            statusCode: res.statusCode,
            durationMs,
            userId,
        }));
    });
    next();
});
// Public routes (no authentication required)
app.use("/api/public", publicRoutes_1.default);
app.use("/api/newsletter", newsletterRoutes_1.default);
app.use("/api/contact", contactRoutes_1.default);
// Auth routes
app.use("/api/auth", authRoutes_1.default);
// Payment webhook (public, provider should verify signatures)
app.use("/api/payments", paymentRoutes_1.default);
// PayPal routes (public for checkout)
app.use("/api/paypal", paypalRoutes_1.default);
// Protected routes (authentication required)
app.use("/api/users", authUtils_1.authMiddleware, usersRoutes_1.default);
app.use("/api/leads", authUtils_1.authMiddleware, leadsRoutes_1.default);
app.use("/api/properties", authUtils_1.authMiddleware, propertiesRoutes_1.default);
app.use("/api/cart", cartRoutes_1.default);
app.use("/api/chat", chatRoutes_1.default);
app.use("/api", clientRoutes_1.default);
// Admin routes (admin authentication required)
app.use("/api/admin/content", adminMiddleware_1.adminMiddleware, contentRoutes_1.default);
app.use("/api/admin/settings", adminMiddleware_1.adminMiddleware, settingsRoutes_1.default);
app.use("/api/admin/analytics", adminMiddleware_1.adminMiddleware, analyticsRoutes_1.default);
app.use("/api/admin/logs", adminMiddleware_1.adminMiddleware, logsRoutes_1.default);
app.use("/api/admin/products", adminMiddleware_1.adminMiddleware, productRoutes_1.default);
app.use("/api/admin/orders", adminMiddleware_1.adminMiddleware, orderRoutes_1.default);
app.use("/api/admin/chat", adminMiddleware_1.adminMiddleware, chatAdminRoutes_1.default);
app.use("/api/admin/cms", adminMiddleware_1.adminMiddleware, cmsRoutes_1.default);
app.use("/api/admin/crm", adminMiddleware_1.adminMiddleware, crmRoutes_1.default);
app.use("/api/admin/email", adminMiddleware_1.adminMiddleware, emailRoutes_1.default);
app.use("/api/admin/data", adminMiddleware_1.adminMiddleware, importExportRoutes_1.default);
// Public email tracking routes (no auth)
app.use("/api/email", emailRoutes_1.default);
// Health check
app.get("/api/health", (req, res) => {
    res.json({ success: true, message: "Server is running" });
});
// Error handling middleware
app.use((err, req, res, next) => {
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
        await (0, database_1.initializeDatabase)();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};
startServer();
