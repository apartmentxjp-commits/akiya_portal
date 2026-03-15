import Link from 'next/link'
import { Nav, Footer } from '@/components/Nav'
import { supabase } from '@/lib/supabase'

async function getStats() {
  const { count } = await supabase
    .from('properties')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'approved')
  return { count: count || 0 }
}

export default async function SellerHomePage() {
  const { count } = await getStats()

  return (
    <>
      <Nav lang="ja" />

      {/* Hero — seller focused */}
      <section className="bg-gradient-to-br from-[#1a1208] via-[#3d2b10] to-[#5a3e18] text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#c9a96e] text-sm font-medium tracking-widest uppercase mb-4">
            空き家・古民家オーナーの方へ
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            あなたの空き家を、<br />
            <span className="text-[#c9a96e]">世界中のバイヤーへ。</span>
          </h1>
          <p className="text-lg text-white/75 mb-4 max-w-2xl mx-auto leading-relaxed">
            日本の空き家・古民家に興味を持つ外国人が急増しています。<br />
            写真と住所を入れるだけで、AIが英語説明文を自動生成。完全無料。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href="/submit"
              className="bg-[#c9a96e] hover:bg-[#b8924a] text-[#2c2416] font-bold px-10 py-4 rounded-xl transition text-lg"
            >
              🏠 無料で物件を掲載する
            </Link>
          </div>

          <p className="mt-6 text-white/50 text-sm">
            掲載料：完全無料 ・ 登録時間：約5分 ・ AIが英語翻訳を自動生成
          </p>

          <div className="mt-8 border-t border-white/10 pt-8">
            <Link href="/en" className="text-[#c9a96e] text-sm hover:underline">
              🌏 Looking to buy? View English site for buyers →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#f5f0e8] py-10 border-b border-[#e0d4be]">
        <div className="max-w-3xl mx-auto px-4 grid grid-cols-3 gap-6 text-center">
          {[
            { icon: '🏠', value: `${count}件`, label: '掲載中の物件' },
            { icon: '🌍', value: '海外バイヤー', label: '米・欧・豪から問い合わせ' },
            { icon: '💴', value: '完全無料', label: '掲載・成約手数料ゼロ' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl mb-1">{s.icon}</div>
              <div className="font-bold text-[#2c2416] text-lg">{s.value}</div>
              <div className="text-[#8a7a68] text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why list here */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-[#2c2416] text-center mb-10">
          なぜ Akiya Japan に掲載するのか
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: '🌏',
              title: '海外バイヤーに届く',
              desc: '英語・米ドル表示で、アメリカ・ヨーロッパ・オーストラリアのバイヤーに直接届きます。',
            },
            {
              icon: '🤖',
              title: 'AIが英語説明を自動生成',
              desc: '日本語で入力するだけ。AIが自然な英語説明文・タグを自動で作ります。英語は不要です。',
            },
            {
              icon: '📧',
              title: '問い合わせを直接受け取る',
              desc: '仲介業者なし。バイヤーからの問い合わせはあなたのメールに直接届きます。',
            },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-[#2c2416] mb-2">{item.title}</h3>
              <p className="text-sm text-[#8a7a68] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#f5f0e8] py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#2c2416] text-center mb-10">掲載の流れ</h2>
          <div className="space-y-4">
            {[
              { step: 1, title: '物件情報を入力', desc: '住所・価格・写真・説明を入力（約5分）' },
              { step: 2, title: 'AIが英語説明文を自動生成', desc: 'Groq AIが自然な英語に翻訳。修正不要。' },
              { step: 3, title: '審査・掲載', desc: '通常24時間以内に審査完了。世界に公開されます。' },
              { step: 4, title: 'バイヤーから問い合わせが届く', desc: '登録したメールアドレスに直接連絡が来ます。' },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm">
                <span className="w-8 h-8 bg-[#5a3e18] text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                  {s.step}
                </span>
                <div>
                  <p className="font-bold text-[#2c2416]">{s.title}</p>
                  <p className="text-sm text-[#8a7a68]">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/submit"
              className="bg-[#5a3e18] text-white font-bold px-10 py-4 rounded-xl hover:bg-[#3d2b10] transition text-lg inline-block"
            >
              🏠 今すぐ無料で掲載する
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-[#2c2416] text-center mb-8">よくある質問</h2>
        <div className="space-y-4">
          {[
            { q: '掲載は本当に無料ですか？', a: 'はい、完全無料です。成約手数料もありません。' },
            { q: '外国人でも日本の家を買えますか？', a: 'はい。日本では外国人も不動産を購入できます。海外から問い合わせてくるバイヤーはその点を理解しています。' },
            { q: '英語が話せなくても大丈夫ですか？', a: 'AIが英語説明を自動生成します。バイヤーとのやり取りは翻訳ツールを使っていただけます。' },
            { q: '写真がなくても掲載できますか？', a: 'はい。写真なしでも掲載できますが、写真があるほど問い合わせが増えます。' },
          ].map((item) => (
            <div key={item.q} className="border border-stone-200 rounded-xl p-5">
              <p className="font-bold text-[#2c2416] mb-1">Q. {item.q}</p>
              <p className="text-sm text-[#8a7a68]">A. {item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer lang="ja" />
    </>
  )
}
