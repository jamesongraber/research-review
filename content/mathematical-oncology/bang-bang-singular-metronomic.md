---
title: "Bang-bang versus singular arcs: MTD versus metronomic"
tags: [cancer, optimal-control, geometric-control, singular-arcs, metronomic-therapy]
created: 2026-10-21
related: [anti-angiogenic-optimal-control, drug-induced-resistance-control, numerical-optimal-control-methods, chemotherapy-optimal-control-origins, kill-laws-and-scheduling-principles, adaptive-therapy-control, pouchol-optimal-control-ide, cell-cycle-chronotherapy]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

The clinical question "maximum tolerated dose in short bursts, or a low continuous (*metronomic*) dose?" has an exact counterpart in geometric optimal control: **is the optimal control bang-bang, or does it contain a singular arc?** Ledzewicz and Schättler's programme (2002–2017, collected in their 2015 monograph) answers it model by model, and the answer turns out to depend on heterogeneity, on the horizon, and — uncomfortably — on the objective.

### The machinery

All these models are control-affine: $\dot z = f(z) + \sum_i u_i g_i(z)$ with $u_i \in [0,a_i]$, and compartmental chemotherapy models are moreover bilinear (linear in $z$ for each fixed dose). Write $H$ to be minimized. Then $H$ is affine in each $u_i$, with **switching function**
$$
\Phi_i = \frac{\partial H}{\partial u_i} = \langle\lambda, g_i\rangle, \qquad
\dot\Phi_i = \langle\lambda,[f,g_i]\rangle, \qquad
\ddot\Phi_i = \langle\lambda,[f,[f,g_i]]\rangle + \sum_j u_j\langle\lambda,[g_j,[f,g_i]]\rangle .
$$
So $u_i = 0$ where $\Phi_i > 0$ and $u_i = a_i$ where $\Phi_i < 0$: **bang-bang**, i.e. MTD alternating with holidays. A **singular** arc is an interval on which $\Phi_i\equiv 0$; differentiating until $u_i$ appears gives its **order** $k$ (first appearance in $\Phi_i^{(2k)}$) and the necessary generalized **Legendre–Clebsch condition** $(-1)^k\partial_{u_i}\Phi_i^{(2k)}\ge 0$. On a singular arc the dose is an interior state-feedback value — this is the mathematical object that corresponds to metronomic dosing.

An important special case: an objective linear in the dose, $\int_0^T \langle r, z\rangle + \kappa u \, dt$ (an $L^1$ cost on the drug), keeps $H$ affine in $u$ and so keeps the bang/singular dichotomy. A *quadratic* cost $\int u^2$ makes $H$ strictly convex in $u$ and produces a smooth interior control automatically — which is why Ledzewicz's 2022 editorial warns that quadratic penalties are usually chosen for mathematical convenience and manufacture "metronomic-looking" solutions with no biological content.

### Homogeneous tumours give MTD

For two- and three-compartment **cell-cycle** models of a homogeneous tumour with an $L^1$-type objective, Ledzewicz and Schättler (J. Optim. Theory Appl. 2002) proved the optimal controls are bang-bang, singular arcs being excluded by the Legendre–Clebsch condition. Adding a resistant compartment (DCDS-B 2006) did not change this: still bang-bang. In other words, within the models where cells differ only by cell-cycle phase, the theory endorses MTD.

### Heterogeneity and long horizons turn the singular arc on

The picture inverts once the tumour is genuinely heterogeneous.

- **Ledzewicz–Schättler (J. Biol. Syst. 2014)**: in a sensitive/resistant tumour, singular (reduced-dose) arcs become optimal once the resistant fraction is large. Their review the same year (Math. Model. Nat. Phenom. 2014) is titled, exactly, "from MTD towards metronomic therapy": homogeneous models $\Rightarrow$ bang-bang; heterogeneity or immune interaction $\Rightarrow$ singular arcs.
- **Ledzewicz, Wang, Schättler, André, Heng, Pasquier (Math. Biosci. Eng. 2017)**: the optimal protocol is full dose while sensitive cells dominate and then a switch to the singular (low-dose) control; they also report a 21-trait extension, a crude discretization of the phenotype-structured models of [Pouchol et al.](#/note/pouchol-optimal-control-ide).
- **Rojas, Belmonte-Beitia, Pérez-García, Maurer (2016)** for low-grade glioma prove existence and the necessary conditions and find numerically that short horizons give bang-bang controls while long horizons give bang-bang plus a singular arc. The horizon, not only the biology, selects the structure.
- **Ledzewicz, Amini, Schättler (Math. Biosci. Eng. 2015)** put a three-compartment metronomic model (tumour, vasculature, immune system) under control. The system is **bistable**: there is a benign and a malignant basin, and the control problem is naturally posed as moving the state from one to the other rather than as minimizing a burden. The earlier Stepanova tumour–immune model with chemotherapy (J. Math. Biol., listed 2011 by the authors and 2012 by volume) has the same flavour, with singular arcs appearing.

### The objective is the real variable

Engelhart, Lebiedz and Sager (2011) made the methodological point numerically: taking four ODE models of chemo-, immuno- and anti-angiogenic therapy and several equally plausible objectives (terminal burden, integral burden, with or without drug penalties), the *same* model yields qualitatively different optimal schedules. The structural results above are therefore statements about a model **and** an objective. Across the literature the ranking of MTD against metronomic therapy is driven by (i) heterogeneity, (ii) the horizon, (iii) whether the drug cost is $L^1$, $L^2$ or a hard budget, and (iv) whether the goal is a terminal burden, an integral burden, a time to failure or a basin of attraction. There is no verified result reconciling these — see [the containment theorems](#/note/tumour-containment-theory) for the same ambiguity reached from a different direction, and [drug-induced resistance](#/note/drug-induced-resistance-control) for a case where the singular arc is excluded and a boundary arc takes its place.

## Cards

Q: What is the control-theoretic translation of "MTD versus metronomic therapy"?
A: Bang-bang controls (full dose alternating with holidays) versus a singular arc (an interior, state-feedback partial dose sustained over an interval).
See: The machinery

Q: Why does an objective with an $L^1$ drug cost preserve the bang/singular dichotomy, while an $L^2$ cost does not?
A: $L^1$ keeps $H$ affine in $u$, so the minimizer is at an endpoint unless the switching function vanishes identically. $L^2$ makes $H$ strictly convex in $u$, giving a smooth interior control automatically.
See: The machinery

Q: What did Ledzewicz and Schättler prove in 2002 for homogeneous cell-cycle compartmental models with an $L^1$-type objective?
A: Optimal controls are bang-bang; singular arcs are excluded by the Legendre–Clebsch condition. The theory endorses MTD for homogeneous tumours.
See: Homogeneous tumours give MTD

Q: Which modelling ingredient makes singular (reduced-dose) arcs optimal in the Ledzewicz–Schättler chemotherapy models?
A: Heterogeneity — a sensitive/resistant split (2014), or interaction with the immune system. Once the resistant fraction is large, the singular arc beats full dose.
See: Heterogeneity and long horizons turn the singular arc on

Q: In Rojas et al. (2016) on low-grade glioma, what determines whether the optimal control contains a singular arc?
A: The length of the horizon: short horizons give bang-bang, long horizons give bang-bang plus a singular (metronomic) arc.
See: Heterogeneity and long horizons turn the singular arc on

Q: What is the shape of the optimal protocol in Ledzewicz et al. (2017) on metronomic chemotherapy?
A: Full dose while the sensitive cells dominate, then a switch to the singular (low-dose) control.
See: Heterogeneity and long horizons turn the singular arc on

Q: Why is the objective in the three-compartment metronomic model (2015) not "minimize the burden"?
A: The system is bistable, with a benign and a malignant basin of attraction, so the natural aim is to steer the state into the benign basin rather than to minimize a tumour size.
See: Heterogeneity and long horizons turn the singular arc on

Q: What is Engelhart–Lebiedz–Sager's (2011) methodological warning, and is it a theorem?
A: The same ODE model gives qualitatively different optimal schedules under different, equally plausible objectives, so the objective must be justified biologically. It is a numerical study, not a theorem.
See: The objective is the real variable

## Quiz

Q: Replacing an $L^1$ drug penalty by a quadratic one in a chemotherapy control problem typically…
- [x] produces a smooth interior control that resembles metronomic dosing for purely mathematical reasons
- [ ] produces bang-bang controls with more switchings
- [ ] leaves the optimal control unchanged
- [ ] makes singular arcs of order 2 appear
E: Strict convexity in $u$ removes the affine structure, so the minimizer is interior by construction. Ledzewicz's 2022 editorial objects to reading such controls as biological conclusions.
See: The machinery

Q: According to the Ledzewicz–Schättler programme, the move "from MTD towards metronomic" in the *optimal control structure* is caused by…
- [x] tumour heterogeneity (and immune interaction), which makes a singular arc optimal once the resistant fraction is large
- [ ] adding cell-cycle compartments to a homogeneous model
- [ ] adding a resistant compartment to a homogeneous cell-cycle model, which already suffices
- [ ] shortening the therapy horizon
E: Pure cell-cycle compartmental models — including the 2006 one with a resistance compartment — stay bang-bang; heterogeneity in drug sensitivity with a large resistant fraction is what switches on the singular arc, and long (not short) horizons favour it.
See: Heterogeneity and long horizons turn the singular arc on

Q: On a singular arc of order $k$ in a control-affine problem with $H$ minimized, the generalized Legendre–Clebsch condition reads…
- [x] $(-1)^k\,\partial_u \Phi^{(2k)} \ge 0$, where $\Phi = \partial H/\partial u$
- [ ] $\partial_u \Phi^{(2k)} \ge 0$ for every $k$
- [ ] $\Phi^{(2k+1)} = 0$
- [ ] $\partial^2_u H > 0$
E: The sign alternates with the order; for $k=1$ it requires $\partial_u\ddot\Phi \le 0$. The last option is the ordinary Legendre condition, which is vacuous here because $H$ is affine in $u$.
See: The machinery
