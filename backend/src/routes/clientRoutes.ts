import { Router } from "express";
import { authMiddleware } from "../utils/authUtils";
import {
  getMe,
  getMyOrders,
  getMyBilling,
  updateMyPassword,
} from "../controllers/clientController";

const router = Router();

router.get("/me", authMiddleware, getMe);
router.get("/me/orders", authMiddleware, getMyOrders);
router.get("/me/billing", authMiddleware, getMyBilling);
router.post("/me/password", authMiddleware, updateMyPassword);

export default router;
