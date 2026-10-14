---
title: Permanence and heteroclinic cycles
tags: [evolutionary-game-theory, replicator-dynamics, permanence, heteroclinic-cycles, lotka-volterra]
created: 2026-07-22
related: [replicator-kl-lyapunov, replicator-lotka-volterra, replicator-dynamics]
source: "Claude conversation: Daily evolutionary game theory course (2026-07), part 4: n-strategy dynamics"
---

## Article

Part 4 of the evolutionary game theory course, after the [KL Lyapunov function](#/note/replicator-kl-lyapunov) and the [Lotka–Volterra transformation](#/note/replicator-lotka-volterra). Orbits so far either converged to a vertex (Prisoner's Dilemma, Stag Hunt), converged to an interior point (interior ESS), or cycled forever (zero-sum RPS). Permanence asks the coarser question: does every strategy survive?

### Permanence

The replicator dynamics are **permanent** if there is a compact set $K$ in the interior of the simplex that every interior orbit eventually enters and never leaves. Every strategy present at the start survives, *uniformly* bounded away from extinction. This is weaker than convergence to an interior point and stronger than "no orbit tends to the boundary".

### Hofbauer's average-Lyapunov criterion

Take $P(x) = \prod_i x_i^{c_i}$ with $c_i > 0$. It vanishes on the boundary, and

$$
\frac{\dot P}{P} = \sum_i c_i\big((Ax)_i - x^\top Ax\big).
$$

If this is positive at every rest point $\hat x$ on the boundary, then $P$ tends to increase near the boundary and the system is permanent. (In general one asks for a positive time average over limit sets on the boundary. For the replicator equation, checking boundary rest points suffices.) With $\sum_i c_i = 1$ and $p = c$, the condition reads $p^\top A\hat x > \hat x^\top A\hat x$: the mixture $p$ could invade every boundary rest point.

### Zero-sum RPS is not permanent

For zero-sum Rock–Paper–Scissors every interior orbit is a closed curve, so no orbit reaches the boundary. But orbits are the level sets of $x_1x_2x_3$, and orbits that start near the boundary have small $x_1x_2x_3$ forever, so they come arbitrarily close to it. No single compact $K$ works, and the system is **not permanent**. The criterion agrees: at the Rock vertex the uniform weights give $\tfrac13(0 + 1 - 1) = 0$, not $> 0$.

The original chat said zero-sum RPS is permanent. That is wrong: permanence is uniform.

With win payoff $w$ and loss payoff $-l$, the same check gives $\tfrac13(w - l)$ at each vertex, so the game is permanent when $w > l$.

### Heteroclinic cycles

When $w < l$, the interior equilibrium is a repelling focus. Orbits spiral outward toward the **heteroclinic cycle** on the boundary: the vertices Rock, Paper, Scissors joined by the edges along which each is invaded by the next. Near the cycle, an orbit lingers near one vertex (two strategies nearly extinct), switches quickly to the next, and lingers longer at each successive pass. The canonical ecological example is the May–Leonard competition model (1975). The system is not permanent, but the cyclic order persists.

### Classification and higher dimensions

For $n = 3$ the generic fates of an RPS-type interior equilibrium are:

1. globally attracting, when $A$ is negative definite on the tangent space (spiral in);
2. a center with closed orbits, the non-generic zero-sum case;
3. a repelling focus with orbits going to a heteroclinic cycle (not permanent).

For $n = 3$ the simplex is two-dimensional, so the Poincaré–Bendixson theorem applies and chaos is impossible. For $n \ge 4$ (three or more Lotka–Volterra species) the flow is at least three-dimensional, and limit cycles and chaotic attractors can occur. The chat cited a result on chaos in *three*-species competitive Lotka–Volterra; that citation looks wrong (competitive systems in dimension three cannot be chaotic), so it is left out here.

## Cards

Q: Define permanence for the replicator dynamics.
A: There is a compact $K$ in the interior of the simplex that every interior orbit eventually enters and stays in. No strategy goes extinct, uniformly over initial conditions.
See: Permanence

Q: State Hofbauer's average-Lyapunov criterion for permanence.
A: If there are $c_i > 0$ with $\sum_i c_i[(A\hat x)_i - \hat x^\top A\hat x] > 0$ at every boundary rest point $\hat x$, then $P = \prod_i x_i^{c_i}$ is an average Lyapunov function and the system is permanent.
See: Hofbauer's average-Lyapunov criterion

Q: Is zero-sum Rock–Paper–Scissors permanent?
A: No. Each orbit is a closed curve away from the boundary, but orbits starting near the boundary keep a small value of $x_1x_2x_3$ and so come arbitrarily close to it. There is no uniform compact $K$.
See: Zero-sum RPS is not permanent

Q: For Rock–Paper–Scissors with win $w$ and loss $-l$, when does the permanence criterion apply?
A: When $w > l$. With uniform weights, $\frac{\dot P}{P}$ at each vertex is $\tfrac13(w-l)$.
See: Zero-sum RPS is not permanent

Q: What are the generic fates of the interior equilibrium in a 3-strategy RPS-type game?
A: Globally attracting when $A$ is negative definite on the tangent space; a center with closed orbits in the non-generic zero-sum case; or a repelling focus with orbits spiralling out to a heteroclinic cycle on the boundary (not permanent).
See: Classification and higher dimensions

Q: What does an orbit near an attracting heteroclinic cycle look like?
A: It lingers near one vertex, with two strategies nearly extinct, then switches quickly to the next vertex in the cycle, lingering longer at each pass.
See: Heteroclinic cycles

Q: What new dynamics can appear with four or more strategies, and why not with three?
A: With $n = 3$ the simplex is 2-D, so Poincaré–Bendixson rules out chaos. With $n \ge 4$ (three or more Lotka–Volterra species) the flow is at least 3-D, and limit cycles and chaotic attractors are possible.
See: Classification and higher dimensions

## Quiz

Q: For zero-sum Rock–Paper–Scissors, which statement is correct?
- [x] Every interior orbit is periodic, but the system is not permanent.
- [ ] The system is permanent because no orbit reaches the boundary.
- [ ] Interior orbits converge to the boundary.
- [ ] Interior orbits converge to $(1/3,1/3,1/3)$.
E: Permanence requires a single compact set absorbing all interior orbits. Orbits near the boundary stay near it, since $x_1x_2x_3$ is conserved.
See: Zero-sum RPS is not permanent

Q: Which behavior is impossible for the replicator dynamics with three strategies?
- [x] a chaotic attractor
- [ ] an attracting heteroclinic cycle
- [ ] a center surrounded by closed orbits
- [ ] a globally attracting interior equilibrium
E: The state space is two-dimensional, so Poincaré–Bendixson applies. The other three all occur in RPS-type games.
See: Classification and higher dimensions
