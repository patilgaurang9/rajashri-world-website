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
    <section className="py-20 bg-white">
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

        <div className="relative max-w-4xl mx-auto">
          {isLoading ? (
            <TestimonialSkeleton />
          ) : (
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-8 md:p-12">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 fill-orange-500 text-orange-500" />
                    ))}
                  </div>

                  <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
                    "{testimonials[currentIndex].content}"
                  </blockquote>

                  <div className="flex items-center justify-center gap-4">
                    <Image
                      src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                      alt={testimonials[currentIndex].name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div className="text-left">
                      <div className="font-semibold text-lg text-gray-900">{testimonials[currentIndex].name}</div>
                      <div className="text-gray-600">{testimonials[currentIndex].location}</div>
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
                  className="border-gray-300 hover:bg-orange-50 hover:border-orange-300 text-gray-700 hover:text-orange-600"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextTestimonial}
                  className="border-gray-300 hover:bg-orange-50 hover:border-orange-300 text-gray-700 hover:text-orange-600"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex justify-center gap-2 mt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? "bg-orange-500" : "bg-gray-300"
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
