import { NextRequest, NextResponse } from 'next/server'
import { isActiveSubscriber } from '@/lib/stripe'

/**
 * POST /api/stripe/subscriber-login
 * Body: { email: string }
 *
 * Checks if email has an active subscription in Supabase.
 * If yes, sets the sub_email cookie via NextResponse and returns 200.
 * If no active subscription, returns 403.
 */
export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
  }

  const normalizedEmail = email.trim().toLowerCase()
  const active = await isActiveSubscriber(normalizedEmail)

  if (!active) {
    return NextResponse.json(
      { error: 'No active subscription found for this email. Please subscribe first.' },
      { status: 403 }
    )
  }

  // Use NextResponse.cookies — the only reliable way to set cookies from a Route Handler
  const response = NextResponse.json({ message: 'Access granted! Redirecting to listings...' })
  response.cookies.set('sub_email', normalizedEmail, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  })
  return response
}
