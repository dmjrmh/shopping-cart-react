import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, removeItem: handleRemoveItem, clearCart, updateQuantity } = useContext(CartContext);
  const totalPrice = (cart || []).reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!cart?.length) {
    return <p className="p-4">Cart is empty.</p>;
  }

  return (
    <div className="p-4 border rounded shadow bg-white mb-4 max-w-md md:max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>

      {cart.map((item) => (
        <div key={item.id} className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
            <div>
              <p className="font-semibold">{item.name}</p>
              <p>${item.price.toFixed(2)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input type="number" min="1" value={item.quantity} onChange={(e) => updateQuantity(item.id, e.target.value)} className="w-16 border px-2 py-1 rounded" />
            <button onClick={() => handleRemoveItem(item.id)} className="text-sm text-red-600 cursor-pointer hover:underline">
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center mt-6">
        <button onClick={clearCart} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer">
          Clear Cart
        </button>
        <p className="text-lg font-semibold">
          Total: ${totalPrice.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
