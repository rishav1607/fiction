"use client"
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState, memo } from 'react'

type RankedItem = { rank: number; title: string; genres?: string; image: string }

function GenreChips({ value }: { value?: string }) {
  if (!value) return null
  const parts = value.split('·').map((s) => s.trim()).filter(Boolean)
  return (
    <div className="flex flex-wrap gap-1.5">
      {parts.map((p, i) => (
        <span key={i} className="px-2.5 py-1 rounded-full bg-complimentary/70 ring-1 ring-border/50 text-[11px] font-medium tracking-wide hover:bg-cyan-300/20 hover:ring-cyan-300/50 transition-all duration-300 cursor-default">
          {p}
        </span>
      ))}
    </div>
  )
}

const PopularRow = memo(function PopularRow({ item, index }: { item: RankedItem; index: number }) {
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'from-yellow-400 to-amber-500'
      case 2: return 'from-gray-400 to-gray-500'
      case 3: return 'from-amber-600 to-orange-500'
      default: return 'from-cyan-300 to-cyan-400'
    }
  }
  
  return (
    <div className={`stagger-item group relative grid grid-cols-[auto_auto_1fr] items-center gap-4 rounded-xl bg-complimentary/60 ring-1 ring-border p-4 hover:ring-cyan-300/50 hover:bg-complimentary/80 transition-all duration-300 card-hover`}>
      <div className={`text-3xl md:text-4xl font-extrabold bg-gradient-to-b ${getRankColor(item.rank)} bg-clip-text text-transparent select-none w-8 text-right floating`} style={{ animationDelay: `${index * 0.1}s` }}>
        {item.rank}
      </div>
      
      <div className="relative h-20 w-20 md:h-24 md:w-24 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
        <Image src={item.image} alt="" fill className="object-cover card-image" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {item.rank <= 3 && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-xs font-bold text-black animate-pulse">
            👑
          </div>
        )}
      </div>
      
      <div className="min-w-0 space-y-2">
        <div className="text-sm md:text-base font-semibold truncate group-hover:text-cyan-300 transition-colors duration-300">
          {item.title}
        </div>
        <GenreChips value={item.genres} />
      </div>
      
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
    </div>
  )
})

export function RankedList({ items, title }: { items: RankedItem[]; title: string }) {
  const pages = [items.slice(0, 6), items.slice(6, 12)].filter((g) => g.length)
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    dragFree: false, 
    containScroll: 'trimSnaps',
    loop: false
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
  
  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi])
  return (
    <section className="container py-8">
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-xl md:text-2xl font-bold gradient-text">{title}</h3>
        <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
        <svg width="20" height="20" viewBox="0 0 24 24" className="text-cyan-400 animate-pulse">
          <path fill="currentColor" d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z"/>
        </svg>
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {pages.map((group, p) => (
            <div key={p} className="min-w-0 flex-[0_0_100%]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-4">
                  {group.slice(0, 3).map((it, idx) => (
                    <PopularRow key={it.rank} item={it} index={idx} />
                  ))}
                </div>
                <div className="flex flex-col gap-4">
                  {group.slice(3, 6).map((it, idx) => (
                    <PopularRow key={it.rank} item={it} index={idx + 3} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-4">
        <button aria-label="Prev" onClick={prev} className="text-foreground/70 hover:text-foreground">
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6l6 6z"/></svg>
        </button>
        <div className="flex items-center gap-2">
          {pages.map((_, i) => (
            <span key={i} className={`h-2 w-2 rounded-full ${i === index ? 'bg-foreground/90' : 'bg-foreground/40'}`} />
          ))}
        </div>
        <button aria-label="Next" onClick={next} className="text-foreground/70 hover:text-foreground">
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="m8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6z"/></svg>
        </button>
      </div>
    </section>
  )
}


