// Review progress, kept in this browser's localStorage. Content lives in the
// repo; only scheduling state lives here, keyed by stable item ids.
import { createEmptyCard, fsrs, generatorParameters, type Card, type Grade, type IPreview } from 'ts-fsrs';
import { items, itemById, itemsByNote, notes } from './content';

const KEY = 'research-review:v1';

export interface Settings {
  newPerDay: number;
  retention: number;
}

export interface ReviewEntry {
  id: string;
  rating: Grade;
  at: number;
  first: boolean;
}

interface Saved {
  version: 1;
  cards: Record<string, Card>;
  log: ReviewEntry[];
  settings: Settings;
}

const DEFAULT_SETTINGS: Settings = { newPerDay: 15, retention: 0.9 };

function reviveCard(raw: any): Card {
  return { ...raw, due: new Date(raw.due), last_review: raw.last_review ? new Date(raw.last_review) : undefined };
}

function parse(json: string): Saved {
  const raw = JSON.parse(json);
  if (!raw || typeof raw !== 'object' || typeof raw.cards !== 'object') throw new Error('Not a Research Review backup');
  const cards: Record<string, Card> = {};
  for (const [id, c] of Object.entries(raw.cards)) cards[id] = reviveCard(c);
  return {
    version: 1,
    cards,
    log: Array.isArray(raw.log) ? raw.log : [],
    settings: { ...DEFAULT_SETTINGS, ...(raw.settings ?? {}) },
  };
}

function load(): Saved {
  try {
    const json = localStorage.getItem(KEY);
    if (json) return parse(json);
  } catch (err) {
    console.error('Could not read saved progress', err);
  }
  return { version: 1, cards: {}, log: [], settings: { ...DEFAULT_SETTINGS } };
}

let state = load();

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Could not save progress', err);
  }
}

const scheduler = () =>
  fsrs(generatorParameters({ request_retention: state.settings.retention, enable_fuzz: true }));

export const getSettings = () => state.settings;
export function updateSettings(patch: Partial<Settings>) {
  state.settings = { ...state.settings, ...patch };
  save();
}

export const getCard = (id: string): Card | undefined => state.cards[id];

export function preview(id: string, now = new Date()): IPreview {
  return scheduler().repeat(state.cards[id] ?? createEmptyCard(now), now);
}

export function rate(id: string, rating: Grade, now = new Date()): Card {
  const first = !state.cards[id];
  const { card } = scheduler().next(state.cards[id] ?? createEmptyCard(now), now, rating);
  state.cards[id] = card;
  state.log.push({ id, rating, at: now.getTime(), first });
  save();
  return card;
}

const startOfDay = (d = new Date()) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

export function reviewsToday() {
  const t = startOfDay();
  return state.log.filter((e) => e.at >= t);
}

export function newRemainingToday() {
  const introduced = reviewsToday().filter((e) => e.first).length;
  return Math.max(0, state.settings.newPerDay - introduced);
}

/** Item ids whose next review is due. Ignores items whose note was deleted. */
export function dueIds(now = new Date()) {
  return Object.entries(state.cards)
    .filter(([id, c]) => itemById.has(id) && c.due <= now)
    .sort((a, b) => a[1].due.getTime() - b[1].due.getTime())
    .map(([id]) => id);
}

/** Never-reviewed items, in note order (oldest note first). */
export function newIds() {
  return notes.flatMap((n) => (itemsByNote.get(n.id) ?? []).filter((i) => !state.cards[i.id]).map((i) => i.id));
}

export function nextDue(): Date | undefined {
  let next: Date | undefined;
  for (const [id, c] of Object.entries(state.cards)) {
    if (itemById.has(id) && (!next || c.due < next)) next = c.due;
  }
  return next;
}

export function noteProgress(noteId: string) {
  const list = itemsByNote.get(noteId) ?? [];
  return { seen: list.filter((i) => state.cards[i.id]).length, total: list.length };
}

export const totalSeen = () => items.filter((i) => state.cards[i.id]).length;

export const exportProgress = () => JSON.stringify(state, null, 1);

export function importProgress(json: string) {
  state = parse(json);
  save();
}

export function resetProgress() {
  state = { version: 1, cards: {}, log: [], settings: state.settings };
  save();
}
