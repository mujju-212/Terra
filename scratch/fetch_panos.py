import urllib.request
import urllib.parse
import json
import time
import os
from PIL import Image

headers = {'User-Agent': 'TerraEducationalProject/1.0 (https://terra-app.org; contact@terra-app.org)'}

queries = [
    'panoramic view river valley mountains village',
    'aerial view river valley green agriculture mountains',
    'panoramic landscape river agricultural fields mountains',
    'view over river valley mountains town sunny',
    'Inn valley panorama Austria Alps',
    'Rhine valley panorama vineyards river town',
    'Moselle valley panorama vineyards river',
    'Danube valley panorama Wachau river'
]

os.makedirs('scratch/panos', exist_ok=True)

found_urls = []
for q in queries:
    url = f'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch={urllib.parse.quote(q)}&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url|size|mime&format=json'
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            for pid, p in data.get('query', {}).get('pages', {}).items():
                ii = p.get('imageinfo', [{}])[0]
                w = ii.get('width', 0)
                h = ii.get('height', 0)
                mime = ii.get('mime', '')
                if 'image/jpeg' in mime and w >= 2500 and (w / h) >= 1.6:
                    title = p.get('title', '')
                    found_urls.append((title, w, h, ii.get('url')))
    except Exception as e:
        print('Error:', q, e)
    time.sleep(0.5)

print(f"Total matching images: {len(found_urls)}")

# Download top 8 images to scratch/panos/
count = 0
for title, w, h, img_url in found_urls:
    if count >= 8:
        break
    clean_name = "".join(c for c in title if c.isalnum() or c in (' ', '_', '-')).strip()[:35]
    out_file = f"scratch/panos/p_{count}_{clean_name}.jpg"
    try:
        req = urllib.request.Request(img_url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
            with open(out_file, 'wb') as f:
                f.write(data)
            im = Image.open(out_file)
            print(f"[{count}] Saved {out_file}: {im.size} ({len(data)} bytes)")
            count += 1
    except Exception as e:
        print(f"Failed {title}: {e}")
    time.sleep(1.0)
