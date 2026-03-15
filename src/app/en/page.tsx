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

      {/* Hero — buyer focused */}
      <section className="bg-gradient-to-br from-[#0d1f12] via-[#1a3d2b] to-[#2d5a3d] text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#7ecfa0] text-sm font-medium tracking-widest uppercase mb-4">
            For International Buyers
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Buy a Japanese house<br />
            <span className="text-[#7ecfa0]">under $50,000.</span>
          </h1>
          <p className="text-lg text-white/75 mb-4 max-w-2xl mx-auto leading-relaxed">
            Japan has 9 million vacant homes — and they're astonishingly affordable.<br />
            All listings translated to English. Direct contact with owners. No agent fees.
          </p>
          <p className="text-sm text-white/50 mb-8">
            🇺🇸 🇬🇧 🇦🇺 🇨🇦 Foreigners can legally purchase property in Japan
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/en/akiya"
              className="bg-[#7ecfa0] hover:bg-[#5bb882] text-[#0d1f12] font-bold px-10 py-4 rounded-xl transition text-lg"
            >
              🔍 Browse Properties
            </Link>
          </div>

          <div className="mt-8 border-t border-white/10 pt-8">
            <Link href="/" className="text-white/40 text-sm hover:text-white/60 transition">
              🇯🇵 物件を売りたい方はこちら（日本語）→
            </Link>
          </div>
        </div>
      </section>

      {/* Social proof / key stats */}
      <section className="bg-[#f0f7f2] py-10 border-b border-[#c8e0d0]">
        <div className="max-w-3xl mx-auto px-4 grid grid-cols-3 gap-6 text-center">
          {[
            { icon: '🏘️', value: '9,000,000+', label: 'Vacant homes in Japan' },
            { icon: '💵', value: 'From $3,000', label: 'Entry-level properties' },
            { icon: '🌿', value: '47 Prefectures', label: 'Listings nationwide' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl mb-1">{s.icon}</div>
              <div className="font-bold text-[#1a3d2b] text-lg">{s.value}</div>
              <div className="text-[#6a9a78] text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why buy in Japan */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center text-[#1a3d2b] mb-10">Why Buy in Japan?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: '💰',
              title: 'Shockingly Affordable',
              desc: 'Traditional homes from as low as ¥500,000 (~$3,000 USD). Rural areas have near-zero prices.',
            },
            {
              icon: '🏯',
              title: 'Own a Piece of History',
              desc: 'Ancient kominka farmhouses, machiya townhouses, and mountain retreats. Architecture you can\'t find anywhere else.',
            },
            {
              icon: '🌿',
              title: 'Countryside Escape',
              desc: 'Many municipalities offer relocation subsidies up to ¥1,000,000 for foreign buyers who move in.',
            },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-[#1a3d2b] mb-2">{item.title}</h3>
              <p className="text-sm text-[#6a9a78] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest listings */}
      <section className="bg-[#f0f7f2] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#1a3d2b] mb-2">Latest Listings</h2>
            <p className="text-[#6a9a78]">Traditional Japanese properties — all listings in English</p>
          </div>

          {properties.length === 0 ? (
            <div className="text-center py-20 text-[#6a9a78]">
              <div className="text-5xl mb-4">🏡</div>
              <p className="text-lg mb-2">Listings coming soon</p>
              <p className="text-sm">We're adding properties across Japan</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((p: any) => (
                  <PropertyCard key={p.id} p={p} lang="en" />
                ))}
              </div>
              <div className="text-center mt-10">
                <Link href="/en/akiya" className="bg-[#2d5a3d] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#1a3d2b] transition inline-block">
                  View All Properties →
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* FAQ for foreign buyers */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-[#1a3d2b] text-center mb-8">FAQ for Foreign Buyers</h2>
        <div className="space-y-4">
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
            <div key={item.q} className="border border-[#c8e0d0] rounded-xl p-5 bg-white">
              <p className="font-bold text-[#1a3d2b] mb-1">Q. {item.q}</p>
              <p className="text-sm text-[#6a9a78]">A. {item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer lang="en" />
    </>
  )
}
