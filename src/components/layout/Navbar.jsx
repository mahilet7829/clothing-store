import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/shop', label: 'SHOP' },
    { path: '/about', label: 'ABOUT' },
    { path: '/contact', label: 'CONTACT' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-black border-b border-gray-100 dark:border-gray-900 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Just added ለWE CLOTHING here */}
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-5 w-5" />
            <span className="text-sm font-medium tracking-wide uppercase">
              ለWE CLOTHING
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs tracking-wider font-medium uppercase transition-colors hover:text-gray-500 ${
                  isActive(link.path) 
                    ? 'text-black dark:text-white' 
                    : 'text-gray-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-white dark:bg-black border-l border-gray-100 dark:border-gray-900">
              <div className="sr-only">
                <SheetTitle>Navigation Menu</SheetTitle>
                <SheetDescription>Browse pages on ለWE Clothing</SheetDescription>
              </div>
              <div className="flex flex-col gap-6 mt-12">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm tracking-wider font-medium uppercase transition-colors ${
                      isActive(link.path) 
                        ? 'text-black dark:text-white' 
                        : 'text-gray-400'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

export default Navbar