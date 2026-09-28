import xml.etree.ElementTree as ET

tree = ET.parse('public/images/india_official_map.svg')
root = tree.getroot()

def summarize_layer(layer_id):
    elem = root.find(f'.//*[@id="{layer_id}"]')
    if elem is not None:
        paths = elem.findall('.//{http://www.w3.org/2000/svg}path')
        polygons = elem.findall('.//{http://www.w3.org/2000/svg}polygon')
        print(f'{layer_id}: {len(paths)} paths, {len(polygons)} polygons')
        if paths:
            print(f'  First path d len: {len(paths[0].attrib.get("d", ""))}')
            print(f'  First path d snippet: {paths[0].attrib.get("d", "")[:80]}...')
    else:
        print(f'{layer_id} not found')

for l in ['layercountry_1_', 'layerrBoundaries', 'layeriBoundaries', 'layerriver', 'layercoastline']:
    summarize_layer(l)
