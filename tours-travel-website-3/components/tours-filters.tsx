"use client"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { DollarSign, Clock, MapPin, Grid3x3 } from "lucide-react"

export function ToursFilters() {
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [duration, setDuration] = useState("")
  const [destination, setDestination] = useState("")

  return (
    <div className="w-full">
      {/* Main Filters Row */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg px-3 py-3 sm:px-4 sm:py-4">
        <div className="flex flex-wrap gap-4 md:gap-6 items-end">
          {/* Price Range */}
          <div className="w-full sm:w-auto min-w-[160px] flex-1">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-gray-500" />
              <Label className="text-xs font-medium text-gray-700">Price Range</Label>
            </div>
            <div className="space-y-2">
              <Slider 
                value={priceRange} 
                onValueChange={setPriceRange} 
                max={5000} 
                step={100} 
                className="w-full"
              />
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                  className="w-14 px-2 py-1 text-xs border border-gray-200 rounded-lg text-center"
                  placeholder="0"
                />
                <span className="text-xs text-gray-400">-</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 5000])}
                  className="w-14 px-2 py-1 text-xs border border-gray-200 rounded-lg text-center"
                  placeholder="5000"
                />
              </div>
            </div>
          </div>

          {/* Duration */}
          <div className="w-full sm:w-auto min-w-[120px] flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <Label className="text-xs font-medium text-gray-700">Duration</Label>
            </div>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger className="bg-gray-50/50 border-gray-200 rounded-xl h-9 text-sm w-full">
                <SelectValue placeholder="Any duration" />
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
          <div className="w-full sm:w-auto min-w-[120px] flex-1">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <Label className="text-xs font-medium text-gray-700">Destination</Label>
            </div>
            <Select value={destination} onValueChange={setDestination}>
              <SelectTrigger className="bg-gray-50/50 border-gray-200 rounded-xl h-9 text-sm w-full">
                <SelectValue placeholder="Any destination" />
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

          {/* Apply Button */}
          <div className="w-full sm:w-auto flex justify-end">
            <Button className="h-9 px-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl font-medium text-sm shadow-lg hover:shadow-xl transition-all whitespace-nowrap w-full sm:w-auto mt-2 sm:mt-0">
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}