import { Router } from "express";
import pool from "../db.js";
import * as peliculasController from "../controllers/peliculas.controller.js";
import * as reservasController from "../controllers/reservas.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = Router();

// Películas
router.get("/films", peliculasController.obtenerPeliculasPopulares);
router.get("/films/:id", peliculasController.obtenerPeliculaCompleta);

// Butacas
router.get("/butacas/availability", peliculasController.obtenerDisponibilidad);
router.post(
  "/butacas/reservar",
  authenticateToken,
  reservasController.reservarButaca
);
router.post(
  "/butacas/confirmar/:id",
  authenticateToken,
  reservasController.confirmarReserva
);

// Salas
router.get("/salas", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM salas");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
