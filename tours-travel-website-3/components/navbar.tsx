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
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { AuthModal } from "@/components/auth-modal"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Shield, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

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
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isTransparent = false
  // Use the custom hook to get auth state and role (does not expose JWT)
  const { isAuthenticated, loading, role } = useAuth();

  useEffect(() => {
    setMounted(true)
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
            <div className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2 rounded-full p-1.5 bg-gray-200/70 backdrop-blur-lg shadow-sm">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm lg:text-base font-medium tracking-wide px-5 py-2 rounded-full transition-all duration-200 ${
                    pathname === item.href
                      ? "bg-black text-white shadow-sm"
                      : "text-gray-700 hover:text-gray-900 hover:bg-white/70"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

          {/* Auth/Profile - Right */}
          <div className="hidden md:flex items-center space-x-4 ml-auto min-w-[120px] justify-end">
            {!mounted ? (
              <div className="h-10 w-24 bg-gray-100 animate-pulse rounded-full" />
            ) : (
              <>
                {!isAuthenticated ? (
                  <Button
                    size="lg"
                    className="px-6 py-2 text-base font-semibold rounded-full transition-all duration-200 bg-black hover:bg-black/90 text-white border border-black"
                    onClick={() => setAuthOpen(true)}
                  >
                    Sign In
                  </Button>
                ) : (
                  userInitial && (
                    <DropdownMenu open={profileOpen} onOpenChange={setProfileOpen}>
                      <DropdownMenuTrigger asChild>
                        <button className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-700 font-black text-lg hover:bg-orange-200 transition-all duration-300 shadow-sm border-2 border-orange-200/50">
                          {userInitial}
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl border-slate-100 shadow-2xl">
                        <DropdownMenuLabel className="font-black text-xs uppercase tracking-widest text-slate-400 p-3">My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-slate-50" />
                        {role === 'admin' && (
                          <>
                            <DropdownMenuItem className="rounded-xl p-3 font-bold text-slate-700 focus:bg-slate-50 cursor-pointer" onClick={() => router.push("/admin")}>
                              Admin Dashboard
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-slate-50" />
                          </>
                        )}
                        <DropdownMenuItem 
                          className="rounded-xl p-3 font-bold text-red-600 focus:bg-red-50 focus:text-red-600 cursor-pointer"
                          onClick={handleLogout}
                        >
                          Sign Out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )
                )}
              </>
            )}
          </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="icon"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                onClick={() => setIsOpen(!isOpen)}
                className="text-orange-600 hover:text-orange-500 focus:ring-2 focus:ring-orange-300 focus:outline-none"
              >
                {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
              </Button>
            </div>
          </div>

        </div>
      </nav>
      {/* Mobile Navigation Overlay */}
        {isOpen && (
          <div
            className="md:hidden fixed top-0 left-0 right-0 bottom-0 flex flex-col"
            style={{ zIndex: 9999, backgroundColor: '#ffffff' }}
          >
            {/* Mobile Nav Header */}
            <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100" style={{ backgroundColor: '#ffffff', minHeight: 64 }}>
              <span className="font-black text-xl tracking-tighter">RAJASHRI<span className="text-orange-600">WORLD</span></span>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="h-6 w-6 text-gray-800" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex-1 overflow-y-auto" style={{ backgroundColor: '#ffffff' }}>
              <div className="px-5 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block py-4 text-lg font-bold tracking-tight border-b border-gray-50 transition-colors ${
                      pathname === item.href
                        ? "text-orange-600"
                        : "text-gray-900 hover:text-orange-600"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Auth Section */}
              <div className="px-5 pb-8">
                {!mounted ? (
                  <div className="h-14 w-full bg-gray-100 animate-pulse rounded-xl" />
                ) : !isAuthenticated ? (
                  <Button
                    className="w-full h-14 rounded-xl bg-black text-white font-bold text-base"
                    onClick={() => { setAuthOpen(true); setIsOpen(false); }}
                  >
                    Sign In
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100">
                      <div className="w-10 h-10 rounded-lg bg-orange-600 flex items-center justify-center text-white font-bold text-base flex-shrink-0">
                        {userInitial}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-orange-600 uppercase tracking-wider">Signed in</p>
                        <p className="text-sm text-gray-900 font-bold truncate">Authorized User</p>
                      </div>
                    </div>

                    {role === 'admin' && (
                      <Button
                        variant="outline"
                        className="w-full h-12 rounded-xl border-gray-200 text-gray-900 font-semibold"
                        onClick={() => { router.push("/admin"); setIsOpen(false); }}
                      >
                        Admin Dashboard
                      </Button>
                    )}

                    <Button
                      variant="ghost"
                      className="w-full h-12 rounded-xl text-red-600 font-semibold hover:bg-red-50"
                      onClick={() => { handleLogout(); setIsOpen(false); }}
                    >
                      Sign Out
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      {/* Auth Modal */}
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}
