"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paypalController_1 = require("../controllers/paypalController");
const router = (0, express_1.Router)();
router.post("/create-order", paypalController_1.createPayPalOrder);
router.post("/capture-order", paypalController_1.capturePayPalOrder);
router.get("/order/:orderId", paypalController_1.getOrderDetails);
exports.default = router;
