---
title: "Adaptive therapy: competitive release and the first trial"
tags: [cancer, adaptive-therapy, lotka-volterra, drug-resistance, clinical-trials]
created: 2026-10-21
related: [adaptive-therapy-control, tumour-containment-theory, adaptive-therapy-dynamic-programming, extinction-therapy-two-strikes, multidrug-adaptive-scheduling, adaptive-therapy-trials-evidence, pre-existing-resistance, stackelberg-evolutionary-games, replicator-lotka-volterra]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

This note is the history: where the idea of deliberately *not* killing all the cells came from, and what the first trial actually did. The mathematics of why it works is in [adaptive therapy as optimal control](#/note/adaptive-therapy-control) and [containment theorems](#/note/tumour-containment-theory).

### Treat for stability, not for cure

Gatenby, Silva, Gillies and Frieden (2009, *Cancer Research* 69:4894–4903) named **adaptive therapy**. Their slogan is "treatment for stability" rather than "treatment for cure": in a competition model with drug-sensitive and drug-resistant cells, a schedule that *holds* the tumour burden steady gives longer host survival than one that minimises it, because maximum tolerated dose (MTD) removes exactly the sensitive cells that were suppressing the resistant clone. That mechanism is **competitive release**, imported from ecology and pesticide resistance. The paper is a simulation study plus a catastrophe-theory reading of treatment failure, with an experimental arm: OVCAR-3 ovarian xenografts in immunodeficient mice, where a stabilising schedule outperformed fixed dosing. No equations of theirs were verified for this note; the model class is ODE competition with a dose-dependent death term on the sensitive compartment, and the original mechanistic story assumed a proliferative **cost of resistance** that later work showed is not strictly necessary.

### From mice to a protocol

Enriquez-Navas et al. (2016, *Science Translational Medicine*) ran the first preclinical adaptive therapy, with paclitaxel in orthotopic MDA-MB-231 (triple-negative) and MCF7 (ER+) mammary-fat-pad xenografts. Two schedule families were compared, **dose modulation** (adjust the dose by the measured response) and **dose skipping**. Adaptive schedules controlled tumours longer than MTD, and in some animals the dose could be reduced progressively and even withdrawn while control was maintained. This is where the "modulate versus skip" question that the literature still argues about was first posed.

### The three-type prostate model

Zhang, Cunningham, Brown and Gatenby (2017, *Nature Communications* 8:1816) built the model that everything downstream optimises. Three phenotypes compete: $T^+$ (needs exogenous androgen), $TP$ (testosterone-producing, CYP17A1$^+$) and $T^-$ (androgen-independent, abiraterone-resistant). The dynamics are Lotka–Volterra competition,
$$
\frac{dx_i}{dt} = r_i\,x_i\left(1 - \frac{\sum_{j=1}^{3} a_{ij} x_j}{K_i}\right), \qquad i = 1,2,3,
$$
with $a_{ii}=1$ and off-diagonal $a_{ij}\in(0,1)$ set from inequalities and expert judgement rather than measured. Growth rates came from cell-line doubling times, $r = [0.278, 0.355, 0.665]$ per day, then **scaled to 10 per cent** of those values as the cell-line rates are upper bounds. The drug enters through the **carrying capacities**, not through a death rate: $K_1 = 1.5\,x_2$ (the $T^+$ cells free-ride on testosterone made by $TP$), falling to $0.5\,x_2$ under abiraterone; $K_2 = 10^4$, falling to $10^2$; $K_3 = 10^4$, drug-independent. PSA is produced per cell and decays, so it tracks total cell number.

### The 50 per cent rule and what it produced

The clinical rule is feedback on a biomarker, not a computed control: **stop abiraterone when PSA falls below 50 per cent of the pre-abiraterone baseline, restart when PSA returns to baseline**. In the interim report, of 11 patients 10 remained on trial, one had radiographic progression at month 11, PSA progression occurred at months 11, 21 and 28, median time to progression was not reached and so was stated as at least 27 months, and the **average cumulative dose was 47 per cent of standard of care** (three patients under 25 per cent). Eligibility required a prior PSA decline of at least 50 per cent, so the cohort was pre-selected for responders.

### The 2022 update: asymmetric competition and a shallower trigger

Zhang et al. (2022, *eLife* 11:e76284) reported 17 adaptive versus 16 contemporaneous standard-of-care patients: **median time to progression 33.5 versus 14.3 months, median overall survival 58.5 versus 31.3 months** (hazard ratio 0.41, 95% CI 0.20–0.83), with adaptive patients off abiraterone about 46 per cent of their time on trial. Fitting a two-population reduction (sensitive $=T^+ \cup TP$ against $T^-$) retrospectively gave a strongly **asymmetric competition** coefficient, $\alpha_{RS} = 6$ against $\alpha_{SR} = 1$, roughly six to one, where the pre-trial model had assumed two to one. Their own simulations then said the deployed trigger was too deep: withdrawing the drug after only a 20 per cent PSA decline (stopping at 80 per cent of baseline) did better, and waiting for an 80 per cent decline lost control faster. Less depletion of sensitive cells is better — which is precisely the containment prediction. The 50 per cent rule was kept as a compromise with monitoring cost and compliance.

The statistical objections to these comparisons (non-randomised, selected cohort, historical control, globally estimated competition coefficients) are real and are collected in [the trial evidence](#/note/adaptive-therapy-trials-evidence).

## Cards

Q: What does "treat for stability, not for cure" mean in Gatenby et al. (2009), and what ecological mechanism makes it work?
A: Hold the tumour burden steady instead of minimising it, so that drug-sensitive cells survive to competitively suppress resistant ones. MTD instead causes **competitive release**: it clears the suppressors and frees capacity for the resistant clone.
See: Treat for stability, not for cure

Q: In the Zhang et al. (2017) prostate model, how does abiraterone enter the equations?
A: Through the **carrying capacities**, not a kill term: $K_1 = 1.5x_2 \to 0.5x_2$ and $K_2 = 10^4 \to 10^2$, while $K_3 = 10^4$ is drug-independent. So the control multiplies the competition denominator rather than adding a death rate.
See: The three-type prostate model

Q: Name the three competing types of the Zhang et al. (2017) model and which one is resistant.
A: $T^+$ (requires exogenous androgen), $TP$ (testosterone-producing, CYP17A1$^+$) and $T^-$ (androgen-independent). $T^-$ is the abiraterone-resistant type.
See: The three-type prostate model

Q: State the trial's dosing rule and why it is a feedback rule rather than an optimal control.
A: Stop abiraterone once PSA falls below 50 per cent of baseline; restart when PSA returns to baseline. It is a fixed threshold policy on one scalar observation, chosen for monitorability, not computed from a Hamiltonian or a value function.
See: The 50 per cent rule and what it produced

Q: What did the retrospective fit in Zhang et al. (2022) say about the competition coefficients, and why is that significant?
A: Sensitive cells suppress resistant cells about six times more strongly than the reverse ($\alpha_{RS}=6$, $\alpha_{SR}=1$), against two to one assumed pre-trial. The parameter that carries the conclusion was estimated from the outcome it explains, and was held equal across patients.
See: The 2022 update: asymmetric competition and a shallower trigger

Q: Zhang et al. (2022) simulated changing the withdrawal trigger. Which direction helped, and why?
A: Withdrawing after a *shallower* decline (stop at 80 per cent of baseline, i.e. a 20 per cent drop) did better; waiting for an 80 per cent decline lost control sooner. Shallower withdrawal depletes fewer sensitive cells, so competitive suppression stays strong.
See: The 2022 update: asymmetric competition and a shallower trigger

Q: What did Enriquez-Navas et al. (2016) contribute beyond Gatenby et al. (2009)?
A: The first preclinical adaptive therapy (paclitaxel, MDA-MB-231 and MCF7 xenografts), and the split between **dose modulation** and **dose skipping**; in some animals the dose could be progressively reduced or withdrawn with control maintained.
See: From mice to a protocol

## Quiz

Q: In the Zhang et al. (2017) three-type model, the control acts on…
- [x] the carrying capacities $K_1$ and $K_2$
- [ ] an additive death term $-\delta u\,x_1$
- [ ] the competition coefficients $a_{ij}$
- [ ] the intrinsic growth rates $r_i$
E: Abiraterone lowers $K_1$ from $1.5x_2$ to $0.5x_2$ and $K_2$ from $10^4$ to $10^2$. Entering through $K_i$ rather than as a death rate changes the structure of the resulting control problem.
See: The three-type prostate model

Q: The 2022 update's simulations imply that the deployed 50 per cent rule…
- [x] withdrew the drug too late, depleting more sensitive cells than necessary
- [ ] withdrew the drug too early, letting the tumour regrow
- [ ] was optimal for the model that motivated it
- [ ] should be replaced by continuous dosing
E: Stopping at 80 per cent of baseline (a 20 per cent decline) performed better in their simulations, and waiting for an 80 per cent decline performed worse. Preserving sensitive cells preserves competitive suppression.
See: The 2022 update: asymmetric competition and a shallower trigger

Q: Which claim about the 2017 pilot is supported by its reported numbers?
- [x] Average cumulative abiraterone dose was 47 per cent of standard of care
- [ ] Median time to progression was 27 months exactly
- [ ] The cohort was randomised against standard of care
- [ ] All 11 patients progressed during the reported follow-up
E: Median TTP was *not reached*, so it was reported as at least 27 months; the comparison cohorts were historical and contemporaneous, not randomised; 10 of 11 patients were still on trial at the interim analysis.
See: The 50 per cent rule and what it produced
