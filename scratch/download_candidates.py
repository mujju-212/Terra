import urllib.request
import urllib.parse
import json
import os
from PIL import Image

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

candidates = [
    ('columbia_gorge_1', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/ColumbiaRiverGorgePanorama.jpg/1920px-ColumbiaRiverGorgePanorama.jpg'),
    ('columbia_vista_house', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Columbia_River_Gorge_from_Vista_House_pano_01_%2814598799745%29.jpg/1920px-Columbia_River_Gorge_from_Vista_House_pano_01_%2814598799745%29.jpg'),
    ('wachau_gochelberg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Wachau_vom_Gochelberg_20220519_01.jpg/1920px-Wachau_vom_Gochelberg_20220519_01.jpg'),
    ('wachau_vogelberg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Wachau_vom_Vogelberg_20220411_01.jpg/1920px-Wachau_vom_Vogelberg_20220411_01.jpg'),
    ('durnstein_danube', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Wachau_Durnstein_Panorama.jpg/1920px-Wachau_Durnstein_Panorama.jpg'),
]

os.makedirs('scratch/candidates', exist_ok=True)

for name, url in candidates:
    out_path = f'scratch/candidates/{name}.jpg'
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
            with open(out_path, 'wb') as f:
                f.write(data)
            im = Image.open(out_path)
            print(f"Downloaded {name}: {im.size} ({len(data)} bytes)")
    except Exception as e:
        print(f"Error {name}: {e}")
