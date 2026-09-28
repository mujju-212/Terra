import xml.etree.ElementTree as ET
import re

tree = ET.parse('public/images/india_official_map.svg')
root = tree.getroot()

# Function to parse coordinates from SVG path d attribute
def extract_coords(d_str):
    coords = []
    # Find all float pairs
    numbers = [float(x) for x in re.findall(r'[-+]?\d*\.?\d+', d_str)]
    # Pair numbers
    for i in range(0, len(numbers) - 1, 2):
        coords.append((numbers[i], numbers[i+1]))
    return coords

country_group = root.find('.//*[@id="layercountry_1_"]')
min_x, min_y = 1e9, 1e9
max_x, max_y = -1e9, -1e9

for p in country_group.findall('.//{http://www.w3.org/2000/svg}path'):
    d = p.attrib.get('d', '')
    for x, y in extract_coords(d):
        min_x = min(min_x, x)
        max_x = max(max_x, x)
        min_y = min(min_y, y)
        max_y = max(max_y, y)

print(f"India Country Bounding Box: X:[{min_x}, {max_x}], Y:[{min_y}, {max_y}]")
print(f"Width: {max_x - min_x}, Height: {max_y - min_y}")
