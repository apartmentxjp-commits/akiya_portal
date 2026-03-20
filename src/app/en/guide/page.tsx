'use client'

import { useState } from 'react'
import { Nav, Footer } from '@/components/Nav'
import Link from 'next/link'

// The X post URL to like/repost (update this with your actual pinned post URL)
const X_POST_URL = 'https://x.com/AkiyaJapan/status/1'
const X_HANDLE = '@AkiyaJapan'

// Guide PDF URL (host this in /public or use a Google Drive link)
const GUIDE_URL = '/en/guide/download'

export default function GuidePage() {
  const [step, setStep] = useState<'info' | 'verify' | 'success'>('info')
  const [xHandle, setXHandle] = useState('')
  const [checked, setChecked] = useState(false)
  const [error, setError] = useState('')

  function handleUnlock() {
    if (!xHandle.trim()) {
      setError('Please enter your X username.')
      return
    }
    if (!checked) {
      setError('Please confirm you have liked and reposted.')
      return
    }
    setError('')
    setStep('success')
  }

  return (
    <>
      <Nav lang="en" />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1920&auto=format&fit=crop&q=80"
          alt="Japanese machiya street"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-6xl mx-auto px-6 pb-12 w-full">
          <h1 className="text-5xl font-bold text-white leading-tight">
            How To Buy A House<br />In Japan Guide
          </h1>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: '📋',
                title: 'Step by step guide',
                desc: 'This ebook guide takes you through the buying process step by step: from which documents you\'ll need, to what questions to ask the agent, all the way to managing the house from abroad.',
              },
              {
                icon: '🏡',
                title: 'Based on real research',
                desc: 'This guide is based on hundreds of hours of research distilled into a single resource — Japanese books, municipal programs, expat forums, and expert interviews.',
              },
              {
                icon: '🤝',
                title: 'Real buyer experiences',
                desc: 'Learn from the experiences of foreigners who have actually bought property in Japan. Their costs, unexpected challenges, and what they\'d do differently.',
              },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#e07070]/10 rounded-full flex items-center justify-center text-2xl">
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

      {/* Main content */}
      <section className="bg-[#f9f9f9] py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Left: content */}
            <div>
              <h2 className="text-2xl font-bold text-stone-800 mb-6">
                Want to own your own slice of Japan? Read this guide first.
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed mb-5">
                This guide is based on hundreds of hours of research about property purchasing
                in Japan, and is designed to help any foreigner navigate the process from
                start to finish — even without speaking Japanese.
              </p>
              <p className="text-sm font-bold text-stone-700 mb-3">The PDF ebook covers:</p>
              <ul className="space-y-2 mb-8">
                {[
                  'How to find the best properties',
                  'Analysis of the Japanese real estate market',
                  'Step-by-step purchase process',
                  'Common challenges and how to handle them',
                  'Managing your property from overseas',
                  'Japan visa and long-stay options',
                  'What buying in Japan actually costs (all-in)',
                  'How to buy without speaking Japanese',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-stone-600">
                    <span className="text-[#e07070] mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: unlock widget */}
            <div>
              {/* Ebook mockup */}
              <div className="flex justify-center mb-8">
                <div className="bg-stone-900 rounded-[20px] p-3 shadow-2xl w-48">
                  <div className="bg-gradient-to-br from-stone-700 via-stone-600 to-stone-500 rounded-[14px] aspect-[3/4] flex flex-col items-center justify-center p-5">
                    <div className="text-5xl mb-3">🏯</div>
                    <p className="text-white font-bold text-sm text-center leading-snug mb-1">
                      HOW TO BUY A<br />HOUSE IN JAPAN
                    </p>
                    <p className="text-white/50 text-[9px] text-center mt-2">Akiya Japan</p>
                  </div>
                  <div className="flex justify-center mt-2">
                    <div className="w-6 h-1 bg-stone-600 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Unlock widget */}
              {step === 'info' && (
                <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                  <div className="text-center mb-5">
                    <span className="inline-block bg-[#e07070]/10 text-[#e07070] text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
                      100% Free
                    </span>
                    <h3 className="font-bold text-stone-800 text-lg mb-2">Get the Guide Free</h3>
                    <p className="text-stone-500 text-sm">
                      Like and repost our pinned post on X — that&apos;s all it takes.
                    </p>
                  </div>

                  <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 mb-5">
                    <p className="text-sm text-stone-600 mb-3 text-center">
                      <strong>Step 1:</strong> Open our pinned post on X
                    </p>
                    <a
                      href={X_POST_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-3 px-5 rounded-xl text-sm transition"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      Open {X_HANDLE} on X
                    </a>
                    <p className="text-xs text-stone-400 text-center mt-2">
                      Like ❤️ and Repost 🔁 the pinned post
                    </p>
                  </div>

                  <button
                    onClick={() => setStep('verify')}
                    className="w-full bg-[#e07070] hover:bg-[#cc5c5c] text-white font-bold py-3 px-5 rounded-xl text-sm uppercase tracking-wide transition"
                  >
                    I've Done It — Unlock Guide →
                  </button>
                </div>
              )}

              {step === 'verify' && (
                <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-stone-800 text-lg mb-4 text-center">
                    <strong>Step 2:</strong> Confirm your X username
                  </h3>

                  <div className="space-y-4 mb-5">
                    <div>
                      <label className="text-xs font-bold text-stone-500 uppercase tracking-wide block mb-1">
                        Your X Username
                      </label>
                      <input
                        type="text"
                        value={xHandle}
                        onChange={(e) => setXHandle(e.target.value)}
                        placeholder="@yourusername"
                        className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#e07070] focus:ring-2 focus:ring-[#e07070]/20 transition"
                      />
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => setChecked(e.target.checked)}
                        className="mt-0.5 w-4 h-4 accent-[#e07070] flex-shrink-0"
                      />
                      <span className="text-sm text-stone-600">
                        I confirm I have liked and reposted {X_HANDLE}&apos;s pinned post on X.
                      </span>
                    </label>
                  </div>

                  {error && (
                    <p className="text-red-500 text-xs mb-3 text-center">{error}</p>
                  )}

                  <button
                    onClick={handleUnlock}
                    className="w-full bg-[#e07070] hover:bg-[#cc5c5c] text-white font-bold py-3 px-5 rounded-xl text-sm uppercase tracking-wide transition"
                  >
                    Get My Free Guide →
                  </button>

                  <button
                    onClick={() => setStep('info')}
                    className="w-full text-stone-400 hover:text-stone-600 text-xs mt-3 transition"
                  >
                    ← Go back
                  </button>
                </div>
              )}

              {step === 'success' && (
                <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm text-center">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="font-bold text-stone-800 text-xl mb-2">Thank you!</h3>
                  <p className="text-stone-600 text-sm mb-6">
                    Your guide is ready. Click below to download the PDF.
                  </p>
                  <a
                    href={GUIDE_URL}
                    className="inline-block bg-[#e07070] hover:bg-[#cc5c5c] text-white font-bold px-8 py-3.5 rounded-xl text-sm uppercase tracking-wide transition shadow-md"
                  >
                    Download Guide PDF →
                  </a>
                  <p className="text-stone-400 text-xs mt-4">
                    Thank you for supporting Akiya Japan on X! 🏯
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sample pages teaser */}
      <section className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-stone-500 text-sm mb-4">
            Ready to start looking at properties?
          </p>
          <Link
            href="/en/akiya"
            className="inline-block border-2 border-[#e07070] text-[#e07070] hover:bg-[#e07070] hover:text-white font-bold px-8 py-3 rounded-full text-sm uppercase tracking-wide transition"
          >
            Browse Properties
          </Link>
          <span className="mx-4 text-stone-300">or</span>
          <Link
            href="/en/subscribe"
            className="inline-block bg-[#e07070] hover:bg-[#cc5c5c] text-white font-bold px-8 py-3 rounded-full text-sm uppercase tracking-wide transition shadow-md"
          >
            Subscribe — $7.99/mo
          </Link>
        </div>
      </section>

      <Footer lang="en" />
    </>
  )
}
