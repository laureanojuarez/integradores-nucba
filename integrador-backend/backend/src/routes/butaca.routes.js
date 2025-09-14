import { Router } from "express";
import {
  getButacas,
  reservarButaca,
  confirmarReserva,
  cancelarReserva,
} from "../controllers/butaca.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/availability", getButacas);
router.post("/reservar", authMiddleware, reservarButaca);
router.post("/confirmar/:id", authMiddleware, confirmarReserva);
router.post("/cancelar/:id", authMiddleware, cancelarReserva);

export default router;
