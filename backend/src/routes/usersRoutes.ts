import { Router } from "express";
import { getUsers, getUser, updateUser, deleteUser } from "../controllers/usersController";
import { adminMiddleware } from "../utils/adminMiddleware";

const router = Router();

router.get("/", adminMiddleware, getUsers);
router.get("/:id", adminMiddleware, getUser);
router.put("/:id", adminMiddleware, updateUser);
router.delete("/:id", adminMiddleware, deleteUser);

export default router;
