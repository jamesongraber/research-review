---
title: "Immune evasion as a game, and CAR-T models"
tags: [cancer, evolutionary-games, car-t, stochastic-extinction, immunotherapy]
created: 2026-10-21
related: [kuznetsov-tumour-immune-model, immunotherapy-optimal-control, stackelberg-evolutionary-games, cancer-public-goods-games, branching-process-resistance, replicator-dynamics, evolutionarily-stable-strategies, moran-fixation-probability, cml-dynamics-treatment-free-remission]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

Two things are missing from the [planar tumour–immune models](#/note/kuznetsov-tumour-immune-model): the tumour does not evolve, and nothing is stochastic. This note collects the few papers that add evolution (immune evasion as a strategy) and the CAR-T literature, where the stochastic side is unavoidable because cure means extinction of a small residual population.

### Evasion as a two-phenotype game

Bayer, Brown and Staňková (2018) model two cancer phenotypes facing an immune population: **selfish** cells that hide individually (crypticity, a private good) and **cooperative** cells that secrete immunosuppressive factors benefiting every tumour cell (a public good, as in the [public-goods games](#/note/cancer-public-goods-games)). Phenotype frequencies evolve with tumour size and immune level. The result from the abstract: only monomorphic tumours, made of a single cell type, can be stable in both size and composition; selfish-cell tumours are less aggressive; and a treatment that targets crypticity shifts the game toward the immunosuppressive strategy and can increase tumour growth. This is the only verified paper coupling replicator-type phenotype dynamics to an immune predator, and the natural input to a [Stackelberg](#/note/stackelberg-evolutionary-games) formulation with the immune system or the physician as leader, which does not yet exist.

### Shielding and immunoediting as competition

Kareva (2015) used an agent-based model in which non-stem cancer cells shield stem cells by competing with immune cells for resources, and suggested metronomic chemotherapy as a counter. Kareva and Berezovskaya (2015) showed that a predator–prey model with a shared, competed-for resource reproduces the three phases of immunoediting (elimination, equilibrium, escape) without any new ingredient, which is the constructive half of the Kareva et al. (2021) critique that immune cells compete with tumour cells rather than eat them.

### Stochastic escape

Baar, Coquille, Mayer, Hölzel, Rogava, Tüting and Bovier (2016) built a continuous-time Markov model of melanoma T-cell therapy with reversible phenotype switching (differentiated and dedifferentiated states), rare mutation and two forms of competition. As the carrying-capacity scale $K\to\infty$ the rescaled process converges to a system of quadratic ODEs that is **not** of Lotka–Volterra type because of the switching terms; rare mutations are invisible in the limit, and extinction happens on two time scales, during transient minima and by fluctuation around an equilibrium. The authors flag metastability as the open mathematical problem: the deterministic limit "fails" exactly when a subpopulation is small. George and Levine (2018) describe immune evasion as a stochastic birth process in which slowly growing threats sneak through growth-limited detection, with an escape probability quoted in the survey as $p_e(m;m_0)=p_b\,(m_0/m)^{k/r}$ (symbols as in the paper; not re-derived here, so treat as unverified).

### CAR-T: competition, an expansion formula, and cure as an extinction event

Kimmel, Locke and Altrock (2021) model normal T cells $N$, CAR-T cells $C$ and tumour $B$ after lymphodepletion with Gompertz competition for a shared T-cell niche:
$$
N' = -r_N N\ln\frac{N+C}{K_N},\qquad C' = -r_C(T)\,C\ln\frac{N+C}{K_C},\qquad B' = r_B B - \gamma_B\frac{BC}{k_B+C},
$$
with $T=N+C$ and an antigen-driven boost $r_C(T)=\rho_C + b\,(T-K_N)^2/\big(aT^2+(T-K_N)^2\big)$. Fitted to population data ($K_N=2.5\times10^{11}$, $K_C=7\times10^{10}$, $\gamma_B=1.15$/day, $k_B=2\times10^9$), the Gompertz form was selected over logistic. Tumour eradication is deterministically unstable in this model, so cure is defined as a stochastic event: below about 100 cells a stochastic simulation decides extinction. Cures happen early (days 20 to 80, narrowly distributed) and progressions late (days 200 to 500, widely); and $k_B$ is non-identifiable, correlated $0.94$ with $r_B$ and $-0.96$ with $\gamma_B$: kill saturation and tumour growth rate cannot be separated from population curves.

León-Triana et al. (2021) reduce B-cell leukaemia therapy to CAR-T $C$, leukaemic cells $L$ and healthy B cells $B$:
$$
C' = \rho_C (L+B)\,C - C/\tau_C,\qquad L' = \rho_L L - \alpha LC,\qquad B' = -\alpha BC - B/\tau_B .
$$
Write $N=L+B$ and neglect leukaemic growth and B-cell death during the two to four weeks of expansion, so $N'=-\alpha NC$. Then $dC/dN = -k + 1/(\alpha\tau_C N)$ with $k=\rho_C/\alpha$, the peak occurs where $C'=0$, that is at $N^*=1/(\rho_C\tau_C)$, and integrating gives the paper's formula
$$
C_{\max}\simeq C_0 + k\Big(L_0+B_0-\frac{1}{\rho_C\tau_C}\Big) .
$$
(A numerical check with the paper's parameters gives agreement within about 1%.) The peak is set by the antigen load, not by the dose: $C_0$ is negligible, and a tenfold larger dose changed the simulated peak by about 6%. Relapse is then a predator–prey competition between residual CAR-T and regrowing leukaemia.

Owens and Bozic (2021) add the preconditioning chemotherapy $C(t)$ with saturating kill $K_T(1-e^{-C})$ and the de Pillis ratio-dependent lysis law. In nondimensional form the tumour-free state is stable iff $d>1$, the high-tumour state is stable under a Routh–Hurwitz condition, and a saddle separatrix divides them. Chemotherapy alone always progresses; the schedule, not the area under the curve, decides: spreading the same dose over five days instead of three changes the outcome, and a rest period of six days or more before infusion fails in over half of simulated patients, twelve days in about 85%, more than sixteen in all.

### Checkpoint inhibitors

Nikolopoulou et al. (2018) write an ODE with anti-PD-1 and find that the inhibitor alone need not eradicate the tumour; Lai and Friedman (2017) build a free-boundary PDE model with dendritic cells, CD4/CD8 T cells, cytokines and anti-PD-1 to map synergy with a vaccine. On the data side, Butner et al. (2020) fitted a low-dimensional mechanistic ODE to CT tumour volumes of 245 patients on checkpoint inhibitors and report 88% accuracy at the first restaging, separating pseudo-progression from progression (abstract-level); El Wajeh et al. (2022) note that no classical tumour–immune model had been validated on a large human cohort before.

## Cards

Q: What is the main stability result of Bayer, Brown and Staňková's (2018) two-phenotype immune-evasion game?
A: Only monomorphic tumours (all selfish/cryptic or all cooperative/immunosuppressive) can be stable in both size and composition; targeting crypticity can shift the game toward immunosuppression and faster growth.
See: Evasion as a two-phenotype game

Q: Why is the large-$K$ limit of Baar et al.'s (2016) stochastic immunotherapy model not a Lotka–Volterra system?
A: Reversible phenotype switching adds linear exchange terms between the differentiated and dedifferentiated states, so the limiting quadratic ODE is not of Lotka–Volterra form.
See: Stochastic escape

Q: Why do Kimmel, Locke and Altrock (2021) define cure as a stochastic event?
A: In their model tumour eradication is deterministically unstable, so the ODE never reaches zero; below about 100 cells a stochastic simulation decides whether the residual population goes extinct.
See: CAR-T: competition, an expansion formula, and cure as an extinction event

Q: Which non-identifiability did Kimmel et al. (2021) find in CAR-T population data?
A: The kill-saturation constant $k_B$ is correlated $0.94$ with the tumour growth rate $r_B$ and $-0.96$ with the kill rate $\gamma_B$, so saturation of killing and tumour growth cannot be separated.
See: CAR-T: competition, an expansion formula, and cure as an extinction event

Q: In León-Triana et al.'s (2021) reduced CAR-T model, what sets the peak CAR-T expansion, and why does the injected dose barely matter?
A: $C_{\max}\simeq C_0 + k\,(L_0+B_0-1/(\rho_C\tau_C))$ with $k=\rho_C/\alpha$: the peak is set by the antigen load $L_0+B_0$, and $C_0$ is negligible against it.
See: CAR-T: competition, an expansion formula, and cure as an extinction event

Q: How does the peak of CAR-T expansion follow from $C'=\rho_C NC - C/\tau_C$ and $N'=-\alpha NC$?
A: Divide to get $dC/dN=-\rho_C/\alpha+1/(\alpha\tau_C N)$; the peak is where $C'=0$, at $N^*=1/(\rho_C\tau_C)$, and integrating from $N_0$ to $N^*$ gives $C_{\max}$.
See: CAR-T: competition, an expansion formula, and cure as an extinction event

Q: What did Owens and Bozic (2021) find about preconditioning chemotherapy before CAR-T infusion?
A: The schedule, not the total dose, decides the outcome: the same dose over five days instead of three changes the result, and rest periods of six or more days before infusion fail in more than half of simulated patients.
See: CAR-T: competition, an expansion formula, and cure as an extinction event

## Quiz

Q: Kareva and Berezovskaya (2015) reproduce elimination, equilibrium and escape (immunoediting) by
- [x] adding a shared resource for which tumour and immune cells compete to a predator–prey model
- [ ] adding a time delay to the immune recruitment term
- [ ] letting the tumour evolve a cryptic phenotype
- [ ] replacing mass-action killing by a ratio-dependent lysis law
E: The point is that competition for a resource, not a new immune mechanism, suffices; this is the constructive half of the "immune cells do not eat" critique.
See: Shielding and immunoediting as competition

Q: In Kimmel et al. (2021), compared with progressions, cures occur
- [x] early (days 20 to 80) and in a narrow time window
- [ ] late (days 200 to 500) and in a wide window
- [ ] at the same time as progressions, distinguished only by dose
- [ ] only when the tumour-free state is deterministically stable
E: Extinction happens when CAR-T cells are at their peak and the tumour at its minimum; progressions come from slow regrowth and are widely spread in time.
See: CAR-T: competition, an expansion formula, and cure as an extinction event

Q: A clinician proposes a tenfold larger CAR-T dose to raise the peak expansion. According to León-Triana et al. (2021), the simulated peak changes by about
- [x] 6%, since the peak is set by the antigen load rather than the dose
- [ ] a factor of 10, since the dynamics are linear in $C$
- [ ] a factor of $\sqrt{10}$, from the square-root scaling of the peak
- [ ] 50%, through the increased killing of B cells
E: $C_{\max}\simeq C_0+k(L_0+B_0-1/(\rho_C\tau_C))$ and $C_0$ is negligible; the dose mainly shifts the time to peak.
See: CAR-T: competition, an expansion formula, and cure as an extinction event
