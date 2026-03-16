# Skill: LP Redesign

日本語LP（売り手向け）または英語LP（外国人バイヤー向け）のデザイン改善。

## 使い方
「英語LPのヒーローを改善して」「日本語LPにFAQを追加して」

## このスキルがやること
1. 対象ページを確認（`src/app/page.tsx` or `src/app/en/page.tsx`）
2. 既存のCSS変数・デザイントークンを継承
3. 外部画像に依存しない（CSSグラデーション・SVGのみ使用）
4. プレミアム感・信頼感のあるデザインを維持

## デザイン原則
- JP: ゴールド `#c9a84c` アクセント、漢字の重厚感
- EN: フォレストグリーン `#050f08`、アクセント `#7ecfa0`
- 共通: 数字カード（01/02/03）、FAQ セクション、CTA ボタン

## 参照ファイル
- `src/app/page.tsx` — 日本語LP
- `src/app/en/page.tsx` — 英語LP
- `src/app/globals.css` — CSS変数
- `src/app/layout.tsx` — フォント設定
