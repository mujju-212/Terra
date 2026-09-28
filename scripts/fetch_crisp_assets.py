import urllib.request
import urllib.parse
import json
import os

headers = {'User-Agent': 'TerraEducationalBot/1.0 (https://terra-app.org; dev@terra-app.org)'}

def search_commons(query, min_w=1200):
    url = f"https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch={urllib.parse.quote(query)}&gsrlimit=12&prop=imageinfo&iiprop=url|size|mime&format=json"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data.get('query', {}).get('pages', {})
            results = []
            for pid, page in pages.items():
                ii = page.get('imageinfo', [{}])[0]
                mime = ii.get('mime', '')
                w = ii.get('width', 0)
                h = ii.get('height', 0)
                if ('image/jpeg' in mime or 'image/png' in mime) and w >= min_w and w > h:
                    results.append({
                        'title': page.get('title'),
                        'url': ii.get('url'),
                        'w': w,
                        'h': h
                    })
            return results
    except Exception as e:
        print(f"Error searching {query}: {e}")
        return []

queries = {
    'agriculture': 'center pivot irrigation sprinkler field water crops',
    'industry': 'thermal power plant cooling towers river sunset',
    'domestic': 'running tap water pouring kitchen modern',
    'recreation': 'kayaking alpine lake mountain reflection',
    'panorama': 'panoramic landscape river valley mountains'
}

for name, q in queries.items():
    res = search_commons(q)
    print(f"\n=== {name} ===")
    for r in res[:3]:
        print(f"{r['title']} ({r['w']}x{r['h']}) -> {r['url']}")
