import xml.etree.ElementTree as ET

tree = ET.parse('public/images/india_official_map.svg')
root = tree.getroot()

country_group = root.find('.//*[@id="layercountry_1_"]')
paths = country_group.findall('.//{http://www.w3.org/2000/svg}path')

print(f"Total paths in country_1_: {len(paths)}")
path_lengths = [(len(p.attrib.get('d', '')), i, p.attrib.get('id', '')) for i, p in enumerate(paths)]
path_lengths.sort(reverse=True)

print("Top 5 longest paths:")
for l, i, pid in path_lengths[:5]:
    print(f"  Path {i} (id={pid}): length {l} chars")

# Also check disputed countries (Jammu & Kashmir / Ladakh north boundary is often in layerdisputedCountries)
disp_group = root.find('.//*[@id="layerdisputedCountries"]')
if disp_group is not None:
    disp_paths = disp_group.findall('.//{http://www.w3.org/2000/svg}path')
    print(f"Disputed group paths: {len(disp_paths)}")
    for i, p in enumerate(disp_paths):
        print(f"  Disp Path {i} (id={p.attrib.get('id', '')}): len {len(p.attrib.get('d', ''))}")
