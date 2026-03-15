import Link from 'next/link'
import type { Property } from '@/lib/supabase'

const TYPE_STYLES: Record<string, { gradient: string; label: string; labelEn: string }> = {
  kominka:   { gradient: 'from-amber-950 via-amber-900 to-stone-800',   label: '古民家',   labelEn: 'Kominka' },
  farmhouse: { gradient: 'from-green-950 via-green-900 to-stone-800',   label: '農家',     labelEn: 'Farmhouse' },
  machiya:   { gradient: 'from-slate-900 via-slate-800 to-stone-800',   label: '町家',     labelEn: 'Machiya' },
  villa:     { gradient: 'from-blue-950 via-indigo-900 to-stone-800',   label: '別荘',     labelEn: 'Villa' },
  default:   { gradient: 'from-stone-900 via-stone-800 to-stone-700',   label: '古民家',   labelEn: 'Traditional' },
}

const PATTERN = `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`

export function PropertyCard({ p, lang = 'ja' }: { p: Property; lang?: 'ja' | 'en' }) {
  const isEn = lang === 'en'
  const title = isEn ? (p.title_en || p.title) : p.title
  const desc = isEn ? (p.description_en || p.description) : p.description
  const href = isEn ? `/en/akiya/${p.id}` : `/akiya/${p.id}`
  const typeKey = (p.property_type || 'default') as keyof typeof TYPE_STYLES
  const style = TYPE_STYLES[typeKey] || TYPE_STYLES.default
  const age = p.year_built ? new Date().getFullYear() - p.year_built : null

  return (
    <Link
      href={href}
      className={`group block bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-border`}
    >
      {/* Image area */}
      <div className={`relative h-48 bg-gradient-to-br ${style.gradient} overflow-hidden`}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: PATTERN }} />

        {/* Property type badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-black/40 backdrop-blur-sm text-white/90 text-[10px] px-2.5 py-1 rounded-full border border-white/10 font-medium tracking-wide">
            {isEn ? style.labelEn : style.label}
          </span>
        </div>

        {/* Price */}
        {p.price && (
          <div className="absolute top-3 right-3">
            <span className="bg-[#c9a96e] text-[#1a0e06] text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
              {isEn
                ? `$${Math.round(p.price * 10000 / 150).toLocaleString()}`
                : `¥${p.price.toLocaleString()}万`}
            </span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-white/90 text-xs font-medium drop-shadow">
            📍 {p.prefecture} {p.city}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-serif font-bold text-[#2c2416] text-sm leading-snug line-clamp-2 mb-2 group-hover:text-[#5a3e18] transition-colors">
          {title}
        </h3>

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[#8a7a68] mb-3">
          {p.building_area && <span>🏠 {p.building_area}㎡</span>}
          {p.land_area && <span>📐 {p.land_area}㎡</span>}
          {age && <span>🏛 {isEn ? `Est. ${p.year_built}` : `築${age}年`}</span>}
        </div>

        {desc && (
          <p className="text-xs text-[#8a7a68] leading-relaxed line-clamp-2">{desc}</p>
        )}

        {p.tags && p.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {p.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[10px] bg-[#f5f0e8] text-[#5a3e18] px-2 py-0.5 rounded-full border border-[#5a3e18]/15">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
