'use client'
import { useEffect, useCallback, useState } from 'react'

export function usePerformanceMonitor(componentName: string) {
  const measureRender = useCallback(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const start = performance.now()
      
      return () => {
        const end = performance.now()
        const duration = end - start
        
        if (duration > 16) { // More than 1 frame at 60fps
          console.warn(`${componentName} took ${duration.toFixed(2)}ms to render`)
        }
      }
    }
    return () => {}
  }, [componentName])

  return { measureRender }
}

export function useIntersectionObserver(
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
    }, options)

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [ref, options])

  return isVisible
}