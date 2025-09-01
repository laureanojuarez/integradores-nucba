import { FilmCard } from "./FilmCard";

// Lista ahora solo presenta (sin fetch interno)
export const FilmsList = ({ films }) => {
  return (
    <div className="p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {films.map((f) => (
        <FilmCard key={f.id} film={f} />
      ))}
    </div>
  );
};
