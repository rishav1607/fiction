"use client"
import Image from 'next/image'
import { useState, useRef, useCallback, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

type Novel = {
  id: number
  title: string
  image: string
  subtitle: string
}

function NovelCard({ novel, isCenter }: { novel: Novel; isCenter: boolean }) {
  return (
    <div className={`group relative transition-all duration-700 ease-out ${
      isCenter 
        ? 'scale-105 z-20 opacity-100' 
        : 'scale-90 z-10 opacity-60'
    }`}>
      <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-black/20 shadow-2xl shadow-black/60">
        {/* Background Image */}
        <Image 
          src={novel.image} 
          alt={novel.title} 
          fill 
          className="object-cover" 
          sizes="300px"
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
        
        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-white font-bold text-xl mb-2 line-clamp-2 leading-tight">
            {novel.title}
          </h3>
          <p className="text-white/90 text-sm line-clamp-3 leading-relaxed">
            {novel.subtitle}
          </p>
          
          {/* Progress indicator */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-white/70 text-xs">
              5/25
            </div>
            <div className="w-12 h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="w-1/5 h-full bg-white/80 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function InfiniteNovelScroll() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
    dragFree: false,
    containScroll: 'trimSnaps'
  })
  
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [novels, setNovels] = useState<Novel[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const observerRef = useRef<HTMLDivElement>(null)

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi || novels.length === 0) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi, novels.length])

  // Generate sample novels data
  const generateNovels = useCallback((pageNum: number): Novel[] => {
    const images = [
      '/images/30303b75-4b13-4c26-a617-b0f12476c6b7.jpg',
      '/images/3b6c29f7-8941-44fc-8d3f-40d103a81237.png',
      '/images/0ac24b65-b00e-4afc-a4a3-fd4b3e779705.png',
      '/images/62d086d8-1fe1-4e6b-9fb0-d0e1ce6c9474.png',
      '/images/936d6213-b757-44f0-b549-1e6cc8ac1fcd.png',
      '/images/59900a54-f4d4-474a-9226-a535799917d1.png',
      '/images/caa3a43d-be9e-4218-881a-2f2f2ed7cf98.png',
      '/images/2a923bd1-12b4-423d-bd2f-99ca776427cd.png',
      '/images/7a4e2e14-1580-489e-9708-24adeb99fd6e.png',
      '/images/16e35353-3911-4620-91a8-ec6e9f25b03c.png'
    ]
    
    const titles = [
      'The S-Rank Tamer Is Good At Everything',
      'Shadow Empress of the Nine Realms', 
      'Cultivation Chat Chronicles',
      'The Villainess Wants to Live Quietly',
      'Demon Lord Academy Chronicles',
      'Regressor Instructor Manual',
      'Magic Academy Dropout',
      'The Strongest System User',
      'Isekai Business Strategy',
      'Dragon Slayer Academy',
      'Return of the Mount Hua Sect',
      'I Am The Fated Villain',
      'Breaking Through the Calamity',
      'Apocalypse Online',
      'The Betrayed Porter Dreams',
      'When My Friend Obsesses Over Me',
      'Holy Necromancer',
      'Lord of Mana',
      'Divorced Heavenly Demon',
      'The Greatest Warrior Returns'
    ]
    
    const subtitles = [
      'The S-class (Not Really) Tamer (Not Really) Who\'s Good at Everything (Except Taming)',
      'A mysterious empress rules over nine ancient realms filled with shadow magic and dark secrets',
      'When cultivation meets modern technology in the most unexpected ways you could imagine',
      'Sometimes the best way to survive in a dangerous world is to stay completely out of the spotlight', 
      'Welcome to the academy where demons learn to be proper lords and ladies of high society',
      'Your complete guide to surviving regression in a fantasy world setting with helpful tips',
      'What happens when the weakest student becomes the academy\'s greatest hope for salvation',
      'With great system power comes great responsibility and endless notification spam',
      'Building an empire one smart business decision at a time in another world setting',
      'Training the next generation of dragon slayers in a world that\'s full of dangerous dragons',
      'The legendary Mount Hua Sect returns to reclaim their former glory and honor',
      'I was born to be the fated villain in this story, and I will embrace that destiny',
      'Breaking through endless calamities to reach the peak of cultivation and power',
      'When the apocalypse becomes an online game, survival depends on your gaming skills',
      'A porter betrayed by his party dreams of revenge against those who wronged him',
      'When my childhood friend becomes dangerously obsessed with me in ways I never expected',
      'The holy necromancer walks the line between life and death in service of justice',
      'Master of mana seeks to become the ultimate lord of all magical energies',
      'After his divorce, the heavenly demon returns stronger and more determined than ever',
      'The greatest warrior of all time has returned to reclaim his legendary status'
    ]
    
    return Array.from({ length: 6 }, (_, i) => {
      const id = pageNum * 6 + i + 1
      return {
        id,
        title: titles[id % titles.length] || `Novel Title ${id}`,
        image: images[id % images.length],
        subtitle: subtitles[id % subtitles.length] || 'An epic adventure awaits in this thrilling fantasy world'
      }
    })
  }, [])

  // Load more novels
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return
    
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const newNovels = generateNovels(page)
    setNovels(prev => [...prev, ...newNovels])
    setPage(prev => prev + 1)
    
    if (page >= 5) { // 30 novels total
      setHasMore(false)
    }
    
    setLoading(false)
  }, [loading, hasMore, page, generateNovels])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, loading, loadMore])

  // Initial load
  useEffect(() => {
    if (novels.length === 0) {
      loadMore()
    }
  }, [])

  if (novels.length === 0 && loading) {
    return (
      <section className="container py-6">
        <div className="flex justify-center">
          <div className="w-6 h-6 border-2 border-cyan-300/30 border-t-cyan-300 rounded-full animate-spin" />
        </div>
      </section>
    )
  }

  return (
    <section className="w-full py-8 bg-gradient-to-r from-black/60 via-black/40 to-black/60">
      <div className="max-w-7xl mx-auto px-4">
        {novels.length > 0 && (
          <>
            {/* Horizontal Carousel */}
            <div className="relative">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-8 px-4">
                  {novels.map((novel, index) => (
                    <div
                      key={novel.id}
                      className="flex-[0_0_300px] min-w-0"
                    >
                      <NovelCard novel={novel} isCenter={index === selectedIndex} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button 
                onClick={() => emblaApi?.scrollPrev()}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 z-30"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                onClick={() => emblaApi?.scrollNext()}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 z-30"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-3 px-4 py-2 bg-black/40 rounded-lg backdrop-blur-sm">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span className="text-sm text-white/80">Loading more novels...</span>
          </div>
        </div>
      )}

      {/* Intersection Observer Target */}
      <div ref={observerRef} className="h-8" />
    </section>
  )
}