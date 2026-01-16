import { Router } from "express";
import {
  importContacts,
  getImportJobs,
  getImportJob,
  exportData,
  downloadExport,
  getExportJobs,
  exportCampaignReport,
} from "../controllers/importExportController";

const router = Router();

// Import
router.post("/import", importContacts);
router.get("/import/jobs", getImportJobs);
router.get("/import/jobs/:id", getImportJob);

// Export
router.post("/export", exportData);
router.get("/export/jobs", getExportJobs);
router.get("/export/download/:id", downloadExport);
router.get("/export/campaign/:campaign_id", exportCampaignReport);

export default router;
