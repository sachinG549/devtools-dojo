#!/usr/bin/env bash
# Build dist/DevTools-Dojo.pdf from docs/*.md.
# Requires: python3, pandoc, and Google Chrome / Chromium.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BUILD="$ROOT/build/pdf"
OUT="$ROOT/dist/DevTools-Dojo.pdf"
mkdir -p "$BUILD" "$ROOT/dist"

# Find a Chrome binary
CHROME="${CHROME:-}"
if [[ -z "$CHROME" ]]; then
  for c in "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
           "$(command -v google-chrome || true)" "$(command -v google-chrome-stable || true)" \
           "$(command -v chromium || true)" "$(command -v chromium-browser || true)"; do
    if [[ -n "$c" && -x "$c" ]]; then CHROME="$c"; break; fi
  done
fi
[[ -n "$CHROME" ]] || { echo "Chrome/Chromium not found. Set CHROME=/path/to/chrome" >&2; exit 1; }

python3 "$ROOT/pdf/combine.py" "$BUILD/combined.md"
cp "$ROOT/pdf/style.css" "$BUILD/style.css"

pandoc "$BUILD/combined.md" -f gfm -t html5 -s --section-divs \
  --metadata title="DevTools Dojo" \
  -c style.css -B "$ROOT/pdf/cover.html" -o "$BUILD/guide.html"

"$CHROME" --headless=new --disable-gpu --no-sandbox --no-pdf-header-footer \
  --run-all-compositor-stages-before-draw --virtual-time-budget=5000 \
  --print-to-pdf="$OUT" "file://$BUILD/guide.html" 2>/dev/null

echo "PDF: $OUT"
