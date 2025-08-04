import { useEffect, useRef, useCallback, useState } from 'react'

interface PerformanceMetrics {
  loadTime: number
  renderTime: number
  memoryUsage?: number
}

export function usePerformance(componentName: string) {
  const startTime = useRef<number>(Date.now())
  const renderStartTime = useRef<number>(0)

  const measureRender = useCallback(() => {
    renderStartTime.current = performance.now()
  }, [])

  const endRender = useCallback(() => {
    const renderTime = performance.now() - renderStartTime.current
    console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`)
  }, [componentName])

  useEffect(() => {
    const loadTime = Date.now() - startTime.current
    console.log(`${componentName} load time: ${loadTime}ms`)

    // Measure memory usage if available
    if ('memory' in performance) {
      const memory = (performance as any).memory
      console.log(`${componentName} memory usage: ${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`)
    }
  }, [componentName])

  return { measureRender, endRender }
}

export function useIntersectionObserver(
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
) {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: '50px',
      threshold: 0.1,
      ...options,
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [callback, options])

  const observe = useCallback((element: Element) => {
    if (observerRef.current) {
      observerRef.current.observe(element)
    }
  }, [])

  const unobserve = useCallback((element: Element) => {
    if (observerRef.current) {
      observerRef.current.unobserve(element)
    }
  }, [])

  return { observe, unobserve }
}

export function useLazyLoad<T>(data: T[], itemsPerPage: number = 10) {
  const [visibleItems, setVisibleItems] = useState<T[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const endIndex = page * itemsPerPage
    const newItems = data.slice(0, endIndex)
    setVisibleItems(newItems)
    setHasMore(endIndex < data.length)
  }, [data, page, itemsPerPage])

  const loadMore = useCallback(() => {
    if (hasMore) {
      setPage(prev => prev + 1)
    }
  }, [hasMore])

  return { visibleItems, hasMore, loadMore }
} 