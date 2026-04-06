import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById, products } from '../data/products'
import { ShoppingBag, Send, ChevronLeft, Star, Truck, RotateCcw, Shield } from 'lucide-react'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProductById(id)
  
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '')
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '')
  const [quantity, setQuantity] = useState(1)

  // Handle case where product doesn't exist
  if (!product) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <button 
          onClick={() => navigate('/shop')}
          className="text-primary underline"
        >
          Back to Shop
        </button>
      </div>
    )
  }

  // WhatsApp Order Handler
  const handleWhatsAppOrder = () => {
    const message = `Hello, I want to order:
Product: ${product.name}
Size: ${selectedSize}
Color: ${selectedColor}
Quantity: ${quantity}
Total: $${(product.price * quantity).toFixed(2)}

Shipping to: [Please provide your address]`
    
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  // Telegram Order Handler
  const handleTelegramOrder = () => {
    const message = `Hello, I want to order:
Product: ${product.name}
Size: ${selectedSize}
Color: ${selectedColor}
Quantity: ${quantity}
Total: $${(product.price * quantity).toFixed(2)}

Shipping to: [Please provide your address]`
    
    const telegramUrl = `@mahlet7829?text=${encodeURIComponent(message)}`
    window.open(telegramUrl, '_blank')
  }

  // Get related products (same category, exclude current)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/shop')}
          className="flex items-center gap-2 text-foreground/70 hover:text-primary mb-8 transition"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Shop
        </button>

        {/* Product Main Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-secondary rounded-2xl overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Thumbnail gallery (placeholder for now) */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="aspect-square bg-secondary rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition">
                  <img src={product.image} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
            <p className="text-foreground/70 mb-4">{product.category}</p>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="text-sm text-foreground/70">(128 reviews)</span>
            </div>
            
            {/* Price */}
            <div className="text-3xl font-bold mb-6">${product.price}</div>
            
            {/* Description */}
            <p className="text-foreground/70 mb-6 leading-relaxed">
              {product.description}
            </p>
            
            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <label className="font-semibold">Select Size</label>
                <button className="text-sm text-primary underline">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg border-2 transition-all ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Color Selection */}
            <div className="mb-6">
              <label className="font-semibold block mb-2">Select Color</label>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedColor === color
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity */}
            <div className="mb-8">
              <label className="font-semibold block mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-border hover:border-primary transition"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-border hover:border-primary transition"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Order Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleWhatsAppOrder}
                disabled={!product.inStock}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                  product.inStock 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                <ShoppingBag className="h-5 w-5" />
                Order via WhatsApp
              </button>
              
              <button
                onClick={handleTelegramOrder}
                disabled={!product.inStock}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                  product.inStock 
                    ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                <Send className="h-5 w-5" />
                Order via Telegram
              </button>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-foreground/70" />
                <p className="text-sm">Free Shipping</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 mx-auto mb-2 text-foreground/70" />
                <p className="text-sm">Easy Returns</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-foreground/70" />
                <p className="text-sm">Secure Order</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div 
                  key={relatedProduct.id}
                  onClick={() => navigate(`/product/${relatedProduct.id}`)}
                  className="group cursor-pointer"
                >
                  <div className="aspect-square bg-secondary rounded-lg overflow-hidden mb-3">
                    <img 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>
                  <h3 className="font-semibold">{relatedProduct.name}</h3>
                  <p className="text-sm text-foreground/70">${relatedProduct.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetail