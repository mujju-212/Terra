import { useState } from 'react';
import { ArrowDown, ArrowLeftRight, ArrowUp, Check, Droplet, Droplets, Waves } from 'lucide-react';
import type { Chapter } from '../content/types';
import { IndiaMapGraphic, InteractiveTag, Meter } from './shared';

const cycleStages = [
  { name: 'Evaporation', detail: 'Sunlight warms surface water; water vapour rises.', position: 'cycle-sun' },
  { name: 'Condensation', detail: 'Cooling water vapour forms clouds.', position: 'cycle-cloud' },
  { name: 'Precipitation', detail: 'Water returns to land and sea as rain.', position: 'cycle-rain' },
  { name: 'Runoff', detail: 'Water flows across the land toward rivers and the sea.', position: 'cycle-river' },
  { name: 'Infiltration', detail: 'Some water moves below the surface and recharges aquifers.', position: 'cycle-ground' },
];

export function WaterCycleVisual() {
  const [active, setActive] = useState(0);
  const item = cycleStages[active];
  return <div className="water-cycle-visual">
    <InteractiveTag>HYDROLOGICAL CYCLE · SELECT A STAGE</InteractiveTag>
    <div className={`cycle-landscape ${item.position}`} role="img" aria-label={`Hydrological cycle illustration. Current stage: ${item.name}. ${item.detail}`}>
      <div className="cycle-sun"><span /></div><div className="cycle-cloud"><i /><i /><i /></div><div className="cycle-mountain" /><div className="cycle-rain"><i /><i /><i /><i /></div><div className="cycle-water" /><div className="cycle-ground"><span /><span /><span /></div><div className="cycle-flow flow-a" /><div className="cycle-flow flow-b" /><div className="cycle-flow flow-c" />
      <span className="cycle-label label-ocean">OCEAN / LAKE</span><span className="cycle-label label-aquifer">AQUIFER</span><span className="cycle-label label-cloud">ATMOSPHERE</span>
    </div>
    <div className="cycle-info"><div><span className="visual-index">STAGE 0{active + 1} / 05</span><h3>{item.name}</h3></div><p>{item.detail}</p></div>
    <div className="cycle-controls" role="group" aria-label="Select a hydrological cycle stage">{cycleStages.map((stage, index) => <button type="button" key={stage.name} aria-pressed={active === index} className={active === index ? 'selected' : ''} onClick={() => setActive(index)}><span>{String(index + 1).padStart(2, '0')}</span>{stage.name}</button>)}</div>
  </div>;
}

const sources = [
  { name: 'Rain water', detail: 'Roof catchment → tank / cistern. Prepared catchments can feed reservoirs.', symbol: 'RAIN', icon: <Droplets size={20} /> },
  { name: 'Surface water', detail: 'Rivers, natural lakes, diversions and reservoir storage.', symbol: 'SURFACE', icon: <Waves size={20} /> },
  { name: 'Groundwater', detail: 'Springs, wells, borewells, infiltration galleries and collector wells.', symbol: 'GROUND', icon: <Droplet size={20} /> },
  { name: 'Reclamation', detail: 'Desalination and treated wastewater reuse.', symbol: 'REUSE', icon: <ArrowLeftRight size={20} /> },
];

export function WaterSourcesVisual() {
  const [active, setActive] = useState(0);
  return <div className={`water-sources-visual source-${active}`}>
    <InteractiveTag>FOUR SOURCES · OPEN A METHOD</InteractiveTag>
    <div className="water-source-landscape" role="group" aria-label="Select a water source"><div className="source-sky" aria-hidden="true" /><div className="source-hill" aria-hidden="true" /><div className="source-aquifer" aria-hidden="true" /><button type="button" className="source-hotspot hotspot-rain" aria-pressed={active === 0} onClick={() => setActive(0)} aria-label="Select rain water">•••</button><button type="button" className="source-hotspot hotspot-river" aria-pressed={active === 1} onClick={() => setActive(1)} aria-label="Select surface water">~</button><button type="button" className="source-hotspot hotspot-well" aria-pressed={active === 2} onClick={() => setActive(2)} aria-label="Select groundwater">○</button><button type="button" className="source-hotspot hotspot-reuse" aria-pressed={active === 3} onClick={() => setActive(3)} aria-label="Select reclamation">↻</button><div className="source-path" aria-hidden="true" /></div>
    <div className="source-card-row" role="group" aria-label="Water source details">{sources.map((source, index) => <button key={source.name} type="button" aria-pressed={active === index} className={`source-card${active === index ? ' selected' : ''}`} onClick={() => setActive(index)}><span className="source-symbol" aria-hidden="true">{source.icon}</span><small>0{index + 1} · {source.symbol}</small><strong>{source.name}</strong>{active === index && <p>{source.detail}</p>}</button>)}</div>
  </div>;
}

const waterScales = [
  { label: 'All water', value: '100%', note: 'The full planetary water store.', className: 'scale-all' },
  { label: 'Freshwater', value: '2.5%', note: 'Only 2.5% of Earth’s water is freshwater in the notes.', className: 'scale-fresh' },
  { label: 'Surface freshwater', value: '~1%', note: 'About 1% of freshwater is surface water; most is in ice or groundwater.', className: 'scale-access' },
];
export function WaterGlobeVisual() {
  const [step, setStep] = useState(0);
  const current = waterScales[step];
  return <div className="water-globe-visual">
    <InteractiveTag>GLOBAL WATER · CHANGE THE SCALE</InteractiveTag>
    <div className="water-globe-layout"><div className={`water-sphere ${current.className}`}><div className="sphere-continent" /><div className="sphere-drop"><Droplet size={11} /></div><span className="sphere-value">{current.value}</span><span className="sphere-label">{current.label}</span></div><div className="water-breakdown"><span className="visual-index">THE FRESHWATER FRACTION</span><div className="water-break-row"><span>Ice caps & glaciers</span><div><i style={{ width: '79%' }} /></div><strong>79%</strong></div><div className="water-break-row"><span>Groundwater</span><div><i style={{ width: '20%' }} /></div><strong>20%</strong></div><div className="water-break-row"><span>Surface freshwater</span><div><i style={{ width: '1%' }} /></div><strong>~1%</strong></div><p>Lakes 52% · Soil 38% of surface freshwater in the notes.</p></div></div>
    <div className="visual-controls"><div className="scale-stepper" role="group" aria-label="Choose water scale">{waterScales.map((scale, index) => <button type="button" key={scale.label} aria-pressed={step === index} className={step === index ? 'selected' : ''} onClick={() => setStep(index)}><span>0{index + 1}</span>{scale.label}</button>)}</div><p className="visual-note">{current.note}</p></div>
  </div>;
}

const riverGroups = [
  { name: 'Indus system', examples: 'Indus · Jhelum · Chenab · Ravi · Beas · Sutlej', detail: 'Flows from the north toward the west and south-west, reaching the Arabian Sea through Pakistan.' },
  { name: 'Ganga–Brahmaputra–Meghna', examples: 'Ganga · Brahmaputra · Meghna · Yamuna · Sone · Gandak · Kosi', detail: 'The linked system drains to the Bay of Bengal through Bangladesh.' },
  { name: 'Rajasthan & Gujarat', examples: 'Mahi · Sabarmati · Luni', detail: 'Arid-region rivers carry comparatively little flow; some are land-locked.' },
  { name: 'East-flowing peninsular', examples: 'Mahanadi · Krishna · Godavari · Kaveri', detail: 'Major rivers flow east to the Bay of Bengal.' },
  { name: 'West-flowing peninsular', examples: 'Narmada · Tapi', detail: 'These central Indian rivers flow west to the Arabian Sea.' },
  { name: 'Western-coast rivers', examples: 'Coastal Maharashtra · Karnataka · Kerala', detail: 'Short rivers in a high-rainfall belt; notes say they drain 3% of India’s land but carry 11% of its water resources.' },
];
export function IndiaRiversVisual() {
  const [active, setActive] = useState(0);
  const basin = riverGroups[active];
  return <div className="india-rivers-visual">
    <InteractiveTag>INDIA · RIVER-BASIN SYSTEMS</InteractiveTag>
    <div className="india-map-layout"><div className="india-map-frame"><IndiaMapGraphic mode="rivers" selected={active} /><span className="map-compass">N <i>↑</i></span></div><div className="basin-panel"><span className="visual-index">BASIN GROUP 0{active + 1} / 06</span><h3>{basin.name}</h3><p>{basin.detail}</p><div className="basin-rivers">{basin.examples.split(' · ').map((river) => <span key={river}>{river}</span>)}</div></div></div>
    <div className="basin-selector">{riverGroups.map((group, index) => <button type="button" key={group.name} aria-pressed={active === index} className={active === index ? 'selected' : ''} onClick={() => setActive(index)}><span>0{index + 1}</span>{group.name}</button>)}</div>
  </div>;
}

const sectors = [
  { name: 'Agriculture', value: 69, detail: 'Irrigation is the largest global water-use sector in the course notes.' },
  { name: 'Industry', value: 15, detail: 'Includes cooling and process water for power, refining and manufacturing.' },
  { name: 'Household', value: 15, detail: 'Drinking, bathing, cooking, sanitation and gardening.' },
  { name: 'Recreation', value: 1, detail: 'A small but growing share, often associated with reservoirs.' },
];
export function WaterUsesVisual() {
  const [active, setActive] = useState(0);
  return <div className="water-uses-visual">
    <InteractiveTag>WATER USE · COURSE-NOTE SHARES</InteractiveTag>
    <div className="water-usage-chart" role="group" aria-label="Select a water-use sector">{sectors.map((sector, index) => <button type="button" key={sector.name} aria-pressed={active === index} className={`usage-row${active === index ? ' selected' : ''}`} onClick={() => setActive(index)}><span className="usage-label"><small>0{index + 1}</small>{sector.name}</span><span className="usage-bar" aria-hidden="true"><i style={{ width: `${sector.value === 1 ? 4 : sector.value}%` }} /></span><strong>{sector.value === 1 ? 'Small' : `${sector.value}%`}</strong></button>)}</div>
    <div className="usage-insight"><span className="visual-index">SELECTED SECTOR</span><p>{sectors[active].detail}</p></div>
    <p className="visual-note">Rounded note: the listed 69% + 15% + 15% shares total 99%; recreation is described as very small.</p>
  </div>;
}

export function WaterStressVisual() {
  const [availability, setAvailability] = useState(1600);
  const label = availability >= 1700 ? 'Adequate' : availability >= 1000 ? 'Water stressed' : 'Water scarce';
  return <div className="water-stress-visual">
    <InteractiveTag>INDIA · WATER AVAILABILITY</InteractiveTag>
    <div className="stress-ratio"><div><strong>1/6</strong><span>of global population</span></div><span className="ratio-separator">/</span><div><strong>1/25</strong><span>of world water resources</span></div></div>
    <div className="availability-meter"><div className="availability-scale"><span>Scarcity<br />&lt;1,000</span><span>Stress<br />1,000–1,700</span><span>Adequate<br />1,700+</span></div><div className="availability-track"><i style={{ left: `${Math.min(100, (availability / 2500) * 100)}%` }} /><span /></div><div className="availability-value"><strong>{availability.toLocaleString()} m³</strong><span>/ person / year · {label}</span></div></div>
    <label className="range-line"><span>0</span><input type="range" min="500" max="2500" step="50" value={availability} onChange={(e) => setAvailability(Number(e.target.value))} aria-label="Adjust annual per-capita water availability" /><span>2,500</span></label>
    <p className="visual-note">The supplied notes place India at approximately 1,600 m³ per person per year and classify that as water-stressed.</p>
  </div>;
}

export function BasinTransferVisual() {
  const [flow, setFlow] = useState(true);
  return <div className="basin-transfer-visual">
    <InteractiveTag>INTER-BASIN WATER TRANSFER · CONCEPT</InteractiveTag>
    <div className={`basin-transfer-scene${flow ? ' is-flowing' : ''}`}><div className="basin-pool pool-surplus"><span>SURPLUS</span><strong>River basin A</strong><i>••••</i></div><div className="transfer-canal"><span className="canal-node" /><span className="canal-node" /><span className="canal-node" /><span className="canal-arrow">→</span><small>CANAL / LINK</small></div><div className="basin-pool pool-deficit"><span>DEFICIT</span><strong>River basin B</strong><i>···</i></div></div>
    <div className="transfer-actions"><p>Transfer is proposed to address uneven availability and hydrologic extremes.</p><button type="button" className="quiet-control" aria-pressed={flow} onClick={() => setFlow(!flow)}>{flow ? 'Pause flow' : 'Start flow'} <ArrowRightIcon /></button></div>
    <div className="transfer-examples"><span>EXAMPLES IN NOTES</span>{['Periyar–Vaigai', 'Beas–Sutlej', 'Indira Gandhi Nahar'].map((x) => <i key={x}>{x}</i>)}</div>
  </div>;
}
function ArrowRightIcon() { return <ArrowUp size={14} className="rotate-45" />; }

export function RiverLinkingVisual() {
  const [component, setComponent] = useState(0);
  const [view, setView] = useState<'merits' | 'tradeoffs'>('merits');
  const links = component === 0 ? 14 : 16;
  return <div className="river-linking-visual">
    <InteractiveTag>NWDA · INTERLINKING PROPOSAL</InteractiveTag>
    <div className="linking-layout"><div className="link-map"><IndiaMapGraphic mode="links" selected={component} /><div className="link-counter"><strong>{links}</strong><span>proposed links</span></div></div><div className="linking-detail"><div className="segmented-control" role="group" aria-label="Select river-linking component"><button type="button" aria-pressed={component === 0} className={component === 0 ? 'selected' : ''} onClick={() => setComponent(0)}>Himalayan</button><button type="button" aria-pressed={component === 1} className={component === 1 ? 'selected' : ''} onClick={() => setComponent(1)}>Peninsular</button></div><h3>{component === 0 ? 'Himalayan component' : 'Peninsular component'}</h3><p>{component === 0 ? 'Links between the Brahmaputra, Ganga and other northern basins.' : 'A network proposed among river basins of Peninsular India.'}</p><div className="merit-tabs" role="group" aria-label="Choose a perspective"><button type="button" aria-pressed={view === 'merits'} className={view === 'merits' ? 'selected' : ''} onClick={() => setView('merits')}>Potential benefits</button><button type="button" aria-pressed={view === 'tradeoffs'} className={view === 'tradeoffs' ? 'selected' : ''} onClick={() => setView('tradeoffs')}>Trade-offs</button></div><p className="merit-note">{view === 'merits' ? 'The notes list irrigation, power generation and flood moderation among intended benefits.' : 'The notes also list ecological damage, displacement, legal disputes, high cost and water loss.'}</p></div></div>
    <p className="visual-note">The NWDA proposal is a planning concept; benefits and trade-offs are both part of the course material.</p>
  </div>;
}

function AquiferIllustration({ level = 58, contamination = false, salt = 0, recharge = false }: { level?: number; contamination?: boolean; salt?: number; recharge?: boolean }) {
  return <div className={`aquifer-illustration${contamination ? ' has-contamination' : ''}${recharge ? ' is-recharging' : ''}`} role="img" aria-label={`Illustrative aquifer cross-section. Water table level: ${level} percent of the diagram.${contamination ? ' Contaminants are shown moving through the soil.' : ''}${salt > 0 ? ' A saltwater wedge is shown.' : ''}${recharge ? ' Recharge is shown.' : ''}`} style={{ '--water-level': `${level}%`, '--salt-size': `${salt}%` } as React.CSSProperties}>
    <div className="aquifer-surface"><span className="aquifer-grass" /><span className="aquifer-well"><i /></span><span className="aquifer-house" /></div>
    <div className="aquifer-strata strata-top" /><div className="aquifer-strata strata-middle" /><div className="aquifer-strata strata-deep" />
    <div className="aquifer-waterline"><span>WATER TABLE</span></div>
    {contamination && <div className="contaminant-particles"><i /><i /><i /><i /><i /></div>}
    {salt > 0 && <div className="salt-wedge"><span>SALTWATER</span></div>}
    {recharge && <div className="recharge-drops"><i /><i /><i /></div>}
    <div className="aquifer-labels"><span>Unsaturated zone</span><span>Saturated aquifer</span><span>Bedrock</span></div>
  </div>;
}

export function AquiferVisual({ depletion = false }: { depletion?: boolean }) {
  const [level, setLevel] = useState(58);
  return <div className="aquifer-visual">
    <InteractiveTag>{depletion ? 'GROUNDWATER DEPLETION · PUMPING' : 'GROUNDWATER · CROSS-SECTION'}</InteractiveTag>
    <AquiferIllustration level={level} />
    <div className="aquifer-control"><label className="range-line"><span>{depletion ? 'Lower use' : 'Surface'}</span><input type="range" min="20" max="82" value={level} onChange={(e) => setLevel(Number(e.target.value))} aria-label="Move groundwater table" /><span>{depletion ? 'More pumping' : 'Aquifer'}</span></label></div>
    <div className="aquifer-term-row"><span><i className="term-blue" />Water table</span><span><i className="term-stone" />Permeable strata</span><span><i className="term-dark" />Bedrock</span></div>
  </div>;
}

const groundwaterRegions = [
  { name: 'Hard rock', note: 'Peninsular India', detail: 'Groundwater is stored in weathered and fractured hard-rock aquifers.' },
  { name: 'Alluvial', note: 'Indo-Gangetic plains', detail: 'Thick alluvial deposits form regionally extensive aquifers.' },
  { name: 'Mountain & hill', note: 'Northern terrain', detail: 'Groundwater conditions vary with local geology and topography.' },
  { name: 'Coastal', note: 'Coastal aquifers', detail: 'Freshwater aquifers interact with seawater and are vulnerable to salinity ingress.' },
];
export function GroundwaterRegionsVisual() {
  const [active, setActive] = useState(0);
  return <div className="groundwater-regions-visual">
    <InteractiveTag>GROUNDWATER REGIONS · INDIA</InteractiveTag>
    <div className="ground-region-layout"><div className="region-map"><IndiaMapGraphic mode="regions" selected={active} /></div><div className="region-detail"><span className="visual-index">REGION 0{active + 1} / 04</span><h3>{groundwaterRegions[active].name}</h3><span className="region-note">{groundwaterRegions[active].note}</span><p>{groundwaterRegions[active].detail}</p><div className="region-selector" role="group" aria-label="Select a groundwater region">{groundwaterRegions.map((region, index) => <button key={region.name} type="button" aria-pressed={active === index} className={active === index ? 'selected' : ''} onClick={() => setActive(index)}><i aria-hidden="true" />{region.name}<small>{region.note}</small></button>)}</div></div></div>
  </div>;
}

export function ConjunctiveVisual() {
  const [surface, setSurface] = useState(55);
  return <div className="conjunctive-visual">
    <InteractiveTag>SURFACE + GROUNDWATER · BALANCE</InteractiveTag>
    <div className="conjunctive-balance"><div className="balance-pan pan-surface" style={{ transform: `translateY(${(surface - 50) * -0.36}px)` }}><Waves size={25} /><strong>{surface}%</strong><span>Surface water</span></div><div className="balance-beam"><span /></div><div className="balance-pan pan-ground" style={{ transform: `translateY(${(50 - surface) * -0.36}px)` }}><Droplet size={25} /><strong>{100 - surface}%</strong><span>Groundwater</span></div></div>
    <label className="range-line"><span>Surface</span><input type="range" min="0" max="100" value={surface} onChange={(e) => setSurface(Number(e.target.value))} aria-label="Balance surface water and groundwater" /><span>Groundwater</span></label>
    <p className="visual-note">A conceptual balance only. The notes recommend optimizing use with recharge, local capacity and crop demand in mind.</p>
  </div>;
}

const managementPrinciples = ['Map local aquifer conditions', 'Track extraction and water levels', 'Protect recharge areas', 'Improve irrigation-system capacity', 'Coordinate surface and groundwater use', 'Tailor rules to local demand'];
export function ManagementVisual() {
  const [checked, setChecked] = useState<number[]>([0, 2]);
  return <div className="management-visual">
    <InteractiveTag>GROUNDWATER MANAGEMENT · LOCAL CHECKLIST</InteractiveTag>
    <div className="management-quote"><span>NO SINGLE STRATEGY</span><strong>fits every aquifer.</strong><p>Physical, hydrologic, hydrogeologic and socio-economic conditions all matter.</p></div>
    <div className="management-list" role="group" aria-label="Groundwater management practices">{managementPrinciples.map((principle, index) => <button key={principle} type="button" aria-pressed={checked.includes(index)} className={checked.includes(index) ? 'checked' : ''} onClick={() => setChecked((old) => old.includes(index) ? old.filter((x) => x !== index) : [...old, index])}><span aria-hidden="true">{checked.includes(index) && <Check size={12} />}</span><small>0{index + 1}</small>{principle}</button>)}</div>
  </div>;
}

export function ContaminationVisual() {
  const [source, setSource] = useState<'geogenic' | 'human'>('geogenic');
  const contaminants = source === 'geogenic' ? ['Arsenic', 'Fluoride', 'Iron', 'Nitrate'] : ['Sewage', 'Fertilizer', 'Heavy metals', 'Leachate'];
  return <div className="contamination-visual">
    <InteractiveTag>GROUNDWATER QUALITY · SOURCE OF CONTAMINANT</InteractiveTag>
    <div className="contamination-toggle" role="group" aria-label="Choose contaminant source"><button type="button" aria-pressed={source === 'geogenic'} className={source === 'geogenic' ? 'selected' : ''} onClick={() => setSource('geogenic')}>Geogenic · natural</button><button type="button" aria-pressed={source === 'human'} className={source === 'human' ? 'selected' : ''} onClick={() => setSource('human')}>Anthropogenic · human</button></div>
    <AquiferIllustration level={54} contamination />
    <div className="contaminant-list">{contaminants.map((item, index) => <span key={item} style={{ '--contaminant-delay': `${index * 100}ms` } as React.CSSProperties}><i />{item}</span>)}</div>
    <p className="visual-note">Sources in the notes include natural rock leaching, septic tanks, landfills, leaking fuel tanks, fertilizers and pesticides.</p>
  </div>;
}

export function RechargeVisual() {
  const [active, setActive] = useState<number[]>([0]);
  const techniques = ['Percolation tank', 'Check dam', 'Recharge well'];
  const level = 35 + active.length * 15;
  return <div className="recharge-visual">
    <InteractiveTag>ARTIFICIAL RECHARGE · SELECT A TECHNIQUE</InteractiveTag>
    <AquiferIllustration level={level} recharge />
    <div className="recharge-selector" role="group" aria-label="Select recharge techniques">{techniques.map((technique, index) => <button key={technique} type="button" aria-pressed={active.includes(index)} className={active.includes(index) ? 'selected' : ''} onClick={() => setActive((old) => old.includes(index) ? old.filter((x) => x !== index) : [...old, index])}><span aria-hidden="true">{active.includes(index) ? <Check size={12} /> : <Droplet size={12} />}</span>{technique}</button>)}</div>
    <Meter value={Math.min(level, 85)} label="Aquifer replenishment · illustrative" color="#7fd0e0" />
    <p className="visual-note">Illustrative only: recharge can augment natural replenishment; the displayed meter is not a measured quantity.</p>
  </div>;
}

export function SaltWedgeVisual() {
  const [pumping, setPumping] = useState(38);
  const salt = pumping;
  return <div className="salt-wedge-visual">
    <InteractiveTag>COASTAL AQUIFER · PUMPING RESPONSE</InteractiveTag>
    <div className="coast-profile"><div className="coast-land"><span className="coast-palm">♧</span><span className="coast-well"><i /></span><AquiferIllustration level={58 - Math.round(pumping * 0.25)} salt={salt} /></div><div className="coast-ocean"><span>SEA</span><span className="salt-front" style={{ width: `${Math.max(16, salt)}%` }} /></div></div>
    <div className="coast-reading"><div><span>FRESH / SALT BALANCE</span><strong>{pumping < 35 ? 'More stable' : pumping < 70 ? 'Under pressure' : 'Intrusion risk'}</strong></div><label className="range-line"><span>LOW</span><input type="range" min="0" max="100" value={pumping} onChange={(e) => setPumping(Number(e.target.value))} aria-label="Adjust pumping in coastal aquifer" /><span>HIGH</span></label></div>
    <p className="visual-note">Illustrative cross-section. In the notes, over-pumping disturbs freshwater–seawater equilibrium and can draw saltwater inland.</p>
  </div>;
}

export function WaterVisual({ kind }: { kind: string; chapter: Chapter }) {
  const components: Record<string, () => JSX.Element> = {
    'water-cycle': () => <WaterCycleVisual />,
    'water-sources': () => <WaterSourcesVisual />,
    'water-globe': () => <WaterGlobeVisual />,
    'india-rivers': () => <IndiaRiversVisual />,
    'water-uses': () => <WaterUsesVisual />,
    'water-stress': () => <WaterStressVisual />,
    'basin-transfer': () => <BasinTransferVisual />,
    'river-linking': () => <RiverLinkingVisual />,
    aquifer: () => <AquiferVisual />,
    'groundwater-regions': () => <GroundwaterRegionsVisual />,
    'conjunctive-use': () => <ConjunctiveVisual />,
    management: () => <ManagementVisual />,
    depletion: () => <AquiferVisual depletion />,
    contamination: () => <ContaminationVisual />,
    recharge: () => <RechargeVisual />,
    'salt-wedge': () => <SaltWedgeVisual />,
  };
  const Component = components[kind] ?? components.aquifer;
  return <Component />;
}
