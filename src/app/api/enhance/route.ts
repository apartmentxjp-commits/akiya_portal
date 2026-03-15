import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const PREFECTURES_EN: Record<string, string> = {
  '北海道': 'hokkaido', '青森県': 'aomori', '岩手県': 'iwate', '宮城県': 'miyagi',
  '秋田県': 'akita', '山形県': 'yamagata', '福島県': 'fukushima', '茨城県': 'ibaraki',
  '栃木県': 'tochigi', '群馬県': 'gunma', '埼玉県': 'saitama', '千葉県': 'chiba',
  '東京都': 'tokyo', '神奈川県': 'kanagawa', '新潟県': 'niigata', '富山県': 'toyama',
  '石川県': 'ishikawa', '福井県': 'fukui', '山梨県': 'yamanashi', '長野県': 'nagano',
  '岐阜県': 'gifu', '静岡県': 'shizuoka', '愛知県': 'aichi', '三重県': 'mie',
  '滋賀県': 'shiga', '京都府': 'kyoto', '大阪府': 'osaka', '兵庫県': 'hyogo',
  '奈良県': 'nara', '和歌山県': 'wakayama', '鳥取県': 'tottori', '島根県': 'shimane',
  '岡山県': 'okayama', '広島県': 'hiroshima', '山口県': 'yamaguchi', '徳島県': 'tokushima',
  '香川県': 'kagawa', '愛媛県': 'ehime', '高知県': 'kochi', '福岡県': 'fukuoka',
  '佐賀県': 'saga', '長崎県': 'nagasaki', '熊本県': 'kumamoto', '大分県': 'oita',
  '宮崎県': 'miyazaki', '鹿児島県': 'kagoshima', '沖縄県': 'okinawa',
}

function generateSlug(prefecture: string, id: string): string {
  const pref = PREFECTURES_EN[prefecture] || prefecture.replace(/[^a-z0-9]/gi, '').toLowerCase()
  const suffix = id.replace(/-/g, '').slice(0, 8)
  return `akiya-${pref}-${suffix}`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, title, description, prefecture, city, year_built, building_area, property_type } = body

    const AVAILABLE_TAGS = [
      '古民家', '町家', '農家', '海近', '山', '温泉近', '庭付き',
      '田舎暮らし', 'リノベ向き', '格安', '広い土地', '築100年超',
      '京都近郊', '大阪近郊', '東京近郊', '自然豊か', '眺望良し',
    ]

    const prompt = `You are a Japanese real estate expert. Analyze this property and select 3-5 relevant tags.

Property:
- Location: ${city}, ${prefecture}
- Type: ${property_type || 'kominka'}
- Year built: ${year_built || 'unknown'}
- Building area: ${building_area || 'unknown'}㎡
- Title: ${title}
- Description: ${description || ''}

Available tags: ${AVAILABLE_TAGS.join(', ')}

Also write short SEO metadata in Japanese and English.

Respond ONLY with valid JSON:
{
  "tags": ["tag1", "tag2", "tag3"],
  "meta_title": "日本語SEOタイトル (60文字以内)",
  "meta_description": "日本語メタディスクリプション (120文字以内)",
  "meta_title_en": "English SEO title (60 chars max)",
  "meta_description_en": "English meta description (120 chars max)"
}`

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 512,
    })

    let text = response.choices[0].message.content || '{}'
    if (text.includes('```json')) text = text.split('```json')[1].split('```')[0]
    else if (text.includes('```')) text = text.split('```')[1].split('```')[0]

    const result = JSON.parse(text.trim())
    const slug = generateSlug(prefecture, id)

    return NextResponse.json({
      tags: result.tags || [],
      slug,
      meta_title: result.meta_title || title,
      meta_description: result.meta_description || description?.slice(0, 120) || '',
      meta_title_en: result.meta_title_en || '',
      meta_description_en: result.meta_description_en || '',
    })
  } catch (e) {
    console.error('Enhance error:', e)
    return NextResponse.json({ error: 'Enhancement failed' }, { status: 500 })
  }
}
