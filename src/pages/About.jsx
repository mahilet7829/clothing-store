import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        <div className="prose dark:prose-invert">
          <p className="text-lg mb-4">
            Welcome to our clothing store - where fashion meets convenience.
          </p>
          <p className="mb-4">
            We're a modern clothing brand dedicated to providing high-quality fashion 
            with a seamless ordering experience through WhatsApp and Telegram.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p>
            To make fashion accessible and ordering effortless. No complex checkout 
            processes - just select, message, and receive.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About