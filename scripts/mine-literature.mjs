#!/usr/bin/env node
// Mine the Internet for new papers on the mathematics of cancer (game theory, optimal control,
// differential equations) and write a digest I can hand to Claude for integration into the tour.
//
//   npm run mine                       # everything since the last run (first run: last 180 days)
//   npm run mine -- --since 2026-01-01 # explicit start date
//   npm run mine -- --dry-run          # don't record what was found as "seen"
//   npm run mine -- --sources arxiv,europepmc --max 50 --min-score 2
//   npm run mine -- --query "Stackelberg evolutionary game"   # one ad-hoc query on every source
//   npm run mine -- --include-seen     # show papers already surfaced or already in the tour
//
// Sources (all free, no API keys): arXiv (plain http: the https endpoint often times out), Europe PMC (PubMed + bioRxiv/medRxiv), OpenAlex,
// Semantic Scholar. Papers already cited in content/tours/*.yaml or listed in
// docs/literature/seen.json are skipped. Output: docs/literature/inbox-<date>.md (+ .json).
// Queries and keyword scoring live in scripts/mine-literature.config.json.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml } from 'yaml';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(readFileSync(join(root, 'scripts', 'mine-literature.config.json'), 'utf8'));
const litDir = join(root, 'docs', 'literature');
const seenFile = join(litDir, 'seen.json');
const UA = `research-review-literature-miner/1.0 (mailto:${config.contact || 'unknown'})`;

// ---------- arguments ----------
const args = process.argv.slice(2);
const flag = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? (args[i + 1] ?? def) : def;
};
const has = (name) => args.includes(`--${name}`);
if (has('help')) {
  console.log(readFileSync(fileURLToPath(import.meta.url), 'utf8').split('\n').slice(1, 14).map((l) => l.replace(/^\/\/ ?/, '')).join('\n'));
  process.exit(0);
}
const todayStr = new Date().toISOString().slice(0, 10);
const seen = existsSync(seenFile) ? JSON.parse(readFileSync(seenFile, 'utf8')) : { lastRun: null, papers: {} };
const defaultSince = seen.lastRun ? shiftDays(seen.lastRun, -7) : shiftDays(todayStr, -180);
const since = flag('since', defaultSince);
const until = flag('until', todayStr);
const sources = flag('sources', 'arxiv,europepmc,openalex,semanticscholar').split(',').map((s) => s.trim());
const maxPerQuery = Number(flag('max', 100));
const minScore = Number(flag('min-score', 1));
const adHoc = flag('query', '');
const dryRun = has('dry-run');
const includeSeen = has('include-seen');

function shiftDays(iso, days) {
  const d = new Date(iso);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

// ---------- what we already know ----------
const normTitle = (t) =>
  String(t || '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
const normDoi = (d) => String(d || '').toLowerCase().replace(/^https?:\/\/(dx\.)?doi\.org\//, '').trim();
const normArxiv = (a) => String(a || '').replace(/^(arxiv:|https?:\/\/arxiv\.org\/abs\/)/i, '').replace(/v\d+$/, '').trim();

const known = new Map(); // key -> where it is known from
function remember(map, paper, where) {
  if (paper.doi) map.set(`doi:${normDoi(paper.doi)}`, where);
  if (paper.arxiv) map.set(`arxiv:${normArxiv(paper.arxiv)}`, where);
  if (paper.title) map.set(`title:${normTitle(paper.title)}`, where);
}
const toursDir = join(root, 'content', 'tours');
if (existsSync(toursDir)) {
  for (const f of (await import('node:fs')).readdirSync(toursDir).filter((f) => /\.ya?ml$/.test(f))) {
    const tour = parseYaml(readFileSync(join(toursDir, f), 'utf8')) ?? {};
    for (const p of tour.papers ?? []) remember(known, p, `tour ${f}`);
  }
}
for (const [key, entry] of Object.entries(seen.papers ?? {})) known.set(key, `seen ${entry.firstSeen}`);

function keysOf(p) {
  const keys = [];
  if (p.doi) keys.push(`doi:${normDoi(p.doi)}`);
  if (p.arxiv) keys.push(`arxiv:${normArxiv(p.arxiv)}`);
  if (p.title) keys.push(`title:${normTitle(p.title)}`);
  return keys;
}

// ---------- fetching ----------
async function get(url, { json = true, retries = 2, timeout = 45000 } = {}) {
  for (let attempt = 0; ; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: json ? 'application/json' : '*/*' }, signal: AbortSignal.timeout(timeout) });
      if (res.status === 429 && attempt < retries) {
        await sleep(5000 * (attempt + 1));
        continue;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return json ? res.json() : res.text();
    } catch (err) {
      if (attempt >= retries) throw err;
      await sleep(2000 * (attempt + 1));
    }
  }
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const xmlText = (block, tag) => {
  const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return m ? decodeXml(m[1].trim()) : '';
};
const decodeXml = (s) =>
  s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/\s+/g, ' ');

/** Each source yields {source, title, abstract, authors, year, date, venue, doi, arxiv, url, query}. */
const fetchers = {
  async arxiv(query) {
    const out = [];
    const url = `http://export.arxiv.org/api/query?search_query=${encodeURIComponent(query)}&start=0&max_results=${maxPerQuery}&sortBy=submittedDate&sortOrder=descending`;
    const xml = await get(url, { json: false, retries: 1, timeout: 30000 });
    for (const entry of xml.split('<entry>').slice(1)) {
      const date = xmlText(entry, 'published').slice(0, 10);
      if (date < since || date > until) continue;
      const id = xmlText(entry, 'id').replace(/^https?:\/\/arxiv\.org\/abs\//, '');
      const authors = [...entry.matchAll(/<name>([^<]+)<\/name>/g)].map((m) => decodeXml(m[1]));
      const doi = (entry.match(/<arxiv:doi[^>]*>([^<]+)</) || [])[1] || '';
      out.push({
        source: 'arxiv',
        title: xmlText(entry, 'title'),
        abstract: xmlText(entry, 'summary'),
        authors,
        year: Number(date.slice(0, 4)),
        date,
        venue: (entry.match(/<arxiv:journal_ref[^>]*>([^<]+)</) || [])[1] || 'arXiv',
        doi,
        arxiv: normArxiv(id),
        url: `https://arxiv.org/abs/${normArxiv(id)}`,
        query,
      });
    }
    await sleep(3000); // arXiv asks for a 3 s gap between requests
    return out;
  },

  async europepmc(query) {
    const q = `(${query}) AND (FIRST_PDATE:[${since} TO ${until}])`;
    const url = `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${encodeURIComponent(q)}&format=json&resultType=core&pageSize=${Math.min(maxPerQuery, 1000)}&sort=P_PDATE_D%20desc`;
    const data = await get(url);
    return (data.resultList?.result ?? []).map((r) => ({
      source: r.source === 'PPR' ? 'europepmc-preprint' : 'europepmc',
      title: r.title || '',
      abstract: r.abstractText || '',
      authors: (r.authorList?.author ?? []).map((a) => a.fullName || a.lastName).filter(Boolean),
      year: Number(r.pubYear) || undefined,
      date: r.firstPublicationDate || '',
      venue: r.journalInfo?.journal?.title || r.bookOrReportDetails?.publisher || (r.source === 'PPR' ? 'preprint' : ''),
      doi: r.doi || '',
      arxiv: '',
      url: r.doi ? `https://doi.org/${r.doi}` : r.fullTextUrlList?.fullTextUrl?.[0]?.url || `https://europepmc.org/article/${r.source}/${r.id}`,
      query,
    }));
  },

  async openalex(query) {
    const filter = `title_and_abstract.search:${query},from_publication_date:${since},to_publication_date:${until}`;
    const mailto = config.contact ? `&mailto=${encodeURIComponent(config.contact)}` : '';
    const url = `https://api.openalex.org/works?filter=${encodeURIComponent(filter)}&per-page=${Math.min(maxPerQuery, 200)}&sort=publication_date:desc${mailto}`;
    const data = await get(url);
    return (data.results ?? []).map((w) => ({
      source: 'openalex',
      title: w.title || w.display_name || '',
      abstract: invertedToText(w.abstract_inverted_index),
      authors: (w.authorships ?? []).map((a) => a.author?.display_name).filter(Boolean),
      year: w.publication_year,
      date: w.publication_date || '',
      venue: w.primary_location?.source?.display_name || '',
      doi: normDoi(w.doi || ''),
      arxiv: (w.locations ?? []).map((l) => l.landing_page_url || '').find((u) => /arxiv\.org\/abs\//.test(u))?.replace(/.*arxiv\.org\/abs\//, '') || '',
      url: w.doi || w.primary_location?.landing_page_url || w.id,
      query,
    }));
  },

  async semanticscholar(query) {
    const fields = 'title,abstract,authors,year,venue,externalIds,publicationDate,citationCount,url';
    const url = `https://api.semanticscholar.org/graph/v1/paper/search/bulk?query=${encodeURIComponent(query)}&publicationDateOrYear=${since}:${until}&fields=${fields}`;
    const data = await get(url);
    return (data.data ?? []).slice(0, maxPerQuery).map((p) => ({
      source: 'semanticscholar',
      title: p.title || '',
      abstract: p.abstract || '',
      authors: (p.authors ?? []).map((a) => a.name),
      year: p.year,
      date: p.publicationDate || '',
      venue: p.venue || '',
      doi: p.externalIds?.DOI || '',
      arxiv: p.externalIds?.ArXiv || '',
      url: p.url || '',
      citations: p.citationCount,
      query,
    }));
  },
};

function invertedToText(index) {
  if (!index) return '';
  const words = [];
  for (const [word, positions] of Object.entries(index)) for (const pos of positions) words[pos] = word;
  return words.join(' ');
}

// ---------- scoring ----------
const lower = (s) => String(s || '').toLowerCase();
function score(p) {
  const text = `${lower(p.title)} ${lower(p.abstract)}`;
  const cancerHits = config.required.cancer.filter((t) => text.includes(t));
  const mathHits = config.required.math.filter((t) => text.includes(t));
  if (cancerHits.length === 0 || mathHits.length === 0) return { score: 0, matched: [] };
  let s = mathHits.length;
  const matched = [...mathHits];
  for (const [term, w] of Object.entries(config.bonus)) {
    if (term.startsWith('$')) continue;
    if (text.includes(term)) {
      s += w;
      if (!matched.includes(term)) matched.push(term);
    }
  }
  if (lower(p.title).match(/cancer|tumou?r|oncolog|leuk|glioma|chemotherap|adaptive therapy/)) s += 1;
  return { score: s, matched };
}
function theme(p) {
  const text = `${lower(p.title)} ${lower(p.abstract)}`;
  let best = 'unsorted';
  let bestVotes = 0;
  for (const [id, terms] of Object.entries(config.themes)) {
    if (id.startsWith('$')) continue;
    const votes = terms.filter((t) => text.includes(t)).length;
    if (votes > bestVotes) {
      best = id;
      bestVotes = votes;
    }
  }
  return best;
}

// ---------- run ----------
console.error(`Mining ${sources.join(', ')} for ${since} … ${until}`);
const found = new Map(); // dedupe key -> paper
const stats = {};
for (const source of sources) {
  const fetcher = fetchers[source];
  if (!fetcher) {
    console.error(`unknown source "${source}" (known: ${Object.keys(fetchers).join(', ')})`);
    continue;
  }
  const queries = adHoc ? [adHoc] : (config.queries[source] ?? []);
  stats[source] = { raw: 0, kept: 0, errors: 0 };
  for (const query of queries) {
    try {
      const papers = await fetcher(query);
      stats[source].raw += papers.length;
      for (const p of papers) {
        if (!p.title) continue;
        const keys = keysOf(p);
        const dup = keys.find((k) => found.has(k));
        if (dup) {
          const prev = found.get(dup);
          if (!prev.abstract && p.abstract) prev.abstract = p.abstract;
          if (!prev.doi && p.doi) prev.doi = p.doi;
          if (!prev.venue && p.venue) prev.venue = p.venue;
          prev.sources.add(p.source);
          continue;
        }
        const entry = { ...p, sources: new Set([p.source]), keys };
        for (const k of keys) found.set(k, entry);
        stats[source].kept += 1;
      }
    } catch (err) {
      stats[source].errors += 1;
      console.error(`  ${source}: query failed (${err.message}): ${query.slice(0, 80)}`);
    }
    await sleep(1000);
  }
}

const unique = [...new Set(found.values())];
const results = [];
let skippedKnown = 0;
for (const p of unique) {
  const knownAs = p.keys.map((k) => known.get(k)).find(Boolean);
  if (knownAs && !includeSeen) {
    skippedKnown += 1;
    continue;
  }
  const { score: s, matched } = score(p);
  if (s < minScore) continue;
  results.push({ ...p, sources: [...p.sources], score: s, matched, theme: theme(p), knownAs: knownAs || '' });
}
results.sort((a, b) => b.score - a.score || (b.date || '').localeCompare(a.date || ''));

// ---------- write ----------
mkdirSync(litDir, { recursive: true });
const byTheme = new Map();
for (const r of results) byTheme.set(r.theme, [...(byTheme.get(r.theme) ?? []), r]);
const themeOrder = [...Object.keys(config.themes).filter((k) => !k.startsWith('$')), 'unsorted'];

const lines = [];
lines.push(`# Literature inbox ${todayStr}`, '');
lines.push(`Window: ${since} to ${until}. Sources: ${sources.join(', ')}. ${results.length} candidates after filtering (${unique.length} unique hits, ${skippedKnown} already known).`);
lines.push('');
lines.push('Each entry has a relevance score (higher = more of the tour\'s vocabulary) and a suggested chapter. To integrate, run `/integrate-literature docs/literature/inbox-' + todayStr + '.md` in Claude Code, or paste the entries you care about.');
lines.push('');
lines.push('| Source | hits | unique | failed queries |', '|---|---|---|---|');
for (const [s, v] of Object.entries(stats)) lines.push(`| ${s} | ${v.raw} | ${v.kept} | ${v.errors} |`);
lines.push('');
for (const t of themeOrder) {
  const list = byTheme.get(t);
  if (!list) continue;
  lines.push(`## ${t} (${list.length})`, '');
  for (const r of list) {
    const link = r.doi ? `https://doi.org/${normDoi(r.doi)}` : r.url;
    lines.push(`### [${r.score}] ${r.title} (${r.year ?? '?'})`);
    lines.push(`${r.authors.slice(0, 6).join(', ')}${r.authors.length > 6 ? ' et al.' : ''}${r.venue ? ` · ${r.venue}` : ''}${r.date ? ` · ${r.date}` : ''}`);
    lines.push(`${link}${r.arxiv ? ` · arXiv:${r.arxiv}` : ''} · via ${r.sources.join(', ')}${r.citations ? ` · ${r.citations} citations` : ''}${r.knownAs ? ` · already known (${r.knownAs})` : ''}`);
    lines.push(`Matched: ${r.matched.slice(0, 10).join(', ')}`);
    if (r.abstract) lines.push('', `> ${r.abstract.replace(/\s+/g, ' ').slice(0, 1500)}${r.abstract.length > 1500 ? '…' : ''}`);
    lines.push('');
  }
}
const mdFile = join(litDir, `inbox-${todayStr}.md`);
writeFileSync(mdFile, lines.join('\n'));
writeFileSync(
  join(litDir, `inbox-${todayStr}.json`),
  JSON.stringify({ since, until, sources, results: results.map(({ keys, ...r }) => r) }, null, 1),
);

if (!dryRun) {
  for (const r of results) {
    for (const k of r.keys) {
      if (!seen.papers[k]) seen.papers[k] = { firstSeen: todayStr, title: r.title.slice(0, 120) };
    }
  }
  seen.lastRun = todayStr;
  writeFileSync(seenFile, JSON.stringify(seen, null, 1));
}

console.error(`${results.length} candidates written to ${mdFile}${dryRun ? ' (dry run; seen.json untouched)' : ''}`);
for (const t of themeOrder) if (byTheme.has(t)) console.error(`  ${t}: ${byTheme.get(t).length}`);
