import express from "express";
import {createFilm, getFilmById, getFilms} from "../controllers/films.js";

const router = express.Router();

router.get("/", getFilms);
router.post("/", createFilm);
router.get("/:id", getFilmById);

export default router;
