export const revalidate = 0

import { Nav, Footer } from '@/components/Nav'
import { supabase, PUBLIC_PROPERTY_FIELDS } from '@/lib/supabase'
import Link from 'next/link'

async function getProperties(prefecture?: string, maxPrice?: number, type?: string) {
  let query = supabase
    .from('properties')
    .select(PUBLIC_PROPERTY_FIELDS)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })

  if (prefecture) query = query.ilike('prefecture', `%${prefecture}%`)
  if (maxPrice) query = query.lte('price', maxPrice)
  if (type) query = query.eq('property_type', type)

  const { data } = await query.limit(200)
  return data || []
}

const PRICE_RANGES = [
  { label: 'Under $7k (¥1M)',  value: '100' },
  { label: 'Under $20k (¥3M)', value: '300' },
  { label: 'Under $33k (¥5M)', value: '500' },
  { label: 'Under $67k (¥10M)', value: '1000' },
]

const PROPERTY_TYPES = [
  { label: 'Kominka 古民家', value: 'kominka' },
  { label: 'Farmhouse 農家', value: 'farmhouse' },
  { label: 'Machiya 町家',   value: 'machiya' },
  { label: 'Villa 別荘',     value: 'villa' },
]

// ── Japanese prefecture/city → English ────────────────────────────────────────
const PREFECTURE_EN: Record<string, string> = {
  '北海道':'Hokkaido','青森県':'Aomori','岩手県':'Iwate','宮城県':'Miyagi',
  '秋田県':'Akita','山形県':'Yamagata','福島県':'Fukushima','茨城県':'Ibaraki',
  '栃木県':'Tochigi','群馬県':'Gunma','埼玉県':'Saitama','千葉県':'Chiba',
  '東京都':'Tokyo','神奈川県':'Kanagawa','新潟県':'Niigata','富山県':'Toyama',
  '石川県':'Ishikawa','福井県':'Fukui','山梨県':'Yamanashi','長野県':'Nagano',
  '岐阜県':'Gifu','静岡県':'Shizuoka','愛知県':'Aichi','三重県':'Mie',
  '滋賀県':'Shiga','京都府':'Kyoto','大阪府':'Osaka','兵庫県':'Hyogo',
  '奈良県':'Nara','和歌山県':'Wakayama','鳥取県':'Tottori','島根県':'Shimane',
  '岡山県':'Okayama','広島県':'Hiroshima','山口県':'Yamaguchi','徳島県':'Tokushima',
  '香川県':'Kagawa','愛媛県':'Ehime','高知県':'Kochi','福岡県':'Fukuoka',
  '佐賀県':'Saga','長崎県':'Nagasaki','熊本県':'Kumamoto','大分県':'Oita',
  '宮崎県':'Miyazaki','鹿児島県':'Kagoshima','沖縄県':'Okinawa',
}

const CITY_EN: Record<string, string> = {
  // 北海道
  '函館市':'Hakodate','室蘭市':'Muroran','小樽市':'Otaru','旭川市':'Asahikawa',
  '帯広市':'Obihiro','釧路市':'Kushiro','北見市':'Kitami','網走市':'Abashiri',
  '稚内市':'Wakkanai','浦幌町':'Urahoro','月形町':'Tsukigata','芦別市':'Ashibetsu',
  // 東北
  '大船渡市':'Ofunato','宮古市':'Miyako','岩泉町':'Iwaizumi','紫波町':'Shiwa',
  '弘前市':'Hirosaki','八戸市':'Hachinohe','十和田市':'Towada','平川市':'Hirakawa',
  '山形市':'Yamagata','米沢市':'Yonezawa','鶴岡市':'Tsuruoka','酒田市':'Sakata',
  '福島市':'Fukushima','郡山市':'Koriyama','会津若松市':'Aizu Wakamatsu',
  // 関東
  '安中市':'Annaka','桐生市':'Kiryu','みどり市':'Midori','沼田市':'Numata',
  '藤岡市':'Fujioka','富岡市':'Tomioka','渋川市':'Shibukawa','吾妻郡':'Agatsuma',
  '館林市':'Tatebayashi','那須塩原市':'Nasu Shiobara','日光市':'Nikko',
  '箱根町':'Hakone','富士河口湖町':'Fujikawaguchiko',
  // 中部・北陸
  '十日町市':'Tokamachi','小千谷市':'Ojiya','佐渡市':'Sado','魚沼市':'Uonuma',
  '長岡市':'Nagaoka','上越市':'Joetsu','糸魚川市':'Itoigawa','妙高市':'Myoko',
  '南砺市':'Nanto','小浜市':'Obama','高山市':'Takayama','白川村':'Shirakawa',
  '飛騨市':'Hida','下呂市':'Gero','松本市':'Matsumoto','安曇野市':'Azumino',
  '軽井沢町':'Karuizawa','飯山市':'Iiyama','諏訪市':'Suwa','伊那市':'Ina',
  '飯田市':'Iida','長野市':'Nagano',
  // 関西
  '亀岡市':'Kameoka','南丹市':'Nantan','京都市':'Kyoto','宇治市':'Uji',
  '福知山市':'Fukuchiyama','舞鶴市':'Maizuru','綾部市':'Ayabe','美山町':'Miyama',
  '大津市':'Otsu','彦根市':'Hikone','長浜市':'Nagahama','米原市':'Maibara',
  '丹波篠山市':'Tanba Sasayama','豊岡市':'Toyooka','養父市':'Yabu','朝来市':'Asago',
  '紀の川市':'Kinokawa','かつらぎ町':'Katsuragi','湯浅町':'Yuasa','田辺市':'Tanabe',
  // 中国・四国
  '雲南市':'Unnan','大田市':'Oda','出雲市':'Izumo','浜田市':'Hamada',
  '益田市':'Masuda','美作市':'Mimasaka','津山市':'Tsuyama','真庭市':'Maniwa',
  '新見市':'Niimi','瀬戸内市':'Setouchi','倉吉市':'Kurayoshi','三朝町':'Misasa',
  '萩市':'Hagi','周南市':'Shunan','山口市':'Yamaguchi City',
  '三好市':'Miyoshi','上勝町':'Kamikatsu','美馬市':'Mima','東みよし町':'Higashi Miyoshi',
  '四万十市':'Shimanto','四万十町':'Shimanto','梼原町':'Yusuhara','仁淀川町':'Niyodogawa',
  '須崎市':'Susaki','高知市':'Kochi City','土佐市':'Tosa',
  // 九州・沖縄
  '枕崎市':'Makurazaki','出水市':'Izumi','南九州市':'Minami Kyushu',
  '屋久島町':'Yakushima','指宿市':'Ibusuki','霧島市':'Kirishima',
  '南さつま市':'Minami Satsuma','鹿児島市':'Kagoshima City',
  '津久見市':'Tsukumi','竹田市':'Taketa','九重町':'Kokonoe','玖珠町':'Kusu',
  '阿蘇市':'Aso','南阿蘇村':'Minami Aso','球磨村':'Kuma','人吉市':'Hitoyoshi',
  '天草市':'Amakusa','壱岐市':'Iki','対馬市':'Tsushima','五島市':'Goto',
  '宮崎市':'Miyazaki City','日南市':'Nichinan','えびの市':'Ebino',
  '沖縄市':'Okinawa City','那覇市':'Naha','名護市':'Nago',
}

function locationEn(prefecture: string, city?: string): string {
  const pref = PREFECTURE_EN[prefecture] || prefecture
  if (!city) return pref
  const cityEn = CITY_EN[city] || city.replace(/[市町村区郡]$/, '')
  return `${cityEn}, ${pref}`
}

// Sample properties shown when DB is empty
const SAMPLES = [
  { loc: 'Setouchi, Okayama', price: '$55,000', gradient: 'from-blue-900 via-teal-800 to-emerald-800', emoji: '🌊' },
  { loc: 'Maniwa, Okayama',   price: '$29,000', gradient: 'from-amber-900 via-stone-800 to-stone-700', emoji: '🏯' },
  { loc: 'Kokonoe, Oita',     price: '$64,000', gradient: 'from-green-900 via-emerald-800 to-teal-800', emoji: '⛰️' },
  { loc: 'Mimasaka, Okayama', price: '$45,000', gradient: 'from-slate-800 via-stone-700 to-stone-600', emoji: '🌸' },
  { loc: 'Iiyama, Nagano',    price: '$14,000', gradient: 'from-amber-800 via-amber-700 to-stone-700', emoji: '🌾' },
  { loc: 'Ojiya, Niigata',    price: '$6,500',  gradient: 'from-green-800 via-green-700 to-emerald-700', emoji: '🌿' },
  { loc: 'Kameoka, Kyoto',    price: '$29,000', gradient: 'from-slate-700 via-slate-600 to-stone-600', emoji: '🏘️' },
  { loc: 'Karuizawa, Nagano', price: '$42,000', gradient: 'from-blue-800 via-indigo-700 to-slate-700', emoji: '🏔️' },
  { loc: 'Tokushima, Mima',   price: '$5,000',  gradient: 'from-amber-700 via-amber-600 to-stone-600', emoji: '🌄' },
  { loc: 'Shimane, Oda',      price: '$9,800',  gradient: 'from-green-700 via-green-600 to-teal-700', emoji: '🌻' },
  { loc: 'Kochi, Shimanto',   price: '$18,000', gradient: 'from-teal-800 via-cyan-700 to-sky-800', emoji: '🌊' },
  { loc: 'Hyogo, Asago',      price: '$22,000', gradient: 'from-stone-700 via-stone-600 to-amber-700', emoji: '🏡' },
]

export default async function EnAkiyaListPage({
  searchParams,
}: {
  searchParams: { pref?: string; max?: string; type?: string }
}) {
  const prefecture = searchParams.pref
  const maxPrice = searchParams.max ? Number(searchParams.max) : undefined
  const propertyType = searchParams.type
  const properties = await getProperties(prefecture, maxPrice, propertyType)
  const hasFilters = prefecture || maxPrice || propertyType

  return (
    <>
      <Nav lang="en" />

      {/* Hero */}
      <section className="relative h-[35vh] min-h-[260px] flex items-end overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1920&auto=format&fit=crop&q=80"
          alt="Japanese houses"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-6xl mx-auto px-6 pb-10 w-full">
          <h1 className="text-4xl font-bold text-white">
            {prefecture ? `Houses For Sale in ${prefecture}, Japan` : 'Houses For Sale in Japan'}
          </h1>
          {properties.length > 0 && (
            <p className="text-white/70 text-sm mt-1">{properties.length} properties found</p>
          )}
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* Filter bar */}
        <form method="get" className="bg-[#f9f9f9] border border-stone-200 rounded-2xl p-5 mb-8">
          <div className="flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-[180px]">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">Prefecture / Region</label>
              <input
                type="text"
                name="pref"
                defaultValue={prefecture || ''}
                placeholder="e.g. Kyoto, Nagano, Hokkaido"
                className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#e07070] focus:ring-2 focus:ring-[#e07070]/20 transition"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">Max Price</label>
              <select
                name="max"
                defaultValue={maxPrice?.toString() || ''}
                className="border border-stone-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#e07070] min-w-[160px] transition"
              >
                <option value="">Any price</option>
                {PRICE_RANGES.map((r) => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">Property Type</label>
              <select
                name="type"
                defaultValue={propertyType || ''}
                className="border border-stone-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#e07070] min-w-[150px] transition"
              >
                <option value="">All types</option>
                {PROPERTY_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-[#e07070] hover:bg-[#cc5c5c] text-white font-bold px-6 py-2.5 rounded-xl text-sm transition shadow-sm"
              >
                Search
              </button>
              {hasFilters && (
                <a href="/en/akiya" className="text-stone-400 hover:text-stone-600 text-sm py-2.5 px-2 transition">
                  ✕ Clear
                </a>
              )}
            </div>
          </div>
        </form>

        {properties.length === 0 && !hasFilters ? (
          /* Show samples when DB is empty */
          <>
            <p className="text-stone-500 text-sm text-center mb-8">
              Sample listings — subscribe to see full details
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {SAMPLES.map((s, i) => (
                <Link
                  key={i}
                  href="/en/subscribe"
                  className="group relative block aspect-square overflow-hidden rounded-xl"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} flex items-center justify-center`}>
                    <span className="text-5xl">{s.emoji}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white font-bold text-sm">{s.price}</p>
                    <p className="text-white/80 text-xs">{s.loc}</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-white text-stone-800 text-xs font-bold px-3 py-1.5 rounded-full">Subscribe to view</span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : properties.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🏚️</div>
            <h2 className="text-xl font-bold text-stone-800 mb-2">No properties found</h2>
            <p className="text-stone-500 text-sm mb-6">Try adjusting your filters</p>
            <a href="/en/akiya" className="inline-flex items-center gap-2 bg-[#e07070] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#cc5c5c] transition">
              Browse All Properties
            </a>
          </div>
        ) : (
          <>
            {/* Photo grid — CHJ style */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {properties.map((p: any) => {
                const hasPhoto = p.images && p.images.length > 0
                const priceUSD = p.price ? `$${Math.round(p.price * 10000 / 150).toLocaleString()}` : 'POA'
                return (
                  <Link
                    key={p.id}
                    href="/en/subscribe"
                    className="group relative block aspect-square overflow-hidden rounded-xl"
                  >
                    {hasPhoto ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.images[0]}
                        alt={p.title_en || p.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-stone-700 via-stone-600 to-stone-500" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white font-bold text-sm">{priceUSD}</p>
                      <p className="text-white/80 text-xs">{locationEn(p.prefecture, p.city)}</p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-white text-stone-800 text-xs font-bold px-3 py-1.5 rounded-full">Subscribe to view details</span>
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* Upsell */}
            <div className="mt-12 bg-[#f9f9f9] rounded-2xl p-8 text-center border border-stone-200">
              <h3 className="text-2xl font-bold text-stone-800 mb-3">
                See Full Addresses, Photos & Contact Info
              </h3>
              <p className="text-stone-500 text-sm mb-6 max-w-md mx-auto">
                Subscribe for $7.99/month to unlock every detail for every property —
                full address, all photos, sqm specs, and direct contact information.
              </p>
              <Link
                href="/en/subscribe"
                className="inline-block bg-[#e07070] hover:bg-[#cc5c5c] text-white font-bold px-8 py-3.5 rounded-full text-sm uppercase tracking-wide transition shadow-md"
              >
                Get Full Access — $7.99/mo
              </Link>
            </div>
          </>
        )}
      </main>

      <Footer lang="en" />
    </>
  )
}
