'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Nav, Footer } from '@/components/Nav'

const MONTHLY_FEATURES = [
  { icon: '📊', text: 'Full property records — area, age, structure, condition' },
  { icon: '📝', text: 'Complete English-translated descriptions' },
  { icon: '📋', text: 'Seller contact data for every listing' },
  { icon: '🗺️', text: 'Precise location data' },
  { icon: '🔄', text: 'Weekly database updates across all 47 prefectures' },
  { icon: '🔍', text: 'Advanced filtering by area, price, and property type' },
]

const ANNUAL_EXTRAS = [
  { icon: '🏯', text: '"How to Buy a House in Japan" guide — free ($20 value)' },
  { icon: '💰', text: '2 months free vs monthly billing' },
]

function SubscribeContent() {
  const searchParams = useSearchParams()
  const canceled = searchParams.get('canceled') === '1'
  const error = searchParams.get('error')
  const returnTo = searchParams.get('return_to') || '/en/akiya'

  const [plan, setPlan] = useState<'annual' | 'monthly'>('annual')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const [alreadySubscribed, setAlreadySubscribed] = useState(false)

  useEffect(() => {
    if (canceled) setErr('Payment was canceled. You can try again anytime.')
    if (error === 'activation_failed') setErr('There was an issue activating your subscription. Please contact support.')
    // Check if already logged in as active subscriber
    fetch('/api/stripe/check-subscriber')
      .then((r) => r.json())
      .then((d) => { if (d.active) setAlreadySubscribed(true) })
      .catch(() => {})
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
        body: JSON.stringify({ email: email.trim().toLowerCase(), returnTo, plan }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Checkout failed')
      window.location.href = data.url
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  // Already logged in as subscriber → show redirect panel
  if (alreadySubscribed) {
    return (
      <>
        <Nav lang="en" />
        <main className="max-w-md mx-auto px-4 py-20 text-center">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-2xl font-bold text-[#2c2416] mb-2">You&apos;re already subscribed!</h1>
          <p className="text-[#8a7a68] text-sm mb-6">
            Your subscription is active. You have full access to all property details.
          </p>
          <a
            href={returnTo}
            className="inline-block bg-[#5a3e18] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#3d2b10] transition"
          >
            Browse Properties →
          </a>
        </main>
        <Footer lang="en" />
      </>
    )
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
            Access complete property records from Japan&apos;s akiya data library.
          </p>
        </div>

        {/* Plan toggle */}
        <div className="flex items-center justify-center mb-6">
          <div className="bg-stone-100 rounded-full p-1 flex gap-1">
            <button
              onClick={() => setPlan('annual')}
              className={`px-5 py-2 rounded-full text-sm font-bold transition ${
                plan === 'annual'
                  ? 'bg-[#5a3e18] text-white shadow-sm'
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              Annual
              <span className="ml-1.5 text-[10px] bg-[#e07070] text-white px-1.5 py-0.5 rounded-full">
                BEST VALUE
              </span>
            </button>
            <button
              onClick={() => setPlan('monthly')}
              className={`px-5 py-2 rounded-full text-sm font-bold transition ${
                plan === 'monthly'
                  ? 'bg-[#5a3e18] text-white shadow-sm'
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Pricing card */}
        <div className="bg-white border-2 border-[#5a3e18] rounded-2xl overflow-hidden shadow-lg mb-8">
          <div
            className="px-8 py-6 text-white text-center"
            style={{
              background: 'linear-gradient(135deg, #2c2416 0%, #5a3e18 50%, #3d2b10 100%)',
            }}
          >
            {plan === 'annual' ? (
              <>
                <div className="text-sm font-semibold uppercase tracking-widest mb-1 opacity-80">
                  Annual Plan
                </div>
                <div className="flex items-end justify-center gap-2">
                  <span className="text-5xl font-bold">$79.99</span>
                  <span className="text-lg opacity-70 mb-2">/year</span>
                </div>
                <p className="text-sm opacity-70 mt-1">
                  <span className="line-through opacity-50 mr-1">$95.88</span>
                  ~$6.67/mo · 2 months free
                </p>
              </>
            ) : (
              <>
                <div className="text-sm font-semibold uppercase tracking-widest mb-1 opacity-80">
                  Monthly Plan
                </div>
                <div className="flex items-end justify-center gap-2">
                  <span className="text-5xl font-bold">$7.99</span>
                  <span className="text-lg opacity-70 mb-2">/month</span>
                </div>
                <p className="text-sm opacity-70 mt-1">Cancel anytime</p>
              </>
            )}
          </div>

          <div className="px-8 py-6">
            {/* Annual bonus banner */}
            {plan === 'annual' && (
              <div className="bg-[#e07070]/10 border border-[#e07070]/30 rounded-xl p-3 mb-5 text-center">
                <p className="text-sm font-bold text-[#e07070]">
                  🏯 Includes "How to Buy a House in Japan" guide — free
                </p>
                <p className="text-xs text-stone-500 mt-0.5">$20 value · delivered after purchase</p>
              </div>
            )}

            <p className="text-xs text-[#8a7a68] mb-5 text-center">
              Full access to all data fields in the Japan Property Database
            </p>

            <ul className="space-y-3 mb-4">
              {MONTHLY_FEATURES.map(({ icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-sm text-[#2c2416]">
                  <span className="text-lg leading-none mt-0.5">{icon}</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            {plan === 'annual' && (
              <>
                <div className="border-t border-stone-100 my-4" />
                <p className="text-xs font-bold text-[#5a3e18] uppercase tracking-wider mb-3">Annual plan extras</p>
                <ul className="space-y-3 mb-5">
                  {ANNUAL_EXTRAS.map(({ icon, text }) => (
                    <li key={text} className="flex items-start gap-3 text-sm text-[#2c2416]">
                      <span className="text-lg leading-none mt-0.5">{icon}</span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

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
                {loading
                  ? 'Redirecting to checkout…'
                  : plan === 'annual'
                  ? '🔓 Start Annual Plan — $79.99/yr'
                  : '🔓 Start Monthly Plan — $7.99/mo'}
              </button>
            </form>

            <p className="text-xs text-[#8a7a68] text-center mt-4">
              Secure payment via Stripe · Cancel anytime
            </p>
          </div>
        </div>

        {/* Plan comparison */}
        <div className="bg-[#f5f0e8] rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-[#2c2416] text-sm mb-4">Plan comparison</h2>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div />
            <div className="font-semibold text-[#8a7a68] text-center uppercase tracking-wider">Monthly<br />$7.99/mo</div>
            <div className="font-semibold text-[#5a3e18] text-center uppercase tracking-wider">Annual<br />$79.99/yr</div>
            {[
              ['Full property database', true, true],
              ['English translations', true, true],
              ['Seller contact data', true, true],
              ['Weekly updates', true, true],
              ['"How to Buy" guide ($20)', false, true],
              ['2 months free', false, true],
            ].map(([label, monthly, annual]) => (
              <>
                <div key={String(label)} className="text-[#2c2416] py-1.5 border-t border-stone-200 flex items-center">{label}</div>
                <div className="text-center py-1.5 border-t border-stone-200 flex items-center justify-center">
                  {monthly ? <span className="text-emerald-600">✓</span> : <span className="text-stone-300">—</span>}
                </div>
                <div className="text-center py-1.5 border-t border-stone-200 flex items-center justify-center">
                  {annual ? <span className="text-emerald-600 font-bold">✓</span> : <span className="text-stone-300">—</span>}
                </div>
              </>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="space-y-4 text-sm">
          <h2 className="font-bold text-[#2c2416] text-base">Frequently Asked Questions</h2>
          {[
            {
              q: 'How do I receive the guide with annual plan?',
              a: 'After your annual subscription is activated, you\'ll receive an email with a link to access the "How to Buy a House in Japan" guide.',
            },
            {
              q: 'What is this data library?',
              a: 'Japan Property Data Library is a structured database of vacant homes (akiya) in Japan. This is an information service only — we do not provide real estate brokerage or advisory services.',
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
