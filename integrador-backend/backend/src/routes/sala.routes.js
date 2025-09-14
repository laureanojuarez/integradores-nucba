import { Router } from "express";
import { createSala, getSalas } from "../controllers/sala.controllers.js";

const router = Router();

router.get("/", getSalas);
router.post("/", createSala);

export default router;
