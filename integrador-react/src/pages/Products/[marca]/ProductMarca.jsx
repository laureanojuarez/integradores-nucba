import { useParams } from "react-router";
import { autos } from "../../../mock/autos";

export function ProductMarca() {
  const { marca } = useParams();

  return (
    <div className="flex items-center justify-center max-w-6xl mx-auto p-4">
      {autos.map(
        (auto) =>
          auto.marca.toLowerCase() === marca.toLowerCase() && (
            <div
              key={auto.id}
              className="flex flex-col items-center py-24 px-4"
            >
              <img
                src={auto.imagen}
                alt={`${auto.marca} ${auto.modelo}`}
                className="w-48 h-48 object-cover mb-4 rounded-lg shadow-lg"
              />
              <h2 className="text-2xl font-bold mb-2">{auto.modelo}</h2>
              <p className="text-lg text-gray-700 mb-4">
                ${auto.precio.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Color: {auto.color || "No especificado"}
              </p>
              <p className="text-sm text-gray-500">
                Stock:{" "}
                {auto.stock > 0 ? `${auto.stock} unidades` : "A consultar"}
              </p>
            </div>
          )
      )}
    </div>
  );
}
