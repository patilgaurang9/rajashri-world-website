"use client"

import { Plane } from "lucide-react"

export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative mb-8 flex items-center justify-center">
          <div className="relative w-44 h-44 animate-[spin_2.8s_linear_infinite]">
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
              <path
                d="M30 55 A70 70 0 1 1 170 55"
                fill="none"
                stroke="rgba(0,0,0,0.85)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="1 14"
              />
            </svg>

            <div className="absolute left-[24px] top-[44px] -translate-x-1/2 -translate-y-1/2">
              <Plane className="h-10 w-10 text-black" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-black">
            Rajashri World
          </h2>
          <p className="text-gray-600 animate-pulse">Loading your adventure...</p>
        </div>
      </div>
    </div>
  )
}
