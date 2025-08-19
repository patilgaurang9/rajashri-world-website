"use client"

import { useRef, useEffect, useState } from "react"
import { TourCard } from "@/components/tour-card"
import { TourCardSkeleton } from "@/components/loading/tour-card-skeleton"
import { useIntersectionObserver } from "@/hooks/use-performance"
import { debounce } from "@/lib/utils"
import type { Tour } from "@/lib/data"

interface ToursGridProps {
  tours: Tour[]
  loading?: boolean
  onLoadMore?: () => void
  hasMore?: boolean
}
  
export function ToursGrid({ tours, loading = false, onLoadMore, hasMore = false }: ToursGridProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const handleIntersection = debounce((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries
    if (entry.isIntersecting && hasMore && !loading) {
      setIsVisible(true)
      onLoadMore?.()
    }
  }, 100)

  const { observe, unobserve } = useIntersectionObserver(handleIntersection, {
    rootMargin: '100px',
    threshold: 0.1,
  })

  useEffect(() => {
    if (loadMoreRef.current) {
      observe(loadMoreRef.current)
    }

    return () => {
      if (loadMoreRef.current) {
        unobserve(loadMoreRef.current)
      }
    }
  }, [observe, unobserve])

  if (loading && tours.length === 0) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <TourCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
      
      {hasMore && (
        <div ref={loadMoreRef} className="flex justify-center py-8">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full">
              {Array.from({ length: 3 }).map((_, index) => (
                <TourCardSkeleton key={`loading-${index}`} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              Scroll to load more tours...
            </div>
          )}
        </div>
      )}
    </div>
  )
}
