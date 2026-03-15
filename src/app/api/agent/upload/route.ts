import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Service role client for bulk insert (bypasses RLS)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function parseCSV(text: string): Record<string, string>[] {
  const lines = text.trim().split('\n')
  if (lines.length < 2) return []
  const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''))
  return lines.slice(1).map((line) => {
    const values = line.match(/(".*?"|[^,]+|(?<=,)(?=,)|(?<=,)$|^(?=,))/g) || []
    const row: Record<string, string> = {}
    headers.forEach((h, i) => {
      row[h] = (values[i] || '').trim().replace(/^"|"$/g, '')
    })
    return row
  }).filter((row) => Object.values(row).some((v) => v !== ''))
}

function normalizePrice(val: string): number | null {
  if (!val) return null
  const n = Number(val.replace(/[^0-9.]/g, ''))
  return isNaN(n) ? null : Math.round(n)
}

function normalizePrefecture(val: string): string {
  const map: Record<string, string> = {
    'Tokyo': '東京都', 'Kyoto': '京都府', 'Osaka': '大阪府',
    'Hokkaido': '北海道', 'Nagano': '長野県', 'Hyogo': '兵庫県',
  }
  return map[val] || val
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const agentEmail = formData.get('agent_email') as string || ''

    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

    const text = await file.text()
    const rows = parseCSV(text)

    if (rows.length === 0) return NextResponse.json({ error: 'No data in CSV' }, { status: 400 })
    if (rows.length > 500) return NextResponse.json({ error: 'Max 500 rows per upload' }, { status: 400 })

    const properties = rows.map((row) => ({
      title: row.title || row['物件名'] || row['タイトル'] || '無題',
      price: normalizePrice(row.price || row['価格'] || row['価格(万円)'] || ''),
      prefecture: normalizePrefecture(row.prefecture || row['都道府県'] || ''),
      city: row.city || row['市区町村'] || '',
      address: row.address || row['住所'] || null,
      building_area: Number(row.building_area || row['建物面積'] || 0) || null,
      land_area: Number(row.land_area || row['土地面積'] || 0) || null,
      year_built: Number(row.year_built || row['築年'] || 0) || null,
      property_type: row.property_type || row['物件種別'] || 'kominka',
      description: row.description || row['説明'] || null,
      contact_email: row.contact_email || agentEmail || null,
      source: 'agent' as const,
      status: 'pending' as const,
      tags: [],
    })).filter((p) => p.prefecture && p.city)

    if (properties.length === 0) {
      return NextResponse.json({ error: 'No valid rows (prefecture and city required)' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('properties')
      .insert(properties)
      .select('id')

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({
      success: true,
      inserted: data?.length || properties.length,
      skipped: rows.length - properties.length,
    })
  } catch (e) {
    console.error('CSV upload error:', e)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
