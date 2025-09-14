import Sala from "../models/sala.models.js";

// Listar salas
export const getSalas = async (req, res) => {
  try {
    const salas = await Sala.find();
    res.json(salas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear sala
export const createSala = async (req, res) => {
  try {
    const { nombre, filas, columnas } = req.body;
    const sala = new Sala({ nombre, filas, columnas });
    const savedSala = await sala.save();
    res.status(201).json(savedSala);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
