import { ProductCard } from "../../components/Products/ProductCard.jsx";
import { autos } from "../../mock/autos.js";

export function FeaturedCars() {
  return (
    <section className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold text-center mb-4">Autos Destacados</h2>
      <p className="text-center text-gray-600 mb-8">
        Descubri los modelos más elegidos por nuestros clientes.
      </p>
      <div className="flex flex-wrap gap-6 justify-center">
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
    </section>
  );
}

export default FeaturedCars;
