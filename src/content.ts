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

export const notes: Note[] = data.notes;
export const items: Item[] = data.items;
export const subjects: Subject[] = data.subjects.filter((s: Subject) => notes.some((n) => n.subject === s.id));

export const noteById = new Map(notes.map((n) => [n.id, n]));
export const itemById = new Map(items.map((i) => [i.id, i]));

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
