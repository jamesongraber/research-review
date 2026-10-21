// In-progress review sessions, saved on every step so leaving a review (e.g. to read
// the full explanation in a note) and coming back resumes exactly where it was.
import { chapterItems, itemById, itemsByNote, noteById, tourById, type Tour, type TourChapter } from './content';
import { dueIds, newIds, newRemainingToday } from './store';
import { shuffle } from './util';

const KEY = 'research-review:sessions';

export interface Session {
  /** 'daily' for the Today queue, 'note:<id>' for one note, 'chapter:<tour>/<chapter>' for a tour chapter. */
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

/** What a session covers, decoded from its key. */
export type Scope =
  | { kind: 'daily' }
  | { kind: 'note'; noteId: string }
  | { kind: 'chapter'; tourId: string; chapterId: string; tour?: Tour; chapter?: TourChapter };

const today = () => new Date().toLocaleDateString('en-CA');

export const sessionKey = (noteId?: string) => (noteId ? `note:${noteId}` : 'daily');
export const chapterKey = (tourId: string, chapterId: string) => `chapter:${tourId}/${chapterId}`;

export function scopeOf(key: string): Scope {
  if (key.startsWith('note:')) return { kind: 'note', noteId: key.slice(5) };
  if (key.startsWith('chapter:')) {
    const [tourId, chapterId] = key.slice(8).split('/');
    const tour = tourById.get(tourId);
    const chapter = tour?.chapters.find((c) => c.id === chapterId);
    return { kind: 'chapter', tourId, chapterId, tour, chapter };
  }
  return { kind: 'daily' };
}

/** The review page for a session key. */
export function sessionHref(s: Session | string) {
  const scope = scopeOf(typeof s === 'string' ? s : s.key);
  if (scope.kind === 'note') return `#/review/${scope.noteId}`;
  if (scope.kind === 'chapter') return `#/review/chapter/${scope.tourId}/${scope.chapterId}`;
  return '#/review';
}

/** Where leaving a review goes back to. */
export function exitHref(key: string) {
  const scope = scopeOf(key);
  if (scope.kind === 'note') return `#/note/${scope.noteId}`;
  if (scope.kind === 'chapter') return `#/tour/${scope.tourId}`;
  return '#/';
}

/** Short label for the resume bar. */
export function sessionLabel(key: string) {
  const scope = scopeOf(key);
  if (scope.kind === 'note') return `Practicing ${noteById.get(scope.noteId)?.title ?? 'a note'}`;
  if (scope.kind === 'chapter') return `Practicing ${scope.chapter?.title ?? 'a chapter'}`;
  return 'Review in progress';
}

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

function queueFor(key: string): string[] {
  const scope = scopeOf(key);
  if (scope.kind === 'note') return (itemsByNote.get(scope.noteId) ?? []).map((i) => i.id);
  if (scope.kind === 'chapter') return scope.chapter ? chapterItems(scope.chapter).map((i) => i.id) : [];
  return [...shuffle(dueIds()), ...newIds().slice(0, newRemainingToday())];
}

export function newSession(key = 'daily'): Session {
  return withOrder({
    key,
    day: today(),
    queue: queueFor(key),
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
