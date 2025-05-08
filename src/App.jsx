import './App.css'
import CartButton from './components/CartButton'
import Cart from './components/Cart'
import ProductList from './components/ProductList'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function App() {
  const [showCart, setShowCart] = useState(false)

  const toggleCart = () => setShowCart(prev => !prev)

  return (
    <>
      <ToastContainer />
      <CartButton onToggleCart={toggleCart} />
      {showCart && <Cart/>}
      <ProductList />
    </>
  )
}

export default App
