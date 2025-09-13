import {Router} from "express";
import {auth} from "../middlewares/auth.middleware.js";
import {
  getButacas,
  updateButaca,
  deleteButaca,
  getAvailability,
  reserveSeats,
} from "../controllers/butaca.controllers.js";

const router = Router();

router.get("/", getButacas);
router.put("/:id", updateButaca);
router.delete("/:id", deleteButaca);

router.get("availability", getAvailability);
router.post("/reserve", auth, reserveSeats);

export default router;
