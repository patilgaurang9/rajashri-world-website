"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Search, Calendar as CalendarIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"

export function HeroSection() {
  const [date, setDate] = useState<Date | undefined>(undefined)

  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    // Set immediately without delay
    setVH();

    // Update on resize
    window.addEventListener('resize', setVH);
    return () => window.removeEventListener('resize', setVH);
  }, []);

  return (
    <section className="relative flex items-center justify-center overflow-hidden px-2 py-8 sm:py-12 min-h-[80vh] hero-section">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/Screenshot 2025-08-04 173133.png"
          alt="Travel destination background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center w-full max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto px-2 sm:px-4">
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight text-white break-words">
          Discover the{" "}
          <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">World</span>
          <br />
          Like Never Before
        </h1>

        <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-1 sm:px-2">
          Embark on extraordinary journeys with our curated tours. From breathtaking landscapes to cultural immersions,
          create memories that last a lifetime.
        </p>

        {/* Search Bar */}
        <div className="mb-6 sm:mb-8 max-w-full sm:max-w-3xl mx-auto p-2 sm:p-3 rounded-2xl border border-white/30 bg-white/20 backdrop-blur-md flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
            <Input
              type="text"
              placeholder="Where do you want to go?"
              className="pl-9 pr-3 w-full bg-transparent text-white placeholder:text-white/70 border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-xs xs:text-sm sm:text-base"
            />
          </div>
          <div className="relative w-full sm:w-44 flex-shrink-0">
            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70 z-10" />
            <Input
              type="date"
              value={date ? format(date, "yyyy-MM-dd") : ""}
              onChange={(e) => setDate(e.target.value ? new Date(e.target.value) : undefined)}
              className="pl-9 pr-3 w-full bg-transparent text-white placeholder:text-white/70 border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-xs xs:text-sm sm:text-base [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-70 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              min={format(new Date(), "yyyy-MM-dd")}
            />
          </div>
          <Button
            size="default"
            className="w-full sm:w-auto flex-shrink-0 bg-white text-gray-900 hover:bg-gray-100 text-xs xs:text-sm sm:text-base px-4 sm:px-5 py-2.5 sm:py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Search
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <Button
            asChild
            size="default"
            variant="outline"
            className="w-full sm:w-auto border-white/30 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white hover:text-white text-xs xs:text-sm sm:text-base px-4 sm:px-5 py-2.5 sm:py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Link href="/tours" className="flex items-center justify-center gap-2">
              Explore Tours
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          <Button
            asChild
            size="default"
            className="w-full sm:w-auto bg-white text-gray-900 hover:bg-gray-100 text-xs xs:text-sm sm:text-base px-4 sm:px-5 py-2.5 sm:py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Link href="/custom-booking" className="flex items-center justify-center gap-2">
              <Play className="h-4 w-4" />
              Custom Tour
            </Link>
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-4 h-6 sm:w-5 sm:h-8 border-2 border-orange-400 rounded-full flex justify-center">
          <div className="w-1 h-1.5 sm:h-2 bg-orange-500 rounded-full mt-1 sm:mt-1.5 animate-pulse" />
        </div>
      </div>
    </section>
  )
}