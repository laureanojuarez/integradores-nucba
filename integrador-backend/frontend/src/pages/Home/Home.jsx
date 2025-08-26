import "embla-carousel-react";
import EmblaCarousel from "../../components/Carousel/Carousel";

const SLIDE_IMAGES = [
  "/images/carousel/elconjuro4.webp",
  "/images/carousel/nadie2.webp",
  "/images/carousel/homoargentum.jpg",
];

const OPTIONS = {
  dragFree: true,
  loop: true,
};

export default function Home() {
  return (
    <div className="flex w-full">
      <EmblaCarousel slides={SLIDE_IMAGES} options={OPTIONS} />
    </div>
  );
}
