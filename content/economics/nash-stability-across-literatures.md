---
title: Nash vs. stability in evolutionary games, adaptive dynamics and MFG
tags: [learning-in-games, evolutionary-game-theory, adaptive-dynamics, stable-games, mean-field-games]
created: 2026-08-07
related: [gradient-play-stability, replicator-dynamics, potential-games, adaptive-learning-e-stability, evolutionarily-stable-strategies, replicator-microfoundations, singular-strategies-branching]
source: "Claude conversation: MFG without rational expectations, et al (2026-08)"
---

## Article

The gap between "Nash" and "stable under a learning dynamic" ([gradient play](#/note/gradient-play-stability)) was found separately in evolutionary game theory, theoretical biology, economics and machine learning.

### The folk theorem of evolutionary dynamics

For the replicator dynamics and related dynamics (Hofbauer–Sigmund, *Bull. AMS* 2003; Sandholm, *Population Games and Evolutionary Dynamics*, 2010):
1. Nash equilibria are rest points.
2. Strict Nash equilibria are asymptotically stable.
3. (Lyapunov) stable rest points are Nash equilibria.

Rest points need not be Nash: a pure-strategy vertex is always a rest point of the replicator dynamics, even when it is not a best reply to itself. But such a point is unstable, because a better reply present in a tiny share grows. Item 3 is what fails for gradient play in $N$-player continuous games. In a population game, a strategy's share grows exactly when it beats the average, so the dynamic itself enforces "own payoff increases". In the $N$-player gradient flow, the off-diagonal blocks of $DF$ give no such guarantee.

### ESS: a static condition that implies stability

An **evolutionarily stable strategy** (Maynard Smith–Price 1973) is asymptotically stable under the replicator dynamics (Taylor–Jonker 1978). The converse fails. The logic runs the opposite way from the owner's refinement: ESS is a static condition *chosen to guarantee* dynamic stability, whereas the owner adds stability as an extra axiom.

### Adaptive dynamics: convergence vs. evolutionary stability

This is the closest analogue. Let $J(y, x)$ be the invasion fitness of a rare mutant $y$ in a resident population $x$. The **canonical equation** $\dot x = k\,\partial_1 J(x, y)\big|_{y=x}$ is gradient play for a monomorphic population. At a singular point $x^*$:
- **evolutionary stability (ES):** $\partial_y^2 J(y, x^*)\big|_{y=x^*} < 0$, so $x^*$ cannot be invaded (the analogue of $\partial_i^2 J_i \prec 0$);
- **convergence stability (CS)** (Eshel 1983): $x^*$ attracts the canonical equation, i.e. $\frac{d}{dx}\big[\partial_y J(y,x)\big|_{y=x}\big] < 0$ at $x^*$, so $\partial_{yy}J + \partial_{xy}J < 0$ (the analogue of Hurwitz).

The mixed derivative $\partial_{xy}J$ makes them **independent**, which is the same phenomenon as for gradient play. Geritz–Kisdi–Meszéna–Metz (*Evol. Ecol.* 1998) classify the combinations:

| | CS | not CS |
|---|---|---|
| **ES** | continuously stable strategy (CSS) | "Garden of Eden": uninvadable but repelling |
| **not ES** | **evolutionary branching point**: the population converges, then splits | repeller |

### Dynamics-independence: stable games

Stability depends on the dynamic: best response, fictitious play and no-regret dynamics can disagree on the same game, and even player-specific learning rates can flip it. For a dynamics-independent notion, use **stable games** (Hofbauer–Sandholm, *J. Econ. Theory* 2009):
$$
(y - x)^\top \big(F(y) - F(x)\big) \le 0,
$$
i.e. the payoff Jacobian is negative semidefinite on the tangent space of the simplex. For such games, many standard evolutionary dynamics converge globally to the Nash set at once. This is the population-game sibling of Rosen's diagonal strict concavity and of Lasry–Lions monotonicity.

### In mean field games

Lasry–Lions monotonicity is the mean-field counterpart of Rosen's condition and plays the same role: uniqueness, plus convergence of learning schemes such as fictitious play (Cardaliaguet–Hadikhanloo, *ESAIM COCV* 2017) and online mirror descent (Pérolat et al.). Potential MFGs are the $A = 0$ (symmetric) case. What has no good mean-field theory yet, as far as the chat knew, is the failure mode: an MFG equilibrium that is a legitimate equilibrium but repels the natural learning flow. That is the stable-vs-Nash gap on Wasserstein space.

## Cards

Q: State the three parts of the folk theorem of evolutionary game dynamics (replicator dynamics).
A: Nash equilibria are rest points; strict Nash equilibria are asymptotically stable; stable rest points are Nash equilibria.
See: The folk theorem of evolutionary dynamics

Q: Give a replicator rest point that is not a Nash equilibrium. Why is it unstable?
A: A pure-strategy vertex that is not a best reply to itself. It is a rest point because the other strategies have zero share, but a better reply introduced at a tiny share grows.
See: The folk theorem of evolutionary dynamics

Q: Which part of the folk theorem fails for gradient play in $N$-player continuous games, and why?
A: "Stable implies Nash." In population dynamics a strategy grows only when it beats the average, so "own payoff increases" is built in. In gradient play the off-diagonal blocks of $DF$ can stabilize a point where a player is at a local minimum.
See: The folk theorem of evolutionary dynamics

Q: How does the ESS concept relate logically to dynamic stability?
A: ESS is a static condition that implies asymptotic stability under the replicator dynamics; the converse fails. It was chosen to guarantee stability, not added as an extra axiom.
See: ESS: a static condition that implies stability

Q: In adaptive dynamics, what are evolutionary stability and convergence stability at a singular point, and why are they independent?
A: ES: $\partial_{yy}J < 0$ (no rare mutant can invade). CS: $\partial_{yy}J + \partial_{xy}J < 0$ (the canonical equation converges there). The mixed derivative $\partial_{xy}J$ separates them.
See: Adaptive dynamics: convergence vs. evolutionary stability

Q: What is an **evolutionary branching point**?
A: A singular strategy that is convergence stable but not evolutionarily stable. The population converges to it and then splits into two diverging types.
See: Adaptive dynamics: convergence vs. evolutionary stability

Q: What is a **stable game**, and why is it the right notion for dynamics-independent convergence?
A: $(y - x)^\top(F(y) - F(x)) \le 0$, i.e. a negative semidefinite payoff Jacobian on the tangent space. Many standard evolutionary dynamics then converge globally to the Nash set at once. It is the population analogue of Rosen's DSC and of Lasry–Lions monotonicity.
See: Dynamics-independence: stable games

## Quiz

Q: Under the replicator dynamics, which statement is true?
- [ ] Every rest point is a Nash equilibrium.
- [x] Every Lyapunov-stable rest point is a Nash equilibrium.
- [ ] Every Nash equilibrium is asymptotically stable.
- [ ] Every asymptotically stable rest point is an ESS.
E: Pure vertices are rest points even when not Nash. Non-strict Nash equilibria need not be asymptotically stable. ESS implies asymptotic stability, but not conversely.
See: The folk theorem of evolutionary dynamics

Q: A singular strategy that is convergence stable but not evolutionarily stable is…
- [ ] a continuously stable strategy
- [x] an evolutionary branching point
- [ ] a Garden of Eden point
- [ ] an ESS
E: The population is attracted to it, but once there, nearby mutants can invade, and the population splits.
See: Adaptive dynamics: convergence vs. evolutionary stability

Q: Hofbauer–Sandholm stable games are the population-game analogue of…
- [x] Rosen's diagonal strict concavity and Lasry–Lions monotonicity
- [ ] potential games
- [ ] Hamiltonian (purely rotational) games
- [ ] evolutionary branching
E: All three are monotonicity conditions on the payoff field. Potential games are the symmetric-Jacobian case, a different structure.
See: Dynamics-independence: stable games
