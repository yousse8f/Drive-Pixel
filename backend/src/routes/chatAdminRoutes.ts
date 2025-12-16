import { Router } from "express";
import { listChatSessions, listChatMessages } from "../controllers/chatAdminController";

const router = Router();

router.get("/sessions", listChatSessions);
router.get("/sessions/:id/messages", listChatMessages);

export default router;
