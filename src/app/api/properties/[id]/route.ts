import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', params.id)
    .eq('status', 'approved')
    .single()

  if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(data)
}
