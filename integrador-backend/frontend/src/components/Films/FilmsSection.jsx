import {useFilms} from "../../hooks/useFilms";
import {FilmsList} from "./FilmList";

export const FilmsSection = () => {
  const {films, loading, error} = useFilms();
  return (
    <section>
      <h2 className="text-xl font-bold">Peliculas en cartelera</h2>
      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-400">{error}</p>}
      {!loading && !error && <FilmsList films={films} />}
    </section>
  );
};
