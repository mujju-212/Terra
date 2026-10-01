export interface AirChapterNavItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
}

export const airChaptersNav: AirChapterNavItem[] = [
  { id: 'cover', num: '01', title: 'Module Intro', subtitle: 'The Thin Shell We Breathe' },
  { id: 'ch-intro-air', num: '02', title: 'Introduction to Air', subtitle: 'Composition & Troposphere' },
  { id: 'ch-pollution', num: '03', title: 'Air Pollution', subtitle: 'Definitions & Aerosols' },
  { id: 'ch-sources', num: '04', title: 'Sources & Classification', subtitle: 'Natural vs Anthropogenic' },
  { id: 'ch-naaqs', num: '05', title: 'NAAQS', subtitle: 'National Air Quality Limits' },
  { id: 'ch-aqi', num: '06', title: 'AQI', subtitle: '0–500 Gauge & Breakpoints' },
  { id: 'ch-health', num: '07', title: 'Health Effects', subtitle: 'Human Pathology & SPM' },
  { id: 'ch-economic', num: '08', title: 'Economic Effects', subtitle: 'Agriculture, Materials & Health' },
  { id: 'ch-equipment', num: '09', title: 'Control Equipment', subtitle: 'ESP, Cyclones & Scrubbers' },
  { id: 'ch-smoke', num: '10', title: 'Smoke & Its Control', subtitle: 'Combustion & Abatement' },
  { id: 'ch-ozone', num: '11', title: 'Ozone Depletion', subtitle: 'Stratosphere & Montreal Protocol' },
  { id: 'ch-photochemical', num: '12', title: 'Photochemical Changes', subtitle: 'Smog Reactions & PAN' },
  { id: 'ch-summary', num: '13', title: 'Module Summary', subtitle: 'Recap & Knowledge Check' },
];

export const modulesNav = [
  { id: 'land', num: '01', title: 'Land', path: '/module/land' },
  { id: 'water', num: '02', title: 'Water', path: '/module/water' },
  { id: 'air', num: '03', title: 'Air', path: '/module/air' },
  { id: 'bio', num: '04', title: 'Biodiversity', path: '/module/biodiversity' },
  { id: 'warming', num: '05', title: 'Global Warming', path: '/module/warming' },
];

export const airCompositionData = [
  { name: 'Nitrogen', formula: 'N₂', pct: 78.084, color: '#38bdf8', desc: 'Dominant inert gas; provides atmospheric pressure and dilutes oxygen.' },
  { name: 'Oxygen', formula: 'O₂', pct: 20.946, color: '#60a5fa', desc: 'Essential for cellular respiration and combustion across aerobic life.' },
  { name: 'Argon', formula: 'Ar', pct: 0.934, color: '#93c5fd', desc: 'Noble gas formed primarily through radioactive decay of potassium-40.' },
  { name: 'Carbon Dioxide', formula: 'CO₂', pct: 0.04, color: '#cbd5e1', desc: 'Trace greenhouse gas critical for plant photosynthesis.' },
  { name: 'Neon', formula: 'Ne', pct: 0.001818, color: '#94a3b8', desc: 'Inert noble gas present in minute fractions.' },
  { name: 'Helium', formula: 'He', pct: 0.000524, color: '#64748b', desc: 'Lightest noble gas escaping slowly into outer space.' },
  { name: 'Methane', formula: 'CH₄', pct: 0.000187, color: '#fbbf24', desc: 'Potent greenhouse gas produced by anaerobic decay and ruminants.' },
  { name: 'Water Vapour', formula: 'H₂O', pct: 0.4, range: '0% – 5%', color: '#38bdf8', desc: 'Variable atmospheric constituent responsible for weather, clouds, and hydrological transport.' },
];
