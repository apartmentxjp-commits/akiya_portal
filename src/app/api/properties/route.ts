import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const prefecture = searchParams.get('pref')
  const maxPrice = searchParams.get('max')
  const limit = Math.min(Number(searchParams.get('limit') || 20), 100)

  let query = supabase
    .from('properties')
    .select('id,title,title_en,price,prefecture,city,building_area,land_area,year_built,status,created_at')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (prefecture) query = query.eq('prefecture', prefecture)
  if (maxPrice) query = query.lte('price', Number(maxPrice))

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
