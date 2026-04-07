import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from 'lucide-react'

const Contact = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/251933912682?text=Hello!%20I%20have%20a%20question%20about%20your%20products.', '_blank')
  }

  const handleTelegram = () => {
    window.open('https://t.me/Azebgizaw?text=Hello!%20I%20have%20a%20question.', '_blank')
  }

  const handleCustomDesignWhatsApp = () => {
    window.open('https://wa.me/251933912682?text=Hello!%20I%20have%20a%20custom%20design%20idea%20to%20share.', '_blank')
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have questions or ready to place an order? Reach out to us anytime.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-gray-500 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Phone / WhatsApp</h3>
                  <p className="text-gray-600 dark:text-gray-400">+251 933 912 682</p>
                  <button
                    onClick={handleWhatsApp}
                    className="mt-2 text-sm text-green-600 hover:text-green-700 underline"
                  >
                    Message on WhatsApp →
                  </button>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Send className="h-6 w-6 text-gray-500 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Telegram</h3>
                  <p className="text-gray-600 dark:text-gray-400">@Azebgizaw</p>
                  <button
                    onClick={handleTelegram}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-700 underline"
                  >
                    Message on Telegram →
                  </button>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-gray-500 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-gray-600 dark:text-gray-400">hello@leweclothing.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Clock className="h-6 w-6 text-gray-500 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Business Hours</h3>
                  <p className="text-gray-600 dark:text-gray-400">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600 dark:text-gray-400">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Custom Design Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">🎨 Custom Design Requests</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Have your own design in mind? Send us your sketch, photo, or idea via WhatsApp or Telegram, 
                and we'll create custom clothing just for you!
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-xl">✏️</span>
                  <span>Share your sketch or inspiration photo</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-xl">👔</span>
                  <span>Tell us your size and preferences</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-xl">📦</span>
                  <span>We create and deliver your custom piece</span>
                </div>
              </div>
              
              <button
                onClick={handleCustomDesignWhatsApp}
                className="w-full mt-8 bg-black text-white px-6 py-3 text-sm tracking-wide font-medium hover:bg-gray-800 transition duration-300 flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                Send Your Design on WhatsApp
              </button>
              <p className="text-xs text-gray-400 text-center mt-4">
                Feel free to share your inspiration - we'll help bring it to life!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Contact