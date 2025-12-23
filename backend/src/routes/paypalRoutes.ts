import { Router } from "express";
import { createPayPalOrder, capturePayPalOrder, getOrderDetails } from "../controllers/paypalController";

const router = Router();

router.post("/create-order", createPayPalOrder);
router.post("/capture-order", capturePayPalOrder);
router.get("/order/:orderId", getOrderDetails);

export default router;
