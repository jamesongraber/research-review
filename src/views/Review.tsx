import { useEffect, useRef, useState } from 'preact/hooks';
import { Rating, type Grade } from 'ts-fsrs';
import { itemById, noteById, subjectName, type Item, type QuizItem } from '../content';
import { exitHref, loadSession, newSession, saveSession, scopeOf, withOrder, type Session } from '../session';
import { getCard, preview, rate } from '../store';
import { Html, formatInterval } from '../util';

/** Items rescheduled sooner than this come back again in the same session. */
const REQUEUE_MS = 30 * 60 * 1000;

const GRADES: { rating: Grade; label: string; cls: string }[] = [
  { rating: Rating.Again, label: 'Again', cls: 'again' },
  { rating: Rating.Hard, label: 'Hard', cls: 'hard' },
  { rating: Rating.Good, label: 'Good', cls: 'good' },
  { rating: Rating.Easy, label: 'Easy', cls: 'easy' },
];

export function Review({ scopeKey }: { scopeKey: string }) {
  // Resume the saved session if there is one; every change is saved right away, so
  // leaving to read a note (or closing the app) and coming back picks up where it was.
  const [s, setS] = useState<Session>(() => loadSession(scopeKey) ?? newSession(scopeKey));
  useEffect(() => saveSession(s), [s]);
  // Guards against a double tap rating the same position twice before re-render.
  const gradedPos = useRef(-1);

  const exit = exitHref(scopeKey);
  const scope = scopeOf(scopeKey);
  const id = s.queue[s.pos];
  const item = id ? itemById.get(id) : undefined;

  function grade(rating: Grade) {
    if (gradedPos.current === s.pos) return;
    gradedPos.current = s.pos;
    const now = new Date();
    const card = rate(id, rating, now);
    const requeue = card.due.getTime() - now.getTime() < REQUEUE_MS;
    setS((prev) =>
      withOrder({
        ...prev,
        queue: requeue ? [...prev.queue, id] : prev.queue,
        pos: prev.pos + 1,
        revealed: false,
        chosen: null,
        order: null,
        reviewed: prev.reviewed + 1,
      }),
    );
  }

  if (!item) {
    return (
      <div class="page review-done">
        <h1>{s.reviewed ? 'Session complete' : 'Nothing to review'}</h1>
        <p class="muted">
          {s.reviewed
            ? `${s.reviewed} review${s.reviewed === 1 ? '' : 's'} done.`
            : 'No cards are due and today’s new cards are used up.'}
        </p>
        <a class="button primary block" href={exit}>
          {scope.kind === 'note' ? 'Back to note' : scope.kind === 'chapter' ? 'Back to tour' : 'Back to Today'}
        </a>
      </div>
    );
  }

  const note = noteById.get(item.noteId)!;
  return (
    <div class="page review">
      <header class="review-bar">
        <a href={exit} class="close" aria-label="Leave review (progress is kept)">
          ✕
        </a>
        <div class="progress">
          <div style={{ width: `${(s.pos / s.queue.length) * 100}%` }} />
        </div>
        <span class="count">{s.queue.length - s.pos}</span>
      </header>

      <div class="item-meta">
        <span class="chip">{subjectName(note.subject)}</span>
        {!getCard(item.id) && <span class="chip new">New</span>}
        <a href={`#/note/${note.id}`}>{note.title}</a>
      </div>

      {item.kind === 'card' ? (
        <CardFace
          item={item}
          revealed={s.revealed}
          onReveal={() => setS((prev) => ({ ...prev, revealed: true }))}
          onGrade={grade}
        />
      ) : (
        <QuizFace
          key={s.pos}
          item={item}
          order={s.order ?? item.options.map((_, i) => i)}
          chosen={s.chosen}
          onChoose={(i) => setS((prev) => ({ ...prev, chosen: i }))}
          onGrade={grade}
        />
      )}
    </div>
  );
}

/** Link from an answered item to the note section that explains it in full. */
function MoreLink({ item }: { item: Item }) {
  const note = noteById.get(item.noteId)!;
  return (
    <a class="more-link" href={`#/note/${note.id}${item.see ? `/${item.see}` : ''}`}>
      <span>Full explanation</span>
      <span class="target">{item.seeTitleHtml ? <Html inline html={item.seeTitleHtml} /> : note.title} →</span>
    </a>
  );
}

function GradeButtons({ id, only, onGrade }: { id: string; only?: Grade[]; onGrade: (r: Grade) => void }) {
  const now = new Date();
  const p = preview(id, now);
  const grades = GRADES.filter((g) => !only || only.includes(g.rating));
  useKeys((key) => {
    const g = grades[Number(key) - 1];
    if (g) onGrade(g.rating);
  });
  return (
    <div class="grades">
      {grades.map((g) => (
        <button key={g.rating} class={`grade ${g.cls}`} onClick={() => onGrade(g.rating)}>
          <span>{g.label}</span>
          <small>{formatInterval(p[g.rating].card.due.getTime() - now.getTime())}</small>
        </button>
      ))}
    </div>
  );
}

function CardFace(props: { item: Item; revealed: boolean; onReveal: () => void; onGrade: (r: Grade) => void }) {
  const { item, revealed, onReveal, onGrade } = props;
  useKeys((key) => {
    if (!revealed && (key === ' ' || key === 'Enter')) onReveal();
  });
  return (
    <>
      <article class="face">
        <Html class="prose prompt" html={item.promptHtml} />
        {revealed && item.kind === 'card' && (
          <>
            <hr />
            <Html class="prose" html={item.answerHtml} />
            <MoreLink item={item} />
          </>
        )}
      </article>
      <footer class="actions">
        {revealed ? (
          <GradeButtons id={item.id} onGrade={onGrade} />
        ) : (
          <button class="button primary block" onClick={onReveal}>
            Show answer
          </button>
        )}
      </footer>
    </>
  );
}

function QuizFace(props: {
  item: QuizItem;
  order: number[];
  chosen: number | null;
  onChoose: (i: number) => void;
  onGrade: (r: Grade) => void;
}) {
  const { item, order, chosen, onChoose, onGrade } = props;
  const options = order.map((i) => item.options[i]);
  const answered = chosen !== null;
  const correct = answered && options[chosen].correct;
  useKeys((key) => {
    const n = Number(key);
    if (!answered && n >= 1 && n <= options.length) onChoose(n - 1);
    else if (answered && !correct && (key === ' ' || key === 'Enter')) onGrade(Rating.Again);
  });

  return (
    <>
      <article class="face">
        <Html class="prose prompt" html={item.promptHtml} />
        <ol class="options">
          {options.map((o, i) => {
            const state = !answered ? '' : o.correct ? 'right' : i === chosen ? 'wrong' : 'dim';
            return (
              <li key={i}>
                <button class={`option ${state}`} disabled={answered} onClick={() => onChoose(i)}>
                  <Html class="prose" html={o.html} />
                </button>
              </li>
            );
          })}
        </ol>
        {answered && (
          <div class={`verdict ${correct ? 'right' : 'wrong'}`}>
            <strong>{correct ? 'Correct' : 'Not quite'}</strong>
            {item.explanationHtml && <Html class="prose" html={item.explanationHtml} />}
            <MoreLink item={item} />
          </div>
        )}
      </article>
      {answered && (
        <footer class="actions">
          {correct ? (
            <GradeButtons id={item.id} only={[Rating.Hard, Rating.Good, Rating.Easy]} onGrade={onGrade} />
          ) : (
            <button class="button primary block" onClick={() => onGrade(Rating.Again)}>
              Continue
            </button>
          )}
        </footer>
      )}
    </>
  );
}

/** Keyboard shortcuts for reviewing on a laptop: space/enter to reveal, digits to answer. */
function useKeys(handler: (key: string) => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === ' ' || e.key === 'Enter' || /^[1-9]$/.test(e.key)) {
        e.preventDefault();
        handler(e.key);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });
}
