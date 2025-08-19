"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { AuthModal } from "@/components/auth-modal"
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
  const [authOpen, setAuthOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const pathname = usePathname()
  // Use the custom hook to get auth state (does not expose JWT)
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Only fetch user initial if authenticated, else clear it
  const [userInitial, setUserInitial] = useState('');
  useEffect(() => {
    if (!loading && isAuthenticated) {
      fetch('/api/auth/me', { credentials: 'include' })
        .then(res => res.json())
        .then(data => {
          if (data && data.email) {
            setUserInitial(data.email[0].toUpperCase());
          } else {
            setUserInitial('');
          }
        })
        .catch(() => setUserInitial(''));
    } else if (!loading && !isAuthenticated) {
      setUserInitial('');
    }
  }, [isAuthenticated, loading]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setProfileOpen(false);
    setUserInitial(''); // Reset user initial after logout
    // Dispatch a custom event so Navbar updates immediately
    window.dispatchEvent(new Event("auth-changed"));
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-md border-b border-gray-200`}>
      {/* Orange accent bar */}
      <div className="w-full h-1 bg-orange-500" />
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <Image
                src="/images/WhatsApp_Image_2025-08-04_at_18.03.33_50e467a4-removebg-preview.png"
                alt="Wanderlust Tours Logo"
                width={180}
                height={60}
                className="h-14 w-auto transition-transform group-hover:scale-105"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2 space-x-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-base font-semibold tracking-wide px-2 py-1 transition-colors duration-200 ${
                  pathname === item.href
                    ? "text-orange-600"
                    : "text-gray-900 hover:text-orange-600"
                } group`}
              >
                <span>{item.name}</span>
                <span className={`absolute left-0 -bottom-1 w-full h-0.5 rounded bg-orange-500 transition-all duration-300 ${pathname === item.href ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`}></span>
              </Link>
            ))}
          </div>

          {/* Auth/Profile Button - Right */}
          <div className="hidden md:flex">
            {/* Show Login/Signup if not authenticated, else show Profile dropdown */}
            {!loading && !isAuthenticated && (
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-2 text-base font-semibold shadow transition-colors"
                onClick={() => setAuthOpen(true)}
              >
                Login
              </Button>
            )}
            {!loading && isAuthenticated && userInitial && (
              <DropdownMenu open={profileOpen} onOpenChange={setProfileOpen}>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center justify-center focus:outline-none">
                    <Avatar>
                      <AvatarFallback className="bg-orange-500 text-white font-bold">{userInitial}</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="text-orange-600 hover:text-orange-500 focus:ring-2 focus:ring-orange-300">
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </Button>
          </div>
        </div>

                  {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden bg-white/95 border-t border-gray-200 shadow-lg animate-fadeIn">
              <div className="px-4 pt-4 pb-4 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-3 rounded-lg text-base font-semibold transition-colors duration-200 ${
                      pathname === item.href ? "text-orange-600 bg-orange-50" : "text-gray-900 hover:text-orange-600 hover:bg-orange-50"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-2">
                  {!loading && !isAuthenticated && (
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full text-base font-semibold" onClick={() => { setAuthOpen(true); setIsOpen(false); }}>
                      Login / Signup
                    </Button>
                  )}
                  {!loading && isAuthenticated && (
                    <DropdownMenu open={profileOpen} onOpenChange={setProfileOpen}>
                      <DropdownMenuTrigger asChild>
                        <button className="flex items-center justify-center w-full focus:outline-none">
                          <Avatar>
                            <AvatarFallback className="bg-orange-500 text-white font-bold">{userInitial}</AvatarFallback>
                          </Avatar>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            </div>
          )}
      </div>
      {/* Auth Modal */}
  {/* AuthModal opens for login/signup, closes on success or cancel */}
  <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </nav>
  )
}
