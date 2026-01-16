"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cmsController_1 = require("../controllers/cmsController");
const router = (0, express_1.Router)();
// Pages
router.get("/pages", cmsController_1.getPages);
router.get("/pages/:id", cmsController_1.getPage);
router.post("/pages", cmsController_1.createPage);
router.put("/pages/:id", cmsController_1.updatePage);
router.delete("/pages/:id", cmsController_1.deletePage);
// Sections
router.get("/sections", cmsController_1.getSections);
router.post("/sections", cmsController_1.createSection);
router.put("/sections/:id", cmsController_1.updateSection);
router.delete("/sections/:id", cmsController_1.deleteSection);
// Content Blocks
router.get("/blocks", cmsController_1.getContentBlocks);
router.post("/blocks", cmsController_1.createContentBlock);
router.put("/blocks/:id", cmsController_1.updateContentBlock);
router.delete("/blocks/:id", cmsController_1.deleteContentBlock);
// Components
router.get("/components", cmsController_1.getComponents);
router.post("/components", cmsController_1.createComponent);
router.put("/components/:id", cmsController_1.updateComponent);
router.delete("/components/:id", cmsController_1.deleteComponent);
// Versioning
router.get("/versions", cmsController_1.getContentVersions);
router.post("/versions/:id/restore", cmsController_1.restoreContentVersion);
exports.default = router;
