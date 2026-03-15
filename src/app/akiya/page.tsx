import { Nav, Footer } from '@/components/Nav'
import { PropertyCard } from '@/components/PropertyCard'
import { supabase } from '@/lib/supabase'

async function getProperties(prefecture?: string, maxPrice?: number) {
  let query = supabase
    .from('properties')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })

  if (prefecture) query = query.eq('prefecture', prefecture)
  if (maxPrice) query = query.lte('price', maxPrice)

  const { data } = await query.limit(50)
  return data || []
}

const PREFECTURES = [
  '北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県',
  '茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県',
  '新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県',
  '静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県',
  '奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県',
  '徳島県','香川県','愛媛県','高知県','福岡県','佐賀県','長崎県',
  '熊本県','大分県','宮崎県','鹿児島県','沖縄県',
]

export default async function AkiyaListPage({
  searchParams,
}: {
  searchParams: { pref?: string; max?: string }
}) {
  const prefecture = searchParams.pref
  const maxPrice = searchParams.max ? Number(searchParams.max) : undefined
  const properties = await getProperties(prefecture, maxPrice)

  return (
    <>
      <Nav lang="ja" />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#2c2416] mb-1">物件一覧</h1>
          <p className="text-[#8a7a68] text-sm">全国の空き家・古民家 {properties.length}件</p>
        </div>

        {/* Filter */}
        <form method="get" className="flex flex-wrap gap-3 mb-8 p-4 bg-[#f5f0e8] rounded-xl">
          <select
            name="pref"
            defaultValue={prefecture || ''}
            className="border border-stone-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#5a3e18]"
          >
            <option value="">すべての都道府県</option>
            {PREFECTURES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          <select
            name="max"
            defaultValue={maxPrice || ''}
            className="border border-stone-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#5a3e18]"
          >
            <option value="">価格上限なし</option>
            <option value="100">〜100万円</option>
            <option value="300">〜300万円</option>
            <option value="500">〜500万円</option>
            <option value="1000">〜1,000万円</option>
          </select>

          <button
            type="submit"
            className="bg-[#5a3e18] text-white px-6 py-2 rounded-lg text-sm hover:bg-[#3d2b10] transition"
          >
            絞り込む
          </button>

          {(prefecture || maxPrice) && (
            <a href="/akiya" className="text-[#8a7a68] text-sm py-2 hover:text-[#5a3e18]">
              クリア ✕
            </a>
          )}
        </form>

        {properties.length === 0 ? (
          <div className="text-center py-20 text-[#8a7a68]">
            <div className="text-5xl mb-4">🔍</div>
            <p>条件に合う物件が見つかりませんでした</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((p: any) => (
              <PropertyCard key={p.id} p={p} lang="ja" />
            ))}
          </div>
        )}
      </main>

      <Footer lang="ja" />
    </>
  )
}
