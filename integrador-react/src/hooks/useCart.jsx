import { useDispatch } from "react-redux";
import { addToCart, clearCart } from "../redux/slices/cart/cartSlice";
import { toast } from "sonner";
import { useSelector } from "react-redux";

export const useCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const subtotal = cartItems.reduce((acc, item) => {
    const quantity = item.quantity || 1;
    return acc + item.precio * quantity;
  }, 0);

  const impuestos = subtotal * 0.21;
  const total = subtotal + impuestos;

  const totalItems = cartItems.reduce((acc, item) => {
    const quantity = item.quantity || 1;
    return acc + quantity;
  }, 0);

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      toast.warning(`${product.modelo} ya esta en el carrito`);
    } else {
      dispatch(addToCart(product));
      toast.success(`${product.modelo} agregado al carrito`);
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.error("Carrito vaciado");
  };

  return {
    cartItems,
    subtotal,
    impuestos,
    total,
    totalItems,
    handleAddToCart,
    handleClearCart,
  };
};
