import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

export default function CheckoutPage() {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const total = cartItems.reduce(
    (acc, item) => acc + item.precio * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="w-4/5 max-w-6xl mx-auto text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Tu carrito esta vacio</h1>
        <p className="text-gray-600 mb-6">No tienes productos para comprar.</p>
        <Link
          to="/catalogo"
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
        >
          Volver al Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="w-4/5 max-w-6xl mx-auto py-10">
      <h1>Resumen de tu compra</h1>
      <div className="flex flex-col gap-2">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border rounded-lg p-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.imagen}
                alt={`${item.marca} ${item.modelo}`}
                className="w-24 h-16 object-cover rounded"
              />
              <div className="text-center">
                <p>
                  {item.marca} {item.modelo}
                </p>
                <p>${item.precio.toLocaleString()}</p>
              </div>
            </div>
            <div className="text-right">
              <p>Cantidad: {item.quantity}</p>
              <p>Total: ${(item.precio * item.quantity).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-between items-center mt-4">
        <h2 className="text-xl font-semibold">Total:</h2>
        <p className="text-xl font-semibold">${total.toLocaleString()}</p>
        <button className="bg-blue-200 py-3 px-6 rounded-md hover:bg-blue-400 font-semibold">
          Confirmar y pagar
        </button>
      </div>
    </div>
  );
}
