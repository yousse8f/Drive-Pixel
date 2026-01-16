"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const emailController_1 = require("../controllers/emailController");
const router = (0, express_1.Router)();
// Stats
router.get("/stats", emailController_1.getEmailStats);
// Lists
router.get("/lists", emailController_1.getEmailLists);
router.get("/lists/:id", emailController_1.getEmailList);
router.post("/lists", emailController_1.createEmailList);
router.put("/lists/:id", emailController_1.updateEmailList);
router.delete("/lists/:id", emailController_1.deleteEmailList);
// Subscribers
router.get("/subscribers", emailController_1.getSubscribers);
router.post("/subscribers", emailController_1.addSubscriber);
router.post("/subscribers/bulk", emailController_1.bulkAddSubscribers);
router.delete("/subscribers/:id", emailController_1.removeSubscriber);
// Templates
router.get("/templates", emailController_1.getEmailTemplates);
router.get("/templates/:id", emailController_1.getEmailTemplate);
router.post("/templates", emailController_1.createEmailTemplate);
router.put("/templates/:id", emailController_1.updateEmailTemplate);
router.delete("/templates/:id", emailController_1.deleteEmailTemplate);
// Campaigns
router.get("/campaigns", emailController_1.getEmailCampaigns);
router.get("/campaigns/:id", emailController_1.getEmailCampaign);
router.post("/campaigns", emailController_1.createEmailCampaign);
router.put("/campaigns/:id", emailController_1.updateEmailCampaign);
router.delete("/campaigns/:id", emailController_1.deleteEmailCampaign);
// Sending
router.post("/campaigns/:id/send", emailController_1.sendCampaign);
router.post("/test", emailController_1.sendTestEmail);
// Tracking (public routes - no auth required)
router.get("/track/open/:id", emailController_1.trackEmailOpen);
router.get("/track/click/:id", emailController_1.trackEmailClick);
router.get("/unsubscribe", emailController_1.unsubscribe);
exports.default = router;
