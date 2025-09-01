// ...existing code...
import { MoveRight, MoveLeft } from "lucide-react";
import { cloneElement, useState, useEffect, useRef, Children } from "react";

export default function Carousel({
  children,
  autoPlay = true,
  interval = 4000,
  loop = true,
  className = "",
  height = "h-40 sm:h-56 md:h-64", // altura tipo banner
  useAspect = false,
  aspect = "aspect-[5/2]",
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
      // wrap
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
      onMouseEnter={() => {
        /* ...existing code... */
      }}
      onMouseLeave={() => {
        /* ...existing code... */
      }}
    >
      <div
        className={`overflow-hidden w-full rounded-xl ${
          useAspect ? aspect : height
        }`}
        aria-live="polite"
        aria-atomic="true"
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${curr * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`min-w-full shrink-0 flex items-center justify-center bg-black ${
                useAspect ? "" : height
              }`}
              aria-hidden={curr !== i}
            >
              {cloneElement(slide, {
                className:
                  `${
                    useAspect ? `${aspect}` : "h-full"
                  } w-full object-cover rounded-xl ` +
                  (slide.props.className || ""),
                loading: "lazy",
                draggable: false,
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Controles */}
      {count > 1 && (
        <>
          <div className="absolute inset-0 flex items-center justify-between px-2 md:px-4 pointer-events-none">
            <button
              type="button"
              onClick={prev}
              className="pointer-events-auto p-2 rounded-full bg-white/70 hover:bg-white text-black transition shadow focus:outline-none focus:ring focus:ring-white/60"
              aria-label="Slide anterior"
            >
              <MoveLeft size={28} />
            </button>
            <button
              type="button"
              onClick={next}
              className="pointer-events-auto p-2 rounded-full bg-white/70 hover:bg-white text-black transition shadow focus:outline-none focus:ring focus:ring-white/60"
              aria-label="Slide siguiente"
            >
              <MoveRight size={28} />
            </button>
          </div>

          {/* Indicadores */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, i) => {
              const active = i === curr;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`h-2.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white ${
                    active
                      ? "bg-white w-6"
                      : "bg-white/50 w-2.5 hover:bg-white/80"
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
// ...existing code...
