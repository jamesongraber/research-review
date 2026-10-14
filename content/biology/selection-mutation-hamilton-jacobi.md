---
title: Dirac concentration and constrained Hamilton–Jacobi equations
tags: [cancer, hamilton-jacobi, viscosity-solutions, adaptive-dynamics, asymptotic-analysis]
created: 2026-08-25
related: [mathematical-oncology-landscape, cancer-somatic-evolution, adaptive-therapy-control, adaptive-dynamics, entropy-solutions-physical-entropy, hj-wasserstein-applications]
source: "Claude conversation: Mathematical modeling of cancer evolution (2026-08)"
---

## Article

This is the strand of evolution modeling closest to viscosity-solution theory. A population structured by a continuous trait evolves under selection and small mutations. In the limit the density concentrates on Dirac masses, whose positions are governed by a Hamilton–Jacobi equation with a constraint.

### The model

Let $n(t,x)$ be the density of individuals (cells) with trait $x \in \mathbb R^d$, for instance the expression level of a resistance gene. Each trait has a net growth rate $R(x, I)$ that depends on a competition pressure
$$
I(t) = \int \psi(x)\, n(t,x)\,dx, \qquad \psi > 0,\quad \partial_I R < 0 .
$$
Mutations act as a small diffusion in trait space. Take mutation variance $\varepsilon^2$ and rescale time by $1/\varepsilon$ to reach evolutionary time scales:
$$
\varepsilon\,\partial_t n_\varepsilon = n_\varepsilon\, R\big(x, I_\varepsilon(t)\big) + \varepsilon^2 \Delta n_\varepsilon .
$$

### Hopf–Cole and the limit

Write $n_\varepsilon = e^{u_\varepsilon/\varepsilon}$. Since $\varepsilon^2\Delta n_\varepsilon = n_\varepsilon\big(|\nabla u_\varepsilon|^2 + \varepsilon\Delta u_\varepsilon\big)$,
$$
\partial_t u_\varepsilon = R(x, I_\varepsilon) + |\nabla u_\varepsilon|^2 + \varepsilon\,\Delta u_\varepsilon .
$$
This is a viscous Hamilton–Jacobi equation, and $\varepsilon \to 0$ is a vanishing-viscosity limit. The limit $u$ is a viscosity solution of the **constrained Hamilton–Jacobi equation**
$$
\partial_t u = |\nabla u|^2 + R\big(x, I(t)\big), \qquad \max_x u(t,x) = 0 .
$$

### The constraint and the Lagrange multiplier

The total population stays bounded and bounded away from zero, so $I_\varepsilon(t)$ stays between positive constants. If $u > 0$ somewhere, $n_\varepsilon = e^{u/\varepsilon}$ would blow up. If $u < 0$ everywhere, $n_\varepsilon \to 0$. Hence $\max_x u = 0$. The function $I(t)$ is **not given**: it is the unknown that enforces the constraint, a Lagrange multiplier. This is what makes the problem nonstandard.

### Dirac concentration

Where $u < 0$, $n_\varepsilon \to 0$ exponentially. So the population concentrates on the zero set $\{u(t,\cdot) = 0\}$, the "fittest traits". If that set is a single point $\bar x(t)$, then $n_\varepsilon \rightharpoonup \bar\rho(t)\,\delta_{\bar x(t)}$. At that point $u = 0$ and $\nabla u = 0$, and $u(t, \bar x(t)) \equiv 0$ forces $\partial_t u = 0$. Therefore
$$
R\big(\bar x(t), I(t)\big) = 0 :
$$
the dominant trait is exactly at equilibrium with the competition it creates.

### The canonical equation

If $u$ is smooth and strictly concave near $\bar x$, differentiating $\nabla u(t, \bar x(t)) = 0$ in time gives
$$
\dot{\bar x}(t) = \big(-D^2 u(t,\bar x)\big)^{-1}\,\nabla_x R\big(\bar x(t), I(t)\big).
$$
The dominant trait climbs the selection gradient, weighted by the matrix $(-D^2u)^{-1}$. This is the **canonical equation of adaptive dynamics** (see [adaptive dynamics](#/note/adaptive-dynamics)), derived here from a PDE.

### What is proved

The citations below were recalled in the chat. They have not been checked, so verify them before citing.

- Formal derivation and HJ numerics, including jumps of the fittest trait: Diekmann, Jabin, Mischler, Perthame (2005).
- Convergence of $u_\varepsilon$ (along subsequences, under assumptions on $R$ and $\psi$) to a viscosity solution of the constrained HJ: Barles–Perthame (2008).
- Multidimensional Dirac dynamics and the canonical equation, under concavity assumptions: Lorz, Mirrahimi, Perthame (2011).
- **Uniqueness** of the constrained problem is delicate, because $I(t)$ is unknown and can be discontinuous. It is known under concavity-type assumptions: Mirrahimi–Roquejoffre (2016).
- Cancer version: Lorz, Lorenzi, Hochberg, Clairambault, Perthame (2013) take the trait to be a resistance level, include drug effects in $R$, and compare optimized dosing with maximum tolerated dose.
- Heterogeneous environments, with a stated link to weak KAM theory: Gandon–Mirrahimi (2017).

**Gap noted in the chat:** this theory treats the population as a density on $\mathbb R^d$ (usually $d = 1$ or $2$). Nobody has lifted it to an HJ equation *on* $\mathcal P(\mathbb R^d)$ with the whole trait distribution as the state (see [the landscape](#/note/mathematical-oncology-landscape)).

## Cards

Q: Write the rescaled selection–mutation equation behind Dirac concentration, and say what each term means.
A: $\varepsilon\partial_t n_\varepsilon = n_\varepsilon R(x, I_\varepsilon) + \varepsilon^2\Delta n_\varepsilon$. Here $x$ is the trait, $R$ the net growth rate, $I = \int\psi n$ the competition pressure, $\varepsilon^2\Delta$ small mutations, and the factor $\varepsilon$ on $\partial_t$ a rescaling to long evolutionary times.
See: The model

Q: What substitution turns the selection–mutation equation into a Hamilton–Jacobi equation, and what equation results?
A: Hopf–Cole: $n_\varepsilon = e^{u_\varepsilon/\varepsilon}$. Then $\partial_t u_\varepsilon = R(x,I_\varepsilon) + |\nabla u_\varepsilon|^2 + \varepsilon\Delta u_\varepsilon$, a viscous HJ equation with vanishing viscosity.
See: Hopf–Cole and the limit

Q: What is the constrained Hamilton–Jacobi equation for selection–mutation dynamics?
A: $\partial_t u = |\nabla u|^2 + R(x, I(t))$ with $\max_x u(t,x) = 0$, where $I(t)$ is an unknown Lagrange multiplier chosen to enforce the constraint.
See: Hopf–Cole and the limit

Q: Why must $\max_x u(t,x) = 0$ in the limit?
A: $I_\varepsilon$ stays between positive constants. If $u > 0$ somewhere, $n_\varepsilon = e^{u/\varepsilon}$ blows up. If $u < 0$ everywhere, $n_\varepsilon \to 0$.
See: The constraint and the Lagrange multiplier

Q: Where does the population concentrate as $\varepsilon \to 0$, and what holds there?
A: On the zero set of $u(t,\cdot)$. If this is a single point $\bar x(t)$, then $n_\varepsilon \rightharpoonup \bar\rho\,\delta_{\bar x(t)}$ with $R(\bar x(t), I(t)) = 0$.
See: Dirac concentration

Q: What equation does the Dirac location $\bar x(t)$ satisfy, and what is it called?
A: $\dot{\bar x} = (-D^2u(t,\bar x))^{-1}\nabla_x R(\bar x, I(t))$, obtained by differentiating $\nabla u(t,\bar x(t)) = 0$ in time. It is the canonical equation of adaptive dynamics.
See: The canonical equation

Q: Why is uniqueness hard for the constrained HJ equation?
A: The multiplier $I(t)$ is part of the unknown and can be discontinuous in time (jumps of the fittest trait). Uniqueness is known only under concavity-type assumptions.
See: What is proved

## Quiz

Q: Under $n = e^{u/\varepsilon}$, the mutation term $\varepsilon^2\Delta n$ equals…
- [x] $n\,(|\nabla u|^2 + \varepsilon\Delta u)$
- [ ] $n\,\Delta u$
- [ ] $n\,|\nabla u|^2/\varepsilon$
- [ ] $\varepsilon^2 n\,\Delta u$
E: $\Delta e^{u/\varepsilon} = e^{u/\varepsilon}(|\nabla u|^2/\varepsilon^2 + \Delta u/\varepsilon)$. Multiplying by $\varepsilon^2$ gives $n(|\nabla u|^2 + \varepsilon\Delta u)$.
See: Hopf–Cole and the limit

Q: In the constrained HJ equation $\partial_t u = |\nabla u|^2 + R(x, I(t))$, $\max_x u = 0$, the function $I(t)$ is…
- [x] an unknown determined by the constraint (a Lagrange multiplier)
- [ ] a prescribed external forcing
- [ ] the mutation rate
- [ ] the mean trait of the population
E: Physically $I$ is the competition pressure $\int\psi n$. In the limit it is whatever keeps $\max u = 0$, which is why the problem is nonstandard.
See: The constraint and the Lagrange multiplier

Q: In the limit, the dominant trait $\bar x(t)$ moves…
- [x] up the selection gradient $\nabla_x R$, weighted by $(-D^2u)^{-1}$
- [ ] down the gradient of $R$
- [ ] along $\nabla u$, which is nonzero at $\bar x$
- [ ] not at all, since $R(\bar x, I) = 0$
E: $R(\bar x, I) = 0$ holds at every time but does not freeze $\bar x$. Since $\nabla u(t,\bar x) = 0$ and $D^2u < 0$, the location follows the canonical equation.
See: The canonical equation
