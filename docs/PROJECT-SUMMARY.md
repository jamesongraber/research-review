# Research Review: project summary

A record of how this app was built and how its content was produced, written to be reused in other
projects. Current as of 2026-10-20.

- **Repo:** https://github.com/jamesongraber/research-review (public)
- **Live app:** https://jamesongraber.github.io/research-review/ (installed on Android via Chrome → Add to home screen)
- **Content:** 65 notes, 455 flashcards, 178 quiz questions in 6 subjects (economics, game theory,
  biology, machine learning, mathematics, philosophy & history)

## What it is

A personal spaced-repetition study app for retaining what I learn in Claude conversations while doing
interdisciplinary research. It is a retention tool, not a reference. Each **note** is one idea:

- a short **article** with `###` sections,
- **flashcards** (recall, then self-rate),
- **multiple-choice quiz** questions with explanations.

The main screen is "what's due today", not a table of contents.

## Architecture and why

| Decision | Choice | Reason |
|---|---|---|
| App type | **PWA** (installable web app), not native | No app store, works on Android/iPhone/laptop, auto-updates on push, works offline |
| Content storage | **Markdown files in git** (`content/<subject>/<id>.md`) | Human-editable, versioned, Claude can write them directly |
| Math | **KaTeX rendered at build time** to HTML | Phone ships no math engine; LaTeX typos fail the build with the file name |
| Scheduling | **FSRS** via `ts-fsrs` | Modern Anki algorithm; review history keyed by stable item ids |
| Progress storage | **localStorage** on the device, with JSON export/import | Single user, no backend; Settings → Export for backups |
| Routing | Hash routes (`#/note/<id>/<section>`) | Works on GitHub Pages with no server config |
| Hosting | **GitHub Pages** via a GitHub Actions workflow | Free; every push validates content, builds and deploys |

**Stack:** Vite 8, Preact 11, TypeScript 7, ts-fsrs 5, KaTeX 0.18, marked 18 + marked-katex-extension,
vite-plugin-pwa 2 (Workbox), `@vite-pwa/assets-generator` for icons.

**Key files**
- `scripts/content.js`: parser and validator for notes; renders Markdown + KaTeX to HTML; computes item ids.
- `scripts/vite-plugin-content.js`: exposes content as `import data from 'virtual:content'`; dev server reloads when notes change.
- `src/store.ts`: FSRS state in localStorage; export/import.
- `src/session.ts`: resumable review sessions.
- `src/views/`: the screens (Today, Review, Browse, NoteView, Settings).
- `docs/FORMAT.md`: the note format spec **and** the rules for writing good cards. This is the most reusable document.
- `.claude/skills/study-note/SKILL.md`: the `/study-note` command for adding notes from Claude Code.
- `docs/claude-ai-project.md`: instructions for a claude.ai Project that outputs notes in the right format.
- `docs/mined-conversations.md`: which exported conversations were already processed or skipped.

## Design details worth reusing

- **Stable item ids:** `<noteId>:<c|q>:<hash of normalized question text>`. Editing answers, options or
  explanations keeps review history. Rewording a question (or renaming a note) resets it. Normalization
  ignores case, punctuation and spacing, so small typo fixes are safe.
- **Build-time validation:** `npm run check` fails on malformed frontmatter, unknown sections, cards
  without answers, quiz questions without exactly one `[x]`, bad LaTeX, duplicate ids and bad `See:`
  targets. It warns on `related:` links to missing notes. CI runs it before building, so a broken note
  never reaches the phone.
- **"Full explanation" links:** a card or quiz question can end with `See: <article heading>`. After you
  answer, the app links to that section of the note (`#/note/<id>/<slug>`), which scrolls into view and
  is briefly highlighted. Headings get slug ids at build time.
- **Resumable reviews:** the session (queue, position, revealed answer, chosen option, shuffled option
  order) is saved to localStorage on every step. Leaving for a note and pressing Back restores the exact
  state, and a "Resume" bar appears on other pages. A session expires at the end of the day or when it finishes.
- **Quiz grading:** a wrong answer counts as FSRS *Again* automatically. A right answer lets you pick Hard/Good/Easy.
- **New-item cap:** at most N new items per day (default 15) so a big content import doesn't flood the queue.
- **Related links work both ways:** list a link in one note's `related:` and both note pages show it.

## How content gets in

1. **`/study-note` in Claude Code:** paste material, or run it at the end of a session. It checks
   for overlap with existing notes, writes the note per `docs/FORMAT.md`, runs `npm run check` and commits.
2. **claude.ai Project:** project instructions plus `FORMAT.md` as knowledge. "Make a study note" then
   outputs a ready file. Add it from a phone via github.com → Add file.
3. **Mining a claude.ai data export** (the big batch; see the next section).

## Mining a claude.ai data export: the process

Used once to turn 97 conversations into 62 notes. Repeatable for later exports.

1. **Extract** `conversations-000.zip` (Settings → Privacy → Export data) into a scratch folder. It holds
   a single `conversations.json`: a list of `{uuid, name, created_at, chat_messages:[{sender, content:[{type,text}]}]}`.
   - An earlier export held only a few weeks of chats. A later full export also included project chats.
   - `projects-000.zip` holds only project metadata and documents, not chats.
2. **Dump** each conversation to a readable Markdown transcript (one file per chat, named date + slug).
3. **Triage** by title and first question:
   - keep learning conversations;
   - skip tool development (pde-ast), my own research problems, personal and admin chats, and
     time-sensitive or opinion chats (news, "today's arXiv", model comparisons).
   - Result: 21 kept of 97.
4. **Reuse earlier work:** a previous quiz-page artifact had 138 cards from these chats, with
   *corrections* to Claude's original answers. Its deck was extracted and given to the agents as a
   reference whose corrections override the transcripts.
5. **Write one shared brief** for the agents: the format spec, the correctness bar, what to extract and
   what to skip, organization rules, and the finish checklist.
6. **Run parallel subagents, one per subject**, each owning its own `content/<subject>/` folder to
   avoid collisions. The big ML topic was split across two agents. Each agent read its transcripts in full,
   checked math with Python, wrote notes, ran `npm run check`, and reported:
   - notes written,
   - errors corrected,
   - material omitted,
   - suggested cross-links.
7. **Integration pass:**
   - added the suggested cross-subject `related:` links;
   - removed first-person agent voice ("I checked…") from articles;
   - spot-checked the riskiest notes by hand;
   - built, viewed in a phone-sized browser, committed.
8. **Record** processed and skipped conversation uuids in `docs/mined-conversations.md`, so the next
   export only needs the new ones.

### Correctness policy (important)

These notes are studied for years, so the bar is higher than "what Claude said":
- Re-derive formulas and recompute numerical examples (in Python).
- Fix wrong claims, and note the fix.
- Unverifiable citations, attributions and historical claims are marked "(unverified)" in the article
  and **never** used in cards or quiz questions.
- Leave out time-sensitive claims, or date them.

The agents found real errors in the original chats. Examples:
- **Potential games:** "Nash = stable" is false; a Nash point can be a saddle of the potential.
- **The 1/3 rule:** it compares ρ_A with 1/N, not with ρ_B.
- **Rock–paper–scissors:** the zero-sum game is not permanent.
- **Drug resistance:** the probability that resistance is present depends on μN, not on the mean count μN ln N.
- **Weak KAM:** "P(Tᵈ) compact but not locally compact" is impossible.
- **Mean-field adjoint:** the transformer adjoint formula needed a Lions derivative.
- **Constant-gain learning:** the decay rate under 1/t gain *with shocks* is t^(−min(1−λ, 1/2)), not the deterministic t^(−(1−λ)).

## Gotchas hit along the way

- **Dependency conflict:** `marked-katex-extension` 5.1 requires `katex < 0.19`, so KaTeX is pinned to 0.18.
- **Bundle size:** pre-rendered KaTeX HTML is verbose, about 80 KB per note before gzip (5.3 MB / 390 KB
  gzipped for 65 notes). Workbox's default 2 MB precache limit had to be raised (now 40 MB). If content
  grows past a few hundred notes, split content out of the JS bundle.
- **Git Bash on Windows** rewrites `BASE_PATH=/research-review/` into a Windows path. Use
  `MSYS_NO_PATHCONV=1` when testing the subpath build locally. CI on Linux is unaffected.
- **GitHub Pages setup:** Settings → Pages → Source: **GitHub Actions**. Don't pick the suggested
  Jekyll/Static HTML workflows; the repo has its own `deploy.yml`. If the first push happened before
  Pages was enabled, re-run the failed Deploy job.
- **Testing in the in-app browser:**
  - Port 4173 (the Vite preview default) was taken by another project, so this one uses 4317.
  - The service worker can't register in the in-app browser, so test offline install on the phone.
  - Screenshots taken right after load can miss KaTeX glyphs while fonts are still loading.

## Ideas not yet done

- Split long notes (adaptive learning / E-stability is now about 3,200 words) when they get hard to reread.
- Sync progress across devices (currently export/import only).
- Move content out of the JS bundle if it grows large.
- A periodic "mine the latest export" routine using `docs/mined-conversations.md`.
