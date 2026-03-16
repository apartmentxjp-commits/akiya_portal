# Skill: Property Page Generator

物件詳細ページ・一覧ページの新規作成・改善を行う。

## 使い方
「物件詳細ページに〇〇を追加して」「一覧ページのカードデザインを改善して」

## このスキルがやること
1. `src/app/akiya/` 配下の Page/Component を確認
2. Supabase スキーマに合わせてデータ取得ロジックを実装
3. デザイン原則（プレミアム・ダーク）に沿ったUIを作成
4. Server Component で実装（必要時のみ `'use client'`）

## 参照ファイル
- `src/app/akiya/` — 物件ページ
- `src/components/PropertyCard.tsx` — カードコンポーネント
- `src/lib/supabase.ts` — データ取得
- `CLAUDE.md` — Supabase スキーマ定義
