import os
import time

brain_dir = r'C:\Users\User\.gemini\antigravity-ide\brain\8c989d6d-1f0f-44bc-8e3c-99725b502680'
now = time.time()

for root, dirs, files in os.walk(brain_dir):
    for f in files:
        if f.lower().endswith(('.jpg', '.png', '.jpeg', '.webp')):
            p = os.path.join(root, f)
            try:
                mtime = os.path.getmtime(p)
                if now - mtime < 3600: # within 1 hr
                    print(f, os.path.getsize(p), time.ctime(mtime), p)
            except:
                pass
