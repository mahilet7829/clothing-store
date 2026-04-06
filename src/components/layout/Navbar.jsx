import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingBag, Phone } from 'lucide-react'
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
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6" />
            <span className="font-bold text-xl">ለWE Clothing</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Button
                key={link.path}
                variant={isActive(link.path) ? "default" : "ghost"}
                asChild
                className="text-base"
              >
                <Link to={link.path}>{link.label}</Link>
              </Button>
            ))}
            <Button variant="outline" className="ml-4 gap-2">
              <Phone className="h-4 w-4" />
              Contact
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
           <SheetContent side="right" className="w-[300px] sm:w-[400px]">
  {/* Add title for accessibility - visually hidden but readable by screen readers */}
  <div className="sr-only">
    <SheetTitle>Navigation Menu</SheetTitle>
    <SheetDescription>Browse pages on ለWE Clothing</SheetDescription>
  </div>
  <div className="flex flex-col gap-4 mt-8">
    {navLinks.map((link) => (
      <Button
        key={link.path}
        variant={isActive(link.path) ? "default" : "ghost"}
        asChild
        className="justify-start text-lg"
        onClick={() => setIsOpen(false)}
      >
        <Link to={link.path}>{link.label}</Link>
      </Button>
    ))}
    <Button variant="outline" className="gap-2 mt-4">
      <Phone className="h-4 w-4" />
      Contact Sales
    </Button>
  </div>
</SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

export default Navbar