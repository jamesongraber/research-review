// In-progress review sessions, saved on every step so leaving a review (e.g. to read
// the full explanation in a note) and coming back resumes exactly where it was.
import { itemById, itemsByNote } from './content';
import { dueIds, newIds, newRemainingToday } from './store';
import { shuffle } from './util';

const KEY = 'research-review:sessions';

export interface Session {
  /** 'daily' for the Today queue, or 'note:<id>' for practicing one note. */
  key: string;
  /** Local date the session was started; sessions don't carry over to another day. */
  day: string;
  queue: string[];
  pos: number;
  revealed: boolean;
  /** Index into the displayed (shuffled) options of the current quiz item. */
  chosen: number | null;
  /** Display order of the current quiz item's options, as indices into item.options. */
  order: number[] | null;
  reviewed: number;
  updated: number;
}

const today = () => new Date().toLocaleDateString('en-CA');

export const sessionKey = (noteId?: string) => (noteId ? `note:${noteId}` : 'daily');
export const sessionHref = (s: Session) => (s.key === 'daily' ? '#/review' : `#/review/${s.key.slice(5)}`);
export const remaining = (s: Session) => s.queue.length - s.pos;

function loadAll(): Record<string, Session> {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '{}') ?? {};
  } catch {
    return {};
  }
}

function saveAll(all: Record<string, Session>) {
  try {
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch (err) {
    console.error('Could not save review session', err);
  }
}

/** Drop items whose notes were deleted since the session was saved, keeping the position. */
function prune(s: Session): Session {
  if (s.queue.every((id) => itemById.has(id))) return s;
  const before = s.queue.slice(0, s.pos).filter((id) => itemById.has(id));
  const current = s.queue[s.pos];
  const after = s.queue.slice(s.pos).filter((id) => itemById.has(id));
  const keepsCurrent = current !== undefined && itemById.has(current);
  return withOrder({
    ...s,
    queue: [...before, ...after],
    pos: before.length,
    ...(keepsCurrent ? {} : { revealed: false, chosen: null, order: null }),
  });
}

/** Make sure the current quiz item has a stable shuffled option order. */
export function withOrder(s: Session): Session {
  const item = itemById.get(s.queue[s.pos]);
  if (item?.kind !== 'quiz') return s.order ? { ...s, order: null } : s;
  if (s.order && s.order.length === item.options.length) return s;
  return { ...s, chosen: null, order: shuffle(item.options.map((_, i) => i)) };
}

function isActive(s: Session | undefined): boolean {
  return !!s && s.day === today() && s.pos < s.queue.length;
}

export function loadSession(key: string): Session | undefined {
  const s = loadAll()[key];
  if (!s || !isActive(s)) return undefined;
  const pruned = prune(s);
  return isActive(pruned) ? pruned : undefined;
}

export function newSession(noteId?: string): Session {
  const queue = noteId
    ? (itemsByNote.get(noteId) ?? []).map((i) => i.id)
    : [...shuffle(dueIds()), ...newIds().slice(0, newRemainingToday())];
  return withOrder({
    key: sessionKey(noteId),
    day: today(),
    queue,
    pos: 0,
    revealed: false,
    chosen: null,
    order: null,
    reviewed: 0,
    updated: Date.now(),
  });
}

export function saveSession(s: Session) {
  const all = loadAll();
  if (isActive(s)) all[s.key] = { ...s, updated: Date.now() };
  else delete all[s.key];
  for (const [k, v] of Object.entries(all)) if (!isActive(v)) delete all[k];
  saveAll(all);
}

/** The most recently used unfinished session, if any. */
export function latestSession(): Session | undefined {
  return Object.values(loadAll())
    .filter(isActive)
    .sort((a, b) => b.updated - a.updated)[0];
}
