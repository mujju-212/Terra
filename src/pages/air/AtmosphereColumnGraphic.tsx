import { useRef, useEffect } from 'react';

export type AtmosphereLayerKey = 'thermo' | 'meso' | 'strato' | 'tropo';

interface AtmosphereColumnGraphicProps {
  activeLayer: AtmosphereLayerKey;
  onSelectLayer: (layer: AtmosphereLayerKey) => void;
}

export function AtmosphereColumnGraphic({
  activeLayer,
  onSelectLayer,
}: AtmosphereColumnGraphicProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const layers: { key: AtmosphereLayerKey; name: string; alt: string; topPct: number; heightPct: number }[] = [
    { key: 'thermo', name: 'Thermosphere', alt: '(~85–600 km)', topPct: 0, heightPct: 0.28 },
    { key: 'meso', name: 'Mesosphere', alt: '(~50–85 km)', topPct: 0.28, heightPct: 0.23 },
    { key: 'strato', name: 'Stratosphere', alt: '(~12–50 km)', topPct: 0.51, heightPct: 0.24 },
    { key: 'tropo', name: 'Troposphere', alt: '(0–12 km)', topPct: 0.75, heightPct: 0.25 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = 84;
    const height = 245;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    // ─── 1. CLIP TO ROUNDED PILL CYLINDER ───
    ctx.beginPath();
    ctx.roundRect(4, 4, width - 8, height - 8, 38);
    ctx.clip();

    // ─── 2. BASE ATMOSPHERIC GRADIENT (SPACE TO EARTH) ───
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#02050f');       // Deep space
    bgGrad.addColorStop(0.3, '#061324');     // Thermosphere / Mesosphere
    bgGrad.addColorStop(0.6, '#0b2a47');     // Stratosphere
    bgGrad.addColorStop(0.85, '#0284c7');    // Upper Troposphere
    bgGrad.addColorStop(1.0, '#38bdf8');     // Low altitude horizon
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // ─── 3. DRAW BACKGROUND STARS IN THERMOSPHERE ───
    const stars = [
      { x: 18, y: 15, r: 0.9 },
      { x: 35, y: 32, r: 1.2 },
      { x: 62, y: 22, r: 0.8 },
      { x: 50, y: 48, r: 1.0 },
      { x: 22, y: 60, r: 0.7 },
      { x: 68, y: 70, r: 0.9 },
    ];
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    stars.forEach((s) => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // ─── 4. STRATOSPHERIC OZONE LAYER GLOW (y: 135 to 160) ───
    const ozoneGrad = ctx.createLinearGradient(0, 130, 0, 170);
    ozoneGrad.addColorStop(0, 'rgba(139, 92, 246, 0)');
    ozoneGrad.addColorStop(0.5, 'rgba(139, 92, 246, 0.45)');
    ozoneGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');
    ctx.fillStyle = ozoneGrad;
    ctx.fillRect(4, 130, width - 8, 40);

    // ─── 5. CURVED EARTH SURFACE & CLOUDS AT BOTTOM (TROPOSPHERE) ───
    // Intense atmospheric Rayleigh scattering rim
    const rimGrad = ctx.createRadialGradient(width / 2, height + 20, 10, width / 2, height + 20, 85);
    rimGrad.addColorStop(0, 'rgba(255, 255, 255, 0.98)');
    rimGrad.addColorStop(0.35, 'rgba(186, 230, 253, 0.95)');
    rimGrad.addColorStop(0.7, 'rgba(56, 189, 248, 0.85)');
    rimGrad.addColorStop(1, 'rgba(2, 132, 199, 0)');
    ctx.fillStyle = rimGrad;
    ctx.beginPath();
    ctx.arc(width / 2, height + 25, 75, 0, Math.PI * 2);
    ctx.fill();

    // Procedural Cumulus Cloud Clusters
    const clouds = [
      { x: 22, y: height - 20, rx: 16, ry: 9, a: 0.85 },
      { x: 38, y: height - 26, rx: 20, ry: 11, a: 0.92 },
      { x: 58, y: height - 22, rx: 18, ry: 10, a: 0.88 },
      { x: 42, y: height - 14, rx: 25, ry: 12, a: 0.95 },
      { x: 26, y: height - 34, rx: 14, ry: 7, a: 0.7 },
      { x: 55, y: height - 32, rx: 15, ry: 8, a: 0.75 },
    ];
    clouds.forEach((c) => {
      ctx.beginPath();
      ctx.ellipse(c.x, c.y, c.rx, c.ry, 0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${c.a})`;
      ctx.fill();
    });

    // ─── 6. HIGHLIGHT ACTIVE LAYER WITH NEON SCAN BAND ───
    const activeItem = layers.find((l) => l.key === activeLayer);
    if (activeItem) {
      const topY = activeItem.topPct * height;
      const bandH = activeItem.heightPct * height;

      // Bright glowing aura over active band
      const activeGrad = ctx.createLinearGradient(0, topY, 0, topY + bandH);
      activeGrad.addColorStop(0, 'rgba(56, 189, 248, 0.35)');
      activeGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.15)');
      activeGrad.addColorStop(1, 'rgba(56, 189, 248, 0.35)');
      ctx.fillStyle = activeGrad;
      ctx.fillRect(4, topY, width - 8, bandH);

      // Neon scanning border for active band
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(5, topY + 1, width - 10, bandH - 2);
    }

    // ─── 7. CYLINDRICAL BOUNDARY RINGS WITH 3D ELLIPSE PERSPECTIVE ───
    const ringYs = [
      height * 0.28, // Thermo-Meso boundary
      height * 0.51, // Meso-Strato boundary
      height * 0.75, // Strato-Tropo boundary
    ];

    ringYs.forEach((ry) => {
      ctx.beginPath();
      ctx.ellipse(width / 2, ry, (width - 12) / 2, 7, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(186, 230, 253, 0.65)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 3]);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    ctx.restore();

    // Outer border of cylinder
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.beginPath();
    ctx.roundRect(4, 4, width - 8, height - 8, 38);
    ctx.strokeStyle = 'rgba(125, 211, 252, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
  }, [activeLayer]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '18px', width: '100%' }}>
      {/* 1. Atmospheric Cutaway Cylinder Canvas */}
      <div
        style={{
          position: 'relative',
          width: '84px',
          height: '245px',
          flexShrink: 0,
          filter: 'drop-shadow(0 0 16px rgba(56, 189, 248, 0.35))',
        }}
      >
        <canvas ref={canvasRef} style={{ display: 'block' }} />
      </div>

      {/* 2. Layer Buttons Navigation on Right with Timeline Line */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          flex: 1,
          position: 'relative',
          paddingLeft: '16px',
        }}
      >
        {/* Continuous vertical timeline connector line */}
        <div
          style={{
            position: 'absolute',
            left: '4px',
            top: '18px',
            bottom: '18px',
            width: '1.5px',
            background: 'rgba(159, 184, 196, 0.35)',
            pointerEvents: 'none',
          }}
        />

        {layers.map((layer) => {
          const isActive = activeLayer === layer.key;
          return (
            <button
              key={layer.key}
              type="button"
              onClick={() => onSelectLayer(layer.key)}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '9px 14px',
                borderRadius: '12px',
                background: isActive
                  ? 'linear-gradient(135deg, rgba(2, 132, 199, 0.9) 0%, rgba(3, 105, 161, 0.95) 100%)'
                  : 'rgba(15, 23, 42, 0.55)',
                border: `1px solid ${isActive ? '#38bdf8' : 'rgba(159, 184, 196, 0.22)'}`,
                boxShadow: isActive ? '0 0 18px rgba(56, 189, 248, 0.45)' : 'none',
                color: isActive ? '#ffffff' : 'rgba(224, 242, 254, 0.85)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.22s ease',
              }}
            >
              {/* Timeline indicator node */}
              <span
                style={{
                  position: 'absolute',
                  left: '-16px',
                  width: isActive ? '10px' : '7px',
                  height: isActive ? '10px' : '7px',
                  borderRadius: '50%',
                  background: isActive ? '#38bdf8' : 'rgba(159, 184, 196, 0.5)',
                  border: `1px solid ${isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.2)'}`,
                  boxShadow: isActive ? '0 0 10px #38bdf8' : 'none',
                  transition: 'all 0.22s ease',
                }}
              />

              <span style={{ fontWeight: 600, fontSize: '0.84rem' }}>{layer.name}</span>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: '0.72rem',
                  opacity: isActive ? 0.95 : 0.65,
                }}
              >
                {layer.alt}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
