import { NextRequest, NextResponse } from 'next/server'
import { stripe, STRIPE_PRICE_ID, STRIPE_ANNUAL_PRICE_ID, SITE_URL } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const { email, returnTo, plan } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const safeReturn = returnTo && returnTo.startsWith('/en/') ? returnTo : '/en/akiya'
    const priceId = plan === 'annual' ? STRIPE_ANNUAL_PRICE_ID : STRIPE_PRICE_ID

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${SITE_URL}/api/stripe/activate?session_id={CHECKOUT_SESSION_ID}&return_to=${encodeURIComponent(safeReturn)}`,
      cancel_url: `${SITE_URL}/en/subscribe?canceled=1`,
      metadata: { email, returnTo: safeReturn },
      subscription_data: {
        metadata: { email },
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err: unknown) {
    console.error('[stripe/checkout]', err)
    const message = err instanceof Error ? err.message : 'Checkout failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
