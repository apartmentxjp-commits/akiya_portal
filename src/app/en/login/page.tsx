'use client'

import { useState } from 'react'
import { Nav, Footer } from '@/components/Nav'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')

    const res = await fetch('/api/stripe/subscriber-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim().toLowerCase() }),
    })
    const json = await res.json()

    if (res.ok) {
      // Hard redirect so browser sends the new cookie on the next request
      window.location.href = '/en/akiya'
      return
    } else {
      setStatus('error')
      setMessage(json.error || 'Something went wrong.')
    }
  }

  return (
    <>
      <Nav lang="en" />
      <main className="max-w-md mx-auto px-4 py-20">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🔑</div>
          <h1 className="text-2xl font-bold text-[#2c2416] mb-2">Subscriber Login</h1>
          <p className="text-[#8a7a68] text-sm">
            Enter the email you used to subscribe. We&apos;ll verify your access instantly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-[#8a7a68] mb-1 block">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full border border-stone-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#5a3e18]"
              />
            </div>

            {status === 'error' && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                ⚠️ {message}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-[#5a3e18] hover:bg-[#3d2b10] disabled:opacity-50 text-white font-bold py-3 rounded-xl transition"
            >
              {status === 'loading' ? 'Checking...' : 'Access My Account'}
            </button>

            <p className="text-xs text-center text-[#8a7a68]">
              Not a subscriber yet?{' '}
              <a href="/en/subscribe" className="text-[#5a3e18] hover:underline font-medium">
                Subscribe for $7.99/month →
              </a>
            </p>
          </form>
      </main>
      <Footer lang="en" />
    </>
  )
}
