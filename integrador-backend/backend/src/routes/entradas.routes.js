import { Router } from "express";
import {
  reservarAsientos,
  confirmarReserva,
} from "../controllers/entradas.controller.js";

const router = Router();

console.log("=== CARGANDO ENTRADAS ROUTES ===");

// Ruta de test temporal
router.get("/test", (req, res) => {
  console.log("✅ Ruta de test llamada");
  res.json({ message: "Entradas router funcionando!" });
});

router.post("/reserve", (req, res, next) => {
  console.log("✅ POST /reserve llamado con datos:", req.body);
  reservarAsientos(req, res, next);
});

router.put("/confirm/:id", (req, res, next) => {
  console.log("✅ PUT /confirm/:id llamado con ID:", req.params.id);
  confirmarReserva(req, res, next);
});

console.log("=== ENTRADAS ROUTES CARGADO ===");

export default router;
