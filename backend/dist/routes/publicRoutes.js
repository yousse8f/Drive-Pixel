"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contentController_1 = require("../controllers/contentController");
const productController_1 = require("../controllers/productController");
const inquiryController_1 = require("../controllers/inquiryController");
const router = (0, express_1.Router)();
// Public routes for website content (no authentication required)
router.get("/services", contentController_1.getServices);
router.get("/portfolio", contentController_1.getPortfolio);
router.get("/blog", contentController_1.getBlogPosts);
router.get("/blog/:slug", contentController_1.getBlogPost);
router.get("/testimonials", contentController_1.getTestimonials);
router.get("/hero-texts", contentController_1.getHeroTexts);
router.get("/products", productController_1.getPublicProducts);
router.get("/products/:id", productController_1.getPublicProduct);
// Inquiry routes
router.post("/inquiries", inquiryController_1.submitInquiry);
exports.default = router;
