import Link from 'next/link'
import { Nav, Footer } from '@/components/Nav'
import { PropertyCard } from '@/components/PropertyCard'
import { supabase, PUBLIC_PROPERTY_FIELDS } from '@/lib/supabase'

async function getLatestProperties() {
  const { data } = await supabase
    .from('properties')
    .select(PUBLIC_PROPERTY_FIELDS)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(8)
  return data || []
}

// Prefecture/city English translation maps (same as akiya page)
const PREFECTURE_EN: Record<string, string> = {
  '北海道':'Hokkaido','青森県':'Aomori','岩手県':'Iwate','宮城県':'Miyagi','秋田県':'Akita',
  '山形県':'Yamagata','福島県':'Fukushima','茨城県':'Ibaraki','栃木県':'Tochigi','群馬県':'Gunma',
  '埼玉県':'Saitama','千葉県':'Chiba','東京都':'Tokyo','神奈川県':'Kanagawa','新潟県':'Niigata',
  '富山県':'Toyama','石川県':'Ishikawa','福井県':'Fukui','山梨県':'Yamanashi','長野県':'Nagano',
  '岐阜県':'Gifu','静岡県':'Shizuoka','愛知県':'Aichi','三重県':'Mie','滋賀県':'Shiga',
  '京都府':'Kyoto','大阪府':'Osaka','兵庫県':'Hyogo','奈良県':'Nara','和歌山県':'Wakayama',
  '鳥取県':'Tottori','島根県':'Shimane','岡山県':'Okayama','広島県':'Hiroshima','山口県':'Yamaguchi',
  '徳島県':'Tokushima','香川県':'Kagawa','愛媛県':'Ehime','高知県':'Kochi','福岡県':'Fukuoka',
  '佐賀県':'Saga','長崎県':'Nagasaki','熊本県':'Kumamoto','大分県':'Oita','宮崎県':'Miyazaki',
  '鹿児島県':'Kagoshima','沖縄県':'Okinawa',
}
const CITY_EN: Record<string, string> = {
  '亀岡市':'Kameoka','安曇野市':'Azumino','軽井沢町':'Karuizawa','飯山市':'Iiyama',
  '小千谷市':'Ojiya','雲南市':'Unnan','那智勝浦町':'Nachikatsura','三好市':'Miyoshi',
  '南丹市':'Nantan','大山町':'Daisen','西粟倉村':'Nishiawakura',
}
function locationEn(prefecture: string, city?: string): string {
  const pref = PREFECTURE_EN[prefecture] || prefecture
  if (!city) return pref
  const cityEn = CITY_EN[city] || city.replace(/[市町村区郡]$/, '')
  return `${cityEn}, ${pref}`
}

// Placeholder properties with real Unsplash photos (shown when DB has no images)
const SAMPLE_PROPS = [
  { loc: 'Kameoka, Kyoto',    price: '$18,667', photo: 'photo-1528360983277-13d401cdc186' },
  { loc: 'Azumino, Nagano',   price: '$10,000', photo: 'photo-1545569341-9eb8b30979d9' },
  { loc: 'Karuizawa, Nagano', price: '$42,000', photo: 'photo-1480796927426-f609979314bd' },
  { loc: 'Iiyama, Nagano',    price: '$14,000', photo: 'photo-1490806843957-31f4c9a91c65' },
  { loc: 'Unnan, Shimane',    price: '$8,000',  photo: 'photo-1542051841857-5f90071e7989' },
  { loc: 'Miyoshi, Tokushima',price: '$5,500',  photo: 'photo-1524413840807-0c3cb6fa808d' },
  { loc: 'Daisen, Tottori',   price: '$22,000', photo: 'photo-1466442929976-97f336a657be' },
  { loc: 'Ojiya, Niigata',    price: '$6,500',  photo: 'photo-1578469645742-46cae010e5d4' },
]

export default async function EnHomePage() {
  const properties = await getLatestProperties()

  return (
    <>
      <Nav lang="en" />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[75vh] min-h-[500px] flex items-center overflow-hidden">
        {/* Background photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=1920&auto=format&fit=crop&q=80"
          alt="Traditional Japanese farmhouse village"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative max-w-6xl mx-auto px-6 w-full">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 max-w-2xl">
            Find Your Dream<br />Home In Japan
          </h1>
          <Link
            href="/en/akiya"
            className="inline-block bg-[#e07070] hover:bg-[#cc5c5c] text-white font-bold px-10 py-4 rounded-full text-sm uppercase tracking-widest transition shadow-lg hover:shadow-xl hover:scale-[1.02]"
          >
            Browse Properties
          </Link>
        </div>
      </section>

      {/* ── 3-feature row ────────────────────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                ),
                title: 'One Step Closer To Your Dream',
                desc: "Japan doesn't have to be expensive. We've catalogued thousands of properties for less than $100k, even under $30k. Your dream home in Japan is waiting.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                  </svg>
                ),
                title: 'Full Database Access',
                desc: 'Subscribe to get the full address, all photos, complete specifications, and direct contact info for every property — all in English.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                ),
                title: 'Info On Buying A House in Japan',
                desc: 'Get our free guide on buying a house in Japan as a foreigner — just like & repost on X. All the info you need to buy confidently without speaking Japanese.',
              },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#e07070]/10 rounded-full flex items-center justify-center text-[#e07070]">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-bold text-stone-800 text-base mb-2">{f.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Did you know ─────────────────────────────────────────────────── */}
      <section className="bg-[#f9f9f9] py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-stone-800 mb-5">
            Did You Know You Can Buy a House in Japan?
          </h2>
          <p className="text-stone-600 leading-relaxed mb-4">
            Yes — even as a non-resident. Even on a tourist visa. You can purchase property in Japan
            and have full ownership. This is a little-known secret.
          </p>
          <p className="text-stone-600 leading-relaxed mb-4">
            Japan is one of the best and most underrated places in the world to own a vacation home.
            Housing costs are incredibly low, property taxes are minimal, and it&apos;s an extraordinary
            place to spend time.
          </p>
          <Link
            href="/en/faq"
            className="text-[#e07070] hover:text-[#cc5c5c] font-semibold text-sm transition"
          >
            Read the FAQ for more information →
          </Link>
        </div>
      </section>

      {/* ── Featured Properties ──────────────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-stone-800 text-center mb-3">Featured Properties</h2>
          <p className="text-stone-500 text-sm text-center mb-10">A sample of properties available in our database</p>

          {(() => {
            // Use DB properties that have images; fill remaining slots with sample props
            const withPhotos = properties.filter((p: any) => p.images && p.images.length > 0)
            const slotsNeeded = Math.max(0, 8 - withPhotos.length)
            const samples = SAMPLE_PROPS.slice(0, slotsNeeded)
            return (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {withPhotos.slice(0, 8).map((p: any) => {
                  const priceUSD = p.price ? `$${Math.round(p.price * 10000 / 150).toLocaleString()}` : 'POA'
                  return (
                    <Link
                      key={p.id}
                      href="/en/subscribe"
                      className="group relative block aspect-square overflow-hidden rounded-xl"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.images[0]}
                        alt={p.title_en || p.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-white font-bold text-sm">{priceUSD}</p>
                        <p className="text-white/80 text-xs">{locationEn(p.prefecture, p.city)}</p>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="bg-white text-stone-800 text-xs font-bold px-3 py-1.5 rounded-full">Subscribe to view</span>
                      </div>
                    </Link>
                  )
                })}
                {samples.map((s, i) => (
                  <Link
                    key={`sample-${i}`}
                    href="/en/subscribe"
                    className="group relative block aspect-square overflow-hidden rounded-xl"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://images.unsplash.com/${s.photo}?w=600&auto=format&fit=crop&q=80`}
                      alt={s.loc}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white font-bold text-sm">{s.price}</p>
                      <p className="text-white/80 text-xs">{s.loc}</p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-white text-stone-800 text-xs font-bold px-3 py-1.5 rounded-full">Subscribe to view</span>
                    </div>
                  </Link>
                ))}
              </div>
            )
          })()}

          <div className="text-center mt-8">
            <Link
              href="/en/akiya"
              className="inline-block border-2 border-stone-200 hover:border-[#e07070] text-stone-600 hover:text-[#e07070] font-semibold px-8 py-3 rounded-full text-sm transition"
            >
              Browse All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* ── Subscribe CTA ────────────────────────────────────────────────── */}
      <section className="bg-[#f9f9f9] py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-stone-800 mb-5">
            Get Full Access to Japan&apos;s Largest<br />English Akiya Database
          </h2>
          <p className="text-stone-600 leading-relaxed mb-2">
            Subscribe to unlock full addresses, all photos, complete specifications, and direct contact
            info for every property in our database. Most properties under $150k, many under $30k.
          </p>
          <p className="text-stone-500 text-sm mb-8">
            Data sourced from 1,800+ Japanese municipal akiya bank programs.
          </p>
          <Link
            href="/en/subscribe"
            className="inline-block bg-[#e07070] hover:bg-[#cc5c5c] text-white font-bold px-10 py-4 rounded-full text-sm uppercase tracking-widest transition shadow-md hover:shadow-lg"
          >
            Get Full Access — $7.99/month
          </Link>
          <p className="text-stone-400 text-xs mt-3">Cancel anytime · No Japanese required · Instant access</p>
        </div>
      </section>

      {/* ── Guide (free via X) ───────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#e07070] text-xs font-bold uppercase tracking-widest mb-3">Free Guide</p>
              <h2 className="text-3xl font-bold text-stone-800 mb-5 leading-tight">
                How To Buy A House<br />In Japan Guide
              </h2>
              <p className="text-stone-600 leading-relaxed mb-6">
                Our comprehensive guide covers everything a foreigner needs to know about
                purchasing property in Japan — from finding listings, to the step-by-step
                purchase process, hidden costs, renovation subsidies, and managing your
                property from abroad.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  'Step-by-step purchase process',
                  'How to find and evaluate properties',
                  'Costs, taxes, and hidden fees',
                  'Working without a Japanese translator',
                  'Managing your home from overseas',
                  'Japan visa & long-stay considerations',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-stone-600">
                    <span className="w-4 h-4 bg-[#e07070]/15 text-[#e07070] rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/en/guide"
                className="inline-block bg-[#e07070] hover:bg-[#cc5c5c] text-white font-bold px-8 py-3.5 rounded-full text-sm uppercase tracking-wider transition shadow-md"
              >
                Get The Free Guide
              </Link>
              <p className="text-stone-400 text-xs mt-3">
                Free — just like &amp; repost on X to unlock
              </p>
            </div>
            {/* Ebook mockup */}
            <div className="flex justify-center">
              <div className="relative w-64">
                {/* Tablet frame */}
                <div className="bg-stone-900 rounded-[24px] p-3 shadow-2xl">
                  <div className="bg-stone-800 rounded-[18px] overflow-hidden">
                    {/* Screen */}
                    <div className="relative bg-gradient-to-br from-stone-700 via-stone-600 to-stone-500 aspect-[3/4] flex flex-col items-center justify-center p-6">
                      <div className="text-center">
                        <div className="text-6xl mb-4">🏯</div>
                        <p className="text-white font-bold text-lg leading-tight mb-1">HOW TO BUY A<br />HOUSE IN JAPAN</p>
                        <p className="text-white/60 text-xs mt-2">A foreigner&apos;s guide to finding your dream property in the Land of the Rising Sun</p>
                        <div className="mt-4 border-t border-white/20 pt-3">
                          <p className="text-white/50 text-[10px] uppercase tracking-widest">Akiya Japan</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Home button */}
                  <div className="flex justify-center mt-2">
                    <div className="w-8 h-1.5 bg-stone-600 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────────────────── */}
      <section className="bg-[#f9f9f9] py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">What Is Akiya Japan?</h2>
          <p className="text-stone-600 leading-relaxed mb-4">
            Japan&apos;s akiya crisis has left over 9 million homes vacant across the country. Local governments
            are actively inviting foreign buyers — some properties sell for as little as $1,000. The problem?
            All the information is in Japanese and scattered across 1,800+ municipal websites.
          </p>
          <p className="text-stone-600 leading-relaxed mb-4">
            We collect, translate, and publish these listings in English — giving international buyers
            a single place to search all of Japan&apos;s available vacant homes.
          </p>
          <p className="text-stone-600 leading-relaxed">
            Browse free. Subscribe to unlock full addresses, photos, and contact details for every property.
          </p>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="bg-white py-14">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-stone-800 mb-5">Subscribe Now</h2>
          <Link
            href="/en/subscribe"
            className="inline-block bg-[#e07070] hover:bg-[#cc5c5c] text-white font-bold px-10 py-4 rounded-full text-sm uppercase tracking-widest transition shadow-md hover:shadow-lg"
          >
            Get Full Access — $7.99/month
          </Link>
        </div>
      </section>

      <Footer lang="en" />
    </>
  )
}
