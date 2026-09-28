import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, CloudSun, Compass, FileText, ThermometerSun } from 'lucide-react';
import type { Chapter } from '../content/types';
import { InteractiveTag, Meter } from './shared';

export function GreenhouseVisual() {
  const [gases, setGases] = useState(50);
  const [playing, setPlaying] = useState(true);
  const status = gases < 28 ? 'Less trapped heat' : gases <= 58 ? 'Natural greenhouse effect' : 'Enhanced heat trapping';
  const temp = gases < 28 ? '−18°C' : gases <= 58 ? '+15°C' : '+15°C+';
  return <div className={`greenhouse-visual${playing ? ' greenhouse-active' : ''}`} style={{ '--heat-level': `${gases}%` } as React.CSSProperties}>
    <InteractiveTag>GREENHOUSE EFFECT · ADJUST THE GHG LEVEL</InteractiveTag>
    <div className="greenhouse-scene"><div className="gh-sun"><span /></div><div className="gh-earth"><div className="gh-continent" /><span>EARTH</span></div><div className="gh-atmosphere" /><div className="gh-rays"><i /><i /><i /></div><div className="gh-heat-paths"><i /><i /><i /><i /></div><div className="gh-gas-particles">{Array.from({ length: Math.round(gases / 6) }, (_, i) => <i key={i} style={{ '--gas-x': `${(i * 29 + 12) % 88}%`, '--gas-y': `${(i * 41 + 17) % 78}%` } as React.CSSProperties} />)}</div><div className="gh-legend"><span><i className="sun-dot" />Incoming sunlight</span><span><i className="heat-dot" />Outgoing heat</span><span><i className="gas-dot" />Greenhouse gases</span></div></div>
    <div className="gh-metrics"><div><span>REFLECTED</span><strong>~30%</strong></div><div><span>ABSORBED</span><strong>~70%</strong></div><div className="gh-temp"><span>COURSE-NOTE TEMPERATURE</span><strong><ThermometerSun size={18} />{temp}</strong></div></div>
    <label className="range-line gh-range"><span>LESS GHG</span><input type="range" min="0" max="100" value={gases} onChange={(e) => setGases(Number(e.target.value))} aria-label="Illustrative greenhouse gas level" /><span>MORE GHG</span></label>
    <div className="gh-reading"><span>{status}</span><button type="button" className="quiet-control" aria-pressed={playing} onClick={() => setPlaying(!playing)}>{playing ? 'Pause motion' : 'Resume motion'}</button></div>
    <p className="visual-note">The notes compare −18°C without the natural greenhouse effect to about +15°C at present. The slider is qualitative; “+15°C+” is not a projection.</p>
  </div>;
}

const warmingIndicators = [
  { name: 'Air-surface temperature', trend: 'rising', mark: '↑' },
  { name: 'Specific humidity', trend: 'rising', mark: '↑' },
  { name: 'Glaciers', trend: 'falling', mark: '↓' },
  { name: 'Snow cover', trend: 'falling', mark: '↓' },
  { name: 'Temperature over land', trend: 'rising', mark: '↑' },
  { name: 'Sea-surface temperature', trend: 'rising', mark: '↑' },
  { name: 'Sea ice', trend: 'falling', mark: '↓' },
  { name: 'Sea level', trend: 'rising', mark: '↑' },
  { name: 'Ocean heat content', trend: 'rising', mark: '↑' },
  { name: 'Temperature over oceans', trend: 'rising', mark: '↑' },
];
export function WarmingIndicatorsVisual() {
  const [active, setActive] = useState(0);
  return <div className="warming-indicators-visual">
    <InteractiveTag>WARMING INDICATORS · 10 SIGNALS</InteractiveTag>
    <div className="warming-dashboard" role="group" aria-label="Select a warming indicator">{warmingIndicators.map((item, index) => <button key={item.name} type="button" aria-pressed={active === index} className={`indicator-tile ${item.trend}${active === index ? ' selected' : ''}`} onClick={() => setActive(index)}><span className="tile-number">{String(index + 1).padStart(2, '0')}</span><strong>{item.name}</strong><span className="trendline" aria-hidden="true"><svg viewBox="0 0 100 25"><path d={item.trend === 'rising' ? 'M0 20 L18 17 L34 20 L49 12 L64 14 L81 6 L100 2' : 'M0 3 L18 7 L35 5 L51 13 L68 12 L83 19 L100 22'} /></svg><b>{item.mark}</b></span></button>)}</div>
    <div className="indicator-note"><span className="trend-key rising-key">↑ RISING</span><span className="trend-key falling-key">↓ FALLING</span><p>{warmingIndicators[active].name} · directional summary from the course notes. Trend lines are illustrative, not measured data.</p></div>
  </div>;
}

const warmingDrivers = [
  { name: 'CO₂', source: 'Fossil-fuel power, transport, industry and deforestation.', share: 80, color: '#d8703f' },
  { name: 'CH₄', source: 'Rice fields, livestock, wetlands, fossil-fuel systems and waste.', share: 12, color: '#e8b04b' },
  { name: 'N₂O', source: 'Nitrogen fertilizer use and industrial sources.', share: 8, color: '#9fb8c4' },
  { name: 'Deforestation', source: 'Releases stored carbon and removes a carbon sink.', share: 0, color: '#6fa96b' },
];
export function WarmingCausesVisual() {
  const [active, setActive] = useState(0);
  const driver = warmingDrivers[active];
  return <div className="warming-causes-visual">
    <InteractiveTag>FACTORS AFFECTING GLOBAL WARMING</InteractiveTag>
    <div className="driver-molecules"><span>CO₂</span><span>CH₄</span><span>N₂O</span><span>TREES</span></div>
    <div className="driver-tabs" role="group" aria-label="Select a warming driver">{warmingDrivers.map((item, index) => <button key={item.name} type="button" aria-pressed={active === index} className={active === index ? 'selected' : ''} onClick={() => setActive(index)}><small>0{index + 1}</small>{item.name}</button>)}</div>
    <div className="driver-detail"><div><span className="visual-index">SELECTED FACTOR</span><h3>{driver.name}</h3><p>{driver.source}</p></div><div className="contribution-chart"><span>GHG CONTRIBUTION IN SOURCE NOTES</span><div><i style={{ width: '80%' }} /><i style={{ width: '20%' }} /></div><small>CO₂ ~80% · CH₄ + N₂O ~20% (as summarized in notes)</small></div></div>
    <p className="visual-note">The contribution figures are reproduced from the supplied course notes; they are not a current emissions inventory.</p>
  </div>;
}

const effects = [
  { name: 'Melting ice', description: 'Glaciers and snow cover retreat.', icon: 'ICE' },
  { name: 'Rising seas', description: 'Thermal expansion and melting ice add to sea level.', icon: 'SEA' },
  { name: 'Weather extremes', description: 'Heat, rainfall and storm patterns can shift.', icon: 'WX' },
  { name: 'Ecosystem shifts', description: 'Species and biomes respond to changing conditions.', icon: 'BIO' },
  { name: 'Health pressure', description: 'Heat, disease and air-quality pathways matter.', icon: 'HEALTH' },
];
export function WarmingEffectsVisual() {
  const [active, setActive] = useState(0);
  return <div className="warming-effects-visual">
    <InteractiveTag>WARMING · CASCADING CONSEQUENCES</InteractiveTag>
    <div className="effect-horizon"><div className="effect-sun" /><div className="effect-land" /><div className="effect-water" /><div className={`effect-overlay effect-${active}`} /><span>ONE CHANGE · CONNECTED SYSTEMS</span></div>
    <div className="effect-selector" role="group" aria-label="Select a warming consequence">{effects.map((item, index) => <button key={item.name} type="button" aria-pressed={active === index} className={active === index ? 'selected' : ''} onClick={() => setActive(index)}><span aria-hidden="true">{item.icon}</span><strong>{item.name}</strong></button>)}</div>
    <p className="effect-description">{effects[active].description}</p>
  </div>;
}

export function WarmingVsClimateVisual() {
  const [active, setActive] = useState<'warming' | 'climate'>('warming');
  return <div className="warming-vs-climate-visual">
    <InteractiveTag>ONE PART OF A LARGER PATTERN</InteractiveTag>
    <div className="concept-toggle" role="group" aria-label="Compare warming and climate change"><button type="button" aria-pressed={active === 'warming'} className={active === 'warming' ? 'selected' : ''} onClick={() => setActive('warming')}><ThermometerSun size={19} aria-hidden="true" /><span>Global warming</span></button><button type="button" aria-pressed={active === 'climate'} className={active === 'climate' ? 'selected' : ''} onClick={() => setActive('climate')}><CloudSun size={19} aria-hidden="true" /><span>Climate change</span></button></div>
    <div className={`concept-card concept-${active}`}><span className="visual-index">{active === 'warming' ? 'TEMPERATURE SIGNAL' : 'PATTERN OF CHANGE'}</span><h3>{active === 'warming' ? 'A gradual rise in average temperature.' : 'Long-term shifts across climate patterns.'}</h3><p>{active === 'warming' ? 'Global warming is one component of climate change.' : 'Climate change also includes patterns in precipitation, winds, storms, ice and ecosystems.'}</p><div className="concept-spectrum"><span>Temperature</span><i /><span>Many linked patterns</span></div></div>
  </div>;
}

const climateIndicators = [
  { name: 'Global warming', symbol: 'TEMP', detail: 'Rising average temperatures affect the broader climate system.' },
  { name: 'Polar & glacial ice', symbol: 'ICE', detail: 'Changes in ice affect water storage and sea level.' },
  { name: 'Ocean acidity', symbol: 'pH', detail: 'Changing ocean chemistry affects marine organisms.' },
  { name: 'Climate & health', symbol: 'HEALTH', detail: 'Climate conditions influence health risks and exposure.' },
  { name: 'Wind patterns', symbol: 'WIND', detail: 'Changing circulation alters local and regional patterns.' },
  { name: 'Precipitation', symbol: 'RAIN', detail: 'Rainfall timing and amount can shift.' },
  { name: 'Storms', symbol: 'STORM', detail: 'Storm intensity and frequency are climate indicators in the notes.' },
  { name: 'Biomes', symbol: 'BIOME', detail: 'Changing conditions can shift where ecosystems persist.' },
];
export function ClimateIndicatorsVisual() {
  const [active, setActive] = useState(0);
  const indicator = climateIndicators[active];
  return <div className="climate-indicators-visual">
    <InteractiveTag>CLIMATE INDICATOR GLOBE · SELECT A LENS</InteractiveTag>
    <div className={`climate-globe climate-globe-${active}`}><div className="climate-globe-sphere"><span className="climate-latitude lat-1" /><span className="climate-latitude lat-2" /><span className="climate-meridian" /><i className="climate-signal" /></div><div className="climate-globe-read"><span className="visual-index">INDICATOR 0{active + 1} / 08</span><strong>{indicator.symbol}</strong><p>{indicator.detail}</p></div></div>
    <div className="climate-indicator-grid" role="group" aria-label="Select a climate indicator">{climateIndicators.map((item, index) => <button key={item.name} type="button" aria-pressed={active === index} className={active === index ? 'selected' : ''} onClick={() => setActive(index)}><small>0{index + 1}</small><strong>{item.name}</strong></button>)}</div>
    <p className="visual-note">Concept illustration only. No live climate data is connected.</p>
  </div>;
}

const healthDrivers = ['Heat stress', 'Changing rainfall', 'Air-quality changes', 'Water & food pressure'];
const outcomes = ['Heat illness', 'Disease patterns', 'Respiratory effects', 'Nutrition & wellbeing'];
export function ClimateHealthVisual() {
  const [active, setActive] = useState(0);
  return <div className="climate-health-visual">
    <InteractiveTag>CLIMATE DRIVER → HEALTH OUTCOME</InteractiveTag>
    <div className="health-flow"><div className="health-flow-col" role="group" aria-label="Select a climate driver"><span>CLIMATE DRIVER</span>{healthDrivers.map((driver, index) => <button type="button" key={driver} aria-pressed={active === index} className={active === index ? 'selected' : ''} onClick={() => setActive(index)}>{driver}</button>)}</div><div className="health-flow-arrow" aria-hidden="true"><ArrowRight size={21} /></div><div className="health-flow-col outcome-col"><span>POSSIBLE OUTCOME</span><div className="health-outcome"><Check size={15} /><strong>{outcomes[active]}</strong></div><p>Effects depend on exposure, place and the ability to adapt.</p></div></div>
  </div>;
}

export function EiaIntroVisual() {
  const [active, setActive] = useState(0);
  const choices = ['Project idea', 'Assessment', 'Decision'];
  return <div className="eia-intro-visual">
    <InteractiveTag>ENVIRONMENTAL IMPACT ASSESSMENT</InteractiveTag>
    <div className="blueprint-lines" aria-hidden="true" />
    <div className="eia-definition"><span className="visual-index">BEFORE WE BUILD, WE ASSESS</span><h3>What could this project change?</h3><p>EIA studies the likely environmental consequences of a proposed project to inform decisions and identify mitigation.</p></div>
    <div className="eia-journey" role="group" aria-label="Follow the EIA decision journey">{choices.map((choice, index) => <button key={choice} type="button" aria-pressed={active === index} className={active === index ? 'selected' : ''} onClick={() => setActive(index)}><span>0{index + 1}</span><i aria-hidden="true" />{choice}</button>)}</div>
  </div>;
}

const eiaValues = [
  { name: 'Integrity', number: '01', detail: 'A credible, complete and balanced assessment.' },
  { name: 'Utility', number: '02', detail: 'Useful information for decisions and stakeholders.' },
  { name: 'Sustainability', number: '03', detail: 'Consider present and future environmental needs.' },
];
export function EiaValuesVisual() {
  const [active, setActive] = useState(0);
  return <div className="eia-values-visual">
    <InteractiveTag>THREE CORE VALUES · SELECT A PILLAR</InteractiveTag>
    <div className="eia-pillars" role="group" aria-label="Select an EIA core value">{eiaValues.map((item, index) => <button key={item.name} type="button" aria-pressed={active === index} className={active === index ? 'selected' : ''} onClick={() => setActive(index)}><span>{item.number}</span><i aria-hidden="true" /><strong>{item.name}</strong><small>{active === index ? item.detail : 'Open value'}</small></button>)}</div>
    <p className="visual-note">Core values named in the Module 5 notes: integrity, utility and sustainability.</p>
  </div>;
}

const eiaTimeline = [
  { year: '1969', title: 'NEPA enacted', body: 'The US National Environmental Policy Act established an environmental review framework.' },
  { year: '1970', title: 'Implementation', body: 'The supplied notes place the start of EIA practice in the US around 1970.' },
  { year: '1980s', title: 'Wider adoption', body: 'Environmental assessment spread to more countries and development institutions.' },
  { year: 'INDIA', title: 'National practice', body: 'Project assessment and clearance procedures developed in India.' },
];
export function EiaHistoryVisual() {
  const [active, setActive] = useState(0);
  return <div className="eia-history-visual">
    <InteractiveTag>ASSESSMENT · HISTORY & BENEFITS</InteractiveTag>
    <div className="eia-history-line" role="group" aria-label="EIA history timeline">{eiaTimeline.map((item, index) => <button type="button" key={item.year} aria-pressed={active === index} className={active === index ? 'selected' : ''} onClick={() => setActive(index)}><span className="history-node" aria-hidden="true" /><small>{item.year}</small><strong>{item.title}</strong></button>)}</div>
    <div className="history-detail"><span className="visual-index">MILESTONE 0{active + 1}</span><p>{eiaTimeline[active].body}</p></div>
    <div className="benefit-strip">{['Compare alternatives', 'Invite public input', 'Coordinate evidence', 'Inform decisions'].map((item) => <span key={item}><Check size={12} />{item}</span>)}</div>
  </div>;
}

const eiaPhases = [
  { name: 'Screening', detail: 'Decide whether a project requires an environmental assessment and at what level.' },
  { name: 'Scoping', detail: 'Identify the key issues, boundaries and terms of reference for assessment.' },
  { name: 'Baseline data', detail: 'Describe existing conditions before the project.' },
  { name: 'Impact analysis', detail: 'Predict and evaluate likely environmental impacts.' },
  { name: 'Alternatives & report', detail: 'Compare alternatives, mitigation measures and prepare the EIA report.' },
  { name: 'Public hearing', detail: 'Hear concerns and information from affected communities.' },
  { name: 'EMP', detail: 'Set out the Environmental Management Plan and its actions.' },
  { name: 'Decision', detail: 'Decision-makers consider the assessment and conditions.' },
  { name: 'Monitoring', detail: 'Check compliance with environmental-clearance conditions.' },
];
export function EiaProcessVisual() {
  const [active, setActive] = useState(0);
  const phase = eiaPhases[active];
  return <div className="eia-process-visual">
    <InteractiveTag>INDIAN EIA PROCESS · 9 PHASES</InteractiveTag>
    <div className="eia-process-layout"><div className="eia-phase-list" role="group" aria-label="Select an EIA process phase">{eiaPhases.map((item, index) => <button type="button" key={item.name} aria-pressed={active === index} className={active === index ? 'selected' : ''} onClick={() => setActive(index)}><span>{String(index + 1).padStart(2, '0')}</span><i aria-hidden="true" />{item.name}</button>)}</div><div className="eia-phase-detail"><div className="phase-progress" role="progressbar" aria-label="EIA process progress" aria-valuemin={1} aria-valuemax={eiaPhases.length} aria-valuenow={active + 1} aria-valuetext={`Phase ${active + 1} of ${eiaPhases.length}: ${phase.name}`}><span aria-hidden="true" style={{ width: `${((active + 1) / eiaPhases.length) * 100}%` }} /></div><span className="visual-index">PHASE {String(active + 1).padStart(2, '0')} / 09</span><h3 aria-live="polite" aria-atomic="true">{phase.name}</h3><p>{phase.detail}</p><div className="phase-navigation"><button type="button" disabled={active === 0} onClick={() => setActive(active - 1)}>Previous</button><button type="button" disabled={active === eiaPhases.length - 1} onClick={() => setActive(active + 1)}>Next phase <ArrowRight size={13} /></button></div></div></div>
  </div>;
}

export function EiaFlowchartVisual() {
  const [loop, setLoop] = useState(false);
  return <div className={`eia-flowchart-visual${loop ? ' show-loop' : ''}`}>
    <InteractiveTag>PROCESS FLOW · DECISION BRANCH</InteractiveTag>
    <div className="flowchart-canvas"><div className="flow-node start-node">Project<br />proposal</div><div className="flow-arrow">↓</div><div className="flow-node">Screening<br /><small>Assessment required?</small></div><div className="flow-arrow">↓</div><div className="flow-node main-node">Study · consultation<br />mitigation · report</div><div className="flow-branch"><span className="branch-node">Review</span><i>→</i><button type="button" className="branch-decision" aria-pressed={loop} onClick={() => setLoop(!loop)}>Decision</button><i>→</i><span className="branch-node">Monitor</span></div><div className="flow-no">NO / REVISE <ArrowDownRight size={14} /></div></div>
    <button type="button" className="quiet-control flow-revise" aria-pressed={loop} onClick={() => setLoop(!loop)}>{loop ? 'Hide revision loop' : 'Show revision loop'} <ArrowDownRight size={14} aria-hidden="true" /></button>
    <p className="visual-note">A simplified reading of the supplied flowchart; project requirements depend on the applicable process.</p>
  </div>;
}

const reportParts = [
  { letter: 'A', name: 'Air', detail: 'Ambient conditions, emissions and likely effects on air quality.', slug: 'air' },
  { letter: 'B', name: 'Noise', detail: 'Existing noise levels, sources, impacts and mitigation.', slug: '' },
  { letter: 'C', name: 'Water', detail: 'Surface water, groundwater, quality, use and impacts.', slug: 'water' },
  { letter: 'D', name: 'Biological', detail: 'Flora, fauna, habitats, ecological stresses and mitigation.', slug: 'biodiversity' },
  { letter: 'E', name: 'Land', detail: 'Soil, land use, topography, drainage, landscape and waste.', slug: 'land' },
  { letter: 'F', name: 'Socio-economic & health', detail: 'Demographics, livelihoods, health, heritage and rehabilitation.', slug: '' },
  { letter: 'G', name: 'Risk assessment', detail: 'Hazards, accident scenarios, consequences and disaster planning.', slug: '' },
  { letter: 'H', name: 'EMP', detail: 'Mitigation, monitoring, scheduling and implementation resources.', slug: '' },
];
export function EiaReportVisual() {
  const [active, setActive] = useState(0);
  const [mode, setMode] = useState<'comprehensive' | 'rapid'>('comprehensive');
  const navigate = useNavigate();
  const part = reportParts[active];
  return <div className="eia-report-visual">
    <InteractiveTag>EIA REPORT EXPLORER · COMPONENT {part.letter}</InteractiveTag>
    <div className="report-mode" role="group" aria-label="Choose EIA assessment depth"><span>ASSESSMENT DEPTH</span><button type="button" aria-pressed={mode === 'comprehensive'} className={mode === 'comprehensive' ? 'selected' : ''} onClick={() => setMode('comprehensive')}>Comprehensive</button><button type="button" aria-pressed={mode === 'rapid'} className={mode === 'rapid' ? 'selected' : ''} onClick={() => setMode('rapid')}>Rapid</button></div>
    <div className="report-layout"><div className="report-tabs" role="group" aria-label="Choose an EIA report component">{reportParts.map((item, index) => <button key={item.letter} type="button" aria-pressed={active === index} className={active === index ? 'selected' : ''} onClick={() => setActive(index)}><span aria-hidden="true">{item.letter}</span>{item.name}</button>)}</div><div className="report-page"><div className="report-page-head"><FileText size={19} /><span>ENVIRONMENTAL ASSESSMENT / {part.letter}</span><i>{mode.toUpperCase()}</i></div><h3>{part.name}</h3><p>{part.detail}</p><div className="report-lines"><i /><i /><i /><i /></div>{part.slug ? <button type="button" className="report-crosslink" onClick={() => navigate(`/module/${part.slug}`)}>Open the {part.name.toLowerCase()} module <ArrowUpRight size={14} /></button> : <span className="report-crosslink muted-link">See the supplied Module 5 notes for this component.</span>}</div></div>
    <p className="visual-note">Comprehensive vs rapid EIA detail is based on the course notes. Cross-links connect the report to Modules 1–4.</p>
  </div>;
}

export function EiaBenefitsVisual() {
  const [active, setActive] = useState<'benefits' | 'flaws'>('benefits');
  const benefits = ['Systematic assessment', 'Compare alternatives', 'Public participation', 'Coordination & feedback', 'Inform top-level decisions'];
  const flaws = ['Time consuming', 'Costly', 'Data may be unreliable', 'Limited role after hearing', 'Weak post-clearance monitoring'];
  const list = active === 'benefits' ? benefits : flaws;
  return <div className="eia-benefits-visual">
    <InteractiveTag>EIA · BENEFITS AND FLAWS</InteractiveTag>
    <div className="benefit-toggle" role="group" aria-label="Compare EIA benefits and limitations"><button type="button" aria-pressed={active === 'benefits'} className={active === 'benefits' ? 'selected' : ''} onClick={() => setActive('benefits')}>What it enables</button><button type="button" aria-pressed={active === 'flaws'} className={active === 'flaws' ? 'selected' : ''} onClick={() => setActive('flaws')}>Where it falls short</button></div>
    <div className={`benefits-split split-${active}`}><div className="benefits-orbit"><Compass size={30} /><span>{active === 'benefits' ? 'BETTER-INFORMED' : 'IMPLEMENTATION'}</span></div><div className="benefit-list">{list.map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong><i>{active === 'benefits' ? '+' : '—'}</i></div>)}</div></div>
    <p className="visual-note">A balanced reading matters: the notes identify both the value of assessment and its limits in practice.</p>
  </div>;
}

export function WarmingVisual({ kind }: { kind: string; chapter: Chapter }) {
  const components: Record<string, () => JSX.Element> = {
    greenhouse: () => <GreenhouseVisual />,
    'warming-indicators': () => <WarmingIndicatorsVisual />,
    'warming-causes': () => <WarmingCausesVisual />,
    'warming-effects': () => <WarmingEffectsVisual />,
    'warming-vs-climate': () => <WarmingVsClimateVisual />,
    'climate-indicators': () => <ClimateIndicatorsVisual />,
    'climate-health': () => <ClimateHealthVisual />,
    'eia-intro': () => <EiaIntroVisual />,
    'eia-values': () => <EiaValuesVisual />,
    'eia-history': () => <EiaHistoryVisual />,
    'eia-process': () => <EiaProcessVisual />,
    'eia-flowchart': () => <EiaFlowchartVisual />,
    'eia-report': () => <EiaReportVisual />,
    'eia-benefits': () => <EiaBenefitsVisual />,
  };
  const Component = components[kind] ?? components.greenhouse;
  return <Component />;
}
