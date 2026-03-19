import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Fields returned for ALL public-facing property queries.
 * `address` (full street / lot address) is intentionally excluded.
 * Location display is limited to prefecture + city (都道府県・市区町村)
 * across all public pages — both Japanese and English.
 */
export const PUBLIC_PROPERTY_FIELDS = [
  'id', 'title', 'title_en', 'price',
  'prefecture', 'city',
  // `address` deliberately omitted from all public queries
  'land_area', 'building_area', 'year_built', 'property_type',
  'description', 'description_en',
  'images', 'tags', 'slug', 'source', 'status',
  'contact_email', 'created_at', 'updated_at',
].join(', ')

export type Property = {
  id: string
  title: string
  title_en: string | null
  price: number | null
  prefecture: string
  city: string
  address: string | null  // stored in DB; never fetched by public pages
  land_area: number | null
  building_area: number | null
  year_built: number | null
  property_type: string | null
  description: string | null
  description_en: string | null
  images: string[]
  tags: string[]
  slug: string | null
  source: 'owner' | 'agent' | 'api' | 'ai'
  status: 'pending' | 'approved' | 'rejected'
  contact_email: string | null
  created_at: string
  updated_at: string | null
}
