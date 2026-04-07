import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Truck, RotateCcw, Shield } from 'lucide-react'
import ProductCardShadcn from '../components/ProductCardShadcn'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { products } from '../data/products'

const Home = () => {
  const [loading, setLoading] = useState(true)
  const featuredProducts = products.slice(0, 4)
  const newArrivals = products.slice(4, 8)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Categories for your store
  const categories = [
    { name: 'Hotel Wear', icon: '🏨', color: 'from-blue-500 to-cyan-500' },
    { name: 'Uniforms', icon: '👔', color: 'from-purple-500 to-pink-500' },
    { name: 'Accessories', icon: '🧢', color: 'from-orange-500 to-red-500' },
  ]

  const features = [
    { icon: Truck, title: 'Free Shipping', description: 'On orders over $50' },
    { icon: RotateCcw, title: 'Easy Returns', description: '30 day return policy' },
    { icon: Shield, title: 'Secure Order', description: '100% secure checkout' },
    { icon: Star, title: 'Premium Quality', description: 'Best materials used' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section - Premium Fullscreen */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://i.pinimg.com/1200x/b0/27/c8/b027c8733b8f76a71be88d7ff7189bea.jpg"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm tracking-[0.3em] uppercase mb-4 block">New Collection 2026</span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter">

              ለWE CLOTHING
            </h1>
            <p className="text-lg md:text-xl mt-6 max-w-2xl mx-auto font-light">
              Premium quality uniforms for hospitality professionals.
              Order directly via WhatsApp.
            </p>
            <div className="mt-10 flex gap-4 justify-center">
              <button 
                onClick={() => navigate('/shop')}
                className="bg-white text-black px-8 py-3 text-sm tracking-wide font-medium hover:bg-black hover:text-white transition duration-300"
              >
                SHOP NOW
              </button>
              <button 
                onClick={() => navigate('/contact')}
                className="border border-white px-8 py-3 text-sm tracking-wide font-medium hover:bg-white hover:text-black transition duration-300"
              >
                CONTACT US
              </button>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center border-none shadow-none bg-transparent">
                  <CardContent className="pt-6">
                    <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="secondary" className="mb-4">Featured Collection</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our premium hotel wear and uniform collection.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredProducts.map((product, index) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCardShadcn product={product} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button asChild size="lg" variant="outline">
              <Link to="/shop">
                <span className="flex items-center justify-center">
                  View All Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="secondary" className="mb-4">Shop by Category</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse Collections</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find exactly what you're looking for
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link to={`/shop?category=${category.name.toLowerCase()}`}>
                  <Card className="overflow-hidden cursor-pointer group">
                    <div className={`aspect-square bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                      <span className="text-6xl">{category.icon}</span>
                    </div>
                    <CardContent className="p-4 text-center">
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">Shop Now →</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="secondary" className="mb-4">Just In</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">New Arrivals</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Fresh styles just landed
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCardShadcn product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Design Section - NEW */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-4 block">
                Custom Orders
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Create Your Own Design
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Have a unique idea? We bring your vision to life. Send us your design, 
                and we'll create custom clothing just for you.
              </p>
              
              {/* Features Grid */}
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-3xl mb-3">✏️</div>
                  <h3 className="font-semibold mb-2">Send Your Design</h3>
                  <p className="text-sm text-gray-500">Share your sketch, photo, or idea</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">👔</div>
                  <h3 className="font-semibold mb-2">We Create It</h3>
                  <p className="text-sm text-gray-500">Our team crafts your custom piece</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">📦</div>
                  <h3 className="font-semibold mb-2">Delivered to You</h3>
                  <p className="text-sm text-gray-500">Quality guaranteed, ready to wear</p>
                </div>
              </div>
              
              {/* WhatsApp Button for Custom Orders */}
              <div className="mt-10">
                <button
                  onClick={() => window.open('https://wa.me/251933912682?text=Hello!%20I%20have%20a%20custom%20design%20idea%20I%27d%20like%20to%20discuss.', '_blank')}
                  className="bg-black text-white px-8 py-3 text-sm tracking-wide font-medium hover:bg-gray-800 transition duration-300 inline-flex items-center gap-2"
                >
                  📱 Send Your Design on WhatsApp
                </button>
                <p className="text-xs text-gray-400 mt-4">
                  Feel free to share your inspiration - we'll help bring it to life!
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Order?
            </h2>
            <p className="text-lg mb-8 text-gray-300">
              Contact us directly via WhatsApp or Telegram for pricing and orders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-black hover:bg-gray-100">
                <Link to="/shop">
                  <span className="flex items-center justify-center">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home