---
title: Multistage carcinogenesis and waiting times
tags: [cancer, branching-processes, waiting-times, epidemiology, asymptotics]
created: 2026-10-21
related: [cancer-somatic-evolution, pre-existing-resistance, branching-process-resistance, neutral-evolution-debate, moran-fixation-probability, tumor-growth-laws, mathematical-oncology-landscape]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

Cancer takes decades because a lineage must accumulate several drivers (see
[cancer as somatic evolution](#/note/cancer-somatic-evolution)). The oldest quantitative argument in the
field turns that qualitative statement into a curve that can be fitted to national cancer registries.

### The Armitage–Doll power law

Armitage and Doll (1954) observed that for many adult cancers, age-specific incidence $I(t)$ plotted
against age $t$ on log–log axes is close to a straight line, and read the slope as a count of rate-limiting
steps: $k$ rare independent steps give
$$
I(t) \;\propto\; t^{k-1}.
$$
(The classical reading of the slope for common epithelial cancers is $5$–$6$, hence six or seven stages;
that specific number is not verified here.) Their 1957 sequel added clonal growth of the intermediate cells.

### Deriving $t^{k-1}$

Take one cell that must pass through stages $0 \to 1 \to \cdots \to k$ with small constant rates
$\lambda_1,\dots,\lambda_k$. The probability of having completed all $k$ steps by time $t$ is an ordered
time integral,
$$
P_k(t) = \int_{0<t_1<\cdots<t_k<t} \lambda_1\cdots\lambda_k \,dt_1\cdots dt_k \;(1+o(1))
      = \Big(\prod_i \lambda_i\Big)\frac{t^k}{k!},
$$
valid while $\lambda_i t \ll 1$, because the exponential survival factors are then all $\approx 1$. The
hazard (incidence per cell at risk) is
$$
h(t) = \frac{P_k'(t)}{1-P_k(t)} \;\approx\; \Big(\prod_i \lambda_i\Big)\frac{t^{k-1}}{(k-1)!},
$$
so $\log h = (k-1)\log t + \text{const}$: the slope counts steps, and the constant lumps together all the
rates, which is why the law identifies $k$ far more reliably than the individual $\lambda_i$. Numerical
check with $k=6$, $\lambda_i = 10^{-3}\,\text{yr}^{-1}$: the exact chain gives $P_6(80) = 3.40\times10^{-10}$
against $(\lambda t)^6/6! = 3.64\times10^{-10}$, and the log–log slope of the hazard over ages 20–80 is
$4.96$ (theory $k-1 = 5$).

### Two stages plus clonal expansion

Moolgavkar and Venzon (1979) and Moolgavkar and Knudson (1981) replaced "many stages" by **two stages plus
growth** (the MVK two-stage clonal expansion model): initiated cells appear at rate $\nu$ and each founds a
birth–death clone with net rate $\lambda$, so the expected number of intermediate cells is
$\nu(e^{\lambda t}-1)/\lambda$ and the malignant-conversion hazard is $\mu_2$ times that. Over the observed
age range an exponential is nearly indistinguishable from a power law: fitting
$\log\big[(e^{\lambda t}-1)/\lambda\big]$ against $\log t$ on $20 \le t \le 80$ yr gives apparent exponents
$2.5$ at $\lambda = 0.05\,\text{yr}^{-1}$ and $4.5$ at $\lambda = 0.1\,\text{yr}^{-1}$ ($R^2 \approx 0.97$)
— i.e. apparent $k$ of $3.5$ and $5.5$. **Clonal expansion substitutes for extra stages**, which is why a
two-hit model can fit both childhood tumours à la Knudson and the steep adult curves.

### Waiting times with selection

Beerenwinkel et al. (2007) put the same question in a Wright–Fisher population: genotypes are binary strings
over $d = 100$ candidate driver genes, cancer is any $k = 20$ of them mutated in one cell, the population
grows from $10^6$ to about $10^9$ cells, $u$ is the per-gene mutation rate and $s$ the average advantage per
driver. Their approximation (validated against simulation, and only for $s > 0$) makes the waiting time
**linear in $k$, roughly $\propto 1/s$, and only logarithmic in $u$ and in population size**; for a growing
population it equals that of a constant population whose size is the *geometric mean* of the initial and
final sizes. The conclusion is that selection matters more than either mutation rate or population size, and
that observed cancer-genome diversity is compatible with a normal mutation rate if each driver gives about
$1\%$.

Bozic et al. (2010) obtained the matching closed form from a discrete-time branching process in which a cell
with $k$ drivers stagnates with probability $d_k = \tfrac12 (1-s)^k$, so a $k$-driver lineage survives with
probability $\approx 2ks$. The average time between the $k$-th and $(k+1)$-th driver is
$$
\tau_k = \frac{T}{ks}\,\log\frac{2ks}{u},
$$
$T$ the generation time. With $T = 4$ d and $u = 10^{-5}$: $\tau_1,\dots,\tau_4 \approx 15.1, 8.3, 5.8,
4.5$ yr at $s = 0.5\%$ and $8.3, 4.5, 3.2, 2.5$ yr at $s = 1\%$ (recomputed). Because $\tau_k \sim 1/k$, the
cumulative time grows like a harmonic sum, i.e. logarithmically in $k$ up to the slowly varying
$\log(2ks/u)$. Fitting driver counts against passengers in sequencing data gave a strikingly small
advantage per driver: $0.48\% \pm 0.04\%$ (glioblastoma) and $0.50\% \pm 0.05\%$ (pancreatic) in the arXiv
version, $0.40\%$ and $0.41\%$ in the published text — about $0.4$–$0.5\%$ either way. Zhang and Bozic
(2024) extend this to a multitype branching process started from homeostatic tissue, giving waiting times
for arbitrary mutation orders.

### Replicative chance and the "bad luck" dispute

Tomasetti and Vogelstein (2015) reported a correlation $r = 0.804$ across 31 tissues between lifetime
stem-cell divisions and lifetime cancer risk, i.e. about $65\%$ of the *between-tissue variation* in risk;
Wu et al. (2016) replied that such a correlation cannot separate intrinsic from extrinsic causes and
estimated intrinsic factors at only $10$–$30\%$ of lifetime risk. The dispute is about what the quantity
"variation in risk among tissues" licenses: a cross-tissue correlation constrains between-tissue variance,
not the attributable fraction inside one tissue.

## Cards

Q: Why do $k$ rare independent rate-limiting steps give cancer incidence $\propto t^{k-1}$?
A: The probability of completing all $k$ steps by $t$ is the ordered integral $(\prod_i\lambda_i)t^k/k!$ while $\lambda_i t \ll 1$; the hazard is its derivative over $1-P$, hence $(\prod_i \lambda_i)t^{k-1}/(k-1)!$.
See: Deriving $t^{k-1}$

Q: In the Armitage–Doll law, which parameter does the log–log age-incidence plot identify well, and which does it not?
A: The slope gives $k-1$, so the *number* of stages is well identified; the individual rates $\lambda_i$ only enter the intercept as a product, so they are not.
See: Deriving $t^{k-1}$

Q: Why can a two-stage model with clonal expansion (MVK) reproduce a steep multi-stage power law?
A: The intermediate compartment grows like $\nu(e^{\lambda t}-1)/\lambda$, and over ages 20–80 an exponential fits a power law closely: apparent exponent $4.5$ (so apparent $k \approx 5.5$) at $\lambda = 0.1\,\text{yr}^{-1}$. Growth substitutes for extra stages.
See: Two stages plus clonal expansion

Q: In Beerenwinkel et al. (2007), how does the waiting time to $k$ drivers scale with $k$, $s$, $u$ and population size?
A: Linear in $k$, roughly $\propto 1/s$, and only *logarithmic* in the mutation rate and the population size. So selection matters more than either $N$ or $u$.
See: Waiting times with selection

Q: Beerenwinkel et al. replace a growing population by a constant one of what size, for waiting-time purposes?
A: The geometric mean of the initial and final sizes.
See: Waiting times with selection

Q: State the Bozic et al. (2010) waiting time between consecutive drivers, and say where the $2ks$ comes from.
A: $\tau_k = (T/ks)\log(2ks/u)$. A lineage carrying $k$ drivers has stagnation probability $d_k = \tfrac12(1-s)^k$ and so survives with probability $\approx 2ks$ — the factor that makes a new driver's lineage establish.
See: Waiting times with selection

Q: Why does the time to acquire $k$ drivers grow only logarithmically in $k$, even though each driver is a rare event?
A: $\tau_k \propto 1/k$ because the per-lineage establishment probability grows like $2ks$ and more cells carry $k$ drivers; summing a harmonic series gives $\log k$ (up to the slowly varying $\log(2ks/u)$).
See: Waiting times with selection

Q: What per-driver selective advantage did Bozic et al. (2010) infer from sequencing data, and why was it surprising?
A: About $0.4$–$0.5\%$ ($0.48\%\pm0.04\%$ glioblastoma and $0.50\%\pm0.05\%$ pancreatic in the arXiv version; $0.40\%$/$0.41\%$ published). Drivers are thus individually almost neutral, yet enough to drive decades-long progression.
See: Waiting times with selection

Q: What does the Tomasetti–Vogelstein correlation $r = 0.804$ establish, and what did Wu et al. (2016) object?
A: It accounts for about $65\%$ of the *variation in risk between tissues* via stem-cell division counts. Wu et al. argued this cannot separate intrinsic from extrinsic causes and put intrinsic factors at $10$–$30\%$ of lifetime risk.
See: Replicative chance and the "bad luck" dispute

## Quiz

Q: A cancer's age-specific incidence has log–log slope $5$ against age. Under the Armitage–Doll reading, how many rate-limiting steps does that suggest?
- [x] 6
- [ ] 5
- [ ] 4
- [ ] 25
E: The hazard goes like $t^{k-1}$, so slope $k-1 = 5$ gives $k = 6$ steps. Reading the slope itself as $k$ is the standard off-by-one error.
See: Deriving $t^{k-1}$

Q: In $\tau_k = (T/ks)\log(2ks/u)$ with $T = 4$ d and $u = 10^{-5}$, doubling $s$ from $0.5\%$ to $1\%$ changes $\tau_1$ from $15.1$ yr to…
- [x] $8.3$ yr — a bit less than half, because the logarithm also grows
- [ ] exactly $7.55$ yr, since $\tau_1 \propto 1/s$
- [ ] $30.2$ yr, since waiting time increases with selection
- [ ] $15.1$ yr — $\tau_1$ does not depend on $s$
E: $\tau_1 = (4/0.01)\log(0.02/10^{-5})/365.25 = 8.3$ yr. The prefactor halves but $\log(2s/u)$ rises, so the reduction is by a factor $1.82$, not $2$.
See: Waiting times with selection

Q: Beerenwinkel et al. (2007) conclude that the waiting time to cancer is most sensitive to…
- [x] the selective advantage $s$ per driver
- [ ] the per-gene mutation rate $u$
- [ ] the population size $N$
- [ ] the number $d$ of candidate driver genes
E: The waiting time is linear in $k$ and $\propto 1/s$ but only logarithmic in $u$ and $N$ — hence "selection matters more than either mutation rate or population size", and normal mutation rates suffice if each driver confers about $1\%$.
See: Waiting times with selection

Q: Why does a hazard that is really $\mu_2\nu(e^{\lambda t}-1)/\lambda$ get fitted as a power law in age?
- [x] Over a bounded age window an exponential is numerically close to a power law, with an apparent exponent set by $\lambda$
- [ ] Because $(e^{\lambda t}-1)/\lambda \to t^{k-1}$ as $\lambda \to \infty$
- [ ] Because birth–death clones grow polynomially, not exponentially
- [ ] Because the power law is exact once $\lambda t \ll 1$
E: Fitting on $20 \le t \le 80$ yr gives apparent exponents $2.5$ ($\lambda = 0.05$) and $4.5$ ($\lambda = 0.1$) with $R^2 \approx 0.97$. Clonal expansion of intermediate cells mimics extra stages, so a measured slope does not pin down a stage count.
See: Two stages plus clonal expansion
