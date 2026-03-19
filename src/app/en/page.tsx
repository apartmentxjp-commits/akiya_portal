import Link from 'next/link'
import { Nav, Footer } from '@/components/Nav'
import { PropertyCard } from '@/components/PropertyCard'
import { supabase, PUBLIC_PROPERTY_FIELDS } from '@/lib/supabase'

async function getLatestEntries() {
  const { data } = await supabase
    .from('properties')
    .select(PUBLIC_PROPERTY_FIELDS)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(3)
  return data || []
}

// Mock locked cards to show the "want to see more" psychology
const LOCKED_CARDS = [
  { prefecture: 'Nagano', city: 'Matsumoto', type: 'Kominka', area: '142㎡', price: '¥2.8M range' },
  { prefecture: 'Kyoto', city: 'Kameoka', type: 'Machiya', area: '88㎡', price: '¥4.5M range' },
  { prefecture: 'Niigata', city: 'Ojiya', type: 'Farmhouse', area: '210㎡', price: '¥980K range' },
]

export default async function EnHomePage() {
  const entries = await getLatestEntries()

  return (
    <>
      <Nav lang="en" />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#050f08] text-white min-h-screen flex items-center">
        {/* Background layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#020b05] via-[#071a0e] to-[#040d07]" />
          {/* Large bokeh blobs */}
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#1a5c35]/30 rounded-full blur-[120px] translate-x-1/4 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#5a3e18]/15 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4" />
          <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-[#c9a96e]/8 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          {/* Grid overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-hero" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-hero)" />
          </svg>
          {/* Diagonal accent line */}
          <div className="absolute top-0 right-[25%] w-px h-full bg-gradient-to-b from-transparent via-[#7ecfa0]/20 to-transparent" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: headline */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-10 bg-[#7ecfa0]" />
                <p className="text-[#7ecfa0] text-xs font-semibold tracking-[0.25em] uppercase">
                  Japan Property Data Library
                </p>
              </div>

              <h1 className="font-serif text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] mb-8">
                Japan&apos;s vacant homes,
                <br />
                <span className="text-[#7ecfa0]">fully catalogued.</span>
              </h1>

              <p className="text-white/55 text-lg leading-relaxed mb-10 max-w-lg">
                A structured data library of akiya (空き家) across all 47 prefectures.
                Browse records, filter by region and price range, and access complete
                property data — all in English.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/en/akiya"
                  className="group inline-flex items-center justify-center gap-2 bg-[#7ecfa0] hover:bg-[#5bb882] text-[#050f08] font-bold px-9 py-4 rounded-xl transition-all text-base shadow-lg shadow-[#7ecfa0]/25 hover:shadow-[#7ecfa0]/40 hover:scale-[1.02]"
                >
                  Browse the Database
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/en/subscribe"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-[#c9a96e]/60 text-white/70 hover:text-[#c9a96e] font-semibold px-9 py-4 rounded-xl transition-all text-base"
                >
                  Unlock Full Access
                </Link>
              </div>
            </div>

            {/* Right: stats card */}
            <div className="hidden lg:block">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-6">Database Overview</p>
                <div className="space-y-6">
                  {[
                    { value: '9,000,000+', label: 'Vacant homes recorded nationwide', accent: '#7ecfa0' },
                    { value: '47', label: 'Prefectures covered', accent: '#c9a96e' },
                    { value: '13.8%', label: 'Of all Japanese housing stock is vacant', accent: '#7ecfa0' },
                    { value: 'Weekly', label: 'Data updates from municipal sources', accent: '#c9a96e' },
                  ].map((s) => (
                    <div key={s.label} className="flex items-start gap-4 pb-6 border-b border-white/5 last:border-0 last:pb-0">
                      <div className="w-1 h-8 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: s.accent }} />
                      <div>
                        <p className="text-2xl font-bold text-white">{s.value}</p>
                        <p className="text-white/40 text-xs mt-0.5 leading-relaxed">{s.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <p className="text-white text-[10px] tracking-widest uppercase">Scroll</p>
          <div className="w-px h-8 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* ── Context bar ──────────────────────────────────────────────────── */}
      <section className="bg-[#050f08] border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white/30 text-xs">
            <span className="w-1.5 h-1.5 bg-[#7ecfa0] rounded-full animate-pulse" />
            <span>Data library — for informational purposes only</span>
          </div>
          <div className="flex items-center gap-6 text-white/20 text-[11px]">
            <span>🗾 All 47 prefectures</span>
            <span>·</span>
            <span>English interface</span>
            <span>·</span>
            <span>Structured records</span>
          </div>
        </div>
      </section>

      {/* ── Background section ───────────────────────────────────────────── */}
      <section className="bg-[#f5f0e8] border-b border-[#e2d8cc] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-6 bg-[#7ecfa0]" />
            <p className="text-[#7ecfa0] text-xs tracking-widest uppercase font-semibold">The Akiya Crisis</p>
          </div>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#1a0e06] mb-12 max-w-2xl">
            Japan has more vacant homes than any developed nation.
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                stat: '9,000,000+',
                label: 'Vacant homes in Japan',
                note: 'As of the 2023 Housing & Land Survey (Ministry of Internal Affairs and Communications)',
              },
              {
                stat: '13.8%',
                label: 'National vacancy rate',
                note: "Japan's vacancy rate is among the highest of any developed nation and is projected to rise",
              },
              {
                stat: 'Scattered',
                label: 'Across 1,700+ municipalities',
                note: 'Most data is published only in Japanese by individual local governments — invisible globally',
              },
            ].map((item) => (
              <div key={item.stat} className="bg-white rounded-2xl border border-[#e2d8cc] p-6">
                <p className="font-serif text-4xl font-bold text-[#1a3d2b] mb-1">{item.stat}</p>
                <p className="font-semibold text-[#1a0e06] text-sm mb-2">{item.label}</p>
                <p className="text-xs text-[#8a7a68] leading-relaxed">{item.note}</p>
              </div>
            ))}
          </div>
          <div className="bg-white border border-[#e2d8cc] rounded-2xl p-6 max-w-3xl">
            <p className="text-sm text-[#5a4a3a] leading-relaxed">
              Japan Property Data Library aggregates, translates, and structures this scattered information
              into a single English-language resource — making Japan&apos;s vacant property inventory
              accessible to researchers, analysts, and data users worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* ── How the data works ───────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-6 bg-[#7ecfa0]" />
          <p className="text-[#7ecfa0] text-xs tracking-widest uppercase font-semibold">Data Access</p>
        </div>
        <h2 className="font-serif text-3xl font-bold text-[#1a0e06] mb-12">
          Browse free. Unlock everything.
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: '01',
              title: 'Browse the catalog',
              desc: 'Search and filter thousands of property records by prefecture, city, price range, and property type. All records are accessible without registration.',
              color: '#7ecfa0',
            },
            {
              step: '02',
              title: 'Preview record data',
              desc: 'Free records show title, location, price range, and property type. Enough to identify properties of interest and evaluate fit.',
              color: '#c9a96e',
            },
            {
              step: '03',
              title: 'Unlock full data access',
              desc: 'Full Access ($7.99/mo) reveals complete property data: full address, building area, year built, English description, history, and registrant contact field.',
              color: '#7ecfa0',
            },
          ].map((item) => (
            <div key={item.step} className="relative p-6 rounded-2xl border border-[#e2d8cc] bg-white hover:border-[#7ecfa0]/40 hover:shadow-card transition-all">
              <p className="font-serif text-5xl font-bold text-[#e2d8cc] mb-4 leading-none">{item.step}</p>
              <h3 className="font-serif font-bold text-[#1a0e06] text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-[#8a7a68] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sample data with locked cards ────────────────────────────────── */}
      <section className="bg-[#f5f0e8] border-y border-[#e2d8cc] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-6 bg-[#7ecfa0]" />
            <p className="text-[#7ecfa0] text-xs tracking-widest uppercase font-semibold">Sample Records</p>
          </div>
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <h2 className="font-serif text-3xl font-bold text-[#1a0e06]">
              What the data looks like
            </h2>
            <Link href="/en/akiya" className="text-sm text-[#1a3d2b] font-semibold hover:text-[#5a3e18] transition flex items-center gap-1">
              View full database →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Live free cards */}
            {entries.map((p: any) => (
              <PropertyCard key={p.id} p={p} lang="en" />
            ))}
            {/* Fallback if no DB entries */}
            {entries.length === 0 && (
              <div className="col-span-full text-center py-12 text-[#8a7a68] text-sm">
                Loading sample records…
              </div>
            )}
          </div>

          {/* Locked / teaser cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {/* Blur overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none rounded-2xl"
                 style={{ backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }} />

            {/* Lock gate */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4">
              <div className="bg-white/95 backdrop-blur border border-[#e2d8cc] rounded-2xl shadow-xl px-8 py-6 text-center max-w-xs">
                <div className="w-10 h-10 bg-[#1a3d2b] rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-5 h-5 text-[#7ecfa0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <p className="font-bold text-[#1a0e06] mb-1">More records available</p>
                <p className="text-xs text-[#8a7a68] mb-4 leading-relaxed">
                  Full Access unlocks complete records including addresses, areas, descriptions, and contact data.
                </p>
                <Link
                  href="/en/subscribe"
                  className="inline-flex items-center gap-1.5 bg-[#1a3d2b] text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-[#0d2019] transition"
                >
                  Unlock Full Access — $7.99/mo
                </Link>
              </div>
            </div>

            {/* Blurred dummy cards */}
            {LOCKED_CARDS.map((card, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-card border border-border opacity-60">
                <div className="h-48 bg-gradient-to-br from-stone-700 via-stone-600 to-stone-500" />
                <div className="p-4">
                  <div className="h-4 bg-[#e2d8cc] rounded w-3/4 mb-2" />
                  <div className="h-3 bg-[#e2d8cc] rounded w-1/2 mb-4" />
                  <div className="flex gap-3">
                    <span className="text-xs text-[#8a7a68]">📍 {card.prefecture}, {card.city}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <span className="text-[10px] bg-[#f5f0e8] text-[#8a7a68] px-2 py-0.5 rounded-full">{card.type}</span>
                    <span className="text-[10px] bg-[#f5f0e8] text-[#8a7a68] px-2 py-0.5 rounded-full">{card.area}</span>
                    <span className="text-[10px] bg-[#f5f0e8] text-[#8a7a68] px-2 py-0.5 rounded-full">{card.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Data tier comparison ─────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-6 bg-[#7ecfa0]" />
          <p className="text-[#7ecfa0] text-xs tracking-widest uppercase font-semibold">Data Tiers</p>
        </div>
        <h2 className="font-serif text-3xl font-bold text-[#1a0e06] mb-12">What&apos;s included</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Free tier */}
          <div className="bg-white rounded-2xl border border-[#e2d8cc] p-7">
            <p className="text-xs font-bold uppercase tracking-widest text-[#8a7a68] mb-2">Free Access</p>
            <p className="text-2xl font-bold text-[#1a0e06] mb-1">$0</p>
            <p className="text-xs text-[#8a7a68] mb-6">No registration required</p>
            <ul className="space-y-3">
              {[
                { text: 'Property title', included: true },
                { text: 'Prefecture & city', included: true },
                { text: 'Property type', included: true },
                { text: 'Price range', included: true },
                { text: 'Full address & map', included: false },
                { text: 'Building / land area', included: false },
                { text: 'English description', included: false },
                { text: 'Property history', included: false },
                { text: 'Registrant contact field', included: false },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-3 text-sm">
                  {item.included ? (
                    <span className="w-4 h-4 text-[#7ecfa0] flex-shrink-0">✓</span>
                  ) : (
                    <span className="w-4 h-4 text-[#e2d8cc] flex-shrink-0">—</span>
                  )}
                  <span className={item.included ? 'text-[#1a0e06]' : 'text-[#c4b8a8]'}>{item.text}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/en/akiya"
              className="mt-7 block text-center border border-[#e2d8cc] text-[#8a7a68] text-sm font-semibold py-3 rounded-xl hover:border-[#7ecfa0]/50 hover:text-[#1a3d2b] transition"
            >
              Browse Free Records
            </Link>
          </div>

          {/* Paid tier */}
          <div className="bg-[#1a3d2b] rounded-2xl border-2 border-[#5a3e18] p-7 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <span className="bg-[#c9a96e] text-[#1a0e06] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                Full Access
              </span>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#7ecfa0]/70 mb-2">Full Data Access</p>
            <p className="text-2xl font-bold text-white mb-1">$7.99<span className="text-sm font-normal text-white/50">/month</span></p>
            <p className="text-xs text-white/40 mb-6">Cancel anytime</p>
            <ul className="space-y-3">
              {[
                'Property title',
                'Prefecture & city',
                'Property type',
                'Price range',
                'Full address & map',
                'Building / land area',
                'Year built',
                'Full English description',
                'Property history',
                'Registrant contact field',
                'Unlimited data exports',
                'Advanced filtering',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm">
                  <span className="w-4 h-4 text-[#7ecfa0] flex-shrink-0">✓</span>
                  <span className="text-white/80">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/en/subscribe"
              className="mt-7 block text-center bg-[#c9a96e] hover:bg-[#b8956a] text-[#1a0e06] text-sm font-bold py-3 rounded-xl transition shadow-lg"
            >
              Unlock Full Data Access →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section className="bg-[#050f08] text-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-6 bg-[#7ecfa0]" />
            <p className="text-[#7ecfa0] text-xs tracking-widest uppercase font-semibold">Features</p>
          </div>
          <h2 className="font-serif text-3xl font-bold mb-12">Built for data users</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '🔍',
                title: 'Full-text search',
                desc: 'Search by property name, city, region, or keyword across the entire database.',
              },
              {
                icon: '⚙️',
                title: 'Advanced filtering',
                desc: 'Filter by prefecture, price range, property type, land area, building area, and year built.',
              },
              {
                icon: '🗾',
                title: 'Geographic coverage',
                desc: 'Complete coverage across all 47 prefectures, from Hokkaido to Okinawa.',
              },
              {
                icon: '🌐',
                title: 'English throughout',
                desc: 'All interface elements and property descriptions are available in English.',
              },
              {
                icon: '📊',
                title: 'Structured records',
                desc: 'Consistent data schema across all entries — area, type, price, year, location, and more.',
              },
              {
                icon: '🔄',
                title: 'Weekly updates',
                desc: 'New records added weekly from municipal akiya bank programs across Japan.',
              },
            ].map((f) => (
              <div key={f.title} className="bg-white/5 border border-white/8 rounded-2xl p-6 hover:bg-white/8 transition">
                <p className="text-2xl mb-3">{f.icon}</p>
                <h3 className="font-semibold text-white mb-1.5">{f.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ───────────────────────────────────────────────────── */}
      <section className="bg-[#1a3d2b] py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[#7ecfa0] text-xs tracking-widest uppercase font-semibold mb-4">Get Started</p>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4">
            Access Japan&apos;s largest akiya dataset.
          </h2>
          <p className="text-white/50 text-base mb-8 leading-relaxed">
            Free browsing, no registration required.
            Unlock full data access for $7.99/month — cancel anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/en/akiya"
              className="inline-flex items-center justify-center gap-2 bg-[#7ecfa0] hover:bg-[#5bb882] text-[#050f08] font-bold px-9 py-4 rounded-xl transition-all shadow-lg hover:scale-[1.02]"
            >
              Browse Free Records
            </Link>
            <Link
              href="/en/subscribe"
              className="inline-flex items-center justify-center gap-2 border border-[#c9a96e]/50 hover:border-[#c9a96e] text-[#c9a96e] font-semibold px-9 py-4 rounded-xl transition-all"
            >
              Unlock Full Access — $7.99/mo
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-6 bg-[#7ecfa0]" />
          <p className="text-[#7ecfa0] text-xs tracking-widest uppercase font-semibold">FAQ</p>
        </div>
        <h2 className="font-serif text-3xl font-bold text-[#1a0e06] mb-10">Frequently asked questions</h2>
        <div className="space-y-3">
          {[
            {
              q: 'What is Japan Property Data Library?',
              a: 'A structured data library of vacant homes (akiya) in Japan. We collect, translate, and publish property data from municipal akiya bank programs for informational and research purposes.',
            },
            {
              q: 'Is this a real estate agency?',
              a: 'No. This is a data library service only. We do not provide real estate brokerage, agency, advisory, introduction, or negotiation services of any kind. All data is for informational purposes only. Any decisions are made entirely at the user\'s own responsibility.',
            },
            {
              q: 'What are akiya (空き家)?',
              a: 'Akiya are vacant or abandoned homes. Japan has over 9 million such properties — roughly 13.8% of all housing. Many are listed by municipalities via "akiya bank" programs as part of revitalization efforts.',
            },
            {
              q: 'What does Full Access include?',
              a: 'Full Access ($7.99/mo) unlocks complete property records: full address, building and land area, year built, detailed English description, property history, and registrant contact field stored in our database.',
            },
            {
              q: 'Can I contact property owners through this service?',
              a: 'Full Access records include a registrant contact field sourced from public akiya bank data. However, we do not act as intermediary, broker, or agent. Any contact is made directly by the user at their own discretion and responsibility.',
            },
            {
              q: 'How accurate is the data?',
              a: 'All data is sourced from publicly available municipal akiya bank programs. We do not independently verify property conditions, ownership, or availability. Data accuracy depends on the originating municipal source and may not reflect current status.',
            },
          ].map((item) => (
            <div key={item.q} className="border border-[#e2d8cc] rounded-xl p-5 hover:border-[#7ecfa0]/40 transition bg-white">
              <p className="font-semibold text-[#1a0e06] mb-2">Q. {item.q}</p>
              <p className="text-sm text-[#8a7a68] leading-relaxed">A. {item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Disclaimer ───────────────────────────────────────────────────── */}
      <section className="bg-[#f5f0e8] border-t border-[#e2d8cc] py-12">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white border border-[#e2d8cc] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-4 bg-[#c9a96e] rounded-full" />
              <p className="text-xs font-bold text-[#5a3e18] uppercase tracking-widest">Important Notice</p>
            </div>
            <p className="text-xs text-[#5a4a3a] leading-relaxed">
              This service is operated through advertising and data-based services.
              This website is for informational purposes only. We do not provide real estate brokerage,
              agency, intermediary, advisory, or solicitation services of any kind.
              All decisions are made at the user&apos;s own responsibility.
            </p>
            <p className="text-xs text-[#5a4a3a] leading-relaxed border-t border-[#e2d8cc] pt-4">
              本サービスは広告掲載およびデータ提供により運営されています。
              本サイトは情報提供を目的としており、不動産の売買・仲介・代理・紹介・勧誘等は行っておりません。
              最終判断は利用者ご自身の責任で行ってください。
            </p>
          </div>
        </div>
      </section>

      <Footer lang="en" />
    </>
  )
}
