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
        <div className="max-w-5xl mx-auto mb-6 md:mb-8 text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-white">What Our Travellers Say</h2>
          <p className="text-white/90 text-sm md:text-base mt-2 max-w-xl">
            Real stories from our happy travellers across destinations.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {isLoading ? (
            <TestimonialSkeleton />
          ) : (
            <Card className="bg-white/95 border-0 shadow-2xl rounded-3xl overflow-hidden min-h-[390px]">
              <CardContent className="p-3 sm:p-4 md:p-5 h-full">
                <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 md:gap-6 items-stretch min-h-[350px]">
                  <div className="rounded-3xl p-1.5">
                    <div className="relative h-full w-full rounded-[24px] overflow-hidden">
                      <Image
                        src={dbReviews[currentIndex]?.avatar || "/placeholder.svg"}
                        alt={dbReviews[currentIndex]?.name || "Reviewer"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 280px"
                      />
                      <div className="absolute bottom-3 left-3 bg-white rounded-full px-3 py-1.5 text-black text-sm font-semibold shadow-lg">
                        {dbReviews[currentIndex]?.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center py-1 md:py-2">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < dbReviews[currentIndex]?.rating
                              ? "fill-orange-500 text-orange-500"
                              : "fill-gray-200 text-gray-200"
                            }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">({dbReviews[currentIndex]?.rating}/5)</span>
                    </div>

                    <blockquote className="text-base sm:text-lg text-gray-800 leading-relaxed mb-4">
                      "{dbReviews[currentIndex]?.content}"
                    </blockquote>

                    <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      {dbReviews[currentIndex]?.location}
                    </div>

                    <div className="flex items-center gap-2 mt-5">
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
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}
