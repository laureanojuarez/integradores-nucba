import { Router } from "express";
import { login, profile } from "../controllers/auth.js";

const router = Router();
router.post("/login", login);
router.get("/profile/:id", profile);

export default router;
