import { useEffect } from 'preact/hooks';
import { backlinks, itemsByNote, noteById, papersForNote, subjectName, tourPlacements } from '../content';
import { loadSession, sessionKey } from '../session';
import { getCard } from '../store';
import { Html, formatInterval } from '../util';

export function NoteView({ id, section }: { id: string; section?: string }) {
  const note = noteById.get(id);

  // `#/note/<id>/<section>` (from a card's "Full explanation" link) jumps to that heading.
  useEffect(() => {
    if (!section) return;
    const el = document.getElementById(section);
    if (!el) return;
    el.scrollIntoView({ block: 'start' });
    el.classList.add('target');
    const t = setTimeout(() => el.classList.remove('target'), 2000);
    return () => clearTimeout(t);
  }, [section]);
  if (!note) {
    return (
      <div class="page">
        <h1>Note not found</h1>
        <p class="muted">It may have been renamed or removed.</p>
        <a href="#/browse">Browse notes</a>
      </div>
    );
  }

  const list = itemsByNote.get(id) ?? [];
  const cards = list.filter((i) => i.kind === 'card');
  const quizCount = list.length - cards.length;
  const links = [
    ...note.related.map((r) => noteById.get(r)).filter((n) => n !== undefined),
    ...backlinks(id).filter((b) => !note.related.includes(b.id)),
  ];
  const placements = tourPlacements(id);
  const papers = papersForNote(id);
  const now = Date.now();

  return (
    <div class="page note">
      <a class="back" href={`#/browse/${note.subject}`}>
        ‹ {subjectName(note.subject)}
      </a>
      <h1>{note.title}</h1>
      <p class="meta">
        {note.created}
        {note.tags.length > 0 && ` · ${note.tags.join(', ')}`}
      </p>
      {note.source && <p class="source">{note.source}</p>}

      {placements.map((p) => {
        const prev = p.chapter.stops[p.index - 1]?.note;
        const next = p.chapter.stops[p.index + 1]?.note ?? p.tour.chapters[p.chapterIndex + 1]?.stops[0]?.note;
        return (
          <nav class="tour-bar" key={`${p.tour.id}/${p.chapter.id}`}>
            <a class="where" href={`#/tour/${p.tour.id}`}>
              <span class="label">Tour · Chapter {p.chapterIndex + 1}</span>
              <span class="chapter-name">
                {p.chapter.title} · stop {p.index + 1} of {p.chapter.stops.length}
              </span>
            </a>
            <span class="steps">
              {prev ? (
                <a href={`#/note/${prev}`} title={noteById.get(prev)?.title}>
                  ‹ Prev
                </a>
              ) : (
                <span class="muted">‹ Prev</span>
              )}
              {next ? (
                <a href={`#/note/${next}`} title={noteById.get(next)?.title}>
                  Next ›
                </a>
              ) : (
                <span class="muted">Next ›</span>
              )}
            </span>
          </nav>
        );
      })}

      {list.length > 0 && (
        <a class="button primary block" href={`#/review/${id}`}>
          {loadSession(sessionKey(id)) ? 'Resume practice' : 'Practice this note'} · {cards.length} card
          {cards.length === 1 ? '' : 's'}
          {quizCount > 0 && `, ${quizCount} quiz`}
        </a>
      )}

      <Html class="prose article" html={note.articleHtml} />

      {papers.length > 0 && (
        <section>
          <h2>Key papers</h2>
          <ol class="papers compact">
            {papers.map((p) => (
              <li key={p.key} class={p.landmark ? 'landmark' : ''}>
                <span class="year">{p.year}</span>
                <div class="paper-body">
                  <span class="title">
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
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {cards.length > 0 && (
        <section>
          <h2>Cards</h2>
          {cards.map((c) => {
            const state = getCard(c.id);
            return (
              <details class="card-preview" key={c.id}>
                <summary>
                  <Html class="prose" html={c.promptHtml} />
                  <span class="due">
                    {state ? (state.due.getTime() <= now ? 'due' : formatInterval(state.due.getTime() - now)) : 'new'}
                  </span>
                </summary>
                {c.kind === 'card' && <Html class="prose answer" html={c.answerHtml} />}
              </details>
            );
          })}
        </section>
      )}

      {links.length > 0 && (
        <section>
          <h2>Related</h2>
          <ul class="list">
            {links.map((n) => (
              <li key={n.id}>
                <a href={`#/note/${n.id}`}>
                  <span class="title">{n.title}</span>
                  <span class="meta">{subjectName(n.subject)}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
