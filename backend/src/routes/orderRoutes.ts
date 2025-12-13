import { Router } from "express";
import {
  getOrder,
  getOrders,
  updateOrderStatus,
} from "../controllers/orderController";

const router = Router();

router.get("/", getOrders);
router.get("/:id", getOrder);
router.put("/:id", updateOrderStatus);

export default router;
