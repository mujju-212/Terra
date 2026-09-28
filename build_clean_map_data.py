import xml.etree.ElementTree as ET
import re

tree = ET.parse('public/images/india_official_map.svg')
root = tree.getroot()

# Function to parse coordinates and simplify slightly
def clean_path_d(d_str, scale_x, scale_y, offset_x, offset_y):
    # Regex to extract numbers and commands
    tokens = re.findall(r'([a-zA-Z])|([-+]?\d*\.?\d+)', d_str)
    result = []
    current_cmd = ''
    i = 0
    while i < len(tokens):
        cmd, num = tokens[i]
        if cmd:
            current_cmd = cmd
            result.append(cmd)
            i += 1
        elif num:
            # We have a coordinate
            val = float(num)
            # If current_cmd is absolute (uppercase) or relative (lowercase)
            if current_cmd in 'MLCSTQ':
                # paired x, y
                x = val * scale_x + offset_x
                if i + 1 < len(tokens) and tokens[i+1][1]:
                    y = float(tokens[i+1][1]) * scale_y + offset_y
                    result.append(f"{x:.1f},{y:.1f}")
                    i += 2
                else:
                    result.append(f"{x:.1f}")
                    i += 1
            elif current_cmd in 'mlcstq':
                # relative
                dx = val * scale_x
                if i + 1 < len(tokens) and tokens[i+1][1]:
                    dy = float(tokens[i+1][1]) * scale_y
                    result.append(f"{dx:.1f},{dy:.1f}")
                    i += 2
                else:
                    result.append(f"{dx:.1f}")
                    i += 1
            elif current_cmd in 'H':
                result.append(f"{(val * scale_x + offset_x):.1f}")
                i += 1
            elif current_cmd in 'h':
                result.append(f"{(val * scale_x):.1f}")
                i += 1
            elif current_cmd in 'V':
                result.append(f"{(val * scale_y + offset_y):.1f}")
                i += 1
            elif current_cmd in 'v':
                result.append(f"{(val * scale_y):.1f}")
                i += 1
            elif current_cmd in 'Zz':
                result.append('Z')
                i += 1
            else:
                result.append(f"{val:.1f}")
                i += 1
        else:
            i += 1
    return " ".join(result)

# Let's inspect original viewBox: 0 0 1500 1614.844
# Target coordinate space: 0 0 1000 1100
# Scale factor = 1000 / 1500 = 0.66667
# Y Scale factor = 1100 / 1614.844 = 0.68118
scale_x = 1000.0 / 1500.0
scale_y = 1100.0 / 1614.844

print(f"Scale X: {scale_x:.4f}, Scale Y: {scale_y:.4f}")
