---
title: "Tumour growth laws: Gompertz, logistic, power laws"
tags: [cancer, gompertz, growth-laws, model-selection, identifiability]
created: 2026-10-21
related: [kill-laws-and-scheduling-principles, chemotherapy-optimal-control-origins, anti-angiogenic-optimal-control, greenspan-free-boundary-models, adaptive-therapy-control, mathematical-oncology-landscape, digital-twins-oncology]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

Chapter 1 of the tour. Every scheduling principle and optimal-control problem in the next two notes
([kill laws](#/note/kill-laws-and-scheduling-principles), [first-era optimal control](#/note/chemotherapy-optimal-control-origins))
sits on a one-dimensional growth law $\dot V = f(V)$. This note is about which $f$, why, and how much it matters.

### The Gompertz law

Gompertz (1825) proposed a hazard growing geometrically with age, for actuarial tables. Laird (1964) fitted the resulting curve to
serial volumes of about nineteen rodent tumour lines and described growth as "an exponential process limited by an
exponential retardation". In the parametrisation of Vaghi et al. (2020),
$$
\frac{dV}{dt} = \big(\alpha - \beta \ln(V/V_0)\big)V, \qquad V(t) = V_0 \exp\!\Big(\frac{\alpha}{\beta}\big(1 - e^{-\beta t}\big)\Big), \qquad K = V_0 e^{\alpha/\beta}.
$$
Here $\alpha$ is the initial specific growth rate, $\beta$ the rate at which it decays, and $K$ the carrying capacity. Equivalent forms:
$\frac{d}{dt}\ln V = \alpha e^{-\beta t}$ (the per-capita rate decays exponentially in *time*) and $\dot V = \beta V \ln(K/V)$ (it decays
logarithmically in *size*). The absolute rate $\beta V\ln(K/V)$ peaks at $V = K/e$, but the per-capita rate is largest for the smallest tumours.
That property is the source of the Norton–Simon hypothesis and of the "dose at the end" artefacts in the control literature.
Gompertz is also the $\nu \to 0$ limit of the generalised logistic law $\dot V = \frac{a}{\nu} V\big(1 - (V/K)^\nu\big)$, since
$\big(1-(V/K)^\nu\big)/\nu \to \ln(K/V)$.

### Worked example: doubling times

Benzekry et al. (2014) fitted Lewis lung carcinoma volumes with $\alpha = 0.743$/day and $\beta = 0.0792$/day. Then
$K/V_0 = e^{9.38} \approx 1.2 \times 10^4$, and the instantaneous doubling time $\ln 2 / (\alpha - \beta\ln(V/V_0))$ is

| $V/V_0$ | 1 | 100 | 1000 | $10^4$ |
|---|---|---|---|---|
| per-capita rate (/day) | 0.743 | 0.378 | 0.196 | 0.014 |
| doubling time (days) | 0.93 | 1.83 | 3.5 | 51 |

(The exact time to double from $1000 V_0$ is 4.2 days, since the rate keeps falling during the doubling.) The tumour reaches $K/2$ at
$t = \beta^{-1}\ln\big(\alpha/(\beta\ln 2)\big) \approx 33$ days. A four-fold change over three decades of volume is
why a single "doubling time" (Collins et al. 1956) is only a local descriptor.

### The rivals

Exponential $\dot V = aV$; logistic; generalised logistic; von Bertalanffy (1957) $\dot V = aV^{2/3} - bV$ (anabolism through a surface,
catabolism through a volume; equilibrium $(a/b)^3$); power law $\dot V = aV^{\gamma}$; exponential-linear (exponential phase
switching to constant $\dot V$); and the dynamic carrying capacity of Hahnfeldt et al. (1999), where $K$ obeys its own ODE driven by
angiogenesis (see [anti-angiogenic control](#/note/anti-angiogenic-optimal-control)). For human breast cancer Norton (1988) fitted a single
Gompertz with intrinsic kinetic heterogeneity, Hart, Shochat and Agur (1998) rejected exponential, logistic and Gompertz in favour of a power
law from screening data, and Talkington and Durrett (2015) found Norton's data inconsistent with his analysis. The human question is open.

### Three mechanisms, no theorem

Three mechanisms yield Gompertz-like curves: Burton (1966, seen only through citing works), diffusion-limited nutrient with a
necrotic core, the ancestor of the [Greenspan free-boundary models](#/note/greenspan-free-boundary-models); Kendal (1985), a heterogeneous
mixture of exponentially growing subclones; Gyllenberg and Webb (1989), a proliferating/quiescent two-compartment model whose
size-dependent transition gives Gompertz and a declining growth fraction. There is no classification theorem saying under which
hypotheses a structured or spatial model has Gompertz, rather than power-law or generalised-logistic, aggregate dynamics (Gerlee's
"model muddle", 2013).

### What systematic comparisons found

- Benzekry et al. (2014), nine models on two murine datasets: Gompertz and power law ($\gamma = 0.788$ for lung) fit best *and* are
  identifiable; the three-parameter models (generalised logistic, von Bertalanffy, dynamic carrying capacity) are poorly identifiable without
  saturation data; for the breast line the exponential-linear model was the best *predictor* (83.8% success from five points, against 63.3%).
- Murphy, Jaafari and Dobrovolny (2016), seven laws on one xenograft series: doubling times predicted from the first seven points span about 2 to
  26 days (12-fold) and the chemotherapy needed for suppression differs about 6-fold; the best-fitting model is not the best predictor.
- Vaghi et al. (2020), mixed-effects fits: $\alpha$ and $\beta$ are almost collinear ($r = 0.981$), so the "reduced Gompertz"
  $\dot V = \beta\big(k - \ln(V/V_0)\big)V$ with a population-wide $k = \alpha/\beta$ and one individual parameter predicts a tumour's age
  with 12.2% error, against 78–79% for individual fits. They stress that $k$ is not universal (carrying capacities 2600 and 12 300 mm³ for two lines).
- Zhou, Mao and Guo (2024), more than 30 000 mice: an exponential-quadratic law fits 87% of studies, von Bertalanffy 82%, Gompertz 80%.
- González Vázquez and Villaverde (2025): structural identifiability and observability of twenty published ODE tumour models with therapy,
  a property of model plus measured outputs, before any data.

### Superlinear growth and blow-up

Pérez-García et al. (2020) measured metabolic scaling on PET images of about 447 patients: total lesion activity $\propto$ volume$^{\beta}$
with $\beta$ clustering near $5/4$ (for instance $1.307 \pm 0.069$ for breast). The implied law $\dot V = \alpha V^{\beta}$, $\beta > 1$,
has closed form $V(t)^{1-\beta} = V_0^{1-\beta} - \alpha(\beta - 1)(t - t_0)$ and blows up at
$$
t_{\rm crit} = t_0 + \frac{V_0^{1-\beta}}{\alpha(\beta - 1)} ,
$$
with doubling time shrinking like $V^{1-\beta}$ (a factor $1000^{1/4} \approx 5.6$ over three decades for $\beta = 5/4$).
Longitudinal untreated fits gave $\beta \approx 1.36$–$1.69$ for several tumour types and $0.5$ for benign hamartomas; the authors
derive $\beta = 2 - 2/d$ from a nonlocal Fisher–KPP model and note that real tumours cannot follow the law to the singularity. This is in
tension with the saturating tradition, and no chemotherapy control problem has used it (the value function would have a blow-up barrier).

### Why it matters downstream

The Gompertz retardation is what makes dose density appear in the Norton–Simon argument, makes the Martin benchmark hold its dose
to the end, and makes "keeping the burden large" help against resistant cells in Martin et al. (1992), the ancestor of
[adaptive therapy](#/note/adaptive-therapy-control). Murphy's 6-fold spread is the caveat to attach to each of these.

## Cards

Q: Write the Gompertz growth law as an ODE and give its carrying capacity in terms of $\alpha$, $\beta$, $V_0$.
A: $\dot V = (\alpha - \beta\ln(V/V_0))V$, equivalently $\dot V = \beta V\ln(K/V)$ with $K = V_0 e^{\alpha/\beta}$. Closed form $V(t) = V_0\exp\big(\frac{\alpha}{\beta}(1 - e^{-\beta t})\big)$.
See: The Gompertz law

Q: Under Gompertz growth, which tumours have the largest per-capita growth rate, and where is the absolute growth rate largest?
A: Per-capita rate $\beta\ln(K/V)$ is largest for the smallest tumours; the absolute rate $\beta V\ln(K/V)$ peaks at $V = K/e$. The first fact drives the Norton–Simon hypothesis and the end-loaded control schedules.
See: The Gompertz law

Q: How is the Gompertz law a limit of the generalised logistic law $\dot V = \frac{a}{\nu}V(1 - (V/K)^{\nu})$?
A: As $\nu \to 0$, $(1 - (V/K)^\nu)/\nu \to \ln(K/V)$, so the rate tends to $aV\ln(K/V)$, which is Gompertz with $\beta = a$.
See: The Gompertz law

Q: With Benzekry's lung parameters $\alpha = 0.743$/day, $\beta = 0.0792$/day, roughly how does the instantaneous doubling time change between $V_0$ and $1000V_0$?
A: From $\ln 2/0.743 \approx 0.93$ days to $\ln 2/(0.743 - 0.0792\ln 1000) \approx 3.5$ days: about four-fold over three decades of volume.
See: Worked example: doubling times

Q: Why did Benzekry et al. (2014) rank three-parameter laws (generalised logistic, von Bertalanffy, dynamic carrying capacity) below Gompertz and the power law?
A: Not for fit quality but for identifiability: without saturation or anti-angiogenic data their extra parameter is poorly determined, while the two-parameter Gompertz and power law are identifiable.
See: What systematic comparisons found

Q: What is the cautionary lesson of Murphy, Jaafari and Dobrovolny (2016)?
A: Seven growth laws fitted to the same early xenograft data predict doubling times spanning about 12-fold and chemotherapy needed differing about 6-fold; the best-fitting model is not the best predictor.
See: What systematic comparisons found

Q: What is the "reduced Gompertz" model of Vaghi et al. (2020) and why was it introduced?
A: $\dot V = \beta(k - \ln(V/V_0))V$ with $k = \alpha/\beta$ shared across a population and only $\beta$ individual, because fitted $\alpha$ and $\beta$ were almost collinear ($r = 0.981$). It cut the error in predicting tumour age from 78% to 12.2%.
See: What systematic comparisons found

Q: Why does $\dot V = \alpha V^{\beta}$ with $\beta > 1$ blow up, and when?
A: $V^{1-\beta}$ decreases linearly at rate $\alpha(\beta - 1)$ and hits zero at $t_{\rm crit} = t_0 + V_0^{1-\beta}/(\alpha(\beta - 1))$. Pérez-García et al. (2020) report $\beta \approx 5/4$ from metabolic scaling in human PET data.
See: Superlinear growth and blow-up

## Quiz

Q: For $\dot V = (\alpha - \beta\ln(V/V_0))V$, the carrying capacity is…
- [x] $V_0 e^{\alpha/\beta}$
- [ ] $V_0 e^{\beta/\alpha}$
- [ ] $\alpha/\beta$
- [ ] $V_0\alpha/\beta$
E: Set $\dot V = 0$: $\ln(K/V_0) = \alpha/\beta$. The ratio $\alpha/\beta$ itself is $\ln(K/V_0)$, the reduced-Gompertz constant $k$.
See: The Gompertz law

Q: Under Gompertz growth, the tumour whose *absolute* growth rate $\dot V$ is largest has size…
- [x] $K/e$
- [ ] as small as possible
- [ ] $K/2$
- [ ] $K$
E: $\frac{d}{dV}\big(\beta V\ln(K/V)\big) = \beta(\ln(K/V) - 1) = 0$ at $V = K/e$. The *per-capita* rate is largest for the smallest tumours; $K/2$ is where the logistic law peaks.
See: The Gompertz law

Q: In Benzekry et al. (2014), the best *predictor* of future growth for the breast-cancer line was…
- [x] the exponential-linear model
- [ ] the Gompertz model
- [ ] the power law
- [ ] the logistic model
E: Exponential-linear forecast correctly from five points in 83.8% of cases against 63.3% for the runner-up, even though Gompertz and the power law gave the best fits and identifiability on the lung data.
See: What systematic comparisons found

Q: For $\dot V = \alpha V^{\beta}$ with $\beta > 1$, the time from $V_0$ to blow-up is…
- [x] $V_0^{1-\beta}/(\alpha(\beta - 1))$
- [ ] $V_0^{\beta - 1}/(\alpha(\beta - 1))$
- [ ] $\ln V_0/(\alpha(\beta - 1))$
- [ ] infinite, since $V^{\beta}$ is finite for finite $V$
E: $\frac{d}{dt}V^{1-\beta} = -\alpha(\beta - 1)$, so $V^{1-\beta}$ reaches zero after $V_0^{1-\beta}/(\alpha(\beta - 1))$. Larger tumours blow up sooner, with doubling time $\propto V^{1-\beta}$.
See: Superlinear growth and blow-up
