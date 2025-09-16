import pool from "../db.js";

// Obtener todas las salas
export const obtenerSalas = async (req, res) => {
  try {
    const [salas] = await pool.query(
      "SELECT id, nombre, filas, columnas, capacidad FROM salas ORDER BY nombre"
    );

    res.json(salas);
  } catch (error) {
    console.error("Error obteniendo salas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Obtener sala por ID
export const obtenerSalaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const [salas] = await pool.query("SELECT * FROM salas WHERE id = ?", [id]);

    if (salas.length === 0) {
      return res.status(404).json({ error: "Sala no encontrada" });
    }

    res.json(salas[0]);
  } catch (error) {
    console.error("Error obteniendo sala:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
