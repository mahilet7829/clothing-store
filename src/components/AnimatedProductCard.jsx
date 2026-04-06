import React from 'react'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard'

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    y: -10,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
}

const AnimatedProductCard = ({ product, index }) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      custom={index}
      transition={{ delay: index * 0.1 }}
    >
      <ProductCard product={product} />
    </motion.div>
  )
}

export default AnimatedProductCard