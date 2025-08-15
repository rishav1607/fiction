import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fiction Realm | Read Korean Novels',
  description: 'Fiction Realm is a Korean-to-English translation site, dedicated to providing the highest quality in writing and reading experience.',
  openGraph: {
    title: 'Fiction Realm | Read Korean Novels',
    description: 'Fiction Realm is a Korean-to-English translation site, dedicated to providing the highest quality in writing and reading experience.',
    images: [
      {
        url: 'https://api.genesistudio.com/storage/v1/object/public/directus/a1d9780d-7f61-4f60-897e-197f43014605.png',
        width: 1200,
        height: 630,
        alt: 'Fiction Realm'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    site: '@fictionrealm',
    creator: '@fictionrealm',
    images: ['https://api.genesistudio.com/storage/v1/object/public/directus/a1d9780d-7f61-4f60-897e-197f43014605.png']
  },
  icons: {
    icon: [
      { url: 'https://genesistudio.com/favicon.ico' },
      { url: 'https://genesistudio.com/favicon-32x32.png', sizes: '32x32' },
      { url: 'https://genesistudio.com/favicon-16x16.png', sizes: '16x16' }
    ],
    apple: [{ url: 'https://genesistudio.com/apple-touch-icon.png' }],
    other: [{ rel: 'mask-icon', url: 'https://genesistudio.com/safari-pinned-tab.svg', color: '#313131' }]
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body>{children}</body>
    </html>
  )
}


