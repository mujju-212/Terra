import land from './land';
import water from './water';
import air from './air';
import biodiversity from './biodiversity';
import warming from './warming';

export const modules = [land, water, air, biodiversity, warming] as const;
export const moduleBySlug = Object.fromEntries(modules.map((item) => [item.slug, item])) as Record<string, (typeof modules)[number]>;
export { land, water, air, biodiversity, warming };
