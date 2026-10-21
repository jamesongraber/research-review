---
title: "Metastasis: size-structured transport equations and Markov chains"
tags: [cancer, metastasis, structured-populations, transport-equation, markov-chains]
created: 2026-10-21
related: [tumor-growth-laws, invasion-and-angiogenesis-models, branching-process-resistance, cancer-somatic-evolution, adaptive-therapy-trials-evidence, field-open-questions, digital-twins-oncology, selection-mutation-hamilton-jacobi]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

Most cancer deaths are from metastases, not the primary tumour, yet metastases are mostly invisible at diagnosis. The models in this note infer the invisible population from what can be measured: the primary's growth curve, the visible metastases later, or autopsy data on where tumours end up.

### Iwata's transport equation

Iwata, Kawasaki and Shigesada (2000) describe the metastatic population by a density $\rho(t,x)$ over tumour size $x$ (number of cells), with each metastasis growing deterministically at rate $g(x)$ and emitting new ones at rate $\beta(x)$:
$$
\partial_t\rho+\partial_x\big(g(x)\rho\big)=0\quad(x>1),\qquad
g(1)\,\rho(t,1)=\beta\big(x_p(t)\big)+\int_1^{b}\beta(x)\rho(t,x)\,dx,\qquad \rho(0,\cdot)=0.
$$
Here $x_p(t)$ is the primary's size and $b$ the carrying capacity. The boundary condition is the whole content: the flux of newborn metastases at the minimal size equals emission by the primary plus emission by every existing metastasis, which is **self-seeding** (metastases of metastases). Iwata took Gompertz growth $g(x)=ax\ln(b/x)$ and a power-law emission $\beta(x)=mx^\alpha$, with $\alpha$ interpreted as a fractal dimension of the vasculature feeding the tumour. With Gompertz growth the size distribution converges to a stable shape, monotone decreasing or U-shaped depending on the colonisation coefficient and $\alpha$, and the explicit solution matched liver-metastasis data from a patient. A useful identity: a metastasis born at size 1 reaches size $s$ after
$$
t(s)=-\frac1a\ln\Big(1-\frac{\ln s}{\ln b}\Big),
$$
so when only the primary seeds, the cumulative number of metastases larger than $s$ at time $t$ is $N(t-t(s))$ with $N(t)=\int_0^t\beta(x_p(\tau))\,d\tau$. Compare the [growth laws](#/note/tumor-growth-laws).

### A renewal equation: Euler–Lotka for metastases

This is a McKendrick–von Foerster equation with a renewal boundary condition, exactly the structure of age-structured population models and close to the trait-structured equations of [Dirac concentration](#/note/selection-mutation-hamilton-jacobi). Barbolosi, Benabdallah, Hubert and Verga (2009) prove well-posedness of the problem with the self-seeding term and build a numerical scheme; Benzekry (2010/11) adds a second structuring variable, a Hahnfeldt-type carrying capacity, so that each metastasis carries its own angiogenic state (see [Hahnfeldt's ODE](#/note/invasion-and-angiogenesis-models)).

The simplest case shows what self-seeding does. Take exponential growth $g(x)=ax$ and $\beta(x)=mx^\alpha$, no dormancy. A metastasis of age $\tau$ has size $e^{a\tau}$ and emits at rate $me^{a\alpha\tau}$. The birth rate $B(t)$ of new metastases satisfies the renewal equation $B(t)=\beta(x_p(t))+\int_0^tme^{a\alpha\tau}B(t-\tau)\,d\tau$, whose Malthusian exponent $\lambda$ solves the Euler–Lotka equation
$$
\int_0^\infty me^{a\alpha\tau}e^{-\lambda\tau}\,d\tau=\frac{m}{\lambda-a\alpha}=1\quad\Longrightarrow\quad \lambda=a\alpha+m .
$$
So the metastatic *population* grows at rate $a\alpha+m$, which exceeds the growth rate $a$ of any single tumour whenever $a\alpha+m>a$; with $\alpha=1$ (emission proportional to size) it always does. The total burden is dominated by the number of lesions, not by the largest one.

### Calibration: mice and patients

Hartung et al. (2014) validated the model on orthotopic breast xenografts tracked by 3D bioluminescence, fitting with nonlinear mixed effects. Their best metastatic model has two parameters, one for spreading and one for growth; the total metastatic burden alone carries information on both; the hypothesised link between primary size and emission rate is supported; and fast-growing peritoneal metastases could be described only by the PDE, not by an ODE for total burden, because the size distribution matters. Benzekry et al. (2016) fitted spontaneous metastasis after surgical removal of the primary in mice and found post-surgical survival strongly nonlinear in primary size, with one parameter of intrinsic metastatic potential capturing inter-individual variability. Bilous et al. (2019) fitted non-small-cell lung cancer brain metastases: a variant with a **dormancy** delay $\tau$ (a metastasis of size $s$ counted at $N(t-t(s)-\tau)$) fits best, with latency of about 4.4–5.7 months and metastatic onset estimated 14–19 months before diagnosis. In all of these $\alpha$ is usually fixed (typically to 1) because it is not identifiable jointly with $m$.

### Stochastic and network models

Haeno and Michor (2010) model metastasis as a branching process inside an expanding clonal population and compute the probability that metastasis has occurred by a given time, the expected number of sites and the effect of drug treatment and resection on survival (see [branching processes of resistance](#/note/branching-process-resistance) for the same machinery). Haeno et al. (2012, *Cell*) fitted it to 228 pancreatic-cancer patients, 101 with autopsy data: early growth is exponential, patients most likely already carry metastases at diagnosis, and therapies that reduce the growth rate *before* resection outperform upfront resection, since survival is set by the metastatic population. The predictions were validated in an independent database.

Newton et al. (2012) take a different view: a **Markov chain** on a network of 50 anatomical sites, with transition probabilities calibrated so that the chain's stationary distribution matches the metastatic site distribution in 3,827 autopsies of untreated lung-cancer patients. The 2013 sequel ("spreaders and sponges") argues that progression is multidirectional, quantifies self-seeding of the primary and reseeding among metastases, and concludes that the primary and the first metastatic site largely determine later pathways and timing. Scott, Basanta, Anderson and Gerlee (2013) ask how circulating cells return to the primary: by their model, **secondary seeding** (via small deposits in the lung capillary bed that then shed cells) is more likely than direct return by several orders of magnitude.

### What is open

The Iwata model has no space: metastases are placed nowhere. A spatial version, where a Markov mechanism à la Newton places lesions and each lesion then follows a local growth PDE, coupled to one systemic control and one aggregate biomarker, has no analysis. It matters for [adaptive therapy](#/note/adaptive-therapy-trials-evidence): West et al. (2023, question 10, citing Gallaher et al. 2022) note that burden spread over many lesions behaves differently from the same burden in few, while models treat burden as one scalar. See the [open questions](#/note/field-open-questions).

## Cards

Q: Write Iwata's equation for the size density $\rho(t,x)$ of metastases and its boundary condition.
A: $\partial_t\rho+\partial_x(g(x)\rho)=0$ for $x>1$, with $g(1)\rho(t,1)=\beta(x_p(t))+\int_1^b\beta(x)\rho(t,x)\,dx$ and $\rho(0,\cdot)=0$; $g$ is the growth law (Gompertz), $\beta(x)=mx^\alpha$ the emission rate, $x_p$ the primary's size.
See: Iwata's transport equation

Q: Why is the Iwata boundary condition called self-seeding, and what equation class does it make the model?
A: The integral term counts metastases emitted by existing metastases, not just by the primary. It turns the transport equation into a McKendrick–von Foerster / renewal problem; well-posedness is due to Barbolosi et al. (2009).
See: A renewal equation: Euler–Lotka for metastases

Q: With exponential growth $g(x)=ax$ and emission $\beta(x)=mx^\alpha$, at what rate does the metastatic population grow, and why?
A: At $\lambda=a\alpha+m$: the Euler–Lotka condition $\int_0^\infty me^{a\alpha\tau}e^{-\lambda\tau}d\tau=1$ gives $m/(\lambda-a\alpha)=1$. For $\alpha=1$ the population always outgrows any single lesion.
See: A renewal equation: Euler–Lotka for metastases

Q: Why did Hartung et al. (2014) need the size-structured PDE rather than an ODE for total metastatic burden?
A: Fast-growing peritoneal metastases could be described only by the PDE: the size distribution matters for the burden curve. Their best model had just two parameters, spreading and growth.
See: Calibration: mice and patients

Q: What did Haeno et al. (2012) conclude about pancreatic cancer treatment from 228 patients?
A: Early growth is exponential, metastases are most likely present at diagnosis, and reducing the growth rate before resection beats upfront resection, because survival is set by the metastatic population.
See: Stochastic and network models

Q: In Newton et al.'s Markov-chain model of lung cancer, what is calibrated and from what data?
A: Transition probabilities on a 50-site network, chosen so the chain's stationary distribution matches the metastatic site distribution in 3,827 autopsies of untreated patients; the variance over admissible transition matrices is characterised too.
See: Stochastic and network models

Q: Which route of tumour self-seeding did Scott et al. (2013) find more likely?
A: Secondary seeding: cells first form small deposits elsewhere (the lung capillary bed) which then shed cells back to the primary. It is more likely than direct return by several orders of magnitude.
See: Stochastic and network models

## Quiz

Q: In the Iwata model, the flux of newborn metastases at the smallest size equals
- [x] emission by the primary plus the integral of emission over all existing metastases
- [ ] emission by the primary only
- [ ] zero, since metastases are born at the primary's size
- [ ] the derivative $\partial_x\rho$ at the smallest size
E: The second option is the primary-only variant, which has a closed-form solution by characteristics; the self-seeding integral is what requires the well-posedness theory of Barbolosi et al. (2009).
See: Iwata's transport equation

Q: With Gompertz growth, the Iwata size distribution of metastases
- [x] converges to a stable shape, monotone or U-shaped depending on parameters
- [ ] spreads indefinitely in size
- [ ] concentrates at the carrying capacity for all parameters
- [ ] becomes uniform on $[1,b]$
E: Iwata et al. (2000): the explicit solution tends to an asymptotic stable distribution, which matched liver-metastasis data; the U shape has mass at both the newborn and the saturated end.
See: Iwata's transport equation

Q: For NSCLC brain metastases, Bilous et al. (2019) found the best-fitting variant was
- [x] the one with a dormancy delay before a metastasis starts growing
- [ ] the one with secondary dissemination from metastases
- [ ] the two-dimensional model with an angiogenic carrying capacity
- [ ] the model with emission proportional to the primary's surface area
E: Latency was about 4.4–5.7 months and metastatic onset was estimated 14–19 months before diagnosis.
See: Calibration: mice and patients
