export interface BioChapterNavItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
}

export const bioChaptersNav: BioChapterNavItem[] = [
  { id: 'cover', num: '01', title: 'Module Intro', subtitle: 'The Web of Living Things' },
  { id: 'ch-intro-bio', num: '02', title: 'Introduction', subtitle: 'What is Biodiversity?' },
  { id: 'ch-levels', num: '03', title: 'Levels of Biodiversity', subtitle: 'Genetic, Species and Ecosystem' },
  { id: 'ch-values', num: '04', title: 'Values', subtitle: 'Importance & Benefits' },
  { id: 'ch-threats', num: '05', title: 'Threats', subtitle: 'Challenges to Life' },
  { id: 'ch-conservation', num: '06', title: 'Conservation', subtitle: 'In-situ & Ex-situ Methods' },
  { id: 'ch-ecosystem', num: '07', title: 'Ecosystem', subtitle: 'Components and Interactions' },
  { id: 'ch-types', num: '08', title: 'Types', subtitle: 'Terrestrial & Aquatic Ecosystems' },
  { id: 'ch-significance', num: '09', title: 'Significance', subtitle: 'Role in a Sustainable Planet' },
  { id: 'ch-economic', num: '10', title: 'Economic Value', subtitle: 'Medicinal Plants, Drugs & Fisheries' },
  { id: 'ch-summary', num: '11', title: 'Module Summary', subtitle: 'Recap & Knowledge Check' },
];

export const modulesNav = [
  { id: 'land', num: '01', title: 'Land', path: '/module/land' },
  { id: 'water', num: '02', title: 'Water', path: '/module/water' },
  { id: 'air', num: '03', title: 'Air', path: '/module/air' },
  { id: 'bio', num: '04', title: 'Biodiversity', path: '/module/biodiversity' },
  { id: 'warming', num: '05', title: 'Global Warming', path: '/module/warming' },
];

export interface BioStatItem {
  id: string;
  value: string;
  label: string;
  iconType: 'leaf' | 'droplet' | 'plant' | 'insect' | 'microbe' | 'fungus';
}

export const bioStatsData: BioStatItem[] = [
  { id: 'terrestrial', value: '8.7M', label: 'Terrestrial Species (estimated)', iconType: 'leaf' },
  { id: 'oceanic', value: '2.2M', label: 'Oceanic Species (estimated)', iconType: 'droplet' },
  { id: 'vascular', value: '220K', label: 'Vascular Plants', iconType: 'plant' },
  { id: 'insects', value: '10–30M', label: 'Insect Species', iconType: 'insect' },
  { id: 'bacteria', value: '5–10M', label: 'Bacterial Species', iconType: 'microbe' },
  { id: 'fungi', value: '1.5M', label: 'Fungal Species', iconType: 'fungus' },
];

export interface BioBottomCardItem {
  num: string;
  title: string;
  desc: string;
  image: string;
  targetId: string;
  chapterIndex: number;
}

export const bioBottomCards: BioBottomCardItem[] = [
  {
    num: '01',
    title: 'Introduction',
    desc: 'What is Biodiversity?',
    image: '/images/bio-card-01-intro.jpg',
    targetId: 'ch-intro-bio',
    chapterIndex: 1,
  },
  {
    num: '02',
    title: 'Levels of Biodiversity',
    desc: 'Genetic, Species and Ecosystem',
    image: '/images/bio-card-02-levels.jpg',
    targetId: 'ch-levels',
    chapterIndex: 2,
  },
  {
    num: '03',
    title: 'Values',
    desc: 'Importance & Benefits',
    image: '/images/bio-card-03-values.jpg',
    targetId: 'ch-values',
    chapterIndex: 3,
  },
  {
    num: '04',
    title: 'Threats',
    desc: 'Challenges to Life',
    image: '/images/bio-card-04-threats.jpg',
    targetId: 'ch-threats',
    chapterIndex: 4,
  },
  {
    num: '05',
    title: 'Conservation',
    desc: 'In-situ & Ex-situ Methods',
    image: '/images/bio-card-05-conservation.jpg',
    targetId: 'ch-conservation',
    chapterIndex: 5,
  },
  {
    num: '06',
    title: 'Ecosystem',
    desc: 'Components and Interactions',
    image: '/images/bio-card-06-ecosystem.jpg',
    targetId: 'ch-ecosystem',
    chapterIndex: 6,
  },
  {
    num: '07',
    title: 'Types',
    desc: 'Terrestrial & Aquatic Ecosystems',
    image: '/images/bio-card-07-types.jpg',
    targetId: 'ch-types',
    chapterIndex: 7,
  },
  {
    num: '08',
    title: 'Significance',
    desc: 'Role in a Sustainable Planet',
    image: '/images/bio-card-08-significance.jpg',
    targetId: 'ch-significance',
    chapterIndex: 8,
  },
  {
    num: '09',
    title: 'Economic Value',
    desc: 'Medicinal Plants, Drugs & Fisheries',
    image: '/images/bio-card-09-economic.jpg',
    targetId: 'ch-economic',
    chapterIndex: 9,
  },
];
