import {Router} from "express";
import {
  getFilms,
  getFilmById,
  getFilmBySlug,
} from "../controllers/films.controllers.js";

const router = Router();

router.get("/", getFilms);
router.get("/id/:id", getFilmById);
router.get("/slug/:slug", getFilmBySlug);

export default router;
