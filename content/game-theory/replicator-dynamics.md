---
title: Replicator dynamics
tags: [evolutionary-game-theory, replicator-dynamics, ode, stability]
created: 2026-07-22
related: [replicator-microfoundations, evolutionarily-stable-strategies, two-strategy-games, replicator-kl-lyapunov, replicator-lotka-volterra, potential-games]
source: "Claude conversation: Daily evolutionary game theory course (2026-07), part 1: foundations"
---

## Article

Part 1 of the evolutionary game theory course. The next notes are [evolutionarily stable strategies](#/note/evolutionarily-stable-strategies) and [symmetric 2×2 games](#/note/two-strategy-games).

### From players to populations

Classical game theory has rational players who choose strategies. Evolutionary game theory replaces them with a large population. Each individual is "programmed" with a pure strategy $i \in \{1,\dots,n\}$, is matched at random with others, and earns a payoff that counts as its **fitness**. Strategies reproduce in proportion to fitness. The population state is the vector of frequencies $x \in \Delta^{n-1}$. With a symmetric game with payoff matrix $A$, a type-$i$ individual has fitness $f_i(x) = (Ax)_i$, and the population mean is $\bar f(x) = x^\top A x$.

### The replicator equation

If types reproduce in proportion to fitness, frequencies follow

$$
\dot x_i = x_i\big((Ax)_i - x^\top A x\big).
$$

A type grows exactly when it does better than average. Basic facts:

- The simplex and each of its faces are invariant: a type that is absent stays absent.
- Adding a constant to any column of $A$ leaves the dynamics unchanged, and multiplying $A$ by $\lambda > 0$ only rescales time.
- The dynamics are **myopic and backward-looking**. Fitness is evaluated against the *current* state, and nobody solves a forward-looking problem. There is no value function and no HJB equation. Compare a mean field game, where each agent optimizes against the anticipated future flow of the population.

### Rest points and Nash equilibria

Hofbauer and Sigmund's "folk theorem" relates the dynamics to static concepts.

1. Every symmetric Nash equilibrium is a rest point: strategies in the support all earn the maximal payoff, which then equals the mean, and strategies outside it have $x_i = 0$.
2. The converse fails. Every vertex is a rest point, even when the pure strategy is not a best reply to itself. All-Dove in Hawk–Dove is an example, since a Hawk earns $V > V/2$ there.
3. A **Lyapunov-stable** rest point is a Nash equilibrium.
4. If an interior orbit converges, its limit is a Nash equilibrium.
5. A strict Nash equilibrium is asymptotically stable.
6. An **ESS is asymptotically stable** (Taylor–Jonker 1978), and an interior ESS attracts every interior orbit. See [the KL Lyapunov function](#/note/replicator-kl-lyapunov).

Nash equilibria need not be attractors. The mixed equilibrium of the [Stag Hunt](#/note/stag-hunt-risk-dominance) is a repeller. Along every interior orbit, the frequency of a strictly dominated strategy tends to $0$.

### Symmetric payoffs: a gradient flow

If $A$ is symmetric (a partnership game), then

$$
\frac{d}{dt}\,x^\top A x = 2\operatorname{Var}_x(f) \ge 0,
$$

which is **Fisher's fundamental theorem**: mean fitness increases. More precisely, the replicator equation is the gradient ascent of $\tfrac12 x^\top A x$ for the **Shahshahani metric** $\langle \xi,\eta\rangle_x = \sum_i \xi_i\eta_i/x_i$ on the tangent space $\{\sum_i \xi_i = 0\}$. Indeed, the gradient of $V$ in this metric is $x_i(\partial_i V - \sum_j x_j\partial_j V)$, and $\partial_i(\tfrac12 x^\top Ax) = (Ax)_i$.

The Shahshahani metric is the **Fisher–Rao metric** on probability vectors. So for symmetric games the replicator equation is a Fisher–Rao gradient flow, while the Fokker–Planck equation is a Wasserstein gradient flow. This is the population version of a [potential game](#/note/potential-games).

### Links to other fields

- **Lotka–Volterra.** The replicator equation for $n$ types is equivalent to a Lotka–Volterra system for $n-1$ species (Hofbauer 1981). See [the transformation](#/note/replicator-lotka-volterra).
- **Learning.** The same equation arises from imitation and from reinforcement learning, with no reproduction. See [where the replicator equation comes from](#/note/replicator-microfoundations).

## Cards

Q: Write the replicator equation for a symmetric game with payoff matrix $A$.
A: $\dot x_i = x_i\big((Ax)_i - x^\top A x\big)$, for $x$ in the simplex. Type $i$ grows exactly when its payoff beats the population average.
See: The replicator equation

Q: In what sense are the replicator dynamics myopic, compared with a mean field game?
A: Fitness is evaluated against the *current* population state, and nobody solves a forward-looking problem. There is no value function or HJB equation. In an MFG each agent optimizes against the anticipated future distribution.
See: The replicator equation

Q: Are rest points of the replicator dynamics always Nash equilibria? Give the precise relationship.
A: No. Every symmetric Nash equilibrium is a rest point, but not conversely: every vertex is a rest point, even if that pure strategy is not a best reply to itself. Lyapunov-stable rest points and limits of interior orbits *are* Nash equilibria.
See: Rest points and Nash equilibria

Q: Why is every symmetric Nash equilibrium a rest point of the replicator dynamics?
A: Strategies in the support all earn the maximal payoff, which therefore equals the mean $x^\top Ax$, so their bracket vanishes. Strategies outside the support have $x_i = 0$.
See: Rest points and Nash equilibria

Q: State Fisher's fundamental theorem in replicator form. When does it hold?
A: When $A$ is symmetric (partnership games): $\frac{d}{dt}(x^\top A x) = 2\operatorname{Var}_x(f)\ge0$, so mean fitness increases along orbits.
See: Symmetric payoffs: a gradient flow

Q: For symmetric $A$, the replicator equation is a gradient flow of what, in which metric?
A: Gradient ascent of $\tfrac12 x^\top A x$ in the Shahshahani metric $\langle\xi,\eta\rangle_x = \sum_i \xi_i\eta_i/x_i$, which is the Fisher–Rao metric. Compare Fokker–Planck, a Wasserstein gradient flow.
See: Symmetric payoffs: a gradient flow

Q: What happens to a strictly dominated strategy under the replicator dynamics?
A: Its frequency tends to $0$ along every interior orbit.
See: Rest points and Nash equilibria

## Quiz

Q: Which statement about the replicator dynamics is **false**?
- [ ] Every ESS is asymptotically stable.
- [x] Every rest point is a Nash equilibrium.
- [ ] Every strict Nash equilibrium is asymptotically stable.
- [ ] Faces of the simplex are invariant.
E: Pure states (vertices) are always rest points, because a type that is absent cannot grow. They need not be equilibria. For example, all-Dove is a rest point of Hawk–Dove but not a Nash equilibrium.
See: Rest points and Nash equilibria

Q: Adding the same constant $c_j$ to every entry of column $j$ of $A$…
- [x] does not change the replicator dynamics
- [ ] rescales time
- [ ] changes which states are rest points
- [ ] makes $A$ symmetric
E: Both $(Ax)_i$ and $x^\top A x$ increase by $\sum_j c_j x_j$, so the difference is unchanged.
See: The replicator equation

Q: For a symmetric payoff matrix, the replicator equation is a gradient flow with respect to…
- [x] the Shahshahani (Fisher–Rao) metric
- [ ] the Wasserstein-2 metric
- [ ] the Euclidean metric on the simplex
- [ ] the Hessian metric of $x^\top A x$
E: The metric $\sum_i \xi_i\eta_i/x_i$ is the Fisher information metric. The Wasserstein metric is the one for which Fokker–Planck is a gradient flow.
See: Symmetric payoffs: a gradient flow
