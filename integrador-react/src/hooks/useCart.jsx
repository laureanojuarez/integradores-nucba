import {useDispatch} from "react-redux";
import {addToCart, clearCart} from "../redux/slices/cart/cartSlice";
import {toast} from "sonner";
import {useSelector} from "react-redux";

export const useCart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      toast.warning(`${product.modelo} ya está en el carrito`);
    } else {
      dispatch(addToCart(product));
      toast.success(`${product.modelo} agregado al carrito`);
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.error("Carrito vaciado");
  };

  return {handleAddToCart, handleClearCart};
};
