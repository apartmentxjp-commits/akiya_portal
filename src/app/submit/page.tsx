'use client'

import { useState } from 'react'
import { Nav, Footer } from '@/components/Nav'
import { supabase } from '@/lib/supabase'

const PREFECTURES = [
  '北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県',
  '茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県',
  '新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県',
  '静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県',
  '奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県',
  '徳島県','香川県','愛媛県','高知県','福岡県','佐賀県','長崎県',
  '熊本県','大分県','宮崎県','鹿児島県','沖縄県',
]

type FormData = {
  title: string
  price: string
  prefecture: string
  city: string
  address: string
  building_area: string
  land_area: string
  year_built: string
  description: string
  contact_email: string
}

const EMPTY: FormData = {
  title: '', price: '', prefecture: '京都府', city: '', address: '',
  building_area: '', land_area: '', year_built: '', description: '', contact_email: '',
}

export default function SubmitPage() {
  const [form, setForm] = useState<FormData>(EMPTY)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const set = (k: keyof FormData, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.prefecture || !form.city || !form.contact_email) {
      setError('必須項目をすべて入力してください')
      return
    }
    setStatus('submitting')
    setError('')

    const { error: sbError } = await supabase.from('properties').insert({
      title: form.title,
      price: form.price ? Number(form.price) : null,
      prefecture: form.prefecture,
      city: form.city,
      address: form.address || null,
      building_area: form.building_area ? Number(form.building_area) : null,
      land_area: form.land_area ? Number(form.land_area) : null,
      year_built: form.year_built ? Number(form.year_built) : null,
      description: form.description || null,
      contact_email: form.contact_email,
      status: 'pending',
    })

    if (sbError) {
      setStatus('error')
      setError('送信に失敗しました: ' + sbError.message)
    } else {
      setStatus('success')
      // Trigger AI translation in background
      fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: form.title, description: form.description }),
      }).catch(() => {})
    }
  }

  if (status === 'success') {
    return (
      <>
        <Nav lang="ja" />
        <main className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-2xl font-bold text-[#2c2416] mb-4">登録申請を受け付けました</h1>
          <p className="text-[#8a7a68] mb-4">
            内容を確認後、通常1〜2営業日以内に公開いたします。<br />
            AIが英語の説明文を自動生成し、外国人バイヤーにも紹介します。
          </p>
          <p className="text-sm text-[#8a7a68] bg-[#f5f0e8] rounded-xl p-4">
            📧 問い合わせは登録されたメールアドレスに届きます。<br />
            迷惑メールフォルダも確認してください。
          </p>
          <button
            onClick={() => { setForm(EMPTY); setStatus('idle') }}
            className="mt-8 border border-[#5a3e18] text-[#5a3e18] px-6 py-2 rounded-lg hover:bg-[#5a3e18] hover:text-white transition"
          >
            別の物件を登録する
          </button>
        </main>
        <Footer lang="ja" />
      </>
    )
  }

  return (
    <>
      <Nav lang="ja" />

      <main className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-[#2c2416] mb-2">物件を登録する</h1>
        <p className="text-[#8a7a68] text-sm mb-8">
          無料で掲載できます。AIが英語の説明文を自動生成し、外国人バイヤーにも届けます。
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <section className="bg-white border border-stone-200 rounded-xl p-6 space-y-4">
            <h2 className="font-bold text-[#2c2416] border-l-4 border-[#5a3e18] pl-3">基本情報</h2>

            <div>
              <label className="text-sm text-[#8a7a68] mb-1 block">物件タイトル <span className="text-red-500">*</span></label>
              <input
                value={form.title}
                onChange={(e) => set('title', e.target.value)}
                placeholder="例: 京都市の築100年古民家、山の見える古民家"
                className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#5a3e18]"
              />
            </div>

            <div>
              <label className="text-sm text-[#8a7a68] mb-1 block">価格（万円）</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => set('price', e.target.value)}
                placeholder="例: 300 (300万円)"
                className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#5a3e18]"
              />
              <p className="text-xs text-[#8a7a68] mt-1">未入力の場合「価格相談」として掲載されます</p>
            </div>
          </section>

          {/* Location */}
          <section className="bg-white border border-stone-200 rounded-xl p-6 space-y-4">
            <h2 className="font-bold text-[#2c2416] border-l-4 border-[#5a3e18] pl-3">所在地</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[#8a7a68] mb-1 block">都道府県 <span className="text-red-500">*</span></label>
                <select
                  value={form.prefecture}
                  onChange={(e) => set('prefecture', e.target.value)}
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#5a3e18]"
                >
                  {PREFECTURES.map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm text-[#8a7a68] mb-1 block">市区町村 <span className="text-red-500">*</span></label>
                <input
                  value={form.city}
                  onChange={(e) => set('city', e.target.value)}
                  placeholder="例: 亀岡市"
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#5a3e18]"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-[#8a7a68] mb-1 block">詳細住所（任意）</label>
              <input
                value={form.address}
                onChange={(e) => set('address', e.target.value)}
                placeholder="例: ○○町△△"
                className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#5a3e18]"
              />
            </div>
          </section>

          {/* Specs */}
          <section className="bg-white border border-stone-200 rounded-xl p-6 space-y-4">
            <h2 className="font-bold text-[#2c2416] border-l-4 border-[#5a3e18] pl-3">物件スペック</h2>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-[#8a7a68] mb-1 block">建物面積（㎡）</label>
                <input
                  type="number"
                  value={form.building_area}
                  onChange={(e) => set('building_area', e.target.value)}
                  placeholder="例: 120"
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#5a3e18]"
                />
              </div>
              <div>
                <label className="text-sm text-[#8a7a68] mb-1 block">土地面積（㎡）</label>
                <input
                  type="number"
                  value={form.land_area}
                  onChange={(e) => set('land_area', e.target.value)}
                  placeholder="例: 200"
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#5a3e18]"
                />
              </div>
              <div>
                <label className="text-sm text-[#8a7a68] mb-1 block">築年（西暦）</label>
                <input
                  type="number"
                  value={form.year_built}
                  onChange={(e) => set('year_built', e.target.value)}
                  placeholder="例: 1960"
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#5a3e18]"
                />
              </div>
            </div>
          </section>

          {/* Description */}
          <section className="bg-white border border-stone-200 rounded-xl p-6 space-y-4">
            <h2 className="font-bold text-[#2c2416] border-l-4 border-[#5a3e18] pl-3">物件説明</h2>
            <div>
              <label className="text-sm text-[#8a7a68] mb-1 block">
                詳細説明
                <span className="ml-2 text-xs bg-[#4a7c59] text-white px-2 py-0.5 rounded">AI英訳あり</span>
              </label>
              <textarea
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                rows={6}
                placeholder="物件の特徴、状態、周辺環境、リノベーション歴など、詳しく記入してください。日本語で書いていただければAIが自動で英語に翻訳します。"
                className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#5a3e18] resize-y"
              />
            </div>
          </section>

          {/* Contact */}
          <section className="bg-white border border-stone-200 rounded-xl p-6 space-y-4">
            <h2 className="font-bold text-[#2c2416] border-l-4 border-[#5a3e18] pl-3">連絡先</h2>
            <div>
              <label className="text-sm text-[#8a7a68] mb-1 block">メールアドレス <span className="text-red-500">*</span></label>
              <input
                type="email"
                value={form.contact_email}
                onChange={(e) => set('contact_email', e.target.value)}
                placeholder="example@email.com"
                className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#5a3e18]"
              />
              <p className="text-xs text-[#8a7a68] mt-1">バイヤーからの問い合わせがこのアドレスに届きます</p>
            </div>
          </section>

          {error && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">{error}</p>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-[#5a3e18] hover:bg-[#3d2b10] disabled:opacity-50 text-white font-bold py-4 rounded-xl transition text-lg"
          >
            {status === 'submitting' ? '送信中...' : '🏠 無料で物件を登録する'}
          </button>

          <p className="text-xs text-center text-[#8a7a68]">
            掲載は無料です。審査後（通常1〜2営業日）に公開されます。
          </p>
        </form>
      </main>

      <Footer lang="ja" />
    </>
  )
}
