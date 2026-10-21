---
title: Pre-existing drug resistance (Luria–Delbrück)
tags: [cancer, drug-resistance, branching-processes, population-genetics]
created: 2026-07-22
related: [cancer-somatic-evolution, adaptive-therapy-control, moran-fixation-probability, kill-laws-and-scheduling-principles, branching-process-resistance, multistage-carcinogenesis, neutral-evolution-debate, evolutionary-steering-collateral-sensitivity, cml-dynamics-treatment-free-remission]
source: "Claude conversation: Daily evolutionary game theory course (2026-07)"
---

## Article

### Pre-existing or acquired?

The key clinical modeling question: is a drug-resistant clone **already present** (rare) before treatment begins, or does resistance **arise only after** treatment starts? The two have different statistical signatures. The **Luria–Delbrück fluctuation test** (1943, bacteria) told them apart. If resistance mutations arise at random before selection, a mutation that happens early produces a large "jackpot" of resistant descendants. Counts across parallel cultures then have variance far above the Poisson variance that induced resistance would give. Goldie and Coldman (1979) applied the same model to tumors.

### The expected number of resistant cells

A tumor grows from one sensitive cell by a pure birth process. Every cell divides at rate $b$ and no cells die. At each division of a sensitive cell, with probability $\mu$ one daughter is resistant. Resistant cells divide at the same rate. Stop when the tumor has $N$ cells.

Parametrize time by tumor size $n$. While the size goes from $n$ to $n + dn$, about $dn$ divisions occur, creating about $\mu\,dn$ new resistant cells. Each of them then grows by the factor $N/n$ by the time the tumor reaches $N$. Hence
$$
\mathbb E[\#\text{resistant at size } N] \;\approx\; \int_1^N \mu\,\frac{N}{n}\,dn \;=\; \mu N \ln N .
$$
**Each $e$-fold growth of the tumor contributes the same $\mu N$**. Early mutants are rare, but each has had many divisions to expand, and that gives the log factor. Exactly, the mean $a(n)$ solves $a' = \mu + (1-\mu)\,a/n$, so $a(N) = N(1 - N^{-\mu})$, which is $\approx \mu N\ln N$ when $\mu \ln N \ll 1$. (Checked numerically against the exact discrete recursion.)

### Mean versus probability

The expected number of resistant cells is **not** the quantity that decides whether resistance is present:

- The number of mutation *events* is roughly Poisson with mean $\approx \mu N$, since there are $N - 1$ divisions. So
$$
\mathbb P(\text{no resistant cell at size } N) \approx e^{-\mu N}.
$$
  Resistance is almost surely present once $\mu N \gg 1$.
- The count is heavy-tailed: rare early mutations produce jackpots. The mean $\mu N\ln N$ is much larger than the typical (median) value. For example, with $\mu N = 2$ and $N = 10^5$, the mean is $\mu N\ln N \approx 23$, while simulations give a median of $4$, and no resistant cell at all in about $13\%$ of runs, matching $e^{-2}$.

A tumor of 1 cm³ has about $10^9$ cells, and lethal burdens are about $10^{12}$. With such $N$, $\mu N \gg 1$ is plausible even for small per-division rates $\mu$, especially when many different mutations confer resistance. The lesson: **treatment does not cause resistance, it reveals it**, by removing the sensitive competitors.

### The sweep under treatment

Treatment changes the fitness landscape. The drug raises the death rate of sensitive cells and leaves resistant cells unaffected. Before treatment, resistance often carries a **fitness cost** ($f_R < f_S$), which keeps resistant cells rare. Treatment flips the sign of $f_R - f_S$.

The chat used the Moran fixation formula
$$
\rho_R = \frac{1}{1 + \sum_{k=1}^{N-1}\prod_{i=1}^{k}\gamma_i}, \qquad \gamma_i = \frac{f_S(i)}{f_R(i)},
$$
where $i$ is the number of resistant cells. Two caveats. With a constant ratio $r = f_R/f_S$, $\rho_R \approx 1 - 1/r$, which is close to 1 only for **strong** selection ($r \gg 1$). And the Moran model keeps $N$ fixed, while a treated tumor shrinks. A branching process fits better: a resistant cell with birth rate $b_R$ and death rate $d_R < b_R$ founds a lineage that survives forever with probability $1 - d_R/b_R$. So $m$ pre-existing resistant cells **all** die out with probability $(d_R/b_R)^m$, which is negligible since $m$ is typically large.

The clinical timeline chains three pieces together: mutation supply before treatment, then establishment of the resistant clone, then its regrowth into the space freed by the dying sensitive cells. The regrowth is modeled in [adaptive therapy as optimal control](#/note/adaptive-therapy-control). This is why single-agent targeted therapy often produces dramatic shrinkage followed by resistant relapse.

## Cards

Q: What is the clinical modeling question behind "pre-existing vs acquired" resistance, and what classical test addresses it?
A: Whether resistant cells already exist (rarely) before treatment or arise only after it starts. The Luria–Delbrück fluctuation test: random pre-existing mutations give jackpots, so variance across parallel populations far exceeds Poisson.
See: Pre-existing or acquired?

Q: In the pure-birth Luria–Delbrück model (mutation probability $\mu$ per division), what is the expected number of resistant cells when the tumor reaches size $N$?
A: About $\mu N \ln N$. Exactly, $N(1 - N^{-\mu})$ for the mean equation, which is $\approx \mu N\ln N$ when $\mu\ln N \ll 1$.
See: The expected number of resistant cells

Q: Where does the $\ln N$ in $\mu N\ln N$ come from?
A: Mutants arising at size $n$ (about $\mu\,dn$ of them) expand by the factor $N/n$, so $\int_1^N \mu N/n\,dn = \mu N\ln N$. Each $e$-fold of tumor growth contributes $\mu N$, because early mutants have had longer to expand.
See: The expected number of resistant cells

Q: In the same model, what is the probability that a tumor of $N$ cells contains **no** resistant cell?
A: About $e^{-\mu N}$: there are about $N$ divisions, each producing a resistant cell with probability $\mu$. Resistance is almost surely present once $\mu N \gg 1$.
See: Mean versus probability

Q: Why is the mean $\mu N\ln N$ a poor description of a typical tumor's resistant count?
A: The distribution is heavy-tailed. Rare early mutations create huge jackpots that dominate the mean, so the median is much smaller.
See: Mean versus probability

Q: What does it mean that therapy "reveals" rather than "causes" resistance?
A: For large tumors ($\mu N \gg 1$) resistant cells are almost surely present before treatment. The drug removes their sensitive competitors, and they then expand.
See: Mean versus probability

Q: Why can a resistant clone stay rare before treatment and sweep after it?
A: Resistance often carries a fitness cost without the drug ($f_R < f_S$). Treatment raises the sensitive cells' death rate and flips the sign of $f_R - f_S$.
See: The sweep under treatment

Q: A resistant population of $m$ cells, each with birth rate $b_R$ and death rate $d_R < b_R$, faces treatment. What is the probability that all their lineages die out?
A: $(d_R/b_R)^m$, since each lineage independently dies out with probability $d_R/b_R$ (birth–death branching process). This is negligible for large $m$.
See: The sweep under treatment

## Quiz

Q: Pure-birth Luria–Delbrück model with $\mu = 10^{-7}$ per division. When the tumor has $N = 10^9$ cells, the expected number of resistant cells is roughly…
- [x] $2{,}000$
- [ ] $100$
- [ ] $20$
- [ ] $10^7$
E: $\mu N\ln N = 100 \times \ln(10^9) \approx 100 \times 20.7 \approx 2{,}070$. The answer $100 = \mu N$ is the expected number of mutation *events*, which forgets that early mutants expand.
See: The expected number of resistant cells

Q: In the same model, suppose $\mu N = 3$. The probability that the tumor contains no resistant cell is about…
- [x] $e^{-3} \approx 0.05$
- [ ] $e^{-3\ln N}$
- [ ] $1/3$
- [ ] $1 - e^{-3} \approx 0.95$
E: Absence requires that none of the about $N$ divisions produced a mutant: $(1-\mu)^{N} \approx e^{-\mu N}$. The extra $\ln N$ affects the *size* of the resistant population, not whether it exists.
See: Mean versus probability

Q: In a large Moran population, a resistant mutant has constant relative fitness $r = 2$ under treatment. Its fixation probability is about…
- [x] $1/2$
- [ ] close to $1$
- [ ] $1/N$
- [ ] $2/N$
E: $\rho \approx 1 - 1/r = 1/2$. Fixation of a *single* mutant is near certain only when $r \gg 1$. Near-certain survival of resistance comes from there usually being many resistant cells already.
See: The sweep under treatment
