---
title: Evolutionary steering and collateral sensitivity
tags: [cancer, drug-resistance, fitness-landscapes, markov-chains, optimal-control]
created: 2026-10-21
related: [branching-process-resistance, pre-existing-resistance, cancer-somatic-evolution, control-of-evolving-populations, multidrug-adaptive-scheduling, adaptive-therapy-control, extinction-therapy-two-strikes, persisters-phenotypic-switching, replicator-dynamics, mathematical-oncology-landscape]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

Combination therapy asks how to make resistance improbable
([branching processes and combination therapy](#/note/branching-process-resistance)). *Steering* asks the
opposite question: granted that the population will evolve, can the order of drugs decide **which**
resistant genotype it evolves into — and can that genotype be one we have a drug for?

### Evolution as a Markov chain on a landscape

Nichol et al. (2015) model evolution under strong selection and weak mutation (SSWM, valid roughly when
$Mu\log M \ll 1$): genotypes are bit strings of length $N$ (empirically $N = 4$, so 16 genotypes on a
hypercube), the population is isogenic and sits at one genotype, and only a *fitter* neighbour can fix. For
a drug with fitness $f$,
$$
P_{ij} \;\propto\; \big(f(j)-f(i)\big)^r \quad\text{over the fitter neighbours } j \text{ of } i,
$$
with $P_{ij} = 0$ otherwise and local optima absorbing; $r$ tunes the bias ($r = 0$ uniform among fitter
neighbours, $r = 1$ gain-weighted, $r \to \infty$ steepest ascent) and changes the numbers but not which
peaks are reachable. Iterating $P$ to absorption gives a limit matrix $P^*$, attained in finitely many
steps, so a drug sequence acts on an initial distribution $\mu$ as $\mu P^*_X P^*_Y \cdots$. **The algebra
is the biology**: drug order matters exactly when these matrices fail to commute.

### A worked two-locus example

Two loci, genotypes $00, 01, 10, 11$ on a square; $r = 1$. Let drug B have fitnesses
$f_B = (1.0, 1.3, 1.6, 0.9)$ in that order. Then $01$ and $10$ are both local peaks (they are not
neighbours of each other), and $10$ is the most B-resistant genotype; from $00$ the chain goes uphill to
$01$ with probability $0.3/0.9 = 1/3$ and to $10$ with probability $2/3$. Now let drug A have
$f_A = (1.0, 1.4, 0.8, 1.2)$, whose unique peak is $01$: $A^*$ sends $00 \to 01$ with probability one. Since
$01$ is absorbing under B, **priming with A drops the probability of reaching the most B-resistant genotype
from $2/3$ to exactly $0$** (computed in exact arithmetic). Replace $f_A$ by $(1.0, 1.4, 1.5, 0.9)$, which
has the same two peaks as B, and the matrices visibly fail to commute: from $00$, A-then-B ends at $10$ with
probability $5/9$, B-then-A with probability $3/4$.

### How often does a naive sequence backfire?

Empirically, none of the 15 $\beta$-lactam landscape pairs commute, and only $0.132\%$ of a million random
NK landscape pairs ($N = 5$) do. The consequence is that an arbitrary sequence is more likely to *help*
resistance than to hinder it: a single priming drug increases the chance of reaching the most resistant
genotype in $57.3\%$ of cases and decreases it in $29.8\%$; for pairs of priming drugs $64.1\%$ versus
$28.4\%$, for triples $65.6\%$ versus $27.5\%$ (the paper's headline figure is that roughly $70\%$ of naive
sequences promote resistance). Steering nonetheless works when designed: against worst-case uniform starting
populations, 3 of 15 drugs could be fully steered by one prior drug, 6 by pairs and 7 by triples. Because
selection cannot be reversed without knowing the starting genotype, no universal cycling strategy returns
every population to its origin.

### Collateral sensitivity, and its contingency

The biological resource steering exploits is **collateral sensitivity**: resistance to one drug raising
sensitivity to another. Zhao et al. (2016) found *temporal* collateral sensitivity — transient windows of
sensitivity along a resistance trajectory — with a survival benefit in mice; Dhawan et al. (2017) mapped
ALK-inhibitor networks in lung cancer, finding cross-resistance within the class but collateral sensitivity
outside it, and time dependence that argues for drug holidays. The brake on the programme is contingency:
Nichol et al. (2019) evolved replicate *E. coli* populations under one drug and found that the second drug
*stochastically* met either susceptibility or cross-resistance, attributable to genetic divergence among
replicates; sequences designed from a single evolution experiment therefore overstate their benefit.
Acar et al. (2020) nevertheless demonstrated steering in a barcoded, non-replated lung-cancer model, with
both collateral sensitivity and proliferative costs. The clinical base rate is sobering: Tandar et al.
(2026) scanned more than five million MIC measurements over 86 antibiotics and 30 species and found
collateral sensitivity in only $3.0\%$ of species–antibiotic pairs against $42.0\%$ collateral resistance.

### Optimal cycles: a two-phase schedule

Yoon, Vander Velde, Marusyk and Scott (2018) put two collaterally sensitive drugs into an ODE model of a
tumour with two resistant subpopulations (plus an individual-based stochastic counterpart) and solved the
optimal-control problem. The optimum has two stages: give one drug until a time $T$, then alternate rapidly.
They **prove that $T$ is shorter than the period over which the first drug still reduces the total
population** — one should switch while the first drug is still working, contradicting clinical intuition.
There is a *critical ratio* of the two subpopulations at which both drugs are equally effective; stage one
drives the state to that ratio and stage two holds it there, which is the structure of a **singular arc**,
with the fast alternation playing the role of the singular control. Yoon, Krishnan and Scott (2021)
generalise to $N$ drugs: a "shaping" phase reaches the mixture at which all drugs are equally effective,
then drugs are cycled quickly with durations set by their efficacies — formally adaptive therapy — with
methods for unknown drug parameters and partial population observations.

### From landscapes to policies and seascapes

Maltas and Wood (2019) measured 900 mutant–drug combinations and designed profile-dependent policies that
beat intuitive cycling, at the cost of transient high resistance; Maltas, Huynh and Wood (2025) showed the
profiles themselves drift along the adaptive trajectory and cast the design problem as a Markov decision
process; Weaver et al. (2024) solved it by reinforcement learning under noisy, delayed and limited
observation, on landscapes of up to 1,024 genotypes. King et al. (2025) argue the state description is wrong
to begin with: a genotype should map to a dose–response *function* (a fitness **seascape**) rather than to a
scalar fitness, which also makes adherence a modelled variable. The explicitly control-theoretic line of
this literature — monitoring, counterdiabatic driving of the genotype distribution, and MDP control beyond
SSWM — is taken up in [control of evolving populations](#/note/control-of-evolving-populations).

## Cards

Q: In the SSWM model of Nichol et al. (2015), what is the transition rule and what are the absorbing states?
A: From genotype $i$, the chain moves to a *fitter* neighbour $j$ with probability $\propto (f(j)-f(i))^r$ (zero to any non-fitter neighbour). Local fitness optima are absorbing, which is why $P^*$ is reached in finitely many steps.
See: Evolution as a Markov chain on a landscape

Q: In the Markov-chain picture of sequential therapy, what exactly is the mathematical statement that "drug order matters"?
A: Each drug gives a limit matrix $P^*$ and a sequence acts as $\mu P^*_X P^*_Y\cdots$; order matters precisely when these matrices do not commute. Empirically none of the 15 $\beta$-lactam pairs commute, and only $0.132\%$ of a million random NK pairs do.
See: How often does a naive sequence backfire?

Q: How can a priming drug make a later drug's resistant genotype *unreachable*?
A: If the priming drug's own peak is a *local* peak of the second drug's landscape, it is absorbing under the second drug, so the uphill-only walk can never leave it. In the two-locus example, priming takes $P(\text{most B-resistant genotype})$ from $2/3$ to $0$.
See: A worked two-locus example

Q: How often does an arbitrary (undesigned) drug sequence make resistance to the final drug *more* likely?
A: More often than not: a single priming drug raises the chance of reaching the most resistant genotype in $57.3\%$ of cases and lowers it in $29.8\%$ (pairs $64.1\%$/$28.4\%$, triples $65.6\%$/$27.5\%$).
See: How often does a naive sequence backfire?

Q: Why is there no universal drug-cycling strategy that returns any population to its original genotype?
A: Selection cannot be reversed without knowing where the population started: the uphill-only walk forgets its history, so a cycling sequence can be constructed only for a *known* starting genotype.
See: How often does a naive sequence backfire?

Q: What is proved about the switching time $T$ in the two-drug optimal schedule of Yoon et al. (2018)?
A: $T$ is shorter than the period over which the first drug still reduces the total population — switch while the first drug is still working, which contradicts clinical intuition.
See: Optimal cycles: a two-phase schedule

Q: What makes the second phase of the Yoon et al. optimal schedule a singular arc?
A: There is a critical ratio of the two resistant subpopulations at which both drugs are equally effective. Phase one steers the state onto it; phase two holds it there by fast alternation, i.e. the control keeps the state on an interior manifold rather than at a bound.
See: Optimal cycles: a two-phase schedule

Q: What did Nichol et al. (2019) show about collateral sensitivity, and what does it break?
A: Replicate populations evolved under the same first drug met the second drug with either susceptibility or cross-resistance, stochastically, owing to genetic divergence. It breaks any sequence designed from a single evolution experiment: what is needed is the *distribution* of collateral outcomes.
See: Collateral sensitivity, and its contingency

Q: What is a fitness *seascape* (King et al. 2025), and why is it needed?
A: A map from genotype to a dose–response *function* rather than to a scalar fitness. Realistic modelling of therapy needs the dose dependence — which also makes imperfect adherence a modelled variable rather than noise.
See: From landscapes to policies and seascapes

Q: How common is collateral sensitivity in clinical surveillance data, as of 2026?
A: Rare: Tandar et al. (2026) found it in $3.0\%$ of species–antibiotic pairs against $42.0\%$ showing collateral *resistance*, over more than five million MIC measurements (86 antibiotics, 30 species).
See: Collateral sensitivity, and its contingency

## Quiz

Q: Why can giving drug A before drug B lower the chance that a population evolves B's most resistant genotype?
- [x] A's peak can be a local peak of B's landscape, which is absorbing for an uphill-only walk, so B's global peak becomes unreachable
- [ ] A lowers the mutation rate, so fewer genotypes are explored
- [ ] A and B are synergistic, so their kill rates multiply
- [ ] Any priming drug reduces the population below the SSWM threshold
E: In the two-locus example, drug A's unique peak $01$ is one of drug B's two local peaks, so after A the chain cannot move: $P(\text{reach } 10) = 0$ instead of $2/3$. Nothing about mutation rates or synergy is involved.
See: A worked two-locus example

Q: Clinical intuition says to switch drugs when the first stops shrinking the tumour. The Yoon et al. (2018) optimal control says…
- [x] switch earlier — the optimal $T$ is provably shorter than the period in which the first drug still reduces the total population
- [ ] switch later, once the resistant subpopulation is detectable
- [ ] switch exactly when the total population stops decreasing
- [ ] never switch; maintain the first drug at maximum tolerated dose
E: The objective is not the instantaneous burden but extinction/long-run control, and the optimum first steers the subpopulation ratio to the critical value at which both drugs are equally effective. Waiting until the first drug fails overshoots that ratio.
See: Optimal cycles: a two-phase schedule

Q: "Drug order matters" is, in the SSWM formulation, the statement that…
- [x] the limit matrices $P^*_X$ and $P^*_Y$ of the two drugs do not commute
- [ ] the transition matrices are not doubly stochastic
- [ ] the chain is not reversible
- [ ] the landscapes have different global maxima
E: A sequence acts as $\mu P^*_X P^*_Y \cdots$, so order dependence is exactly non-commutativity. Irreversibility holds for every such chain (only uphill moves), and the drugs can share a global maximum and still fail to commute.
See: Evolution as a Markov chain on a landscape

Q: Which finding is the strongest practical objection to designing therapy around collateral sensitivity?
- [x] It is stochastic and clinically rare — contingent on genetic divergence (Nichol 2019) and present in only $3.0\%$ of surveyed pairs against $42.0\%$ collateral resistance (Tandar 2026)
- [ ] It cannot be measured in the laboratory
- [ ] It requires non-commuting transition matrices, which are rare
- [ ] It only occurs in bacteria, never in cancer cells
E: Collateral sensitivity is measurable and has been demonstrated in cancer (Zhao 2016, Dhawan 2017, Acar 2020), and non-commutativity is essentially generic. The problem is repeatability and base rate.
See: Collateral sensitivity, and its contingency
