# Akiya Portal — プロジェクト憲法

## プロジェクト概要
日本の空き家（Akiya）を外国人バイヤーに販売するポータルサイト。
Supabase でプロパティ管理、Groq AI で物件説明を自動強化、Vercel でホスティング。

**本番URL**: `https://akiya.tacky-consulting.com`（Vercel 自動デプロイ）
**ターゲット**: 外国人バイヤー（英語LP）+ 日本人売り手（日本語LP）

---

## スタック

| 層 | 技術 |
|---|---|
| フレームワーク | Next.js 14 (App Router) |
| スタイリング | Tailwind CSS + CSS変数 |
| データベース | Supabase (PostgreSQL + RLS) |
| AI | Groq SDK (Llama3) |
| ホスティング | Vercel (GitHub 自動デプロイ) |
| フォント | Noto Serif JP + Noto Sans JP |

---

## ディレクトリ構造

```
akiya_portal/
├── src/
│   ├── app/
│   │   ├── page.tsx          # 日本語LP（売り手向け）
│   │   ├── en/page.tsx       # 英語LP（外国人バイヤー向け）
│   │   ├── akiya/            # 物件一覧・詳細
│   │   ├── admin/            # 管理画面（物件登録・管理）
│   │   ├── submit/           # 物件投稿フォーム
│   │   ├── api/
│   │   │   ├── agent/        # AI エージェント API
│   │   │   ├── enhance/      # 物件説明 AI 強化
│   │   │   ├── properties/   # 物件 CRUD API
│   │   │   └── translate/    # 翻訳 API
│   │   ├── globals.css       # CSS変数 + グローバルスタイル
│   │   └── layout.tsx        # Noto Serif JP フォント設定
│   ├── components/
│   │   ├── Nav.tsx           # ダークグラスモーフィズムナビ
│   │   └── PropertyCard.tsx  # 物件カード（グラデーション画像）
│   └── lib/
│       ├── supabase.ts       # Supabase クライアント
│       └── groq.ts           # Groq クライアント
├── .claude/
│   ├── settings.json
│   ├── hooks/
│   └── skills/
└── docs/
    ├── architecture.md
    ├── decisions/
    └── runbooks/
```

---

## デザイン原則

### カラーパレット
- **JP売り手LP**: ゴールド `#c9a84c`、ダーク `#0a0a0a`
- **EN買い手LP**: フォレストグリーン `#050f08`、アクセント `#7ecfa0`
- **共通**: 高コントラスト、プレミアム感

### タイポグラフィ
- 日本語: `Noto Serif JP`（見出し）+ `Noto Sans JP`（本文）
- 英語: システムフォント sans-serif

### コンポーネント規約
- CSS変数 (`--gold`, `--green` etc.) を使うこと
- `'use client'` は必要な場合のみ
- 画像は Supabase Storage URL or CSS グラデーション（外部画像依存なし）

---

## Supabase スキーマ（主要テーブル）

### `properties` テーブル
| カラム | 型 | 説明 |
|---|---|---|
| id | uuid | PK |
| title | text | 物件タイトル |
| title_en | text | 英語タイトル |
| description | text | 日本語説明 |
| description_en | text | 英語説明 |
| price | integer | 価格（円） |
| location | text | 場所 |
| prefecture | text | 都道府県 |
| property_type | text | 物件種別 |
| tags | text[] | タグ配列 |
| slug | text | URL スラグ |
| source | text | データソース |
| status | text | active/pending/sold |
| images | text[] | 画像URL配列 |
| created_at | timestamptz | 登録日時 |

### RLS ポリシー
- 一覧・詳細: 全員読み取り可
- 登録・更新: 認証ユーザーのみ

---

## AI パイプライン

```
物件登録（Submit フォーム）
  → /api/enhance（Groq で説明強化）
  → /api/translate（日→英 翻訳）
  → Supabase 保存
  → 物件一覧・詳細ページに表示
```

---

## 開発ルール

### Vercel デプロイ
- `main` ブランチへの push で自動デプロイ
- 環境変数は Vercel ダッシュボードで管理
- **`.env.local` は絶対にコミットしない**

### コーディング
- Server Component を基本とし、必要な箇所だけ `'use client'`
- Supabase の RLS を信頼し、フロントで過剰な認証チェックをしない
- Groq API は `/api/` Route Handler 経由でのみ呼び出す（NEXT_PUBLIC にしない）

### 禁止事項
- `NEXT_PUBLIC_GROQ_API_KEY` のような形でクライアントに API キーを露出
- `any` 型の多用
- インラインスタイルの多用（Tailwind クラスを使う）

---

## よく使うコマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド確認
npm run build

# Vercel プレビューデプロイ（ブランチから）
git push origin feature/xxx
```

---

## 環境変数

| 変数 | 用途 |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase プロジェクト URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 匿名キー |
| `GROQ_API_KEY` | Groq AI API キー |

---

## 重要メモ

- **DNS**: `akiya.tacky-consulting.com` → Vercel（設定済み）
- **Supabase スキーマ v2**: tags, property_type, slug, source フィールド追加済み
- **AI enhance パイプライン**: 稼働中
- **アナリティクス＋最適化エージェント**: 自律フィードバックループ実装済み
