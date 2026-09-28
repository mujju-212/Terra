import xml.etree.ElementTree as ET
import json
import re

tree = ET.parse('public/images/india_official_map.svg')
root = tree.getroot()

country_group = None
for g in root.iter('{http://www.w3.org/2000/svg}g'):
    if g.attrib.get('id') == 'layercountry_1_':
        country_group = g
        break

if country_group is None:
    print("country_group not found!")
    exit(1)

state_paths = {}
for p in country_group.iter('{http://www.w3.org/2000/svg}path'):
    full_id = p.attrib.get('id', '')
    state_name = full_id.split('.')[0].replace('_', ' ')
    d = p.attrib.get('d', '')
    if state_name not in state_paths or len(d) > len(state_paths[state_name]):
        state_paths[state_name] = d

print(f"Extracted {len(state_paths)} unique state/territory paths:")
for name in sorted(state_paths.keys())[:10]:
    print(f"  {name}: {len(state_paths[name])} chars")

# Also let's extract disputed areas (J&K north, Arunachal, etc.)
disp_paths = []
for g in root.iter('{http://www.w3.org/2000/svg}g'):
    if g.attrib.get('id') == 'layerdisputedCountries':
        for p in g.iter('{http://www.w3.org/2000/svg}path'):
            disp_paths.append(p.attrib.get('d', ''))

print(f"Extracted {len(disp_paths)} disputed/frontier paths")

# Extract coastline
coast_paths = []
for g in root.iter('{http://www.w3.org/2000/svg}g'):
    if g.attrib.get('id') == 'layercoastline':
        for p in g.iter('{http://www.w3.org/2000/svg}path'):
            d = p.attrib.get('d', '')
            if len(d) > 200: # only significant coastline sections
                coast_paths.append(d)

print(f"Extracted {len(coast_paths)} significant coastline paths")
