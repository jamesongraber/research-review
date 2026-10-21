---
title: "The constrained Hamilton–Jacobi problem: uniqueness, BV multipliers and numerics"
tags: [cancer, hamilton-jacobi, viscosity-solutions, uniqueness, bounded-variation, asymptotic-preserving]
created: 2026-10-21
related: [selection-mutation-hamilton-jacobi, lorz-clairambault-resistance-model, space-and-trait-models, pouchol-optimal-control-ide, adaptive-dynamics, singular-strategies-branching, discounted-stationary-mfg, weak-kam-wasserstein, hj-wasserstein-applications, mean-field-games-in-oncology]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

The [basic note](#/note/selection-mutation-hamilton-jacobi) explains why $\varepsilon\ln n_\varepsilon$ should converge to a solution $u$ of
$$
\partial_t u = |\nabla u|^2 + R(x, I(t)), \qquad \max_x u(t,\cdot) = 0,
$$
with the multiplier $I(t)$ unknown. This note is about what is actually proved: compactness, the regularity of $I$, uniqueness, and numerics. The theme is that $I(t)$ is only of bounded variation in general, and that uniqueness is a genuinely new HJ question solved by optimal-control representations rather than by comparison.

### What Perthame–Barles prove, and what they do not

Perthame and Barles (2008) take $\partial_t n_\varepsilon - \varepsilon\Delta n_\varepsilon = \frac{n_\varepsilon}{\varepsilon}R(x,I_\varepsilon)$ on $\mathbb R^d$, $I_\varepsilon=\int\psi n_\varepsilon$, under: $0<\psi_m\le\psi\le\psi_M$; constants $0<I_m\le I_M$ with $\min_x R(x,I_m)=0$ and $\max_x R(x,I_M)=0$; and the **monotonicity** $-K\le\partial_I R\le -K^{-1}<0$ with $R(\cdot,I)$ bounded in $W^{2,\infty}$. The first result is a trapping estimate $I_m - C\varepsilon^2\le I_\varepsilon(t)\le I_M + C\varepsilon^2$. The second (Theorem 3.1) is a **uniform BV bound in time on $I_\varepsilon$**, obtained from a lower bound on $\frac{d}{dt}I_\varepsilon$. BV gives compactness: along a subsequence $I_\varepsilon\to I$ in $L^1_{loc}$ and almost everywhere, which is exactly what is needed to pass to the limit in the coefficient $R(x,I_\varepsilon(t))$. Then (Theorem 4.1) $\varphi_\varepsilon=\varepsilon\ln n_\varepsilon\to\varphi$ locally uniformly along a subsequence, $\varphi$ is a Lipschitz viscosity solution of the constrained problem, and $\operatorname{supp} n(t)\subset\{\varphi(t,\cdot)=0\}$ for a.e. $t$. In $d=1$, if $R(\cdot,I)$ has a unique zero $X(I)$, the limit measure is $\varrho(t)\delta_{X(I(t))}$. Barles, Mirrahimi and Perthame (2009) replace $\varepsilon\Delta$ by an integral mutation kernel, so the Hamiltonian becomes $r(x)\int K(z)e^{p\cdot z}dz$: convex and superlinear in $p$, no longer quadratic.

Three gaps remain: convergence only along subsequences, the limit identified only in the one-dimensional monomorphic case, and $I$ merely BV. The paper says uniqueness "for such general $R$ is still an open problem" (it is proved for separable $R=b(x)-d(x)Q(I)$).

### A jump of the multiplier, by hand

The BV regularity is sharp. Take $\psi\equiv1$ (so $I=\varrho$ is the total mass), $R(x,I)=x-I$, and $\varphi^0=\max\{-x^2,\,-(x-\alpha)^2-\delta\}$ with $\alpha,\delta>0$. For each bump, the quadratic ansatz $\varphi_i=-\frac{(x-b_i(t))^2}{1+4t}+c_i(t)$ solves $\partial_t\varphi=x-\varrho+|\partial_x\varphi|^2$ exactly provided $b_1=\tfrac t2+t^2$, $b_2=\alpha+\tfrac t2+t^2$ and $c_i'=b_i-\varrho$. Since $n=n_1+n_2$ and $\varepsilon\ln(e^{a/\varepsilon}+e^{b/\varepsilon})\to\max(a,b)$, the limit is $\varphi=\max(\varphi_1,\varphi_2)$. While bump 1 carries the constraint ($c_1=0$) one has $\varrho=b_1$, hence $c_2=-\delta+\alpha t$, which reaches $0$ at $\bar t=\delta/\alpha$. After that bump 2 holds the constraint and $\varrho=\alpha+\tfrac t2+t^2$. So $\varrho$ and the dominant trait $\bar x=b_i$ jump by $\alpha$ at $\bar t$ while $\varphi$ stays continuous. The jump is upward, as the pessimization principle below predicts.

### Concavity: Lipschitz multipliers and a classical limit

Lorz, Mirrahimi and Perthame (2011) assume uniform concavity, $-2\underline L_1\le D^2u^0_\varepsilon\le-2\overline L_1$ and $-2\underline K_1\le D^2R\le-2\overline K_1<0$, with the compatibility $4\overline L_1^2\le\overline K_1\le\underline K_1\le4\underline L_1^2$. Why these numbers: in one dimension $w=\partial_{xx}u_\varepsilon$ satisfies $\partial_t w = \partial_{xx}R + 2w^2 + 2\partial_xu\,\partial_x w+\varepsilon\partial_{xx}w$, so at an extremum of $w$ the bound $w\le-2\overline L_1$ is preserved iff $-2\overline K_1+8\overline L_1^2\le0$, and $w\ge-2\underline L_1$ iff $-2\underline K_1+8\underline L_1^2\ge0$. Concavity propagates, the maximum point is unique, $D^3u$ stays bounded (if $D^3R$ and $D^3u^0$ are), and the constraint can be differentiated: $\bar x,\bar I\in W^{1,\infty}$, $\dot{\bar I}\ge0$, and the canonical equation $\dot{\bar x}=(-D^2u)^{-1}\nabla_xR(\bar x,\bar I)$ holds rigorously (Theorems 3.2–3.3). Mirrahimi and Roquejoffre (J. Differential Equations, 2016) then prove **uniqueness** in this concave setting, with $u\in L^\infty_{loc}(W^{3,\infty}_{loc})$ and $I\in W^{1,\infty}$: dynamic programming gives $C^1$ regularity, the maximum point obeys $R(\bar x(t),I(t))=0$ and the canonical equation, and the resulting nonstandard Cauchy problem is solved by contraction. Concavity forces monomorphism, so branching is excluded by assumption.

### Calvez–Lam: uniqueness without concavity

Calvez and Lam (Calc. Var. PDE, 2020) write the problem as $\partial_t u + H(I(t),x,\nabla u)=0$, $\min_x u=0$, $u(0)=g$ (so $u=-\varepsilon\ln n$). Hypotheses: $H\in C^2$, $D^2_{pp}H>0$ and superlinear in $p$ (H1); $\partial_I H<0$ (H2); the Lagrangian satisfies growth conditions; $g$ locally Lipschitz, coercive, $\min g=0$; $I\ge0$ of bounded variation. Theorem 1: if $I_1,I_2$ are BV and $V_1,V_2$ the associated variational (Lax–Oleinik) solutions from the same $g$, then $I_1=I_2$ a.e. and $V_1=V_2$. Theorem 2: for BV $I$ the variational solution is the unique locally Lipschitz viscosity solution. No separability, no concavity in $x$, several minimum points and discontinuous $I$ are allowed. The proof compares the two value functions at their minimum points along minimizing curves, whose velocities are BV with a bound depending on $\|I\|_{BV}$. The authors ask whether one can "by-pass the variational formulation and derive uniqueness from PDE arguments only"; that is open. Theorem 9 (**pessimization principle**): if $L(I,x,v)\ge L(I,x,0)$, equivalently $\partial_pH(I,x,0)=0$ (a symmetric mutation kernel), then $I(t)$ is non-decreasing. Note that $H$ depends on time only through $I$; a time-dependent dose $c(t)$ inside $R$ is not covered by the theorem as stated.

### The multiplier as a price

The structure is familiar from mean field games: a single scalar $I(t)$, the competition pressure, couples everybody, and the constraint $\max u=0$ is a clearing condition (the population neither explodes nor vanishes). Uniqueness needs $H$ convex in $p$ and $H$ monotone in the coupling, the same pair as in Lasry–Lions. But the mechanism is different: there is no Fokker–Planck equation to pair with, and the argument is variational rather than a duality computation. For a case where monotonicity is present but fails to give uniqueness, compare the [discounted stationary MFG](#/note/discounted-stationary-mfg).

### Multiple peaks and numerics

Lorenzi and Pouchol (2020, from the abstract) treat pure selection with several fitness maxima: the limit is a unique combination of Diracs at the peaks with explicit weights, but once a small diffusion is added some peaks can be lost, so "Diracs at every peak" is false in general. Calvez, Hivert and Yoldaş (2023) build an asymptotic-preserving scheme: a monotone upwind Hamiltonian, an implicit nonlocal term, and in the limit scheme the multiplier fixed each step by $\min_{\text{grid}}v=0$ using monotonicity in $I$. The scheme has $\varepsilon$-uniform Lipschitz bounds, and the limit scheme converges to the unique viscosity solution (uniqueness imported from Calvez–Lam) but with **no rate**, because $I$ may jump.

### Open, precisely

A PDE-only uniqueness proof; any uniqueness for constrained HJ *systems* (two multipliers $\rho_H,\rho_C$ entering two fitnesses, as in the cancer models); a description of polymorphic limits in $d\ge2$; conditions short of concavity that prevent jumps of $I$; error estimates uniform in $\varepsilon$.

## Cards

Q: What regularity does Perthame–Barles (2008) prove for the multiplier $I_\varepsilon$, and why is it the key step?
A: A uniform BV bound in time. It gives a.e. convergence of $I_\varepsilon$ along a subsequence, which is what lets one pass to the limit in the coefficient $R(x,I_\varepsilon(t))$. BV is sharp: $I$ can jump.
See: What Perthame–Barles prove, and what they do not

Q: In the example $R=x-I$ with $\varphi^0=\max\{-x^2,-(x-\alpha)^2-\delta\}$, why do $\varrho$ and $\bar x$ jump while $\varphi$ stays continuous?
A: $\varphi=\max(\varphi_1,\varphi_2)$ by superposition in $n$. The second bump's height grows as $c_2=-\delta+\alpha t$ and takes over at $\bar t=\delta/\alpha$; the max value is continuous but the argmax and the mass jump by $\alpha$.
See: A jump of the multiplier, by hand

Q: Why does uniform concavity of $u_\varepsilon$ propagate under compatibility conditions like $4\overline L_1^2\le\overline K_1$?
A: $w=\partial_{xx}u_\varepsilon$ solves a Riccati-type equation $\partial_t w=\partial_{xx}R+2w^2+\dots$; at an extremum the bound $w\le-2\overline L_1$ is preserved iff $-2\overline K_1+8\overline L_1^2\le0$.
See: Concavity: Lipschitz multipliers and a classical limit

Q: What do concavity assumptions buy for the constrained HJ problem (Lorz–Mirrahimi–Perthame 2011, Mirrahimi–Roquejoffre 2016)?
A: A unique maximum point, $I\in W^{1,\infty}$ and non-decreasing, a classical limit with bounded $D^3u$, the canonical equation as a theorem, and uniqueness by reduction to a Cauchy problem for the maximum point.
See: Concavity: Lipschitz multipliers and a classical limit

Q: State the Calvez–Lam (2020) uniqueness theorem and the method of proof.
A: $H\in C^2$ convex and superlinear in $p$, strictly decreasing in $I$, $g$ coercive Lipschitz with $\min g=0$, $I\ge0$ BV: then $(u,I)$ is unique. Proof via the Lax–Oleinik variational representation, comparing value functions at their minimum points along minimizing curves, not by doubling of variables.
See: Calvez–Lam: uniqueness without concavity

Q: When is the multiplier $I(t)$ non-decreasing (pessimization principle), and what does it mean?
A: When $L(I,x,v)\ge L(I,x,0)$, equivalently $\partial_pH(I,x,0)=0$, e.g. a symmetric mutation kernel (Calvez–Lam Theorem 9). The environment felt by residents only deteriorates.
See: Calvez–Lam: uniqueness without concavity

Q: Which hypotheses of the constrained HJ uniqueness theory parallel Lasry–Lions monotonicity, and how does the proof differ?
A: Convexity of $H$ in $p$ plus $\partial_IH<0$ (monotone in the scalar coupling $I$, a price). But there is no Fokker–Planck equation to pair with; the proof is variational, and a PDE-only proof is open.
See: The multiplier as a price

Q: Why does the asymptotic-preserving scheme of Calvez–Hivert–Yoldaş (2023) converge without a rate?
A: The limit multiplier is only BV and may jump; the limit scheme converges to the unique viscosity solution (uniqueness from Calvez–Lam), but no error estimate follows.
See: Multiple peaks and numerics

## Quiz

Q: In Calvez–Lam's uniqueness theorem, which hypothesis plays the role of Lasry–Lions monotonicity?
- [x] $\partial_I H<0$: the Hamiltonian is strictly decreasing in the coupling $I$
- [ ] $D^2_{pp}H>0$: convexity in the gradient
- [ ] concavity of $R$ in $x$
- [ ] $I\in BV$
E: Convexity in $p$ is the other standard ingredient; concavity in $x$ is not required by Calvez–Lam (it is the Lorz–Mirrahimi–Perthame route); BV is a regularity class, not a monotonicity.
See: Calvez–Lam: uniqueness without concavity

Q: In the Perthame–Barles two-bump example at the jump time $\bar t=\delta/\alpha$…
- [x] $\varrho$ and $\bar x$ jump up by $\alpha$ while $\varphi$ is continuous
- [ ] $\varphi$ itself is discontinuous in time
- [ ] $\varrho$ jumps down
- [ ] nothing jumps; only $\dot{\bar x}$ is discontinuous
E: The maximum of two continuous functions is continuous; the location of the maximum and the mass carried by it switch discontinuously. The upward direction matches the pessimization principle.
See: A jump of the multiplier, by hand

Q: Under uniform concavity (Mirrahimi–Roquejoffre), the multiplier $I$ is…
- [x] Lipschitz ($W^{1,\infty}$)
- [ ] only of bounded variation
- [ ] merely $L^\infty$
- [ ] real-analytic
E: Concavity makes the maximum point unique and differentiable in time, and $I$ is determined by $R(\bar x(t),I(t))=0$.
See: Concavity: Lipschitz multipliers and a classical limit
