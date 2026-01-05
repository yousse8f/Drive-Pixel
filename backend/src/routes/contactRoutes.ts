import { Router } from "express";
import {
  getContactMessages,
  submitContactMessage,
  deleteContactMessage,
  updateContactMessageStatus,
} from "../controllers/contactController";

const router = Router();

router.get("/", getContactMessages);
router.post("/", submitContactMessage);
router.delete("/", deleteContactMessage);
router.patch("/", updateContactMessageStatus);

export default router;
