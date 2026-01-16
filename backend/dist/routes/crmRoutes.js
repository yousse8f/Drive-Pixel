"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crmController_1 = require("../controllers/crmController");
const router = (0, express_1.Router)();
// Stats
router.get("/stats", crmController_1.getCrmStats);
// Customers
router.get("/customers", crmController_1.getCustomers);
router.get("/customers/:id", crmController_1.getCustomer);
router.post("/customers", crmController_1.createCustomer);
router.put("/customers/:id", crmController_1.updateCustomer);
router.delete("/customers/:id", crmController_1.deleteCustomer);
router.post("/leads/:lead_id/convert", crmController_1.convertLeadToCustomer);
// Notes
router.post("/notes", crmController_1.addNote);
router.put("/notes/:id", crmController_1.updateNote);
router.delete("/notes/:id", crmController_1.deleteNote);
// Activities
router.get("/activities", crmController_1.getActivities);
router.post("/activities", crmController_1.logActivity);
// Pipeline Stages
router.get("/pipeline/stages", crmController_1.getPipelineStages);
router.post("/pipeline/stages", crmController_1.createPipelineStage);
router.put("/pipeline/stages/:id", crmController_1.updatePipelineStage);
// Deals
router.get("/deals", crmController_1.getDeals);
router.post("/deals", crmController_1.createDeal);
router.put("/deals/:id", crmController_1.updateDeal);
router.delete("/deals/:id", crmController_1.deleteDeal);
exports.default = router;
