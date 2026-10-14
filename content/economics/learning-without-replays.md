---
title: Learning in calendar time, without replaying the game
tags: [learning-in-games, mean-field-games, fictitious-play, bounded-rationality]
created: 2026-08-07
related: [adaptive-learning-e-stability, moll-ryzhik-learning-mfg, gradient-play-stability]
source: "Claude conversation: MFG without rational expectations, et al (2026-08)"
---

## Article

### The Groundhog Day objection

Fictitious play in MFG (e.g. Cardaliaguet–Hadikhanloo) gives a reasonable notion of a "stable" MFG equilibrium, but it has **two times**: real time $t \in [0,T]$ and learning time $n$. Convergence happens in $n$, so the population plays out the entire history, then starts over with updated beliefs. That makes little sense for, say, firms maximizing lifetime profit in a growth model. The goal is a single history in which the learning index *is* calendar time $t$. The chat described three routes.

### Route 1: weaken anticipation (myopia)

- **Quasi-stationary MFG** (Mouzouni, *Appl. Math. Optim.*). At each instant agents optimize future cost **assuming the current environment is frozen**, then observe how it actually evolves and re-optimize. The HJB becomes a family of stationary problems indexed by $t$, coupled to a forward Fokker–Planck equation, and there is no terminal condition anywhere. The chat reported (unverified details) that Mouzouni derives this from the $N$-player game and proves exponential convergence to the ergodic MFG equilibrium from nearby data, for quadratic Hamiltonians.
- **Forward–forward MFG** (Gomes–Nurbekyan–Sedjro, *Appl. Math. Optim.* 2016). Both equations run forward from initial data. It was introduced to approximate stationary MFG numerically, and can be read as a model of agents who know the past but not the future. A later paper on one-dimensional forward–forward MFG with congestion (DCDS-S 2018) exhibits traveling-wave solutions (as reported in the chat; unverified), so forward–forward solutions **need not converge** to the stationary MFG.

Both routes amount to **myopia**, the opposite failure from repeated play. A firm that assumes its environment is frozen is not really maximizing lifetime profit.

### Route 2: keep the horizon, weaken the information

Agents keep the full intertemporal problem but forecast $(m_s)_{s>t}$ conditionally on their information $\mathcal F_t$ and update by Bayes' rule. Forecasting the mean field conditionally forces it to be random, so this lands in common-noise MFG with agents on smaller filtrations. Caines and Kizilkale did this in linear-quadratic-Gaussian major–minor games (minor agents estimate the major agent's state and the mean field, and the resulting laws are $\varepsilon$-Nash), and Kizilkale–Caines (*IEEE TAC* 2013) treat recursive identification of unknown parameters while playing.

This is real calendar-time learning, but what is learned is a **parameter or hidden state**, not the equilibrium map. Agents still have rational expectations given their information.

### Route 3: adaptive learning

This is the macroeconomists' answer: agents posit a perceived law of motion, act on it, and update it by least squares along the one realized history. See [Adaptive learning and E-stability](#/note/adaptive-learning-e-stability). Moll–Ryzhik bring this into MFG ([note](#/note/moll-ryzhik-learning-mfg)).

### Anticipated utility

Kreps (1998), **anticipated utility**: at each date the agent solves the full infinite-horizon problem under current beliefs *as if those beliefs were correct forever*. Then the agent revises beliefs and solves again next period. The objective is genuinely a lifetime one; what is boundedly rational is that the agent ignores their own future learning. Cogley and Sargent use this extensively. It answers the objection that learning agents must be myopic.

## Cards

Q: Why is fictitious play in MFG troubling as a *model* of how agents learn?
A: It has two times, real time $t$ and learning time $n$. Convergence is in $n$, so the population must replay the whole history repeatedly ("Groundhog Day"). That doesn't fit, e.g., firms maximizing lifetime profit along one history.
See: The Groundhog Day objection

Q: What is a **quasi-stationary MFG**?
A: At each time agents solve a stationary control problem with the environment frozen at its current state, then re-optimize as it evolves. You get a family of stationary HJBs indexed by $t$ coupled to a forward Fokker–Planck equation, with no terminal condition.
See: Route 1: weaken anticipation (myopia)

Q: What is a forward–forward MFG, and does it converge to the stationary MFG?
A: Both HJB and Fokker–Planck run forward from initial data (agents know the past, not the future). Not necessarily: traveling-wave solutions exist in 1D with congestion.
See: Route 1: weaken anticipation (myopia)

Q: What do quasi-stationary and forward–forward MFG have in common as models of behavior?
A: Both are myopic: agents do not really optimize over their lifetime. This is the opposite failure from fictitious play's repeated plays.
See: Route 1: weaken anticipation (myopia)

Q: In Bayesian (partial-information) learning in MFG, what do agents learn, and are they still "rational"?
A: A parameter or hidden state (e.g. the major agent's state), not the equilibrium map. They remain rational-expectations agents given their information, and the mean field becomes random (common-noise MFG on subfiltrations).
See: Route 2: keep the horizon, weaken the information

Q: What is Kreps's **anticipated utility**?
A: Each period the agent solves the full infinite-horizon problem under current beliefs as if they were correct forever, then updates beliefs and re-solves. The objective is lifetime; the only bounded rationality is ignoring one's own future learning.
See: Anticipated utility

## Quiz

Q: Which approach keeps a genuine lifetime objective while letting beliefs change over calendar time?
- [ ] Quasi-stationary MFG
- [ ] Forward–forward MFG
- [x] Anticipated utility with adaptive learning
- [ ] Fictitious play
E: The two myopic models drop the lifetime objective. Fictitious play keeps it but needs repeated plays of the whole game.
See: Anticipated utility

Q: In the Caines–Kizilkale partially observed major–minor LQG games, what is learned in real time?
- [ ] The equilibrium map from beliefs to outcomes
- [x] The hidden state of the major agent and the mean field (or unknown parameters)
- [ ] Nothing; agents replay the game
- [ ] The master field $U(t,x,m)$
E: Agents are Bayesian given partial information, so they remain rational-expectations agents relative to their filtration.
See: Route 2: keep the horizon, weaken the information
