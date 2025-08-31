import {http} from "./http";

export function fetchFilms(title) {
  const q = title ? `?title=${encodeURIComponent(title)}` : "";
  return http(`/films${q}`);
}
