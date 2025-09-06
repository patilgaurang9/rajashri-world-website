import { CustomBookingForm } from "@/components/custom-booking-form"
import Image from "next/image"

export default function CustomBookingPage() {
  return (
    <div className="pt-16 min-h-screen bg-white flex flex-col">
      <div className="w-full flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
        {/* Left: Image with overlay */}
        <div className="relative md:w-[45%] w-full h-64 md:h-auto">
          <Image
            src="/images/simon-english-48nerZQCHgo-unsplash.jpg"
            alt="Create Your Custom Tour"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end md:justify-center items-center p-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 text-center drop-shadow-lg">
              Create Your Custom Tour
            </h1>
            <p className="text-lg md:text-xl text-gray-100 text-center max-w-md drop-shadow">
              Tell us about your dream destination and we'll create a personalized tour just for you
            </p>
          </div>
        </div>

        {/* Right: Form */}
        <div className="md:w-[55%] w-full bg-white flex flex-col justify-center p-6 md:p-10 overflow-y-auto">
          <CustomBookingForm />
        </div>
      </div>
    </div>
  )
}
