import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ShoppingBag, Heart, Eye, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const ProductCardShadcn = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()

  // Early return if product doesn't exist
  if (!product) {
    return null
  }

  // WhatsApp Order Handler - No size included
  const handleWhatsAppOrder = (e) => {
    e.stopPropagation()
    const message = `Hello, I want to order ${product.name}`
    // Your WhatsApp number: 251933912682 (no + sign)
    const whatsappUrl = `https://wa.me/251933912682?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  // Telegram Order Handler - No size included
  const handleTelegramOrder = (e) => {
    e.stopPropagation()
    const message = `Hello, I want to order ${product.name}`
    // Your Telegram username: Azebgizaw
    const telegramUrl = `https://t.me/Azebgizaw?text=${encodeURIComponent(message)}`
    window.open(telegramUrl, '_blank')
  }

  const handleCardClick = () => {
    navigate(`/product/${product.id}`)
  }

  // Safe image URL with fallback
  const imageUrl = product.image || product.images?.[0] || "https://i.pinimg.com/736x/aa/72/09/aa72098ee0559b84056ccdb95646e336.jpg"

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={handleCardClick}
      className="cursor-pointer"
    >
      <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img
            src={imageUrl}
            alt={product.name || 'Product'}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.target.src = "https://i.pinimg.com/736x/aa/72/09/aa72098ee0559b84056ccdb95646e336.jpg"
            }}
          />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <Button size="icon" variant="secondary" className="rounded-full">
              <Eye className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary" className="rounded-full">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Badges */}
          {product.inStock === false && (
            <Badge variant="destructive" className="absolute top-3 left-3">
              Out of Stock
            </Badge>
          )}
          <Badge className="absolute top-3 right-3 bg-accent text-black">
            New
          </Badge>
        </div>
        
        <CardContent className="p-4">
          <div className="mb-2">
            <h3 className="font-semibold text-lg line-clamp-1">{product.name || 'Unnamed Product'}</h3>
            <p className="text-sm text-muted-foreground">{product.category || 'Uncategorized'}</p>
          </div>
          
          {/* Contact for Price - No price displayed */}
          <div className="mb-4">
            <span className="text-lg font-semibold text-primary">Contact for Price</span>
          </div>
          
          {/* Order Buttons */}
          <div className="space-y-2">
            <Button
              onClick={handleWhatsAppOrder}
              disabled={product.inStock === false}
              className="w-full gap-2 bg-green-600 hover:bg-green-700"
            >
              <ShoppingBag className="h-4 w-4" />
              Order on WhatsApp
            </Button>
            
            <Button
              onClick={handleTelegramOrder}
              disabled={product.inStock === false}
              className="w-full gap-2 bg-blue-500 hover:bg-blue-600"
            >
              <Send className="h-4 w-4" />
              Order on Telegram
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default ProductCardShadcn