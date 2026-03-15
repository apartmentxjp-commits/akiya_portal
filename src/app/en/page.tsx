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

export default async function EnHomePage() {
  const properties = await getLatestProperties()

  return (
    <>
      <Nav lang="en" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#3d2b10] via-[#5a3e18] to-[#4a7c59] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">🏯</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Find Your Dream<br />Japanese Home
          </h1>
          <p className="text-lg text-white/80 mb-4 max-w-2xl mx-auto">
            Discover traditional Japanese houses (akiya & kominka) for sale across Japan.
            Affordable properties, AI-translated listings, direct contact with owners.
          </p>
          <p className="text-sm text-[#c9a96e] mb-8">
            🌏 Listings available in English — No Japanese required
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/en/akiya"
              className="bg-[#c9a96e] hover:bg-[#b8924a] text-[#2c2416] font-bold px-8 py-3 rounded-lg transition"
            >
              🔍 Browse Properties
            </Link>
            <Link
              href="/submit"
              className="border-2 border-white/60 hover:border-white hover:bg-white/10 text-white font-bold px-8 py-3 rounded-lg transition"
            >
              🏠 List Your Property (Free)
            </Link>
          </div>
        </div>
      </section>

      {/* Why Japan */}
      <section className="bg-[#f5f0e8] py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-[#2c2416] mb-8">Why Buy in Japan?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '💰', title: 'Incredibly Affordable', desc: 'Traditional homes from as low as ¥500,000. Some properties are nearly free in rural areas.' },
              { icon: '🏯', title: 'Unique Architecture', desc: 'Own a piece of Japanese history — ancient farmhouses, machiya townhouses, and mountain retreats.' },
              { icon: '🌿', title: 'Rural Living', desc: 'Escape the city. Many areas offer relocation subsidies and a peaceful countryside lifestyle.' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-[#2c2416] mb-2">{item.title}</h3>
                <p className="text-sm text-[#8a7a68] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Properties */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-[#2c2416] mb-2">Latest Listings</h2>
          <p className="text-[#8a7a68]">Traditional Japanese properties available now</p>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-20 text-[#8a7a68]">
            <div className="text-5xl mb-4">🏚️</div>
            <p className="text-lg mb-2">No listings yet</p>
            <p className="text-sm mb-6">Be the first to list your Japanese property!</p>
            <Link href="/submit" className="bg-[#5a3e18] text-white px-6 py-2 rounded-lg hover:bg-[#3d2b10] transition">
              List a Property
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((p: any) => (
                <PropertyCard key={p.id} p={p} lang="en" />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/en/akiya" className="border-2 border-[#5a3e18] text-[#5a3e18] px-8 py-3 rounded-lg font-bold hover:bg-[#5a3e18] hover:text-white transition">
                View All Properties →
              </Link>
            </div>
          </>
        )}
      </section>

      <Footer lang="en" />
    </>
  )
}
