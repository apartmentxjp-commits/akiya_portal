import { notFound } from 'next/navigation'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { Nav, Footer } from '@/components/Nav'
import { supabase, PUBLIC_PROPERTY_FIELDS } from '@/lib/supabase'
import { isActiveSubscriber } from '@/lib/stripe'
import { locationEn } from '@/lib/locationEn'
import PaywallGate from './PaywallGate'

// cookiesを読むためキャッシュを無効化
export const dynamic = 'force-dynamic'

async function getProperty(id: string) {
  const { data } = await supabase
    .from('properties')
    .select(PUBLIC_PROPERTY_FIELDS)  // address excluded — prefecture + city only
    .eq('id', id)
    .eq('status', 'approved')
    .single()
  return data
}

export default async function EnPropertyDetailPage({ params }: { params: { id: string } }) {
  const p = await getProperty(params.id) as any
  if (!p) notFound()

  // ── Subscription check ────────────────────────────────────────────────────
  const cookieStore = await cookies()
  const subEmail = cookieStore.get('sub_email')?.value || ''
  const subscribed = await isActiveSubscriber(subEmail)
  // ─────────────────────────────────────────────────────────────────────────

  const title = p.title_en || `Property #${p.id}`

  const age = p.year_built ? new Date().getFullYear() - p.year_built : null
  const priceUsd = p.price ? Math.round(p.price * 10000 / 150) : null

  return (
    <>
      <Nav lang="en" />

      <main className="max-w-4xl mx-auto px-4 py-10">
        <Link href="/en/akiya" className="text-[#8a7a68] text-sm hover:text-[#5a3e18] mb-6 inline-block">
          ← Back to listings
        </Link>

        {/* Always-visible teaser: image + title + price ──────────────────── */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            {/* Show actual photo for subscribers; blurred teaser for non-subscribers */}
            {p.images && p.images.length > 0 ? (
              <div className="relative rounded-xl overflow-hidden h-72">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.images[0]}
                  alt={title}
                  className={`w-full h-full object-cover transition-all duration-300 ${subscribed ? '' : 'blur-md scale-105'}`}
                />
                {!subscribed && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <span className="text-white text-sm font-semibold bg-black/50 px-4 py-2 rounded-full">
                      🔒 Subscribe to view
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gradient-to-br from-stone-100 to-amber-50 rounded-xl h-72 flex items-center justify-center text-8xl">
                🏯
              </div>
            )}
          </div>

          <div>
            <h1 className="text-xl font-bold text-[#2c2416] mb-2">{title}</h1>
            <p className="text-[#8a7a68] text-sm mb-4">📍 {locationEn(p.prefecture, p.city)}</p>

            {p.price && (
              <div className="mb-6">
                <div className="text-3xl font-bold text-[#5a3e18]">
                  ¥{(p.price * 10000).toLocaleString()}
                  <span className="text-base font-normal text-[#8a7a68] ml-2">JPY</span>
                </div>
                {priceUsd && (
                  <div className="text-sm text-[#8a7a68]">≈ ${priceUsd.toLocaleString()} USD</div>
                )}
              </div>
            )}

            {/* ── Paywall gate ────────────────────────────────────────────── */}
            {subscribed ? (
              // ── Subscribed: show full details ──────────────────────────
              <>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { label: 'Building Area', value: p.building_area ? `${p.building_area} m²` : '—' },
                    { label: 'Land Area', value: p.land_area ? `${p.land_area} m²` : '—' },
                    { label: 'Year Built', value: p.year_built ? `${p.year_built} (${age}yr old)` : '—' },
                    { label: 'Location', value: locationEn(p.prefecture, p.city) },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-[#f5f0e8] rounded-lg p-3">
                      <div className="text-xs text-[#8a7a68] mb-1">{label}</div>
                      <div className="text-sm font-medium text-[#2c2416]">{value}</div>
                    </div>
                  ))}
                </div>

                {p.contact_email ? (
                  <>
                    <a
                      href={`mailto:${p.contact_email}?subject=Inquiry about property: ${title}`}
                      className="w-full block text-center bg-[#5a3e18] hover:bg-[#3d2b10] text-white font-bold py-3 rounded-xl transition"
                    >
                      📧 Contact Owner
                    </a>
                    <p className="text-xs text-[#8a7a68] mt-3 text-center">
                      Direct contact — no agent fees
                    </p>
                  </>
                ) : (
                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(p.city + ' ' + p.prefecture + ' 空き家バンク')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center border-2 border-[#5a3e18] text-[#5a3e18] hover:bg-[#5a3e18] hover:text-white font-bold py-3 rounded-xl transition"
                  >
                    🏛 View Municipal Akiya Bank →
                  </a>
                )}

                {/* Manage subscription */}
                <PaywallGate mode="manage" />
              </>
            ) : (
              // ── Not subscribed: show locked state ──────────────────────
              <PaywallGate mode="lock" propertyId={p.id} />
            )}
            {/* ─────────────────────────────────────────────────────────── */}
          </div>
        </div>

        {/* Description — only shown to subscribers ──────────────────────── */}
        {subscribed && (
          <div className="mt-10">
            <h2 className="text-lg font-bold text-[#2c2416] mb-4 border-l-4 border-[#5a3e18] pl-3">Property Details</h2>
            {p.description_en ? (
              <div className="text-sm text-[#2c2416] leading-relaxed whitespace-pre-wrap bg-white border border-stone-200 rounded-xl p-6">
                {p.description_en}
              </div>
            ) : (
              <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
                ⚠️ English translation is being prepared for this listing. Please check back soon.
              </div>
            )}
          </div>
        )}
      </main>

      <Footer lang="en" />
    </>
  )
}
