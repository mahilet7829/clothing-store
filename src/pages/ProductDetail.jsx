import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Send, ChevronLeft, Truck, RotateCcw, Shield, X, ZoomIn } from 'lucide-react'
import { getProductById, products } from '../data/Products'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const product = getProductById(id)

  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState('')
  const [selectedImageForOrder, setSelectedImageForOrder] = useState('')

  // Zoom Modal
  const [isZoomOpen, setIsZoomOpen] = useState(false)
  const [zoomImageSrc, setZoomImageSrc] = useState('')

  // Safe initialization
  useEffect(() => {
    if (!product) return

    const initialImage = product.image || product.images?.[0] || 
      'https://i.pinimg.com/736x/aa/72/09/aa72098ee0559b84056ccdb95646e336.jpg'

    setMainImage(initialImage)
    setSelectedImageForOrder(initialImage)
  }, [product])

  const openZoom = (src) => {
    if (src) {
      setZoomImageSrc(src)
      setIsZoomOpen(true)
      document.body.style.overflow = 'hidden'
    }
  }

  const closeZoom = () => {
    setIsZoomOpen(false)
    document.body.style.overflow = 'unset'
  }

  // Order handlers
  const handleWhatsAppOrder = () => {
    if (!product) return
    const message = `Hello, I want to order:\n\nProduct: ${product.name}\nImage: ${selectedImageForOrder}\nQuantity: ${quantity}\n\nShipping to: [Please provide your address]`
    window.open(`https://wa.me/251933912682?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handleTelegramOrder = () => {
    if (!product) return
    const message = `Hello, I want to order:\n\nProduct: ${product.name}\nImage: ${selectedImageForOrder}\nQuantity: ${quantity}\n\nShipping to: [Please provide your address]`
    window.open(`https://t.me/Azebgizaw?text=${encodeURIComponent(message)}`, '_blank')
  }

  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4)

  // Show loading / not found
  if (!product) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <button 
          onClick={() => navigate('/shop')}
          className="text-primary underline hover:text-primary/80"
        >
          ← Back to Shop
        </button>
      </div>
    )
  }

  const allImages = product.images?.length > 0 ? product.images : [product.image].filter(Boolean)
  const hasMultipleImages = allImages.length > 1

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => navigate('/shop')}
          className="flex items-center gap-2 text-foreground/70 hover:text-primary mb-8 transition"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Shop
        </button>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div 
              className="aspect-square bg-secondary rounded-2xl overflow-hidden relative cursor-zoom-in group"
              onClick={() => openZoom(mainImage)}
            >
              <img 
                src={mainImage} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                onError={(e) => e.target.src = "https://i.pinimg.com/736x/aa/72/09/aa72098ee0559b84056ccdb95646e336.jpg"}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition">
                <ZoomIn className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition" />
              </div>
            </div>

            {hasMultipleImages && (
              <div className="grid grid-cols-4 gap-3">
                {allImages.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setMainImage(img)
                      setSelectedImageForOrder(img)
                    }}
                    className={`aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                      mainImage === img ? 'border-primary' : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => e.target.src = "https://i.pinimg.com/736x/aa/72/09/aa72098ee0559b84056ccdb95646e336.jpg"}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
            <p className="text-foreground/70 mb-4">{product.category || 'Uncategorized'}</p>
            <div className="text-2xl font-bold mb-6 text-primary">Contact for Price</div>

            <p className="text-foreground/70 mb-8 leading-relaxed">
              {product.description || 'No description available.'}
            </p>

            {product.colors?.length > 0 && (
              <div className="mb-8">
                <label className="font-semibold block mb-3">Available Colors</label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <span key={color} className="px-5 py-2.5 bg-secondary border rounded-xl text-sm">
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-8">
              <label className="font-semibold block mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 border rounded-xl hover:border-primary text-2xl">-</button>
                <span className="text-2xl font-semibold w-14 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 border rounded-xl hover:border-primary text-2xl">+</button>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleWhatsAppOrder}
                disabled={!product.inStock}
                className={`w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 text-lg ${product.inStock ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-400 cursor-not-allowed'}`}
              >
                <ShoppingBag className="h-6 w-6" /> Order via WhatsApp
              </button>

              <button
                onClick={handleTelegramOrder}
                disabled={!product.inStock}
                className={`w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 text-lg ${product.inStock ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-400 cursor-not-allowed'}`}
              >
                <Send className="h-6 w-6" /> Order via Telegram
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
              <div className="text-center"><Truck className="h-7 w-7 mx-auto mb-2 text-muted-foreground" /><p className="text-sm">Free Shipping</p></div>
              <div className="text-center"><RotateCcw className="h-7 w-7 mx-auto mb-2 text-muted-foreground" /><p className="text-sm">Easy Returns</p></div>
              <div className="text-center"><Shield className="h-7 w-7 mx-auto mb-2 text-muted-foreground" /><p className="text-sm">Secure Order</p></div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <div key={p.id} onClick={() => navigate(`/product/${p.id}`)} className="cursor-pointer group">
                  <div className="aspect-square bg-secondary rounded-2xl overflow-hidden mb-4">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition" />
                  </div>
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-sm text-foreground/70">Contact for Price</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Simple Zoom Modal */}
      <AnimatePresence>
        {isZoomOpen && (
          <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4" onClick={closeZoom}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-5xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={closeZoom}
                className="absolute -top-4 -right-4 bg-black text-white p-3 rounded-full shadow-lg"
              >
                <X className="h-6 w-6" />
              </button>

              <img 
                src={zoomImageSrc} 
                alt={product.name}
                className="max-h-[90vh] w-auto mx-auto object-contain rounded-2xl"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProductDetail