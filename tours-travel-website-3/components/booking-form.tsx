"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { tours } from "@/lib/data"

export function BookingForm() {
  const searchParams = useSearchParams()
  const selectedTour = searchParams.get("tour")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Connect to backend
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-4 text-green-400">Booking Submitted!</h2>
          <p className="text-gray-300 mb-6">
            Thank you for your booking request. We'll contact you within 24 hours to confirm your tour details.
          </p>
          <Button onClick={() => setIsSubmitted(false)} variant="outline">
            Book Another Tour
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Book Your Tour</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="tour">Select Tour</Label>
            <Select defaultValue={selectedTour || ""}>
              <SelectTrigger className="bg-slate-700/50 border-slate-600">
                <SelectValue placeholder="Choose a tour" />
              </SelectTrigger>
              <SelectContent>
                {tours.map((tour) => (
                  <SelectItem key={tour.id} value={tour.slug}>
                    {tour.title} - ${tour.price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" required className="bg-slate-700/50 border-slate-600" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" required className="bg-slate-700/50 border-slate-600" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required className="bg-slate-700/50 border-slate-600" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" required className="bg-slate-700/50 border-slate-600" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="people">Number of People</Label>
              <Select>
                <SelectTrigger className="bg-slate-700/50 border-slate-600">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "Person" : "People"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Preferred Start Date</Label>
              <Input id="startDate" type="date" required className="bg-slate-700/50 border-slate-600" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Special Requests</Label>
            <Textarea
              id="message"
              placeholder="Any special requirements or requests..."
              className="bg-slate-700/50 border-slate-600"
              rows={4}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-sky-500 to-amber-500 hover:from-sky-600 hover:to-amber-600 text-lg py-6"
          >
            Submit Booking Request
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
