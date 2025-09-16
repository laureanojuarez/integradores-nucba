import pool from "../db.js";

// Reservar asientos
export const reservarAsientos = async (req, res) => {
  try {
    const { peliculaId, salaId, horario, fila, columna } = req.body;

    console.log("Datos de reserva recibidos:", req.body);

    // Buscar película local si es TMDB ID
    let peliculaLocalId = peliculaId;
    if (peliculaId > 100000) {
      const [pelicula] = await pool.query(
        "SELECT id FROM peliculas WHERE tmdbId = ?",
        [peliculaId]
      );
      if (pelicula.length > 0) {
        peliculaLocalId = pelicula[0].id;
      }
    }

    // Convertir horario a fecha y hora
    const horarioDate = new Date(horario);
    const [fecha, timePart] = horarioDate.toISOString().split("T");
    const hora = timePart.split(".")[0];

    console.log("Horario original:", horario);
    console.log("Fecha extraída:", fecha);
    console.log("Hora extraída:", hora);
    console.log("Película ID:", peliculaId);
    console.log("Sala ID:", salaId);

    const [funciones] = await pool.query(
      `SELECT id FROM funciones 
       WHERE pelicula_id = ? AND sala_id = ? AND fecha = ? AND hora = ?`,
      [peliculaLocalId, salaId, fecha, hora]
    );

    // Mostrar funciones disponibles ANTES de buscar
    const [funcionesDisponibles] = await pool.query(
      `SELECT id, fecha, hora FROM funciones 
   WHERE pelicula_id = ? AND sala_id = ?`,
      [peliculaLocalId, salaId]
    );
    console.log(
      "Funciones disponibles para la película y sala:",
      funcionesDisponibles
    );

    if (funciones.length === 0) {
      return res.status(404).json({ error: "Función no encontrada" });
    }

    const funcionId = funciones[0].id;
    console.log("Función encontrada con ID:", funcionId);

    // Verificar si el asiento ya está ocupado
    const [asientoExistente] = await pool.query(
      `SELECT id FROM entradas 
       WHERE funcion_id = ? AND fila = ? AND butaca_numero = ? 
       AND estado IN ('reservada', 'ocupada')`,
      [funcionId, fila, columna]
    );

    if (asientoExistente.length > 0) {
      return res.status(400).json({ error: "El asiento ya está ocupado" });
    }

    // Crear la entrada (reserva)
    const [resultado] = await pool.query(
      `INSERT INTO entradas (funcion_id, fila, butaca_numero, estado, precio)
       VALUES (?, ?, ?, 'reservada', 1500.00)`,
      [funcionId, fila, columna]
    );

    console.log("Entrada creada con ID:", resultado.insertId);

    res.status(201).json({
      id: resultado.insertId,
      funcionId,
      fila,
      columna: columna,
      estado: "reservada",
      precio: 1500.0,
    });
  } catch (error) {
    console.error("Error reservando asiento:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Confirmar reserva (cambiar estado a ocupada)
export const confirmarReserva = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Confirmando reserva ID:", id);

    const [resultado] = await pool.query(
      `UPDATE entradas SET estado = 'ocupada' WHERE id = ?`,
      [id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    console.log("Reserva confirmada:", id);

    res.json({ message: "Reserva confirmada", id });
  } catch (error) {
    console.error("Error confirmando reserva:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
