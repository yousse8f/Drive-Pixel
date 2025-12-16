import { Router } from "express";
import { postChatMessage } from "../controllers/chatController";
import { chatRateLimit } from "../middleware/rateLimit";

const router = Router();

router.post("/message", chatRateLimit, postChatMessage);

export default router;
