import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import { supabase } from '@/lib/supabase'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, description, prefecture, city } = body

    const prompt = `You are a professional translator specializing in Japanese real estate.
Translate the following Japanese property listing to natural English for international buyers.

Property location: ${city || ''}, ${prefecture || ''}, Japan
Title: ${title || ''}
Description: ${description || '(no description)'}

Respond ONLY with valid JSON in this exact format:
{
  "title_en": "English title here",
  "description_en": "English description here"
}

Rules:
- Use natural, appealing real estate English
- Keep Japanese cultural terms like "kominka", "machiya", "satoyama" when appropriate
- Convert tatami measurements to m² if mentioned
- Mention the location context (Japan region) naturally`

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1024,
    })

    let text = response.choices[0].message.content || '{}'
    if (text.includes('```json')) text = text.split('```json')[1].split('```')[0]
    else if (text.includes('```')) text = text.split('```')[1].split('```')[0]

    const result = JSON.parse(text.trim())

    return NextResponse.json({
      title_en: result.title_en || title,
      description_en: result.description_en || description,
    })
  } catch (e) {
    console.error('Translation error:', e)
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 })
  }
}
