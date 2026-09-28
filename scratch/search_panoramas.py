import urllib.request
import urllib.parse
import json
import os

headers = {'User-Agent': 'TerraApp/1.0 (educational; contact@terra.local)'}

queries = [
    'Moselle valley panorama',
    'Rhine valley panorama',
    'Columbia River Gorge panorama',
    'Wachau panorama Danube',
    'Lake Geneva panorama mountains',
    'Lake Annecy panorama mountains',
    'Innsbruck Inn river panorama',
    'Queenstown lake mountains panorama',
    'aerial river valley mountains panorama'
]

results = []
for q in queries:
    url = f'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch={urllib.parse.quote(q)}&gsrnamespace=6&gsrlimit=6&prop=imageinfo&iiprop=url|size|mime&format=json'
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            for pid, p in data.get('query', {}).get('pages', {}).items():
                ii = p.get('imageinfo', [{}])[0]
                w = ii.get('width', 0)
                h = ii.get('height', 0)
                mime = ii.get('mime', '')
                if 'image/jpeg' in mime and w >= 2500 and w > h * 1.6:
                    results.append({
                        'title': p.get('title'),
                        'w': w,
                        'h': h,
                        'ratio': round(w/h, 2),
                        'url': ii.get('url')
                    })
    except Exception as e:
        print('Error with', q, e)

print(f"Found {len(results)} panoramas:")
for r in results[:15]:
    print(r['title'], f"{r['w']}x{r['h']}", r['url'])
