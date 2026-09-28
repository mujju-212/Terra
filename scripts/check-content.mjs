import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const expectedChapters = {
  land: 13,
  water: 16,
  air: 11,
  biodiversity: 9,
  warming: 14,
};

const requiredFacts = {
  land: ['4.6 billion years', '20% land', '45%', '25%', 'Shire River'],
  water: ['97.5%', '2.5%', '79%', 'Ganga'],
  air: ['78.084%', '20.946%', '1987'],
  biodiversity: ['~8.7 million', '10–30M insects', 'quinin'],
  warming: ['~30%', '~70%', '−18°C', '+15°C', 'EIA phases'],
};

let errors = 0;
for (const [module, expected] of Object.entries(expectedChapters)) {
  const path = resolve(root, `src/content/${module}.ts`);
  const source = await readFile(path, 'utf8');
  const chapters = source.match(/\bid:\s*['"]ch-\d{2}['"]/g) ?? [];

  if (chapters.length !== expected) {
    console.error(`✗ ${module}: expected ${expected} chapters, found ${chapters.length}`);
    errors += 1;
  } else {
    console.log(`✓ ${module}: ${chapters.length} chapters`);
  }

  for (const fact of requiredFacts[module]) {
    if (!source.toLowerCase().includes(fact.toLowerCase())) {
      console.error(`✗ ${module}: required course-note fact not found: ${fact}`);
      errors += 1;
    }
  }
}

if (errors) {
  console.error(`Content integrity check failed with ${errors} error(s).`);
  process.exitCode = 1;
} else {
  console.log('✓ Key course figures and case-study references are present.');
}
