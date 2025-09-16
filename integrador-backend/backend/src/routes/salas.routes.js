import { Router } from "express";
import {
  obtenerSalas,
  obtenerSalaPorId,
} from "../controllers/salas.controller.js";

const router = Router();

router.get("/", obtenerSalas);
router.get("/:id", obtenerSalaPorId);

export default router;
