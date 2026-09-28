import xml.etree.ElementTree as ET
import json

tree = ET.parse('public/images/india_official_map.svg')
root = tree.getroot()

def get_layer_paths(layer_id):
    for g in root.iter('{http://www.w3.org/2000/svg}g'):
        if g.attrib.get('id') == layer_id:
            paths = []
            for p in g.iter('{http://www.w3.org/2000/svg}path'):
                d = p.attrib.get('d', '').strip()
                pid = p.attrib.get('id', '')
                if d:
                    paths.append({'id': pid, 'd': d})
            return paths
    return []

country_paths = get_layer_paths('layercountry_1_')
disp_paths = get_layer_paths('layerdisputedCountries')
borders_paths = get_layer_paths('layerrBoundaries')
other_paths = get_layer_paths('layerotherCountries')
coast_paths = get_layer_paths('layercoastline')

# Filter coast paths to keep those with len > 100
coast_paths = [p for p in coast_paths if len(p['d']) > 80]

print(f"Loaded: country={len(country_paths)}, disp={len(disp_paths)}, borders={len(borders_paths)}, other={len(other_paths)}, coast={len(coast_paths)}")

# Write to TypeScript file
ts_content = f"""// Official Vector Geographic Paths for India Interactive Map Component
// Extracted from Natural Earth & Survey of India Cartographic Datasets
// Coordinate System: viewBox="0 0 1500 1615" (Equirectangular 106.0% aspect)

export interface MapVectorPath {{
  id: string;
  d: string;
}}

// 1. All Indian States & Union Territories
export const INDIA_STATE_POLYGONS: MapVectorPath[] = {json.dumps(country_paths, indent=2)};

// 2. Disputed & Frontier Northern/Eastern Boundaries (J&K, Ladakh, Arunachal)
export const INDIA_FRONTIER_PATHS: MapVectorPath[] = {json.dumps(disp_paths, indent=2)};

// 3. Internal State Boundary Lines
export const INDIA_STATE_BORDERS: MapVectorPath[] = {json.dumps(borders_paths, indent=2)};

// 4. Neighboring Countries Silhouette (Pakistan, Nepal, Bhutan, Bangladesh, Myanmar, Sri Lanka)
export const NEIGHBOR_COUNTRY_PATHS: MapVectorPath[] = {json.dumps(other_paths, indent=2)};

// 5. Significant Coastline Contours
export const COASTLINE_PATHS: MapVectorPath[] = {json.dumps(coast_paths, indent=2)};
"""

with open('src/data/indiaVectorMapData.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Saved src/data/indiaVectorMapData.ts (Size: {len(ts_content)} bytes)")
