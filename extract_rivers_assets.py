import cv2
import numpy as np

src_path = r'C:\Users\User\.gemini\antigravity-ide\brain\8c989d6d-1f0f-44bc-8e3c-99725b502680\.user_uploaded\media_1790802373610.jpg'
img = cv2.imread(src_path)
h, w = img.shape[:2]
print(f"Source image: {w}x{h}")

# In 1024x576 image:
# 1. Ganga river showcase banner (top right card):
# x: ~805 to ~985, y: ~155 to ~225
crop_ganga_banner = img[152:228, 804:988]
cv2.imwrite('public/images/river-ganga-banner.jpg', crop_ganga_banner)
print("Saved river-ganga-banner.jpg:", crop_ganga_banner.shape)

# 2. Bottom 6 thumbnails:
# Bottom row is at y: ~450 to ~495
# Item 1: Indus Basin: x: ~155 to ~275
# Item 2: Ganga Basin: x: ~288 to ~408
# Item 3: Brahmaputra: x: ~420 to ~540
# Item 4: Godavari: x: ~552 to ~672
# Item 5: Krishna: x: ~684 to ~804
# Item 6: Cauvery: x: ~815 to ~935
crop_b1 = img[450:497, 155:278]
crop_b2 = img[450:497, 288:410]
crop_b3 = img[450:497, 420:542]
crop_b4 = img[450:497, 552:674]
crop_b5 = img[450:497, 684:806]
crop_b6 = img[450:497, 815:937]

cv2.imwrite('public/images/river-basin-indus-thumb.jpg', crop_b1)
cv2.imwrite('public/images/river-basin-ganga-thumb.jpg', crop_b2)
cv2.imwrite('public/images/river-basin-brahma-thumb.jpg', crop_b3)
cv2.imwrite('public/images/river-basin-godavari-thumb.jpg', crop_b4)
cv2.imwrite('public/images/river-basin-krishna-thumb.jpg', crop_b5)
cv2.imwrite('public/images/river-basin-cauvery-thumb.jpg', crop_b6)
print("Saved all 6 basin thumbnails!")
