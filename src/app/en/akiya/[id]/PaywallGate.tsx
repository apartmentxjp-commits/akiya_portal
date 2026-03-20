'use client'

import Link from 'next/link'
import { useState } from 'react'

interface Props {
  mode: 'lock' | 'manage'
  propertyId?: string
}

export default function PaywallGate({ mode, propertyId }: Props) {
  const [loadingPortal, setLoadingPortal] = useState(false)

  const openPortal = async () => {
    setLoadingPortal(true)
    const res = await fetch('/api/stripe/portal', { method: 'POST' })
    const data = await res.json()
    if (data.url) window.location.href = data.url
    else setLoadingPortal(false)
  }

  // ── Manage mode: show for active subscribers ──────────────────────────────
  if (mode === 'manage') {
    return (
      <div className="mt-4 text-center">
        <button
          onClick={openPortal}
          disabled={loadingPortal}
          className="text-xs text-[#8a7a68] hover:text-[#5a3e18] underline disabled:opacity-50"
        >
          {loadingPortal ? 'Loading portal…' : '⚙️ Manage subscription'}
        </button>
      </div>
    )
  }

  // ── Lock mode: show for non-subscribers ────────────────────────────────────
  const subscribeHref = propertyId
    ? `/en/subscribe?return_to=${encodeURIComponent(`/en/akiya/${propertyId}`)}`
    : '/en/subscribe'

  return (
    <div className="relative">
      {/* Blurred preview of stats */}
      <div className="select-none pointer-events-none">
        <div className="grid grid-cols-2 gap-3 mb-6 blur-sm opacity-60">
          {['Building Area', 'Land Area', 'Year Built', 'Location'].map((label) => (
            <div key={label} className="bg-[#f5f0e8] rounded-lg p-3">
              <div className="text-xs text-[#8a7a68] mb-1">{label}</div>
              <div className="text-sm font-medium text-stone-400">● ● ●</div>
            </div>
          ))}
        </div>
        <div className="h-12 bg-stone-200 rounded-xl blur-sm opacity-50 mb-3" />
      </div>

      {/* Overlay CTA */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center rounded-xl text-center px-4"
        style={{
          background: 'linear-gradient(to bottom, rgba(250,248,244,0.1) 0%, rgba(250,248,244,0.95) 40%)',
        }}
      >
        <div className="text-2xl mb-2">🔒</div>
        <p className="text-sm font-semibold text-[#2c2416] mb-1">
          Full details require a subscription
        </p>
        <p className="text-xs text-[#8a7a68] mb-4">
          Unlock owner contact, exact specs, and English description
        </p>

        <Link
          href={subscribeHref}
          className="bg-[#5a3e18] hover:bg-[#3d2b10] text-white font-bold text-sm py-3 px-6 rounded-xl transition"
        >
          🔓 Subscribe — $7.99/month
        </Link>

        <p className="text-xs text-[#8a7a68] mt-3">Cancel anytime · Secure checkout via Stripe</p>
      </div>
    </div>
  )
}
