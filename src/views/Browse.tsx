import { useState } from 'preact/hooks';
import { notes, subjects, subjectName } from '../content';
import { noteProgress } from '../store';

export function Browse({ subject }: { subject?: string }) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const matches = notes.filter(
    (n) =>
      (!subject || n.subject === subject) &&
      (!q || n.title.toLowerCase().includes(q) || n.tags.some((t) => t.includes(q))),
  );
  const shown = subjects.filter((s) => matches.some((n) => n.subject === s.id));

  return (
    <div class="page">
      <h1>{subject ? subjectName(subject) : 'Browse'}</h1>
      <input
        class="search"
        type="search"
        placeholder="Search titles and tags"
        value={query}
        onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
      />
      <div class="chips scroll">
        <a class={`chip ${!subject ? 'active' : ''}`} href="#/browse">
          All
        </a>
        {subjects.map((s) => (
          <a key={s.id} class={`chip ${subject === s.id ? 'active' : ''}`} href={`#/browse/${s.id}`}>
            {s.name}
          </a>
        ))}
      </div>

      {shown.length === 0 && <p class="muted">No notes match.</p>}
      {shown.map((s) => (
        <section key={s.id}>
          {!subject && <h2>{s.name}</h2>}
          <ul class="list">
            {matches
              .filter((n) => n.subject === s.id)
              .map((n) => {
                const { seen, total } = noteProgress(n.id);
                return (
                  <li key={n.id}>
                    <a href={`#/note/${n.id}`}>
                      <span class="title">{n.title}</span>
                      <span class="meta">
                        {total ? `${seen}/${total} studied` : 'article only'}
                        {n.tags.length > 0 && ` · ${n.tags.join(', ')}`}
                      </span>
                    </a>
                  </li>
                );
              })}
          </ul>
        </section>
      ))}
    </div>
  );
}
