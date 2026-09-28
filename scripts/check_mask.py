from PIL import Image

img = Image.open('public/earth/earth-ocean-mask.png')
print('Mode:', img.mode, 'Size:', img.size)

# Sample Pacific (approx 75% width, 50% height) and Africa (approx 55% width, 50% height)
p_ocean = img.getpixel((int(img.width * 0.75), int(img.height * 0.5)))
p_land = img.getpixel((int(img.width * 0.55), int(img.height * 0.5)))
print('Pacific Ocean pixel:', p_ocean)
print('Africa Land pixel:', p_land)

bump = Image.open('public/earth/earth-bump.jpg')
print('Bump Mode:', bump.mode, 'Size:', bump.size)
p_ocean_bump = bump.getpixel((int(bump.width * 0.75), int(bump.height * 0.5)))
p_himalaya_bump = bump.getpixel((int(bump.width * 0.72), int(bump.height * 0.35)))
print('Ocean Bump pixel:', p_ocean_bump)
print('Himalaya Bump pixel:', p_himalaya_bump)
