---
title: Potential games
tags: [nash-equilibrium, congestion-games, mean-field-games]
created: 2026-10-13
related: [replicator-dynamics, replicator-kl-lyapunov, supermodular-games]
source: "Sample note. Background for potential mean field games."
---

## Article

A game is a **potential game** if a single function on strategy profiles captures every player's incentive to deviate. Players $i = 1,\dots,N$ choose strategies $s_i \in S_i$ and receive payoffs $u_i(s)$. A function $\Phi : S \to \mathbb{R}$ is an **exact potential** (Monderer–Shapley, 1996) if, for every player $i$, every $s_{-i}$, and every pair $s_i, s_i'$,

$$
u_i(s_i', s_{-i}) - u_i(s_i, s_{-i}) = \Phi(s_i', s_{-i}) - \Phi(s_i, s_{-i}).
$$

Weaker versions ask only that the *sign* of the change agree (**ordinal potential**) or that the changes agree up to a positive player-specific weight, $u_i(s_i',s_{-i}) - u_i(s_i,s_{-i}) = w_i\,[\Phi(s_i',s_{-i}) - \Phi(s_i,s_{-i})]$ (**weighted potential**).

### Why it matters

- **Equilibria become optimizers.** Any maximizer of $\Phi$ is a Nash equilibrium. More generally, Nash equilibria are exactly the profiles where $\Phi$ cannot be improved by changing one coordinate at a time. In a finite game a maximizer exists, so **every finite potential game has a pure-strategy Nash equilibrium**.
- **Learning converges.** Finite potential games have the *finite improvement property*: every sequence of unilateral strict improvements is finite, since $\Phi$ strictly increases along it. So best-response and better-response dynamics always terminate at a pure equilibrium.
- **A test for smooth games.** If each $S_i \subset \mathbb{R}$ is an interval and payoffs are $C^2$, the game has an exact potential if and only if
  $\dfrac{\partial^2 u_i}{\partial s_i \partial s_j} = \dfrac{\partial^2 u_j}{\partial s_i \partial s_j}$ for all $i, j$. This is the symmetry condition that makes the "vector field" $(\partial_{s_i} u_i)_i$ a gradient.

### Canonical example: congestion games

Players choose subsets of resources (e.g. routes made of roads). The cost of resource $r$ depends only on the number $n_r(s)$ of players using it, through a function $c_r$. Rosenthal (1973) showed that

$$
\Phi(s) = \sum_r \sum_{k=1}^{n_r(s)} c_r(k)
$$

is an exact potential, with costs in place of payoffs, so it is minimized rather than maximized. Monderer and Shapley proved a converse: **every finite exact potential game is isomorphic to a congestion game**.

Every symmetric $2\times 2$ game, including the Prisoner's Dilemma, is an exact potential game. Matching Pennies is not: it has no pure equilibrium.

### Population games and the replicator dynamics

In a population game the payoff to strategy $i$ at population state $x$ is $F_i(x)$. It is a **potential game** if $F = \nabla f$ on the simplex. With random matching in a symmetric matrix game, $F(x) = Ax$, and if $A$ is symmetric then $f(x) = \tfrac12 x^\top A x$ is a potential. The [replicator dynamics](#/note/replicator-dynamics) then ascend $f$: they are its gradient flow in the Shahshahani (Fisher–Rao) metric, and $\frac{d}{dt}x^\top Ax = 2\operatorname{Var}_x(Ax) \ge 0$ (Fisher's fundamental theorem). With two strategies, column shifts (which do not change the replicator dynamics) make any $A$ diagonal, hence symmetric. That is another way to see why two-strategy games behave like gradient systems.

### Connection to mean field games

The continuum analogue is a **potential MFG** (Lasry–Lions, 2007). If the coupling is the first variation of a functional on measures, $F(x,m) = \frac{\delta \mathcal F}{\delta m}(m)(x)$, then the MFG system is the first-order optimality condition of a *planner's* problem: minimize

$$
\int_0^T\!\!\int L(x,\alpha)\,dm_t\,dt + \int_0^T \mathcal F(m_t)\,dt + \mathcal G(m_T)
$$

over pairs $(m,\alpha)$ satisfying the Fokker–Planck equation $\partial_t m - \nu\Delta m + \operatorname{div}(m\alpha) = 0$. Convexity of $\mathcal F$ corresponds to monotonicity of $F$, so the Lasry–Lions uniqueness condition is the convexity of the potential. For the matrix-game analogue of monotonicity see [stable games](#/note/replicator-kl-lyapunov), and for a regime with several equilibria ordered as a lattice see [submodular MFGs](#/note/supermodular-games).

## Cards

Q: Define an **exact potential** $\Phi$ for a game with payoffs $u_i$.
A: For every player $i$, every $s_{-i}$ and all $s_i, s_i'$,
$$
u_i(s_i', s_{-i}) - u_i(s_i, s_{-i}) = \Phi(s_i', s_{-i}) - \Phi(s_i, s_{-i}).
$$
One function records every unilateral change in payoff.

Q: Why does every finite potential game have a pure Nash equilibrium?
A: $\Phi$ attains a maximum on the finite set $S$. At a maximizer no player can gain by deviating alone, since a gain would raise $\Phi$.
See: Why it matters

Q: What is the **finite improvement property**, and why do finite potential games have it?
A: Every sequence of strict unilateral improvements is finite. Each step strictly increases $\Phi$, which takes finitely many values, so no path can cycle.
See: Why it matters

Q: For smooth games with one-dimensional strategies, what is the test for having an exact potential?
A: $\dfrac{\partial^2 u_i}{\partial s_i\partial s_j} = \dfrac{\partial^2 u_j}{\partial s_i\partial s_j}$ for all $i,j$. This is the symmetry (closedness) condition for $(\partial_{s_i}u_i)_i$ to be a gradient.
See: Why it matters

Q: What is Rosenthal's potential for a congestion game?
A: $\Phi(s) = \sum_r \sum_{k=1}^{n_r(s)} c_r(k)$, where $n_r(s)$ is the number of players using resource $r$ and $c_r$ is its cost function.
See: Canonical example: congestion games

Q: What is a **potential MFG**, and what does convexity of the potential correspond to?
A: An MFG whose coupling is $F = \frac{\delta\mathcal F}{\delta m}$. The MFG system is then the optimality condition of a planner's control problem for the Fokker–Planck equation. Convexity of $\mathcal F$ corresponds to Lasry–Lions monotonicity of $F$, which gives uniqueness.
See: Connection to mean field games

Q: For a population game $F(x) = Ax$ with $A$ symmetric, what is the potential, and what do the replicator dynamics do with it?
A: $f(x) = \tfrac12 x^\top Ax$, since $\nabla f = Ax$. The replicator dynamics are its gradient ascent in the Shahshahani metric, so $x^\top Ax$ increases (Fisher's fundamental theorem).
See: Population games and the replicator dynamics

## Quiz

Q: Which of these games is **not** a potential game?
- [ ] Prisoner's Dilemma
- [ ] A routing game where travel time on each road depends on its number of users
- [x] Matching Pennies
- [ ] A symmetric coordination game
E: Every finite potential game has a pure Nash equilibrium, and Matching Pennies has none. The routing game is a congestion game, and every symmetric $2\times2$ game has an exact potential.

Q: In a finite exact potential game, a Nash equilibrium is guaranteed to be…
- [ ] a global maximizer of $\Phi$
- [x] a profile where $\Phi$ cannot be increased by changing a single player's strategy
- [ ] unique if $\Phi$ is strictly concave in each coordinate separately
- [ ] Pareto optimal
E: Equilibria are "coordinate-wise" local maximizers of $\Phi$. A global maximizer is one equilibrium, but there can be others. Equilibria need not be Pareto optimal: the Prisoner's Dilemma is a potential game.
See: Why it matters

Q: In a potential MFG with coupling $F = \delta\mathcal F/\delta m$, the Lasry–Lions monotonicity condition on $F$ corresponds to…
- [x] convexity of $\mathcal F$
- [ ] concavity of $\mathcal F$
- [ ] $\mathcal F$ being linear in $m$
- [ ] uniform ellipticity of the Fokker–Planck equation
E: Monotonicity of the first variation is the infinite-dimensional version of "the gradient of a convex function is a monotone operator".
See: Connection to mean field games
