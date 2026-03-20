import { NextRequest, NextResponse } from 'next/server'
import { stripe, supabaseAdmin, SITE_URL } from '@/lib/stripe'
import { cookies } from 'next/headers'

/**
 * POST /api/stripe/portal
 *
 * Creates a Stripe Customer Portal session for the logged-in subscriber.
 * Returns { url } for the client to redirect to.
 */
export async function POST(req: NextRequest) {
  const cookieStore = await cookies()
  const email = cookieStore.get('sub_email')?.value

  if (!email) {
    return NextResponse.json({ error: 'Not subscribed' }, { status: 401 })
  }

  const { data, error } = await supabaseAdmin
    .from('subscribers')
    .select('stripe_customer_id')
    .eq('email', email)
    .single()

  if (error || !data?.stripe_customer_id) {
    return NextResponse.json({ error: 'Subscription not found' }, { status: 404 })
  }

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: data.stripe_customer_id,
      return_url: `${SITE_URL}/en/akiya`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Portal session failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
