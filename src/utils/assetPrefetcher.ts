/**
 * High-performance progressive prefetcher for TERRA
 * Warms module JavaScript chunks and cover images on hover/idle
 * so that route switching is instantaneous (0ms perceived latency).
 */

const prefetchedModules = new Set<string>();
const prefetchedImages = new Set<string>();

const MODULE_IMPORTS: Record<string, () => Promise<unknown>> = {
  land: () => import('../pages/LandModuleExperience'),
  water: () => import('../pages/WaterModuleExperience'),
  air: () => import('../pages/AirModuleExperience'),
  bio: () => import('../pages/BioModuleExperience'),
  biodiversity: () => import('../pages/BioModuleExperience'),
  warming: () => import('../pages/WarmingModuleExperience'),
};

const MODULE_HERO_IMAGES: Record<string, string[]> = {
  land: ['/images/world-land.webp', '/images/begin-journey-landscape.jpg'],
  water: ['/images/water-cover-pristine-hd.jpg', '/images/water-ch01-cycle-master.jpg'],
  air: ['/images/air-hero-sky-master.jpg', '/images/air-ch01-layers-master.jpg'],
  bio: ['/images/bio-hero-forest-master.jpg', '/images/bio-summary/hero-bg.jpg'],
  biodiversity: ['/images/bio-hero-forest-master.jpg', '/images/bio-summary/hero-bg.jpg'],
  warming: ['/images/warming-hero-bg.jpg', '/images/warming-vs-climate-bg.jpg'],
};

/**
 * Silently preload an image into the browser disk/memory cache with low priority
 */
export function prefetchImage(src: string): void {
  if (typeof window === 'undefined' || !src || prefetchedImages.has(src)) return;
  prefetchedImages.add(src);

  const img = new Image();
  img.decoding = 'async';
  // Use low fetch priority so active screen downloads are never delayed
  if ('fetchPriority' in img) {
    (img as HTMLImageElement & { fetchPriority: string }).fetchPriority = 'low';
  }
  img.src = src;
}

/**
 * Prefetches both the JS code chunk and the hero visual assets for a given module
 */
export function prefetchModule(slug: string): void {
  const normalized = slug.toLowerCase();
  if (prefetchedModules.has(normalized)) return;
  prefetchedModules.add(normalized);

  // 1. Prefetch module code bundle
  const loader = MODULE_IMPORTS[normalized];
  if (loader) {
    loader().catch(() => {
      // Silent catch; normal navigation will retry
    });
  }

  // 2. Prefetch key hero images for that module
  const heroes = MODULE_HERO_IMAGES[normalized];
  if (heroes) {
    for (const hero of heroes) {
      prefetchImage(hero);
    }
  }
}
