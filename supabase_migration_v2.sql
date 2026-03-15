-- Akiya Japan Portal — Schema v2 Migration
-- Supabaseダッシュボード → SQL Editor に貼り付けて実行

-- 既存テーブルに新カラム追加
ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS source        TEXT DEFAULT 'owner',
  ADD COLUMN IF NOT EXISTS property_type TEXT DEFAULT 'kominka',
  ADD COLUMN IF NOT EXISTS tags          TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS slug          TEXT,
  ADD COLUMN IF NOT EXISTS updated_at    TIMESTAMPTZ DEFAULT NOW();

-- インデックス
CREATE UNIQUE INDEX IF NOT EXISTS idx_properties_slug   ON properties(slug) WHERE slug IS NOT NULL;
CREATE INDEX        IF NOT EXISTS idx_properties_tags   ON properties USING GIN(tags);
CREATE INDEX        IF NOT EXISTS idx_properties_source ON properties(source);

-- updated_at 自動更新トリガー
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS properties_updated_at ON properties;
CREATE TRIGGER properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 管理者UPDATE許可ポリシー（MVPでは全許可、後でAuth追加）
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'properties' AND policyname = 'admin_update_properties'
  ) THEN
    CREATE POLICY "admin_update_properties"
      ON properties FOR UPDATE
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;
