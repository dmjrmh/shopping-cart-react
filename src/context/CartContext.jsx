import { createContext } from "react";
import { useRecoilState } from "recoil";
import { atom } from "recoil";
import { toast } from "react-toastify"

export const CartContext = createContext()

export const cartState = atom({
  key: 'cartState',
  default: []
})

export const CartProvider = ({children}) => {
  const [cart, setCart] = useRecoilState(cartState)

  const handleAddItem = (product) => {
    addItem(product)
    toast.success(`${product.name} added to cart !`, {
      position: "top-left",
      autoClose: 2000,
    })
  }

  const handleRemoveItem = (id) => {
    const product = cart.find((item) => item.id === id)
    removeItem(id)
    toast.info(`Successfully removed ${product.name} from the cart !`, {
      position: "top-left",
      autoClose: 2000,
    })
  }

  const addItem = (item)=> {
    setCart((cartItems) => {
      const existingCart = cartItems.find((e) => e.id === item.id)
      if (existingCart) {
        return cartItems.map((e) => 
          e.id === item.id ? { ...e, quantity: e.quantity + 1} : e
        )
      }
      return [...cartItems, {...item, quantity: 1}]
    })
  }

  const removeItem = (id) => {
    setCart((cartItems) => cartItems.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCart([])
  }

  const updateQuantity = (id, newQuantity) => {
    const quantityItem = parseInt(newQuantity)

    if (isNaN(quantityItem) || quantityItem < 1 ) return

    setCart((cartItems) =>
      cartItems.map((item) => item.id === id ? { ...item, quantity: quantityItem } : item )
    )
  }

  return (
    <CartContext.Provider value={{ cart, addItem: handleAddItem, removeItem: handleRemoveItem, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  )
}