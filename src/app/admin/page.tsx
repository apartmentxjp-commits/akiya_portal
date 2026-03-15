'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Property } from '@/lib/supabase'

export default function AdminPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [filter, setFilter] = useState<'pending' | 'approved' | 'rejected'>('pending')
  const [loading, setLoading] = useState(true)
  const [translating, setTranslating] = useState<string | null>(null)

  const load = async (status: typeof filter) => {
    setLoading(true)
    const { data } = await supabase
      .from('properties')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })
    setProperties((data as Property[]) || [])
    setLoading(false)
  }

  useEffect(() => { load(filter) }, [filter])

  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    await supabase.from('properties').update({ status }).eq('id', id)
    setProperties((prev) => prev.filter((p) => p.id !== id))
  }

  const generateTranslation = async (p: Property) => {
    setTranslating(p.id)
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: p.title,
          description: p.description,
          prefecture: p.prefecture,
          city: p.city,
        }),
      })
      const { title_en, description_en } = await res.json()
      await supabase
        .from('properties')
        .update({ title_en, description_en })
        .eq('id', p.id)
      setProperties((prev) =>
        prev.map((item) => item.id === p.id ? { ...item, title_en, description_en } : item)
      )
    } catch (e) {
      alert('翻訳エラー')
    } finally {
      setTranslating(null)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#2c2416]">🏯 管理画面</h1>
          <p className="text-[#8a7a68] text-sm">Akiya Japan — 物件審査・翻訳管理</p>
        </div>
        <a href="/" className="text-sm text-[#8a7a68] hover:text-[#5a3e18]">← サイトへ</a>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(['pending', 'approved', 'rejected'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === s
                ? 'bg-[#5a3e18] text-white'
                : 'border border-stone-300 text-[#8a7a68] hover:border-[#5a3e18]'
            }`}
          >
            {s === 'pending' ? '⏳ 審査待ち' : s === 'approved' ? '✅ 承認済み' : '❌ 却下'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 text-[#8a7a68]">読み込み中...</div>
      ) : properties.length === 0 ? (
        <div className="text-center py-20 text-[#8a7a68]">
          <div className="text-4xl mb-3">📭</div>
          <p>該当する物件がありません</p>
        </div>
      ) : (
        <div className="space-y-4">
          {properties.map((p) => (
            <div key={p.id} className="bg-white border border-stone-200 rounded-xl p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-[#2c2416] mb-1">{p.title}</h3>
                  {p.title_en && (
                    <p className="text-sm text-[#4a7c59] italic mb-1">EN: {p.title_en}</p>
                  )}
                  <p className="text-[#8a7a68] text-xs">
                    📍 {p.prefecture} {p.city}
                    {p.price && ` | 💰 ${p.price.toLocaleString()}万円`}
                    {p.building_area && ` | 🏠 ${p.building_area}㎡`}
                    {p.year_built && ` | 築${new Date().getFullYear() - p.year_built}年`}
                  </p>
                  <p className="text-[#8a7a68] text-xs mt-1">📧 {p.contact_email}</p>
                </div>
                <span className="text-xs text-[#8a7a68] whitespace-nowrap">
                  {new Date(p.created_at).toLocaleDateString('ja-JP')}
                </span>
              </div>

              {p.description && (
                <div className="bg-[#f5f0e8] rounded-lg p-3 text-sm text-[#2c2416] mb-3 line-clamp-3">
                  {p.description}
                </div>
              )}

              {p.description_en && (
                <div className="bg-[#e8f0e9] rounded-lg p-3 text-sm text-[#2c2416] mb-3 line-clamp-3 italic">
                  EN: {p.description_en}
                </div>
              )}

              <div className="flex gap-2 flex-wrap">
                {filter === 'pending' && (
                  <>
                    <button
                      onClick={() => updateStatus(p.id, 'approved')}
                      className="bg-[#4a7c59] text-white px-4 py-1.5 rounded-lg text-sm hover:bg-[#3a6449] transition"
                    >
                      ✅ 承認・公開
                    </button>
                    <button
                      onClick={() => updateStatus(p.id, 'rejected')}
                      className="bg-red-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-red-600 transition"
                    >
                      ❌ 却下
                    </button>
                  </>
                )}

                {!p.title_en && (
                  <button
                    onClick={() => generateTranslation(p)}
                    disabled={translating === p.id}
                    className="border border-[#4a7c59] text-[#4a7c59] px-4 py-1.5 rounded-lg text-sm hover:bg-[#4a7c59] hover:text-white transition disabled:opacity-50"
                  >
                    {translating === p.id ? '翻訳中...' : '🌏 英訳生成'}
                  </button>
                )}

                {filter === 'approved' && (
                  <a
                    href={`/akiya/${p.id}`}
                    target="_blank"
                    className="border border-stone-300 text-[#8a7a68] px-4 py-1.5 rounded-lg text-sm hover:border-[#5a3e18] hover:text-[#5a3e18] transition"
                  >
                    🔗 物件ページを見る
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
