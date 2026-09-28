import re

def parse_svg_path_points(d_str):
    # Quick parser for M x y L x y or m dx dy
    # Returns segments of points
    tokens = re.findall(r'([a-zA-Z])|([-+]?\d*\.?\d+)', d_str)
    segments = []
    current_segment = []
    current_cmd = ''
    i = 0
    cur_x, cur_y = 0.0, 0.0
    
    while i < len(tokens):
        cmd, num = tokens[i]
        if cmd:
            current_cmd = cmd
            if current_cmd in 'Mm' and current_segment:
                segments.append((current_cmd_mode, current_segment))
                current_segment = []
            current_cmd_mode = current_cmd
            i += 1
        elif num:
            x = float(num)
            if i + 1 < len(tokens) and tokens[i+1][1]:
                y = float(tokens[i+1][1])
                i += 2
                if current_cmd in 'ML':
                    cur_x, cur_y = x, y
                elif current_cmd in 'ml':
                    cur_x += x; cur_y += y
                current_segment.append((cur_x, cur_y))
            else:
                i += 1
        else:
            i += 1
    if current_segment:
        segments.append(('M', current_segment))
    return segments

def point_line_distance(pt, line_start, line_end):
    px, py = pt
    x1, y1 = line_start
    x2, y2 = line_end
    dx = x2 - x1
    dy = y2 - y1
    if dx == 0 and dy == 0:
        return ((px - x1)**2 + (py - y1)**2)**0.5
    num = abs(dy * px - dx * py + x2 * y1 - y2 * x1)
    den = (dx**2 + dy**2)**0.5
    return num / den

def rdp(points, epsilon):
    if len(points) <= 2:
        return points
    # Find point with max distance
    dmax = 0.0
    index = 0
    for i in range(1, len(points) - 1):
        d = point_line_distance(points[i], points[0], points[-1])
        if d > dmax:
            index = i
            dmax = d
    if dmax > epsilon:
        rec1 = rdp(points[:index+1], epsilon)
        rec2 = rdp(points[index:], epsilon)
        return rec1[:-1] + rec2
    else:
        return [points[0], points[-1]]

# Test simplification on a sample path
print("RDP implementation ready.")
