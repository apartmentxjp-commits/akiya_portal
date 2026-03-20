import { Nav, Footer } from '@/components/Nav'
import Link from 'next/link'

export const metadata = {
  title: 'Japan Gourmet Guide | Akiya Japan',
  description: 'Regional cuisine, local markets, and food culture across Japan. For food lovers visiting or moving to Japan.',
}

export default function GourmetGuidePage() {
  return (
    <>
      <Nav lang="en" />

      {/* Header */}
      <div className="bg-orange-900 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/en/guide" className="text-orange-300 text-sm hover:text-white transition mb-4 inline-block">← All Guides</Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gradient-to-br from-orange-700 to-amber-500 rounded-[12px] w-16 h-20 flex items-center justify-center text-3xl shadow-lg">🍜</div>
            <div>
              <p className="text-orange-300 text-sm font-bold uppercase tracking-wider mb-1">Gourmet Guide · $12 · Coming Soon</p>
              <h1 className="text-3xl font-bold text-white">Japan Gourmet Guide</h1>
              <p className="text-orange-200 text-sm mt-1">Regional cuisine, markets & food culture · 70+ pages</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Coming soon notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-10 text-center">
          <div className="text-4xl mb-3">🍱</div>
          <h2 className="font-bold text-stone-800 text-xl mb-2">Coming Soon</h2>
          <p className="text-stone-600 text-sm max-w-md mx-auto mb-5">
            We're currently writing the Japan Gourmet Guide. Leave your email and we'll notify you when it's ready — at a launch discount.
          </p>
          <div className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-400"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition whitespace-nowrap">
              Notify Me
            </button>
          </div>
        </div>

        {/* Preview of what's coming */}
        <h2 className="font-bold text-stone-800 text-xl mb-5">What to expect</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {[
            { emoji: '🍜', title: 'Regional Ramen', desc: 'Sapporo miso, Hakata tonkotsu, Tokyo shoyu, Kyoto white — the definitive regional ramen map.' },
            { emoji: '🐟', title: 'Seafood by Region', desc: 'Hokkaido crab, Oma tuna, Matsusaka beef — where to find Japan\'s most celebrated ingredients.' },
            { emoji: '🏪', title: 'Local Market Guides', desc: 'Morning markets, depachika basement floors, and seasonal farmers\' markets across Japan.' },
            { emoji: '🍶', title: 'Sake & Craft Beer', desc: 'Regional breweries, sake regions, and the rise of Japanese craft beer culture.' },
            { emoji: '🫕', title: 'Izakaya Culture', desc: 'How to order, what to eat, etiquette, and the best izakaya regions in Japan.' },
            { emoji: '🍡', title: 'Seasonal Food Calendar', desc: 'Fiddlehead ferns in spring, summer kakigori, autumn matsutake, winter nabe.' },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-stone-200 rounded-xl p-4">
              <div className="text-2xl mb-2">{item.emoji}</div>
              <h3 className="font-bold text-stone-800 text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Subscription CTA */}
        <div className="bg-stone-900 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-2">While you wait — browse akiya properties</h3>
          <p className="text-stone-400 text-sm mb-6">
            Subscribe for $7.99/mo to access our English-language property database and get the How to Buy guide free.
          </p>
          <Link
            href="/en/subscribe"
            className="inline-block bg-[#e07070] hover:bg-[#cc5c5c] text-white font-bold px-8 py-3 rounded-xl text-sm transition"
          >
            Subscribe — $7.99/mo
          </Link>
        </div>
      </div>

      <Footer lang="en" />
    </>
  )
}
