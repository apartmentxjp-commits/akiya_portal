import { Nav, Footer } from '@/components/Nav'
import Link from 'next/link'

export const metadata = {
  title: 'Japan Regional Living Guide | Akiya Japan',
  description: 'Find the perfect prefecture for your life in Japan. Deep-dives into 12 regions with cost of living, community, and daily life details.',
}

const REGIONS = [
  { name: 'Tohoku Highlands', emoji: '⛰️', pref: 'Aomori · Iwate · Akita', desc: 'Dramatic mountain scenery, low property prices, and tight-knit rural communities. Cold winters but stunning summers.' },
  { name: 'Shinshu (Nagano)', emoji: '🏔️', pref: 'Nagano Prefecture', desc: 'Japan\'s most popular akiya destination. Alpine climate, fresh water, excellent access to Tokyo (1.5hr by shinkansen).' },
  { name: 'San\'in Coast', emoji: '🌊', pref: 'Tottori · Shimane', desc: 'Overlooked and deeply traditional. Ancient shrines, sand dunes, and some of Japan\'s cheapest real estate.' },
  { name: 'Kii Peninsula', emoji: '🌲', pref: 'Mie · Wakayama', desc: 'Sacred mountain trails, warm climate, and stunning coastal fishing villages. UNESCO World Heritage pilgrimage routes.' },
  { name: 'Shikoku Countryside', emoji: '🏡', pref: 'Tokushima · Kochi · Ehime · Kagawa', desc: 'The 88-temple pilgrimage island. Warm climate, mandarin orchards, and one of Japan\'s most welcoming foreign communities.' },
  { name: 'Kyushu Volcanic Belt', emoji: '🌋', pref: 'Kumamoto · Kagoshima · Oita', desc: 'Onsen everywhere, subtropical south, active volcanoes, and an emerging foreign buyer market in Aso and Beppu.' },
]

export default function RegionalGuidePage() {
  return (
    <>
      <Nav lang="en" />

      {/* Header */}
      <div className="bg-emerald-900 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/en/guide" className="text-emerald-300 text-sm hover:text-white transition mb-4 inline-block">← All Guides</Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gradient-to-br from-emerald-700 to-teal-500 rounded-[12px] w-16 h-20 flex items-center justify-center text-3xl shadow-lg">🗾</div>
            <div>
              <p className="text-emerald-300 text-sm font-bold uppercase tracking-wider mb-1">Regional Guide · $15</p>
              <h1 className="text-3xl font-bold text-white">Japan Regional Living Guide</h1>
              <p className="text-emerald-200 text-sm mt-1">Find the perfect prefecture for you · 80+ pages</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* What's inside */}
        <div className="bg-[#f9f9f9] border border-stone-200 rounded-2xl p-6 mb-10">
          <h2 className="font-bold text-stone-800 text-lg mb-4">What's covered in this guide</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {['Climate & seasons by region', 'Average cost of living', 'Foreign community size', 'Internet & infrastructure quality', 'Nearest major city & access', 'Local government foreigner support', 'Popular akiya areas within each region', 'Real resident testimonials'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-stone-600">
                <span className="text-emerald-500">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Region previews */}
        <h2 className="font-bold text-stone-800 text-xl mb-5">Regions covered</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {REGIONS.map((r) => (
            <div key={r.name} className="bg-white border border-stone-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{r.emoji}</span>
                <div>
                  <h3 className="font-bold text-stone-800 text-sm">{r.name}</h3>
                  <p className="text-xs text-stone-400">{r.pref}</p>
                </div>
              </div>
              <p className="text-sm text-stone-600 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>

        {/* Purchase CTA */}
        <div className="bg-stone-900 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Get the full Regional Guide</h3>
          <p className="text-stone-400 text-sm mb-6">80+ pages · One-time purchase · Instant access</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-3 rounded-xl text-sm transition">
              Buy for $15 →
            </button>
            <Link
              href="/en/subscribe"
              className="border border-white/30 hover:border-white text-white px-8 py-3 rounded-xl text-sm transition"
            >
              Subscribe $7.99/mo (properties + How to Buy guide)
            </Link>
          </div>
        </div>
      </div>

      <Footer lang="en" />
    </>
  )
}
