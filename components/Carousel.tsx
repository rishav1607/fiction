"use client"
import Image from 'next/image'
import Link from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'

type Card = {
  href: string
  image: string
  title: string
  synopsis: string
}

export function Carousel({ items, headingId, labelledBy }: { items: Card[]; headingId: string; labelledBy?: string }) {
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
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi])

  return (
    <section aria-labelledby={headingId} className="bg-complimentary/30 rounded-2xl">
      <div className="p-4">
        <h2 id={headingId} className="sr-only">Top Novels</h2>
        <div className="relative" role="region" aria-roledescription="carousel">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {items.map((it, idx) => (
                <div key={idx} role="group" aria-roledescription="slide" className="min-w-0 shrink-0 grow-0 basis-[85%] sm:basis-2/3 md:basis-1/2 pl-4">
                  <div className="text-card-foreground rounded-xl border border-none shadow-none bg-transparent">
                    <Link className="flex w-full h-full group card-hover p-3 rounded-xl hover:bg-complimentary/30 transition-all duration-300" href={it.href}>
                      <div className="w-2/5 lg:w-1/4 aspect-[2/3] max-h-[250px] overflow-hidden rounded-xl">
                        <Image 
                          className="aspect-[2/3] rounded-xl shadow-lg object-cover w-full h-full card-image" 
                          src={it.image} 
                          alt={it.title} 
                          width={200} 
                          height={300} 
                        />
                      </div>
                      <div className="w-2/3 pl-4 py-2 flex flex-col overflow-hidden">
                        <h3 className="!leading-snug lg:text-lg font-semibold text-sm text-foreground/90 group-hover:text-cyan-300 transition-colors duration-300 mb-2">
                          {it.title}
                        </h3>
                        <div className="bg-gradient-to-r from-border to-transparent shrink-0 h-[1px] w-full my-2" />
                        <div className="overflow-hidden flex-1 relative">
                          <p className="font-light text-xs lg:text-sm line-clamp-4 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                            {it.synopsis}
                          </p>
                          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-complimentary/80 from-40% via-complimentary/30 to-transparent z-10 group-hover:opacity-50 transition-opacity duration-300" />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-2 flex items-center justify-center gap-3">
            <button aria-label="Prev" onClick={prev} className="text-foreground/70 hover:text-foreground">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6l6 6z"/></svg>
            </button>
            <div className="flex items-center gap-2">
              {items.map((_, i) => (
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
        </div>
      </div>
    </section>
  )
}


