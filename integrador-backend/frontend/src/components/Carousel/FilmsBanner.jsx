import { useEffect, useState } from "react";
import { fetchFilms } from "../../hooks/useFetchFilms";
import Carousel from "../Carousel/Carousel";
import { CarouselSlide } from "../Carousel/CarouselSlide";

export const FilmsBanner = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    fetchFilms()
      .then((data) => {
        if (!ignore) {
          const filmsWithBackdrop = data.filter((f) => f.backdrop).slice(0, 5);
          setFilms(filmsWithBackdrop);
        }
      })
      .catch((e) => console.error("Error al cargar banners:", e))
      .finally(() => !ignore && setLoading(false));
    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="w-full h-48 sm:h-64 md:h-96 lg:h-[500px] bg-neutral-800 flex items-center justify-center mb-6 sm:mb-8">
        <p className="text-neutral-400 text-sm sm:text-base">
          Cargando banner...
        </p>
      </div>
    );
  }

  if (films.length === 0) {
    return null;
  }

  return (
    <div className="w-full mb-6 sm:mb-8 -mx-4 sm:mx-0">
      <Carousel
        autoPlay={true}
        interval={5000}
        height="h-48 sm:h-64 md:h-96 lg:h-[500px]"
        fullWidth={true}
        className="sm:rounded-xl overflow-hidden"
      >
        {films.map((film) => (
          <CarouselSlide key={film.id} film={film} />
        ))}
      </Carousel>
    </div>
  );
};
