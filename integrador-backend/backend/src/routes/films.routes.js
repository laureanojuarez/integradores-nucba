import { Router } from "express";
import {
  getPeliculas,
  getPeliculaById,
  createPelicula,
} from "../controllers/films.controllers.js";

const router = Router();

router.get("/", getPeliculas);
router.get("/:id", getPeliculaById);
router.post("/", createPelicula);

export default router;
