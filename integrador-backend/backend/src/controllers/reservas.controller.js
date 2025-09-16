import pool from "../db.js";

export const reservarButaca = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const { peliculaId, salaId, horario, fila, columna } = req.body;
    const usuarioId = req.user?.id || 1; // Temporal hasta que tengas auth

    // Buscar película local
    let peliculaLocalId = peliculaId;
    if (peliculaId > 100000) {
      const [pelicula] = await connection.query(
        "SELECT id FROM peliculas WHERE tmdbId = ?",
        [peliculaId]
      );
      if (pelicula.length > 0) {
        peliculaLocalId = pelicula[0].id;
      }
    }

    const horarioDate = new Date(horario);
    const fecha = horarioDate.toISOString().split("T")[0];
    const hora = horarioDate.toTimeString().split(" ")[0];

    const [funciones] = await connection.query(
      `
      SELECT id FROM funciones 
      WHERE pelicula_id = ? AND sala_id = ? AND fecha = ? AND hora = ?
    `,
      [peliculaLocalId, salaId, fecha, hora]
    );

    if (funciones.length === 0) {
      throw new Error("Función no encontrada");
    }

    const funcionId = funciones[0].id;

    // Verificar disponibilidad
    const [existente] = await connection.query(
      `
      SELECT id FROM entradas 
      WHERE funcion_id = ? AND fila = ? AND butaca_numero = ?
    `,
      [funcionId, fila, columna]
    );

    if (existente.length > 0) {
      throw new Error("Butaca ya ocupada");
    }

    // Crear reserva
    const [resultado] = await connection.query(
      `
      INSERT INTO entradas (funcion_id, usuario_id, fila, butaca_numero, estado, precio)
      VALUES (?, ?, ?, ?, 'reservada', 1500)
    `,
      [funcionId, usuarioId, fila, columna]
    );

    await connection.commit();
    res.status(201).json({ _id: resultado.insertId, funcionId, ...req.body });
  } catch (error) {
    await connection.rollback();
    res.status(400).json({ error: error.message });
  } finally {
    connection.release();
  }
};

export const confirmarReserva = async (req, res) => {
  try {
    const { id } = req.params;

    const [resultado] = await pool.query(
      `
      UPDATE entradas SET estado = 'ocupada' 
      WHERE id = ? AND estado = 'reservada'
    `,
      [id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error al confirmar:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
