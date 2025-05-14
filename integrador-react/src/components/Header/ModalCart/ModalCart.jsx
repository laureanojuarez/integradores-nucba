import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  removeFromCart,
  toggleHiddenCart,
} from "../../../redux/slices/cart/cartSlice";

export default function ModalCart() {
  const { cartItems, hidden: hiddenCart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleToggleHiddenCart = () => {
    dispatch(toggleHiddenCart());
  };

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <AnimatePresence>
      {!hiddenCart && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={handleToggleHiddenCart}
        />
      )}
      {!hiddenCart && (
        <motion.div
          className="fixed right-0 top-0 h-screen w-80 bg-white shadow-xl z-50 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        >
          {/* Cabecera del carrito */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Carrito de compras</h2>
              <button
                onClick={handleToggleHiddenCart}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Contenido del carrito */}
          <div className="p-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No hay productos en el carrito
              </p>
            ) : (
              <>
                {/* Lista de productos */}
                <div className="flex flex-col gap-4 mb-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 border-b border-gray-100 pb-3"
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <div className="flex justify-between mt-1">
                          <span className="text-sm text-gray-600">
                            Cantidad: {item.quantity}
                          </span>
                          <button
                            onClick={() => handleRemoveItem(item)}
                            className="text-red-500 text-sm hover:text-red-700"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total y botón de vaciar */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between mb-4">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold">
                      ${cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                      productos
                    </span>
                  </div>
                  <button
                    onClick={handleClearCart}
                    className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                  >
                    Vaciar carrito
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
