"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowUpRight, Search, MapPin, Calendar as CalendarIcon } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabaseClient"

type TourSuggestion = {
  id: string | number
  slug: string
  title: string
  location: string | null
}

export function HeroSection() {
  const router = useRouter()
  const [destination, setDestination] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<TourSuggestion[]>([])
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)
  const [selectedSuggestion, setSelectedSuggestion] = useState<TourSuggestion | null>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    setVH();
    window.addEventListener('resize', setVH);
    return () => window.removeEventListener('resize', setVH);
  }, []);

  useEffect(() => {
    const fetchDestinations = async () => {
      if (!destination.trim()) {
        setSuggestions([])
        setSelectedSuggestion(null)
        setShowSuggestions(false)
        return
      }

      setLoadingSuggestions(true)
      try {
        const query = destination.trim()
        const { data: titleData, error: titleError } = await supabase
          .from("tours")
          .select("id, slug, title, location")
          .ilike("title", `%${query}%`)
          .limit(8)

        let destinationData: TourSuggestion[] = []
        const { data: byDestination, error: destinationError } = await supabase
          .from("tours")
          .select("id, slug, title, location")
          .ilike("location", `%${query}%`)
          .limit(8)

        if (!destinationError && byDestination) {
          destinationData = byDestination
        }

        if (!titleError && titleData) {
          const merged = [...titleData, ...destinationData]
          const uniqueById = Array.from(new Map(merged.map((tour) => [tour.id, tour])).values())
          setSuggestions(uniqueById.slice(0, 8))
          setShowSuggestions(uniqueById.length > 0)
        } else if (!destinationError && destinationData.length > 0) {
          setSuggestions(destinationData)
          setShowSuggestions(true)
        } else {
          setSuggestions([])
          setShowSuggestions(false)
        }
      } catch (err) {
        console.error("Error fetching destinations:", err)
        setSuggestions([])
        setShowSuggestions(false)
      } finally {
        setLoadingSuggestions(false)
      }
    }

    const timeout = setTimeout(fetchDestinations, 220)
    return () => clearTimeout(timeout)
  }, [destination])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleDestinationSelect = (tour: TourSuggestion) => {
    setDestination(tour.location || tour.title)
    setSelectedSuggestion(tour)
    setShowSuggestions(false)
  }

  const openMatchedTour = () => {
    const query = destination.trim().toLowerCase()
    const directMatch = suggestions.find(
      (tour) =>
        tour.title.toLowerCase() === query ||
        (tour.location && tour.location.toLowerCase() === query)
    )

    const bestMatch = selectedSuggestion ?? directMatch ?? suggestions[0]

    if (bestMatch?.slug) {
      router.push(`/tours/${bestMatch.slug}`)
      return
    }

    if (destination.trim()) {
      const params = new URLSearchParams()
      params.set("destination", destination.trim())
      router.push(`/tours?${params.toString()}`)
    }
  }

  return (
    <section className="relative overflow-hidden px-4 pt-20 pb-8 sm:pt-24 sm:pb-12 lg:pt-0 lg:pb-0 -mt-16 hero-section">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://txttpwyddxfhakgygtdc.supabase.co/storage/v1/object/public/images/Screenshot%202025-08-04%20173133.png"
          alt="Travel destination background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto lg:flex lg:items-center lg:min-h-[calc(95vh-4rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="text-left lg:pr-8 lg:pl-3">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 leading-tight text-white">
              <span className="block">Let's find</span>
              <span className="block sm:whitespace-nowrap">your next adventure</span>
            </h1>

            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-lg">
              When an unknown printer took a gallery offer type area year antype of make special moment
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/tours"
                className="group inline-flex items-center w-fit"
                aria-label="Take a tour"
              >
                <span className="h-12 sm:h-14 px-7 sm:px-8 rounded-full bg-white text-gray-900 font-semibold inline-flex items-center shadow-lg transition-all duration-300 group-hover:bg-gray-100">
                  Take a tour
                </span>
                <span className="-ml-2 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-orange-500 text-white inline-flex items-center justify-center border-4 border-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:bg-orange-600">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </Link>
            </div>
          </div>

          {/* Right Search Card */}
          <div className="flex flex-col gap-8 lg:justify-self-end w-full lg:max-w-md">
            {/* Search Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-7 w-full">
              {/* Destination Search */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">Destination</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search destination..."
                    value={destination}
                    onChange={(e) => {
                      setDestination(e.target.value)
                      setSelectedSuggestion(null)
                    }}
                    onFocus={() => destination && setShowSuggestions(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        setShowSuggestions(false)
                        openMatchedTour()
                      }
                    }}
                    className="pl-12 pr-4 py-3 w-full border border-gray-200 rounded-full focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-transparent text-gray-900"
                  />
                  {showSuggestions && (
                    <div
                      ref={suggestionsRef}
                      className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg z-50"
                    >
                      {loadingSuggestions ? (
                        <div className="px-4 py-3 text-sm text-gray-400">Loading destinations...</div>
                      ) : suggestions.length === 0 ? (
                        <div className="px-4 py-3 text-sm text-gray-400">No destination found</div>
                      ) : (
                        suggestions.map((tour) => (
                          <button
                            key={tour.id}
                            onClick={() => handleDestinationSelect(tour)}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg flex items-center gap-2 text-gray-700"
                          >
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="truncate">
                              {tour.location || tour.title}
                              {tour.location && (
                                <span className="text-gray-400 ml-1">· {tour.title}</span>
                              )}
                            </span>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Check In</label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10 pointer-events-none" />
                    <Input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="pl-12 pr-4 py-3 w-full border border-gray-200 rounded-full focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-transparent text-gray-900"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Check Out</label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10 pointer-events-none" />
                    <Input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="pl-12 pr-4 py-3 w-full border border-gray-200 rounded-full focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-transparent text-gray-900"
                    />
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <Button
                size="lg"
                className="w-full bg-orange-500 text-white hover:bg-orange-600 font-semibold py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                onClick={() => {
                  setShowSuggestions(false)
                  openMatchedTour()
                }}
              >
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="w-full bg-white text-gray-900 hover:bg-gray-100 font-semibold py-3 rounded-full transition-all duration-300 border border-white"
              >
                <Link href="/custom-booking" className="flex items-center justify-center gap-2">
                  Create Custom Tour
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="w-full bg-black text-white hover:bg-black/90 font-semibold py-3 rounded-full transition-all duration-300"
              >
                <Link href="/tours" className="flex items-center justify-center gap-2">
                  Explore Tours
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}