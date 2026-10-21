---
title: "The Hele-Shaw limit of mechanical tumour models"
tags: [cancer, hele-shaw, porous-medium-equation, free-boundary-problems, incompressible-limit]
created: 2026-10-21
related: [mathematical-oncology-landscape, greenspan-free-boundary-models, tumour-growth-unbalanced-transport, phase-field-and-mixture-models, space-and-trait-models, selection-mutation-hamilton-jacobi, mean-field-games-in-oncology, invasion-and-angiogenesis-models]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

The [landscape note](#/note/mathematical-oncology-landscape) sketches Thread D: a cell density $\rho$ pushed by its own pressure, with pressure-limited growth, becomes a free-boundary problem when the pressure law is made stiff. This note gives the theorem, the estimates behind it, and the decade of work that weakened each hypothesis.

### The model and the formal limit

Perthame, Quirós and Vázquez (2014) take
$$
\partial_t\rho-\operatorname{div}(\rho\nabla p)=\rho\,\Phi(p),\qquad p=P_m(\rho)=\frac{m}{m-1}\rho^{m-1},
$$
so that $\rho\nabla p=\nabla\rho^m$ and the equation is a porous-medium equation with growth, $\partial_t\rho=\Delta\rho^m+\rho\Phi(p)$. Hypotheses: $\Phi'<0$ and $\Phi(p_M)=0$ for a homeostatic pressure $p_M>0$, so cells divide at low pressure and stop at $p_M$. (Later papers use $p=\rho^\gamma$; nothing changes.)

The key computation is the equation for the pressure. Since $P_m'(\rho)=m\rho^{m-2}$, $m\rho^{m-1}=(m-1)p$ and $m\rho^{m-2}\nabla\rho=\nabla p$,
$$
\partial_t p=(m-1)\,p\,\big(\Delta p+\Phi(p)\big)+|\nabla p|^2 .
$$
Divide by $m-1$ and let $m\to\infty$: if $\partial_tp$ and $|\nabla p|^2$ stay bounded, the limit pressure satisfies the **complementarity relation**
$$
p_\infty\big(\Delta p_\infty+\Phi(p_\infty)\big)=0 .
$$
Since $P_m(\rho)\to P_\infty(\rho)$, which is $0$ for $\rho<1$ and $[0,\infty)$ at $\rho=1$, the limit pressure is positive only where the density is saturated: $p_\infty(1-\rho_\infty)=0$. On $\Omega(t)=\{p_\infty>0\}$ the density is $1$, so $\partial_t\rho_\infty=0$ and $-\Delta p_\infty=\Phi(p_\infty)$: the pressure solves an elliptic problem at each time, with $p_\infty=0$ on $\partial\Omega(t)$. Outside, $p_\infty=0$ and $\partial_t\rho_\infty=\rho_\infty\Phi(0)$, exponential growth of a "precancerous" density $\rho_\infty=e^{\Phi(0)t}\rho^0$ until it reaches $1$. Compare the sharp-interface [Greenspan model](#/note/greenspan-free-boundary-models): same Darcy structure, but $p=0$ replaces the Laplace–Young condition and the growth rate depends on pressure, not nutrient.

### The theorem and its estimates

PQV's Theorems 2.1–2.4: assume $\rho^0_m\ge0$ with $P_m(\rho^0_m)\le p_M$, supports in a fixed ball, $\rho^0_m\to\rho^0$ in $L^1$, and $\|\partial_{x_i}\rho^0_m\|_{L^1}\le C$. Then along a subsequence $\rho_m\to\rho_\infty$ and $p_m\to p_\infty$ strongly in $L^1$ on $(0,T)\times\mathbb R^d$, with $0\le\rho_\infty\le1$, $0\le p_\infty\le p_M$, both of bounded variation in space–time, $\nabla p_\infty\in L^2$, solving $\partial_t\rho_\infty=\Delta p_\infty+\rho_\infty\Phi(p_\infty)$ in $\mathcal D'$ together with $p_\infty\in P_\infty(\rho_\infty)$ and the complementarity relation in integrated form, $\int(-|\nabla p_\infty|^2+p_\infty\Phi(p_\infty))\,dx=0$ for a.e. $t$. Moreover $\partial_t\rho_\infty\ge0$ and $\partial_tp_\infty\ge0$. Uniqueness (Hilbert's duality method) holds in the class of pairs with $p\in P_\infty(\rho)$, uniformly compact supports, $\nabla p\in L^2$ and $\partial_tp,\partial_t\rho$ bounded measures, so the whole family converges.

The estimate that makes the limit work is of **Aronson–Bénilan** type. With $r_\Phi=\min_{[0,p_M]}(\Phi-p\Phi')>0$,
$$
\Delta p_m+\Phi(p_m)\ \ge\ -\frac{r_\Phi\,e^{-(m-1)r_\Phi t}}{1-e^{-(m-1)r_\Phi t}}\ \sim\ -\frac{1}{(m-1)t}\quad(t\to0),
$$
a one-sided bound on the Laplacian of the pressure that vanishes as $m\to\infty$ for every $t>0$. Fed into the pressure equation it gives $\partial_tp_m\ge-(m-1)p_M\,(\cdot)\to0$, hence $\partial_tp_\infty\ge0$: the saturated set only grows. This is where $\Phi'<0$ (monotone source) is used.

Caution from the paper: the geometric law $V=|\nabla p_\infty|$ on $\partial\Omega(t)$ holds only where the exterior density is $0$; with precancer zones the density equation is needed. Mellet–Perthame–Quirós (2017) made this precise with a Lotka–Volterra source $G$: the exterior density is $\rho^E=e^{G(0)t}\rho^0$ and the front obeys the Stefan-type law
$$
(1-\rho^E)\,V_n=|\nabla p_\infty|,
$$
which is just Rankine–Hugoniot for the jump of $\rho$ from $\rho^E$ to $1$ with flux $-\rho\nabla p$. A positive exterior density accelerates the front (less mass is needed to saturate), and when $\rho^E$ reaches $1$ new saturated islands can nucleate. They prove, for $d\le3$, that the free boundary has finite $\mathcal H^{d-1}$ measure and is $C^1$ near points with $\rho^E<1$ under a flatness or positive-density condition (cusps are not excluded), and eventual regularity: for data $\ge\alpha\chi_{B_r}$ the boundary is star-shaped and smooth after some $T_0$. Kim–Požár (2018) reach the same accelerated law for general $L^1\cap L^\infty$ data by viscosity solutions.

### Weakening the hypotheses

- **Brinkman instead of Darcy.** Perthame–Vauchelet (2015) add viscosity; the pressure estimates are weaker and compactness comes from a kinetic reformulation. Kim–Turanova (2018) prove uniform convergence and characterise the free boundary.
- **Nutrient.** With $\partial_tc-\Delta c=\ldots$ and $\Phi=G(p,c)$, PQV obtain the limit system and uniqueness but not complementarity, and monotonicity is lost (cells can starve). David–Perthame (2021) prove the weak complementarity $p_\infty(\Delta p_\infty+G(p_\infty,c_\infty))=0$. The pointwise Aronson–Bénilan bound fails where $p=0$ and $G<0$, so they replace it by $\iint|\Delta p_\gamma+G|_-^3\le C(T)$ and $\iint|\nabla p_\gamma|^4\le C(T)$; a radial focusing solution in $d=2$ shows the exponent $4$ is sharp.
- **Sign-changing source without nutrient.** Guillen–Kim–Mellet (2022): with a bounded $BV$ source $\lambda(x,t)$ of either sign, the limit still exists, is unique and satisfies a comparison principle; at each time the pressure solves an obstacle problem posed on the saturated set $\{\rho_\infty(t)=1\}$, and $\{p>0\}$ can be strictly smaller, so the saturated region can shrink and the front can recede where $|\nabla p|=0$. Turanova–Zhang (2026) give a viscosity-solution well-posedness theory in any dimension allowing negative front velocity.
- **Two species.** Bubba, Perthame, Pouchol and Schmidtchen (2020) treat two populations sharing one pressure $p=(n^{(1)}+n^{(2)})^\gamma$ with phenotype switching, in one dimension. The fractions $n^{(i)}/n$ are transported by $-\partial_xp$, so the system is hyperbolic–parabolic: no comparison principle, no Aronson–Bénilan estimate, only $BV$ bounds. The limit satisfies $p_\infty[\partial_x^2p_\infty+n^{(1)}_\infty F(p_\infty)+n^{(2)}_\infty G(p_\infty)]=0$ and, without switching, segregation $n^{(1)}_\infty n^{(2)}_\infty=0$ is preserved. Degond–Hecht–Vauchelet (2020) treat segregated data; Dębiec–Schmidtchen (2020, 1-D) and Dębiec–Perthame–Schmidtchen–Vauchelet (2021, any dimension, Bresch–Jabin compactness) do the Brinkman coupling, where the pressure can jump at the edge of each species' support. David (2023) replaces two species by a continuous phenotype, the mechanical cousin of the [constrained HJ models](#/note/selection-mutation-hamilton-jacobi) (see [space and trait](#/note/space-and-trait-models)).

### What is open (as of 2026)

Regularity of the free boundary for $d>3$ (Mellet–Perthame–Quirós). Any regularity with a *diffusing* nutrient: Jacobs–Kim–Tong (2022) get contraction and patch regularity only for non-diffusing nutrient without death, Kim–Lelmi (2022) only Hausdorff closeness for small diffusion, and Feng–He–Liu–Zhou (2024/25) show nonsymmetric travelling waves, an intrinsic boundary instability of the diffusing-nutrient model. The two-species Darcy limit in $d\ge2$ with mixed data, and whether the interface between species is a hypersurface. Uniqueness for rough data or $p$-dependent sources in $d\ge2$ without the compact-support and $\partial_tp\in M^1$ hypotheses. And no control theory at all for this limit, although the hard-constraint structure $\rho\le1$ with $p$ as multiplier is exactly that of [density-constrained MFG](#/note/mean-field-games-in-oncology); the gradient-flow side is in the [unbalanced transport note](#/note/tumour-growth-unbalanced-transport).

## Cards

Q: In the model $\partial_t\rho-\operatorname{div}(\rho\nabla p)=\rho\Phi(p)$, $p=\frac{m}{m-1}\rho^{m-1}$, what equation does the pressure satisfy, and how does it yield the complementarity relation as $m\to\infty$?
A: $\partial_tp=(m-1)\,p\,(\Delta p+\Phi(p))+|\nabla p|^2$. Dividing by $m-1$, if $\partial_tp$ and $|\nabla p|^2$ stay bounded, the limit satisfies $p_\infty(\Delta p_\infty+\Phi(p_\infty))=0$.
See: The model and the formal limit

Q: What does the Hele-Shaw limit pressure satisfy on $\{p_\infty>0\}$, and what happens to the density outside?
A: Inside, $\rho_\infty=1$ and $-\Delta p_\infty=\Phi(p_\infty)$ with $p_\infty=0$ on the boundary. Outside, $p_\infty=0$ and $\partial_t\rho_\infty=\rho_\infty\Phi(0)$: exponential growth of the precancer density until it saturates.
See: The model and the formal limit

Q: What is the Aronson–Bénilan estimate in the Perthame–Quirós–Vázquez limit, and what does it give?
A: $\Delta p_m+\Phi(p_m)\ge-\frac{r_\Phi e^{-(m-1)r_\Phi t}}{1-e^{-(m-1)r_\Phi t}}\sim-\frac{1}{(m-1)t}$, with $r_\Phi=\min(\Phi-p\Phi')>0$. It vanishes as $m\to\infty$ for $t>0$, giving $\Delta p_\infty+\Phi(p_\infty)\ge0$ and $\partial_tp_\infty\ge0$: the saturated set grows.
See: The theorem and its estimates

Q: Which hypothesis of Perthame–Quirós–Vázquez is used for the monotonicity $\partial_tp_\infty\ge0$, and which later paper removes it?
A: The monotone source $\Phi'<0$ (and $\Phi(p_M)=0$). Guillen–Kim–Mellet (2022) allow a sign-changing source: the saturated set can then shrink, the pressure solves an obstacle problem at each time, and comparison still holds.
See: Weakening the hypotheses

Q: What is the velocity law of the tumour front in the Hele-Shaw limit with a positive exterior density $\rho^E$, and why?
A: $(1-\rho^E)V_n=|\nabla p_\infty|$ (Mellet–Perthame–Quirós 2017): Rankine–Hugoniot for the jump of $\rho$ from $\rho^E$ to $1$ with flux $-\rho\nabla p$. The classical $V=|\nabla p|$ needs $\rho^E=0$; a positive exterior density accelerates the front.
See: The theorem and its estimates

Q: Why does the pointwise Aronson–Bénilan bound fail with a nutrient, and what replaces it (David–Perthame 2021)?
A: Where $p=0$ and the growth rate $G(p,c)<0$ (starvation), $\Delta p+G=G<0$ cannot be bounded below by a quantity vanishing with $1/\gamma$. They use $\iint|\Delta p_\gamma+G|_-^3\le C$ and $\iint|\nabla p_\gamma|^4\le C$, the exponent $4$ being sharp.
See: Weakening the hypotheses

Q: Why is the two-species Hele-Shaw limit (Bubba et al. 2020) much harder than the one-species limit?
A: The fractions $n^{(i)}/n$ are transported by $-\nabla p$, so the system is hyperbolic–parabolic: no comparison principle and no Aronson–Bénilan estimate, only $BV$ bounds. For Darcy coupling the limit is proved in one dimension; Brinkman coupling allows any dimension.
See: Weakening the hypotheses

Q: In what class is the Hele-Shaw tumour limit unique (Perthame–Quirós–Vázquez 2014), and by which method?
A: Pairs $(\rho,p)$ with $p\in P_\infty(\rho)$, uniformly compact supports, $\nabla p\in L^2$ and $\partial_tp,\partial_t\rho$ bounded measures, by Hilbert's duality method. Uniqueness for rough data remains open.
See: The theorem and its estimates

## Quiz

Q: In the Hele-Shaw limit $m\to\infty$ of $\partial_t\rho-\operatorname{div}(\rho\nabla p)=\rho\Phi(p)$ with $\Phi'<0$, which statement is a theorem of Perthame–Quirós–Vázquez (2014)?
- [x] $\partial_tp_\infty\ge0$ and $\partial_t\rho_\infty\ge0$: the saturated set $\{p_\infty>0\}$ never shrinks
- [ ] The free boundary is $C^1$ for all times in every dimension
- [ ] $p_\infty$ is harmonic on $\{p_\infty>0\}$
- [ ] The limit holds without any bound on $\nabla\rho^0_m$
E: Monotonicity follows from the Aronson–Bénilan estimate and $\Phi'<0$. Regularity is Mellet–Perthame–Quirós (2017), only for $d\le3$ and not at all times. On $\{p_\infty>0\}$ the pressure solves $-\Delta p_\infty=\Phi(p_\infty)$, not Laplace's equation. The theorem assumes $\|\partial_{x_i}\rho^0_m\|_{L^1}\le C$.
See: The theorem and its estimates

Q: A tumour front in the Hele-Shaw limit advances into a region where the precancer density is $\rho^E=1/2$. Its normal velocity is…
- [x] $2|\nabla p_\infty|$
- [ ] $|\nabla p_\infty|$, the classical Hele-Shaw law
- [ ] $\tfrac12|\nabla p_\infty|$
- [ ] $|\nabla p_\infty|+\Phi(0)/2$
E: Rankine–Hugoniot with the jump $1-\rho^E=1/2$ gives $V_n=|\nabla p_\infty|/(1-\rho^E)=2|\nabla p_\infty|$: the exterior density is already half-way to saturation, so the front moves twice as fast.
See: The theorem and its estimates

Q: Why does adding a diffusing nutrient $c$ to the Hele-Shaw tumour model break the Perthame–Quirós–Vázquez argument?
- [x] The growth rate $G(p,c)$ can be negative where $p=0$, so the pointwise Aronson–Bénilan bound and the monotonicity $\partial_tp\ge0$ fail
- [ ] The nutrient equation is hyperbolic and has no comparison principle
- [ ] The pressure law $p=\rho^\gamma$ no longer converges to a Hele-Shaw graph
- [ ] Uniqueness of the limit fails even for smooth data
E: Starvation makes the source non-monotone. David–Perthame (2021) recover complementarity with $L^3$ and $L^4$ estimates; the pressure law is unchanged; PQV already proved uniqueness of the nutrient limit system.
See: Weakening the hypotheses
