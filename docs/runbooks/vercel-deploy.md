# Vercel デプロイ ランブック

## 自動デプロイ（通常）
`main` ブランチに push すると Vercel が自動でデプロイ。

```bash
git add .
git commit -m "feat: ..."
git push origin main
# → Vercel が自動でビルド・デプロイ
# → https://akiya.tacky-consulting.com に反映
```

## 環境変数の確認・追加
Vercel ダッシュボード → Project Settings → Environment Variables

必須変数:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `GROQ_API_KEY`

## ビルドエラー時の対応

```bash
# ローカルでビルド確認
npm run build

# 型エラー確認
npx tsc --noEmit
```

## ロールバック
Vercel ダッシュボード → Deployments → 以前のデプロイを選択 → "Redeploy"

## プレビューデプロイ
```bash
git checkout -b feature/xxx
git push origin feature/xxx
# → Vercel が自動でプレビューURL を生成
```
