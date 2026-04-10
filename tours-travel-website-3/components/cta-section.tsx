import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
          Ready for Your Next{" "}
          <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Adventure</span>?
        </h2>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Don't wait any longer. Start planning your dream vacation today and create memories that will last a lifetime.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-black hover:bg-black/90 text-white text-lg px-8 py-6 shadow-lg rounded-full"
          >
            <Link href="/tours">Browse Tours</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-black bg-white hover:bg-gray-50 text-black text-lg px-8 py-6 shadow-lg rounded-full">
            <Link href="/custom-booking">Create Custom Tour</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
