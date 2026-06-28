#!/usr/bin/env python3
"""
Extract chapter drafts from Gemini dialog files.

Maps each of the 21 chapters to a specific dialog exchange,
extracts the Gemini response, cleans it, and saves as a chapter
draft in briefs/.
"""

import re
import os

DIALOG_DIR = "notebooklm/gemini-dialog"
OUTPUT_DIR = "briefs"

# Chapter → (dialog file, exchange number)
CHAPTER_MAP = {
    1:  ("2026-06-25.md", 18, "The Euclidean Baseline"),
    2:  ("2026-06-25.md", 17, "The Torsion Engine"),
    3:  ("2026-06-25.md", 16, "The Crystalline Grid"),
    4:  ("2026-06-25.md", 15, "The Autonomous Governor"),
    5:  ("2026-06-27.md", 36, "The Idle State"),
    6:  ("2026-06-27.md", 32, "The Re-Ingested Walk"),
    7:  ("2026-06-27.md", 25, "The Oxter Wing"),
    8:  ("2026-06-27.md", 24, "The Sub-Occipital Kernel"),
    9:  ("2026-06-27.md", 31, "The Zero-Gravity Manifold"),
    10: ("2026-06-27.md", 29, "The Laminated Core"),
    11: ("2026-06-27.md", 28, "The Kua Vault"),
    12: ("2026-06-27.md", 27, "The Plantar Interface"),
    13: ("2026-06-27.md", 23, "The Asymmetric Constraint"),
    14: ("2026-06-27.md", 20, "The Runtime Environment"),
    15: ("2026-06-27.md", 21, "The Patellar Pulley"),
    16: ("2026-06-27.md", 19, "The Amnesia Paradox"),
    17: ("2026-06-27.md", 13, "The Cartesian Projection Error"),
    18: ("2026-06-27.md", 11, "The Clavicular Fuse and the Tensor of Impact"),
    19: ("2026-06-27.md", 10, "The Lateral Ankle Fuse"),
    20: ("2026-06-27.md", 9,  "The Carpal Tunnel Vice"),
    21: ("2026-06-27.md", 8,  "The Plantar Shard"),
}


def extract_exchange(filepath, exchange_num):
    """Read a dialog file and extract the specified exchange's Gemini response."""
    with open(filepath) as f:
        content = f.read()
    
    # Split into exchanges
    exchanges = re.split(r'(## Exchange \d+ —)', content)
    for i in range(1, len(exchanges), 2):
        header = exchanges[i]
        body = exchanges[i+1] if i+1 < len(exchanges) else ""
        
        num_match = re.search(r'Exchange (\d+)', header)
        if num_match and int(num_match.group(1)) == exchange_num:
            # Extract Gemini response
            gem_start = body.find('### Gemini')
            if gem_start < 0:
                return None, "No Gemini response found"
            
            response = body[gem_start + len('### Gemini'):].strip()
            
            # Remove the trailing "---" separator
            response = re.sub(r'\n---\n*$', '', response)
            
            # Remove code fence file markers (e.g. ```content/02_the_torsion_engine.md```)
            response = re.sub(r'```\s*\ncontent/[^\n]+\.md\s*\n```', '', response)
            response = re.sub(r'```\s*\ncontent/[^\n]+\s*\n', '', response)
            
            # Clean up leading whitespace
            response = response.strip()
            
            # Extract the user prompt too
            user_start = body.find('### User')
            user_end = body.find('### Gemini')
            prompt = body[user_start + len('### User'):user_end].strip() if user_start >= 0 else ""
            
            return response, prompt
    
    return None, f"Exchange {exchange_num} not found"


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    extracted = 0
    failed = 0
    
    for ch_num, (filename, exchange_num, title) in sorted(CHAPTER_MAP.items()):
        filepath = os.path.join(DIALOG_DIR, filename)
        
        if not os.path.exists(filepath):
            print(f"  ❌ Ch {ch_num:02d}: {title} — file {filename} not found")
            failed += 1
            continue
        
        response, prompt = extract_exchange(filepath, exchange_num)
        
        if not response:
            print(f"  ❌ Ch {ch_num:02d}: {title} — {prompt}")
            failed += 1
            continue
        
        # Generate output filename
        slug = title.lower()
        slug = re.sub(r'[^a-z0-9]+', '-', slug)
        slug = slug.strip('-')
        out_filename = f"chapter-{ch_num:02d}-{slug}.md"
        out_path = os.path.join(OUTPUT_DIR, out_filename)
        
        # Add front matter
        front_matter = f"""---
title: "Chapter {ch_num:02d}: {title}"
date: 2026-06-27
status: draft
source: "Gemini dialog, {filename} exchange {exchange_num}"
---

"""
        
        with open(out_path, 'w') as f:
            f.write(front_matter)
            f.write(response)
        
        print(f"  ✅ Ch {ch_num:02d}: {title} → {out_filename} ({len(response)} chars)")
        extracted += 1
    
    print(f"\n📊 Extracted: {extracted}, Failed: {failed}")


if __name__ == "__main__":
    main()
