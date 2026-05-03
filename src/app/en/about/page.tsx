import type { Metadata } from 'next'
import { Nav, Footer } from '@/components/Nav'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Akiya Japan — Japan\'s English Akiya Database',
  description: 'Akiya Japan aggregates and translates vacant house (akiya) listings from 1,800+ Japanese municipal programs into English. Learn about our data sources and editorial standards.',
  alternates: {
    canonical: 'https://akiya.mitorahub.com/en/about',
    languages: { 'en': 'https://akiya.mitorahub.com/en/about' },
  },
}

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://akiya.mitorahub.com/#organization',
      name: 'Akiya Japan',
      url: 'https://akiya.mitorahub.com',
      description: 'English-language aggregator of Japanese municipal akiya (vacant house) bank listings. Data sourced from 1,800+ municipal programs across Japan.',
      areaServed: 'JP',
      knowsAbout: [
        'Akiya (Japanese vacant houses)',
        'Japanese real estate for foreigners',
        'Rural property in Japan',
        'Kominka (traditional farmhouses)',
        'Japanese municipal akiya bank programs',
      ],
    },
    {
      '@type': 'WebPage',
      '@id': 'https://akiya.mitorahub.com/en/about',
      url: 'https://akiya.mitorahub.com/en/about',
      name: 'About Akiya Japan',
      inLanguage: 'en',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://akiya.mitorahub.com/en' },
          { '@type': 'ListItem', position: 2, name: 'About', item: 'https://akiya.mitorahub.com/en/about' },
        ],
      },
    },
  ],
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <Nav lang="en" />
      <main className="max-w-3xl mx-auto px-6 py-16">

        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-6 bg-[#e07070]" />
          <p className="text-[#e07070] text-xs tracking-widest uppercase">About This Service</p>
        </div>
        <h1 className="font-serif text-4xl font-bold text-stone-900 mb-6">
          About Akiya Japan
        </h1>
        <p className="text-stone-500 leading-relaxed mb-12 text-base">
          Japan&apos;s largest English-language database of vacant houses (akiya) — aggregated and translated
          from over 1,800 municipal programs across Japan.
        </p>

        {/* Mission */}
        <section className="bg-stone-50 rounded-2xl p-8 mb-10">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">Our Mission</h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Japan has over 9 million vacant homes — a figure that grows each year due to demographic shifts
            and rural depopulation. Yet most of this inventory is invisible to international audiences due to
            language barriers and fragmented local data sources.
          </p>
          <p className="text-sm text-stone-600 leading-relaxed mt-3">
            Akiya Japan collects, translates, and structures this data into a single searchable,
            English-language resource — giving international buyers direct access to Japan&apos;s
            rural property market without needing to speak Japanese.
          </p>
        </section>

        {/* E-E-A-T: Expertise */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">Our Expertise</h2>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            {[
              { stat: '1,800+', label: 'Municipal akiya programs monitored' },
              { stat: '9M+',   label: 'Vacant properties in Japan (government data)' },
              { stat: 'EN/JA', label: 'Bilingual listings with English translation' },
            ].map(({ stat, label }) => (
              <div key={stat} className="bg-white border border-stone-200 rounded-xl p-5 text-center">
                <p className="text-3xl font-bold text-[#e07070] mb-1">{stat}</p>
                <p className="text-xs text-stone-500 leading-snug">{label}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-stone-600 leading-relaxed">
            Our team has direct experience researching and purchasing rural Japanese property as foreigners.
            Every guide we publish reflects firsthand knowledge of the buying process — from initial inquiry
            to land registry registration.
          </p>
        </section>

        {/* What we are NOT */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">What We Are (and Are Not)</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-emerald-200 rounded-xl p-5">
              <p className="font-semibold text-stone-900 mb-3 text-sm">✅ We are a:</p>
              <ul className="space-y-2 text-sm text-stone-500">
                <li>• Property data aggregator</li>
                <li>• English-language translation service</li>
                <li>• Research and information resource</li>
                <li>• Guide publisher for foreign buyers</li>
              </ul>
            </div>
            <div className="bg-white border border-stone-200 rounded-xl p-5">
              <p className="font-semibold text-stone-900 mb-3 text-sm">❌ We are not a:</p>
              <ul className="space-y-2 text-sm text-stone-500">
                <li>• Real estate agency or broker</li>
                <li>• Investment advisor</li>
                <li>• Party to any property transaction</li>
                <li>• Representative of any municipality</li>
              </ul>
            </div>
          </div>
        </section>

        {/* E-E-A-T: Data sources & editorial standards */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">Data Sources & Editorial Standards</h2>
          <ol className="space-y-4 text-sm text-stone-600">
            <li className="flex gap-3">
              <span className="font-bold text-[#e07070] text-lg leading-none flex-shrink-0">1.</span>
              <span><strong className="text-stone-800">Municipal akiya bank programs</strong> — We monitor publicly available listings from over 1,800 Japanese municipal governments. Data is attributed to the issuing municipality in every listing.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#e07070] text-lg leading-none flex-shrink-0">2.</span>
              <span><strong className="text-stone-800">Owner-submitted records</strong> — Property owners and local agents can submit vacant properties directly through our data submission portal. All submissions are reviewed before publication.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#e07070] text-lg leading-none flex-shrink-0">3.</span>
              <span><strong className="text-stone-800">Government statistics</strong> — Figures on Japan&apos;s vacant housing stock are sourced from the Ministry of Land, Infrastructure, Transport and Tourism (国土交通省) and Statistics Bureau of Japan.</span>
            </li>
          </ol>
          <p className="text-xs text-stone-400 mt-4 italic">
            Data accuracy is not guaranteed — property availability changes. Users should independently verify any listing before making decisions.
          </p>
        </section>

        {/* Contact */}
        <section className="bg-stone-50 rounded-2xl p-8 mb-10">
          <h2 className="text-2xl font-bold text-stone-900 mb-3">Contact</h2>
          <p className="text-sm text-stone-600 leading-relaxed mb-2">
            For enquiries about listings, data accuracy, or partnerships:
          </p>
          <a
            href="mailto:apartmentxjp@gmail.com"
            className="text-[#e07070] font-semibold text-sm hover:underline"
          >
            apartmentxjp@gmail.com
          </a>
        </section>

        {/* CTA */}
        <div className="text-center border-t border-stone-200 pt-10">
          <p className="text-stone-500 text-sm mb-6">Ready to explore the database?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/en/akiya"
              className="inline-flex items-center gap-2 bg-[#e07070] hover:bg-[#cc5c5c] text-white font-bold px-8 py-3 rounded-xl transition"
            >
              Browse Properties
            </Link>
            <Link
              href="/en/faq"
              className="inline-flex items-center gap-2 border-2 border-stone-200 hover:border-[#e07070] text-stone-600 hover:text-[#e07070] font-bold px-8 py-3 rounded-xl transition"
            >
              Read FAQ
            </Link>
          </div>
        </div>
      </main>
      <Footer lang="en" />
    </>
  )
}
