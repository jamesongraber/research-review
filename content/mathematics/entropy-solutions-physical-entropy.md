---
title: Entropy solutions and physical entropy
tags: [conservation-laws, entropy-solutions, viscosity-solutions, hamilton-jacobi, history-of-mathematics]
created: 2026-07-18
related: [euler-shock-entropy-selection]
source: "Claude conversation: Entropy solutions and physical entropy in nonlinear PDEs (2026-07)"
---

## Article

The "entropy" in entropy solutions is literal physics in exactly one place, gas dynamics, where the admissibility condition is the second law of thermodynamics. Everywhere else (Burgers, traffic flow, scalar laws in general) it is a mathematical selection principle that keeps the name and the convexity-plus-dissipation structure, not the thermodynamics.

### Why an admissibility criterion is needed

Weak solutions of $u_t+\operatorname{div}f(u)=0$ are not unique. Across a discontinuity the Rankine–Hugoniot conditions fix the shock speed, but both a compressive jump and its reverse can satisfy them. Something extra must select the right one. For Burgers with $u_0 = \mathbf 1_{x>0}$, both the rarefaction fan $u=x/t$ on $0<x<t$ and the jump from $0$ to $1$ moving at speed $\tfrac12$ are weak solutions. Only the fan is admissible.

### Physical origin: Euler and the second law

Shocks in compressible flow were studied in the 19th century: Riemann (1860) on discontinuous solutions, then the jump conditions of Rankine (1870) and Hugoniot (late 1880s). Conservation of mass, momentum and energy alone allows both compression shocks and expansion shocks. The second law rules out the latter: specific entropy $s$ cannot decrease across a shock. In conservation form this is $(\rho s)_t+(\rho u s)_x\ge0$ in the weak sense. The worked example is in [Euler shocks](#/note/euler-shock-entropy-selection).

The mathematical entropy is **minus** the physical one. $\eta=-\rho s$ is a convex function of the conserved variables $(\rho,\rho u,E)$, with flux $q=-\rho us$, and the condition reads $\eta_t+q_x\le0$. Mathematicians prefer convex entropies that *decrease*, and physicists prefer entropy that *increases*.

### Kruzhkov's abstraction

For a scalar law, an **entropy pair** $(\eta,q)$ has $\eta$ convex and $q'=\eta'f'$. An **entropy solution** satisfies $\eta(u)_t+\operatorname{div}q(u)\le0$ in $\mathcal D'$ for every pair. Kruzhkov (1970, in several space variables) proved existence, uniqueness and the $L^1$ contraction $\|u(t)-v(t)\|_{L^1}\le\|u_0-v_0\|_{L^1}$.

- **Why the sign.** If $u^\varepsilon_t+f(u^\varepsilon)_x=\varepsilon u^\varepsilon_{xx}$, multiplying by $\eta'(u^\varepsilon)$ gives $\eta_t+q_x=\varepsilon\eta_{xx}-\varepsilon\eta''(u^\varepsilon)|u^\varepsilon_x|^2\le\varepsilon\eta_{xx}$. Let $\varepsilon\to0$. So the entropy solution is the vanishing-viscosity limit, which is arguably the more basic characterization. No physics is needed.
- **Kruzhkov's entropies.** It suffices to use $\eta_k(u)=|u-k|$, $q_k=\operatorname{sgn}(u-k)(f(u)-f(k))$ for all $k\in\mathbb R$. Any convex $\eta$ is locally a limit of affine functions plus nonnegative combinations of the $|u-k|$, and affine $\eta$ give equalities (the equation itself).

Before Kruzhkov, Oleinik (1950s) gave an admissibility condition for scalar equations with convex flux, and Lax (1957) gave shock inequalities for systems.

### Link to viscosity solutions

Crandall–Lions viscosity solutions (1983) are named after the vanishing-viscosity method, not after entropy. But the two are closely tied in **one space dimension**: $\varphi$ is the viscosity solution of $\varphi_t+H(\varphi_x)=0$ if and only if $u=\varphi_x$ is the entropy solution of $u_t+H(u)_x=0$. For convex $H$ this is visible from the Hopf–Lax and Lax–Oleinik formulas. For general $H$ in 1D it is also known (Caselles 1992; Karlsen–Risebro 2002; unverified). In several dimensions $D\varphi$ solves a *system*, and there is no such scalar correspondence. So viscosity solutions in HJ, MFG or HJ-on-Wasserstein settings inherit the same logic, "vanishing viscosity selects the stable branch", without being literally about entropy.

## Cards

Q: Why do conservation laws need an entropy condition, and when is it literally physical entropy?
A: Weak solutions are not unique: Rankine–Hugoniot allows both a jump and its reverse. For compressible Euler the selection criterion is literally the second law (specific entropy cannot decrease across a shock). For Burgers, traffic flow and other scalar laws it is a mathematical selection principle with no thermodynamic content.
See: Physical origin: Euler and the second law

Q: Sketch the history of the entropy condition from Euler to Kruzhkov.
A: Riemann (1860) studied discontinuous solutions of Euler. Rankine and Hugoniot gave the jump conditions, which allow both compression and expansion shocks, and the second law excludes expansion shocks. Lax and Oleinik (1950s) abstracted this into admissibility conditions. Kruzhkov (1970) gave the general scalar theory with convex entropy pairs.
See: Physical origin: Euler and the second law

Q: Define a Kruzhkov entropy solution of $u_t+\operatorname{div}f(u)=0$ and state what it gives.
A: For every convex $\eta$ with $q'=\eta'f'$, $\eta(u)_t+\operatorname{div}q(u)\le0$ in $\mathcal D'$. It gives existence, uniqueness and $L^1$ contraction, and it coincides with the vanishing-viscosity limit.
See: Kruzhkov's abstraction

Q: Why does the vanishing-viscosity limit satisfy $\eta(u)_t+q(u)_x\le0$ (and not $\ge$)?
A: Multiply $u_t+f(u)_x=\varepsilon u_{xx}$ by $\eta'(u)$. You get $\eta_t+q_x=\varepsilon\eta_{xx}-\varepsilon\eta''(u)u_x^2$. Convexity makes the last term $\le0$, and $\varepsilon\eta_{xx}\to0$ in $\mathcal D'$.
See: Kruzhkov's abstraction

Q: Why is it enough to check the entropy inequality for Kruzhkov's entropies $|u-k|$?
A: Every convex $\eta$ is locally a limit of an affine function plus nonnegative combinations of $|u-k|$. Affine entropies give equalities, which is just the conservation law, and the inequalities are preserved under such combinations and limits.
See: Kruzhkov's abstraction

Q: For compressible Euler, what is the mathematical entropy pair, and how does its sign relate to physical entropy?
A: $\eta=-\rho s$, $q=-\rho us$. $\eta$ is convex in $(\rho,\rho u,E)$, and $\eta_t+q_x\le0$ is the second law $(\rho s)_t+(\rho us)_x\ge0$. Mathematical entropy is minus physical entropy.
See: Physical origin: Euler and the second law

Q: How are viscosity solutions of HJ equations related to entropy solutions of conservation laws?
A: In one space dimension, $\varphi$ is the viscosity solution of $\varphi_t+H(\varphi_x)=0$ iff $u=\varphi_x$ is the entropy solution of $u_t+H(u)_x=0$. Both pick the vanishing-viscosity limit. The name "viscosity" refers to that limit, not to entropy.
See: Link to viscosity solutions

## Quiz

Q: Kruzhkov's entropy solutions are characterized among weak solutions as…
- [x] the limits of vanishing viscosity $\varepsilon u_{xx}$
- [ ] the weak solutions satisfying Rankine–Hugoniot
- [ ] the solutions that maximize physical entropy
- [ ] the limits of vanishing dispersion $\varepsilon u_{xxx}$
E: Rankine–Hugoniot holds for every weak solution, so it selects nothing. Vanishing dispersion (KdV-type) limits are generally different, with oscillatory weak limits. There is no physical entropy in a scalar law.
See: Kruzhkov's abstraction

Q: In which setting is the entropy condition literally the second law of thermodynamics?
- [ ] Burgers' equation
- [ ] the Lighthill–Whitham traffic model
- [x] compressible Euler equations for a gas
- [ ] Hamilton–Jacobi equations from mean field games
E: Only gas dynamics has a thermodynamic entropy. Elsewhere "entropy" names convex pairs and dissipation, the mathematical signature of irreversibility.
See: Physical origin: Euler and the second law

Q: The equivalence "$\varphi$ viscosity solution of $\varphi_t+H(\varphi_x)=0$ iff $\varphi_x$ entropy solution of $u_t+H(u)_x=0$" holds…
- [x] in one space dimension
- [ ] in any dimension, for convex $H$
- [ ] only for $H(p)=p^2/2$
- [ ] in any dimension, for any $H$
E: In $d>1$, $D\varphi$ satisfies a system, not a scalar conservation law, so Kruzhkov's theory does not apply. In 1D it holds beyond the quadratic case.
See: Link to viscosity solutions
