from PIL import Image
import os

uploads_dir = r"C:\Users\User\.gemini\antigravity-ide\brain\148e8935-5a26-4ccb-abdb-f89b1f30450d\.user_uploaded"
hero_path = os.path.join(uploads_dir, "media_1790626313875.jpg")
motivation_path = os.path.join(uploads_dir, "media_1790626226148.jpg")
modules_path = os.path.join(uploads_dir, "media_1790626246571.jpg")

hero_img = Image.open(hero_path)
mot_img = Image.open(motivation_path)
mod_img = Image.open(modules_path)

print("Hero size:", hero_img.size)
print("Motivation size:", mot_img.size)
print("Modules size:", mod_img.size)

# Ensure public/images directory exists
os.makedirs("public/images", exist_ok=True)

# 1. Save hero landscape backdrop (mountains, river, valley)
# Hero width 1920 or similar. Let's crop the bottom 60% of hero_img or lower mountain landscape
w, h = hero_img.size
hero_landscape = hero_img.crop((0, int(h * 0.38), w, h))
hero_landscape.save("public/images/hero-mountains-valley.jpg", quality=92)
print("Saved hero-mountains-valley.jpg")

# 2. Extract the 5 cards from modules_img
mw, mh = mod_img.size
print("Modules image dimensions:", mw, mh)

# In modules_img:
# Top row has 3 cards:
# Card 1 (Land): ~0.03*w to 0.44*w, ~0.30*h to 0.61*h
# Card 2 (Water): ~0.45*w to 0.68*w, ~0.30*h to 0.61*h
# Card 3 (Air): ~0.69*w to 0.97*w, ~0.30*h to 0.61*h
# Bottom row has 2 cards:
# Card 4 (Bio): ~0.03*w to 0.57*w, ~0.62*h to 0.90*h
# Card 5 (Warming): ~0.58*w to 0.97*w, ~0.62*h to 0.90*h

card_land = mod_img.crop((int(mw * 0.032), int(mh * 0.305), int(mw * 0.442), int(mh * 0.608)))
card_water = mod_img.crop((int(mw * 0.449), int(mh * 0.305), int(mw * 0.680), int(mh * 0.608)))
card_air = mod_img.crop((int(mw * 0.689), int(mh * 0.305), int(mw * 0.972), int(mh * 0.608)))
card_bio = mod_img.crop((int(mw * 0.032), int(mh * 0.622), int(mw * 0.569), int(mh * 0.898)))
card_warming = mod_img.crop((int(mw * 0.578), int(mh * 0.622), int(mw * 0.972), int(mh * 0.898)))

card_land.save("public/images/card-ref-land.jpg", quality=92)
card_water.save("public/images/card-ref-water.jpg", quality=92)
card_air.save("public/images/card-ref-air.jpg", quality=92)
card_bio.save("public/images/card-ref-bio.jpg", quality=92)
card_warming.save("public/images/card-ref-warming.jpg", quality=92)
print("Saved all 5 reference card images successfully!")
