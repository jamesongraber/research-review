---
name: integrate-literature
description: Integrate a literature inbox produced by `npm run mine` (docs/literature/inbox-<date>.md) into the mathematical-oncology tour — add papers to the bibliography, extend or add study notes, record open questions, and log what was processed. Use when I say "integrate the inbox", "add these papers to the tour", or invoke /integrate-literature <inbox file>.
---

# Integrate new literature into the tour

Input: the path of an inbox file (`docs/literature/inbox-YYYY-MM-DD.md`, with its `.json` sidecar), or pasted
entries from one. If no path is given, use the newest inbox file.

The tour lives in `content/tours/cancer-games-control-pdes.yaml` (chapters, stops, `papers`, `open_questions`);
its format is in `docs/FORMAT.md` under "Tours". Notes live in `content/mathematical-oncology/`.

1. **Read `docs/FORMAT.md`** (note format and the "Tours" section) and skim the tour file so you know the chapter
   ids and which notes exist.
2. **Triage the inbox.** For each entry decide one of:
   - *skip* (not about the mathematics of cancer, or a duplicate, or a paper with no content beyond its abstract),
   - *cite only* (add to `papers:` under the right chapter, linked to the note(s) it bears on),
   - *extend a note* (a result, correction or follow-up that belongs in an existing note: add a paragraph and, if it
     is worth remembering, one or two cards; never reword existing questions, that resets their review history),
   - *new note* (a genuinely new idea; write it with the `/study-note` rules and add it as a stop of a chapter),
   - *open question* (a paper that states or settles one: add or update an entry in `open_questions:`, set `status`).
   Prefer "cite only" and "extend" over new notes. Score and suggested chapter in the inbox are hints, not decisions.
3. **Verify before writing.** Fetch the abstract or full text (WebFetch) for anything that will appear in a card
   or quiz question. Recompute formulas. Mark anything you could not verify "(unverified)" in the article and keep
   it out of cards. Do not invent DOIs: use the one in the inbox entry.
4. **Edit the tour file.** `papers:` entries need `year`, `authors` (surnames), `title`, `venue`, `doi`/`arxiv`/`url`,
   `chapter`, `notes`, and a one-line `note`. Set `landmark: true` only for a paper that changes the story.
   Keep `papers:` sorted by year within the file (the app sorts anyway, but it keeps diffs readable).
5. **Validate** with `npm run check`; fix every error and every warning about your changes.
6. **Log.** Append to `docs/literature/processed.md` a dated section listing each entry and the decision taken
   (skip / cite / extend `<id>` / new `<id>` / question). The miner's `docs/literature/seen.json` already lists the
   entries as seen, so they will not be shown again; nothing to do there.
7. **Commit** with a message like `Integrate literature inbox 2026-11-03: 4 papers, 1 new note`. Push only if asked.

Finish by summarizing: entries skipped, cited, notes extended/added (with card counts), open questions changed.
