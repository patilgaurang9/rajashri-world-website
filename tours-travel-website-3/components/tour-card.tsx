import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Calendar, MapPin, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TourCardProps {
  tour: any;
}

export function TourCard({ tour }: TourCardProps) {
  // Format duration as 5N/6D
  function formatNightsDays(days: number, nights: number) {
    if (days && nights) return `${nights}N/${days}D`;
    if (days) return `${days}D`;
    return "";
  }
  // Truncate description
  function shortDescription(desc: string) {
    if (!desc) return "";
    return desc.length > 120 ? desc.slice(0, 120) + "..." : desc;
  }
  return (
    <Link href={`/tours/${tour.slug}`} className="block">
      <Card className="group bg-white border-gray-200 hover:border-orange-300 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl h-full rounded-xl">
        <div className="relative overflow-hidden rounded-t-xl">
          <Image
            src={tour.gallery?.[0] || "/placeholder.svg"}
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
          <h3 className="text-lg sm:text-xl font-bold mb-1 group-hover:text-orange-600 transition-colors line-clamp-2 text-gray-900">
            {tour.title}
          </h3>
          {tour.start_date && (
            <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{tour.start_date}</span>
            </div>
          )}
          <p className="text-gray-600 mb-4 line-clamp-2 text-sm sm:text-base">
            {shortDescription(tour.description)}
          </p>
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-4 gap-2">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="truncate max-w-20 sm:max-w-24">{tour.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{formatNightsDays(tour.duration_days, tour.duration_nights)}</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2 gap-2">
            <span className="font-bold text-base sm:text-lg text-black">₹ {Number((tour.price_with_flight ?? tour.price_without_flight)).toLocaleString("en-IN")}</span>
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
  );
}
