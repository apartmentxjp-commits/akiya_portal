import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isActiveSubscriber } from '@/lib/stripe'

/**
 * POST /api/stripe/subscriber-login
 * Body: { email: string }
 *
 * Checks if email has an active subscription in Supabase.
 * If yes, sets the sub_email cookie and returns 200.
 * If no active subscription, returns 403.
 */
export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
  }

  const active = await isActiveSubscriber(email.trim().toLowerCase())

  if (!active) {
    return NextResponse.json(
      { error: 'No active subscription found for this email. Please subscribe first.' },
      { status: 403 }
    )
  }

  const cookieStore = await cookies()
  cookieStore.set('sub_email', email.trim().toLowerCase(), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  })

  return NextResponse.json({ message: 'Access granted! Redirecting to listings...' })
}
