import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/apiResponse";
import { query } from "../config/database";

export const getContactMessages = async (req: Request, res: Response) => {
  try {
    const result = await query(
      `SELECT id, full_name, email, service, message, status, created_at 
       FROM contact_messages 
       ORDER BY created_at DESC`
    );

    return res.json(successResponse("Contact messages fetched successfully", result.rows));
  } catch (error: any) {
    console.error("Error fetching contact messages:", error);
    return res.status(500).json(errorResponse("Failed to fetch messages", error.message));
  }
};

export const submitContactMessage = async (req: Request, res: Response) => {
  try {
    const { fullName, email, service, message } = req.body;

    if (!fullName || !email || !service || !message) {
      return res.status(400).json(errorResponse("All fields are required"));
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json(errorResponse("Invalid email address"));
    }

    const result = await query(
      `INSERT INTO contact_messages (full_name, email, service, message, status, created_at) 
       VALUES ($1, $2, $3, $4, 'unread', NOW()) 
       RETURNING id, full_name, email, service, message, status, created_at`,
      [fullName, email, service, message]
    );

    return res.json(successResponse("Message sent successfully", result.rows[0]));
  } catch (error: any) {
    console.error("Error saving contact message:", error);
    return res.status(500).json(errorResponse("Failed to send message", error.message));
  }
};

export const deleteContactMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json(errorResponse("Message ID is required"));
    }

    await query(
      `DELETE FROM contact_messages WHERE id = $1`,
      [id]
    );

    return res.json(successResponse("Message deleted successfully"));
  } catch (error: any) {
    console.error("Error deleting message:", error);
    return res.status(500).json(errorResponse("Failed to delete message", error.message));
  }
};

export const updateContactMessageStatus = async (req: Request, res: Response) => {
  try {
    const { id, status } = req.body;

    if (!id || !status) {
      return res.status(400).json(errorResponse("Message ID and status are required"));
    }

    const result = await query(
      `UPDATE contact_messages 
       SET status = $1 
       WHERE id = $2 
       RETURNING id, full_name, email, service, message, status, created_at`,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json(errorResponse("Message not found"));
    }

    return res.json(successResponse("Message status updated successfully", result.rows[0]));
  } catch (error: any) {
    console.error("Error updating message status:", error);
    return res.status(500).json(errorResponse("Failed to update message status", error.message));
  }
};
