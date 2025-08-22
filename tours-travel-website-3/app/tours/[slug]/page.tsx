import { notFound } from "next/navigation";
import { TourDetails } from "@/components/tour-details";
import { supabase } from "@/lib/supabaseClient";

interface TourPageProps {
  params: { slug: string };
}

export default async function TourPage(props: TourPageProps) {
  const params = await props.params;
  const { slug } = params;
  const { data: tour, error } = await supabase.from('tours').select('*').eq('slug', slug).single();
  if (error || !tour) {
    notFound();
  }
  return <TourDetails tour={tour} />;
}
