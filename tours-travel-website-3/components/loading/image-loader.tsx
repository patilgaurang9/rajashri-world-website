"use client"

import { useState } from "react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"

interface ImageLoaderProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fill?: boolean
  priority?: boolean
}

export function ImageLoader({
  src,
  alt,
  width,
  height,
  className = "",
  fill = false,
  priority = false,
}: ImageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <Skeleton className={`absolute inset-0 rounded-xl ${fill ? "w-full h-full" : `w-[${width}px] h-[${height}px]`}`} />
      )}

      {!hasError ? (
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          priority={priority}
          className={`transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"} ${className}`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false)
            setHasError(true)
          }}
        />
      ) : (
        <div
          className={`bg-slate-700/50 flex items-center justify-center rounded-xl ${fill ? "absolute inset-0" : `w-[${width}px] h-[${height}px]`}`}
        >
          <span className="text-gray-400 text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  )
}
