"use client"
import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Users, Star, Clock, CheckCircle, X, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react";

interface TourDetailsProps {
  tour: any;
}

export function TourDetails({ tour }: TourDetailsProps) {
  const gallery = Array.isArray(tour.gallery) ? tour.gallery : [];
  const [openDays, setOpenDays] = useState<number[]>([]);
  const toggleDay = (idx: number) => {
    setOpenDays((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };
  return (
    <div className="min-h-screen pt-20 pb-16 bg-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4">
        <div className="relative w-full h-[420px] md:h-[520px] flex items-end rounded-3xl overflow-hidden mb-10 shadow-lg" style={{maxWidth:'100%'}}>
          <Image src={gallery[0] || "/placeholder.svg"} alt={tour.title} fill className="object-cover" style={{objectPosition:'center'}} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="relative z-10 p-8 w-full flex flex-col md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">{tour.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90 mb-2">
                <span className="flex items-center gap-1"><MapPin className="h-5 w-5" />{tour.location}</span>
                <span className="flex items-center gap-1"><Calendar className="h-5 w-5" />{tour.duration_nights}N/{tour.duration_days}D</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Content (left) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Duration & Inclusions Breakdown */}
            <Card className="bg-white border border-gray-100 shadow-sm rounded-3xl">
              <CardContent className="p-6">
                <div className="flex items-center mb-4 gap-4">
                  <span className="bg-orange-700 text-white font-bold rounded px-4 py-1 text-lg" style={{letterSpacing: '1px'}}>{tour.duration_days}D/{tour.duration_nights}N</span>
                  {Array.isArray(tour.days_breakdown) && tour.days_breakdown.length > 0 && (
                    <div className="flex items-center gap-0">
                      {tour.days_breakdown.map((item: any, idx: number) => (
                        <div key={idx} className="flex items-center">
                          {idx !== 0 && <span className="h-6 border-l border-gray-300 mx-3" />}
                          <span className="flex flex-col items-center min-w-[70px]">
                            <span className="font-extrabold text-2xl text-gray-400 leading-none">{item.days}</span>
                            <span className="text-[11px] text-gray-400 font-semibold leading-none">{item.days === 1 ? 'Day' : 'Days'} in</span>
                            <span className="font-extrabold text-base text-gray-700 leading-none">{item.city}</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex-1" />
                  {tour.brochure_url && (
                    <a href={tour.brochure_url} download className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-full px-4 py-2 text-sm shadow transition-all whitespace-nowrap ml-auto">Download Brochure</a>
                  )}
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
            {/* Highlights */}
            {Array.isArray(tour.highlights) && tour.highlights.length > 0 && (
              <Card className="bg-white border border-gray-100 shadow-sm rounded-3xl">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-900">Trip Highlights</h2>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    {tour.highlights.map((h: string, i: number) => <li key={i}>{h}</li>)}
                  </ul>
                </CardContent>
              </Card>
            )}
            {/* Itinerary */}
            {Array.isArray(tour.itinerary) && tour.itinerary.length > 0 && (
              <Card className="bg-white border border-gray-100 shadow-sm rounded-3xl">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-900">Itinerary</h2>
                  <div className="space-y-2">
                    {tour.itinerary.map((day: any, index: number) => {
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
                              {day.date && <div className="text-xs text-gray-500 mb-1">{day.date}</div>}
                              <p className="text-gray-600 mb-2 font-semibold">{day.title}</p>
                              <p className="text-gray-600 mb-2">{day.description}</p>
                              {day.hotel && <div className="text-xs text-gray-500">Hotel: {day.hotel}</div>}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
            {/* Inclusions/Exclusions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white border border-gray-100 shadow-sm rounded-3xl">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-900">What's Included</h2>
                  <ul className="space-y-2">
                    {Array.isArray(tour.inclusions) && tour.inclusions.map((inclusion: string, index: number) => (
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
                    {Array.isArray(tour.exclusions) && tour.exclusions.length > 0 ? (
                      tour.exclusions.map((ex: string, i: number) => (
                        <li key={i} className="flex items-center gap-2 text-gray-700"><X className="h-5 w-5 text-red-400" />{ex}</li>
                      ))
                    ) : (
                      <li className="flex items-center gap-2 text-gray-700"><X className="h-5 w-5 text-red-400" />No exclusions listed</li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </div>
            {/* Know Before You Go */}
            {Array.isArray(tour.know_before_you_go) && tour.know_before_you_go.length > 0 && (
              <Card className="bg-white border border-gray-100 shadow-sm rounded-3xl">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-900">Know Before You Go</h2>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    {tour.know_before_you_go.map((k: string, i: number) => <li key={i}>{k}</li>)}
                  </ul>
                </CardContent>
              </Card>
            )}
            {/* Overview */}
            <Card className="bg-white border border-gray-100 shadow-sm rounded-3xl">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Overview</h2>
                <p className="text-gray-700 leading-relaxed">{tour.description}</p>
              </CardContent>
            </Card>
          </div>
          {/* Sidebar (right) */}
          <div className="space-y-6">
            <Card className="bg-white border border-gray-100 shadow-sm sticky top-24 rounded-3xl">
              <CardContent className="p-8 flex flex-col gap-4">
                <div className="text-gray-800 font-semibold text-base mb-1 truncate" title={tour.title}>{tour.title}</div>
                <div className="flex flex-col gap-1 mb-2 w-full">
                  {tour.price_without_flight != null && (
                    <div className="flex items-center justify-between w-full">
                      <span className="text-gray-500 text-sm">Without Flight</span>
                      <span className="text-lg font-bold text-black">₹ {Number(tour.price_without_flight).toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  {tour.price_with_flight != null && (
                    <div className="flex items-center justify-between w-full">
                      <span className="text-gray-500 text-sm">With Travel</span>
                      <span className="text-lg font-bold text-black">₹ {Number(tour.price_with_flight).toLocaleString("en-IN")}</span>
                    </div>
                  )}
                </div>
                <form className="flex flex-col gap-3 w-full">
                  <input type="text" placeholder="Full Name*" required className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 text-base" />
                  <input type="email" placeholder="Email*" required className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 text-base" />
                  <div className="flex gap-2">
                    <select className="rounded-xl border border-gray-200 px-2 py-3 text-base bg-white" defaultValue="+91">
                      <option value="+91">+91</option>
                      {/* Add more country codes as needed */}
                    </select>
                    <input type="tel" placeholder="Your Phone*" required className="flex-1 rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 text-base" />
                  </div>
                  <Button className="w-full rounded-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-3 shadow transition-all mt-2">Send Enquiry</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
