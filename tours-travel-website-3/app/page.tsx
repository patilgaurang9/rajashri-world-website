import { HeroSection } from "@/components/hero-section"
import { FeaturedTours } from "@/components/featured-tours"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { PopularDestinations } from "@/components/popular-destinations"
import { VideoGallerySection } from "@/components/video-gallery-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedTours />
      <VideoGallerySection />
      <PopularDestinations/>
      <TestimonialsSection />
      <CTASection />
    </>
  )
}
