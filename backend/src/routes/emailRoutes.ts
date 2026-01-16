import { Router } from "express";
import {
  // Lists
  getEmailLists,
  getEmailList,
  createEmailList,
  updateEmailList,
  deleteEmailList,
  // Subscribers
  getSubscribers,
  addSubscriber,
  removeSubscriber,
  bulkAddSubscribers,
  // Templates
  getEmailTemplates,
  getEmailTemplate,
  createEmailTemplate,
  updateEmailTemplate,
  deleteEmailTemplate,
  // Campaigns
  getEmailCampaigns,
  getEmailCampaign,
  createEmailCampaign,
  updateEmailCampaign,
  deleteEmailCampaign,
  // Sending
  sendCampaign,
  sendTestEmail,
  // Tracking
  trackEmailOpen,
  trackEmailClick,
  unsubscribe,
  // Stats
  getEmailStats,
} from "../controllers/emailController";

const router = Router();

// Stats
router.get("/stats", getEmailStats);

// Lists
router.get("/lists", getEmailLists);
router.get("/lists/:id", getEmailList);
router.post("/lists", createEmailList);
router.put("/lists/:id", updateEmailList);
router.delete("/lists/:id", deleteEmailList);

// Subscribers
router.get("/subscribers", getSubscribers);
router.post("/subscribers", addSubscriber);
router.post("/subscribers/bulk", bulkAddSubscribers);
router.delete("/subscribers/:id", removeSubscriber);

// Templates
router.get("/templates", getEmailTemplates);
router.get("/templates/:id", getEmailTemplate);
router.post("/templates", createEmailTemplate);
router.put("/templates/:id", updateEmailTemplate);
router.delete("/templates/:id", deleteEmailTemplate);

// Campaigns
router.get("/campaigns", getEmailCampaigns);
router.get("/campaigns/:id", getEmailCampaign);
router.post("/campaigns", createEmailCampaign);
router.put("/campaigns/:id", updateEmailCampaign);
router.delete("/campaigns/:id", deleteEmailCampaign);

// Sending
router.post("/campaigns/:id/send", sendCampaign);
router.post("/test", sendTestEmail);

// Tracking (public routes - no auth required)
router.get("/track/open/:id", trackEmailOpen);
router.get("/track/click/:id", trackEmailClick);
router.get("/unsubscribe", unsubscribe);

export default router;
