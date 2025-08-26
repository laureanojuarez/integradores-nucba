// ...existing code...
import {useEffect, useCallback, useState, useRef} from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import "./embla-carousel.css";

export function EmblaCarousel({
  slides = ["Slide 1", "Slide 2", "Slide 3"],
  loop = false,
  autoplay = false,
  autoplayDelay = 4000,
  stopOnInteraction = true,
  label = "Carrusel",
}) {
  const autoplayRef = useRef(
    Autoplay(
      {
        delay: autoplayDelay,
        stopOnInteraction, // si true se detiene al interactuar
        stopOnMouseEnter: true,
      },
      (emblaRoot) => emblaRoot.parentElement // root para eventos hover
    )
  );

  const plugins = autoplay ? [autoplayRef.current] : [];
  const [emblaRef, emblaApi] = useEmblaCarousel({loop}, plugins);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Reaplicar delay si cambia prop
  useEffect(() => {
    if (autoplay && autoplayRef.current) {
      autoplayRef.current.options.delay = autoplayDelay;
    }
  }, [autoplay, autoplayDelay]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (i) => emblaApi && emblaApi.scrollTo(i),
    [emblaApi]
  );

  // Pausar y reanudar manualmente si quieres cuando recibe foco
  const pause = () => {
    if (autoplay && autoplayRef.current) autoplayRef.current.stop();
  };
  const resume = () => {
    if (autoplay && autoplayRef.current) autoplayRef.current.reset();
  };

  // Teclado
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      scrollNext();
      if (stopOnInteraction) pause();
    } else if (e.key === "ArrowLeft") {
      scrollPrev();
      if (stopOnInteraction) pause();
    } else if (e.key === "Home") scrollTo(0);
    else if (e.key === "End") scrollTo(scrollSnaps.length - 1);
  };

  return (
    <div
      className="embla"
      role="region"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onFocus={pause}
      onBlur={resume}
    >
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container" role="list">
          {slides.map((s, i) => {
            const isText = typeof s === "string";
            const item = isText ? {content: s} : s; // {src, alt, ...}
            return (
              <div
                className="embla__slide"
                key={item.id || i}
                role="listitem"
                aria-hidden={i !== selectedIndex}
              >
                {item.src ? (
                  <img
                    className="embla__slide__img"
                    src={item.src}
                    alt={item.alt || ""}
                    loading="lazy"
                    draggable="false"
                    {...(item.srcSet
                      ? {srcSet: item.srcSet, sizes: item.sizes}
                      : {})}
                  />
                ) : (
                  item.content
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="embla__controls">
        <button
          type="button"
          onClick={() => {
            scrollPrev();
            if (stopOnInteraction) pause();
          }}
          aria-label="Anterior"
          disabled={!loop && selectedIndex === 0}
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => {
            scrollNext();
            if (stopOnInteraction) pause();
          }}
          aria-label="Siguiente"
          disabled={!loop && selectedIndex === scrollSnaps.length - 1}
        >
          ›
        </button>
      </div>

      <div className="embla__dots" role="tablist" aria-label="Paginación">
        {scrollSnaps.map((_, i) => {
          const current = i === selectedIndex;
          return (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={current}
              aria-current={current ? "true" : undefined}
              tabIndex={current ? 0 : -1}
              className={`embla__dot${current ? " embla__dot--active" : ""}`}
              onClick={() => {
                scrollTo(i);
                if (stopOnInteraction) pause();
              }}
            >
              <span className="sr-only">Ir al slide {i + 1}</span>
            </button>
          );
        })}
      </div>

      <div className="sr-only" aria-live="polite">
        Slide {selectedIndex + 1} de {scrollSnaps.length}
      </div>
    </div>
  );
}
// ...existing code...
