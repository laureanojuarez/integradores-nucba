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

    // Obtener horarios - CORREGIDO: usar pool en lugar de connection
    const [funciones] = await pool.query(
      `SELECT CONCAT(fecha, 'T', hora, ':00.000Z') as horario
       FROM funciones WHERE pelicula_id = ?
       GROUP BY fecha, hora
       ORDER BY fecha, hora`,
      [pelicula.id]
    );

    console.log("Horarios encontrados:", funciones.length);

    res.json({
      ...pelicula,
      horarios: funciones.map((f) => f.horario),
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
    const fecha = horarioDate.toISOString().split("T")[0];
    const hora = horarioDate.toTimeString().split(" ")[0];

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

// Función auxiliar para crear funciones automáticas - CORREGIDO: usar pool
const crearFuncionesAutomaticas = async (peliculaId) => {
  try {
    const [salas] = await pool.query("SELECT id FROM salas LIMIT 2");
    if (salas.length === 0) {
      console.log("No hay salas disponibles para crear funciones");
      return;
    }

    const horarios = ["18:00", "21:00"];
    const hoy = new Date();

    for (let i = 0; i < 7; i++) {
      const fecha = new Date(hoy);
      fecha.setDate(hoy.getDate() + i);
      const fechaStr = fecha.toISOString().split("T")[0];

      for (const sala of salas) {
        for (const horario of horarios) {
          try {
            await pool.query(
              `INSERT IGNORE INTO funciones (pelicula_id, sala_id, fecha, hora)
               VALUES (?, ?, ?, ?)`,
              [peliculaId, sala.id, fechaStr, horario]
            );
          } catch (insertError) {
            console.log("Error insertando función:", insertError.message);
          }
        }
      }
    }

    console.log("Funciones automáticas creadas para película:", peliculaId);
  } catch (error) {
    console.error("Error creando funciones:", error);
  }
};
