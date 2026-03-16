# Akiya Portal — アーキテクチャ

## システム全体図

```
[外国人バイヤー]          [日本人売り手]
    │ /en                    │ /
    ▼                        ▼
[Next.js 14 / Vercel]
    ├── / (JP 売り手LP)
    ├── /en (EN バイヤーLP)
    ├── /akiya (物件一覧)
    ├── /akiya/[slug] (物件詳細)
    ├── /submit (物件投稿)
    ├── /admin (管理画面)
    └── /api/*
         ├── /enhance  → Groq AI (説明文強化)
         ├── /translate → Groq AI (日→英翻訳)
         ├── /properties → Supabase CRUD
         └── /agent → AI エージェント

[Supabase]
    ├── properties テーブル (RLS有効)
    └── Storage (物件画像)

[Vercel]
    └── main ブランチ push → 自動デプロイ
        → https://akiya.tacky-consulting.com
```

## AI パイプライン詳細

```
1. 売り手が /submit で物件情報を入力
2. POST /api/enhance → Groq (llama3) で説明文を強化・構造化
3. POST /api/translate → Groq で日本語→英語翻訳
4. Supabase の properties テーブルに保存
5. /akiya に自動表示（Server Component で SSR）
```

## 認証フロー

```
Supabase Auth (メール/パスワード or OAuth)
  → セッション Cookie
  → /admin ページは認証済みユーザーのみ
  → RLS で DB レベルでも保護
```
