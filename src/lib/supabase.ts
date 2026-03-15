import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Property = {
  id: string
  title: string
  title_en: string | null
  price: number | null          // 万円
  prefecture: string
  city: string
  address: string | null
  land_area: number | null      // ㎡
  building_area: number | null  // ㎡
  year_built: number | null
  description: string | null
  description_en: string | null
  images: string[]
  status: 'pending' | 'approved' | 'rejected'
  contact_email: string | null
  created_at: string
}
