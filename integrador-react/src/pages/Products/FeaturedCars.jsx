import { ProductCard } from "../../components/Products/ProductCard.jsx";
import { autos } from "../../mock/autos.js";

export function FeaturedCars() {
  return (
    <>
      <h2>Featured Cars</h2>
      <div className="flex  items-center justify-center min-h-screen gap-4">
        {autos.slice(3, 7).map((car) => (
          <ProductCard
            key={car.id}
            id={car.id}
            modelo={car.modelo}
            marca={car.marca}
            year={car.year}
            precio={car.precio}
            imagen={car.imagen}
          />
        ))}
      </div>
    </>
  );
}

export default FeaturedCars;
