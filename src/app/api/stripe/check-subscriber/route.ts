import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isActiveSubscriber } from '@/lib/stripe'

/**
 * GET /api/stripe/check-subscriber
 * Returns whether the current cookie holder is an active subscriber.
 * Used by the subscribe page to redirect already-logged-in users.
 */
export const dynamic = 'force-dynamic'

export async function GET(_req: NextRequest) {
  const cookieStore = await cookies()
  const email = cookieStore.get('sub_email')?.value || ''
  const active = email ? await isActiveSubscriber(email) : false
  return NextResponse.json({ email: email || null, active })
}
