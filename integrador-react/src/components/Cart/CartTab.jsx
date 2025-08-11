import { RiCloseLine } from "@remixicon/react";
import { RiDeleteBin3Fill } from "@remixicon/react";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  toggleHiddenCart,
} from "../../redux/slices/cart/cartSlice";
import { useCart } from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { RiShoppingCart2Line } from "@remixicon/react";
import { RiArrowRightLine } from "@remixicon/react";

export const CartTab = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, subtotal, impuestos, total, handleClearCart } = useCart();

  const handleDelete = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCloseCart = () => {
    dispatch(toggleHiddenCart());
  };

  const handleFinalizarCompra = () => {
    if (cartItems.length === 0) {
      alert("El carrito esta vacio.");
      return;
    }

    navigate("/checkout");
    handleCloseCart();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50" onClick={handleCloseCart}>
      <div
        className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center bg-gray-50 p-6 border-b">
          <div className="flex items-center gap-3">
            <RiShoppingCart2Line className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Tu Carrito
              </h2>
              <p className="text-sm text-gray-500">
                {cartItems.length}{" "}
                {cartItems.length === 1 ? "producto" : "productos"}
              </p>
            </div>
          </div>
          <button
            className="p-2 hover:bg-gray-200 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleCloseCart}
            aria-label="Cerrar carrito"
          >
            <RiCloseLine className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <RiShoppingCart2Line className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                Tu carrito esta vacio
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                ¡Descubre nuestros autos!
              </p>
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                onClick={() => {
                  navigate("/catalogo");
                  handleCloseCart();
                }}
              >
                Ver Catalogo
                <RiArrowRightLine className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  key={item.id}
                >
                  <div className="flex gap-4">
                    <img
                      src={item.imagen}
                      alt={`${item.marca} ${item.modelo}`}
                      className="w-20 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">
                        {item.marca} {item.modelo}
                      </h4>
                      <p className="text-lg font-semibold text-blue-600">
                        ${Number(item.precio || 0).toLocaleString("es-AR")}
                      </p>
                    </div>
                    <button
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
                      onClick={() => handleDelete(item.id)}
                      aria-label={`Eliminar ${item.marca} ${item.modelo}`}
                    >
                      <RiDeleteBin3Fill className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t bg-gray-50 p-4">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span>${subtotal.toLocaleString("es-AR")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">IVA (21%):</span>
                <span>${impuestos.toLocaleString("es-AR")}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold border-t pt-2">
                <span>Total:</span>
                <span className="text-blue-600">
                  ${total.toLocaleString("es-AR")}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="p-4 space-y-3 border-t">
          {cartItems.length > 0 && (
            <button
              className="w-full bg-red-100 text-red-700 py-2 px-4 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
              onClick={handleClearCart}
            >
              Vaciar Carrito
            </button>
          )}

          <button
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleFinalizarCompra}
            disabled={cartItems.length === 0}
          >
            Finalizar Compra
            <RiArrowRightLine className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
