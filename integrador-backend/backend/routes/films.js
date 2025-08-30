import express from "express";
import { createFilm, getFilms } from "../controllers/films.js";

const router = express.Router();

router.get("/", getFilms);
router.post("/", createFilm);

export default router;
