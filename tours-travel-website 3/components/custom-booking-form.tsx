"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

export function CustomBookingForm() {
  const [budget, setBudget] = useState([1000])
  const [activities, setActivities] = useState<string[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleActivityChange = (activity: string, checked: boolean) => {
    if (checked) {
      setActivities([...activities, activity])
    } else {
      setActivities(activities.filter((a) => a !== activity))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Connect to backend API
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <Card className="bg-white border-gray-200 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">✨</div>
          <h2 className="text-2xl font-bold mb-4 text-orange-600">Custom Tour Request Received!</h2>
          <p className="text-gray-700 mb-6">
            Our travel experts will create a personalized itinerary based on your preferences and contact you within 48
            hours.
          </p>
          <Button onClick={() => setIsSubmitted(false)} variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
            Create Another Custom Tour
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white border-gray-200 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900">Create Your Custom Tour</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700">Full Name</Label>
              <Input id="name" required className="bg-white border-gray-300" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input id="email" type="email" required className="bg-white border-gray-300" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="destinations" className="text-gray-700">Preferred Destinations</Label>
            <Textarea
              id="destinations"
              placeholder="Tell us about the places you'd like to visit..."
              className="bg-white border-gray-300"
              rows={3}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-gray-700">Travel Start Date</Label>
              <Input id="startDate" type="date" required className="bg-white border-gray-300" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-gray-700">Duration</Label>
              <Select>
                <SelectTrigger className="bg-white border-gray-300">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3-5">3-5 days</SelectItem>
                  <SelectItem value="6-10">6-10 days</SelectItem>
                  <SelectItem value="11-15">11-15 days</SelectItem>
                  <SelectItem value="16+">16+ days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-gray-700">Budget Range (per person)</Label>
            <Slider value={budget} onValueChange={setBudget} max={10000} min={500} step={100} className="w-full" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>$500</span>
              <span className="font-medium text-orange-600">${budget[0]}</span>
              <span>$10,000+</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-700">Accommodation Type</Label>
            <Select>
              <SelectTrigger className="bg-white border-gray-300">
                <SelectValue placeholder="Select accommodation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="budget">Budget (Hostels, Budget Hotels)</SelectItem>
                <SelectItem value="standard">Standard (3-star Hotels)</SelectItem>
                <SelectItem value="luxury">Luxury (4-5 star Hotels)</SelectItem>
                <SelectItem value="premium">Premium (Resorts, Villas)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-gray-700">Activities of Interest</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                "Adventure Sports",
                "Cultural Tours",
                "Wildlife Safari",
                "Beach Activities",
                "Mountain Trekking",
                "Food Tours",
                "Photography",
                "Spiritual/Religious",
                "Nightlife",
              ].map((activity) => (
                <div key={activity} className="flex items-center space-x-2">
                  <Checkbox
                    id={activity}
                    checked={activities.includes(activity)}
                    onCheckedChange={(checked) => handleActivityChange(activity, checked as boolean)}
                  />
                  <Label htmlFor={activity} className="text-sm text-gray-700">
                    {activity}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="travelers" className="text-gray-700">Number of Travelers</Label>
            <Select>
              <SelectTrigger className="bg-white border-gray-300">
                <SelectValue placeholder="Select number of travelers" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "Traveler" : "Travelers"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additional" className="text-gray-700">Additional Requirements</Label>
            <Textarea
              id="additional"
              placeholder="Any special requirements, dietary restrictions, accessibility needs, etc."
              className="bg-white border-gray-300"
              rows={4}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-lg py-6 shadow-lg"
          >
            Submit Custom Tour Request
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
