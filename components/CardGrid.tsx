"use client"
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'

type GridItem = { title: string; sub?: string; image: string }

export function CardGrid({ title, items }: { title: string; items: GridItem[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    dragFree: true, 
    align: 'start',
    containScroll: 'trimSnaps'
  })
  const [index, setIndex] = useState(0)
  
  const next = useCallback(() => {
    if (emblaApi?.canScrollNext()) {
      emblaApi.scrollNext()
    }
  }, [emblaApi])
  
  const prev = useCallback(() => {
    if (emblaApi?.canScrollPrev()) {
      emblaApi.scrollPrev()
    }
  }, [emblaApi])
  
  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }, [emblaApi])
  
  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi])
  return (
    <section className="container py-6">
      <div className="flex items-center gap-3 mb-5">
        <h3 className="text-lg md:text-xl font-bold gradient-text">{title}</h3>
        <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {items.map((i, idx) => (
            <div key={idx} className="min-w-[45%] sm:min-w-[30%] md:min-w-[22%] lg:min-w-[19%] rounded-xl overflow-hidden ring-1 ring-border bg-complimentary card-hover group">
              <div className="relative aspect-[2/3] overflow-hidden">
                <Image src={i.image} alt={i.title} fill className="object-cover card-image" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded-md">
                    New
                  </span>
                </div>
              </div>
              <div className="p-3 space-y-1">
                <div className="text-sm font-medium truncate group-hover:text-cyan-300 transition-colors duration-300">{i.title}</div>
                {i.sub && <div className="text-xs opacity-70">{i.sub}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-center gap-3">
        <button aria-label="Prev" onClick={prev} className="text-foreground/70 hover:text-foreground">
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6l6 6z"/></svg>
        </button>
        <div className="flex items-center gap-2">
          {items.slice(0, 5).map((_, i) => (
            <button 
              key={i} 
              onClick={() => scrollTo(i)}
              className={`h-2 w-2 rounded-full transition-all duration-300 hover:scale-125 ${
                i === index ? 'bg-foreground/90' : 'bg-foreground/40 hover:bg-foreground/60'
              }`} 
            />
          ))}
        </div>
        <button aria-label="Next" onClick={next} className="text-foreground/70 hover:text-foreground">
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="m8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6z"/></svg>
        </button>
      </div>
    </section>
  )
}


