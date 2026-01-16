import { Router } from "express";
import {
  // Customers
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  convertLeadToCustomer,
  // Notes
  addNote,
  updateNote,
  deleteNote,
  // Activities
  getActivities,
  logActivity,
  // Pipeline Stages
  getPipelineStages,
  createPipelineStage,
  updatePipelineStage,
  // Deals
  getDeals,
  createDeal,
  updateDeal,
  deleteDeal,
  // Stats
  getCrmStats,
} from "../controllers/crmController";

const router = Router();

// Stats
router.get("/stats", getCrmStats);

// Customers
router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomer);
router.post("/customers", createCustomer);
router.put("/customers/:id", updateCustomer);
router.delete("/customers/:id", deleteCustomer);
router.post("/leads/:lead_id/convert", convertLeadToCustomer);

// Notes
router.post("/notes", addNote);
router.put("/notes/:id", updateNote);
router.delete("/notes/:id", deleteNote);

// Activities
router.get("/activities", getActivities);
router.post("/activities", logActivity);

// Pipeline Stages
router.get("/pipeline/stages", getPipelineStages);
router.post("/pipeline/stages", createPipelineStage);
router.put("/pipeline/stages/:id", updatePipelineStage);

// Deals
router.get("/deals", getDeals);
router.post("/deals", createDeal);
router.put("/deals/:id", updateDeal);
router.delete("/deals/:id", deleteDeal);

export default router;
