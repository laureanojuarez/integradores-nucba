import { Router } from "express";
import { login, profile, register } from "../controllers/auth.controllers.js";

const router = Router();
router.post("/register", register);
router.post("/login", login);
router.get("/profile/:id", profile);

export default router;
