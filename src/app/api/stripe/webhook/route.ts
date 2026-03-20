import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe, supabaseAdmin } from '@/lib/stripe'

// Required: disable body parsing so we can verify Stripe signature
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Signature verification failed'
    console.error('[webhook] signature error:', message)
    return NextResponse.json({ error: message }, { status: 400 })
  }

  const { type, data } = event
  console.log('[webhook] event:', type)

  try {
    // ── Subscription created / updated ────────────────────────────────────────
    if (type === 'customer.subscription.created' || type === 'customer.subscription.updated') {
      const sub = data.object as Stripe.Subscription
      const customer = await stripe.customers.retrieve(sub.customer as string) as Stripe.Customer

      const email = customer.email || sub.metadata?.email
      if (!email) {
        console.warn('[webhook] no email found for customer', sub.customer)
        return NextResponse.json({ received: true })
      }

      const newStatus = sub.status === 'active' ? 'active'
        : sub.status === 'past_due' ? 'past_due'
        : sub.status === 'canceled' ? 'canceled'
        : 'inactive'

      await supabaseAdmin.from('subscribers').upsert({
        email,
        stripe_customer_id: sub.customer as string,
        stripe_subscription_id: sub.id,
        status: newStatus,
        current_period_end: new Date((sub as Stripe.Subscription & { current_period_end: number }).current_period_end * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      }, { onConflict: 'email' })
    }

    // ── Subscription deleted ──────────────────────────────────────────────────
    if (type === 'customer.subscription.deleted') {
      const sub = data.object as Stripe.Subscription
      await supabaseAdmin
        .from('subscribers')
        .update({ status: 'canceled', updated_at: new Date().toISOString() })
        .eq('stripe_subscription_id', sub.id)
    }

    // ── Payment failed ────────────────────────────────────────────────────────
    if (type === 'invoice.payment_failed') {
      const invoice = data.object as Stripe.Invoice
      await supabaseAdmin
        .from('subscribers')
        .update({ status: 'past_due', updated_at: new Date().toISOString() })
        .eq('stripe_customer_id', invoice.customer as string)
    }
  } catch (err) {
    console.error('[webhook] handler error:', err)
    // Return 200 to prevent Stripe retrying — log the error instead
  }

  return NextResponse.json({ received: true })
}
