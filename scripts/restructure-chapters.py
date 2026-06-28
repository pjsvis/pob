#!/usr/bin/env python3
"""
Restructure chapter drafts:
1. Extract Popperian Falsification sections → appendix
2. Remove meta-commentary sections (System Architecture Evaluation, Technical Architecture Synthesis/Opinion)
3. Clean up section titles (remove numbering, normalise names)
4. Keep Hardware Smoke Tests in the main text
"""

import re
import os
import glob

BRIEFS_DIR = "briefs"
APPENDIX_PATH = "briefs/appendix-a-falsification-protocols.md"

# Patterns for the Popperian section headers
POPPERIAN_PATTERNS = [
    r'### 3\. The Popperian Falsification Test',
    r'### 3\. The Academic Firewall \(Popperian Falsification\)',
    r'### 3\. The Academic Firewall',
]

# Patterns for meta-commentary sections to remove entirely
META_PATTERNS = [
    r'## The System Architecture Evaluation.*',
    r'## Technical Architecture Synthesis.*',
    r'## Technical Architecture Opinion.*',
    r'## The Synthesis.*',
]

# Pattern for the merged Chapter 14 content in Chapter 13
CH14_MERGED = r'## Chapter 14: The Operational Heuristic.*'


def find_popperian_section(content):
    """Find the Popperian Falsification section and return (start, end, text)."""
    for pattern in POPPERIAN_PATTERNS:
        match = re.search(pattern, content, re.MULTILINE)
        if match:
            start = match.start()
            # Find the next ### or ## section after this one
            after = content[match.end():]
            next_section = re.search(r'\n##[# ]', after)
            if next_section:
                end = match.end() + next_section.start()
            else:
                # Go to end of file
                end = len(content)
            
            section_text = content[start:end].strip()
            return start, end, section_text
    
    return None, None, None


def find_smoke_test(content):
    """Check if there's a Hardware Smoke Test section."""
    match = re.search(r'### 4\. The Hardware Smoke Test.*', content)
    if match:
        return True
    return False


def find_meta_sections(content):
    """Find meta-commentary sections to remove."""
    sections_to_remove = []
    for pattern in META_PATTERNS:
        match = re.search(pattern, content, re.DOTALL)
        if match:
            sections_to_remove.append((match.start(), match.end()))
    
    # Check for merged Chapter 14 in Chapter 13
    match = re.search(CH14_MERGED, content, re.DOTALL)
    if match:
        sections_to_remove.append((match.start(), match.end()))
    
    return sections_to_remove


def clean_section_titles(content):
    """Normalise section titles."""
    # Remove "### 1. ", "### 2. " etc → just "## "
    content = re.sub(r'### (\d+)\. (.*)', r'## \2', content)
    
    # Remove "## Chapter XX: " prefix (keep the title only as H1)
    content = re.sub(r'## Chapter (\d+): (.*)', r'# \2', content)
    
    return content


def extract_chapter_number(filename):
    """Get chapter number from filename."""
    match = re.search(r'chapter-(\d+)-', filename)
    return int(match.group(1)) if match else 0


def main():
    chapters = sorted(glob.glob(os.path.join(BRIEFS_DIR, "chapter-*.md")))
    
    appendix_entries = []
    cleaned_count = 0
    popperian_count = 0
    
    for ch_path in chapters:
        filename = os.path.basename(ch_path)
        ch_num = extract_chapter_number(filename)
        
        with open(ch_path) as f:
            content = f.read()
        
        # Extract front matter
        fm_match = re.match(r'^---\n(.*?)\n---\n', content, re.DOTALL)
        front_matter = fm_match.group(0) if fm_match else ""
        body = content[len(front_matter):]
        
        # Find and extract Popperian section
        pop_start, pop_end, pop_text = find_popperian_section(body)
        
        if pop_text:
            # Extract just the content, not the header
            pop_content = re.sub(r'^### .*?\n', '', pop_text).strip()
            
            # Get chapter title from front matter
            title_match = re.search(r'title: "?(.*?)"?$', front_matter, re.MULTILINE)
            chapter_title = title_match.group(1) if title_match else f"Chapter {ch_num}"
            
            appendix_entries.append({
                'num': ch_num,
                'title': chapter_title,
                'content': pop_content,
            })
            popperian_count += 1
            
            # Remove the Popperian section from the body
            body = body[:pop_start] + body[pop_end:]
        
        # Remove meta-commentary sections
        meta_sections = find_meta_sections(body)
        for start, end in sorted(meta_sections, reverse=True):
            body = body[:start] + body[end:]
        
        # Clean section titles
        body = clean_section_titles(body)
        
        # Clean up extra whitespace
        body = re.sub(r'\n{3,}', '\n\n', body).strip()
        
        # Write back
        with open(ch_path, 'w') as f:
            f.write(front_matter)
            f.write('\n')
            f.write(body)
            f.write('\n')
        
        cleaned_count += 1
        status = f"✅ {filename}"
        if pop_text:
            status += " [Popperian → Appendix]"
        if meta_sections:
            status += f" [removed {len(meta_sections)} meta section(s)]"
        print(status)
    
    # Write the appendix
    if appendix_entries:
        with open(APPENDIX_PATH, 'w') as f:
            f.write("""---
title: "Appendix A: Falsification Protocols"
date: 2026-06-27
status: draft
---

# Appendix A: Falsification Protocols

*The Popperian Falsification Tests for each chapter, collected here for researchers. These are not required reading for the practitioner — the Hardware Smoke Tests in the main text are the conversational diagnostics. This appendix exists for those who want to test the model's claims under controlled conditions.*

---

""")
            for entry in sorted(appendix_entries, key=lambda x: x['num']):
                f.write(f"## {entry['title']}\n\n")
                f.write(entry['content'])
                f.write("\n\n---\n\n")
        
        print(f"\n📄 Appendix written: {APPENDIX_PATH} ({len(appendix_entries)} entries)")
    
    print(f"\n📊 Processed: {cleaned_count} chapters, {popperian_count} Popperian sections extracted")


if __name__ == "__main__":
    main()
