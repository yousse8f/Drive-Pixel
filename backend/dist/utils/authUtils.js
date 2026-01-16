"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUuidToken = exports.generateRandomPassword = exports.authMiddleware = exports.verifyToken = exports.generateToken = exports.comparePassword = exports.hashPassword = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = require("crypto");
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const SALT_ROUNDS = 10;
const hashPassword = async (password) => {
    return bcrypt_1.default.hash(password, SALT_ROUNDS);
};
exports.hashPassword = hashPassword;
const comparePassword = async (password, hash) => {
    return bcrypt_1.default.compare(password, hash);
};
exports.comparePassword = comparePassword;
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, JWT_SECRET, { expiresIn: "24h" });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch {
        return null;
    }
};
exports.verifyToken = verifyToken;
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
            error: "No token provided",
        });
    }
    const decoded = (0, exports.verifyToken)(token);
    if (!decoded) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
            error: "Invalid token",
        });
    }
    req.userId = decoded.userId;
    next();
};
exports.authMiddleware = authMiddleware;
const generateRandomPassword = (length = 32) => {
    return (0, crypto_1.randomBytes)(Math.ceil(length / 2)).toString("hex").slice(0, length);
};
exports.generateRandomPassword = generateRandomPassword;
const generateUuidToken = () => {
    return (0, crypto_1.randomUUID)();
};
exports.generateUuidToken = generateUuidToken;
