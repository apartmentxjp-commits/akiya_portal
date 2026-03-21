import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

/**
 * GET /api/stripe/owner-login?token=...&email=...
 * Owner-only bypass to set sub_email cookie without Stripe checkout.
 */
const OWNER_TOKEN = process.env.OWNER_LOGIN_TOKEN || 'akiya-owner-2026'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')
  const email = searchParams.get('email') || 'akiya.japan247@gmail.com'
  const baseUrl = new URL(req.url).origin

  if (token !== OWNER_TOKEN) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const cookieStore = await cookies()
  cookieStore.set('sub_email', email, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
  })

  return NextResponse.redirect(new URL('/en/akiya', baseUrl))
}
