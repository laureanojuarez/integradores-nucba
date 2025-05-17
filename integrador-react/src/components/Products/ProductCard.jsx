import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { addToCart } from "../../redux/slices/cart/cartSlice";
import Button from "../UI/Button/Button";
import { RiAddCircleLine } from "@remixicon/react";

export const ProductCard = ({ name, desc, img, id }) => {
  const location = useLocation();
  const isProductPage = location.pathname === "/productos";
  const dispatch = useDispatch();

  const handleToCart = () => {
    dispatch(addToCart({ id, name, desc, img }));
  };

  return (
    <div
      className={`flex flex-col gap-2 p-4 border-2 border-gray-300 rounded-lg shadow-md ${
        isProductPage ? "max-w-sm" : "max-w-xs"
      }`}
    >
      <h1 className="text-xl font-bold">{name}</h1>
      <img
        src={img || "https://placehold.co/500x500"}
        alt={name}
        className="w-full h-64 object-cover rounded-lg"
      />
      <p className="text-gray-600">{desc}</p>

      {isProductPage && (
        <Button onClick={handleToCart}>
          <RiAddCircleLine size={28} />
          Agregar al carrito
        </Button>
      )}
    </div>
  );
};
