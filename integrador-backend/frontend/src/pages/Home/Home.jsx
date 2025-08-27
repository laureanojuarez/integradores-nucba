import Carousel from "../../components/Carousel/Carousel";
import { FilmsSection } from "../../components/Films/FilmsSection";

const slides = [
  "images/carousel/elconjuro4.webp",
  "images/carousel/homoargentum.jpg",
  "images/carousel/nadie2.webp",
  "images/carousel/Jurassic-World-El-Renacer.jpg",
];

export default function Home() {
  return (
    <div>
      <div className="w-full flex items-center justify-center">
        <Carousel>
          {slides.map((s) => (
            <img src={s} alt="" />
          ))}
        </Carousel>
      </div>
      <FilmsSection />
    </div>
  );
}
