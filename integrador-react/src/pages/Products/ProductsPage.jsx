import { useState } from "react";
import { ProductCard } from "../../components/Products/ProductCard";
import { autos } from "../../mock/autos";

const INITIAL_ITEMS_TO_SHOW = 6;
const ITEMS_TO_ADD = 3;

export default function ProductsPage() {
  const [visibleItems, setVisibleItems] = useState(INITIAL_ITEMS_TO_SHOW);
  const [activeFilter, setActiveFilter] = useState("Todos");

  const handleFilterChange = (marca) => {
    setActiveFilter(marca);
    setVisibleItems(INITIAL_ITEMS_TO_SHOW);
  };

  const marcas = ["Todos", ...new Set(autos.map((auto) => auto.marca))];

  const filteredAutos =
    activeFilter === "Todos"
      ? autos
      : autos.filter((auto) => auto.marca === activeFilter);

  const handleShowMore = () => {
    setVisibleItems((prev) => prev + ITEMS_TO_ADD);
  };

  return (
    <main className="flex flex-col items-center justify-center mt-10 p-4">
      <h1>Nuestros autos destacados</h1>
      <div className="flex gap-2 mb-8 flex-wrap justify-center p-2">
        {marcas.map((marca) => (
          <button
            key={marca}
            onClick={() => handleFilterChange(marca)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeFilter === marca
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {marca}
          </button>
        ))}
      </div>

      <section className="flex flex-wrap gap-8 justify-center ">
        {filteredAutos.slice(0, visibleItems).map((auto) => (
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

      {visibleItems < filteredAutos.length && (
        <div className="mt-10">
          <button
            onClick={handleShowMore}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold"
          >
            Ver más autos
          </button>
        </div>
      )}
    </main>
  );
}
