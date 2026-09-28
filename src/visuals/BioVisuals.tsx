import { useState } from 'react';
import { Check, CircleDot, Dna, Fish, Leaf, PawPrint, TreePine } from 'lucide-react';
import type { Chapter } from '../content/types';
import { InteractiveTag, Meter } from './shared';

const lifeKinds = [
  { title: 'Genetic', detail: 'Variation within a species; the gene pool makes populations diverse.', cue: 'DNA → individual variation' },
  { title: 'Species', detail: 'The number of species and their relative abundance in a region.', cue: 'Species richness + abundance' },
  { title: 'Ecosystem', detail: 'The variety of ecosystems across a place or region.', cue: 'Natural ↔ modified systems' },
];
export function BiodiversityIntroVisual() {
  const [active, setActive] = useState<number[]>([]);
  const items = [{ name: 'Flora', icon: <Leaf size={22} />, color: '#8fc77a' }, { name: 'Fauna', icon: <PawPrint size={22} />, color: '#c9a15a' }, { name: 'Microorganisms', icon: <CircleDot size={22} />, color: '#4fa3c7' }];
  return <div className="bio-intro-visual">
    <InteractiveTag>THREE THREADS · ONE LIVING WEB</InteractiveTag>
    <div className="bio-triad" role="group" aria-label="Connect components of biodiversity">{items.map((item, index) => <button key={item.name} type="button" aria-pressed={active.includes(index)} className={active.includes(index) ? 'selected' : ''} onClick={() => setActive((old) => old.includes(index) ? old.filter((x) => x !== index) : [...old, index])} style={{ '--life-color': item.color } as React.CSSProperties}><span className="bio-icon" aria-hidden="true">{item.icon}</span><small>0{index + 1}</small><strong>{item.name}</strong><i className={`bio-thread thread-${index}`} aria-hidden="true" /></button>)}</div>
    <div className={`bio-union${active.length === 3 ? ' united' : ''}`}><span>{active.length === 3 ? 'CONNECTED' : 'TOGETHER'}</span><strong>BIODIVERSITY</strong></div>
    <p className="visual-note">Tap each thread to see how plant life, animal life and microorganisms contribute to biological diversity.</p>
  </div>;
}

export function LifeScaleVisual() {
  const [active, setActive] = useState(0);
  const groups = [
    { label: 'Terrestrial species', value: '8.7M', width: 78 },
    { label: 'Oceanic species', value: '2.2M', width: 42 },
    { label: 'Vascular plants', value: '220K', width: 26 },
    { label: 'Insects', value: '10–30M', width: 95 },
    { label: 'Bacteria', value: '5–10M', width: 72 },
    { label: 'Fungi', value: '1.5–3M', width: 54 },
  ];
  return <div className="life-scale-visual">
    <InteractiveTag>ZOOM THROUGH THE LEVELS OF LIFE</InteractiveTag>
    <div className={`life-scale-art life-level-${active}`}><div className="scale-orbit orbit-one" /><div className="scale-orbit orbit-two" /><div className="scale-center"><span>{active === 0 ? <Dna size={28} /> : active === 1 ? <PawPrint size={28} /> : <TreePine size={28} />}</span><strong>{active === 0 ? 'GENE' : active === 1 ? 'SPECIES' : 'ECOSYSTEM'}</strong></div><div className="scale-caption">{lifeKinds[active].cue}</div></div>
    <div className="scale-selector" role="group" aria-label="Choose a biodiversity level">{lifeKinds.map((item, index) => <button key={item.title} type="button" aria-pressed={active === index} className={active === index ? 'selected' : ''} onClick={() => setActive(index)}><span>0{index + 1}</span>{item.title}</button>)}</div>
    <p className="life-scale-detail">{lifeKinds[active].detail}</p>
    <div className="species-estimates"><span className="visual-index">ESTIMATES IN THE SUPPLIED NOTES</span>{groups.map((group) => <div className="species-row" key={group.label}><span>{group.label}</span><div><i style={{ width: `${group.width}%` }} /></div><strong>{group.value}</strong></div>)}<small>Estimates are reproduced from the course notes; not a current global census.</small></div>
  </div>;
}

const values = [
  { name: 'Consumptive use', short: '01', description: 'Direct use by local communities, including food, fuelwood, fodder and medicinal plants.', example: 'Food · fuel · drugs' },
  { name: 'Productive use', short: '02', description: 'Biological products with commercial value, marketed and sold.', example: 'Silk · wool · timber · cotton' },
  { name: 'Social value', short: '03', description: 'The role of bio-resources in social life, religion and spiritual practice.', example: 'Tulsi · lotus · Ganga' },
  { name: 'Ethical & moral', short: '04', description: 'The belief that species have a right to exist, whether or not people use them.', example: 'Live and let others live' },
  { name: 'Aesthetic', short: '05', description: 'Beauty, knowledge, imagination and creativity inspired by living things.', example: 'Ecotourism · flowers · butterflies' },
  { name: 'Option value', short: '06', description: 'The potential future use and value of biodiversity not yet known.', example: 'Future medicines · discoveries' },
];
const plantDrugs = [['Quinine', 'Cinchona bark', 'Malaria treatment'], ['Morphine', 'Opium poppy', 'Analgesic'], ['Atropine', 'Belladonna', 'Intestinal pain'], ['L-Dopa', 'Velvet bean', 'Parkinson’s disease']];
export function BiodiversityValuesVisual() {
  const [active, setActive] = useState(0);
  return <div className="biodiversity-values-visual">
    <InteractiveTag>VALUES OF BIODIVERSITY · SELECT A SEGMENT</InteractiveTag>
    <div className="value-wheel-layout"><div className="value-wheel" role="group" aria-label="Select a biodiversity value">{values.map((item, index) => <button key={item.name} type="button" aria-pressed={active === index} className={`value-segment segment-${index}${active === index ? ' selected' : ''}`} onClick={() => setActive(index)} aria-label={item.name}><span aria-hidden="true">{item.short}</span></button>)}<div className="wheel-center"><span>VALUE</span><strong>OF LIFE</strong></div></div><div className="value-detail"><span className="visual-index">VALUE 0{active + 1} / 06</span><h3>{values[active].name}</h3><p>{values[active].description}</p><strong className="value-example">{values[active].example}</strong></div></div>
    <div className="plant-drug-table"><div className="table-title"><span>FIELD TABLE</span><strong>Medicines from biodiversity</strong><small>Examples from the supplied notes</small></div><div className="plant-drugs">{plantDrugs.map((row) => <div key={row[0]}><strong>{row[0]}</strong><span>{row[1]}</span><small>{row[2]}</small></div>)}</div></div>
  </div>;
}

const threatOptions = [
  { name: 'Habitat loss', icon: '01', note: 'Natural habitat is cleared or altered.' },
  { name: 'Overpopulation', icon: '02', note: 'Growing demand changes natural ecosystems.' },
  { name: 'Pollution', icon: '03', note: 'Pollutants harm organisms and alter habitat.' },
  { name: 'Climate change', icon: '04', note: 'Temperature and rainfall shifts affect species.' },
  { name: 'Exotic species', icon: '05', note: 'Introduced species can compete or alter habitats.' },
  { name: 'Overuse', icon: '06', note: 'Wildlife trade and overuse of vegetation remove species.' },
];
export function ThreatsVisual() {
  const [threats, setThreats] = useState<number[]>([0, 2]);
  const [restore, setRestore] = useState(false);
  const impact = restore ? Math.max(0, threats.length - 2) : threats.length;
  const richness = Math.max(24, 100 - impact * 12);
  return <div className={`threats-visual${restore ? ' is-restored' : ''}`}>
    <InteractiveTag>THREAT SCENE · APPLY OR RESTORE</InteractiveTag>
    <div className={`habitat-scene threat-count-${impact}`}><div className="habitat-sun" /><div className="habitat-hills" /><div className="habitat-water" /><div className="habitat-trees">{Array.from({ length: Math.max(2, 9 - impact) }, (_, i) => <span key={i} style={{ left: `${8 + (i * 10)}%` }}><i /></span>)}</div><div className="habitat-species"><PawPrint size={22} /><Fish size={17} /><Leaf size={17} /></div><span className="habitat-caption">HABITAT CONDITION · {restore ? 'RESTORING' : 'UNDER PRESSURE'}</span></div>
    <div className="threat-meter"><Meter value={richness} label="Illustrative habitat richness" color={restore ? '#6fa96b' : '#d8703f'} /><p>Index is illustrative, not a species count.</p></div>
    <div className="threat-toggle-grid" role="group" aria-label="Apply biodiversity pressures">{threatOptions.map((item, index) => <button key={item.name} type="button" aria-pressed={threats.includes(index)} className={threats.includes(index) ? 'selected' : ''} onClick={() => setThreats((old) => old.includes(index) ? old.filter((x) => x !== index) : [...old, index])}><span aria-hidden="true">{item.icon}</span>{item.name}</button>)}</div>
    <button type="button" className={`restore-toggle${restore ? ' selected' : ''}`} aria-pressed={restore} onClick={() => setRestore(!restore)}><span>{restore && <Check size={12} />}</span>{restore ? 'Solutions active · restore habitat' : 'Apply habitat-restoration solutions'}</button>
  </div>;
}

const conservationMethods = {
  'In-situ': ['Biosphere reserves', 'National parks', 'Wildlife sanctuaries', 'On-farm conservation'],
  'Ex-situ': ['Zoos & captive breeding', 'Seed / gene banks', 'Pollen culture', 'Reproductive technology'],
};
type ConservationMode = keyof typeof conservationMethods;
export function ConservationVisual() {
  const [mode, setMode] = useState<ConservationMode>('In-situ');
  const [active, setActive] = useState(0);
  const methods = conservationMethods[mode];
  return <div className="conservation-visual">
    <InteractiveTag>CONSERVATION · IN-SITU / EX-SITU</InteractiveTag>
    <div className="conservation-split-scene"><div className={`conservation-side side-wild${mode === 'In-situ' ? ' active' : ''}`}><TreePine size={25} /><span>IN-SITU</span><strong>Protected habitat</strong></div><div className={`conservation-side side-care${mode === 'Ex-situ' ? ' active' : ''}`}><Dna size={25} /><span>EX-SITU</span><strong>Care & preservation</strong></div><div className="conservation-slider" /></div>
    <div className="segmented-control" role="group" aria-label="Choose a conservation approach"><button type="button" aria-pressed={mode === 'In-situ'} className={mode === 'In-situ' ? 'selected' : ''} onClick={() => { setMode('In-situ'); setActive(0); }}>In-situ · on-site</button><button type="button" aria-pressed={mode === 'Ex-situ'} className={mode === 'Ex-situ' ? 'selected' : ''} onClick={() => { setMode('Ex-situ'); setActive(0); }}>Ex-situ · off-site</button></div>
    <div className="conservation-methods" role="group" aria-label={`Select a ${mode} conservation method`}>{methods.map((method, index) => <button key={method} type="button" aria-pressed={active === index} className={active === index ? 'selected' : ''} onClick={() => setActive(index)}><span aria-hidden="true">0{index + 1}</span>{method}</button>)}</div>
    <p className="visual-note">{mode === 'In-situ' ? 'Protect species where they naturally occur.' : 'Maintain or breed species under partially or wholly controlled conditions.'} · Selected: {methods[active]}</p>
  </div>;
}

export function EcosystemComponentsVisual() {
  const [active, setActive] = useState<'biotic' | 'abiotic'>('biotic');
  const items = active === 'biotic' ? ['Producers', 'Primary consumers', 'Secondary consumers', 'Decomposers'] : ['Sunlight', 'Water', 'Soil', 'Air', 'Temperature'];
  return <div className={`ecosystem-components-visual ecosystem-${active}`}>
    <InteractiveTag>ECOSYSTEM COMPONENTS · SELECT A LENS</InteractiveTag>
    <div className="component-switch" role="group" aria-label="Choose an ecosystem component type"><button type="button" aria-pressed={active === 'biotic'} className={active === 'biotic' ? 'selected' : ''} onClick={() => setActive('biotic')}>Biotic · living</button><button type="button" aria-pressed={active === 'abiotic'} className={active === 'abiotic' ? 'selected' : ''} onClick={() => setActive('abiotic')}>Abiotic · non-living</button></div>
    <div className="ecosystem-wheel"><div className="ecosystem-core">{active === 'biotic' ? <Leaf size={26} /> : <CircleDot size={26} />}<strong>{active.toUpperCase()}</strong></div><div className="ecosystem-orbit orbit-a" /><div className="ecosystem-orbit orbit-b" /><div className="ecosystem-nodes">{items.map((item, index) => <span key={item} className={`ecosystem-node node-${index}`}><i />{item}</span>)}</div></div>
    <div className="energy-flow">{(active === 'biotic' ? items : ['Energy', 'Matter', 'Habitat']).map((item, index, array) => <span key={item}>{item}{index < array.length - 1 && <b>→</b>}</span>)}</div>
  </div>;
}

const biomes = [
  { name: 'Forest', detail: 'Layered canopy, understory and forest floor; decomposers return nutrients.', image: '/images/world-bio.webp' },
  { name: 'Desert', detail: 'Low precipitation; organisms are adapted to water stress and temperature extremes.', image: '/images/world-warming.webp' },
  { name: 'Grassland', detail: 'Grass-dominated systems shaped by climate, water availability and grazing.', image: '/images/world-land.webp' },
  { name: 'Aquatic', detail: 'Freshwater, lakes and ponds (lentic), and marine or ocean systems.', image: '/images/world-water.webp' },
  { name: 'Estuarine', detail: 'A transition where river water meets the sea; salinity changes across the system.', image: '/images/world-water.webp' },
  { name: 'Wetland', detail: 'Permanently or seasonally flooded habitat with adapted vegetation.', image: '/images/world-bio.webp' },
];
export function BiomeExplorerVisual() {
  const [active, setActive] = useState(0);
  const biome = biomes[active];
  return <div className="biome-explorer-visual">
    <InteractiveTag>BIOME EXPLORER · {String(active + 1).padStart(2, '0')} / 06</InteractiveTag>
    <div className="biome-scene" style={{ backgroundImage: `linear-gradient(180deg,rgba(7,8,7,.02),rgba(7,8,7,.88)),url(${biome.image})` }}><span className="biome-coordinate">ECOSYSTEM / 0{active + 1}</span><div><h3>{biome.name}</h3><p>{biome.detail}</p></div><div className={`biome-atmosphere biome-${active}`} /></div>
    <div className="biome-selector" role="group" aria-label="Choose a biome">{biomes.map((item, index) => <button key={item.name} type="button" aria-pressed={active === index} className={active === index ? 'selected' : ''} onClick={() => setActive(index)}>{item.name}</button>)}</div>
    {biome.name === 'Aquatic' && <div className="lake-zones"><span className="visual-index">LAKE / POND ZONES</span><div><b>Littoral</b><b>Limnetic</b><b>Profundal</b></div><p>Near shore · open water · deeper water</p></div>}
  </div>;
}

const cycleCopy = {
  Carbon: 'Photosynthesis, respiration and decomposition move carbon through organisms and the environment.',
  Nitrogen: 'Nitrogen-fixing bacteria and decomposers connect atmospheric nitrogen with living systems and soil.',
  Water: 'Evaporation and transpiration move water; organisms link biological and physical processes.',
  Phosphorus: 'Plants and decomposers connect phosphorus in organisms with soil and other reservoirs.',
};
type CycleName = keyof typeof cycleCopy;
export function BiogeochemicalVisual() {
  const [active, setActive] = useState<CycleName>('Carbon');
  return <div className="biogeochemical-visual">
    <InteractiveTag>MATTER MOVES · CHOOSE A BIOGEOCHEMICAL CYCLE</InteractiveTag>
    <div className={`cycle-orbit-diagram cycle-${active.toLowerCase()}`}><div className="cycle-orbit-center"><span>{active.toUpperCase()}</span><small>CYCLE</small></div><div className="cycle-orbit-node n1">Atmosphere</div><div className="cycle-orbit-node n2">Organisms</div><div className="cycle-orbit-node n3">Soil / water</div><div className="cycle-orbit-node n4">Decomposers</div><svg viewBox="0 0 300 210" aria-hidden="true"><defs><marker id="cycleArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0L6 3L0 6Z" fill="var(--accent)" /></marker></defs><path d="M85 48 Q150 6 215 49" markerEnd="url(#cycleArrow)" /><path d="M241 75 Q273 133 211 166" markerEnd="url(#cycleArrow)" /><path d="M186 178 Q103 201 63 144" markerEnd="url(#cycleArrow)" /><path d="M55 118 Q34 75 75 53" markerEnd="url(#cycleArrow)" /></svg></div>
    <div className="cycle-tabs" role="group" aria-label="Choose a biogeochemical cycle">{(Object.keys(cycleCopy) as CycleName[]).map((name) => <button key={name} type="button" aria-pressed={active === name} className={active === name ? 'selected' : ''} onClick={() => setActive(name)}>{name}</button>)}</div>
    <p className="visual-note">{cycleCopy[active]}</p>
  </div>;
}

const medicinalCards = [
  { name: 'Quinine', source: 'Cinchona bark', use: 'Malaria treatment' },
  { name: 'Morphine', source: 'Opium poppy', use: 'Analgesic' },
  { name: 'Taxol', source: 'Yew tree', use: 'Anticancer drug' },
];
export function MedicinalFisheriesVisual() {
  const [active, setActive] = useState(0);
  return <div className="medicinal-fisheries-visual">
    <InteractiveTag>BIODIVERSITY · USE, KNOWLEDGE, LIVELIHOODS</InteractiveTag>
    <div className="medicine-card-row" role="group" aria-label="Explore medicines from plants">{medicinalCards.map((item, index) => <button type="button" key={item.name} aria-pressed={active === index} className={active === index ? 'selected' : ''} onClick={() => setActive(index)}><span className="medicine-leaf" aria-hidden="true"><Leaf size={20} /></span><small>PLANT / DRUG 0{index + 1}</small><strong>{item.name}</strong><span>{item.source}</span>{active === index && <p>{item.use}</p>}</button>)}</div>
    <div className="fisheries-panel"><div className="fish-icon"><Fish size={28} /></div><div><span className="visual-index">FRESHWATER BIODIVERSITY</span><strong>41%</strong><p>of the world’s known fish species are in freshwater ecosystems, according to the supplied notes.</p></div><div className="fish-ripples"><i /><i /><i /></div></div>
  </div>;
}

export function BioVisual({ kind }: { kind: string; chapter: Chapter }) {
  const components: Record<string, () => JSX.Element> = {
    'biodiversity-intro': () => <BiodiversityIntroVisual />,
    'life-scale': () => <LifeScaleVisual />,
    'biodiversity-values': () => <BiodiversityValuesVisual />,
    threats: () => <ThreatsVisual />,
    conservation: () => <ConservationVisual />,
    'ecosystem-components': () => <EcosystemComponentsVisual />,
    'biome-explorer': () => <BiomeExplorerVisual />,
    'biogeochemical-cycles': () => <BiogeochemicalVisual />,
    'medicinal-fisheries': () => <MedicinalFisheriesVisual />,
  };
  const Component = components[kind] ?? components['biodiversity-intro'];
  return <Component />;
}
