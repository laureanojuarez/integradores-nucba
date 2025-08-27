import { MoveRight } from "lucide-react";
import { MoveLeft } from "lucide-react";
import { cloneElement } from "react";
import { useState } from "react";

export default function Carousel({ children: slides }) {
  const [curr, setCurr] = useState(0);

  const prev = () => setCurr(curr === 0 ? slides.length - 1 : curr - 1);

  const next = () => setCurr(curr === slides.length - 1 ? 0 : curr + 1);

  return (
    <div className="overflow-hidden relative w-full">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="min-w-full h-full flex items-center justify-center bg-black"
          >
            {cloneElement(slide, {
              className:
                "w-[1000px] h-[400px] object-cover rounded-2xl " +
                (slide.props.className || ""),
              loading: "lazy",
            })}
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="p-1 rounded-full bg-white/70 backdrop-blur-sm hover:bg-white"
        >
          <MoveLeft size={40} />
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full bg-white/70 backdrop-blur-sm hover:bg-white"
        >
          <MoveRight size={40} />
        </button>
      </div>

      <div className="absolute bottom-4 left-0 right-0">
        <div>
          {slides.map((_, i) => (
            <div
              className={`transition-all w-3 h-3 bg-white rounded-full inline-block mx-1 ${
                curr === i ? "p-2" : "p-1"
              }`}
              key={i}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
