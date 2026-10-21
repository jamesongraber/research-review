---
title: "Tumour–immune ODEs: Kuznetsov, Kirschner–Panetta and the predator–prey critique"
tags: [cancer, tumour-immune, bistability, bifurcation-theory, predator-prey]
created: 2026-10-21
related: [immunotherapy-optimal-control, immune-evasion-games-car-t, cml-dynamics-treatment-free-remission, tumor-growth-laws, adaptive-therapy-control, tumour-containment-theory, replicator-lotka-volterra, permanence-heteroclinic-cycles]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

Planar tumour–effector models have the same skeleton since Stepanova (1980): a tumour that grows on its own, an immune population that is fed by a constant source, recruited by the tumour, exhausted by the tumour, and kills it. The shared phenomenology is a phase portrait: a stable microscopic equilibrium (dormancy), a saddle whose stable manifold is the **immunological barrier**, and a macroscopic escape state. This note fixes the canonical examples and what is theorem versus picture.

### Stepanova's template

Stepanova's model (structure paraphrased from Ledzewicz and Schättler's later use of it) has tumour volume $x$ and immunocompetent density $y$:
$$
x' = \mu_C\, x\,F(x) - \gamma\, x y,\qquad y' = \mu_I\,(x-\beta x^2)\,y - \delta y + \alpha ,
$$
with Gompertz growth $F(x) = -\ln(x/x_\infty)$. The term $x-\beta x^2$ says small tumours stimulate the immune response and large ones suppress it. This is the state equation of the [chemo-immunotherapy control problems](#/note/immunotherapy-optimal-control).

### Kuznetsov's fitted phase plane

Kuznetsov, Makalkin, Taylor and Perelson (1994) wrote, for effectors $E$ and tumour cells $T$,
$$
E' = s + \frac{pET}{g+T} - mET - dE,\qquad T' = aT(1-bT) - nET ,
$$
(source, Michaelis–Menten recruitment, inactivation, death; logistic growth, mass-action kill) and fitted it to mouse lymphoma data. Scaling by $g$ gives
$$
x' = \sigma + \frac{\rho xy}{1+y} - \mu xy - \delta x,\qquad y' = \alpha y(1-\beta y) - xy ,
$$
with fitted values $\sigma=0.1181$, $\rho=1.131$, $\mu=0.00311$, $\delta=0.3743$, $\alpha=1.636$, $\beta=2\times10^{-3}$ (units of $10^6$ cells). Recomputing the equilibria with these values: the tumour-free state $(\sigma/\delta,0)=(0.316,0)$ is a saddle (eigenvalues $-0.374$, $+1.320$, the latter being $\alpha-\sigma/\delta$), so a single tumour cell is never rejected; a **dormant focus** $(1.635,\,0.366)$ with eigenvalues $-0.037\pm0.600i$; a **saddle** $(0.654,\,300.2)$; and a **macroscopic node** $(0.191,\,441.8)$ near the capacity $1/\beta=500$. The saddle's stable manifold is the barrier. Numerically, starting from the tumour-free immune level $x_0=\sigma/\delta$, tumours below about $115\times10^6$ cells spiral into dormancy and larger ones escape; the threshold is $35$ at $x_0=0.1$ and $330$ at $x_0=0.7$, and above $x_0\approx1$ nothing below capacity escapes. "Sneaking through" (a tumour shrunk but not cleared that later escapes) is a trajectory passing the saddle on the wrong side. Barrier and sneaking-through are phase-portrait observations, not theorems.

### No cycles without forcing

The slow spiral into dormancy is the model's one oscillation. Closed orbits are excluded by Dulac: with $B=1/(xy)$,
$$
\partial_x\big(B\,x'\big)+\partial_y\big(B\,y'\big) = -\frac{\sigma}{x^2y} - \frac{\alpha\beta}{x} < 0
$$
on the open quadrant. Eftimie, Bramson and Earn (2011), citing Kuznetsov and d'Onofrio, state the general version: a two-equation model without external treatment and with $\frac{d}{dx}\big(f(x)/g(x)\big)\le 0$ has no periodic, homoclinic or heteroclinic cycles. Sustained oscillations need a third variable, a delay (Galach 2003) or periodic therapy.

### Kirschner–Panetta: antigenicity and the IL-2 pathology

Kirschner and Panetta (1998) add IL-2, $I_L$:
$$
E' = cT - \mu_2E + \frac{p_1EI_L}{g_1+I_L} + s_1,\quad
T' = r_2T(1-bT) - \frac{aET}{g_2+T},\quad
I_L' = \frac{p_2ET}{g_3+T} - \mu_3I_L + s_2 .
$$
Antigenicity $c$ is the bifurcation parameter: low $c$ gives a persistent large tumour, intermediate $c$ a large-amplitude limit cycle (read as relapse), high $c$ damped oscillations to a dormant tumour; without therapy the tumour is never cleared. Therapy thresholds follow from linearising at $T=0$. With ACI alone, $E^*=s_1/\mu_2$ and $T'\approx T\,(r_2 - aE^*/g_2)$, so the tumour-free state is stable iff $s_1 > r_2g_2\mu_2/a$. With IL-2 alone, $I_L^*=s_2/\mu_3$ and $E' = E\big(p_1I_L^*/(g_1+I_L^*) - \mu_2\big)$: the tumour is cleared iff $s_2 > \mu_2\mu_3g_1/(p_1-\mu_2)$, but then the effector growth rate is positive and, with no effector carrying capacity, $E\to\infty$. The authors matched this to capillary-leak toxicity of high-dose IL-2; mathematically it is a missing saturation.

### d'Onofrio's metamodel and the Gompertz obstruction

d'Onofrio (2005) treats the whole class
$$
x' = x\big(\alpha f(x) - \phi(x)\,y\big),\qquad y' = \beta(x)y - \mu(x)y + \sigma q(x) + \theta(t),
$$
with $f'\le0$, $\phi'\le0$, $\beta(0)=0$, $\beta'\ge0$, $\mu'>0$, $q(0)=1$, and $\Psi=\mu-\beta$. The cancer-free state is $(0,\sigma/\Psi(0))$ and the tumour's growth rate there is $\alpha f(0)-\phi(0)\sigma/\Psi(0)$, so it is locally stable iff $\sigma>\sigma_{cr}=\alpha\Psi(0)f(0)/\phi(0)$ (for Kuznetsov, $\sigma_{cr}=\alpha\delta=0.61>0.118$). If $f(0)=+\infty$, as for Gompertz growth, the cancer-free state is unstable for every $\sigma$: Gompertz growth is incompatible with surveillance of microscopic tumours. Eleven propositions give global behaviour under nullcline-ordering hypotheses, via Dulac and Poincaré–Bendixson. For therapy, constant, periodic and impulsive schedules share the local threshold $\sigma+\theta_m>\sigma_{cr}$ in terms of the mean dose $\theta_m$.

### Kill laws, dormancy as a saddle, and the critique

De Pillis, Radunskaya and Wiseman (2005) replaced mass-action killing for CD8$^+$ cells by the ratio-dependent law $D = d\,(L/T)^\ell/\big(s+(L/T)^\ell\big)$ fitted to chromium-release assays; it is now the default in [CAR-T models](#/note/immune-evasion-games-car-t), though it is not Lipschitz at $T=0$. Wilkie and Hahnfeldt (2013), with a Hahnfeldt-type dynamic carrying capacity, find the dormancy equilibrium is itself a **saddle**, so dormancy is transient and ends in elimination or escape: the clinically relevant object is the separatrix. Sontag (2017) replaces size detection by rate detection: an incoherent feed-forward loop estimates the tumour's exponential growth rate, and with a bistable effector module the outcome as the rate $\lambda$ increases is elimination, tolerance, elimination, escape (two-zone tolerance). Kareva, Luddy, O'Farrelly, Gatenby and Brown (2021) argue that predator–prey is the wrong template: sustained tumour-size oscillations are not observed, and immune cells gain no resource from killed cells, so cancer and immune cells are better modelled as competitors. Eftimie et al. (2011) organise the literature by number of equations and note that the models show more dynamics than experiments ever did.

## Cards

Q: In the nondimensional Kuznetsov model with the fitted parameters, what are the four equilibria and their types?
A: Tumour-free $(0.316,0)$, a saddle; dormant focus $(1.635,0.366)$, stable; saddle $(0.654,300)$; macroscopic node $(0.191,442)$, stable. The saddle's stable manifold is the immunological barrier.
See: Kuznetsov's fitted phase plane

Q: Why is the tumour-free state of the fitted Kuznetsov model unstable?
A: At $(\sigma/\delta,0)$ the tumour grows at rate $\alpha-\sigma/\delta=1.636-0.316>0$: the background immune level cannot reject a single cell. Equivalently $\sigma<\sigma_{cr}=\alpha\delta$ in d'Onofrio's criterion.
See: Kuznetsov's fitted phase plane

Q: Why can a two-equation tumour–immune model without external forcing not have a limit cycle, in the Kuznetsov case?
A: Dulac with $B=1/(xy)$: the divergence of $B\,(x',y')$ is $-\sigma/(x^2y)-\alpha\beta/x<0$ on the open quadrant. Oscillations need a third variable, a delay or periodic therapy.
See: No cycles without forcing

Q: Why does IL-2 alone clear the tumour in the Kirschner–Panetta model only at the price of an unbounded immune response?
A: Clearance needs the effector per-capita rate $p_1I_L^*/(g_1+I_L^*)-\mu_2$ to be positive, and the model has no effector carrying capacity, so the same inequality makes $E\to\infty$.
See: Kirschner–Panetta: antigenicity and the IL-2 pathology

Q: What is the threshold for adoptive cellular immunotherapy $s_1$ to stabilise the tumour-free state in Kirschner–Panetta, and where does it come from?
A: $s_1>r_2g_2\mu_2/a$: at $T=0$, $E^*=s_1/\mu_2$ and the tumour's linear growth rate is $r_2-aE^*/g_2$.
See: Kirschner–Panetta: antigenicity and the IL-2 pathology

Q: Why is Gompertz growth incompatible with immune elimination of microscopic tumours (d'Onofrio 2005)?
A: The cancer-free state is stable iff $\sigma>\alpha\Psi(0)f(0)/\phi(0)$, and Gompertz has $f(0)=+\infty$, so no immune source $\sigma$ makes the cancer-free state stable.
See: d'Onofrio's metamodel and the Gompertz obstruction

Q: What did Wilkie and Hahnfeldt (2013) change about "immune dormancy"?
A: In their model with a dynamic carrying capacity the dormancy equilibrium is a saddle, so dormancy is a transient that ends in elimination or escape; the separatrix, not the equilibrium, is what matters.
See: Kill laws, dormancy as a saddle, and the critique

Q: What is the core of the Kareva et al. (2021) critique of predator–prey tumour–immune models?
A: Sustained tumour-size oscillations are not observed, and immune cells gain no resource from killing, so the interaction is better modelled as competition (plus an "immune web" of modules) than as predation.
See: Kill laws, dormancy as a saddle, and the critique

## Quiz

Q: In Kuznetsov's fitted model, a tumour of $50\times10^6$ cells meets the background immune level $x_0=\sigma/\delta$. What happens?
- [x] It spirals into the dormant focus at about $0.37\times10^6$ cells
- [ ] It is eliminated, since the tumour-free state is stable
- [ ] It grows to the macroscopic node near $442\times10^6$ cells
- [ ] It settles on a limit cycle around the dormant state
E: The computed barrier from $x_0=\sigma/\delta$ is about $115\times10^6$ cells. The tumour-free state is a saddle (never reached), and Dulac excludes cycles.
See: Kuznetsov's fitted phase plane

Q: In the Kirschner–Panetta model without therapy, raising antigenicity $c$ from low to high gives, in order,
- [x] a persistent large tumour, a limit cycle between macroscopic and microscopic sizes, damped oscillations to a dormant tumour
- [ ] a persistent large tumour, a dormant tumour, complete clearance
- [ ] complete clearance, a limit cycle, a persistent large tumour
- [ ] damped oscillations, a limit cycle, a persistent large tumour
E: The tumour is never cleared without therapy; intermediate antigenicity produces the limit cycle that the model reads as relapse.
See: Kirschner–Panetta: antigenicity and the IL-2 pathology

Q: d'Onofrio's metamodel with constant versus periodic immunotherapy $\theta(t)$ of the same mean $\theta_m$:
- [x] has the same local stability threshold $\sigma+\theta_m>\sigma_{cr}$ for the cancer-free state; the schedule shape matters only for very long periods
- [ ] favours periodic therapy, which lowers the threshold by a factor depending on the period
- [ ] favours constant therapy, since periodic forcing creates limit cycles that prevent cure
- [ ] makes the cancer-free state globally stable whenever $\sigma+\theta_m>\sigma_{cr}$
E: The threshold is local; global stability needs more. The numerics show shape dependence only for periods beyond about 100 days.
See: d'Onofrio's metamodel and the Gompertz obstruction
