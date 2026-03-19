import { Nav, Footer } from '@/components/Nav'
import Link from 'next/link'

export const metadata = {
  title: 'About | Japan Property Data Library',
  description: 'About Japan Property Data Library — a structured database of vacant homes across Japan.',
}

export default function AboutPage() {
  return (
    <>
      <Nav lang="en" />
      <main className="max-w-3xl mx-auto px-6 py-16">

        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-6 bg-[#7ecfa0]" />
          <p className="text-[#7ecfa0] text-xs tracking-widest uppercase">About This Service</p>
        </div>
        <h1 className="font-serif text-4xl font-bold text-[#1a0e06] mb-6">
          Japan Property Data Library
        </h1>
        <p className="text-[#8a7a68] leading-relaxed mb-12 text-base">
          A structured, English-language database of akiya — Japan&apos;s vast inventory of vacant and
          underutilized residential properties.
        </p>

        {/* Mission */}
        <section className="bg-[#f5f0e8] rounded-2xl p-8 mb-10">
          <h2 className="font-serif text-2xl font-bold text-[#1a0e06] mb-4">Our Mission</h2>
          <p className="text-sm text-[#8a7a68] leading-relaxed">
            Japan has over 9 million vacant homes — a figure that grows each year due to demographic shifts
            and rural depopulation. Yet most of this inventory is invisible to international audiences due to
            language barriers and fragmented local data sources.
          </p>
          <p className="text-sm text-[#8a7a68] leading-relaxed mt-3">
            Japan Property Data Library collects, translates, and structures this data into a single
            searchable, English-language resource — enabling researchers, investors, and prospective buyers
            worldwide to explore Japan&apos;s property landscape with clarity.
          </p>
        </section>

        {/* What we are NOT */}
        <section className="mb-10">
          <h2 className="font-serif text-2xl font-bold text-[#1a0e06] mb-4">What We Are (and Are Not)</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-[#7ecfa0]/40 rounded-xl p-5">
              <p className="font-semibold text-[#1a0e06] mb-3 text-sm">✅ We are a:</p>
              <ul className="space-y-2 text-sm text-[#8a7a68]">
                <li>• Structured data library</li>
                <li>• Research and information resource</li>
                <li>• Property data aggregator</li>
                <li>• English-language translation service</li>
              </ul>
            </div>
            <div className="bg-white border border-[#e2d8cc] rounded-xl p-5">
              <p className="font-semibold text-[#1a0e06] mb-3 text-sm">❌ We are not a:</p>
              <ul className="space-y-2 text-sm text-[#8a7a68]">
                <li>• Real estate agency or broker</li>
                <li>• Investment advisor</li>
                <li>• Listing or marketplace platform</li>
                <li>• Party to any property transaction</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Data sources */}
        <section className="mb-10">
          <h2 className="font-serif text-2xl font-bold text-[#1a0e06] mb-4">Data Sources</h2>
          <p className="text-sm text-[#8a7a68] leading-relaxed mb-4">
            Our database is built from two sources:
          </p>
          <ol className="space-y-3 text-sm text-[#8a7a68]">
            <li className="flex gap-3">
              <span className="font-serif font-bold text-[#7ecfa0] text-lg leading-none">1.</span>
              <span><strong className="text-[#2c2416]">Owner-submitted records</strong> — Property owners and agents register their vacant properties directly through our data submission portal.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-serif font-bold text-[#7ecfa0] text-lg leading-none">2.</span>
              <span><strong className="text-[#2c2416]">Publicly available data</strong> — Referenced from government statistics and municipal akiya bank programs across Japan.</span>
            </li>
          </ol>
          <p className="text-xs text-[#8a7a68] mt-4 italic">
            All records are reviewed before publication. Data accuracy is not guaranteed — users should conduct independent verification for any decisions.
          </p>
        </section>

        {/* CTA */}
        <div className="text-center border-t border-[#e2d8cc] pt-10">
          <p className="text-[#8a7a68] text-sm mb-6">Ready to explore the database?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/en/akiya"
              className="inline-flex items-center gap-2 bg-[#1a3d2b] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#0a1f12] transition"
            >
              Browse Database
            </Link>
            <Link
              href="/en/subscribe"
              className="inline-flex items-center gap-2 border-2 border-[#5a3e18] text-[#5a3e18] font-bold px-8 py-3 rounded-xl hover:bg-[#5a3e18] hover:text-white transition"
            >
              Full Access — $7.99/mo
            </Link>
          </div>
        </div>
      </main>
      <Footer lang="en" />
    </>
  )
}
