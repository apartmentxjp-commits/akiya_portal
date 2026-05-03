import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Akiya Japan — Buy Vacant Houses in Japan | English Akiya Database',
  description: 'Browse thousands of vacant Japanese houses (akiya) for sale — from $1,000. Search Japan\'s largest English akiya database. Foreigners welcome. No Japanese required.',
  keywords: ['akiya', 'akiya japan', 'buy house japan', 'vacant house japan', 'cheap house japan', 'kominka', 'japanese old house', 'property japan foreigner'],
  openGraph: {
    title: 'Akiya Japan — Buy Vacant Houses in Japan',
    description: 'Japan\'s largest English akiya database. Browse thousands of vacant houses from $1,000. Foreigners welcome.',
    url: 'https://akiya.mitorahub.com/en',
    siteName: 'Akiya Japan',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=1200&auto=format&fit=crop&q=80',
        width: 1200,
        height: 630,
        alt: 'Traditional Japanese farmhouse — akiya for sale',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akiya Japan — Buy Vacant Houses in Japan from $1,000',
    description: 'Browse Japan\'s largest English akiya database. Foreigners welcome. No Japanese required.',
    images: ['https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=1200&auto=format&fit=crop&q=80'],
  },
  alternates: {
    canonical: 'https://akiya.mitorahub.com/en',
    languages: {
      'en': 'https://akiya.mitorahub.com/en',
      'ja': 'https://akiya.mitorahub.com',
    },
  },
}

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <div lang="en">{children}</div>
}
