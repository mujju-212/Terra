from PIL import Image

src_path = r'C:\Users\User\.gemini\antigravity-ide\brain\8c989d6d-1f0f-44bc-8e3c-99725b502680\.user_uploaded\media_1790802373610.jpg'
img = Image.open(src_path)
print("media_1790802373610.jpg dimensions:", img.size, img.mode)
