"use client"

export function StatsSection() {
  return (
    // This section acts as a container for the stats card, using negative margin
    // to pull it up and overlap the HeroSection. The z-20 ensures it's on top.
    <section className="relative w-full -mt-20 z-20">
      <div className="relative w-full max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-8 bg-white rounded-xl shadow-2xl p-6 sm:p-8">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1">500+</div>
            <div className="text-gray-600 text-sm md:text-base font-medium">Happy Travelers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1">50+</div>
            <div className="text-gray-600 text-sm md:text-base font-medium">Destinations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1">5★</div>
            <div className="text-gray-600 text-sm md:text-base font-medium">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  )
}