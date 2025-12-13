"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analyticsController_1 = require("../controllers/analyticsController");
const router = (0, express_1.Router)();
router.get("/dashboard", analyticsController_1.getDashboardStats);
router.get("/leads", analyticsController_1.getLeadsAnalytics);
router.get("/content", analyticsController_1.getContentAnalytics);
exports.default = router;
