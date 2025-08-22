import { ToursGrid } from "@/components/tours-grid";
import { ToursFilters } from "@/components/tours-filters";
import { supabase } from "@/lib/supabaseClient";

export default async function ToursPage() {
  const { data: tours, error } = await supabase.from('tours').select('*').order('start_date', { ascending: true });
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
        <div className="mb-8">
          <ToursFilters />
        </div>
        <ToursGrid tours={tours || []} />
      </div>
    </div>
  );
}
