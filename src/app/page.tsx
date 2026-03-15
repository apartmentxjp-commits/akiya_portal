import Link from 'next/link'
import { Nav, Footer } from '@/components/Nav'
import { PropertyCard } from '@/components/PropertyCard'
import { supabase } from '@/lib/supabase'

async function getLatestProperties() {
  const { data } = await supabase
    .from('properties')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(6)
  return data || []
}

export default async function HomePage() {
  const properties = await getLatestProperties()

  return (
    <>
      <Nav lang="ja" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#3d2b10] via-[#5a3e18] to-[#7a5c3a] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">🏯</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            日本の空き家・古民家を、<br />世界の買い手へ。
          </h1>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            全国の空き家・古民家を掲載するマーケットプレイス。<br />
            売りたいオーナーと、日本の家を探すバイヤーをつなぎます。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/akiya"
              className="bg-[#c9a96e] hover:bg-[#b8924a] text-[#2c2416] font-bold px-8 py-3 rounded-lg transition text-center"
            >
              🔍 物件を探す
            </Link>
            <Link
              href="/submit"
              className="border-2 border-white/60 hover:border-white hover:bg-white/10 text-white font-bold px-8 py-3 rounded-lg transition text-center"
            >
              🏠 物件を登録する（無料）
            </Link>
          </div>

          {/* English CTA */}
          <div className="mt-6">
            <Link href="/en" className="text-[#c9a96e] text-sm underline hover:no-underline">
              🌏 Looking for Japanese property? View in English →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#f5f0e8] py-10">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-3 gap-6 text-center">
          {[
            { icon: '🏠', label: '掲載物件数', value: `${properties.length}+` },
            { icon: '🌏', label: '対応言語', value: '日本語・English' },
            { icon: '💰', label: '掲載料金', value: '完全無料' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl mb-1">{s.icon}</div>
              <div className="font-bold text-[#2c2416] text-lg">{s.value}</div>
              <div className="text-[#8a7a68] text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Property List */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-[#2c2416] mb-2">最新の掲載物件</h2>
          <p className="text-[#8a7a68]">全国から集まった空き家・古民家情報</p>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-20 text-[#8a7a68]">
            <div className="text-5xl mb-4">🏚️</div>
            <p className="text-lg mb-2">まだ掲載物件がありません</p>
            <p className="text-sm mb-6">最初の物件を登録してみましょう</p>
            <Link href="/submit" className="bg-[#5a3e18] text-white px-6 py-2 rounded-lg hover:bg-[#3d2b10] transition">
              物件を登録する
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((p: any) => (
                <PropertyCard key={p.id} p={p} lang="ja" />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/akiya" className="border-2 border-[#5a3e18] text-[#5a3e18] px-8 py-3 rounded-lg font-bold hover:bg-[#5a3e18] hover:text-white transition">
                すべての物件を見る →
              </Link>
            </div>
          </>
        )}
      </section>

      {/* How it works */}
      <section className="bg-[#f5f0e8] py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#2c2416] text-center mb-10">使い方</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-[#5a3e18] mb-4 text-lg">🏠 売りたい方</h3>
              <ol className="space-y-3 text-sm text-[#2c2416]">
                <li className="flex gap-3"><span className="w-6 h-6 bg-[#5a3e18] text-white rounded-full flex items-center justify-center text-xs shrink-0">1</span>物件情報を入力（無料）</li>
                <li className="flex gap-3"><span className="w-6 h-6 bg-[#5a3e18] text-white rounded-full flex items-center justify-center text-xs shrink-0">2</span>AIが英語説明文を自動生成</li>
                <li className="flex gap-3"><span className="w-6 h-6 bg-[#5a3e18] text-white rounded-full flex items-center justify-center text-xs shrink-0">3</span>審査後に掲載・世界に公開</li>
                <li className="flex gap-3"><span className="w-6 h-6 bg-[#5a3e18] text-white rounded-full flex items-center justify-center text-xs shrink-0">4</span>問い合わせをメールで受け取る</li>
              </ol>
            </div>
            <div>
              <h3 className="font-bold text-[#4a7c59] mb-4 text-lg">🌏 買いたい方（外国人OK）</h3>
              <ol className="space-y-3 text-sm text-[#2c2416]">
                <li className="flex gap-3"><span className="w-6 h-6 bg-[#4a7c59] text-white rounded-full flex items-center justify-center text-xs shrink-0">1</span>エリア・価格で物件を検索</li>
                <li className="flex gap-3"><span className="w-6 h-6 bg-[#4a7c59] text-white rounded-full flex items-center justify-center text-xs shrink-0">2</span>英語の説明文で詳細を確認</li>
                <li className="flex gap-3"><span className="w-6 h-6 bg-[#4a7c59] text-white rounded-full flex items-center justify-center text-xs shrink-0">3</span>売主に直接問い合わせ</li>
              </ol>
              <div className="mt-4">
                <Link href="/en" className="text-[#4a7c59] text-sm font-medium hover:underline">
                  → View in English
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer lang="ja" />
    </>
  )
}
