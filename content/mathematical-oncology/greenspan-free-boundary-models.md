---
title: "Spheroids as free-boundary problems: Greenspan to Friedman"
tags: [cancer, free-boundary-problems, bifurcation, tumour-spheroids, darcy-law]
created: 2026-10-21
related: [hele-shaw-limit-tumour-growth, phase-field-and-mixture-models, tumour-growth-unbalanced-transport, mathematical-oncology-landscape, invasion-and-angiogenesis-models, tumor-growth-laws, numerical-optimal-control-methods]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

An avascular tumour spheroid grows until diffusion can no longer feed its centre: a proliferating rim, a quiescent shell and a necrotic core appear in succession and the radius settles at a dormant steady state. Greenspan (1972) turned this into the first free-boundary model (a quasi-steady nutrient in a ball of radius $R(t)$, consumed in the viable rim, with an inhibitor produced in the core; the equations here are paraphrased, the original was not re-read). Greenspan (1976) added what every later model keeps: cells move with a velocity field driven by pressure, and surface tension acts at the boundary. He also gave the first linear stability analysis of the spherical interface. Everything in this note is a sharp-interface description; the [Hele-Shaw limit](#/note/hele-shaw-limit-tumour-growth) of density models recovers the same structure with $p=0$ instead of surface tension on the boundary, and [mixture theory](#/note/phase-field-and-mixture-models) supplies the constitutive closures.

### The standard model

In the nondimensional form used by Byrne–Chaplain and by Friedman and coauthors, the tumour occupies $\Omega(t)$, the nutrient $\sigma$ is quasi-steady with linear consumption, and the pressure $p$ obeys Darcy's law $v=-\nabla p$ with net proliferation as the volume source:
$$
\Delta\sigma=\sigma \ \text{ in }\Omega(t),\qquad \sigma=1 \ \text{ on }\partial\Omega(t),
$$
$$
-\Delta p=\mu\,(\sigma-\tilde\sigma)\ \text{ in }\Omega(t),\qquad p=\kappa\ \text{ on }\partial\Omega(t),\qquad V_n=-\partial_n p\ \text{ on }\partial\Omega(t).
$$
Here $\mu$ is the ratio of proliferation to adhesion (surface tension has been scaled to one), $\tilde\sigma\in(0,1)$ is the nutrient level at which apoptosis balances mitosis, $\kappa$ is the mean curvature (the Laplace–Young condition) and $V_n$ the normal velocity of the boundary. The pressure equation says $\operatorname{div}v=\mu(\sigma-\tilde\sigma)$: cells are incompressible, so net birth must be accommodated by motion.

### The radial problem: a worked example

In three dimensions the nutrient in a ball of radius $R$ is $\sigma(r)=\dfrac{R\sinh r}{r\sinh R}$. Integrating $\operatorname{div} v$ over the ball gives the radius equation
$$
\dot R=\frac{\mu}{R^2}\int_0^R r^2\,(\sigma-\tilde\sigma)\,dr=\frac{\mu R}{3}\Big(f(R)-\tilde\sigma\Big),\qquad f(R)=\frac{3\,(R\coth R-1)}{R^2}.
$$
The function $f$ decreases strictly from $f(0^+)=1$ to $0$ (with $f(R)=1-R^2/15+O(R^4)$ for small $R$ and $f(R)\sim3/R$ for large $R$). Three facts follow at once, and they are what Byrne–Chaplain (1995) found for their fuller model with inhibitors:

- A nontrivial stationary radius $R_*$, defined by $f(R_*)=\tilde\sigma$, exists if and only if $0<\tilde\sigma<1$ (for $\tilde\sigma=0.5$, $R_*\approx4.73$ in nutrient diffusion lengths). Outside that window only the trivial tumour exists.
- Where it exists it is globally attracting for radial data: $\dot R>0$ for $R<R_*$ and $\dot R<0$ for $R>R_*$. Byrne–Chaplain obtained the stability by a two-timing expansion.
- The trivial state is unstable exactly when the finite tumour exists: a small ball grows like $e^{\mu(1-\tilde\sigma)t/3}$.

Note that $\mu$ only rescales time in the radial problem; it decides stability only once the shape is allowed to deform. Byrne–Chaplain (1996) added a necrotic core (a second free boundary, inside, where $\sigma$ falls to a threshold), and Byrne–Chaplain (1997) perturbed the sphere non-radially and found mode-dependent instability.

### The rigorous line: Friedman, Reitich, Cui, Hu

Friedman–Reitich (1999) proved, for the full free-boundary problem above, existence and uniqueness of the radially symmetric stationary solution $(\sigma_*,p_*,R_*)$ and its asymptotic stability under radial perturbations. Friedman–Reitich (2000) then proved symmetry breaking: for every $n\ge2$ there is a value $\mu_n$ of the proliferation parameter at which a branch of non-radial stationary solutions, with boundary $r=R_*+\varepsilon Y_{n,0}+O(\varepsilon^2)$, bifurcates from the sphere. Modes $n=0$ and $n=1$ are excluded for a reason worth remembering: $n=0$ changes the radius (and the radial problem has a unique stationary radius), while $n=1$ is a translation of the sphere, which is trivially another stationary solution. Cui–Friedman did the same programme for the inhibitor model (2000) and the necrotic model with two interfaces (2001). Friedman–Hu (2006) added the dynamic statement: there is a threshold $\mu_*$ such that the radial stationary tumour is asymptotically stable for $\mu<\mu_*$ and unstable for $\mu>\mu_*$, with the instability entering through the $n=2$ mode (this threshold statement rests on a single secondary source in the survey). The mechanism is a competition: proliferation ($\mu$) amplifies protrusions, which reach more nutrient, while surface tension penalises mode $n$ ever more strongly as $n$ grows, so $\mu_n\to\infty$ and the first mode to go unstable is the lowest non-trivial one.

Friedman's surveys (2004, 2007) list what the theory does not give: global existence for non-radial data, and the nonlinear fate of the $n=2$ instability beyond the bifurcation point. Recent continuations are He–Wang–Xing (2025), the first symmetry-breaking bifurcation of time-periodic solutions (periodic nutrient supply), and Zhao, Wu, Leander, Ding and Lenhart (2024), who prove existence and characterise optimal inhibitor controls in a multilayer free-boundary model, both stationary and parabolic (see [numerical optimal control](#/note/numerical-optimal-control-methods) for the toolbox).

### Nonlinear simulation: Cristini, Lowengrub, Nie

Cristini–Lowengrub–Nie (2003) solved the same model (no necrosis, no inhibitor) with a boundary-integral method, which is natural because both equations are linear inside $\Omega(t)$. After nondimensionalisation the dynamics depend on two groups, $G$ (mitosis relative to relaxation by cell mobility and adhesion) and $A$ (apoptosis relative to mitosis). Their numerical results: the $(G,A)$ plane splits into three regimes, identified with low, moderate and high vascularisation; in the first two there are critical conditions under which tumours reach nontrivial dormant shapes or grow self-similarly; highly vascularised tumours grow without bound but stay compact, without fingering; and the picture is qualitatively the same in two and three dimensions. This is the nonlinear confirmation that the linear instabilities of Greenspan (1976) and Byrne–Chaplain (1997) produce fingering, the origin of "morphological instability as an invasion mechanism" later taken up in [invasion models](#/note/invasion-and-angiogenesis-models).

## Cards

Q: In the standard spheroid free-boundary model, what are the three equations on the tumour boundary $\partial\Omega(t)$ and what does each express?
A: $\sigma=1$ (nutrient at the external level), $p=\kappa$ (Laplace–Young: surface tension balances pressure), and $V_n=-\partial_np$ (the boundary moves with the Darcy velocity $v=-\nabla p$).
See: The standard model

Q: Why is the pressure equation in the spheroid model $-\Delta p=\mu(\sigma-\tilde\sigma)$ rather than $\Delta p=0$?
A: Cells are incompressible and move with $v=-\nabla p$, so $\operatorname{div}v=-\Delta p$ must equal the net proliferation rate $\mu(\sigma-\tilde\sigma)$. Harmonic pressure would mean no net birth or death.
See: The standard model

Q: For the radial spheroid model, when does a nontrivial stationary radius exist, and is it stable?
A: Iff $0<\tilde\sigma<1$: $\dot R=\frac{\mu R}{3}(f(R)-\tilde\sigma)$ with $f(R)=3(R\coth R-1)/R^2$ decreasing from $1$ to $0$. The root $R_*$ is globally attracting for radial data; the trivial state is then unstable.
See: The radial problem: a worked example

Q: Why does the proliferation parameter $\mu$ play no role in the stability of the *radial* spheroid problem but decide stability of the sphere's *shape*?
A: Radially, $\mu$ only multiplies the right side of $\dot R=\frac{\mu R}{3}(f(R)-\tilde\sigma)$, so it rescales time. Non-radial modes are driven by proliferation against surface tension, so a threshold $\mu_*$ appears (Friedman–Hu 2006).
See: The rigorous line: Friedman, Reitich, Cui, Hu

Q: In Friedman–Reitich's (2000) symmetry-breaking theorem, why do the bifurcating branches start at mode $n=2$?
A: Mode $n=0$ only changes the radius, and the radial stationary solution is unique; mode $n=1$ is a translation of the sphere, trivially another stationary solution. The first genuine shape mode is $n=2$.
See: The rigorous line: Friedman, Reitich, Cui, Hu

Q: Why is the first unstable mode of the spherical tumour the lowest non-trivial one, with $\mu_n\to\infty$?
A: Surface tension (the condition $p=\kappa$) penalises high-frequency boundary modes increasingly strongly, so a larger proliferation $\mu$ is needed to destabilise mode $n$ as $n$ grows.
See: The rigorous line: Friedman, Reitich, Cui, Hu

Q: What did Cristini–Lowengrub–Nie (2003) find numerically about highly vascularised tumours in the sharp-interface model?
A: They grow without bound but remain compact, without invasive fingering; dormant shapes and self-similar growth occur only in the low and moderate vascularisation regimes of the $(G,A)$ plane.
See: Nonlinear simulation: Cristini, Lowengrub, Nie

## Quiz

Q: In the spheroid model, the stationary radius $R_*$ is determined by $f(R_*)=\tilde\sigma$ with $f(R)=3(R\coth R-1)/R^2$. Which statement is correct?
- [x] $R_*$ exists and is unique iff $0<\tilde\sigma<1$, and it does not depend on $\mu$
- [ ] $R_*$ exists for every $\tilde\sigma>0$ and grows with $\mu$
- [ ] $R_*$ exists iff $\tilde\sigma>1$, because apoptosis must dominate at the centre
- [ ] $R_*$ is unique only for $\mu$ below the Friedman–Hu threshold $\mu_*$
E: $f$ decreases strictly from $1$ to $0$, so there is exactly one root when $0<\tilde\sigma<1$ and none otherwise. The stationary condition is "total net proliferation zero", in which $\mu$ cancels. The threshold $\mu_*$ concerns the stability of the shape, not the existence of the radius.
See: The radial problem: a worked example

Q: Which mechanism makes the spherical tumour lose stability as $\mu$ increases past $\mu_*$ (Friedman–Hu 2006)?
- [x] Proliferation amplifies boundary protrusions that reach more nutrient, while surface tension damps only high modes strongly, so mode $n=2$ goes unstable first
- [ ] The radial ODE $\dot R=\frac{\mu R}{3}(f(R)-\tilde\sigma)$ becomes unstable at $R_*$ for large $\mu$
- [ ] The nutrient equation $\Delta\sigma=\sigma$ loses uniqueness for large $\mu$
- [ ] Mode $n=1$ grows, translating the tumour toward the nutrient source
E: The radial problem is stable for every $\mu$ (it only rescales time); the nutrient problem is linear and always uniquely solvable; mode $n=1$ is a translation, which is neutral. The instability is a shape instability driven by proliferation against surface tension.
See: The rigorous line: Friedman, Reitich, Cui, Hu

Q: What does the Laplace–Young condition $p=\kappa$ on $\partial\Omega(t)$ become in the Hele-Shaw limit of density models, and why?
- [x] $p=0$: there is no surface tension in a density model with a stiff pressure law, the boundary is where the pressure vanishes
- [ ] $p=\kappa$ is kept, because the Hele-Shaw limit is the same problem
- [ ] $p=-\kappa$, because the sign of the curvature flips in the density description
- [ ] $\partial_np=0$, because the density is continuous across the boundary
E: In the Perthame–Quirós–Vázquez limit the pressure is a function of the density ($p=P_m(\rho)$) that vanishes where $\rho<1$; there is no interfacial energy, so the boundary condition is $p=0$ rather than a curvature term.
See: The standard model
