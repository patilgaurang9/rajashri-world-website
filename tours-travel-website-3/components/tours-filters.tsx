"use client"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


export function ToursFilters({ onApply }: { onApply?: (filters: { minPrice: number, maxPrice: number, duration: string, startDate?: string, endDate?: string }) => void }) {
  const [priceRange, setPriceRange] = useState([0, 500000])
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [duration, setDuration] = useState("")

  const handleReset = () => {
    setPriceRange([0, 500000]);
    setStartDate("");
    setEndDate("");
    setDuration("");
    onApply?.({ minPrice: 0, maxPrice: 500000, duration: "", startDate: "", endDate: "" });
  };

  // Format Indian Rupees with commas
  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="w-full">
      {/* Main Filters Container */}
      <div className="bg-white border border-gray-300 rounded-2xl shadow-none p-5 sm:p-6">
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-gray-900">Filter</h3>
        </div>
        
        <div className="space-y-5">
          {/* Price Range */}
          <div className="w-full">
            <Label className="text-sm font-medium text-gray-700 mb-3 block">Price Range (₹)</Label>
            <div className="space-y-4">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={0}
                max={500000}
                step={5000}
                className="w-full [&_[role=slider]]:bg-black [&_[data-slot=slider-range]]:bg-black [&_[data-slot=slider-track]]:bg-gray-200"
              />
              <div className="flex items-center justify-between text-sm font-medium">
                <span className="bg-white border border-gray-300 rounded-full px-3 py-1 text-gray-800">₹{formatINR(priceRange[0])}</span>
                <span className="text-gray-400">to</span>
                <span className="bg-white border border-gray-300 rounded-full px-3 py-1 text-gray-800">₹{formatINR(priceRange[1])}</span>
              </div>
            </div>
          </div>

          {/* Date Range */}
          <div className="w-full">
            <Label className="text-sm font-medium text-gray-700 mb-3 block">Date Range</Label>
            <div className="grid grid-cols-2 gap-4 min-w-0">
              <div className="space-y-1">
                <Label className="text-xs text-gray-500">Start</Label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-white border-gray-300 rounded-full h-11 px-3 text-sm min-w-0"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-gray-500">End</Label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-white border-gray-300 rounded-full h-11 px-3 text-sm min-w-0"
                />
              </div>
            </div>
          </div>
          
          {/* Duration */}
          <div className="w-full">
            <Label className="text-sm font-medium text-gray-700 mb-3 block">Duration</Label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full h-11 px-4 bg-white border border-gray-300 rounded-full text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent appearance-none cursor-pointer"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
            >
              <option value="">Any duration</option>
              <option value="1-3">1–3 days</option>
              <option value="4-7">4–7 days</option>
              <option value="8-14">8–14 days</option>
              <option value="15+">15+ days</option>
            </select>
          </div>

          {/* Apply Button */}
          <div className="w-full pt-2 flex flex-row gap-3">
            <Button
              className="h-11 px-6 bg-black hover:bg-black/90 text-white rounded-full font-medium text-sm shadow-none transition-all flex-1"
              type="button"
              onClick={() => onApply?.({ minPrice: priceRange[0], maxPrice: priceRange[1], duration, startDate, endDate })}
            >
              Apply
            </Button>
            <Button
              className="h-11 px-4 bg-white hover:bg-gray-50 text-black border border-black rounded-full font-medium text-sm shadow-none transition-all flex-1"
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