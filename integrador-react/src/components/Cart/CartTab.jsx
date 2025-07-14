import {useSelector} from "react-redux";
import {RiCloseLine} from "@remixicon/react";
import {RiDeleteBin3Fill} from "@remixicon/react";
import {useDispatch} from "react-redux";
import {removeFromCart} from "../../redux/cartSlice";

export const CartTab = ({closeCart}) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleDelete = (id) => {
    dispatch(removeFromCart({id}));
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

        <div className="flex-grow overflow-y-auto mt-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500">El carrito esta vacio.</p>
          ) : (
            cartItems.map((item) => (
              <div
                className="flex justify-between items-center mb-4"
                key={item.id}
              >
                <div className="text-center">
                  <p>{item.modelo}</p>
                  <p>${item.precio.toLocaleString()}</p>
                </div>
                <RiDeleteBin3Fill onClick={() => handleDelete(item.id)} />
              </div>
            ))
          )}
        </div>

        <div className="border-t pt-4">
          <button className="w-full bg-blue-600 text-white py-2 rounded-md cursor-pointer hover:bg-blue-700">
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
};
