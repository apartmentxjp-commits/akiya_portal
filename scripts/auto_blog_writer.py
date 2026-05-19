#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Akiya Japan ブログ自動記事生成スクリプト
英語の空き家・日本不動産関連記事をAIで生成してGitHubにプッシュ
Vercelが自動デプロイする

実行: python3 auto_blog_writer.py --count 2
Cron: 0 8 * * * cd ~/Desktop/akiya_portal && python3 scripts/auto_blog_writer.py --count 2
"""
import os
import re
import sys
import json
import time
import random
import hashlib
import argparse
import subprocess
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BLOG_DIR = ROOT / "content" / "blog"
BLOG_DIR.mkdir(parents=True, exist_ok=True)
LOG_FILE = ROOT / "logs" / "auto_blog.log"
LOG_FILE.parent.mkdir(exist_ok=True)

# APIキーは環境変数または openclaw_seo/.env から読み込む
_ENV_FILE = Path(__file__).resolve().parent.parent.parent.parent / "openclaw_seo" / ".env"
if _ENV_FILE.exists():
    for _line in _ENV_FILE.read_text().splitlines():
        if '=' in _line and not _line.startswith('#'):
            _k, _, _v = _line.partition('=')
            os.environ.setdefault(_k.strip(), _v.strip())

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
GROQ_API_KEY       = os.getenv("GROQ_API_KEY", "")
GROQ_API_KEY_2     = os.getenv("GROQ_API_KEY_2", "")
GEMINI_API_KEY     = os.getenv("GEMINI_API_KEY", "")

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
GROQ_URL       = "https://api.groq.com/openai/v1/chat/completions"
GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models"
GEMINI_MODELS   = ["gemma-3-27b-it", "gemini-2.0-flash-lite", "gemma-4-26b-a4b-it"]

FREE_MODELS = [
    "google/gemma-4-31b-it:free",
    "google/gemma-3-27b-it:free",
    "meta-llama/llama-3.3-70b-instruct:free",
    "google/gemma-2-9b-it:free",
]
GROQ_MODELS = ["llama-3.3-70b-versatile", "llama3-70b-8192", "gemma2-9b-it"]

# ──────────────────────────────────────────────
# 記事トピック一覧
# ──────────────────────────────────────────────
TOPICS = [
    {
        "slug": "how-to-find-akiya-bank-listings",
        "title": "How to Find Akiya Bank Listings in Japan: A Step-by-Step Guide",
        "description": "Learn how to search Japan's 1,800+ municipal akiya bank programs for cheap vacant houses, even without speaking Japanese.",
        "category": "Buying Guide",
        "tags": ["akiya bank", "vacant house", "Japan property", "beginner guide"],
        "keyword": "akiya bank listings Japan",
    },
    {
        "slug": "akiya-renovation-cost-breakdown",
        "title": "Akiya Renovation Cost Breakdown: What to Budget for Your Japanese Fixer-Upper",
        "description": "A detailed guide to renovation costs for vacant houses in Japan — from basic cleanup to full kominka restoration.",
        "category": "Renovation",
        "tags": ["renovation", "cost", "kominka", "Japan renovation budget"],
        "keyword": "akiya renovation cost Japan",
    },
    {
        "slug": "best-regions-buy-akiya-japan",
        "title": "Best Regions to Buy Akiya in Japan: Where Prices Are Low and Support Is High",
        "description": "Compare the top prefectures for buying akiya — affordability, community support, foreign buyer experience, and lifestyle quality.",
        "category": "Regional Guide",
        "tags": ["regions", "prefectures", "Nagano", "Okayama", "rural Japan"],
        "keyword": "best prefecture buy akiya Japan",
    },
    {
        "slug": "akiya-legal-process-foreigners",
        "title": "The Legal Process of Buying Akiya in Japan as a Foreigner",
        "description": "Understand the contracts, taxes, title registration, and legal steps required to purchase a vacant house in Japan without residency.",
        "category": "Legal Guide",
        "tags": ["legal", "contract", "title registration", "foreign buyer"],
        "keyword": "buy akiya Japan foreigner legal",
    },
    {
        "slug": "japan-property-tax-guide",
        "title": "Japan Property Tax Guide for Foreign Owners: What You Actually Pay",
        "description": "Everything you need to know about fixed asset tax, city planning tax, and inheritance tax when owning property in Japan as a non-resident.",
        "category": "Tax & Finance",
        "tags": ["property tax", "fixed asset tax", "Japan tax", "non-resident"],
        "keyword": "Japan property tax foreigners",
    },
    {
        "slug": "kominka-vs-akiya-difference",
        "title": "Kominka vs. Akiya: What's the Difference and Which Should You Buy?",
        "description": "A clear comparison of traditional kominka farmhouses and regular akiya vacant houses — price, condition, renovation complexity, and charm.",
        "category": "Buying Guide",
        "tags": ["kominka", "akiya", "comparison", "traditional house"],
        "keyword": "kominka akiya difference Japan",
    },
    {
        "slug": "akiya-airbnb-rental-income",
        "title": "Can You Rent Out Your Akiya on Airbnb? Japan Short-Term Rental Rules Explained",
        "description": "The complete guide to minpaku law, permits, and earning rental income from your Japanese vacant house.",
        "category": "Investment",
        "tags": ["Airbnb", "rental income", "minpaku", "short-term rental"],
        "keyword": "akiya Airbnb Japan rental rules",
    },
    {
        "slug": "japan-rural-life-moving-guide",
        "title": "Moving to Rural Japan: What Life Is Really Like in the Countryside",
        "description": "An honest guide to rural Japanese life — community expectations, local government support, seasonal challenges, and why foreigners love it.",
        "category": "Lifestyle",
        "tags": ["rural Japan", "inaka", "moving to Japan", "countryside life"],
        "keyword": "moving rural Japan foreigner guide",
    },
    {
        "slug": "akiya-government-subsidies-grants",
        "title": "Japan Government Subsidies for Akiya Buyers: Free Money for Renovation",
        "description": "How to access municipal subsidies, prefectural grants, and national programs that pay up to ¥2 million toward your akiya renovation.",
        "category": "Renovation",
        "tags": ["subsidy", "grant", "government support", "renovation aid"],
        "keyword": "Japan akiya renovation subsidy grant",
    },
    {
        "slug": "tokutei-akiya-special-measure-law",
        "title": "What Is the Tokutei Akiya Law? Japan's Vacant House Crackdown Explained",
        "description": "Japan's Special Measures Act on Vacant Houses designates problem properties and can strip owners of tax breaks. Here's what you need to know.",
        "category": "Legal Guide",
        "tags": ["tokutei akiya", "vacant house law", "property tax", "legislation"],
        "keyword": "tokutei akiya law Japan",
    },
    {
        "slug": "buying-akiya-without-visiting-japan",
        "title": "Can You Buy Akiya Without Visiting Japan? Remote Purchasing Guide",
        "description": "A practical guide to purchasing Japanese property remotely — power of attorney, virtual tours, trusted agents, and closing from abroad.",
        "category": "Buying Guide",
        "tags": ["remote purchase", "overseas buyer", "power of attorney", "virtual tour"],
        "keyword": "buy Japan property remotely",
    },
    {
        "slug": "akiya-financing-options",
        "title": "Financing Options for Buying Akiya in Japan: Mortgages, Cash, and More",
        "description": "Can foreigners get a Japanese mortgage? Explore all financing options for buying akiya — bank loans, regional bank programs, and cash purchasing.",
        "category": "Tax & Finance",
        "tags": ["mortgage", "financing", "bank loan", "Japan property finance"],
        "keyword": "Japan property mortgage foreigner",
    },
]


def log(msg: str):
    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    line = f"[{ts}] {msg}"
    print(line)
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(line + "\n")


def get_posted_slugs() -> set:
    return {f.stem for f in BLOG_DIR.glob("*.json")}


def call_openrouter(prompt: str) -> str:
    import urllib.request
    for model in FREE_MODELS:
        try:
            payload = json.dumps({
                "model": model,
                "messages": [{"role": "user", "content": prompt}],
                "max_tokens": 3000,
            }).encode()
            req = urllib.request.Request(
                OPENROUTER_URL,
                data=payload,
                headers={
                    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://akiya.mitorahub.com",
                },
                method="POST",
            )
            with urllib.request.urlopen(req, timeout=60) as resp:
                data = json.loads(resp.read())
                text = data["choices"][0]["message"]["content"]
                if text and len(text) > 200:
                    log(f"  OpenRouter成功 ({model}): {len(text)}文字")
                    return text
        except Exception as e:
            log(f"  OpenRouter失敗 ({model}): {e}")
            time.sleep(2)
    return ""


def call_groq(prompt: str) -> str:
    import urllib.request
    for key in [GROQ_API_KEY, GROQ_API_KEY_2]:
        for model in GROQ_MODELS:
            try:
                payload = json.dumps({
                    "model": model,
                    "messages": [{"role": "user", "content": prompt}],
                    "max_tokens": 3000,
                }).encode()
                req = urllib.request.Request(
                    GROQ_URL,
                    data=payload,
                    headers={
                        "Authorization": f"Bearer {key}",
                        "Content-Type": "application/json",
                    },
                    method="POST",
                )
                with urllib.request.urlopen(req, timeout=60) as resp:
                    data = json.loads(resp.read())
                    text = data["choices"][0]["message"]["content"]
                    if text and len(text) > 200:
                        log(f"  Groq成功 ({model}): {len(text)}文字")
                        return text
            except Exception as e:
                log(f"  Groq失敗 ({model}): {e}")
                time.sleep(2)
    return ""


def call_gemini(prompt: str) -> str:
    """Gemini APIで記事生成する"""
    import urllib.request
    for model in GEMINI_MODELS:
        try:
            url = f"{GEMINI_BASE_URL}/{model}:generateContent?key={GEMINI_API_KEY}"
            payload = json.dumps({
                "contents": [{"parts": [{"text": prompt}]}],
                "generationConfig": {"maxOutputTokens": 3000, "temperature": 0.7},
            }).encode()
            req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"}, method="POST")
            with urllib.request.urlopen(req, timeout=90) as resp:
                data = json.loads(resp.read())
                text = data["candidates"][0]["content"]["parts"][0]["text"]
                if text and len(text) > 200:
                    log(f"  Gemini成功 ({model}): {len(text)}文字")
                    return text
        except Exception as e:
            log(f"  Gemini失敗 ({model}): {e}")
            time.sleep(2)
    return ""


def generate_article(topic: dict) -> str:
    """AIでHTML記事本文を生成する"""
    prompt = f"""Write a detailed, SEO-optimized blog article in English for a website about buying vacant houses (akiya) in Japan for foreigners.

Title: {topic['title']}
Target keyword: {topic['keyword']}
Category: {topic['category']}

Requirements:
- 1500-2500 words
- Use proper HTML with <h2>, <h3>, <p>, <ul>, <li> tags (no <html>/<body>/<head>)
- Start directly with the first paragraph (no title tag)
- Include practical, specific, accurate information
- Friendly but authoritative tone
- End with a "Frequently Asked Questions" <h2> section with 4-5 Q&A pairs using <h3> for questions
- Each FAQ answer should be 2-4 sentences
- Include a call-to-action near the end linking to /en/akiya for property search
- Do NOT include markdown, only clean HTML

Write the full article now:"""

    content = call_gemini(prompt)
    if not content:
        content = call_openrouter(prompt)
    if not content:
        content = call_groq(prompt)
    return content


def markdown_to_html(text: str) -> str:
    """簡易Markdown→HTML変換"""
    text = re.sub(r'^### (.+)$', r'<h3>\1</h3>', text, flags=re.MULTILINE)
    text = re.sub(r'^## (.+)$', r'<h2>\1</h2>', text, flags=re.MULTILINE)
    text = re.sub(r'^# (.+)$', r'<h2>\1</h2>', text, flags=re.MULTILINE)
    text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
    text = re.sub(r'\*(.+?)\*', r'<em>\1</em>', text)
    lines = text.split('\n')
    result = []
    in_ul = False
    for line in lines:
        line = line.strip()
        if line.startswith('- ') or line.startswith('* '):
            if not in_ul:
                result.append('<ul>')
                in_ul = True
            result.append(f'<li>{line[2:]}</li>')
        else:
            if in_ul:
                result.append('</ul>')
                in_ul = False
            if line and not line.startswith('<'):
                result.append(f'<p>{line}</p>')
            elif line:
                result.append(line)
    if in_ul:
        result.append('</ul>')
    return '\n'.join(result)


def write_post(topic: dict, content: str):
    """JSONファイルとして記事を保存する"""
    # マークダウンが混入していたらHTMLに変換
    if '<h2>' not in content and '##' in content:
        content = markdown_to_html(content)

    post = {
        "slug": topic["slug"],
        "title": topic["title"],
        "description": topic["description"],
        "date": datetime.now().strftime("%Y-%m-%dT%H:%M:%S+09:00"),
        "category": topic["category"],
        "tags": topic["tags"],
        "content": content,
    }
    out_path = BLOG_DIR / f"{topic['slug']}.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(post, f, ensure_ascii=False, indent=2)
    log(f"  保存: {out_path}")


def git_push(slugs: list):
    """変更をGitにコミットしてプッシュする"""
    try:
        subprocess.run(["git", "-C", str(ROOT), "add", "content/blog/"], check=True)
        msg = f"自動記事追加: {', '.join(slugs)}"
        subprocess.run(["git", "-C", str(ROOT), "commit", "-m", msg], check=True)
        subprocess.run(["git", "-C", str(ROOT), "push", "origin", "main"], check=True)
        log(f"✅ Git push完了: {slugs}")
    except subprocess.CalledProcessError as e:
        log(f"❌ Git push失敗: {e}")


def run(count: int = 2):
    posted = get_posted_slugs()
    remaining = [t for t in TOPICS if t["slug"] not in posted]

    if not remaining:
        log("全トピック投稿済み。トピックを追加してください。")
        return

    targets = random.sample(remaining, min(count, len(remaining)))
    generated = []

    for topic in targets:
        log(f"\n📝 生成中: {topic['title']}")
        content = generate_article(topic)
        if not content:
            log(f"  ❌ 生成失敗: {topic['slug']}")
            continue
        write_post(topic, content)
        generated.append(topic["slug"])
        time.sleep(3)

    if generated:
        git_push(generated)
        log(f"\n✅ 完了: {len(generated)}記事をGitHubにプッシュしました")
    else:
        log("❌ 記事生成なし")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--count", type=int, default=2, help="生成する記事数")
    args = parser.parse_args()
    run(args.count)
