#!/usr/bin/env python3
"""
Extract Gemini dialog traces from Google Takeout into structured markdown.

Reads My Activity.json, converts each prompted entry into a clean markdown
exchange (user prompt + Gemini response), and groups them by date into
files under the specified output directory.

Preserves LaTeX math notation ($...$, $$...$$) and converts basic HTML
to markdown. Non-prompted entries (Used, Created Canvas, etc.) are
skipped — only dialog exchanges are extracted.

Usage:
    python3 extract-gemini-dialog.py <input.json> <output_dir>
"""

import json
import os
import re
import sys
from html import unescape
from datetime import datetime


def html_to_markdown(html: str) -> str:
    """Convert safeHtmlItem HTML to clean markdown.
    
    Preserves LaTeX notation, converts common HTML tags to markdown
    equivalents, and strips remaining tags.
    """
    if not html:
        return ""
    
    # Unescape HTML entities first
    text = unescape(html)
    
    # Preserve code blocks before tag stripping
    code_blocks = {}
    def save_code(m):
        key = f"%%CODEBLOCK_{len(code_blocks)}%%"
        code_blocks[key] = m.group(1)
        return key
    text = re.sub(r'<pre[^>]*><code[^>]*>(.*?)</code></pre>', save_code, text, flags=re.DOTALL)
    
    # Preserve inline code
    inline_codes = {}
    def save_inline(m):
        key = f"%%INLINE_{len(inline_codes)}%%"
        inline_codes[key] = m.group(1)
        return key
    text = re.sub(r'<code[^>]*>(.*?)</code>', save_inline, text, flags=re.DOTALL)
    
    # Convert HTML tags to markdown
    # Headings
    text = re.sub(r'<h1[^>]*>(.*?)</h1>', r'# \1', text, flags=re.DOTALL)
    text = re.sub(r'<h2[^>]*>(.*?)</h2>', r'## \1', text, flags=re.DOTALL)
    text = re.sub(r'<h3[^>]*>(.*?)</h3>', r'### \1', text, flags=re.DOTALL)
    text = re.sub(r'<h4[^>]*>(.*?)</h4>', r'#### \1', text, flags=re.DOTALL)
    text = re.sub(r'<h5[^>]*>(.*?)</h5>', r'##### \1', text, flags=re.DOTALL)
    text = re.sub(r'<h6[^>]*>(.*?)</h6>', r'###### \1', text, flags=re.DOTALL)
    
    # Bold and italic
    text = re.sub(r'<strong[^>]*>(.*?)</strong>', r'**\1**', text, flags=re.DOTALL)
    text = re.sub(r'<b[^>]*>(.*?)</b>', r'**\1**', text, flags=re.DOTALL)
    text = re.sub(r'<em[^>]*>(.*?)</em>', r'*\1*', text, flags=re.DOTALL)
    text = re.sub(r'<i[^>]*>(.*?)</i>', r'*\1*', text, flags=re.DOTALL)
    
    # Links
    text = re.sub(r'<a[^>]*href="([^"]*)"[^>]*>(.*?)</a>', r'[\2](\1)', text, flags=re.DOTALL)
    
    # Blockquotes
    text = re.sub(r'<blockquote[^>]*>(.*?)</blockquote>', lambda m: '\n> ' + m.group(1).strip().replace('\n', '\n> ') + '\n', text, flags=re.DOTALL)
    
    # Lists - convert <li> to markdown bullets, handle <ul> and <ol>
    def convert_ul(m):
        items = re.findall(r'<li[^>]*>(.*?)</li>', m.group(1), flags=re.DOTALL)
        return '\n' + '\n'.join(f'- {unescape(item.strip())}' for item in items) + '\n'
    text = re.sub(r'<ul[^>]*>(.*?)</ul>', convert_ul, text, flags=re.DOTALL)
    
    def convert_ol(m):
        items = re.findall(r'<li[^>]*>(.*?)</li>', m.group(1), flags=re.DOTALL)
        return '\n' + '\n'.join(f'{i+1}. {unescape(item.strip())}' for i, item in enumerate(items)) + '\n'
    text = re.sub(r'<ol[^>]*>(.*?)</ol>', convert_ol, text, flags=re.DOTALL)
    
    # Tables - basic conversion
    def convert_table(m):
        rows = re.findall(r'<tr[^>]*>(.*?)</tr>', m.group(1), flags=re.DOTALL)
        if not rows:
            return m.group(0)
        lines = []
        for i, row in enumerate(rows):
            cells = re.findall(r'<t[hd][^>]*>(.*?)</t[hd]>', row, flags=re.DOTALL)
            cells = [unescape(c.strip()) for c in cells]
            lines.append('| ' + ' | '.join(cells) + ' |')
            if i == 0:
                lines.append('| ' + ' | '.join('---' for _ in cells) + ' |')
        return '\n' + '\n'.join(lines) + '\n'
    text = re.sub(r'<table[^>]*>(.*?)</table>', convert_table, text, flags=re.DOTALL)
    
    # Horizontal rules
    text = re.sub(r'<hr[^>]*/?>', '\n---\n', text)
    
    # Paragraphs and line breaks
    text = re.sub(r'<br[^>]*/?>', '\n', text)
    text = re.sub(r'<p[^>]*>(.*?)</p>', r'\1\n\n', text, flags=re.DOTALL)
    
    # Strip remaining tags
    text = re.sub(r'<[^>]+>', '', text)
    
    # Restore code blocks
    for key, val in code_blocks.items():
        text = text.replace(key, f'\n```\n{unescape(val)}\n```\n')
    for key, val in inline_codes.items():
        text = text.replace(key, f'`{unescape(val)}`')
    
    # Clean up whitespace
    text = re.sub(r'\n{3,}', '\n\n\n', text)
    text = text.strip()
    
    return text


def extract_prompt(title: str) -> str:
    """Extract the user's prompt from the title field."""
    if title.startswith("Prompted - "):
        return title[len("Prompted - "):]
    elif title.startswith("Prompted "):
        return title[len("Prompted "):]
    return title


def main():
    if len(sys.argv) < 3:
        print(f"Usage: {sys.argv[0]} <input.json> <output_dir>")
        sys.exit(1)
    
    input_path = sys.argv[1]
    output_dir = sys.argv[2]
    
    with open(input_path) as f:
        data = json.load(f)
    
    os.makedirs(output_dir, exist_ok=True)
    
    # Group entries by date
    by_date = {}
    stats = {"total": 0, "prompted": 0, "extracted": 0, "skipped": 0}
    
    for entry in data:
        stats["total"] += 1
        title = entry.get("title", "")
        time_str = entry.get("time", "")
        
        if not title.startswith("Prompted"):
            stats["skipped"] += 1
            continue
        
        stats["prompted"] += 1
        
        # Parse date
        try:
            dt = datetime.fromisoformat(time_str.replace("Z", "+00:00"))
            date_key = dt.strftime("%Y-%m-%d")
        except (ValueError, AttributeError):
            date_key = "unknown"
        
        prompt = extract_prompt(title)
        
        # Get response HTML
        items = entry.get("safeHtmlItem", [])
        response_html = items[0].get("html", "") if items else ""
        response_md = html_to_markdown(response_html)
        
        if not response_md:
            response_md = "*(no response recorded)*"
        
        stats["extracted"] += 1
        
        entry_record = {
            "time": time_str,
            "prompt": prompt,
            "response": response_md,
        }
        
        by_date.setdefault(date_key, []).append(entry_record)
    
    # Write one file per date
    manifest = []
    for date_key in sorted(by_date.keys()):
        entries = by_date[date_key]
        filename = f"{date_key}.md"
        filepath = os.path.join(output_dir, filename)
        
        with open(filepath, "w") as f:
            f.write(f"# Gemini Dialog — {date_key}\n\n")
            f.write(f"*{len(entries)} exchanges*\n\n---\n\n")
            
            for i, entry in enumerate(entries, 1):
                time_str = entry["time"][:19].replace("T", " ")
                f.write(f"## Exchange {i} — {time_str}\n\n")
                f.write(f"### User\n\n{entry['prompt']}\n\n")
                f.write(f"### Gemini\n\n{entry['response']}\n\n")
                f.write("---\n\n")
        
        manifest.append({
            "date": date_key,
            "file": filename,
            "exchanges": len(entries),
        })
    
    # Write manifest
    manifest_path = os.path.join(output_dir, "MANIFEST.json")
    with open(manifest_path, "w") as f:
        json.dump(manifest, f, indent=2)
    
    # Write index
    index_path = os.path.join(output_dir, "INDEX.md")
    with open(index_path, "w") as f:
        f.write("# Gemini Dialog Archive — Index\n\n")
        f.write(f"Source: `My Activity.json` ({stats['total']} total entries)\n\n")
        f.write(f"Extracted: {stats['extracted']} dialog exchanges across {len(by_date)} days\n\n")
        f.write(f"Skipped: {stats['skipped']} non-dialog entries (Used, Created Canvas, etc.)\n\n")
        f.write("---\n\n")
        f.write("| Date | Exchanges | File |\n")
        f.write("|------|-----------|------|\n")
        for m in manifest:
            f.write(f"| {m['date']} | {m['exchanges']} | `{m['file']}` |\n")
    
    print(f"✅ Extracted {stats['extracted']} exchanges across {len(by_date)} days")
    print(f"   Skipped {stats['skipped']} non-dialog entries")
    print(f"   Output: {output_dir}/")
    print(f"   Manifest: {manifest_path}")
    print(f"   Index: {index_path}")


if __name__ == "__main__":
    main()
