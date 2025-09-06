"use client"

import { useState, useEffect, useRef } from "react"
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
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { debounce } from "@/lib/utils"

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
  const router = useRouter();
  // Search state
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  // Use the custom hook to get auth state (does not expose JWT)
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Debounced search function
  const fetchSuggestions = debounce(async (query: string) => {
    if (!query) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    setLoadingSuggestions(true);
    const { data, error } = await supabase
      .from("tours")
      .select("id, slug, title")
      .ilike("title", `%${query}%`);
    if (!error && data) {
      setSuggestions(data);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setLoadingSuggestions(false);
  }, 300);

  useEffect(() => {
    fetchSuggestions(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // Hide suggestions on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (tour: any) => {
    setSearch("");
    setShowSuggestions(false);
    router.push(`/tours/${tour.slug}`);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      handleSuggestionClick(suggestions[0]);
    }
  };

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-md border-b border-gray-200`} role="navigation" aria-label="Main Navigation">
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

          {/* Desktop Navigation - Center + Search */}
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
      <span
        className={`absolute left-0 -bottom-1 w-full h-0.5 bg-orange-500 transition-all duration-300 ${
          pathname === item.href
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-60"
        }`}
      ></span>
    </Link>
  ))}
</div>

{/* Search + Auth/Profile - Right */}
<div className="hidden md:flex items-center space-x-4 ml-auto">
  {/* Search Bar */}
  <div className="relative w-56">
    <Input
      ref={searchRef}
      type="text"
      placeholder="Search tours..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onFocus={() => search && setShowSuggestions(true)}
      onKeyDown={handleSearchKeyDown}
  className="pl-4 pr-10 py-2 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white text-base rounded-none"
    />
    {showSuggestions && (
      <div
        ref={suggestionsRef}
        className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto animate-fadeIn"
        style={{ minWidth: '220px', boxShadow: '0 6px 32px 0 rgba(0,0,0,0.10)' }}
      >
        {loadingSuggestions ? (
          <div className="flex items-center justify-center gap-2 p-3 text-gray-400 text-sm">
            <svg className="animate-spin h-4 w-4 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
            Loading...
          </div>
        ) : suggestions.length === 0 ? (
          <div className="p-3 text-gray-300 text-center text-sm select-none">
            No tours found
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {suggestions.map((tour, idx) => (
              <li key={tour.id}>
                <button
                  className="w-full flex items-center px-4 py-2 bg-white hover:bg-gray-100 focus:bg-gray-200 focus:outline-none text-base text-gray-800 font-normal transition rounded-none first:rounded-t-lg last:rounded-b-lg"
                  style={{ transition: 'background 0.15s' }}
                  onClick={() => handleSuggestionClick(tour)}
                >
                  <span className="truncate block w-full text-left">
                    {tour.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    )}
  </div>

  {/* Auth/Profile */}
  {!isAuthenticated && (
    <Button
      size="lg"
      className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 text-base font-semibold shadow rounded-md transition-all duration-200"
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
            <AvatarFallback className="bg-orange-500 text-white font-bold">
              {userInitial}
            </AvatarFallback>
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
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsOpen(!isOpen)}
              className="text-orange-600 hover:text-orange-500 focus:ring-2 focus:ring-orange-300 focus:outline-none"
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
  {/* Auth Modal */}
  {/* AuthModal opens for login/signup, closes on success or cancel */}
  <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </nav>
  )
}
