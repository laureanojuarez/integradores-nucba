import Pelicula from "../models/films.models.js";

const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";
const IMG_BASE_BACKDROP = "https://image.tmdb.org/t/p/w1280";

async function tmdb(path) {
  console.log("🔍 TMDB Token exists:", !!process.env.TMDB_TOKEN);
  console.log("🔍 TMDB URL:", `${BASE_URL}${path}`);
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  console.log("🔍 TMDB Response Status:", res.status);

  if (!res.ok) {
    throw new Error(`TMDB error ${res.status}`);
  }
  return res.json();
}

export const getPeliculas = async (_req, res) => {
  try {
    // 1. Obtener películas de TMDB
    const { genres } = await tmdb(`/genre/movie/list?language=es-ES`).catch(
      () => ({
        genres: [],
      })
    );
    const genreMap = Object.fromEntries(genres.map((g) => [g.id, g.name]));

    const tmdbData = await tmdb(`/movie/now_playing?language=es-ES&page=1`);

    // 2. Transformar películas de TMDB
    const tmdbMovies = (tmdbData.results || []).map((m) => ({
      _id: m.id.toString(), // Convertir a string para compatibilidad
      id: m.id,
      titulo: m.title || m.original_title,
      genero:
        (m.genre_ids?.length ? genreMap[m.genre_ids[0]] : "Película") ||
        "Película",
      duracion: null, // Se obtiene individualmente si es necesario
      poster: m.poster_path ? `${IMG_BASE}${m.poster_path}` : null,
      backdrop: m.backdrop_path
        ? `${IMG_BASE_BACKDROP}${m.backdrop_path}`
        : null,
      overview: m.overview || "",
      horarios: [], // Inicialmente vacío, se agregan desde la base de datos local
    }));

    // 3. Obtener horarios de la base de datos local
    const peliculasConHorarios = await Promise.all(
      tmdbMovies.map(async (movie) => {
        try {
          // Buscar si existe en nuestra base de datos
          const peliculaLocal = await Pelicula.findOne({
            $or: [{ tmdbId: movie.id }, { titulo: movie.titulo }],
          });

          return {
            ...movie,
            horarios: peliculaLocal?.horarios || [],
          };
        } catch (error) {
          console.error("Error obteniendo horarios para:", movie.titulo);
          return movie;
        }
      })
    );

    res.json(peliculasConHorarios);
  } catch (error) {
    console.error("Error en getPeliculas:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getPeliculaById = async (req, res) => {
  try {
    const { id } = req.params;

    const tmdbMovie = await tmdb(`/movie/${id}?language=es-ES`);

    const peliculaLocal = await Pelicula.findOne({
      $or: [{ tmdbId: parseInt(id) }, { titulo: tmdbMovie.title }],
    });

    const pelicula = {
      _id: tmdbMovie.id.toString(),
      id: tmdbMovie.id,
      titulo: tmdbMovie.title,
      genero: tmdbMovie.genres?.[0]?.name || "Película",
      duracion: tmdbMovie.runtime,
      poster: tmdbMovie.poster_path
        ? `${IMG_BASE}${tmdbMovie.poster_path}`
        : null,
      backdrop: tmdbMovie.backdrop_path
        ? `${IMG_BASE_BACKDROP}${tmdbMovie.backdrop_path}`
        : null,
      overview: tmdbMovie.overview || "",
      horarios: peliculaLocal?.horarios || [],
    };

    res.json(pelicula);
  } catch (error) {
    console.error("Error en getPeliculaById:", error);
    res.status(500).json({ message: error.message });
  }
};

export const createPelicula = async (req, res) => {
  try {
    const { tmdbId, titulo, horarios = [] } = req.body;

    // Buscar si ya existe
    let pelicula = await Pelicula.findOne({
      $or: [{ tmdbId }, { titulo }],
    });

    if (pelicula) {
      // Actualizar horarios existentes
      pelicula.horarios = [...new Set([...pelicula.horarios, ...horarios])];
      await pelicula.save();
    } else {
      // Crear nueva entrada
      pelicula = await Pelicula.create({
        tmdbId: parseInt(tmdbId),
        titulo,
        horarios,
      });
    }

    res.status(201).json(pelicula);
  } catch (error) {
    console.error("Error en createPelicula:", error);
    res.status(500).json({ message: "Error al crear/actualizar la película" });
  }
};

// Mantener las otras funciones como están
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

export const seedHorarios = async (req, res) => {
  try {
    // Obtener películas de TMDB
    const tmdbData = await tmdb(`/movie/now_playing?language=es-ES&page=1`);
    const peliculas = tmdbData.results.slice(0, 8); // Solo las primeras 8

    // Generar horarios para los próximos 10 días
    const generarHorarios = () => {
      const horarios = [];
      const hoy = new Date();

      for (let dia = 0; dia < 10; dia++) {
        const fecha = new Date(hoy);
        fecha.setDate(hoy.getDate() + dia);

        // Horarios: 14:00, 16:30, 19:00, 21:30
        const horariosDia = ["14:00", "16:30", "19:00", "21:30"];

        horariosDia.forEach((hora) => {
          const [hours, minutes] = hora.split(":");
          const fechaCompleta = new Date(fecha);
          fechaCompleta.setHours(parseInt(hours), parseInt(minutes), 0, 0);
          horarios.push(fechaCompleta);
        });
      }
      return horarios;
    };

    const horarios = generarHorarios();
    const resultados = [];

    // Agregar horarios a cada película
    for (const movie of peliculas) {
      let pelicula = await Pelicula.findOne({ tmdbId: movie.id });

      if (pelicula) {
        // Solo agregar horarios si no tiene ninguno
        if (pelicula.horarios.length === 0) {
          pelicula.horarios = horarios;
          await pelicula.save();
        }
      } else {
        pelicula = await Pelicula.create({
          tmdbId: movie.id,
          titulo: movie.title,
          genero: movie.genre_ids?.[0] ? "Acción" : "Película",
          duracion: 120, // Duración default
          poster: movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : null,
          horarios: horarios,
        });
      }

      resultados.push({
        id: movie.id,
        titulo: movie.title,
        horariosAgregados: horarios.length,
        yaExistia: !!pelicula.createdAt,
      });
    }

    res.json({
      message: "✅ Horarios de prueba agregados exitosamente",
      peliculasActualizadas: resultados.length,
      horariosPorPelicula: horarios.length,
      proximosDias: 10,
      horariosDiarios: ["14:00", "16:30", "19:00", "21:30"],
      resultados,
    });
  } catch (error) {
    console.error("Error en seedHorarios:", error);
    res.status(500).json({ message: error.message });
  }
};
