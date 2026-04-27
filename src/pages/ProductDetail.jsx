import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeft, Truck, RotateCcw, Shield, X, ZoomIn, 
  Plus, Minus, MessageCircle, Send, ShoppingBag 
} from 'lucide-react'
import { getProductById } from '../data/Products'

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProductById(id)

  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState('')
  const [isZoomOpen, setIsZoomOpen] = useState(false)

  useEffect(() => {
    if (!product) return
    const initialImage = product.image || product.images?.[0]
    setMainImage(initialImage)
  }, [product])

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0D0D0D] text-white">
        <h1 className="text-4xl font-serif mb-4">Piece Not Found</h1>
        <button onClick={() => navigate('/')} className="text-[#C5A059] uppercase tracking-widest text-sm font-bold">
          ← Back to Collections
        </button>
      </div>
    )
  }

  const allImages = product.images?.length > 0 ? product.images : [product.image].filter(Boolean)

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#FDFBF7] selection:bg-[#C5A059]/30 pt-28 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Navigation */}
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 text-gray-500 hover:text-[#C5A059] mb-12 transition-all font-bold uppercase tracking-[0.2em] text-xs"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Gallery
        </button>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT: Image Gallery */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-[4/5] bg-[#161616] rounded-[3rem] overflow-hidden relative cursor-zoom-in group border border-white/5 shadow-2xl"
              onClick={() => setIsZoomOpen(true)}
            >
              <img src={mainImage} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20">
                  <ZoomIn className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-4 gap-4">
              {allImages.map((img, index) => (
                <motion.div
                  whileHover={{ y: -5 }}
                  key={index}
                  onClick={() => setMainImage(img)}
                  className={`aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
                    mainImage === img ? 'border-[#C5A059] scale-95' : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col h-full"
          >
            <span className="text-[#C5A059] font-bold uppercase tracking-[0.4em] text-[10px] mb-4">
              {product.category || 'Handcrafted Heritage'}
            </span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-white leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-black text-white tracking-tighter">
                {product.price} <span className="text-sm text-[#C5A059] uppercase ml-1 font-bold">ETB</span>
              </span>
              <div className="h-4 w-[1px] bg-white/10" />
              <span className="text-gray-500 text-sm uppercase tracking-widest">In Stock</span>
            </div>

            <p className="text-gray-400 text-lg leading-relaxed font-light mb-10 border-l-2 border-[#C5A059]/30 pl-6">
              {product.description || 'This exquisite piece showcases the pinnacle of Ethiopian craftsmanship, using ethically sourced materials and traditional hand-weaving techniques.'}
            </p>

            {/* Quantity Selector */}
            <div className="mb-10">
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-4">Select Quantity</h4>
              <div className="flex items-center gap-6">
                <div className="flex items-center bg-[#1A1A1A] rounded-full border border-white/10 p-1">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 flex items-center justify-center hover:text-[#C5A059] transition-colors"><Minus size={16}/></button>
                  <span className="text-lg font-bold w-12 text-center text-white">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 flex items-center justify-center hover:text-[#C5A059] transition-colors"><Plus size={16}/></button>
                </div>
              </div>
            </div>

            {/* Main Actions */}
            <div className="space-y-4 mb-12">
              <button
                onClick={() => addToCart({ ...product, qty: quantity })}
                className="w-full py-6 bg-[#C5A059] text-[#0D0D0D] rounded-full font-black tracking-widest uppercase hover:scale-[1.02] transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(197,160,89,0.2)]"
              >
                <ShoppingBag size={20} /> Add to Collection
              </button>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => window.open(`https://wa.me interested in the ${product.name}`)}
                  className="py-5 border border-white/10 text-white rounded-full font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 text-[10px]"
                >
                  <MessageCircle size={14} /> WhatsApp
                </button>
                <button
                  onClick={() => window.open(`https://t.me/Azebgizaw`)}
                  className="py-5 border border-white/10 text-white rounded-full font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 text-[10px]"
                >
                  <Send size={14} /> Telegram
                </button>
              </div>
            </div>

            {/* Detail Badges */}
            <div className="grid grid-cols-3 gap-4 pt-10 border-t border-white/5">
              {[
                { icon: <Truck />, label: "Global", sub: "Delivery" },
                { icon: <RotateCcw />, label: "7 Day", sub: "Exchange" },
                { icon: <Shield />, label: "Verified", sub: "Quality" }
              ].map((badge, idx) => (
                <div key={idx} className="text-center group">
                  <div className="text-[#C5A059] mb-2 flex justify-center group-hover:scale-110 transition-transform">{badge.icon}</div>
                  <p className="text-[10px] font-black uppercase text-white mb-1">{badge.label}</p>
                  <p className="text-[9px] uppercase tracking-widest text-gray-500">{badge.sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modern Zoom Overlay */}
      <AnimatePresence>
        {isZoomOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0D0D0D]/95 z-[100] flex items-center justify-center p-6 cursor-zoom-out" 
            onClick={() => setIsZoomOpen(false)}
          >
            <button className="absolute top-10 right-10 text-white bg-white/10 p-4 rounded-full border border-white/20 hover:bg-[#C5A059] hover:text-black transition-all">
              <X />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={mainImage} 
              className="max-h-[85vh] rounded-3xl shadow-2xl object-contain border border-white/10" 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProductDetail
