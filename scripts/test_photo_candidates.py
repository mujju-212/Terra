import urllib.request
import os
from PIL import Image

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

candidates = {
    'agri_sprinkler_1': 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=1200&h=675&q=88',
    'agri_sprinkler_2': 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&h=675&q=88',
    'industry_towers_1': 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=1200&h=675&q=88',
    'industry_towers_2': 'https://images.unsplash.com/photo-1509390144018-eeaf65011f07?auto=format&fit=crop&w=1200&h=675&q=88',
    'domestic_tap_1': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&h=675&q=88',
    'recreation_kayak_1': 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&h=675&q=88',
    'recreation_kayak_2': 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&h=675&q=88',
}

os.makedirs('scratch/test_candidates', exist_ok=True)

for name, url in candidates.items():
    out = f'scratch/test_candidates/{name}.jpg'
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=12) as resp:
            data = resp.read()
            with open(out, 'wb') as f:
                f.write(data)
            im = Image.open(out)
            print(f"Downloaded {name}: {im.size}, {len(data)} bytes")
    except Exception as e:
        print(f"Failed {name}: {e}")
