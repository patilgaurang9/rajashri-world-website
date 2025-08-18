import { notFound } from "next/navigation"
import { TourDetails } from "@/components/tour-details"
import { tours } from "@/lib/data"

interface TourPageProps {
  params: { slug: string } // no Promise here
}

export default function TourPage({ params }: TourPageProps) {
  const { slug } = params
  const tour = tours.find((t) => t.slug === slug)

  if (!tour) {
    notFound()
  }

  return <TourDetails tour={tour} />
}

export async function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }))
}
