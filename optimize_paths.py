import re
import os

with open('src/data/indiaVectorMapData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

initial_size = len(content)

# Replace long floats with 1 decimal place
def round_match(match):
    val = float(match.group(0))
    # If integer, keep integer
    if val.is_integer():
        return str(int(val))
    return f"{val:.1f}"

optimized = re.sub(r'[-+]?\d+\.\d{2,}', round_match, content)

with open('src/data/indiaVectorMapData.ts', 'w', encoding='utf-8') as f:
    f.write(optimized)

new_size = len(optimized)
print(f"Optimized from {initial_size/1024:.1f} KB to {new_size/1024:.1f} KB (reduced by {(1 - new_size/initial_size)*100:.1f}%)")
