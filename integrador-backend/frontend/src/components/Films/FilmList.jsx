import { FilmCard } from "./FilmCard";

export const FilmsList = ({ films }) => {
  return (
    <div className="py-2 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {films.map((f) => (
        <FilmCard key={f.id} film={f} />
      ))}
    </div>
  );
};
