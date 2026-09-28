from PIL import Image
import numpy as np

bump = Image.open('public/earth/earth-bump.jpg')
arr = np.array(bump)
print('Bump min:', arr.min(), 'max:', arr.max(), 'mean:', arr.mean())

# Check max elevation locations (e.g. Himalayas, Andes)
print('Top 0.01% value:', np.percentile(arr, 99.99))
print('Top 1% value:', np.percentile(arr, 99.0))
print('Median:', np.median(arr))
