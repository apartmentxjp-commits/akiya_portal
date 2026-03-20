import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

// ── Stripe server client (lazy init to avoid build-time failures) ─────────────
let _stripe: Stripe | null = null
export function getStripe(): Stripe {
  if (!_stripe) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-02-25.clover' as any })
  }
  return _stripe
}
/** @deprecated use getStripe() */
export const stripe = new Proxy({} as Stripe, {
  get(_t, prop: string) {
    return (getStripe() as unknown as Record<string, unknown>)[prop]
  },
})

// ── Supabase admin client (service_role — server only) ────────────────────────
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// ── Constants ─────────────────────────────────────────────────────────────────
export const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID! // $7.99/month price
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

// ── Helper: check if email has active subscription ───────────────────────────
export async function isActiveSubscriber(email: string): Promise<boolean> {
  if (!email) return false
  const { data } = await supabaseAdmin
    .from('subscribers')
    .select('status, current_period_end')
    .eq('email', email)
    .single()

  if (!data) return false
  if (data.status !== 'active') return false

  // Guard against stale active records past period end
  if (data.current_period_end) {
    const periodEnd = new Date(data.current_period_end)
    if (periodEnd < new Date()) return false
  }

  return true
}
