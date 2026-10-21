---
title: Branching processes, combination therapy and dosing schedules
tags: [cancer, drug-resistance, branching-processes, generating-functions, combination-therapy]
created: 2026-10-21
related: [pre-existing-resistance, cancer-somatic-evolution, multistage-carcinogenesis, evolutionary-steering-collateral-sensitivity, multidrug-adaptive-scheduling, persisters-phenotypic-switching, adaptive-therapy-control, control-of-evolving-populations, kill-laws-and-scheduling-principles, selection-mutation-hamilton-jacobi]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

[Pre-existing resistance](#/note/pre-existing-resistance) answers "is a resistant cell there?". This note is
about the sequel: how many drugs are needed, given together or in sequence, and on what schedule. The tool
is the multitype branching process, and the technical engine is its generating function.

### The two-type process and the product $Mu$

Iwasa, Nowak and Michor (2006) start from one sensitive cell; sensitive cells divide at rate $r$ and die at
rate $d$, each division produces a resistant daughter with probability $u$, and resistant cells have relative
fitness $\alpha$. The tumour is detected when the sensitive population reaches $M$. Their results (exact
generating-function formulas; the published equations are image-rendered, so only the stated conclusions are
used here):

- the probability $P$ that resistant cells are present at detection depends on the **product** $Mu$, not on
  $M$ and $u$ separately, with $P \propto Mu$ when $Mu \ll 1$; $P$ decreases in $r$ and increases in
  $\alpha$;
- conditional on resistance being present and $Mu \ll 1$, the expected number of resistant cells is
  **independent of $u$**: bounded for $\alpha < 1$, proportional to $\ln M$ for $\alpha = 1$, and a power of
  $M$ for $\alpha > 1$. The neutral $\ln M$ is the $\mu N \ln N$ logarithm of the Luria–Delbrück
  calculation, now stripped of its $\mu$ by the conditioning;
- both quantities grow with the *number of divisions* in the tumour's history, so a tumour with high
  apoptosis carries more resistance than its detected size suggests.

With $d = 0$ the model is exactly Luria–Delbrück. Durrett and Moseley (2010) proved the corresponding limit
theorems (for the first time $k$ mutations appear in one cell, and for the growth of the type-$k$
population); Durrett's 2015 monograph collects the rigorous theory.

### Generating functions are a first-order PDE

For a linear birth–death process with rates $b, d$, the master equation
$p_n' = b(n-1)p_{n-1} - (b+d)n p_n + d(n+1)p_{n+1}$ turns, under $F(t,z) = \sum_n p_n(t) z^n$, into
$$
\partial_t F = \big(bz^2 - (b+d)z + d\big)\,\partial_z F ,
$$
a **first-order linear PDE**, solved along the characteristics $\dot z = -(bz^2 - (b+d)z + d)$ — whose
stationary points are $z = 1$ and $z = d/b$, the extinction probability. (Verified numerically against the
classical solution: the residual is $10^{-8}$ relative, and $F(t,0) \to d/b$.) Multitype models with
mutation give a coupled first-order system, and time-varying doses make the characteristic system
non-autonomous, with the schedule entering as a coefficient. This is the same transport/Hamilton–Jacobi
machinery as in [the constrained HJ limit](#/note/selection-mutation-hamilton-jacobi), reached from
probability rather than from a PDE scaling.

### How many drugs?

Komarova and Wodarz (2005) put one mutation per drug on a combinatorial network: division rate $L$, death
rate $D$, mutation probability $u$ per division, therapy started at size $N$ adding drug-induced death $H$.
For a **single** drug, resistance is generated almost entirely before therapy, the treatment phase mattering
only in the unrealistic regime $H \le H_c = 2(L-D)$; for two or more drugs the pre-treatment phase dominates
and, at fixed $N$, high-turnover cancers fail more often — both effects growing with the number of drugs.
With $D = 0$, a $10^{13}$-cell cap and a $1\%$ failure threshold, the number of drugs needed is 2 at
$u = 10^{-9}$, 3 at $10^{-7}$–$10^{-8}$, 4 at $10^{-5}$–$10^{-6}$ and 6 at $10^{-4}$; for CML
($u = 10^{-8}$–$10^{-9}$, $D/L = 0.1$–$0.5$) they conclude three drugs should prevent resistance below
$10^{13}$ cells.

### Simultaneous beats sequential — under one hypothesis

Bozic et al. (2013) take four types for two drugs (sensitive, two singly resistant, doubly resistant) with
$b = 0.14$/day, $d = 0.13$/day before treatment (so the survival parameter $s = 1 - d/b \approx 0.07$),
$d' = b' + 0.03$ under drug, $u = 10^{-9}$, $n_1 = n_2 = 50$ resistance mutations per drug, $n_{12}$
cross-resistance mutations, and $M \approx 10^8$–$10^9$ cells, in a well-mixed population with constant
rates. Their closed forms (as reconstructed in the survey from a garbled rendering, and to be checked
against the supplement) have $\mu = us/\log(Ms)$ and expected pre-treatment resistant cells
$X \approx M n_{12}\mu$ when $n_{12}\ge1$ but $X \approx M n_1 n_2 \mu^2$ when $n_{12} = 0$: with no
cross-resistance, double resistance needs **two independent mutation events**, hence a second-order
dependence on $u$. The reported conclusions: with $n_{12} = 1$ sequential therapy always fails and
simultaneous dual therapy still cures about $26.3\%$ of lesions (the share of failures due to resistance
arising *during* the first drug, the other $73.7\%$ being already present); with $n_{12} = 0$ sequential
therapy fails in $100\%$ of cases while simultaneous dual therapy succeeds in about $99.9\%$ of lesions of
the same size. A $10\%$ fitness cost per resistance mutation raised the cure probability of a $10^{11}$-cell
lesion from $47\%$ to $68\%$. The pivot, $n_{12}$, is essentially unmeasured for real drug pairs — and
Bozic and Nowak (2014) found a detectable lesion typically carries ten or more distinct resistant subclones.

### Schedules: the optimum sits on the constraint

Foo and Michor (2009, 2010) make the dose a schedule: a non-homogeneous birth–death process with on-phase
and off-phase rates, cycle length $K = T_\text{on} + T_\text{off}$, and the viability requirement
$\gamma = \alpha_\text{on}T_\text{on} + \alpha_\text{off}T_\text{off} < 0$ on the sensitive net growth rate.
Minimising the resistance probability over schedules that satisfy a clinically derived **toxicity
constraint**, they find numerically that the optimisers always lie on the constraint curve itself, that the
constraint's *convexity* decides whether high-dose pulses or continuous dosing win, and that minimising the
probability of resistance is not the same problem as maximising the time to detection of resistant cells.
These are numerical findings, not theorems: no Pontryagin-type characterisation of this constrained problem
exists as of 2026.

### Two clinical tests

Chmielecki et al. (2011) measured birth and death rates of isogenic EGFR-mutant and T790M-resistant lines at
several erlotinib concentrations, fed them to a two-type process ($\approx 3\%$ chance that a T790M cell
pre-exists in $3\times10^6$ cells at $u = 10^{-8}$, near $100\%$ above $10^{-6}$), and designed a low-dose
continuous plus high-dose pulsed schedule that selected T790M less strongly in vitro. Diaz et al. (2012) ran
the prediction in patients: using ctDNA-calibrated rates in the Iwasa–Nowak–Michor framework, they predicted
a mean 22 weeks (95% CI 18–25) to detectable KRAS mutant DNA under panitumumab and observed $23 \pm 5$
weeks, concluding that resistance is "a fait accompli".

## Cards

Q: Why does the probability of pre-existing resistance depend on the product $Mu$ rather than on $M$ and $u$ separately?
A: Resistant lineages are created by mutation events, roughly Poisson in the number of divisions: about $M$ divisions each mutating with probability $u$. Iwasa, Nowak and Michor (2006) show $P$ is a function of $Mu$, with $P \propto Mu$ for $Mu \ll 1$.
See: The two-type process and the product $Mu$

Q: Conditional on resistance being present ($Mu \ll 1$), how does the expected number of resistant cells scale with detection size $M$ for $\alpha < 1$, $\alpha = 1$, $\alpha > 1$?
A: Bounded (a finite limit) for $\alpha < 1$; $\propto \ln M$ for $\alpha = 1$; a power of $M$ for $\alpha > 1$. Remarkably it does not depend on $u$ at all.
See: The two-type process and the product $Mu$

Q: Why do two tumours of the same size carry different amounts of resistance?
A: Because resistance tracks the *number of cell divisions* in the tumour's history, not its size: a tumour with high apoptosis (large $d$) has divided far more often to reach size $M$.
See: The two-type process and the product $Mu$

Q: What PDE does the generating function $F(t,z)$ of a linear birth–death process satisfy, and how is it solved?
A: $\partial_t F = (bz^2 - (b+d)z + d)\partial_z F$ — first order, solved along characteristics $\dot z = -(bz^2-(b+d)z+d)$, whose fixed points are $z = 1$ and the extinction probability $z = d/b$.
See: Generating functions are a first-order PDE

Q: Where does a dosing schedule enter the generating-function description of a multitype birth–death process?
A: As time-dependent coefficients, which make the characteristic system non-autonomous: the schedule is a coefficient of a first-order PDE, not a forcing term.
See: Generating functions are a first-order PDE

Q: In Komarova and Wodarz (2005), why does cell turnover matter for multi-drug but barely for single-drug resistance?
A: For one drug resistance is generated almost entirely before therapy, and for large drug-induced death $H$ the failure probability becomes turnover-independent. With two or more mutations required, the long pre-treatment history dominates, so at fixed size a high-turnover tumour has had more divisions and fails more often.
See: How many drugs?

Q: Why is the no-cross-resistance case in Bozic et al. (2013) second order in the mutation rate, and what follows clinically?
A: With $n_{12} = 0$ a doubly resistant cell needs two independent mutation events, so the expected count scales like $M n_1 n_2 \mu^2$ instead of $M n_{12}\mu$. That gap is why simultaneous dual therapy can cure (about $99.9\%$ of lesions) while sequential therapy fails in $100\%$ of them.
See: Simultaneous beats sequential — under one hypothesis

Q: What single unmeasured quantity decides whether dual targeted therapy is curative in the Bozic et al. (2013) model?
A: $n_{12}$, the number of mutations conferring resistance to both drugs. With $n_{12} = 1$ dual therapy cures none of their 22 patients' large lesions; with $n_{12} = 0$ it cures almost all small ones.
See: Simultaneous beats sequential — under one hypothesis

Q: What did Foo and Michor (2009) find about where the optimal dosing schedule lies, and is it a theorem?
A: Numerically, the optimisers always sit on the toxicity constraint curve, and the constraint's convexity decides pulsed versus continuous. It is a numerical observation; no Pontryagin-type characterisation of the problem exists as of 2026.
See: Schedules: the optimum sits on the constraint

Q: What quantitative prediction of the branching-process framework did Diaz et al. (2012) confirm in patients?
A: The time from starting panitumumab to detectable KRAS-mutant ctDNA: predicted mean 22 weeks (95% CI 18–25), observed $23 \pm 5$ weeks.
See: Two clinical tests

## Quiz

Q: A trial enrols patients whose lesions are ten times smaller, while the drug's resistance mutation rate is ten times higher. In the Iwasa–Nowak–Michor model, the probability that resistance pre-exists…
- [x] is essentially unchanged, because it depends on the product $Mu$
- [ ] falls by a factor 10, because size dominates
- [ ] rises by a factor 10, because mutation rate dominates
- [ ] falls by a factor 100
E: $P$ is a function of $Mu$ and $P \propto Mu$ for $Mu \ll 1$. Only the conditional *number* of resistant cells distinguishes the two scenarios, and even that is independent of $u$.
See: The two-type process and the product $Mu$

Q: In Bozic et al. (2013), sequential administration of two non-cross-resistant drugs fails in $100\%$ of lesions while simultaneous administration cures about $99.9\%$. The mathematical reason is that…
- [x] sequential therapy lets single resistance be acquired one mutation at a time, while simultaneous therapy requires two independent events, an $O(\mu^2)$ event
- [ ] simultaneous therapy halves the effective mutation rate
- [ ] sequential therapy raises the per-division mutation rate
- [ ] alternating drugs is optimal only when the parameters are symmetric
E: Each drug given alone selects its own singly resistant subclone to large numbers, which then needs one further mutation. Given together, no single mutation suffices, so the expected count drops from $Mn_{12}\mu$ to $Mn_1n_2\mu^2$. The last option is the Goldie–Coldman alternating claim, which this paper refutes.
See: Simultaneous beats sequential — under one hypothesis

Q: The generating function of a multitype birth–death process with time-varying drug-induced death rates satisfies…
- [x] a first-order PDE in the dummy variables, solved by characteristics, with non-autonomous coefficients
- [ ] a second-order parabolic (Fokker–Planck) equation on the simplex
- [ ] a Hamilton–Jacobi–Bellman equation with the dose as control
- [ ] an integro-differential equation with a non-local selection term
E: The master equation becomes $\partial_t F = (bz^2-(b+d)z+d)\partial_z F$ (plus coupling terms for the other types); time-varying rates only make the characteristic ODEs non-autonomous. An HJB equation appears only once a cost functional is minimised over doses, which is a separate step.
See: Generating functions are a first-order PDE

Q: Komarova and Wodarz (2005) conclude that a drug whose resistance mutation rate is $u = 10^{-4}$ would need roughly how many partner drugs to keep the failure probability below $1\%$ up to $10^{13}$ cells?
- [x] about six drugs in total
- [ ] two drugs in total
- [ ] three drugs in total
- [ ] one drug suffices if the dose is high enough
E: Their table gives 2 drugs at $u = 10^{-9}$, 3 at $10^{-7}$–$10^{-8}$, 4 at $10^{-5}$–$10^{-6}$ and 6 at $10^{-4}$ — the basis for their argument that drugs with very high resistance-mutation rates should not be developed.
See: How many drugs?
