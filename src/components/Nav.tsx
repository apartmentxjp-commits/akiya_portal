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
              {isEn ? 'Traditional Houses' : '空き家マーケット'}
            </p>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1 text-sm">
          <Link
            href={isEn ? '/en/akiya' : '/akiya'}
            className="px-3 py-2 text-white/70 hover:text-white transition rounded-md hover:bg-white/5"
          >
            {isEn ? 'Browse' : '物件一覧'}
          </Link>
          <Link
            href="/submit"
            className="px-3 py-2 text-white/70 hover:text-white transition rounded-md hover:bg-white/5"
          >
            {isEn ? 'List Free' : '無料掲載'}
          </Link>
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
            <p className="text-sm max-w-xs">
              {isEn
                ? 'Connecting traditional Japanese homes with international buyers.'
                : '日本の空き家・古民家を世界のバイヤーへ届けるマーケットプレイス。'}
            </p>
          </div>
          <div className="flex gap-8 text-sm">
            <div>
              <p className="text-white/60 mb-2 text-xs uppercase tracking-wider">
                {isEn ? 'For Buyers' : 'バイヤーの方'}
              </p>
              <ul className="space-y-1">
                <li><Link href="/en/akiya" className="hover:text-white/80 transition">Browse Properties</Link></li>
                <li><Link href="/en" className="hover:text-white/80 transition">English Site</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-white/60 mb-2 text-xs uppercase tracking-wider">
                {isEn ? 'For Sellers' : '売主の方'}
              </p>
              <ul className="space-y-1">
                <li><Link href="/submit" className="hover:text-white/80 transition">{isEn ? 'List Free' : '無料掲載'}</Link></li>
                <li><Link href="/agent/upload" className="hover:text-white/80 transition">{isEn ? 'Bulk Upload' : 'CSV一括登録'}</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 text-xs text-center">
          &copy; {new Date().getFullYear()} Akiya Japan · akiya.tacky-consulting.com
        </div>
      </div>
    </footer>
  )
}
