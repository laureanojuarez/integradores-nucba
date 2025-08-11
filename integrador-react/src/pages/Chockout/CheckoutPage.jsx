import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

export default function CheckoutPage() {
  const { cartItems, subtotal, impuestos, total } = useCart();

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
      <h1 className="text-2xl font-bold mb-6">Resumen de tu compra</h1>

      <div className="flex flex-col gap-4 mb-6">
        {cartItems.map((item) => {
          const quantity = item.quantity || 1;
          const itemTotal = item.precio * quantity;

          return (
            <div
              key={item.id}
              className="flex justify-between items-center border rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.imagen}
                  alt={`${item.marca} ${item.modelo}`}
                  className="w-24 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-medium">
                    {item.marca} {item.modelo}
                  </p>
                  <p className="text-gray-600">
                    ${item.precio.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Cantidad: {quantity}</p>
                <p className="font-semibold">${itemTotal.toLocaleString()}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Resumen de totales */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal:</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">IVA (21%):</span>
            <span>${impuestos.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xl font-bold border-t pt-2">
            <span>Total:</span>
            <span className="text-blue-600">${total.toLocaleString()}</span>
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 font-semibold transition-colors">
          Confirmar y pagar
        </button>
      </div>
    </div>
  );
}
