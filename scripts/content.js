// Build-time content pipeline: reads content/**/*.md, validates it, and renders
// Markdown + LaTeX to HTML so the phone never has to run KaTeX.
// The file format is documented in docs/FORMAT.md.

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, relative, basename, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { parse as parseYaml } from 'yaml';
import { Marked } from 'marked';
import markedKatex from 'marked-katex-extension';

const marked = new Marked({ gfm: true });
marked.use(markedKatex({ throwOnError: true, nonStandard: true, output: 'html' }));

const SECTION_RE = /^##\s+(.+?)\s*$/;
const SECTIONS = ['article', 'cards', 'quiz'];

export function listMarkdownFiles(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listMarkdownFiles(p));
    else if (entry.name.endsWith('.md')) out.push(p);
  }
  return out.sort();
}

/** Display math must sit in its own block, so pad `$$` fences with blank lines. */
function padDisplayMath(md) {
  const lines = md.split('\n');
  const out = [];
  let open = false;
  for (const line of lines) {
    if (line.trim() === '$$') {
      if (!open) out.push('', '$$');
      else out.push('$$', '');
      open = !open;
    } else out.push(line);
  }
  return out.join('\n');
}

function render(md, inline = false) {
  const src = padDisplayMath(md.trim());
  return inline ? marked.parseInline(src) : marked.parse(src);
}

function hash(text) {
  const normalized = text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  return createHash('sha1').update(normalized).digest('hex').slice(0, 10);
}

function splitFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error('missing YAML frontmatter (the file must start with a --- block)');
  return { meta: parseYaml(m[1]) ?? {}, body: m[2] };
}

function splitSections(body) {
  const sections = {};
  let current = null;
  for (const line of body.split('\n')) {
    const m = line.match(SECTION_RE);
    if (m) {
      const name = m[1].toLowerCase();
      if (!SECTIONS.includes(name)) {
        throw new Error(`unknown section "## ${m[1]}" (allowed: Article, Cards, Quiz; use ### for subheadings)`);
      }
      if (sections[name] !== undefined) throw new Error(`duplicate section "## ${m[1]}"`);
      current = name;
      sections[name] = [];
    } else if (current) {
      sections[current].push(line);
    } else if (line.trim()) {
      throw new Error('text before the first ## section');
    }
  }
  return Object.fromEntries(Object.entries(sections).map(([k, v]) => [k, v.join('\n')]));
}

/** Split a Cards/Quiz section into blocks that each start with a `Q:` line. */
function splitQuestions(text, section) {
  const blocks = [];
  let cur = null;
  for (const line of text.split('\n')) {
    if (/^Q:/.test(line)) {
      cur = [line];
      blocks.push(cur);
    } else if (cur) {
      cur.push(line);
    } else if (line.trim()) {
      throw new Error(`${section}: text before the first "Q:" line: "${line.trim()}"`);
    }
  }
  return blocks;
}

function parseCard(lines) {
  const fields = { Q: [], A: [] };
  let field = null;
  for (const line of lines) {
    const m = line.match(/^([QA]):\s?(.*)$/);
    if (m) {
      field = m[1];
      if (fields[field].length) throw new Error(`card has two "${field}:" lines`);
      fields[field].push(m[2]);
    } else fields[field].push(line);
  }
  const q = fields.Q.join('\n').trim();
  const a = fields.A.join('\n').trim();
  if (!a) throw new Error(`card "${q.slice(0, 60)}" has no "A:" answer`);
  return { q, a };
}

function parseQuiz(lines) {
  const q = [];
  const e = [];
  const options = [];
  let field = 'Q';
  for (const line of lines) {
    let m;
    if ((m = line.match(/^Q:\s?(.*)$/))) {
      q.push(m[1]);
      field = 'Q';
    } else if ((m = line.match(/^- \[( |x|X)\]\s+(.*)$/))) {
      options.push({ text: m[2], correct: m[1] !== ' ' });
      field = 'O';
    } else if ((m = line.match(/^E:\s?(.*)$/))) {
      if (e.length) throw new Error('quiz question has two "E:" lines');
      e.push(m[1]);
      field = 'E';
    } else if (field === 'Q') q.push(line);
    else if (field === 'E') e.push(line);
    else if (line.trim()) options[options.length - 1].text += ' ' + line.trim();
  }
  const question = q.join('\n').trim();
  const label = `quiz "${question.slice(0, 60)}"`;
  if (options.length < 2) throw new Error(`${label} needs at least two "- [ ]" options`);
  const nCorrect = options.filter((o) => o.correct).length;
  if (nCorrect !== 1) throw new Error(`${label} must mark exactly one option with [x] (found ${nCorrect})`);
  return { q: question, options, e: e.join('\n').trim() };
}

function asStringArray(value, field) {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value)) throw new Error(`"${field}" must be a list, e.g. [a, b]`);
  return value.map(String);
}

function parseNote(file, contentDir) {
  const raw = readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const { meta, body } = splitFrontmatter(raw);
  const rel = relative(contentDir, file).replace(/\\/g, '/');
  const folder = basename(dirname(file));

  if (!meta.title) throw new Error('frontmatter is missing "title"');
  const id = String(meta.id ?? basename(file, '.md'));
  if (!/^[a-z0-9][a-z0-9-]*$/.test(id)) throw new Error(`id "${id}" must be lowercase letters, digits and hyphens`);
  const subject = String(meta.subject ?? (dirname(file) === contentDir ? 'general' : folder));
  const created = meta.created ? String(meta.created) : '';
  if (created && !/^\d{4}-\d{2}-\d{2}$/.test(created)) throw new Error(`created "${created}" must be YYYY-MM-DD`);

  const sections = splitSections(body);
  if (!sections.article?.trim()) throw new Error('missing "## Article" section');

  const note = {
    id,
    title: String(meta.title),
    subject,
    tags: asStringArray(meta.tags, 'tags'),
    related: asStringArray(meta.related, 'related'),
    created,
    source: meta.source ? String(meta.source) : '',
    file: rel,
    articleHtml: render(sections.article),
  };

  const items = [];
  const seen = new Set();
  const addItem = (item, key) => {
    if (seen.has(item.id)) throw new Error(`duplicate question: "${key.slice(0, 60)}"`);
    seen.add(item.id);
    items.push(item);
  };

  for (const block of splitQuestions(sections.cards ?? '', 'Cards')) {
    const { q, a } = parseCard(block);
    addItem({ id: `${id}:c:${hash(q)}`, noteId: id, kind: 'card', promptHtml: render(q), answerHtml: render(a) }, q);
  }
  for (const block of splitQuestions(sections.quiz ?? '', 'Quiz')) {
    const { q, options, e } = parseQuiz(block);
    addItem(
      {
        id: `${id}:q:${hash(q)}`,
        noteId: id,
        kind: 'quiz',
        promptHtml: render(q),
        options: options.map((o) => ({ html: render(o.text, true), correct: o.correct })),
        explanationHtml: e ? render(e) : '',
      },
      q,
    );
  }
  return { note, items };
}

function loadSubjects(contentDir) {
  const file = join(contentDir, 'subjects.yaml');
  if (!existsSync(file)) return [];
  const data = parseYaml(readFileSync(file, 'utf8')) ?? {};
  return Object.entries(data).map(([id, name]) => ({ id, name: String(name) }));
}

const titleCase = (s) => s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

/**
 * Load and validate all content. Never throws for content problems; they are
 * collected in `errors` (fatal) and `warnings` so callers can report all at once.
 */
export function loadContent(contentDir) {
  const errors = [];
  const warnings = [];
  const notes = [];
  const items = [];
  const files = listMarkdownFiles(contentDir);

  for (const file of files) {
    const rel = relative(contentDir, file).replace(/\\/g, '/');
    try {
      const parsed = parseNote(file, contentDir);
      notes.push(parsed.note);
      items.push(...parsed.items);
      if (parsed.items.length === 0) warnings.push(`${rel}: note has no cards or quiz questions`);
    } catch (err) {
      errors.push(`${rel}: ${err.message}`);
    }
  }

  const byId = new Map();
  for (const n of notes) {
    if (byId.has(n.id)) errors.push(`${n.file}: id "${n.id}" is also used by ${byId.get(n.id).file}`);
    byId.set(n.id, n);
  }
  for (const n of notes) {
    for (const r of n.related) {
      if (!byId.has(r)) warnings.push(`${n.file}: related note "${r}" does not exist (yet)`);
    }
  }

  // Subject order: subjects.yaml first, then any others alphabetically.
  const subjects = loadSubjects(contentDir);
  const known = new Set(subjects.map((s) => s.id));
  for (const id of [...new Set(notes.map((n) => n.subject))].sort()) {
    if (!known.has(id)) subjects.push({ id, name: titleCase(id) });
  }

  notes.sort((a, b) => (a.created || '9999').localeCompare(b.created || '9999') || a.title.localeCompare(b.title));
  return { notes, items, subjects, errors, warnings, files };
}
