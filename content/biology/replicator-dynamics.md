---
title: Replicator dynamics and ESS
tags: [evolutionary-game-theory, ode, stability]
created: 2026-10-13
related: [potential-games]
source: "Sample note. Evolutionary game theory as a bridge between biology and game theory."
---

## Article

A large population consists of $n$ types. Let $x \in \Delta^{n-1}$ be the vector of type frequencies. Individuals are randomly matched and play a symmetric game with payoff matrix $A$. A type-$i$ individual's **fitness** is its expected payoff $f_i(x) = (Ax)_i$, and the population mean is $\bar f(x) = x^\top A x$. If types reproduce in proportion to fitness, frequencies follow the **replicator equation**

$$
\dot x_i = x_i\big((Ax)_i - x^\top A x\big).
$$

A type grows exactly when it does better than average. The simplex and each of its faces are invariant: a type that is absent stays absent. Adding a constant to any column of $A$ leaves the dynamics unchanged.

### Evolutionarily stable strategies

A population state $x^*$ is an **ESS** (Maynard Smith–Price, 1973) if for every mutant $y \neq x^*$, either $y^\top A x^* < x^{*\top} A x^*$, or the two are equal and $x^{*\top} A y > y^\top A y$. In words, the resident does strictly better against itself than the mutant does. If there is a tie, the resident does better against the mutant than the mutant does against itself.

### The "folk theorem" of evolutionary game theory

Hofbauer and Sigmund relate the dynamics to static concepts:

1. Every symmetric Nash equilibrium is a rest point. The converse fails: every vertex is a rest point.
2. A **Lyapunov-stable** rest point is a Nash equilibrium.
3. If an interior orbit converges, its limit is a Nash equilibrium.
4. A strict Nash equilibrium is asymptotically stable.
5. An **ESS is asymptotically stable** (Taylor–Jonker 1978). An interior ESS attracts every interior orbit.

### Example: Hawk–Dove

Animals contest a resource of value $V$, and fighting costs $C > V$. Hawks escalate and Doves retreat. Payoffs are $H$ vs $H$: $(V-C)/2$, $H$ vs $D$: $V$, $D$ vs $H$: $0$, and $D$ vs $D$: $V/2$. Setting $f_H = f_D$ gives the unique interior ESS with hawk frequency $p^* = V/C$. When fighting is very costly, hawks are rare, but they never disappear.

### Links to other fields

- **Fisher's fundamental theorem.** If $A$ is symmetric, then $\frac{d}{dt}\bar f = 2\operatorname{Var}_x(f) \ge 0$. Mean fitness is a Lyapunov function, and the dynamics are a gradient flow of $\tfrac12 x^\top A x$ for the Shahshahani metric. This is the evolutionary counterpart of a [potential game](#/note/potential-games).
- **Lotka–Volterra.** The replicator equation for $n$ types is equivalent to a Lotka–Volterra system for $n-1$ species (Hofbauer 1981).
- **Economics.** The same equation arises from *imitation* (Schlag 1998): agents copy better-performing agents with probability proportional to the payoff difference. No reproduction is needed.

## Cards

Q: Write the replicator equation for a symmetric game with payoff matrix $A$.
A: $\dot x_i = x_i\big((Ax)_i - x^\top A x\big)$, for $x$ in the simplex.

Q: Define an **evolutionarily stable strategy** $x^*$.
A: For all $y \ne x^*$: either $y^\top A x^* < x^{*\top}Ax^*$, or equality holds and $x^{*\top}Ay > y^\top A y$.

Q: Are rest points of the replicator dynamics always Nash equilibria? Give the precise relationship.
A: No. Every Nash equilibrium is a rest point, but not every rest point is one: each vertex is a rest point. Lyapunov-stable rest points and limits of interior orbits *are* Nash equilibria.

Q: What is the ESS of Hawk–Dove with resource value $V$ and fight cost $C > V$?
A: The mixed state with hawk frequency $p^* = V/C$, found by equating $f_H = p\frac{V-C}{2} + (1-p)V$ and $f_D = (1-p)\frac V2$.

Q: State Fisher's fundamental theorem in replicator form. When does it hold?
A: When $A$ is symmetric (partnership games): $\frac{d}{dt}(x^\top A x) = 2\operatorname{Var}_x(f)\ge0$, so mean fitness increases along orbits.

Q: How can the replicator equation arise without biological reproduction?
A: From imitation. Agents meet others and switch to their strategy with probability proportional to how much better it pays (Schlag's proportional imitation rule).

## Quiz

Q: Which statement about the replicator dynamics is **false**?
- [ ] Every ESS is asymptotically stable.
- [x] Every rest point is a Nash equilibrium.
- [ ] Every strict Nash equilibrium is asymptotically stable.
- [ ] Faces of the simplex are invariant.
E: Pure states (vertices) are always rest points, because a type that is absent cannot grow. They need not be equilibria. For example, all-Dove is a rest point of Hawk–Dove but not a Nash equilibrium.

Q: In Hawk–Dove with $V = 2$ and $C = 8$, what fraction of the population plays Hawk at the ESS?
- [ ] $1/2$
- [x] $1/4$
- [ ] $3/4$
- [ ] $0$, because Doves take over when $C > V$
E: $p^* = V/C = 2/8 = 1/4$.

Q: Adding the same constant $c_j$ to every entry of column $j$ of $A$…
- [x] does not change the replicator dynamics
- [ ] rescales time
- [ ] changes which states are rest points
- [ ] makes $A$ symmetric
E: Both $(Ax)_i$ and $x^\top A x$ increase by $\sum_j c_j x_j$, so the difference is unchanged.
