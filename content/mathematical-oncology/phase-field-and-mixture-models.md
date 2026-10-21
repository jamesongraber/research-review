---
title: "Mixture theory, phase-field models and their optimal control"
tags: [cancer, mixture-theory, cahn-hilliard, pde-constrained-optimal-control, solid-stress]
created: 2026-10-21
related: [greenspan-free-boundary-models, hele-shaw-limit-tumour-growth, tumour-growth-unbalanced-transport, numerical-optimal-control-methods, bang-bang-singular-metronomic, digital-twins-oncology, glioma-reaction-diffusion-personalisation, invasion-and-angiogenesis-models, mathematical-oncology-landscape]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

The [sharp-interface](#/note/greenspan-free-boundary-models) and [Hele-Shaw](#/note/hele-shaw-limit-tumour-growth) models postulate Darcy's law and a pressure-limited growth rate. Mixture theory explains where those closures come from and which ones are thermodynamically admissible; phase-field models replace the sharp tumour boundary by a smooth order parameter with an interfacial energy; and the phase-field models are the one place in spatial oncology where optimal control is fully rigorous.

### Mixture theory: where the pressure comes from

A tissue is a mixture of phases (cells, extracellular liquid, matrix) with volume fractions $\phi_i$, each with its own velocity $v_i$, satisfying the saturation constraint $\sum_i\phi_i=1$ and mass balances $\partial_t\phi_i+\operatorname{div}(\phi_iv_i)=\Gamma_i$ with exchange terms $\Gamma_i$ (proliferation converts liquid into cells). Summing the balances, the composite velocity $\sum\phi_iv_i$ has divergence $\sum\Gamma_i$: the saturation constraint is enforced by a pressure, its Lagrange multiplier, exactly as incompressibility is in fluids. Ambrosi–Preziosi (2002) asked which momentum closures (Darcy, viscous, elastic) are compatible with a dissipation inequality, and Byrne–Preziosi (2003) wrote the two-phase (cells plus liquid) model with a constitutive cell stress $\Sigma(\phi)$ that increases with the cell fraction above a natural packing. Schematically, when the cell phase drifts relative to the liquid against a friction proportional to $\nabla\Sigma(\phi)$, the cell fraction obeys
$$
\partial_t\phi=\operatorname{div}\big(K\phi\,\nabla\Sigma(\phi)\big)+\Gamma(\phi,\sigma),
$$
a porous-medium equation with growth in which $p=\Sigma(\phi)$: this is how the earlier free-boundary models are recovered as limits, and why the homeostatic pressure $p_M$ of the Perthame school is the growth-arresting stress of mixture theory. Preziosi–Tosin (2009) add the extracellular matrix, with cells detaching above a stress threshold.

The experimental basis is Helmlinger et al. (1997): spheroids grown inside agarose gels are inhibited by the solid stress the gel exerts, with stiffer gels giving smaller spheroids. Stylianopoulos et al. (2012) measured solid stress in excised tumours (they open when cut, revealing residual stress). Ambrosi, Pezzuto, Riccobelli, Stylianopoulos and Ciarletta (2017) model the tumour as a poroelastic solid whose growth is driven by a nutrient-dependent target stress and reproduce both spheroid compression and residual stress; the general framework is Goriely's (2017) morphoelasticity, with the multiplicative decomposition $F=AG$ into growth and elastic parts.

### Phase-field models: energy dissipation as the design principle

A phase-field model describes the tumour by an order parameter $\varphi$ ($\varphi=1$ tumour, $\varphi=-1$ host) with the Ginzburg–Landau energy $\int\frac\beta\varepsilon\Psi(\varphi)+\frac{\beta\varepsilon}{2}|\nabla\varphi|^2$, whose minimisers have interfaces of width $\varepsilon$ and energy $\beta$ per unit area. The chemical potential $\mu=\frac\beta\varepsilon\Psi'(\varphi)-\beta\varepsilon\Delta\varphi$ drives a Cahn–Hilliard flux $-m(\varphi)\nabla\mu$. Wise, Lowengrub, Frieboes and Cristini (2008) built the multispecies Cahn–Hilliard–Darcy tumour model and the adaptive multigrid solver for 3-D simulations; Hawkins-Daarud, van der Zee and Oden (2011) wrote the thermodynamically consistent four-species model (tumour and healthy cells, nutrient-rich and nutrient-poor water) that the control literature adopted, and Frigeri–Grasselli–Rocca (2015) proved its well-posedness and long-time behaviour.

Garcke, Lam, Sitka and Styles (2016) show the method at its cleanest. They postulate the energy
$$
\mathcal E(\varphi,\sigma)=\int\frac\beta\varepsilon\Psi(\varphi)+\frac{\beta\varepsilon}{2}|\nabla\varphi|^2+\frac{\chi_\sigma}{2}\sigma^2+\chi_\varphi\,\sigma\,(1-\varphi)
$$
(reconstructed here from the fluxes of their system) and derive the fluxes so that $\mathcal E$ dissipates. The single cross term $\chi_\varphi\sigma(1-\varphi)$ does two jobs: it contributes $-\chi_\varphi\sigma$ to $\mu$, so cells move up nutrient gradients (chemotaxis, also appearing in Darcy's law $v=-K(\nabla p-\mu\nabla\varphi-\chi_\varphi\sigma\nabla\varphi)$), and it makes the nutrient flux $-n(\varphi)(\chi_\sigma\nabla\sigma-\chi_\varphi\nabla\varphi)$, so nutrient is actively transported toward the tumour. Mass exchange is $\Gamma=(\mathcal P\sigma-\mathcal A)h(\varphi)$ with $h(-1)=0$, $h(1)=1$, and $\operatorname{div}v=\alpha\Gamma$. The same recipe yields Brinkman and Stokes variants, a necrotic phase (Garcke–Lam–Nürnberg–Sitka 2018), and the existence theory of Knopf–Signori (2021).

The phase-field approach was carried to patient anatomy by Lorenzo et al. (2016), who simulated prostate cancer growth on a patient's prostate with isogeometric analysis, and Lorenzo et al. (2019), whose mechanically coupled simulations suggest that the stress generated by benign prostatic hyperplasia slows tumour growth, a numerical finding, not a theorem, that echoes Helmlinger's spheroids and feeds into [digital twins](#/note/digital-twins-oncology).

### Optimal control: state, adjoint, variational inequality

Colli, Gilardi, Rocca and Sprekels (2017) took the Hawkins-Daarud model, with a Cahn–Hilliard equation for $\varphi$ coupled to a reaction–diffusion equation for the nutrient $\sigma$, put a distributed control $u$ (nutrient supply or medication) on the right side of the $\sigma$ equation, and minimised a tracking-type cost. The structure is that of any PDE-constrained problem; for a state $y$ solving $\partial_ty-\Delta y+f(y)=u$ with the cost
$$
J(y,u)=\frac{b_1}{2}\int_Q|y-y_Q|^2+\frac{b_2}{2}\int_\Omega|y(T)-y_\Omega|^2+\frac{b_0}{2}\int_Q|u|^2,\qquad u\in U_{\mathrm{ad}}=\{u_{\min}\le u\le u_{\max}\},
$$
the steps are: (i) existence of a minimiser by the direct method ($U_{\mathrm{ad}}$ is weakly compact and the control-to-state map $S$ is continuous); (ii) Fréchet differentiability of $S$, whose derivative $z=S'(u)h$ solves the linearised equation $\partial_tz-\Delta z+f'(y)z=h$, $z(0)=0$; (iii) the adjoint, backward in time,
$$
-\partial_tq-\Delta q+f'(y)\,q=b_1(y-y_Q),\qquad q(T)=b_2\,(y(T)-y_\Omega),
$$
chosen so that testing it against $z$ gives $\int_Q qh=b_1\int_Q(y-y_Q)z+b_2\int_\Omega(y(T)-y_\Omega)z(T)$, that is, $J'(u)h=\int_Q(q+b_0u)\,h$; and (iv) the first-order necessary condition at an optimum $\bar u$,
$$
\int_Q(\bar q+b_0\bar u)(v-\bar u)\ \ge\ 0\quad\text{for all }v\in U_{\mathrm{ad}},
$$
equivalently $\bar u=\operatorname{proj}_{[u_{\min},u_{\max}]}(-\bar q/b_0)$ pointwise, and bang-bang where $b_0=0$ and $\bar q\ne0$, as in [bang-bang and singular controls](#/note/bang-bang-singular-metronomic). For the tumour system the state has three components, the adjoint is a backward Cahn–Hilliard-type system, and step (ii) is the technical heart: it needs the state to be bounded and the potential regular, which is why singular potentials needed separate work (Signori 2018, logarithmic potential, via deep-quench and vanishing-parameter approximations). The literature then grew by model: Garcke–Lam–Rocca (2017) make the treatment time a free variable, Ebenbeck–Knopf (2019) control medication in a Cahn–Hilliard–Brinkman model, Sprekels–Wu (2019) the Cahn–Hilliard–Darcy system with mass sources, Colli–Gilardi–Signori–Sprekels (2026) the velocity in a Brinkman model with curvature effects. Garcke–Lam–Signori (2021) add an $L^1$ term to the cost in a model with elasticity; the optimality condition then forces the drug to vanish wherever the adjoint is small: automatic drug holidays. Second-order sufficient conditions exist (Ebenbeck–Knopf 2021; Sprekels–Tröltzsch 2023), but no feedback or HJB theory, and the costs are tracking-type rather than clinical; see [numerical methods](#/note/numerical-optimal-control-methods) for solving such optimality systems.

## Cards

Q: In a mixture model with saturation constraint $\sum_i\phi_i=1$, where does the pressure come from?
A: It is the Lagrange multiplier of the saturation constraint, as in incompressible fluids: summing the mass balances $\partial_t\phi_i+\operatorname{div}(\phi_iv_i)=\Gamma_i$ forces $\operatorname{div}\sum\phi_iv_i=\sum\Gamma_i$, and the pressure enforces it.
See: Mixture theory: where the pressure comes from

Q: How does the two-phase mixture model (Byrne–Preziosi 2003) reduce to a porous-medium equation with growth, and what is the pressure there?
A: With Darcy-type friction, the cell fraction obeys $\partial_t\phi=\operatorname{div}(K\phi\nabla\Sigma(\phi))+\Gamma$, so the pressure is the constitutive cell stress $p=\Sigma(\phi)$ and the homeostatic pressure is the growth-arresting stress.
See: Mixture theory: where the pressure comes from

Q: What did Helmlinger et al. (1997) show about spheroids, and what did Stylianopoulos et al. (2012) add?
A: Spheroids grown in agarose gels are inhibited by solid stress, more so in stiffer gels. Stylianopoulos et al. measured solid stress in excised tumours (which open when cut, showing residual stress) and modelled it.
See: Mixture theory: where the pressure comes from

Q: What is the construction principle of the Cahn–Hilliard–Darcy tumour model of Garcke–Lam–Sitka–Styles (2016)?
A: Postulate an energy and derive all fluxes so that it dissipates (thermodynamic consistency). A single cross term $\chi_\varphi\sigma(1-\varphi)$ produces both chemotaxis of cells up nutrient gradients and active transport of nutrient toward the tumour.
See: Phase-field models: energy dissipation as the design principle

Q: In a PDE-constrained optimal control problem, how is the gradient of the reduced cost $u\mapsto J(S(u),u)$ computed without differentiating $S$ in every direction?
A: Solve one backward adjoint equation, built so that testing it against the linearised state $z=S'(u)h$ gives $\int_Qqh$; then $J'(u)h=\int_Q(q+b_0u)h$, one forward and one backward solve per gradient.
See: Optimal control: state, adjoint, variational inequality

Q: What is the first-order necessary condition for a distributed control with box constraints and quadratic cost $\frac{b_0}{2}\int|u|^2$, and what does it give pointwise?
A: The variational inequality $\int_Q(\bar q+b_0\bar u)(v-\bar u)\ge0$ for all admissible $v$, i.e. $\bar u=\operatorname{proj}_{[u_{\min},u_{\max}]}(-\bar q/b_0)$; for $b_0=0$ it is bang-bang where $\bar q\ne0$.
See: Optimal control: state, adjoint, variational inequality

Q: Why does an $L^1$ term in the cost of a phase-field tumour control problem produce drug holidays (Garcke–Lam–Signori 2021)?
A: The first-order condition with an $L^1$ penalty forces the optimal drug concentration to vanish wherever the adjoint is below the penalty weight, so the control is sparse in time.
See: Optimal control: state, adjoint, variational inequality

Q: Which step of the Cahn–Hilliard control theory is the technical heart, and why do singular potentials need separate treatment?
A: Fréchet differentiability of the control-to-state map, which needs bounded states and a regular potential; logarithmic potentials are handled by deep-quench and vanishing-parameter approximations (Signori 2018).
See: Optimal control: state, adjoint, variational inequality

## Quiz

Q: In the Garcke–Lam–Sitka–Styles energy, the cross term $\chi_\varphi\sigma(1-\varphi)$ contributes $-\chi_\varphi\sigma$ to the chemical potential $\mu$. What is the effect on cells?
- [x] Chemotaxis: cells move up nutrient gradients, since the flux $-m\nabla\mu$ contains $+m\chi_\varphi\nabla\sigma$
- [ ] Nutrient consumption proportional to $\sigma$
- [ ] Cells move down nutrient gradients, since the term has a minus sign
- [ ] Surface tension between tumour and host increases with $\sigma$
E: $-m\nabla\mu$ contains $-m\nabla(-\chi_\varphi\sigma)=+m\chi_\varphi\nabla\sigma$, a flux of $\varphi$ toward higher nutrient. The same term in the nutrient flux gives active transport of nutrient toward the tumour. Consumption comes from $\mathcal C\sigma h(\varphi)$, not from the energy.
See: Phase-field models: energy dissipation as the design principle

Q: For a state equation $\partial_ty-\Delta y+f(y)=u$ with cost $\frac{b_1}{2}\int_Q|y-y_Q|^2+\frac{b_2}{2}\int_\Omega|y(T)-y_\Omega|^2+\frac{b_0}{2}\int_Q|u|^2$, the adjoint equation is…
- [x] $-\partial_tq-\Delta q+f'(y)q=b_1(y-y_Q)$ backward in time, with $q(T)=b_2(y(T)-y_\Omega)$
- [ ] $\partial_tq-\Delta q+f'(y)q=b_1(y-y_Q)$ forward in time, with $q(0)=0$
- [ ] $-\partial_tq-\Delta q+f(q)=b_1(y-y_Q)$, with $q(T)=0$
- [ ] $-\partial_tq-\Delta q+f'(y)q=b_0u$, with $q(T)=b_2(y(T)-y_\Omega)$
E: The adjoint is linear with the linearised coefficient $f'(y)$, runs backward (its terminal condition carries the terminal cost), and its source is the running tracking term. The control cost $b_0u$ appears in the gradient $q+b_0u$, not in the adjoint equation.
See: Optimal control: state, adjoint, variational inequality

Q: Why does the sharp-interface spheroid model's Laplace–Young condition $p=\kappa$ have a counterpart in phase-field models but not in the Hele-Shaw limit?
- [x] The phase-field energy $\int\frac\beta\varepsilon\Psi+\frac{\beta\varepsilon}{2}|\nabla\varphi|^2$ carries an interfacial energy $\beta$ per unit area that becomes surface tension as $\varepsilon\to0$; the Hele-Shaw limit of a density model has no interfacial energy
- [ ] The Hele-Shaw limit has surface tension too, hidden in the homeostatic pressure $p_M$
- [ ] Phase-field models have no interface, so there is no curvature to speak of
- [ ] Because Cahn–Hilliard is fourth order and Hele-Shaw is second order
E: Surface tension is a property of the energy, not of the order of the equation. The Hele-Shaw model's boundary is simply where the pressure vanishes; $p_M$ is a bulk homeostatic stress, not an interfacial term.
See: Phase-field models: energy dissipation as the design principle
