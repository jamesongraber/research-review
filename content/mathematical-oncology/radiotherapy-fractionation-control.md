---
title: Radiotherapy fractionation as optimisation
tags: [cancer, radiotherapy, linear-quadratic-model, optimisation, chance-constraints]
created: 2026-10-21
related: [anti-angiogenic-optimal-control, numerical-optimal-control-methods, kill-laws-and-scheduling-principles, tumor-growth-laws, glioma-reaction-diffusion-personalisation, digital-twins-oncology]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

Radiotherapy is delivered in **fractions**, and the design variable is the vector of fraction sizes $d_1,\dots,d_n$ rather than a continuous dose rate. So this corner of the literature is discrete optimisation rather than Pontryagin theory — but the central question, "few large fractions or many small ones?", has a clean closed-form answer under the standard radiobiological model.

### The linear-quadratic model and BED

The linear-quadratic (LQ) model posits that a fraction of size $d$ leaves a surviving fraction $e^{-\alpha d-\beta d^2}$. For $n$ equal fractions the total effect is $E = n(\alpha d + \beta d^2)$, and dividing by $\alpha$ gives the **biologically effective dose**
$$
\mathrm{BED} = \frac{E}{\alpha} = n d\Big(1+\frac{d}{\alpha/\beta}\Big) = D\Big(1+\frac{d}{\rho}\Big),
\qquad D = nd, \quad \rho = \alpha/\beta .
$$
Two tissues with the same physical dose $D$ therefore differ only through $\rho$: a tissue with small $\rho$ (late-responding normal tissue) is hurt disproportionately by large fractions. This single observation is the whole theory of fractionation.

### The Unkelbach criterion, derived

Let the organ at risk receive $\delta d$ per fraction, $\delta \in (0,1]$ the **sparing factor** achieved by the dose distribution, and let its tolerance be a fixed $\mathrm{BED}_{\mathrm{OAR}} = c$. Then
$$
n\delta d\Big(1+\frac{\delta d}{\rho_O}\Big) = c \quad\Longrightarrow\quad nd = \frac{c}{\delta\,(1+\delta d/\rho_O)},
$$
and substituting into the tumour BED,
$$
\mathrm{BED}_T(d) = nd\Big(1+\frac{d}{\rho_T}\Big) = \frac{c}{\delta}\cdot\frac{1+d/\rho_T}{1+\delta d/\rho_O},
\qquad
\frac{d}{dd}\,\mathrm{BED}_T \;\propto\; \rho_O - \delta\,\rho_T .
$$
The derivative has a constant sign, so the optimum is at an endpoint: **hypofractionation (one large fraction) is optimal iff $\rho_O > \delta\rho_T$**, i.e. iff $(\alpha/\beta)_{\mathrm{OAR}}$ exceeds the sparing factor times $(\alpha/\beta)_{\mathrm{tumour}}$; otherwise many small fractions are optimal. This is the criterion of Unkelbach, Craft, Salari, Ramakrishnan and Bortfeld (2013). With illustrative textbook values $\rho_T = 10$ Gy and $\rho_O = 3$ Gy, hypofractionation wins exactly when $\delta < 0.3$: only if the conformality of the plan keeps the organ below 30 % of the per-fraction tumour dose.

Their extension handles a **non-uniform** dose to the organ. If voxel $i$ receives $\delta_i d$ and the binding constraint is the mean BED over the organ, then
$$
\frac1m\sum_i n\delta_i d\Big(1+\frac{\delta_i d}{\rho_O}\Big) = n d\,\bar\delta\Big(1+\frac{\delta_{\mathrm{eff}}\,d}{\rho_O}\Big),
\qquad \bar\delta = \frac1m\sum_i\delta_i, \quad \delta_{\mathrm{eff}} = \frac{\sum_i \delta_i^2}{\sum_i \delta_i},
$$
and repeating the computation gives the same criterion with the **effective sparing factor** $\delta_{\mathrm{eff}}$ in place of $\delta$. Since $\delta_{\mathrm{eff}}\ge\bar\delta$, a non-uniform distribution behaves worse than its mean suggests, and spatial dose shaping enters the fractionation decision only through this one number.

### Biology breaks the symmetry: Leder et al. 2014

The criterion assumes the only dynamics is cell kill. Leder, Pitter, Michor and coauthors (Cell, 2014) added population structure for PDGF-driven glioblastoma: stem-like radio-resistant cells and differentiated sensitive cells, LQ kill with the stem-like sensitivity scaled by a factor in $[0,1]$, and — crucially — a fraction of differentiated cells **reverting** to the stem-like state, with the reversion probability depending on the time since the previous dose (peaking at a characteristic delay). Once the kill depends on the *timing* within the day, the problem is no longer a choice of a single fraction size: they searched schedules by simulated annealing, noting the global optimum was not computationally feasible to find. Two optimized schedules (1 Gy fractions at irregular times of day, 10 Gy in one week) gave median survival of about 50 days in mice against 33 days for the standard $5\times 2$ Gy (hazard ratio 0.30, $p=0.001$), while neither hyper- nor hypofractionation differed from standard. This is the rare schedule-optimisation result with a prospective animal validation. Stated limitations: the optimisation covered only one week, the schedules enrich stem-like cells and are not curative, and the parameters were tuned iteratively on a mouse model.

### Uncertainty and personalisation

Badri, Watanabe and Leder (2016) treat the LQ parameters as random and solve a **chance-constrained** fractionation problem (a two-dimensional reduction plus branch-and-bound): the optimum lies on the boundary of the feasible set, and robust schedules avoid single very large fractions — the opposite tail of the deterministic criterion. On the calibration side, Rockne et al. (2010) added an LQ radiotherapy term to the proliferation–invasion glioma model and found the radiosensitivity $\alpha$ correlated with the proliferation rate $\rho$ (correlation $0.89$, $n=9$), tying a radiobiological parameter to an imaging-derived one; Enderling's group reduced the same idea to a single pre-treatment number, the **proliferation saturation index** $\mathrm{PSI} = V_0/K$, the tumour volume as a fraction of its carrying capacity, estimated from two pre-treatment scans and used to predict volumetric response and personalise fractionation (Prokopiou et al., 2015). Chaudhuri et al. (2023) carry this to a Bayesian-calibrated digital twin with risk-aware multi-objective dose optimisation — see [digital twins](#/note/digital-twins-oncology).

## Cards

Q: Write the BED of $n$ fractions of size $d$ in the linear-quadratic model, and say which parameter decides fractionation.
A: $\mathrm{BED} = nd\,(1 + d/\rho)$ with $\rho = \alpha/\beta$. A tissue with small $\rho$ is hurt disproportionately by large fractions, so the two tissues' $\rho$ values decide the schedule.
See: The linear-quadratic model and BED

Q: State the Unkelbach et al. (2013) criterion for hypofractionation.
A: Hypofractionation (few large fractions) is optimal iff $(\alpha/\beta)_{\mathrm{OAR}} > \delta\,(\alpha/\beta)_{\mathrm{tumour}}$, where $\delta$ is the sparing factor; otherwise many small fractions are optimal.
See: The Unkelbach criterion, derived

Q: Sketch the derivation of the hypofractionation criterion.
A: Fix the organ's BED at tolerance $c$: $n\delta d(1+\delta d/\rho_O) = c$, so $nd = c/[\delta(1+\delta d/\rho_O)]$. Then $\mathrm{BED}_T = (c/\delta)(1+d/\rho_T)/(1+\delta d/\rho_O)$, whose derivative in $d$ has the constant sign of $\rho_O - \delta\rho_T$.
See: The Unkelbach criterion, derived

Q: Why is the optimal fraction size in this LQ argument always at an endpoint of its range?
A: Because $\mathrm{BED}_T$ is monotone in $d$ once the organ's BED is held at tolerance: the sign of the derivative, $\rho_O-\delta\rho_T$, does not depend on $d$.
See: The Unkelbach criterion, derived

Q: With a non-uniform dose to the organ at risk, what replaces the sparing factor, and why is it bad news?
A: The effective sparing factor $\delta_{\mathrm{eff}} = \sum_i\delta_i^2/\sum_i\delta_i$, which arises when the mean organ BED is written in single-factor form. Since $\delta_{\mathrm{eff}}\ge\bar\delta$, non-uniformity argues against hypofractionation.
See: The Unkelbach criterion, derived

Q: What biological ingredient in Leder et al. (2014) makes the schedule, not just the fraction size, matter?
A: Differentiated sensitive cells revert to the radio-resistant stem-like state with a probability depending on the time elapsed since the previous dose, so the kill depends on the timing of fractions.
See: Biology breaks the symmetry: Leder et al. 2014

Q: What did Leder et al. (2014) demonstrate experimentally, and what is the main limitation?
A: Optimized 10 Gy/week schedules raised median survival in a PDGF-driven glioma mouse model from about 33 to 50 days (HR 0.30, $p = 0.001$). The optimisation covered only one week and the schedules are not curative.
See: Biology breaks the symmetry: Leder et al. 2014

Q: How does parametric uncertainty change the fractionation answer (Badri, Watanabe, Leder 2016)?
A: Under chance constraints on random LQ parameters the optimum sits on the boundary of the feasible set and robust schedules avoid single very large fractions, unlike the deterministic hypofractionation corner.
See: Uncertainty and personalisation

Q: What is the proliferation saturation index, and what is it for?
A: $\mathrm{PSI} = V_0/K$, the pre-treatment volume as a fraction of carrying capacity, estimated from two pre-treatment scans (Prokopiou et al. 2015); it is used to predict volumetric radiation response and personalise fractionation.
See: Uncertainty and personalisation

## Quiz

Q: A tumour has $\alpha/\beta = 10$ Gy and the critical organ has $\alpha/\beta = 3$ Gy. The plan achieves a sparing factor $\delta = 0.5$. Under the Unkelbach criterion, the optimum is…
- [x] many small fractions, since $3 < 0.5\times 10$
- [ ] a single large fraction, since the organ's $\alpha/\beta$ is smaller than the tumour's
- [ ] a single large fraction, since $\delta < 1$
- [ ] independent of $\delta$
E: The test is $\rho_O$ versus $\delta\rho_T$: here $3 < 5$, so $\mathrm{BED}_T$ decreases in $d$ and fractionation wins. The comparison is not between the raw $\alpha/\beta$ values — the sparing factor multiplies the tumour's.
See: The Unkelbach criterion, derived

Q: In the LQ fractionation argument, what makes the problem an endpoint (bang-bang-like) optimisation rather than an interior one?
- [x] holding the organ at tolerance makes the tumour BED monotone in the fraction size
- [ ] the number of fractions must be an integer
- [ ] the quadratic term $\beta d^2$ is convex
- [ ] tumour repopulation between fractions
E: The derivative's sign, $\rho_O-\delta\rho_T$, is independent of $d$, so the optimum is at an extreme fraction size. Integrality and repopulation matter in practice but are not what produces the corner solution.
See: The Unkelbach criterion, derived

Q: Leder et al. (2014) found that hyperfractionated and hypofractionated arms did not differ from the standard schedule, while their optimized schedules did. The best explanation is…
- [x] the benefit came from the timing of equal-sized fractions relative to the reversion dynamics, not from the fraction size
- [ ] the LQ model does not apply to glioma
- [ ] the optimized schedules delivered a higher total dose
- [ ] hypofractionation was ruled out by the sparing factor
E: Their schedules used 1 Gy fractions at irregular times of day with the same 10 Gy weekly dose; the optimisation exploited the time-dependent reversion of differentiated cells to the resistant stem-like state.
See: Biology breaks the symmetry: Leder et al. 2014
