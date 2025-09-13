import Pelicula from "../models/films.models.js";

const diasES = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

const slugify = (s) =>
  String(s)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const groupHorarios = (dates = []) => {
  const map = {};
  for (const d of dates) {
    const date = new Date(d);
    const day = diasES[date.getDay()];
    const hh = String(date.getHours()).padStart(2, "0");
    const mm = String(date.getMinutes()).padStart(2, "0");
    map[day] ??= [];
    const time = `${hh}:${mm}`;
    if (!map[day].includes(time)) map[day].push(time);
  }
  return map;
};

const formatDur = (min) => {
  const h = Math.floor(Number(min || 0) / 60);
  const m = Number(min || 0) % 60;
  return `${h}h ${m}m`;
};

const toDTO = (doc) => ({
  _id: doc._id,
  titulo: doc.titulo,
  duracion: doc.duracion, // minutos (raw)
  duracionText: formatDur(doc.duracion), // "Xh Ym"
  genero: doc.genero,
  horarios: doc.horarios, // [Date]
  showtimes: groupHorarios(doc.horarios), // {Dia:[HH:mm]}
  slug: slugify(doc.titulo),
});

export const getFilms = async (_req, res) => {
  const films = await Pelicula.find().lean();
  res.json(films.map(toDTO));
};

export const getFilmById = async (req, res) => {
  const film = await Pelicula.findById(req.params.id).lean();
  if (!film) return res.status(404).json({message: "Pelicula no encontrada"});
  res.json(toDTO(film));
};

export const getFilmBySlug = async (req, res) => {
  const all = await Pelicula.find().lean();
  const film = all.find((f) => slugify(f.titulo) === req.params.slug);
  if (!film) return res.status(404).json({message: "Pelicula no encontrada"});
  res.json(toDTO(film));
};
