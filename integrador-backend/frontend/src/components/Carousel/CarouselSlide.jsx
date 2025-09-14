import {Link} from "react-router-dom";

export const CarouselSlide = ({film}) => {
  return (
    <div className="relative w-full h-full flex-shrink-0">
      {/* Imagen de fondo */}
      <img
        src={film.backdrop || film.image}
        alt={film.titulo}
        className="w-full h-full object-cover"
        loading="lazy"
        draggable={false}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

      {/* Contenido */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <div className="max-w-2xl">
          <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4">
            {film.titulo}
          </h3>

          <div className="flex items-center gap-4 mb-3 md:mb-4">
            <span className="px-3 py-1 bg-red-600 text-white text-sm font-medium rounded">
              {film.genero}
            </span>
            {film.duracion && (
              <span className="text-white/80 text-sm">{film.duracion} min</span>
            )}
          </div>

          {film.overview && (
            <p className="text-white/90 text-sm md:text-base mb-4 md:mb-6 line-clamp-3">
              {film.overview}
            </p>
          )}

          <Link
            to={`/films/${film.id}`}
            className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
          >
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
};
