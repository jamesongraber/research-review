---
title: The 1/3 rule and stochastic stability
tags: [evolutionary-game-theory, finite-populations, equilibrium-selection, stochastic-stability, risk-dominance]
created: 2026-07-22
related: [moran-fixation-probability, stag-hunt-risk-dominance, two-strategy-games]
source: "Claude conversation: Daily evolutionary game theory course (2026-07), part 5: finite populations"
---

## Article

Part 5 of the evolutionary game theory course, after [the Moran process](#/note/moran-fixation-probability). Take a coordination game ($a > c$, $d > b$) with interior equilibrium $x^* = (d-b)/[(a-c)+(d-b)]$, the fraction of $A$ at the unstable point of the [replicator dynamics](#/note/two-strategy-games).

### Weak selection

Fitness is $1 - w + w\cdot(\text{payoff})$ with $w \to 0$: payoffs perturb a neutral process only slightly. The fixation probabilities can then be expanded to first order in $w$ around $1/N$.

### The 1/3 rule

For weak selection and large $N$ (Nowak, Sasaki, Taylor, Fudenberg 2004):

- $\rho_A > 1/N$ (selection favors a single $A$ mutant) **iff $x^* < 1/3$**;
- $\rho_A > \rho_B$ **iff $x^* < 1/2$**, which is risk dominance.

The 1/3 compares $\rho_A$ with the neutral $1/N$, not with $\rho_B$. The original chat said "$\rho_A > \rho_B$ iff $x^* < 1/3$", which is wrong.

The first condition is equivalent to $a + 2b > c + 2d$, i.e. $\tfrac13 a + \tfrac23 b > \tfrac13 c + \tfrac23 d$. Heuristically, an invading lineage on its way to fixation meets its own type a third of the time on average. For finite $N$ the exact weak-selection conditions are $(N-2)a + (2N-1)b > (N+1)c + (2N-4)d$ for $\rho_A > 1/N$, and $(N-2)(a-d) + N(b-c) > 0$ for $\rho_A > \rho_B$. Both were checked numerically against the exact formula.

So there is an intermediate zone $1/3 < x^* < 1/2$ where $A$ has the larger basin, and is favored over $B$, but a single $A$ mutant still does worse than a neutral one.

### Rare mutation: the chain of equilibria

Now let each offspring mutate to the other type with small probability $\mu$. The chain becomes irreducible with a unique stationary distribution $\pi_\mu$. As $\mu \to 0$ at fixed $N$, the population is almost always monomorphic, and it moves between all-$A$ and all-$B$ like a two-state chain with rates

$$
\text{all-}B \to \text{all-}A:\ \approx \mu N\rho_A, \qquad \text{all-}A \to \text{all-}B:\ \approx \mu N\rho_B,
$$

since a mutant must appear and then fix. So $\pi(\text{all-}A)/\pi(\text{all-}B) \to \rho_A/\rho_B$. At fixed $N$ both states keep positive weight. But $\ln(\rho_A/\rho_B) = \sum_{i}\ln\big(f_A(i)/f_B(i)\big)$ grows linearly in $N$ at a fixed selection strength, so for large $N$ the state with the larger fixation probability (under weak selection, the risk-dominant one) is occupied almost all the time. In the Stag Hunt with $N = 4$, $\rho_{\text{Stag}} = 0$, so the population is at all-Hare in the limit.

### Stochastic stability (KMR, Young)

A state is **stochastically stable** if $\lim_{\mu\to0}\pi_\mu$ gives it positive weight. In the Kandori–Mailath–Rob (1993) and Young (1993) models, agents best-respond and occasionally make mistakes with probability $\mu$. Leaving the basin of all-$B$ takes about $x^*N$ simultaneous mistakes, with probability of order $\mu^{x^*N}$, and leaving all-$A$ takes about $(1-x^*)N$. As $\mu \to 0$ the stationary distribution concentrates on the equilibrium that is harder to leave: all-$A$ iff $x^* < 1/2$. So **the risk-dominant equilibrium is the unique stochastically stable state**, even when the other equilibrium is payoff-dominant and both are strict Nash equilibria and ESS.

### Three criteria, one answer

- Deterministic replicator dynamics: basin size, threshold $x^* = 1/2$.
- Single mutant in a finite population: $\rho_A > 1/N$, threshold $1/3$. $\rho_A > \rho_B$, threshold $1/2$.
- Long-run occupation under rare mutation: the risk-dominant equilibrium.

All of these favor risk dominance over payoff dominance, a question that Nash, ESS and perfection cannot settle. The clean thresholds are weak-selection, large-$N$ limits. For small $N$ use the exact formulas.

## Cards

Q: State the 1/3 rule (large $N$, weak selection) correctly.
A: With $x^*$ the fraction of $A$ at the unstable interior equilibrium, a single $A$ mutant has $\rho_A > 1/N$ iff $x^* < 1/3$. The 1/3 compares with the neutral $1/N$, not with $\rho_B$.
See: The 1/3 rule

Q: Under weak selection and large $N$, when is $\rho_A > \rho_B$ in a coordination game?
A: Iff $x^* < 1/2$, i.e. iff $A$ is risk-dominant ($a - c > d - b$).
See: The 1/3 rule

Q: Why "1/3"? Write the 1/3 rule as a payoff inequality.
A: $x^* < 1/3 \iff a + 2b > c + 2d$, i.e. $A$ beats $B$ when the opponent is type $A$ with probability $1/3$. Heuristically, an invading lineage meets its own type a third of the time on its way to fixation.
See: The 1/3 rule

Q: In the small-mutation limit of the Moran process at fixed $N$, what is $\pi(\text{all-}A)/\pi(\text{all-}B)$?
A: $\rho_A/\rho_B$. Transitions B→A happen at rate $\approx\mu N\rho_A$ and A→B at $\approx\mu N\rho_B$, and for a two-state chain the stationary weights are proportional to the incoming rates.
See: Rare mutation: the chain of equilibria

Q: In the Kandori–Mailath–Rob model, why is the risk-dominant equilibrium stochastically stable?
A: Leaving all-$B$ needs about $x^*N$ simultaneous mistakes (probability $\sim\mu^{x^*N}$) and leaving all-$A$ needs about $(1-x^*)N$. As $\mu\to0$ the harder-to-leave state wins, which is all-$A$ iff $x^* < 1/2$.
See: Stochastic stability (KMR, Young)

Q: Define a stochastically stable state.
A: A state that keeps positive probability in the limit $\mu \to 0$ of the stationary distributions $\pi_\mu$ of the perturbed process.
See: Stochastic stability (KMR, Young)

## Quiz

Q: A coordination game has $x^* = 0.4$. Under weak selection with large $N$…
- [x] $\rho_A < 1/N$ but $\rho_A > \rho_B$
- [ ] $\rho_A > 1/N$ and $\rho_A > \rho_B$
- [ ] $\rho_A > 1/N$ but $\rho_A < \rho_B$
- [ ] $\rho_A < 1/N$ and $\rho_A < \rho_B$
E: $0.4 > 1/3$, so a single $A$ mutant does worse than neutral, but $0.4 < 1/2$, so $A$ is risk-dominant and $\rho_A > \rho_B$.
See: The 1/3 rule

Q: As $\mu\to0$ at fixed $N$ in the Moran process with mutation, $\pi(\text{all-}A)/\pi(\text{all-}B)$ tends to…
- [x] $\rho_A/\rho_B$
- [ ] $\rho_B/\rho_A$
- [ ] $1$
- [ ] $x^*/(1-x^*)$
E: The stationary weight of a state is proportional to the rate of entering it, $\mu N\rho_A$ for all-$A$.
See: Rare mutation: the chain of equilibria

Q: In the Kandori–Mailath–Rob model of a $2\times2$ coordination game, the stochastically stable equilibrium is…
- [x] the risk-dominant one
- [ ] the payoff-dominant one
- [ ] both, since both are strict Nash equilibria
- [ ] the one closer to the initial state
E: Leaving the risk-dominant equilibrium needs more simultaneous mistakes, so as $\mu \to 0$ it is visited almost all the time.
See: Stochastic stability (KMR, Young)
