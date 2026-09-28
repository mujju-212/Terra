import os
from PIL import Image

img_dir = 'public/images'
files = [f for f in os.listdir(img_dir) if f.lower().endswith(('.jpg', '.png', '.webp'))]

landscapes = []
for f in files:
    p = os.path.join(img_dir, f)
    try:
        with Image.open(p) as im:
            w, h = im.size
            if w >= 1200 and w > h * 1.3:
                landscapes.append((f, w, h, round(w/h, 2), os.path.getsize(p)))
    except Exception:
        pass

landscapes.sort(key=lambda x: x[4], reverse=True)
print(f"Found {len(landscapes)} landscape images:")
for name, w, h, ratio, size in landscapes[:30]:
    print(f"{name:40s} {w}x{h} (ratio {ratio}) {size/1024:.1f} KB")
