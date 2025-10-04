import { MoveRight, MoveLeft } from "lucide-react";
import { useState, useEffect, useRef, Children } from "react";

export default function Carousel({
  children,
  autoPlay = true,
  interval = 4000,
  loop = true,
  className = "",
  height = "h-40 sm:h-56 md:h-64",
  useAspect = false,
  aspect = "aspect-[5/2]",
  fullWidth = false,
}) {
  const slides = Children.toArray(children);
  const [curr, setCurr] = useState(0);
  const timerRef = useRef(null);
  const containerRef = useRef(null);
  const isHoveringRef = useRef(false);

  const count = slides.length;

  const goTo = (idx) => {
    if (count === 0) return;
    if (!loop) {
      setCurr(Math.min(Math.max(idx, 0), count - 1));
    } else {
      setCurr((idx + count) % count);
    }
  };

  const next = () => goTo(curr + 1);
  const prev = () => goTo(curr - 1);

  // Autoplay
  useEffect(() => {
    if (!autoPlay || count <= 1) return;
    if (isHoveringRef.current) return;
    timerRef.current = setTimeout(() => {
      next();
    }, interval);
    return () => clearTimeout(timerRef.current);
  }, [curr, autoPlay, interval, count]);

  // Pausar en hover (solo en desktop)
  const handleMouseEnter = () => {
    isHoveringRef.current = true;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
  };

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      next();
    }
    if (isRightSwipe) {
      prev();
    }
  };

  // Teclado
  useEffect(() => {
    const handleKey = (e) => {
      if (!containerRef.current) return;
      if (!containerRef.current.matches(":focus-within, :hover")) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [curr, count]);

  if (count === 0) {
    return (
      <div
        className={`w-full flex items-center justify-center text-sm text-neutral-400 ${className}`}
      >
        No hay slides
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full select-none ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Carrusel de imágenes"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={`overflow-hidden w-full ${useAspect ? aspect : height}`}
        aria-live="polite"
        aria-atomic="true"
      >
        <div
          className="flex transition-transform duration-500 ease-out will-change-transform"
          style={{ transform: `translateX(-${curr * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`min-w-full flex-shrink-0 ${useAspect ? "" : height}`}
              aria-hidden={curr !== i}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {/* Controles - Ocultos en mobile */}
      {count > 1 && (
        <>
          <div className="absolute inset-0 items-center justify-between px-2 md:px-4 pointer-events-none hidden sm:flex">
            <button
              type="button"
              onClick={prev}
              className="pointer-events-auto p-1.5 sm:p-2 rounded-full bg-white/70 hover:bg-white text-black transition shadow focus:outline-none focus:ring focus:ring-white/60"
              aria-label="Slide anterior"
            >
              <MoveLeft size={20} className="sm:w-6 sm:h-6" />
            </button>
            <button
              type="button"
              onClick={next}
              className="pointer-events-auto p-1.5 sm:p-2 rounded-full bg-white/70 hover:bg-white text-black transition shadow focus:outline-none focus:ring focus:ring-white/60"
              aria-label="Slide siguiente"
            >
              <MoveRight size={20} className="sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Indicadores */}
          <div className="absolute bottom-2 sm:bottom-3 left-0 right-0 flex justify-center gap-1.5 sm:gap-2">
            {slides.map((_, i) => {
              const active = i === curr;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`h-2 sm:h-2.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white ${
                    active
                      ? "bg-white w-4 sm:w-6"
                      : "bg-white/50 w-2 sm:w-2.5 hover:bg-white/80"
                  }`}
                  aria-label={`Ir al slide ${i + 1} de ${count}`}
                  aria-current={active ? "true" : "false"}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
