# Research Review

A phone app for retaining what I learn during research: short articles, flashcards and quizzes, scheduled
with spaced repetition (FSRS). Notes are Markdown files with LaTeX in `content/`. Pushing to GitHub
rebuilds and redeploys the app, and the installed app updates itself.

## Daily use

- **Today** shows what's due. Tap *Start review*.
- Cards: recall, tap *Show answer*, then rate honestly (*Again / Hard / Good / Easy*). The small text
  under each button is when you'll see it next.
- Quiz questions: pick an answer. A wrong answer counts as *Again*. A right answer lets you choose *Hard / Good / Easy*.
- **Browse** has every note by subject, with search. Each note page has the article, its cards, related
  notes, and *Practice this note*.
- New items are introduced at most *New items per day* at a time (Settings, default 15).
- On a laptop: <kbd>Space</kbd> reveals, <kbd>1</kbd>–<kbd>4</kbd> rate or pick an option.

## Adding what I learn

- **In Claude Code** (in this folder): `/study-note` plus pasted material, or just `/study-note` at the
  end of a session. It writes the note, validates it and commits.
- **In claude.ai**: see [docs/claude-ai-project.md](docs/claude-ai-project.md) for a Project setup that
  produces notes in the right format, and how to add them from the phone via github.com.
- **By hand**: follow [docs/FORMAT.md](docs/FORMAT.md), then `npm run check`.

## Setup

```bash
npm install
npm run dev        # http://localhost:5173, reloads when notes change
npm run build      # validates content and builds to dist/
```

### Publishing (one time)

1. Create a **public** GitHub repository named `research-review` (no README or license).
2. Push this folder to it:
   ```bash
   git remote add origin https://github.com/<you>/research-review.git
   git push -u origin main
   ```
3. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. The *Deploy* workflow runs on every push. The app is at `https://<you>.github.io/research-review/`.

### Installing on Android

Open the URL in **Chrome**, then use the ⋮ menu and **Add to home screen → Install**. It then opens full-screen
from its icon and works offline.

### Backups

Review history is stored on the device only (not in git). Use **Settings → Export** occasionally. The
JSON file can be imported on another device or after reinstalling.
