---
title: Invasion fronts and angiogenesis
tags: [cancer, invasion, angiogenesis, travelling-waves, chemotaxis, reaction-diffusion]
created: 2026-10-21
related: [glioma-reaction-diffusion-personalisation, greenspan-free-boundary-models, hele-shaw-limit-tumour-growth, anti-angiogenic-optimal-control, tomlinson-matrix-games, cancer-public-goods-games, spatial-games-in-tumours, space-and-trait-models, metastasis-models, cancer-somatic-evolution]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

Two spatial processes turn a benign lump into a cancer: the tumour front invades the host tissue, and the tumour recruits its own blood supply. Both have canonical PDE models from the 1990s, and both still lack a rigorous theory of the coupled problem.

### Acid-mediated invasion (Gatenby–Gawlinski 1996)

Gatenby and Gawlinski proposed that tumour acidity alone can explain invasion. Three fields: normal cells $N_1$, tumour cells $N_2$, excess H⁺ concentration $L$. In the form restated by later papers (paraphrased; the original equations were not checked against the paper),
$$
\partial_tN_1=r_1N_1\Big(1-\frac{N_1}{K_1}\Big)-d_1LN_1,\qquad
\partial_tN_2=r_2N_2\Big(1-\frac{N_2}{K_2}\Big)+\nabla\cdot\Big[D_2\Big(1-\frac{N_1}{K_1}\Big)\nabla N_2\Big],\qquad
\partial_tL=r_3N_2-d_3L+D_3\Delta L.
$$
Tumour cells produce acid; acid kills normal cells but not (in the original) tumour cells; and tumour motility is a **degenerate cross-diffusion** that vanishes where normal tissue is at carrying capacity. Acid diffuses much faster than cells, a singular perturbation parameter $\varepsilon\ll1$ in nondimensional form (later authors quote $\varepsilon=0.0063$ from the 1996 parameters). The results, from the abstract: a pH gradient extending from the tumour–host interface, confirmed by reanalysing existing data; a benign-to-malignant transition as parameters cross a threshold; front speeds from a marginal-stability (Fisher–KPP-type) estimate consistent with observed growth; and a previously unrecognised **hypocellular gap** at the interface, which they report seeing in vivo and in vitro. The gap's mechanism is visible in the equations: fast-diffusing acid kills normal cells ahead of the front, while tumour cells, whose motility is released only where $N_1$ has fallen, lag behind the damage. This paper is the mechanistic root of the acid-mediated strategy in the [evolutionary-game literature](#/note/tomlinson-matrix-games): acid production is a costly trait that pays through its effect on neighbours, a [public good](#/note/cancer-public-goods-games) of sorts.

### Travelling waves: slow, fast, bistable, fingering

Fasano, Herrero and Rodrigo (2009) analysed travelling waves of the system and found both slow and fast invasion fronts, with asymptotic formulae for the admissible profiles and bounds on the speeds. Carter, Doelman, van Heijster, Levy, Maini, Okey and Yeung (2025) replaced the logistic tumour growth by an Allee term (growth fails at low density), which makes the fronts **bistable** rather than pulled. By singular perturbation in the fast-acid limit they construct one-dimensional fronts in two regimes, with and without a cell-free gap, extend them to planar interfaces in two dimensions and derive a simple criterion for stability against long-wavelength transverse perturbations. A gap generically **destabilises** the planar front, producing fingers and varying invasion speeds: the signature Gatenby–Gawlinski predicted is also what makes the interface rough. Compare the Saffman–Taylor-type instabilities of the [free-boundary models](#/note/greenspan-free-boundary-models).

### Haptotaxis, proteases and nonlocal adhesion

Invasion also proceeds by matrix degradation. Chaplain and Lolas (2005) modelled the urokinase plasminogen activation (uPA) system as five coupled species (cells, extracellular matrix and the protease–inhibitor cascade) with chemotaxis towards the diffusible species and **haptotaxis**, directed motion up the gradient of the non-diffusing matrix, $-\nabla\cdot(\chi\,n\nabla v)$; the dynamics are rich and irregular. Gerisch and Chaplain (2008) replaced local taxis by a **nonlocal adhesion flux**, an integral of cell and matrix densities over a sensing radius, giving an integro-PDE whose analysis is still partial. Hillen and Painter (2009) is the user's guide to the underlying Keller–Segel variants. Anderson, Weaver, Cummings and Quaranta (2006) made the evolutionary link in a hybrid model: a harsh microenvironment (hypoxia, heterogeneous matrix) acts as a selective filter, so few aggressive clones dominate and the margin becomes fingered and invasive, whereas a mild environment lets less aggressive clones coexist behind a smooth boundary. Genotype determines invasiveness only jointly with environmental selection, the spatial counterpart of [somatic evolution](#/note/cancer-somatic-evolution) and [spatial games](#/note/spatial-games-in-tumours).

### Angiogenesis as a biased random walk (Anderson–Chaplain 1998)

A tumour above about a millimetre needs vessels and secretes tumour angiogenic factor (TAF) to get them. Anderson and Chaplain wrote a continuum model for endothelial-cell density $n$, TAF $c$ and the matrix protein fibronectin $f$ (paraphrased form)
$$
\partial_tn=D_n\Delta n-\nabla\cdot\big(\chi(c)\,n\nabla c\big)-\nabla\cdot(\rho_0\,n\nabla f),\qquad \partial_tf=\beta n-\gamma nf,\qquad \partial_tc=-\eta nc,
$$
with receptor-saturating chemotaxis $\chi(c)=\chi_0/(1+\alpha c)$ and haptotaxis towards fibronectin. The continuum simulations reproduce the migration of the cell front towards the tumour, but a density field has no vessels. The second step is what made the paper standard: discretise the PDE by finite differences and read the stencil coefficients as the **movement probabilities of a biased random walk** of individual sprout tips, then add branching and anastomosis (fusion of sprouts) as rules. The networks resemble in vivo capillary morphology. Chaplain, McDougall and Anderson (2006) add blood flow and remodelling inside the network; Macklin et al. (2009) couple such a network to a mixture solver for the tissue, so that flow delivers nutrient, nutrient drives growth, growth releases TAF, TAF drives the network. All computational: there is no existence theory for the coupled network–tissue problem. Phase-field angiogenesis (Travasso et al. 2011; review Vilanova, Colominas and Gomez 2017) is the continuum alternative.

### The ODE shortcut: Hahnfeldt 1999

For control purposes the vasculature is usually reduced to one number. Hahnfeldt, Panigrahy, Folkman and Hlatky (1999) write Gompertz growth against a dynamic carrying capacity $K$, the volume the current vasculature can support:
$$
\dot V=-\lambda_1V\ln\frac VK,\qquad \dot K=-\lambda_2K+bV-dKV^{2/3}-eKg(t),
$$
with stimulation $bV$, endogenous inhibition $dKV^{2/3}$ and an administered inhibitor $g$. The exponent $2/3$ comes from a diffusion–consumption calculation for a tumour-released inhibitor: its effect scales with the squared radius, i.e. $V^{2/3}$. Untreated tumours plateau where stimulation and inhibition balance. This is the base model of [anti-angiogenic optimal control](#/note/anti-angiogenic-optimal-control) and of the carrying-capacity-structured [metastasis models](#/note/metastasis-models).

### What is open

The coupled network–tissue angiogenesis problem has no rigorous theory, and the phase-field versions lack even existence results in the literature surveyed. For invasion, the in vivo strength of the Allee effect is unknown, although it decides between pulled and bistable fronts. The two-species [Hele-Shaw limits](#/note/hele-shaw-limit-tumour-growth) are the mechanical route to the same tumour–host front.

## Cards

Q: What makes tumour motility in the Gatenby–Gawlinski model degenerate, and what does it encode?
A: The diffusion coefficient $D_2(1-N_1/K_1)$ vanishes where normal tissue is at carrying capacity: intact tissue is an impenetrable barrier, and tumour cells can only move where acid has cleared it.
See: Acid-mediated invasion (Gatenby–Gawlinski 1996)

Q: Why does the Gatenby–Gawlinski model predict a hypocellular gap at the tumour–host interface?
A: Acid diffuses much faster than cells ($\varepsilon\ll1$) and kills normal cells ahead of the front, while tumour cells, whose motility is released only where normal tissue has fallen, lag behind the damage. The gap was reported in vivo and in vitro.
See: Acid-mediated invasion (Gatenby–Gawlinski 1996)

Q: In Carter et al. (2025), what does adding an Allee effect change about the invasion fronts, and what does a cell-free gap do in 2D?
A: Fronts become bistable instead of pulled, constructed by singular perturbation in the fast-acid limit. A gap generically destabilises the planar front against transverse perturbations, producing fingers and varying invasion speeds.
See: Travelling waves: slow, fast, bistable, fingering

Q: How did Anderson and Chaplain (1998) obtain their discrete angiogenesis model from the PDE?
A: They discretised the continuum chemotaxis–haptotaxis equation by finite differences and read the stencil coefficients as movement probabilities of a biased random walk for individual sprout tips, then added branching and anastomosis as rules.
See: Angiogenesis as a biased random walk (Anderson–Chaplain 1998)

Q: What is haptotaxis and how does it differ from chemotaxis in the invasion and angiogenesis models?
A: Directed motion up the gradient of a *non-diffusing*, matrix-bound substance (fibronectin, ECM): a flux $-\chi n\nabla f$ where $f$ has no diffusion term. Chemotaxis follows a diffusible signal (TAF, uPA).
See: Haptotaxis, proteases and nonlocal adhesion

Q: Why does the Hahnfeldt (1999) carrying-capacity equation contain $V^{2/3}$?
A: A diffusion–consumption calculation for a tumour-released inhibitor shows its effect on the vasculature scales with the squared radius, i.e. with $V^{2/3}$; stimulation scales with $V$, so inhibition eventually wins and growth plateaus.
See: The ODE shortcut: Hahnfeldt 1999

Q: In Anderson et al. (2006, *Cell*), what does a harsh microenvironment do to tumour morphology and clonal composition?
A: It acts as a selective filter: few aggressive clones dominate and the margin becomes fingered and invasive. A mild environment lets less aggressive clones persist behind a smooth boundary.
See: Haptotaxis, proteases and nonlocal adhesion

## Quiz

Q: In the original Gatenby–Gawlinski model, which cells does the excess acid kill?
- [x] Normal cells only; tumour cells are acid-resistant
- [ ] Both populations, at different rates
- [ ] Tumour cells only, which is why they must keep moving
- [ ] Neither; acid only blocks diffusion
E: $-d_1LN_1$ appears in the normal-cell equation only. Later variants (and the Allee-effect model of Carter et al.) add acid-induced tumour death.
See: Acid-mediated invasion (Gatenby–Gawlinski 1996)

Q: Carter et al. (2025) found that a cell-free gap at the invasion front
- [x] generically destabilises a planar front to transverse perturbations, giving fingers
- [ ] stabilises the planar front by decoupling tumour from host
- [ ] has no effect on stability, only on speed
- [ ] prevents the existence of travelling fronts altogether
E: The gap is Gatenby–Gawlinski's signature of invasion and is also what makes the interface rough. Fronts exist in both regimes, with and without the gap.
See: Travelling waves: slow, fast, bistable, fingering

Q: The Anderson–Chaplain discrete angiogenesis model is derived by
- [x] discretising the continuum PDE and interpreting stencil coefficients as random-walk probabilities
- [ ] a Gillespie simulation of the reaction terms
- [ ] a cellular automaton with rules chosen independently of the PDE
- [ ] sampling paths of a stochastic differential equation with the chemotactic drift
E: The point was to inherit the PDE's parameters, measured experimentally, while adding discrete events (branching, anastomosis) the continuum cannot express.
See: Angiogenesis as a biased random walk (Anderson–Chaplain 1998)
