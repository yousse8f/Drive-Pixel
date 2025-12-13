import { Router } from "express";
import {
  getServices,
  getPortfolio,
  getBlogPosts,
  getBlogPost,
  getTestimonials,
  getHeroTexts,
} from "../controllers/contentController";
import { submitInquiry } from "../controllers/inquiryController";

const router = Router();

// Public routes for website content (no authentication required)
router.get("/services", getServices);
router.get("/portfolio", getPortfolio);
router.get("/blog", getBlogPosts);
router.get("/blog/:slug", getBlogPost);
router.get("/testimonials", getTestimonials);
router.get("/hero-texts", getHeroTexts);

// Inquiry routes
router.post("/inquiries", submitInquiry);

export default router;
