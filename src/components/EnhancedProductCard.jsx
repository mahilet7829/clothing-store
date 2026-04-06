import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Heart, Eye } from 'lucide-react'

const EnhancedProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  
  const handleWhatsAppOrder = (e) => {
    e.stopPropagation()
    const message = `Hello, I want to order ${product.name} - Size: ${selectedSize}`
    window.open(`https://wa.me/251912345678?text=${encodeURIComponent(message)}`, '_blank')
  }
  
  return (
    <motion.div
      className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-white rounded-full hover:bg-gray-100 transition"
          >
            <Eye className="h-5 w-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-white rounded-full hover:bg-gray-100 transition"
          >
            <Heart className="h-5 w-5" />
          </motion.button>
        </motion.div>
        
        {/* Badges */}
        {product.inStock ? (
          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            In Stock
          </span>
        ) : (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Sold Out
          </span>
        )}
        
        {/* Discount badge example */}
        <span className="absolute top-3 right-3 bg-accent text-black text-xs px-2 py-1 rounded-full font-semibold">
          -20%
        </span>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold">${product.price}</span>
            <span className="text-sm text-gray-400 line-through ml-2">${(product.price * 1.25).toFixed(0)}</span>
          </div>
          <div className="flex text-yellow-400">
            {'★'.repeat(4)}{'☆'.repeat(1)}
          </div>
        </div>
        
        {/* Size selector */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {product.sizes.slice(0, 3).map((size) => (
              <button
                key={size}
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedSize(size)
                }}
                className={`w-10 h-10 rounded-full text-sm font-medium transition-all ${
                  selectedSize === size
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-black'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        
        {/* Order button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleWhatsAppOrder}
          className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
        >
          <ShoppingBag className="h-5 w-5" />
          Order on WhatsApp
        </motion.button>
      </div>
    </motion.div>
  )
}

export default EnhancedProductCard