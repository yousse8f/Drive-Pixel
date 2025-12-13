"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contentController_1 = require("../controllers/contentController");
const router = (0, express_1.Router)();
// Services routes
router.get("/services", contentController_1.getServices);
router.post("/services", contentController_1.createService);
router.put("/services/:id", contentController_1.updateService);
router.delete("/services/:id", contentController_1.deleteService);
// Portfolio routes
router.get("/portfolio", contentController_1.getPortfolio);
router.post("/portfolio", contentController_1.createPortfolio);
router.put("/portfolio/:id", contentController_1.updatePortfolio);
router.delete("/portfolio/:id", contentController_1.deletePortfolio);
// Blog posts routes
router.get("/blog", contentController_1.getBlogPosts);
router.get("/blog/:slug", contentController_1.getBlogPost);
router.post("/blog", contentController_1.createBlogPost);
router.put("/blog/:id", contentController_1.updateBlogPost);
router.delete("/blog/:id", contentController_1.deleteBlogPost);
// Testimonials routes
router.get("/testimonials", contentController_1.getTestimonials);
router.post("/testimonials", contentController_1.createTestimonial);
router.put("/testimonials/:id", contentController_1.updateTestimonial);
router.delete("/testimonials/:id", contentController_1.deleteTestimonial);
// Hero texts routes
router.get("/hero-texts", contentController_1.getHeroTexts);
router.post("/hero-texts", contentController_1.createHeroText);
router.put("/hero-texts/:id", contentController_1.updateHeroText);
router.delete("/hero-texts/:id", contentController_1.deleteHeroText);
exports.default = router;
