import React, { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'

// This component handles the switching logic
function AnimatedRoutes({ cart, setCart, addToCart }) {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={<Home cart={cart} setCart={setCart} addToCart={addToCart} />} 
        />
        <Route 
          path="/product/:id" 
          element={<ProductDetail addToCart={addToCart} />} 
        />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) return prev.map(item => item.id === product.id ? {...item, qty: item.qty + 1} : item)
      return [...prev, {...product, qty: 1}]
    })
  }

  // NOTICE: No <BrowserRouter> here anymore! 
  // It is already in your main.jsx / index.jsx
  return (
    <div className="bg-[#0D0D0D] min-h-screen">
      <AnimatedRoutes cart={cart} setCart={setCart} addToCart={addToCart} />
    </div>
  )
}

export default App
