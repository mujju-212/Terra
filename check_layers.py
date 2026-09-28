import xml.etree.ElementTree as ET

tree = ET.parse('public/images/india_official_map.svg')
root = tree.getroot()

def get_layer_xml(layer_id):
    for g in root.iter('{http://www.w3.org/2000/svg}g'):
        if g.attrib.get('id') == layer_id:
            return g
    return None

country_g = get_layer_xml('layercountry_1_')
disp_g = get_layer_xml('layerdisputedCountries')
borders_g = get_layer_xml('layerrBoundaries')
other_g = get_layer_xml('layerotherCountries')
coast_g = get_layer_xml('layercoastline')

print("Layer check:")
print("  Country:", len(country_g) if country_g is not None else 0)
print("  Disputed:", len(disp_g) if disp_g is not None else 0)
print("  State borders:", len(borders_g) if borders_g is not None else 0)
print("  Other countries:", len(other_g) if other_g is not None else 0)
print("  Coastline:", len(coast_g) if coast_g is not None else 0)
