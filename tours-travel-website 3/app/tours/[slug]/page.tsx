import { notFound } from "next/navigation"
import { TourDetails } from "@/components/tour-details"
import { tours } from "@/lib/data"

interface TourPageProps {
  params: { slug: string }
}

// Mark the page as dynamic
export const dynamic = "force-dynamic"

export default function TourPage({ params }: TourPageProps) {
  const { slug } = params

  // Find the tour dynamically at request time
  const tour = tours.find((t) => t.slug === slug)

  if (!tour) {
    notFound() // shows _not-found page if slug invalid
  }

  return <TourDetails tour={tour} />
}
