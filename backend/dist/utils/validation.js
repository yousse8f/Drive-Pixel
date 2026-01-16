"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertySchema = exports.chatMessageSchema = exports.leadSchema = exports.userLoginSchema = exports.userSignupSchema = void 0;
const zod_1 = require("zod");
// User validation schemas
exports.userSignupSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    firstName: zod_1.z.string().min(1, "First name is required"),
    lastName: zod_1.z.string().min(1, "Last name is required"),
});
exports.userLoginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(1, "Password is required"),
});
// Lead validation schemas
exports.leadSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z.string().email("Invalid email address"),
    phone: zod_1.z.string().optional(),
    status: zod_1.z.enum(["new", "contacted", "qualified", "converted"]).default("new"),
});
// Chat message validation schema
exports.chatMessageSchema = zod_1.z.object({
    sessionId: zod_1.z.string().uuid().optional(),
    sender: zod_1.z.enum(["user", "bot"]),
    message: zod_1.z
        .string()
        .min(1, "Message is required")
        .max(2000, "Message is too long"),
    pageUrl: zod_1.z.string().url().optional(),
    name: zod_1.z.string().min(1).max(120).optional(),
    email: zod_1.z.string().email().max(255).optional(),
    sessionComplete: zod_1.z.boolean().optional(),
});
// Property validation schemas
exports.propertySchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    description: zod_1.z.string().optional(),
    price: zod_1.z.number().positive("Price must be positive"),
    location: zod_1.z.string().min(1, "Location is required"),
    bedrooms: zod_1.z.number().int().positive().optional(),
    bathrooms: zod_1.z.number().int().positive().optional(),
});
