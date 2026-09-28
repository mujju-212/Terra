import cv2
import numpy as np

# Load original user mockup (1024x576)
src_path = r'C:/Users/User/.gemini/antigravity-ide/brain/1ca437ba-8124-49a4-95f2-124ac3a8e2ba/.user_uploaded/media_1790795900928.jpg'
orig = cv2.imread(src_path)
h, w = orig.shape[:2]

canvas = orig.copy()

# =========================================================================
# STEP 1: Surgical Inpaint of Bright Text in Pins
# =========================================================================
pins_coords = [
    (54, 92, 615, 715),
    (145, 185, 505, 580),
    (78, 118, 850, 930),
    (170, 210, 720, 820),
    (285, 328, 582, 670),
    (305, 348, 788, 890),
    (150, 192, 918, 998),
    (258, 302, 930, 1008),
]

gray = cv2.cvtColor(orig, cv2.COLOR_BGR2GRAY)
bright_mask = cv2.threshold(gray, 170, 255, cv2.THRESH_BINARY)[1]
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
bright_mask = cv2.dilate(bright_mask, kernel, iterations=1)

pins_mask = np.zeros((h, w), dtype=np.uint8)
for y1, y2, x1, x2 in pins_coords:
    pins_mask[y1:y2, x1:x2] = bright_mask[y1:y2, x1:x2]

canvas = cv2.inpaint(canvas, pins_mask, 3, cv2.INPAINT_TELEA)

# =========================================================================
# STEP 2: Smooth Sky for Top Bar (y: 0 to 48)
# Create a smooth horizontal gradient matching the sky colors
# =========================================================================
# Left sky color: [75, 45, 18] (BGR)
# Mid sky color: [140, 95, 45] (BGR)
# Right sunlit sky: [195, 235, 255] (BGR)
for x in range(w):
    t_x = x / float(w)
    if t_x < 0.55:
        sub_t = t_x / 0.55
        col = (1.0 - sub_t) * np.array([75, 45, 18]) + sub_t * np.array([140, 95, 45])
    else:
        sub_t = (t_x - 0.55) / 0.45
        col = (1.0 - sub_t) * np.array([140, 95, 45]) + sub_t * np.array([195, 235, 255])
    
    for y in range(48):
        # Don't overwrite the mountain peak at x: 535 to 615
        if 535 <= x <= 615 and np.mean(orig[y, x]) < 95:
            continue
        # Atmospheric vertical ramp: slightly deeper at top y=0
        vert_factor = 0.82 + 0.18 * (y / 48.0)
        canvas[y, x] = np.clip(col * vert_factor, 0, 255).astype(np.uint8)

# Blur the transition line around y=48
canvas[44:52, :] = cv2.GaussianBlur(canvas[44:52, :], (5, 5), 0)

# =========================================================================
# STEP 3: Left Hero Area (x: 0 to 540, y: 48 to 345)
# Solid dark slate at x: 0 to 220 (100% hides any ghost text or cards)
# Smoothly fades from x: 220 to 540 into natural landscape
# =========================================================================
dark_bg = np.array([14, 11, 9], dtype=np.float32)

for y in range(48, 345):
    for x in range(0, 540):
        if x <= 220:
            # 100% solid dark slate
            canvas[y, x] = [14, 11, 9]
        else:
            # Smooth fade from x=220 to x=540
            t_fade = (x - 220) / (540.0 - 220.0) # 0 to 1
            t_smooth = t_fade * t_fade * (3 - 2 * t_fade)
            
            orig_col = canvas[y, x].astype(np.float32)
            canvas[y, x] = np.clip((1.0 - t_smooth) * dark_bg + t_smooth * orig_col, 0, 255).astype(np.uint8)

# =========================================================================
# STEP 4: Lower Section (y: 345 to 576)
# Smooth dark foundation for the 8 cards
# =========================================================================
start_y = 345
for y in range(start_y, h):
    t = (y - start_y) / float(h - start_y)
    t_smooth = t * t * (3 - 2 * t)
    
    r = int((1.0 - t_smooth) * 28.0 + t_smooth * 12.0)
    g = int((1.0 - t_smooth) * 30.0 + t_smooth * 14.0)
    b = int((1.0 - t_smooth) * 26.0 + t_smooth * 16.0)
    
    canvas[y, :] = [b, g, r]

# =========================================================================
# STEP 5: Upscale to 1920x1080 with Lanczos-4 & Organic Grain
# =========================================================================
final_1080 = cv2.resize(canvas, (1920, 1080), interpolation=cv2.INTER_LANCZOS4)

np.random.seed(789)
grain = np.random.normal(0, 0.6, (1080, 1920, 3)).astype(np.float32)
output_img = np.clip(final_1080.astype(np.float32) + grain, 0, 255).astype(np.uint8)

out_file = 'public/images/landforms-hero-clean.jpg'
cv2.imwrite(out_file, output_img, [cv2.IMWRITE_JPEG_QUALITY, 98])
print(f"Generated flawless landforms panorama: {out_file}")
