"use client"
import Image from 'next/image'
import { memo } from 'react'

type TopSeriesItem = { 
  rank: number
  title: string
  genres: string[]
  image: string
  href?: string
}

const TopSeriesCard = memo(function TopSeriesCard({ item, index }: { item: TopSeriesItem; index: number }) {
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'from-yellow-400 to-amber-500'
      case 2: return 'from-gray-300 to-gray-400'
      case 3: return 'from-amber-600 to-orange-500'
      default: return 'from-cyan-300 to-cyan-400'
    }
  }
  
  return (
    <div className={`stagger-item group flex items-center gap-4 p-3 rounded-xl hover:bg-complimentary/30 transition-all duration-300`} 
         style={{ animationDelay: `${index * 0.1}s` }}>
      
      {/* Rank Number */}
      <div className={`text-4xl md:text-5xl font-black bg-gradient-to-b ${getRankColor(item.rank)} bg-clip-text text-transparent select-none min-w-[3rem] text-center`}>
        {item.rank}
      </div>
      
      {/* Book Cover */}
      <div className="relative w-16 h-20 md:w-20 md:h-24 rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 flex-shrink-0">
        <Image 
          src={item.image} 
          alt={item.title} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0 space-y-2">
        <h3 className="text-base md:text-lg font-semibold text-foreground group-hover:text-cyan-300 transition-colors duration-300 line-clamp-2">
          {item.title}
        </h3>
        
        {/* Genre Tags */}
        <div className="flex flex-wrap gap-1.5">
          {item.genres.map((genre, i) => (
            <span 
              key={i} 
              className="px-2 py-0.5 text-xs font-medium rounded-md bg-complimentary/70 ring-1 ring-border/50 text-foreground/80 hover:bg-cyan-300/20 hover:ring-cyan-300/50 transition-all duration-300"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
})

export function TopSeries({ items, title = "Top Series" }: { items: TopSeriesItem[]; title?: string }) {
  // Split items into 3 columns for larger screens
  const leftColumn = items.slice(0, 3)
  const middleColumn = items.slice(3, 6) 
  const rightColumn = items.slice(6, 9)

  return (
    <section className="container py-8">
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold gradient-text">{title}</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
        <svg width="24" height="24" viewBox="0 0 24 24" className="text-cyan-400 animate-pulse">
          <path fill="currentColor" d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z"/>
        </svg>
      </div>

      {/* Desktop: 3-column grid */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-8">
        <div className="space-y-4">
          {leftColumn.map((item, idx) => (
            <TopSeriesCard key={item.rank} item={item} index={idx} />
          ))}
        </div>
        <div className="space-y-4">
          {middleColumn.map((item, idx) => (
            <TopSeriesCard key={item.rank} item={item} index={idx + 3} />
          ))}
        </div>
        <div className="space-y-4">
          {rightColumn.map((item, idx) => (
            <TopSeriesCard key={item.rank} item={item} index={idx + 6} />
          ))}
        </div>
      </div>

      {/* Tablet: 2-column grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:hidden gap-6">
        <div className="space-y-4">
          {items.filter((_, i) => i % 2 === 0).map((item, idx) => (
            <TopSeriesCard key={item.rank} item={item} index={idx * 2} />
          ))}
        </div>
        <div className="space-y-4">
          {items.filter((_, i) => i % 2 === 1).map((item, idx) => (
            <TopSeriesCard key={item.rank} item={item} index={idx * 2 + 1} />
          ))}
        </div>
      </div>

      {/* Mobile: Single column */}
      <div className="md:hidden space-y-4">
        {items.map((item, idx) => (
          <TopSeriesCard key={item.rank} item={item} index={idx} />
        ))}
      </div>
    </section>
  )
}