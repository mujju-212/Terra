import os
from PIL import Image

# Increase decompression bomb limit for high-res maps
Image.MAX_IMAGE_PIXELS = None

src_dir = 'textures'
dst_dir = os.path.join('public', 'earth')
os.makedirs(dst_dir, exist_ok=True)

files = [
    ('earth albedo.jpg', 'earth-albedo.jpg', 8192, 4096),
    ('clouds earth.png', 'earth-clouds.png', 4096, 2048),
    ('earth land ocean mask.png', 'earth-ocean-mask.png', 8192, 4096),
    ('earth night_lights_modified.png', 'earth-night.png', 8192, 4096),
    ('earth bump.jpg', 'earth-bump.jpg', 8192, 4096),
]

for src_name, dst_name, target_w, target_h in files:
    src_path = os.path.join(src_dir, src_name)
    dst_path = os.path.join(dst_dir, dst_name)
    print(f"Processing {src_name} -> {dst_name} ({target_w}x{target_h})...")
    
    with Image.open(src_path) as img:
        w, h = img.size
        if w > target_w or h > target_h:
            print(f"  Downsampling from {w}x{h} to {target_w}x{target_h}...")
            resampled = img.resize((target_w, target_h), Image.Resampling.LANCZOS)
            if dst_name.endswith('.jpg'):
                resampled.save(dst_path, 'JPEG', quality=92, optimize=True)
            else:
                resampled.save(dst_path, 'PNG', optimize=True)
        else:
            print(f"  Saving at original resolution {w}x{h}...")
            if dst_name.endswith('.jpg'):
                img.save(dst_path, 'JPEG', quality=92, optimize=True)
            else:
                img.save(dst_path, 'PNG', optimize=True)
                
    stat = os.stat(dst_path)
    print(f"  [OK] Saved {dst_name}: {(stat.st_size / 1024 / 1024):.2f} MB")

print("All user earth textures processed successfully into public/earth/!")
