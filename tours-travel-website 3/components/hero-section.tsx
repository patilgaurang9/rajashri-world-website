"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
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
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
          Discover the{" "}
          <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">World</span>
          <br />
          Like Never Before
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto leading-relaxed">
          Embark on extraordinary journeys with our curated tours. From breathtaking landscapes to cultural immersions,
          create memories that last a lifetime.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/30 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white hover:text-white text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Link href="/tours" className="flex items-center gap-2">
              Explore Tours
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Link href="/custom-booking" className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Custom Tour
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-16 max-w-3xl mx-auto">
          <div className="border border-white/30 bg-white/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">500+</div>
            <div className="text-white text-sm sm:text-base font-medium">Happy Travelers</div>
          </div>
          <div className="border border-white/30 bg-white/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">50+</div>
            <div className="text-white text-sm sm:text-base font-medium">Destinations</div>
          </div>
          <div className="border border-white/30 bg-white/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">5★</div>
            <div className="text-white text-sm sm:text-base font-medium">Average Rating</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-orange-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-orange-500 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
