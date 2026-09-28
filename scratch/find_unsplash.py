import urllib.request
import urllib.parse
import re
import os
from PIL import Image

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

queries = [
    'wide-river-valley-mountains',
    'river-valley-landscape',
    'aerial-river-valley-mountains',
    'panoramic-river-mountains'
]

photo_ids = []
for q in queries:
    url = f'https://unsplash.com/s/photos/{q}'
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=12) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            # Look for photo urls: images.unsplash.com/photo-XXXXX
            found = re.findall(r'https://images\.unsplash\.com/photo-([a-zA-Z0-9_-]+)\?', html)
            for f_id in found:
                if f_id not in photo_ids and len(f_id) > 5:
                    photo_ids.append(f_id)
    except Exception as e:
        print(f"Error {q}: {e}")

print(f"Total photos found: {len(photo_ids)}")

os.makedirs('scratch/candidates_unsplash', exist_ok=True)

# Download the top 10 at 1920x1080 resolution
for i, pid in enumerate(photo_ids[:10]):
    img_url = f"https://images.unsplash.com/photo-{pid}?auto=format&fit=crop&w=1920&h=1080&q=85"
    out_path = f"scratch/candidates_unsplash/photo_{i}_{pid[:8]}.jpg"
    try:
        req = urllib.request.Request(img_url, headers=headers)
        with urllib.request.urlopen(req, timeout=12) as resp:
            data = resp.read()
            with open(out_path, 'wb') as f:
                f.write(data)
            im = Image.open(out_path)
            print(f"[{i}] Downloaded {out_path}: {im.size} ({len(data)} bytes)")
    except Exception as e:
        print(f"[{i}] Failed {pid}: {e}")
