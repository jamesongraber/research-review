// Validate content/ without building the app: `npm run check`.
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
import { loadContent } from './content.js';

const contentDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'content');
const { notes, items, subjects, tours, errors, warnings } = loadContent(contentDir);

for (const w of warnings) console.warn(`warning: ${w}`);
for (const e of errors) console.error(`error: ${e}`);

const cards = items.filter((i) => i.kind === 'card').length;
console.log(
  `${notes.length} notes, ${cards} cards, ${items.length - cards} quiz questions across ${subjects.length} subjects` +
    (tours.length ? `, ${tours.length} tour${tours.length === 1 ? '' : 's'} (${tours.reduce((n, t) => n + t.papers.length, 0)} papers)` : '') +
    (errors.length ? ` — ${errors.length} error(s)` : ' — OK'),
);
process.exit(errors.length ? 1 : 0);
