import { useState } from 'react';
import { Check, CircleHelp, Factory, HeartPulse, Wind } from 'lucide-react';
import type { Chapter } from '../content/types';
import { InteractiveTag, Meter } from './shared';

const airParts = [
  { name: 'Nitrogen', value: 78.084, color: '#9fb8c4' },
  { name: 'Oxygen', value: 20.946, color: '#4fa3c7' },
  { name: 'Argon', value: 0.934, color: '#c9a15a' },
  { name: 'Trace gases', value: 0.036, color: '#d8703f' },
];
export function AirCompositionVisual() {
  const [active, setActive] = useState(0);
  const gas = airParts[active];
  return <div className="air-composition-visual">
    <InteractiveTag>DRY-AIR COMPOSITION · BY VOLUME</InteractiveTag>
    <div className="air-composition-layout"><div className="air-donut-wrap"><div className="air-donut" style={{ '--active-gas': gas.color } as React.CSSProperties}><div><strong>{active === 3 ? 'Trace' : `${gas.value}%`}</strong><span>{gas.name}</span></div></div><span className="orbit-caption">DRY AIR · ~99% IN THREE GASES</span></div><div className="air-gases">{airParts.map((item, index) => <button type="button" key={item.name} aria-pressed={active === index} className={active === index ? 'selected' : ''} onClick={() => setActive(index)}><i aria-hidden="true" style={{ background: item.color }} /><span>{item.name}</span><strong>{item.value === 0.036 ? 'Trace' : `${item.value}%`}</strong></button>)}<div className="troposphere-card"><span>LOWEST LAYER</span><strong>Troposphere · ~12 km</strong><small>Holds ~80% of atmospheric mass</small></div></div></div>
    <div className="atmosphere-bands"><div className="atmosphere-band band-exosphere">EXOSPHERE</div><div className="atmosphere-band band-strato">STRATOSPHERE</div><div className="atmosphere-band band-tropo">TROPOSPHERE <small>weather · nearly all water vapour</small></div><div className="atmosphere-earth" /></div>
  </div>;
}

export function AirPollutionVisual() {
  const [polluted, setPolluted] = useState(false);
  const particleCount = polluted ? 22 : 7;
  return <div className="air-pollution-visual">
    <InteractiveTag>AIR QUALITY · CLEAN / POLLUTED</InteractiveTag>
    <div className={`air-skyline${polluted ? ' air-dirty' : ''}`}><div className="sky-sun" /><div className="city-silhouette"><span /><span /><span /><span /><span /><span /><span /></div><div className="air-particles">{Array.from({ length: particleCount }, (_, i) => <i key={i} style={{ '--particle-left': `${(i * 29 + 8) % 95}%`, '--particle-top': `${(i * 37 + 11) % 75}%`, '--particle-delay': `${i * 80}ms` } as React.CSSProperties} />)}</div><span className="skyline-caption">{polluted ? 'PARTICLES / GASES IN THE AIR' : 'A CLEARER ATMOSPHERE'}</span></div>
    <div className="segmented-control" role="group" aria-label="Air quality scenario"><button type="button" aria-pressed={!polluted} className={!polluted ? 'selected' : ''} onClick={() => setPolluted(false)}>Clear air</button><button type="button" aria-pressed={polluted} className={polluted ? 'selected' : ''} onClick={() => setPolluted(true)}>Add pollutants</button></div>
    <div className="pollution-forms"><span>GASEOUS</span><span>SOLID AEROSOL</span><span>LIQUID AEROSOL</span></div>
  </div>;
}

const pollutants = ['Smoke', 'Dust', 'SOₓ', 'NOₓ', 'O₃', 'Sulphuric acid', 'Soot', 'CO₂'];
const classification = {
  origin: { title: 'By origin', groups: [{ label: 'Primary · emitted directly', items: ['Smoke', 'Dust', 'SOₓ', 'NOₓ', 'Soot'] }, { label: 'Secondary · formed in air', items: ['O₃', 'Sulphuric acid'] }] },
  state: { title: 'By state', groups: [{ label: 'Gases', items: ['SOₓ', 'NOₓ', 'O₃', 'CO₂'] }, { label: 'Particulates', items: ['Smoke', 'Dust', 'Soot'] }] },
  source: { title: 'By source', groups: [{ label: 'Natural', items: ['Dust', 'O₃'] }, { label: 'Man-made', items: ['Smoke', 'SOₓ', 'NOₓ', 'CO₂'] }] },
  location: { title: 'By location', groups: [{ label: 'Stationary / point', items: ['Smoke', 'SOₓ', 'Soot'] }, { label: 'Line / area', items: ['NOₓ', 'Dust', 'CO₂'] }] },
};
type ClassKey = keyof typeof classification;
export function PollutantClassifierVisual() {
  const [scheme, setScheme] = useState<ClassKey>('origin');
  const selected = classification[scheme];
  return <div className="classifier-visual">
    <InteractiveTag>POLLUTANT CLASSIFIER · REGROUP THE TOKENS</InteractiveTag>
    <div className="classifier-tabs" role="group" aria-label="Choose a pollutant classification scheme">{(Object.keys(classification) as ClassKey[]).map((key) => <button key={key} type="button" aria-pressed={scheme === key} className={scheme === key ? 'selected' : ''} onClick={() => setScheme(key)}>{classification[key].title}</button>)}</div>
    <div className="classifier-groups">{selected.groups.map((group, index) => <div className={`classifier-group classifier-group-${index}`} key={group.label}><span>{group.label}</span><div>{group.items.map((item) => <i key={item}>{item}</i>)}</div></div>)}</div>
    <div className={`reaction-line${scheme === 'origin' ? ' reaction-active' : ''}`}><span>PRIMARY</span><b>→ atmospheric reaction →</b><span>SECONDARY</span></div>
    <div className="classifier-foot"><CircleHelp size={14} /><span>Some pollutants can be grouped differently depending on the classification lens.</span></div>
  </div>;
}

const standards = [
  ['PM₂.₅', 'Annual', '40 μg/m³', '40 μg/m³'],
  ['PM₂.₅', '24 hours', '60 μg/m³', '60 μg/m³'],
  ['PM₁₀', 'Annual', '60 μg/m³', '60 μg/m³'],
  ['SO₂', 'Annual', '50 μg/m³', '20 μg/m³'],
  ['NO₂', 'Annual', '40 μg/m³', '30 μg/m³'],
  ['Ozone', '8 hours', '100 μg/m³', '100 μg/m³'],
  ['Lead', 'Annual', '0.50 μg/m³', '0.50 μg/m³'],
];
export function NaaqsVisual() {
  const [active, setActive] = useState('PM₂.₅');
  return <div className="naaqs-visual">
    <InteractiveTag>NAAQS 2009 · KEY VALUES FROM THE NOTES</InteractiveTag>
    <div className="naaqs-table-wrap"><table className="naaqs-table"><thead><tr><th>Pollutant</th><th>Period</th><th>Industrial / residential / rural</th><th>Ecologically sensitive</th></tr></thead><tbody>{standards.map((row, index) => <tr key={`${row[0]}-${row[1]}`} className={active === row[0] ? 'highlighted' : ''} onMouseEnter={() => setActive(row[0])} onFocus={() => setActive(row[0])} tabIndex={0}><td>{row[0]}</td><td>{row[1]}</td><td>{row[2]}</td><td>{row[3]}</td></tr>)}</tbody></table></div>
    <div className="naaqs-foot"><span><i /> CPCB · Air Act, 1981</span><p>Selected pollutant: <strong>{active}</strong> · Refer to the provided notes for all listed pollutants and compliance conditions.</p></div>
  </div>;
}

const aqiBands = [
  { min: 0, max: 50, name: 'Good', color: '#6fba75', advice: 'Minimal impact in the course-note categories.' },
  { min: 51, max: 100, name: 'Satisfactory', color: '#c0c45e', advice: 'Sensitive people may experience minor breathing discomfort.' },
  { min: 101, max: 200, name: 'Moderate', color: '#e2a04e', advice: 'People with lung or heart disease, children and older adults may experience discomfort.' },
  { min: 201, max: 300, name: 'Poor', color: '#d96d45', advice: 'Prolonged exposure may cause breathing discomfort.' },
  { min: 301, max: 400, name: 'Very Poor', color: '#9d5d8b', advice: 'Prolonged exposure may cause respiratory illness.' },
  { min: 401, max: 500, name: 'Severe', color: '#7b3a47', advice: 'Health effects may occur even during light physical activity.' },
];
export function AqiGaugeVisual() {
  const [value, setValue] = useState(74);
  const band = aqiBands.find((item) => value >= item.min && value <= item.max) ?? aqiBands[5];
  const angle = -130 + (value / 500) * 260;
  return <div className="aqi-visual" style={{ '--aqi-color': band.color, '--aqi-haze': `${Math.min(0.28, value / 1800)}` } as React.CSSProperties}>
    <InteractiveTag>AQI GAUGE · TRY A VALUE</InteractiveTag>
    <div className="aqi-layout"><div className="aqi-dial-wrap"><div className="aqi-dial"><div className="aqi-needle" style={{ transform: `rotate(${angle}deg)` }} /><div className="aqi-hub" /><div className="aqi-center"><strong>{value}</strong><span>AQI</span></div><span className="aqi-min">0</span><span className="aqi-max">500</span></div></div><div className="aqi-category"><span className="visual-index">CURRENT CATEGORY</span><h3>{band.name}</h3><p>{band.advice}</p><span className="aqi-disclaimer">Course-note breakpoints · not live air data</span></div></div>
    <label className="range-line aqi-range"><span>0</span><input type="range" min="0" max="500" value={value} onChange={(e) => setValue(Number(e.target.value))} aria-label="AQI value, from 0 to 500" /><span>500</span></label>
    <div className="aqi-band-labels">{aqiBands.map((item) => <span key={item.name} style={{ background: item.color }}>{item.name}</span>)}</div>
  </div>;
}

const healthPollutants = [
  { name: 'SPM', system: 'Respiratory system', detail: 'Small particles can travel deep into the respiratory tract; the notes give SPM special emphasis.', organs: 'lungs' },
  { name: 'CO', system: 'Blood & heart', detail: 'Carbon monoxide reduces the blood’s oxygen-carrying capacity.', organs: 'heart' },
  { name: 'Lead', system: 'Nervous system', detail: 'Lead exposure can damage the nervous system.', organs: 'brain' },
  { name: 'O₃', system: 'Eyes & lungs', detail: 'Ground-level ozone can irritate the eyes and respiratory system.', organs: 'lungs' },
  { name: 'SO₂ / NOₓ', system: 'Respiratory system', detail: 'Sulphur and nitrogen oxides can contribute to respiratory effects.', organs: 'lungs' },
  { name: 'Radon', system: 'Lungs', detail: 'The notes associate radon exposure with lung cancer risk.', organs: 'lungs' },
];
export function BodyMapVisual() {
  const [active, setActive] = useState(0);
  const pollutant = healthPollutants[active];
  return <div className="body-map-visual">
    <InteractiveTag>HEALTH IMPACT · SELECT A POLLUTANT</InteractiveTag>
    <div className="body-map-layout"><div className={`human-figure organ-${pollutant.organs}`}><svg viewBox="0 0 180 330" role="img" aria-label="Simplified human silhouette showing highlighted organ system"><circle cx="90" cy="32" r="23" className="body-skin" /><path className="body-skin" d="M69 61 Q90 53 111 61 L123 136 L115 184 L120 300 L96 300 L89 191 L81 300 L57 300 L65 184 L57 136Z" /><path className="body-arm body-skin" d="M62 68 L42 151 L51 157 L77 94Z" /><path className="body-arm body-skin" d="M114 68 L137 151 L128 157 L101 94Z" /><path d="M76 95 Q88 82 89 99 L89 128 Q79 128 75 116Z" className="organ-lung-left" /><path d="M93 99 Q96 82 105 95 L107 116 Q103 128 93 128Z" className="organ-lung-right" /><path d="M89 132 C77 120 72 135 79 142 L90 151 L101 142 C108 134 100 122 90 132Z" className="organ-heart" /><ellipse cx="90" cy="32" rx="8" ry="6" className="organ-brain" /></svg><span className="body-caption">EXPOSURE → ORGAN SYSTEM</span></div><div className="health-detail"><span className="visual-index">POLLUTANT 0{active + 1} / 06</span><span className="health-icon"><HeartPulse size={21} /></span><h3>{pollutant.name}</h3><strong>{pollutant.system}</strong><p>{pollutant.detail}</p><p className="health-note">Effects depend on pollutant, concentration, exposure duration and individual sensitivity.</p></div></div>
    <div className="pollutant-pills" role="group" aria-label="Select an air pollutant">{healthPollutants.map((item, index) => <button key={item.name} type="button" aria-pressed={active === index} className={active === index ? 'selected' : ''} onClick={() => setActive(index)}>{item.name}</button>)}</div>
  </div>;
}

const devices = [
  { name: 'ESP', full: 'Electrostatic precipitator', type: 'Particulate', action: 'Charges fine particles; collection plates attract and hold them.', capture: 84 },
  { name: 'Cyclone', full: 'Cyclone separator', type: 'Particulate', action: 'A spinning flow pushes heavier particles toward the chamber wall.', capture: 65 },
  { name: 'Fabric filter', full: 'Baghouse filter', type: 'Particulate', action: 'Flue gas passes through fabric that traps particles.', capture: 76 },
  { name: 'Scrubber', full: 'Gas scrubber', type: 'Gas', action: 'A liquid or reagent contacts exhaust and removes selected gaseous pollutants.', capture: 70 },
  { name: 'Incineration', full: 'Thermal oxidation', type: 'Gas', action: 'Combustible pollutants are oxidized under controlled conditions.', capture: 72 },
  { name: 'Carbon capture', full: 'Carbon capture', type: 'Gas', action: 'CO₂ is separated from an exhaust stream for subsequent handling.', capture: 59 },
];
export function EquipmentVisual() {
  const [active, setActive] = useState(0);
  const device = devices[active];
  return <div className="equipment-visual">
    <InteractiveTag>CONTROL EQUIPMENT · HOW IT WORKS</InteractiveTag>
    <div className="equipment-layout"><div className={`equipment-cutaway equipment-${active}`}><div className="equipment-pipe"><span className="pipe-smoke"><i /><i /><i /><i /><i /></span><span className="pipe-capture"><i /><i /><i /></span><span className="pipe-clean" /></div><div className="equipment-labels"><span>INLET</span><span>{device.type.toUpperCase()}</span><span>CLEANER OUTLET</span></div><div className="equipment-plate"><Factory size={21} /><span>{device.name}</span></div></div><div className="equipment-detail"><span className="visual-index">{device.type.toUpperCase()} CONTROL</span><h3>{device.full}</h3><p>{device.action}</p><Meter value={device.capture} label="Conceptual capture pathway" color="var(--accent)" /><small>Mechanism illustration, not a measured efficiency rating.</small></div></div>
    <div className="device-picker" role="group" aria-label="Select pollution-control equipment">{devices.map((item, index) => <button type="button" key={item.name} aria-pressed={active === index} className={active === index ? 'selected' : ''} onClick={() => setActive(index)}>{item.name}</button>)}</div>
  </div>;
}

export function EconomicEffectsVisual() {
  const [active, setActive] = useState(0);
  const materials = [
    { name: 'Stone', effect: 'SOₓ and moisture can attack limestone and leave staining.', icon: 'CaCO₃' },
    { name: 'Rubber', effect: 'Ozone can damage tyre sidewalls and electrical insulation.', icon: 'O₃' },
    { name: 'Textiles', effect: 'Sulphur oxides can deteriorate natural and some synthetic fibres.', icon: 'SOₓ' },
    { name: 'Heritage', effect: 'Air pollution can damage monuments and art objects.', icon: 'SITE' },
  ];
  return <div className="economic-effects-visual">
    <InteractiveTag>MATERIALS · PROPERTY · WELLBEING</InteractiveTag>
    <div className="economic-metric-strip"><div><span>HEALTHCARE COSTS · 2015</span><strong>$21B</strong></div><div className="metric-arrow">→</div><div><span>PROJECTED · 2060</span><strong>$176B</strong></div></div>
    <div className="damage-grid" role="group" aria-label="Select a material affected by air pollution">{materials.map((item, index) => <button type="button" key={item.name} aria-pressed={active === index} className={active === index ? 'selected' : ''} onClick={() => setActive(index)}><span className="damage-mark" aria-hidden="true">{item.icon}</span><small>DAMAGE CASE 0{index + 1}</small><strong>{item.name}</strong>{active === index && <p>{item.effect}</p>}</button>)}</div>
    <p className="visual-note">Economic figures are reproduced from the supplied notes; the 2060 values are projections, not current totals.</p>
  </div>;
}

export function SmokeControlVisual() {
  const [controls, setControls] = useState<number[]>([]);
  const methods = ['Cleaner fuel', 'Complete combustion', 'Capture equipment', 'Vehicle maintenance'];
  return <div className="smoke-control-visual">
    <InteractiveTag>SMOKE · APPLY CONTROL MEASURES</InteractiveTag>
    <div className="smoke-stack-scene" style={{ '--smoke-density': `${Math.max(0.12, 1 - controls.length * 0.19)}` } as React.CSSProperties}><div className="smoke-stack"><span /></div><div className="smoke-cloud"><i /><i /><i /><i /><i /><i /><i /></div><div className="smoke-horizon" /><span className="smoke-reading">PLUME DENSITY <b>{Math.round(Math.max(12, 100 - controls.length * 22))}%</b></span></div>
    <div className="smoke-methods" role="group" aria-label="Apply smoke-control measures">{methods.map((method, index) => <button key={method} type="button" aria-pressed={controls.includes(index)} className={controls.includes(index) ? 'selected' : ''} onClick={() => setControls((old) => old.includes(index) ? old.filter((x) => x !== index) : [...old, index])}><span aria-hidden="true">{controls.includes(index) ? <Check size={11} /> : '+'}</span>{method}</button>)}</div>
  </div>;
}

export function OzoneVisual() {
  const [year, setYear] = useState(1987);
  const recovery = year >= 1987;
  const hole = year < 1987 ? 72 : Math.max(22, 72 - (year - 1987) * 0.75);
  return <div className="ozone-visual">
    <InteractiveTag>STRATOSPHERE · CFC → CHLORINE → OZONE</InteractiveTag>
    <div className={`ozone-atmosphere ${recovery ? 'ozone-recovering' : 'ozone-damaged'}`} style={{ '--ozone-hole': `${hole}%` } as React.CSSProperties}><div className="ozone-earth" /><div className="ozone-ring"><span>O₃ LAYER</span></div><div className="ozone-hole"><span>UV</span></div><div className="ozone-molecules"><i>CFC</i><b>Cl</b><i>O₃</i></div><div className="uv-beams"><i /><i /><i /></div><div className="ozone-status"><span>{recovery ? 'ODS CONTROL' : 'CFC RELEASE'}</span><strong>{year}</strong></div></div>
    <label className="range-line"><span>1979</span><input type="range" min="1979" max="2050" value={year} onChange={(e) => setYear(Number(e.target.value))} aria-label="Ozone timeline from 1979 to 2050" /><span>2050*</span></label>
    <div className="ozone-foot"><span><i /> Montreal Protocol · 1987</span><p>*The notes discuss an approximate recovery forecast if ozone-depleting substances are phased out.</p></div>
  </div>;
}

export function PhotochemicalVisual() {
  const [sunlight, setSunlight] = useState(62);
  const haze = sunlight / 100;
  return <div className="photochemical-visual" style={{ '--smog-level': haze } as React.CSSProperties}>
    <InteractiveTag>PHOTOCHEMICAL SMOG · SUNLIGHT + POLLUTANTS</InteractiveTag>
    <div className="photochemical-sky"><div className="photo-sun" /><div className="photo-buildings"><i /><i /><i /><i /><i /><i /></div><div className="photo-haze" /><span className="photo-caption">CITY AIR · REACTION PATH</span></div>
    <div className="reaction-equation"><span>NO₂</span><b>+ sunlight →</b><span>NO + O</span><b>→ O₃</b><span>+ VOCs → PAN</span></div>
    <label className="range-line"><span>LOW SUN</span><input type="range" min="0" max="100" value={sunlight} onChange={(e) => setSunlight(Number(e.target.value))} aria-label="Adjust sunlight intensity" /><span>HIGH SUN</span></label>
    <p className="visual-note">The notes describe ground-level ozone, PAN, irritation, respiratory effects, reduced visibility and damage to vegetation.</p>
  </div>;
}

export function AirVisual({ kind }: { kind: string; chapter: Chapter }) {
  const components: Record<string, () => JSX.Element> = {
    'air-composition': () => <AirCompositionVisual />,
    'air-pollution': () => <AirPollutionVisual />,
    'pollutant-classifier': () => <PollutantClassifierVisual />,
    naaqs: () => <NaaqsVisual />,
    'aqi-gauge': () => <AqiGaugeVisual />,
    'body-map': () => <BodyMapVisual />,
    'economic-effects': () => <EconomicEffectsVisual />,
    'control-equipment': () => <EquipmentVisual />,
    'smoke-control': () => <SmokeControlVisual />,
    ozone: () => <OzoneVisual />,
    photochemical: () => <PhotochemicalVisual />,
  };
  const Component = components[kind] ?? components['air-composition'];
  return <Component />;
}
