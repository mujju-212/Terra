import xml.etree.ElementTree as ET
import re

tree = ET.parse('public/images/india_official_map.svg')
root = tree.getroot()

# In india_official_map.svg:
# X bounding box of India: approx 100 to 1420 (width ~ 1320)
# Y bounding box of India: approx 80 to 1520 (height ~ 1440)
#
# In our 680x740 stage:
# North (Kashmir/Ladakh): Y ~ 60 to 140, X ~ 120 to 280
# West (Gujarat): X ~ 20 to 180, Y ~ 330 to 450
# East (Assam/Arunachal): X ~ 480 to 640, Y ~ 200 to 320
# Central (MP/Maharashtra): X ~ 180 to 420, Y ~ 350 to 520
# South (Karnataka/TN): X ~ 200 to 380, Y ~ 500 to 680
# Tip (Kanyakumari): X ~ 290, Y ~ 690

# Let's compute linear transform (scale, offset) to map official map into 680x740:
# Official coordinates for key anchors:
# Kashmir top: ~ (450, 100) -> Target: ~ (220, 75)
# Kanyakumari bottom: ~ (580, 1500) -> Target: ~ (290, 680)
# Gujarat west tip: ~ (100, 750) -> Target: ~ (50, 370)
# Arunachal east tip: ~ (1400, 450) -> Target: ~ (640, 240)

# Scale:
# Y range: 1500 - 100 = 1400 -> Target Y range: 680 - 75 = 605
# Scale Y ~ 605 / 1400 = 0.432
# Scale X: (640 - 50) / (1400 - 100) = 590 / 1300 = 0.453
# Let's test a uniform scale of 0.44

scale = 0.44
offset_x = 220 - 450 * scale # = 220 - 198 = 22
offset_y = 75 - 100 * scale  # = 75 - 44 = 31

print(f"Scale: {scale:.4f}, OffsetX: {offset_x:.2f}, OffsetY: {offset_y:.2f}")

# Test key points:
pts = [
    ("Kashmir Top", 450, 100),
    ("Kanyakumari", 580, 1500),
    ("Gujarat West", 100, 750),
    ("Arunachal East", 1400, 450),
    ("Delhi", 472, 440),
    ("Kolkata", 990, 660),
    ("Mumbai", 320, 850),
    ("Chennai", 620, 1200),
]

for name, ox, oy in pts:
    tx = ox * scale + offset_x
    ty = oy * scale + offset_y
    print(f"  {name:15s}: ({ox}, {oy}) -> ({tx:.1f}, {ty:.1f})")
