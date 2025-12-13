import { Router } from "express";
import {
  addToCart,
  checkoutCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from "../controllers/cartController";

const router = Router();

router.get("/", getCart);
router.post("/add", addToCart);
router.put("/item/:itemId", updateCartItem);
router.delete("/item/:itemId", removeCartItem);
router.post("/checkout", checkoutCart);

export default router;
