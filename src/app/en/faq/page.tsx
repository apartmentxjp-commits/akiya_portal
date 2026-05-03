import type { Metadata } from 'next'
import { Nav, Footer } from '@/components/Nav'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'FAQ — Buying Akiya in Japan as a Foreigner | Akiya Japan',
  description: 'Answers to the most common questions about buying vacant houses (akiya) in Japan as a foreigner — no Japanese required, no residency needed.',
  alternates: {
    canonical: 'https://akiya.mitorahub.com/en/faq',
    languages: {
      'en': 'https://akiya.mitorahub.com/en/faq',
    },
  },
}

const FAQ_SECTIONS = [
  {
    section: 'About Akiya Japan',
    items: [
      {
        q: 'Who runs Akiya Japan?',
        a: 'Akiya Japan is an independent information platform for international buyers interested in Japanese vacant homes (akiya). We aggregate and translate publicly available property data from Japanese municipal akiya bank programs into English.',
      },
      {
        q: 'Are you a real estate company?',
        a: 'No. We are not a real estate agency, broker, or intermediary. We provide information only. All direct communication about specific properties is between you and the property owner or municipal office. We do not receive commissions.',
      },
      {
        q: 'How do you source the properties?',
        a: 'Properties are sourced from official municipal akiya bank programs across Japan — over 1,800 municipalities publish these listings to attract new residents. We collect, translate, and structure this publicly available data in English.',
      },
    ],
  },
  {
    section: 'Buying Property in Japan',
    items: [
      {
        q: 'Can foreigners buy property in Japan?',
        a: 'Yes. Japan has no restrictions on foreign property ownership. Any individual — regardless of nationality or residency status — can purchase real estate in Japan and have full legal ownership. Even tourist-visa holders can buy.',
      },
      {
        q: 'How cheap are these properties really?',
        a: 'Very. Many akiya start from under ¥1 million ($7,000). Some municipalities even offer properties for ¥0 (free) to attract residents. The catch is renovation costs, which vary from ¥500k for light work to ¥10M+ for full traditional renovation. Our guide covers this in detail.',
      },
      {
        q: 'Do I need to speak Japanese?',
        a: 'Not necessarily. Many municipalities have English-speaking support staff or translation services for foreign buyers. Our platform provides English translations of all listings. We also have a free guide that walks you through the process without a translator.',
      },
      {
        q: 'What are the ongoing costs of owning property in Japan?',
        a: 'Fixed asset tax (固定資産税) is typically very low for rural properties — often ¥10,000–¥100,000 per year ($70–$700). Management fees, utilities, and maintenance are the main ongoing costs. If you\'re not in Japan, you\'ll also want a local caretaker or management service.',
      },
      {
        q: 'Can I use the property as a vacation rental (Airbnb etc.)?',
        a: 'Short-term rental regulations in Japan vary by municipality. Some akiya programs require the buyer to use the property as a primary or secondary residence, not for commercial rental. Always check the specific conditions of each listing.',
      },
    ],
  },
  {
    section: 'Using Akiya Japan',
    items: [
      {
        q: 'What does Free vs Full Access include?',
        a: 'Free access lets you browse all listings with property type, prefecture/city, and price range. Full Access ($7.99/month) unlocks the full address, Google Maps link, all photos, complete specifications (sqm, year built, room count), and the owner/municipality contact details.',
      },
      {
        q: 'How do I contact property owners?',
        a: 'Full Access subscribers can see the contact information (municipality office or direct owner) for every property. You contact them directly — there is no middleman. Most municipal offices have some English support for international inquiries.',
      },
      {
        q: 'How often is the database updated?',
        a: 'New properties are added weekly from municipal akiya bank sources across Japan. Some listings may become unavailable — we recommend contacting the source promptly if you find a property you\'re interested in.',
      },
      {
        q: 'How do I cancel my subscription?',
        a: 'You can cancel anytime from your account settings. Your access continues until the end of the billing period. No questions asked, no fees.',
      },
    ],
  },
  {
    section: 'The Free Guide',
    items: [
      {
        q: 'What is the Japan Property Guide?',
        a: 'Our free ebook guide covers the complete process of buying property in Japan as a foreigner: finding properties, the purchase process, costs, taxes, renovation, managing from overseas, and visa considerations.',
      },
      {
        q: 'How do I get the free guide?',
        a: 'Just like and repost our pinned post on X (@AkiyaJapan), then enter your username on the Guide page. That\'s it — the PDF downloads instantly.',
      },
    ],
  },
]

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://akiya.mitorahub.com/en' },
    { '@type': 'ListItem', position: 2, name: 'FAQ', item: 'https://akiya.mitorahub.com/en/faq' },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_SECTIONS.flatMap((s) =>
    s.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    }))
  ),
}

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Nav lang="en" />

      {/* Hero */}
      <section className="relative h-[45vh] min-h-[320px] flex items-end overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1920&auto=format&fit=crop&q=80"
          alt="Japanese village"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-6xl mx-auto px-6 pb-10 w-full">
          <h1 className="text-5xl font-bold text-white">Frequently Asked Questions</h1>
        </div>
      </section>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="space-y-12">
          {FAQ_SECTIONS.map((section) => (
            <div key={section.section}>
              <h2 className="text-xl font-bold text-stone-800 mb-4 pb-2 border-b border-stone-200">
                {section.section}
              </h2>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <details key={item.q} className="group border border-stone-200 rounded-xl overflow-hidden">
                    <summary className="flex items-center justify-between p-5 cursor-pointer text-[#e07070] font-semibold text-sm hover:bg-stone-50 transition list-none">
                      {item.q}
                      <svg className="w-4 h-4 text-stone-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-5 pb-5 text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-4">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-stone-600 mb-5">Still have questions?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/en/akiya"
              className="inline-block border-2 border-stone-200 hover:border-[#e07070] text-stone-600 hover:text-[#e07070] font-semibold px-8 py-3 rounded-full text-sm transition"
            >
              Browse Properties
            </Link>
            <Link
              href="/en/subscribe"
              className="inline-block bg-[#e07070] hover:bg-[#cc5c5c] text-white font-bold px-8 py-3 rounded-full text-sm transition shadow-md"
            >
              Get Full Access — $7.99/mo
            </Link>
          </div>
        </div>
      </main>

      <Footer lang="en" />
    </>
  )
}
