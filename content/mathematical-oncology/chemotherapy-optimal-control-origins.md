---
title: "Optimal control of chemotherapy: the first era (1975–2000)"
tags: [cancer, optimal-control, pontryagin, bang-bang, chemotherapy]
created: 2026-10-21
related: [tumor-growth-laws, kill-laws-and-scheduling-principles, adaptive-therapy-control, pre-existing-resistance, tumour-containment-theory, adaptive-therapy-dynamic-programming, anti-angiogenic-optimal-control, bang-bang-singular-metronomic, drug-induced-resistance-control, numerical-optimal-control-methods, cell-cycle-chronotherapy, pouchol-optimal-control-ide]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

Between 1975 and 2000 chemotherapy scheduling became optimal-control problems: state $x$ (tumour cells, possibly
normal cells, drug concentration), dose rate $u(t) \in [0, u_{\max}]$, dynamics affine in $u$, and a cost mixing terminal
burden, integrated burden and integrated dose. Swan's survey (1990) sorts the models into growth-kinetic (one ODE with a
[growth law](#/note/tumor-growth-laws) and a [kill law](#/note/kill-laws-and-scheduling-principles)), cell-cycle (compartments) and
tumour/normal two-population models. Nearly every paper is open-loop Pontryagin or nonlinear programming; dynamic programming and feedback
arrive only with [adaptive therapy](#/note/adaptive-therapy-dynamic-programming).

### Bang-bang and singular arcs

Take $\dot x = f(x) + u\,g(x)$, $u \in [0, u_{\max}]$, and minimise $J = \phi(x(T)) + \int_0^T b\,u\,dt$ (terminal cost plus $L^1$ drug
cost; a running state cost adds terms but nothing structural). With the minimum-principle Hamiltonian
$H = \lambda\cdot(f + ug) + bu$, the **switching function** is
$$
\varphi(t) = \partial_u H = \lambda(t)\cdot g(x(t)) + b ,
$$
and minimising $H$ over $u$ gives $u = 0$ where $\varphi > 0$, $u = u_{\max}$ where $\varphi < 0$: **bang-bang**. If $\varphi \equiv 0$ on an
interval the principle is silent and the arc is **singular**. Since $\dot\lambda = -(Df + uDg)^{\top}\lambda$, for any
field $h$ one has $\frac{d}{dt}\big(\lambda\cdot h(x)\big) = \lambda\cdot[f + ug, h]$ with $[f,h] = Dh\,f - Df\,h$, so
$$
\dot\varphi = \lambda\cdot[f,g], \qquad \ddot\varphi = \lambda\cdot[f,[f,g]] + u\,\lambda\cdot[g,[f,g]] .
$$
The $u$-term drops out of $\dot\varphi$ because $[g,g] = 0$; the control first appears in $\ddot\varphi$, and a singular control is found from
$\ddot\varphi \equiv 0$. The generalised Legendre–Clebsch condition for a minimum, $\partial_u\ddot\varphi = \lambda\cdot[g,[f,g]] \le 0$,
is necessary for a singular arc to be optimal; its violation is how Ledzewicz and Schättler exclude singular arcs. For bilinear
systems ($f = Ax$, $g = Bx$) all brackets are linear in $x$ and the analysis is explicit. A pure state constraint $c(x) \le 0$ adds
**boundary arcs** on which $u$ is whatever keeps $c \equiv 0$ (compare the containment arc in
[adaptive therapy](#/note/adaptive-therapy-control)).

### A one-state example

Gompertz growth, log-kill, $L^1$ cost: minimise $N(T) + b\int_0^T u$ subject to $\dot N = \beta N\ln(K/N) - kuN$, $u \in [0,1]$.
Then $H = \lambda(\beta N\ln(K/N) - kuN) + bu$, $\varphi = b - k\lambda N$, and $m = \lambda N$ satisfies $\dot m = \beta m$ (the
$\ln$ terms cancel), with $m(T) = N(T)$ because $\lambda(T) = 1$. Hence
$$
\varphi(t) = b - k\,N(T)\,e^{-\beta(T - t)} ,
$$
strictly decreasing: no singular arc, at most one switch, from $u = 0$ to $u = 1$, with a final full-dose arc of length
$\beta^{-1}\ln\big(kN(T)/b\big)$ if positive. With $\beta = 0.0792$/day, $K = 1.19\times10^4$, $N_0 = 1000$, $k = 0.5$, $b = 20$,
$T = 42$ days, a grid search over one-switch schedules puts the switch at day 27 (predicted final arc 15.3 days), $N(T) = 135$,
cost 435; the best front-loaded schedule costs 860 and the best constant infusion 741. This is the mechanism behind Martin's "hold the dose
to the end": a terminal-only cost plus Gompertz regrowth makes early kill wasted. With exponential growth the timing would be irrelevant.

### The papers

- **Bahrami and Kim (1975)** formulated cell-cycle chemotherapy as a "multiplicative" (bilinear) control system, the class of almost all
  later models.
- **Swan and Vincent (1977)** applied Pontryagin's principle to IgG multiple myeloma: a Gompertz model with drug-dependent loss, fitted to
  patient data, minimising total drug while driving the tumour to a target. It is the universally cited origin; its equations could not be
  verified for this note and are known here only through secondary sources. Swan (1990) is the survey.
- **Murray (1990)** minimised $N(T)$ with general growth and loss functions and a normal-cell state constraint $M(t) \ge M_{\min}$: the optimum is
  maximal dose, then a boundary arc holding the normal cells on the toxicity threshold; with a cumulative-dose limit, a bolus followed by
  continuous infusion.
- **Martin, Fisher, Minchin and Teo (1990)** and **Martin (1992, Automatica)** set the benchmark: Gompertz tumour, first-order drug
  pharmacokinetics, kill above a concentration threshold, constraints on concentration, cumulative exposure and tumour size at intermediate
  checkpoints, terminal cost $N(T)$, solved by control parametrisation and nonlinear programming. Optimal schedules "hold most of the dose until
  the end" (often-quoted parameter values, such as an 84-day horizon, are unverified here). The problem is still a benchmark for numerical
  optimal-control software; a rigorous maximum-principle treatment with its three state constraints was not found.
- **Martin, Fisher, Minchin and Teo (1992, Math. Biosci.)** added resistant cells and maximised survival time (time until the burden exceeds a bound).
  Under Gompertz growth, deliberately keeping a large burden to suppress the resistant clone roughly doubled, sometimes tripled, survival relative to
  aggressive therapy; under exponential or logistic growth the burden had little effect. This is the earliest optimal-control statement
  of the idea now called adaptive therapy or [containment](#/note/tumour-containment-theory).
- **Swierniak, Polanski and Kimmel (1996)**: bilinear cell-cycle models
  $$
  \dot N = N\Big(A + \sum_i u_i B_i\Big), \qquad J = pN(T) + \int_0^T \big(qN + bu\big)\,dt ,
  $$
  with $u_i \in [0,1]$ the fraction killed, blocked or recruited by drug $i$; periodic protocols are close to optimal for a wide
  class of models, while optimal controls "can be complicated, with singular and periodic trajectories".
- **Fister and Panetta (2000)** proved existence and characterised optimal controls for cell-cycle-specific models with bone marrow.
- **Ledzewicz and Schättler (2002)** showed, as reported by Lecca (2021), that singular arcs are not optimal in the two-compartment bilinear
  model and the optimal controls are bang-bang; this persists with pharmacokinetics (2007). See
  [bang-bang versus singular arcs](#/note/bang-bang-singular-metronomic) for the modern picture.

### The critique

Three objections, all still current. (i) The answer depends on the cost: a terminal cost gives end-loading, a running cost $\int N$ or a toxicity
state constraint gives front-loading or bolus-plus-infusion (Murray), and intermediate size constraints (Martin) give yet another shape. Optimal
control reveals the consequences of a formulation; it does not choose it. (ii) The answer depends on growth-law parameters that are not
identifiable from available data: Murphy et al. (2016) found a 6-fold spread in "chemotherapy needed" across growth laws fitted to the same
series. (iii) Pontryagin's principle gives necessary conditions and open-loop controls; Gluzman, Scott and Vladimirsky (2019) make this point
and use dynamic programming instead. And every model of the era uses log-kill; the Norton–Simon kill law, the one with clinical validation,
has no Pontryagin analysis.

## Cards

Q: For $\dot x = f(x) + ug(x)$, $u \in [0,u_{\max}]$, minimising $\phi(x(T)) + \int b\,u$, what is the switching function and how does it determine the control?
A: $\varphi = \partial_u H = \lambda\cdot g(x) + b$. Minimising $H$: $u = 0$ where $\varphi > 0$, $u = u_{\max}$ where $\varphi < 0$ (bang-bang); if $\varphi \equiv 0$ on an interval the arc is singular.
See: Bang-bang and singular arcs

Q: Why does the control not appear in $\dot\varphi$ for a control-affine problem, and where does it first appear?
A: $\frac{d}{dt}(\lambda\cdot h) = \lambda\cdot[f + ug, h]$, and with $h = g$ the $u$-term is $u\lambda\cdot[g,g] = 0$, so $\dot\varphi = \lambda\cdot[f,g]$. It first appears in $\ddot\varphi = \lambda\cdot[f,[f,g]] + u\lambda\cdot[g,[f,g]]$, which is solved for the singular control.
See: Bang-bang and singular arcs

Q: In the one-state problem $\min N(T) + b\int u$, $\dot N = \beta N\ln(K/N) - kuN$, why is the optimal control bang-bang with at most one switch, and in which direction?
A: $m = \lambda N$ satisfies $\dot m = \beta m$, so $\varphi = b - kN(T)e^{-\beta(T-t)}$ is strictly decreasing: no singular arc, one switch from $u = 0$ to $u = 1$. The dose is held to the end, with final arc length $\beta^{-1}\ln(kN(T)/b)$.
See: A one-state example

Q: Why do Martin's Gompertz benchmark problems "hold most of the dose until the end", and why is this not a clinical recommendation?
A: A terminal-only cost with Gompertz regrowth makes early kill wasted (small tumours regrow fastest), so the budgeted dose is spent last. The shape is an artefact of the cost and the growth law; a running cost, a toxicity constraint or exponential growth changes it.
See: A one-state example

Q: What is the structure of Murray's (1990) optimal schedule with a normal-cell state constraint $M(t) \ge M_{\min}$?
A: Maximal dose first, then a boundary arc on which the dose is reduced exactly so that the normal cells sit on the toxicity threshold; with a cumulative-dose limit, an initial bolus followed by continuous infusion.
See: The papers

Q: What did Martin, Fisher, Minchin and Teo (1992) find when resistant cells were added and survival time was maximised?
A: Under Gompertz growth, keeping a large tumour burden to suppress the resistant clone roughly doubled, sometimes tripled, survival relative to aggressive therapy; under exponential or logistic growth the burden mattered little. It is the earliest optimal-control version of adaptive therapy.
See: The papers

Q: Write the bilinear cell-cycle control model of Swierniak, Polanski and Kimmel (1996) and its cost.
A: $\dot N = N(A + \sum_i u_iB_i)$ with $u_i \in [0,1]$ the fraction of cells killed, blocked or recruited by drug $i$; $J = pN(T) + \int_0^T (qN + bu)\,dt$. Toxicity enters only through the $L^1$ term $\int bu$.
See: The papers

Q: What are the three standing objections to first-era optimal chemotherapy schedules?
A: The schedule shape depends on the chosen cost and constraints; it depends on growth-law parameters that are not identifiable (Murphy 2016: 6-fold spread in drug needed); and Pontryagin gives only necessary, open-loop conditions (Gluzman–Scott–Vladimirsky 2019).
See: The critique

## Quiz

Q: For a control-affine minimisation problem, a singular arc can be optimal only if…
- [x] $\lambda\cdot[g,[f,g]] \le 0$ along the arc
- [ ] $\lambda\cdot[g,[f,g]] \ge 0$ along the arc
- [ ] $\lambda\cdot[f,g] \ne 0$ along the arc
- [ ] the Hamiltonian is strictly convex in $u$
E: This is the generalised Legendre–Clebsch condition $\partial_u\ddot\varphi \le 0$ for a minimum (the sign flips for maximisation). On a singular arc $\dot\varphi = \lambda\cdot[f,g]$ must vanish, and $H$ is affine in $u$, so convexity in $u$ is never strict.
See: Bang-bang and singular arcs

Q: Which combination produces "hold the dose to the end" as the optimal chemotherapy schedule?
- [x] terminal cost $N(T)$, Gompertz growth, log-kill, fixed total dose
- [ ] running cost $\int_0^T N\,dt$, Gompertz growth, log-kill
- [ ] terminal cost $N(T)$, exponential growth, log-kill
- [ ] terminal cost $N(T)$, Gompertz growth, a normal-cell state constraint
E: With $y = \ln(K/N)$, log-kill gives $y(T) = y_0e^{-\beta T} + k\int_0^T e^{-\beta(T-s)}u\,ds$, so late doses count more. Exponential growth makes timing irrelevant; a running cost or Murray's toxicity constraint front-loads the dose.
See: A one-state example

Q: In Martin, Fisher, Minchin and Teo (1992), keeping the tumour burden deliberately large to suppress resistant cells lengthened survival substantially under…
- [x] Gompertz growth, but had little effect under exponential or logistic growth
- [ ] exponential growth, but not under Gompertz growth
- [ ] all three growth laws equally
- [ ] no growth law; the burden only mattered through toxicity
E: The report of their result is specific to Gompertz growth; the containment benefit depends on the growth law, which is the same caveat as for every result in this chapter.
See: The papers

Q: Pontryagin's maximum principle, as used throughout the first era, provides…
- [x] necessary conditions and an open-loop control
- [ ] sufficient conditions and a feedback law
- [ ] a viscosity solution of the HJB equation
- [ ] a proof that the optimal control is bang-bang
E: Sufficiency needs extra arguments (fields of extremals, as in Ledzewicz–Schättler) and feedback needs dynamic programming, the point made by Gluzman, Scott and Vladimirsky (2019). Bang-bang structure follows from the affine Hamiltonian only off singular arcs.
See: The critique
