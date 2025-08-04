import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Users, Star, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Tour } from "@/lib/data"

interface TourDetailsProps {
  tour: Tour
}

export function TourDetails({ tour }: TourDetailsProps) {
  return (
    <div className="min-h-screen pt-20 pb-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-8">
          <Image src={tour.image || "/placeholder.svg"} alt={tour.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
          <div className="absolute bottom-8 left-8">
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white mb-4 shadow-lg">{tour.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{tour.title}</h1>
            <div className="flex items-center gap-4 text-gray-200">
              <div className="flex items-center gap-1">
                <MapPin className="h-5 w-5" />
                <span>{tour.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-orange-500 text-orange-500" />
                <span>
                  {tour.rating} ({tour.reviews} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
                <p className="text-gray-700 leading-relaxed">{tour.description}</p>
              </CardContent>
            </Card>

            {/* Itinerary */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Itinerary</h2>
                <div className="space-y-4">
                  {tour.itinerary.map((day, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-sm font-bold text-white">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1 text-gray-900">{day.title}</h3>
                        <p className="text-gray-600">{day.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Inclusions */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">What's Included</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {tour.inclusions.map((inclusion, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">{inclusion}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="bg-white border-gray-200 shadow-lg sticky top-24">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-orange-600 mb-2">${tour.price}</div>
                  <div className="text-gray-600">per person</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-gray-500" />
                      <span className="text-gray-700">Duration</span>
                    </div>
                    <span className="font-medium text-gray-900">{tour.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-gray-500" />
                      <span className="text-gray-700">Max People</span>
                    </div>
                    <span className="font-medium text-gray-900">{tour.maxPeople}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-gray-500" />
                      <span className="text-gray-700">Difficulty</span>
                    </div>
                    <span className="font-medium capitalize text-gray-900">{tour.difficulty}</span>
                  </div>
                </div>

                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-lg py-6 shadow-lg"
                >
                  <Link href={`/book?tour=${tour.slug}`}>Book This Tour</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
