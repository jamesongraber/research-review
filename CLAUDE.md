# Research Review

A personal spaced-repetition study app (installable PWA, used mainly on Android) for retaining what the
owner learns while doing interdisciplinary research: economics, game theory, biology, machine learning, and more.
The owner is a mathematician (PDEs, mean field games).

## Layout

- `content/<subject>/<id>.md`: the study notes. **Format spec and writing guidelines: `docs/FORMAT.md`.**
  `content/subjects.yaml` holds subject display names and order.
- `content/tours/<id>.yaml`: guided tours (ordered chapters of notes, a chronological bibliography, open
  questions). Loaded by `scripts/tours.js`; shown under the Tour tab. Format: `docs/FORMAT.md`, "Tours".
- `scripts/content.js`: build-time parser and validator. It renders Markdown and KaTeX to HTML so the client ships no math engine.
  `scripts/vite-plugin-content.js` exposes it as `virtual:content`. `scripts/check-content.js` is `npm run check`.
- `src/`: Preact client. `store.ts` keeps FSRS scheduling state (ts-fsrs) in localStorage, keyed by item id.
  `views/` contains the screens (Today, Tour, Review, Browse, NoteView, Settings). Routing is hash-based
  (`#/note/<id>`, `#/tour/<id>/timeline`, `#/review/chapter/<tour>/<chapter>`).
- `scripts/mine-literature.mjs` (+ `.config.json`): `npm run mine` searches arXiv, Europe PMC, OpenAlex and
  Semantic Scholar for new mathematical-oncology papers, skips ones already in a tour or in
  `docs/literature/seen.json`, and writes `docs/literature/inbox-<date>.md` for the `/integrate-literature` skill.
- `.github/workflows/deploy.yml`: builds and deploys to GitHub Pages on push to `main`.

## Commands

- `npm run check`: validate content only (fast; run after editing notes)
- `npm run dev`: dev server, reloads when notes change
- `npm run build`: check, type-check and build to `dist/`
- `npm run icons`: regenerate PNG icons from `public/favicon.svg`
- `npm run mine [-- --since YYYY-MM-DD --dry-run]`: find new papers for the tour (writes `docs/literature/`)

## Conventions

- Item ids are `<noteId>:<c|q>:<hash of normalized question text>`. Changing a note's id or a question's
  text resets that item's review history, so avoid it unless the change is meaningful.
- Adding notes: use the `/study-note` skill (`.claude/skills/study-note/SKILL.md`).
- Adding papers from a mining run: `/integrate-literature docs/literature/inbox-<date>.md`.
- Cancer-modelling notes go in `content/mathematical-oncology/` and should be added as a stop of the tour
  in `content/tours/cancer-games-control-pdes.yaml` when they fit a chapter.
- Review progress lives only in the browser. Keep the export/import format (`store.ts`) backward compatible.
