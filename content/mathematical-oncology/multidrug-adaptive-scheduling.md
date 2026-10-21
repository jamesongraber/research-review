---
title: "Multidrug adaptive therapy: cycles and entropy"
tags: [cancer, adaptive-therapy, replicator-dynamics, multidrug, drug-scheduling]
created: 2026-10-21
related: [adaptive-therapy-origins, adaptive-therapy-control, adaptive-therapy-dynamic-programming, tumour-containment-theory, extinction-therapy-two-strikes, evolutionary-steering-collateral-sensitivity, branching-process-resistance, bang-bang-singular-metronomic, replicator-dynamics, moran-fixation-probability, cancer-public-goods-games]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

One agent gives a one-dimensional control: on, off, or how much. With several, the question becomes *which* and *in what order*, and this literature has answered it with geometry on the replicator simplex, not with a solved control problem.

### The combinatorial problem

With $n$ agents there are $2^n$ on/off combinations at every decision point. West et al. (2023, *eLife* 12:e84263, their question 8) list the consequences as open: how to limit the combinatorial complexity, how to order and time agents so that the composition follows **repeatable evolutionary cycles**, and whether collateral sensitivity can be sequenced to steer evolution. The branching-process side gives a contrast: Bozic et al. (2013) found that with two agents and no cross-resistance, simultaneous use can eliminate a lesion where strictly sequential use does not — see [branching processes and resistance](#/note/branching-process-resistance). Cycling is a strategy for the regime where elimination is out of reach.

### Cycles and the absorbing region

West et al. (2020, *Cancer Research* 80:1578–1589) work in *relative* coordinates. With three phenotypes of the prostate model of [the first trial](#/note/adaptive-therapy-origins) — $T^+$, $TP$, $T^-$ — and $x$ on the 2-simplex, the state obeys [replicator dynamics](#/note/replicator-dynamics)
$$
\dot x_i = \big(f_i - \langle f\rangle\big) x_i, \qquad \langle f\rangle = \sum_j f_j x_j,
$$
with $f_i = w_i (Bx)_i$, $B = 1-A$, and the carrying-capacity weights $w_i = K_i/K_{\max}$. Each treatment choice (none, Lupron, Lupron plus abiraterone) changes the $K_i$, hence $w$, hence the vector field and its equilibria. Three definitions carry the paper:

- an **evolutionary cycle** is a schedule that returns the composition to its starting point, so the dynamics are periodic and repeatable;
- the **absorbing region** of two treatments is the region bounded by the trajectories joining their equilibria. Trajectories outside it tend to one of the two equilibria or into the region, and leaving it requires a *third* treatment;
- the **evolutionary velocity** is the magnitude of the replicator vector field, mapped over the simplex: low velocity means the composition is changing slowly.

The claims are geometric. Sequential switching between two treatments can close a cycle on the outer boundary of the absorbing region; continuous combination therapy drives $T^-$ to saturation, while switching to no treatment lowers the $T^-$ velocity in part of the state space; adding a third option enlarges the reachable set. The paper is explicitly **heuristic**: cycles are found by inspection, no optimal control problem is solved, and the assertion that an optimal schedule must avoid all equilibria is unproved. It also discards tumour volume by construction, which is the main gap — frequency dynamics alone cannot say whether a cycle is tolerable.

### Entropy of a schedule

West and Newton (2017, *Cancer Research* 77:6717–6728) attack scheduling from the stochastic side. Healthy and cancer cells sit in a finite [Moran process](#/note/moran-fixation-probability) of fixed size $N$, interacting through a prisoner's-dilemma payoff matrix ($a=3$, $b=0$, $c=5$, $d=1$). Treatment does not enter as a kill term: a dose $c\in[0,1]$, a fraction of the maximum tolerated dose, **reshapes the fitness landscape** by raising the selection strength $w_H$ on healthy cells and lowering $w_C$ on cancer cells. The parameters $w$ and $c$ are fitted to murine 5-FU data.

Each schedule over an $N$-day cycle is then scored by the **Shannon entropy** of its vector of daily doses. (The exact normalisation was not recoverable from the preprint's rendered equations; the construction is the usual one, so a single bolus has entropy zero and a uniform daily schedule has the maximal entropy $\ln N$.) Two statistics order the schedules: the total dose $D = ct$ and the **dose density** $d$, the fraction of days with a nonzero dose. Their comparators are MTD (one high dose per two-week cycle, $d = 1/14$, lowest entropy), a weekly low dose ($d = 2/14$) and a daily low dose ($d = 1$, highest entropy).

### Why entropy pays off only over many cycles

Dose *concentration* shows diminishing returns while dose *density* acts roughly linearly, and the consequences are cumulative: after one cycle the advantage of a high-entropy schedule is negligible, but after 8 and 16 cycles the low-dose high-entropy schedules beat MTD. For each growth rate the best schedule in their family is the highest-entropy one, and the slope of response against entropy is steeper for faster-growing tumours — provided the dose still overcomes the growth rate. This is the stochastic-game version of the metronomic argument that geometric optimal control produces as a **singular arc** (see [bang-bang, singular and metronomic](#/note/bang-bang-singular-metronomic)). The model excludes toxicity, resistance and anti-angiogenic effects, and rests on six tumours from one study, so the conclusion is about a mechanism, not a protocol.

### Where multidrug scheduling connects

Newton and Ma (2019, *Phys. Rev. E* 99:022404) and West, Ma and Newton (2018, *J. Theor. Biol.*) continue the replicator-scheduling line that Newton later advertises as "evolutionary mean field games"; the honest description is control of a mean-field (replicator) population by a single controller, not a game among the cells — see [mean field games in oncology](#/note/mean-field-games-in-oncology). The sharper treatments of sequencing are elsewhere: Yoon, Krishnan and Scott (2021) derive a two-phase optimal control for collaterally sensitive cycles — a shaping phase to a critical mixture, then fast switching held there — in [evolutionary steering](#/note/evolutionary-steering-collateral-sensitivity), and [HJB on the simplex](#/note/adaptive-therapy-dynamic-programming) shows what a feedback solution looks like with one control. A feedback law over $2^n$ discrete choices on a replicator state space with volume dynamics included is not done.

## Cards

Q: Why does multidrug adaptive therapy pose a combinatorial problem, and what structure is proposed to tame it?
A: With $n$ agents there are $2^n$ on/off combinations at each decision point. The proposed structure is to look for schedules that produce repeatable **evolutionary cycles** in the composition, rather than searching the whole space.
See: The combinatorial problem

Q: In West et al. (2020), what is the **absorbing region** of two treatments, and what does it imply for control?
A: The region bounded by the trajectories joining the two treatments' equilibria. Trajectories outside tend to an equilibrium or into the region, and escaping it requires a third treatment — so two agents can only steer within it.
See: Cycles and the absorbing region

Q: Define evolutionary velocity on the replicator simplex, and what it is used for.
A: The magnitude of the replicator vector field at a state. Low velocity means slow change of composition, so it is used to choose when a holiday or a switch costs little in evolutionary drift.
See: Cycles and the absorbing region

Q: How does treatment enter West et al. (2020)'s replicator model?
A: Through the fitness weights: $f_i = w_i(Bx)_i$ with $w_i = K_i/K_{\max}$, and each treatment changes the carrying capacities $K_i$. So the control switches between several vector fields on the simplex.
See: Cycles and the absorbing region

Q: In West and Newton (2017), how does a dose act on the Moran process?
A: Not as a kill term. A dose $c\in[0,1]$ reshapes the fitness landscape, raising the selection strength on healthy cells and lowering it on cancer cells in a prisoner's-dilemma payoff structure.
See: Entropy of a schedule

Q: Which schedules have the lowest and highest Shannon entropy, and what is the entropy of a single bolus?
A: MTD (one dose per cycle) is lowest, with entropy zero; a uniform daily low dose is highest, with entropy $\ln N$ over an $N$-day cycle.
See: Entropy of a schedule

Q: Why does the high-entropy advantage appear only after many cycles in West–Newton?
A: After one cycle the difference is negligible; the gain accrues cumulatively through the fitness-landscape shift, so it shows up after 8 to 16 cycles. The entropy–response slope is steeper for faster-growing tumours.
See: Why entropy pays off only over many cycles

Q: What is the relation between the "high-entropy" conclusion and geometric optimal control?
A: It is the stochastic-game version of a **singular arc**: a low, near-continuous administration beating a few maximal pulses, which is the metronomic structure that the maximum principle produces when the Legendre–Clebsch condition holds.
See: Why entropy pays off only over many cycles

Q: Is West et al. (2020) an optimal-control result?
A: No. Cycles and absorbing regions are found geometrically, no objective functional is optimised, the claim that optimal schedules avoid equilibria is unproved, and tumour volume is excluded by working in relative coordinates.
See: Cycles and the absorbing region

## Quiz

Q: Escaping the absorbing region generated by two treatments requires
- [x] a third treatment option
- [ ] a higher dose of either treatment
- [ ] a longer holiday between switches
- [ ] a faster switching frequency
E: The region is bounded by trajectories joining the two treatments' equilibria, and both vector fields point inward on that boundary, so no schedule built from those two options leaves it.
See: Cycles and the absorbing region

Q: In West and Newton's Moran-process model, chemotherapy is modelled as
- [x] a change in the selection strengths, i.e. a reshaping of the fitness landscape
- [ ] an additive death rate on cancer cells
- [ ] a reduction in the carrying capacity
- [ ] a mutation-rate increase
E: The dose raises $w_H$ and lowers $w_C$ in a prisoner's dilemma between healthy and cancer cells; a kill term would be the usual pharmacological modelling choice but is not what they do.
See: Entropy of a schedule

Q: The entropy argument for low-dose metronomic scheduling is strongest
- [x] over many cycles, and for faster-growing tumours
- [ ] within the first cycle, and for slow-growing tumours
- [ ] only when the total dose is also increased
- [ ] only when toxicity is included in the objective
E: After one cycle the schedules are nearly indistinguishable; the advantage accumulates by cycle 8–16, and the slope of response against entropy is steeper for fast growth. Their model excludes toxicity entirely.
See: Why entropy pays off only over many cycles
