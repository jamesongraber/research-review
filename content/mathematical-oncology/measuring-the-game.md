---
title: "Measuring the game: the game assay and effective games"
tags: [cancer, game-assay, frequency-dependent-selection, identifiability, drug-resistance]
created: 2026-10-21
related: [tomlinson-matrix-games, spatial-games-in-tumours, stackelberg-evolutionary-games, cancer-public-goods-games, pre-existing-resistance, two-strategy-games, replicator-dynamics, evolutionary-steering-collateral-sensitivity, adaptive-therapy-trials-evidence, mathematical-oncology-landscape]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

McEvoy's 2009 objection to the [first cancer games](#/note/tomlinson-matrix-games) was that payoffs were assigned, not measured. The answer came in 2019: do not model the game, *measure* it. This note covers the conceptual move (effective versus reductive games), the measurement (the game assay), what it has found since, and what it cannot identify, which is the hinge for [Stackelberg](#/note/stackelberg-evolutionary-games) therapy design.

### Reductive versus effective games

Kaznatcheev (2018) distinguishes two things called "the game". A **reductive game** is the local interaction that sets a cell's fitness from its immediate contacts, to be played over some spatial structure. An **effective game** is the population-level summary: the frequency-dependent fitness function whose *non-spatial* replicator dynamics reproduce what the population actually does. Transforms such as Ohtsuki–Nowak convert one into the other on regular graphs (see [spatial games](#/note/spatial-games-in-tumours)). The usual pipeline, guess a reductive game from intuition, put it on a lattice, compare to bulk observations, is confused, because the intuitions came from bulk experiments and already describe effective games. The proposal is to reverse it: measure the effective game, measure the spatial structure, and invert the transform to recover the reductive game; a mismatch with intuition is then a finding. Kaznatcheev and Lin (2022) frame this as measuring rather than modelling.

### The game assay (Kaznatcheev, Peacock, Basanta, Marusyk and Scott 2019)

Two fluorescently labelled types, parental ALK-positive lung cancer cells (P) and an alectinib-resistant derivative (R), are co-cultured at several initial proportions $p=N_P/(N_P+N_R)$, in four conditions (with or without alectinib, with or without cancer-associated fibroblasts, CAFs). Each type's fitness is its exponential growth rate over the first five days, regressed linearly on the initial parental proportion:
$$
w_P(p)=Ap+B(1-p),\qquad w_R(p)=Cp+D(1-p).
$$
Evaluating the fitted lines at $p=1$ and $p=0$ gives the four entries of an effective $2\times2$ payoff matrix $\begin{pmatrix}A&B\\C&D\end{pmatrix}$ (rows P, R; columns opponent P, R). The replicator equation $\dot p=p(1-p)\big(w_P(p)-w_R(p)\big)$ is then implied, and the game's type is read from $x=C-A$ and $y=B-D$ (the standard [two-strategy](#/note/two-strategy-games) classification).

Reported fits (growth rates scaled by 100): no drug, no CAF: $w_P=2.5$, $w_R=2.5+1.5p$. No drug with CAF: $w_R=3.0$, $w_P=2.5+1.0(1-p)$. In the second case $w_P>w_R$ at $p=0$ ($3.5$ vs $3.0$) and $w_P<w_R$ at $p=1$ ($2.5$ vs $3.0$), so there is a stable interior point, at $2.5+1.0(1-p)=3.0$, i.e. $p^*=1/2$: each type does better when rare. The paper classifies this condition as a Leader game and the other three (no CAF; alectinib; alectinib with CAF) as Deadlock, in which resistant cells are fitter at every frequency and no interior fixed point exists. Hence the title: fibroblasts and alectinib *switch the game*, not just the growth rates. Staňková's (2019) commentary draws the general moral that drugs change the game, not only the players. Stated limitations: one cell system and one CAF source, linear-in-$p$ fitness (nonlinear fits gave the same qualitative games), growth measured before confluence, and fixed points never reached within an experiment.

### What the assay has found since

- **Freischel et al. (2021)**: in spheroid co-cultures of two breast cancer lines, monoculture growth rate $r$ and carrying capacity $K$ do not predict which line wins in co-culture; the outcome is set by frequency-dependent interactions.
- **Farrokhian et al. (2022)**: repeating the assay for gefitinib resistance, the cost of resistance alone does not predict competitive exclusion; frequency-dependent growth rates are needed, adding ecological (density) growth changes predicted extinction times, and a higher dose is not always better.
- **Maltas et al. (2024)**: positive frequency-dependent interactions with the ancestor (a resistant clone grows better when the ancestor is common) lengthen the extinction time of resistant clones, raising the prevalence and shaping the distribution of [pre-existing resistance](#/note/pre-existing-resistance); engineered resistant mutants of the same lung line all showed such positive interactions (from the abstract).
- **Veith, Beck, Brown and Andor (2026)**: "inverse game theory" (ECO-K) infers frequency-dependent interaction matrices among many karyotype-defined subpopulations from serial-passage time series of cell lines and xenografts, and identifies an "ecological hub" subclone (from the abstract).

Together with Archetti's IGF-II experiment ([public goods](#/note/cancer-public-goods-games)) these are, as of the 2022 review by Wölfl et al., essentially the only cancer games whose parameters were measured rather than postulated.

### What is identified, and what is not

The assay identifies two functions of one variable, $w_P(p)$ and $w_R(p)$, in one density regime, one dose and one environment. Three gaps follow.

1. **Effective, not reductive.** The entries absorb space, diffusible goods and density. The reductive game is recovered only by inverting a transform under its hypotheses, and Kaznatcheev (2018) notes this fails when spatial effects are slow and time-dependent (open).
2. **Frequency, not density.** Equilibria of the implied replicator equation are those of a Lotka–Volterra model with the same interaction signs, but time scales differ (Gerlee and Altrock 2017; Wölfl et al. 2022); Farrokhian et al. add explicit growth for this reason.
3. **Not what a Stackelberg design needs.** A [Stackelberg evolutionary game](#/note/stackelberg-evolutionary-games) needs $G(v,\mathbf u,\mathbf x,m)$ as a function of trait, densities and dose, and its Theorem 4.1 (Stein et al. 2023) says the gap between Nash and Stackelberg therapy hinges on $du^*/dm$, hence on the cross-derivative $\partial_v\partial_mG$. A $2\times2$ matrix at one dose contains no such information. No published result (as of 2026) says which features of $G$ are identifiable from assay data; the measured switch of game between conditions is the closest thing to a sample of $m\mapsto$ game. This is the identifiability problem McEvoy raised, solved for the effective game at fixed conditions and open for the object the therapy design uses.

## Cards

Q: What is the difference between a reductive and an effective game (Kaznatcheev 2018)?
A: A reductive game is the local interaction that sets fitness from a cell's contacts, played over a spatial structure. An effective game is the population-level frequency-dependent fitness whose non-spatial replicator dynamics reproduce the observed population behaviour. Transforms on regular graphs relate them.
See: Reductive versus effective games

Q: Why is "guess a local game, simulate it on a lattice, compare with bulk data" a category error according to Kaznatcheev?
A: The intuitions behind the guessed game come from bulk experiments, which already describe the effective game. The proposed inversion: measure the effective game and the spatial structure, then invert the transform to recover the reductive game.
See: Reductive versus effective games

Q: Describe the game assay and how the $2\times2$ payoff matrix is read off.
A: Co-culture two labelled types at several initial proportions $p$; regress each type's early exponential growth rate on $p$: $w_P=Ap+B(1-p)$, $w_R=Cp+D(1-p)$. Evaluating at $p=1$ and $p=0$ gives $A,B$ (row P) and $C,D$ (row R), an effective payoff matrix implying $\dot p=p(1-p)(w_P-w_R)$.
See: The game assay (Kaznatcheev, Peacock, Basanta, Marusyk and Scott 2019)

Q: What did Kaznatcheev et al. (2019) find about fibroblasts and alectinib?
A: They switch the game. Without drug but with fibroblasts the effective game has a stable interior fixed point (classified Leader); without fibroblasts, or under alectinib, resistant cells are fitter at every frequency (Deadlock), with no interior fixed point.
See: The game assay (Kaznatcheev, Peacock, Basanta, Marusyk and Scott 2019)

Q: Why does a cost of resistance alone not predict whether sensitive cells exclude resistant ones (Farrokhian et al. 2022)?
A: Exclusion depends on frequency-dependent growth rates, not on monoculture rates. A costly resistant clone can persist if its fitness relative to the ancestor rises with the ancestor's frequency; adding density-dependent growth also changes predicted extinction times.
See: What the assay has found since

Q: How does positive frequency dependence explain the prevalence of pre-existing resistance (Maltas et al. 2024)?
A: A resistant clone that grows better when the ancestor is common takes longer to go extinct, so more resistant clones are present at the start of treatment, and their size distribution is shifted.
See: What the assay has found since

Q: What does the game assay not identify that a Stackelberg therapy design needs?
A: It gives $w_P(p),w_R(p)$ at one dose, density and environment. A Stackelberg design needs $G(v,\mathbf u,\mathbf x,m)$, in particular how the ESS trait responds to dose, $du^*/dm$, which depends on $\partial_v\partial_mG$; a $2\times2$ matrix at one dose carries no such information.
See: What is identified, and what is not

## Quiz

Q: Fitted lines (scaled by 100) $w_P=2.5+1.0(1-p)$ and $w_R=3.0$ imply an effective game with…
- [x] a stable interior fixed point at $p^*=1/2$
- [ ] resistant cells fitter at every frequency
- [ ] parental cells fitter at every frequency
- [ ] an unstable interior fixed point at $p^*=1/2$
E: $w_P-w_R=0.5-p$ is positive for $p<1/2$ and negative above, so parental cells gain when rare and lose when common: a stable mixed state.
See: The game assay (Kaznatcheev, Peacock, Basanta, Marusyk and Scott 2019)

Q: The entries of a game-assay payoff matrix are best described as…
- [x] population-level effective payoffs that absorb space, diffusible goods and the density regime
- [ ] direct cell-to-cell interaction payoffs from pairwise contacts
- [ ] Lotka–Volterra competition coefficients
- [ ] dose-response parameters of the drug
E: The assay measures the effective game. The reductive (contact-level) game would require inverting a spatial transform under its hypotheses.
See: What is identified, and what is not

Q: Freischel et al. (2021) found that the winner of a two-line co-culture…
- [x] is not predicted by the lines' monoculture growth rates and carrying capacities
- [ ] is always the line with the larger carrying capacity
- [ ] is always the line with the larger growth rate
- [ ] is determined by the initial frequency only
E: Frequency-dependent interactions, measured in mixtures, decided the outcome; monoculture $r$ and $K$ did not.
See: What the assay has found since
