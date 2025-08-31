// ...existing code...
export const FilmCard = ({film}) => {
  // Si en el futuro agregas film.image usa: const img = film.image || null;
  const initial = film.title?.[0]?.toUpperCase() || "?";

  return (
    <div
      className="group relative flex flex-col gap-3 rounded-xl border border-neutral-700/60 bg-neutral-800/70 p-4 
                 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-neutral-500 hover:shadow-lg
                 hover:shadow-black/40"
    >
      {/* Placeholder de imagen / avatar */}
      <div
        className="flex h-24 w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br 
                   from-neutral-700 to-neutral-900 ring-1 ring-neutral-600/40 group-hover:from-neutral-600 
                   group-hover:to-neutral-800"
      >
        <span className="text-4xl font-bold text-neutral-300 tracking-wide">
          {initial}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold leading-snug group-hover:text-white text-neutral-100">
          {film.title}
        </h3>

        <span
          className="w-fit rounded-md bg-neutral-700/70 px-2 py-1 text-[11px] font-medium uppercase tracking-wide 
                     text-neutral-200 ring-1 ring-neutral-600/40"
        >
          {film.technology}
        </span>

        <p className="mt-1 text-[11px] text-neutral-400">
          Creado:{" "}
          <time dateTime={film.createdAt}>
            {new Date(film.createdAt).toLocaleDateString()}
          </time>
        </p>
      </div>

      {/* Glow decorativo */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition 
                   group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.08), transparent 60%)",
        }}
      />
    </div>
  );
};
// ...existing code...
