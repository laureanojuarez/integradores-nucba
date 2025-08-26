import {EmblaCarousel} from "../../src/components/Carousel/Carousel";
import "embla-carousel-react";

export default function Home() {
  return (
    <div className="h-dvh bg-neutral-900">
      <EmblaCarousel
        slides={[
          {id: 1, src: "/images/banner1.jpg", alt: "Banner 1"},
          {id: 2, src: "/images/banner2.jpg", alt: "Banner 2"},
          {id: 3, src: "/images/banner3.jpg", alt: "Banner 3"},
        ]}
        loop
        autoplay
        autoplayDelay={5000}
        stopOnInteraction={true}
      />
    </div>
  );
}
