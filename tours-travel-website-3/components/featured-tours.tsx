"use client"

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
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
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Featured{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Tours</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
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
            variant="outline" 
            className="border-orange-500 text-orange-600 hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-lg rounded-full"
          >
            <Link href="/tours">View All Tours</Link>
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
