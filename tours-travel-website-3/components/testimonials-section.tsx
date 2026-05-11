"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { TestimonialSkeleton } from "@/components/loading/testimonial-skeleton"
import { testimonials } from "@/lib/data"

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dbReviews, setDbReviews] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/reviews", { cache: "no-store" })
      const data = await res.json()
      console.log(data.reviews)
      if (data.reviews && data.reviews.length > 0) {
        setDbReviews(data.reviews)
      } else {
        setDbReviews(testimonials) // Fallback to local data
      }
    } catch (err) {
      setDbReviews(testimonials)
    } finally {
      setIsLoading(false)
    }
  }

  const nextTestimonial = () => {
    if (dbReviews.length === 0) return
    setCurrentIndex((curr) => (curr + 1) % dbReviews.length)
  }

  const prevTestimonial = () => {
    if (dbReviews.length === 0) return
    setCurrentIndex((curr) => (curr - 1 + dbReviews.length) % dbReviews.length)
  }

  // Fetch reviews exactly once on mount
  useEffect(() => {
    fetchReviews()
  }, [])

  // Start the carousel interval only when reviews are loaded
  useEffect(() => {
    if (dbReviews.length === 0) return
    const interval = setInterval(() => {
      setCurrentIndex((curr) => (curr + 1) % dbReviews.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [dbReviews])

  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/simon-english-48nerZQCHgo-unsplash.jpg"
          alt="Travellers background"
          fill
          className="object-cover"
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Heading */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-0.5 bg-orange-400 rounded-full" />
              <span className="text-orange-300 font-black text-xs uppercase tracking-[0.25em]">Reviews</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">What Our Travellers <span className="text-orange-400">Say</span></h2>
            <p className="text-white/70 text-sm mt-2 max-w-md">
              Real stories from our happy travellers across destinations.
            </p>
          </div>

          {/* Card — shares same left edge as heading above */}
          <div>
          {isLoading ? (
            <TestimonialSkeleton />
          ) : (
            <Card className="bg-white/95 border-0 shadow-2xl rounded-3xl overflow-hidden">
              <CardContent className="p-0">
                {/* Desktop layout: side-by-side image + text */}
                <div className="hidden md:grid md:grid-cols-[280px_1fr] gap-0 items-stretch min-h-[380px]">
                  <div className="relative">
                    <Image
                      src={dbReviews[currentIndex]?.avatar || "/placeholder.svg"}
                      alt={dbReviews[currentIndex]?.name || "Reviewer"}
                      fill
                      className="object-cover"
                      sizes="280px"
                    />
                    <div className="absolute bottom-4 left-4 bg-white rounded-full px-3 py-1.5 text-black text-sm font-semibold shadow-lg">
                      {dbReviews[currentIndex]?.name}
                    </div>
                  </div>

                  <div className="flex flex-col justify-center p-8">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < dbReviews[currentIndex]?.rating
                              ? "fill-orange-500 text-orange-500"
                              : "fill-gray-200 text-gray-200"
                            }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-500">({dbReviews[currentIndex]?.rating}/5)</span>
                    </div>

                    <blockquote className="text-lg text-gray-800 leading-relaxed mb-5">
                      &ldquo;{dbReviews[currentIndex]?.content}&rdquo;
                    </blockquote>

                    <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      {dbReviews[currentIndex]?.location}
                    </div>

                    <div className="flex items-center gap-2 mt-6">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevTestimonial}
                        className="h-9 w-9 p-0 rounded-full border-black text-black hover:bg-black hover:text-white"
                        aria-label="Previous review"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        onClick={nextTestimonial}
                        className="h-9 w-9 p-0 rounded-full bg-black text-white hover:bg-black/90"
                        aria-label="Next review"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Mobile layout: compact card */}
                <div className="md:hidden p-5">
                  {/* Reviewer info row */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-orange-100">
                      <Image
                        src={dbReviews[currentIndex]?.avatar || "/placeholder.svg"}
                        alt={dbReviews[currentIndex]?.name || "Reviewer"}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">{dbReviews[currentIndex]?.name}</p>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                        {dbReviews[currentIndex]?.location}
                      </div>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < dbReviews[currentIndex]?.rating
                            ? "fill-orange-500 text-orange-500"
                            : "fill-gray-200 text-gray-200"
                          }`}
                      />
                    ))}
                    <span className="ml-1.5 text-xs text-gray-500">({dbReviews[currentIndex]?.rating}/5)</span>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-sm text-gray-700 leading-relaxed mb-5">
                    &ldquo;{dbReviews[currentIndex]?.content}&rdquo;
                  </blockquote>

                  {/* Navigation + dots */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevTestimonial}
                        className="h-8 w-8 p-0 rounded-full border-gray-300 text-gray-600 hover:bg-black hover:text-white hover:border-black"
                        aria-label="Previous review"
                      >
                        <ChevronLeft className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        type="button"
                        onClick={nextTestimonial}
                        className="h-8 w-8 p-0 rounded-full bg-black text-white hover:bg-black/90"
                        aria-label="Next review"
                      >
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="flex gap-1.5">
                      {dbReviews.slice(0, Math.min(dbReviews.length, 5)).map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            i === currentIndex % Math.min(dbReviews.length, 5) ? "w-5 bg-orange-500" : "w-1.5 bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          </div>
        </div>
      </div>
    </section>
  )
}
