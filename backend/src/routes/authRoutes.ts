import { Router } from "express";
import { signup, login, validateFirstLogin, completeFirstLogin } from "../controllers/authController";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/first-login/validate", validateFirstLogin);
router.post("/first-login", completeFirstLogin);

export default router;
