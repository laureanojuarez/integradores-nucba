import { Link } from "react-router-dom";

export const FilmCard = ({ film }) => {
  const initial = film.title?.[0]?.toUpperCase() || "?";
  const hasImage = Boolean(film.image);

  return (
    <div className="group relative flex flex-col gap-3 rounded-xl border border-neutral-700/60 bg-neutral-800/70 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-neutral-500 hover:shadow-lg hover:shadow-black/40">
      <Link to={`/films/${film.slug}`} className="">
        <div className="relative h-80 w-full overflow-hidden rounded-t-xl ring-1 ring-neutral-600/40">
          {hasImage ? (
            <img
              src={film.image}
              alt={film.title}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              loading="lazy"
              draggable="false"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-700 to-neutral-900">
              <span className="text-4xl font-bold text-neutral-300 tracking-wide">
                {initial}
              </span>
            </div>
          )}
          {/* Overlay suave */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-70 group-hover:opacity-60 transition" />
        </div>
      </Link>

      <div className="flex flex-col gap-2 p-2">
        <h3 className="text-lg font-semibold leading-snug group-hover:text-white text-neutral-100 line-clamp-2">
          {film.title}
        </h3>

        <span
          className="w-fit rounded-md bg-neutral-700/70 px-2 py-1 text-[11px] font-medium uppercase tracking-wide 
                     text-neutral-200 ring-1 ring-neutral-600/40"
        >
          {film.type}
        </span>

        {film.duration && (
          <p className="text-[11px] text-neutral-400">
            Duración: {film.duration}
          </p>
        )}
      </div>
    </div>
  );
};
