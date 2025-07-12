import {useDispatch} from "react-redux";
import {addToCart} from "../../redux/cartSlice";

export const ProductCard = ({id, marca, modelo, precio, imagen}) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({id, marca, modelo, precio}));
  };
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 max-w-sm">
      <div className="relative">
        <img
          src={imagen || "https://placehold.co/300x350"}
          alt={`${marca} ${modelo}`}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-medium">
          {marca}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{modelo}</h3>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-blue-600">
            ${precio?.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500">0km</span>
        </div>

        <button
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
          onClick={handleAddToCart}
        >
          Comprar Auto
        </button>
      </div>
    </div>
  );
};
