---
title: "Adaptive-therapy trial evidence and its critiques"
tags: [cancer, adaptive-therapy, clinical-translation, objective-functionals, identifiability]
created: 2026-10-21
related: [adaptive-therapy-origins, adaptive-therapy-control, tumour-containment-theory, adaptive-therapy-dynamic-programming, extinction-therapy-two-strikes, measuring-the-game, spatial-games-in-tumours, digital-twins-oncology, field-open-questions, mathematical-oncology-landscape, persisters-phenotypic-switching]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

The theory behind containment is in [adaptive-therapy origins](#/note/adaptive-therapy-origins) and [tumour containment theory](#/note/tumour-containment-theory). This note is about the *evidence*: what the one well-known trial reported, the two kinds of objection raised against it, and what model-based reanalyses of its own data say about the dosing rule it used. The mathematical lesson is that most of the dispute is about the **objective functional**, not the dynamics.

### The prostate pilot and its update

Zhang, Cunningham, Brown and Gatenby (2017, *Nature Communications*) treated metastatic castrate-resistant prostate cancer with abiraterone under a feedback rule on the biomarker PSA: stop dosing when PSA falls below 50% of the pre-treatment baseline, restart when it returns to baseline. The rule was motivated by a three-type Lotka–Volterra model (androgen-dependent, testosterone-producing, androgen-independent cells) whose competition coefficients were set from inequalities and expert judgement rather than measured. Trial entry required a prior PSA decline of at least 50%, so the cohort was pre-selected for responders. The interim report covered 11 patients, with median time to progression not reached and stated as at least 27 months, at an average cumulative dose 47% of standard of care.

The 2022 update (*eLife* 11:e76284) compared 17 adaptively treated patients with 16 who had also responded and then continued dosing: median time to progression 33.5 vs 14.3 months, median overall survival 58.5 vs 31.3 months. A retrospective fit indicated strongly **asymmetric competition** — sensitive cells exerting roughly six times the competitive effect of resistant ones — and that a **shallower stop rule** would have done better: in their simulations, withdrawing the drug once PSA had fallen to 80% of baseline (a 20% decline) outperformed the deployed 50% rule, while waiting for an 80% decline lost control faster. The deployed rule treated too deeply, depleting the sensitive cells that supply the competitive suppression, which is the containment prediction rather than a contradiction of it. The *eLife* referees objected that the competition coefficients were held identical across all patients although the outcome is highly sensitive to them, that per-patient covariates were not reported, and that the sample size cannot support multivariable analysis. The authors conceded the ratio likely varies between patients and defended global estimation as a necessity.

### Two kinds of critique, only one of them mathematics

Mistry's two critiques separate the issues cleanly. The matters-arising piece in *Nature Communications* (DOI in the 2020 series, print year likely 2021) is **statistical**: baseline prognostic covariates were not reported for either group, so no adjustment is possible, and comparison with the AA-302 phase III cohort is invalid because trial entry required a 50% PSA decline while AA-302 patients were treatment-naive; hence, it concludes, evidence of superiority over continuous therapy does not yet exist. Zhang et al. replied. This objection is about study design, not models.

The 2020 bioRxiv preprint "Evolutionary based adaptive dosing algorithms: beware the cost of cumulative risk" is **decision-theoretic**, and it is the one a control theorist should care about. Take the two-type competition model of [adaptive therapy as optimal control](#/note/adaptive-therapy-control) and add a survival layer: a hazard $h$ increasing in burden $N$, so that
$$
S(T) = \exp\Big(-\int_0^T h\big(N(t)\big)\,dt\Big).
$$
Containment deliberately holds $N$ high in order to keep competitive suppression strong. Time-to-threshold rewards exactly that; the cumulative hazard $\int_0^T h(N)\,dt$ punishes exactly that. Mistry's parameter set (a gefitinib fit, exponential survival, median survival 12 months untreated) gives adaptive dosing a later time at maximal burden but a *worse* integrated hazard than continuous dosing — and the tighter the control at high burden, the closer the survival curve moves toward no treatment at all. The argument does not refute containment; it shows the ranking of policies is a functional of the objective, and that time to progression is not the patient's objective. The toy model of the control note reproduces the crossing: with $h(N) = 0.01\,N/N_0$ the adaptive rule delays a $1.2N_0$ threshold from 29 to 42 time units, yet its cumulative hazard at $t = 12$ is about five times larger (0.10 vs 0.018), because maximum dosing first drives the burden far below $N_0$. (Illustrative parameters.) West et al. (2023) absorb the point as their open question 10.

### Prediction at the level of the individual patient

Brady-Nicholls et al. (2020, *Nat Commun* 11:1750) built a prostate stem-cell model, with PSA obeying $dP/dt = \lambda N - \Xi P$ and resistance arising by *enrichment* of stem-like cells rather than by mutation, calibrated to longitudinal PSA from 70 patients on intermittent androgen deprivation. Under leave-one-out cross-validation they report about 89% accuracy in predicting patient-specific resistance evolution (73% sensitivity, 91% specificity); the companion 2021 *Neoplasia* study reports 81% in the adaptive-therapy setting. The two methodological rules of West et al. (2023) — do not jointly estimate correlated parameters, do not predict with a model that cannot fit the data — come from this line of work.

### The deployed rule is not optimal for its own model

Two independent reanalyses say the clinical rule is suboptimal for the very model that motivated it. Cunningham et al. (2020, *PLoS ONE*) solve a state-constrained optimal-control problem on the three-type system by forward–backward sweep and find a **monotone dose titration**, not an on/off cycle; see [dynamic programming for adaptive therapy](#/note/adaptive-therapy-dynamic-programming). Phan et al. (2024/2026, arXiv:2410.16005) keep the on/off structure but optimise the *thresholds*: a Stackelberg leader chooses a restart level $P^{\uparrow} = \eta^{\uparrow}P_{thr}$ and a stop level $P^{\downarrow} = \eta^{\downarrow}P^{\uparrow}$, with patient parameters fitted by nonlinear mixed effects to 32 patients of the Zhang cohort and $(\eta^{\uparrow},\eta^{\downarrow})$ chosen by Gaussian-process Bayesian optimisation. The optimum sits at the corner $(0.9,0.9)$: **high-level tight control**, the opposite of the 50%-drop rule, with a regime boundary at $P_{thr}/P_K > 1/\alpha_{RS} \approx 0.19$ separating delayed failure from indefinite simulated control. Strobl et al. (2024, *Cell Systems*) ask a different question in ovarian cancer and find, by model selection on time-lapse data, that **dose modulation beats treatment skipping**, attributing this to a delay between exposure and kill and a saturating dose–response, with an in vivo pilot roughly halving drug use.

### What is and is not established

West et al. (2023) catalogue the registered trials. Two cautionary points stand out: the metastatic thyroid study NCT03630120 was **suspended**, partly because a patient became symptomatic and the biomarker proved unreliable at high burden; and ANZadapt (NCT05393791, ANZUP 2101) is the first *randomised* test — phase II, 84 patients, adaptive versus continuous abiraterone or enzalutamide, started November 2022, primary endpoint time to treatment failure while on treatment — with sources as of 2026 disagreeing on whether it is recruiting or in follow-up. Hansen and Read (2020, *Evol. Appl.* 13:1660–1672) frame the prior decision no trial has yet resolved: attempt cure or manage resistance, a choice that must be made up front because a failed curative attempt can leave a resistant population too large to contain.

An identifiability problem sits underneath all of it. The conclusion of the 2022 update is carried by a competition asymmetry estimated retrospectively and globally, from the outcome it is invoked to explain, while the observable is the scalar $P \approx (\lambda/\Xi)\sum_i x_i$. Which combinations of $(r_i,\alpha_{ij},K_i)$ are identifiable from one such trajectory under on/off control, and whether switching the control adds identifiability, has not been worked out; see [the field's open questions](#/note/field-open-questions).

## Cards

Q: Why can adaptive dosing win on time-to-progression and lose on cumulative hazard at the same time?
A: Containment holds the burden $N$ high on purpose, to keep competitive suppression strong. Time to threshold rewards that; the cumulative hazard $\int_0^T h(N(t))\,dt$ with $h$ increasing in $N$ charges for every day spent at high burden. The ranking of policies is a functional of the objective (Mistry 2020).
See: Two kinds of critique, only one of them mathematics

Q: Write the survival functional that Mistry (2020) uses in place of time-to-progression, and name its ingredient that the competition models lack.
A: $S(T) = \exp\big(-\int_0^T h(N(t))\,dt\big)$ with hazard $h$ increasing in tumour burden. The missing ingredient is the burden-to-hazard map: preclinical systems contain no cumulative risk at all.
See: Two kinds of critique, only one of them mathematics

Q: Which of the critiques of the prostate pilot are statistical and which are mathematical, and why does the distinction matter?
A: Statistical: non-randomised, responder-selected cohort, an invalid historical control, unreported baseline covariates (Mistry 2021). Mathematical/decision-theoretic: the protocol maximises an objective that is not the patient's (Mistry 2020). Only the second can be settled by analysis rather than by a new trial.
See: Two kinds of critique, only one of them mathematics

Q: What did the retrospective model fit in the 2022 prostate update say about the trial's own 50% stop rule?
A: That it treated too deeply: stopping once PSA had fallen to 80% of baseline (a 20% decline) did better than the 50% rule, and waiting for an 80% decline did worse. The fit also indicated competition asymmetry of roughly 6:1 in favour of sensitive cells.
See: The prostate pilot and its update

Q: What did the *eLife* referees object to in the 2022 prostate update (as distinct from Mistry's objections)?
A: Competition coefficients held identical across all patients although outcomes are highly sensitive to them, missing per-patient covariates and prior-therapy status, and a sample size too small for multivariable analysis.
See: The prostate pilot and its update

Q: In Phan et al. (2024/2026), what is the leader's strategy in the Stackelberg problem, and where is the optimum?
A: A pair of feedback thresholds — restart at $P^{\uparrow} = \eta^{\uparrow}P_{thr}$, stop at $P^{\downarrow} = \eta^{\downarrow}P^{\uparrow}$ — not a dose path. Bayesian optimisation puts the optimum at the corner $(0.9,0.9)$: high-level tight control, the opposite of the 50% rule.
See: The deployed rule is not optimal for its own model

Q: Why is the competition asymmetry estimated in the 2022 prostate update epistemically fragile?
A: It is fitted retrospectively, globally across patients, from the same outcomes it is invoked to explain, using only the scalar observable $P \approx (\lambda/\Xi)\sum_i x_i$. Which parameter combinations are identifiable from one scalar trajectory is unresolved.
See: What is and is not established

Q: What makes the suspension of the thyroid trial NCT03630120 a warning about containment in particular?
A: Containment deliberately maintains high burden, and the two failure modes it risks both appeared: a patient became symptomatic, and the biomarker proved unreliable at high burden.
See: What is and is not established

## Quiz

Q: Mistry's cumulative-hazard argument shows that adaptive therapy…
- [x] can be worse than continuous dosing under $\int_0^T h(N)\,dt$ even while delaying time to maximal burden
- [ ] fails because the competition coefficients were mis-estimated
- [ ] is dominated by maximum dosing under every objective
- [ ] delays progression only if resistance carries a fitness cost
E: The two criteria order the policies differently because containment holds burden high by design. The argument is about the objective, not about the parameters, and it does not claim dominance under all objectives.
See: Two kinds of critique, only one of them mathematics

Q: Which reanalysis finding is shared by Cunningham et al. (2020) and Phan et al. (2024/2026)?
- [x] The clinically deployed 50%-drop rule is not optimal for the model that motivated it
- [ ] The optimal control is bang-bang with a 50% trigger
- [ ] Adaptive therapy is never better than maximum tolerated dose
- [ ] The competition coefficients are identifiable from PSA alone
E: One finds a monotone titration by forward–backward sweep, the other a high-and-tight threshold corner by Bayesian optimisation; they disagree on the form of the optimum but agree the deployed rule is not it.
See: The deployed rule is not optimal for its own model

Q: In Strobl et al. (2024), what mechanism makes dose *modulation* beat dose *skipping*?
- [x] A delay between drug exposure and cell kill together with a saturating dose–response
- [ ] A larger fitness cost of resistance under modulation
- [ ] Stronger spatial segregation of resistant clones
- [ ] Faster recovery of the sensitive population during holidays
E: The explanation is pharmacological (PK/PD shape), not eco-evolutionary — a consideration absent from the 2009–2017 competition models. The stated primary aim was toxicity mitigation.
See: The deployed rule is not optimal for its own model

Q: As of 2026, what is the evidential status of randomised evidence for adaptive therapy?
- [x] ANZadapt (NCT05393791), phase II with 84 patients, is the first randomised test; its result is not yet reported
- [ ] Two randomised phase III trials have confirmed a survival benefit
- [ ] The 2022 prostate update was randomised
- [ ] No randomised trial has ever been registered
E: The 2017/2022 prostate comparisons are non-randomised and responder-selected. ANZadapt randomises adaptive against continuous abiraterone or enzalutamide with time to treatment failure while on treatment as its primary endpoint.
See: What is and is not established
