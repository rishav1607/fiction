"use client"
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { useEffect, useState, useCallback } from 'react'

type HeroSlide = { 
  image: string
  title: string
  genres: string[]
  status: 'Hot' | 'New' | 'Popular' | 'Trending'
  statusColor: string
  href?: string
}

function HeroCard({ slide, isActive }: { slide: HeroSlide; isActive: boolean }) {
  const getStatusBadge = (status: string, color: string) => {
    const colors = {
      'Hot': 'bg-gradient-to-r from-red-500 to-red-600',
      'New': 'bg-gradient-to-r from-green-500 to-green-600', 
      'Popular': 'bg-gradient-to-r from-blue-500 to-blue-600',
      'Trending': 'bg-gradient-to-r from-purple-500 to-purple-600'
    }
    
    return colors[status as keyof typeof colors] || 'bg-gradient-to-r from-cyan-500 to-cyan-600'
  }

  return (
    <div className={`relative group transition-all duration-700 ease-out transform-gpu ${
      isActive ? 'scale-100 z-10' : 'scale-95 z-5'
    }`}>
      
      {/* Main Card Container */}
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
        
        {/* Background Image */}
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          className={`object-cover transition-all duration-1000 ease-out ${
            isActive ? 'scale-100' : 'scale-110'
          } group-hover:scale-105`}
          priority={isActive}
          quality={95}
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <div className={`${getStatusBadge(slide.status, slide.statusColor)} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg`}>
            {slide.status}
          </div>
        </div>
        
        {/* Content */}
        <div className="absolute bottom-6 left-6 right-6 space-y-4">
          
          {/* Title */}
          <h2 className={`text-white font-bold transition-all duration-500 ${
            isActive ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-xl md:text-2xl lg:text-3xl'
          }`}>
            <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent drop-shadow-lg">
              {slide.title}
            </span>
          </h2>
          
          {/* Genre Tags */}
          <div className="flex flex-wrap gap-2">
            {slide.genres.map((genre, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs font-medium text-white/90 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                {genre}
              </span>
            ))}
          </div>
          
          {/* Read Button */}
          <button className={`group/btn bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
            isActive ? 'opacity-100 translate-y-0' : 'opacity-80 translate-y-2'
          }`}>
            <span className="flex items-center gap-2">
              Read Now
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                className="transition-transform duration-300 group-hover/btn:translate-x-1"
              >
                <path fill="currentColor" d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6z"/>
              </svg>
            </span>
          </button>
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  )
}

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    skipSnaps: false,
    dragFree: false,
    containScroll: 'trimSnaps'
  })
  
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  
  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }, [emblaApi])
  
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])
  
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on('select', onSelect)
    onSelect()

    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi])

  // Auto-play functionality
  useEffect(() => {
    if (!emblaApi || !isAutoPlaying) return

    const interval = setInterval(() => {
      scrollNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [emblaApi, isAutoPlaying, scrollNext])

  return (
    <section className="relative w-full bg-gradient-to-br from-background via-background to-complimentary/20 py-8">
      <div className="container">
        
        {/* Embla Container */}
        <div 
          className="overflow-hidden rounded-3xl"
          ref={emblaRef}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="flex ml-4">
            {slides.map((slide, index) => (
              <div
                key={index}
                className="flex-[0_0_85%] md:flex-[0_0_70%] lg:flex-[0_0_60%] xl:flex-[0_0_50%] pl-4"
              >
                <HeroCard 
                  slide={slide} 
                  isActive={index === selectedIndex}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center mt-8 gap-6">
          
          {/* Previous Button */}
          <button
            onClick={scrollPrev}
            className="group p-3 rounded-full bg-complimentary/50 hover:bg-complimentary/80 backdrop-blur-sm border border-border/50 hover:border-cyan-300/50 transition-all duration-300 hover:scale-110"
            aria-label="Previous slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" className="text-foreground/70 group-hover:text-cyan-300 transition-colors duration-300 transform group-hover:-translate-x-0.5">
              <path fill="currentColor" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6l6 6z"/>
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-complimentary/30 backdrop-blur-sm border border-border/30">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === selectedIndex
                    ? 'w-8 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/30'
                    : 'w-3 h-3 bg-foreground/30 hover:bg-foreground/50 hover:scale-125'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={scrollNext}
            className="group p-3 rounded-full bg-complimentary/50 hover:bg-complimentary/80 backdrop-blur-sm border border-border/50 hover:border-cyan-300/50 transition-all duration-300 hover:scale-110"
            aria-label="Next slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" className="text-foreground/70 group-hover:text-cyan-300 transition-colors duration-300 transform group-hover:translate-x-0.5">
              <path fill="currentColor" d="m8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6z"/>
            </svg>
          </button>
        </div>

        {/* Auto-play Toggle */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="group flex items-center gap-2 px-4 py-2 text-sm text-foreground/60 hover:text-foreground transition-colors duration-300"
            aria-label={isAutoPlaying ? 'Pause autoplay' : 'Resume autoplay'}
          >
            {isAutoPlaying ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" className="group-hover:scale-110 transition-transform duration-300">
                  <path fill="currentColor" d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
                Auto-playing
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" className="group-hover:scale-110 transition-transform duration-300">
                  <path fill="currentColor" d="M8 5v14l11-7z"/>
                </svg>
                Click to auto-play
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  )
}