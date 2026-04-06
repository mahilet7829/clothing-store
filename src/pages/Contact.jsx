import React from 'react'

const Contact = () => {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="mb-6 text-foreground/70">
              Have questions? We're here to help! Reach out through WhatsApp or Telegram.
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">WhatsApp</h3>
                <p className="text-foreground/70">+123 456 7890</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Telegram</h3>
                <p className="text-foreground/70">@mahlet7829</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-foreground/70">hello@clothingstore.com</p>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Send us a Message</h2>
            <form className="space-y-4">
              <input 
                type="text" 
                placeholder="Your Name"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
              />
              <input 
                type="email" 
                placeholder="Your Email"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
              />
              <textarea 
                placeholder="Your Message"
                rows="4"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
              ></textarea>
              <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact