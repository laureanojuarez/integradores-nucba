import pool from "../db.js";
import "dotenv/config";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Obtener películas populares de TMDB
export const obtenerPeliculasPopulares = async (req, res) => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=es-ES&page=1`
    );

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data = await response.json();

    const peliculas = data.results.map((movie) => ({
      id: movie.id,
      titulo: movie.title,
      poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null,
      genero: "Por clasificar",
      duracion: null,
    }));

    res.json(peliculas);
  } catch (error) {
    console.error("Error obteniendo películas populares:", error);
    res.status(500).json({ error: "Error obteniendo películas" });
  }
};

// Obtener película por ID (auto-guarda si no existe)
export const obtenerPeliculaCompleta = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Buscando película con ID:", id);

    // Buscar en BD local primero
    const [peliculaLocal] = await pool.query(
      "SELECT * FROM peliculas WHERE tmdbId = ?",
      [id]
    );

    let pelicula;

    if (peliculaLocal.length > 0) {
      console.log("Película encontrada en BD local");
      pelicula = peliculaLocal[0];
    } else {
      console.log("Película no encontrada en BD, buscando en TMDB...");

      // Obtener de TMDB y guardar
      const response = await fetch(
        `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=es-ES`
      );

      if (!response.ok) {
        console.log("Error en TMDB:", response.status);
        return res.status(404).json({ error: "Película no encontrada" });
      }

      const tmdbData = await response.json();
      console.log("Datos de TMDB obtenidos:", tmdbData.title);

      const [resultado] = await pool.query(
        `INSERT INTO peliculas (tmdbId, titulo, genero, duracion, poster, sinopsis)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          tmdbData.id,
          tmdbData.title,
          tmdbData.genres?.map((g) => g.name).join(", ") || "Desconocido",
          tmdbData.runtime || null,
          tmdbData.poster_path
            ? `https://image.tmdb.org/t/p/w500${tmdbData.poster_path}`
            : null,
          tmdbData.overview || null,
        ]
      );

      console.log("Película guardada en BD con ID:", resultado.insertId);

      // Crear funciones automáticas
      await crearFuncionesAutomaticas(resultado.insertId);

      pelicula = {
        id: resultado.insertId,
        tmdbId: tmdbData.id,
        titulo: tmdbData.title,
        genero: tmdbData.genres?.map((g) => g.name).join(", ") || "Desconocido",
        duracion: tmdbData.runtime || null,
        poster: tmdbData.poster_path
          ? `https://image.tmdb.org/t/p/w500${tmdbData.poster_path}`
          : null,
        sinopsis: tmdbData.overview || null,
      };
    }

    // Obtener horarios
    console.log("Buscando horarios para película ID:", pelicula.id);
    const [funciones] = await pool.query(
      `SELECT 
     DATE(fecha) as fecha,
     TIME(hora) as hora
   FROM funciones 
   WHERE pelicula_id = ?
   GROUP BY DATE(fecha), TIME(hora)
   ORDER BY DATE(fecha), TIME(hora)`,
      [pelicula.id]
    );

    console.log("Funciones encontradas:", funciones.length);
    console.log("Datos completos de funciones:", funciones);

    // Validar horarios antes de enviarlos
    const horariosValidos = funciones.map((f) => {
      const fechaStr = f.fecha.toISOString().split("T")[0]; // Solo la fecha YYYY-MM-DD
      const horaStr = f.hora; // Ya viene como HH:MM:SS
      const horarioCompleto = `${fechaStr}T${horaStr}.000Z`;

      console.log(`Procesando: ${fechaStr} + ${horaStr} = ${horarioCompleto}`);
      return horarioCompleto;
    });
    console.log("Horarios válidos:", horariosValidos);

    res.json({
      ...pelicula,
      horarios: horariosValidos,
    });
  } catch (error) {
    console.error("Error completo al obtener película:", error);
    res.status(500).json({
      error: "Error interno del servidor",
      details: error.message,
    });
  }
};

// Obtener disponibilidad de butacas
export const obtenerDisponibilidad = async (req, res) => {
  try {
    const { peliculaId, salaId, horario } = req.query;

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

    const horarioDate = new Date(horario);
    const [fecha, timePart] = horarioDate.toISOString().split("T");
    const hora = timePart.split(".")[0];

    const [funciones] = await pool.query(
      `SELECT id FROM funciones 
       WHERE pelicula_id = ? AND sala_id = ? AND fecha = ? AND hora = ?`,
      [peliculaLocalId, salaId, fecha, hora]
    );

    if (funciones.length === 0) {
      return res.json([]);
    }

    const [butacas] = await pool.query(
      `SELECT fila, butaca_numero as columna
       FROM entradas 
       WHERE funcion_id = ? AND estado IN ('ocupada', 'reservada')`,
      [funciones[0].id]
    );

    res.json(butacas);
  } catch (error) {
    console.error("Error al obtener disponibilidad:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Función auxiliar para crear funciones automáticas
const crearFuncionesAutomaticas = async (peliculaId) => {
  try {
    console.log("=== CREANDO FUNCIONES PARA PELÍCULA ID:", peliculaId, "===");

    const [salas] = await pool.query("SELECT id, nombre FROM salas");
    console.log("Salas disponibles:", salas);

    if (salas.length === 0) {
      console.log("❌ No hay salas disponibles para crear funciones");
      return;
    }

    const horarios = ["18:00", "21:00"];
    const hoy = new Date();
    let funcionesCreadas = 0;

    for (let i = 0; i < 7; i++) {
      const fecha = new Date(hoy);
      fecha.setDate(hoy.getDate() + i);
      const fechaStr = fecha.toISOString().split("T")[0];

      for (const sala of salas) {
        for (const horario of horarios) {
          try {
            console.log(
              `Creando función: Película ${peliculaId}, Sala ${sala.id}, Fecha ${fechaStr}, Hora ${horario}`
            );

            const [resultado] = await pool.query(
              `INSERT IGNORE INTO funciones (pelicula_id, sala_id, fecha, hora)
               VALUES (?, ?, ?, ?)`,
              [peliculaId, sala.id, fechaStr, horario]
            );

            if (resultado.affectedRows > 0) {
              funcionesCreadas++;
              console.log(`✅ Función creada con ID: ${resultado.insertId}`);
            } else {
              console.log(`⚠️ Función ya existía o no se creó`);
            }
          } catch (insertError) {
            console.log("❌ Error insertando función:", insertError.message);
          }
        }
      }
    }

    console.log(
      `=== RESUMEN: ${funcionesCreadas} funciones creadas para película ${peliculaId} ===`
    );
  } catch (error) {
    console.error("❌ Error creando funciones:", error);
  }
};
