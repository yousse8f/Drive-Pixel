"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = void 0;
const authUtils_1 = require("./authUtils");
const database_1 = require("../config/database");
const adminMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
                error: "No token provided",
            });
        }
        const decoded = (0, authUtils_1.verifyToken)(token);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
                error: "Invalid token",
            });
        }
        // Check if user is admin
        const userResult = await (0, database_1.query)("SELECT id, email, role FROM users WHERE id = $1", [decoded.userId]);
        if (userResult.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
                error: "User not found",
            });
        }
        const user = userResult.rows[0];
        if (user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Forbidden",
                error: "Admin access required",
            });
        }
        req.userId = decoded.userId;
        req.userRole = user.role;
        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};
exports.adminMiddleware = adminMiddleware;
