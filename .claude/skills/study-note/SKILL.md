---
name: study-note
description: Turn something I learned (a pasted conversation, notes, a paper summary, or a topic) into a study note for the Research Review app — article, flashcards and quiz — and add it to content/. Use when I say "make a study note", "add this to my study app", or invoke /study-note.
---

# Add a study note

Input: whatever follows the command — pasted text from a Claude conversation, a note draft, a topic name,
or a file path. If nothing is given, use what we discussed in this session.

1. **Read `docs/FORMAT.md`** and follow it exactly. It has the file format and the rules for good items.
2. **Check for overlap.** List `content/` and grep titles and tags for the topic. If a note already covers it,
   extend that note (add cards, refine the article) instead of creating a near-duplicate. Keep existing question
   text unchanged unless it's wrong, because rewording a question resets its review history.
3. **Pick the subject folder** (`content/<subject>/`). Reuse an existing subject when it fits. A new subject
   needs only a new folder; add a display name to `content/subjects.yaml`.
   Cancer-modelling notes go in `content/mathematical-oncology/`; if the note fits a chapter of the guided tour,
   add it as a stop in `content/tours/cancer-games-control-pdes.yaml` (format: `docs/FORMAT.md`, "Tours").
4. **Scope.** One note = one idea that's readable in five minutes. If the input covers several distinct ideas,
   write several notes and link them with `related:`.
5. **Write the note.** Set `created:` to today's date. Put the research context ("came up while…") in `source:`.
   Add `related:` links to existing notes where there's a real connection, especially across subjects.
6. **Validate** with `npm run check` and fix every error.
7. **Self-review against the source**: every mathematical claim is correct and has its hypotheses, each card
   tests one thing, and the quiz distractors are plausible but definitely wrong.
8. **Commit** with a message like `Add note: <title>`. Push only if I ask; pushing publishes the update to my phone.

Finish by summarizing what was added: the note title(s) and the number of cards and quiz questions.
