import {Link} from "react-router";
import {useCart} from "../../hooks/useCart";

export const ProductCard = ({id, marca, modelo, precio, imagen}) => {
  const {handleAddToCart} = useCart();

  const productUrl = `/catalogo/${marca.toLowerCase()}/${modelo
    .toLowerCase()
    .replace(/ /g, "-")}`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 max-w-sm">
      <Link to={productUrl}>
        <div className="relative">
          <img
            src={imagen || "https://placehold.co/300x350"}
            alt={`${marca} ${modelo}`}
            className="w-80 h-48 object-cover mx-auto"
          />
          <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-medium">
            {marca}
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link to={productUrl} className="text-lg font-semibold text-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{modelo}</h3>
        </Link>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-blue-600">
            ${precio?.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500">0km</span>
        </div>

        <button
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
          onClick={() => handleAddToCart({id, marca, modelo, precio, imagen})}
        >
          Comprar Auto
        </button>
      </div>
    </div>
  );
};
