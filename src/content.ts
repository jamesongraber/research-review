import data from 'virtual:content';

export interface Note {
  id: string;
  title: string;
  subject: string;
  tags: string[];
  related: string[];
  created: string;
  source: string;
  file: string;
  articleHtml: string;
}

export interface CardItem {
  id: string;
  noteId: string;
  kind: 'card';
  promptHtml: string;
  answerHtml: string;
  /** Slug of the article heading that explains this item ('' = the whole note). */
  see: string;
  seeTitleHtml: string;
}

export interface QuizItem {
  id: string;
  noteId: string;
  kind: 'quiz';
  promptHtml: string;
  options: { html: string; correct: boolean }[];
  explanationHtml: string;
  see: string;
  seeTitleHtml: string;
}

export type Item = CardItem | QuizItem;

export interface Subject {
  id: string;
  name: string;
}

/** A guided tour: ordered chapters of notes, a bibliography and open questions (content/tours/*.yaml). */
export interface Tour {
  id: string;
  title: string;
  subtitle: string;
  introHtml: string;
  chapters: TourChapter[];
  papers: TourPaper[];
  questions: TourQuestion[];
}

export interface TourChapter {
  id: string;
  title: string;
  period: string;
  introHtml: string;
  stops: { note: string; whyHtml: string }[];
}

export interface TourPaper {
  key: string;
  year: number;
  authors: string;
  title: string;
  venue: string;
  doi: string;
  arxiv: string;
  url: string;
  href: string;
  chapter: string;
  notes: string[];
  noteHtml: string;
  landmark: boolean;
}

export interface TourQuestion {
  title: string;
  bodyHtml: string;
  chapter: string;
  notes: string[];
  status: string;
}

export const notes: Note[] = data.notes;
export const items: Item[] = data.items;
export const subjects: Subject[] = data.subjects.filter((s: Subject) => notes.some((n) => n.subject === s.id));
export const tours: Tour[] = data.tours ?? [];

export const noteById = new Map(notes.map((n) => [n.id, n]));
export const itemById = new Map(items.map((i) => [i.id, i]));
export const tourById = new Map(tours.map((t) => [t.id, t]));

export const itemsByNote = new Map<string, Item[]>();
for (const item of items) {
  const list = itemsByNote.get(item.noteId) ?? [];
  list.push(item);
  itemsByNote.set(item.noteId, list);
}

const subjectNames = new Map<string, string>(data.subjects.map((s: Subject) => [s.id, s.name]));
export const subjectName = (id: string) => subjectNames.get(id) ?? id;

/** Notes that list `id` in their `related` field. */
export const backlinks = (id: string) => notes.filter((n) => n.related.includes(id) && n.id !== id);

export interface TourPlacement {
  tour: Tour;
  chapter: TourChapter;
  chapterIndex: number;
  /** Position of the note within the chapter. */
  index: number;
}

/** Every place a note appears as a tour stop. */
export function tourPlacements(noteId: string): TourPlacement[] {
  const out: TourPlacement[] = [];
  for (const tour of tours) {
    tour.chapters.forEach((chapter, chapterIndex) => {
      const index = chapter.stops.findIndex((s) => s.note === noteId);
      if (index >= 0) out.push({ tour, chapter, chapterIndex, index });
    });
  }
  return out;
}

/** Bibliography entries that point at a note, across all tours. */
export function papersForNote(noteId: string): TourPaper[] {
  return tours.flatMap((t) => t.papers.filter((p) => p.notes.includes(noteId)));
}

/** All review items of a chapter, in stop order. */
export const chapterItems = (chapter: TourChapter): Item[] => chapter.stops.flatMap((s) => itemsByNote.get(s.note) ?? []);
