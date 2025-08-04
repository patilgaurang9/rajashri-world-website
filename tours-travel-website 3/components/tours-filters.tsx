"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

export function ToursFilters() {
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [duration, setDuration] = useState("")
  const [destination, setDestination] = useState("")
  const [activities, setActivities] = useState<string[]>([])

  const handleActivityChange = (activity: string, checked: boolean) => {
    if (checked) {
      setActivities([...activities, activity])
    } else {
      setActivities(activities.filter((a) => a !== activity))
    }
  }

  return (
    <Card className="bg-white border-gray-200 shadow-lg sticky top-24">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">Filter Tours</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Range */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">Price Range</Label>
          <Slider value={priceRange} onValueChange={setPriceRange} max={5000} step={100} className="w-full" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        {/* Duration */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">Duration</Label>
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger className="bg-white border-gray-300">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-3">1-3 days</SelectItem>
              <SelectItem value="4-7">4-7 days</SelectItem>
              <SelectItem value="8-14">8-14 days</SelectItem>
              <SelectItem value="15+">15+ days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Destination */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">Destination</Label>
          <Select value={destination} onValueChange={setDestination}>
            <SelectTrigger className="bg-white border-gray-300">
              <SelectValue placeholder="Select destination" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asia">Asia</SelectItem>
              <SelectItem value="europe">Europe</SelectItem>
              <SelectItem value="america">America</SelectItem>
              <SelectItem value="africa">Africa</SelectItem>
              <SelectItem value="oceania">Oceania</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Activities */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">Activities</Label>
          <div className="space-y-2">
            {["Adventure", "Cultural", "Family", "Religious", "Wildlife", "Beach"].map((activity) => (
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

        <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg">
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  )
}
