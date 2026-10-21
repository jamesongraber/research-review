// Guided tours: curated paths through the notes, with a chronological bibliography and open
// questions. One YAML file per tour in content/tours/. Format: docs/FORMAT.md ("Tours").
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';
import { parse as parseYaml } from 'yaml';

const SLUG_RE = /^[a-z0-9][a-z0-9-]*$/;

function asList(value, label) {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value)) throw new Error(`"${label}" must be a list`);
  return value;
}

function text(value, label, { required = false } = {}) {
  if (value === undefined || value === null || value === '') {
    if (required) throw new Error(`missing "${label}"`);
    return '';
  }
  return String(value).trim();
}

/** Turn a DOI, arXiv id or URL into a clickable link. */
export function paperHref(p) {
  if (p.doi) return `https://doi.org/${p.doi}`;
  if (p.arxiv) return `https://arxiv.org/abs/${p.arxiv}`;
  return p.url || '';
}

function parseTour(file, noteIds, render) {
  const data = parseYaml(readFileSync(file, 'utf8')) ?? {};
  const id = basename(file).replace(/\.ya?ml$/, '');
  if (!SLUG_RE.test(id)) throw new Error(`tour id "${id}" must be lowercase letters, digits and hyphens`);
  const title = text(data.title, 'title', { required: true });

  const chapterIds = new Set();
  const chapters = asList(data.chapters, 'chapters').map((c, ci) => {
    const cid = text(c.id, `chapters[${ci}].id`, { required: true });
    if (!SLUG_RE.test(cid)) throw new Error(`chapter id "${cid}" must be lowercase letters, digits and hyphens`);
    if (chapterIds.has(cid)) throw new Error(`duplicate chapter id "${cid}"`);
    chapterIds.add(cid);
    const stops = asList(c.stops, `chapter "${cid}" stops`).map((s, si) => {
      const note = text(typeof s === 'string' ? s : s.note, `chapter "${cid}" stops[${si}].note`, { required: true });
      if (!noteIds.has(note)) throw new Error(`chapter "${cid}": stop note "${note}" does not exist`);
      const why = typeof s === 'string' ? '' : text(s.why, 'why');
      return { note, whyHtml: why ? render(why, true) : '' };
    });
    const intro = text(c.intro, 'intro');
    return {
      id: cid,
      title: text(c.title, `chapter "${cid}" title`, { required: true }),
      period: text(c.period, 'period'),
      introHtml: intro ? render(intro) : '',
      stops,
    };
  });
  if (chapters.length === 0) throw new Error('a tour needs at least one chapter');

  const checkChapter = (chapter, label) => {
    if (chapter && !chapterIds.has(chapter)) throw new Error(`${label}: unknown chapter "${chapter}"`);
    return chapter;
  };
  const checkNotes = (list, label) => {
    for (const n of list) if (!noteIds.has(n)) throw new Error(`${label}: note "${n}" does not exist`);
    return list;
  };

  const seenKeys = new Set();
  const papers = asList(data.papers, 'papers').map((p, pi) => {
    const label = `papers[${pi}] "${text(p.title, 'title').slice(0, 40)}"`;
    const year = Number(p.year);
    if (!Number.isInteger(year) || year < 1500 || year > 2200) throw new Error(`${label}: "year" must be a four-digit year`);
    const key = text(p.key, 'key') || `${String(p.authors ?? '').split(/[ ,&]/)[0].toLowerCase()}${year}`;
    if (seenKeys.has(key)) throw new Error(`${label}: duplicate paper key "${key}" (set "key:" explicitly)`);
    seenKeys.add(key);
    const note = text(p.note, 'note');
    const paper = {
      key,
      year,
      authors: text(p.authors, `${label} authors`, { required: true }),
      title: text(p.title, `${label} title`, { required: true }),
      venue: text(p.venue, 'venue'),
      doi: text(p.doi, 'doi').replace(/^https?:\/\/(dx\.)?doi\.org\//, ''),
      arxiv: text(p.arxiv, 'arxiv'),
      url: text(p.url, 'url'),
      chapter: checkChapter(text(p.chapter, 'chapter'), label),
      notes: checkNotes(asList(p.notes, `${label} notes`).map(String), label),
      noteHtml: note ? render(note, true) : '',
      landmark: Boolean(p.landmark),
    };
    return { ...paper, href: paperHref(paper) };
  });
  papers.sort((a, b) => a.year - b.year || a.authors.localeCompare(b.authors));

  const questions = asList(data.open_questions, 'open_questions').map((q, qi) => {
    const label = `open_questions[${qi}]`;
    const body = text(q.body, 'body');
    return {
      title: text(q.title, `${label} title`, { required: true }),
      bodyHtml: body ? render(body) : '',
      chapter: checkChapter(text(q.chapter, 'chapter'), label),
      notes: checkNotes(asList(q.notes, `${label} notes`).map(String), label),
      status: text(q.status, 'status'),
    };
  });

  const intro = text(data.intro, 'intro');
  return {
    id,
    title,
    subtitle: text(data.subtitle, 'subtitle'),
    introHtml: intro ? render(intro) : '',
    chapters,
    papers,
    questions,
  };
}

export function listTourFiles(contentDir) {
  const dir = join(contentDir, 'tours');
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => /\.ya?ml$/.test(f))
    .sort()
    .map((f) => join(dir, f));
}

/** Load every tour; problems are returned, not thrown, like loadContent. */
export function loadTours(contentDir, noteIds, render) {
  const tours = [];
  const errors = [];
  const warnings = [];
  for (const file of listTourFiles(contentDir)) {
    const rel = `tours/${basename(file)}`;
    try {
      const tour = parseTour(file, noteIds, render);
      tours.push(tour);
      const stopped = new Set(tour.chapters.flatMap((c) => c.stops.map((s) => s.note)));
      for (const p of tour.papers) {
        if (!p.chapter && p.notes.length === 0) warnings.push(`${rel}: paper "${p.title.slice(0, 50)}" has neither a chapter nor notes`);
      }
      for (const c of tour.chapters) if (c.stops.length === 0) warnings.push(`${rel}: chapter "${c.id}" has no stops`);
      for (const n of tour.papers.flatMap((p) => p.notes)) {
        if (!stopped.has(n)) warnings.push(`${rel}: paper links to note "${n}", which is not a stop of the tour`);
      }
    } catch (err) {
      errors.push(`${rel}: ${err.message}`);
    }
  }
  return { tours, errors, warnings };
}
