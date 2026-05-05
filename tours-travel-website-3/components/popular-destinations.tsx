import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"
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
    <section className="bg-white">
      {/* Orange Background Block - Bottom Part of the shared block */}
      <div className="bg-[#FFF8F1] rounded-b-[5rem] relative overflow-hidden pt-12 pb-32">
        {/* Decorative Elements */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-100/20 rounded-full blur-3xl -z-10 -mr-48 -mb-48" />

        <div className="container mx-auto px-4 md:px-12">
          <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-0.5 bg-orange-600 rounded-full" />
                <span className="text-orange-600 font-black text-xs uppercase tracking-[0.3em]">Top Picks</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Popular <br />
                <span className="text-orange-600">Destinations</span>
              </h2>
            </div>
            <p className="text-slate-500 font-medium max-w-md leading-relaxed">
              Extraordinary natural beauty, enjoy the rich culture, and experience the friendliness of the local people.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
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
      <div className="py-32 bg-white">
        <div className="container mx-auto px-4 md:px-12">
          <div className="mb-12">
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">How to Book Your Tour</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 items-start">
            <div className="relative">
              <div className="relative w-full rounded-[3rem] overflow-hidden min-h-[450px] shadow-2xl group">
                <Image
                  src="/images/simon-english-48nerZQCHgo-unsplash.jpg"
                  alt="Adventure traveler"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-base text-white font-medium leading-relaxed max-w-sm">
                    Discover beautiful places and start your journey with an easy booking process made for you.
                  </p>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-orange-600 rounded-full flex items-center justify-center text-white text-center p-4 shadow-xl rotate-12 group-hover:rotate-0 transition-transform">
                <p className="text-xs font-black uppercase leading-tight">100% Verified Trips</p>
              </div>
            </div>

            <div className="space-y-8">
              <h4 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Simple 4 Step Process</h4>

              <div className="space-y-4">
                {howItWorksSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className={`flex gap-6 rounded-[2rem] p-6 transition-all border ${index === 0
                        ? "bg-gray-50 border-slate-100 shadow-xl shadow-slate-900/5"
                        : "bg-white border-transparent hover:bg-slate-50 hover:border-slate-100 hover:shadow-lg"
                      }`}
                  >
                    <div className="h-10 w-10 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0 font-black text-base shadow-lg">
                      {index + 1}
                    </div>
                    <div>
                      <h5 className="text-base md:text-lg font-black text-slate-900 tracking-tight">{step.title}</h5>
                      <p className="text-sm text-slate-500 mt-1 font-medium leading-relaxed">{step.desc}</p>
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
