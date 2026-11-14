import json
import re
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "news.json"
SOURCE = "https://navi.gg/en/publications/game/cs2"
HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; NAVIFanConceptNewsBot/1.0)"}


def clean(text: str) -> str:
    return re.sub(r"\s+", " ", text or "").strip()


def date_from(text: str) -> str:
    match = re.search(r"(\d{1,2}\s+[A-Za-z]+\s+20\d{2}|\d{1,2}\s+[а-яА-ЯіїєІЇЄ]+\s+20\d{2}|\d{1,2}[./-]\d{1,2}[./-]20\d{2})", text)
    return match.group(1) if match else ""


def collect():
    response = requests.get(SOURCE, headers=HEADERS, timeout=30)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "html.parser")
    found = {}

    # NAVI's CS2 publication listing; find article links and inspect nearby card text.
    for anchor in soup.select('a[href]'):
        href = anchor.get("href", "")
        full_url = urljoin(SOURCE, href)
        parsed = urlparse(full_url)
        if parsed.netloc not in {"navi.gg", "www.navi.gg"}:
            continue
        if "/publications/" not in parsed.path or parsed.path.rstrip("/").endswith("/game/cs2"):
            continue
        title = clean(anchor.get_text(" ", strip=True))
        if len(title) < 8 or title.lower() in {"read more", "details", "читати далі"}:
            continue
        card = anchor
        for _ in range(5):
            if card.parent:
                card = card.parent
            text = clean(card.get_text(" ", strip=True))
            if date_from(text) or len(text) > len(title) + 20:
                break
        card_text = clean(card.get_text(" ", strip=True))
        # Keep only the CS2 listing. Reject unrelated game categories when visible.
        if re.search(r"\b(Dota 2|VALORANT|MLBB|PUBG|Trackmania|Chess)\b", card_text, re.I):
            continue
        date = date_from(card_text)
        if not date:
            continue
        title = title[:180]
        if title not in found:
            found[title] = {
                "date": date,
                "tag": "NAVI CS2",
                "title": title,
                "text": "Офіційна публікація NAVI про команду Counter-Strike 2. Відкрий першоджерело для подробиць.",
                "url": full_url,
            }
        if len(found) >= 9:
            break

    if not found:
        raise RuntimeError("Не знайдено публікацій CS2. Старий news.json буде збережено.")

    payload = {
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "source": SOURCE,
        "news": list(found.values())[:9],
    }
    OUTPUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Saved {len(payload['news'])} NAVI CS2 news items")


if __name__ == "__main__":
    collect()
