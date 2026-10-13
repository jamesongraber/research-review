import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { Rating, type Grade } from 'ts-fsrs';
import { itemById, itemsByNote, noteById, subjectName, type Item, type QuizItem } from '../content';
import { dueIds, getCard, newIds, newRemainingToday, preview, rate } from '../store';
import { Html, formatInterval, shuffle } from '../util';

/** Items rescheduled sooner than this come back again in the same session. */
const REQUEUE_MS = 30 * 60 * 1000;

const GRADES: { rating: Grade; label: string; cls: string }[] = [
  { rating: Rating.Again, label: 'Again', cls: 'again' },
  { rating: Rating.Hard, label: 'Hard', cls: 'hard' },
  { rating: Rating.Good, label: 'Good', cls: 'good' },
  { rating: Rating.Easy, label: 'Easy', cls: 'easy' },
];

export function Review({ noteId }: { noteId?: string }) {
  const [queue, setQueue] = useState<string[]>(() =>
    noteId
      ? (itemsByNote.get(noteId) ?? []).map((i) => i.id)
      : [...shuffle(dueIds()), ...newIds().slice(0, newRemainingToday())],
  );
  const [pos, setPos] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [chosen, setChosen] = useState<number | null>(null);
  const [reviewed, setReviewed] = useState(0);
  // Guards against a double tap rating the same position twice before re-render.
  const gradedPos = useRef(-1);

  const exit = noteId ? `#/note/${noteId}` : '#/';
  const id = queue[pos];
  const item = id ? itemById.get(id) : undefined;

  function grade(rating: Grade) {
    if (gradedPos.current === pos) return;
    gradedPos.current = pos;
    const now = new Date();
    const card = rate(id, rating, now);
    if (card.due.getTime() - now.getTime() < REQUEUE_MS) setQueue((q) => [...q, id]);
    setPos((p) => p + 1);
    setRevealed(false);
    setChosen(null);
    setReviewed((n) => n + 1);
  }

  if (!item) {
    return (
      <div class="page review-done">
        <h1>{reviewed ? 'Session complete' : 'Nothing to review'}</h1>
        <p class="muted">
          {reviewed
            ? `${reviewed} review${reviewed === 1 ? '' : 's'} done.`
            : 'No cards are due and today’s new cards are used up.'}
        </p>
        <a class="button primary block" href={exit}>
          {noteId ? 'Back to note' : 'Back to Today'}
        </a>
      </div>
    );
  }

  const note = noteById.get(item.noteId)!;
  return (
    <div class="page review">
      <header class="review-bar">
        <a href={exit} class="close" aria-label="End session">
          ✕
        </a>
        <div class="progress">
          <div style={{ width: `${(pos / queue.length) * 100}%` }} />
        </div>
        <span class="count">{queue.length - pos}</span>
      </header>

      <div class="item-meta">
        <span class="chip">{subjectName(note.subject)}</span>
        {!getCard(item.id) && <span class="chip new">New</span>}
        <a href={`#/note/${note.id}`}>{note.title}</a>
      </div>

      {item.kind === 'card' ? (
        <CardFace item={item} revealed={revealed} onReveal={() => setRevealed(true)} onGrade={grade} />
      ) : (
        <QuizFace key={pos} item={item} chosen={chosen} onChoose={setChosen} onGrade={grade} />
      )}
    </div>
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
  chosen: number | null;
  onChoose: (i: number) => void;
  onGrade: (r: Grade) => void;
}) {
  const { item, chosen, onChoose, onGrade } = props;
  const options = useMemo(() => shuffle(item.options), [item]);
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
