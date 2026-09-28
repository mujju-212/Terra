import cv2
import numpy as np

# Load original user mockup (1024x576)
src_path = r'C:/Users/User/.gemini/antigravity-ide/brain/1ca437ba-8124-49a4-95f2-124ac3a8e2ba/.user_uploaded/media_1790795900928.jpg'
orig = cv2.imread(src_path)
h, w = orig.shape[:2]

canvas = orig.copy().astype(np.float32)

# =========================================================================
# 1. TOP HEADER CLEANING (y: 0 to 48)
# Replaces "TERRA", "Modules", "About", "Quiz", "Resources", search bar
# with pure, clean continuous sky and mountain peaks
# =========================================================================
# For x: 0 to w, y: 0 to 48:
# Notice at y=48, we have clean blue sky (left to mid) and golden sky (right)
# Sample y=48 and replicate upwards with natural atmospheric gradient
for y in range(48):
    factor = 0.88 + 0.12 * (y / 48.0)
    for x in range(w):
        # Don't overwrite sharp mountain peaks that reach y < 48 (around x: 520 to 620)
        # Check if pixel at (y, x) is a dark mountain peak rather than sky:
        # Sky is bright blue or white/gold: B > 120 or (R > 180 and G > 160)
        orig_px = orig[y, x]
        is_mountain = (orig_px[0] < 90 and orig_px[1] < 90 and orig_px[2] < 90)
        if 510 <= x <= 630 and is_mountain:
            continue
        
        # Sample clean sky from y=49
        sky_ref = orig[49, x].astype(np.float32)
        canvas[y, x] = sky_ref * factor

# =========================================================================
# 2. INPAINT TEXT CHARACTERS INSIDE THE 8 PINS & CONNECTOR DOTS
# Inpaint ONLY the bright text characters and white connector dots (1-2px)
# so the background scenery has ZERO smudges!
# =========================================================================
pins_coords = [
    # (name, y1, y2, x1, x2)
    ('Mountain', 54, 90, 615, 710),
    ('Forest', 148, 185, 505, 580),
    ('Tundra', 78, 115, 850, 928),
    ('Grassland', 170, 208, 720, 818),
    ('Wetland', 288, 325, 582, 668),
    ('Agriculture', 308, 345, 788, 888),
    ('Desert', 152, 190, 918, 995),
    ('Urban', 260, 300, 930, 1005),
]

# Create a surgical text mask for pins:
# Inside each pin bounding box, detect high-luminance text pixels (L > 180 or white dot)
text_mask = np.zeros((h, w), dtype=np.uint8)

for name, y1, y2, x1, x2 in pins_coords:
    sub = orig[y1:y2, x1:x2]
    gray_sub = cv2.cvtColor(sub, cv2.COLOR_BGR2GRAY)
    # Text characters are bright white or pastel
    thresh_sub = cv2.threshold(gray_sub, 175, 255, cv2.THRESH_BINARY)[1]
    # Also dilate by 1px to cover font edges
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    thresh_sub = cv2.dilate(thresh_sub, kernel, iterations=1)
    text_mask[y1:y2, x1:x2] = thresh_sub

# Inpaint just the text pixels with small 3px radius!
canvas_uint8 = np.clip(canvas, 0, 255).astype(np.uint8)
canvas_uint8 = cv2.inpaint(canvas_uint8, text_mask, 3, cv2.INPAINT_TELEA)

# Now, also inpaint the pin badge backgrounds so they fade seamlessly into the landscape:
# For each pin, blend its interior with the surrounding landscape color
for name, y1, y2, x1, x2 in pins_coords:
    # Get average surrounding color
    border_px = []
    if y1 > 5: border_px.append(canvas_uint8[y1-3:y1, x1:x2])
    if y2 < h-5: border_px.append(canvas_uint8[y2:y2+3, x1:x2])
    if x1 > 5: border_px.append(canvas_uint8[y1:y2, x1-3:x1])
    if x2 < w-5: border_px.append(canvas_uint8[y1:y2, x2:x2+3])
    
    if len(border_px) > 0:
        avg_col = np.mean(np.concatenate([p.reshape(-1, 3) for p in border_px], axis=0), axis=0)
        # Soft blend into badge interior
        badge_mask = np.zeros((y2-y1, x2-x1), dtype=np.float32)
        cy, cx = (y2-y1)/2.0, (x2-x1)/2.0
        for by in range(y2-y1):
            for bx in range(x2-x1):
                # Normalized distance from center
                dy = (by - cy) / cy
                dx = (bx - cx) / cx
                d = dx*dx + dy*dy
                if d < 1.0:
                    badge_mask[by, bx] = (1.0 - d)**0.5
        
        # Apply soft blend
        for c in range(3):
            canvas_uint8[y1:y2, x1:x2, c] = np.clip(
                (1.0 - badge_mask * 0.75) * canvas_uint8[y1:y2, x1:x2, c] +
                (badge_mask * 0.75) * avg_col[c], 0, 255
            ).astype(np.uint8)

# =========================================================================
# 3. LEFT HERO AREA (Title, Paragraph, 4 Factor Cards, Left Rail)
# x: 0 to 570, y: 45 to 345
# Smoothly darkens the left side for 100% typography contrast!
# =========================================================================
left_clean = canvas_uint8.copy().astype(np.float32)
for x in range(0, 570):
    t_x = 1.0 - (x / 570.0)
    # Smooth Hermite curve
    t_smooth = t_x * t_x * (3 - 2 * t_x)
    
    dark_tone = np.array([12, 10, 8], dtype=np.float32) # deep dark slate
    # At x=0: 88% dark slate, fading smoothly to 0% at x=570
    weight = t_smooth * 0.88
    
    for y in range(45, 345):
        left_clean[y, x] = (1.0 - weight) * left_clean[y, x] + weight * dark_tone

canvas_uint8 = np.clip(left_clean, 0, 255).astype(np.uint8)

# =========================================================================
# 4. LOWER SECTION (y: 345 to 576)
# Smooth, luxurious dark gradient (#0a0d10) where the 8 cards sit.
# ZERO ghost text, ZERO residual boxes, ZERO cards!
# =========================================================================
start_y = 345
for y in range(start_y, h):
    t = (y - start_y) / float(h - start_y)
    t_smooth = t * t * (3 - 2 * t)
    
    # At y=345: deep moss/earth tone [24, 28, 30]
    # At y=576: deep slate tone [14, 11, 9]
    r = int((1.0 - t_smooth) * 28.0 + t_smooth * 12.0)
    g = int((1.0 - t_smooth) * 30.0 + t_smooth * 14.0)
    b = int((1.0 - t_smooth) * 26.0 + t_smooth * 16.0)
    
    canvas_uint8[y, :] = [b, g, r]

# =========================================================================
# 5. UPSCALE TO 1920x1080 WITH LANCZOS-4
# Add subtle organic film grain to prevent OLED banding
# =========================================================================
final_1080 = cv2.resize(canvas_uint8, (1920, 1080), interpolation=cv2.INTER_LANCZOS4)

np.random.seed(4242)
grain = np.random.normal(0, 0.6, (1080, 1920, 3)).astype(np.float32)
output_img = np.clip(final_1080.astype(np.float32) + grain, 0, 255).astype(np.uint8)

out_file = 'public/images/landforms-hero-clean.jpg'
cv2.imwrite(out_file, output_img, [cv2.IMWRITE_JPEG_QUALITY, 97])
print(f"Generated pristine clean landforms panorama: {out_file}")
