import { Router } from "express";
import {
  // Pages
  getPages,
  getPage,
  createPage,
  updatePage,
  deletePage,
  // Sections
  getSections,
  createSection,
  updateSection,
  deleteSection,
  // Content Blocks
  getContentBlocks,
  createContentBlock,
  updateContentBlock,
  deleteContentBlock,
  // Components
  getComponents,
  createComponent,
  updateComponent,
  deleteComponent,
  // Versioning
  getContentVersions,
  restoreContentVersion,
} from "../controllers/cmsController";

const router = Router();

// Pages
router.get("/pages", getPages);
router.get("/pages/:id", getPage);
router.post("/pages", createPage);
router.put("/pages/:id", updatePage);
router.delete("/pages/:id", deletePage);

// Sections
router.get("/sections", getSections);
router.post("/sections", createSection);
router.put("/sections/:id", updateSection);
router.delete("/sections/:id", deleteSection);

// Content Blocks
router.get("/blocks", getContentBlocks);
router.post("/blocks", createContentBlock);
router.put("/blocks/:id", updateContentBlock);
router.delete("/blocks/:id", deleteContentBlock);

// Components
router.get("/components", getComponents);
router.post("/components", createComponent);
router.put("/components/:id", updateComponent);
router.delete("/components/:id", deleteComponent);

// Versioning
router.get("/versions", getContentVersions);
router.post("/versions/:id/restore", restoreContentVersion);

export default router;
