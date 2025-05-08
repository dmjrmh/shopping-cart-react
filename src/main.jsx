import React from 'react'
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { RecoilRoot } from 'recoil'
import { CartProvider } from './context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RecoilRoot>
      <CartProvider>
        <App />
      </CartProvider>
    </RecoilRoot>
  </StrictMode>,
)
