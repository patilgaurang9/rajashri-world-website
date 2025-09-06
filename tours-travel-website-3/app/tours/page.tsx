"use client";
import { useEffect, useState } from "react";
import { ToursGrid } from "@/components/tours-grid";
import { ToursFilters } from "@/components/tours-filters";

export default function ToursPage() {
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTours = async (filters?: { minPrice: number, maxPrice: number, duration: string }) => {
    setLoading(true);
    let body = filters || { minPrice: 0, maxPrice: 500000, duration: "" };
    const res = await fetch("/api/tours", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const { data } = await res.json();
    setTours(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTours();
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Explore Our Tours
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Discover amazing destinations and create unforgettable memories with our carefully curated tours
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Side Filters */}
          <div className="w-full lg:w-1/4 mb-8 lg:mb-0">
            <ToursFilters onApply={fetchTours} />
          </div>
          {/* Tours Grid */}
<div className="w-full lg:w-3/4 min-h-[60vh] flex items-center justify-center">
  {loading ? (
    <p className="text-gray-500 text-lg">Loading tours...</p>
  ) : tours.length === 0 ? (
    <p className="text-gray-500 text-xl font-semibold">No tours found matching your filters.</p>
  ) : (
    <ToursGrid tours={tours} loading={loading} />
  )}
</div>


        </div>
      </div>
    </div>
  );
}
