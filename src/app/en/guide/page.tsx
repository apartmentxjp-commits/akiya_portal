'use client'

import { useState } from 'react'
import { Nav, Footer } from '@/components/Nav'
import Link from 'next/link'

const PRICE_IDS: Record<string, string> = {
  download: 'price_1TDgtv98H8Ai6RPUilNht5uc',  // How to Buy a House — $20
  regional: 'price_1TDgpd98H8Ai6RPUeLOIiCQJ',  // Japan Regional Living Guide — $15
  festivals: 'price_1TDgrt98H8Ai6RPUew7FwVPr', // Japan Festival Calendar — $10
}

const GUIDES = [
  {
    slug: 'download',
    emoji: '🏯',
    color: 'from-stone-700 via-stone-600 to-stone-500',
    badge: 'Bestseller',
    badgeColor: 'bg-[#e07070] text-white',
    title: 'How to Buy a House in Japan',
    subtitle: 'The complete guide for foreign buyers',
    desc: 'Step-by-step process, legal requirements, costs, due diligence, managing from abroad, and visa options. Everything you need to buy confidently.',
    pages: '60+ pages',
    price: 20,
    annualFree: true,
    chapters: ['Buying process (7 steps)', 'Full cost breakdown', 'Due diligence checklist', 'Visa & long-stay options', 'Managing from abroad'],
  },
  {
    slug: 'regional',
    emoji: '🗾',
    color: 'from-emerald-700 via-emerald-600 to-teal-500',
    badge: 'New',
    badgeColor: 'bg-emerald-500 text-white',
    title: 'Japan Regional Living Guide',
    subtitle: 'Find the perfect prefecture for you',
    desc: 'Deep-dives into 12 regions: climate, cost of living, community, internet access, nearest city, and what daily life actually looks like for foreign residents.',
    pages: '80+ pages',
    price: 15,
    annualFree: false,
    chapters: ['Tohoku highlands', 'Shinshu (Nagano)', 'San\'in coast', 'Shikoku countryside', 'Kyushu volcanic belt', '+ 7 more regions'],
  },
  {
    slug: 'festivals',
    emoji: '🎆',
    color: 'from-violet-700 via-violet-600 to-purple-500',
    badge: 'Popular',
    badgeColor: 'bg-violet-500 text-white',
    title: 'Japan Festival Calendar & Guide',
    subtitle: '100+ matsuri across all 47 prefectures',
    desc: 'Month-by-month guide to Japan\'s best festivals: Awa Odori, Gion Matsuri, Nebuta, Yuki Matsuri, cherry blossom spots, and hidden local celebrations.',
    pages: '50+ pages',
    price: 10,
    annualFree: false,
    chapters: ['Spring sakura festivals', 'Summer fireworks & Obon', 'Autumn harvest matsuri', 'Winter snow festivals', 'Regional hidden gems'],
  },
  {
    slug: 'gourmet',
    emoji: '🍜',
    color: 'from-orange-700 via-orange-600 to-amber-500',
    badge: 'Coming Soon',
    badgeColor: 'bg-stone-400 text-white',
    title: 'Japan Gourmet Guide',
    subtitle: 'Regional cuisine, markets & food culture',
    desc: 'From Kyoto kaiseki to Osaka street food, Hokkaido seafood to Okinawa champuru — a region-by-region guide to Japan\'s extraordinary food culture.',
    pages: '70+ pages',
    price: 12,
    annualFree: false,
    comingSoon: true,
    chapters: ['Regional ramen styles', 'Local market guides', 'Izakaya etiquette', 'Seasonal ingredients', 'Food travel itineraries'],
  },
]

function BuyButton({ slug, price }: { slug: string; price: number }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function handleBuy(e: React.FormEvent) {
    e.preventDefault()
    setErr(null)
    if (!email || !email.includes('@')) {
      setErr('Enter a valid email')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout-once', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), priceId: PRICE_IDS[slug] }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Checkout failed')
      window.location.href = data.url
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Something went wrong')
      setLoading(false)
    }
  }

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="bg-stone-900 hover:bg-stone-700 text-white font-bold px-4 py-2 rounded-xl text-sm transition"
      >
        Buy ${price} →
      </button>
    )
  }

  return (
    <form onSubmit={handleBuy} className="mt-3 space-y-2">
      {err && <p className="text-xs text-red-600">{err}</p>}
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-stone-900 hover:bg-stone-700 disabled:opacity-60 text-white font-bold py-2 rounded-lg text-sm transition"
      >
        {loading ? 'Redirecting…' : `Pay $${price} →`}
      </button>
    </form>
  )
}

export default function GuidePage() {
  return (
    <>
      <Nav lang="en" />

      {/* Header */}
      <div className="bg-stone-900 py-14">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-[#e07070] text-sm font-bold uppercase tracking-wider mb-3">Guide Store</p>
          <h1 className="text-4xl font-bold text-white mb-4">Japan Guides & Ebooks</h1>
          <p className="text-stone-400 text-base max-w-xl mx-auto">
            Expert-written guides for foreign buyers, long-stay visitors, and Japan enthusiasts.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm px-4 py-2 rounded-full">
            <span className="text-[#e07070] font-bold">★</span>
            Annual subscribers get <strong>&quot;How to Buy&quot;</strong> free ($20 value) — plus full property access
          </div>
        </div>
      </div>

      {/* Guide grid */}
      <section className="bg-[#f9f9f9] py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {GUIDES.map((guide) => (
              <div
                key={guide.slug}
                className={`bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col ${guide.comingSoon ? 'opacity-70' : ''}`}
              >
                {/* Cover mockup */}
                <div className="flex justify-center pt-8 pb-4 bg-stone-50">
                  <div className="bg-stone-900 rounded-[16px] p-2.5 shadow-xl w-36">
                    <div className={`bg-gradient-to-br ${guide.color} rounded-[10px] aspect-[3/4] flex flex-col items-center justify-center p-4`}>
                      <div className="text-4xl mb-2">{guide.emoji}</div>
                      <p className="text-white font-bold text-[10px] text-center leading-tight mb-1">
                        {guide.title.toUpperCase()}
                      </p>
                      <p className="text-white/50 text-[8px] text-center">Akiya Japan</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${guide.badgeColor}`}>
                      {guide.badge}
                    </span>
                    <span className="text-xs text-stone-400">{guide.pages}</span>
                  </div>

                  <h2 className="font-bold text-stone-900 text-lg leading-snug mb-1">{guide.title}</h2>
                  <p className="text-xs text-stone-500 mb-3">{guide.subtitle}</p>
                  <p className="text-sm text-stone-600 leading-relaxed mb-4">{guide.desc}</p>

                  {/* Chapter list */}
                  <ul className="space-y-1 mb-5">
                    {guide.chapters.map((ch) => (
                      <li key={ch} className="flex items-center gap-2 text-xs text-stone-500">
                        <span className="text-[#e07070]">→</span>
                        {ch}
                      </li>
                    ))}
                  </ul>

                  {/* Price & CTA */}
                  <div className="mt-auto">
                    {guide.annualFree && (
                      <div className="bg-[#e07070]/10 border border-[#e07070]/20 rounded-xl p-3 mb-3 text-center">
                        <p className="text-xs text-stone-600">
                          <span className="line-through text-stone-400 mr-1">${guide.price}</span>
                          <span className="font-bold text-[#e07070]">Free with annual subscription ($79.99/yr)</span>
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-stone-900">${guide.price}</span>
                        <span className="text-stone-400 text-sm ml-1">one-time</span>
                      </div>
                      {guide.comingSoon ? (
                        <span className="text-sm text-stone-400 font-medium">Notify me →</span>
                      ) : (
                        <div className="flex gap-2">
                          <Link
                            href={`/en/guide/${guide.slug}`}
                            className="text-sm text-stone-600 border border-stone-200 hover:border-stone-400 px-3 py-2 rounded-xl transition"
                          >
                            Preview
                          </Link>
                          {guide.annualFree && (
                            <Link
                              href="/en/subscribe?plan=annual"
                              className="bg-[#e07070] hover:bg-[#cc5c5c] text-white font-bold px-4 py-2 rounded-xl text-sm transition"
                            >
                              Get Free →
                            </Link>
                          )}
                          <BuyButton slug={guide.slug} price={guide.price} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription upsell */}
      <section className="bg-stone-900 py-14">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Better value with a subscription</h2>
          <p className="text-stone-400 text-sm mb-6 max-w-lg mx-auto">
            The annual plan ($79.99/yr) includes the <strong className="text-white">How to Buy guide free</strong> ($20 value)
            plus full property database access — 2 months free vs monthly billing.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/en/subscribe"
              className="bg-[#e07070] hover:bg-[#cc5c5c] text-white font-bold px-8 py-3 rounded-xl text-sm transition"
            >
              Subscribe — $7.99/mo
            </Link>
            <Link
              href="/en/akiya"
              className="border border-white/30 hover:border-white text-white font-bold px-8 py-3 rounded-xl text-sm transition"
            >
              Browse Properties
            </Link>
          </div>
        </div>
      </section>

      <Footer lang="en" />
    </>
  )
}
