import { Request, Response } from "express";
import { query } from "../config/database";
import { successResponse, errorResponse } from "../utils/apiResponse";

export const getOrders = async (req: Request, res: Response) => {
  try {
    const result = await query(
      `SELECT id, cart_id, customer_name, customer_email, customer_phone, customer_address, total, payment_provider, payment_status, status, created_at, updated_at 
       FROM orders 
       ORDER BY created_at DESC`
    );
    return res.json(successResponse("Orders retrieved successfully", result.rows));
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message || "Error"));
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const orderResult = await query(
      `SELECT id, cart_id, customer_name, customer_email, customer_phone, customer_address, total, payment_provider, payment_status, status, created_at, updated_at 
       FROM orders WHERE id = $1`,
      [id]
    );
    if (orderResult.rows.length === 0) {
      return res.status(404).json(errorResponse("Order not found"));
    }

    const itemsResult = await query(
      `SELECT oi.id, oi.product_id, oi.quantity, oi.price_each, p.name, p.image_url 
       FROM order_items oi 
       LEFT JOIN products p ON p.id = oi.product_id 
       WHERE oi.order_id = $1`,
      [id]
    );

    return res.json(
      successResponse("Order retrieved successfully", {
        order: orderResult.rows[0],
        items: itemsResult.rows,
      })
    );
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message || "Error"));
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, paymentStatus } = req.body;

    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (status !== undefined) {
      fields.push(`status = $${idx++}`);
      values.push(status);
    }
    if (paymentStatus !== undefined) {
      fields.push(`payment_status = $${idx++}`);
      values.push(paymentStatus);
    }

    if (fields.length === 0) {
      return res.status(400).json(errorResponse("No fields to update"));
    }

    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const result = await query(
      `UPDATE orders SET ${fields.join(", ")} WHERE id = $${idx} RETURNING id, status, payment_status, updated_at`,
      values
    );

    if (result.rows.length === 0) {
      return res.status(404).json(errorResponse("Order not found"));
    }

    return res.json(successResponse("Order updated successfully", result.rows[0]));
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message || "Error"));
  }
};
