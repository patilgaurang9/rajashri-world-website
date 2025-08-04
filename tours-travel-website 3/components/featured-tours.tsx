"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TourCard } from "@/components/tour-card"
import { TourCardSkeleton } from "@/components/loading/tour-card-skeleton"
import { tours } from "@/lib/data"

function FeaturedToursContent() {
  const [isLoading, setIsLoading] = useState(true)
  const featuredTours = tours.slice(0, 3)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800) // Reduced loading time for better UX

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Featured{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Tours</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
            Discover our most popular destinations and experiences
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => <TourCardSkeleton key={index} />)
            : featuredTours.map((tour) => <TourCard key={tour.id} tour={tour} />)}
        </div>

        <div className="text-center">
          <Button 
            asChild 
            size="lg" 
            variant="outline" 
            className="border-orange-500 text-orange-600 hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Link href="/tours">View All Tours</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export function FeaturedTours() {
  return (
    <Suspense fallback={<TourCardSkeleton />}>
      <FeaturedToursContent />
    </Suspense>
  )
}
