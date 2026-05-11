"use client"

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TourCard } from "@/components/tour-card";
import { TourCardSkeleton } from "@/components/loading/tour-card-skeleton";
import { supabase } from "@/lib/supabaseClient";

function FeaturedToursContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [featuredTours, setFeaturedTours] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;
    async function fetchFeaturedTours() {
      setIsLoading(true);
      // You can change the query to use a 'featured' boolean or order by rating, etc.
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .order('id', { ascending: false })
        .limit(4);
      if (!error && isMounted) {
        setFeaturedTours(data || []);
      }
      setIsLoading(false);
    }
    fetchFeaturedTours();
    return () => { isMounted = false; };
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-0.5 bg-orange-600 rounded-full" />
            <span className="text-orange-600 font-black text-xs uppercase tracking-[0.25em]">Handpicked</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Featured <span className="text-orange-600">Tours</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-xl">
            Discover our most popular destinations and experiences
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => <TourCardSkeleton key={index} />)
          ) : featuredTours.length > 0 ? (
            featuredTours.map((tour) => <TourCard key={tour.id} tour={tour} />)
          ) : (
            <div className="col-span-4 text-center text-gray-500 text-lg py-12">No featured tours available at the moment.</div>
          )}
        </div>

        <div className="text-center">
          <Button 
            asChild 
            size="lg" 
            className="bg-black text-white hover:bg-black/90 transition-all duration-300 transform hover:scale-105 shadow-lg rounded-full"
          >
            <Link href="/tours" className="inline-flex items-center gap-2">
              View All Tours
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function FeaturedTours() {
  return (
    <Suspense fallback={<TourCardSkeleton />}>
      <FeaturedToursContent />
    </Suspense>
  )
}
