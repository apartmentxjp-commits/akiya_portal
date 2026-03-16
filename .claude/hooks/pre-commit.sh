#!/bin/bash
# Pre-commit: 機密情報の誤コミットを防止

FILES=$(git diff --cached --name-only 2>/dev/null)

if echo "$FILES" | grep -qE "\.env\.local|\.env$"; then
  echo "❌ .env ファイルはコミットできません"
  exit 1
fi

if git diff --cached 2>/dev/null | grep -qE "(SUPABASE_SERVICE|GROQ_API_KEY)\s*=\s*['\"]?[a-zA-Z0-9_-]{20,}"; then
  echo "❌ APIキーを検出しました。環境変数を使ってください。"
  exit 1
fi

echo "✅ Pre-commit チェック通過"
exit 0
