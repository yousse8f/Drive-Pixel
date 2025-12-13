import { Router } from "express";
import {
  getServices,
  getPortfolio,
  getBlogPosts,
  getBlogPost,
  getTestimonials,
  getHeroTexts,
} from "../controllers/contentController";
import {
  getPublicProducts,
  getPublicProduct,
} from "../controllers/productController";
import { submitInquiry } from "../controllers/inquiryController";

const router = Router();

// Public routes for website content (no authentication required)
router.get("/services", getServices);
router.get("/portfolio", getPortfolio);
router.get("/blog", getBlogPosts);
router.get("/blog/:slug", getBlogPost);
router.get("/testimonials", getTestimonials);
router.get("/hero-texts", getHeroTexts);
router.get("/products", getPublicProducts);
router.get("/products/:id", getPublicProduct);

// Inquiry routes
router.post("/inquiries", submitInquiry);

export default router;
