import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Akiya Japan — 日本の空き家・古民家マーケット',
  description: '日本全国の空き家・古民家を探す・売るためのポータルサイト。外国人バイヤーも歓迎。Find traditional Japanese houses (akiya, kominka) for sale across Japan.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
