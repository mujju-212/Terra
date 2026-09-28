import cv2
import numpy as np

# Load original user mockup (1024x576)
src_path = r'C:/Users/User/.gemini/antigravity-ide/brain/1ca437ba-8124-49a4-95f2-124ac3a8e2ba/.user_uploaded/media_1790795900928.jpg'
orig = cv2.imread(src_path)
h, w = orig.shape[:2]

clean = orig.copy()

# =========================================================================
# STEP 1: Top Navigation Bar Removal (y: 0 to 45)
# Inpaint with blue sky, clouds, and mountain peaks
# =========================================================================
top_mask = np.zeros((h, w), dtype=np.uint8)
top_mask[0:45, :] = 255
# Except keep any mountain peaks that naturally reach y < 45 (around x: 500 to 650)
top_mask[15:45, 510:630] = 0
clean = cv2.inpaint(clean, top_mask, 5, cv2.INPAINT_TELEA)

# =========================================================================
# STEP 2: Inpaint All 8 Landform Pins and Leader Lines/Dots
# =========================================================================
pins_mask = np.zeros((h, w), dtype=np.uint8)

# 1. Mountain pin: x: 625 to 705, y: 55 to 90 + line down to (622, 85)
pins_mask[55:92, 620:708] = 255

# 2. Forest pin: x: 515 to 575, y: 150 to 180 + dot at (512, 175)
pins_mask[148:185, 508:578] = 255

# 3. Tundra pin: x: 860 to 925, y: 80 to 115 + dot at (858, 112)
pins_mask[78:118, 854:928] = 255

# 4. Grassland pin: x: 735 to 815, y: 172 to 208 + dot at (728, 202)
pins_mask[170:210, 725:818] = 255

# 5. Wetland pin: x: 595 to 665, y: 288 to 325 + dot at (588, 310)
pins_mask[285:328, 585:670] = 255

# 6. Agriculture pin: x: 800 to 885, y: 308 to 345 + dot at (792, 330)
pins_mask[305:346, 790:888] = 255

# 7. Desert pin: x: 930 to 995, y: 155 to 190 + dot at (924, 182)
pins_mask[152:192, 920:998] = 255

# 8. Urban pin: x: 940 to 1005, y: 262 to 300 + dot at (935, 282)
pins_mask[260:302, 932:1008] = 255

# Inpaint all 8 pins with Navier-Stokes and Telea
clean = cv2.inpaint(clean, pins_mask, 7, cv2.INPAINT_NS)

# For Desert pin: the sand dune has a smooth gradient.
# Let's refine the desert patch with surrounding sand dune gradient
sand_patch = clean[150:195, 915:1000]
clean[150:195, 915:1000] = cv2.GaussianBlur(sand_patch, (5, 5), 0)

# =========================================================================
# STEP 3: Left Hero Area (Title, Paragraph, 4 Factor Cards, Left Rail)
# x: 0 to 520, y: 45 to 345
# Smoothly fade from deep dark (#090b0e) at x=0 into the natural landscape at x=520
# =========================================================================
# In the original, the mountain and lake are visible from x: 420 to 550
clean_landscape_slice = clean[45:345, 420:530].copy()
slice_blurred = cv2.GaussianBlur(clean_landscape_slice, (31, 31), 0)

for y in range(45, 345):
    slice_y = y - 45
    ref_col = slice_blurred[slice_y, 40].astype(np.float32)
    
    for x in range(0, 480):
        t_x = x / 480.0
        t_smooth = t_x * t_x * (3 - 2 * t_x)
        
        deep_dark = np.array([14, 11, 9], dtype=np.float32)
        ambient = ref_col
        
        # S-curve blend
        clean[y, x] = np.clip((1.0 - t_smooth) * deep_dark + t_smooth * ambient, 0, 255).astype(np.uint8)

# =========================================================================
# STEP 4: Lower Section (y: 345 to 576)
# Completely replace the lower section with a pristine, velvety dark gradient
# that flows naturally from the landscape at y=345 down to deep slate (#090b0e).
# ZERO ghost text, ZERO residual boxes, ZERO cards!
# =========================================================================
start_y = 345
for y in range(start_y, h):
    t = (y - start_y) / float(h - start_y)
    t_smooth = t * t * (3 - 2 * t)
    
    # At y=345: deep moss/earth tone [24, 28, 30]
    # At y=576: deep slate tone [14, 11, 9]
    r = (1.0 - t_smooth) * 28.0 + t_smooth * 12.0
    g = (1.0 - t_smooth) * 30.0 + t_smooth * 14.0
    b = (1.0 - t_smooth) * 26.0 + t_smooth * 16.0
    
    clean[y, :] = [int(b), int(g), int(r)]

# =========================================================================
# STEP 5: Upscale to 1920x1080 with Lanczos-4
# Add subtle organic film grain to prevent OLED banding
# =========================================================================
final_1080 = cv2.resize(clean, (1920, 1080), interpolation=cv2.INTER_LANCZOS4)

np.random.seed(1234)
grain = np.random.normal(0, 0.6, (1080, 1920, 3)).astype(np.float32)
output_img = np.clip(final_1080.astype(np.float32) + grain, 0, 255).astype(np.uint8)

out_file = 'public/images/landforms-hero-clean.jpg'
cv2.imwrite(out_file, output_img, [cv2.IMWRITE_JPEG_QUALITY, 97])
print(f"Generated clean landforms panorama at: {out_file}")
