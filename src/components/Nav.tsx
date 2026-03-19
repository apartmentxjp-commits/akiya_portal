import Link from 'next/link'

export function Nav({ lang = 'ja' }: { lang?: 'ja' | 'en' }) {
  const isEn = lang === 'en'

  return (
    <header className="bg-[#1a0e06]/95 backdrop-blur-sm text-white sticky top-0 z-50 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-5 py-0 flex items-center justify-between h-14">

        {/* Logo */}
        <Link href={isEn ? '/en' : '/'} className="flex items-center gap-3 hover:opacity-90 transition group">
          <div className="w-8 h-8 bg-[#c9a96e]/20 rounded-lg flex items-center justify-center border border-[#c9a96e]/30 group-hover:bg-[#c9a96e]/30 transition">
            <span className="text-[#c9a96e] text-sm font-serif">家</span>
          </div>
          <div className="leading-none">
            <p className="text-white font-semibold text-sm tracking-wide">Akiya Japan</p>
            <p className="text-[#c9a96e]/70 text-[10px] tracking-widest uppercase mt-0.5">
              {isEn ? 'Property Data Library' : '空き家データライブラリ'}
            </p>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1 text-sm">
          <Link
            href={isEn ? '/en/akiya' : '/akiya'}
            className="px-3 py-2 text-white/70 hover:text-white transition rounded-md hover:bg-white/5"
          >
            {isEn ? 'Browse Data' : 'データ一覧'}
          </Link>
          <Link
            href="/submit"
            className="px-3 py-2 text-white/70 hover:text-white transition rounded-md hover:bg-white/5"
          >
            {isEn ? 'Register Data' : 'データ登録'}
          </Link>
          {isEn && (
            <Link
              href="/en/subscribe"
              className="px-3 py-2 text-[#7ecfa0] hover:text-white transition rounded-md hover:bg-white/5"
            >
              Full Access
            </Link>
          )}
          <Link
            href={isEn ? '/' : '/en'}
            className="ml-2 px-3 py-1.5 text-[#c9a96e] border border-[#c9a96e]/40 rounded-md text-xs hover:bg-[#c9a96e]/10 transition tracking-wide"
          >
            {isEn ? '🇯🇵 日本語' : '🌏 English'}
          </Link>
        </nav>
      </div>
    </header>
  )
}

export function Footer({ lang = 'ja' }: { lang?: 'ja' | 'en' }) {
  const isEn = lang === 'en'
  return (
    <footer className="bg-[#0d0904] text-white/40 mt-auto">
      <div className="max-w-6xl mx-auto px-5 py-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-8">
          <div>
            <p className="text-white/80 font-semibold mb-1 flex items-center gap-2">
              <span className="text-[#c9a96e]">家</span> Akiya Japan
            </p>
            <p className="text-sm max-w-xs mb-3">
              {isEn
                ? 'A structured data library of vacant homes across Japan.'
                : '日本全国の空き家・古民家情報を集めたデータライブラリ。'}
            </p>
          </div>
          <div className="flex gap-8 text-sm">
            <div>
              <p className="text-white/60 mb-2 text-xs uppercase tracking-wider">
                {isEn ? 'Data Access' : 'データを見る'}
              </p>
              <ul className="space-y-1">
                <li><Link href="/en/akiya" className="hover:text-white/80 transition">{isEn ? 'Browse Database' : 'データ一覧'}</Link></li>
                <li><Link href="/en/subscribe" className="hover:text-white/80 transition">{isEn ? 'Full Access Plan' : 'フルアクセス'}</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-white/60 mb-2 text-xs uppercase tracking-wider">
                {isEn ? 'Register Data' : 'データを登録'}
              </p>
              <ul className="space-y-1">
                <li><Link href="/submit" className="hover:text-white/80 transition">{isEn ? 'Free Registration' : '無料登録'}</Link></li>
                <li><Link href="/agent/upload" className="hover:text-white/80 transition">{isEn ? 'Bulk Upload' : 'CSV一括登録'}</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Legal links */}
        {isEn && (
          <div className="flex gap-4 text-xs text-white/30 mb-4">
            <Link href="/en/about" className="hover:text-white/60 transition">About</Link>
            <Link href="/en/privacy" className="hover:text-white/60 transition">Privacy Policy</Link>
            <Link href="/en/terms" className="hover:text-white/60 transition">Terms of Service</Link>
          </div>
        )}

        {/* Legal disclaimer */}
        <div className="border-t border-white/5 pt-6 space-y-2">
          <p className="text-[10px] text-white/30 leading-relaxed max-w-3xl">
            {isEn
              ? 'This service is operated through advertising and data-based services. This website is for informational purposes only. We do not provide real estate brokerage, agency, or advisory services. All decisions are made at the user\'s own responsibility.'
              : '本サービスは広告掲載およびデータ提供により運営されています。本サイトは情報提供を目的としており、不動産の売買・仲介・代理・勧誘等は行っておりません。掲載情報の正確性を保証するものではなく、最終判断は利用者ご自身の責任で行ってください。'}
          </p>
          <p className="text-xs text-center text-white/20 mt-4">
            &copy; {new Date().getFullYear()} Akiya Japan · akiya.tacky-consulting.com
          </p>
        </div>
      </div>
    </footer>
  )
}
