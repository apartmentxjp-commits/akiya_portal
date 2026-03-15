-- Akiya Japan Portal — Supabase Schema
-- Supabaseダッシュボード → SQL Editor に貼り付けて実行

CREATE TABLE IF NOT EXISTS properties (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title         TEXT NOT NULL,
  title_en      TEXT,
  price         INTEGER,                    -- 万円単位
  prefecture    TEXT NOT NULL,
  city          TEXT NOT NULL,
  address       TEXT,
  land_area     NUMERIC,                    -- ㎡
  building_area NUMERIC,                    -- ㎡
  year_built    INTEGER,
  description   TEXT,
  description_en TEXT,
  images        JSONB DEFAULT '[]'::JSONB,
  status        TEXT DEFAULT 'pending'      -- pending | approved | rejected
                CHECK (status IN ('pending', 'approved', 'rejected')),
  contact_email TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_properties_status     ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_prefecture ON properties(prefecture);
CREATE INDEX IF NOT EXISTS idx_properties_price      ON properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_created    ON properties(created_at DESC);

-- Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- 承認済み物件は誰でも読める
CREATE POLICY "read_approved_properties"
  ON properties FOR SELECT
  USING (status = 'approved');

-- 誰でも申請できる (Insertのみ)
CREATE POLICY "submit_property"
  ON properties FOR INSERT
  WITH CHECK (true);

-- サンプルデータ（動作確認用）
INSERT INTO properties (title, title_en, price, prefecture, city, building_area, land_area, year_built, description, description_en, status, contact_email)
VALUES
  (
    '京都・亀岡の古民家 築120年',
    'Historic 120-year-old Kominka in Kameoka, Kyoto',
    280,
    '京都府', '亀岡市',
    150, 300, 1905,
    '京都市から車で30分、自然豊かな亀岡市の古民家です。梁・縁側・庭がそのまま残り、リノベーション素材として最高です。水回りは要改修。',
    'A beautifully preserved 120-year-old kominka (traditional farmhouse) 30 minutes by car from Kyoto city center. Features original wooden beams, engawa verandah, and a traditional garden. Water facilities need renovation — perfect for buyers seeking an authentic renovation project.',
    'approved',
    'sample@akiya-japan.com'
  ),
  (
    '長野・松本近郊 山の見える古民家',
    'Mountain-view Kominka near Matsumoto, Nagano',
    150,
    '長野県', '安曇野市',
    120, 500, 1955,
    '北アルプスを望む、安曇野の農家民家。広い土地付き。現在空き家のため早めの売却希望。地域の移住支援制度が使えます。',
    'Traditional farmhouse with stunning views of the Northern Alps in Azumino, Nagano. Comes with 500m² of land. Currently vacant — motivated seller. Eligible for local relocation subsidy programs.',
    'approved',
    'sample@akiya-japan.com'
  );
