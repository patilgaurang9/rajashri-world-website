import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Calendar, MapPin, Phone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Tour } from "@/lib/data"

interface TourCardProps {
  tour: Tour
}

export function TourCard({ tour }: TourCardProps) {
  // Helper to format duration as 5N/6D
  function formatNightsDays(duration: string) {
    const match = duration.match(/(\\d+)\\s*days?/i);
    if (match) {
      const days = parseInt(match[1], 10);
      if (!isNaN(days) && days > 1) {
        return `${days - 1}N/${days}D`;
      }
    }
    return duration;
  }

  return (
    <Link href={`/tours/${tour.slug}`} className="block">
      <Card className="group bg-white border-gray-200 hover:border-orange-300 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl h-full rounded-xl">
        <div className="relative overflow-hidden rounded-t-xl">
          <Image
            src={tour.image || "/placeholder.svg"}
            alt={tour.title}
            width={400}
            height={250}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            quality={85}
          />
        </div>

        <CardContent className="p-4 sm:p-6 flex flex-col">
          <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-orange-600 transition-colors line-clamp-2 text-gray-900">
            {tour.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2 text-sm sm:text-base">
            {tour.description}
          </p>

          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-4 gap-2">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="truncate max-w-20 sm:max-w-24">{tour.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{formatNightsDays(tour.duration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2 gap-2">
            <span className="font-bold text-base sm:text-lg text-black">INR {tour.price.toLocaleString("en-IN")}</span>
            <div className="flex items-center gap-2">
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 py-1 text-xs sm:text-sm shadow">Send Enquiry</Button>
              <button type="button" className="flex items-center justify-center bg-orange-100 hover:bg-orange-200 text-orange-600 rounded-full w-8 h-8 p-0 shadow transition-all" title="Call">
                <Phone className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
