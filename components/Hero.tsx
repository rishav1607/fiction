"use client"
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { useEffect, useState, useCallback } from 'react'

type Slide = { image: string; alt?: string }

export function Hero({ slides }: { slides: Slide[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    dragFree: false, 
    align: 'start'
  })
  const [index, setIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  
  const next = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])
  
  const prev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])
  
  const scrollTo = useCallback((i: number) => {
    emblaApi?.scrollTo(i)
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi])

  // Auto-play functionality
  useEffect(() => {
    if (!emblaApi || !isAutoPlaying || slides.length <= 1) return
    
    const interval = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext()
      } else {
        emblaApi.scrollTo(0)
      }
    }, 5000)
    
    return () => clearInterval(interval)
  }, [emblaApi, isAutoPlaying, slides.length])

  return (
    <div className="container py-6">
      <div className="relative rounded-3xl overflow-hidden ring-1 ring-border/50 shadow-2xl shadow-black/20 fade-in">
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none" />
        
        <div 
          className="overflow-hidden embla" 
          ref={emblaRef}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="flex embla__container">
            {slides.map((s, i) => (
              <div 
                className="relative min-w-0 flex-[0_0_100%] group" 
                key={i} 
                style={{ paddingTop: '30%' }}
              >
                <Image 
                  src={s.image} 
                  alt={s.alt ?? ''} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  priority={i === 0} 
                  quality={90}
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Enhanced controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20">
          <button 
            onClick={prev} 
            aria-label="Previous" 
            className="group grid place-content-center w-12 h-12 rounded-full ring-2 ring-white/30 text-white/90 hover:text-white hover:ring-white/60 bg-black/40 hover:bg-black/60 backdrop-blur-sm transition-all duration-300 hover:scale-110"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" className="transition-transform group-hover:-translate-x-0.5">
              <path fill="currentColor" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6l6 6z"/>
            </svg>
          </button>
          
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === index 
                    ? 'w-8 h-3 bg-white shadow-lg shadow-white/30' 
                    : 'w-3 h-3 bg-white/50 hover:bg-white/70 hover:scale-125'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          
          <button 
            onClick={next} 
            aria-label="Next" 
            className="group grid place-content-center w-12 h-12 rounded-full ring-2 ring-white/30 text-white/90 hover:text-white hover:ring-white/60 bg-black/40 hover:bg-black/60 backdrop-blur-sm transition-all duration-300 hover:scale-110"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" className="transition-transform group-hover:translate-x-0.5">
              <path fill="currentColor" d="m8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6z"/>
            </svg>
          </button>
        </div>
        
        {/* Auto-play indicator */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="p-2 rounded-full bg-black/40 backdrop-blur-sm text-white/80 hover:text-white transition-all duration-300 hover:scale-110"
            aria-label={isAutoPlaying ? 'Pause autoplay' : 'Resume autoplay'}
          >
            {isAutoPlaying ? (
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="currentColor" d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="currentColor" d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}