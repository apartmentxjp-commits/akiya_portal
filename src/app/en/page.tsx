import Link from 'next/link'
import { Nav, Footer } from '@/components/Nav'
import { PropertyCard } from '@/components/PropertyCard'
import { supabase } from '@/lib/supabase'

async function getLatestProperties() {
  const { data } = await supabase
    .from('properties')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(6)
  return data || []
}

export default async function EnBuyerHomePage() {
  const properties = await getLatestProperties()

  return (
    <>
      <Nav lang="en" />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#050f08] text-white min-h-[85vh] flex items-center">
        {/* Background layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#050f08] via-[#0a1f12] to-[#05100a]" />
          {/* Warm amber accent glow */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2d5a3d]/25 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4" />
          {/* Deep green glow left */}
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#5a3e18]/10 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />
          {/* Gold accent point */}
          <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-[#c9a96e]/5 rounded-full blur-2xl" />
          {/* Grid overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-en" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-en)" />
          </svg>
        </div>

        <div className="relative max-w-5xl mx-auto px-6 py-24 w-full">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-[#7ecfa0]" />
              <p className="text-[#7ecfa0] text-xs font-medium tracking-[0.2em] uppercase">
                For International Buyers
              </p>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-5xl md:text-6xl font-bold leading-[1.1] mb-6">
              Own a piece of Japan
              <br />
              <span className="text-[#7ecfa0]">from $3,000.</span>
            </h1>

            <p className="text-white/60 text-lg leading-relaxed mb-4 max-w-xl">
              Japan has 9 million vacant homes — and they're astonishingly affordable.
              All listings translated to English. Direct contact with owners. No agent fees.
            </p>
            <p className="text-[#7ecfa0]/70 text-sm mb-10">
              🇺🇸 🇬🇧 🇦🇺 🇨🇦 &nbsp; Foreigners can legally purchase property in Japan — no restrictions.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link
                href="/en/akiya"
                className="group inline-flex items-center gap-2 bg-[#7ecfa0] hover:bg-[#5bb882] text-[#050f08] font-bold px-8 py-4 rounded-xl transition-all text-base shadow-lg shadow-[#7ecfa0]/20 hover:shadow-[#7ecfa0]/30 hover:scale-[1.02]"
              >
                Browse Properties
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/" className="text-white/40 text-sm self-center hover:text-white/70 transition">
                🇯🇵 物件を売りたい方はこちら（日本語）
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 mt-14 pt-10 border-t border-white/5">
              {[
                { value: '9,000,000+', label: 'Vacant homes in Japan' },
                { value: 'From $3,000', label: 'Entry-level properties' },
                { value: '47', label: 'Prefectures covered' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-white/40 text-xs mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why buy in Japan */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-6 bg-[#7ecfa0]" />
          <p className="text-[#7ecfa0] text-xs tracking-widest uppercase">Why Japan</p>
        </div>
        <h2 className="font-serif text-3xl font-bold text-[#1a0e06] mb-12">
          Why Buy in Japan?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              num: '01',
              title: 'Shockingly Affordable',
              desc: 'Traditional homes from as low as ¥500,000 (~$3,000 USD). Rural areas have near-zero land prices with livable structures.',
            },
            {
              num: '02',
              title: 'Own a Piece of History',
              desc: 'Ancient kominka farmhouses, machiya townhouses, and mountain retreats. Architecture you can\'t find anywhere else.',
            },
            {
              num: '03',
              title: 'Municipality Subsidies',
              desc: 'Many towns offer relocation subsidies up to ¥1,000,000 for foreign buyers who move in and revitalize the community.',
            },
          ].map((item) => (
            <div key={item.num} className="group relative p-6 rounded-2xl border border-[#e2d8cc] hover:border-[#7ecfa0]/50 bg-white hover:shadow-card transition-all">
              <p className="font-serif text-5xl font-bold text-[#e2d8cc] group-hover:text-[#7ecfa0]/30 transition-colors mb-4 leading-none">
                {item.num}
              </p>
              <h3 className="font-serif font-bold text-[#1a0e06] mb-2 text-lg">{item.title}</h3>
              <p className="text-sm text-[#8a7a68] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest listings */}
      <section className="bg-[#f5f0e8] border-y border-[#e2d8cc] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-6 bg-[#7ecfa0]" />
            <p className="text-[#7ecfa0] text-xs tracking-widest uppercase">Listings</p>
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#1a0e06] mb-10">
            Latest Properties
          </h2>

          {properties.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-serif text-4xl text-[#e2d8cc] mb-4">家</p>
              <p className="text-[#8a7a68] text-lg mb-1">Listings coming soon</p>
              <p className="text-sm text-[#8a7a68]/60">We're adding properties across Japan</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((p: any) => (
                  <PropertyCard key={p.id} p={p} lang="en" />
                ))}
              </div>
              <div className="text-center mt-10">
                <Link
                  href="/en/akiya"
                  className="inline-flex items-center gap-2 bg-[#1a3d2b] text-white font-bold px-10 py-4 rounded-xl hover:bg-[#0a1f12] transition shadow-lg hover:shadow-xl hover:scale-[1.02]"
                >
                  View All Properties →
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-6 bg-[#7ecfa0]" />
          <p className="text-[#7ecfa0] text-xs tracking-widest uppercase">FAQ</p>
        </div>
        <h2 className="font-serif text-3xl font-bold text-[#1a0e06] mb-10">
          FAQ for Foreign Buyers
        </h2>
        <div className="space-y-3">
          {[
            {
              q: 'Can foreigners buy property in Japan?',
              a: 'Yes. Japan has no restrictions on foreign property ownership. You can buy as a non-resident without a visa.',
            },
            {
              q: 'Do I need to visit Japan to buy?',
              a: 'Initial contact and negotiation can be done remotely. A visit is recommended before signing, but not required.',
            },
            {
              q: 'Are there hidden fees?',
              a: 'No agent fees on this site. Standard Japanese property purchase taxes apply (typically 3–7% of purchase price).',
            },
            {
              q: 'What is a "kominka"?',
              a: 'A kominka is a traditional Japanese farmhouse, often 50–150+ years old. They feature wooden beams, tatami floors, and engawa verandahs.',
            },
          ].map((item) => (
            <div key={item.q} className="border border-[#e2d8cc] rounded-xl p-5 hover:border-[#7ecfa0]/40 transition bg-white">
              <p className="font-semibold text-[#1a0e06] mb-1.5">Q. {item.q}</p>
              <p className="text-sm text-[#8a7a68]">A. {item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer lang="en" />
    </>
  )
}
