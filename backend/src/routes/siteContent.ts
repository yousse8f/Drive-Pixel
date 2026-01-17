import { Router } from "express";
import { authMiddleware } from "../utils/authUtils";
import {
  getSitePages,
  getSitePage,
  updateSitePage,
  getSitePageByPath,
  uploadSiteImage,
  deleteSiteImage
} from "../controllers/siteContentController";

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Get all site pages
router.get("/pages", getSitePages);

// Get specific site page
router.get("/pages/:id", getSitePage);

// Update site page
router.put("/pages/:id", updateSitePage);

// Get site page by path (for frontend)
router.get("/page/:path", getSitePageByPath);

// Upload site image
router.post("/upload-image", uploadSiteImage);

// Delete site image
router.delete("/image/:filename", deleteSiteImage);

export default router;
