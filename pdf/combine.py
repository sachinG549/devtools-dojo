#!/usr/bin/env python3
"""Combine docs/ chapters into a single markdown file for the PDF build.

- Each chapter's "# N. Title" becomes "## N. Title" (the PDF stylesheet styles h2 as chapter banners).
- Links between chapter files become in-document anchors.
- MkDocs-only syntax (buttons, admonitions, ++keys++) is converted to plain markdown.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"
SITE = "https://sachinG549.github.io/devtools-dojo/"

chapters = sorted(p for p in DOCS.glob("[0-9][0-9]-*.md"))
extra = [DOCS / "practice-labs.md"]  # appended as chapter 17


def slug(title: str) -> str:
    s = title.lower()
    s = re.sub(r"[^\w\s-]", "", s)
    return re.sub(r"\s+", "-", s.strip())


def mkdocs_to_plain(text: str) -> str:
    # Buttons: [Text](url){ .md-button } -> [Text](url)
    text = re.sub(r"\)\{[^}]*\}", ")", text)
    # Keys: ++cmd+shift+p++ -> `Cmd + Shift + P`
    text = re.sub(
        r"\+\+([a-z0-9+]+)\+\+",
        lambda m: "`" + " + ".join(k.capitalize() if len(k) > 1 else k.upper() for k in m.group(1).split("+")) + "`",
        text,
    )

    # Admonitions -> blockquotes
    def adm(m):
        title = m.group(2) or m.group(1).capitalize()
        body = "\n".join(line[4:] if line.startswith("    ") else line for line in m.group(3).splitlines())
        return "> **" + title + ":** " + body.strip().replace("\n", "\n> ") + "\n\n"

    # Collapsible reference blocks: print them fully expanded (unindent, drop the header line)
    text = re.sub(r'(?m)^\?\?\?\+? \w+(?: "[^"]*")?\n((?:    .*\n?)+)',
                  lambda m: "\n".join(l[4:] for l in m.group(1).splitlines()) + "\n", text)
    text = re.sub(r'(?m)^!!! (\w+)(?: "([^"]*)")?\n((?:    .*\n?|\n)+)', adm, text)
    # Attribute lists on images/links: ![x](y){ loading=lazy } -> ![x](y)
    text = re.sub(r"(\]\([^)]*\))\{[^}]*\}", r"\1", text)
    # Images live in docs/assets; point to them from the build folder
    text = text.replace("](assets/", "](" + str(DOCS / "assets") + "/")
    return text


titles = {}  # filename -> (number, title)
parts = []
for i, path in enumerate(chapters + extra):
    text = path.read_text()
    first, rest = text.split("\n", 1)
    title = re.sub(r"^#\s+(\d+\.\s+)?", "", first).strip()
    num = i if path in chapters else len(chapters)
    titles[path.name] = (num, title)
    parts.append((num, title, rest))

out = ["# DevTools Dojo\n", "## Table of Contents\n"]
for num, title, _ in parts:
    out.append(f"{num}. [{title}](#{num}-{slug(title)})")
out.append("\n---\n")

for num, title, body in parts:
    body = mkdocs_to_plain(body)
    body = re.sub(r"(?m)^(#{2,5}) ", lambda m: "#" + m.group(1) + " ", body)  # chapter-internal headings one level down
    # Cross-chapter links -> anchors
    def link(m):
        name = m.group(2)
        if name in titles:
            n, t = titles[name]
            return f"]({'#' + str(n) + '-' + slug(t)})"
        if name == "index.md":
            return f"]({SITE})"
        return m.group(0)

    body = re.sub(r"\]\(((?:\.\./)?)([\w-]+\.md)(#[^)]*)?\)", link, body)
    out.append(f"## {num}. {title}\n\n{body.strip()}\n\n---\n")

dest = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "build" / "combined.md"
dest.parent.mkdir(parents=True, exist_ok=True)
dest.write_text("\n".join(out))
print(f"wrote {dest} ({len(parts)} chapters)")
