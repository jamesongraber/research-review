import { useEffect } from 'preact/hooks';
import { backlinks, itemsByNote, noteById, subjectName } from '../content';
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

      {list.length > 0 && (
        <a class="button primary block" href={`#/review/${id}`}>
          {loadSession(sessionKey(id)) ? 'Resume practice' : 'Practice this note'} · {cards.length} card
          {cards.length === 1 ? '' : 's'}
          {quizCount > 0 && `, ${quizCount} quiz`}
        </a>
      )}

      <Html class="prose article" html={note.articleHtml} />

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
