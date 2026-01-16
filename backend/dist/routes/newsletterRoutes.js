"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const newsletterController_1 = require("../controllers/newsletterController");
const router = (0, express_1.Router)();
router.get("/", newsletterController_1.getNewsletterSubscribers);
router.post("/", newsletterController_1.subscribeToNewsletter);
router.delete("/", newsletterController_1.deleteNewsletterSubscriber);
exports.default = router;
