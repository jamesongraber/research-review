---
title: "Discounted stationary MFG: monotonicity gives neither uniqueness nor E-stability"
tags: [mean-field-games, monotonicity, uniqueness, e-stability, degree-theory]
created: 2026-08-07
related: [moll-ryzhik-learning-mfg, adaptive-learning-e-stability, infinite-horizon-vs-steady-state, potential-games, supermodular-games, replicator-kl-lyapunov]
source: "Claude conversation: MFG without rational expectations, et al (2026-08). The counterexamples are the owner's."
---

## Article

Claude conjectured: *for an infinite-horizon MFG with low-dimensional coupling and no common noise, Lasry–Lions monotonicity plus uniform ergodicity implies that constant-belief learning converges to the unique stationary equilibrium, with monotonicity supplying E-stability.* The owner showed this is **false**. Even under monotonicity, the discounted stationary MFG can have **several solutions**, and the same idea shows the derivative of the [T-map](#/note/moll-ryzhik-learning-mfg) can be **arbitrarily large**, so E-stability fails.

### The Lasry–Lions computation with a discount

Take the stationary discounted system (rewards are maximized, $H$ is convex in $\nabla u$, and the coupling $F$ is monotone: $\int (F(m_1) - F(m_2))\,d(m_1 - m_2) \le 0$):
$$
\rho u_i = H(x, \nabla u_i) + F(x, m_i) + \nu\Delta u_i, \qquad 0 = -\operatorname{div}\big(H_p(x,\nabla u_i)\,m_i\big) + \nu\Delta m_i.
$$
Subtract the HJBs, integrate against $m_1 - m_2$, and remove the Laplacian using each Fokker–Planck equation tested against $u_1 - u_2$. The result is
$$
\rho\!\int (u_1 - u_2)\,d(m_1 - m_2) = -\!\int\! B_1\,dm_1 - \!\int\! B_2\,dm_2 + \!\int\!\big(F(m_1) - F(m_2)\big)\,d(m_1 - m_2),
$$
where $B_1 = H(\nabla u_2) - H(\nabla u_1) - H_p(\nabla u_1)\cdot(\nabla u_2 - \nabla u_1) \ge 0$ and symmetrically $B_2 \ge 0$, by convexity. The right side is a sum of three nonpositive terms.

- **Ergodic case** ($\rho = 0$, with an ergodic constant): the left side is $0$, because $u$ is defined up to a constant and the constant pairs with $\int d(m_1 - m_2) = 0$. So all three terms vanish, which gives uniqueness.
- **Discounted case:** the left side $\rho\int(u_1 - u_2)\,d(m_1 - m_2)$ has no sign. All that survives is
$$
\int (u_1 - u_2)\,d(m_1 - m_2) \le 0,
$$
a constraint on pairs of equilibria but not uniqueness. The $\rho u$ term has no counterpart in the stationary Fokker–Planck equation, so the two operators are no longer adjoint and monotonicity has nothing to cancel against.

### Why the time-dependent problem is still unique

For the infinite-horizon *initial-value* problem ($m_0$ given, $u$ bounded), uniqueness under monotonicity holds (the owner's paper with Sircar). The same computation shows why: for $-\partial_t u + \rho u = H + F + \nu\Delta u$, the $\rho$ terms cancel in
$$
\frac{d}{dt}\Big[e^{-\rho t}\!\int (u_1 - u_2)\,d(m_1 - m_2)\Big] = e^{-\rho t}\Big[\int B_1\,dm_1 + \int B_2\,dm_2 - \int (F(m_1) - F(m_2))\,d(m_1 - m_2)\Big] \ge 0.
$$
The quantity being differentiated is $0$ at $t = 0$ (same $m_0$) and tends to $0$ as $t \to \infty$ (bounded $u$), so the nonnegative integrand vanishes and every term is zero. Two stationary solutions with different $m$ have different initial data, so they don't contradict this.

### Multiplicity forces E-instability (the degree lemma)

Let $T$ map a ball $B \subset \mathbb R^\ell$ into itself with no fixed points on $\partial B$. At an E-stable fixed point every eigenvalue of $DT$ has real part $< 1$, so every eigenvalue of $I - DT$ has positive real part. Then $\det(I - DT) > 0$ (complex eigenvalues come in conjugate pairs), and the fixed-point index is $+1$. The homotopy $x - sT(x)$, $s \in [0,1]$, has no zeros on $\partial B$, so the total index is $\deg(I - T, B, 0) = 1$. Hence:

**If every fixed point were E-stable, there would be exactly one.** Multiplicity forces at least one equilibrium that is not E-stable.

The converse holds only in one dimension. If $T$ maps an interval into itself (no fixed points at the endpoints) and $T'(\bar p) > 1$ at a fixed point, then $T(p) - p$ changes sign from $-$ to $+$ at $\bar p$, so there is another fixed point. In dimension $\ge 2$, two eigenvalues of $DT$ with real part $> 1$ still give index $+1$, so an E-unstable equilibrium can be unique.

### Why monotonicity can't give E-stability

Linearize the identity at one equilibrium: what survives is $\rho\int \delta u\,\delta m \le 0$. That is **one scalar sign condition**. E-stability is a spectral condition on the $\ell \times \ell$ matrix $DT$. A single scalar pairing cannot bound an operator, so $T'$ is free to be large. Monotonicity constrains a pairing, not a magnitude, and the discount has already corrupted that pairing.

### What may survive (conjectural)

- **Ergodic case ($\rho = 0$):** the duality closes, and the original conjecture may hold there.
- **Small $\rho$:** the defect is $O(\rho)$. The chat suggested that for $\rho$ below a threshold depending on the spectral gap of the frozen Fokker–Planck operator and bounds on $F$ and $D^2H$, both uniqueness and E-stability might return: "monotone and patient enough implies unique and learnable." This is unproven. The threshold would measure how impatient agents can be before the population can no longer find its equilibrium.
- On the positive side, E-stability is now a **nontrivial selection principle**: monotone discounted MFGs can have several stationary equilibria, and the degree count says at least one of them is not learnable.

## Cards

Q: In the Lasry–Lions computation for the discounted stationary MFG, what replaces "$0 = $ (three nonpositive terms)"?
A: $\rho\int(u_1 - u_2)\,d(m_1 - m_2) = -(\text{convexity term}) - (\text{convexity term}) + (\text{monotonicity term})$. The left side has no sign, so nothing forces the terms to vanish.
See: The Lasry–Lions computation with a discount

Q: Why does Lasry–Lions uniqueness work for the ergodic MFG but fail for the discounted stationary MFG?
A: In the ergodic case the pairing side is $0$ ($u$ is defined up to a constant, and $\int d(m_1 - m_2) = 0$). With $\rho > 0$ the term $\rho u$ has no counterpart in the Fokker–Planck equation, so the operators aren't adjoint and $\rho\int(u_1 - u_2)\,d(m_1 - m_2)$ has no sign.
See: The Lasry–Lions computation with a discount

Q: Under monotonicity, what constraint does survive between two discounted stationary equilibria?
A: $\int (u_1 - u_2)\,d(m_1 - m_2) \le 0$.
See: The Lasry–Lions computation with a discount

Q: Why is the discounted *initial-value* MFG unique under monotonicity, even though the stationary problem isn't?
A: The weight $e^{-\rho t}$ cancels the $\rho$ terms: $\frac{d}{dt}[e^{-\rho t}\int (u_1 - u_2)\,d(m_1 - m_2)] \ge 0$, and this quantity is $0$ at $t = 0$ (same $m_0$) and at $t = \infty$ (bounded $u$).
See: Why the time-dependent problem is still unique

Q: Why does an E-stable fixed point of $T$ have fixed-point index $+1$?
A: All eigenvalues of $DT$ have real part $< 1$, so those of $I - DT$ have positive real part. Then $\det(I - DT) > 0$, since complex eigenvalues come in conjugate pairs.
See: Multiplicity forces E-instability (the degree lemma)

Q: $T$ maps a ball into itself with several fixed points. Why can't all of them be E-stable?
A: The total index is $\deg(I - T, B, 0) = 1$ (homotopy to the identity). Each E-stable fixed point contributes $+1$, so all E-stable would mean exactly one fixed point.
See: Multiplicity forces E-instability (the degree lemma)

Q: Does Lasry–Lions monotonicity imply E-stability of a discounted stationary MFG equilibrium?
A: No. Linearized, monotonicity gives only one scalar sign condition, $\rho\int\delta u\,\delta m \le 0$, which cannot bound the spectrum of $DT$. Examples (the owner's) have $T'$ arbitrarily large.
See: Why monotonicity can't give E-stability

Q: Does E-instability force multiple equilibria?
A: In one dimension yes: if $T'(\bar p) > 1$ and $T$ maps an interval into itself, $T(p) - p$ must cross zero again. In dimension $\ge 2$ no: two eigenvalues with real part $> 1$ still give index $+1$.
See: Multiplicity forces E-instability (the degree lemma)

## Quiz

Q: For the discounted stationary MFG with monotone coupling, which is true?
- [ ] The stationary solution is unique, as in the ergodic case.
- [x] There can be several stationary solutions, but any two satisfy $\int (u_1 - u_2)\,d(m_1 - m_2) \le 0$.
- [ ] Uniqueness fails only if $H$ is not convex.
- [ ] Uniqueness fails for the initial-value problem as well.
E: The $\rho u$ term breaks the duality in the stationary problem only. In the IVP the factor $e^{-\rho t}$ restores it.
See: The Lasry–Lions computation with a discount

Q: $T : B \to B$ (closed ball in $\mathbb R^\ell$) has three nondegenerate fixed points and none on $\partial B$. Then…
- [ ] all three can be E-stable
- [x] at least one is not E-stable
- [ ] exactly two are E-stable
- [ ] none is E-stable
E: The indices sum to $1$ and E-stable points have index $+1$. With three, at least one has index $-1$. Nothing forces exactly two: in dimension $\ge 2$ an index $+1$ point can still be E-unstable.
See: Multiplicity forces E-instability (the degree lemma)

Q: Why does the time-dependent infinite-horizon problem stay unique under monotonicity?
- [ ] Because its solution is always stationary
- [x] Because $e^{-\rho t}\int(u_1-u_2)\,d(m_1-m_2)$ is monotone in $t$ and vanishes at $t=0$ and $t=\infty$
- [ ] Because $\rho$ can be absorbed into $H$
- [ ] Because the HJB has a terminal condition at a finite $T$
E: The same initial datum makes the pairing $0$ at $t = 0$, and boundedness kills it at infinity.
See: Why the time-dependent problem is still unique
