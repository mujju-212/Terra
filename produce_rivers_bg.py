import cv2
import numpy as np

src_path = r'C:\Users\User\.gemini\antigravity-ide\brain\8c989d6d-1f0f-44bc-8e3c-99725b502680\.user_uploaded\media_1790802373610.jpg'
img = cv2.imread(src_path)
h, w = img.shape[:2]
print(f"Source size: {w}x{h}")

# We will create a high-quality clean background
# Background color #04090c in BGR is (12, 9, 4)
bg_color = np.array([12, 9, 4], dtype=np.float32)
img_float = img.astype(np.float32)

alpha = np.zeros((h, w), dtype=np.float32)

# 1. Top bar: y: 0 to 45 (smooth fade to 0 at y=55)
for y in range(55):
    if y <= 38:
        a = 1.0
    else:
        a = 1.0 - (y - 38) / 17.0
    alpha[y, :] = np.maximum(alpha[y, :], a)

# 2. Left zone: x: 0 to 435 (rail + header + left cards)
# Map starts at x ~ 445 (Indus basin left edge is at x=465)
for x in range(455):
    if x <= 425:
        a = 1.0
    else:
        a = 1.0 - (x - 425) / 30.0
    alpha[:, x] = np.maximum(alpha[:, x], a)

# 3. Top-right quote card area: x: 805 to w, y: 40 to 125
for y in range(35, 130):
    for x in range(790, w):
        if x >= 815:
            ax = 1.0
        else:
            ax = (x - 790) / 25.0
        if y >= 45 and y <= 118:
            ay = 1.0
        elif y < 45:
            ay = (y - 35) / 10.0
        else:
            ay = 1.0 - (y - 118) / 12.0
        alpha[y, x] = np.maximum(alpha[y, x], ax * ay)

# 4. Right River Details card area: x: 790 to w, y: 135 to 430
for y in range(130, 435):
    for x in range(780, w):
        if x >= 805:
            ax = 1.0
        else:
            ax = (x - 780) / 25.0
        if y >= 145 and y <= 420:
            ay = 1.0
        elif y < 145:
            ay = (y - 130) / 15.0
        else:
            ay = 1.0 - (y - 420) / 15.0
        alpha[y, x] = np.maximum(alpha[y, x], ax * ay)

# 5. Bottom card area: y: 425 to h, x: 0 to w
for y in range(420, h):
    if y >= 435:
        a = 1.0
    else:
        a = (y - 420) / 15.0
    alpha[y, :] = np.maximum(alpha[y, :], a)

# Smooth alpha map with Gaussian Blur
alpha = cv2.GaussianBlur(alpha, (15, 15), 0)

# Blend
alpha_3d = np.repeat(alpha[:, :, np.newaxis], 3, axis=2)
blended = img_float * (1.0 - alpha_3d) + bg_color * alpha_3d
blended = np.clip(blended, 0, 255).astype(np.uint8)

# Upscale to high-res 1920x1080 for ultra-crisp display on retina/modern screens
high_res = cv2.resize(blended, (1920, 1080), interpolation=cv2.INTER_LANCZOS4)

out_path = 'public/images/water-ch04-rivers-bg.jpg'
cv2.imwrite(out_path, high_res, [cv2.IMWRITE_JPEG_QUALITY, 96])
print(f"Generated clean high-res rivers background to {out_path} ({high_res.shape})!")
