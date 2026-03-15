'use client'

import { useState, useRef } from 'react'

const SAMPLE_CSV = `title,price,prefecture,city,address,building_area,land_area,year_built,property_type,description,contact_email
京都・嵐山近くの古民家,380,京都府,亀岡市,亀岡市千歳町,,150,250,1920,kominka,嵐山まで車20分の古民家。梁・縁側・庭付き。,agent@example.com
長野・白馬近くの農家,220,長野県,大町市,,120,800,1960,farmhouse,白馬スキー場まで30分。広大な土地付き。,agent@example.com`

export default function AgentUploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [agentEmail, setAgentEmail] = useState('')
  const [result, setResult] = useState<{ inserted: number; skipped: number } | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return
    setLoading(true)
    setError('')
    setResult(null)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('agent_email', agentEmail)

    try {
      const res = await fetch('/api/agent/upload', { method: 'POST', body: formData })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error || 'アップロード失敗')
      } else {
        setResult({ inserted: json.inserted, skipped: json.skipped })
        setFile(null)
        if (fileRef.current) fileRef.current.value = ''
      }
    } catch {
      setError('ネットワークエラー')
    } finally {
      setLoading(false)
    }
  }

  const downloadSample = () => {
    const blob = new Blob([SAMPLE_CSV], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'akiya_sample.csv'
    a.click()
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#2c2416]">📋 CSV一括登録</h1>
          <p className="text-[#8a7a68] text-sm">不動産会社向け — 最大500件まで一括登録</p>
        </div>
        <a href="/admin" className="text-sm text-[#8a7a68] hover:text-[#5a3e18]">← 管理画面</a>
      </div>

      {/* Format guide */}
      <div className="bg-[#f5f0e8] rounded-xl p-5 mb-6">
        <h2 className="font-semibold text-[#2c2416] mb-3">📄 CSVフォーマット</h2>
        <div className="overflow-x-auto">
          <table className="text-xs text-[#5a4a38] w-full">
            <thead>
              <tr className="border-b border-[#d4c4a8]">
                <th className="text-left pb-1 pr-4">カラム名</th>
                <th className="text-left pb-1 pr-4">必須</th>
                <th className="text-left pb-1">説明</th>
              </tr>
            </thead>
            <tbody className="space-y-1">
              {[
                ['title', '◎', '物件名'],
                ['prefecture', '◎', '都道府県（例: 京都府）'],
                ['city', '◎', '市区町村'],
                ['price', '', '価格（万円単位）'],
                ['building_area', '', '建物面積（㎡）'],
                ['land_area', '', '土地面積（㎡）'],
                ['year_built', '', '築年（例: 1960）'],
                ['property_type', '', 'kominka / farmhouse / machiya'],
                ['description', '', '物件説明'],
                ['contact_email', '', '連絡先メール'],
              ].map(([col, req, desc]) => (
                <tr key={col}>
                  <td className="py-0.5 pr-4 font-mono">{col}</td>
                  <td className="py-0.5 pr-4 text-[#c0392b]">{req}</td>
                  <td className="py-0.5">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={downloadSample}
          className="mt-3 text-xs text-[#5a3e18] underline hover:no-underline"
        >
          サンプルCSVをダウンロード
        </button>
      </div>

      {/* Upload form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#2c2416] mb-1">
            会社メールアドレス
          </label>
          <input
            type="email"
            value={agentEmail}
            onChange={(e) => setAgentEmail(e.target.value)}
            placeholder="agent@example.com"
            className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#5a3e18]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2c2416] mb-1">
            CSVファイル <span className="text-red-500">*</span>
          </label>
          <input
            ref={fileRef}
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            required
            className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#5a3e18]"
          />
          {file && (
            <p className="text-xs text-[#8a7a68] mt-1">
              {file.name} ({(file.size / 1024).toFixed(1)} KB)
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || !file}
          className="w-full bg-[#5a3e18] text-white py-3 rounded-xl font-medium hover:bg-[#4a3010] transition disabled:opacity-50"
        >
          {loading ? 'アップロード中...' : '📤 CSVをアップロード'}
        </button>
      </form>

      {result && (
        <div className="mt-6 bg-[#e8f0e9] border border-[#c8e0d0] rounded-xl p-5">
          <p className="font-semibold text-[#2c2416] mb-1">✅ アップロード完了</p>
          <p className="text-sm text-[#4a7c59]">{result.inserted}件を登録しました（審査待ち）</p>
          {result.skipped > 0 && (
            <p className="text-xs text-[#8a7a68] mt-1">{result.skipped}件はデータ不足でスキップ</p>
          )}
          <a href="/admin" className="mt-3 inline-block text-sm text-[#5a3e18] underline">
            管理画面で確認する →
          </a>
        </div>
      )}

      {error && (
        <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
          ⚠️ {error}
        </div>
      )}
    </div>
  )
}
