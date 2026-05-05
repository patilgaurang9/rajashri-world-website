"use client";
import { useEffect, useState } from "react";
import { ToursGrid } from "@/components/tours-grid";
import { ToursFilters } from "@/components/tours-filters";

export default function ToursPage() {
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTours = async (filters?: { minPrice: number, maxPrice: number, duration: string, startDate?: string, endDate?: string }) => {
    setLoading(true);
    let body = filters || { minPrice: 0, maxPrice: 500000, duration: "" };
    const res = await fetch("/api/tours", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const { data } = await res.json();
    setTours(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTours();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 bg-slate-50/30">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="relative mb-16">
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-orange-100/50 rounded-full blur-3xl -z-10" />
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-slate-900 tracking-tight leading-none">
              Explore Our <br />
              <span className="text-orange-600">Extraordinary</span> Tours
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
              From the snow-capped Himalayas to the sun-drenched beaches of the South, discover India's most curated travel experiences.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Side Filters */}
          <aside className="w-full lg:w-[320px] shrink-0 sticky top-28">
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
              <ToursFilters onApply={fetchTours} />
            </div>
          </aside>

          {/* Tours Grid Container */}
          <main className="w-full lg:flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 4].map(i => (
                  <div key={i} className="h-[450px] bg-slate-100 rounded-[2.5rem] animate-pulse" />
                ))}
              </div>
            ) : tours.length === 0 ? (
              <div className="min-h-[40vh] flex flex-col items-center justify-center text-center bg-white rounded-[2.5rem] p-12 border border-slate-100 shadow-sm">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300">
                   <h2 className="text-4xl">🏝️</h2>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">No Expeditions Found</h3>
                <p className="text-slate-500 font-medium">Try adjusting your filters to find your next adventure.</p>
              </div>
            ) : (
              <ToursGrid tours={tours} loading={loading} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
