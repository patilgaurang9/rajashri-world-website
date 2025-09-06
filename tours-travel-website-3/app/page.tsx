import { HeroSection } from "@/components/hero-section"
import { FeaturedTours } from "@/components/featured-tours"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { PopularDestinations } from "@/components/popular-destinations"
import { StatsSection } from "@/components/stats-section"
export default function HomePage() {
  return (
    <>
      <HeroSection />
      {/* <StatsSection /> */}
      <FeaturedTours />
      {/* Separator line between Featured Tours and Popular Destinations */}
      <div className="w-full flex justify-center my-4 mb-12">
        <div className="h-[2px] w-full max-w-3xl bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      </div>
      <PopularDestinations/>
      <TestimonialsSection />
      <CTASection />
    </>
  )
}
