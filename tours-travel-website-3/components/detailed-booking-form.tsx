"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Phone, Plus, Minus, MapPin } from "lucide-react"
import { tours } from "@/lib/data"
import { ButtonLoader } from "@/components/loading/button-loader"

interface TravellerCounts {
  adults: number
  children: number
  childrenAge2to4: number
  infants: number
}

interface DateOption {
  date: string
  price: number
  seatsAvailable: number
  tourLength: string
}

interface AccommodationOption {
  type: string
  price: number
  description: string
}

export function DetailedBookingForm() {
  const searchParams = useSearchParams()
  const selectedTourSlug = searchParams.get("tour")
  const selectedTour = tours.find((t) => t.slug === selectedTourSlug) || tours[0]

  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [travellerCounts, setTravellerCounts] = useState<TravellerCounts>({
    adults: 1,
    children: 0,
    childrenAge2to4: 0,
    infants: 0,
  })
  const [leadTraveller, setLeadTraveller] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
  })
  const [selectedAccommodation, setSelectedAccommodation] = useState<string>("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // Mock date options
  const dateOptions: DateOption[] = [
    { date: "Sep 14, 2025", price: 66990, seatsAvailable: 8, tourLength: "6N/7D" },
    { date: "Sep 21, 2025", price: 69990, seatsAvailable: 5, tourLength: "6N/7D" },
    { date: "Oct 05, 2025", price: 67990, seatsAvailable: 12, tourLength: "6N/7D" },
    { date: "Oct 12, 2025", price: 70990, seatsAvailable: 6, tourLength: "6N/7D" },
  ]

  // Mock accommodation options
  const accommodationOptions: AccommodationOption[] = [
    { type: "Standard Room", price: 0, description: "Twin sharing basis" },
    { type: "Deluxe Room", price: 5000, description: "Twin sharing with balcony" },
    { type: "Suite", price: 12000, description: "Luxury suite with living area" },
    { type: "Single Occupancy", price: 8000, description: "Single room supplement" },
  ]

  const updateTravellerCount = (type: keyof TravellerCounts, increment: boolean) => {
    setTravellerCounts((prev) => ({
      ...prev,
      [type]: increment ? prev[type] + 1 : Math.max(0, prev[type] - 1),
    }))
  }

  const getTotalPrice = () => {
    const selectedDateOption = dateOptions.find((d) => d.date === selectedDate)
    if (!selectedDateOption) return 0

    const basePrice = selectedDateOption.price * travellerCounts.adults
    const childPrice = selectedDateOption.price * 0.7 * travellerCounts.children
    const child2to4Price = selectedDateOption.price * 0.5 * travellerCounts.childrenAge2to4

    const accommodationPrice = accommodationOptions.find((a) => a.type === selectedAccommodation)?.price || 0

    return basePrice + childPrice + child2to4Price + accommodationPrice
  }

  const handleBooking = async () => {
    setIsProcessing(true)

    try {
      // Prepare booking data
      const bookingData = {
        tour: selectedTour.title,
        selectedDate,
        travellerCounts,
        leadTraveller,
        selectedAccommodation,
        totalPrice: getTotalPrice(),
        bookingId: `WL${Date.now()}`,
        timestamp: new Date().toISOString(),
      }

      // TODO: Send booking data to admin email
      await sendBookingToAdmin(bookingData)

      // TODO: Redirect to payment gateway
      await redirectToPaymentGateway(bookingData)
    } catch (error) {
      console.error("Booking error:", error)
      alert("There was an error processing your booking. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  // TODO: Implement admin email notification
  const sendBookingToAdmin = async (bookingData: any) => {
    // This would integrate with your email service (e.g., Resend, SendGrid)
    console.log("Sending booking to admin:", bookingData)
  }

  // TODO: Implement payment gateway integration
  const redirectToPaymentGateway = async (bookingData: any) => {
    // This would integrate with Stripe, Razorpay, or other payment providers
    console.log("Redirecting to payment gateway:", bookingData)
    alert(`Booking confirmed! Total: ₹${getTotalPrice().toLocaleString()}. Redirecting to payment...`)
  }

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Main Booking Form */}
        <div className="lg:col-span-3 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                {selectedTour.title}
              </h1>
              <p className="text-gray-700 text-lg">{selectedTour.location}</p>
            </div>
          </div>

          {/* Step 1: Select Your Dates */}
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3">
                <span className="bg-white text-orange-600 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">
                  1
                </span>
                Select Your Dates
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {dateOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                      selectedDate === option.date
                        ? "border-orange-400 bg-orange-50 shadow-lg shadow-orange-200"
                        : "border-gray-300 bg-gray-50 hover:border-orange-300 hover:bg-orange-50"
                    }`}
                    onClick={() => setSelectedDate(option.date)}
                  >
                    <div className="text-sm font-medium text-gray-900 mb-1">{option.date}</div>
                    <div className="text-xs text-gray-600 mb-2">Tour length</div>
                    <div className="text-xs font-medium text-gray-700 mb-2">{option.tourLength}</div>
                    <div className="text-xs text-gray-600 mb-1">Start From</div>
                    <div className="text-lg font-bold text-orange-600 mb-2">₹{option.price.toLocaleString()}*</div>
                    <div className="text-xs text-green-600 font-medium">{option.seatsAvailable} Seats Available</div>
                    <div className="mt-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          selectedDate === option.date
                            ? "border-orange-500 bg-orange-500 shadow-lg shadow-orange-300"
                            : "border-gray-400"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Add Traveller Details */}
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3">
                <span className="bg-white text-orange-600 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">
                  2
                </span>
                Add traveller details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Traveller Counts */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-900">Adult</Label>
                  <div className="text-xs text-gray-600 mb-2">Above 12 yrs</div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateTravellerCount("adults", false)}
                      disabled={travellerCounts.adults <= 1}
                      className="border-gray-300 bg-white hover:bg-orange-50 hover:border-orange-300 text-gray-700"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-xl font-bold w-8 text-center text-orange-600">{travellerCounts.adults}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateTravellerCount("adults", true)}
                      className="border-gray-300 bg-white hover:bg-orange-50 hover:border-orange-300 text-gray-700"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-900">Child</Label>
                  <div className="text-xs text-gray-600 mb-2">Age 5-11 yrs</div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateTravellerCount("children", false)}
                      disabled={travellerCounts.children <= 0}
                      className="border-gray-300 bg-white hover:bg-orange-50 hover:border-orange-300 text-gray-700"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-xl font-bold w-8 text-center text-orange-600">{travellerCounts.children}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateTravellerCount("children", true)}
                      className="border-gray-300 bg-white hover:bg-orange-50 hover:border-orange-300 text-gray-700"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-900">Child</Label>
                  <div className="text-xs text-gray-600 mb-2">Age 2-4 yrs</div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateTravellerCount("childrenAge2to4", false)}
                      disabled={travellerCounts.childrenAge2to4 <= 0}
                      className="border-gray-300 bg-white hover:bg-orange-50 hover:border-orange-300 text-gray-700"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-xl font-bold w-8 text-center text-orange-600">
                      {travellerCounts.childrenAge2to4}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateTravellerCount("childrenAge2to4", true)}
                      className="border-gray-300 bg-white hover:bg-orange-50 hover:border-orange-300 text-gray-700"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-900">Infant</Label>
                  <div className="text-xs text-gray-600 mb-2">Age 0-1 yrs</div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateTravellerCount("infants", false)}
                      disabled={travellerCounts.infants <= 0}
                      className="border-gray-300 bg-white hover:bg-orange-50 hover:border-orange-300 text-gray-700"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-xl font-bold w-8 text-center text-orange-600">{travellerCounts.infants}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateTravellerCount("infants", true)}
                      className="border-gray-300 bg-white hover:bg-orange-50 hover:border-orange-300 text-gray-700"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Note */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">i</span>
                  </div>
                  <p className="text-sm text-orange-800">
                    <strong className="text-orange-700">Please Note:</strong> Traveller details should match information on
                    passport
                  </p>
                </div>
              </div>

              {/* Lead Traveller */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Lead Traveller</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    This traveller will serve as the contact person for the booking.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-gray-700">
                      Select title *
                    </Label>
                    <Select
                      value={leadTraveller.title}
                      onValueChange={(value) => setLeadTraveller((prev) => ({ ...prev, title: value }))}
                    >
                      <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mr">Mr.</SelectItem>
                        <SelectItem value="mrs">Mrs.</SelectItem>
                        <SelectItem value="ms">Ms.</SelectItem>
                        <SelectItem value="dr">Dr.</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-gray-700">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      value={leadTraveller.firstName}
                      onChange={(e) => setLeadTraveller((prev) => ({ ...prev, firstName: e.target.value }))}
                      required
                      className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-gray-700">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      value={leadTraveller.lastName}
                      onChange={(e) => setLeadTraveller((prev) => ({ ...prev, lastName: e.target.value }))}
                      required
                      className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={leadTraveller.email}
                      onChange={(e) => setLeadTraveller((prev) => ({ ...prev, email: e.target.value }))}
                      required
                      className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={leadTraveller.phone}
                      onChange={(e) => setLeadTraveller((prev) => ({ ...prev, phone: e.target.value }))}
                      required
                      className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dob" className="text-gray-700">
                      Date of Birth *
                    </Label>
                    <Input
                      id="dob"
                      type="date"
                      value={leadTraveller.dateOfBirth}
                      onChange={(e) => setLeadTraveller((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
                      required
                      className="bg-white border-gray-300 text-gray-900"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700">Gender *</Label>
                    <RadioGroup
                      value={leadTraveller.gender}
                      onValueChange={(value) => setLeadTraveller((prev) => ({ ...prev, gender: value }))}
                      className="flex gap-6 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" className="border-gray-300 text-orange-600" />
                        <Label htmlFor="male" className="text-gray-700">
                          Male
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" className="border-gray-300 text-orange-600" />
                        <Label htmlFor="female" className="text-gray-700">
                          Female
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <p className="text-sm text-gray-600 italic">You will fill the remaining traveler data after payment.</p>
              </div>
            </CardContent>
          </Card>

          {/* Step 3: Select Accommodation */}
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3">
                <span className="bg-white text-orange-600 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">
                  3
                </span>
                Select Accommodation
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 mb-6">Select the number of travellers per room type.</p>

              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 font-semibold text-gray-900 border-b border-gray-300 pb-3">
                  <div>Room Type</div>
                  <div>Price</div>
                  <div>Selection</div>
                </div>

                {accommodationOptions.map((option, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4 items-center py-4 border-b border-gray-200">
                    <div>
                      <div className="font-medium text-gray-900">{option.type}</div>
                      <div className="text-sm text-gray-600">{option.description}</div>
                    </div>
                    <div className="font-semibold text-orange-600">
                      {option.price === 0 ? "Included" : `+₹${option.price.toLocaleString()}`}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`accommodation-${index}`}
                          name="accommodation"
                          value={option.type}
                          checked={selectedAccommodation === option.type}
                          onChange={(e) => setSelectedAccommodation(e.target.value)}
                          className="w-4 h-4 text-orange-600 bg-white border-gray-300 focus:ring-orange-500"
                        />
                        <Label htmlFor={`accommodation-${index}`} className="sr-only">
                          {option.type}
                        </Label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Terms and Book Button */}
          <div className="space-y-6">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                className="border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
              />
              <Label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
                I have read and agreed to the Wanderlust Tours{" "}
                <a href="#" className="text-orange-600 hover:text-orange-700 underline">
                  Terms & Conditions
                </a>
                .
              </Label>
            </div>

            <ButtonLoader
              onClick={handleBooking}
              loading={isProcessing}
              disabled={
                !selectedDate ||
                !leadTraveller.firstName ||
                !leadTraveller.email ||
                !selectedAccommodation ||
                !agreedToTerms
              }
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-6 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isProcessing ? "Processing Booking..." : "Book Your Seats"}
            </ButtonLoader>
          </div>
        </div>

        {/* Sidebar - Need Help */}
        <div className="lg:col-span-1">
          <Card className="bg-white border-gray-200 shadow-lg sticky top-24">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h3>
              <p className="text-sm text-gray-700 mb-6 leading-relaxed">
                Whether you have questions or need assistance with online booking procedures, our experts are just a
                call away. Reach out to us, and we'll ensure a smooth and hassle-free booking experience for you. Your
                satisfaction is our priority.
              </p>

              <div className="flex items-center gap-3 mb-6 p-3 bg-orange-50 rounded-lg border border-orange-200">
                <Phone className="h-5 w-5 text-orange-500" />
                <span className="text-xl font-bold text-orange-600">1800 266 1100</span>
              </div>

              {/* Price Summary */}
              {selectedDate && (
                <div className="border-t border-gray-300 pt-6 space-y-3">
                  <h4 className="font-semibold text-gray-900 mb-4">Price Summary</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-gray-700">
                      <span>Adults ({travellerCounts.adults})</span>
                      <span className="text-gray-900 font-medium">
                        ₹
                        {(
                          (dateOptions.find((d) => d.date === selectedDate)?.price || 0) * travellerCounts.adults
                        ).toLocaleString()}
                      </span>
                    </div>
                    {travellerCounts.children > 0 && (
                      <div className="flex justify-between text-gray-700">
                        <span>Children ({travellerCounts.children})</span>
                        <span className="text-gray-900 font-medium">
                          ₹
                          {Math.round(
                            (dateOptions.find((d) => d.date === selectedDate)?.price || 0) *
                              0.7 *
                              travellerCounts.children,
                          ).toLocaleString()}
                        </span>
                      </div>
                    )}
                    {travellerCounts.childrenAge2to4 > 0 && (
                      <div className="flex justify-between text-gray-700">
                        <span>Children 2-4 ({travellerCounts.childrenAge2to4})</span>
                        <span className="text-gray-900 font-medium">
                          ₹
                          {Math.round(
                            (dateOptions.find((d) => d.date === selectedDate)?.price || 0) *
                              0.5 *
                              travellerCounts.childrenAge2to4,
                          ).toLocaleString()}
                        </span>
                      </div>
                    )}
                    {selectedAccommodation &&
                      accommodationOptions.find((a) => a.type === selectedAccommodation)?.price! > 0 && (
                        <div className="flex justify-between text-gray-700">
                          <span>Accommodation</span>
                          <span className="text-gray-900 font-medium">
                            ₹
                            {accommodationOptions
                              .find((a) => a.type === selectedAccommodation)
                              ?.price!.toLocaleString()}
                          </span>
                        </div>
                      )}
                    <div className="border-t border-gray-300 pt-3 flex justify-between font-bold text-lg">
                      <span className="text-gray-900">Total</span>
                      <span className="text-orange-600">₹{getTotalPrice().toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
