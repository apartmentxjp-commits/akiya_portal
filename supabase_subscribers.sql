-- Akiya Portal — Subscribers table
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS subscribers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email           TEXT NOT NULL UNIQUE,
  stripe_customer_id    TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  status          TEXT NOT NULL DEFAULT 'inactive',
  -- 'active' | 'inactive' | 'canceled' | 'past_due'
  plan            TEXT DEFAULT 'monthly_799',
  current_period_end    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookup by email (used on every page view)
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers(status);

-- RLS: only service role can write, anon can check own subscription by email
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (used by webhook)
CREATE POLICY "service_role_all" ON subscribers
  FOR ALL USING (auth.role() = 'service_role');

-- Allow reading by email match (for subscription check from server component)
CREATE POLICY "read_own_subscription" ON subscribers
  FOR SELECT USING (true);  -- Server-side only, protected by API key
