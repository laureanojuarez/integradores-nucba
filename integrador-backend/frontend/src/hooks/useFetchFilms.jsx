const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";
const IMG_BASE_BACKDROP = "https://image.tmdb.org/t/p/w1280";

async function tmdb(path) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(msg || `TMDB error ${res.status}`);
  }
  return res.json();
}

// Devuelve películas "en cartelera" y las normaliza al shape del frontend
export async function fetchFilms() {
  // 1) Trae catálogo de géneros para mapear genre_ids -> nombre
  const {genres} = await tmdb(`/genre/movie/list?language=es-ES`).catch(() => ({
    genres: [],
  }));
  const genreMap = Object.fromEntries(genres.map((g) => [g.id, g.name]));

  // 2) Películas en cartelera
  const data = await tmdb(`/movie/now_playing?language=es-ES&page=1`);

  return (data.results || []).map((m) => ({
    id: m.id, // <-- usá este id de TMDB en tu backend para butacas/funciones
    titulo: m.title || m.original_title,
    genero:
      (m.genre_ids?.length ? genreMap[m.genre_ids[0]] : "Película") ||
      "Película",
    duracion: null, // si necesitás runtime, pedilo por id: /movie/{id}
    image: m.poster_path ? `${IMG_BASE}${m.poster_path}` : null,
    backdrop: m.backdrop_path ? `${IMG_BASE_BACKDROP}${m.backdrop_path}` : null,
    overview: m.overview || "",
  }));
}

// Opcional: detalle para runtime si lo necesitás en otra vista
export async function fetchFilmDetails(id) {
  const d = await tmdb(`/movie/${id}?language=es-ES`);
  return {
    id: d.id,
    titulo: d.title,
    genero: d.genres?.[0]?.name || "Película",
    duracion: d.runtime ?? null,
    image: d.poster_path ? `${IMG_BASE}${d.poster_path}` : null,
  };
}
