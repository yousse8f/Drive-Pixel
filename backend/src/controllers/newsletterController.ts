import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/apiResponse";
import { query } from "../config/database";

export const getNewsletterSubscribers = async (req: Request, res: Response) => {
  try {
    const result = await query(
      `SELECT id, email, source, created_at 
       FROM newsletter_subscribers 
       ORDER BY created_at DESC`
    );

    return res.json(successResponse("Newsletter subscribers fetched successfully", result.rows));
  } catch (error: any) {
    console.error("Error fetching newsletter subscribers:", error);
    return res.status(500).json(errorResponse("Failed to fetch subscribers", error.message));
  }
};

export const subscribeToNewsletter = async (req: Request, res: Response) => {
  try {
    const { email, source } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json(errorResponse("Invalid email address"));
    }

    const existingSubscriber = await query(
      `SELECT id FROM newsletter_subscribers WHERE email = $1`,
      [email]
    );

    if (existingSubscriber.rows.length > 0) {
      return res.status(409).json(errorResponse("Email already subscribed"));
    }

    const result = await query(
      `INSERT INTO newsletter_subscribers (email, source, created_at) 
       VALUES ($1, $2, NOW()) 
       RETURNING id, email, source, created_at`,
      [email, source || 'blog-page']
    );

    return res.json(successResponse("Successfully subscribed to newsletter", result.rows[0]));
  } catch (error: any) {
    console.error("Error subscribing to newsletter:", error);
    return res.status(500).json(errorResponse("Failed to subscribe", error.message));
  }
};

export const deleteNewsletterSubscriber = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json(errorResponse("Subscriber ID is required"));
    }

    await query(
      `DELETE FROM newsletter_subscribers WHERE id = $1`,
      [id]
    );

    return res.json(successResponse("Subscriber deleted successfully"));
  } catch (error: any) {
    console.error("Error deleting subscriber:", error);
    return res.status(500).json(errorResponse("Failed to delete subscriber", error.message));
  }
};
