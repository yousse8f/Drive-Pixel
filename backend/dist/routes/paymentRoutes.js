"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentController_1 = require("../controllers/paymentController");
const router = (0, express_1.Router)();
// Payment provider webhook (generic). Ensure provider-specific verification is applied upstream or inside controller as needed.
router.post("/webhook", paymentController_1.paymentWebhook);
exports.default = router;
