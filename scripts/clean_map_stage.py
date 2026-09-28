import cv2
import numpy as np

img = cv2.imread('public/images/india-3d-map-stage.png')
h, w, c = img.shape
print(f"Loaded india-3d-map-stage.png: {w}x{h}")

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
mask = np.zeros((h, w), dtype=np.uint8)

# Pill regions in 680x740 coordinates:
# 1. Indus: y: 200 to 240, x: 80 to 210
# 2. Ganga: y: 255 to 295, x: 310 to 450
# 3. Brahmaputra: y: 230 to 270, x: 490 to 630
# 4. Godavari: y: 390 to 430, x: 160 to 300
# 5. Krishna: y: 490 to 535, x: 180 to 320
# 6. Cauvery: y: 575 to 615, x: 220 to 360
# 7. Top-left corner if any: y: 0 to 60, x: 0 to 160

search_zones = [
    (0, 60, 0, 160),        # Top-left corner
    (200, 245, 75, 215),    # Indus
    (250, 300, 310, 455),   # Ganga
    (225, 275, 485, 635),   # Brahmaputra
    (385, 435, 155, 305),   # Godavari
    (485, 540, 175, 325),   # Krishna
    (570, 620, 215, 365),   # Cauvery
]

for y1, y2, x1, x2 in search_zones:
    sub = gray[y1:y2, x1:x2]
    # In these zones, any pixel with brightness > 195 is residual text/pill artifact
    zone_mask = (sub > 185).astype(np.uint8) * 255
    # Dilate slightly to cover font anti-aliasing edges
    kernel = np.ones((5, 5), np.uint8)
    zone_dilated = cv2.dilate(zone_mask, kernel, iterations=2)
    mask[y1:y2, x1:x2] = np.maximum(mask[y1:y2, x1:x2], zone_dilated)

print(f"Total text artifact pixels to inpaint: {np.sum(mask > 0)}")

# Run Telea inpainting
inpainted = cv2.inpaint(img, mask, inpaintRadius=7, flags=cv2.INPAINT_TELEA)

# Also check top-left 50x50 border: fade completely into background #04090c (12, 9, 4)
for y in range(40):
    for x in range(120):
        fade = min(1.0, max(0.0, (x / 120.0 + y / 40.0) / 1.5))
        inpainted[y, x] = (inpainted[y, x].astype(np.float32) * fade + np.array([12, 9, 4], dtype=np.float32) * (1 - fade)).astype(np.uint8)

cv2.imwrite('public/images/india-3d-map-stage.png', inpainted)
print("Successfully cleaned public/images/india-3d-map-stage.png!")
