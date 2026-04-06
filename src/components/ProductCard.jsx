import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingBag, Heart } from 'lucide-react'

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const navigate = useNavigate()

  // Function to open WhatsApp with product details
  const handleWhatsAppOrder = (e) => {
    e.stopPropagation() // Prevent navigation to product detail
    const message = `Hello, I want to order ${product.name} - Size: ${selectedSize}`
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  // Function to open Telegram
  const handleTelegramOrder = (e) => {
    e.stopPropagation() // Prevent navigation to product detail
    const message = `Hello, I want to order ${product.name} - Size: ${selectedSize}`
    const telegramUrl = `@mahlet7829${encodeURIComponent(message)}`
    window.open(telegramUrl, '_blank')
  }

  // Navigate to product detail
  const handleCardClick = () => {
    navigate(`/product/${product.id}`)
  }

  return (
    <div 
      className="group relative bg-secondary rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Product Image */}
      <div className="aspect-square overflow-hidden bg-gray-200 dark:bg-gray-800">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Out of Stock Badge */}
        {!product.inStock && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
            Out of Stock
          </div>
        )}
        
        {/* Wishlist Button */}
        <button 
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 right-2 p-2 bg-white/90 dark:bg-gray-900/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
          <p className="text-sm text-foreground/70">{product.category}</p>
        </div>
        
        <p className="text-2xl font-bold mb-3">${product.price}</p>
        
        {/* Size Selector - stop propagation so clicking size doesn't navigate */}
        <div onClick={(e) => e.stopPropagation()}>
          <div className="mb-3">
            <label className="text-xs text-foreground/70 mb-1 block">Size:</label>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedSize(size)
                  }}
                  className={`px-3 py-1 text-xs rounded border transition-all ${
                    selectedSize === size 
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'border-border hover:border-primary'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Order Buttons - stop propagation */}
        <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={handleWhatsAppOrder}
            disabled={!product.inStock}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${
              product.inStock 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            <ShoppingBag className="h-4 w-4" />
            Order on WhatsApp
          </button>
          
          <button
            onClick={handleTelegramOrder}
            disabled={!product.inStock}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${
              product.inStock 
                ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            <ShoppingBag className="h-4 w-4" />
            Order on Telegram
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard