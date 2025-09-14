import {useEffect, useState} from "react";
import {fetchFilms} from "../../hooks/useFetchFilms";
import Carousel from "../Carousel/Carousel";
import {CarouselSlide} from "../Carousel/CarouselSlide";

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
      <div className="w-screen h-64 md:h-96 lg:h-[500px] bg-neutral-800 flex items-center justify-center mb-8">
        <p className="text-neutral-400">Cargando banner...</p>
      </div>
    );
  }

  if (films.length === 0) {
    return null;
  }

  return (
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mb-8">
      <Carousel
        autoPlay={true}
        interval={5000}
        height="h-64 md:h-96 lg:h-[500px]"
        className="w-full"
        fullWidth={true}
      >
        {films.map((film) => (
          <CarouselSlide key={film.id} film={film} />
        ))}
      </Carousel>
    </div>
  );
};
