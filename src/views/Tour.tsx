import { useState } from 'preact/hooks';
import {
  chapterItems,
  noteById,
  tourById,
  tours,
  type Tour,
  type TourChapter,
  type TourPaper,
  type TourQuestion,
} from '../content';
import { chapterKey, loadSession } from '../session';
import { noteProgress } from '../store';
import { Html } from '../util';

const TABS = [
  { id: 'chapters', label: 'Chapters' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'questions', label: 'Open questions' },
] as const;

/** #/tour, #/tour/<id>, #/tour/<id>/timeline, #/tour/<id>/questions */
export function TourView({ id, tab }: { id?: string; tab?: string }) {
  const tour = id ? tourById.get(id) : tours.length === 1 ? tours[0] : undefined;
  if (!tour) return <TourList />;
  const current = TABS.find((t) => t.id === tab)?.id ?? 'chapters';
  const stops = tour.chapters.flatMap((c) => c.stops);
  const studied = stops.filter((s) => noteProgress(s.note).seen > 0).length;

  return (
    <div class="page tour">
      {tours.length > 1 && (
        <a class="back" href="#/tour">
          ‹ Tours
        </a>
      )}
      <h1>{tour.title}</h1>
      {tour.subtitle && <p class="meta">{tour.subtitle}</p>}
      <p class="meta small">
        {tour.chapters.length} chapters · {stops.length} stops · {studied} started · {tour.papers.length} papers ·{' '}
        {tour.questions.length} open questions
      </p>
      <div class="segmented">
        {TABS.map((t) => (
          <a key={t.id} class={current === t.id ? 'active' : ''} href={`#/tour/${tour.id}${t.id === 'chapters' ? '' : `/${t.id}`}`}>
            {t.label}
          </a>
        ))}
      </div>
      {current === 'chapters' && <Chapters tour={tour} />}
      {current === 'timeline' && <Timeline tour={tour} />}
      {current === 'questions' && <Questions tour={tour} />}
    </div>
  );
}

function TourList() {
  return (
    <div class="page">
      <h1>Tours</h1>
      {tours.length === 0 && <p class="muted">No tours yet. Add one under content/tours/.</p>}
      <ul class="list">
        {tours.map((t) => (
          <li key={t.id}>
            <a href={`#/tour/${t.id}`}>
              <span class="title">{t.title}</span>
              <span class="meta">{t.subtitle}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Chapters({ tour }: { tour: Tour }) {
  return (
    <>
      {tour.introHtml && <Html class="prose intro" html={tour.introHtml} />}
      {tour.chapters.map((c, i) => (
        <Chapter key={c.id} tour={tour} chapter={c} index={i} />
      ))}
    </>
  );
}

function Chapter({ tour, chapter, index }: { tour: Tour; chapter: TourChapter; index: number }) {
  const items = chapterItems(chapter);
  const stopsDone = chapter.stops.filter((s) => {
    const p = noteProgress(s.note);
    return p.total > 0 && p.seen === p.total;
  }).length;
  const resume = loadSession(chapterKey(tour.id, chapter.id));
  const [open, setOpen] = useState(index === 0);
  return (
    <section class="chapter" id={chapter.id}>
      <button class="chapter-head" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span class="num">{index + 1}</span>
        <span class="text">
          <span class="title">{chapter.title}</span>
          <span class="meta">
            {chapter.period && `${chapter.period} · `}
            {chapter.stops.length} stop{chapter.stops.length === 1 ? '' : 's'}
            {chapter.stops.length > 0 && ` · ${stopsDone} done`}
          </span>
        </span>
        <span class="chev">{open ? '▾' : '▸'}</span>
      </button>
      {open && (
        <div class="chapter-body">
          {chapter.introHtml && <Html class="prose" html={chapter.introHtml} />}
          <ol class="stops">
            {chapter.stops.map((s) => {
              const note = noteById.get(s.note)!;
              const p = noteProgress(s.note);
              const state = p.total === 0 ? 'none' : p.seen === 0 ? 'new' : p.seen < p.total ? 'partial' : 'done';
              return (
                <li key={s.note}>
                  <a href={`#/note/${s.note}`}>
                    <span class={`dot ${state}`} aria-hidden="true" />
                    <span class="stop-text">
                      <span class="title">{note.title}</span>
                      {s.whyHtml && <Html inline class="why" html={s.whyHtml} />}
                      <span class="meta">{p.total ? `${p.seen}/${p.total} studied` : 'article only'}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
          {items.length > 0 && (
            <a class="button block" href={`#/review/chapter/${tour.id}/${chapter.id}`}>
              {resume ? 'Resume chapter practice' : 'Practice this chapter'} · {items.length} items
            </a>
          )}
        </div>
      )}
    </section>
  );
}

function Timeline({ tour }: { tour: Tour }) {
  const [chapter, setChapter] = useState('');
  const [landmarksOnly, setLandmarksOnly] = useState(false);
  const papers = tour.papers.filter((p) => (!chapter || p.chapter === chapter) && (!landmarksOnly || p.landmark));
  const decades = [...new Set(papers.map((p) => Math.floor(p.year / 10) * 10))].sort((a, b) => a - b);
  const chapterIndex = new Map(tour.chapters.map((c, i) => [c.id, i + 1]));

  return (
    <>
      <div class="chips scroll">
        <button class={`chip ${!chapter ? 'active' : ''}`} onClick={() => setChapter('')}>
          All
        </button>
        {tour.chapters.map((c, i) => (
          <button key={c.id} class={`chip ${chapter === c.id ? 'active' : ''}`} onClick={() => setChapter(c.id)}>
            {i + 1}. {c.title}
          </button>
        ))}
      </div>
      <label class="toggle">
        <input type="checkbox" checked={landmarksOnly} onChange={(e) => setLandmarksOnly((e.target as HTMLInputElement).checked)} />
        Landmarks only
      </label>
      {papers.length === 0 && <p class="muted">No papers match.</p>}
      {decades.map((d) => (
        <section key={d} class="decade">
          <h2>{d}s</h2>
          <ol class="papers">
            {papers
              .filter((p) => Math.floor(p.year / 10) * 10 === d)
              .map((p) => (
                <Paper key={p.key} paper={p} chapterNumber={chapterIndex.get(p.chapter)} />
              ))}
          </ol>
        </section>
      ))}
    </>
  );
}

function Paper({ paper: p, chapterNumber }: { paper: TourPaper; chapterNumber?: number }) {
  return (
    <li class={p.landmark ? 'landmark' : ''}>
      <span class="year">{p.year}</span>
      <div class="paper-body">
        <span class="title">
          {p.landmark && <span class="star">★ </span>}
          {p.href ? (
            <a href={p.href} target="_blank" rel="noopener">
              {p.title}
            </a>
          ) : (
            p.title
          )}
        </span>
        <span class="meta">
          {p.authors}
          {p.venue && ` · ${p.venue}`}
        </span>
        {p.noteHtml && <Html class="prose why" html={p.noteHtml} />}
        {(chapterNumber || p.notes.length > 0) && (
          <span class="links">
            {chapterNumber && <span class="chip">Ch. {chapterNumber}</span>}
            {p.notes.map((n) => (
              <a key={n} class="chip" href={`#/note/${n}`}>
                {noteById.get(n)?.title}
              </a>
            ))}
          </span>
        )}
      </div>
    </li>
  );
}

function Questions({ tour }: { tour: Tour }) {
  const chapterIndex = new Map(tour.chapters.map((c, i) => [c.id, i + 1]));
  return (
    <>
      {tour.questions.length === 0 && <p class="muted">No open questions recorded.</p>}
      {tour.questions.map((q, i) => (
        <Question key={i} q={q} n={i + 1} chapterNumber={chapterIndex.get(q.chapter)} />
      ))}
    </>
  );
}

function Question({ q, n, chapterNumber }: { q: TourQuestion; n: number; chapterNumber?: number }) {
  return (
    <section class="question">
      <h3>
        <span class="num">Q{n}</span> {q.title}
      </h3>
      {q.bodyHtml && <Html class="prose" html={q.bodyHtml} />}
      <div class="links">
        {q.status && <span class={`chip status-${q.status.replace(/\s+/g, '-')}`}>{q.status}</span>}
        {chapterNumber && <span class="chip">Ch. {chapterNumber}</span>}
        {q.notes.map((id) => (
          <a key={id} class="chip" href={`#/note/${id}`}>
            {noteById.get(id)?.title}
          </a>
        ))}
      </div>
    </section>
  );
}
