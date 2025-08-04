"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star, Heart } from "lucide-react"
import { TestimonialSkeleton } from "@/components/loading/testimonial-skeleton"
import { testimonials } from "@/lib/data"

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    const interval = setInterval(nextTestimonial, 5000)

    return () => {
      clearTimeout(loadingTimer)
      clearInterval(interval)
    }
  }, [])

  return (
    <section className="py-20 bg-gradient-to-r from-orange-50 to-red-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            What Our{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Travelers</span>{" "}
            Say
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Read testimonials from our happy customers who have experienced unforgettable journeys with us
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {isLoading ? (
            <TestimonialSkeleton />
          ) : (
            <Card className="bg-white border-0 shadow-2xl rounded-3xl overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  {/* Testimonial Content */}
                  <div className="relative p-8 md:p-12">
                    {/* Profile Section */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Image
                            src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                            alt={testimonials[currentIndex].name}
                            width={64}
                            height={64}
                            className="rounded-full border-2 border-gray-200 shadow-lg"
                          />
                          <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                          <div className="font-bold text-lg text-gray-900">{testimonials[currentIndex].name}</div>
                          <div className="text-gray-600 text-sm">@{testimonials[currentIndex].name.toLowerCase().replace(' ', '')}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart className="h-5 w-5 fill-orange-500 text-orange-500" />
                      </div>
                    </div>

                    {/* Separator */}
                    <div className="w-full h-px bg-gray-200 mb-6"></div>

                    {/* Rating Stars */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${
                            i < testimonials[currentIndex].rating 
                              ? "fill-orange-500 text-orange-500" 
                              : "fill-gray-200 text-gray-200"
                          }`} 
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">({testimonials[currentIndex].rating}/5)</span>
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="text-lg text-gray-800 leading-relaxed mb-6">
                      "{testimonials[currentIndex].content}"
                    </blockquote>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      {testimonials[currentIndex].location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {!isLoading && (
            <>
              <div className="flex justify-center gap-4 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevTestimonial}
                  className="border-gray-300 hover:bg-orange-50 hover:border-orange-300 text-gray-700 hover:text-orange-600 rounded-full"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextTestimonial}
                  className="border-gray-300 hover:bg-orange-50 hover:border-orange-300 text-gray-700 hover:text-orange-600 rounded-full"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex justify-center gap-2 mt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? "bg-orange-500 scale-110" 
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
