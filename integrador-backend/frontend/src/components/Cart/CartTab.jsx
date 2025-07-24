import { useSelector } from "react-redux";
import { RiCloseLine } from "@remixicon/react";
import { RiDeleteBin3Fill } from "@remixicon/react";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/cartSlice";
import { useCart } from "../../hooks/useCart";
import { useNavigate } from "react-router";

export const CartTab = ({ closeCart }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleClearCart } = useCart();

  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleDelete = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleFinalizarCompra = () => {
    if (cartItems.length === 0) {
      alert("El carrito esta vacio.");
      return;
    }

    navigate("/checkout");
    closeCart();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50" onClick={closeCart}>
      <div
        className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-xl font-semibold">Tu Carrito</h2>
          <RiCloseLine
            className="cursor-pointer w-8 mr-3"
            onClick={closeCart}
          />
        </div>

        <div className="flex flex-col justify-between h-full overflow-y-auto mt-4 py-2">
          {cartItems.length === 0 ? (
            <p className="text-gray-500">El carrito esta vacio.</p>
          ) : (
            cartItems.map((item) => (
              <div
                className="flex justify-between items-center mb-4"
                key={item.id}
              >
                <div className="flex">
                  <img src={item.imagen} alt="" width={100} />
                  <div className="text-center">
                    <p>
                      {item.marca} {item.modelo}
                    </p>
                    <p>${item.precio.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <RiDeleteBin3Fill
                    className="w-6 h-6 text-red-500 cursor-pointer"
                    cursor={"pointer"}
                    onClick={() => handleDelete(item.id)}
                  />
                </div>
              </div>
            ))
          )}
          <button
            className="w-full bg-red-200 py-2 rounded-md cursor-pointer hover:bg-red-600"
            onClick={handleClearCart}
          >
            Borrar carrito
          </button>
        </div>

        <div className="flex flex-col border-t pt-4 gap-2">
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-md cursor-pointer hover:bg-blue-700"
            onClick={handleFinalizarCompra}
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
};
