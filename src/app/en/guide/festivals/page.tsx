import { Nav, Footer } from '@/components/Nav'
import Link from 'next/link'

export const metadata = {
  title: 'Japan Festival Calendar & Guide | Akiya Japan',
  description: '100+ matsuri across all 47 prefectures. Month-by-month guide to Japan\'s best festivals for visitors and residents.',
}

const MONTHS = [
  { month: 'January', festivals: ['Nozawa Onsen Dosojin Fire Festival (Nagano)', 'Sapporo Snow Festival preview events'] },
  { month: 'February', festivals: ['Sapporo Snow Festival (Hokkaido)', 'Yokote Kamakura Snow Hut Festival (Akita)'] },
  { month: 'March', festivals: ['Omizutori Water Drawing Ceremony (Nara)', 'Cherry blossom season begins (Kyushu)'] },
  { month: 'April', festivals: ['Hirosaki Cherry Blossom Festival (Aomori)', 'Takayama Spring Festival (Gifu)'] },
  { month: 'May', festivals: ['Hakata Dontaku Port Festival (Fukuoka)', 'Kanda Matsuri (Tokyo, odd years)'] },
  { month: 'June', festivals: ['Sanno Matsuri (Tokyo, even years)', 'Nagoshi-no-Harae summer purification (nationwide)'] },
  { month: 'July', festivals: ['Gion Matsuri (Kyoto)', 'Hakata Gion Yamakasa (Fukuoka)', 'Fuji Rock Festival (Niigata)'] },
  { month: 'August', festivals: ['Awa Odori (Tokushima)', 'Nebuta Festival (Aomori)', 'Obon dances (nationwide)'] },
  { month: 'September', festivals: ['Kishiwada Danjiri Festival (Osaka)', 'Moon-viewing Tsukimi (nationwide)'] },
  { month: 'October', festivals: ['Jidai Matsuri Procession (Kyoto)', 'Nikko Autumn Festival (Tochigi)'] },
  { month: 'November', festivals: ['Tori-no-Ichi Rooster Fair (Tokyo)', 'Autumn foliage festivals (nationwide)'] },
  { month: 'December', festivals: ['Chichibu Night Festival (Saitama)', 'Year-end Toshikoshi Soba (nationwide)'] },
]

export default function FestivalsGuidePage() {
  return (
    <>
      <Nav lang="en" />

      {/* Header */}
      <div className="bg-violet-900 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/en/guide" className="text-violet-300 text-sm hover:text-white transition mb-4 inline-block">← All Guides</Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gradient-to-br from-violet-700 to-purple-500 rounded-[12px] w-16 h-20 flex items-center justify-center text-3xl shadow-lg">🎆</div>
            <div>
              <p className="text-violet-300 text-sm font-bold uppercase tracking-wider mb-1">Festival Guide · $10</p>
              <h1 className="text-3xl font-bold text-white">Japan Festival Calendar & Guide</h1>
              <p className="text-violet-200 text-sm mt-1">100+ matsuri across all 47 prefectures · 50+ pages</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* What's inside */}
        <div className="bg-[#f9f9f9] border border-stone-200 rounded-2xl p-6 mb-10">
          <h2 className="font-bold text-stone-800 text-lg mb-4">What's in this guide</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {['Month-by-month festival calendar', 'Practical logistics (access, accommodation)', 'What to wear and bring', 'Photography tips for each festival', 'Hidden local matsuri beyond the tourist trail', 'Participation opportunities (not just watching)', 'Food stall guides (yatai)', 'How to connect with local communities'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-stone-600">
                <span className="text-violet-500">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Monthly calendar preview */}
        <h2 className="font-bold text-stone-800 text-xl mb-5">Festival calendar preview</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-10">
          {MONTHS.map((m) => (
            <div key={m.month} className="bg-white border border-stone-200 rounded-xl p-4">
              <h3 className="font-bold text-violet-700 text-sm mb-2">{m.month}</h3>
              <ul className="space-y-1">
                {m.festivals.map((f) => (
                  <li key={f} className="text-xs text-stone-600 flex items-start gap-1.5">
                    <span className="text-violet-400 mt-0.5">→</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Purchase CTA */}
        <div className="bg-stone-900 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Get the full Festival Guide</h3>
          <p className="text-stone-400 text-sm mb-6">50+ pages · One-time purchase · Instant access</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-violet-500 hover:bg-violet-600 text-white font-bold px-8 py-3 rounded-xl text-sm transition">
              Buy for $10 →
            </button>
            <Link
              href="/en/subscribe"
              className="border border-white/30 hover:border-white text-white px-8 py-3 rounded-xl text-sm transition"
            >
              Subscribe $7.99/mo (properties + How to Buy guide free)
            </Link>
          </div>
        </div>
      </div>

      <Footer lang="en" />
    </>
  )
}
