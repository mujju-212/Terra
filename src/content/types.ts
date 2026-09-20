export type Fact = { label: string; value: string; note?: string };

export type Chapter = {
  id: string;
  part: string;
  title: string;
  deck: string;
  kind: string;
  facts?: Fact[];
  bullets?: string[];
  quote?: string;
};

export type ModuleContent = {
  id: 1 | 2 | 3 | 4 | 5;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  subtitle: string;
  accent: string;
  image: string;
  noteFile: string;
  noteLabel: string;
  chapters: Chapter[];
  recap: Fact[];
  next?: { slug: string; name: string };
};
