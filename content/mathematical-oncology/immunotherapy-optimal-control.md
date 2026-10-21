---
title: "Optimal control of immunotherapy and chemo-immunotherapy"
tags: [cancer, optimal-control, pontryagin, tumour-immune, singular-arcs]
created: 2026-10-21
related: [kuznetsov-tumour-immune-model, adaptive-therapy-control, bang-bang-singular-metronomic, numerical-optimal-control-methods, chemotherapy-optimal-control-origins, anti-angiogenic-optimal-control, tumour-containment-theory, leukaemia-stem-cell-models, immune-evasion-games-car-t]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

The threshold results of the [planar tumour–immune models](#/note/kuznetsov-tumour-immune-model) treat therapy as a constant: ACI works iff $s_1>s_{1,\mathrm{crit}}$. Replacing the constant by a schedule $u(t)$ and asking for the cheapest one is the immunotherapy control thread. Its distinctive feature, compared with the [sensitive/resistant control problems](#/note/adaptive-therapy-control), is bistability: the uncontrolled system already has a benign attractor, so the target of control is a basin, not a point.

### Pontryagin on Kirschner–Panetta

Burden, Ernstberger and Fister (2004) made the ACI input $s_1$ of the Kirschner–Panetta model a bounded control and derived necessary conditions from Pontryagin's maximum principle, solving the resulting two-point boundary value problem numerically; Fister and Donnelly (2005) did the same for IL-2, and Ghaffari and Naserifar (2010) revisited the problem. The cost is quadratic in the dose, which makes the minimiser of the Hamiltonian continuous: if $H = \ldots + c\,u^2 - \varphi\,u$ then $u^* = \min\{u_{\max},\max\{0,\varphi/(2c)\}\}$. Castiglione and Piccoli treated dendritic-cell vaccination, where a dose is an injection rather than a rate: the 2006 Bull. Math. Biol. paper optimises a vaccine schedule in an ODE immune–tumour model, and the 2007 J. Theor. Biol. paper formulates the timing and amount of discrete doses as an impulsive control problem.

### Existence, and the cost decides the structure

De Pillis, Gu, Fister and coauthors (2007) proved existence of optimal controls for a tumour–immune–chemotherapy model and compared quadratic and linear costs. The lesson is the same as in every chemotherapy control problem: with a linear cost $\int u$, the Hamiltonian is affine in $u$, the control is bang-bang off the zero set of the switching function $\varphi=\partial H/\partial u$, and on intervals where $\varphi\equiv0$ a singular arc appears whose dose is found by differentiating $\varphi$ until $u$ shows up (generalised Legendre–Clebsch condition decides optimality). In the de Pillis model singular regions cannot be excluded. The quadratic cost gives smooth interior doses but has no pharmacological meaning; it is a regularisation. See [bang-bang versus singular arcs](#/note/bang-bang-singular-metronomic).

### Crossing the separatrix: Ledzewicz, Naghnaeian and Schättler

Ledzewicz, Naghnaeian and Schättler (2012) took Stepanova's two-dimensional model with chemotherapy $u\in[0,u_{\max}]$ (structure paraphrased),
$$
x' = \mu_C\,x\,F(x) - \gamma xy - \kappa_X\,x u,\qquad
y' = \mu_I\,(x-\beta x^2)\,y - \delta y + \alpha - \kappa_Y\,y u ,
$$
with $F$ Gompertz, and in 2013 (Ledzewicz, Olumoye, Schättler) the generalised logistic $F_\nu(x)=\frac1\nu\big(1-(x/x_\infty)^\nu\big)$, which is Gompertz as $\nu\to0$ and exponential as $\nu\to\infty$. Except for small $\nu$, the uncontrolled system has a stable microscopic (benign) equilibrium and a stable malignant one, with basins separated by the stable manifold of a saddle. The objective (paraphrased) is of the form
$$
\min\; a\,x(T) - b\,y(T) + \int_0^T (c\,u + d)\,dt ,\qquad T \text{ free},
$$
penalising the final tumour, rewarding the final immune level, and charging drug and time. The point of such a functional is that it does not ask the control to reach the benign equilibrium: once the state is in its basin, the uncontrolled flow finishes the job, and a trailing arc with $u=0$ costs nothing but time. The proven structure is **full dose, then a singular (partial-dose) arc, then possibly a prolonged no-dose period**: maximal dose to cross the separatrix quickly, a singular arc to do it cheaply, and then nothing. The same bang–singular–zero structure holds with an immune boost as second control (2013).

### Metronomic models, AML and turnpike

Ledzewicz, Amini and Schättler (2015) built a three-compartment metronomic model (tumour, vasculature, immune) that is again bistable, and posed the control problem as moving the state from the malignant to the benign basin; low constant doses now have a rationale, since they can keep the state inside the benign basin while sparing the immune compartment. Sharp, Browning, Mapder, Burrage and Simpson (2019) applied Pontryagin's principle to an acute myeloid leukaemia stem-cell model with an immune term (they argue AML models without one are unsuitable for deriving treatments), solving by forward–backward sweep and obtaining continuous or bang-bang controls depending on the cost; their code is released. Mazel, Grognard, Stiehl, Rapaport and Djema (2026) analyse a healthy/leukaemic model under chemotherapy, with equilibria and bifurcations, the maximum principle, and a **turnpike** property: over long horizons the optimal trajectory spends most of its time near a steady state and deviates only near the ends. See [leukaemia stem-cell models](#/note/leukaemia-stem-cell-models).

### What bistability does to the objective

In a monostable model (one malignant attractor, as in the sensitive/resistant competition model) control must be perpetual, and the natural objectives are time to failure or burden over a horizon; this is the [containment](#/note/tumour-containment-theory) world. In a bistable model the natural problem is a reachability problem: reach the basin of the benign equilibrium at minimal cost, with the basin as terminal set and the separatrix as the only thing that matters. Three consequences. First, the objective can be almost anything that is monotone in the right direction at free terminal time; the synthesis depends on the geometry, not the coefficients. Second, the stable manifold of the saddle acts as a cut locus of the field of extremals, and the Ledzewicz–Schättler results are regular syntheses rather than verification theorems; a viscosity-solution treatment of the value function, including a toxicity state constraint, does not exist as of 2026. Third, the deterministic picture is wrong near the benign equilibrium if it is microscopic: in [CAR-T models](#/note/immune-evasion-games-car-t) the tumour-free state is unstable and cure is a stochastic extinction event, so the control problem would become one of maximising an extinction probability. The [numerical methods](#/note/numerical-optimal-control-methods) used throughout are indirect (Pontryagin boundary value problems), not HJB-based.

## Cards

Q: Why do the Ledzewicz–Naghnaeian–Schättler (2012) optimal chemo-immunotherapy schedules end with a long no-dose period?
A: The system is bistable. Once the state has crossed the saddle's stable manifold into the benign basin, the uncontrolled flow converges to the microscopic equilibrium, and with a free terminal time the trailing $u=0$ arc costs only time.
See: Crossing the separatrix: Ledzewicz, Naghnaeian and Schättler

Q: What is the structure of the optimal control in the Stepanova-with-chemotherapy problem of Ledzewicz et al. (2012)?
A: Full dose, then a singular (partial-dose) arc, then possibly a prolonged period without drug: bang, singular, zero.
See: Crossing the separatrix: Ledzewicz, Naghnaeian and Schättler

Q: In a tumour–immune control problem, why does a linear dose cost produce bang-bang and singular arcs while a quadratic cost produces continuous doses?
A: With linear cost $H$ is affine in $u$, so $u^*$ is set by the sign of $\varphi=\partial H/\partial u$ and is singular where $\varphi\equiv0$; with cost $cu^2$ the minimiser is $\min\{u_{\max},\max\{0,\varphi/(2c)\}\}$, continuous.
See: Existence, and the cost decides the structure

Q: What did de Pillis et al. (2007) contribute to chemo-immunotherapy control beyond numerics?
A: An existence proof for optimal controls in a tumour–immune–chemotherapy model, a comparison of quadratic and linear costs, and the observation that singular control regions cannot be excluded in the linear case.
See: Existence, and the cost decides the structure

Q: How does bistability change what the terminal condition of a therapy control problem should be?
A: The target becomes a set, the basin of the benign equilibrium, rather than a point; the problem is a minimal-cost reachability problem whose geometry is governed by the saddle's stable manifold.
See: What bistability does to the objective

Q: Which 2026 result connects leukaemia chemotherapy control to the turnpike phenomenon, and what does turnpike mean there?
A: Mazel, Grognard, Stiehl, Rapaport and Djema (2026): on long horizons the optimal trajectory stays near a steady state for most of the time and deviates only near the initial and final times.
See: Metronomic models, AML and turnpike

Q: Why did Sharp et al. (2019) add an immune term to their AML model before doing optimal control?
A: They argue that AML models without an immune response are unsuitable for deriving optimal treatments, since the immune compartment changes which states are recoverable.
See: Metronomic models, AML and turnpike

## Quiz

Q: In Ledzewicz–Olumoye–Schättler (2013) with growth $F_\nu(x)=\frac1\nu(1-(x/x_\infty)^\nu)$, the benign and malignant equilibria coexist
- [x] except for small $\nu$ (near the Gompertz limit)
- [ ] only for small $\nu$ (near the Gompertz limit)
- [ ] for all $\nu>0$
- [ ] only in the exponential limit $\nu\to\infty$
E: Gompertz growth is unbounded per capita at small sizes, which is what destroys the benign microscopic equilibrium (d'Onofrio's $f(0)=\infty$ obstruction).
See: Crossing the separatrix: Ledzewicz, Naghnaeian and Schättler

Q: Compared with the sensitive/resistant containment problem, the chemo-immunotherapy problem on a bistable model
- [x] has a finite, free-time solution because the uncontrolled flow is benign inside one basin
- [ ] requires perpetual dosing, since the tumour-free state is unstable
- [ ] has no singular arcs, since the Hamiltonian is quadratic in the dose
- [ ] has a convex value function across the separatrix
E: The benign basin ends the problem; containment has no such basin and must dose forever. Singular arcs do appear with linear cost, and the separatrix is where the synthesis has its cut locus.
See: What bistability does to the objective

Q: Castiglione and Piccoli's 2007 J. Theor. Biol. paper differs from their 2006 Bull. Math. Biol. paper in that
- [x] it treats doses as discrete injections (impulsive control of timing and amount)
- [ ] it introduces the dendritic-cell vaccine model for the first time
- [ ] it proves existence of continuous optimal controls with quadratic cost
- [ ] it uses the Stepanova model instead of a multi-compartment immune model
E: The 2006 paper optimises a dendritic-cell vaccine schedule; the 2007 paper makes the dose impulsive. The seed bibliography had the two venues reversed.
See: Pontryagin on Kirschner–Panetta
