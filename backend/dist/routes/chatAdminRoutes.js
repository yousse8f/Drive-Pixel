"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatAdminController_1 = require("../controllers/chatAdminController");
const router = (0, express_1.Router)();
router.get("/sessions", chatAdminController_1.listChatSessions);
router.get("/sessions/:id/messages", chatAdminController_1.listChatMessages);
exports.default = router;
