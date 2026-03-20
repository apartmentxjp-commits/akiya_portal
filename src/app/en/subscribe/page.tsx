'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Nav, Footer } from '@/components/Nav'

const FEATURES = [
  { icon: '📊', text: 'Full property record — area, age, structure type, and condition data' },
  { icon: '📝', text: 'Complete English-translated descriptions for every data entry' },
  { icon: '📋', text: 'Registrant contact field included in record data' },
  { icon: '🗺️', text: 'Precise location data for each entry' },
  { icon: '🔄', text: 'Weekly database updates across all 47 prefectures' },
  { icon: '🔍', text: 'Advanced filtering by area, price range, and property type' },
]

function SubscribeContent() {
  const searchParams = useSearchParams()
  const canceled = searchParams.get('canceled') === '1'
  const error = searchParams.get('error')
  const returnTo = searchParams.get('return_to') || '/en/akiya'

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    if (canceled) setErr('Payment was canceled. You can try again anytime.')
    if (error === 'activation_failed') setErr('There was an issue activating your subscription. Please contact support.')
  }, [canceled, error])

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    setErr(null)

    if (!email || !email.includes('@')) {
      setErr('Please enter a valid email address.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), returnTo }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Checkout failed')
      window.location.href = data.url
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <>
      <Nav lang="en" />

      <main className="max-w-2xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block bg-[#f5f0e8] border border-[#e2d8cc] rounded-full px-4 py-1.5 text-xs text-[#5a3e18] font-semibold uppercase tracking-widest mb-4">
            Data Access Plan
          </div>
          <h1 className="text-3xl font-bold text-[#2c2416] mb-3">
            Unlock Full Database Access
          </h1>
          <p className="text-[#8a7a68] text-base">
            Access complete property records from Japan&apos;s akiya data library —
            including detailed data fields not available in the free tier.
          </p>
        </div>

        {/* Pricing card */}
        <div className="bg-white border-2 border-[#5a3e18] rounded-2xl overflow-hidden shadow-lg mb-8">
          <div
            className="px-8 py-6 text-white text-center"
            style={{
              background: 'linear-gradient(135deg, #2c2416 0%, #5a3e18 50%, #3d2b10 100%)',
            }}
          >
            <div className="text-sm font-semibold uppercase tracking-widest mb-1 opacity-80">
              Monthly Data Access
            </div>
            <div className="flex items-end justify-center gap-2">
              <span className="text-5xl font-bold">$7.99</span>
              <span className="text-lg opacity-70 mb-2">/month</span>
            </div>
            <p className="text-sm opacity-70 mt-1">Cancel anytime — no contracts</p>
          </div>

          <div className="px-8 py-6">
            <p className="text-xs text-[#8a7a68] mb-5 text-center">
              Full access to all data fields in the Japan Property Database
            </p>

            <ul className="space-y-3 mb-8">
              {FEATURES.map(({ icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-sm text-[#2c2416]">
                  <span className="text-lg leading-none mt-0.5">{icon}</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            {err && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                ⚠️ {err}
              </div>
            )}

            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full border border-stone-300 rounded-xl px-4 py-3 text-sm text-[#2c2416] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#5a3e18]"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#5a3e18] hover:bg-[#3d2b10] disabled:opacity-60 text-white font-bold py-3 rounded-xl transition text-sm"
              >
                {loading ? 'Redirecting to checkout…' : '🔓 Unlock Full Access — $7.99/mo'}
              </button>
            </form>

            <p className="text-xs text-[#8a7a68] text-center mt-4">
              Secure payment via Stripe · Cancel anytime
            </p>
          </div>
        </div>

        {/* Free vs Full comparison */}
        <div className="bg-[#f5f0e8] rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-[#2c2416] text-sm mb-4">What&apos;s included in each tier</h2>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="font-semibold text-[#8a7a68] mb-2 uppercase tracking-wider">Free</div>
              <ul className="space-y-1 text-[#8a7a68]">
                <li>✓ Property title</li>
                <li>✓ Prefecture &amp; city</li>
                <li>✓ Price range</li>
                <li>✓ Property type</li>
                <li>✓ Area (m²)</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-[#5a3e18] mb-2 uppercase tracking-wider">Full Access</div>
              <ul className="space-y-1 text-[#2c2416]">
                <li>✓ All free fields</li>
                <li>✓ Full description (EN)</li>
                <li>✓ Property history</li>
                <li>✓ Contact data field</li>
                <li>✓ Unlimited viewing</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="space-y-4 text-sm">
          <h2 className="font-bold text-[#2c2416] text-base">Frequently Asked Questions</h2>
          {[
            {
              q: 'What is this data library?',
              a: 'Japan Property Data Library is a structured database of vacant homes (akiya) in Japan. This is an information service only — we do not provide real estate brokerage or advisory services.',
            },
            {
              q: 'What does the "contact data field" mean?',
              a: 'Each database record may include a contact field registered by the data submitter. This is raw data provided for informational purposes.',
            },
            {
              q: 'How do I cancel?',
              a: 'Go to your account portal from the data entry page and cancel anytime. Access continues until the end of the current billing period.',
            },
            {
              q: 'Is my payment secure?',
              a: 'All payments are processed by Stripe. We never store your card details.',
            },
          ].map(({ q, a }) => (
            <div key={q} className="bg-[#f5f0e8] rounded-xl p-4">
              <div className="font-semibold text-[#2c2416] mb-1">{q}</div>
              <div className="text-[#8a7a68]">{a}</div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-400 leading-relaxed">
          This service is operated through advertising and data-based services. This website is for informational purposes only. We do not provide real estate brokerage, agency, or advisory services. All decisions are made at the user&apos;s own responsibility.
        </div>

        <div className="mt-6 text-center">
          <Link href="/en/akiya" className="text-sm text-[#8a7a68] hover:text-[#5a3e18]">
            ← Back to database
          </Link>
        </div>
      </main>

      <Footer lang="en" />
    </>
  )
}

export default function SubscribePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf8f4]" />}>
      <SubscribeContent />
    </Suspense>
  )
}
