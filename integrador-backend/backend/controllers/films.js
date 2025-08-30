import Film from "../models/films.js";

export const getFilms = async (req, res) => {
  try {
    const { title } = req.query;
    const filter = title ? { title } : {};
    const films = await Film.find(filter);
    res.status(200).json(films);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFilmById = async (req, res) => {
  try {
    const film = await Film.findById(req.params.id);
    if (!film) return res.status(404).json({ message: "Film no encontrado" });

    res.status(200).json(film);
  } catch (error) {
    res.status(500).json({ message: "Id invalido" });
  }
};

export const createFilm = async (req, res) => {
  try {
    const newFilm = new Film(req.body);
    await newFilm.save();
    res.status(201).json(newFilm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
