# Making notes from claude.ai conversations

Most learning happens in claude.ai chats. Set up a claude.ai **Project** once so any chat inside it can
produce a note in the right format.

## One-time setup

1. In claude.ai, create a Project called "Research Review".
2. Add `docs/FORMAT.md` from this repo to the Project's knowledge.
3. Paste the instructions below into the Project's custom instructions.

## Project instructions (copy everything in the box)

```text
I use these conversations to learn topics outside my field (I'm a mathematician working on PDEs and
mean field games). When I say "make a study note" (or "study note"), turn what we discussed into a note
for my spaced-repetition app, following FORMAT.md in the project knowledge exactly:

- Output ONE fenced code block containing the complete .md file and nothing else inside it. Put the
  suggested path above the block, e.g. content/economics/revelation-principle.md.
- If the conversation covered several distinct ideas, produce several notes (one block each).
- Set created: to today's date and put the research context in source:.
- Follow the "Writing good items" rules, especially: one fact per card, why/when over what,
  connections to my PDE/MFG background, plausible distractors, and correct statements with hypotheses.
- Use only LaTeX that KaTeX supports. Display math uses $$ on its own lines. Write a literal dollar
  sign as \$.
Until I ask for a note, just teach normally.
```

## Getting a note into the app

From a computer:

- Save the block as the suggested file in `content/` and push. Or paste the block into Claude Code with
  `/study-note`, which also checks for overlap with existing notes, validates and commits.

From your phone:

- On github.com, open the repo, go to `content/<subject>/`, choose **Add file → Create new file**,
  paste the note, and commit. The GitHub Action validates and redeploys, and the app updates the next time
  you open it. If the note has an error, the Action fails and emails you, and the live app stays unchanged.
