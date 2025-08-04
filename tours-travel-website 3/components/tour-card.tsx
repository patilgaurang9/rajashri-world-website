import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Users, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Tour } from "@/lib/data"

interface TourCardProps {
  tour: Tour
}

export function TourCard({ tour }: TourCardProps) {
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
          <div className="absolute top-4 left-4">
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs sm:text-sm shadow-lg">
              {tour.category}
            </Badge>
          </div>
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg border border-gray-200">
            <span className="text-orange-600 font-bold text-sm sm:text-base">${tour.price}</span>
          </div>
        </div>

        <CardContent className="p-4 sm:p-6 flex flex-col">
          <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-orange-600 transition-colors line-clamp-2 text-gray-900">
            {tour.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2 text-sm sm:text-base">
            {tour.description}
          </p>

          <div className="flex flex-wrap items-center justify-between text-xs sm:text-sm text-gray-500 mb-4 gap-2">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{tour.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="truncate max-w-20 sm:max-w-24">{tour.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{tour.maxPeople}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-orange-500 text-orange-500" />
              <span className="text-xs sm:text-sm font-medium text-gray-900">{tour.rating}</span>
              <span className="text-xs sm:text-sm text-gray-500">({tour.reviews} reviews)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
