from PIL import Image

clouds = Image.open('public/earth/earth-clouds.png')
print('Clouds Mode:', clouds.mode, 'Size:', clouds.size)
p = clouds.getpixel((int(clouds.width * 0.5), int(clouds.height * 0.5)))
print('Sample Cloud Pixel:', p)
