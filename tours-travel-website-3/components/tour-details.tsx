"use client"
import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Users, Star, Clock, CheckCircle, X, ChevronDown, ChevronUp, Plane, Utensils, Car, Camera, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface TourDetailsProps {
  tour: any;
}

export function TourDetails({ tour }: TourDetailsProps) {
  const [brochureOpen, setBrochureOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    const res = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, tour_id: tour.id }),
    });
    setLoading(false);
    if (res.ok) {
      setSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
    } else {
      // Optionally handle error
    }
  };
  const gallery = Array.isArray(tour.gallery) ? tour.gallery : [];
  const [openDays, setOpenDays] = useState<number[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const toggleDay = (idx: number) => {
    setOpenDays((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image Gallery Section */}
      <div>
        {/* Add top padding to prevent overlap with fixed navbar */}
        <div className="container mx-auto px-4 pt-24">
          {/* Image Gallery */}
          {gallery.length === 1 ? (
            <div className="w-full h-96 rounded-lg overflow-hidden relative">
              <Image
                src={gallery[0] || "/placeholder.svg"}
                alt={tour.title}
                fill
                className="object-cover cursor-pointer hover:opacity-90 transition-opacity"
              />
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2 h-96 rounded-lg overflow-hidden">
              {/* Main large image - always gallery[0] */}
              <div className="col-span-2 row-span-2 relative">
                <Image
                  src={gallery[0] || "/placeholder.svg"}
                  alt={tour.title}
                  fill
                  className="object-cover cursor-pointer hover:opacity-90 transition-opacity"
                />
              </div>
              {/* Smaller images - remaining gallery images */}
              {gallery.slice(1).map((image: string, index: number) => (
                <div key={index + 1} className="relative cursor-pointer group">
                  <Image
                    src={image}
                    alt={`${tour.title} ${index + 2}`}
                    fill
                    className="object-cover group-hover:opacity-90 transition-opacity"
                  />
                  {index === 3 && gallery.length > 5 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-semibold">
                      +{gallery.length - 5} more
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Location */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{tour.title}</h1>
              <div className="flex items-center gap-4 text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{tour.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{tour.duration_days} Days • {tour.duration_nights} Nights</span>
                </div>
              </div>
              
              {/* Cities breakdown - Thrillophilia style */}
              {Array.isArray(tour.days_breakdown) && tour.days_breakdown.length > 0 && (
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-orange-600 text-white px-3 py-1 rounded-full font-bold text-sm">
                    {tour.duration_days}D/{tour.duration_nights}N
                  </div>
                  {tour.days_breakdown.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-lg">
                        {item.days}
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">
                          {item.days === 1 ? 'Day' : 'Days'} in
                        </span>
                        <br />
                        <span className="font-semibold text-gray-900">{item.city}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quick Features */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-green-600">
                  <Car className="h-4 w-4" />
                  <span>Transfer Included</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <Utensils className="h-4 w-4" />
                  <span>Meals Included</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <Camera className="h-4 w-4" />
                  <span>Sightseeing Included</span>
                </div>
              </div>
            </div>

            {/* Overview */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Overview</h2>
              <p className="text-gray-700 leading-relaxed">{tour.description}</p>
            </div>

            {/* Highlights */}
            {Array.isArray(tour.highlights) && tour.highlights.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Highlights</h2>
                <div className="grid gap-3">
                  {tour.highlights.map((highlight: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Itinerary */}
            {Array.isArray(tour.itinerary) && tour.itinerary.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-6 text-gray-900">Detailed Itinerary</h2>
                <div className="space-y-4">
                  {tour.itinerary.map((day: any, index: number) => {
                    const open = openDays.includes(index);
                    return (
                      <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none"
                          onClick={() => toggleDay(index)}
                          aria-expanded={open}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                              {index + 1}
                            </div>
                            <div className="text-left">
                              <h3 className="font-semibold text-gray-900">Day {index + 1}</h3>
                              <p className="text-gray-600 text-sm">{day.title}</p>
                            </div>
                          </div>
                          {open ? (
                            <ChevronUp className="w-5 h-5 text-orange-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-orange-500" />
                          )}
                        </button>
                        {open && (
                          <div className="p-4 bg-white border-t border-gray-200">
                            {day.date && (
                              <div className="text-sm text-orange-600 font-medium mb-2">{day.date}</div>
                            )}
                            <p className="text-gray-700 mb-3">{day.description}</p>
                            {day.hotel && (
                              <div className="bg-blue-50 p-3 rounded-lg">
                                <div className="text-sm text-blue-600 font-medium">Accommodation</div>
                                <div className="text-blue-800">{day.hotel}</div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Inclusions/Exclusions */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Inclusions</h2>
                <ul className="space-y-3">
                  {Array.isArray(tour.inclusions) && tour.inclusions.map((inclusion: string, index: number) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{inclusion}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Exclusions</h2>
                <ul className="space-y-3">
                  {Array.isArray(tour.exclusions) && tour.exclusions.length > 0 ? (
                    tour.exclusions.map((exclusion: string, index: number) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <X className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{exclusion}</span>
                      </li>
                    ))
                  ) : (
                    <li className="flex items-start gap-3 text-gray-500">
                      <X className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">No exclusions listed</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Know Before You Go */}
            {Array.isArray(tour.know_before_you_go) && tour.know_before_you_go.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Know Before You Go</h2>
                <ul className="space-y-3">
                  {tour.know_before_you_go.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 text-sm">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Sidebar - Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-8">
              {/* Pricing */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Starting from</h3>
                {tour.price_without_flight != null && (
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Without Flight</span>
                    <span className="text-xl font-bold text-gray-900">
                      ₹{Number(tour.price_without_flight).toLocaleString("en-IN")}
                    </span>
                  </div>
                )}
                {tour.price_with_flight != null && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">With Flight</span>
                    <span className="text-xl font-bold text-orange-600">
                      ₹{Number(tour.price_with_flight).toLocaleString("en-IN")}
                    </span>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">*Per person on twin sharing basis</p>
              </div>

              {/* Download Brochure with Preview */}
              {tour.brochure_url && (
                <div className="flex items-center gap-2 mb-4">
                  <a
                    href={tour.brochure_url}
                    download
                    className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg px-4 py-3 transition-colors"
                  >
                    Download Brochure
                  </a>
                  <button
                    type="button"
                    className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg p-3 transition-colors"
                    title="Preview Brochure"
                    onClick={() => setBrochureOpen(true)}
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <Dialog open={brochureOpen} onOpenChange={setBrochureOpen}>
                    <DialogContent className="max-w-[90vw] w-[90vw] p-0">
                      <DialogHeader className="px-6 pt-6">
                        <DialogTitle>Brochure Preview</DialogTitle>
                      </DialogHeader>
                      <div className="w-full h-[80vh]">
                        <iframe
                          src={tour.brochure_url}
                          title="Brochure Preview"
                          className="w-full h-full rounded-b-lg border-0"
                          frameBorder="0"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}

              {/* Booking Form */}
              <form onSubmit={handleEnquiry} className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm"
                  required
                />
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm"
                  required
                />
                <div className="flex gap-2">
                  <select className="rounded-lg border border-gray-300 px-3 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400" defaultValue="+91" disabled>
                    <option value="+91">+91</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 shadow-lg transition-all transform hover:scale-105"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Enquiry'}
                </Button>
                {/* Success Dialog Popup */}
                <Dialog open={success} onOpenChange={setSuccess}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Enquiry Sent!</DialogTitle>
                    </DialogHeader>
                    <div className="py-2 text-center text-gray-700">Thank you for your enquiry. We will contact you soon.</div>
                    <DialogFooter>
                      <button
                        type="button"
                        className="w-full rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 mt-2"
                        onClick={() => setSuccess(false)}
                      >
                        OK
                      </button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </form>
              
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  By clicking send enquiry, you agree to our terms & conditions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/* Stats Section Before Footer */}
    <div className="w-full mt-16">
      <div className="px-2">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-12" />
      </div>
  <section className="w-full bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <img src="/images/stats-customers.svg" alt="Happy Customers" className="mx-auto mb-4 h-20 w-20" />
            <div className="text-xl font-bold mb-1">10 Million+</div>
            <div className="text-gray-600 text-sm">Happy customers from 65+ countries all around.</div>
          </div>
          <div>
            <img src="/images/stats-rating.svg" alt="Ratings" className="mx-auto mb-4 h-20 w-20" />
            <div className="text-xl font-bold mb-1">4.6 / 5.0</div>
            <div className="text-gray-600 text-sm">Cumulative ratings of our trips across platforms.</div>
          </div>
          <div>
            <img src="/images/stats-curated.svg" alt="Curated with love" className="mx-auto mb-4 h-20 w-20" />
            <div className="text-xl font-bold mb-1">Curated with love</div>
            <div className="text-gray-600 text-sm">Expert-guided trips with meticulous planning.</div>
          </div>
          <div>
            <img src="/images/stats-support.svg" alt="24*7 Support" className="mx-auto mb-4 h-20 w-20" />
            <div className="text-xl font-bold mb-1">24*7 Support</div>
            <div className="text-gray-600 text-sm">We are always there to help you pre, post and on the trip.</div>
          </div>
        </div>
      </section>
    </div>
    </div>
  );
}