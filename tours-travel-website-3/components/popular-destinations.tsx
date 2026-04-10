import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const highlightDestinations = [
  {
    title: "Dubai Tourism",
    subtitle: "Dubai, UAE",
    image: "/images/dubai.jpg",
    slug: "dubai-adventure-2025",
    wide: true,
  },
  {
    title: "Bali Tourism",
    subtitle: "Denpasar, Bali",
    image: "/images/bali-image.jpg",
    slug: "bali-trip-2025",
    wide: false,
  },
  {
    title: "Manali Tourism",
    subtitle: "Himachal Pradesh, India",
    image: "/images/manali-image.jpg",
    slug: "manali-diwali-special-2025",
    wide: false,
  },
  {
    title: "Goa Tourism",
    subtitle: "Goa, India",
    image: "/images/goa.jpg",
    slug: "goa-family-tour-nov-2025",
    wide: true,
  },
]

const howItWorksSteps = [
  {
    title: "Find your destination",
    desc: "Choose the place you want to visit and share your travel idea.",
  },
  {
    title: "Send enquiry",
    desc: "Fill your details and submit your enquiry in a few clicks.",
  },
  {
    title: "We will reach out to you",
    desc: "Our team contacts you quickly with the right options and plan.",
  },
  {
    title: "Explore destination",
    desc: "Confirm your package and enjoy your trip with confidence.",
  },
]

export function PopularDestinations() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 md:mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-black">Popular Destinations</h2>
          </div>
          <p className="text-sm md:text-base text-gray-500 max-w-md">
            Extraordinary natural beauty, enjoy the rich culture, and experience the friendliness of the local people.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {highlightDestinations.map((destination) => (
            <Link
              key={destination.title}
              href={`/tours/${destination.slug}`}
              className={`${destination.wide ? "md:col-span-7" : "md:col-span-5"} relative rounded-2xl overflow-hidden min-h-[210px] md:min-h-[230px] group`}
            >
              <Image
                src={destination.image}
                alt={destination.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute left-4 bottom-4 md:left-5 md:bottom-5 text-white">
                <p className="text-xs md:text-sm text-white/80">{destination.subtitle}</p>
                <h3 className="text-lg md:text-2xl font-semibold">{destination.title}</h3>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/35 transition-opacity duration-300">
                <span className="inline-flex items-center gap-2 rounded-full bg-white text-black font-semibold px-5 py-2 shadow-lg">
                  Explore
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-8 md:mt-10">
          <Button
            asChild
            size="lg"
            className="bg-black text-white hover:bg-black/90 rounded-full px-8"
          >
            <Link href="/tours" className="inline-flex items-center gap-2">
              View All Tours
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-20 md:mt-24">
          <div className="mb-6 md:mb-8">
            <h3 className="text-4xl md:text-5xl font-bold text-black leading-tight">How to Book Your Tour</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-5 md:gap-6 items-start">
            <div className="max-w-xl">
              <div className="relative w-full rounded-2xl overflow-hidden min-h-[420px] shadow-lg">
              <Image
                src="/images/simon-english-48nerZQCHgo-unsplash.jpg"
                alt="Adventure traveler"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
              <p className="absolute bottom-5 left-5 right-5 text-sm text-white/90 leading-relaxed max-w-sm">
                Discover beautiful places and start your journey with an easy booking process made for you.
              </p>
            </div>
          </div>

            <div className="pt-2">
              <h4 className="text-3xl md:text-4xl font-bold text-black mb-6 whitespace-nowrap">Book Tour in 4 Easy Steps</h4>

              <div className="space-y-2">
                {howItWorksSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className={`flex gap-4 rounded-xl p-4 ${
                      index === 0
                        ? "bg-gray-100"
                        : "bg-transparent"
                    }`}
                  >
                    <div className="h-8 w-8 text-gray-700 text-base font-semibold flex items-center justify-center shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <div>
                      <h5 className="text-base md:text-lg font-semibold text-black">{step.title}</h5>
                      <p className="text-sm text-gray-500 mt-1">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
