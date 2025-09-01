import { useParams } from "react-router-dom";
import { films } from "../../mock/films";

export default function FilmDetail() {
  const { slug } = useParams();
  const film = films.find((f) => f.slug === slug);

  if (!film) {
    return (
      <div className="mt-10">
        <p className="text-sm text-neutral-400">Película no encontrada.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{film.title}</h1>
        <div className="flex flex-wrap gap-3 text-sm text-neutral-300">
          <span className="rounded bg-neutral-700/40 px-2 py-1">
            {film.type}
          </span>
          {film.duration && <span>{film.duration}</span>}
        </div>
      </header>

      {film.image && (
        <div className="overflow-hidden rounded-xl ring-1 ring-neutral-700/50">
          <img
            src={film.image}
            alt={film.title}
            className="w-full max-h-[420px] object-cover"
          />
        </div>
      )}

      {film.days?.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
            Días
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {film.days.map((d) => (
              <li
                key={d}
                className="rounded border border-neutral-600/40 bg-neutral-700/30 px-2 py-1 text-xs text-neutral-200"
              >
                {d}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
