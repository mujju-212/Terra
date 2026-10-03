/**
 * Single source of truth for the Land module's 15 chapters.
 * The `id` values double as the DOM section ids rendered by each screen,
 * so nav jumps and IntersectionObserver tracking stay in sync.
 */
export interface LandChapter {
  id: string;
  num: string;
  title: string;
  fullTitle: string;
}

export const LAND_CHAPTERS: readonly LandChapter[] = [
  { id: 'cover', num: '01', title: 'Land Module Intro', fullTitle: 'Module Intro / Cover' },
  { id: 'ch-formation', num: '02', title: 'Earth Formation', fullTitle: 'Earth Formation (4.6 Bya)' },
  { id: 'ch-layers', num: '03', title: 'Earth Layers', fullTitle: 'Earth Layers Cutaway' },
  { id: 'ch-continents', num: '04', title: 'Crust & Continents', fullTitle: 'Crust & Continental Drift' },
  { id: 'ch-resource', num: '05', title: 'Land as a Resource', fullTitle: 'Land as a Resource (20%)' },
  { id: 'ch-soil', num: '06', title: 'Soil Formation', fullTitle: 'Soil Horizons & Weathering' },
  { id: 'ch-landforms', num: '07', title: 'Land Forms', fullTitle: 'Land Forms Explorer' },
  { id: 'ch-conservation', num: '08', title: 'Conservation of Land Forms', fullTitle: 'Conservation of Land Forms' },
  { id: 'ch-deforestation', num: '09', title: 'Deforestation', fullTitle: 'Deforestation & Forest Loss' },
  { id: 'ch-landuse', num: '10', title: 'Land-Use Change', fullTitle: 'Land-Use & Shire River Case Study' },
  { id: 'ch-soilhealth', num: '11', title: 'Soil Health & Composition', fullTitle: 'Soil Health & Composition' },
  { id: 'ch-degradation', num: '12', title: 'Land Degradation', fullTitle: '6 Pathways to Degradation' },
  { id: 'ch-soilconservation', num: '13', title: 'Soil Conservation', fullTitle: '8 Conservation Strategies' },
  { id: 'ch-planning', num: '14', title: 'Sustainable Land-Use Planning', fullTitle: 'Sustainable Planning & Future' },
  { id: 'ch-summary', num: '15', title: 'Module Summary', fullTitle: 'Summary & Knowledge Quiz' },
] as const;

export const CHAPTER_COUNT = LAND_CHAPTERS.length;
