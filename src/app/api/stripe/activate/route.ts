import { NextRequest, NextResponse } from 'next/server'
import { stripe, supabaseAdmin } from '@/lib/stripe'
import { cookies } from 'next/headers'

/**
 * GET /api/stripe/activate?session_id=...&return_to=...
 *
 * Called after Stripe Checkout success.
 * 1. Retrieves the Checkout session to get the subscriber's email
 * 2. Sets an HttpOnly cookie so server components can identify the subscriber
 * 3. Upserts subscriber record (in case webhook hasn't fired yet)
 * 4. Redirects to the originally requested property (or /en/akiya)
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const sessionId = searchParams.get('session_id')
  const returnTo = searchParams.get('return_to') || '/en/akiya'

  // Safety: only allow internal paths
  const safeReturn = returnTo.startsWith('/en/') ? returnTo : '/en/akiya'
  const baseUrl = new URL(req.url).origin

  if (!sessionId) {
    return NextResponse.redirect(new URL('/en/subscribe?error=missing_session', baseUrl))
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    const email =
      session.customer_email ||
      session.customer_details?.email ||
      null

    if (!email) {
      console.error('[activate] no email in session', sessionId)
      return NextResponse.redirect(new URL('/en/subscribe?error=no_email', baseUrl))
    }

    // Set the subscriber cookie (1 year)
    const cookieStore = await cookies()
    cookieStore.set('sub_email', email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    })

    // Upsert subscriber — webhook may not have fired yet
    await supabaseAdmin.from('subscribers').upsert({
      email,
      stripe_customer_id: session.customer as string | null,
      status: 'active',
      updated_at: new Date().toISOString(),
    }, { onConflict: 'email' })

    return NextResponse.redirect(new URL(safeReturn, baseUrl))
  } catch (err) {
    console.error('[activate] error:', err)
    return NextResponse.redirect(new URL('/en/subscribe?error=activation_failed', baseUrl))
  }
}
