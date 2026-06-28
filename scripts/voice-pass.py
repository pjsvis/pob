#!/usr/bin/env python3
"""
Second mechanical pass: tone down engineering jargon to natural language.
Preserves the mathematical content while removing the most jarring
software metaphors.
"""

import re
import os
import glob

BRIEFS_DIR = "briefs"

REPLACEMENTS = [
    # CPU / processing metaphors
    (r'high-bandwidth computational load', 'constant mechanical demand'),
    (r'High CPU Load', 'High demand'),
    (r'Zero CPU Load', 'Zero demand'),
    (r'CPU overhead', 'processing overhead'),
    (r'high-voltage', 'high-intensity'),
    (r'CPU load', 'cognitive load'),
    
    # Software metaphors
    (r'software reboot', 'system reset'),
    (r'coordinate cache flush', 'coordinate reset'),
    (r'cache flush', 'reset'),
    (r'total coordinate cache flush', 'full coordinate reset'),
    (r'stale structural priors', 'outdated positional maps'),
    (r'stale, distorted positional maps', 'distorted positional maps'),
    (r'legacy coordinate caches', 'accumulated coordinate errors'),
    (r'legacy coordinate exceptions', 'residual coordinate errors'),
    (r'coordinate caches', 'coordinate maps'),
    
    # User Space / User Application
    (r'[Uu]ser [Ss]pace', 'conscious control'),
    (r'[Uu]ser application', 'conscious effort'),
    
    # Compile / binary / hex
    (r'production binary', 'finished product'),
    (r'pre-compiled crash script', 'pre-programmed protective reflex'),
    (r'compiled hex code', 'finished code'),
    (r'trying to compile a production binary by typing the compiled hex code directly into a text editor', 'trying to force the end result without running the process that produces it'),
    
    # Hardware
    (r'personal hardware', 'own body'),
    (r'local hardware', 'body'),
    (r'on your body\.', '.', ),
    
    # Overhead
    (r'[Hh]igh-overhead', 'demanding'),
    (r'[Ll]ow-overhead', 'gentle'),
    (r'high-overhead user application', 'demanding conscious effort'),
    
    # Integration path
    (r'integration path', 'development path'),
    
    # System / codebase
    (r'optimized system', 'refined system'),
    (r'the system is running', 'the body is running'),
    
    # "patch" language in smoke tests
    (r'the adjustment has taken hold\.', 'the change has taken hold.'),
    
    # Tactical / military
    (r'high-speed tactical retreat', 'rapid protective retreat'),
    
    # Gamma noise
    (r'high-frequency Gamma noise', 'high-frequency neural noise'),
]

def clean_chapter(content):
    for pattern, replacement in REPLACEMENTS:
        content = re.sub(pattern, replacement, content, flags=re.IGNORECASE if 'CPU' not in pattern else 0)
    
    # Clean up whitespace
    content = re.sub(r'\n{3,}', '\n\n', content)
    
    return content


def main():
    chapters = sorted(glob.glob(os.path.join(BRIEFS_DIR, "chapter-*.md")))
    
    for ch_path in chapters:
        filename = os.path.basename(ch_path)
        with open(ch_path) as f:
            content = f.read()
        
        cleaned = clean_chapter(content)
        
        with open(ch_path, 'w') as f:
            f.write(cleaned)
    
    print(f"📊 Processed {len(chapters)} chapters")


if __name__ == "__main__":
    main()
