import { notFound } from "next/navigation"
import { TourDetails } from "@/components/tour-details"
import { tours } from "@/lib/data"

interface TourPageProps {
  params: Promise<{ slug: string }>
}

export default async function TourPage({ params }: TourPageProps) {
  const { slug } = await params
  const tour = tours.find((t) => t.slug === slug)

  if (!tour) {
    notFound()
  }

  return <TourDetails tour={tour} />
}

export async function generateStaticParams() {
  return tours.map((tour) => ({
    slug: tour.slug,
  }))
}
