import { useParams } from "react-router";
import { autos } from "../../../mock/autos";
import { useCart } from "../../../hooks/useCart";

export const ProductDetail = () => {
  const { marca, modelo } = useParams();
  const { handleAddToCart } = useCart();

  const auto = autos.find(
    (auto) =>
      auto.marca.toLowerCase() === marca.toLowerCase() &&
      auto.modelo.toLowerCase().replace(/ /g, "-") === modelo.toLowerCase()
  );

  if (!auto) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div>
          <img
            src={auto.imagen}
            alt={auto.modelo}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            {auto.marca}
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-1 mb-4">
            {auto.modelo}
          </h1>
          <p className="text-3xl font-bold text-blue-600 mb-6">
            ${auto.precio.toLocaleString()}
          </p>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Especificaciones
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Color: {auto.color || "No especificado"}</li>
              <li>
                Stock:{" "}
                {auto.stock > 0 ? `${auto.stock} unidades` : "A consultar"}
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <button
              onClick={() => handleAddToCart(auto)}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold text-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Añadir al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
