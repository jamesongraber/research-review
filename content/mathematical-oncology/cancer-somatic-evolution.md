---
title: Cancer as somatic evolution
tags: [cancer, evolution, population-genetics, moran-process]
created: 2026-07-22
related: [pre-existing-resistance, adaptive-therapy-control, mathematical-oncology-landscape, moran-fixation-probability, adaptive-dynamics, singular-strategies-branching, evolutionary-graph-theory, replicator-dynamics, multistage-carcinogenesis, branching-process-resistance, neutral-evolution-debate, leukaemia-stem-cell-models, cml-dynamics-treatment-free-remission]
source: "Claude conversation: Daily evolutionary game theory course (2026-07)"
---

## Article

### The reframing

A tumor is not a single mutant cell multiplying uniformly. It is a **population of cells undergoing Darwinian evolution inside the body**, over years to decades. All three ingredients of natural selection are present:

- **variation**: mutations arise when cells divide;
- **heritability**: daughter cells inherit them;
- **differential fitness**: mutations that raise the division rate or lower the death rate (apoptosis, immune killing, starvation) leave more descendants.

This is **somatic evolution**: selection acts *within one organism*, among cell lineages competing to leave daughter cells in a tissue. Ordinary (germline) evolution acts among organisms across generations. The dictionary for population models such as the Moran process: individuals = cells, reproduction = mitosis, population = the cells of a tissue, trait = any heritable cellular property that affects division or death rates.

One difference matters mathematically: cells reproduce **asexually**, with no recombination, so a lineage inherits its whole genome as one block.

### Drivers and passengers

- A **driver mutation** changes cell fitness. It increases proliferation, decreases sensitivity to apoptosis, or lets the cell evade growth-suppressing signals. In [adaptive-dynamics](#/note/adaptive-dynamics) language, a driver $z'$ has positive invasion fitness $s_z(z') > 0$ against the resident cell type $z$.
- A **passenger mutation** has (essentially) no fitness effect. It reaches high frequency only by **hitchhiking**: it happens to share a genome with a driver. Because cell lineages do not recombine, every mutation in a lineage is completely linked to that lineage's drivers. This is the same mechanism as a neutral allele riding a selective sweep in population genetics.

Most mutations in a sequenced tumor are passengers. A tumor may carry thousands of mutations but only a handful of drivers. So **counting mutations is a poor measure of progression**. What matters is which mutations change fitness.

### Multistage carcinogenesis

Normal cells have several independent safeguards against runaway proliferation: cell-cycle checkpoints, apoptosis, senescence programs and DNA repair. One driver rarely suffices. Typically a lineage must accumulate **several drivers**, each disabling a safeguard, before it is malignant. Cancer is a **sequence of clonal expansions**: each driver creates a fitter resident type, which is later invaded by a subclone carrying the next driver.

The classical instance is **Knudson's two-hit hypothesis** for retinoblastoma (1971). The tumor needs two hits, in modern terms the inactivation of *both* copies of a tumor-suppressor gene (RB1). In hereditary cases every cell already carries one inactivated copy, so one somatic hit suffices. This explains the earlier onset and the frequent tumors in both eyes. Knudson's evidence was statistical: hereditary cases fit one-hit kinetics in age at diagnosis, and sporadic cases fit two-hit kinetics.

### Fixation of a new driver

Each new driver is a rare mutant in a resident population of $N$ pre-malignant cells. Whether it matters depends on whether it fixes, or at least reaches high frequency, in the local tissue. In the [Moran process](#/note/moran-fixation-probability) a neutral mutant fixes with probability $1/N$. A mutant with constant relative fitness $r$ fixes with probability
$$
\rho = \frac{1 - 1/r}{1 - 1/r^N} \;\approx\; 1 - \frac1r \quad (N \text{ large},\ r > 1).
$$
Many drivers give only a modest per-division advantage, so the weak-selection regime ($r = 1 + s$, $\rho \approx s$ for $1/N \ll s \ll 1$) is often the relevant one. A real tissue is not a well-mixed population of fixed size, so this is a caricature that captures the role of chance.

### Clonal evolution and heterogeneity

Each driver founds a new lineage, so a tumor's history is a **phylogenetic tree of cell lineages**. The founding clone acquires driver 1 and expands. Within it a subclone acquires driver 2 and, if fitter, expands within the first expansion, and so on. Different regions of a tumor, or different cells in one region, descend from different branch points and carry different sets of drivers. This **tumor heterogeneity** is the *expected* signature of ongoing evolution, not an anomaly. It is the reason a resistant subclone may already exist before treatment (see [pre-existing resistance](#/note/pre-existing-resistance)).

The chat suggested further analogies, which are modeling hypotheses rather than established results. Competition among subclones for oxygen, growth factors and space could drive evolutionary branching inside a tumor. Real spatial structure (blood vessels, oxygen gradients, crowding) means spatial-game models may explain why treatments that work in well-mixed cell cultures fail in a body.

## Cards

Q: What is **somatic** evolution, and how does it differ from ordinary (germline) evolution?
A: Selection acting among cell lineages *within* one organism, competing to leave daughter cells in a tissue. Germline evolution acts among organisms across generations.
See: The reframing

Q: In a Moran-process model of a tissue, what plays the roles of individual, reproduction and trait?
A: Individual = cell; reproduction = mitosis; trait = any heritable cellular property affecting division or death rates. The population is the cells of a tissue.
See: The reframing

Q: Distinguish driver and passenger mutations in invasion-fitness language.
A: A driver changes fitness (proliferation, apoptosis, evasion of growth suppression): it has $s_z(z') > 0$ against the resident cells. A passenger is (essentially) neutral, with $s \approx 0$.
See: Drivers and passengers

Q: Why do passenger mutations reach high frequency in tumors?
A: Hitchhiking: cells reproduce without recombination, so a passenger is completely linked to any driver in its lineage and sweeps up with it.
See: Drivers and passengers

Q: Why is "number of mutations" a poor measure of tumor progression?
A: Most mutations in a tumor are passengers (thousands) and only a handful are drivers. Progression depends on which mutations change fitness.
See: Drivers and passengers

Q: What is Knudson's two-hit hypothesis, and why does hereditary retinoblastoma appear earlier?
A: The tumor requires two hits, inactivating both copies of a tumor-suppressor gene (RB1). In hereditary cases every cell already carries one hit, so a single somatic hit suffices.
See: Multistage carcinogenesis

Q: Why is tumor heterogeneity expected rather than anomalous?
A: Each driver founds a subclone, so the tumor is a phylogenetic tree of lineages. Different regions descend from different branch points and carry different sets of drivers.
See: Clonal evolution and heterogeneity

Q: A driver with relative fitness $r > 1$ arises in a tissue of $N$ cells (Moran model). What is its fixation probability, compared with a neutral mutation?
A: $\rho = (1 - 1/r)/(1 - r^{-N}) \approx 1 - 1/r$ for large $N$, versus $1/N$ for a neutral mutation. With weak selection $r = 1+s$ this is $\rho \approx s$.
See: Fixation of a new driver

## Quiz

Q: A mutation is found in 90% of the cells of a tumor. What can you conclude about that mutation's own effect on fitness?
- [x] Nothing by itself: it may be a passenger that hitchhiked with a driver
- [ ] It must be a driver, since neutral mutations stay rare
- [ ] It must have arisen late in the tumor's history
- [ ] It must be inherited (germline), not somatic
E: Without recombination, any mutation in the founding lineage of a clonal expansion reaches high frequency with the driver. High frequency is evidence of early arrival plus linkage, not of selection on that mutation.
See: Drivers and passengers

Q: In hereditary retinoblastoma, tumors appear earlier and often in both eyes because…
- [x] every cell already carries one inactivated copy of RB1, so one somatic hit suffices
- [ ] two inactivated copies are inherited, so no somatic hit is needed
- [ ] the somatic mutation rate is much higher in hereditary cases
- [ ] RB1 is overexpressed, which speeds up division
E: Two hits are needed in both forms. Inheriting one hit turns two-hit kinetics into one-hit kinetics.
See: Multistage carcinogenesis

Q: In a Moran model with $N = 1000$ cells, a single driver mutant has constant relative fitness $r = 1.1$. Its fixation probability is about…
- [x] $0.09$
- [ ] $0.001$
- [ ] $0.9$
- [ ] $1.1/1000$
E: $\rho = (1 - 1/1.1)/(1 - 1.1^{-1000}) \approx 1 - 1/1.1 \approx 0.091$. That is about 90 times the neutral value $1/N = 0.001$, but most new drivers still go extinct.
See: Fixation of a new driver
