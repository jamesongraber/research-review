---
title: Stag Hunt and risk dominance
tags: [evolutionary-game-theory, equilibrium-selection, coordination-games, risk-dominance]
created: 2026-07-22
related: [two-strategy-games, evolutionarily-stable-strategies, stochastic-stability, moran-fixation-probability]
source: "Claude conversation: Daily evolutionary game theory course (2026-07), part 2: classic games"
---

## Article

Part 2 of the evolutionary game theory course. The Stag Hunt is the first example of **equilibrium selection** by dynamics. It is a [coordination game](#/note/two-strategy-games) with two strict equilibria, and static concepts cannot choose between them.

### The story

The game comes from Rousseau's *Discourse on Inequality* (1755). Two hunters can jointly hunt a stag, which succeeds only if both stay at their posts, or each can catch a hare alone.

$$
A = \begin{pmatrix} 3 & 0 \\ 2 & 2 \end{pmatrix} \qquad (\text{rows and columns: Stag, Hare})
$$

Mutual Stag pays 3. Hunting Stag alone pays 0. Hare pays 2 *whatever the partner does*. That last feature makes Hare safe and Stag risky. Everyone prefers the Stag outcome, but committing to it is rational only if you trust your partner. The name now refers to any coordination game with a payoff-dominant equilibrium that needs trust and a safe alternative.

### Basins of attraction

Let $x$ be the Stag frequency. Then $u(S,x) = 3x$ and $u(H,x) = 2$ (a flat line, because Hare's payoff is constant), so

$$
\dot x = x(1-x)(3x - 2).
$$

The rest points are $0$ and $1$ (both stable) and $x^* = 2/3$ (unstable). Above $2/3$ the population goes to all-Stag, and below it to all-Hare. Stag needs a two-thirds supermajority, because Hare's payoff does not depend on the others. In general $x^* = (d-b)/[(a-c)+(d-b)]$.

Both all-Stag and all-Hare are strict Nash equilibria, so both are ESS, and also perfect and proper. Static refinements treat them as equally valid. Only the dynamics distinguish them.

### Risk dominance and payoff dominance

In a symmetric $2\times 2$ coordination game ($a > c$, $d > b$), strategy 1 is **risk-dominant** (Harsanyi–Selten) iff $a - c > d - b$. The following are equivalent:

- $a - c > d - b$ (larger deviation loss);
- strategy 1 is the better reply to an opponent mixing 50/50, since $u(1,\tfrac12) - u(2,\tfrac12) = \tfrac12[(a-c)-(d-b)]$;
- $x^* < 1/2$, so strategy 1 has the larger basin under the replicator dynamics.

Strategy 1 is **payoff-dominant** if $a > d$. The two notions are logically independent. In the Stag Hunt above, Stag is payoff-dominant ($3 > 2$) and Hare is risk-dominant ($a - c = 1 < d - b = 2$). If mutual Stag paid 5, Stag would be both. In $(a,b,c,d) = (3,8,0,10)$, which is a coordination game, strategy 1 is risk-dominant ($3 > 2$) but strategy 2 is payoff-dominant ($10 > 3$). The inequality $a - c > d - b$ says nothing about $a$ versus $d$.

### Beyond basins

In finite populations with rare mutations, the long-run outcome again favors the risk-dominant equilibrium, and even more sharply. See [the 1/3 rule and stochastic stability](#/note/stochastic-stability), and the exact $N = 4$ Stag Hunt computation in [the Moran process note](#/note/moran-fixation-probability).

## Cards

Q: What do the Stag Hunt payoffs $\begin{pmatrix}3&0\\2&2\end{pmatrix}$ model, and which feature makes Hare "safe"?
A: Two hunters: Stag pays off only if both commit (3 if matched, 0 alone), and Hare pays 2 regardless of the partner. Hare's payoff is constant, so $u(H,x)$ is a flat line, which pins the threshold at $2/3$. The game models trust and coordination.
See: The story

Q: Stag Hunt with matrix $\begin{pmatrix}3&0\\2&2\end{pmatrix}$: derive the replicator ODE and the basins.
A: With $x$ the Stag fraction, $u(S,x) = 3x$ and $u(H,x) = 2$, so $\dot x = x(1-x)(3x-2)$. The vertices are stable and $x^* = 2/3$ is the separatrix: above it all-Stag, below it all-Hare.
See: Basins of attraction

Q: What is risk dominance in a $2\times2$ coordination game, and how does it relate to basins?
A: Strategy 1 is risk-dominant iff $a - c > d - b$. Equivalently it is the better reply to a 50/50 opponent, and equivalently $x^* < 1/2$, so it has the larger basin under the replicator dynamics.
See: Risk dominance and payoff dominance

Q: Are risk dominance and payoff dominance logically independent? Give an example.
A: Yes. $(a,b,c,d) = (3,8,0,10)$ is a coordination game with $a-c = 3 > d-b = 2$, so strategy 1 is risk-dominant, but $d = 10 > a = 3$, so strategy 2 is payoff-dominant.
See: Risk dominance and payoff dominance

Q: Why can't the ESS concept choose between all-Stag and all-Hare?
A: Both are strict Nash equilibria, hence both ESS (and perfect, and proper). Choosing between them needs dynamics: basin sizes, or long-run behavior under noise.
See: Basins of attraction

## Quiz

Q: In the Stag Hunt $\begin{pmatrix}3&0\\2&2\end{pmatrix}$, which equilibrium is risk-dominant and which is payoff-dominant?
- [x] Hare is risk-dominant, Stag is payoff-dominant
- [ ] Stag is both
- [ ] Hare is both
- [ ] Stag is risk-dominant, Hare is payoff-dominant
E: $a - c = 1 < d - b = 2$, so Hare is risk-dominant, and $3 > 2$ makes Stag payoff-dominant. Equivalently $x^* = 2/3 > 1/2$, so Hare has the larger basin.
See: Risk dominance and payoff dominance

Q: In a coordination game, strategy 1 has the larger basin of attraction under the replicator dynamics exactly when…
- [x] $a - c > d - b$
- [ ] $a > d$
- [ ] $a - c < d - b$
- [ ] $x^* > 1/2$
E: Larger basin means $x^* = (d-b)/[(a-c)+(d-b)] < 1/2$, i.e. $a - c > d - b$. Comparing $a$ with $d$ is payoff dominance, a different criterion.
See: Risk dominance and payoff dominance
