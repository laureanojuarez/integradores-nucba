import { useParams } from "react-router-dom";
import { autos } from "../../../mock/autos";
import { ProductCard } from "../../../components/Products/ProductCard";

export function ProductMarca() {
  const { marca } = useParams();

  const autosDeMarca = autos.filter(
    (auto) => auto.marca.toLowerCase() === marca.toLocaleLowerCase()
  );

  return (
    <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto p-4 mt-40">
      {autosDeMarca.length === 0 ? (
        <p className="text-gray-500">No hay autos de esta marca.</p>
      ) : (
        autosDeMarca.map((auto) => (
          <ProductCard
            key={auto.id}
            id={auto.id}
            marca={auto.marca}
            modelo={auto.modelo}
            precio={auto.precio}
            imagen={auto.imagen}
          />
        ))
      )}
    </div>
  );
}
