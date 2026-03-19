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
    .limit(6)
  return data || []
}

export default async function EnHomePage() {
  const entries = await getLatestEntries()

  return (
    <>
      <Nav lang="en" />

      {/* Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#050f08] text-white min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#050f08] via-[#0a1f12] to-[#05100a]" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2d5a3d]/25 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#5a3e18]/10 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />
          <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-[#c9a96e]/5 rounded-full blur-2xl" />
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
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-[#7ecfa0]" />
              <p className="text-[#7ecfa0] text-xs font-medium tracking-[0.2em] uppercase">
                Japan Property Data Library
              </p>
            </div>

            <h1 className="font-serif text-5xl md:text-6xl font-bold leading-[1.1] mb-6">
              Explore Japan&apos;s
              <br />
              <span className="text-[#7ecfa0]">vacant home database.</span>
            </h1>

            <p className="text-white/60 text-lg leading-relaxed mb-4 max-w-xl">
              A structured data library of akiya (vacant homes) across all 47 prefectures.
              Browse property records, filter by area and price range, and view detailed data entries.
            </p>
            <p className="text-[#7ecfa0]/70 text-sm mb-10">
              🗾 9,000,000+ vacant properties recorded nationwide · Updated weekly
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link
                href="/en/akiya"
                className="group inline-flex items-center gap-2 bg-[#7ecfa0] hover:bg-[#5bb882] text-[#050f08] font-bold px-8 py-4 rounded-xl transition-all text-base shadow-lg shadow-[#7ecfa0]/20 hover:shadow-[#7ecfa0]/30 hover:scale-[1.02]"
              >
                Explore Database
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/" className="text-white/40 text-sm self-center hover:text-white/70 transition">
                🇯🇵 物件を掲載したい方はこちら
              </Link>
            </div>

            <div className="flex items-center gap-8 mt-14 pt-10 border-t border-white/5">
              {[
                { value: '9M+', label: 'Vacant homes recorded' },
                { value: '47', label: 'Prefectures covered' },
                { value: 'Weekly', label: 'Data updates' },
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

      {/* Why this database exists ───────────────────────────────────────── */}
      <section className="bg-[#f5f0e8] border-y border-[#e2d8cc] py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-6 bg-[#7ecfa0]" />
            <p className="text-[#7ecfa0] text-xs tracking-widest uppercase">Background</p>
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#1a0e06] mb-10">
            Japan&apos;s Vacant Home Crisis — In Numbers
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              {
                stat: '9,000,000+',
                label: 'Vacant homes in Japan',
                note: 'As of the 2023 Housing & Land Survey (Ministry of Internal Affairs)',
              },
              {
                stat: '13.8%',
                label: 'Of all housing stock',
                note: 'Japan\'s vacancy rate is among the highest of any developed nation',
              },
              {
                stat: '47',
                label: 'Prefectures covered',
                note: 'Our database aggregates data from municipal akiya bank programs nationwide',
              },
            ].map((item) => (
              <div key={item.stat} className="bg-white rounded-2xl border border-[#e2d8cc] p-6">
                <p className="font-serif text-4xl font-bold text-[#1a3d2b] mb-1">{item.stat}</p>
                <p className="font-semibold text-[#1a0e06] text-sm mb-2">{item.label}</p>
                <p className="text-xs text-[#8a7a68] leading-relaxed">{item.note}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-[#8a7a68] leading-relaxed max-w-2xl">
            Despite this scale, most of Japan&apos;s vacant property inventory is invisible to international audiences —
            scattered across local government websites, available only in Japanese.
            Japan Property Data Library collects, translates, and structures this data into a single
            English-language resource for researchers, investors, and buyers worldwide.
          </p>
        </div>
      </section>

      {/* What this database contains ─────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-6 bg-[#7ecfa0]" />
          <p className="text-[#7ecfa0] text-xs tracking-widest uppercase">Database Contents</p>
        </div>
        <h2 className="font-serif text-3xl font-bold text-[#1a0e06] mb-12">
          What data is available?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              num: '01',
              title: 'Property Records',
              desc: 'Structured data for each entry: area (m²), year of construction, property type, price range, and prefecture/city location.',
            },
            {
              num: '02',
              title: 'Area Information',
              desc: 'Geographic distribution across all 47 prefectures. Filter by region, rural/urban classification, and price band.',
            },
            {
              num: '03',
              title: 'Full-Access Data',
              desc: 'Subscribers access complete records including detailed descriptions (English-translated) and registration contact data.',
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

      {/* Access tiers ───────────────────────────────────────────────────── */}
      <section className="bg-[#f5f0e8] border-y border-[#e2d8cc] py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-6 bg-[#7ecfa0]" />
            <p className="text-[#7ecfa0] text-xs tracking-widest uppercase">Data Access Tiers</p>
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#1a0e06] mb-10">Full Data Access</h2>
          <div className="max-w-md mx-auto mb-10">
            <div className="bg-white rounded-2xl border-2 border-[#5a3e18] p-8">
              <div className="text-xs font-semibold uppercase tracking-widest text-[#5a3e18] mb-6">Full Access — $7.99/mo</div>
              <ul className="space-y-3 text-sm text-[#2c2416]">
                {[
                  'Property title, prefecture & city',
                  'Price range & property type',
                  'Land / building area',
                  'Full English description',
                  'Property history data',
                  'Registrant contact field',
                  'Unlimited data exports',
                ].map(f => (
                  <li key={f} className="flex items-center gap-2"><span className="text-[#5a3e18]">✓</span> {f}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="text-center">
            <Link
              href="/en/subscribe"
              className="inline-flex items-center gap-2 bg-[#5a3e18] text-white font-bold px-10 py-4 rounded-xl hover:bg-[#3d2b10] transition shadow-lg hover:shadow-xl hover:scale-[1.02]"
            >
              Unlock Full Data Access →
            </Link>
          </div>
        </div>
      </section>

      {/* Latest data entries ────────────────────────────────────────────── */}
      {entries.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-6 bg-[#7ecfa0]" />
            <p className="text-[#7ecfa0] text-xs tracking-widest uppercase">Latest Entries</p>
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#1a0e06] mb-10">
            Recently Added Data
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {entries.map((p: any) => (
              <PropertyCard key={p.id} p={p} lang="en" />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/en/akiya"
              className="inline-flex items-center gap-2 bg-[#1a3d2b] text-white font-bold px-10 py-4 rounded-xl hover:bg-[#0a1f12] transition shadow-lg"
            >
              View Full Database →
            </Link>
          </div>
        </section>
      )}

      {/* FAQ ────────────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-6 bg-[#7ecfa0]" />
          <p className="text-[#7ecfa0] text-xs tracking-widest uppercase">FAQ</p>
        </div>
        <h2 className="font-serif text-3xl font-bold text-[#1a0e06] mb-10">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {[
            {
              q: 'What is this service?',
              a: 'Japan Property Data Library is a structured database of vacant homes (akiya) in Japan. We provide data access for informational and research purposes.',
            },
            {
              q: 'What does a subscription include?',
              a: 'Full data access includes complete property records, English-translated descriptions, property history, and registrant contact fields stored in our database.',
            },
            {
              q: 'What are akiya?',
              a: 'Akiya (空き家) are vacant or abandoned homes. Japan has over 9 million such properties. This database catalogs publicly available information about them.',
            },
            {
              q: 'Is this an estate agency?',
              a: 'No. This is a data library service only. We do not provide brokerage, agency, negotiation, or advisory services of any kind. All data is for informational purposes.',
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
