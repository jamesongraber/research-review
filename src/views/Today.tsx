import { notes, subjects, itemById, noteById, subjectName, tours } from '../content';
import { dueIds, newIds, newRemainingToday, nextDue, noteProgress, reviewsToday, totalSeen } from '../store';
import { loadSession } from '../session';
import { formatInterval } from '../util';

export function Today() {
  const now = new Date();
  const due = dueIds(now);
  const fresh = newIds().slice(0, newRemainingToday());
  const done = reviewsToday().length;
  const next = nextDue();
  const queued = [...due, ...fresh];
  const session = loadSession('daily');

  const bySubject = new Map<string, number>();
  for (const id of queued) {
    const subject = noteById.get(itemById.get(id)!.noteId)?.subject;
    if (subject) bySubject.set(subject, (bySubject.get(subject) ?? 0) + 1);
  }

  const recent = [...notes].sort((a, b) => b.created.localeCompare(a.created)).slice(0, 5);

  // The first tour stop that has not been fully studied yet.
  const nextStops = tours.flatMap((tour) => {
    for (const [ci, chapter] of tour.chapters.entries()) {
      for (const [si, stop] of chapter.stops.entries()) {
        const p = noteProgress(stop.note);
        if (p.total === 0 || p.seen < p.total) return [{ tour, chapter, ci, si, note: noteById.get(stop.note)! }];
      }
    }
    return [];
  });

  return (
    <div class="page">
      <h1>Today</h1>

      <section class="hero">
        <div class="stats">
          <div>
            <strong>{due.length}</strong>
            <span>due</span>
          </div>
          <div>
            <strong>{fresh.length}</strong>
            <span>new</span>
          </div>
          <div>
            <strong>{done}</strong>
            <span>reviewed today</span>
          </div>
        </div>
        {session ? (
          <a class="button primary block" href="#/review">
            Resume review · {session.queue.length - session.pos} left
          </a>
        ) : queued.length > 0 ? (
          <a class="button primary block" href="#/review">
            Start review · {queued.length}
          </a>
        ) : (
          <p class="muted center">
            All caught up.
            {next && next > now ? ` Next review in ${formatInterval(next.getTime() - now.getTime())}.` : ''}
            {totalSeen() === 0 && notes.length === 0 ? ' Add some notes to get started.' : ''}
          </p>
        )}
        {bySubject.size > 1 && (
          <div class="chips">
            {subjects
              .filter((s) => bySubject.has(s.id))
              .map((s) => (
                <span class="chip" key={s.id}>
                  {s.name} · {bySubject.get(s.id)}
                </span>
              ))}
          </div>
        )}
      </section>

      {nextStops.length > 0 && <h2>Continue the tour</h2>}
      {nextStops.map(({ tour, chapter, ci, si, note }) => (
        <a class="tour-next" href={`#/note/${note.id}`} key={tour.id}>
          <span class="label">{tour.title}</span>
          <span class="title">{note.title}</span>
          <span class="meta">
            Chapter {ci + 1}: {chapter.title} · stop {si + 1} of {chapter.stops.length}
          </span>
        </a>
      ))}

      <h2>Recently added</h2>
      <ul class="list">
        {recent.map((n) => (
          <li key={n.id}>
            <a href={`#/note/${n.id}`}>
              <span class="title">{n.title}</span>
              <span class="meta">
                {subjectName(n.subject)}
                {n.created && ` · ${n.created}`}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
