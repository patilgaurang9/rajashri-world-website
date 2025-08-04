"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Tours", href: "/tours" },
  { name: "Custom Booking", href: "/custom-booking" },
  { name: "FAQs", href: "/faqs" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent">
              <div className="container mx-auto px-4 pt-4">
          <div className="flex items-center justify-between h-16">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/WhatsApp_Image_2025-08-04_at_18.03.33_50e467a4-removebg-preview.png"
                alt="Wanderlust Tours Logo"
                width={200}
                height={67}
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2">
            <div className={`bg-white/90 backdrop-blur-md rounded-full px-8 py-3 shadow-lg border border-white/30 transition-all duration-300 ${
              isScrolled ? "bg-white/95" : "bg-white/80"
            }`}>
              <div className="flex items-center space-x-12">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-base font-medium transition-colors ${
                      pathname === item.href 
                        ? "text-orange-600" 
                        : "text-gray-900 hover:text-orange-600"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Book Now Button - Right */}
          <div className="hidden md:flex">
            <Button
              asChild
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-6 py-2 text-base font-medium shadow-lg"
            >
              <Link href="/book">Book Now</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-orange-300">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

                  {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/20 shadow-lg">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 text-base font-medium transition-colors hover:text-orange-300 ${
                      pathname === item.href ? "text-orange-400" : "text-white"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="px-3 py-2">
                  <Button asChild className="w-full bg-white text-gray-900 hover:bg-gray-100 rounded-full">
                    <Link href="/book" onClick={() => setIsOpen(false)}>
                      Book Now
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
      </div>
    </nav>
  )
}
