"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const importExportController_1 = require("../controllers/importExportController");
const router = (0, express_1.Router)();
// Import
router.post("/import", importExportController_1.importContacts);
router.get("/import/jobs", importExportController_1.getImportJobs);
router.get("/import/jobs/:id", importExportController_1.getImportJob);
// Export
router.post("/export", importExportController_1.exportData);
router.get("/export/jobs", importExportController_1.getExportJobs);
router.get("/export/download/:id", importExportController_1.downloadExport);
router.get("/export/campaign/:campaign_id", importExportController_1.exportCampaignReport);
exports.default = router;
