import subprocess
import os
from collections import defaultdict

out = subprocess.check_output(['git', 'status', '--porcelain'], text=True)
lines = [l.strip() for l in out.splitlines() if l.strip()]

categories = defaultdict(list)
for l in lines:
    status = l[:2].strip()
    fname = l[2:].strip().strip('"')
    
    fn_lower = fname.lower()
    if 'water' in fn_lower or 'aquifer' in fn_lower or 'gw-' in fn_lower or 'groundwater' in fn_lower or 'ibwt' in fn_lower or 'river' in fn_lower or 'seawater' in fn_lower:
        categories['water'].append((status, fname))
    elif 'air' in fn_lower or 'aqi' in fn_lower or 'smoke' in fn_lower:
        categories['air'].append((status, fname))
    elif 'bio' in fn_lower:
        categories['bio'].append((status, fname))
    elif 'resource' in fn_lower or 'pdf' in fn_lower or 'notes' in fn_lower:
        categories['resources'].append((status, fname))
    elif 'three' in fn_lower or 'texture' in fn_lower or 'earth' in fn_lower or 'continent' in fn_lower or 'nearviewport' in fn_lower:
        categories['three_planet'].append((status, fname))
    elif 'land' in fn_lower or 'soil' in fn_lower or 'deforest' in fn_lower:
        categories['land'].append((status, fname))
    elif 'quiz' in fn_lower:
        categories['quiz'].append((status, fname))
    elif fname.endswith('.py') or fname.endswith('.cjs') or fname.endswith('.mjs') or 'scratch' in fn_lower or 'scripts' in fn_lower:
        categories['scripts_cleanup'].append((status, fname))
    elif 'nav' in fn_lower or 'footer' in fn_lower or 'app.tsx' in fn_lower or 'index' in fn_lower or 'about' in fn_lower or 'landing' in fn_lower or 'vite' in fn_lower or 'tsconfig' in fn_lower:
        categories['ui_nav_core'].append((status, fname))
    else:
        categories['misc'].append((status, fname))

for cat, items in sorted(categories.items()):
    print(f"=== {cat} ({len(items)} files) ===")
    for s, f in items[:10]:
        print(f"  [{s}] {f}")
    if len(items) > 10:
        print(f"  ... and {len(items)-10} more")
