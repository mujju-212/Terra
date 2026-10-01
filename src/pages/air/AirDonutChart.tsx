import { useState, useRef, useEffect } from 'react';

interface AirDonutChartProps {
  activeGas: string | null;
  onSelectGas: (gas: string | null) => void;
}

export function AirDonutChart({ activeGas, onSelectGas }: AirDonutChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredGas, setHoveredGas] = useState<string | null>(null);

  // Curricular proportions and display angles (degrees, clockwise from 12 o'clock / -90°)
  // Nitrogen: 78.084%, Oxygen: 20.946%, Argon: 0.934%, Trace: ~0.04%
  // To match the user's reference mockup:
  // - Argon is at top-left
  // - Oxygen is on the left
  // - Nitrogen covers the right, bottom, and bottom-left
  // - Trace is at top-right
  const slices = [
    {
      id: 'Argon',
      name: 'Argon',
      pct: '0.934%',
      startAngle: -110,
      endAngle: -88,
      color: '#22c55e',
      colorDark: '#15803d',
      labelPos: 'top-left',
      pointer: { x1: 172, y1: 42, x2: 135, y2: 24, labelX: 80, labelY: 20 },
    },
    {
      id: 'Trace',
      name: 'Trace gases',
      pct: '~0.04%',
      startAngle: -88,
      endAngle: -70,
      color: '#f59e0b',
      colorDark: '#b45309',
      labelPos: 'top-right',
      pointer: { x1: 248, y1: 40, x2: 285, y2: 24, labelX: 300, labelY: 20 },
    },
    {
      id: 'Nitrogen',
      name: 'Nitrogen',
      pct: '78.084%',
      startAngle: -70,
      endAngle: 185,
      color: '#8b5cf6',
      colorDark: '#5b21b6',
      labelPos: 'right',
      pointer: { x1: 295, y1: 95, x2: 335, y2: 110, labelX: 345, labelY: 108 },
    },
    {
      id: 'Oxygen',
      name: 'Oxygen',
      pct: '20.946%',
      startAngle: 185,
      endAngle: 250,
      color: '#06b6d4',
      colorDark: '#0e7490',
      labelPos: 'left',
      pointer: { x1: 125, y1: 85, x2: 85, y2: 95, labelX: 25, labelY: 92 },
    },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = 420;
    const height = 185;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const cx = 210;
    const cy = 82;
    const rxOuter = 95;
    const ryOuter = 46;
    const rxInner = 52;
    const ryInner = 25;
    const depth = 22; // 3D extrusion height

    const currentSelected = activeGas || hoveredGas;

    // Helper: angle to radians
    const toRad = (deg: number) => (deg * Math.PI) / 180;

    // ─── 1. DRAW 3D EXTRUDED SIDE WALLS (FRONT HALF: 0° to 180°) ───
    slices.forEach((slice) => {
      const isHighlighted = currentSelected === slice.id;
      const lift = isHighlighted ? -4 : 0;
      const effectiveCy = cy + lift;

      // Draw outer front-facing cylindrical wall
      // Split the arc into steps to create smooth curved extrusion
      const startDeg = slice.startAngle;
      const endDeg = slice.endAngle;
      const step = 2; // degrees per step

      ctx.beginPath();
      let first = true;
      for (let a = startDeg; a <= endDeg; a += step) {
        const rad = toRad(a);
        // Only front-facing angles (sin(rad) >= 0) produce visible outer extrusion
        const x = cx + rxOuter * Math.cos(rad);
        const yTop = effectiveCy + ryOuter * Math.sin(rad);
        if (first) {
          ctx.moveTo(x, yTop);
          first = false;
        } else {
          ctx.lineTo(x, yTop);
        }
      }

      // Drop down to bottom edge
      for (let a = endDeg; a >= startDeg; a -= step) {
        const rad = toRad(a);
        const x = cx + rxOuter * Math.cos(rad);
        const yBot = effectiveCy + depth + ryOuter * Math.sin(rad);
        ctx.lineTo(x, yBot);
      }
      ctx.closePath();

      // Shaded side wall gradient
      const wallGrad = ctx.createLinearGradient(0, effectiveCy, 0, effectiveCy + depth);
      wallGrad.addColorStop(0, slice.colorDark);
      wallGrad.addColorStop(1, '#050c18');
      ctx.fillStyle = wallGrad;
      ctx.fill();

      // Soft rim highlight on bottom edge
      ctx.strokeStyle = `${slice.color}40`;
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // ─── 2. DRAW TOP FACE OF DONUT SLICES ───
    slices.forEach((slice) => {
      const isHighlighted = currentSelected === slice.id;
      const lift = isHighlighted ? -5 : 0;
      const effectiveCy = cy + lift;

      const startDeg = slice.startAngle;
      const endDeg = slice.endAngle;
      const step = 2;

      ctx.beginPath();

      // Outer ellipse arc
      for (let a = startDeg; a <= endDeg; a += step) {
        const rad = toRad(a);
        const x = cx + rxOuter * Math.cos(rad);
        const y = effectiveCy + ryOuter * Math.sin(rad);
        if (a === startDeg) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      // Inner ellipse arc (reverse direction)
      for (let a = endDeg; a >= startDeg; a -= step) {
        const rad = toRad(a);
        const x = cx + rxInner * Math.cos(rad);
        const y = effectiveCy + ryInner * Math.sin(rad);
        ctx.lineTo(x, y);
      }

      ctx.closePath();

      // Top face gradient
      const topGrad = ctx.createLinearGradient(cx - rxOuter, effectiveCy - ryOuter, cx + rxOuter, effectiveCy + ryOuter);
      topGrad.addColorStop(0, slice.color);
      topGrad.addColorStop(1, slice.colorDark);

      ctx.fillStyle = topGrad;
      ctx.fill();

      // Top bevel border
      ctx.strokeStyle = isHighlighted ? '#ffffff' : `${slice.color}90`;
      ctx.lineWidth = isHighlighted ? 2 : 1;
      ctx.stroke();

      if (isHighlighted) {
        ctx.shadowColor = slice.color;
        ctx.shadowBlur = 16;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    });

    // ─── 3. INNER HOLE AMBIENT SHADOW ───
    ctx.beginPath();
    ctx.ellipse(cx, cy, rxInner - 2, ryInner - 1, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#030814';
    ctx.fill();

    // Inner back wall shadow (cavity depth)
    const innerShadow = ctx.createLinearGradient(0, cy - ryInner, 0, cy + ryInner);
    innerShadow.addColorStop(0, 'rgba(0, 0, 0, 0.95)');
    innerShadow.addColorStop(1, 'rgba(2, 6, 16, 0.4)');
    ctx.fillStyle = innerShadow;
    ctx.fill();

    ctx.restore();
  }, [activeGas, hoveredGas]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '185px', display: 'flex', justifyContent: 'center' }}>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', maxWidth: '100%' }}
        onMouseLeave={() => {
          setHoveredGas(null);
          onSelectGas(null);
        }}
      />

      {/* ─── POINTER CALLOUT BADGES (Positioned exactly around the 3D donut) ─── */}

      {/* 1. Argon (Top Left) */}
      <div
        style={{
          position: 'absolute',
          left: '32px',
          top: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          cursor: 'pointer',
        }}
        onMouseEnter={() => {
          setHoveredGas('Argon');
          onSelectGas('Argon');
        }}
        onMouseLeave={() => {
          setHoveredGas(null);
          onSelectGas(null);
        }}
      >
        <span style={{ fontSize: '0.78rem', color: '#e0f2fe', fontWeight: 500 }}>Argon</span>
        <span style={{ fontSize: '0.92rem', color: '#22c55e', fontWeight: 700, fontFamily: 'monospace' }}>0.934%</span>
        {/* Dashed pointer line connecting to top-left of donut */}
        <svg style={{ position: 'absolute', left: '70px', top: '12px', width: '75px', height: '35px', overflow: 'visible', pointerEvents: 'none' }}>
          <line x1="0" y1="0" x2="65" y2="25" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.85" />
          <circle cx="65" cy="25" r="3" fill="#22c55e" />
        </svg>
      </div>

      {/* 2. Oxygen (Mid Left) */}
      <div
        style={{
          position: 'absolute',
          left: '20px',
          top: '80px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          cursor: 'pointer',
        }}
        onMouseEnter={() => {
          setHoveredGas('Oxygen');
          onSelectGas('Oxygen');
        }}
        onMouseLeave={() => {
          setHoveredGas(null);
          onSelectGas(null);
        }}
      >
        <span style={{ fontSize: '0.78rem', color: '#e0f2fe', fontWeight: 500 }}>Oxygen</span>
        <span style={{ fontSize: '0.92rem', color: '#06b6d4', fontWeight: 700, fontFamily: 'monospace' }}>20.946%</span>
        {/* Pointer line connecting to left of donut */}
        <svg style={{ position: 'absolute', left: '72px', top: '10px', width: '55px', height: '10px', overflow: 'visible', pointerEvents: 'none' }}>
          <line x1="0" y1="0" x2="45" y2="-5" stroke="#06b6d4" strokeWidth="1.5" opacity="0.85" />
          <circle cx="45" cy="-5" r="3.5" fill="#06b6d4" />
        </svg>
      </div>

      {/* 3. Trace Gases (Top Right) */}
      <div
        style={{
          position: 'absolute',
          right: '30px',
          top: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          cursor: 'pointer',
        }}
        onMouseEnter={() => {
          setHoveredGas('Trace');
          onSelectGas('Trace');
        }}
        onMouseLeave={() => {
          setHoveredGas(null);
          onSelectGas(null);
        }}
      >
        <span style={{ fontSize: '0.78rem', color: '#e0f2fe', fontWeight: 500 }}>Trace gases</span>
        <span style={{ fontSize: '0.92rem', color: '#f59e0b', fontWeight: 700, fontFamily: 'monospace' }}>~0.04%</span>
        {/* Dashed pointer line connecting to top-right of donut */}
        <svg style={{ position: 'absolute', right: '70px', top: '12px', width: '70px', height: '35px', overflow: 'visible', pointerEvents: 'none' }}>
          <line x1="0" y1="0" x2="-58" y2="25" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.85" />
          <circle cx="-58" cy="25" r="3" fill="#f59e0b" />
        </svg>
      </div>

      {/* 4. Nitrogen (Right) */}
      <div
        style={{
          position: 'absolute',
          right: '20px',
          top: '85px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          cursor: 'pointer',
        }}
        onMouseEnter={() => {
          setHoveredGas('Nitrogen');
          onSelectGas('Nitrogen');
        }}
        onMouseLeave={() => {
          setHoveredGas(null);
          onSelectGas(null);
        }}
      >
        <span style={{ fontSize: '0.78rem', color: '#e0f2fe', fontWeight: 500 }}>Nitrogen</span>
        <span style={{ fontSize: '0.98rem', color: '#a855f7', fontWeight: 700, fontFamily: 'monospace' }}>78.084%</span>
        {/* Pointer line connecting to right of donut */}
        <svg style={{ position: 'absolute', right: '75px', top: '10px', width: '45px', height: '10px', overflow: 'visible', pointerEvents: 'none' }}>
          <line x1="0" y1="0" x2="-35" y2="-2" stroke="#a855f7" strokeWidth="1.5" opacity="0.85" />
          <circle cx="-35" cy="-2" r="3.5" fill="#a855f7" />
        </svg>
      </div>
    </div>
  );
}
