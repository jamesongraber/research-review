---
title: "The field's own open questions, and the mathematical gaps"
tags: [cancer, open-problems, research-landscape, identifiability, state-constrained-control]
created: 2026-10-21
related: [adaptive-therapy-trials-evidence, mathematical-oncology-landscape, adaptive-therapy-origins, tumour-containment-theory, adaptive-therapy-dynamic-programming, extinction-therapy-two-strikes, measuring-the-game, spatial-games-in-tumours, digital-twins-oncology, mean-field-games-in-oncology, persisters-phenotypic-switching, control-of-evolving-populations]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

### Where the questions come from

A map for finding research problems. Two documents state what the field thinks it does not know — West et al. (2023, *eLife* 12:e84263), eleven questions on adaptive therapy, and Rockne et al. (2019, *Phys. Biol.* 16), an eleven-essay roadmap — and a third list collects gaps visible only when the papers are read against each other. Context: Aktipis, Kwan, Johnson, Neuberg and Maley (2011, *PLoS ONE* 6:e26100) showed bibliometrically that the cancer relapse and resistance literature almost never used evolutionary framing at all, which is why these questions are so recent.

### West et al. 2023, group 1: what belongs in the model

**Q1, necessary components.** The minimal triple is: resistance is costly, sensitive cells competitively suppress resistant ones, therapy reduces the sensitive population. Simple models then show a trade-off between time to resistance and mean burden. Open: whether adding healthy cells, immune cells, hormone resources, **Allee effects** or **phenotypic plasticity** preserves the conclusion — the authors note Allee effects and plasticity can *break* that trade-off, and that the in vivo strength of the Allee effect is unknown. Also explicitly open: which objective to optimise, survivorship or quality-adjusted survival.

**Q2, how competitive are resistant phenotypes?** (Noble.) The usual frequency- or density-dependent fitness functions only approximate average dynamics, while real clonal growth depends on spatial arrangement, interaction range and local resource sharing. Evidence on the cost of resistance is mixed, theory shows a cost is not strictly necessary, and asymmetric or positive interclonal interactions are omitted; the counterexample is Kaznatcheev et al.'s alectinib-resistant cells *outcompeting* the ancestor, in [measuring the game](#/note/measuring-the-game).

**Q3, plasticity** (Kim): holidays can reverse phenotype switching and resensitise cells, but the benefit depends jointly on switching rate and sensitive growth rate, and resistance may be a continuum; open is how to identify plasticity in a tumour *before* choosing a strategy ([persisters and phenotypic switching](#/note/persisters-phenotypic-switching)). **Q4, normal tissue** (Basanta): stroma, immune and vascular compartments are absent, environmentally mediated resistance protects cells irrespective of intrinsic resistance, and stromal refuges can resupply sensitive cells during holidays.

### Group 2: protocol design, group 3: clinical translation

**Q5, cure or control?** (Gallaher.) The choice must be made up front, because a failed curative attempt can leave a resistant population too large to contain; open is which disease characteristics stratify patients. **Q6, the optimal protocol** (Viossat): hold near the maximum acceptable size, then switch to maximum dose before containment fails — but open are when to delay therapy, how to dose against *partially* resistant cells, what the trigger should be, and whether spatial agent-based models behave differently from ODEs ([spatial games in tumours](#/note/spatial-games-in-tumours)). **Q7** (Strobl): what the cells actually compete for, and how pharmacokinetics, the mouse–human time-scale mismatch and missed doses affect performance. **Q8, multidrug algorithms** (West): with $n$ drugs there are $2^n$ combinations at each decision point, so how to limit the combinatorics and order drugs into repeatable evolutionary cycles.

**Q9, real-time patient prediction** (Brady-Nicholls): calibrate, validate, test sensitivity and identifiability, only then predict, with two rules stated as requirements — **correlated parameters must not be estimated together**, and **a model that cannot fit the data must not be used to predict**. **Q10, does high burden negate the benefit?** (Brown): how high burden can go before symptoms, whether biomarkers stay reliable there, whether high burden promotes mutations that *reduce* the cost of resistance, and whether burden spread over several lesions changes the strategy. **Q11, can a model drive decisions?** (Robertson-Tessi & Anderson): most models are hypothesis-generating, and clinical data arrive at times of little value to modellers — scans 6–12 weeks after start, whereas models need signals *before* progression. The proposal is "Phase i" virtual trials with rigorous uncertainty quantification; see [digital twins in oncology](#/note/digital-twins-oncology).

### The 2019 roadmap's challenges

Rockne et al. state three milestones — reproducible prediction of spatio-temporal progression, mitigating resistance, merging mechanistic models with machine learning — and diagnose the bottleneck as **data, not mathematics**: big data arrive at one time, one place, one biological scale, without microenvironmental context. The essays add: machine-learning models cannot be trained on the right data (Hawkins-Daarud & Swanson); models are unreproducible and spatial effects hard to standardise (Sluka, Glazier & Macklin); prediction uncertainty needs quantifying, via per-patient model families selected by Bayesian methods as in weather forecasting (Hormuth et al.); spatial structure changes outcomes such as fitness-valley crossing, while simulating $10^{10}$–$10^{13}$ cells is infeasible, so new spatial stochastic methods are needed (Wodarz & Komarova); some parameters — the **fitness cost explicitly named** — are unmeasurable, and intratumoural evolution cannot be monitored during therapy (Anderson & Gatenby); and payoff matrices are inferred from intuition rather than measured (Krishnan et al.). Screening, single-cell topology, metabolism and radiotherapy take the remaining essays.

### The mathematical gaps

These are in neither document; they come from reading the papers against each other.

1. **No well-posed statement of the design problem.** Three objectives have been optimised on essentially the same competition model: time to progression (Viossat & Noble 2021; Phan et al. 2024/2026), squared distance to a target equilibrium under a viability constraint (Cunningham et al. 2020), and cumulative hazard $\int_0^T h(N(t))\,dt$ (Mistry 2020). There is no comparative-statics theorem saying how the optimal policy depends on the objective — nothing of the form "for $h$ convex in burden the optimum is X, for $h$ concave it is Y".
2. **The control structure is unproven.** Cunningham et al. find a monotone titration numerically, the clinic uses on/off, Phan et al. find a corner in threshold space. For the three-type prostate model, where the dose enters the *carrying capacities* rather than as a death rate, there is no proof of bang-bang versus singular structure and no HJB verification theorem for the state-constrained problem $N \le B_{\max}$ — precisely where constrained viscosity solutions with Soner-type boundary conditions belong.
3. **Identifiability from PSA.** The observable is the scalar $P \approx (\lambda/\Xi)\sum_i x_i$. Which combinations of $(r_i,\alpha_{ij},K_i)$ are identifiable from one such trajectory under on/off control, and whether switching the control adds identifiability, has not been derived.
4. **Frequency- versus density-dependence is chosen, never derived.** No coarse-graining theorem gives $\alpha_{ij}$, or its frequency- or density-dependent form, as a functional of a spatial interaction kernel and the geometry — a hydrodynamic-limit question, with Kaznatcheev's effective-games argument saying the postulated form is generally wrong.
5. **Containment and extinction have not been reconciled.** Deterministic containment maximises time to progression; two-strike theory maximises extinction probability ([extinction therapy](#/note/extinction-therapy-two-strikes)). Missing is one formulation — a controlled density-dependent branching process, or large deviations for the ODE — in which "contain" and "extinguish" are two regimes of a single problem, with the boundary set by size, turnover and Allee strength.
6. **No posterior over policies.** From a Bayesian posterior over $(r_i,\alpha_{ij},K_i)$ given sparse biomarker data, compute the policy maximising expected quality-adjusted survival, and the value of information in an extra measurement. That partially observed control problem is what Q11's demand for uncertainty quantification names.

Two more: no phenotype-structured PDE version of the trial protocols exists, and mean-field *games* are invoked where mean-field **control** or a major–minor structure is the honest object, since tumour cells do not optimise ([mean field games in oncology](#/note/mean-field-games-in-oncology)). The tool-sorted view is [four research threads](#/note/mathematical-oncology-landscape).

## Cards

Q: Why can an Allee effect break the burden/time trade-off that simple adaptive-therapy models exhibit?
A: In those models low burden is paid for by faster resistant growth, since the only brake on the resistant clone is total density. With an Allee effect per-capita growth *falls* at low density, so shrinking the tumour need not accelerate resistance, and one can gain on both criteria. West et al. (2023) note this and that the in vivo Allee strength is unknown.
See: West et al. 2023, group 1: what belongs in the model

Q: What two methodological rules does West et al. (2023) state as requirements for real-time patient prediction?
A: Correlated parameters must not be estimated together, and a model that cannot fit the data must not be used to predict. They come from the Brady-Nicholls PSA-prediction line of work.
See: Group 2: protocol design, group 3: clinical translation

Q: Which objective functionals have been optimised on the same two- or three-type competition model, and by whom?
A: Time to progression (Viossat & Noble 2021; Phan et al. 2024/2026), squared distance to a target equilibrium under a viability constraint (Cunningham et al. 2020), and cumulative hazard $\int_0^T h(N(t))\,dt$ (Mistry 2020). How the optimum depends on the objective has not been characterised.
See: The mathematical gaps

Q: In the three-type prostate model, why is the usual bang-bang/singular analysis not immediately available?
A: The dose enters through the *carrying capacities* rather than as a death rate, and the clinical problem carries a hard state constraint $N \le B_{\max}$. No paper proves the control structure or gives an HJB verification theorem for the constrained problem.
See: The mathematical gaps

Q: What does Rockne et al. (2019) identify as the binding constraint on the field, and what is the counter-argument?
A: They say the constraint is the wrong kind of data — one time point, one location, one biological scale, no microenvironmental context — not new mathematics. The counter-argument is that several purely mathematical questions (objective dependence, control structure, identifiability, coarse-graining) are unresolved regardless of data.
See: The 2019 roadmap's challenges

Q: Why is "coarse-grain the competition coefficients" a hydrodynamic-limit problem, and what would a theorem give?
A: Because $\alpha_{ij}$ is a property of the geometry and interaction range, not of the cells. A theorem would express $\alpha_{ij}$, and whether competition is frequency- or density-dependent, as a functional of the spatial interaction kernel and the spatial measure, derived from an individual-based model instead of postulated.
See: The mathematical gaps

Q: What is Aktipis et al. (2011)'s role in this literature?
A: A bibliometric study showing the cancer relapse and resistance literature almost never used evolutionary framing. It is why the evolutionary questions were only posed so recently.
See: Where the questions come from

Q: Why is "contain versus extinguish" not currently a single control problem?
A: Containment theory is deterministic and maximises time to progression; two-strike theory maximises an extinction probability and needs stochasticity. A unified formulation — controlled density-dependent branching, or large deviations for the ODE — with the regime boundary characterised by size, turnover and Allee strength is missing.
See: The mathematical gaps

Q: What stochastic-control object does West et al.'s demand for uncertainty quantification actually call for?
A: A posterior over *policies*: from a Bayesian posterior over $(r_i,\alpha_{ij},K_i)$ given sparse biomarker data, the policy maximising expected quality-adjusted survival, plus the value of information from an extra measurement. That is a partially observed control problem, and nobody in this literature has written it down.
See: The mathematical gaps

## Quiz

Q: In West et al. (2023), which assumption of the founding adaptive-therapy story is reported as *not strictly necessary*?
- [x] A fitness cost of resistance
- [ ] Competition between sensitive and resistant cells
- [ ] That therapy reduces the sensitive population
- [ ] That the tumour is spatially well mixed
E: Theory shows adaptive therapy can beat maximum dosing without a cost of resistance, and the experimental evidence for a cost is mixed. Competition is what gives the dose any leverage on the resistant clone at all.
See: West et al. 2023, group 1: what belongs in the model

Q: Why does West et al. Q5 insist that "cure or control" be decided up front?
- [x] A failed curative attempt can leave a resistant population too large to contain
- [ ] Insurance approval requires the choice before the first dose
- [ ] Containment is impossible after any drug exposure
- [ ] The competition coefficients change irreversibly under treatment
E: The two strategies are not freely interchangeable in time: aggressive therapy selects for resistance, so the containment option degrades once it has been tried and failed. Which disease characteristics should drive the stratification is open.
See: Group 2: protocol design, group 3: clinical translation

Q: Why do several of these open problems argue for mean-field *control* rather than a mean field game?
- [x] A game needs the small players to optimise, and tumour cells do not
- [ ] Mean field games have no existence theory under monotonicity
- [ ] Tumour populations are too small for a continuum limit
- [ ] Control problems cannot represent a continuum of types
E: The honest formulations are McKean–Vlasov control by a single controller (the clinician) or a major–minor/Stackelberg structure with replicator or Fokker–Planck minor dynamics. Monotonicity-based existence theory is exactly what *is* available.
See: The mathematical gaps

Q: With $n$ available drugs, what combinatorial difficulty does West et al. Q8 state?
- [x] $2^n$ possible combinations at each decision point, of which trials explore only a slice
- [ ] $n!$ orderings, all of which must be tested in vitro
- [ ] $n^2$ pairwise collateral-sensitivity measurements per patient
- [ ] A state space of dimension $2^n$ for the Fokker–Planck equation
E: The open questions are how to limit the complexity and how to order and time drugs so as to produce repeatable evolutionary cycles; collateral sensitivity is one proposed way to prune the space.
See: Group 2: protocol design, group 3: clinical translation
