---
title: Replicator dynamics as Lotka–Volterra
tags: [evolutionary-game-theory, replicator-dynamics, lotka-volterra, population-dynamics]
created: 2026-07-22
related: [replicator-dynamics, replicator-kl-lyapunov, permanence-heteroclinic-cycles]
source: "Claude conversation: Daily evolutionary game theory course (2026-07), part 4: n-strategy dynamics"
---

## Article

Part 4 of the evolutionary game theory course. The [replicator equation](#/note/replicator-dynamics) for $n$ strategies lives on the $(n-1)$-dimensional simplex. A change of variables plus a change of time turns it into a Lotka–Volterra system for $n-1$ species on the positive orthant, with no constraint (Hofbauer 1981).

### The change of variables

Pick strategy $n$ as reference and set $y_i = x_i/x_n$ for $i < n$: the odds of strategy $i$ against strategy $n$. This maps the interior of $\Delta^{n-1}$ diffeomorphically onto $\mathbb R^{n-1}_{+}$, with inverse $x_n = 1/(1+\sum_k y_k)$ and $x_i = y_i x_n$. By the quotient rule,

$$
\dot y_i = y_i\left(\frac{\dot x_i}{x_i} - \frac{\dot x_n}{x_n}\right) = y_i\big((Ax)_i - (Ax)_n\big).
$$

The mean-fitness term $x^\top A x$ is the same for every $i$, so it **cancels**. That cancellation is the whole trick.

### Back to Lotka–Volterra

Since $(Ax)_i = x_n\big(\sum_{j<n} A_{ij}y_j + A_{in}\big)$,

$$
(Ax)_i - (Ax)_n = x_n\Big(r_i + \sum_{j=1}^{n-1} b_{ij}\,y_j\Big), \qquad r_i = A_{in} - A_{nn},\quad b_{ij} = A_{ij} - A_{nj}.
$$

The factor $x_n > 0$ is common to all equations. Rescaling time by $d\tau = x_n\,dt$ changes the speed along orbits but not the orbits themselves or their stability, and gives

$$
\frac{dy_i}{d\tau} = y_i\Big(r_i + \sum_{j=1}^{n-1} b_{ij}\,y_j\Big),
$$

a Lotka–Volterra system with growth rates $r_i$ and interaction matrix $b$. Conversely, every Lotka–Volterra system arises this way: take $A$ with last row zero, $A_{ij} = b_{ij}$ and $A_{in} = r_i$.

### Why it is useful

Results transfer in both directions: permanence theory, competitive exclusion, first integrals, classification of phase portraits. In particular three-strategy replicator dynamics is the same as two-species Lotka–Volterra, and $n \ge 4$ strategies give three or more species, where chaos becomes possible (see [permanence](#/note/permanence-heteroclinic-cycles)).

### Example: Rock–Paper–Scissors

With the RPS matrix from the [KL note](#/note/replicator-kl-lyapunov) (order Rock, Paper, Scissors) and Scissors as reference: $r = (1,-1)$ and $b = \begin{pmatrix} 1 & -2\\ 2 & -1\end{pmatrix}$, so

$$
y_1' = y_1(1 + y_1 - 2y_2), \qquad y_2' = y_2(-1 + 2y_1 - y_2),
$$

with interior equilibrium $(1,1)$. The conserved quantity $x_1x_2x_3$ becomes

$$
H(y) = \frac{y_1y_2}{(1+y_1+y_2)^3}.
$$

The original chat claimed the first integral has Volterra's separable form $\sum_i c_i(y_i - \ln y_i)$. That is wrong here, as a numerical check confirms: the separable form needs a skew-symmetric interaction matrix after diagonal scaling, and this $b$ has nonzero diagonal. The correct invariant is $H$, which is just the KL function written in the new coordinates.

## Cards

Q: State the Lotka–Volterra transformation of the replicator equation.
A: Set $y_i = x_i/x_n$ for $i < n$. Then $\dot y_i = y_i[(Ax)_i - (Ax)_n] = x_n\,y_i[r_i + \sum_j b_{ij}y_j]$ with $r_i = A_{in}-A_{nn}$ and $b_{ij} = A_{ij}-A_{nj}$. Rescaling time by $d\tau = x_n\,dt$ gives Lotka–Volterra with $n-1$ species.
See: Back to Lotka–Volterra

Q: In the Lotka–Volterra transformation, why does the mean fitness $x^\top Ax$ drop out?
A: $\dot y_i / y_i = \dot x_i/x_i - \dot x_n/x_n$, and $x^\top Ax$ appears identically in both terms.
See: The change of variables

Q: Why doesn't the time change $d\tau = x_n\,dt$ affect the phase portrait?
A: It multiplies the vector field by the same positive scalar in every component. Orbits, their direction, rest points and stability are unchanged, and only the speed changes.
See: Back to Lotka–Volterra

Q: Why is the replicator ↔ Lotka–Volterra equivalence useful?
A: It is a diffeomorphism of the open simplex onto the positive orthant plus an orbit-preserving time change, so permanence theory, competitive-exclusion results and first integrals transfer both ways. Every $(n-1)$-species Lotka–Volterra system lifts to an $n$-strategy replicator system.
See: Why it is useful

Q: In the Lotka–Volterra coordinates $y_i = x_i/x_3$, what is the conserved quantity of zero-sum Rock–Paper–Scissors?
A: $H = y_1y_2/(1+y_1+y_2)^3$, which is $x_1x_2x_3$ rewritten. It is not of Volterra's separable form $\sum c_i(y_i - \ln y_i)$.
See: Example: Rock–Paper–Scissors

## Quiz

Q: The replicator equation for $n$ strategies is orbit-equivalent to a Lotka–Volterra system with how many species?
- [x] $n-1$
- [ ] $n$
- [ ] $n+1$
- [ ] $2n$
E: The odds ratios $y_i = x_i/x_n$, $i<n$, are free positive coordinates on the open simplex.
See: The change of variables

Q: In the transformed system $\dot y_i = y_i(r_i + \sum_j b_{ij}y_j)$, what are $r_i$ and $b_{ij}$?
- [x] $r_i = A_{in}-A_{nn}$, $b_{ij} = A_{ij}-A_{nj}$
- [ ] $r_i = A_{ii}-A_{nn}$, $b_{ij} = A_{ij}-A_{in}$
- [ ] $r_i = A_{ni}-A_{nn}$, $b_{ij} = A_{ij}-A_{jn}$
- [ ] $r_i = A_{in}$, $b_{ij} = A_{ij}$
E: Write $(Ax)_i - (Ax)_n = x_n\big(\sum_j (A_{ij}-A_{nj})y_j + A_{in} - A_{nn}\big)$, using $x_j = y_jx_n$.
See: Back to Lotka–Volterra
