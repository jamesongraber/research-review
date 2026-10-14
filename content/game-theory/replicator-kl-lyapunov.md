---
title: Relative entropy as a Lyapunov function for replicator dynamics
tags: [evolutionary-game-theory, replicator-dynamics, lyapunov-functions, kl-divergence, rock-paper-scissors]
created: 2026-07-22
related: [replicator-dynamics, evolutionarily-stable-strategies, replicator-lotka-volterra, permanence-heteroclinic-cycles, replicator-microfoundations]
source: "Claude conversation: Daily evolutionary game theory course (2026-07), part 4: n-strategy dynamics"
---

## Article

Part 4 of the evolutionary game theory course moves to $n \ge 3$ strategies. The first tool is a Lyapunov function, which also proves that an [ESS](#/note/evolutionarily-stable-strategies) is asymptotically stable.

### The function

Let $x^*$ be an interior rest point. Take the relative entropy

$$
V(x) = \sum_i x_i^* \ln\frac{x_i^*}{x_i} = D_{\mathrm{KL}}(x^*\,\|\,x).
$$

By Gibbs' inequality, $V \ge 0$ with equality only at $x = x^*$, and $V \to \infty$ at the boundary.

### The computation

Since $\dot x_i / x_i = (Ax)_i - x^\top A x$ and $\sum_i x_i^* = 1$,

$$
\dot V = -\sum_i x_i^*\frac{\dot x_i}{x_i} = x^\top A x - x^{*\top} A x.
$$

Now use that $x^*$ is an interior equilibrium: $Ax^* = c\,\mathbf 1$ (indifference), so $x^\top A x^* = c = x^{*\top}Ax^*$ for every $x$ in the simplex. Adding and subtracting these gives

$$
\dot V = (x - x^*)^\top A\,(x - x^*).
$$

The condition used is $Ax^* = c\mathbf 1$, a condition on the rows of $A$. (The original chat stated it as "$x^{*\top}Ax = x^{*\top}Ax^*$ for all $x$", which is a condition on $A^\top x^*$ and not the one the computation needs.)

### Negative definiteness is the ESS condition

For interior $x^*$ and any $y$ in the simplex, $(x^*-y)^\top A x^* = 0$, so

$$
u(x^*,y) - u(y,y) = (x^*-y)^\top A y = -(y-x^*)^\top A (y-x^*).
$$

So an interior $x^*$ is an ESS iff $\xi^\top A \xi < 0$ for all nonzero $\xi$ in the tangent space $\{\sum_i \xi_i = 0\}$, i.e. $A$ is **negative definite on the tangent space**. This is the $n$-strategy form of the tiebreaker. Then $\dot V < 0$ away from $x^*$, and an interior ESS attracts every interior orbit.

For a PDE person: $(x-y)^\top\big(Ax - Ay\big) \le 0$ for the payoff field $F(x) = Ax$ is a monotonicity condition. Games with this property are called **stable games**. For costs instead of payoffs, the sign flips and it is the Lasry–Lions monotonicity condition, which gives uniqueness of MFG equilibria.

### Rock–Paper–Scissors: a conserved quantity

With rows and columns Rock, Paper, Scissors (win $1$, lose $-1$),

$$
A = \begin{pmatrix} 0 & -1 & 1 \\ 1 & 0 & -1 \\ -1 & 1 & 0 \end{pmatrix}.
$$

$A$ is skew-symmetric, so $x^\top A x = 0$ for all $x$, and $Ax^* = 0$ at $x^* = (\tfrac13,\tfrac13,\tfrac13)$. Hence $\dot V \equiv 0$: $V = -\ln 3 - \tfrac13\sum_i \ln x_i$ is conserved, or equivalently **$x_1x_2x_3$ is constant** along orbits. Orbits are the closed level curves around $x^*$, so $x^*$ is a center. It is Nash but not an ESS: for any $y$, $u(x^*,y) = 0 = u(y,y)$, a dead tie.

### Generalized RPS: win $w$, lose $l$

Replace the payoffs by $w > 0$ for a win and $-l < 0$ for a loss. On the tangent space the symmetric part of $A$ gives $\xi^\top A\xi = -\tfrac12(w-l)\,|\xi|^2$. So:

- $w > l$: $A$ is negative definite on the tangent space, $x^*$ is an ESS, and every interior orbit spirals into it;
- $w = l$: the zero-sum center above;
- $w < l$: $\dot V > 0$, so orbits spiral outward toward the boundary, approaching a [heteroclinic cycle](#/note/permanence-heteroclinic-cycles).

The exact center is non-generic: any perturbation of $w = l$ tips it one way or the other.

## Cards

Q: Give the KL-divergence Lyapunov function for the replicator dynamics and its derivative.
A: For an interior equilibrium $x^*$ (so $Ax^* = c\mathbf 1$), $V(x) = \sum_i x_i^*\ln(x_i^*/x_i) = D_{\mathrm{KL}}(x^*\|x)$. Along trajectories $\dot V = (x-x^*)^\top A(x-x^*)$.
See: The computation

Q: In computing $\dot V$ for the KL Lyapunov function, where is the fact that $x^*$ is an interior equilibrium used?
A: $\dot V = x^\top Ax - x^{*\top}Ax$ in general. Indifference, $Ax^* = c\mathbf 1$, gives $x^\top Ax^* = x^{*\top}Ax^* = c$, which turns $\dot V$ into the quadratic form $(x-x^*)^\top A(x-x^*)$.
See: The computation

Q: What is the link between negative definiteness of $A$ and the ESS condition for an interior equilibrium?
A: For interior $x^*$, $u(x^*,y)-u(y,y) = -(y-x^*)^\top A(y-x^*)$. So $x^*$ is an ESS iff $A$ is negative definite on the tangent space $\{\sum\xi_i=0\}$. The same quadratic form is $\dot V$, which proves an interior ESS attracts all interior orbits.
See: Negative definiteness is the ESS condition

Q: How does the condition "$A$ negative semidefinite on the tangent space" relate to MFG theory?
A: It says the payoff field $F(x) = Ax$ is monotone: $(x-y)^\top(F(x)-F(y)) \le 0$ ("stable games"). For costs the sign flips, giving Lasry–Lions monotonicity, the standard uniqueness condition.
See: Negative definiteness is the ESS condition

Q: Rock–Paper–Scissors (zero-sum): what does the KL Lyapunov function do, and why?
A: $A$ is skew-symmetric, so $x^\top Ax \equiv 0$, and $Ax^* = 0$. Hence $\dot V \equiv 0$: $V$ is conserved, and the orbits are closed level curves around $(1/3,1/3,1/3)$.
See: Rock–Paper–Scissors: a conserved quantity

Q: What simple quantity is conserved by the replicator dynamics of zero-sum Rock–Paper–Scissors?
A: The product $x_1x_2x_3$, since $V = -\ln 3 - \tfrac13\sum_i\ln x_i$ is conserved.
See: Rock–Paper–Scissors: a conserved quantity

Q: In Rock–Paper–Scissors with win payoff $w$ and loss payoff $-l$, how does the fate of the interior equilibrium depend on $w$ and $l$?
A: On the tangent space $\xi^\top A\xi = -\tfrac12(w-l)|\xi|^2$. If $w > l$ it is an ESS and globally attracting, if $w = l$ a center, and if $w < l$ orbits spiral out toward the boundary.
See: Generalized RPS: win w, lose l

## Quiz

Q: Along the replicator dynamics, with $Ax^* = c\mathbf 1$, the KL Lyapunov function $V = D_{\mathrm{KL}}(x^*\|x)$ satisfies…
- [x] $\dot V = (x-x^*)^\top A(x-x^*)$
- [ ] $\dot V = -(x-x^*)^\top A(x-x^*)$
- [ ] $\dot V = x^\top Ax$
- [ ] $\dot V = -2\operatorname{Var}_x(Ax)$
E: $\dot V = -\sum_i x_i^*[(Ax)_i - x^\top Ax] = x^\top Ax - x^{*\top}Ax$, and indifference lets you subtract $x^\top Ax^* - x^{*\top}Ax^* = 0$. Negative definite $A$ then gives $\dot V < 0$.
See: The computation

Q: Rock–Paper–Scissors with win payoff $1$ and loss payoff $-2$. Interior orbits of the replicator dynamics…
- [x] spiral outward toward a cycle on the boundary
- [ ] converge to $(1/3,1/3,1/3)$
- [ ] are closed curves around $(1/3,1/3,1/3)$
- [ ] converge to a vertex
E: $w = 1 < l = 2$, so $\xi^\top A\xi > 0$ on the tangent space and the KL divergence from $x^*$ increases. Orbits approach the heteroclinic cycle Rock → Paper → Scissors → Rock.
See: Generalized RPS: win w, lose l

Q: Which quantity is constant along orbits of zero-sum Rock–Paper–Scissors?
- [x] $x_1x_2x_3$
- [ ] $x_1x_2 + x_2x_3 + x_3x_1$
- [ ] $\max_i x_i$
- [ ] $x_1^2 + x_2^2 + x_3^2$
E: $\dot V = 0$ for $V = -\ln 3 - \frac13\sum_i \ln x_i$. The second and fourth options are equivalent to each other, since $\sum x_i = 1$, and they are not conserved.
See: Rock–Paper–Scissors: a conserved quantity
