import Link from 'next/link'

export function Nav({ lang = 'ja' }: { lang?: 'ja' | 'en' }) {
  const isEn = lang === 'en'
  return (
    <header className="bg-[#3d2b10] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href={isEn ? '/en' : '/'} className="flex items-center gap-2 hover:opacity-80 transition">
          <span className="text-xl">🏯</span>
          <span className="font-bold text-sm leading-tight">
            {isEn ? 'Akiya Japan' : 'Akiya Japan'}
            <br />
            <span className="text-[#c9a96e] text-xs font-normal">
              {isEn ? 'Traditional Houses for Sale' : '空き家・古民家マーケット'}
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link href={isEn ? '/en/akiya' : '/akiya'} className="hover:text-[#c9a96e] transition">
            {isEn ? 'Browse' : '物件一覧'}
          </Link>
          <Link href="/submit" className="hover:text-[#c9a96e] transition">
            {isEn ? 'List Property' : '物件を登録'}
          </Link>
          <Link
            href={isEn ? '/' : '/en'}
            className="border border-[#c9a96e] text-[#c9a96e] px-3 py-1 rounded text-xs hover:bg-[#c9a96e] hover:text-[#3d2b10] transition"
          >
            {isEn ? '日本語' : 'English'}
          </Link>
        </nav>
      </div>
    </header>
  )
}

export function Footer({ lang = 'ja' }: { lang?: 'ja' | 'en' }) {
  const isEn = lang === 'en'
  return (
    <footer className="bg-[#2c2416] text-white/60 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 text-center text-sm">
        <p>🏯 Akiya Japan — {isEn ? 'Find your Japanese home' : '日本の空き家・古民家を世界へ'}</p>
        <p className="mt-2 text-xs text-white/40">
          &copy; {new Date().getFullYear()} Akiya Japan | akiya.tacky-consulting.com
        </p>
      </div>
    </footer>
  )
}
