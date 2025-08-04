"use client"

import { useEffect, useState } from 'react'
import { measurePerformance } from '@/lib/utils'

interface PerformanceMetrics {
  loadTime: number
  renderTime: number
  memoryUsage?: number
  networkSpeed?: number
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true)
      
      measurePerformance('Page Load', () => {
        const loadTime = performance.now()
        const memory = (performance as any).memory
        
        setMetrics({
          loadTime: Math.round(loadTime),
          renderTime: 0,
          memoryUsage: memory ? Math.round(memory.usedJSHeapSize / 1024 / 1024) : undefined,
          networkSpeed: navigator.connection ? (navigator.connection as any).effectiveType : undefined,
        })
      })
    }
  }, [])

  if (!isVisible || !metrics) return null

  return (
    <div className="fixed bottom-4 right-4 bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-lg p-4 text-xs text-white z-50">
      <div className="font-semibold mb-2">Performance Metrics</div>
      <div className="space-y-1">
        <div>Load Time: {metrics.loadTime}ms</div>
        {metrics.memoryUsage && (
          <div>Memory: {metrics.memoryUsage}MB</div>
        )}
        {metrics.networkSpeed && (
          <div>Network: {metrics.networkSpeed}</div>
        )}
      </div>
    </div>
  )
} 