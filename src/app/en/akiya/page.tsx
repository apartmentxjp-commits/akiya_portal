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

const PRICE_RANGES = [
  { label: 'Up to ¥1M (≈$7k)', value: '100' },
  { label: 'Up to ¥3M (≈$20k)', value: '300' },
  { label: 'Up to ¥5M (≈$33k)', value: '500' },
  { label: 'Up to ¥10M (≈$67k)', value: '1000' },
]

export default async function EnAkiyaListPage({
  searchParams,
}: {
  searchParams: { pref?: string; max?: string }
}) {
  const prefecture = searchParams.pref
  const maxPrice = searchParams.max ? Number(searchParams.max) : undefined
  const properties = await getProperties(prefecture, maxPrice)

  return (
    <>
      <Nav lang="en" />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#2c2416] mb-1">Browse Japanese Properties</h1>
          <p className="text-[#8a7a68] text-sm">{properties.length} traditional homes available across Japan</p>
        </div>

        {/* Filter */}
        <form method="get" className="flex flex-wrap gap-3 mb-8 p-4 bg-[#f5f0e8] rounded-xl">
          <input
            type="text"
            name="pref"
            defaultValue={prefecture || ''}
            placeholder="Prefecture (e.g. Kyoto, Nagano)"
            className="border border-stone-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#5a3e18] min-w-[200px]"
          />

          <select
            name="max"
            defaultValue={maxPrice || ''}
            className="border border-stone-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#5a3e18]"
          >
            <option value="">Any price</option>
            {PRICE_RANGES.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>

          <button type="submit" className="bg-[#5a3e18] text-white px-6 py-2 rounded-lg text-sm hover:bg-[#3d2b10] transition">
            Search
          </button>

          {(prefecture || maxPrice) && (
            <a href="/en/akiya" className="text-[#8a7a68] text-sm py-2 hover:text-[#5a3e18]">Clear ✕</a>
          )}
        </form>

        {properties.length === 0 ? (
          <div className="text-center py-20 text-[#8a7a68]">
            <div className="text-5xl mb-4">🔍</div>
            <p>No properties found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((p: any) => (
              <PropertyCard key={p.id} p={p} lang="en" />
            ))}
          </div>
        )}
      </main>

      <Footer lang="en" />
    </>
  )
}
