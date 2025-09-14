import Pelicula from "../models/films.models.js";

// Listar todas las peliculas
export const getPeliculas = async (_req, res) => {
  try {
    const pelis = await Pelicula.find().sort({ createdAt: -1 });
    res.json(pelis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Detalle de una pelicula
export const getPeliculaById = async (req, res) => {
  try {
    const peli = await Pelicula.findById(req.params.id);
    if (!peli) {
      return res.status(404).json({ message: "Película no encontrada" });
    }
    res.json(peli);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Agregar pelicula (solo admin)
export const createPelicula = async (req, res) => {
  try {
    const { titulo, duracion, genero, poster, horarios = [] } = req.body;
    const peli = await Pelicula.create({
      titulo,
      duracion: Number(duracion),
      genero,
      poster,
      horarios,
    });
    res.status(201).json(peli);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la película" });
  }
};

// Editar pelicula
export const updatePelicula = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFilm = await Pelicula.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedFilm) {
      return res.status(404).json({ message: "Película no encontrada" });
    }
    res.json(updatedFilm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Borrar pelicula
export const deletePelicula = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFilm = await Pelicula.findByIdAndDelete(id);
    if (!deletedFilm) {
      return res.status(404).json({ message: "Película no encontrada" });
    }
    res.json({ message: "Película eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
