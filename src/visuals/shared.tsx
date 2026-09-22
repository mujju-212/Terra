import { useId, type CSSProperties, type ReactNode } from 'react';
import { ArrowDownRight, ArrowUpRight, Droplets, Leaf, Wind } from 'lucide-react';

export function InteractiveTag({ children = 'INTERACTIVE FIELD STUDY' }: { children?: ReactNode }) {
  return <div className="interactive-tag"><span className="tag-pulse" aria-hidden="true" />{children}</div>;
}

export function Meter({ value, label, color }: { value: number; label: string; color?: string }) {
  return <div className="meter-block" style={{ '--meter-color': color ?? 'var(--accent)' } as CSSProperties}>
    <div className="meter-label"><span>{label}</span><strong>{Math.round(value)}%</strong></div>
    <div className="meter-track" role="meter" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(value)}><span style={{ width: `${Math.max(0, Math.min(100, value))}%` }} /></div>
  </div>;
}

const INDIA_PATH = 'M203 24 L230 29 L250 40 L269 43 L282 57 L306 64 L315 81 L301 96 L318 108 L309 125 L290 139 L293 156 L280 171 L270 191 L252 207 L240 230 L228 255 L212 282 L197 296 L185 275 L180 249 L163 230 L154 210 L143 193 L127 178 L118 155 L124 135 L139 119 L144 101 L160 88 L169 68 L188 59 L192 42 Z';

export function IndiaMapGraphic({ mode = 'rivers', selected = 0, accent = 'var(--accent)' }: { mode?: 'rivers' | 'regions' | 'links' | 'coast'; selected?: number; accent?: string }) {
  const mapId = useId().replace(/:/g, '');
  const fillId = `indiaFill-${mapId}`;
  const clipId = `indiaClip-${mapId}`;
  const glowId = `indiaGlow-${mapId}`;
  const riverPaths = [
    'M162 75 C165 99 181 118 190 145 C200 171 201 197 211 218',
    'M197 83 C216 90 239 90 261 100 C274 106 285 112 299 114',
    'M139 140 C154 156 168 160 183 168',
    'M196 152 C200 175 208 193 220 211',
    'M230 159 C228 180 234 198 240 214',
    'M177 177 C184 195 190 210 198 225',
  ];
  return (
    <svg className={`india-map india-map-${mode}`} viewBox="95 0 245 320" role="img" aria-label="Stylized schematic map of India; not to scale">
      <defs>
        <linearGradient id={fillId} x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor={accent} stopOpacity=".36" /><stop offset="1" stopColor={accent} stopOpacity=".07" /></linearGradient>
        <clipPath id={clipId}><path d={INDIA_PATH} /></clipPath>
        <radialGradient id={glowId}><stop stopColor={accent} stopOpacity=".45" /><stop offset="1" stopColor={accent} stopOpacity="0" /></radialGradient>
      </defs>
      <ellipse cx="215" cy="158" rx="128" ry="164" fill={`url(#${glowId})`} opacity=".26" />
      <path d={INDIA_PATH} fill={`url(#${fillId})`} stroke={accent} strokeOpacity=".8" strokeWidth="1.4" />
      <g clipPath={`url(#${clipId})`}>
        {mode === 'regions' ? <>
          <path d="M108 17 H324 V91 C282 111 221 103 185 121 C149 107 125 88 108 84Z" fill="#b8d1de" opacity={selected === 2 ? '.52' : '.22'} />
          <path d="M112 109 C159 94 211 119 243 134 L268 194 L224 295 L181 260 L148 209Z" fill="#c9a15a" opacity={selected === 0 ? '.54' : '.2'} />
          <path d="M184 83 C223 92 269 89 320 107 L317 164 C278 175 243 166 219 141Z" fill="#4fa3c7" opacity={selected === 1 ? '.52' : '.18'} />
          <path d="M265 158 L332 168 L322 252 L261 219Z" fill="#6fa96b" opacity={selected === 3 ? '.58' : '.2'} />
        </> : mode === 'coast' ? <path d="M130 130 C115 166 148 220 184 246 L211 291 L236 258 L213 214 L182 188Z" fill="#4fa3c7" opacity=".48" /> : null}
        {mode === 'links' ? <g className="map-link-lines" fill="none" stroke={accent} strokeWidth="1.7" strokeDasharray="4 4">
          {(selected === 0 ? [['168,82 256,103'], ['185,105 220,160'], ['225,117 200,211'], ['275,118 238,188'], ['190,145 271,173']] : [['150,140 219,215'], ['177,117 240,235'], ['205,153 272,204'], ['235,167 197,258'], ['266,123 232,199']]).map((coords, index) => <polyline key={index} points={coords[0]} />)}
        </g> : null}
        {(mode === 'rivers' || mode === 'links') && riverPaths.map((path, i) => <path key={path} d={path} fill="none" stroke={i === selected ? '#d7f1f7' : accent} strokeOpacity={i === selected ? '.95' : '.54'} strokeWidth={i === selected ? 2.3 : 1.15} strokeLinecap="round" className="map-river-line" />)}
        <path d="M106 43 H325 M108 76 H323 M110 110 H321 M112 144 H320 M116 180 H315 M126 216 H294" stroke="#fff" strokeOpacity=".07" strokeDasharray="2 6" />
      </g>
      <path d={INDIA_PATH} fill="none" stroke="rgba(255,255,255,.18)" strokeWidth=".75" />
      <text x="220" y="308" textAnchor="middle" fill="rgba(255,255,255,.48)" fontSize="7" letterSpacing="1.6">SCHEMATIC · NOT TO SCALE</text>
    </svg>
  );
}

export function FlowGlyph({ type }: { type: 'water' | 'air' | 'land' | 'life' }) {
  if (type === 'water') return <Droplets size={17} strokeWidth={1.35} />;
  if (type === 'air') return <Wind size={17} strokeWidth={1.35} />;
  if (type === 'life') return <Leaf size={17} strokeWidth={1.35} />;
  return <ArrowUpRight size={17} strokeWidth={1.35} />;
}

export function DirectionMark({ down = false }: { down?: boolean }) {
  return down ? <ArrowDownRight size={15} /> : <ArrowUpRight size={15} />;
}
