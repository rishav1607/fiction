import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Image from 'next/image'
// removed CategoryTabs per user request
import { ModernHero } from '@/components/ModernHero'
// removed QuickActions per user request
import { TopSeries } from '@/components/TopSeries'
import { CardGrid } from '@/components/CardGrid'
import { InfiniteNovelScroll } from '@/components/InfiniteNovelScroll'

const heroSlides = [
  { 
    image: '/images/30303b75-4b13-4c26-a617-b0f12476c6b7.jpg', 
    title: 'I Am The Fated Villain',
    genres: ['Fantasy', 'Action', 'Martial Arts'],
    status: 'Hot' as const,
    statusColor: 'red',
    href: '/novels/fated-villain'
  },
  { 
    image: '/images/3b6c29f7-8941-44fc-8d3f-40d103a81237.png', 
    title: 'Breaking Through the Calamity',
    genres: ['Fantasy', 'Action', 'Ascension'],
    status: 'New' as const,
    statusColor: 'green',
    href: '/novels/breaking-calamity'
  },
  { 
    image: '/images/0ac24b65-b00e-4afc-a4a3-fd4b3e779705.png', 
    title: 'Apocalypse Online',
    genres: ['Fantasy', 'Action', 'Regression'],
    status: 'Trending' as const,
    statusColor: 'purple',
    href: '/novels/apocalypse-online'
  },
  { 
    image: '/images/62d086d8-1fe1-4e6b-9fb0-d0e1ce6c9474.png', 
    title: 'The Betrayed Porter Dreams of Revenge',
    genres: ['Fantasy', 'Action', 'Revenge'],
    status: 'Popular' as const,
    statusColor: 'blue',
    href: '/novels/betrayed-porter'
  },
  { 
    image: '/images/936d6213-b757-44f0-b549-1e6cc8ac1fcd.png', 
    title: 'When My Friend Obsesses Over Me',
    genres: ['Fantasy', 'Romance', 'Psychological'],
    status: 'Hot' as const,
    statusColor: 'red',
    href: '/novels/friend-obsession'
  }
]

// removed groups/tabs data per user request

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-complimentary/20">
      <Header />
      <main className="flex-1 space-y-8">
        <ModernHero slides={heroSlides} />

        <TopSeries
          title="Popular This Week"
          items={[
            { rank: 1, title: "I Transmigrated as the Academy's Weary Instructor", genres: ['Fantasy', 'Action', 'Overpowered'], image: '/images/59900a54-f4d4-474a-9226-a535799917d1.png' },
            { rank: 2, title: 'Divorced Heavenly Demon', genres: ['Fantasy', 'Action', 'Regression'], image: '/images/caa3a43d-be9e-4218-881a-2f2f2ed7cf98.png' },
            { rank: 3, title: 'The Greatest Warrior of All Time Returns', genres: ['Fantasy', 'Action', 'Ascension'], image: '/images/2a923bd1-12b4-423d-bd2f-99ca776427cd.png' },
            { rank: 4, title: 'My Dad is the Zenith', genres: ['Fantasy', 'Action', 'Psychological'], image: '/images/7a4e2e14-1580-489e-9708-24adeb99fd6e.png' },
            { rank: 5, title: 'Holy Necromancer', genres: ['Fantasy', 'Action', 'Isekai'], image: '/images/16e35353-3911-4620-91a8-ec6e9f25b03c.png' },
            { rank: 6, title: 'The S-Rank Tamer Is Good At Everything', genres: ['Fantasy', 'Action'], image: '/images/75d5c2e9-95c1-47ba-b10f-23b7e04d8286.png' },
            { rank: 7, title: 'Return of the Mount Hua Sect', genres: ['Fantasy', 'Action', 'Overpowered'], image: '/images/b95a927f-0f44-40a9-8536-e9d7a92503ba.png' },
            { rank: 8, title: 'Lord of Mana', genres: ['Fantasy', 'Action', 'Ascension'], image: '/images/857dd339-3ff0-41bb-ae4f-40a3d91523d9.png' },
            { rank: 9, title: 'I Regressed with the Heavenly Demon', genres: ['Fantasy', 'Action', 'Regression'], image: '/images/0ec14a33-3aca-4608-9435-34259391b02c.png' },
          ]}
        />

        <InfiniteNovelScroll />

        <CardGrid
          title="Recently Updated"
          items={[
            { title: 'The Zenith Is Dead', sub: 'Chapter 27 · 21 hours ago', image: '/images/b95a927f-0f44-40a9-8536-e9d7a92503ba.png' },
            { title: 'Holy Necromancer', sub: 'Chapter 48 · 21 hours ago', image: '/images/857dd339-3ff0-41bb-ae4f-40a3d91523d9.png' },
            { title: 'Hypogeum, I', sub: 'Chapter 25 · 21 hours ago', image: '/images/f4adae3b-26fc-4b93-a6f0-24e3fb4c05cf.png' },
            { title: 'The Ultimate Multi-Talented Crafter', sub: 'Chapter 24 · 21 hours ago', image: '/images/0ec14a33-3aca-4608-9435-34259391b02c.png' },
            { title: 'The Top Student Hides Her Regression', sub: 'Chapter 30 · 21 hours ago', image: '/images/aab20f28-4366-4bc3-b1a5-d1b8eef82960.png' },
          ]}
        />

        <CardGrid
          title="FictionRealm Originals"
          items={[
            { title: 'Living in Death', image: '/images/9bfc0ccd-142e-40df-bdf3-658432d5430a.png' },
            { title: 'Tempest Rising', image: '/images/0e7bbbb5-0cc7-4722-b49e-0c5e5cd0a234.png' },
            { title: 'Awakening Dead', image: '/images/eaf6b8e7-d6eb-4528-866a-c25d1644e5d1.png' },
            { title: "A Third Son's Unlucky Rise to Prominence", image: '/images/9841cc24-71fa-40d4-85d9-da3cc2cfeb6f.png' },
            { title: 'Try Again, Villainess?', image: '/images/372f74a5-34bc-4d5a-b71a-b35615241c91.jpg' },
          ]}
        />


      </main>
      <Footer />
    </div>
  )
}


