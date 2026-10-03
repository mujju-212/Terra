import {
  Droplet,
  Droplets,
  Globe,
  Sprout,
  Users2,
  ArrowRight,
  ArrowDown,
  X,
  Sparkles,
  Waves,
  Check,
  Sun,
  Cloud,
  CloudRain,
  Layers,
  RefreshCw,
  Home,
  Database,
  Building2,
  CircleDot,
  Factory,
  Target,
  PieChart,
  Mountain,
  TrendingUp,
  Settings,
  IndianRupee,
  Scale,
  Trees,
  MapPin,
  Compass,
} from 'lucide-react';
import type { ModuleContent } from '../../content/types';

interface WaterModuleProps {
  module: ModuleContent;
}

export interface Submethod {
  icon: any;
  name: string;
  sub: string;
  detail: string;
}

interface WaterSource {
  num: number;
  id: string;
  title: string;
  icon: any;
  desc: string;
  thumb: string;
  pinX: string;
  pinY: string;
  submethods: Submethod[];
}

// 4 Sources of Water (Exact match to User Reference Mockup & Course Notes)
export const sourcesData: WaterSource[] = [
  {
    num: 1,
    id: 'rain-water',
    title: 'Rain Water',
    icon: CloudRain,
    desc: 'Collected directly from rainfall events and stored for later use.',
    thumb: '/images/water-source-rain-thumb.jpg',
    pinX: '25%',
    pinY: '22%',
    submethods: [
      {
        icon: Home,
        name: 'Roof Catchment',
        sub: 'Houses, buildings',
        detail:
          'Collected from roofs of houses and dwellings and stored in underground tanks or cisterns for individual supply.',
      },
      {
        icon: Database,
        name: 'Tanks & Cisterns',
        sub: 'Storage structures',
        detail: 'Underground or surface sealed masonry cisterns preserving rainwater cleanly without evaporation losses.',
      },
      {
        icon: Droplets,
        name: 'Prepared Catchments',
        sub: 'Diverted to reservoirs',
        detail:
          'Land surfaces provided with a suitable impervious lining and gradient to channel runoff into community reservoirs.',
      },
    ],
  },
  {
    num: 2,
    id: 'surface-water',
    title: 'Surface Water',
    icon: Waves,
    desc: 'Water available on the surface earth, stored or flowing naturally.',
    thumb: '/images/water-source-surface-thumb.jpg',
    pinX: '55%',
    pinY: '34%',
    submethods: [
      {
        icon: ArrowRight,
        name: 'Continuous Draft',
        sub: 'Direct withdrawal from rivers',
        detail: 'Direct extraction of water from perennial flowing rivers without any diversion works.',
      },
      {
        icon: Waves,
        name: 'Diversions',
        sub: 'Canals and channel systems',
        detail:
          'Water routed through barrage and weir diversion canals leading into municipal or agricultural treatment plants.',
      },
      {
        icon: Building2,
        name: 'Reservoir Storage',
        sub: 'Dams and reservoirs',
        detail:
          'Massive multipurpose concrete dams storing water in large reservoirs and distributing it as needed.',
      },
      {
        icon: Globe,
        name: 'Natural Lakes',
        sub: 'Lakes and ponds',
        detail: 'Direct intake structures withdrawing fresh water from existing natural lakes.',
      },
    ],
  },
  {
    num: 3,
    id: 'ground-water',
    title: 'Ground Water',
    icon: Droplet,
    desc: 'Water stored below the ground in aquifers.',
    thumb: '/images/water-source-ground-thumb.jpg',
    pinX: '43%',
    pinY: '46%',
    submethods: [
      {
        icon: Sparkles,
        name: 'Springs',
        sub: 'Natural discharge points',
        detail: 'Water naturally emerging from groundwater at geological fissure intersections.',
      },
      {
        icon: CircleDot,
        name: 'Wells / Borewells',
        sub: 'Access through wells',
        detail: 'Dug wells and deep bore wells for groundwater extraction from productive aquifer formations.',
      },
      {
        icon: Layers,
        name: 'Infiltration Galleries',
        sub: 'Subsurface collection systems',
        detail: 'Horizontal tunnels/galleries dug near rivers to collect percolated riverbed water.',
      },
      {
        icon: CircleDot,
        name: 'Radial Collector Wells',
        sub: 'For larger withdrawals',
        detail: 'Special wells with horizontal arms radiating outward to collect groundwater near rivers.',
      },
    ],
  },
  {
    num: 4,
    id: 'reclamation',
    title: 'Reclamation',
    icon: RefreshCw,
    desc: 'Obtaining water through treatment and desalination.',
    thumb: '/images/water-source-reclaim-thumb.jpg',
    pinX: '84%',
    pinY: '48%',
    submethods: [
      {
        icon: Factory,
        name: 'Desalination',
        sub: 'Conversion of seawater to freshwater',
        detail:
          'Removal of mineral salts from seawater to make it potable and usable in coastal and water-scarce areas.',
      },
      {
        icon: Target,
        name: 'Treated Wastewater Reuse',
        sub: 'Recycled for non-potable or potable use',
        detail: 'Treated sewage or industrial wastewater reused for conservation, irrigation, and industrial needs.',
      },
    ],
  },
];

// 6 stages of the Hydrological Cycle (Exact match to User Reference Mockup)
export const cycleStagesData = [
  {
    num: 1,
    title: 'Evaporation',
    icon: Sun,
    desc: 'Water heats up due to solar energy and evaporates into the atmosphere.',
    x: '24%',
    y: '45%',
    detail: 'Solar radiation warms oceans and surface reservoirs, transforming liquid water into invisible vapour that ascends into the air.',
  },
  {
    num: 2,
    title: 'Condensation',
    icon: Cloud,
    desc: 'Water vapour cools and condenses to form clouds.',
    x: '46%',
    y: '22%',
    detail: 'As warm moisture ascends to higher and cooler altitudes, cooling air allows vapour to condense around microscopic aerosols.',
  },
  {
    num: 3,
    title: 'Precipitation',
    icon: CloudRain,
    desc: 'Water falls from clouds as rain or snow.',
    x: '68%',
    y: '22%',
    detail: 'When aggregated droplets grow dense and heavy, gravity returns them to Earth as rainfall, snowfall, or hail over mountains and plains.',
  },
  {
    num: 4,
    title: 'Surface Runoff',
    icon: Waves,
    desc: 'Water flows over land into rivers, lakes and oceans.',
    x: '52%',
    y: '50%',
    detail: 'Precipitation that does not soak into soil runs down natural topography, carving streams, feeding rivers, and discharging into the sea.',
  },
  {
    num: 5,
    title: 'Infiltration',
    icon: ArrowDown,
    desc: 'Some water infiltrates into the soil.',
    x: '74%',
    y: '53%',
    detail: 'Water percolates through soil pores and porous strata, sustaining vegetation root systems and descending toward groundwater stores.',
  },
  {
    num: 6,
    title: 'Underground Flow',
    icon: Droplet,
    desc: 'Water moves through soil and rock as groundwater to aquifers and eventually to rivers, lakes and oceans.',
    x: '82%',
    y: '68%',
    detail: 'Groundwater migrates through gravel, sandstone, and cavernous limestone aquifers under hydraulic gradients back to wetlands and coastlines.',
  },
];

// Chapter 03: Global Water Resources Datasets (Exact match to User Reference Mockup & Course Notes)
export const globalDistributionData = [
  {
    id: 'glaciers',
    title: 'Ice caps & Glaciers',
    percentage: '68.7%',
    thumb: '/images/water-glacier-thumb.jpg',
  },
  {
    id: 'groundwater',
    title: 'Groundwater',
    percentage: '30.1%',
    thumb: '/images/water-gw-thumb.jpg',
  },
  {
    id: 'surface',
    title: 'Surface water and other',
    percentage: '1.2%',
    thumb: '/images/water-surface-thumb.jpg',
  },
];

export const accessibleBreakdownData = [
  {
    id: 'lakes',
    title: 'Lakes',
    percentage: '0.26%',
    circle: '/images/water-lake-circle.jpg',
  },
  {
    id: 'rivers',
    title: 'Rivers',
    percentage: '0.006%',
    circle: '/images/water-river-circle.jpg',
  },
  {
    id: 'soil',
    title: 'Soil Moisture',
    percentage: '0.05%',
    circle: '/images/water-soil-circle.jpg',
  },
  {
    id: 'atmosphere',
    title: 'Atmospheric Water',
    percentage: '0.04%',
    circle: '/images/water-cloud-circle.jpg',
  },
];

export const globalTakeawaysData = [
  {
    icon: Droplet,
    title: 'Vast but Limited',
    desc: "97.5% of Earth's water is saltwater.",
  },
  {
    icon: Layers,
    title: 'Freshwater is Scarce',
    desc: 'Only 2.5% is freshwater.',
  },
  {
    icon: PieChart,
    title: 'Very Small Accessible Fraction',
    desc: '~1% is easily accessible for human use.',
  },
  {
    icon: Sprout,
    title: 'Needs Careful Management',
    desc: 'Finite freshwater resources must be conserved and used sustainably.',
  },
];

// Chapter 04: Rivers in India Basins Data (Interactive Geometries & Syllabus Match)
export interface RiverMilestone {
  id: string;
  name: string;
  type: 'origin' | 'dam' | 'confluence' | 'delta';
  x: number;
  y: number;
  state: string;
  detail: string;
  highlightFact: string;
}

export interface RiverBasinItem {
  id: string;
  name: string;
  riverName: string;
  color: string;
  glowColor: string;
  length: string;
  origin: string;
  flowsThrough: string;
  emptiesInto: string;
  importance: string;
  tributaries: string;
  banner: string;
  thumb: string;
  mapX: string;
  mapY: string;
  badgeCoord: { x: number; y: number };
  originCoord: { x: number; y: number; elevation: string; state: string; label: string };
  mouthCoord: { x: number; y: number; sea: string; label: string };
  mainStemPath: string;
  tributaryPaths: Array<{ name: string; path: string; labelPos?: { x: number; y: number } }>;
  catchmentPolygon: string;
  milestones: RiverMilestone[];
}

export const riverBasinsData: RiverBasinItem[] = [
  {
    id: 'indus',
    name: 'Indus Basin',
    riverName: 'Indus River',
    color: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.75)',
    length: '3,180 km (1,114 km in India)',
    origin: 'Mansarovar Lake / Bokhar Chu (Tibet)',
    flowsThrough: 'Ladakh, Jammu & Kashmir, Punjab, Himachal Pradesh',
    emptiesInto: 'Arabian Sea',
    importance: 'Irrigation lifeline of NW India, Indus Water Treaty, hydropower',
    tributaries: 'Indus, Jhelum, Chenab, Ravi, Beas, Sutlej',
    banner: '/images/river-hd-indus.jpg',
    thumb: '/images/river-thumb-hd-indus.jpg',
    mapX: '20.3%',
    mapY: '29.7%',
    badgeCoord: { x: 138, y: 220 },
    originCoord: { x: 265, y: 180, elevation: '4,164 m', state: 'Tibet Plateau', label: 'Bokhar Chu Glacier' },
    mouthCoord: { x: 10, y: 355, sea: 'Arabian Sea', label: 'Indus Delta' },
    mainStemPath: 'M 265 180 Q 220 135 175 115 T 115 88 Q 85 95 70 145 T 60 215 T 38 275 T 10 355',
    tributaryPaths: [
      { name: 'Jhelum', path: 'M 135 118 Q 115 130 95 155 T 68 210', labelPos: { x: 110, y: 125 } },
      { name: 'Chenab', path: 'M 175 148 Q 145 165 115 185 T 55 245', labelPos: { x: 130, y: 165 } },
      { name: 'Ravi', path: 'M 170 172 Q 130 202 90 235 T 50 255', labelPos: { x: 120, y: 195 } },
      { name: 'Beas', path: 'M 182 185 Q 155 205 118 232', labelPos: { x: 160, y: 190 } },
      { name: 'Sutlej', path: 'M 235 192 Q 195 200 175 208 T 118 232 T 45 268', labelPos: { x: 205, y: 195 } },
    ],
    catchmentPolygon: '240,160 170,80 80,80 30,160 0,300 20,360 90,280 170,230 230,200',
    milestones: [
      { id: 'm-leh', name: 'Leh Gorge (Ladakh)', type: 'confluence', x: 175, y: 115, state: 'Ladakh', detail: 'High-altitude cold desert trans-Himalayan gorge', highlightFact: 'Glacial meltwater feeds early spring agriculture in Ladakh' },
      { id: 'm-bhakra', name: 'Bhakra Nangal Dam', type: 'dam', x: 175, y: 188, state: 'Himachal/Punjab', detail: 'Iconic 226m concrete gravity dam on Sutlej', highlightFact: 'Powers Punjab & Haryana grain bowl irrigation networks' },
      { id: 'm-harike', name: 'Harike Wetlands', type: 'confluence', x: 118, y: 232, state: 'Punjab', detail: 'Confluence of Beas and Sutlej rivers', highlightFact: 'Ramsar wetland sanctuary and head of Indira Gandhi Canal' },
    ],
  },
  {
    id: 'ganga',
    name: 'Ganga Basin',
    riverName: 'Ganga River',
    color: '#22c55e',
    glowColor: 'rgba(34, 197, 94, 0.75)',
    length: '2,525 km',
    origin: 'Gangotri Glacier (Uttarakhand)',
    flowsThrough: 'Uttarakhand, Uttar Pradesh, Bihar, Jharkhand, West Bengal',
    emptiesInto: 'Bay of Bengal',
    importance: 'Agriculture, drinking water, culture, industry',
    tributaries: 'Ganga, Yamuna, Ghaghara, Gandak, Kosi',
    banner: '/images/river-hd-ganga.jpg',
    thumb: '/images/river-thumb-hd-ganga.jpg',
    mapX: '56.2%',
    mapY: '36.7%',
    badgeCoord: { x: 382, y: 272 },
    originCoord: { x: 220, y: 180, elevation: '3,892 m', state: 'Uttarakhand', label: 'Gangotri Glacier (Gaumukh)' },
    mouthCoord: { x: 506, y: 478, sea: 'Bay of Bengal', label: 'Sunderbans Delta' },
    mainStemPath: 'M 220 180 Q 228 205 236 235 T 275 295 T 338 338 Q 365 342 395 343 T 445 352 Q 470 365 488 390 T 502 445 T 506 478',
    tributaryPaths: [
      { name: 'Yamuna', path: 'M 202 190 Q 210 225 218 255 T 242 295 T 295 325 Q 320 335 338 338', labelPos: { x: 220, y: 270 } },
      { name: 'Chambal', path: 'M 145 355 Q 175 325 210 315 T 270 308 Q 285 315 295 325', labelPos: { x: 190, y: 325 } },
      { name: 'Ghaghara', path: 'M 335 235 Q 362 280 385 312 T 412 344', labelPos: { x: 370, y: 245 } },
      { name: 'Gandak', path: 'M 395 250 Q 405 295 418 344', labelPos: { x: 415, y: 260 } },
      { name: 'Son', path: 'M 295 390 Q 335 378 380 362 T 422 348', labelPos: { x: 340, y: 380 } },
      { name: 'Kosi', path: 'M 438 270 Q 442 305 445 350', labelPos: { x: 440, y: 295 } },
    ],
    catchmentPolygon: '190,170 270,170 480,260 510,350 520,470 490,480 430,430 340,390 240,380 130,360 130,280 190,210',
    milestones: [
      { id: 'm-haridwar', name: 'Haridwar', type: 'confluence', x: 236, y: 235, state: 'Uttarakhand', detail: 'Descent point into Indo-Gangetic Plains', highlightFact: 'Headworks of the historic Upper Ganga Canal system' },
      { id: 'm-sangam', name: 'Triveni Sangam', type: 'confluence', x: 338, y: 338, state: 'Uttar Pradesh', detail: 'Confluence of Ganga, Yamuna & Saraswati', highlightFact: 'Yamuna contributes 61% of total flow at Prayagraj' },
      { id: 'm-varanasi', name: 'Varanasi', type: 'confluence', x: 395, y: 343, state: 'Uttar Pradesh', detail: 'Spiritual heart of India along crescent Ganga bend', highlightFact: 'Over 84 historic stone ghats along the sacred waterfront' },
      { id: 'm-farakka', name: 'Farakka Barrage', type: 'dam', x: 488, y: 390, state: 'West Bengal', detail: '2,240m barrage diverting water into Hooghly', highlightFact: 'Maintains navigation depth for Kolkata and Haldia ports' },
    ],
  },
  {
    id: 'brahmaputra',
    name: 'Brahmaputra Basin',
    riverName: 'Brahmaputra River',
    color: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.75)',
    length: '2,900 km (916 km in India)',
    origin: 'Chemayungdung Glacier (Tibet)',
    flowsThrough: 'Arunachal Pradesh, Assam, West Bengal',
    emptiesInto: 'Bay of Bengal',
    importance: 'Highest water yield in India (>30% of national discharge), navigation & flood cycles',
    tributaries: 'Brahmaputra, Teesta, Subansiri',
    banner: '/images/river-hd-brahmaputra.jpg',
    thumb: '/images/river-thumb-hd-brahmaputra.jpg',
    mapX: '82.4%',
    mapY: '33.8%',
    badgeCoord: { x: 560, y: 250 },
    originCoord: { x: 470, y: 200, elevation: '5,150 m', state: 'Tibet Himalayas', label: 'Chemayungdung Glacier' },
    mouthCoord: { x: 508, y: 405, sea: 'Bay of Bengal', label: 'Meghna Estuary' },
    mainStemPath: 'M 470 200 Q 545 196 595 198 T 618 208 Q 610 235 585 252 T 530 275 T 485 305 Q 495 355 508 405',
    tributaryPaths: [
      { name: 'Subansiri', path: 'M 572 225 Q 562 245 550 268', labelPos: { x: 575, y: 230 } },
      { name: 'Teesta', path: 'M 462 265 Q 475 292 488 318', labelPos: { x: 470, y: 285 } },
      { name: 'Manas', path: 'M 505 252 Q 512 275 518 288', labelPos: { x: 508, y: 265 } },
      { name: 'Lohit', path: 'M 622 245 Q 600 252 582 256', labelPos: { x: 605, y: 248 } },
    ],
    catchmentPolygon: '470,180 630,180 630,260 570,300 490,400 480,320 450,260',
    milestones: [
      { id: 'm-namcha', name: 'Namcha Barwa Canyon', type: 'confluence', x: 618, y: 208, state: 'Arunachal / Tibet', detail: 'World deepest gorge looping into India', highlightFact: 'Drops nearly 2,000m through eastern Himalayan syntaxial bend' },
      { id: 'm-majuli', name: 'Majuli River Island', type: 'confluence', x: 550, y: 285, state: 'Assam', detail: 'World largest inhabited freshwater river island', highlightFact: 'Global cultural hub for Neo-Vaishnavite Satras' },
      { id: 'm-saraighat', name: 'Saraighat (Guwahati)', type: 'dam', x: 530, y: 305, state: 'Assam', detail: 'Vital strategic rail-road crossing over the river', highlightFact: 'Carries over 30% of total national freshwater runoff' },
    ],
  },
  {
    id: 'godavari',
    name: 'Godavari Basin',
    riverName: 'Godavari River',
    color: '#eab308',
    glowColor: 'rgba(234, 179, 8, 0.75)',
    length: '1,465 km',
    origin: 'Trimbakeshwar, Western Ghats (Maharashtra)',
    flowsThrough: 'Maharashtra, Telangana, Andhra Pradesh, Chhattisgarh, Odisha',
    emptiesInto: 'Bay of Bengal',
    importance: 'Dakshin Ganga (Ganges of the South), largest peninsular river basin, major agriculture',
    tributaries: 'Godavari, Penganga, Pranhita, Indravati',
    banner: '/images/river-hd-godavari.jpg',
    thumb: '/images/river-thumb-hd-godavari.jpg',
    mapX: '34.4%',
    mapY: '55.7%',
    badgeCoord: { x: 234, y: 412 },
    originCoord: { x: 125, y: 390, elevation: '1,067 m', state: 'Nashik, Maharashtra', label: 'Trimbakeshwar (Brahmagiri)' },
    mouthCoord: { x: 410, y: 498, sea: 'Bay of Bengal', label: 'Godavari Delta (Yanam)' },
    mainStemPath: 'M 125 390 Q 170 395 215 404 T 285 416 T 330 432 Q 360 452 385 470 T 410 498',
    tributaryPaths: [
      { name: 'Penganga', path: 'M 190 375 Q 230 388 270 405', labelPos: { x: 215, y: 375 } },
      { name: 'Pranhita', path: 'M 240 355 Q 275 385 305 418', labelPos: { x: 265, y: 365 } },
      { name: 'Indravati', path: 'M 345 392 Q 325 415 320 430', labelPos: { x: 335, y: 400 } },
      { name: 'Manjira', path: 'M 185 425 Q 225 420 265 415', labelPos: { x: 190, y: 435 } },
    ],
    catchmentPolygon: '110,370 230,340 350,370 410,460 390,500 310,440 210,425 110,410',
    milestones: [
      { id: 'm-jayakwadi', name: 'Jayakwadi Dam (Paithan)', type: 'dam', x: 195, y: 398, state: 'Maharashtra', detail: 'Key earthen dam for Marathwada irrigation', highlightFact: 'Provides water security to over 2.5 lakh hectares' },
      { id: 'm-kaleshwaram', name: 'Kaleshwaram Lift Project', type: 'dam', x: 305, y: 418, state: 'Telangana', detail: 'World largest multi-stage lift irrigation system', highlightFact: 'Harnesses Pranhita-Godavari confluence water via 140MW pumps' },
      { id: 'm-polavaram', name: 'Polavaram Project', type: 'dam', x: 360, y: 452, state: 'Andhra Pradesh', detail: 'National multipurpose storage project', highlightFact: 'Facilitates 80 TMC inter-basin water transfer to Krishna' },
      { id: 'm-rajahmundry', name: 'Rajahmundry Barrage', type: 'confluence', x: 385, y: 470, state: 'Andhra Pradesh', detail: 'Sir Arthur Cotton Barrage feeding the delta', highlightFact: 'Divides Godavari into Gautami and Vasishta distributaries' },
    ],
  },
  {
    id: 'krishna',
    name: 'Krishna Basin',
    riverName: 'Krishna River',
    color: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.75)',
    length: '1,400 km',
    origin: 'Mahabaleshwar, Western Ghats (Maharashtra)',
    flowsThrough: 'Maharashtra, Karnataka, Telangana, Andhra Pradesh',
    emptiesInto: 'Bay of Bengal',
    importance: 'Vital irrigation systems (Almatti & Nagarjuna Sagar), agricultural backbone',
    tributaries: 'Krishna, Bhima, Tungabhadra',
    banner: '/images/river-hd-krishna.jpg',
    thumb: '/images/river-thumb-hd-krishna.jpg',
    mapX: '37.1%',
    mapY: '69.2%',
    badgeCoord: { x: 252, y: 512 },
    originCoord: { x: 135, y: 465, elevation: '1,337 m', state: 'Maharashtra', label: 'Mahabaleshwar (Jor)' },
    mouthCoord: { x: 382, y: 542, sea: 'Bay of Bengal', label: 'Krishna Delta (Hamsaladeevi)' },
    mainStemPath: 'M 135 465 Q 160 478 190 485 T 255 492 T 308 495 Q 335 500 358 516 T 382 542',
    tributaryPaths: [
      { name: 'Bhima', path: 'M 145 435 Q 195 460 230 478 T 262 492', labelPos: { x: 190, y: 445 } },
      { name: 'Tungabhadra', path: 'M 168 542 Q 200 525 235 515 T 285 496', labelPos: { x: 205, y: 550 } },
      { name: 'Koyna', path: 'M 135 472 Q 142 476 152 480', labelPos: { x: 125, y: 485 } },
      { name: 'Ghataprabha', path: 'M 165 500 Q 185 495 205 488', labelPos: { x: 160, y: 495 } },
    ],
    catchmentPolygon: '120,450 250,450 350,480 390,540 330,540 230,550 150,530 120,480',
    milestones: [
      { id: 'm-almatti', name: 'Almatti Dam', type: 'dam', x: 190, y: 485, state: 'Karnataka', detail: 'Key reservoir of Upper Krishna Project', highlightFact: 'Stores 123 TMC water supporting North Karnataka fields' },
      { id: 'm-tbdam', name: 'Tungabhadra Dam (Hospet)', type: 'dam', x: 200, y: 535, state: 'Karnataka', detail: 'Major reservoir across the Tungabhadra', highlightFact: 'Historically sustained the medieval capital of Hampi' },
      { id: 'm-nagarjuna', name: 'Nagarjuna Sagar Dam', type: 'dam', x: 315, y: 495, state: 'Telangana/AP', detail: 'World largest masonry dam (124m height)', highlightFact: 'Holds 11.47 km³ gross storage feeding both Telugu states' },
      { id: 'm-prakasam', name: 'Prakasam Barrage', type: 'dam', x: 365, y: 530, state: 'Andhra Pradesh', detail: 'Barrage at Vijayawada regulating delta flow', highlightFact: 'Irrigates 13 lakh acres of prime paddy and commercial crops' },
    ],
  },
  {
    id: 'cauvery',
    name: 'Cauvery Basin',
    riverName: 'Cauvery River',
    color: '#ec4899',
    glowColor: 'rgba(236, 72, 153, 0.75)',
    length: '800 km',
    origin: 'Talakaveri, Brahmagiri Range (Karnataka)',
    flowsThrough: 'Karnataka, Tamil Nadu, Kerala, Puducherry',
    emptiesInto: 'Bay of Bengal',
    importance: 'Intensely harnessed basin (>95% utilization), ancient delta irrigation & culture',
    tributaries: 'Cauvery, Hemavathi, Kabini, Amaravati',
    banner: '/images/river-hd-cauvery.jpg',
    thumb: '/images/river-thumb-hd-cauvery.jpg',
    mapX: '42.9%',
    mapY: '80.0%',
    badgeCoord: { x: 292, y: 592 },
    originCoord: { x: 165, y: 600, elevation: '1,341 m', state: 'Kodagu, Karnataka', label: 'Talakaveri (Brahmagiri Hills)' },
    mouthCoord: { x: 365, y: 652, sea: 'Bay of Bengal', label: 'Poompuhar Delta' },
    mainStemPath: 'M 165 600 Q 192 602 215 606 T 255 614 T 305 632 Q 325 642 342 647 T 365 652',
    tributaryPaths: [
      { name: 'Hemavathi', path: 'M 180 575 Q 195 590 215 606', labelPos: { x: 185, y: 575 } },
      { name: 'Kabini', path: 'M 178 625 Q 202 618 222 608', labelPos: { x: 180, y: 635 } },
      { name: 'Bhavani', path: 'M 210 635 Q 245 630 285 626', labelPos: { x: 225, y: 645 } },
      { name: 'Amaravati', path: 'M 242 665 Q 275 650 302 636', labelPos: { x: 265, y: 665 } },
    ],
    catchmentPolygon: '150,580 230,580 330,610 370,655 310,680 230,660 160,630',
    milestones: [
      { id: 'm-krs', name: 'Krishna Raja Sagara Dam (KRS)', type: 'dam', x: 215, y: 606, state: 'Karnataka', detail: 'Historic gravity dam designed by Sir MV', highlightFact: 'Drinking water backbone for Mysuru and Bengaluru' },
      { id: 'm-shivan', name: 'Shivanasamudra Falls', type: 'confluence', x: 245, y: 612, state: 'Karnataka', detail: 'Spectacular twin cataracts on Cauvery', highlightFact: 'Site of Asia first commercial hydro plant built in 1902' },
      { id: 'm-mettur', name: 'Mettur Dam (Stanley Reservoir)', type: 'dam', x: 278, y: 622, state: 'Tamil Nadu', detail: 'Key regulatory dam for delta agriculture', highlightFact: 'Constructed in 1934 with 93.4 TMC gross capacity' },
      { id: 'm-kallanai', name: 'Grand Anicut (Kallanai)', type: 'dam', x: 325, y: 642, state: 'Tamil Nadu', detail: 'Ancient 2nd-century CE diversion dam', highlightFact: 'Oldest water-diversion structure in continuous global use' },
    ],
  },
];

// 18 chapters list matching the user reference mockup and notes 1:1
export const waterChaptersNav = [
  { id: 'cover', num: '01', title: 'Module Intro', subtitle: 'The Cradle of Life' },
  { id: 'ch-01', num: '02', title: 'Hydrological Cycle', subtitle: 'Continuous Circulation of Water' },
  { id: 'ch-02', num: '03', title: 'Sources of Water', subtitle: 'Rain, Surface, Ground & Reclaimed' },
  { id: 'ch-03', num: '04', title: 'Global Water Resources', subtitle: 'The 97.5% Salt vs 2.5% Fresh Split' },
  { id: 'ch-04', num: '05', title: 'Rivers in India', subtitle: '6 Major Catchment Basin Groups' },
  { id: 'ch-05', num: '06', title: 'Uses of Water', subtitle: 'Agriculture (69%), Industry, Domestic' },
  { id: 'ch-06', num: '07', title: 'Conservation & Management', subtitle: 'Addressing India’s Water Stress' },
  { id: 'ch-07', num: '08', title: 'Inter-Basin Water Transfer', subtitle: 'Routing Surplus to Deficit Basins' },
  { id: 'ch-08', num: '09', title: 'Interlinking of Rivers', subtitle: 'NWDA Himalayan & Peninsular Networks' },
  { id: 'ch-09', num: '10', title: 'Groundwater', subtitle: 'Aquifer Strata & Water Table Dynamics' },
  { id: 'ch-10', num: '11', title: 'GW Potential in India', subtitle: 'Hard-Rock, Alluvial & Mountain Regions' },
  { id: 'ch-11', num: '12', title: 'Conjunctive Use', subtitle: 'Harmonizing Surface & Aquifer Supplies' },
  { id: 'ch-12', num: '13', title: 'GW Management', subtitle: 'Localized Physical & Social Strategies' },
  { id: 'ch-13', num: '14', title: 'GW Depletion', subtitle: 'Over-Extraction & Falling Water Tables' },
  { id: 'ch-14', num: '15', title: 'GW Contamination', subtitle: 'Geogenic & Anthropogenic Pollutants' },
  { id: 'ch-15', num: '16', title: 'GW Recharge', subtitle: 'Natural Infiltration & Artificial Techniques' },
  { id: 'ch-16', num: '17', title: 'Seawater Ingress', subtitle: 'Coastal Equilibrium & Salt Wedge Control' },
  { id: 'ch-summary', num: '18', title: 'Module Summary', subtitle: 'Recap, Quiz & Next World' },
];

// Chapter 05: Uses of Water Datasets (1:1 with User Reference Design & BCV755B Notes)
export interface WaterSector {
  id: string;
  num: number;
  title: string;
  percentage: number;
  pctLabel: string;
  shareNote: string;
  color: string;
  borderColor: string;
  glowColor: string;
  icon: any;
  desc: string;
  image: string;
  category: 'Productive Use' | 'Commercial Use' | 'Consumptive Use' | 'Commercial / Leisure';
  syllabusPoints: string[];
  keyStats: { label: string; value: string }[];
}

export const waterSectorsData: WaterSector[] = [
  {
    id: 'agriculture',
    num: 1,
    title: 'Agriculture',
    percentage: 70,
    pctLabel: '70%',
    shareNote: 'of total freshwater use',
    color: '#22c55e',
    borderColor: 'rgba(34, 197, 94, 0.65)',
    glowColor: 'rgba(34, 197, 94, 0.35)',
    icon: Sprout,
    desc: 'Water is used for irrigation, livestock, aquaculture and other agricultural activities to ensure food security.',
    image: '/images/water-use-agriculture.jpg?v=20261001_1',
    category: 'Productive Use',
    syllabusPoints: [
      '69% to 70% of worldwide water use is allocated for agricultural irrigation.',
      'Single largest user of water globally — essential to sustain crops, livestock and fisheries.',
      'In arid regions, irrigation is strictly required to grow any crops at all; in other areas, it permits higher-value crops and enhances yields.',
      'Classified as Productive Use in BCV755B: irrigation of food crops, fodder crops, and medicinal herbs.',
    ],
    keyStats: [
      { label: 'Global Share', value: '70%' },
      { label: 'Syllabus Type', value: 'Productive Use' },
      { label: 'Prime Purpose', value: 'Food Security' },
    ],
  },
  {
    id: 'industry',
    num: 2,
    title: 'Industry',
    percentage: 20,
    pctLabel: '20%',
    shareNote: 'of total freshwater use',
    color: '#f59e0b',
    borderColor: 'rgba(245, 158, 11, 0.65)',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    icon: Factory,
    desc: 'Water is used in manufacturing, power generation, mining, processing and cooling in various industries.',
    image: '/images/water-use-industry.jpg?v=20261001_1',
    category: 'Commercial Use',
    syllabusPoints: [
      '15% to 20% of worldwide water use is absorbed by industrial manufacturing and processing.',
      'Thermal & nuclear power plants use immense water quantities for condenser cooling and steam turbines.',
      'Ore beneficiation and petroleum refineries utilize water extensively in chemical reactions and heat exchange.',
      'Manufacturing facilities employ water as a universal solvent, cleaning medium, and material conveyance fluid.',
    ],
    keyStats: [
      { label: 'Global Share', value: '20%' },
      { label: 'Syllabus Type', value: 'Commercial Use' },
      { label: 'Key Consumers', value: 'Power & Refineries' },
    ],
  },
  {
    id: 'domestic',
    num: 3,
    title: 'Domestic Use',
    percentage: 8,
    pctLabel: '8%',
    shareNote: 'of total freshwater use',
    color: '#0ea5e9',
    borderColor: 'rgba(14, 165, 233, 0.65)',
    glowColor: 'rgba(14, 165, 233, 0.35)',
    icon: Home,
    desc: 'Water is used for drinking, cooking, cleaning, sanitation and maintaining hygiene in households and cities.',
    image: '/images/water-use-domestic.jpg?v=20261001_1',
    category: 'Consumptive Use',
    syllabusPoints: [
      '8% to 15% of global freshwater withdrawal supplies households and municipal urban systems.',
      'Essential for human survival: drinking, cooking, bathing, hygiene, sanitation, and home gardening.',
      'Basic human requirement is defined at approximately 50 litres per person per day (excluding gardening).',
      'Categorized as Consumptive Use in course notes: water directly consumed for domestic living.',
    ],
    keyStats: [
      { label: 'Global Share', value: '8%' },
      { label: 'Daily Minimum', value: '50 L / capita / day' },
      { label: 'Syllabus Type', value: 'Consumptive Use' },
    ],
  },
  {
    id: 'recreation',
    num: 4,
    title: 'Recreation',
    percentage: 2,
    pctLabel: '2%',
    shareNote: 'of total freshwater use',
    color: '#a855f7',
    borderColor: 'rgba(168, 85, 247, 0.65)',
    glowColor: 'rgba(168, 85, 247, 0.35)',
    icon: Waves,
    desc: 'Water supports recreational activities like swimming, boating, fishing and tourism, contributing to well-being.',
    image: '/images/water-use-recreation.jpg?v=20261001_1',
    category: 'Commercial / Leisure',
    syllabusPoints: [
      'A small but rapidly expanding percentage of total water allocations worldwide.',
      'Closely tied to reservoirs and lakes: catering to anglers, boating, water skiing, swimming, and ecotourism.',
      'If a reservoir is kept fuller than otherwise required specifically for recreation, the water retained is categorized as recreational use.',
      'Contributes to local tourism revenue, biodiversity protection, and mental/physical well-being.',
    ],
    keyStats: [
      { label: 'Global Share', value: '2%' },
      { label: 'Syllabus Type', value: 'Commercial / Leisure' },
      { label: 'Primary Habitats', value: 'Lakes & Reservoirs' },
    ],
  },
];

// Chapter 06: Water Conservation & Management Datasets (1:1 with User Reference Mockup & VTU Notes)
export interface ConservationStrategy {
  id: string;
  num: number;
  title: string;
  subtitle: string;
  color: string;
  badgeBg: string;
  badgeColor: string;
  btnBg: string;
  btnHoverBg: string;
  icon: any;
  image: string;
  metric: string;
  desc: string;
  vtuPoints: string[];
  practices: { name: string; impact: string }[];
  caseStudy: { title: string; metric: string; detail: string };
}

export const waterConservationStrategies: ConservationStrategy[] = [
  {
    id: 'agri',
    num: 1,
    title: 'Efficient Agriculture',
    subtitle: 'Drip irrigation, crop planning and less water-intensive crops.',
    color: '#22c55e',
    badgeBg: '#15803d',
    badgeColor: '#ffffff',
    btnBg: '#22c55e',
    btnHoverBg: '#16a34a',
    icon: Sprout,
    image: '/images/water-hd-agriculture.jpg',
    metric: '90%+ Application Efficiency (Cuts water use by 30-70%)',
    desc: 'Agricultural irrigation consumes nearly 70% of freshwater in India. Precision drip systems, micro-sprinklers, and crop diversification deliver water directly to root zones, curtailing percolation and evaporation.',
    vtuPoints: [
      'Micro-irrigation: Drip and micro-sprinkler systems reduce water usage by 30% to 70% while improving crop yields by 20% to 30%.',
      'Laser Land Leveling: Creates a uniform gradient across fields, cutting water runoff losses by 20-25% and enhancing fertilizer absorption.',
      'Crop Diversification: Shifting acreage from water-intensive sugarcane and paddy to dryland pulses, millets, and oilseeds in semi-arid basins.',
      'System of Rice Intensification (SRI): Alternate Wetting and Drying (AWD) saves up to 40% water compared to conventional flood submergence.',
      'Mulching Techniques: Organic straw and biodegradable plastic mulches suppress weed growth and reduce soil surface evaporation by 50%.',
    ],
    practices: [
      { name: 'Drip Emitters & Sub-Surface Tubes', impact: 'Eliminates surface evaporation, targeting root zones with precision.' },
      { name: 'Soil Moisture Sensors & Scheduling', impact: 'Automates watering solely when soil capillary tension drops.' },
      { name: 'Fertigation Integration', impact: 'Delivers micro-dosed fertilizers dissolved directly in irrigation lines.' },
    ],
    caseStudy: {
      title: 'Micro-Irrigation Transformation in Gujarat (GGRC)',
      metric: '35% Water Saved · 25% Yield Rise',
      detail: 'Over 1.2 million hectares brought under precision drip and sprinkler systems, saving billions of cubic meters of water while boosting farmer incomes.',
    },
  },
  {
    id: 'industry',
    num: 2,
    title: 'Industrial Conservation',
    subtitle: 'Water recycling, process optimization and reduced water wastage.',
    color: '#f97316',
    badgeBg: '#c2410c',
    badgeColor: '#ffffff',
    btnBg: '#f97316',
    btnHoverBg: '#ea580c',
    icon: Factory,
    image: '/images/water-hd-industry.jpg',
    metric: 'Zero Liquid Discharge (Up to 95% Recycled)',
    desc: 'Thermal power generation, chemical refineries, textiles, and paper manufacturing consume significant volumes. Implementing closed-loop cooling and ZLD recovers water and prevents river contamination.',
    vtuPoints: [
      'Zero Liquid Discharge (ZLD): Mandated for highly polluting industries; wastewater is purified via RO, Multi-Effect Evaporators (MEE), and ATFD crystallizers.',
      'Closed-Loop Recirculating Cooling: Replaces once-through cooling towers, slashing fresh makeup water withdrawals by up to 95%.',
      'Quantitative Water Audits: Comprehensive input-output mass balance measuring leaks, blowdown rates, and recovery targets.',
      'Condensate & High-Purity Steam Recovery: Re-injecting boiler steam condensate saves high-grade treated water and thermal BTUs.',
      'Dry Ash Disposal Systems: Thermal plants shifting from wet slurry ash piping to dry pneumatic handling saves millions of liters daily.',
    ],
    practices: [
      { name: 'Reverse Osmosis & Nano-Filtration', impact: 'Recovers 75-85% clean permeate from industrial effluent streams.' },
      { name: 'Air-Cooled Condensers (ACC)', impact: 'Replaces evaporative cooling towers in water-stressed arid zones.' },
      { name: 'Counter-Current Rinse Cascades', impact: 'Reuses rinse water across multiple textile/metal processing stages.' },
    ],
    caseStudy: {
      title: 'ZLD Mandate in Tirupur Textile Cluster, Tamil Nadu',
      metric: 'Zero Effluent to Noyyal River · 90% Water Recovered',
      detail: 'Over 400 dyeing units connected to 18 CETPs equipped with reverse osmosis and salt recovery crystallizers, reviving the Noyyal river ecology.',
    },
  },
  {
    id: 'domestic',
    num: 3,
    title: 'Domestic Conservation',
    subtitle: 'Fix leaks, efficient fixtures and responsible usage in households.',
    color: '#06b6d4',
    badgeBg: '#0891b2',
    badgeColor: '#ffffff',
    btnBg: '#06b6d4',
    btnHoverBg: '#0891b2',
    icon: Home,
    image: '/images/water-hd-domestic.jpg',
    metric: 'Save 30-50 Liters/Day Per Person',
    desc: 'Residential water demand is surging with urbanization. Combining low-flow aerators, dual-flush toilets, rainwater cisterns, and leak elimination transforms household sustainability.',
    vtuPoints: [
      'Low-Flow Aerator Faucets: Aerators introduce micro-air bubbles into the stream, cutting tap discharge from 15 L/min to 3-5 L/min without sacrificing rinsing pressure.',
      'Dual-Flush Toilet Cisterns: Employs 3-liter half flush for liquids and 6-liter full flush for solids, saving ~20,000 liters per household yearly.',
      'Proactive Leak Repair: A silent toilet flapper leak can waste 200 L/day; a dripping faucet wastes 30-50 L/day. Regular pressure-testing stops silent losses.',
      'Rooftop Rainwater Harvesting (RWH): Capturing rooftop runoff through leaf guards and first-flush diverters into filtered masonry sump tanks.',
      'Greywater Diversion & Sub-Surface Use: Reusing washbasin and laundry discharge for toilet flushing and domestic landscape gardens.',
    ],
    practices: [
      { name: 'Pressure-Compensating Aerators', impact: 'Maintains steady 4 L/min flow regardless of building head pressure.' },
      { name: 'First-Flush Rainwater Diverters', impact: 'Discards initial contaminated atmospheric deposition runoff automatically.' },
      { name: 'Smart Flow Meters & Leak Detectors', impact: 'Notifies residents of pipe bursts or continuous seepage instantly via telemetry.' },
    ],
    caseStudy: {
      title: 'Mandatory Urban Rainwater Harvesting in Chennai',
      metric: 'Water Table Rose 6 to 8 Meters Across City',
      detail: 'State ordinance passed in 2003 mandating RWH in every building restored depleted coastal aquifers and significantly mitigated seasonal water shortages.',
    },
  },
  {
    id: 'recycling',
    num: 4,
    title: 'Recycling & Reuse',
    subtitle: 'Treat and reuse wastewater for non-potable purposes.',
    color: '#a855f7',
    badgeBg: '#7e22ce',
    badgeColor: '#ffffff',
    btnBg: '#a855f7',
    btnHoverBg: '#9333ea',
    icon: RefreshCw,
    image: '/images/water-hd-recycling.jpg',
    metric: 'Tertiary Treated Wastewater Circular Economy',
    desc: 'Treated wastewater is a dependable, climate-resilient resource. Secondary and tertiary sewage treatment enables safe circular reuse for thermal cooling, construction, toilet flushing, and urban greening.',
    vtuPoints: [
      'Centralized & Decentralized STPs: Membrane Bioreactors (MBR) and Sequential Batch Reactors (SBR) generate effluent meeting stringent CPCB standards.',
      'Dual-Piping Distribution: Modern apartment complexes and industrial hubs feature dual plumbing (blue for fresh potable; purple for treated non-potable).',
      'Thermal Power Plant Makeup: Government policy mandates all thermal power plants within 50 km of an STP to utilize treated sewage for cooling.',
      'Managed Aquifer Recharge (MAR): Utilizing polished reclaimed water to replenish coastal aquifers and halt inland progression of seawater wedges.',
      'Constructed Wetlands & Root-Zone Systems: Eco-engineered reed beds utilizing Phragmites and Typha for natural low-energy wastewater treatment.',
    ],
    practices: [
      { name: 'Membrane Bioreactors (MBR)', impact: 'Produces crystal-clear disinfected water in 50% less footprint than legacy STPs.' },
      { name: 'Dual Supply Purple Pipes', impact: 'Segregates treated non-potable water safely for flushing and irrigation.' },
      { name: 'UV Disinfection & Ozonation', impact: 'Neutralizes pathogens without leaving toxic chemical disinfection byproducts.' },
    ],
    caseStudy: {
      title: 'Nagpur Municipal Sewage Reuse for Thermal Power',
      metric: '130 MLD Treated Sewage Reused Daily',
      detail: 'Nagpur Municipal Corporation treats 130 million liters/day of domestic wastewater and supplies it to Mahagenco Koradi Thermal Power Station, freeing fresh river water for 1.5M citizens.',
    },
  },
];

export interface ManagementApproach {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  badgeBg: string;
  detailedPoints: string[];
}

export const managementApproachesData: ManagementApproach[] = [
  {
    id: 'demand',
    title: 'Demand Management',
    subtitle: 'Reduce and optimize water use.',
    icon: Droplet,
    color: '#38bdf8',
    badgeBg: 'rgba(56, 189, 248, 0.15)',
    detailedPoints: [
      'Volumetric Water Tariffs: Progressive slab-based pricing to disincentivize excessive consumption while protecting lifeline access.',
      'Mandatory Water Audits: Periodic industrial, municipal, and commercial mass-balance auditing to eliminate system losses.',
      'Appliance Standards: Bureau of Energy Efficiency / GRIHA star-rating standards for water-efficient fixtures and washing machines.',
      'Public Behavior & Education: Community campaigns and school curricula promoting conservation consciousness.',
    ],
  },
  {
    id: 'supply',
    title: 'Supply Management',
    subtitle: 'Develop and maintain water sources.',
    icon: Settings,
    color: '#4ade80',
    badgeBg: 'rgba(74, 222, 128, 0.15)',
    detailedPoints: [
      'Traditional Water Body Revitalization: Desilting and rejuvenating historical cascading tank networks (Kere, Eri, Johads).',
      'Check Dams & Percolation Tanks: Constructing small earthen and masonry barrages to decelerate runoff and promote infiltration.',
      'Managed Aquifer Recharge (MAR): Injection wells and infiltration basins directing monsoon surplus directly into deep aquifers.',
      'Spring-Shed Rejuvenation: Protection and afforestation of recharge zones in Himalayan and Western Ghats micro-catchments.',
    ],
  },
  {
    id: 'iwrm',
    title: 'Integrated Water Resources Management (IWRM)',
    subtitle: 'Balance social, economic and environmental needs.',
    icon: Users2,
    color: '#f59e0b',
    badgeBg: 'rgba(245, 158, 11, 0.15)',
    detailedPoints: [
      'River Basin as Fundamental Unit: Managing water hydrologically across whole catchment boundaries rather than administrative lines.',
      'Dublin Principles (1992): Fresh water is finite; participatory management; women have central role; water has economic value.',
      'Participatory Irrigation Management (PIM): Empowering registered Water User Associations (WUAs) to operate canal tail-ends.',
      'Inter-Sectoral Coordination: Resolving competing tensions between municipal drinking, agricultural food security, and industrial cooling.',
    ],
  },
  {
    id: 'policy',
    title: 'Policy & Governance',
    subtitle: 'Regulations, community participation and sustainable planning.',
    icon: Sprout,
    color: '#c084fc',
    badgeBg: 'rgba(192, 132, 252, 0.15)',
    detailedPoints: [
      'National Water Policy (2012): Mandating pre-emptive priority for drinking water, minimum ecological flow, and conservation incentives.',
      'Model Groundwater Bill: Empowering state groundwater authorities to regulate extraction, notify over-exploited zones, and issue drilling NOCs.',
      'Rainwater Harvesting Mandates: Municipal town planning regulations enforcing mandatory RWH for plots exceeding specified dimensions.',
      'Jal Jeevan Mission & Atal Bhujal Yojana: Community-driven water budgeting and Gram Panchayat water security plans.',
    ],
  },
];

export interface ImpactItem {
  id: string;
  title: string;
  detail: string;
  color: string;
  badgeBg: string;
  icon: any;
}

export const impactItemsData: ImpactItem[] = [
  {
    id: 'stabilize',
    title: 'Stabilizes water availability',
    detail: 'Maintains storage buffers against monsoon failure and seasonal drought.',
    color: '#4ade80',
    badgeBg: 'rgba(74, 222, 128, 0.14)',
    icon: Sprout,
  },
  {
    id: 'food',
    title: 'Supports food security',
    detail: 'Secures dependable irrigation across both Kharif and Rabi cropping cycles.',
    color: '#38bdf8',
    badgeBg: 'rgba(56, 189, 248, 0.14)',
    icon: Users2,
  },
  {
    id: 'eco',
    title: 'Protects ecosystems',
    detail: 'Ensures environmental base flows in rivers, preventing wetlands from drying up.',
    color: '#22c55e',
    badgeBg: 'rgba(34, 197, 94, 0.14)',
    icon: Mountain,
  },
  {
    id: 'econ',
    title: 'Ensures sustainable economic growth',
    detail: 'Prevents industrial downtime and power station halts caused by severe water stress.',
    color: '#10b981',
    badgeBg: 'rgba(16, 185, 129, 0.14)',
    icon: TrendingUp,
  },
];

export interface RoleActionItem {
  id: string;
  title: string;
  color: string;
  icon: any;
  checklist: { id: string; text: string; savings: string }[];
}

export const roleActionItemsData: RoleActionItem[] = [
  {
    id: 'home',
    title: 'Save water at home',
    color: '#38bdf8',
    icon: Droplet,
    checklist: [
      { id: 'h1', text: 'Turn off tap while brushing teeth or shaving', savings: 'Saves 6-12 Liters / minute' },
      { id: 'h2', text: 'Install low-flow aerators on kitchen and bathroom taps', savings: 'Cuts tap discharge by 50%' },
      { id: 'h3', text: 'Promptly repair leaking toilet flappers and valves', savings: 'Saves 100-200 Liters / day' },
      { id: 'h4', text: 'Take shorter 4-minute showers or use bucket bath', savings: 'Saves 40-60 Liters / bath' },
    ],
  },
  {
    id: 'practices',
    title: 'Support sustainable practices',
    color: '#4ade80',
    icon: Sprout,
    checklist: [
      { id: 'p1', text: 'Adopt rooftop rainwater harvesting (RWH) in residential buildings', savings: 'Harvests 40,000+ L / year' },
      { id: 'p2', text: 'Use drip irrigation or soaker hoses for home gardening', savings: 'Reduces garden water by 60%' },
      { id: 'p3', text: 'Support local lake and wetland desilting initiatives', savings: 'Recharges community aquifers' },
      { id: 'p4', text: 'Divert air conditioner and RO reject water for floor mopping', savings: 'Reclaims 20-30 Liters / day' },
    ],
  },
  {
    id: 'consumer',
    title: 'Be a responsible consumer',
    color: '#f59e0b',
    icon: Users2,
    checklist: [
      { id: 'c1', text: 'Minimize food waste (agriculture consumes 70% of freshwater)', savings: 'Cuts virtual water footprint' },
      { id: 'c2', text: 'Purchase water-efficient appliances with high BEE / eco ratings', savings: 'Saves 30% per wash cycle' },
      { id: 'c3', text: 'Choose climate-smart millets and dryland crops in diet', savings: 'Lowers agricultural water demand' },
      { id: 'c4', text: 'Wear clothes longer and support sustainable fashion brands', savings: 'Saves thousands of virtual liters' },
    ],
  },
  {
    id: 'awareness',
    title: 'Spread awareness',
    color: '#60a5fa',
    icon: Globe,
    checklist: [
      { id: 'a1', text: 'Educate neighbors and housing societies on water meter benefits', savings: 'Curbs wasteful consumption' },
      { id: 'a2', text: 'Participate in World Water Day (March 22) community events', savings: 'Builds civic mobilization' },
      { id: 'a3', text: 'Report public pipe bursts and street leaks to municipal authorities', savings: 'Stops bulk conveyance loss' },
      { id: 'a4', text: 'Promote school and youth awareness on conservation laws', savings: 'Empowers future generations' },
    ],
  },
];

// Chapter 06: Official National Water Stress & Conservation Benchmarks
export interface WaterStressBenchmark {
  id: string;
  shortLabel: string;
  title: string;
  metric: string;
  unit: string;
  statusTag: string;
  statusTagColor: string;
  progressPct: number;
  progressLabel: string;
  keyFact: string;
  syllabusNote: string;
}

export const waterStressBenchmarksData: Record<string, WaterStressBenchmark> = {
  'per-capita': {
    id: 'per-capita',
    shortLabel: 'Per Capita Stress',
    title: 'National Per Capita Water Availability',
    metric: '1,486',
    unit: 'm³ / capita / year',
    statusTag: 'WATER-STRESSED (<1,700 m³)',
    statusTagColor: '#f59e0b',
    progressPct: 65,
    progressLabel: 'Critical threshold: Drops toward 1,000 m³ scarcity by 2050',
    keyFact: 'Fell from 5,177 m³ in 1951 to 1,486 m³ today due to population growth and urbanization.',
    syllabusNote: 'Classified as water-stressed under international Falkenmark index benchmarks.',
  },
  'nwm-target': {
    id: 'nwm-target',
    shortLabel: '20% Efficiency Goal',
    title: 'National Water Mission (NWM) 2030',
    metric: '+20%',
    unit: 'Water-Use Efficiency Mandate',
    statusTag: 'STATUTORY GOAL',
    statusTagColor: '#38bdf8',
    progressPct: 48,
    progressLabel: 'Current efficiency adoption: ~9.6% of 20% target',
    keyFact: 'Comprehensive mission under NAPCC targeting 20% improvement across irrigation, power & industry.',
    syllabusNote: 'Core government policy framework taught in VTU BCV755B natural resources syllabus.',
  },
  'micro-irrigation': {
    id: 'micro-irrigation',
    shortLabel: 'Drip / Micro-Irrigation',
    title: 'PMKSY - Per Drop More Crop (PDMC)',
    metric: '13.5M',
    unit: 'Hectares under Micro-Irrigation',
    statusTag: '90%+ EFFICIENCY',
    statusTagColor: '#22c55e',
    progressPct: 70,
    progressLabel: 'Targeting 20M hectares by 2028-29',
    keyFact: 'Cuts agricultural water loss by 30-70% and boosts crop productivity by up to 30%.',
    syllabusNote: 'Key demand-side management strategy for agricultural sector conserving 70% of national water.',
  },
  'zld-reuse': {
    id: 'zld-reuse',
    shortLabel: 'Treated Water Reuse',
    title: 'Zero Liquid Discharge & Reuse',
    metric: '28,000',
    unit: 'MLD Treatment Capacity Target',
    statusTag: 'CIRCULAR ECONOMY',
    statusTagColor: '#a855f7',
    progressPct: 42,
    progressLabel: 'Over 40% of thermal power plants now utilizing treated STP effluent',
    keyFact: 'Mandates power plants within 50 km of STPs to use recycled water, freeing potable reservoirs.',
    syllabusNote: 'Reclamation and tertiary treatment strategy reducing freshwater withdrawal.',
  },
};

// ─── CHAPTER 08: INTER-BASIN WATER TRANSFER (IBWT) DATASETS ───

export interface IBWTHotspot {
  id: string;
  title: string;
  sub?: string;
  color: string;
  border: string;
  glow: string;
  badgeBg: string;
  x: string;
  y: string;
  fullDescription: string;
  keyStats: { label: string; value: string }[];
}

export const ibwtHotspotsData: IBWTHotspot[] = [
  {
    id: 'surplus',
    title: 'Surplus Basin',
    sub: '(High Rainfall, Higher Water Availability)',
    color: '#22c55e',
    border: 'rgba(34, 197, 94, 0.7)',
    glow: 'rgba(34, 197, 94, 0.35)',
    badgeBg: 'rgba(15, 35, 25, 0.88)',
    x: '52.0%',
    y: '22.0%',
    fullDescription:
      'Catchment or river basin receiving heavy monsoon rainfall where seasonal runoff significantly exceeds local ecological, agricultural, and human water requirements (e.g., Brahmaputra, Mahanadi, and Godavari during peak monsoon).',
    keyStats: [
      { label: 'Hydrologic Status', value: 'Water Surplus' },
      { label: 'Catchment', value: 'High Orographic Rainfall' },
    ],
  },
  {
    id: 'reservoir',
    title: 'Reservoir / Barrage',
    sub: 'Storage & Diversion Headworks',
    color: '#38bdf8',
    border: 'rgba(56, 189, 248, 0.7)',
    glow: 'rgba(56, 189, 248, 0.35)',
    badgeBg: 'rgba(12, 30, 48, 0.88)',
    x: '62.0%',
    y: '45.0%',
    fullDescription:
      'Engineered multipurpose concrete dam or diversion barrage constructed on the surplus river to buffer peak monsoon flash floods, regulate draft, and feed water into conveyance link canals.',
    keyStats: [
      { label: 'Function', value: 'Flood Regulation & Storage' },
      { label: 'Potential', value: '34,000–40,000 MW Hydropower' },
    ],
  },
  {
    id: 'link',
    title: 'Transfer Link',
    sub: '(Canal / Tunnel / Pipeline)',
    color: '#a855f7',
    border: 'rgba(168, 85, 247, 0.7)',
    glow: 'rgba(168, 85, 247, 0.35)',
    badgeBg: 'rgba(32, 18, 52, 0.88)',
    x: '74.0%',
    y: '48.0%',
    fullDescription:
      'Network of engineered contour canals, deep ridge cuts, mountain tunnels, and lift pipelines designed to transport water across geographical watersheds with minimal seepage and evaporation loss.',
    keyStats: [
      { label: 'Proposed Length', value: '10,880 – 12,500 km' },
      { label: 'Conveyance', value: 'Gravity & Siphon Aqueducts' },
    ],
  },
  {
    id: 'deficit',
    title: 'Deficit Basin',
    sub: '(Low Rainfall, Water Scarcity)',
    color: '#f59e0b',
    border: 'rgba(245, 158, 11, 0.7)',
    glow: 'rgba(245, 158, 11, 0.35)',
    badgeBg: 'rgba(42, 26, 10, 0.88)',
    x: '88.0%',
    y: '34.0%',
    fullDescription:
      'Drought-prone, rain-shadow, or over-exploited river basin facing chronic water deficits, deep groundwater table declines, and severe crop failure risks without external water augmentation.',
    keyStats: [
      { label: 'Availability', value: '<1,000 m³/capita (Water Scarce)' },
      { label: 'Irrigation Benefit', value: '35 Million Hectares' },
    ],
  },
];

export interface IBWTStep {
  num: number;
  icon: any;
  title: string;
  sub: string;
  detail: string;
}

export const ibwtStepsData: IBWTStep[] = [
  {
    num: 1,
    icon: CloudRain,
    title: 'Excess water',
    sub: 'in surplus basin during high rainfall',
    detail:
      'During the monsoons, surplus river basins receive torrential orographic rainfall, generating enormous peak runoff that frequently causes catastrophic floods and empties unutilized into the sea.',
  },
  {
    num: 2,
    icon: Building2,
    title: 'Stored in',
    sub: 'reservoirs or barrages',
    detail:
      'High-capacity storage reservoirs and diversion barrages impound surplus floodwaters, moderating downstream peak discharge while securing water for dry-season transfer.',
  },
  {
    num: 3,
    icon: Layers,
    title: 'Transferred',
    sub: 'through canals, tunnels or pipelines',
    detail:
      'Surplus water is routed across natural watershed divides through concrete-lined canals, mountain tunnels, cross-drainage aqueducts, and lift pumping networks.',
  },
  {
    num: 4,
    icon: Droplets,
    title: 'Delivered to',
    sub: 'deficit basin for various uses',
    detail:
      'Delivered into drought-stricken river channels, local reservoirs, and agricultural canal commands to replenish groundwater aquifers, irrigate crops, and supply drinking water.',
  },
];

export interface IBWTExample {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  bullets: string[];
  states: string;
  description: string;
}

export const ibwtExamplesData: IBWTExample[] = [
  {
    id: 'ken-betwa',
    title: 'Ken–Betwa Link',
    subtitle: 'Ken (Yamuna basin) → Betwa (Yamuna basin)',
    image: '/images/ibwt-ken-betwa.jpg',
    bullets: [
      'Augment water availability across drought-prone Bundelkhand',
      'Support irrigation for over 10.6 lakh hectares and drinking water for 62 lakh people',
      'First flagship project cleared under the National River Linking Project (NRLP)',
    ],
    states: 'Madhya Pradesh & Uttar Pradesh',
    description:
      'The Ken-Betwa Link Project transfers surplus water from the Ken River in Madhya Pradesh to the Betwa River in Uttar Pradesh. It involves the Daudhan Dam, a 221 km link canal, two tunnels, and generates 103 MW of clean hydropower.',
  },
  {
    id: 'godavari-krishna',
    title: 'Godavari–Krishna Link',
    subtitle: 'Godavari basin → Krishna basin',
    image: '/images/ibwt-godavari-krishna.jpg',
    bullets: [
      'Transfers surplus monsoon flows from Godavari to deficit Krishna basin',
      'Supports irrigation and drinking water for drought-hit Krishna delta',
      'Pioneered through Pattiseema Lift Scheme & Polavaram Right Main Canal',
    ],
    states: 'Andhra Pradesh & Telangana',
    description:
      'Historically linking the Godavari and Krishna rivers, this scheme diverts surplus floodwaters from the Godavari upstream into the Krishna River above the Prakasam Barrage, drought-proofing millions of acres of fertile delta farmlands.',
  },
];

export const allIBWTProjectsNotes: { name: string; stateYear: string; detail: string }[] = [
  { name: 'Periyar – Vaigai Project', stateYear: 'Kerala → Tamil Nadu, 1985', detail: 'Transfers west-flowing Periyar water through a Western Ghats tunnel to irrigate Madurai and Dindigul districts in drought-prone Tamil Nadu.' },
  { name: 'Kurnool – Cuddapah (K-C) Canal', stateYear: 'Andhra Pradesh, 1863–1870', detail: 'Historic 300+ km canal linking the Tungabhadra River to the Pennar basin, serving over 1.7 lakh acres in Rayalaseema.' },
  { name: 'Beas – Sutlej Link', stateYear: 'Himachal Pradesh & Punjab, 1983', detail: 'Diverts 4.7 BCM of Beas waters through two 13 km mountain tunnels into the Sutlej (Bhakra reservoir), generating 990 MW at Dehar power plant.' },
  { name: 'Indira Gandhi Nahar (Rajasthan Canal)', stateYear: 'Rajasthan, 1958', detail: '650 km long main canal network taking water from Harike Barrage (Punjab) across the Thar Desert to green millions of hectares in arid western Rajasthan.' },
  { name: 'Parambikulam – Aliyar Project', stateYear: 'Kerala & Tamil Nadu, 1962–1982', detail: 'Interstate multipurpose project linking 7 rivers in Anamalai hills with 8 dams and inter-connecting tunnels for irrigation and power.' },
  { name: 'Telugu – Ganga Project', stateYear: 'Andhra Pradesh & Tamil Nadu', detail: 'Transfers Krishna River water from Srisailam reservoir to Poondi reservoir to provide drinking water to Chennai city and irrigate Rayalaseema.' },
  { name: 'Sarada – Sahayak Project', stateYear: 'Uttar Pradesh, 1960', detail: 'Diverts surplus water from Ghagra and Sarada rivers into the Sai, Gomti, and Ganga basins to enhance agricultural irrigation.' },
  { name: 'Ramganga – Ganga Link', stateYear: 'Uttarakhand & Uttar Pradesh, 1978', detail: 'Multipurpose link providing flood control, irrigation to 5.75 lakh hectares, and 198 MW hydro generation.' },
  { name: 'Tehri Multipurpose Project', stateYear: 'Uttarakhand', detail: 'High dam on Bhagirathi river transferring regulated water supplies for Delhi drinking water, downstream Ganga irrigation, and 2,400 MW hydro capacity.' },
];

export interface IBWTBenefit {
  id: string;
  icon: any;
  title: string;
  detail: string;
  color: string;
  badgeBg: string;
}

export const ibwtBenefitsData: IBWTBenefit[] = [
  {
    id: 'scarcity',
    icon: Sprout,
    title: 'Reduces regional water scarcity',
    detail: 'Balances geographic disparities by conveying water from water-rich catchments to chronic deficit belts.',
    color: '#22c55e',
    badgeBg: 'rgba(34, 197, 94, 0.16)',
  },
  {
    id: 'agri',
    icon: Sprout,
    title: 'Supports agriculture and food security',
    detail: 'Converts 35 Million Hectares of rain-fed parched lands into assured double-cropped irrigated farmlands.',
    color: '#f59e0b',
    badgeBg: 'rgba(245, 158, 11, 0.16)',
  },
  {
    id: 'econ',
    icon: TrendingUp,
    title: 'Enhances economic development',
    detail: 'Boosts national agricultural yield by 250–450 Million Tons, spurring agro-processing and rural prosperity.',
    color: '#06b6d4',
    badgeBg: 'rgba(6, 182, 212, 0.16)',
  },
  {
    id: 'surplus',
    icon: Droplet,
    title: 'Utilizes surplus water effectively',
    detail: 'Harnesses otherwise unutilized monsoon flood discharges, moderating flood devastation in northern plains.',
    color: '#3b82f6',
    badgeBg: 'rgba(59, 130, 246, 0.16)',
  },
];

export const all18MeritsData: string[] = [
  'Uniform and economic utilization of water resources ensuring optimal national output',
  'Enhancement in irrigation potential (additional 35 Million Hectares)',
  'Clean hydropower generation of 34,000 to 40,000 MW',
  'Provides ample surface drinking and industrial water to water-stressed regions',
  'Scope for Inland Navigation reducing stress on highways and rail networks',
  'Minimizes the frequency and severity of both droughts and devastating floods',
  'Protects approximately 40 Million Hectares and 260 Million people from annual floods',
  'Saves an estimated Rs 1,200 crores per year in flood relief expenditures',
  'Drought protection benefiting 86 Million people across 116 districts in 14 states',
  'Helps substantially increase rural per capita income and living standards',
  'Reduces unsustainable over-exploitation of underground aquifers',
  'Creates immense direct and indirect employment during 40-year execution and operation',
  'Promotes commercial inland fisheries in new canals and storage reservoirs',
  'Salinity control: continuous freshwater drafts push back coastal saltwater ingress',
  'Creates scenic water bodies and reservoirs for tourism and recreation',
  'Triggers widespread infrastructural development (roads, power, communication)',
  'Stemms distress migration of rural populations from drought-hit regions',
  'Conversion of barren, degraded lands into cultivable, green arable lands',
];

export interface IBWTChallenge {
  id: string;
  icon: any;
  title: string;
  detail: string;
  color: string;
  badgeBg: string;
}

export const ibwtChallengesData: IBWTChallenge[] = [
  {
    id: 'eco',
    icon: Sprout,
    title: 'Environmental and ecological impact',
    detail: 'Submersion of prime forest lands and alteration of natural downstream riverine and estuarine habitats.',
    color: '#22c55e',
    badgeBg: 'rgba(34, 197, 94, 0.16)',
  },
  {
    id: 'displace',
    icon: Users2,
    title: 'Displacement of communities',
    detail: 'Large-scale rehabilitation and resettlement required for populations displaced by reservoir submersion.',
    color: '#38bdf8',
    badgeBg: 'rgba(56, 189, 248, 0.16)',
  },
  {
    id: 'cost',
    icon: IndianRupee,
    title: 'High cost and technical complexity',
    detail: 'Estimated capital cost exceeding Rs 5,60,000 crores (2002 baseline) with massive recurring maintenance.',
    color: '#60a5fa',
    badgeBg: 'rgba(96, 165, 250, 0.16)',
  },
  {
    id: 'disputes',
    icon: Scale,
    title: 'Inter-state water sharing disputes',
    detail: 'Complex political and constitutional hurdles in resolving riparian water rights between upper and lower states.',
    color: '#818cf8',
    badgeBg: 'rgba(129, 140, 248, 0.16)',
  },
  {
    id: 'downstream',
    icon: Trees,
    title: 'Impact on downstream flows and river ecosystems',
    detail: 'Reduction in lean-season environmental flows, affecting estuarine silt replenishment and mangrove health.',
    color: '#10b981',
    badgeBg: 'rgba(16, 185, 129, 0.16)',
  },
];

export const all14DemeritsData: string[] = [
  'Large land areas liable for submersion due to storage reservoirs and canal rights-of-way',
  'Substantial involuntary displacement of human settlements requiring extensive rehabilitation',
  'Disruption of natural aquatic biodiversity, fish migratory paths, and riverine ecosystems',
  'Interstate and international riparian disputes as riparian entities contest surplus declarations',
  'Enormous capital expenditure (Rs 5,60,000 crores 2002 est.) and heavy operational upkeep',
  'Vulnerability to conveyance pollution as open link canals traverse industrial and urban belts',
  'Conveyance losses through open canals due to soil seepage and intense atmospheric evaporation',
  'Loss of valuable natural forest cover and wildlife habitats necessitating compensatory afforestation',
  'Very long gestation period (estimated 30–40 years), leading to cost overruns and demographic shifts',
  'High-altitude lift conveyance requires vast electrical pumping energy and recurring tariffs',
  'Intense political and public debates required at micro and macro levels to achieve consensus',
  'Increased risk of soil erosion, reservoir siltation, and sedimentation within canal waterways',
  'Undulated topographic terrain requires thousands of complex cross-drainage structures and siphons',
  'Micro-climatic shifts and potential seismic vulnerabilities in tectonically active Himalayan storage zones',
];


