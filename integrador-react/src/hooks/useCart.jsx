import {useDispatch} from "react-redux";
import {addToCart, clearCart} from "../redux/cartSlice";
import {toast} from "sonner";

export const useCart = () => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.marca} ${product.modelo} agregado al carrito`);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return {handleAddToCart, handleClearCart};
};
