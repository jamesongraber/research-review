---
title: "Extinction therapy and evolutionary rescue"
tags: [cancer, extinction, branching-process, evolutionary-rescue, drug-resistance]
created: 2026-10-21
related: [adaptive-therapy-origins, tumour-containment-theory, adaptive-therapy-control, adaptive-therapy-dynamic-programming, multidrug-adaptive-scheduling, branching-process-resistance, pre-existing-resistance, adaptive-therapy-trials-evidence, evolutionary-steering-collateral-sensitivity]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

Containment ([the theorems](#/note/tumour-containment-theory)) gives up on cure and maximises time to progression. **Extinction therapy** does the opposite: it tries to drive a small, already-damaged population to zero. The two programmes come from the same group of people and have never been put into one control problem.

### First strike, second strike

Gatenby, Zhang and Brown (2019, *Cancer Research* 79:3174–3177) argue by analogy with conservation ecology and the history of anthropocene extinctions (developed further in Gatenby et al., 2020, *Cancer Research* 80:613–623). Species rarely go extinct from a single cause: a **first strike** reduces and fragments the population, after which second strikes finish it while it is small, genetically depleted and subject to demographic accident. The imported ingredients are **Allee effects** (per-capita growth increasing with density, via angiogenesis, public-good signalling or mutual immune defence), a **minimum viable population**, and the distinction between demographic and environmental stochasticity. The clinical translation is a reversal of practice: switch therapy *during response*, not at progression, and keep striking even with no detectable disease. The 2019 paper is explicitly verbal — no equations, no parameters. Reed et al. (2020, *Cancer* 126:2577–2587) turned it into a design for pediatric sarcoma (the basis of NCT04388839); pediatric acute lymphoblastic leukaemia is cited as the empirical precedent.

### Why extinction is a probability

This is where the mathematics necessarily changes. A deterministic ODE never reaches zero, and "time to progression" is a well-defined functional of a trajectory; **extinction is an event with a probability**, and the right object is a branching process or a density-dependent birth–death process, not a vector field. So containment theory and extinction theory cannot be compared within one formalism without first choosing a stochastic model — see [branching processes and resistance](#/note/branching-process-resistance) for the standard machinery.

### Rescue theory and the optimal switch time

Patil, Ahmed, Viossat and Noble (2026, *Genetics* 232:iyaf255) give the first analytical theory. Four subpopulations — sensitive $S$, singly resistant $R_1$ and $R_2$, doubly resistant $R_{1,2}$ — with mutation toward greater resistance, no back-mutation, logistic density dependence with carrying capacity $K$, growth rates $g_S = b-d$ and $g_R = b-c-d$ where $c$ is the cost of resistance, and treatment acting as an extra per-capita death rate $\delta$. The first phase is run as an ODE; the second strike is applied when the population reaches a chosen size $N(\tau)$, and from there the extinction probability is computed with **evolutionary-rescue theory** and checked against Gillespie simulation. The extinction probability factorises into a standing-variation term and a de-novo-mutant term, each of the form
$$
P_E = \exp\big[-\pi_e \cdot (\text{expected number of potential rescue lineages})\big],
$$
where $\pi_e$ is the establishment probability of a lineage; the exponential form comes from assuming the number of rescue mutants is Poisson. This is the same structure as the Luria–Delbrück/branching estimates in [pre-existing resistance](#/note/pre-existing-resistance): rescue probability $= 1-P_E$.

Their main result: **the optimal time to switch is close to the nadir** $N_{\min}$, the minimum size the population would reach if the first treatment continued. The optimum may lie slightly before or slightly after it, depending on parameters.

### Why erring late beats erring early

At equal population size, switching *after* the nadir generally gives a higher extinction probability than switching before it. The reason is a race: during the extra time, the $R_2$ population (resistant to the second drug, which has not yet been given) decays under the first drug, and in the cases of interest that decay outweighs the accumulation of doubly resistant $R_{1,2}$ mutants. So if the nadir cannot be located exactly — and the authors note the optimal switch time occurs when the tumour is likely undetectable — err late.

### What matters and what does not

The theory contradicts several intuitions. **A cost of resistance is not needed**: two-strike therapy beats conventional sequential treatment even with $c$ small or zero, though a cost helps (at fixed switching time a higher cost is always better). **Carrying capacity barely matters.** Higher death rates improve outcomes, and higher **turnover** $b+d$ at fixed $g_S$ widens the range of effective switching sizes, both because resistant populations are smaller and because rescue lineages establish less easily. Feasibility is restricted to relatively small tumours — about 7 million cells or fewer for 95 per cent extinction with their default parameters — but that limit is orders of magnitude above what single-strike cure can manage.

### The disagreement with the verbal theory

Gatenby et al. (2020) concluded that the second strike should come well *before* the nadir; Patil et al. find the optimum *at* it. The authors attribute the divergence to modelling assumptions rather than to arithmetic: Gatenby et al. impose strong density dependence and an **Allee effect** that makes growth negative below $N_{\min}$ even for fully resistant cells, and model the second strike as an instantaneous 20 per cent reduction in size. Without an Allee effect, Patil et al. argue, such a second strike has negligible effect unless $N_{\min}$ is already near the extinction threshold. The strength of the Allee effect in vivo is unknown, which makes this a parameter question, not a modelling preference. Patil et al. also exclude Allee effects and tie mutation to population size rather than to cell division, and note that a division-based model would change the conclusions about death rate and turnover in particular.

### Containment versus extinction

Put the two side by side and an open problem appears. Containment maximises time to progression in a deterministic system and wants the burden **high** (competition is strongest there); extinction maximises a probability in a stochastic system and wants the burden **low** (demographic accident only bites there). Nobody has written a single formulation — a controlled branching process with density-dependent rates, or a large-deviations analysis of the controlled ODE — in which "contain" and "extinguish" are two regimes of one control problem, with the boundary between them characterised in terms of population size, turnover and Allee strength. The quantity to compute is the extinction (or quasi-stationary escape) probability as a functional of the schedule. That would also decide, for a given patient, the question West et al. (2023) place first: cure or control, decided up front, because a failed curative attempt leaves a resistant population too large to contain.

## Cards

Q: Why can deterministic containment models not even express the question extinction therapy asks?
A: An ODE population never reaches zero; extinction is an event with a probability. The question needs a branching or density-dependent birth–death process, so the two theories live in different formalisms.
See: Why extinction is a probability

Q: What is the first-strike/second-strike idea, and what does it change about clinical timing?
A: A first strike shrinks and fragments the population; second strikes finish it while it is small and depleted. So one switches therapy *during response*, not at progression, and continues with no detectable disease.
See: First strike, second strike

Q: In Patil et al. (2026), where is the optimal time to apply the second strike?
A: Close to the nadir $N_{\min}$ — the minimum size the population would reach if the first treatment were continued. The exact optimum can be slightly before or after it.
See: Rescue theory and the optimal switch time

Q: Why does switching slightly after the nadir beat switching slightly before, at the same population size?
A: During the extra time the $R_2$ population (resistant to the as-yet-unused second drug) decays under the first drug, and that decay outweighs the accumulation of doubly resistant $R_{1,2}$ mutants.
See: Why erring late beats erring early

Q: What functional form does the extinction probability take in rescue theory, and where does it come from?
A: $P_E = \exp[-\pi_e\times(\text{expected number of potential rescue lineages})]$, with $\pi_e$ the establishment probability of one lineage. The exponential follows from a Poisson assumption on the number of rescue mutants.
See: Rescue theory and the optimal switch time

Q: Does two-strike therapy require a cost of resistance? What does matter instead?
A: No — it beats sequential therapy even with no cost, though a cost helps. Higher death rate and higher turnover $b+d$ matter much more; carrying capacity barely matters.
See: What matters and what does not

Q: Why do Patil et al. disagree with Gatenby et al. (2020) about striking before the nadir?
A: Gatenby et al. assume strong density dependence plus an Allee effect making growth negative below $N_{\min}$ even for resistant cells, and model the second strike as an instantaneous 20 per cent size reduction. Without an Allee effect such a strike does little.
See: The disagreement with the verbal theory

Q: State the open problem of reconciling containment and extinction.
A: Containment wants burden high (maximal competition, deterministic time-to-progression); extinction wants it low (demographic accident, stochastic probability). No single controlled stochastic problem exists in which the two are regimes separated by a characterised boundary in population size, turnover and Allee strength.
See: Containment versus extinction

## Quiz

Q: Patil et al. (2026) find that the optimal second-strike time is
- [x] near the nadir of the tumour size, and erring late is safer than erring early
- [ ] well before the nadir, while the population is still shrinking fast
- [ ] at radiographic progression, when the first drug has failed
- [ ] as early as possible after the first strike begins
E: Striking at progression is standard practice and is what the extinction programme rejects; striking well before the nadir is what Gatenby et al. (2020) proposed, and the disagreement is traced to their Allee-effect assumption.
See: Rescue theory and the optimal switch time

Q: In the rescue-theory treatment of two-strike therapy, raising the **turnover** $b+d$ at fixed net growth $g_S$
- [x] improves outcomes and widens the range of effective switching sizes
- [ ] has no effect, since only the net rate $g_S$ enters
- [ ] worsens outcomes by increasing the number of divisions
- [ ] matters only through the carrying capacity $K$
E: Higher turnover keeps resistant populations smaller and makes rescue lineages harder to establish. Note the caveat: with mutation tied to divisions rather than to population size, this conclusion could change.
See: What matters and what does not

Q: Which objective pair correctly separates containment theory from extinction therapy?
- [x] containment maximises time to progression in a deterministic model; extinction maximises a probability in a stochastic model
- [ ] containment maximises survival probability; extinction maximises time to progression
- [ ] both maximise time to progression, under different constraints
- [ ] both maximise extinction probability, with different carrying capacities
E: The different objectives drive opposite recommendations about burden — high for containment, low for extinction — which is why reconciling them is an open control problem rather than a modelling detail.
See: Containment versus extinction
