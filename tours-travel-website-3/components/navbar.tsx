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
import { Menu, X, Shield } from "lucide-react"
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
  const isTransparent = false
  // Use the custom hook to get auth state and role (does not expose JWT)
  const { isAuthenticated, loading, role } = useAuth();

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
    // Clear all frontend state
    if (typeof window !== 'undefined') {
      localStorage.clear();
      sessionStorage.clear();
    }
    // Dispatch a custom event so Navbar updates immediately
    window.dispatchEvent(new Event("auth-changed"));
  };

  return (
    <>
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white backdrop-blur-xl shadow-sm border-b border-black/5"
      role="navigation"
      aria-label="Main Navigation"
    >
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
<div
  className={`hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2 rounded-full p-1.5 transition-all duration-300 ${
    isTransparent
      ? "bg-gray-400/26 backdrop-blur-lg"
      : "bg-gray-200/72 backdrop-blur-lg shadow-sm"
  }`}
>
  {navigation.map((item) => (
    <Link
      key={item.name}
      href={item.href}
      className={`text-sm lg:text-base font-medium tracking-wide px-5 py-2 rounded-full transition-all duration-200 ${
        pathname === item.href
          ? "bg-black text-white shadow-sm"
          : isTransparent
            ? "text-white/90 hover:text-white hover:bg-white/15"
            : "text-gray-700 hover:text-gray-900 hover:bg-white/70"
      }`}
    >
      {item.name}
    </Link>
  ))}
</div>

{/* Auth/Profile - Right */}
<div className="hidden md:flex items-center space-x-4 ml-auto">
  {/* Auth/Profile */}
  {!isAuthenticated && (
    <Button
      size="lg"
      className="px-6 py-2 text-base font-semibold rounded-full transition-all duration-200 bg-black hover:bg-black/90 text-white border border-black"
      onClick={() => setAuthOpen(true)}
    >
      Sign In
    </Button>
  )}
  {!loading && isAuthenticated && userInitial && (
    <DropdownMenu open={profileOpen} onOpenChange={setProfileOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-center focus:outline-none">
          <Avatar>
            <AvatarFallback className="bg-orange-500 text-white font-bold">
              {userInitial}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {role === 'admin' && (
          <>
            <DropdownMenuItem asChild>
              <Link href="/admin" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Admin Panel
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )}
</div>


          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsOpen(!isOpen)}
              className={`${isTransparent ? "text-white" : "text-orange-600 hover:text-orange-500"} focus:ring-2 focus:ring-orange-300 focus:outline-none`}
            >
              {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </Button>
          </div>
        </div>

                  {/* Mobile Navigation */}
          {isOpen && (
            <>
              {/* Backdrop for focus and accessibility */}
              <div
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity md:hidden"
                aria-hidden="true"
                onClick={() => setIsOpen(false)}
              />
              <div
                id="mobile-menu"
                className="fixed top-0 left-0 right-0 z-50 md:hidden bg-white border-b border-gray-200 shadow-lg animate-fadeIn w-full"
                role="dialog"
                aria-modal="true"
              >
                <div className="flex items-center justify-between px-4 h-16 border-b border-gray-100">
                  <Link href="/" className="flex items-center space-x-2" tabIndex={0} aria-label="Home">
                    <Image
                      src="/images/WhatsApp_Image_2025-08-04_at_18.03.33_50e467a4-removebg-preview.png"
                      alt="Wanderlust Tours Logo"
                      width={140}
                      height={40}
                      className="h-10 w-auto"
                      priority
                    />
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Close menu"
                    onClick={() => setIsOpen(false)}
                    className="text-orange-600 hover:text-orange-500 focus:ring-2 focus:ring-orange-300 focus:outline-none"
                  >
                    <X className="h-8 w-8" />
                  </Button>
                </div>
                <div className="px-4 pt-2 pb-6 space-y-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block w-full px-4 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 text-left focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                        pathname === item.href ? "text-orange-600 bg-orange-50" : "text-gray-900 hover:text-orange-600 hover:bg-orange-50"
                      }`}
                      onClick={() => setIsOpen(false)}
                      tabIndex={0}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-2">
                    {!isAuthenticated && (
                      <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-md text-lg font-semibold py-3 transition-all duration-200" onClick={() => { setAuthOpen(true); setIsOpen(false); }}>
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
                          {role === 'admin' && (
                            <>
                              <DropdownMenuItem asChild>
                                <Link href="/admin" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                                  <Shield className="w-4 h-4" />
                                  Admin Panel
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                            </>
                          )}
                          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
      </div>
    </nav>
  {/* Auth Modal */}
  {/* AuthModal opens for login/signup, closes on success or cancel */}
  <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}
