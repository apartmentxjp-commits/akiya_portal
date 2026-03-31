import Link from 'next/link'
import type { Property } from '@/lib/supabase'
import { locationEn } from '@/lib/locationEn'

const TYPE_STYLES: Record<string, { gradient: string; label: string; labelEn: string; color: string }> = {
  kominka:   { gradient: 'from-amber-800 via-amber-700 to-stone-700',   label: '古民家',   labelEn: 'Kominka',    color: '#c9a96e' },
  farmhouse: { gradient: 'from-green-800 via-green-700 to-emerald-800', label: '農家',     labelEn: 'Farmhouse',  color: '#7ecfa0' },
  machiya:   { gradient: 'from-slate-700 via-slate-600 to-stone-600',   label: '町家',     labelEn: 'Machiya',    color: '#94a3b8' },
  villa:     { gradient: 'from-blue-800 via-indigo-700 to-slate-700',   label: '別荘',     labelEn: 'Villa',      color: '#93c5fd' },
  default:   { gradient: 'from-stone-700 via-stone-600 to-stone-500',   label: '古民家',   labelEn: 'Traditional', color: '#c9a96e' },
}

export function PropertyCard({ p, lang = 'ja' }: { p: Property; lang?: 'ja' | 'en' }) {
  const isEn = lang === 'en'
  const title = isEn ? (p.title_en || p.title) : p.title
  const desc = isEn ? (p.description_en || p.description) : p.description
  const href = isEn ? `/en/akiya/${p.id}` : `/akiya/${p.id}`
  const typeKey = (p.property_type || 'default') as keyof typeof TYPE_STYLES
  const style = TYPE_STYLES[typeKey] || TYPE_STYLES.default
  const age = p.year_built ? new Date().getFullYear() - p.year_built : null
  // 間取り図・成約済み・テキスト入り写真を除外するフィルター
  const EXCLUDE_KEYWORDS = ['madori', '間取', 'floor', 'plan', '成約', 'sold', 'map', 'layout', '図面', 'keiyaku']
  const isValidPhoto = (url: string) =>
    !EXCLUDE_KEYWORDS.some(kw => url.toLowerCase().includes(kw))
  const validImages = (p.images || []).filter((img): img is string => typeof img === 'string' && isValidPhoto(img))
  const hasPhoto = validImages.length > 0

  return (
    <Link
      href={href}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-stone-100"
    >
      {/* Image area */}
      <div className="relative h-52 overflow-hidden">
        {hasPhoto ? (
          /* Real property photo */
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={validImages[0]}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          /* Gradient fallback */
          <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient}`}>
            {/* Japanese pattern overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M30 0L0 30h60L30 0zm0 60L0 30h60L30 60z'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>
        )}

        {/* Dark gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Property type badge - top left */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide backdrop-blur-sm"
            style={{ backgroundColor: `${style.color}cc` }}
          >
            {isEn ? style.labelEn : style.label}
          </span>
        </div>

        {/* Price badge - top right */}
        {p.price && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-white/95 text-[#1a0e06] text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
              {isEn
                ? `$${Math.round(p.price * 10000 / 150).toLocaleString()}`
                : `¥${p.price.toLocaleString()}万`}
            </span>
          </div>
        )}

        {/* Location - bottom */}
        <div className="absolute bottom-3 left-3 right-3 z-10">
          <p className="text-white text-xs font-medium drop-shadow">
            📍 {locationEn(p.prefecture, p.city)}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-[#1a0e06] text-sm leading-snug line-clamp-2 mb-2 group-hover:text-[#2a6645] transition-colors">
          {title}
        </h3>

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-stone-500 mb-3">
          {p.building_area && <span>🏠 {p.building_area}㎡</span>}
          {p.land_area && <span>📐 {p.land_area}㎡</span>}
          {age && <span>🗓 {isEn ? `Built ${p.year_built}` : `築${age}年`}</span>}
        </div>

        {desc && (
          <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">{desc}</p>
        )}

        {p.tags && p.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {p.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-3 flex items-center gap-1 text-[#2a6645] text-xs font-semibold">
          <span>{isEn ? 'View details' : '詳細を見る'}</span>
          <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
