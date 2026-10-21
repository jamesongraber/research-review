# Literature mining

How new papers get into the tour `content/tours/cancer-games-control-pdes.yaml`.

1. **Mine.** From the repo root:

   ```bash
   npm run mine
   ```

   searches arXiv, Europe PMC (PubMed plus bioRxiv/medRxiv), OpenAlex and Semantic Scholar with the queries
   in `scripts/mine-literature.config.json`, keeps papers whose title or abstract contains both a cancer term
   and a mathematics term, scores them by the tour's vocabulary, guesses a chapter, and writes
   `inbox-<date>.md` (readable digest) and `inbox-<date>.json` (same data) in this folder. Papers already
   cited in a tour, or already surfaced in an earlier run (`seen.json`), are skipped.

   Useful flags: `--since 2026-06-01`, `--until 2026-09-30`, `--sources arxiv,europepmc`, `--max 50`
   (per query), `--min-score 3`, `--query "Stackelberg evolutionary game"` (one ad-hoc query on all sources),
   `--include-seen`, `--dry-run` (do not update `seen.json`). The first run looks back 180 days; later runs
   start a week before the previous run.

2. **Integrate.** In Claude Code:

   ```
   /integrate-literature docs/literature/inbox-<date>.md
   ```

   The skill triages each entry (skip, cite, extend a note, new note, open question), verifies what it keeps,
   edits the tour bibliography and notes, runs `npm run check`, and appends to `processed.md`.

3. **Tune.** Edit the config to add queries, required terms, bonus terms, or chapter keywords. No code changes
   are needed for new topics. arXiv's API is slow and sometimes times out; the other three sources overlap
   with it enough that a failed arXiv query rarely loses much.

Files: `seen.json` (state, committed so runs on another machine continue where this one left off),
`inbox-*.md/json` (digests; safe to delete after integration), `processed.md` (integration log).
