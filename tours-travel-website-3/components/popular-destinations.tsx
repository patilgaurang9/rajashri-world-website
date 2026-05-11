import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

const highlightDestinations = [
  {
    title: "Dubai Tourism",
    subtitle: "Dubai, UAE",
    image: "/images/dubai.jpg",
    slug: "adventure-of-dubai",
    wide: true,
  },
  {
    title: "Bali Tourism",
    subtitle: "Denpasar, Bali",
    image: "/images/bali-image.jpg",
    slug: "bali-trip",
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
    slug: "goa-family-tour",
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
    <section className="bg-[#FFF8F1]">
      {/* Orange Background Block - Bottom Part of the shared block */}
      <div className="bg-[#FFF8F1] rounded-b-[5rem] relative overflow-hidden pt-12 pb-16">
        {/* Decorative Elements */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-100/20 rounded-full blur-3xl -z-10 -mr-48 -mb-48" />

        <div className="container mx-auto px-4 md:px-12">
          <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-0.5 bg-orange-600 rounded-full" />
                <span className="text-orange-600 font-black text-xs uppercase tracking-[0.25em]">Top Picks</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Popular <span className="text-orange-600">Destinations</span>
              </h2>
            </div>
            <p className="text-slate-500 font-medium max-w-md leading-relaxed text-sm sm:text-base">
              Extraordinary natural beauty, enjoy the rich culture, and experience the friendliness of the local people.
            </p>
          </div>

          {/* Mobile: horizontal scroll */}
          <div className="md:hidden -mx-4 px-4">
            <div
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {highlightDestinations.map((destination) => (
                <Link
                  key={destination.title}
                  href={`/tours/${destination.slug}`}
                  className="flex-none w-[78vw] snap-start relative rounded-[2rem] overflow-hidden min-h-[240px] group shadow-xl"
                >
                  <Image
                    src={destination.image}
                    alt={destination.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="78vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute left-6 bottom-6 text-white">
                    <p className="text-[10px] font-black uppercase tracking-widest text-orange-400 mb-1">{destination.subtitle}</p>
                    <h3 className="text-2xl font-black tracking-tight">{destination.title}</h3>
                  </div>
                </Link>
              ))}
              <div className="flex-none w-2 shrink-0" />
            </div>
          </div>

          {/* Desktop: asymmetric grid */}
          <div className="hidden md:grid md:grid-cols-12 gap-6">
            {highlightDestinations.map((destination) => (
              <Link
                key={destination.title}
                href={`/tours/${destination.slug}`}
                className={`${destination.wide ? "md:col-span-7" : "md:col-span-5"} relative rounded-[2.5rem] overflow-hidden min-h-[250px] md:min-h-[300px] group shadow-xl transition-all duration-500 hover:-translate-y-2`}
              >
                <Image
                  src={destination.image}
                  alt={destination.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute left-8 bottom-8 text-white">
                  <p className="text-[10px] font-black uppercase tracking-widest text-orange-400 mb-2">{destination.subtitle}</p>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight">{destination.title}</h3>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 backdrop-blur-[2px] transition-all duration-300">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white text-slate-900 font-black px-6 py-3 shadow-2xl transform scale-90 group-hover:scale-100 transition-transform">
                    View Details
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Button
              asChild
              size="lg"
              className="h-14 px-8 bg-slate-900 text-white hover:bg-black rounded-full font-black text-xs shadow-xl shadow-slate-900/10 active:scale-95 transition-all"
            >
              <Link href="/tours" className="inline-flex items-center gap-2">
                View all tours
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* How it Works Section - Moved OUTSIDE the orange block */}
      <div className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-12">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-0.5 bg-orange-600 rounded-full" />
              <span className="text-orange-600 font-black text-xs uppercase tracking-[0.25em]">Process</span>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">How to Book <span className="text-orange-600">Your Tour</span></h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="relative w-full rounded-[2.5rem] overflow-hidden min-h-[400px] md:min-h-[500px] shadow-2xl">
                <Image
                  src="/images/simon-english-48nerZQCHgo-unsplash.jpg"
                  alt="Adventure traveler"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-10 left-10 right-10">
                  <p className="text-lg text-white/90 font-medium leading-relaxed max-w-sm italic">
                    "Discover beautiful places and start your journey with an easy booking process made for you."
                  </p>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-orange-600 rounded-full flex flex-col items-center justify-center text-white text-center p-4 shadow-2xl rotate-12 group-hover:rotate-0 transition-all duration-500 border-4 border-white z-10">
                <p className="text-[10px] font-black uppercase leading-tight tracking-widest">100% Verified Trips</p>
              </div>
            </div>

            <div className="space-y-10">
              <div>
                <p className="text-orange-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4">The Rajashri Method</p>
                <h4 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight leading-none">Simple 4 Step Process</h4>
              </div>

              <div className="space-y-6">
                {howItWorksSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className="flex gap-6 rounded-[2rem] p-6 transition-all border border-slate-50 bg-white hover:bg-slate-50/50 hover:border-orange-100 hover:shadow-xl hover:shadow-orange-600/5 group/step"
                  >
                    <div className="h-12 w-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0 font-black text-lg shadow-lg group-hover/step:bg-orange-600 transition-colors duration-300">
                      {index + 1}
                    </div>
                    <div>
                      <h5 className="text-lg md:text-xl font-black text-slate-900 tracking-tight mb-1">{step.title}</h5>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">{step.desc}</p>
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
