"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { useEffect } from "react"

export function HeroSection() {
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
    <section className="relative flex items-center justify-center overflow-hidden px-4 py-8 sm:py-12 hero-section">
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/60" />
      </div>

      {/* Content */} 
      <div className="relative z-10 text-center w-full max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 leading-tight text-white">
          Discover the{" "}
          <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">World</span>
          <br />
          Like Never Before
        </h1>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
          Embark on extraordinary journeys with our curated tours. From breathtaking landscapes to cultural immersions,
          create memories that last a lifetime.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8">
          <Button
            asChild
            size="default"
            variant="outline"
            className="w-full sm:w-auto border-white/30 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white hover:text-white text-sm sm:text-base px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Link href="/tours" className="flex items-center justify-center gap-2">
              Explore Tours
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          <Button
            asChild
            size="default"
            className="w-full sm:w-auto bg-white text-gray-900 hover:bg-gray-100 text-sm sm:text-base px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Link href="/custom-booking" className="flex items-center justify-center gap-2">
              <Play className="h-4 w-4" />
              Custom Tour
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 max-w-sm sm:max-w-md md:max-w-2xl mx-auto">
          <div className="border border-white/30 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg text-center">
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1">500+</div>
            <div className="text-white text-xs sm:text-sm font-medium leading-tight">Happy Travelers</div>
          </div>
          <div className="border border-white/30 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg text-center">
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1">50+</div>
            <div className="text-white text-xs sm:text-sm font-medium leading-tight">Destinations</div>
          </div>
          <div className="border border-white/30 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg text-center">
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1">5★</div>
            <div className="text-white text-xs sm:text-sm font-medium leading-tight">Average Rating</div>
          </div>
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
