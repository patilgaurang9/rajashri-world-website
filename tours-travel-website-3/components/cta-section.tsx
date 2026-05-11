import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-0.5 bg-orange-600 rounded-full" />
            <span className="text-orange-600 font-black text-xs uppercase tracking-[0.25em]">Start Today</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Ready for Your Next <span className="text-orange-600">Adventure?</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mb-8 max-w-xl">
            Don't wait any longer. Start planning your dream vacation today and create memories that will last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-black hover:bg-black/90 text-white font-bold px-8 rounded-full"
            >
              <Link href="/tours">Browse Tours</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-black bg-white hover:bg-gray-50 text-black font-bold px-8 rounded-full">
              <Link href="/custom-booking">Create Custom Tour</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
