import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Nav, Footer } from '@/components/Nav'
import { supabase, PUBLIC_PROPERTY_FIELDS } from '@/lib/supabase'

async function getProperty(id: string) {
  const { data } = await supabase
    .from('properties')
    .select(PUBLIC_PROPERTY_FIELDS)  // address excluded — 都道府県・市区町村まで
    .eq('id', id)
    .eq('status', 'approved')
    .single()
  return data
}

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const p = await getProperty(params.id) as any
  if (!p) notFound()

  const age = p.year_built ? new Date().getFullYear() - p.year_built : null

  return (
    <>
      <Nav lang="ja" />

      <main className="max-w-4xl mx-auto px-4 py-10">
        <Link href="/akiya" className="text-[#8a7a68] text-sm hover:text-[#5a3e18] mb-6 inline-block">
          ← 物件一覧に戻る
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Image */}
          <div>
            <div className="bg-gradient-to-br from-stone-100 to-amber-50 rounded-xl h-72 flex items-center justify-center text-8xl">
              🏯
            </div>
            {/* English version link */}
            <div className="mt-4 p-3 bg-[#f5f0e8] rounded-lg text-sm">
              <span className="text-[#8a7a68]">🌏 For international buyers: </span>
              <Link href={`/en/akiya/${p.id}`} className="text-[#4a7c59] font-medium hover:underline">
                View in English →
              </Link>
            </div>
          </div>

          {/* Right: Info */}
          <div>
            <h1 className="text-xl font-bold text-[#2c2416] mb-2">{p.title}</h1>
            <p className="text-[#8a7a68] text-sm mb-4">📍 {p.prefecture} {p.city}</p>

            {p.price && (
              <div className="text-3xl font-bold text-[#5a3e18] mb-6">
                {p.price.toLocaleString()}<span className="text-base font-normal text-[#8a7a68]">万円</span>
              </div>
            )}

            {/* Specs */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: '建物面積', value: p.building_area ? `${p.building_area}㎡` : '-' },
                { label: '土地面積', value: p.land_area ? `${p.land_area}㎡` : '-' },
                { label: '築年数', value: age ? `築${age}年（${p.year_built}年）` : '-' },
                { label: '所在地', value: `${p.prefecture} ${p.city}` },  // 番地以下は非表示
              ].map(({ label, value }) => (
                <div key={label} className="bg-[#f5f0e8] rounded-lg p-3">
                  <div className="text-xs text-[#8a7a68] mb-1">{label}</div>
                  <div className="text-sm font-medium text-[#2c2416]">{value}</div>
                </div>
              ))}
            </div>

            {/* Contact */}
            {p.contact_email && (
              <a
                href={`mailto:${p.contact_email}?subject=物件について（${p.title}）`}
                className="w-full block text-center bg-[#5a3e18] hover:bg-[#3d2b10] text-white font-bold py-3 rounded-xl transition"
              >
                📧 売主に問い合わせる
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        {p.description && (
          <div className="mt-10">
            <h2 className="text-lg font-bold text-[#2c2416] mb-4 border-l-4 border-[#5a3e18] pl-3">物件詳細</h2>
            <div className="text-sm text-[#2c2416] leading-relaxed whitespace-pre-wrap bg-white border border-stone-200 rounded-xl p-6">
              {p.description}
            </div>
          </div>
        )}
      </main>

      <Footer lang="ja" />
    </>
  )
}
