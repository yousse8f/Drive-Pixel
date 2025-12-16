import { z } from "zod";

// User validation schemas
export const userSignupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

export const userLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// Lead validation schemas
export const leadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  status: z.enum(["new", "contacted", "qualified", "converted"]).default("new"),
});

// Chat message validation schema
export const chatMessageSchema = z.object({
  sessionId: z.string().uuid().optional(),
  sender: z.enum(["user", "bot"]),
  message: z
    .string()
    .min(1, "Message is required")
    .max(2000, "Message is too long"),
  pageUrl: z.string().url().optional(),
  name: z.string().min(1).max(120).optional(),
  email: z.string().email().max(255).optional(),
  sessionComplete: z.boolean().optional(),
});

// Property validation schemas
export const propertySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  price: z.number().positive("Price must be positive"),
  location: z.string().min(1, "Location is required"),
  bedrooms: z.number().int().positive().optional(),
  bathrooms: z.number().int().positive().optional(),
});

export type UserSignup = z.infer<typeof userSignupSchema>;
export type UserLogin = z.infer<typeof userLoginSchema>;
export type Lead = z.infer<typeof leadSchema>;
export type Property = z.infer<typeof propertySchema>;
export type ChatMessageInput = z.infer<typeof chatMessageSchema>;
