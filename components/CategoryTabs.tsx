"use client"
import { useState } from 'react'
import { Carousel } from './Carousel'

export type CategoryGroup = Record<string, { href: string; title: string; image: string; synopsis: string }[]>

export function CategoryTabs({ groups }: { groups: CategoryGroup }) {
  const keys = Object.keys(groups)
  const [active, setActive] = useState(keys[0] ?? '')

  return (
    <div className="container mt-8">
      <div role="tablist" aria-label="Categories" className="flex gap-1 border-b border-border/50 overflow-x-auto pb-0">
        {keys.map((k) => (
          <button
            key={k}
            role="tab"
            aria-selected={active === k}
            onClick={() => setActive(k)}
            className={`relative px-6 py-3 text-sm md:text-base font-medium whitespace-nowrap transition-all duration-300 rounded-t-lg ${
              active === k 
                ? 'text-cyan-300 bg-complimentary/50 border-b-2 border-cyan-300 shadow-lg shadow-cyan-300/20' 
                : 'text-foreground/60 hover:text-foreground/80 hover:bg-complimentary/30'
            }`}
          >
            {k}
            {active === k && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-0.5 bg-gradient-to-r from-cyan-300 to-blue-400" />
            )}
          </button>
        ))}
      </div>
      {keys.map((k) => (
        <div key={k} role="tabpanel" hidden={active !== k} className={`pt-4 ${active === k ? 'fade-in' : ''}`}>
          <Carousel
            items={groups[k].map((n) => ({ href: n.href, image: n.image, title: n.title, synopsis: n.synopsis }))}
            headingId={`tab-${k}`}
          />
        </div>
      ))}
    </div>
  )
}


