#!/usr/bin/env python3
"""
build_games_local.py — MathDen catalog builder (LOCAL FILE INPUT VERSION)

Since GameMonetize blocks server-side fetches, we save the feed JSON to local
files first, then this script processes them.

WORKFLOW:
  1. Run grab-feeds.html in your browser (it saves all 30 feeds as one JSON file)
  2. Place feeds.json next to this script
  3. Run: python build_games_local.py

OR fallback workflow (manual):
  1. Open each feed URL in your browser
  2. Save each as feeds_raw/01.json, 02.json, etc.
  3. Run this script

Output:
    assets/js/games.js     — game catalog
    sitemap.xml            — all URLs for Google
    build_report.txt       — what got picked and why
"""

import json
import re
import sys
import time
from pathlib import Path


# ============================================================
# CONFIG — Edit these to tune the build
# ============================================================

INPUT_FILE = Path("feeds.json")              # combined output from grab-feeds.html
INPUT_DIR = Path("feeds_raw")                # OR this dir of individual feed files

MAX_GAMES = 200
CATEGORY_CAP = 35

# Category mapping: GameMonetize category → MathDen category
CATEGORY_MAP = {
    "Action":      ["Action", "Adventure", "Hypercasual", "Arcade"],
    "Puzzle":      ["Puzzle", "Bejeweled", "Boys", "Girls"],
    "Racing":      ["Racing", "3D"],
    "Multiplayer": ["Multiplayer"],
    "Sports":      ["Sports"],
    "Classic":     ["Clicker", "Stickman"],
    "Shooting":    ["Shooting"],
}
GM_TO_OURS = {gm.lower(): ours for ours, lst in CATEGORY_MAP.items() for gm in lst}

# Title keywords — override GM's category if any of these match
TITLE_KEYWORDS = {
    "Racing":      ["car", "drift", "moto", "bike", "race", "racing", "parking", "stunts", "truck", "driver", "driving", "highway"],
    "Sports":      ["basketball", "soccer", "football", "8 ball", "pool", "billiard", "tennis", "golf", "boxing"],
    "Shooting":    ["shoot", "shooter", "zombie", "gun", "snipe"],
    "Multiplayer": [".io", "wormate", "paper.io", "agar"],
    "Puzzle":      ["sudoku", "2048", "tetris", "tetro", "match", "merge", "puzzle", "blocks", "candy", "rope"],
    "Classic":     ["pacman", "pac-man", "pac man", "snake", "tetris", "pong"],
}

BLOCK_KEYWORDS = [
    "adult", "sexy", "nude", "strip", "kiss", "dating",
    "pregnant", "boobs", "lingerie", "girlfriend",
    "torture", "execution", "murder simulator",
    "porn", "xxx",
]

OUTPUT_GAMES_JS = Path("assets/js/games.js")
OUTPUT_SITEMAP = Path("sitemap.xml")
OUTPUT_REPORT = Path("build_report.txt")
SITE_URL = "https://mathden.com"


# ============================================================
# CORE LOGIC
# ============================================================

def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_-]+", "-", text)
    return text.strip("-")[:60]


def is_blocked(game: dict) -> bool:
    haystack = (
        (game.get("title") or "") + " " +
        (game.get("description") or "") + " " +
        (game.get("tags") or "")
    ).lower()
    for kw in BLOCK_KEYWORDS:
        if kw in haystack:
            return True
    if not game.get("thumb") or not game.get("url") or not game.get("title", "").strip():
        return True
    return False


def categorize(game: dict) -> str:
    title_lower = game.get("title", "").lower()
    gm_category = (game.get("category") or "").strip().lower()

    for our_cat, keywords in TITLE_KEYWORDS.items():
        for kw in keywords:
            if kw in title_lower:
                return our_cat

    if gm_category in GM_TO_OURS:
        return GM_TO_OURS[gm_category]
    return "Action"


def load_games() -> list:
    """Load games from feeds.json (preferred) or feeds_raw/*.json directory."""
    raw = []

    # Method 1: combined file
    if INPUT_FILE.exists():
        print(f"📥 Loading from {INPUT_FILE}...")
        data = json.loads(INPUT_FILE.read_text(encoding="utf-8"))
        if isinstance(data, list):
            raw = data
        elif isinstance(data, dict):
            # Handle case where it's {"games": [...]} or similar
            for key in ("games", "data", "items"):
                if key in data and isinstance(data[key], list):
                    raw = data[key]
                    break
        print(f"   Found {len(raw)} games in {INPUT_FILE}")
        return raw

    # Method 2: directory of files
    if INPUT_DIR.exists():
        print(f"📥 Loading from {INPUT_DIR}/...")
        files = sorted(INPUT_DIR.glob("*.json"))
        if not files:
            print(f"   ⚠️  No .json files found in {INPUT_DIR}")
            return []
        for fpath in files:
            try:
                games = json.loads(fpath.read_text(encoding="utf-8"))
                if isinstance(games, list):
                    raw.extend(games)
                    print(f"   {fpath.name:30s} → {len(games):3d} games")
            except json.JSONDecodeError as e:
                print(f"   ⚠️  Failed to parse {fpath.name}: {e}")
        return raw

    # Neither exists
    print(f"❌ No input found. Expected one of:")
    print(f"     {INPUT_FILE.absolute()}")
    print(f"     {INPUT_DIR.absolute()}/")
    print()
    print("Run grab-feeds.html in your browser first, OR save feed JSONs to feeds_raw/")
    sys.exit(1)


def main():
    print("=" * 60)
    print("  MathDen Catalog Builder (Local Edition)")
    print("=" * 60)
    print()

    # Load
    raw_games = load_games()
    print()

    # Dedupe
    print("🧹 Deduplicating...")
    seen_ids = set()
    unique = []
    for g in raw_games:
        gid = g.get("id")
        if gid and gid not in seen_ids:
            seen_ids.add(gid)
            unique.append(g)
    print(f"   {len(raw_games)} → {len(unique)} unique\n")

    # Filter
    print("🛡️  Filtering blocked / broken games...")
    filtered = [g for g in unique if not is_blocked(g)]
    print(f"   Removed {len(unique) - len(filtered)}, kept {len(filtered)}\n")

    # Categorize
    print("🏷️  Categorizing...")
    by_category = {cat: [] for cat in CATEGORY_MAP.keys()}
    for game in filtered:
        cat = categorize(game)
        by_category[cat].append(game)
    print()
    for cat, games in by_category.items():
        print(f"   {cat:13s} — {len(games):3d} games")
    print()

    # Cap each category
    print("📦 Capping categories (max", CATEGORY_CAP, "each)...")
    final = []
    for cat, games in by_category.items():
        # Sort: longer description first (proxy for quality), then newer ID
        games.sort(key=lambda g: (
            -len(g.get("description", "") or ""),
            -int(g.get("id", "0") or 0),
        ))
        capped = games[:CATEGORY_CAP]
        final.extend([(cat, g) for g in capped])
        print(f"   {cat:13s} → kept {len(capped)}")

    if MAX_GAMES and len(final) > MAX_GAMES:
        final = final[:MAX_GAMES]
        print(f"\n   Total cap: {MAX_GAMES} games")

    print(f"\n🎯 Final catalog: {len(final)} games\n")

    # Build games.js
    print(f"📝 Writing {OUTPUT_GAMES_JS}...")
    OUTPUT_GAMES_JS.parent.mkdir(parents=True, exist_ok=True)

    js_lines = [
        "// Auto-generated by build_games_local.py",
        f"// Total games: {len(final)}",
        f"// Generated: {time.strftime('%Y-%m-%d %H:%M')}",
        "",
        'const CATEGORIES = ["All", "Action", "Puzzle", "Racing", "Multiplayer", "Sports", "Classic", "Shooting"];',
        "",
        "const GAMES = [",
    ]

    used_ids = set()
    final_with_ids = []
    for cat, game in final:
        base_id = slugify(game.get("title", "untitled"))
        if not base_id:
            base_id = "game"
        gid = base_id
        suffix = 2
        while gid in used_ids:
            gid = f"{base_id}-{suffix}"
            suffix += 1
        used_ids.add(gid)
        final_with_ids.append((cat, game, gid))

        # Sanitize for JS string embedding
        title = (game.get("title") or "Untitled").replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ").strip()
        desc = (game.get("description") or "").replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ").strip()
        if len(desc) > 200:
            desc = desc[:197].rsplit(" ", 1)[0] + "..."

        thumb = (game.get("thumb") or "").replace('"', "")
        url = (game.get("url") or "").replace('"', "")

        js_lines.append("  {")
        js_lines.append(f'    id: "{gid}",')
        js_lines.append(f'    title: "{title}",')
        js_lines.append(f'    category: "{cat}",')
        js_lines.append(f'    thumbnail: "{thumb}",')
        js_lines.append(f'    iframe: "{url}",')
        js_lines.append(f'    description: "{desc}",')
        js_lines.append("  },")

    js_lines.append("];")
    js_lines.append("")

    OUTPUT_GAMES_JS.write_text("\n".join(js_lines), encoding="utf-8")
    print(f"   {OUTPUT_GAMES_JS} ({OUTPUT_GAMES_JS.stat().st_size / 1024:.1f} KB)\n")

    # Sitemap
    print(f"📝 Writing {OUTPUT_SITEMAP}...")
    sitemap_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        "",
        "  <!-- Main pages -->",
        f'  <url><loc>{SITE_URL}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>',
        f'  <url><loc>{SITE_URL}/about.html</loc><priority>0.5</priority></url>',
        f'  <url><loc>{SITE_URL}/privacy.html</loc><priority>0.3</priority></url>',
        f'  <url><loc>{SITE_URL}/terms.html</loc><priority>0.3</priority></url>',
        "",
        "  <!-- Game pages -->",
    ]
    for _, _, gid in final_with_ids:
        sitemap_lines.append(f'  <url><loc>{SITE_URL}/game.html?id={gid}</loc><priority>0.8</priority></url>')
    sitemap_lines.append("")
    sitemap_lines.append("</urlset>")
    sitemap_lines.append("")

    OUTPUT_SITEMAP.write_text("\n".join(sitemap_lines), encoding="utf-8")
    print(f"   {OUTPUT_SITEMAP} ({len(final_with_ids) + 4} URLs)\n")

    # Report
    print(f"📝 Writing {OUTPUT_REPORT}...")
    report = [
        "MathDen Catalog Build Report",
        "=" * 60,
        f"Generated: {time.strftime('%Y-%m-%d %H:%M:%S')}",
        f"Total games: {len(final_with_ids)}",
        "",
        "By category:",
    ]
    cat_counts = {}
    for cat, _, _ in final_with_ids:
        cat_counts[cat] = cat_counts.get(cat, 0) + 1
    for cat in sorted(cat_counts, key=lambda x: -cat_counts[x]):
        report.append(f"  {cat:13s} — {cat_counts[cat]:3d}")
    report.append("")
    report.append("Games:")
    report.append("-" * 60)
    for i, (cat, game, gid) in enumerate(final_with_ids, 1):
        report.append(f"{i:3d}. [{cat:11s}] {game.get('title', '?')}")
        report.append(f"     ID:  {gid}")
        report.append(f"     URL: {game.get('url', '?')}")
    OUTPUT_REPORT.write_text("\n".join(report), encoding="utf-8")
    print(f"   {OUTPUT_REPORT}\n")

    # Done
    print("=" * 60)
    print(f"✅ DONE — {len(final_with_ids)} games ready to deploy")
    print("=" * 60)
    print()
    print("Deploy:")
    print(f"  git add . && git commit -m 'Refresh catalog ({len(final_with_ids)} games)'")
    print(f"  git push")
    print(f"  wrangler pages deploy . --project-name=mathden")
    print()


if __name__ == "__main__":
    main()
