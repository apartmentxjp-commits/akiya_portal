import Link from 'next/link'

export function Nav({ lang = 'ja' }: { lang?: 'ja' | 'en' }) {
  const isEn = lang === 'en'

  if (isEn) {
    return (
      <header className="bg-white sticky top-0 z-50 border-b border-stone-100">
        <div className="max-w-6xl mx-auto px-5 py-0 flex items-center justify-between h-14">

          {/* Logo */}
          <Link href="/en" className="font-bold text-lg text-stone-800 hover:text-stone-600 transition tracking-tight">
            Akiya Japan
          </Link>

          {/* Nav links */}
          <nav className="flex items-center gap-1 text-sm">
            <Link href="/en" className="px-3 py-2 text-stone-600 hover:text-stone-900 transition rounded-md">
              Home
            </Link>
            <Link href="/en/akiya" className="px-3 py-2 text-stone-600 hover:text-stone-900 transition rounded-md">
              Properties
            </Link>
            <Link href="/en/guide" className="px-3 py-2 text-stone-600 hover:text-stone-900 transition rounded-md">
              Guide
            </Link>
            <Link href="/en/faq" className="px-3 py-2 text-stone-600 hover:text-stone-900 transition rounded-md">
              FAQ
            </Link>
            <Link
              href="/en/login"
              className="ml-2 px-3 py-2 text-stone-600 hover:text-stone-900 transition rounded-md text-sm"
            >
              Login
            </Link>
            <Link
              href="/en/subscribe"
              className="ml-1 px-4 py-2 bg-[#e07070] hover:bg-[#cc5c5c] text-white font-semibold rounded-full text-sm transition shadow-sm"
            >
              Full Access $7.99/mo
            </Link>
          </nav>
        </div>
      </header>
    )
  }

  // Japanese nav (keep dark)
  return (
    <header className="bg-[#1a0e06]/95 backdrop-blur-sm text-white sticky top-0 z-50 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-5 py-0 flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition group">
          <div className="w-8 h-8 bg-[#c9a96e]/20 rounded-lg flex items-center justify-center border border-[#c9a96e]/30 group-hover:bg-[#c9a96e]/30 transition">
            <span className="text-[#c9a96e] text-sm font-serif">家</span>
          </div>
          <div className="leading-none">
            <p className="text-white font-semibold text-sm tracking-wide">Akiya Japan</p>
            <p className="text-[#c9a96e]/70 text-[10px] tracking-widest uppercase mt-0.5">空き家データライブラリ</p>
          </div>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link href="/akiya" className="px-3 py-2 text-white/70 hover:text-white transition rounded-md hover:bg-white/5">データ一覧</Link>
          <Link href="/submit" className="px-3 py-2 text-white/70 hover:text-white transition rounded-md hover:bg-white/5">データ登録</Link>
          <Link href="/en" className="ml-2 px-3 py-1.5 text-[#c9a96e] border border-[#c9a96e]/40 rounded-md text-xs hover:bg-[#c9a96e]/10 transition tracking-wide">🌏 English</Link>
        </nav>
      </div>
    </header>
  )
}

export function Footer({ lang = 'ja' }: { lang?: 'ja' | 'en' }) {
  const isEn = lang === 'en'

  if (isEn) {
    return (
      <footer className="bg-[#f9f9f9] border-t border-stone-200">
        <div className="max-w-6xl mx-auto px-5 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <p className="font-bold text-stone-800 text-base mb-2">Akiya Japan</p>
              <p className="text-sm text-stone-500 max-w-xs leading-relaxed mb-4">
                Find affordable vacant homes across Japan — fully searchable in English.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-stone-200 hover:bg-stone-300 rounded-full flex items-center justify-center transition"
                  aria-label="X (Twitter)"
                >
                  <svg className="w-4 h-4 text-stone-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">Explore</p>
              <ul className="space-y-2 text-sm text-stone-500">
                <li><Link href="/en/akiya" className="hover:text-stone-800 transition">Browse Properties</Link></li>
                <li><Link href="/en/guide" className="hover:text-stone-800 transition">Japan Property Guide</Link></li>
                <li><Link href="/en/faq" className="hover:text-stone-800 transition">FAQ</Link></li>
                <li><Link href="/en/subscribe" className="hover:text-stone-800 transition">Full Access Plan</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">Legal</p>
              <ul className="space-y-2 text-sm text-stone-500">
                <li><Link href="/en/about" className="hover:text-stone-800 transition">About</Link></li>
                <li><Link href="/en/privacy" className="hover:text-stone-800 transition">Privacy Policy</Link></li>
                <li><Link href="/en/terms" className="hover:text-stone-800 transition">Terms of Service</Link></li>
                <li><Link href="/tokusho" className="hover:text-stone-800 transition">Tokusho Act Notice</Link></li>
                <li><Link href="/submit" className="hover:text-stone-800 transition">List a Property</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-stone-200 pt-6">
            <p className="text-[11px] text-stone-400 leading-relaxed max-w-3xl mb-2">
              This service aggregates publicly available property information for informational purposes only.
              We do not provide real estate brokerage, agency, advisory, or intermediary services.
              All decisions are made at the user&apos;s own responsibility.
            </p>
            <p className="text-xs text-stone-400">&copy; {new Date().getFullYear()} Akiya Japan · akiya.tacky-consulting.com</p>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-[#0d0904] text-white/40 mt-auto">
      <div className="max-w-6xl mx-auto px-5 py-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-8">
          <div>
            <p className="text-white/80 font-semibold mb-1 flex items-center gap-2">
              <span className="text-[#c9a96e]">家</span> Akiya Japan
            </p>
            <p className="text-sm max-w-xs mb-3">日本全国の空き家・古民家情報を集めたデータライブラリ。</p>
          </div>
          <div className="flex gap-8 text-sm">
            <div>
              <p className="text-white/60 mb-2 text-xs uppercase tracking-wider">データを見る</p>
              <ul className="space-y-1">
                <li><Link href="/akiya" className="hover:text-white/80 transition">データ一覧</Link></li>
                <li><Link href="/en/subscribe" className="hover:text-white/80 transition">フルアクセス</Link></li>
                <li><Link href="/tokusho" className="hover:text-white/80 transition">特定商取引法に基づく表記</Link></li>
                <li><Link href="/en/privacy" className="hover:text-white/80 transition">プライバシーポリシー</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6">
          <p className="text-[10px] text-white/30 leading-relaxed max-w-3xl">
            本サービスは情報提供を目的としており、不動産の売買・仲介・代理・勧誘等は行っておりません。掲載情報の正確性を保証するものではなく、最終判断は利用者ご自身の責任で行ってください。
          </p>
          <p className="text-xs text-center text-white/20 mt-4">&copy; {new Date().getFullYear()} Akiya Japan</p>
        </div>
      </div>
    </footer>
  )
}
