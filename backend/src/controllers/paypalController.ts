import { Request, Response } from "express";
import paypal from "@paypal/checkout-server-sdk";
import { paypalClient } from "../config/paypal";
import { query } from "../config/database";
import { successResponse, errorResponse } from "../utils/apiResponse";

const SESSION_HEADER = "x-session-id";

const getSessionId = (req: Request): string => {
  return (
    (req.headers[SESSION_HEADER] as string) ||
    (req.body && req.body.sessionId) ||
    ""
  );
};

export const createPayPalOrder = async (req: Request, res: Response) => {
  try {
    const sessionId = getSessionId(req);
    const { customerName, customerEmail } = req.body;

    if (!sessionId) {
      return res.status(400).json(errorResponse("Session ID required"));
    }

    if (!customerName || !customerEmail) {
      return res.status(400).json(errorResponse("Customer name and email required"));
    }

    const cartResult = await query(
      "SELECT id FROM carts WHERE session_id = $1 AND status = 'active' LIMIT 1",
      [sessionId]
    );

    if (cartResult.rows.length === 0) {
      return res.status(404).json(errorResponse("Cart not found"));
    }

    const cartId = cartResult.rows[0].id;

    const itemsResult = await query(
      `SELECT ci.*, p.name, p.description 
       FROM cart_items ci 
       LEFT JOIN products p ON p.id = ci.product_id 
       WHERE ci.cart_id = $1`,
      [cartId]
    );

    if (itemsResult.rows.length === 0) {
      return res.status(400).json(errorResponse("Cart is empty"));
    }

    const items = itemsResult.rows.map((row: any) => ({
      name: row.name || "Product",
      description: row.description || "",
      quantity: row.quantity.toString(),
      unit_amount: {
        currency_code: "USD",
        value: Number(row.price_each).toFixed(2),
      },
    }));

    const total = itemsResult.rows.reduce(
      (sum: number, item: any) => sum + Number(item.price_each) * item.quantity,
      0
    );

    const orderResult = await query(
      `INSERT INTO orders 
        (cart_id, customer_name, customer_email, customer_phone, customer_address, total, payment_provider, payment_status, status)
       VALUES ($1, $2, $3, NULL, 'Digital Product - No Shipping Required', $4, 'paypal', 'pending', 'pending')
       RETURNING id`,
      [cartId, customerName, customerEmail, total]
    );

    const orderId = orderResult.rows[0].id;

    const insertOrderItems = itemsResult.rows.map((item: any) =>
      query(
        "INSERT INTO order_items (order_id, product_id, quantity, price_each) VALUES ($1, $2, $3, $4)",
        [orderId, item.product_id, item.quantity, item.price_each]
      )
    );
    await Promise.all(insertOrderItems);

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: orderId,
          description: `Order #${orderId} - Drive Pixel`,
          custom_id: orderId,
          amount: {
            currency_code: "USD",
            value: total.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: total.toFixed(2),
              },
            },
          },
          items: items,
        },
      ],
      application_context: {
        brand_name: "Drive Pixel",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `${process.env.FRONTEND_URL || "http://localhost:3000"}/order/success?orderId=${orderId}`,
        cancel_url: `${process.env.FRONTEND_URL || "http://localhost:3000"}/cart?cancelled=true`,
      },
    });

    const order = await paypalClient().execute(request);

    await query(
      "UPDATE orders SET payment_reference = $1 WHERE id = $2",
      [order.result.id, orderId]
    );

    return res.json(
      successResponse("PayPal order created", {
        orderId: orderId,
        paypalOrderId: order.result.id,
        approvalUrl: order.result.links?.find((link: any) => link.rel === "approve")?.href,
      })
    );
  } catch (error: any) {
    console.error("PayPal order creation error:", error);
    return res.status(500).json(errorResponse("Failed to create PayPal order", error.message));
  }
};

export const capturePayPalOrder = async (req: Request, res: Response) => {
  try {
    const { paypalOrderId, orderId } = req.body;

    if (!paypalOrderId || !orderId) {
      return res.status(400).json(errorResponse("PayPal Order ID and Order ID required"));
    }

    const orderResult = await query("SELECT * FROM orders WHERE id = $1", [orderId]);
    if (orderResult.rows.length === 0) {
      return res.status(404).json(errorResponse("Order not found"));
    }

    const order = orderResult.rows[0];

    if (order.payment_status === "paid") {
      return res.json(successResponse("Order already paid", { orderId }));
    }

    const request = new paypal.orders.OrdersCaptureRequest(paypalOrderId);
    request.requestBody({});

    const capture = await paypalClient().execute(request);

    if (capture.result.status === "COMPLETED") {
      await query(
        `UPDATE orders 
         SET payment_status = 'paid', 
             status = 'completed', 
             payment_reference = $1,
             updated_at = CURRENT_TIMESTAMP 
         WHERE id = $2`,
        [paypalOrderId, orderId]
      );

      await query(
        "UPDATE carts SET status = 'ordered', updated_at = CURRENT_TIMESTAMP WHERE id = $1",
        [order.cart_id]
      );

      return res.json(
        successResponse("Payment captured successfully", {
          orderId,
          paypalOrderId,
          status: "completed",
        })
      );
    } else {
      return res.status(400).json(errorResponse("Payment capture failed"));
    }
  } catch (error: any) {
    console.error("PayPal capture error:", error);
    return res.status(500).json(errorResponse("Failed to capture payment", error.message));
  }
};

export const getOrderDetails = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    const orderResult = await query(
      `SELECT o.*, 
        json_agg(
          json_build_object(
            'productId', oi.product_id,
            'name', COALESCE(p.name, 'Product'),
            'description', COALESCE(p.description, ''),
            'quantity', oi.quantity,
            'priceEach', oi.price_each,
            'imageUrl', p.image_url
          )
        ) as items
       FROM orders o
       LEFT JOIN order_items oi ON oi.order_id = o.id
       LEFT JOIN products p ON p.id = oi.product_id
       WHERE o.id = $1
       GROUP BY o.id`,
      [orderId]
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json(errorResponse("Order not found"));
    }

    const order = orderResult.rows[0];

    return res.json(
      successResponse("Order retrieved", {
        id: order.id,
        customerName: order.customer_name,
        customerEmail: order.customer_email,
        customerPhone: order.customer_phone,
        customerAddress: order.customer_address,
        total: Number(order.total),
        paymentStatus: order.payment_status,
        status: order.status,
        paymentProvider: order.payment_provider,
        paymentReference: order.payment_reference,
        createdAt: order.created_at,
        items: order.items || [],
      })
    );
  } catch (error: any) {
    console.error("Get order error:", error);
    return res.status(500).json(errorResponse("Failed to retrieve order", error.message));
  }
};
