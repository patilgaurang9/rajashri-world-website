"use client"

import { MapPin } from "lucide-react"

export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center animate-pulse">
            <MapPin className="h-10 w-10 text-white animate-bounce" />
          </div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-orange-400/30 rounded-full animate-spin border-t-orange-400"></div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Wanderlust Tours
          </h2>
          <p className="text-gray-600 animate-pulse">Loading your adventure...</p>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center space-x-2 mt-6">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  )
}
