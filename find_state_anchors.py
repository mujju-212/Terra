import xml.etree.ElementTree as ET
import re

tree = ET.parse('public/images/india_official_map.svg')
root = tree.getroot()

def get_centroid(d_str):
    nums = [float(x) for x in re.findall(r'[-+]?\d*\.?\d+', d_str)]
    xs, ys = [], []
    # If absolute or relative, approximate bounding box
    cur_x, cur_y = 0.0, 0.0
    tokens = re.findall(r'([a-zA-Z])|([-+]?\d*\.?\d+)', d_str)
    cmd = ''
    i = 0
    while i < len(tokens):
        c, n = tokens[i]
        if c:
            cmd = c
            i += 1
        elif n:
            val = float(n)
            if cmd in 'ML':
                cur_x = val
                if i + 1 < len(tokens) and tokens[i+1][1]:
                    cur_y = float(tokens[i+1][1])
                    xs.append(cur_x); ys.append(cur_y)
                    i += 2
                else:
                    i += 1
            elif cmd in 'ml':
                cur_x += val
                if i + 1 < len(tokens) and tokens[i+1][1]:
                    cur_y += float(tokens[i+1][1])
                    xs.append(cur_x); ys.append(cur_y)
                    i += 2
                else:
                    i += 1
            else:
                i += 1
        else:
            i += 1
    if xs and ys:
        return sum(xs)/len(xs), sum(ys)/len(ys), min(xs), max(xs), min(ys), max(ys)
    return None

country_group = None
for g in root.iter('{http://www.w3.org/2000/svg}g'):
    if g.attrib.get('id') == 'layercountry_1_':
        country_group = g
        break

state_centroids = {}
for p in country_group.iter('{http://www.w3.org/2000/svg}path'):
    full_id = p.attrib.get('id', '')
    state_name = full_id.split('.')[0].replace('_', ' ')
    d = p.attrib.get('d', '')
    res = get_centroid(d)
    if res:
        cx, cy, min_x, max_x, min_y, max_y = res
        if state_name not in state_centroids or (max_x - min_x) > (state_centroids[state_name]['max_x'] - state_centroids[state_name]['min_x']):
            state_centroids[state_name] = {'cx': cx, 'cy': cy, 'min_x': min_x, 'max_x': max_x, 'min_y': min_y, 'max_y': max_y}

print("State Anchor Points (1500x1615):")
for name in sorted(state_centroids.keys()):
    c = state_centroids[name]
    print(f"  {name:25s} -> Centroid: ({c['cx']:.1f}, {c['cy']:.1f}), X:[{c['min_x']:.1f}-{c['max_x']:.1f}], Y:[{c['min_y']:.1f}-{c['max_y']:.1f}]")
