---
title: Cooperation on graphs
tags: [evolutionary-game-theory, structured-populations, networks, cooperation, weak-selection]
created: 2026-07-22
related: [two-strategy-games, moran-fixation-probability, stochastic-stability]
source: "Claude conversation: Daily evolutionary game theory course (2026-07), part 6: structured populations"
---

## Article

Part 6 of the evolutionary game theory course answers the [Prisoner's Dilemma](#/note/two-strategy-games) cliffhanger. In a well-mixed population defection always wins. On a graph, cooperation can survive.

### Setup: the donation game on a graph

$N$ individuals sit on the vertices of a $k$-regular graph and interact only with neighbors. A cooperator pays a cost $c$ to give each partner a benefit $b$, with $b > c > 0$. Defectors pay nothing and give nothing. Payoffs are summed over the $k$ neighbors. In a pairwise matrix this is a Prisoner's Dilemma: mutual cooperation gives $b - c > 0$ each, but defecting always saves $c$. Fitness is $1 - w + w\cdot\text{payoff}$, with $w$ small (weak selection).

### Death–birth updating and the b/c > k rule

**Death–birth (DB) updating:** a random individual dies, and its $k$ neighbors compete for the empty vertex with probability proportional to fitness. It is the [Moran process](#/note/moran-fixation-probability) made local.

**Ohtsuki–Hauert–Lieberman–Nowak (2006):** under weak selection, DB updating on a $k$-regular graph with $N \gg k$, cooperation is favored (a single cooperator fixes with probability above the neutral $1/N$) iff

$$
\frac{b}{c} > k.
$$

As $k \to \infty$ the condition cannot be met, which recovers the well-mixed result.

### Why sparse graphs help

Reproduction is local, so offspring land next to their parents, and neighbors tend to share strategies. Cooperators then interact mostly with other cooperators and are partly shielded from defectors. With few neighbors this clustering is strong. With many neighbors a cooperator's offspring are spread among a nearly well-mixed neighborhood, and the effect washes out. Heuristically, the neutral correlation between neighbors scales like $1/k$, which is where $k$ in the threshold comes from.

### Why weak selection makes it tractable

At $w = 0$ the dynamics is pure drift on the graph, a voter-model-type process whose spatial correlations (how often a cooperator's neighbors are cooperators by descent) can be computed. Selection is then a first-order perturbation in $w$: does a little payoff-driven selection raise or lower the expected cooperator frequency, evaluated with the neutral correlations? This is the same expansion that gives the [1/3 rule](#/note/stochastic-stability).

### Other rules and caveats

- **Imitation updating** (a random individual either keeps its strategy or copies a neighbor, in proportion to fitness, with its own fitness included) gives $b/c > k + 2$. The update rule matters, not just the graph.
- With birth–death updating, the same paper reports that cooperation is never favored (unverified here).
- The clean threshold is for **regular** graphs. On heterogeneous networks (scale-free, small-world), hubs and leaves experience selection very differently, and simulations suggest strong degree heterogeneity can favor cooperation further. This is still an active research area.
- Network reciprocity is one of Nowak's "five rules" for the evolution of cooperation, alongside kin selection, direct reciprocity, indirect reciprocity and group selection. It needs no memory or reputation: geometry alone does the work.

## Cards

Q: What is the Ohtsuki–Hauert–Lieberman–Nowak condition for cooperation on a $k$-regular graph?
A: Under weak selection with death–birth updating in the donation game (pay $c$ to give $b$ to each neighbor), cooperation is favored iff $b/c > k$, for $N \gg k$.
See: Death–birth updating and the b/c > k rule

Q: Why does sparse connectivity help cooperation on graphs?
A: Local reproduction puts offspring next to their parents, so neighbors share strategies. With small $k$ this clustering is strong and cooperators interact mostly with each other. Dense graphs approach well-mixed and wash it out.
See: Why sparse graphs help

Q: What does the rule $b/c > k$ give as $k\to\infty$?
A: The condition can never be met, recovering the well-mixed Prisoner's Dilemma result that cooperation cannot be favored.
See: Death–birth updating and the b/c > k rule

Q: How does the threshold for cooperation change with imitation updating instead of death–birth?
A: It becomes $b/c > k + 2$: same shape, different constant. The update rule matters, not just the graph.
See: Other rules and caveats

Q: Describe death–birth updating on a graph.
A: A uniformly random individual dies, and its neighbors compete to place an offspring in the empty vertex, with probability proportional to fitness. It is a localized Moran process.
See: Death–birth updating and the b/c > k rule

Q: Why is weak selection the tractable regime for evolutionary games on graphs?
A: At $w = 0$ the process is neutral drift (voter-model-like), whose spatial correlations are computable. Selection is treated as a first-order perturbation in $w$ using those neutral correlations.
See: Why weak selection makes it tractable

## Quiz

Q: The donation game is played on a 4-regular graph with $b/c = 5$, under weak selection. Cooperation is favored…
- [x] with death–birth updating but not with imitation updating
- [ ] with imitation updating but not with death–birth updating
- [ ] with both
- [ ] with neither, since defection dominates
E: DB needs $b/c > k = 4$, which holds. Imitation needs $b/c > k + 2 = 6$, which fails.
See: Other rules and caveats

Q: In the $b/c > k$ rule, increasing the degree $k$ of the graph…
- [x] makes cooperation harder to favor
- [ ] makes cooperation easier to favor
- [ ] has no effect under weak selection
- [ ] only matters for imitation updating
E: Higher degree weakens the clustering of like strategies, moving toward the well-mixed case where defection wins.
See: Why sparse graphs help
