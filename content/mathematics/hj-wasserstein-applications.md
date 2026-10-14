---
title: Why HJ equations on Wasserstein space?
tags: [hamilton-jacobi, wasserstein-space, mean-field-control, master-equation, transformers, mckean-vlasov]
created: 2026-05-08
related: [weak-kam-wasserstein, bounded-support-topology, master-equation-and-rational-expectations, residual-and-dense-connections, transformer-hjb-wasserstein, transformer-mckean-vlasov-model]
source: "Claude conversation: Hamilton-Jacobi equations in Wasserstein space applications (2026-05). Includes the transformers-as-McKean–Vlasov question."
---

## Article

Is the HJ-on-Wasserstein-space literature practical, or only theoretically interesting? Short answer: it is the **natural equation** for mean field control and for the MFG master equation. Its role is foundational: it justifies the finite-dimensional and numerical approximations that applied users actually run.

### Where the equation comes from

In **mean field control** (control of McKean–Vlasov dynamics), the dynamics and the cost depend on the law $\mu_t$ of the state. The dynamic programming principle holds with the **law as the state**, so the value function is $V(t,\mu)$ on $[0,T]\times\mathcal P_2(\mathbb R^d)$. It solves an HJB equation written with Lions' derivative $\partial_\mu V(t,\mu)(x)$. In the stochastic case it is derived with Itô's formula along flows of (conditional) measures. The equation is intrinsically infinite-dimensional.

### The master equation

The MFG **master equation** is a PDE for $U(t,x,m)$ on $[0,T]\times\mathbb T^d\times\mathcal P(\mathbb T^d)$. It encodes the whole game, linking individual decisions to the population dynamics, in one equation. Its well-posedness theory (Cardaliaguet–Delarue–Lasry–Lions) is what makes the convergence of $N$-player Nash equilibria to the MFG rigorous. Viscosity theories on Wasserstein space (Gangbo–Tudorascu; the Bayraktar–Ekren–Zhang line, unverified) push this beyond the smooth, monotone regime.

### What it is used for, honestly

MFG and MFC models are used in finance and systemic risk, crowd and traffic dynamics, epidemiology (vaccination decisions depending on the population immunization rate), wireless interference, energy markets and opinion dynamics. Machine-learning solvers for high-dimensional MFG/MFC also rely on the HJB structure. But applied users mostly work with finite-dimensional or parametric approximations and rarely touch the infinite-dimensional PDE. The theory sits at the "foundations that justify the approximations" end, not the "algorithm we ran" end.

### Transformer training as McKean–Vlasov control

Geshkovski–Letrouit–Polyanskiy–Rigollet ("A mathematical perspective on Transformers", arXiv 2312.10794) model tokens as interacting particles. Layers play the role of time, and in the mean-field limit the token distribution follows a McKean–Vlasov flow $\partial_t\mu_t+\operatorname{div}(\mu_t\,X_{\theta_t}[\mu_t])=0$, where the attention field depends on $\mu_t$. They find clustering at large times. Training then looks like **deterministic McKean–Vlasov optimal control**. The state is the token measure, the control is the parameter path $\theta_t$ (shared by all tokens), and the cost is a terminal loss $\mathcal L(\mu_T)$, possibly plus a running regularization $R(\theta)$. The value function solves the first-order HJB

$$
\partial_tV+\inf_\theta\Big\{\int\partial_\mu V(t,\mu)(x)\cdot X_\theta[\mu](x)\,\mu(dx)+R(\theta)\Big\}=0,\qquad V(T,\cdot)=\mathcal L.
$$

### HJB vs Pontryagin

The **Pontryagin** principle (forward state, backward adjoint $p_t(x)$, $\theta_t$ minimizing the Hamiltonian) is the continuum version of **backpropagation**. Along an optimal path, where $V$ is smooth, $p_t=\partial_\mu V(t,\mu_t)$. HJB is the global, dynamic-programming version of the same story. It is harder to use, but it would see the global landscape: non-convexity in the Wasserstein sense, saddles, and non-differentiability of $V$ in $\mu$. The chat speculated that $V$ might be singular near the clustering phase transitions found in the stationary McKean–Vlasov analysis, which would bear on why training is hard. This is speculation, not a result.

### Caveats

- Real training is discrete (SGD steps), and depth is finite. The continuous-time flow is an idealization, the same one used by continuous-depth and ResNet-as-ODE work.
- **Training is an ensemble problem.** One parameter path must serve every input sequence: minimize $\mathbb E_{\mu_0\sim\mathcal D}[\mathcal L(\mu_T^{\mu_0})]$. The state is then a distribution over token measures (an element of $\mathcal P(\mathcal P(\mathbb R^d))$, or a finite family of measures for a finite dataset), not a single $\mu$. $V(t,\mu)$ for a single $\mu$ describes fitting one prompt. Also, next-token losses read off a specific token, so the loss is not a function of the empirical measure alone. (These two points were not in the chat.)
- The relation between viscosity solutions defined directly on $\mathcal P_2$ and viscosity solutions of the lifted equation on $L^2$ is not fully understood.

## Cards

Q: Why is the value function of a mean field control problem a function on $\mathcal P_2$ rather than on $\mathbb R^d$?
A: The dynamics and cost depend on the law of the state, so the dynamic programming principle closes only with the **law** as the state variable. The HJB then involves the Lions derivative $\partial_\mu V$.
See: Where the equation comes from

Q: What is the MFG master equation, and why does its well-posedness matter beyond the equation itself?
A: A PDE for $U(t,x,m)$ with $m\in\mathcal P(\mathbb T^d)$ that encodes the whole game in one object. Its well-posedness (Cardaliaguet–Delarue–Lasry–Lions) is the tool that proves $N$-player Nash equilibria converge to the MFG.
See: The master equation

Q: In the transformer-as-McKean–Vlasov picture, what are the state, the control and the cost when you view training as optimal control?
A: State: the token distribution $\mu_t$ (layer = time). Control: the parameter path $\theta_t$, shared by all tokens. Cost: a terminal loss $\mathcal L(\mu_T)$, plus possibly a regularization of $\theta$.
See: Transformer training as McKean–Vlasov control

Q: Write the HJB for deterministic McKean–Vlasov control $\partial_t\mu+\operatorname{div}(\mu X_\theta[\mu])=0$ with cost $\int R(\theta)\,dt+\mathcal L(\mu_T)$.
A: $\partial_tV+\inf_\theta\{\int\partial_\mu V(t,\mu)(x)\cdot X_\theta[\mu](x)\,\mu(dx)+R(\theta)\}=0$, $V(T,\cdot)=\mathcal L$. It is first order because there is no noise.
See: Transformer training as McKean–Vlasov control

Q: How does backpropagation appear in McKean–Vlasov optimal control?
A: As the Pontryagin adjoint $p_t(x)$, solved backward along the trajectory. Where $V$ is smooth, $p_t=\partial_\mu V(t,\mu_t)$ along the optimal path. HJB is the global (dynamic programming) counterpart.
See: HJB vs Pontryagin

Q: Why is "training a transformer = control of one McKean–Vlasov flow" not quite right?
A: One parameter path must serve every input sequence. The objective is $\mathbb E_{\mu_0\sim\mathcal D}[\mathcal L(\mu_T^{\mu_0})]$, so the state is a distribution over token measures (in $\mathcal P(\mathcal P(\mathbb R^d))$). A single-$\mu$ value function describes fitting one prompt.
See: Caveats

Q: Where does HJ-on-Wasserstein theory sit in the pipeline to applications?
A: At the foundations. Applied users solve finite-dimensional or parametric approximations, and the infinite-dimensional theory (existence, uniqueness, stability) is what justifies those approximations and numerical schemes.
See: What it is used for, honestly

## Quiz

Q: For deterministic McKean–Vlasov control (no noise), the HJB on $\mathcal P_2$ involves…
- [x] only the first Lions derivative $\partial_\mu V$
- [ ] $\partial_\mu V$ and the second-order term $\int\operatorname{tr}\,\partial_x\partial_\mu V\,d\mu$
- [ ] the Euclidean gradient of $V$ with respect to $x\in\mathbb R^d$
- [ ] no derivative in $\mu$, because the control is a finite-dimensional parameter
E: Noise in the particle dynamics would add $\int\operatorname{tr}(\partial_x\partial_\mu V)\,d\mu$ terms. A finite-dimensional control still acts on an infinite-dimensional state.
See: Transformer training as McKean–Vlasov control

Q: In McKean–Vlasov control, the continuum analogue of backpropagation is…
- [ ] the forward McKean–Vlasov equation
- [x] the backward adjoint equation of the Pontryagin principle
- [ ] the master equation
- [ ] the ergodic HJB equation
E: The adjoint $p_t$ carries the sensitivity of the loss backward through the layers. Along a smooth optimal path it equals $\partial_\mu V(t,\mu_t)$.
See: HJB vs Pontryagin

Q: A known open issue for viscosity solutions of HJ equations on Wasserstein space is…
- [x] the relation between solutions defined on $\mathcal P_2$ and solutions of the lifted equation on $L^2$
- [ ] whether the dynamic programming principle holds for mean field control
- [ ] whether the Lions derivative is well defined for smooth functions of measures
- [ ] whether the master equation has smooth solutions under monotonicity and smooth data
E: The DPP and Lions derivatives are standard. Smooth master-equation solutions exist under monotonicity and smoothness (Cardaliaguet–Delarue–Lasry–Lions). Comparing intrinsic and lifted viscosity notions is the delicate part.
See: Caveats
