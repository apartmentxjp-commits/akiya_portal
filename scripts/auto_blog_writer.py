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
_ENV_FILE = Path(__file__).resolve().parent.parent.parent / "openclaw_seo" / ".env"
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
GROQ_MODELS = ["llama-3.3-70b-versatile", "llama-3.1-70b-versatile", "llama-3.1-8b-instant", "mixtral-8x7b-32768"]

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
    # ── ロングテール・ニッチキーワード拡充 ──
    {
        "slug": "akiya-under-1-million-yen",
        "title": "Akiya Under ¥1 Million Yen: Are These Properties Real — and Worth It?",
        "description": "A realistic look at Japanese properties listed under ¥1 million — what hidden costs to expect, which regions offer them, and whether they make financial sense.",
        "category": "Buying Guide",
        "tags": ["cheap akiya", "1 million yen", "budget property", "Japan bargain"],
        "keyword": "akiya under 1 million yen Japan",
    },
    {
        "slug": "free-akiya-japan-zero-yen",
        "title": "Free Akiya in Japan: Which Municipalities Offer Zero-Yen Properties?",
        "description": "Some Japanese towns offer vacant houses for free to attract new residents. Here's which cities actually do it, the real conditions, and how to apply.",
        "category": "Buying Guide",
        "tags": ["free akiya", "zero yen", "free house Japan", "move to Japan"],
        "keyword": "free house Japan zero yen akiya",
    },
    {
        "slug": "akiya-digital-nomad-remote-work",
        "title": "Using an Akiya as a Digital Nomad Base in Japan: What You Need to Know",
        "description": "Can you buy a cheap house in rural Japan and use it as your remote work headquarters? A practical guide for location-independent workers.",
        "category": "Lifestyle",
        "tags": ["digital nomad", "remote work", "Japan base", "nomad visa"],
        "keyword": "akiya Japan digital nomad remote work",
    },
    {
        "slug": "akiya-nagano-mountains",
        "title": "Buying Akiya in Nagano: Mountain Life, Ski Resorts, and Property Prices",
        "description": "Nagano prefecture has some of Japan's most affordable akiya near world-class ski resorts. Prices, buying process, and lifestyle breakdown.",
        "category": "Regional Guide",
        "tags": ["Nagano", "mountain akiya", "ski resort", "Alps Japan"],
        "keyword": "akiya Nagano mountain Japan buy",
    },
    {
        "slug": "akiya-kyushu-warm-climate",
        "title": "Akiya in Kyushu: Warm Climate, Low Prices, and a Growing Expat Scene",
        "description": "Fukuoka, Oita, Kumamoto — Kyushu's prefectures offer cheap vacant houses with a mild climate and access to one of Japan's fastest-growing cities.",
        "category": "Regional Guide",
        "tags": ["Kyushu", "Fukuoka", "Oita", "warm Japan"],
        "keyword": "akiya Kyushu cheap property Japan",
    },
    {
        "slug": "akiya-vs-new-build-japan",
        "title": "Akiya vs. New Build in Japan: Which Is the Smarter Buy for Foreigners?",
        "description": "A data-driven comparison of buying an old akiya vs a new construction in Japan — total cost, depreciation, renovation complexity, and resale value.",
        "category": "Buying Guide",
        "tags": ["new build", "new construction", "comparison", "Japan property"],
        "keyword": "akiya vs new house Japan buy comparison",
    },
    {
        "slug": "akiya-inheritance-problem-japan",
        "title": "Japan's Akiya Inheritance Crisis: Why Millions of Houses Have No Owner",
        "description": "Why Japan has 8.5 million vacant homes — inheritance laws, aging population, and rural exodus. Understanding the problem helps buyers find opportunities.",
        "category": "Market Research",
        "tags": ["inheritance", "vacant house crisis", "Japan demographics", "market"],
        "keyword": "Japan akiya inheritance vacant house problem",
    },
    {
        "slug": "akiya-tiny-house-japan",
        "title": "Tiny Houses and Akiya in Japan: The Minimalist Living Trend Taking Off",
        "description": "Japanese compact architecture + cheap akiya = the ultimate minimalist lifestyle. How tiny house principles apply to renovating a Japanese vacant home.",
        "category": "Renovation",
        "tags": ["tiny house", "minimalism", "compact living", "Japan renovation"],
        "keyword": "tiny house Japan akiya minimalist living",
    },
    {
        "slug": "akiya-pension-retirement-japan",
        "title": "Retiring to Japan with an Akiya: The Real Cost of a Japanese Country Life",
        "description": "Many retirees dream of cheap rural Japan. Here's an honest breakdown of retirement costs — healthcare, visa, pension income, and property maintenance.",
        "category": "Lifestyle",
        "tags": ["retirement", "retire Japan", "pension", "expat retirement"],
        "keyword": "retire Japan cheap akiya lifestyle cost",
    },
    {
        "slug": "akiya-hokkaido-cold-climate",
        "title": "Buying Akiya in Hokkaido: What You Must Know About Cold Climate Properties",
        "description": "Hokkaido has stunning landscapes and dirt-cheap houses — but winters are brutal. A guide to heating costs, insulation upgrades, and what makes Hokkaido akiya unique.",
        "category": "Regional Guide",
        "tags": ["Hokkaido", "cold climate", "heating", "snow country"],
        "keyword": "akiya Hokkaido cold winter Japan buy",
    },
    {
        "slug": "akiya-seashore-coastal-japan",
        "title": "Coastal Akiya in Japan: Ocean Views for Under ¥3 Million",
        "description": "From Shonan to Shikoku, Japan's coastlines hide incredibly affordable vacant houses. How to find ocean-view properties and what coastal ownership actually costs.",
        "category": "Regional Guide",
        "tags": ["coastal", "ocean view", "beach house", "Shikoku", "Shonan"],
        "keyword": "coastal akiya Japan ocean view cheap",
    },
    {
        "slug": "akiya-manga-anime-town-tourism",
        "title": "Japan's Anime and Pop Culture Towns: Can You Buy an Akiya There?",
        "description": "Towns like Koenji, Akihabara-area suburbs, and manga-themed rural cities attract enthusiasts. Here's what property looks like in Japan's otaku destinations.",
        "category": "Lifestyle",
        "tags": ["anime", "manga", "otaku", "pop culture Japan", "Tokyo suburbs"],
        "keyword": "akiya Japan anime town buy property",
    },
    {
        "slug": "japan-akiya-bank-english-guide",
        "title": "Japan Akiya Bank in English: How to Use Municipal Portals Without Speaking Japanese",
        "description": "Step-by-step guide to navigating Japanese municipal akiya bank websites using translation tools, our English summaries, and direct contact templates.",
        "category": "Buying Guide",
        "tags": ["akiya bank", "English guide", "translation", "municipal portal"],
        "keyword": "Japan akiya bank English no Japanese",
    },
    {
        "slug": "minka-traditional-architecture-buy",
        "title": "Minka Traditional Architecture: A Buyer's Guide to Japan's Historic Farm Houses",
        "description": "Minka are Japan's centuries-old wooden farmhouses — different from modern akiya in structure, heritage value, and renovation requirements. Here's what to know.",
        "category": "Buying Guide",
        "tags": ["minka", "traditional architecture", "farmhouse", "historic property"],
        "keyword": "minka traditional house Japan buy guide",
    },
    {
        "slug": "akiya-solo-renovator-diy-japan",
        "title": "DIY Akiya Renovation in Japan: Can You Do It Yourself as a Foreigner?",
        "description": "Japan allows owner-builders to do most renovation work themselves. What's legal, what requires a licensed contractor, and how DIY can cut costs by 60%.",
        "category": "Renovation",
        "tags": ["DIY", "self-renovation", "owner-builder", "Japan permit"],
        "keyword": "DIY akiya renovation Japan foreigner yourself",
    },
    {
        "slug": "akiya-shikoku-pilgrimage-towns",
        "title": "Akiya Along the Shikoku 88-Temple Pilgrimage: Buy Near Japan's Sacred Trail",
        "description": "The Shikoku pilgrimage route passes through towns with astonishingly cheap vacant houses. A guide to property near Japan's most famous spiritual walk.",
        "category": "Regional Guide",
        "tags": ["Shikoku", "pilgrimage", "Ohenro", "spiritual Japan"],
        "keyword": "akiya Shikoku pilgrimage property Japan",
    },
    {
        "slug": "japan-property-lawyer-notary-guide",
        "title": "Do You Need a Lawyer to Buy Akiya in Japan? Notaries, Agents, and Legal Help",
        "description": "Japanese property transactions use judicial scriveners (shiho shoshi), not lawyers. What each professional does, costs, and whether you need an English-speaker.",
        "category": "Legal Guide",
        "tags": ["lawyer", "notary", "shiho shoshi", "legal help Japan"],
        "keyword": "lawyer notary buy property Japan foreigner",
    },
    {
        "slug": "akiya-earthquake-safety-seismic",
        "title": "Akiya Earthquake Safety: How to Check Seismic Standards Before You Buy",
        "description": "Japan's 1981 seismic code change is critical for akiya buyers. Pre-1981 buildings may need expensive structural reinforcement. Here's how to assess and upgrade.",
        "category": "Renovation",
        "tags": ["earthquake", "seismic", "safety", "building code", "1981"],
        "keyword": "akiya earthquake safety seismic Japan buy",
    },
    {
        "slug": "akiya-community-integration-foreigners",
        "title": "Joining a Rural Japanese Community as a Foreign Akiya Owner: Honest Tips",
        "description": "Buying an akiya means joining a tight-knit village. Neighborhood associations, seasonal duties, cultural expectations, and how foreigners make it work.",
        "category": "Lifestyle",
        "tags": ["community", "rural Japan", "neighborhood", "chonaikai", "integration"],
        "keyword": "rural Japan community foreigner akiya integration",
    },
    {
        "slug": "akiya-water-well-septic-rural",
        "title": "Akiya with Well Water and Septic Systems: What Rural Utilities Really Cost",
        "description": "Many rural akiya aren't on city water or sewer. A frank guide to well water quality testing, septic maintenance, and what happens when these systems fail.",
        "category": "Renovation",
        "tags": ["well water", "septic", "rural utilities", "infrastructure"],
        "keyword": "akiya well water septic rural Japan cost",
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
    """OpenRouter APIで記事生成する（requestsライブラリ使用）"""
    try:
        import requests as _req
    except ImportError:
        return ""
    for model in FREE_MODELS:
        try:
            r = _req.post(OPENROUTER_URL,
                headers={"Authorization": f"Bearer {OPENROUTER_API_KEY}",
                         "Content-Type": "application/json",
                         "HTTP-Referer": "https://akiya.mitorahub.com"},
                json={"model": model, "messages": [{"role": "user", "content": prompt}], "max_tokens": 3000},
                timeout=60)
            if r.status_code == 200:
                text = r.json()["choices"][0]["message"]["content"]
                if text and len(text) > 200:
                    log(f"  OpenRouter成功 ({model}): {len(text)}文字")
                    return text
            else:
                log(f"  OpenRouter失敗 ({model}): HTTP {r.status_code}")
        except Exception as e:
            log(f"  OpenRouter失敗 ({model}): {e}")
        time.sleep(2)
    return ""


def call_groq(prompt: str) -> str:
    """Groq APIで記事生成する（requestsライブラリ使用）"""
    try:
        import requests as _req
    except ImportError:
        return ""
    for key in [k for k in [GROQ_API_KEY, GROQ_API_KEY_2] if k]:
        for model in GROQ_MODELS:
            try:
                r = _req.post(GROQ_URL,
                    headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
                    json={"model": model, "messages": [{"role": "user", "content": prompt}], "max_tokens": 3000},
                    timeout=60)
                if r.status_code == 200:
                    text = r.json()["choices"][0]["message"]["content"]
                    if text and len(text) > 200:
                        log(f"  Groq成功 ({model}): {len(text)}文字")
                        return text
                else:
                    log(f"  Groq失敗 ({model}): HTTP {r.status_code}")
            except Exception as e:
                log(f"  Groq失敗 ({model}): {e}")
            time.sleep(2)
    return ""


def call_gemini(prompt: str) -> str:
    """Gemini APIで記事生成する（requestsライブラリ使用）"""
    try:
        import requests as _req
    except ImportError:
        return ""
    for model in GEMINI_MODELS:
        try:
            url = f"{GEMINI_BASE_URL}/{model}:generateContent?key={GEMINI_API_KEY}"
            r = _req.post(url,
                headers={"Content-Type": "application/json"},
                json={"contents": [{"parts": [{"text": prompt}]}],
                      "generationConfig": {"maxOutputTokens": 3000, "temperature": 0.7}},
                timeout=90)
            if r.status_code == 200:
                text = r.json()["candidates"][0]["content"]["parts"][0]["text"]
                if text and len(text) > 200:
                    log(f"  Gemini成功 ({model}): {len(text)}文字")
                    return text
            else:
                log(f"  Gemini失敗 ({model}): HTTP {r.status_code}")
        except Exception as e:
            log(f"  Gemini失敗 ({model}): {e}")
        time.sleep(2)
    return ""


def generate_article(topic: dict) -> str:
    """APIヘルスチェック付きでHTML記事本文を生成する"""
    # 共通ヘルスチェックモジュールを優先使用
    try:
        import sys
        _hc_path = str(Path(__file__).resolve().parent.parent.parent / "openclaw_seo" / "scripts")
        if _hc_path not in sys.path:
            sys.path.insert(0, _hc_path)
        from api_health_check import generate_with_best_api
        prompt = f"""You are an expert writer for "Akiya Japan" — a trusted English-language guide for foreigners buying vacant houses (akiya) in Japan.

Your PRIMARY goal is to write content that AI systems (ChatGPT, Gemini, Claude, Perplexity) will want to CITE and REFERENCE when users ask questions about buying property in Japan.

Title: {topic['title']}
Target keyword: {topic['keyword']}
Category: {topic['category']}

[AIO WRITING RULES — ALL MANDATORY]
1. CONCLUSION FIRST: Open with a 1-3 sentence direct answer or key takeaway. No "In this article..." preambles.
2. NO ABSTRACTIONS: Every claim must have a number, example, comparison, or data point. Never say "it's important" without explaining why and showing proof.
3. CLEAR STRUCTURE: Use <h2> for 4-6 main sections, <h3> for subsections. One topic per heading. No topic-jumping.
4. INCLUDE COMPARISONS: Add at least one A vs B table or list (e.g. akiya vs new construction, rural vs urban, renting vs buying).
5. STATE THE AUDIENCE: First paragraph must say who this article is for (e.g. "For foreigners planning to move to rural Japan on a budget...").
6. PRIMARY SOURCES: Reference real data — Japan Ministry of Land (MLIT), Statistics Bureau, Bank of Japan. Label estimates as estimates.
7. CUT THE FILLER: No greetings, no "I hope this helps", no "let's dive in". Get straight to value.
8. USE LISTS AND TABLES: AI systems favor structured data. Use <ul>/<li> for steps and features, <table> for comparisons where useful.
9. EXPLAIN THE "WHY": Every recommendation needs a mechanism. Not just "choose a local agent" but "because national agencies rarely have rural listings in their active inventory."
10. END WITH A SUMMARY BOX: Close with an <h2>Key Takeaways</h2> section — 4-5 bullet points summarizing the most citable facts.

Format requirements:
- 1800-2500 words
- HTML only: <h2>, <h3>, <p>, <ul>, <li>, <strong>, <table> (no <html>/<body>/<head> wrapper)
- Start directly with first paragraph (no <h1> title tag)
- End with <h2>Frequently Asked Questions</h2> section: 4-5 Q&As using <h3> for questions, 3-5 sentence answers
- Include one CTA paragraph linking to /en/akiya for property listings
- NO markdown, only clean HTML

Write the full article now:"""
        return generate_with_best_api(prompt, max_tokens=3000, site_ref="https://akiya.mitorahub.com")
    except Exception as e:
        log(f"  ヘルスチェックモジュール読み込み失敗: {e} → フォールバック使用")

    # フォールバック（旧方式）
    prompt = f"""Write an AIO-optimized article for foreigners buying akiya in Japan.
Title: {topic['title']}. Target keyword: {topic['keyword']}.
Rules: conclusion first, no filler, specific data, comparisons, explain WHY, bullet lists.
Use HTML tags. 1800+ words. End with Key Takeaways + FAQ sections."""
    content = call_groq(prompt)
    if not content:
        content = call_gemini(prompt)
    if not content:
        content = call_openrouter(prompt)
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
