import { films } from "../../mock/films";
import { FilmsList } from "./FilmList";

export const FilmsSection = () => {
  return (
    <section>
      <h2 className="text-xl font-bold">Peliculas en cartelera</h2>
      <FilmsList films={films} />
    </section>
  );
};
