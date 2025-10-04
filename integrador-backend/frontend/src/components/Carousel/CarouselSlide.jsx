import { Link } from "react-router-dom";

export const CarouselSlide = ({ film }) => {
  return (
    <div className="relative w-full h-full flex-shrink-0">
      <img
        src={film.backdrop || film.poster || film.image} // ← CAMBIO: más opciones de fallback
        alt={film.titulo}
        className="w-full h-full object-cover"
        loading="lazy"
        draggable={false}
        onError={(e) => {
          // Fallback si la imagen no carga
          e.target.style.display = "none";
          e.target.nextElementSibling.style.display = "flex";
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 md:p-8">
        <div className="max-w-2xl">
          <h3 className="text-lg sm:text-2xl md:text-4xl font-bold text-white mb-1 sm:mb-2 md:mb-4 line-clamp-2">
            {film.titulo}
          </h3>

          <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-3 md:mb-4">
            <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-red-600 text-white text-xs sm:text-sm font-medium rounded">
              {film.genero}
            </span>
            {film.duracion && (
              <span className="text-white/80 text-xs sm:text-sm">
                {film.duracion} min
              </span>
            )}
          </div>

          {film.overview && (
            <p className="text-white/90 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 md:mb-6 line-clamp-2 sm:line-clamp-3 hidden sm:block">
              {film.overview}
            </p>
          )}
          <Link
            to={`/films/${film.id}`}
            className="inline-flex items-center px-3 sm:px-6 py-2 sm:py-3 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm md:text-base font-medium rounded-lg transition-colors"
          >
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
};
