import {useEffect, useState} from "react";
import {FilmsList} from "./FilmList";
import {fetchFilms} from "../../hooks/useFetchFilms";

export const FilmsSection = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // normaliza backend -> frontend
  const normalizeFilm = (f) => ({
    id: f.id,
    title: f.titulo,
    type: f.genero,
    duration: f.duracion ? `${f.duracion} min` : null,
    image: f.image || null,
  });

  useEffect(() => {
    let ignore = false;
    fetchFilms()
      .then((data) => {
        if (!ignore) setItems(data.map(normalizeFilm));
      })
      .catch((e) => !ignore && setError(e.message || "Error al cargar"))
      .finally(() => !ignore && setLoading(false));
    return () => {
      ignore = true;
    };
  }, []);

  if (loading) return <p className="mt-4 text-neutral-400">Cargando...</p>;
  if (error) return <p className="mt-4 text-red-400">{error}</p>;

  return (
    <section>
      <h2 className="text-xl font-bold mb-3">Películas en cartelera</h2>
      <FilmsList films={items} />
    </section>
  );
};
