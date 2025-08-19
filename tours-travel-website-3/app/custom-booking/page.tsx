import { CustomBookingForm } from "@/components/custom-booking-form"

export default function CustomBookingPage() {
  return (
    <div className="min-h-screen pt-20 pb-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Create Your Custom Tour
            </h1>
            <p className="text-xl text-gray-700">
              Tell us about your dream destination and we'll create a personalized tour just for you
            </p>
          </div>

          <CustomBookingForm />
        </div>
      </div>
    </div>
  )
}
