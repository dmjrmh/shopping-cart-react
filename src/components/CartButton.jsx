import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CartButton({onToggleCart}) {
  const {cart} = useContext(CartContext)

  const totalItems = (cart || []).reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex justify-end p-4">
      <button onClick={onToggleCart} className="text-2xl p-2 cursor-pointer">🛒</button>
      {totalItems >= 0 && (
        <span className="animate animate-pulse bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {totalItems}
        </span>
      )}
    </div>
  )
}