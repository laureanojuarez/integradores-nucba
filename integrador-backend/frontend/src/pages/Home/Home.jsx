import Carousel from "../../components/Carousel/Carousel";

const slides = [
  "images/carousel/elconjuro4.webp",
  "images/carousel/homoargentum.jpg",
  "images/carousel/nadie2.webp",
];

export default function Home() {
  return (
    <div>
      <div className="w-full flex items-center justify-center">
        <Carousel>
          {slides.map((s) => (
            <img src={s} alt="" width={"100%"} height={"400px"} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}
