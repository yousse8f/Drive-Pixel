import { Router } from "express";
import {
  getNewsletterSubscribers,
  subscribeToNewsletter,
  deleteNewsletterSubscriber,
} from "../controllers/newsletterController";

const router = Router();

router.get("/", getNewsletterSubscribers);
router.post("/", subscribeToNewsletter);
router.delete("/", deleteNewsletterSubscriber);

export default router;
