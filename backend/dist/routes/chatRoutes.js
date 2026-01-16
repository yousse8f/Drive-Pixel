"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatController_1 = require("../controllers/chatController");
const rateLimit_1 = require("../middleware/rateLimit");
const router = (0, express_1.Router)();
router.post("/message", rateLimit_1.chatRateLimit, chatController_1.postChatMessage);
exports.default = router;
