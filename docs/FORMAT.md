# Study note format

Each note is one Markdown file in `content/<subject>/<id>.md`. A note is one idea or tightly related
cluster of ideas, small enough to read in five minutes. It has three parts: a short **article**,
**cards** (recall prompts), and **quiz** questions (multiple choice). Everything except the article is optional.

## Template

```markdown
---
title: Potential games                    # required
tags: [nash-equilibrium, congestion-games] # optional, lowercase-hyphenated
created: 2026-10-13                        # YYYY-MM-DD, the day I learned it
related: [replicator-dynamics]             # optional, ids of other notes
source: "Why I learned this / where it came up in my research."  # optional, one line
# id: potential-games                     # optional, defaults to the file name
# subject: game-theory                    # optional, defaults to the folder name
---

## Article

Short explanation, 300–800 words. Use ### for subheadings, never ##.

### A subheading

Cards and quiz questions can link here with `See: A subheading`.

## Cards

Q: Question on one or more lines.
A: Answer on one or more lines.
See: A subheading

Q: Next question…
A: …

## Quiz

Q: Multiple-choice question?
- [ ] wrong option
- [x] the single correct option
- [ ] wrong option
E: Explanation shown after answering (optional, but almost always worth writing).
See: A subheading
```

## Rules the build checks

- The file starts with a `---` YAML block containing at least `title`.
- Only three `##` sections are allowed: `Article` (required), `Cards`, `Quiz`.
- Every card has a `Q:` and an `A:`. Every quiz question has at least two options and **exactly one** `[x]`.
- Quiz options are single-line Markdown, so use inline math only.
- `See:` names a `###` or `####` heading of the same note's article (matching ignores case and punctuation).
  It goes last in its card or quiz question.
- `id` (the file name) is lowercase letters, digits and hyphens, and is unique across all notes.
- All LaTeX must compile in KaTeX. A typo fails the build with the file name.

Run `npm run check` to validate without building.

## Math

- Inline: `$...$`. Display: `$$` on its own line, then the formula, then `$$` on its own line.
- Write a literal dollar sign as `\$` (e.g. "a \$5 bid").
- KaTeX supports most of LaTeX math, including `\mathbb`, `\operatorname`, `aligned`, `cases` and `\dfrac`.
  It does not support custom macros defined in the note.

## Links

After a card is revealed or a quiz question is answered, the app shows a link to the fuller
explanation: the `See:` section if given, otherwise the top of the article. So give every card and quiz question
whose answer is worked out in a particular section a `See:` line. That's the point of structuring the article with `###`
subheadings.

Link to another note inside an article with `[text](#/note/<id>)`, or to a section of it with `[text](#/note/<id>/<heading-slug>)` (the slug is the heading lowercased with runs of other characters replaced by `-`). Also list it under `related:`;
the note page shows related notes in both directions.

## Progress is tied to question text

Review history for each card or quiz question is keyed by its **question text** (ignoring case,
punctuation and spacing). You can edit an answer, explanation, or option freely. Rewording the question
itself makes it a new item and resets its schedule. That's usually what you want after a real
change, and fixing a typo costs one review.

## Writing good items

These follow the usual spaced-repetition advice (e.g. Wozniak's "20 rules", Matuschak's "How to write good prompts").

1. **One fact per card.** If an answer has a list of three things, write three cards, or one card
   per item with the others as context.
2. **Prefer "why" and "when" to "what".** "Why does every finite potential game have a pure NE?" builds
   understanding. "Who introduced potential games?" mostly doesn't.
3. **Cards should be answerable in a few seconds** of thought. Save multi-step reasoning for the article.
4. **Connect to what I already know.** I am a mathematician working on PDEs and mean field games. Cards
   that link a new idea to that background (Fokker–Planck, HJB, monotonicity, optimal transport,
   variational structure) are the most valuable ones.
5. **Quiz distractors should be plausible mistakes**, e.g. a sign or factor error, a converse
   that fails, or a neighboring concept. Avoid joke options.
6. **Aim for 4–8 cards and 2–4 quiz questions per note.** More than that usually means the note should be split.
7. **The article is for re-learning**, not completeness. Write it so that after forgetting a card I can
   read it in a couple of minutes and remember. Include the one example that makes it click.
8. **Be correct.** These are things I'll remember for years. Prefer precise statements with their
   hypotheses ("if $A$ is symmetric") over slogans. If unsure of a fact, leave it out or flag it in the article.
