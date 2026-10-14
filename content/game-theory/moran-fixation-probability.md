---
title: The Moran process and fixation probabilities
tags: [evolutionary-game-theory, finite-populations, moran-process, markov-chains, fixation]
created: 2026-07-22
related: [stochastic-stability, stag-hunt-risk-dominance, two-strategy-games, evolutionary-graph-theory]
source: "Claude conversation: Daily evolutionary game theory course (2026-07), part 5: finite populations"
---

## Article

Part 5 of the evolutionary game theory course leaves the infinite-population ODE. With a finite population, genetic drift, fixation, and a new notion of "which equilibrium wins" appear.

### The Moran process

A population of fixed size $N$ plays a $2\times2$ game $\begin{pmatrix} a & b\\ c& d\end{pmatrix}$ (rows $A$, $B$). Let $i$ be the number of $A$-players. Each individual's fitness is its average payoff against the *other* $N-1$:

$$
f_A(i) = \frac{a(i-1) + b(N-i)}{N-1}, \qquad f_B(i) = \frac{c\,i + d(N-i-1)}{N-1}.
$$

At each step one individual is chosen to reproduce with probability proportional to fitness, and one chosen uniformly at random dies and is replaced by the offspring. This is a birth–death chain on $\{0,\dots,N\}$:

$$
T^+(i) = \frac{i f_A}{i f_A + (N-i) f_B}\cdot\frac{N-i}{N}, \qquad T^-(i) = \frac{(N-i) f_B}{i f_A + (N-i) f_B}\cdot\frac{i}{N}.
$$

The states $0$ and $N$ are absorbing. **Without mutation the population fixes on all-$A$ or all-$B$ with probability 1**, whatever the payoffs. Drift destroys coexistence, even at a Hawk–Dove-type mixed ESS.

### Fixation probability

$\rho_A$ is the probability that a single $A$-mutant in an all-$B$ population takes over. Everything except the fitnesses cancels in the ratio

$$
\gamma_i = \frac{T^-(i)}{T^+(i)} = \frac{f_B(i)}{f_A(i)}.
$$

For the hitting probabilities $\phi_i$ of state $N$, the differences $\phi_{i+1}-\phi_i$ get multiplied by $\gamma_i$ at each step, and summing them gives

$$
\rho_A = \phi_1 = \frac{1}{1 + \sum_{k=1}^{N-1}\prod_{i=1}^{k}\gamma_i}.
$$

The same algebra gives a clean ratio: $\rho_B / \rho_A = \prod_{i=1}^{N-1}\gamma_i = \prod_{i=1}^{N-1} f_B(i)/f_A(i)$.

### The neutral baseline

If $f_A \equiv f_B$, every $\gamma_i = 1$ and $\rho_A = 1/N$: by symmetry, each of the $N$ individuals is equally likely to become the common ancestor. So in finite populations the question is not whether $A$ has a positive growth rate but whether **$\rho_A > 1/N$**, that is, whether selection favors $A$ compared with luck. Fixation probability replaces "uninvadable" as the basic notion.

### Example: Stag Hunt with N = 4

Take $(a,b,c,d) = (3,0,2,2)$, with $A$ = Stag. Then $f_A(i) = i - 1$ and $f_B \equiv 2$.

- A lone Stag-hunter has fitness $f_A(1) = 0$, so it is never chosen to reproduce, and it eventually dies: **$\rho_A = 0$ exactly**. The ODE has no analogue of this; there, a rare type only decays smoothly.
- A single Hare mutant in all-Stag: with $j$ Hare players the ratios are $f_A/f_B = (3-j)/2$, i.e. $1, \tfrac12, 0$ for $j = 1,2,3$. So $\rho_B = 1/(1 + 1 + \tfrac12 + 0) = 0.4$, well above the neutral $1/N = 0.25$.

Hare is strongly favored, more starkly than large-$N$ asymptotics like the [1/3 rule](#/note/stochastic-stability) suggest. Small populations can show much stronger effects.

## Cards

Q: In the Moran process for a $2\times2$ game, what is the ratio of death to birth transition probabilities?
A: $\gamma_i = T^-(i)/T^+(i) = f_B(i)/f_A(i)$. The reproduction denominator and the factors $i/N$, $(N-i)/N$ cancel.
See: Fixation probability

Q: Give the fixation probability of a single $A$ mutant in the Moran process.
A: $\rho_A = 1\big/\big(1 + \sum_{k=1}^{N-1}\prod_{i=1}^{k}\gamma_i\big)$ with $\gamma_i = f_B(i)/f_A(i)$.
See: Fixation probability

Q: What is the neutral baseline for fixation probability, and why does it matter?
A: With no selection ($f_A \equiv f_B$), every $\gamma_i = 1$ and $\rho = 1/N$. In finite populations, "$A$ is favored by selection" means $\rho_A > 1/N$.
See: The neutral baseline

Q: What happens to a finite Moran population with no mutation?
A: The states $i = 0$ and $i = N$ are absorbing, so the population eventually fixes on all-$A$ or all-$B$ with probability 1, whatever the payoffs. Drift destroys coexistence even at a mixed ESS.
See: The Moran process

Q: What is $\rho_B/\rho_A$ in the Moran process?
A: $\prod_{i=1}^{N-1}\gamma_i = \prod_{i=1}^{N-1} f_B(i)/f_A(i)$.
See: Fixation probability

Q: Stag Hunt $\begin{pmatrix}3&0\\2&2\end{pmatrix}$ with $N = 4$: why is the fixation probability of a single Stag mutant exactly $0$?
A: Against three Hare players its fitness is $f_A(1) = 0$ (hunting Stag alone pays 0), so it is never chosen to reproduce and eventually dies.
See: Example: Stag Hunt with N = 4

Q: Stag Hunt $\begin{pmatrix}3&0\\2&2\end{pmatrix}$ with $N = 4$: compute the fixation probability of a single Hare mutant.
A: The ratios $\gamma$ for $j = 1,2,3$ Hare players are $1, \tfrac12, 0$, so $\rho_B = 1/(1+1+0.5+0) = 0.4$, above the neutral $0.25$.
See: Example: Stag Hunt with N = 4

## Quiz

Q: In the Moran process with no mutation, a Hawk–Dove population (which has a mixed ESS in the ODE)…
- [x] eventually becomes all-Hawk or all-Dove with probability 1
- [ ] stays near the ESS mixture forever
- [ ] fixes on all-Dove only
- [ ] converges to the ESS mixture in distribution
E: The only absorbing states are $0$ and $N$, and every state can reach them. The mixed ESS only affects how long that takes.
See: The Moran process

Q: Stag Hunt $\begin{pmatrix}3&0\\2&2\end{pmatrix}$ with $N = 4$: what are $(\rho_{\text{Stag}}, \rho_{\text{Hare}})$?
- [x] $(0,\ 0.4)$
- [ ] $(0.25,\ 0.25)$
- [ ] $(0.4,\ 0)$
- [ ] $(0,\ 0.25)$
E: A lone Stag-hunter has fitness $0$ and never reproduces. For Hare, $\rho = 1/(1 + 1 + \tfrac12 + 0) = 0.4$.
See: Example: Stag Hunt with N = 4

Q: In a population of $N = 50$ with no selection, a single mutant fixes with probability…
- [x] $1/50$
- [ ] $0$
- [ ] $1/2$
- [ ] $1/\ln 50$
E: All $\gamma_i = 1$, so $\rho = 1/N$: each individual is equally likely to be the eventual common ancestor.
See: The neutral baseline
