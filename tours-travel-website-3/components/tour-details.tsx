"use client"
import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Users, Star, Clock, CheckCircle, X, ChevronDown, ChevronUp, Plane, Utensils, Car, Camera, Eye, Play, ChevronLeft, ChevronRight, Maximize2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface TourDetailsProps {
  tour: any;
}

export function MediaItem({ media, title, priority = false }: { media: any, title: string, priority?: boolean }) {
  if (!media) return null;
  if (media.type === 'image') {
    return (
      <Image
        src={media.url}
        alt={title}
        fill
        className="object-cover hover:scale-105 transition-transform duration-700"
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    );
  }
  return (
    <div className="relative w-full h-full bg-black">
      <video src={media.url} className="w-full h-full object-cover" />
      <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-all">
        <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
          <Play className="w-5 h-5 md:w-6 md:h-6 text-white fill-white" />
        </div>
      </div>
    </div>
  );
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
    }
  };

  const parseHelper = (data: any) => {
    if (typeof data === 'string') {
      try { return JSON.parse(data); } catch (e) { return []; }
    }
    return data || [];
  };

  const gallery = parseHelper(tour.gallery);
  const video_urls = parseHelper(tour.video_urls);
  const highlights = parseHelper(tour.highlights);
  const itinerary = parseHelper(tour.itinerary);
  const inclusions = parseHelper(tour.inclusions);
  const exclusions = parseHelper(tour.exclusions);
  const know_before_you_go = parseHelper(tour.know_before_you_go);
  const days_breakdown = parseHelper(tour.days_breakdown);

  const [openDays, setOpenDays] = useState<number[]>([0]); // Open first day by default
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  const allMedia = [
    ...gallery.map((url: string) => ({ type: 'image', url })),
    ...video_urls.map((url: string) => ({ type: 'video', url }))
  ];

  const displayPrice = tour.price_without_flight != null ? tour.price_without_flight : tour.price_with_flight;
  
  const toggleDay = (idx: number) => {
    setOpenDays((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const openLightbox = (index: number) => {
    setActiveMediaIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Image Gallery Section */}
      <div className="pt-28 pb-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <Link 
                href="/tours" 
                className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors mb-4 group w-fit"
              >
                <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back to Tours</span>
              </Link>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-0.5 bg-orange-600 rounded-full" />
                <span className="text-orange-600 font-black text-xs uppercase tracking-[0.25em]">{tour.location || 'Featured Tour'}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl">
                {tour.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-slate-400" />
                  <span>{tour.duration_days} Days / {tour.duration_nights} Nights</span>
                </div>
                {tour.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-slate-400" />
                    <span>{tour.location}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="hidden md:flex flex-col items-end gap-2">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Starting from</span>
              <div className="text-3xl font-black text-slate-900">
                {tour.currency} {Number(displayPrice).toLocaleString("en-IN")}
              </div>
            </div>
          </div>

          <div className="relative">
            {allMedia.length === 0 ? (
              <div className="w-full h-[260px] bg-slate-100 rounded-[2rem] flex items-center justify-center text-slate-400">
                No media available
              </div>
            ) : (
              <>
                {/* ── MOBILE layout ── */}
                <div className="md:hidden space-y-3">
                  {/* Big hero image */}
                  <div
                    className="relative w-full h-[280px] rounded-[2rem] overflow-hidden cursor-pointer shadow-xl"
                    onClick={() => openLightbox(0)}
                  >
                    <MediaItem media={allMedia[0]} title={tour.title} priority />
                    {/* tap hint */}
                    <div className="absolute inset-0 flex items-end justify-end p-4 pointer-events-none">
                      <span className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full">
                        <Maximize2 size={10} /> View All
                      </span>
                    </div>
                  </div>

                  {/* Horizontal thumbnail strip */}
                  {allMedia.length > 1 && (
                    <div
                      className="flex gap-2.5 overflow-x-auto pb-1"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      {allMedia.slice(1).map((media, idx) => {
                        const realIdx = idx + 1;
                        const isLast = realIdx === allMedia.length - 1 && allMedia.length > 5;
                        return (
                          <div
                            key={realIdx}
                            className="relative flex-none w-[80px] h-[60px] rounded-xl overflow-hidden cursor-pointer shadow-md"
                            onClick={() => openLightbox(realIdx)}
                          >
                            <MediaItem media={media} title={tour.title} />
                            {isLast && allMedia.length > 5 && (
                              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white">
                                <span className="text-sm font-black">+{allMedia.length - 5}</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* ── DESKTOP layouts ── */}
                <div className="hidden md:block">
                  {allMedia.length === 1 ? (
                    <div
                      className="w-full h-[500px] rounded-[2rem] overflow-hidden relative cursor-pointer shadow-xl"
                      onClick={() => openLightbox(0)}
                    >
                      <MediaItem media={allMedia[0]} title={tour.title} priority />
                    </div>
                  ) : allMedia.length === 2 ? (
                    <div className="grid grid-cols-2 gap-3 h-[500px] rounded-[2rem] overflow-hidden shadow-xl">
                      <div className="relative cursor-pointer h-full" onClick={() => openLightbox(0)}><MediaItem media={allMedia[0]} title={tour.title} /></div>
                      <div className="relative cursor-pointer h-full" onClick={() => openLightbox(1)}><MediaItem media={allMedia[1]} title={tour.title} /></div>
                    </div>
                  ) : allMedia.length === 3 ? (
                    <div className="grid grid-cols-3 gap-3 h-[500px] rounded-[2rem] overflow-hidden shadow-xl">
                      <div className="col-span-2 relative cursor-pointer h-full" onClick={() => openLightbox(0)}><MediaItem media={allMedia[0]} title={tour.title} /></div>
                      <div className="grid grid-rows-2 gap-3 h-full">
                        <div className="relative cursor-pointer h-full" onClick={() => openLightbox(1)}><MediaItem media={allMedia[1]} title={tour.title} /></div>
                        <div className="relative cursor-pointer h-full" onClick={() => openLightbox(2)}><MediaItem media={allMedia[2]} title={tour.title} /></div>
                      </div>
                    </div>
                  ) : allMedia.length === 4 ? (
                    <div className="grid grid-cols-4 gap-3 h-[500px] rounded-[2rem] overflow-hidden shadow-xl">
                      <div className="col-span-2 row-span-2 relative cursor-pointer h-full" onClick={() => openLightbox(0)}><MediaItem media={allMedia[0]} title={tour.title} /></div>
                      <div className="relative cursor-pointer h-full" onClick={() => openLightbox(1)}><MediaItem media={allMedia[1]} title={tour.title} /></div>
                      <div className="relative cursor-pointer h-full" onClick={() => openLightbox(2)}><MediaItem media={allMedia[2]} title={tour.title} /></div>
                      <div className="col-span-2 relative cursor-pointer h-full" onClick={() => openLightbox(3)}><MediaItem media={allMedia[3]} title={tour.title} /></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[500px] rounded-[2rem] overflow-hidden shadow-xl">
                      <div className="col-span-2 row-span-2 relative cursor-pointer overflow-hidden group/item h-full" onClick={() => openLightbox(0)}>
                        <MediaItem media={allMedia[0]} title={tour.title} priority />
                      </div>
                      <div className="relative cursor-pointer overflow-hidden group/item h-full" onClick={() => openLightbox(1)}><MediaItem media={allMedia[1]} title={tour.title} /></div>
                      <div className="relative cursor-pointer overflow-hidden group/item rounded-tr-[2rem] h-full" onClick={() => openLightbox(2)}><MediaItem media={allMedia[2]} title={tour.title} /></div>
                      <div className="relative cursor-pointer overflow-hidden group/item h-full" onClick={() => openLightbox(3)}><MediaItem media={allMedia[3]} title={tour.title} /></div>
                      <div className="relative cursor-pointer overflow-hidden group/item rounded-br-[2rem] h-full" onClick={() => openLightbox(4)}>
                        <MediaItem media={allMedia[4]} title={tour.title} />
                        {allMedia.length > 5 && (
                          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white backdrop-blur-[4px]">
                            <div className="text-3xl font-black mb-1">+{allMedia.length - 5}</div>
                            <div className="text-[8px] font-black uppercase tracking-[0.3em]">Full Gallery</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          
          {/* Journey Breakdown Badges - Moved to Top */}
          {Array.isArray(days_breakdown) && days_breakdown.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-4 bg-white p-3 rounded-full border border-slate-100 shadow-sm overflow-x-auto no-scrollbar">
              <div className="bg-orange-600 text-white px-4 py-1.5 rounded-full font-black text-xs tracking-tight shadow-sm whitespace-nowrap">
                {tour.duration_days}D/{tour.duration_nights}N
              </div>
              <div className="flex items-center gap-6 px-2">
                {days_breakdown.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 whitespace-nowrap group">
                    <div className="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-[10px] font-black shadow-sm group-hover:scale-110 transition-transform">
                      {item.days}
                    </div>
                    <p className="text-xs font-bold text-slate-600">
                      <span className="text-slate-400 font-medium">{item.days === 1 ? 'Day' : 'Days'} in</span> {item.city}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Pricing Bar for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 p-4 flex items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Starting from</p>
          <p className="text-xl font-black text-slate-900">{tour.currency} {Number(displayPrice).toLocaleString("en-IN")}</p>
        </div>
        <button 
          onClick={() => document.getElementById('booking-card')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-orange-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-orange-600/20 active:scale-95 transition-all"
        >
          Book Now
        </button>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            {tour.description && (
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-1.5 bg-orange-600 rounded-full" />
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">The Experience</h2>
                </div>
                <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 relative overflow-hidden">
                   <p className="text-slate-600 leading-relaxed text-base relative z-10">{tour.description}</p>
                </div>
              </section>
            )}

            {/* Trip Highlights - Moved here */}
            {Array.isArray(highlights) && highlights.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-1.5 bg-slate-900 rounded-full" />
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Trip Highlights</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {highlights.map((h: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-50 shadow-sm group hover:border-orange-100 hover:bg-orange-50/30 transition-all">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl shadow-sm flex items-center justify-center text-orange-600 font-black text-sm group-hover:bg-white">{idx + 1}</div>
                      <p className="text-slate-700 font-bold text-sm leading-tight">{h}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Itinerary Timeline */}
            {Array.isArray(itinerary) && itinerary.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-1 bg-slate-900 rounded-full" />
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Detailed Itinerary</h2>
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {itinerary.length} Days
                  </div>
                </div>

                <div className="space-y-0 relative before:absolute before:left-8 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-100">
                  {itinerary.map((day: any, index: number) => {
                    const isOpen = openDays.includes(index);
                    return (
                      <div key={index} className={`relative pl-16 pb-6 transition-all ${isOpen ? 'opacity-100' : 'opacity-80'}`}>
                        {/* Timeline Marker */}
                        <div className={`absolute left-[29px] top-4 w-[8px] h-[8px] rounded-full border-2 border-white shadow-sm z-10 transition-all ${isOpen ? 'bg-orange-600 scale-125' : 'bg-slate-300'}`} />
                        
                        <div className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden ${isOpen ? 'border-orange-100 shadow-md shadow-orange-600/5' : 'border-slate-100 shadow-sm'}`}>
                          <button
                            className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                            onClick={() => toggleDay(index)}
                          >
                            <div className="flex items-center gap-5">
                              <span className="text-3xl font-black text-orange-600/30 tracking-tighter w-12 text-center transition-colors group-hover:text-orange-600/50">0{index + 1}</span>
                              <div>
                                <h3 className="font-black text-slate-900 text-base leading-tight mb-0.5">{day.title}</h3>
                                {day.hotel && (
                                  <div className="flex items-center gap-1.5 text-slate-400 text-[9px] font-bold uppercase tracking-widest">
                                    <MapPin size={8} /> {day.hotel}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-orange-600 text-white rotate-180' : 'bg-slate-50 text-slate-400'}`}>
                              <ChevronDown size={14} />
                            </div>
                          </button>
                          
                          {isOpen && (
                            <div className="px-5 pb-5 animate-in fade-in slide-in-from-top-1 duration-300">
                              <div className="h-px bg-slate-50 w-full mb-3" />
                              <p className="text-slate-600 leading-relaxed text-sm">{day.description}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Particulars Grid */}
            <section className="grid md:grid-cols-2 gap-6">
               {/* Inclusions */}
               {Array.isArray(inclusions) && inclusions.length > 0 && (
                 <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden group">
                   <h2 className="text-xl font-black mb-6 flex items-center gap-2 text-slate-900">
                     <CheckCircle className="text-emerald-500" size={24} /> Inclusions
                   </h2>
                   <ul className="space-y-3">
                     {inclusions.map((item: string, idx: number) => (
                       <li key={idx} className="flex items-start gap-3 text-slate-600 leading-snug">
                         <div className="mt-1.5 w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                         <span className="text-xs font-medium">{item}</span>
                       </li>
                     ))}
                   </ul>
                 </div>
               )}

               {/* Exclusions */}
               {Array.isArray(exclusions) && exclusions.length > 0 && (
                 <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden group">
                   <h2 className="text-xl font-black mb-6 flex items-center gap-2 text-slate-900">
                     <X className="text-red-400" size={24} /> Exclusions
                   </h2>
                   <ul className="space-y-3">
                     {exclusions.map((item: string, idx: number) => (
                       <li key={idx} className="flex items-start gap-3 text-slate-600 leading-snug">
                         <div className="mt-1.5 w-1 h-1 rounded-full bg-slate-200 shrink-0" />
                         <span className="text-xs font-medium">{item}</span>
                       </li>
                     ))}
                   </ul>
                 </div>
               )}
            </section>

            {/* Know Before You Go - Added here */}
            {Array.isArray(know_before_you_go) && know_before_you_go.length > 0 && (
              <section className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-bl-full -z-0" />
                <h2 className="text-2xl font-black mb-8 flex items-center gap-3 relative z-10">
                  <Camera className="text-orange-400" size={32} /> Know Before You Go
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 relative z-10">
                  {know_before_you_go.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                      <p className="text-sm font-medium text-slate-300 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div id="booking-card" className="sticky top-28 space-y-6">
              {/* Brochure Card */}
              {tour.brochure_url && (
                <div className="bg-slate-900 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none" />
                  <div className="relative z-10 flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-sm font-black mb-0.5 leading-tight uppercase tracking-tight text-orange-400">Digital Brochure</h4>
                      <p className="text-white text-[10px] font-bold opacity-70">Get the full itinerary PDF</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <a
                        href={tour.brochure_url}
                        download
                        className="w-10 h-10 bg-white text-slate-900 rounded-xl flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all shadow-lg active:scale-95"
                        title="Download PDF"
                      >
                        <Download size={18} />
                      </a>
                      <button
                        onClick={() => setBrochureOpen(true)}
                        className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors border border-white/10"
                        title="Preview Online"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Booking Card */}
              <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 relative overflow-hidden">
                <div className="relative z-10 space-y-6">
                  <div>
                    <h3 className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] mb-2">Reserve Your Spot</h3>
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-black text-slate-900">{tour.currency} {Number(displayPrice).toLocaleString("en-IN")}</span>
                      <span className="text-slate-400 text-xs font-bold mb-1">/ person</span>
                    </div>
                  </div>

                  <form onSubmit={handleEnquiry} className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">Your Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full rounded-xl bg-slate-50 border-none px-5 py-3 focus:ring-1 focus:ring-orange-500 text-slate-900 font-bold placeholder:text-slate-300 text-sm transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">Email Address</label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full rounded-xl bg-slate-50 border-none px-5 py-3 focus:ring-1 focus:ring-orange-500 text-slate-900 font-bold placeholder:text-slate-300 text-sm transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">Phone Number</label>
                      <div className="flex gap-2">
                        <select className="rounded-xl bg-slate-50 border-none px-3 py-3 text-sm text-slate-900 font-bold" defaultValue="+91" disabled>
                          <option value="+91">+91</option>
                        </select>
                        <input
                          type="tel"
                          placeholder="98765 43210"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          className="flex-1 rounded-xl bg-slate-50 border-none px-5 py-3 focus:ring-1 focus:ring-orange-500 text-slate-900 font-bold placeholder:text-slate-300 text-sm transition-all"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-14 rounded-xl bg-slate-900 hover:bg-black text-white font-black text-base shadow-lg mt-2 transition-all"
                    >
                      {loading ? 'Processing...' : 'Request Booking'}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brochure Dialog */}
      <Dialog open={brochureOpen} onOpenChange={setBrochureOpen}>
        <DialogContent className="max-w-[95vw] w-[1200px] p-0 rounded-[2.5rem] overflow-hidden border-none bg-slate-900 shadow-3xl">
          <DialogHeader className="p-8 pb-4">
            <DialogTitle className="text-white text-2xl font-black">Expedition Brochure</DialogTitle>
          </DialogHeader>
          <div className="w-full h-[80vh] px-4 pb-4">
            <iframe
              src={tour.brochure_url}
              title="Brochure Preview"
              className="w-full h-full rounded-[2rem] border-0"
              frameBorder="0"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Lightbox / Full Gallery */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent
          className="!fixed !inset-0 !max-w-none !p-0 !m-0 !border-none !rounded-none bg-black/95 backdrop-blur-2xl !flex !flex-col !gap-0"
          style={{ 
            zIndex: 9999, 
            width: '100vw', 
            height: '100vh', 
            left: 0, 
            top: 0, 
            transform: 'none',
            maxWidth: 'none',
            maxHeight: 'none'
          }}
        >
          <DialogHeader className="sr-only">
            <DialogTitle>Photo Gallery</DialogTitle>
          </DialogHeader>
          <div className="relative w-full h-full flex flex-col">
            {/* Header / Back Button */}
            <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-50 bg-gradient-to-b from-black/60 to-transparent">
              <button 
                onClick={() => setLightboxOpen(false)}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all">
                  <ChevronLeft size={24} />
                </div>
                <span className="font-bold text-sm tracking-widest uppercase">Back to Tour</span>
              </button>
              <div className="text-white/40 font-black text-xs tracking-widest uppercase">
                {activeMediaIndex + 1} / {allMedia.length}
              </div>
            </div>

            {/* Main Media Display */}
            <div className="flex-1 relative w-full flex items-center justify-center">
              {/* Prev button — pinned to left edge */}
              <button
                onClick={() => setActiveMediaIndex((prev) => (prev > 0 ? prev - 1 : allMedia.length - 1))}
                className="absolute left-3 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-90"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Image */}
              <div className="relative w-full h-full overflow-hidden">
                {allMedia[activeMediaIndex]?.type === 'image' ? (
                  <Image
                    src={allMedia[activeMediaIndex].url}
                    alt="Gallery"
                    fill
                    className="object-contain"
                    priority
                  />
                ) : (
                  <video
                    src={allMedia[activeMediaIndex]?.url}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              {/* Next button — pinned to right edge */}
              <button
                onClick={() => setActiveMediaIndex((prev) => (prev < allMedia.length - 1 ? prev + 1 : 0))}
                className="absolute right-3 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-90"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Thumbnail Strip */}
            <div className="h-24 w-full p-4 bg-black/40 backdrop-blur-xl border-t border-white/5 flex items-center justify-center gap-3 overflow-x-auto no-scrollbar">
              {allMedia.map((media, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMediaIndex(idx)}
                  className={`relative flex-shrink-0 w-20 h-14 rounded-xl overflow-hidden transition-all duration-300 ${activeMediaIndex === idx ? 'ring-2 ring-orange-500 scale-110 z-10' : 'opacity-40 hover:opacity-100'}`}
                >
                  <MediaItem media={media} title="Thumb" />
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={success} onOpenChange={setSuccess}>
        <DialogContent className="rounded-[2.5rem] border-none p-10 text-center max-w-sm">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
             <CheckCircle size={40} />
          </div>
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-slate-900 text-center">Inquiry Received!</DialogTitle>
          </DialogHeader>
          <div className="py-4 text-slate-500 font-medium leading-relaxed">
            Your expedition request has been sent to our travel experts. Expect a call within 24 hours.
          </div>
          <DialogFooter>
            <button
              type="button"
              className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-black text-white font-black text-lg transition-all"
              onClick={() => setSuccess(false)}
            >
              Great, thanks!
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
