import { Router } from "express";
import { paymentWebhook } from "../controllers/paymentController";

const router = Router();

// Payment provider webhook (generic). Ensure provider-specific verification is applied upstream or inside controller as needed.
router.post("/webhook", paymentWebhook);

export default router;
