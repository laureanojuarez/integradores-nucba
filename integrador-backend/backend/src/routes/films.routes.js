import { Router } from "express";
import {
  getPeliculas,
  getPeliculaById,
  createPelicula,
  seedHorarios,
  updatePelicula,
  deletePelicula,
} from "../controllers/films.controllers.js";

const router = Router();

// ✅ RUTAS ESPECÍFICAS PRIMERO
router.get("/", getPeliculas);
router.post("/", createPelicula);
router.post("/seed-horarios", seedHorarios); // ← DEBE estar ANTES de /:id

// ✅ RUTAS CON PARÁMETROS AL FINAL
router.get("/:id", getPeliculaById);
router.put("/:id", updatePelicula);
router.delete("/:id", deletePelicula);

export default router;
