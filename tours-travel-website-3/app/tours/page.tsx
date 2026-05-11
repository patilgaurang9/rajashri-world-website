"use client";
import { useEffect, useState } from "react";
import { ToursGrid } from "@/components/tours-grid";
import { ToursFilters } from "@/components/tours-filters";
import { SlidersHorizontal, X } from "lucide-react";

export default function ToursPage() {
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

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
    <div className="min-h-screen pb-16 bg-slate-50/30">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-100 pt-12 pb-10 px-4">
        <div className="container mx-auto">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-0.5 bg-orange-600 rounded-full" />
                <span className="text-orange-600 font-black text-xs uppercase tracking-[0.25em]">Rajashri World</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
                All <span className="text-orange-600">Tours</span>
              </h1>
              <p className="text-base text-slate-500 mt-4 max-w-md font-medium leading-relaxed">
                From Himalayas to tropical beaches — curated experiences across India & beyond.
              </p>
            </div>
            {/* Mobile Filter Toggle */}
            <button
              className="lg:hidden flex items-center gap-2 bg-black text-white rounded-full px-4 py-2.5 text-sm font-semibold shrink-0"
              onClick={() => setFiltersOpen(true)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer Overlay */}
      {filtersOpen && (
        <div className="lg:hidden fixed inset-0 z-[998] flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setFiltersOpen(false)}
          />
          {/* Drawer */}
          <div className="relative ml-auto w-full max-w-sm h-full bg-white flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <span className="font-black text-lg text-slate-900">Filters</span>
              <button
                onClick={() => setFiltersOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-700" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <ToursFilters onApply={(f) => { fetchTours(f); setFiltersOpen(false); }} />
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 pt-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Desktop Side Filters */}
          <aside className="hidden lg:block w-[280px] shrink-0 sticky top-24">
            <ToursFilters onApply={fetchTours} />
          </aside>

          {/* Tours Grid */}
          <main className="w-full lg:flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-[380px] bg-slate-100 rounded-[2rem] animate-pulse" />
                ))}
              </div>
            ) : tours.length === 0 ? (
              <div className="min-h-[40vh] flex flex-col items-center justify-center text-center bg-white rounded-[2rem] p-10 border border-slate-100">
                <div className="text-4xl mb-4">🏝️</div>
                <h3 className="text-xl font-black text-slate-900 mb-2">No Tours Found</h3>
                <p className="text-slate-500 text-sm font-medium">Try adjusting your filters to find your next adventure.</p>
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
