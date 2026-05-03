import type { Metadata } from 'next'
import { Noto_Serif_JP, Noto_Sans_JP } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const serifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-serif',
  display: 'swap',
})

const sansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Akiya Japan — 日本の空き家・古民家マーケット',
  description: '日本全国の空き家・古民家を探す・売るためのポータルサイト。外国人バイヤーも歓迎。Find traditional Japanese houses (akiya, kominka) for sale across Japan.',
  verification: {
    google: ['Ht81nQ0OLQ-K9aDS50OJ6saxztF7GNqmr8Kkd_2PvGA', 'a40ktOhsIRB5q_iqiLN34QCysWsjYKhYIEKQKPonhKA'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${serifJP.variable} ${sansJP.variable}`}>
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-523EZ36ETW" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-523EZ36ETW');
        `}</Script>
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
