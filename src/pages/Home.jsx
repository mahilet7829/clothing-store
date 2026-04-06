import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import ProductCardSkeleton from '../components/ProductCardSkeleton'
import AnimatedPage from '../components/AnimatedPage'
import GradientButton from '../components/ui/GradientButton'
import { products } from '../data/products'

const Home = () => {
  const [loading, setLoading] = useState(true)
  const featuredProducts = products.slice(0, 4)

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500) // 1.5 seconds loading for demo
    return () => clearTimeout(timer)
  }, [])

  // Animation variants for hero section
  const heroVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { delay: 0.5, duration: 0.5 }
    },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  }

  return (
    <AnimatedPage>
      <div className="min-h-screen">
        {/* Hero Section - Premium Design */}
<motion.section 
  className="relative min-h-[90vh] flex items-center overflow-hidden"
  initial="hidden"
  animate="visible"
>
  {/* Background Image with Overlay */}
  <div className="absolute inset-0">
    <img 
      src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600"
      alt="Fashion background"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
  </div>
  
  {/* Content */}
  <div className="relative container mx-auto px-4 z-10">
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-2xl text-white"
    >
      <motion.span 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 block"
      >
        New Collection 2024
      </motion.span>
      
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-6xl md:text-8xl font-bold mb-6 font-serif"
      >
        Style That<br />Defines You
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-xl md:text-2xl mb-8 text-gray-200 max-w-lg"
      >
        Discover premium fashion with effortless ordering via WhatsApp & Telegram
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex gap-4"
      >
        <GradientButton variant="primary">
          Shop Now
        </GradientButton>
        <GradientButton variant="outline">
          View Collection
        </GradientButton>
      </motion.div>
    </motion.div>
  </div>
  
  {/* Scroll indicator */}
  <motion.div 
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
    animate={{ y: [0, 10, 0] }}
    transition={{ repeat: Infinity, duration: 2 }}
  >
    <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
      <div className="w-1 h-2 bg-white rounded-full mt-2"></div>
    </div>
  </motion.div>
</motion.section>
        {/* Featured Products with Loading Skeletons */}
        <section className="container mx-auto px-4 py-16">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-4"
          >
            Featured Collection
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-foreground/70 mb-12"
          >
            Our most popular items this season
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              // Show skeletons while loading
              <>
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
              </>
            ) : (
              // Show actual products
              featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </section>

        {/* Categories Section with Scroll Animation */}
        <motion.section 
          className="bg-secondary py-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Shop by Category</h2>
            <p className="text-center text-foreground/70 mb-12">Find what you're looking for</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['T-Shirts', 'Hoodies', 'Pants', 'Accessories'].map((category, index) => (
                <motion.div 
                  key={category}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative group cursor-pointer"
                >
                  <div className="aspect-square bg-gray-300 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 group-hover:scale-110 transition duration-500"></div>
                  </div>
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition flex items-center justify-center rounded-lg">
                    <span className="text-white font-semibold text-lg">{category}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className="container mx-auto px-4 py-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Upgrade Your Style?</h2>
            <p className="text-foreground/70 mb-8">
              Browse our collection and order directly through WhatsApp or Telegram.
              Fast shipping and easy returns.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              View All Products
            </motion.button>
          </div>
        </motion.section>
      </div>
    </AnimatedPage>
  )
}

export default Home