#!/usr/bin/env python3
"""
Akiya Bank Scraper
==================
Collects publicly available vacant home (空き家) listings from Japanese
municipal akiya bank sources and inserts them into the Supabase database.

Sources targeted:
  1. 全国版空き家バンク (MLIT / ふるさとぷらす)  — https://www.akiya-navi.jp/
  2. LIFULL HOME'S 空き家バンク               — https://www.homes.co.jp/akiyabank/
  3. SMO (田舎暮らし物件)                     — https://www.smout.jp/
  4. Direct municipal pages (sample set)

Usage:
  python scripts/akiya_scraper.py [--dry-run] [--source lifull|mlit|smout|all]

Environment variables (set in .env.local or GitHub Actions secrets):
  NEXT_PUBLIC_SUPABASE_URL
  SUPABASE_SERVICE_ROLE_KEY   <-- use service role for inserts, not anon
  GROQ_API_KEY                <-- for auto-translation

Dependencies:
  pip install requests beautifulsoup4 supabase groq python-dotenv Pillow
"""

import os
import re
import sys
import json
import time
import hashlib
import argparse
import logging
from datetime import datetime
from typing import Optional
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv

# Load .env.local from project root
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env.local'))

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    datefmt='%H:%M:%S',
)
log = logging.getLogger(__name__)

# ── Supabase client ──────────────────────────────────────────────────────────

def get_supabase_client():
    """Returns a supabase-py client using the service role key (for inserts)."""
    try:
        from supabase import create_client, Client
    except ImportError:
        log.error("supabase package not installed. Run: pip install supabase")
        sys.exit(1)

    url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    if not url or not key:
        log.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY")
        sys.exit(1)

    return create_client(url, key)


# ── Groq translation ─────────────────────────────────────────────────────────

def translate_to_english(japanese_text: str, context: str = "property listing") -> str:
    """Translate Japanese text to English using Groq (Llama3)."""
    api_key = os.environ.get("GROQ_API_KEY")
    if not api_key or not japanese_text:
        return ""

    try:
        from groq import Groq
        client = Groq(api_key=api_key)
        chat = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[
                {
                    "role": "system",
                    "content": (
                        f"You are a professional real estate translator specializing in Japanese {context}. "
                        "Translate the given Japanese text into natural, clear English. "
                        "Keep property-specific terms (kominka, machiya, etc.) in Japanese with brief English explanation. "
                        "Output only the translated text, no extra commentary."
                    ),
                },
                {"role": "user", "content": japanese_text},
            ],
            temperature=0.2,
            max_tokens=800,
        )
        return chat.choices[0].message.content.strip()
    except Exception as e:
        log.warning(f"Translation failed: {e}")
        return ""


# ── Utility helpers ──────────────────────────────────────────────────────────

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "ja,en;q=0.9",
}

def fetch(url: str, timeout: int = 15) -> Optional[BeautifulSoup]:
    """GET a URL and return a BeautifulSoup, or None on failure."""
    try:
        resp = requests.get(url, headers=HEADERS, timeout=timeout)
        resp.raise_for_status()
        resp.encoding = resp.apparent_encoding
        return BeautifulSoup(resp.text, "html.parser")
    except requests.RequestException as e:
        log.warning(f"Fetch failed {url}: {e}")
        return None


def parse_price_man_yen(text: str) -> Optional[int]:
    """Extract price in 万円 from arbitrary Japanese text."""
    text = text.replace(",", "").replace("，", "")
    # Patterns: "500万円", "2,980万", "無料", "価格未定"
    free_patterns = ["無料", "0円", "０円", "価格未定", "価格応相談"]
    if any(p in text for p in free_patterns):
        return 0
    m = re.search(r"(\d+(?:\.\d+)?)\s*万", text)
    if m:
        return int(float(m.group(1)))
    # Yen without 万: 500000円 → 50万
    m = re.search(r"(\d+)\s*円", text)
    if m:
        yen = int(m.group(1))
        return max(1, round(yen / 10000))
    return None


def pref_to_english(pref_ja: str) -> str:
    MAP = {
        "北海道": "Hokkaido", "青森": "Aomori", "岩手": "Iwate",
        "宮城": "Miyagi", "秋田": "Akita", "山形": "Yamagata",
        "福島": "Fukushima", "茨城": "Ibaraki", "栃木": "Tochigi",
        "群馬": "Gunma", "埼玉": "Saitama", "千葉": "Chiba",
        "東京": "Tokyo", "神奈川": "Kanagawa", "新潟": "Niigata",
        "富山": "Toyama", "石川": "Ishikawa", "福井": "Fukui",
        "山梨": "Yamanashi", "長野": "Nagano", "岐阜": "Gifu",
        "静岡": "Shizuoka", "愛知": "Aichi", "三重": "Mie",
        "滋賀": "Shiga", "京都": "Kyoto", "大阪": "Osaka",
        "兵庫": "Hyogo", "奈良": "Nara", "和歌山": "Wakayama",
        "鳥取": "Tottori", "島根": "Shimane", "岡山": "Okayama",
        "広島": "Hiroshima", "山口": "Yamaguchi", "徳島": "Tokushima",
        "香川": "Kagawa", "愛媛": "Ehime", "高知": "Kochi",
        "福岡": "Fukuoka", "佐賀": "Saga", "長崎": "Nagasaki",
        "熊本": "Kumamoto", "大分": "Oita", "宮崎": "Miyazaki",
        "鹿児島": "Kagoshima", "沖縄": "Okinawa",
    }
    for ja, en in MAP.items():
        if ja in pref_ja:
            return en
    return pref_ja


def detect_property_type(title: str, desc: str) -> str:
    text = (title or "") + " " + (desc or "")
    if any(k in text for k in ["古民家", "こみんか", "古い民家"]):
        return "kominka"
    if any(k in text for k in ["農家", "農業", "農地", "田舎"]):
        return "farmhouse"
    if any(k in text for k in ["町家", "町屋", "まちや"]):
        return "machiya"
    if any(k in text for k in ["別荘", "リゾート", "ログハウス"]):
        return "villa"
    return "kominka"  # default for traditional vacant homes


def make_slug(title: str, prefecture: str) -> str:
    slug = f"{prefecture}-{title}"[:60]
    slug = re.sub(r"[^\w\s-]", "", slug.lower())
    slug = re.sub(r"[\s_-]+", "-", slug).strip("-")
    suffix = hashlib.md5(title.encode()).hexdigest()[:6]
    return f"{slug}-{suffix}"


def record_exists(supabase_client, source_url: str) -> bool:
    """Check if a property with this source_url slug already exists."""
    slug = make_slug(source_url, "")
    result = supabase_client.table("properties").select("id").eq("slug", slug).execute()
    return len(result.data) > 0


# ── Scraper: LIFULL HOME'S 空き家バンク ──────────────────────────────────────

def scrape_lifull(max_pages: int = 3) -> list[dict]:
    """
    Scrape LIFULL HOME'S akiya bank listings.
    URL: https://www.homes.co.jp/akiyabank/list/

    Note: LIFULL provides publicly listed municipal properties under their
    akiya bank portal — this is public information from local governments.
    """
    base_url = "https://www.homes.co.jp/akiyabank/list/"
    results = []

    for page in range(1, max_pages + 1):
        url = f"{base_url}?page={page}"
        log.info(f"[LIFULL] Scraping page {page}: {url}")
        soup = fetch(url)
        if not soup:
            break

        # Property listing items
        items = soup.select(".mod-mergeBuilding--sale, .mod-listBuilding, [class*='property-item']")
        if not items:
            # Try generic approach
            items = soup.select("li.searchResultItem, .building-card, article")

        log.info(f"[LIFULL] Found {len(items)} items on page {page}")

        for item in items:
            try:
                # Title
                title_el = item.select_one("h2, h3, .building-name, [class*='title']")
                title = title_el.get_text(strip=True) if title_el else ""
                if not title:
                    continue

                # Price
                price_el = item.select_one("[class*='price'], .mod-price")
                price_text = price_el.get_text(strip=True) if price_el else ""
                price = parse_price_man_yen(price_text)

                # Location
                loc_el = item.select_one("[class*='address'], [class*='location'], .mod-address")
                location = loc_el.get_text(strip=True) if loc_el else ""
                pref_en = pref_to_english(location)

                # Image
                img_el = item.select_one("img")
                images = []
                if img_el:
                    src = img_el.get("src") or img_el.get("data-src") or img_el.get("data-lazy-src")
                    if src and src.startswith("http"):
                        images = [src]

                # Link
                link_el = item.select_one("a[href]")
                detail_url = ""
                if link_el:
                    detail_url = urljoin("https://www.homes.co.jp", link_el["href"])

                # Description (try to get from detail page if needed)
                desc_el = item.select_one("[class*='desc'], [class*='note'], p")
                description = desc_el.get_text(strip=True)[:500] if desc_el else ""

                property_type = detect_property_type(title, description)
                prefecture = pref_en if pref_en else "Japan"

                # Extract city from location string
                city = ""
                city_match = re.search(r"(?:県|道|府|都)(.+?(?:市|町|村|区))", location)
                if city_match:
                    city = city_match.group(1)

                results.append({
                    "title": title,
                    "price": price,
                    "prefecture": prefecture,
                    "city": city,
                    "description": description[:1000],
                    "images": images,
                    "property_type": property_type,
                    "source_url": detail_url,
                    "source": "api",
                    "tags": ["akiya", "lifull"],
                })

            except Exception as e:
                log.warning(f"[LIFULL] Error parsing item: {e}")
                continue

        time.sleep(2)  # polite delay

    return results


# ── Scraper: 全国版空き家バンク (MLIT / akiya-navi.jp) ───────────────────────

def scrape_akiyanavi(max_pages: int = 3) -> list[dict]:
    """
    Scrape the national akiya bank aggregator run by Furu-sato Plus
    under mandate from MLIT (国土交通省).
    URL: https://www.akiya-navi.jp/
    """
    base_url = "https://www.akiya-navi.jp/akiya/search"
    results = []

    for page in range(1, max_pages + 1):
        url = f"{base_url}?page={page}"
        log.info(f"[MLIT/Akiya-Navi] Scraping page {page}")
        soup = fetch(url)
        if not soup:
            break

        items = soup.select(".akiya-item, .property-card, .search-result-item, article.property")
        log.info(f"[MLIT/Akiya-Navi] Found {len(items)} items on page {page}")

        for item in items:
            try:
                title_el = item.select_one("h2, h3, .property-name, [class*='title']")
                title = title_el.get_text(strip=True) if title_el else ""
                if not title:
                    continue

                price_el = item.select_one("[class*='price']")
                price = parse_price_man_yen(price_el.get_text(strip=True) if price_el else "")

                loc_el = item.select_one("[class*='location'], [class*='address'], [class*='pref']")
                location = loc_el.get_text(strip=True) if loc_el else ""
                prefecture = pref_to_english(location)

                img_el = item.select_one("img[src], img[data-src]")
                images = []
                if img_el:
                    src = img_el.get("src") or img_el.get("data-src", "")
                    if src and src.startswith("http"):
                        images = [src]

                desc_el = item.select_one("[class*='desc'], p")
                description = desc_el.get_text(strip=True)[:800] if desc_el else ""

                link_el = item.select_one("a[href]")
                detail_url = urljoin("https://www.akiya-navi.jp", link_el["href"]) if link_el else ""

                # Area (㎡)
                area_el = item.select_one("[class*='area'], [class*='menseki']")
                building_area = None
                if area_el:
                    area_m = re.search(r"(\d+(?:\.\d+)?)\s*㎡", area_el.get_text())
                    if area_m:
                        building_area = float(area_m.group(1))

                city_m = re.search(r"(?:県|道|府|都)(.+?(?:市|町|村|区))", location)
                city = city_m.group(1) if city_m else ""

                results.append({
                    "title": title,
                    "price": price,
                    "prefecture": prefecture,
                    "city": city,
                    "building_area": building_area,
                    "description": description,
                    "images": images,
                    "property_type": detect_property_type(title, description),
                    "source_url": detail_url,
                    "source": "api",
                    "tags": ["akiya", "mlit"],
                })

            except Exception as e:
                log.warning(f"[MLIT] Error: {e}")

        time.sleep(2)

    return results


# ── Scraper: SMOUT (田舎暮らし物件) ──────────────────────────────────────────

def scrape_smout(max_pages: int = 3) -> list[dict]:
    """
    Scrape SMOUT (スマウト) — rural living / inaka properties.
    These are publicly listed properties from municipalities and landowners.
    URL: https://www.smout.jp/
    """
    base_url = "https://www.smout.jp/areas"
    results = []

    log.info("[SMOUT] Fetching property list")
    soup = fetch(base_url)
    if not soup:
        return results

    items = soup.select(".area-card, .property-card, article[class*='card']")
    log.info(f"[SMOUT] Found {len(items)} items")

    for item in items[:30]:  # limit to 30 per run
        try:
            title_el = item.select_one("h2, h3, [class*='title'], [class*='name']")
            title = title_el.get_text(strip=True) if title_el else ""
            if not title:
                continue

            loc_el = item.select_one("[class*='pref'], [class*='area'], [class*='location']")
            location = loc_el.get_text(strip=True) if loc_el else ""
            prefecture = pref_to_english(location)

            img_el = item.select_one("img[src]")
            images = []
            if img_el:
                src = img_el.get("src", "")
                if src.startswith("http"):
                    images = [src]

            desc_el = item.select_one("p, [class*='desc']")
            description = desc_el.get_text(strip=True)[:600] if desc_el else ""

            link_el = item.select_one("a[href]")
            detail_url = urljoin("https://www.smout.jp", link_el["href"]) if link_el else ""

            results.append({
                "title": title,
                "price": None,  # SMOUT often free / price on inquiry
                "prefecture": prefecture if prefecture else "Japan",
                "city": "",
                "description": description,
                "images": images,
                "property_type": detect_property_type(title, description),
                "source_url": detail_url,
                "source": "api",
                "tags": ["akiya", "rural", "smout"],
            })

        except Exception as e:
            log.warning(f"[SMOUT] Error: {e}")

    return results


# ── Insert into Supabase ──────────────────────────────────────────────────────

def insert_property(client, prop: dict, dry_run: bool = False) -> bool:
    """Translate and insert a single property record into Supabase."""
    title = prop.get("title", "")
    description = prop.get("description", "")
    prefecture = prop.get("prefecture", "Japan")

    if not title or not prefecture:
        return False

    slug = make_slug(prop.get("source_url", title), prefecture)

    # Check for duplicates by slug
    exists = client.table("properties").select("id").eq("slug", slug).execute()
    if exists.data:
        log.debug(f"Skip (exists): {title[:50]}")
        return False

    # Translate
    log.info(f"Translating: {title[:60]}")
    title_en = translate_to_english(title, "property title") or ""
    description_en = translate_to_english(description, "property description") if description else ""

    record = {
        "title": title,
        "title_en": title_en,
        "price": prop.get("price"),
        "prefecture": prefecture,
        "city": prop.get("city", ""),
        "building_area": prop.get("building_area"),
        "land_area": prop.get("land_area"),
        "year_built": prop.get("year_built"),
        "property_type": prop.get("property_type", "kominka"),
        "description": description[:2000] if description else None,
        "description_en": description_en[:2000] if description_en else None,
        "images": json.dumps(prop.get("images", [])),
        "tags": json.dumps(prop.get("tags", [])),
        "slug": slug,
        "source": prop.get("source", "api"),
        "status": "approved",  # auto-approve scraped public data
        "contact_email": prop.get("contact_email"),
    }

    if dry_run:
        log.info(f"[DRY RUN] Would insert: {title_en or title}")
        return True

    try:
        result = client.table("properties").insert(record).execute()
        if result.data:
            log.info(f"✓ Inserted: {title_en or title}")
            return True
        else:
            log.warning(f"Insert returned no data: {result}")
            return False
    except Exception as e:
        log.error(f"Insert error for '{title[:40]}': {e}")
        return False


# ── Main ─────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Akiya Bank Property Scraper")
    parser.add_argument("--dry-run", action="store_true", help="Parse but don't insert into DB")
    parser.add_argument("--source", default="all", choices=["lifull", "mlit", "smout", "all"])
    parser.add_argument("--max-pages", type=int, default=3, help="Max pages per source")
    parser.add_argument("--limit", type=int, default=50, help="Max properties to insert per run")
    args = parser.parse_args()

    log.info(f"Starting akiya scraper — source={args.source}, dry_run={args.dry_run}")

    # Collect from sources
    all_properties = []

    if args.source in ("lifull", "all"):
        log.info("── Scraping LIFULL HOME'S ──")
        all_properties += scrape_lifull(max_pages=args.max_pages)

    if args.source in ("mlit", "all"):
        log.info("── Scraping 全国版空き家バンク (Akiya-Navi) ──")
        all_properties += scrape_akiyanavi(max_pages=args.max_pages)

    if args.source in ("smout", "all"):
        log.info("── Scraping SMOUT ──")
        all_properties += scrape_smout(max_pages=args.max_pages)

    log.info(f"Total scraped: {len(all_properties)} properties")

    if not all_properties:
        log.warning("No properties found. The site structure may have changed.")
        log.info("Tip: Run with --source lifull --dry-run and check the output")
        return

    # Deduplicate by title within this batch
    seen_titles = set()
    unique_props = []
    for p in all_properties:
        key = p.get("title", "")[:50]
        if key not in seen_titles:
            seen_titles.add(key)
            unique_props.append(p)

    log.info(f"After dedup: {len(unique_props)} unique properties")

    # Insert
    if not args.dry_run:
        client = get_supabase_client()
    else:
        client = None

    inserted = 0
    skipped = 0

    for prop in unique_props[:args.limit]:
        if args.dry_run:
            success = insert_property(None, prop, dry_run=True)
        else:
            success = insert_property(client, prop, dry_run=False)

        if success:
            inserted += 1
        else:
            skipped += 1

        time.sleep(0.5)  # rate limit: 0.5s between inserts/translations

    log.info(f"\n{'─'*50}")
    log.info(f"Run complete: {inserted} inserted, {skipped} skipped")
    log.info(f"{'─'*50}\n")


if __name__ == "__main__":
    main()
