import Link from 'next/link'
import type { Property } from '@/lib/supabase'

export function PropertyCard({ p, lang = 'ja' }: { p: Property; lang?: 'ja' | 'en' }) {
  const isEn = lang === 'en'
  const title = isEn ? (p.title_en || p.title) : p.title
  const desc = isEn ? (p.description_en || p.description) : p.description
  const href = isEn ? `/en/akiya/${p.id}` : `/akiya/${p.id}`

  return (
    <Link href={href} className="block bg-white border border-stone-200 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group">
      {/* Image placeholder */}
      <div className="h-48 bg-gradient-to-br from-stone-100 to-amber-50 flex items-center justify-center text-5xl group-hover:from-amber-50 transition-colors">
        🏯
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-[#2c2416] text-sm leading-snug line-clamp-2 flex-1">{title}</h3>
          {p.price && (
            <span className="text-[#5a3e18] font-bold text-sm whitespace-nowrap">
              {isEn
                ? `$${Math.round(p.price * 10000 / 150).toLocaleString()}`
                : `${p.price.toLocaleString()}万円`}
            </span>
          )}
        </div>

        <p className="text-[#8a7a68] text-xs mb-3">
          📍 {p.prefecture} {p.city}
        </p>

        <div className="flex gap-3 text-xs text-[#8a7a68]">
          {p.building_area && <span>🏠 {p.building_area}㎡</span>}
          {p.land_area && <span>📐 {p.land_area}㎡</span>}
          {p.year_built && (
            <span>
              {isEn
                ? `Built ${p.year_built}`
                : `築${new Date().getFullYear() - p.year_built}年`}
            </span>
          )}
        </div>

        {desc && (
          <p className="text-xs text-[#8a7a68] mt-3 line-clamp-2 leading-relaxed">{desc}</p>
        )}
      </div>
    </Link>
  )
}
