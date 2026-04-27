import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Palette, Search, Menu, X, Phone, MessageCircle, Send, 
  ShoppingBag, Trash2, Plus, Minus, Mail
} from 'lucide-react'
import ProductCardShadcn from '../components/ProductCardShadcn'
import ProductCardSkeleton from '../components/ProductCardSkeleton'
import { products } from '../data/products'

const Home = () => {
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  // CART STATE
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // CATEGORY ORDER: Dresses first
  const categories = ['All', 'Habesha Kemis', 'Shefun', 'Hotel Wear', 'Accessories', 'Uniforms']

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => { window.removeEventListener('scroll', handleScroll); clearTimeout(timer) }
  }, [])

  // ==================== HANDLER FUNCTIONS ====================
  
  // WhatsApp Handler
  const handleWhatsApp = (customMessage = 'Hello! I have a question about your products.') => {
    window.open(`https://wa.me/251933912682?text=${encodeURIComponent(customMessage)}`, '_blank')
  }

  // Telegram Handler
  const handleTelegram = () => {
    window.open('https://t.me/Azebgizaw?text=Hello!%20I%20have%20a%20question.', '_blank')
  }

  // CART LOGIC
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) return prev.map(item => item.id === product.id ? {...item, qty: item.qty + 1} : item)
      return [...prev, {...product, qty: 1}]
    })
    setIsCartOpen(true)
  }

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id))
  
  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ))
  }

  const checkoutWhatsApp = () => {
    const items = cart.map(item => `• ${item.name} (x${item.qty})`).join('%0A')
    const total = cart.reduce((sum, item) => sum + ((item.price || 0) * item.qty), 0)
    const text = `Hello! I would like to order:%0A${items}%0A%0ATotal: ${total} ETB`
    window.open(`https://wa.me/251933912682?text=${encodeURIComponent(text)}`, '_blank')
  }

  const scroll = (id) => { 
    setIsMenuOpen(false)
    setIsCartOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) 
  }

  // FILTERED PRODUCTS
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#FDFBF7] selection:bg-[#C5A059]/30 font-sans">
      
      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4 bg-[#0D0D0D]/90 backdrop-blur-xl border-b border-white/5' : 'py-8 bg-transparent'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div onClick={() => scroll('hero')} className="text-2xl font-serif font-black cursor-pointer">ለWE<span className="text-[#C5A059]">.</span></div>
          <div className="hidden md:flex items-center gap-8">
            {['about', 'shop', 'contact'].map(item => (
              <button key={item} onClick={() => scroll(item)} className="text-[10px] uppercase tracking-[0.3em] font-bold hover:text-[#C5A059] transition-colors">{item}</button>
            ))}
            <button onClick={() => setIsCartOpen(true)} className="relative bg-[#C5A059] text-black p-3 rounded-full">
              <ShoppingBag size={18} />
              {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg">{cart.length}</span>}
            </button>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(true)}><Menu /></button>
        </div>
      </nav>

      {/* SHOPPING CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25 }} className="fixed right-0 top-0 h-full w-full max-w-md bg-[#121212] z-[70] shadow-2xl p-8 flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-serif font-bold">Your Bag</h2>
                <button onClick={() => setIsCartOpen(false)}><X /></button>
              </div>
              
              <div className="flex-grow overflow-y-auto space-y-6 pr-2">
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center mt-20">Your bag is empty.</p>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4 items-center bg-white/5 p-4 rounded-3xl border border-white/5">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-2xl bg-white/10" />
                      <div className="flex-grow">
                        <h4 className="font-bold text-sm">{item.name}</h4>
                        <p className="text-[#C5A059] text-xs font-bold">{item.price || 'Contact for Price'} ETB</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button onClick={() => updateQty(item.id, -1)} className="p-1 hover:text-[#C5A059]"><Minus size={14}/></button>
                          <span className="text-xs font-bold">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="p-1 hover:text-[#C5A059]"><Plus size={14}/></button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-600 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="pt-8 border-t border-white/10 mt-6">
                  <div className="flex justify-between mb-6">
                    <span className="text-gray-400">Total</span>
                    <span className="text-xl font-serif font-bold">{cart.reduce((s, i) => s + ((i.price || 0) * i.qty), 0)} ETB</span>
                  </div>
                  <button onClick={checkoutWhatsApp} className="w-full bg-[#C5A059] text-black py-5 rounded-[2rem] font-black uppercase tracking-widest hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                    <MessageCircle size={20}/> Order via WhatsApp
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section id="hero" className="relative h-screen flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#C5A059]/10 via-transparent to-transparent" />
        <div className="relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-8xl md:text-[12rem] font-serif font-black tracking-tighter leading-none">ለWE<span className="text-[#C5A059]">.</span></motion.h1>
          <p className="text-gray-400 uppercase tracking-[0.5em] mt-6">Habesha Kemis & Modern Wear</p>
          <button onClick={() => scroll('shop')} className="mt-12 bg-[#C5A059] text-black px-12 py-5 rounded-full font-black uppercase tracking-widest hover:scale-110 transition-all">Shop Collection</button>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-32 bg-[#121212] border-y border-white/5">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">Our Heritage</h2>
          <p className="text-gray-400 text-lg leading-relaxed font-light italic">"Fashion that connects tradition with the contemporary world."</p>
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="py-32 container mx-auto px-6">
        <div className="flex flex-col items-center mb-16 space-y-8">
          <h2 className="text-5xl font-serif font-bold">The Boutique</h2>
          <div className="w-full max-w-2xl relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" />
            <input type="text" placeholder="Search heritage pieces..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-[#1A1A1A] border border-white/5 rounded-full py-5 pl-16 pr-6 focus:border-[#C5A059] transition-all outline-none" />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${selectedCategory === cat ? 'bg-[#C5A059] text-black' : 'bg-white/5 border border-white/5 text-gray-500 hover:text-white'}`}>{cat}</button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"><ProductCardSkeleton /></div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence>
              {filteredProducts.map(p => (
                <motion.div key={p.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-[3rem] overflow-hidden bg-[#161616] border border-white/5 p-3 group relative">
                  <ProductCardShadcn product={p} />
                  <button onClick={() => addToCart(p)} className="absolute bottom-6 right-6 bg-[#C5A059] text-black p-4 rounded-2xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all shadow-2xl">
                    <Plus size={20} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* CONTACT & BESPOKE DESIGN */}
      <section id="contact" className="py-32 bg-[#080808] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-white">Get in Touch</h2>
            <p className="text-[#C5A059] uppercase tracking-[0.4em] text-xs font-bold">Inquiry & Bespoke Orders</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Channels */}
            <div className="space-y-6">
              {/* WhatsApp Card */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                onClick={() => handleWhatsApp('Hello! I would like to inquire about your collection.')} 
                className="flex items-center gap-6 p-8 rounded-[2.5rem] bg-white/5 border border-white/5 cursor-pointer hover:border-[#C5A059]/40 transition-all group"
              >
                <div className="bg-[#C5A059]/10 p-5 rounded-3xl text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-black transition-all">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold uppercase tracking-widest text-[10px] text-gray-500 mb-1">WhatsApp</h3>
                  <p className="text-white text-lg font-medium">+251 933 912 682</p>
                </div>
              </motion.div>

              {/* Telegram Card */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                onClick={handleTelegram} 
                className="flex items-center gap-6 p-8 rounded-[2.5rem] bg-white/5 border border-white/5 cursor-pointer hover:border-[#C5A059]/40 transition-all group"
              >
                <div className="bg-[#C5A059]/10 p-5 rounded-3xl text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-black transition-all">
                  <Send className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold uppercase tracking-widest text-[10px] text-gray-500 mb-1">Telegram</h3>
                  <p className="text-white text-lg font-medium">@Azebgizaw</p>
                </div>
              </motion.div>
              
              {/* Quick Email Info */}
              <div className="flex items-center gap-4 px-8 text-gray-500">
                <Mail size={16} className="text-[#C5A059]" />
                <span className="text-xs uppercase tracking-widest">hello@leweclothing.com</span>
              </div>
            </div>

            {/* Custom Design CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              className="bg-[#C5A059] rounded-[4rem] p-12 text-[#0D0D0D] relative overflow-hidden flex flex-col justify-center shadow-[0_20px_50px_rgba(197,160,89,0.15)]"
            >
              <div className="relative z-10">
                <h2 className="text-4xl font-serif font-bold mb-6">🎨 Bespoke Designs</h2>
                <p className="mb-10 text-[#0D0D0D]/80 leading-relaxed font-medium">
                  Have a custom Habesha vision? Send us your sketch or inspiration photo on Telegram or WhatsApp.
                </p>
                <button 
                  onClick={() => handleWhatsApp('I have a custom design idea to share.')}
                  className="w-full bg-[#0D0D0D] text-white py-6 rounded-[2rem] font-black uppercase tracking-widest hover:scale-[1.03] active:scale-95 transition-all shadow-xl"
                >
                  Start Your Custom Order
                </button>
              </div>
              <Palette className="absolute -bottom-10 -right-10 w-64 h-64 text-black/10 rotate-12" />
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-black text-center text-[10px] text-gray-800 uppercase tracking-[0.5em]">© 2026 ለWE CLOTHING</footer>
    </div>
  )
}

export default Home