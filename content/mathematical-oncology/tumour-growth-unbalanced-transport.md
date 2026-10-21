---
title: "Tumour growth as a gradient flow: unbalanced optimal transport"
tags: [cancer, optimal-transport, gradient-flows, hellinger-kantorovich, jko-scheme]
created: 2026-10-21
related: [hele-shaw-limit-tumour-growth, mathematical-oncology-landscape, hj-wasserstein-applications, weak-kam-wasserstein, bounded-support-topology, mean-field-games-in-oncology, greenspan-free-boundary-models, control-of-evolving-populations]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

Without growth, the mechanical tumour model of the [Hele-Shaw note](#/note/hele-shaw-limit-tumour-growth) is a Wasserstein gradient flow. With growth, mass is created, and $W_2$ is only defined between measures of equal mass. This note records how the growth term is absorbed into the geometry (unbalanced transport), how the resulting schemes are written, and what has been proved for the tumour model.

### Without growth: JKO and the hard-congestion limit

For an internal energy $E(\rho)=\int e(\rho)\,dx$, the $W_2$ gradient flow is $\partial_t\rho=\operatorname{div}(\rho\nabla e'(\rho))$. With $e(\rho)=\rho^m/(m-1)$ one has $e'(\rho)=\frac{m}{m-1}\rho^{m-1}=p$, so $\partial_t\rho=\operatorname{div}(\rho\nabla p)$ is the porous-medium equation of Perthame–Quirós–Vázquez with $\Phi=0$. The JKO (minimising-movement) scheme with step $\tau$ is
$$
\rho_{k+1}\in\operatorname*{arg\,min}_{\rho}\ \Big\{\frac{1}{2\tau}W_2^2(\rho,\rho_k)+E(\rho)\Big\},
$$
and the piecewise-constant interpolant converges to the flow as $\tau\to0$. As $m\to\infty$, $E_m$ Γ-converges to the indicator of $\{\rho\le1\}$ (zero there, $+\infty$ elsewhere), and the flow becomes the projection dynamics of hard congestion: $\partial_t\rho=\operatorname{div}(\rho\nabla p)$ with $p\ge0$, $p(1-\rho)=0$, the pressure being the Lagrange multiplier of the constraint, exactly as in the crowd-motion models of Maury, Roudneff-Chupin and Santambrogio and in [density-constrained mean field games](#/note/mean-field-games-in-oncology), where the same multiplier is the price of congestion (references from memory, not re-verified). The complementarity relation of the Hele-Shaw note is this multiplier structure read at the PDE level.

### With growth: the Hellinger–Kantorovich metric

Liero–Mielke–Savaré (2017) and Chizat–Peyré–Schmitzer–Vialard (2018) define a distance on nonnegative measures that lets mass be transported *or* created. Its dynamic (Benamou–Brenier with source) form is
$$
d_\delta^2(\mu_0,\mu_1)=\inf\Big\{\int_0^1\!\!\int\big(|v_t|^2+\delta^2 g_t^2\big)\,d\rho_t\,dt:\ \partial_t\rho_t+\operatorname{div}(\rho_tv_t)=\rho_tg_t,\ \rho_0=\mu_0,\ \rho_1=\mu_1\Big\},
$$
where $v$ transports and $g$ is a relative growth rate; $\delta>0$ is a length scale, and conventions for the constants differ between the two groups (Hellinger–Kantorovich for Liero–Mielke–Savaré, Wasserstein–Fisher–Rao for Chizat et al.). Two sanity checks. With $g=0$ it is $W_2$. With $v=0$ the problem is pointwise in $x$: writing $\rho_t=((1-t)\sqrt{\mu_0}+t\sqrt{\mu_1})^2$ gives $g_t=2(\sqrt{\mu_1}-\sqrt{\mu_0})/\sqrt{\rho_t}$ and the cost $4\delta^2\int(\sqrt{\mu_1}-\sqrt{\mu_0})^2$, the squared Hellinger distance; Cauchy–Schwarz shows no other path does better. So the metric interpolates between transport and Hellinger (Fisher–Rao), and the parameter $\delta$ says how far it is cheaper to move mass than to create it.

The Riemannian structure gives a formula for gradient flows. A tangent vector $\dot\rho=-\operatorname{div}(\rho\nabla\phi)+\rho\,\phi/\delta^2$ is represented by a single potential $\phi$, and the gradient flow of $E$ is $\phi=-e'(\rho)$:
$$
\partial_t\rho=\operatorname{div}\big(\rho\nabla e'(\rho)\big)-\frac{1}{\delta^2}\,\rho\,e'(\rho).
$$
The reaction part is forced to be $-\rho\,e'(\rho)/\delta^2$: with the same energy, the metric dictates the growth law. For the tumour model this is the right structure exactly when $\Phi$ is affine in $p$. Take $E(\rho)=\int\big(\frac{\rho^m}{m-1}-p_M\rho\big)$, so $e'(\rho)=p-p_M$; then
$$
\partial_t\rho=\operatorname{div}(\rho\nabla p)+\frac{1}{\delta^2}\,\rho\,(p_M-p),
$$
the porous-medium equation with growth $\Phi(p)=(p_M-p)/\delta^2$ (one checks $\nabla e'=\nabla p$). The incompressible limit replaces $\int\rho^m/(m-1)$ by the indicator of $\{\rho\le1\}$ and keeps $-p_M\int\rho$: the Hele-Shaw tumour model with $p$ as multiplier. Di Marino–Chizat (2020) prove exactly this kind of statement for a Hele-Shaw-type tumour model: existence by minimising movements in the Hellinger–Kantorovich metric and uniqueness on convex domains by the evolution variational inequality, with no regularity of the initial datum, plus an entropic numerical scheme (their precise energy was not checked here). The same EVI structure is what gives contraction and Lyapunov functionals for free, the point made for tumour control problems that have not yet been written (see [control of evolving populations](#/note/control-of-evolving-populations)).

### The splitting scheme

Gallouët–Monsaingeon (2017) avoid computing the unbalanced distance altogether. Because the metric tensor is a sum, $\int|v|^2\rho+\delta^2\int g^2\rho$, one can alternate a transport step and a reaction step:
$$
\rho_{k+\frac12}\in\operatorname*{arg\,min}_\rho\Big\{\frac{1}{2\tau}W_2^2(\rho,\rho_k)+E(\rho)\Big\},\qquad
\rho_{k+1}\in\operatorname*{arg\,min}_\rho\Big\{\frac{\delta^2}{2\tau}\,\mathrm{He}^2(\rho,\rho_{k+\frac12})+E(\rho)\Big\},
$$
with $\mathrm{He}^2(\rho,\nu)=4\int(\sqrt\rho-\sqrt\nu)^2$. The first step is a classical JKO step; the second is pointwise in $x$ and cheap. They prove convergence to the Hellinger–Kantorovich gradient flow (a reaction–diffusion equation), and Gallouët–Laborde–Monsaingeon (2019) extend the scheme to systems of species with advection, reaction and diffusion.

### Keeping $W_2$: Jacobs, Kim and Tong

Jacobs–Kim–Tong (2021) go the other way: a JKO-type scheme for $\partial_t\rho-\operatorname{div}(\rho\nabla p)=\rho\Phi(p)$ that keeps the standard $W_2$ distance despite the change of mass, by introducing an auxiliary variable that controls the source within each step (the mass is adjusted by a penalised reaction before being transported; the exact functional was not re-read). The payoff is the dual formulation: it yields a comparison principle for the discrete solutions and uniform $L^1$-equicontinuity, hence convergence to the PDE and, in the stiff limit, to the Hele-Shaw tumour model. Jacobs–Kim–Tong (2022) use this structure for the model with a *non-diffusing* nutrient and no death: contraction estimates, exponential convergence to equilibrium, and regularity of the tumour patch boundary, results they explicitly contrast with the models with nutrient diffusion or death, where they fail. David–Mészáros–Santambrogio (2024) exploit contractivity differently: with a strictly convex confining potential, the flows are contractions, which gives $W_2$ convergence rates to the Hele-Shaw limit uniform in time (as described in their abstract).

### Why a control theorist should care

The whole Hele-Shaw theory is a statement about the subdifferential of a convex energy in a geometry where growth is a direction of motion. A therapy acting on $\Phi$ (a drug lowering the growth rate) is then a time-dependent change of the energy, and the natural control problem is a mean-field control problem on the Hellinger–Kantorovich space, with value function on measures as in [HJ on Wasserstein space](#/note/hj-wasserstein-applications) but on the cone over $\mathcal P$ rather than on $\mathcal P$. No such problem has been formulated for tumours as of 2026; the EVI uniqueness of Di Marino–Chizat suggests the follower dynamics would be well posed for each control.

## Cards

Q: Why is the porous-medium equation with growth $\partial_t\rho-\operatorname{div}(\rho\nabla p)=\rho\Phi(p)$ not a $W_2$ gradient flow, and what geometry fixes it?
A: The source changes total mass and $W_2$ compares measures of equal mass. The Hellinger–Kantorovich (Wasserstein–Fisher–Rao) metric on nonnegative measures allows mass creation at a cost $\delta^2\int g^2\,d\rho$ per unit time.
See: With growth: the Hellinger–Kantorovich metric

Q: Write the dynamic (Benamou–Brenier with source) formulation of the Hellinger–Kantorovich distance.
A: $d_\delta^2(\mu_0,\mu_1)=\inf\int_0^1\!\int(|v|^2+\delta^2g^2)\,d\rho_t\,dt$ over curves with $\partial_t\rho+\operatorname{div}(\rho v)=\rho g$ joining $\mu_0$ to $\mu_1$.
See: With growth: the Hellinger–Kantorovich metric

Q: In the Hellinger–Kantorovich metric with pure reaction ($v=0$), what is the geodesic between $\mu_0$ and $\mu_1$ and its cost?
A: $\sqrt{\rho_t}=(1-t)\sqrt{\mu_0}+t\sqrt{\mu_1}$ (linear in the square root), with cost $4\delta^2\int(\sqrt{\mu_1}-\sqrt{\mu_0})^2$, the squared Hellinger distance.
See: With growth: the Hellinger–Kantorovich metric

Q: What is the gradient flow of $E(\rho)=\int e(\rho)$ in the Hellinger–Kantorovich metric?
A: $\partial_t\rho=\operatorname{div}(\rho\nabla e'(\rho))-\frac{1}{\delta^2}\rho\,e'(\rho)$: transport down the gradient of $e'$ plus a reaction $-\rho e'/\delta^2$ forced by the same energy.
See: With growth: the Hellinger–Kantorovich metric

Q: Which energy makes the tumour model $\partial_t\rho=\operatorname{div}(\rho\nabla p)+\rho(p_M-p)/\delta^2$, $p=\frac{m}{m-1}\rho^{m-1}$, a Hellinger–Kantorovich gradient flow?
A: $E(\rho)=\int\big(\frac{\rho^m}{m-1}-p_M\rho\big)$, so that $e'(\rho)=p-p_M$. In the incompressible limit, $\int\rho^m/(m-1)$ becomes the indicator of $\{\rho\le1\}$ and $p$ the multiplier.
See: With growth: the Hellinger–Kantorovich metric

Q: What are the two steps of the Gallouët–Monsaingeon (2017) splitting scheme, and why does splitting work for this metric?
A: A JKO step in $W_2$ followed by a Hellinger step, $\operatorname{arg\,min}\frac{\delta^2}{2\tau}\mathrm{He}^2(\rho,\rho_{k+1/2})+E(\rho)$, which is pointwise in $x$. It works because the metric tensor is the sum $\int|v|^2\rho+\delta^2\int g^2\rho$.
See: The splitting scheme

Q: How do Jacobs–Kim–Tong (2021) keep the standard $W_2$ distance in a JKO scheme for a model with growth, and what does their dual formulation give?
A: They add an auxiliary variable that controls the source within each step. The dual formulation yields a comparison principle and uniform $L^1$-equicontinuity for the discrete solutions, hence convergence to the PDE and to the Hele-Shaw tumour model.
See: Keeping $W_2$: Jacobs, Kim and Tong

Q: Under what restrictions do Jacobs–Kim–Tong (2022) prove contraction, exponential convergence to equilibrium and patch-boundary regularity for the tumour model with nutrient?
A: Non-diffusing nutrient and no cell death. They state that the results fail with nutrient diffusion or death.
See: Keeping $W_2$: Jacobs, Kim and Tong

## Quiz

Q: In the Hellinger–Kantorovich gradient flow of $E(\rho)=\int e(\rho)$, the reaction term is…
- [x] $-\rho\,e'(\rho)/\delta^2$, fixed by the same energy that drives the transport
- [ ] $+\rho\,e'(\rho)/\delta^2$, since mass is created where the energy is large
- [ ] arbitrary: any $\rho\Phi(\rho)$ can be added without changing the gradient-flow structure
- [ ] $-\Delta e'(\rho)$, a Cahn–Hilliard-type term
E: A tangent vector is $-\operatorname{div}(\rho\nabla\phi)+\rho\phi/\delta^2$ with one potential $\phi$, and the gradient flow sets $\phi=-e'(\rho)$. Mass decreases where $e'>0$ (high pressure) and increases where $e'<0$, which is why $-p_M\int\rho$ must be in the energy to get growth at low pressure.
See: With growth: the Hellinger–Kantorovich metric

Q: Why can the unbalanced JKO scheme be split into a $W_2$ step and a Hellinger step (Gallouët–Monsaingeon 2017)?
- [x] The Hellinger–Kantorovich metric tensor is the sum of the transport and reaction kinetic energies, so each step dissipates its own part of the energy
- [ ] The Hellinger–Kantorovich distance is the inf-convolution of $W_2$ and the Hellinger distance
- [ ] Because mass is conserved in each step separately
- [ ] Because the Hellinger step is linear in $\rho$
E: Splitting is justified at the level of the tangent-space metric. The distance itself is not the inf-convolution of $W_2$ and Hellinger; the Hellinger step changes mass; and it is pointwise in $x$ but nonlinear.
See: The splitting scheme

Q: As $m\to\infty$, the internal energy $\int\rho^m/(m-1)$ Γ-converges to the indicator of $\{\rho\le1\}$. In the gradient flow, the pressure then becomes…
- [x] the Lagrange multiplier of the constraint $\rho\le1$: $p\ge0$ and $p(1-\rho)=0$
- [ ] the function $\rho^\infty$, which is $0$ for $\rho<1$ and $1$ for $\rho=1$
- [ ] the chemical potential $-\Delta\rho+\Psi'(\rho)$ of a phase-field energy
- [ ] a harmonic function on the support of $\rho$
E: $p\in\partial\iota_{\{\rho\le1\}}(\rho)$: zero where the constraint is slack, any nonnegative value where it is active. This is the same object as the pressure in hard-congestion crowd motion and the price in density-constrained MFG.
See: Without growth: JKO and the hard-congestion limit
