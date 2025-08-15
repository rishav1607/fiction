'use client'
import Image from 'next/image'
import { useState } from 'react'

interface LazyImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
  quality?: number
}

export function LazyImage({ src, alt, className, ...props }: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-complimentary/50 shimmer animate-pulse" />
      )}
      
      {error ? (
        <div className="absolute inset-0 bg-complimentary/30 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" className="text-foreground/40">
            <path fill="currentColor" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
          </svg>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false)
            setError(true)
          }}
          {...props}
        />
      )}
    </div>
  )
}