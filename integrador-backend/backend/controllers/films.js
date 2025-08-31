import Film from "../models/films.js";

export const getFilms = async (req, res) => {
  console.log("GET /api/films llamado");
  try {
    const { title } = req.query;
    const filter = title ? { title } : {};
    console.log("Buscando films con filtro:", filter);
    const films = await Film.find(filter);
    console.log("Films encontrados:", films);
    res.status(200).json(films);
  } catch (error) {
    console.error("Error en getFilms:", error);
    res.status(500).json({ message: error.message });
  }
};
export const getFilmById = async (req, res) => {
  try {
    const film = await Film.findById(req.params.id);
    if (!film) {
      return res.status(404).json({ message: "Película no encontrada" });
    }
    res.status(200).json(film);
  } catch (error) {
    res.status(500).json({ message: "Id inválido" });
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
