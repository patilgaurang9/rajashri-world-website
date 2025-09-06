"use client"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { IndianRupee, Clock, Filter } from "lucide-react"


export function ToursFilters({ onApply }: { onApply?: (filters: { minPrice: number, maxPrice: number, duration: string }) => void }) {
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [duration, setDuration] = useState("")

  const handleReset = () => {
    setPriceRange([0, 500000]);
    setDuration("");
    onApply?.({ minPrice: 0, maxPrice: 500000, duration: "" });
  };

  // Format Indian Rupees with commas
  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Main Filters Container */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          {/* <Filter className="w-5 h-5 text-orange-500" /> */}
          <h3 className="text-lg font-semibold">Filter</h3>
        </div>
        
        <div className="space-y-6">
          {/* Price Range */}
          <div className="w-full">
            <div className="flex items-center gap-2 mb-3">
              {/* <IndianRupee className="w-4 h-4 text-gray-500" /> */}
              <Label className="text-sm font-medium text-gray-700">Price Range (₹)</Label>
            </div>
            <div className="space-y-4">
              <Slider 
                value={priceRange} 
                onValueChange={setPriceRange} 
                min={0}
                max={100000} 
                step={1000} 
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm font-medium bg-gray-50 p-2 rounded-md">
                <span className="bg-white border border-gray-200 rounded-md px-3 py-1">₹{formatINR(priceRange[0])}</span>
                <span className="text-gray-400">to</span>
                <span className="bg-white border border-gray-200 rounded-md px-3 py-1">₹{formatINR(priceRange[1])}+</span>
              </div>
            </div>
          </div>
          
          {/* Duration */}
          <div className="w-full">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-gray-500" />
              <Label className="text-sm font-medium text-gray-700">Duration</Label>
            </div>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger className="bg-gray-50/50 border-gray-200 rounded-md h-11 text-sm w-full">
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

          {/* Apply Button */}
          <div className="w-full pt-2 flex gap-2">
            <Button
              className="h-11 px-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-md font-medium text-sm shadow-md hover:shadow-lg transition-all w-full"
              type="button"
              onClick={() => onApply?.({ minPrice: priceRange[0], maxPrice: priceRange[1], duration })}
            >
              Apply Filters
            </Button>
            <Button
              className="h-11 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md font-medium text-sm shadow-md hover:shadow-lg transition-all"
              type="button"
              variant="outline"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}