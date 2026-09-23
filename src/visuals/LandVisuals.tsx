import { useMemo, useState } from 'react';
import { ArrowLeftRight, Check, ChevronRight, Layers3, Sprout, Trees } from 'lucide-react';
import type { Chapter } from '../content/types';
import { InteractiveTag, Meter } from './shared';
import CutawayEarth3D from '../three/CutawayEarth3D';

export function FormationVisual() {
  const [time, setTime] = useState(14);
  const stage = time < 34 ? 'Molten beginning' : time < 68 ? 'Cooling crust' : 'Present day';
  return <div className="visual-formation">
    <InteractiveTag>FORMATION TIMELINE</InteractiveTag>
    <div className={`proto-earth proto-${Math.floor(time / 34)}`}><span className="proto-ring" /><span className="proto-sphere" /><i /><i /><i /><i /></div>
    <div className="visual-readout"><span>{stage}</span><strong>{time < 12 ? '4.6 BYA' : time < 55 ? '4.6 BILLION YEARS' : 'TODAY'}</strong></div>
    <label className="range-line"><span>4.6 billion years ago</span><input aria-label="Scrub the formation of Earth timeline" type="range" min="0" max="100" value={time} onChange={(e) => setTime(Number(e.target.value))} /><span>Today</span></label>
  </div>;
}

export function EarthLayersVisual() {
  return <CutawayEarth3D />;
}

export function TectonicsVisual() {
  const [step, setStep] = useState(0);
  return <div className="tectonics-visual">
    <InteractiveTag>CONTINENTAL DRIFT · SCHEMATIC</InteractiveTag>
    <div className={`drift-map drift-step-${step}`} role="img" aria-label="Schematic animation from Pangaea toward present continents">
      <div className="ocean-grid" /><div className="land-mass land-mass-a" /><div className="land-mass land-mass-b" /><div className="land-mass land-mass-c" /><div className="land-mass land-mass-d" />
      <span className="drift-label">{step === 0 ? 'PANGAEA' : step === 1 ? 'PLATES IN MOTION' : 'CONTINENTS TODAY'}</span>
      <div className="drift-waterline" />
    </div>
    <div className="segmented-control" role="group" aria-label="Continental drift stage">
      {['Pangaea', 'Drift', 'Today'].map((label, index) => <button key={label} type="button" aria-pressed={step === index} className={step === index ? 'selected' : ''} onClick={() => setStep(index)}>{label}</button>)}
    </div>
    <p className="visual-note">Illustrative sequence — not a geological time scale.</p>
  </div>;
}

export function LandCoverVisual() {
  const categories = [
    { label: 'Land', value: '20%', color: 'var(--accent)' },
    { label: 'Water', value: '80%', color: 'rgba(255,255,255,.12)' },
  ];
  return <div className="land-cover-visual">
    <InteractiveTag>EARTH SURFACE · LAND / WATER</InteractiveTag>
    <div className="land-cover-layout"><div className="donut-wrap land-donut"><div className="donut"><div className="donut-center"><strong>20%</strong><span>LAND</span></div></div><span className="orbit-caption">ONE FIFTH OF EARTH’S SURFACE</span></div>
      <div className="cover-legend">{categories.map((item) => <div className="legend-row" key={item.label}><i style={{ background: item.color }} /><span>{item.label}</span><strong>{item.value}</strong></div>)}<div className="mini-divider" /><p>Forests, wetlands, grasslands, farms and settlements share the land surface.</p></div>
    </div>
    <div className="land-cover-stripes"><span>FOREST</span><span>WETLAND</span><span>GRASSLAND</span><span>FARMLAND</span><span>SETTLEMENT</span></div>
  </div>;
}

export function SoilProfileVisual() {
  const [step, setStep] = useState(3);
  const layers = [{ label: 'Humus', color: '#4c3627' }, { label: 'Topsoil', color: '#795437' }, { label: 'Subsoil', color: '#a77747' }, { label: 'Weathered rock', color: '#927a5d' }, { label: 'Bedrock', color: '#60594e' }];
  return <div className="soil-profile-visual">
    <InteractiveTag>SOIL PROFILE · BUILD A HORIZON</InteractiveTag>
    <div className="soil-block">
      <div className="soil-plant"><span /><span /><span /><b /></div>
      {layers.map((layer, index) => <button key={layer.label} type="button" className={`soil-horizon ${step >= index ? 'revealed' : ''}`} style={{ '--soil-color': layer.color } as React.CSSProperties} onClick={() => setStep(index)} aria-label={`Reveal ${layer.label}`} aria-pressed={step >= index}><span>{layer.label}</span><small>{step >= index ? ['Organic matter', 'Roots & nutrients', 'Mineral accumulation', 'Fragmented parent material', 'Solid rock'][index] : 'Tap to reveal'}</small></button>)}
    </div>
    <label className="range-line"><span>Bedrock</span><input type="range" min="0" max="4" step="1" value={step} onChange={(e) => setStep(Number(e.target.value))} aria-label="Build the soil profile" /><span>Humus</span></label>
    <div className="process-pills"><span>WEATHERING <small>rock → particles</small></span><span>PEDOGENESIS <small>maturation → humus</small></span></div>
  </div>;
}

const landforms = [
  { name: 'Grassland', note: 'Up to 40% of terrestrial surface; present on every continent except Antarctica.', image: '/images/world-land.webp', tint: 'linear-gradient(180deg,rgba(7,8,7,.08),rgba(7,8,7,.84))' },
  { name: 'Wetland', note: 'Stores and purifies water; processes carbon and supports diverse life.', image: '/images/world-water.webp', tint: 'linear-gradient(180deg,rgba(7,8,7,.12),rgba(7,8,7,.82))' },
  { name: 'Forest', note: 'A complex, tree-dominated ecosystem with a closed canopy.', image: '/images/world-bio.webp', tint: 'linear-gradient(180deg,rgba(7,8,7,.1),rgba(7,8,7,.82))' },
  { name: 'Farmland', note: 'Land used systematically for crops and livestock.', image: '/images/world-land.webp', tint: 'linear-gradient(120deg,rgba(83,72,39,.1),rgba(7,8,7,.85))' },
  { name: 'Tundra', note: 'Tree growth is limited by cold temperatures and a short growing season.', image: '/images/world-air.webp', tint: 'linear-gradient(180deg,rgba(7,8,7,.1),rgba(7,8,7,.82))' },
  { name: 'Desert', note: 'A landscape where little precipitation occurs; occasional downpours can cause flash floods.', image: '/images/world-warming.webp', tint: 'linear-gradient(180deg,rgba(7,8,7,.1),rgba(7,8,7,.84))' },
  { name: 'Urban land', note: 'A human-modified environment of buildings, roads and infrastructure.', image: '/images/world-air.webp', tint: 'linear-gradient(180deg,rgba(7,8,7,.1),rgba(7,8,7,.84))' },
];

export function LandformsVisual() {
  const [active, setActive] = useState(0);
  const item = landforms[active];
  return <div className="landforms-visual">
    <InteractiveTag>LAND-FORM EXPLORER · {String(active + 1).padStart(2, '0')} / 07</InteractiveTag>
    <div className="landform-scene" style={{ backgroundImage: `${item.tint}, url(${item.image})` }}><div className="landform-scene-top"><span className="visual-index">LANDSCAPE / {String(active + 1).padStart(2, '0')}</span><span className="landform-index">0{active + 1}</span></div><div className="landform-copy"><h3>{item.name}</h3><p>{item.note}</p></div><div className={`landform-motif motif-${active}`} aria-hidden="true"><span /><span /><span /><span /><span /></div></div>
    <div className="landform-picker">{landforms.map((form, index) => <button key={form.name} type="button" aria-pressed={active === index} className={active === index ? 'selected' : ''} onClick={() => setActive(index)}>{form.name}</button>)}</div>
  </div>;
}

export function DefinitionVisual({ quote }: { quote?: string }) {
  return <div className="definition-visual"><InteractiveTag>FIELD DEFINITION</InteractiveTag><div className="definition-quote"><span className="quote-mark">“</span><p>{quote ?? 'Landform conservation is the protection and wise use of the land base — its form, soil and associated biophysical processes.'}</p></div><div className="definition-rules"><span>PROTECT NATURAL FORM</span><span>MINIMIZE DISRUPTION</span><span>KEEP SPACE OPEN</span></div><div className="strata-decoration" /></div>;
}

export function ForestSliderVisual() {
  const [value, setValue] = useState(54);
  return <div className="forest-compare-visual">
    <InteractiveTag>FOREST CHANGE · DRAG TO REVEAL</InteractiveTag>
    <div className="forest-slider-scene" style={{ '--split': `${value}%` } as React.CSSProperties}>
      <div className="forest-image forest-before" />
      <div className="forest-image forest-after" />
      <div className="forest-split-line"><span><ArrowLeftRight size={14} /></span></div>
      <span className="scene-label scene-left">FOREST COVER</span><span className="scene-label scene-right">LAND-USE CHANGE</span>
      <input type="range" min="8" max="92" value={value} onChange={(e) => setValue(Number(e.target.value))} aria-label="Compare forest cover and cleared land" />
    </div>
    <div className="forest-statline"><div><span>FAO definition in notes</span><strong>Canopy below 10%</strong></div><div><span>Other change</span><strong>Degradation · Fragmentation</strong></div></div>
  </div>;
}

export function LandUseVisual() {
  const [active, setActive] = useState(0);
  const stages = [
    { name: 'Natural', detail: 'Connected habitat, permeable ground, natural water movement.', color: '#49654b' },
    { name: 'Agricultural', detail: 'Managed crops and pasture; soil cover and runoff depend on practice.', color: '#967644' },
    { name: 'Developed', detail: 'Buildings and hard surfaces change drainage and can seal soil.', color: '#596064' },
  ];
  return <div className="land-use-visual">
    <InteractiveTag>LAND-USE STATE · SELECT TO MORPH</InteractiveTag>
    <div className={`land-tiles land-state-${active}`} role="img" aria-label={`Illustrative land-use pattern showing ${stages[active].name.toLowerCase()} land.`}>
      {Array.from({ length: 24 }, (_, i) => <span key={i} style={{ '--tile-delay': `${i * 16}ms` } as React.CSSProperties} />)}
      <div className="land-use-label"><span>FIELD MAP · {active + 1}/3</span><strong>{stages[active].name}</strong></div>
    </div>
    <div className="segmented-control" role="group" aria-label="Choose a land-use state">{stages.map((stage, index) => <button key={stage.name} type="button" aria-pressed={active === index} className={active === index ? 'selected' : ''} onClick={() => setActive(index)}>{stage.name}</button>)}</div>
    <p className="land-use-detail">{stages[active].detail}</p>
  </div>;
}

export function SoilHealthVisual() {
  const composition = [{ name: 'Mineral', value: 45, color: '#a88b69' }, { name: 'Air', value: 25, color: '#98a5a4' }, { name: 'Water', value: 25, color: '#4FA3C7' }, { name: 'Organic', value: 5, color: '#6FA96B' }];
  const indicators = ['Structure & texture', 'Nutrients · pH · salinity', 'Organic matter', 'Microbial activity'];
  const [checked, setChecked] = useState<number[]>([]);
  return <div className="soil-health-visual">
    <InteractiveTag>SOIL COMPOSITION · COURSE NOTES</InteractiveTag>
    <div className="composition-bar">{composition.map((item) => <div key={item.name} style={{ width: `${item.value}%`, background: item.color }}><span>{item.value}%</span></div>)}</div>
    <div className="composition-legend">{composition.map((item) => <span key={item.name}><i style={{ background: item.color }} />{item.name}<b>{item.value}%</b></span>)}</div>
    <div className="mini-divider" />
    <div className="checklist-visual" role="group" aria-label="Soil health indicators"><span className="visual-index">HEALTH INDICATORS</span>{indicators.map((item, index) => <button type="button" key={item} aria-pressed={checked.includes(index)} className={checked.includes(index) ? 'checked' : ''} onClick={() => setChecked((old) => old.includes(index) ? old.filter((x) => x !== index) : [...old, index])}><span className="check-square" aria-hidden="true">{checked.includes(index) && <Check size={12} />}</span>{item}</button>)}</div>
  </div>;
}

const degradation = [
  { name: 'Erosion', detail: 'Water or wind carries away topsoil and exposes less fertile material.', symbol: '↘' },
  { name: 'Fertility loss', detail: 'Nutrient depletion reduces the soil’s ability to sustain crops.', symbol: 'NPK' },
  { name: 'Landslides', detail: 'Slope failure can remove soil and damage land and infrastructure.', symbol: '⌁' },
  { name: 'Soil sealing', detail: 'Urban and industrial surfaces cover soil and interrupt infiltration.', symbol: '▰' },
  { name: 'Contamination', detail: 'Pollutants affect soil organisms, water and land use.', symbol: '•' },
  { name: 'Salination', detail: 'Accumulated salts can make soil less suitable for plants.', symbol: 'NaCl' },
];

export function DegradationVisual() {
  const [active, setActive] = useState(0);
  const [region, setRegion] = useState('India');
  return <div className={`degradation-visual degradation-${active}`}>
    <InteractiveTag>SOIL DEGRADATION · SELECT A MECHANISM</InteractiveTag>
    <div className="degradation-art"><div className="soil-hill"><span className="hill-surface" /><span className="hill-crack" /><span className="soil-particle p1" /><span className="soil-particle p2" /><span className="soil-particle p3" /></div><div className="degradation-reading"><span>MECHANISM 0{active + 1}</span><h3>{degradation[active].name}</h3><p>{degradation[active].detail}</p></div></div>
    <div className="degradation-picker" role="group" aria-label="Select a soil degradation mechanism">{degradation.map((item, index) => <button key={item.name} type="button" aria-pressed={active === index} className={active === index ? 'selected' : ''} onClick={() => setActive(index)}><span aria-hidden="true">{item.symbol}</span>{item.name}</button>)}</div>
    <div className="region-switch"><span>FOOD SECURITY LENS</span><div role="group" aria-label="Select a food security region"><button type="button" aria-pressed={region === 'India'} className={region === 'India' ? 'selected' : ''} onClick={() => setRegion('India')}>India</button><button type="button" aria-pressed={region === 'Sub-Saharan Africa'} className={region === 'Sub-Saharan Africa' ? 'selected' : ''} onClick={() => setRegion('Sub-Saharan Africa')}>Sub-Saharan Africa</button></div></div>
    <p className="visual-note">{region === 'India' ? 'The notes connect soil degradation with lower crop productivity, economic loss and pressure on food security.' : 'The notes identify nutrient depletion as a major degradation process linked with lower productivity, hunger and poverty.'}</p>
  </div>;
}

const strategies = ['Less disturbance', 'Crop rotation', 'Cover crops', 'Diversify', 'Organic amendments', 'Integrate livestock', 'Terraces', 'Shelter belts'];

export function SoilConservationVisual() {
  const [selected, setSelected] = useState<number[]>([6, 7]);
  const toggle = (index: number) => setSelected((old) => old.includes(index) ? old.filter((x) => x !== index) : [...old, index]);
  const treeCount = selected.includes(7) ? 6 : 2;
  return <div className="soil-conservation-visual">
    <InteractiveTag>CONSERVATION FARM · TOGGLE A PRACTICE</InteractiveTag>
    <div className={`farm-hillside${selected.includes(6) ? ' has-terraces' : ''}${selected.includes(2) ? ' has-cover' : ''}`}>
      <div className="farm-sun" /><div className="farm-slope" /><div className="farm-field-lines" />
      <div className="farm-trees">{Array.from({ length: treeCount }, (_, i) => <span key={i} style={{ left: `${12 + i * 12}%` }}><i /></span>)}</div>
      <div className="farm-counter">SOIL SAVED <strong>{Math.min(100, selected.length * 12)}%</strong></div>
      {selected.includes(6) && <div className="terrace-lines" aria-hidden="true"><span /><span /><span /></div>}
      {selected.includes(2) && <div className="cover-crop-lines" aria-hidden="true"><span /><span /><span /><span /></div>}
    </div>
    <Meter value={selected.length * 12} label="Practices active" color="var(--accent)" />
    <div className="strategy-toggles">{strategies.map((strategy, index) => <button key={strategy} type="button" aria-pressed={selected.includes(index)} className={selected.includes(index) ? 'selected' : ''} onClick={() => toggle(index)}><span>{selected.includes(index) ? <Check size={11} /> : <Sprout size={11} />}</span>{strategy}</button>)}</div>
  </div>;
}

export function LandPlanningVisual() {
  const [active, setActive] = useState(3);
  const points = [
    { date: '1700s', title: 'Wealth', body: 'Land is understood as wealth.' },
    { date: 'LATER', title: 'Commodity', body: 'Land is treated as a commodity.' },
    { date: 'LATER STILL', title: 'Scarce resource', body: 'Land is recognized as limited.' },
    { date: '1980s →', title: 'Community resource', body: 'Land represents both wealth and a shared resource.' },
  ];
  return <div className="land-planning-visual">
    <InteractiveTag>HOW THE IDEA OF LAND CHANGED</InteractiveTag>
    <div className="planning-landscape"><div className="planning-sun" /><div className="planning-horizon" /><div className="planning-field" /><div className="planning-tree"><span /><i /><i /><i /></div><span className="planning-coordinate">LAND · PEOPLE · TIME</span></div>
    <div className="timeline-rail" role="group" aria-label="Land concept timeline">{points.map((point, index) => <button key={point.title} type="button" aria-pressed={active === index} className={active === index ? 'selected' : ''} onClick={() => setActive(index)}><span className="timeline-dot" aria-hidden="true" /><small>{point.date}</small><strong>{point.title}</strong></button>)}</div>
    <p className="visual-note">{points[active].body} Sustainable planning assesses land and water, alternatives, and social and economic conditions.</p>
  </div>;
}

export function LandVisual({ kind, chapter }: { kind: string; chapter: Chapter }) {
  const components: Record<string, () => JSX.Element> = useMemo(() => ({
    formation: () => <FormationVisual />,
    'earth-layers': () => <EarthLayersVisual />,
    tectonics: () => <TectonicsVisual />,
    'land-cover': () => <LandCoverVisual />,
    'soil-profile': () => <SoilProfileVisual />,
    landforms: () => <LandformsVisual />,
    definition: () => <DefinitionVisual quote={chapter.quote} />,
    'forest-slider': () => <ForestSliderVisual />,
    'land-use': () => <LandUseVisual />,
    'soil-health': () => <SoilHealthVisual />,
    degradation: () => <DegradationVisual />,
    'soil-conservation': () => <SoilConservationVisual />,
    'land-planning': () => <LandPlanningVisual />,
  }), [chapter.quote]);
  const Component = components[kind] ?? components.definition;
  return <Component />;
}
