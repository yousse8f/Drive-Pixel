import { Request, Response } from "express";
import { randomUUID } from "crypto";
import { query } from "../config/database";
import { successResponse, errorResponse } from "../utils/apiResponse";

const SESSION_HEADER = "x-session-id";

const mapCartItem = (row: any) => ({
  id: row.id,
  productId: row.product_id,
  quantity: row.quantity,
  priceEach: Number(row.price_each),
  name: row.name,
  description: row.description,
  imageUrl: row.image_url,
});

const getSessionId = (req: Request): string => {
  return (
    (req.headers[SESSION_HEADER] as string) ||
    (req.body && req.body.sessionId) ||
    (req.query && (req.query.sessionId as string)) ||
    ""
  );
};

const getOrCreateCart = async (sessionId?: string) => {
  let currentSessionId = sessionId || randomUUID();

  // Find existing cart
  const existing = await query("SELECT id FROM carts WHERE session_id = $1 AND status = 'active' LIMIT 1", [
    currentSessionId,
  ]);

  if (existing.rows.length > 0) {
    return { cartId: existing.rows[0].id, sessionId: currentSessionId };
  }

  const created = await query(
    "INSERT INTO carts (session_id, status) VALUES ($1, 'active') RETURNING id, session_id",
    [currentSessionId]
  );

  return { cartId: created.rows[0].id, sessionId: created.rows[0].session_id };
};

export const getCart = async (req: Request, res: Response) => {
  try {
    const sessionId = getSessionId(req);
    const { cartId, sessionId: persistedSession } = await getOrCreateCart(sessionId);

    const itemsResult = await query(
      `SELECT ci.*, p.name, p.description, p.image_url 
       FROM cart_items ci 
       LEFT JOIN products p ON p.id = ci.product_id 
       WHERE ci.cart_id = $1`,
      [cartId]
    );

    const items = itemsResult.rows.map(mapCartItem);
    const total = items.reduce((sum, item) => sum + item.priceEach * item.quantity, 0);

    return res.json(
      successResponse("Cart retrieved successfully", {
        sessionId: persistedSession,
        items,
        total,
      })
    );
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message || "Error"));
  }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    const sessionId = getSessionId(req);
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json(errorResponse("productId is required"));
    }

    const { cartId, sessionId: persistedSession } = await getOrCreateCart(sessionId);

    const productResult = await query(
      "SELECT id, price, is_active FROM products WHERE id = $1",
      [productId]
    );
    if (productResult.rows.length === 0 || productResult.rows[0].is_active === false) {
      return res.status(404).json(errorResponse("Product not available"));
    }

    const price = Number(productResult.rows[0].price);

    // See if item exists in cart
    const existing = await query(
      "SELECT id, quantity FROM cart_items WHERE cart_id = $1 AND product_id = $2 LIMIT 1",
      [cartId, productId]
    );

    if (existing.rows.length > 0) {
      const newQty = existing.rows[0].quantity + Number(quantity);
      await query("UPDATE cart_items SET quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2", [
        newQty,
        existing.rows[0].id,
      ]);
    } else {
      await query(
        "INSERT INTO cart_items (cart_id, product_id, quantity, price_each) VALUES ($1, $2, $3, $4)",
        [cartId, productId, Number(quantity), price]
      );
    }

    return getCart(req, res);
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message || "Error"));
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const sessionId = getSessionId(req);
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (quantity === undefined || quantity < 1) {
      return res.status(400).json(errorResponse("Quantity must be at least 1"));
    }

    const { cartId } = await getOrCreateCart(sessionId);

    const result = await query(
      "UPDATE cart_items SET quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 AND cart_id = $3 RETURNING id",
      [Number(quantity), itemId, cartId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json(errorResponse("Cart item not found"));
    }

    return getCart(req, res);
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message || "Error"));
  }
};

export const removeCartItem = async (req: Request, res: Response) => {
  try {
    const sessionId = getSessionId(req);
    const { itemId } = req.params;

    const { cartId } = await getOrCreateCart(sessionId);

    const result = await query("DELETE FROM cart_items WHERE id = $1 AND cart_id = $2", [itemId, cartId]);
    if (result.rowCount === 0) {
      return res.status(404).json(errorResponse("Cart item not found"));
    }

    return getCart(req, res);
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message || "Error"));
  }
};

export const checkoutCart = async (req: Request, res: Response) => {
  try {
    const sessionId = getSessionId(req);
    const { customerName, customerEmail, customerPhone, customerAddress, paymentProvider } = req.body;

    if (!customerName || !customerEmail || !customerAddress) {
      return res.status(400).json(errorResponse("Missing customer details"));
    }

    const { cartId, sessionId: persistedSession } = await getOrCreateCart(sessionId);

    const itemsResult = await query(
      `SELECT ci.*, p.name, p.description, p.image_url 
       FROM cart_items ci 
       LEFT JOIN products p ON p.id = ci.product_id 
       WHERE ci.cart_id = $1`,
      [cartId]
    );

    const items = itemsResult.rows.map(mapCartItem);
    const total = items.reduce((sum, item) => sum + item.priceEach * item.quantity, 0);

    if (items.length === 0) {
      return res.status(400).json(errorResponse("Cart is empty"));
    }

    const orderResult = await query(
      `INSERT INTO orders 
        (cart_id, customer_name, customer_email, customer_phone, customer_address, total, payment_provider, payment_status, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending', 'pending')
       RETURNING id`,
      [cartId, customerName, customerEmail, customerPhone || null, customerAddress, total, paymentProvider || "manual"]
    );

    const orderId = orderResult.rows[0].id;

    const insertOrderItems = items.map((item) =>
      query(
        "INSERT INTO order_items (order_id, product_id, quantity, price_each) VALUES ($1, $2, $3, $4)",
        [orderId, item.productId, item.quantity, item.priceEach]
      )
    );
    await Promise.all(insertOrderItems);

    await query("UPDATE carts SET status = 'ordered', updated_at = CURRENT_TIMESTAMP WHERE id = $1", [cartId]);

    return res.status(201).json(
      successResponse("Order created and payment pending", {
        orderId,
        sessionId: persistedSession,
        total,
        paymentStatus: "pending",
      })
    );
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message || "Error"));
  }
};
