import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const ProductCardShadcn = ({ product }) => {
  const navigate = useNavigate()

  if (!product) return null

  const handleWhatsAppOrder = (e) => {
    e.stopPropagation()
    const message = `Hello, I want to order ${product.name}`
    window.open(`https://wa.me/251933912682?text=${encodeURIComponent(message)}`, '_blank')
  }

  const imageUrl = product.image || (product.images && product.images[0]) || 'https://images.pexels.com/photos/4110258/pexels-photo-4110258.jpeg?w=500'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      onClick={() => navigate(`/product/${product.id}`)}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden bg-gray-100">
        {/* Image */}
        <div className="aspect-square overflow-hidden">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick Order Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleWhatsAppOrder}
            className="w-full bg-black text-white py-3 text-sm font-medium tracking-wide hover:bg-gray-900 transition"
          >
            ORDER NOW
          </button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="mt-4 text-center">
        <h3 className="text-sm font-medium tracking-wide uppercase">{product.name}</h3>
        <p className="text-xs text-gray-500 mt-1">Contact for Price</p>
      </div>
    </motion.div>
  )
}

export default ProductCardShadcn