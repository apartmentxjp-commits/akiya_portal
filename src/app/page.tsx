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

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0d0904] text-white min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d0904] via-[#1a0e06] to-[#0d1a10]" />
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#5a3e18]/20 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/4" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#2d5a3d]/15 rounded-full blur-3xl translate-x-1/4 translate-y-1/4" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative max-w-5xl mx-auto px-6 py-24 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-[#c9a96e]" />
              <p className="text-[#c9a96e] text-xs font-medium tracking-[0.2em] uppercase">
                空き家データベース — 物件情報の掲載
              </p>
            </div>

            <h1 className="font-serif text-5xl md:text-6xl font-bold leading-[1.1] mb-6">
              あなたの空き家情報を、
              <br />
              <span className="text-[#c9a96e]">データベースに登録。</span>
            </h1>

            <p className="text-white/60 text-lg leading-relaxed mb-4 max-w-xl">
              本サービスは日本全国の空き家・古民家の物件情報を収集・整理するデータライブラリです。
              情報を登録することで、海外閲覧者にデータとして公開されます。
            </p>
            <p className="text-[#c9a96e]/80 text-sm mb-10">
              掲載料：完全無料　・　登録時間：約5分　・　AI英訳：自動
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link
                href="/submit"
                className="group inline-flex items-center gap-2 bg-[#c9a96e] hover:bg-[#b8924a] text-[#1a0e06] font-bold px-8 py-4 rounded-xl transition-all text-base shadow-lg shadow-[#c9a96e]/20 hover:shadow-[#c9a96e]/30 hover:scale-[1.02]"
              >
                無料でデータを登録する
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/en" className="text-white/40 text-sm self-center hover:text-white/70 transition">
                🌏 English data library →
              </Link>
            </div>

            <div className="flex items-center gap-8 mt-14 pt-10 border-t border-white/5">
              {[
                { value: `${count}+`, label: '登録データ件数' },
                { value: '無料', label: 'データ登録料' },
                { value: 'AI', label: '英語自動翻訳' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-white/40 text-xs mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-6 bg-[#c9a96e]" />
          <p className="text-[#c9a96e] text-xs tracking-widest uppercase">Features</p>
        </div>
        <h2 className="font-serif text-3xl font-bold text-[#1a0e06] mb-12">
          データ登録のメリット
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              num: '01',
              title: '海外閲覧者にデータが届く',
              desc: '英語・USD表示で、米・欧・豪のユーザーがデータベースを閲覧しています。登録メールアドレスがデータの一部として公開されます。',
            },
            {
              num: '02',
              title: 'AIが英語説明を自動生成',
              desc: '日本語で入力するだけ。Groq AIが英語説明文を自動生成し、データベースに格納します。',
            },
            {
              num: '03',
              title: '完全無料・データ登録のみ',
              desc: '掲載費用はありません。当サービスは情報提供のみを目的とするデータプラットフォームです。',
            },
          ].map((item) => (
            <div key={item.num} className="group relative p-6 rounded-2xl border border-[#e2d8cc] hover:border-[#c9a96e]/50 bg-white hover:shadow-card transition-all">
              <p className="font-serif text-5xl font-bold text-[#e2d8cc] group-hover:text-[#c9a96e]/30 transition-colors mb-4 leading-none">
                {item.num}
              </p>
              <h3 className="font-serif font-bold text-[#1a0e06] mb-2 text-lg">{item.title}</h3>
              <p className="text-sm text-[#8a7a68] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#f5f0e8] border-y border-[#e2d8cc] py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-6 bg-[#c9a96e]" />
            <p className="text-[#c9a96e] text-xs tracking-widest uppercase">How it works</p>
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#1a0e06] mb-12">登録の流れ</h2>
          <div className="space-y-3">
            {[
              { step: '01', title: '物件情報を入力', desc: '住所・価格・説明を入力（約5分）。英語は不要です。' },
              { step: '02', title: 'AIが英語を自動生成', desc: 'Groq AIが英語説明を生成し、データベースに格納します。' },
              { step: '03', title: 'データベースに掲載', desc: '24時間以内に審査完了。英語サイトのデータベースに公開されます。' },
              { step: '04', title: '閲覧者から連絡が届く', desc: '登録メールアドレスに問い合わせが届く場合があります。' },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-5 p-5 bg-white rounded-xl border border-[#e2d8cc] hover:shadow-card transition-all">
                <span className="font-serif text-3xl font-bold text-[#e2d8cc] leading-none w-10 shrink-0">{s.step}</span>
                <div>
                  <p className="font-bold text-[#1a0e06] mb-0.5">{s.title}</p>
                  <p className="text-sm text-[#8a7a68]">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 bg-[#5a3e18] text-white font-bold px-10 py-4 rounded-xl hover:bg-[#3d2b10] transition shadow-lg"
            >
              今すぐ無料で登録する →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-6 bg-[#c9a96e]" />
          <p className="text-[#c9a96e] text-xs tracking-widest uppercase">FAQ</p>
        </div>
        <h2 className="font-serif text-3xl font-bold text-[#1a0e06] mb-10">よくある質問</h2>
        <div className="space-y-3">
          {[
            { q: '登録は本当に無料？', a: 'はい。データ登録料は無料です。本サービスは広告掲載およびデータ提供により運営されています。' },
            { q: '外国人は日本の家を買えますか？', a: 'はい。日本では外国人も不動産購入が可能です。ただし本サービスは情報提供のみを目的としており、売買・仲介は行っておりません。' },
            { q: '英語が話せなくて大丈夫？', a: 'はい。AIが英語説明を自動生成します。' },
            { q: '写真なしで登録できますか？', a: 'はい。写真なしでもデータ登録が可能です。' },
          ].map((item) => (
            <div key={item.q} className="border border-[#e2d8cc] rounded-xl p-5 hover:border-[#c9a96e]/40 transition bg-white">
              <p className="font-semibold text-[#1a0e06] mb-1.5">Q. {item.q}</p>
              <p className="text-sm text-[#8a7a68]">A. {item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Legal disclaimer ────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div className="p-5 bg-[#f5f0e8] border border-[#e2d8cc] rounded-xl text-xs text-[#8a7a68] leading-relaxed space-y-2">
          <p>本サービスは広告掲載およびデータ提供により運営されています。</p>
          <p>本サイトは情報提供を目的としており、不動産の売買・仲介・代理・勧誘等は行っておりません。掲載情報の正確性・完全性を保証するものではありません。最終判断は利用者ご自身の責任で行ってください。</p>
        </div>
      </section>

      <Footer lang="ja" />
    </>
  )
}
