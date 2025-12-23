import { Request, Response } from "express";
import { query } from "../config/database";
import { successResponse, errorResponse } from "../utils/apiResponse";
import { comparePassword, hashPassword } from "../utils/authUtils";

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const result = await query(
      "SELECT id, email, first_name, last_name, role FROM users WHERE id = $1",
      [userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json(errorResponse("User not found"));
    }
    const user = result.rows[0];
    return res.json(
      successResponse("Profile retrieved", {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role || "user",
      })
    );
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

export const getMyOrders = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const orders = await query(
      `SELECT id, total, payment_status, status, subscription_type, created_at
       FROM orders
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );

    const orderIds = orders.rows.map((o) => o.id);
    let itemsByOrder: Record<string, any[]> = {};
    if (orderIds.length > 0) {
      const items = await query(
        `SELECT oi.order_id, oi.quantity, oi.price_each, COALESCE(p.name, 'Service') AS name
         FROM order_items oi
         LEFT JOIN products p ON p.id = oi.product_id
         WHERE oi.order_id = ANY($1)`,
        [orderIds]
      );
      itemsByOrder = items.rows.reduce((acc: any, row: any) => {
        acc[row.order_id] = acc[row.order_id] || [];
        acc[row.order_id].push({
          name: row.name,
          quantity: row.quantity,
          priceEach: Number(row.price_each),
        });
        return acc;
      }, {});
    }

    const mapped = orders.rows.map((o) => ({
      id: o.id,
      total: Number(o.total),
      paymentStatus: o.payment_status,
      status: o.status,
      subscriptionType: o.subscription_type,
      createdAt: o.created_at,
      items: itemsByOrder[o.id] || [],
    }));

    return res.json(successResponse("Orders retrieved", mapped));
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

export const getMyBilling = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const payments = await query(
      `SELECT id, total, payment_status, payment_provider, payment_reference, created_at
       FROM orders
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );
    const mapped = payments.rows.map((p: any) => ({
      id: p.id,
      amount: Number(p.total),
      status: p.payment_status,
      provider: p.payment_provider,
      reference: p.payment_reference,
      createdAt: p.created_at,
    }));
    return res.json(successResponse("Billing retrieved", mapped));
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

export const updateMyPassword = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json(errorResponse("currentPassword and newPassword are required"));
    }

    const userResult = await query("SELECT password FROM users WHERE id = $1", [userId]);
    if (userResult.rows.length === 0) {
      return res.status(404).json(errorResponse("User not found"));
    }

    const user = userResult.rows[0];
    const valid = await comparePassword(currentPassword, user.password);
    if (!valid) {
      return res.status(401).json(errorResponse("Invalid current password"));
    }

    const hashed = await hashPassword(newPassword);
    await query(
      "UPDATE users SET password = $1, password_set = TRUE, updated_at = CURRENT_TIMESTAMP WHERE id = $2",
      [hashed, userId]
    );

    return res.json(successResponse("Password updated successfully"));
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};
