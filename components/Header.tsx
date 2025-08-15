'use client'
import Link from 'next/link'
import { Logo } from './Logo'
import { useState, useEffect } from 'react'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 border-b border-border/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 transition-all duration-300 ${
      isScrolled ? 'bg-background/95 shadow-lg shadow-black/10' : 'bg-background/60'
    }`}>
      <div className="container h-16 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="transition-transform duration-300 group-hover:scale-110">
            <Logo size={24} className="opacity-90" />
          </div>
          <span className="text-xl font-bold leading-6 group-hover:text-cyan-300 hidden md:block transition-all duration-300 nav-link-animation relative gradient-text">
            FictionRealm
          </span>
        </Link>
        
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <Link href="#" className="transition-all duration-300 hover:text-cyan-300 leading-6 relative nav-link-animation text-foreground/80 font-medium">
            Novels
          </Link>
          <Link href="#" className="transition-all duration-300 hover:text-cyan-300 leading-6 relative nav-link-animation text-foreground/80 font-medium">
            Library
          </Link>
          <Link href="#" className="transition-all duration-300 hover:text-cyan-300 leading-6 relative nav-link-animation text-foreground/80 font-medium">
            Store
          </Link>
          <Link href="#" className="transition-all duration-300 hover:text-cyan-300 leading-6 relative nav-link-animation text-foreground/80 font-medium">
            Events
          </Link>
        </nav>
        
        <div className="ml-auto flex items-center gap-4">
          <div className="search-container hidden md:block">
            <input 
              className="search-input" 
              placeholder="Search novels, authors..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <span className="search-icon">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 1 0 14 15.5l.27.28v.79l5 5l1.5-1.5l-5-5zm-6 0A4.5 4.5 0 1 1 14 9.5A4.5 4.5 0 0 1 9.5 14"/>
              </svg>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-2">
            <button className="p-2 rounded-lg transition-all duration-300 hover:bg-complimentary/50 hover:scale-110 btn-primary" aria-label="Theme">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 3a9 9 0 1 0 9 9A7 7 0 0 1 12 3"/>
              </svg>
            </button>
            
            <button className="p-2 rounded-lg transition-all duration-300 hover:bg-complimentary/50 hover:scale-110 btn-primary relative" aria-label="Notifications">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2m6-6V11a6 6 0 1 0-12 0v5l-2 2v1h16v-1z"/>
              </svg>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full pulse-glow"></span>
            </button>
            
            <button className="p-2 rounded-lg transition-all duration-300 hover:bg-complimentary/50 hover:scale-110 btn-primary" aria-label="Account">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 12a5 5 0 1 0-5-5a5 5 0 0 0 5 5m0 2c-5 0-9 2.5-9 5v1h18v-1c0-2.5-4-5-9-5"/>
              </svg>
            </button>
          </div>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg transition-all duration-300 hover:bg-complimentary/50 hover:scale-110"
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="currentColor" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3 12h18m-9 6h9m-9-12h9"}/>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl">
          <div className="container py-4 space-y-4">
            <nav className="flex flex-col gap-4">
              <Link href="#" className="text-foreground/80 font-medium hover:text-cyan-300 transition-colors duration-300 p-2">
                Novels
              </Link>
              <Link href="#" className="text-foreground/80 font-medium hover:text-cyan-300 transition-colors duration-300 p-2">
                Library
              </Link>
              <Link href="#" className="text-foreground/80 font-medium hover:text-cyan-300 transition-colors duration-300 p-2">
                Store
              </Link>
              <Link href="#" className="text-foreground/80 font-medium hover:text-cyan-300 transition-colors duration-300 p-2">
                Events
              </Link>
            </nav>
            
            <div className="pt-4 border-t border-border/50">
              <div className="search-container mb-4">
                <input 
                  className="search-input w-full" 
                  placeholder="Search novels, authors..."
                />
                <span className="search-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 1 0 14 15.5l.27.28v.79l5 5l1.5-1.5l-5-5zm-6 0A4.5 4.5 0 1 1 14 9.5A4.5 4.5 0 0 1 9.5 14"/>
                  </svg>
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="p-2 rounded-lg transition-all duration-300 hover:bg-complimentary/50 btn-primary" aria-label="Theme">
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 3a9 9 0 1 0 9 9A7 7 0 0 1 12 3"/>
                  </svg>
                </button>
                
                <button className="p-2 rounded-lg transition-all duration-300 hover:bg-complimentary/50 btn-primary relative" aria-label="Notifications">
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2m6-6V11a6 6 0 1 0-12 0v5l-2 2v1h16v-1z"/>
                  </svg>
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full pulse-glow"></span>
                </button>
                
                <button className="p-2 rounded-lg transition-all duration-300 hover:bg-complimentary/50 btn-primary" aria-label="Account">
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 12a5 5 0 1 0-5-5a5 5 0 0 0 5 5m0 2c-5 0-9 2.5-9 5v1h18v-1c0-2.5-4-5-9-5"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}


