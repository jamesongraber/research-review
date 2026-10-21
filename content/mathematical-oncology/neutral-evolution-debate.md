---
title: Neutral tumour evolution and the role of space
tags: [cancer, neutral-evolution, inference, spatial-structure, branching-processes]
created: 2026-10-21
related: [cancer-somatic-evolution, multistage-carcinogenesis, branching-process-resistance, pre-existing-resistance, spatial-games-in-tumours, space-and-trait-models, moran-fixation-probability, mathematical-oncology-landscape]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

Everything in the branching-process programme needs parameters, and the only data most patients supply is a
single bulk sequencing sample. Can selection be *detected* in such a sample? The 2016–2022 argument over
"neutral tumour evolution" is the inference-side counterpart of the modelling.

### The $1/f$ test

Williams et al. (2016) model a tumour after its drivers are in place as a neutrally growing population:
$N(t) = e^{\lambda\beta t}$, with $\beta$ the fraction of divisions producing two surviving lineages and
$\mu$ the mutation rate per division. If no subclone has a growth advantage, all subclones grow at the same
rate and allele frequencies stop changing. Their test: regress the cumulative number $M(f)$ of subclonal
mutations above allele frequency $f$ against $1/f$, on the window $f \in [0.12, 0.24]$, in tumours of purity
$\ge 70\%$ with at least 12 private mutations in the window, and call the tumour neutral if
$R^2 \ge 0.98$. They report 323 of 904 cancers across 14 types as neutral (the body text's counts, 259/819
exomes plus 38/108 colorectal and 60/78 gastric genomes, were not reconcilable with that figure in the
survey). The fitted slope is the per-effective-division mutation rate $\mu_e = \mu/\beta$, so the test also
yields an in vivo mutation rate per patient.

### Deriving the cumulative law

The derivation is the Luria–Delbrück integral of
[pre-existing resistance](#/note/pre-existing-resistance) run in reverse. Under neutral exponential growth
all lineages grow by the same factor, so a mutation that arises when the tumour has $n$ cells ends at
frequency $f \approx 1/n$. While the tumour grows from $n$ to $n + dn$, about $\mu_e\,dn$ new mutations
appear. A mutation has final frequency at least $f$ exactly when it arose at size $n \le 1/f$, so
$$
M(f) = \int_{1/f_{\max}}^{1/f} \mu_e \, dn = \mu_e\Big(\frac1f - \frac1{f_{\max}}\Big).
$$
The cumulative spectrum is a straight line in $1/f$ with slope $\mu_e$ and no free shape parameter — that is
the whole content of the test. Simulated check ($\mu_e = 20$, mutations arising at every size with Poisson
counts): the exact expectation is the staircase $\mu_e(\lfloor 1/f\rfloor - \lfloor 1/f_{\max}\rfloor)$,
giving $80$ mutations in $[0.12, 0.24]$ against the continuum value $83.3$; a regression over the window,
averaged over 400 runs, recovers slope $19.6$ against the true $20$.

### What the test does and does not establish

Three independent comments appeared together in *Nature Genetics* 50(12) in 2018 — Tarabichi et al.,
Balaparya and De, and McDonald, Chakrabarti and Michor — with replies from the original group (Heide et al.;
Werner et al.). The survey verified the citations but not their technical arguments; what can be stated is
that they dispute the *specificity* of the test, i.e. whether $R^2 \ge 0.98$ on $M$ versus $1/f$ licenses the
conclusion "no subclonal selection". The logical point is clean regardless: a $1/f$ spectrum is a
*consequence* of neutral growth, so a good fit is consistency, not identification — any other mechanism
producing the same spectrum is indistinguishable in one bulk sample.

### Space supplies exactly such a mechanism

Waclaw et al. (2015) showed in a spatial cell-based model that **short-range dispersal plus cell turnover**
makes a tumour mix rapidly, so a small selective advantage can sweep a large tumour within a clinically
relevant time; they note this could also explain how chemotherapy resistance emerges so fast. Noble et al.
(2022) then made the resolution systematic with deme-based spatial models (demes of fixed carrying capacity,
dispersal either by invading neighbouring demes or by deme fission, confined to the boundary or allowed
throughout). Spatial structure alone produces four modes — rapid clonal expansion, progressive
diversification, branching evolution, and effectively almost-neutral evolution — classified by an
inverse-Simpson clonal diversity index, mean drivers per cell, a normalised tree-balance index and, with
time series, clonal turnover. The almost-neutral mode arises in the **boundary-growth** model, where
geometry favours genetic drift over selection. An apparently neutral spectrum can therefore be a signature
of tumour geometry rather than of an absence of selection.

### Passengers are not quite free

McFarland et al. (2013) add the opposite correction: passengers are mildly *deleterious*, and because
lineages do not recombine they accumulate by hitchhiking. In their simulations a cost of about $0.1\%$ per
passenger still permits progression, while $0.3\%$ makes tumours collapse under their own mutational load,
and a therapy that *intensifies* passenger damage outperformed one that merely raises the mutation rate. So
neither "passengers are neutral" nor "passengers are a load" is safe as an a priori modelling assumption.

### Inference from a single sample, and what is missing

Leder et al. (2024) prove that consistent parameter estimators can be built from single-patient,
single-time-point sequencing of a recurrent tumour, using large-population limit theorems for a two-type
branching process; Leder and Wang (2026) show that early recurrence implies *high* clonal diversity rather
than one dominant clone. The gap this leaves is a methodological one: the $1/f$ test is a least-squares fit
with an $R^2$ cut-off, while the rigorous limit laws (Durrett and Moseley 2010, Leder et al. 2024) are
available. A likelihood-based neutrality test derived from the actual limit law, with the sequencing-depth
detection limit handled correctly, is still missing and would arguably have pre-empted the 2018 exchange.

## Cards

Q: Under neutral exponential growth, why does a mutation that arose when the tumour had $n$ cells end up at allele frequency about $1/n$?
A: After the drivers are fixed every lineage grows at the same rate, so the mutant clone keeps its share of the population: one cell out of $n$ stays one part in $n$.
See: Deriving the cumulative law

Q: Derive the cumulative subclonal mutation count $M(f)$ under neutral exponential growth.
A: About $\mu_e\,dn$ mutations arise while the size goes from $n$ to $n+dn$, and they reach frequency $\ge f$ iff $n \le 1/f$. So $M(f) = \int_{1/f_{\max}}^{1/f}\mu_e\,dn = \mu_e(1/f - 1/f_{\max})$.
See: Deriving the cumulative law

Q: In the Williams et al. (2016) test, what does the fitted slope of $M(f)$ against $1/f$ estimate?
A: $\mu_e = \mu/\beta$, the mutation rate per *effective* division (per division producing two surviving lineages) — an in vivo mutation rate for that patient.
See: The $1/f$ test

Q: Why is a good fit of $M(f)$ to $1/f$ evidence of consistency with neutrality rather than identification of it?
A: The $1/f$ law is a consequence of neutral growth, not an equivalent of it. Any other mechanism producing the same spectrum is indistinguishable in a single bulk sample — which is what the 2018 comments dispute about the test's specificity.
See: What the test does and does not establish

Q: Which spatial model in Noble et al. (2022) produces effectively almost-neutral evolution, and why?
A: Boundary growth: with division confined to the tumour edge, the spatial structure favours genetic drift over selection, so the signature of neutrality can come from geometry rather than from an absence of selection.
See: Space supplies exactly such a mechanism

Q: What two ingredients in Waclaw et al. (2015) let a small advantage sweep a large tumour quickly?
A: Short-range dispersal plus cell turnover. Together they mix the tumour fast, which also offers an explanation for how rapidly resistance to chemotherapy appears.
See: Space supplies exactly such a mechanism

Q: Why do mildly deleterious passenger mutations accumulate at all (McFarland et al. 2013)?
A: Cell lineages do not recombine, so a passenger is completely linked to its lineage's drivers and hitchhikes through clonal expansions; drift during expansions does the rest. In their simulations a $0.1\%$ cost per passenger still allows progression, $0.3\%$ collapses the tumour.
See: Passengers are not quite free

Q: What is the open methodological gap between the limit theorems and the neutrality test?
A: The test is a least-squares fit with an $R^2 \ge 0.98$ cut-off, whereas rigorous limit laws for clone-size distributions exist (Durrett–Moseley 2010, Leder et al. 2024). A likelihood-based neutrality test derived from the limit law, with the detection limit modelled, is still missing.
See: Inference from a single sample, and what is missing

## Quiz

Q: With $\mu_e = 20$ mutations per effective division, how many subclonal mutations does the neutral law predict with allele frequency between $0.12$ and $0.24$?
- [x] about 83
- [ ] about 20
- [ ] about 170
- [ ] about 5
E: $\mu_e(1/0.12 - 1/0.24) = 20\times(8.33-4.17) \approx 83$. A simulation gives the staircase value $80$ and a window regression recovers the slope $19.6$ against the true $20$.
See: Deriving the cumulative law

Q: A tumour's cumulative VAF spectrum fits $1/f$ with $R^2 = 0.99$. What follows?
- [x] Its spectrum is consistent with neutral growth; boundary-dominated spatial growth, or selection that finished before the growth phase, can produce the same shape
- [ ] No subclone in the tumour has a selective advantage
- [ ] The tumour has no driver mutations
- [ ] The mutation rate must be unusually high
E: The $1/f$ law is a prediction of neutral growth, so the fit is consistency, not identification. Noble et al. (2022) obtain an almost-neutral mode purely from boundary growth, and Williams et al. themselves interpret neutral-looking tumours as ones where selection acted *before* the growth phase.
See: What the test does and does not establish

Q: Noble et al. (2022) classify the mode of tumour evolution using which kind of statistics?
- [x] Clonal diversity (inverse Simpson), mean drivers per cell, tree balance, and clonal turnover
- [ ] The slope and $R^2$ of the cumulative VAF spectrum
- [ ] The fixation probability of a neutral mutant, $1/N$
- [ ] The ratio of non-synonymous to synonymous substitutions
E: Their point is precisely that the VAF-spectrum test cannot distinguish the four modes; diversity, driver load, tree shape and turnover can, and the mode is set by the spatial structure (boundary growth versus dispersal throughout).
See: Space supplies exactly such a mechanism
