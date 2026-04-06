import React from 'react'
import { motion } from 'framer-motion'

const GradientButton = ({ children, onClick, className = '', variant = 'primary', icon: Icon = null }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-gray-900 to-gray-700 text-white hover:shadow-xl',
    secondary: 'bg-gradient-to-r from-gray-200 to-gray-100 text-gray-900 hover:shadow-lg',
    accent: 'bg-gradient-to-r from-yellow-600 to-yellow-400 text-black hover:shadow-xl',
    outline: 'border-2 border-gray-900 dark:border-white bg-transparent hover:bg-gray-900 hover:text-white'
  }
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative overflow-hidden px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${variants[variant]} ${className}`}
    >
      {Icon && <Icon className="h-5 w-5" />}
      {children}
      <motion.div 
        className="absolute inset-0 bg-white opacity-0"
        whileHover={{ opacity: 0.1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  )
}

export default GradientButton