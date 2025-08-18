"use client"
import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Users, Star, Clock, CheckCircle, X, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Tour } from "@/lib/data"
import { useState } from "react"

interface TourDetailsProps {
  tour: Tour
}

export function TourDetails({ tour }: TourDetailsProps) {
  // Placeholder gallery images (replace with real tour.gallery if available)
  const gallery = [tour.image, "/images/placeholder.jpg", "/images/placeholder-user.jpg"];
  const [openDays, setOpenDays] = useState<number[]>([]);
  const toggleDay = (idx: number) => {
    setOpenDays((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };
  return (
    <div className="min-h-screen pt-20 pb-16 bg-white">
      {/* Hero Section (image spans up to cards, more rounded) */}
      <div className="container mx-auto px-4">
        <div className="relative w-full h-[420px] md:h-[520px] flex items-end rounded-3xl overflow-hidden mb-10 shadow-lg" style={{maxWidth:'100%'}}>
          <Image src={tour.image || "/placeholder.svg"} alt={tour.title} fill className="object-cover" style={{objectPosition:'center'}} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="relative z-10 p-8 w-full flex flex-col md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">{tour.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90 mb-2">
                <span className="flex items-center gap-1"><MapPin className="h-5 w-5" />{tour.location}</span>
                <span className="flex items-center gap-1"><Star className="h-5 w-5 fill-orange-500 text-orange-500" />{tour.rating} <span className="text-xs">({tour.reviews} reviews)</span></span>
                <span className="flex items-center gap-1"><Calendar className="h-5 w-5" />{tour.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Content (left) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tour Details Card - styled like reference image */}
            <Card className="bg-white border border-gray-100 shadow-sm rounded-3xl">
              <CardContent className="p-6">
                {/* Duration pill and city breakdown */}
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="bg-orange-600 text-white font-semibold rounded-full px-4 py-1 text-lg">{tour.duration}</span>
                  {/* Example city breakdown, replace with dynamic if available */}
                  <span className="text-gray-700 text-sm"><span className="font-bold">2</span> Days in <span className="font-semibold">Copenhagen</span></span>
                  <span className="text-gray-700 text-sm"><span className="font-bold">1</span> Day in <span className="font-semibold">Geilo</span></span>
                  <span className="text-gray-700 text-sm"><span className="font-bold">1</span> Day in <span className="font-semibold">Oslo</span></span>
                  <span className="text-gray-700 text-sm"><span className="font-bold">3</span> Days in <span className="font-semibold">Stockholm</span></span>
                  <span className="text-gray-700 text-sm"><span className="font-bold">2</span> Days in <span className="font-semibold">Helsinki</span></span>
                </div>
                <hr className="my-4" />
                {/* Included features row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-700 text-base">
                  <div className="flex items-center gap-2"><span className="inline-block"><svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 17v-1a4 4 0 00-4-4H7a4 4 0 00-4 4v1' /><circle cx='9' cy='7' r='4' /><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M23 21v-2a4 4 0 00-3-3.87' /></svg></span>Transfer Included</div>
                  <div className="flex items-center gap-2"><span className="inline-block"><svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 7v10a1 1 0 001 1h16a1 1 0 001-1V7' /><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 3v4M8 3v4' /></svg></span>Stay Included</div>
                  <div className="flex items-center gap-2"><span className="inline-block"><svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 17l4-4 4 4m0 0V3m0 14H4' /></svg></span>Breakfast Included</div>
                  <div className="flex items-center gap-2"><span className="inline-block"><svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><circle cx='12' cy='12' r='10' /><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h4l2 2' /></svg></span>Sightseeing Included</div>
                </div>
              </CardContent>
            </Card>

            {/* Trip Highlights */}
            <Card className="bg-white border border-gray-100 shadow-sm rounded-3xl">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Trip Highlights</h2>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Explore the beauty of northern Europe with cozy towns, snowy adventures, peaceful lakes, and stunning landscapes all year round.</li>
                  <li>Soar up the Ericsson Globe on the SkyView Gondola and take in stunning 360° views of Stockholm’s skyline and beyond.</li>
                  <li>Visit the historic Olympic Stadium, the heart of Finnish sports, and see where the 1952 Olympics brought global attention to Helsinki.</li>
                  <li>Wander through Tivoli Gardens, where vintage rides, lush gardens, and live performances create a magical atmosphere day and night.</li>
                  <li>Discover Vigeland Sculpture Park, the world’s largest sculpture park by a single artist, filled with powerful human figures that capture life & emotion.</li>
                </ul>
              </CardContent>
            </Card>

            {/* Itinerary - collapsible */}
            <Card className="bg-white border border-gray-100 shadow-sm rounded-3xl">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Itinerary</h2>
                <div className="space-y-2">
                  {tour.itinerary.map((day, index) => {
                    const open = openDays.includes(index);
                    return (
                      <div key={index} className="border-b last:border-b-0">
                        <button
                          className="w-full flex items-center gap-4 py-3 focus:outline-none"
                          onClick={() => toggleDay(index)}
                          aria-expanded={open}
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-xs font-bold text-white">
                            <span className="leading-none">Day<br />{index + 1}</span>
                          </div>
                          <span className="flex-1 text-left font-semibold text-gray-900">{day.title}</span>
                          {open ? (
                            <ChevronUp className="w-5 h-5 text-orange-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-orange-500" />
                          )}
                        </button>
                        {open && (
                          <div className="pl-14 pb-4 pr-2">
                            <p className="text-gray-600 mb-2">{day.description}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Overview */}
            <Card className="bg-white border border-gray-100 shadow-sm rounded-3xl">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Overview</h2>
                <p className="text-gray-700 leading-relaxed">{tour.description}</p>
              </CardContent>
            </Card>

            {/* Inclusions/Exclusions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white border border-gray-100 shadow-sm rounded-3xl">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-900">What's Included</h2>
                  <ul className="space-y-2">
                    {tour.inclusions.map((inclusion, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>{inclusion}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-white border border-gray-100 shadow-sm rounded-3xl">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-900">What's Not Included</h2>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-700"><X className="h-5 w-5 text-red-400" />Personal expenses</li>
                    <li className="flex items-center gap-2 text-gray-700"><X className="h-5 w-5 text-red-400" />Meals not mentioned in inclusions</li>
                    <li className="flex items-center gap-2 text-gray-700"><X className="h-5 w-5 text-red-400" />International flight tickets</li>
                    <li className="flex items-center gap-2 text-gray-700"><X className="h-5 w-5 text-red-400" />Travel insurance</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* FAQs/Know Before You Go */}
            <Card className="bg-white border border-gray-100 shadow-sm rounded-3xl">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Know Before You Go</h2>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Carry valid ID and travel documents at all times.</li>
                  <li>Check visa requirements for all countries visited.</li>
                  <li>Weather can be unpredictable; pack accordingly.</li>
                  <li>Follow local COVID-19 guidelines and restrictions.</li>
                  <li>Read the cancellation and refund policy before booking.</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar (right) */}
          <div className="space-y-6">
            {/* Booking Card with only price (black), more rounded */}
            <Card className="bg-white border border-gray-100 shadow sticky top-24 rounded-3xl">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-black mb-2">INR {tour.price.toLocaleString("en-IN")}</div>
                  <div className="text-gray-600">per person</div>
                </div>
                <div className="mb-4">
                  <input type="number" placeholder="Enter phone number" className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-base mb-2" />
                </div>
                <div className="flex gap-2">
                  <button className="rounded-full bg-orange-500 hover:bg-orange-600 text-white p-3 shadow flex items-center justify-center" title="Call">
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.3 1.2a2 2 0 01-.45 1.95l-.91.91a16.001 16.001 0 006.586 6.586l.91-.91a2 2 0 011.95-.45l1.2.3A2 2 0 0121 18.72V21a2 2 0 01-2 2h-1C7.163 23 1 16.837 1 9V8a2 2 0 012-2z' /></svg>
                  </button>
                  <Button className="flex-1 rounded-full border border-orange-500 text-orange-600 bg-white hover:bg-orange-50 text-lg py-3 shadow">Send Enquiry</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
