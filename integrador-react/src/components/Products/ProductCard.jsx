import { RiAddCircleLine } from "@remixicon/react";
import { Link } from "react-router";

export const ProductCard = ({ name, desc, img, isProductPage }) => {
  return (
    <div className="gap-2 p-4 border-2 border-gray-300 rounded-lg shadow-md">
      <h1 className="text-xl font-bold">{name}</h1>
      <img
        src={img || "https://placehold.co/500x600"}
        alt={name}
        style={{ width: "350px" }}
      />
      <p className="text-gray-600">{desc}</p>

      {isProductPage && (
        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center gap-2">
          <RiAddCircleLine size={20} />
          Agregar al carrito
        </button>
      )}
    </div>
  );
};
