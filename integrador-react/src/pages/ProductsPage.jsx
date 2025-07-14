import {useState} from "react";
import {ProductCard} from "../components/Products/ProductCard";
import {autos} from "../mock/autos";

const INITIAL_ITEMS_TO_SHOW = 6;
const ITEMS_TO_ADD = 4;

export default function ProductsPage() {
  const [visibleItems, setVisibleItems] = useState(INITIAL_ITEMS_TO_SHOW);

  const handleShowMore = () => {
    setVisibleItems((prev) => prev + ITEMS_TO_ADD);
  };

  return (
    <main className="flex flex-col items-center justify-center">
      <h1>Nuestros autos destacados</h1>
      <h2>Nuestras marcas:</h2>
      <section className="flex flex-wrap gap-4 justify-center ">
        {autos.slice(0, visibleItems).map((auto) => (
          <ProductCard
            key={auto.id}
            id={auto.id}
            marca={auto.marca}
            modelo={auto.modelo}
            imagen={auto.imagen}
            precio={auto.precio}
          />
        ))}
      </section>

      {visibleItems < autos.length && (
        <button
          onClick={handleShowMore}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Ver más autos
        </button>
      )}
    </main>
  );
}
