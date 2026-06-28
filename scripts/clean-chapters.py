#!/usr/bin/env python3
"""
Mechanical cleanup pass for chapter drafts:
1. Remove Gemini conversation openings ("You are entirely correct...", "Your observation...", etc.)
2. Remove NotebookLM/codebase/deployment references
3. Tone down "compiled successfully" → natural language
4. Remove "patch has compiled" engineering jargon from verification metrics
5. Remove "your autonomous governor" direct addressing
"""

import re
import os
import glob

BRIEFS_DIR = "briefs"

def clean_chapter(content):
    # Extract front matter
    fm_match = re.match(r'^---\n(.*?)\n---\n', content, re.DOTALL)
    front_matter = fm_match.group(0) if fm_match else ""
    body = content[len(front_matter):]
    
    # 1. Remove Gemini conversation openings
    # These are paragraphs where Gemini is responding to the user
    conversation_openings = [
        r'^You are entirely correct\.?.*?\n',
        r'^And you are entirely right.*?\n',
        r'^Your observation about.*?\n',
        r'^Your distillation.*?\n',
        r'^Using NotebookLM for.*?\n',
        r'^Appending these modules.*?\n',
        r'^To solidify this correction.*?\n',
        r'^Bringing \*\*Seiza\*\*.*?\n',
    ]
    for pattern in conversation_openings:
        body = re.sub(pattern, '', body, flags=re.MULTILINE | re.DOTALL)
    
    # 2. Remove NotebookLM references
    body = re.sub(r'NotebookLM\s*(container|compilation pass|corpus|workspace)?', 'the editing pass', body, flags=re.IGNORECASE)
    
    # 3. Remove "compile/compiled" jargon in verification metrics
    body = re.sub(r'the patch has successfully compiled\.?', 'the adjustment has taken hold.', body, flags=re.IGNORECASE)
    body = re.sub(r'the patch has compiled successfully\.?', 'the adjustment has taken hold.', body, flags=re.IGNORECASE)
    body = re.sub(r'the code has compiled\.?', 'the adjustment has taken hold.', body, flags=re.IGNORECASE)
    body = re.sub(r'the code has compiled successfully\.?', 'the adjustment has taken hold.', body, flags=re.IGNORECASE)
    body = re.sub(r'then the patch has compiled.*?$', 'then the adjustment has taken hold.', body, flags=re.IGNORECASE | re.MULTILINE)
    body = re.sub(r'then the code has compiled.*?$', 'then the adjustment has taken hold.', body, flags=re.IGNORECASE | re.MULTILINE)
    
    # 4. Remove "your autonomous governor" → "the autonomous governor"  
    body = re.sub(r'[Yy]our autonomous governor', 'the autonomous governor', body)
    
    # 5. Remove "your personal hardware" / "on your hardware"
    body = re.sub(r'on your (personal )?hardware', '', body, flags=re.IGNORECASE)
    body = re.sub(r'on (your |the )?local hardware', '', body, flags=re.IGNORECASE)
    
    # 6. Remove "codebase" → "book" or "system"
    body = re.sub(r'codebase', 'system', body, flags=re.IGNORECASE)
    
    # 7. Clean up "compile" in non-math contexts
    body = re.sub(r'compiles a clean', 'produces a clean', body, flags=re.IGNORECASE)
    body = re.sub(r'compiles successfully', 'takes effect', body, flags=re.IGNORECASE)
    body = re.sub(r'has just compiled successfully', 'has just completed', body, flags=re.IGNORECASE)
    
    # 8. Remove "deployment" jargon
    body = re.sub(r'deployment (strategy|zone)', 'practice', body, flags=re.IGNORECASE)
    
    # 9. Clean up double spaces and extra whitespace
    body = re.sub(r'  +', ' ', body)
    body = re.sub(r'\n{3,}', '\n\n', body)
    body = body.strip()
    
    return front_matter + '\n' + body + '\n'


def main():
    chapters = sorted(glob.glob(os.path.join(BRIEFS_DIR, "chapter-*.md")))
    
    for ch_path in chapters:
        filename = os.path.basename(ch_path)
        with open(ch_path) as f:
            content = f.read()
        
        cleaned = clean_chapter(content)
        
        with open(ch_path, 'w') as f:
            f.write(cleaned)
        
        changes = len(content) - len(cleaned)
        print(f"  ✅ {filename} ({'+' if changes < 0 else ''}{changes} chars)")
    
    print(f"\n📊 Processed {len(chapters)} chapters")


if __name__ == "__main__":
    main()
