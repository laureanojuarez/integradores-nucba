import { Router } from "express";
import * as peliculasController from "../controllers/peliculas.controller.js";
import entradasRouter from "./entradas.routes.js";
import salasRouter from "./salas.routes.js";

const router = Router();

console.log("=== CARGANDO PELICULAS ROUTES ===");

// Películas
router.get("/films", peliculasController.obtenerPeliculasPopulares);
router.get("/films/:id", peliculasController.obtenerPeliculaCompleta);

// Butacas/Disponibilidad
router.get("/availability", peliculasController.obtenerDisponibilidad);

// Salas
router.use("/salas", salasRouter);
console.log("✅ Salas router registrado");

// Entradas/Reservas
router.use("/seats", entradasRouter);
console.log("✅ Entradas router registrado");

console.log("=== PELICULAS ROUTES CARGADO ===");

export default router;
