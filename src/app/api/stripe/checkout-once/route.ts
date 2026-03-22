import { NextRequest, NextResponse } from 'next/server'
import { stripe, SITE_URL } from '@/lib/stripe'

const ALLOWED_PRICE_IDS = new Set([
  process.env.STRIPE_PRICE_HOUSE_GUIDE,
  process.env.STRIPE_PRICE_REGIONAL_GUIDE,
  process.env.STRIPE_PRICE_FESTIVAL_GUIDE,
])

export async function POST(req: NextRequest) {
  try {
    const { email, priceId } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    if (!priceId || !ALLOWED_PRICE_IDS.has(priceId)) {
      return NextResponse.json({ error: 'Invalid product' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${SITE_URL}/en/guide?purchased=1`,
      cancel_url: `${SITE_URL}/en/guide?canceled=1`,
      metadata: { email },
    })

    return NextResponse.json({ url: session.url })
  } catch (err: unknown) {
    console.error('[stripe/checkout-once]', err)
    const message = err instanceof Error ? err.message : 'Checkout failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
