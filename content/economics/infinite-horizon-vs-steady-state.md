---
title: "Infinite horizon is not stationary: steady states, turnpikes and shadowing"
tags: [mean-field-games, steady-state, turnpike, path-dependence, learning]
created: 2026-08-07
related: [discounted-stationary-mfg, bewley-huggett-aiyagari, moll-ryzhik-learning-mfg, adaptive-learning-e-stability]
source: "Claude conversation: MFG without rational expectations, et al (2026-08)"
---

## Article

The owner pointed out a hidden assumption in Claude's learning conjecture: that an infinite-horizon MFG "should" be modeled by a stationary equilibrium. It shouldn't.

### The initial-value problem vs. the stationary problem

The infinite-horizon discounted MFG is an **initial-value problem**. The Fokker–Planck equation runs forward from a given $m_0$. The HJB has a condition at infinity instead of a terminal condition: $u$ (and possibly $\nabla u$) bounded, the analyst's version of a transversality condition. Under Lasry–Lions monotonicity this problem has a **unique** solution (the owner's paper with Sircar), and that solution is a **trajectory**. It is stationary only if $m_0$ is already a stationary distribution. Imposing stationarity amounts to imposing a special initial condition. A modeler interested in growth has no reason to want this, since the point of a growth model is the transition.

### Uniqueness and multiplicity are consistent

The owner also found several stationary solutions under monotonicity (see [Discounted stationary MFG](#/note/discounted-stationary-mfg)). There is no contradiction: each stationary solution $(\bar u_i, \bar m_i)$ *is* the unique infinite-horizon solution with datum $m_0 = \bar m_i$. The IVP fixes $m_0$ and asks for boundedness at infinity. The stationary problem drops $m_0$ and imposes time-invariance instead. Monotonicity proves uniqueness for the first and says nothing about the second.

In the **ergodic** problem the stationary system really is the natural infinite-horizon object: it describes long-time averages, and the duality closes. With $\rho > 0$ the natural object is the IVP, and stationarity is an extra condition with no particular justification.

### What multiple steady states mean economically

A [steady state](#/note/bewley-huggett-aiyagari/what-a-steady-state-means) is aggregate constancy with individual churn. If the IVP is uniquely solvable but there are several steady states, the map from $m_0$ to the long-run limit (when there is one) is not constant. That means **basins of attraction and path dependence**. Economically this is **hysteresis**: two economies with identical fundamentals end up in different long-run states because they started in different places. This is the structure of poverty traps and development traps (Azariadis–Drazen, Matsuyama). That it survives monotonicity, which usually kills multiplicity, is the surprise.

### The learning question, restated

Instead of "does learning converge to a stationary equilibrium?", ask: let $(u^*, m^*)$ be the unique rational-expectations solution from $m_0$, and $(m^L_t, \hat p_t)$ the learning system from $(m_0, \hat p_0)$. Does $\hat p_t - p^*_t \to 0$? This is "learning to be rational" in Marcet and Sargent's sense, and it needs no stationarity. It splits into two separate questions:

- **Turnpike:** does $m^*_t$ converge at all? This is a property of the rational-expectations solution and has nothing to do with learning.
- **Shadowing:** does the learning trajectory approach the rational-expectations trajectory? This looks more like a continuity-in-beliefs estimate between two forward–backward systems with the same datum than like an ODE-method argument.

E-stability at a rest point addresses neither directly. It also weakens the case that seemed safe: constant-price beliefs were called "asymptotically self-fulfilling" because the limiting price is constant. That presumes the turnpike. If $p^*_t$ does not converge, agents who believe prices are constant forever are permanently misspecified, which is the [Berk–Nash](#/note/moll-ryzhik-learning-mfg/misspecification-berk-nash-not-nash) situation.

## Cards

Q: Is an infinite-horizon discounted MFG naturally a stationary problem?
A: No. It is an initial-value problem: Fokker–Planck forward from $m_0$, HJB with boundedness at infinity. Under monotonicity its solution is unique but generally not stationary; it is stationary only if $m_0$ is a stationary distribution.
See: The initial-value problem vs. the stationary problem

Q: How can the infinite-horizon IVP be unique under monotonicity while the stationary problem has several solutions?
A: They are different problems. Each stationary solution is the unique IVP solution for its own datum $m_0 = \bar m_i$. The stationary problem drops $m_0$ and imposes time-invariance instead.
See: Uniqueness and multiplicity are consistent

Q: When is the stationary system the natural infinite-horizon object?
A: In the ergodic (long-time average) problem, where the duality also closes. With $\rho > 0$ the natural object is the IVP.
See: Uniqueness and multiplicity are consistent

Q: Economically, what do multiple steady states with a uniquely solvable IVP mean?
A: Path dependence: the long-run outcome depends on $m_0$ through basins of attraction. Hysteresis, as in poverty or development traps, where economies with identical fundamentals diverge.
See: What multiple steady states mean economically

Q: Learning in a transient MFG: what are the **turnpike** and **shadowing** questions?
A: Turnpike: does the rational-expectations path $m^*_t$ converge at all (a property of the RE solution)? Shadowing: does the learning trajectory approach the RE trajectory from the same $m_0$, i.e. $\hat p_t - p^*_t \to 0$?
See: The learning question, restated

Q: Why does a failure of the turnpike undermine constant-price beliefs?
A: Constant-price beliefs are self-fulfilling only if the true price converges. If $p^*_t$ doesn't, believers in a constant price are permanently misspecified (Berk–Nash, not Nash).
See: The learning question, restated

## Quiz

Q: Two stationary solutions $(\bar u_1, \bar m_1) \ne (\bar u_2, \bar m_2)$ of a monotone discounted MFG. Does this contradict uniqueness for the infinite-horizon IVP?
- [ ] Yes; monotonicity must fail.
- [x] No; they are the IVP solutions for the different data $m_0 = \bar m_1$ and $m_0 = \bar m_2$.
- [ ] No, because the IVP has no uniqueness theory.
- [ ] Yes, unless $\rho = 0$.
E: The IVP fixes $m_0$. The stationary problem replaces $m_0$ by time-invariance, which monotonicity does not control.
See: Uniqueness and multiplicity are consistent

Q: "Does the rational-expectations solution $m^*_t$ converge as $t \to \infty$?" is the…
- [x] turnpike question
- [ ] shadowing question
- [ ] E-stability question
- [ ] transversality condition
E: It concerns only the RE solution. Shadowing compares the learning path to the RE path.
See: The learning question, restated
