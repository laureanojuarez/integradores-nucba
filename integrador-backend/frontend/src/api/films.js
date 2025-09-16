import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000"; // Cambiar a localhost

export const filmsAPI = axios.create({
  baseURL: `${API}/api/films`,
  withCredentials: true,
});

export const fetchFilms = () => filmsAPI.get("/").then((r) => r.data);
export const fetchFilmById = (id) => filmsAPI.get(`/${id}`).then((r) => r.data);
