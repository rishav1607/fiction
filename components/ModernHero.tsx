"use client"
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

type HeroSlide = {
  image: string
  title: string
  genres: string[]
  status: 'Hot' | 'New' | 'Popular' | 'Trending'
  statusColor: string
  href?: string
}

function HeroCard({ slide, isActive }: { slide: HeroSlide; isActive: boolean }) {
  const statusConfig = {
    'Hot': { bg: 'bg-gradient-to-r from-rose-500 to-pink-500', glow: 'shadow-rose-500/25' },
    'New': { bg: 'bg-gradient-to-r from-emerald-500 to-teal-500', glow: 'shadow-emerald-500/25' },
    'Popular': { bg: 'bg-gradient-to-r from-blue-500 to-indigo-500', glow: 'shadow-blue-500/25' },
    'Trending': { bg: 'bg-gradient-to-r from-violet-500 to-purple-500', glow: 'shadow-violet-500/25' }
  }

  const config = statusConfig[slide.status]

  return (
    <div className={`group relative transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
      isActive 
        ? 'scale-100 z-20 opacity-100' 
        : 'scale-[0.85] z-10 opacity-60 hover:opacity-80 hover:scale-90'
    }`}>
      
      {/* Card Container */}
      <div className="relative h-[500px] w-full rounded-2xl overflow-hidden ring-1 ring-border shadow-2xl shadow-black/20 bg-complimentary/60 hover:ring-cyan-300/50 transition-all duration-500">
        
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className={`object-cover transition-all duration-1000 ease-out group-hover:scale-110 ${
              isActive ? 'scale-105' : 'scale-100'
            }`}
            priority={isActive}
            quality={100}
          />
          {/* Site-consistent gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-6 left-6 flex items-center gap-3 z-10">
          {/* Status Badge */}
          <div className={`${config.bg} text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg`}>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              {slide.status}
            </span>
          </div>
          
          {/* Rating Stars */}
          <div className="flex items-center gap-1 px-3 py-2 bg-complimentary/70 rounded-full ring-1 ring-border">
            {[1,2,3,4,5].map(i => (
              <svg key={i} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-foreground/90 text-xs font-medium ml-1">4.9</span>
          </div>
        </div>

        {/* Content Area */}
        <div className={`absolute bottom-0 left-0 right-0 p-8 transition-all duration-500 ${
          isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-90'
        }`}>
          
          {/* Title with Sexy Typography */}
          <h2 className={`text-white font-black mb-4 transition-all duration-500 ${
            isActive 
              ? 'text-2xl md:text-3xl xl:text-4xl' 
              : 'text-xl md:text-2xl xl:text-3xl'
          }`}>
            <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent drop-shadow-2xl leading-tight">
              {slide.title}
            </span>
          </h2>
          
          {/* Genre Pills with Cute Animations */}
          <div className="flex flex-wrap gap-2 mb-4">
            {slide.genres.map((genre, i) => (
              <span
                key={i}
                className="group/pill px-2.5 py-1 bg-complimentary/70 ring-1 ring-border/50 text-foreground/90 text-xs font-medium rounded-full hover:bg-cyan-300/20 hover:ring-cyan-300/50 transition-all duration-300 cursor-default"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className="flex items-center gap-1.5">
                  <div className="w-1 h-1 bg-cyan-400 rounded-full group-hover/pill:animate-pulse" />
                  {genre}
                </span>
              </span>
            ))}
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Primary CTA */}
            <button className={`group/btn relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
              isActive ? 'opacity-100 translate-x-0' : 'opacity-80 translate-x-2'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
              <span className="relative flex items-center gap-2 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Read Now
                <svg className="w-3 h-3 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
            
            {/* Secondary Action */}
            <button className="group/fav p-3 bg-complimentary/50 hover:bg-complimentary/80 text-foreground rounded-xl ring-1 ring-border hover:ring-cyan-300/50 transition-all duration-300 hover:scale-110">
              <svg className="w-4 h-4 group-hover/fav:fill-red-400 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Subtle Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-300/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
      </div>
    </div>
  )
}

export function ModernHero({ slides }: { slides: HeroSlide[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
    dragFree: false,
    containScroll: 'trimSnaps'
  })

  const [selectedIndex, setSelectedIndex] = useState(0)

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

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()

    return () => emblaApi.off('select', onSelect)
  }, [emblaApi])


  return (
    <section className="container py-6">

      <div className="relative pb-8">

        {/* Carousel */}
        <div
          className="overflow-hidden"
          ref={emblaRef}
        >
          <div className="flex gap-8 px-4">
            {slides.map((slide, index) => (
              <div
                key={index}
                className="flex-[0_0_90%] md:flex-[0_0_70%] lg:flex-[0_0_50%] xl:flex-[0_0_40%]"
              >
                <HeroCard slide={slide} isActive={index === selectedIndex} />
              </div>
            ))}
          </div>
        </div>

        {/* Dots Navigation - Positioned to avoid cutting banner */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                i === selectedIndex ? 'bg-foreground/90' : 'bg-foreground/40 hover:bg-foreground/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}