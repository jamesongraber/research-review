---
title: "Mathematical oncology: four research threads"
tags: [cancer, research-landscape, stackelberg-games, mean-field-games, optimal-transport]
created: 2026-08-25
related: [selection-mutation-hamilton-jacobi, adaptive-therapy-control, cancer-somatic-evolution, potential-games, hj-wasserstein-applications, adaptive-therapy-trials-evidence, field-open-questions, mean-field-games-in-oncology, control-of-evolving-populations]
source: "Claude conversation: Mathematical modeling of cancer evolution (2026-08)"
---

## Article

A map of the mathematics of cancer evolution, sorted by tool, as surveyed in the chat in August 2026. The four threads rarely cite each other. Citations below were recalled by Claude and are unverified unless marked otherwise.

### Thread A: constrained Hamilton–Jacobi equations

A population structured by a continuous trait, under selection and rare mutation, concentrates into Dirac masses. Their positions are governed by a Hamilton–Jacobi equation with a zero-maximum constraint, analyzed with viscosity solutions. The cancer version uses a resistance trait with drug response. This is the thread closest to PDE work. Details are in [Dirac concentration](#/note/selection-mutation-hamilton-jacobi).

### Thread B: Stackelberg evolutionary games

This is the biological and clinical mainstream (Gatenby, Brown, Staňková and coauthors). The physician is the **leader** and the tumor is the **follower**. The order is forced: resistance cannot evolve to a therapy not yet applied, so the physician commits first and the cells adapt to conditions already imposed.

The follower is **evolutionary, not rational**. In a classical Stackelberg game the follower best-responds by optimizing. Here the cell population settles into an evolutionarily stable or eco-evolutionary equilibrium that maximizes proliferation and survival given the treatment. The leader chooses the dose to optimize a patient-level objective, such as quality of life or burden, against that response.

Analytically this thread is mostly finite-dimensional. The follower side is a replicator or Lotka–Volterra ODE, or a static response, and rigorous PDE work is thin. A related empirical line *measures* the game. Kaznatcheev, Peacock, Basanta, Marusyk and Scott (2019) co-cultured lung-cancer cell types at varying initial proportions and fitted growth rates as functions of frequency, which gives an empirical payoff matrix. The [adaptive-therapy control problem](#/note/adaptive-therapy-control) is the dynamic version of the leader's problem.

### Thread C: mean field games in oncology

As of the chat, this thread is almost empty: only exploratory McKean–Vlasov control preprints, and no Lasry–Lions HJB/Fokker–Planck system for tumors.

### Thread D: mechanical tumor growth and gradient flows

This is a separate PDE tradition, about tissue mechanics rather than competing clones. A typical model:
$$
\partial_t n - \operatorname{div}(n\nabla p) = n\,G(p), \qquad p = n^\gamma ,
$$
where $n$ is the cell density, $p$ the pressure, and $G$ a growth rate that decreases in $p$ (cells stop dividing at high pressure). As $\gamma \to \infty$ (the **incompressible limit**; Perthame–Quirós–Vázquez, 2014), the limit is a **Hele-Shaw** free-boundary problem: $n = 1$ where $p > 0$, and $-\Delta p = G(p)$ on $\{p > 0\}$.

With $G = 0$ the equation is $\partial_t n = \operatorname{div}\big(n\nabla \tfrac{\delta E}{\delta n}\big)$ for $E(n) = \int \frac{n^{\gamma+1}}{\gamma+1}$, the Wasserstein ($W_2$) gradient flow of $E$ (Otto calculus, JKO scheme). As $\gamma \to \infty$, $E$ tends to the indicator of $\{n \le 1\}$, the same hard-congestion constraint as in crowd-motion models. With growth, mass is not conserved, so plain $W_2$ is not enough: one needs unbalanced transport (e.g. Wasserstein–Fisher–Rao) or a splitting scheme. There is essentially no game theory in this thread.

### The proposed niche

Mean-field Stackelberg and major–minor MFG theory (one major player plus a continuum of minor players, with coupled HJB and Fokker–Planck equations) is well developed outside oncology, for example in finance and epidemic control. The fusion proposed in the chat:

- Take Thread B's physician–tumor leader–follower structure.
- Model the follower continuum with Thread A's selection–mutation dynamics instead of a replicator ODE.
- Give the physician a value function whose argument is the tumor's **trait distribution**. That is an HJ equation on $\mathcal P(\mathbb R^d)$ (Wasserstein space), coupled to a constrained HJ equation for the trait concentration.

This combines viscosity solutions, HJ equations on Wasserstein space and MFG, and it maps onto adaptive dosing. It was a research direction suggested in August 2026, not an established result.

## Cards

Q: What is a **Stackelberg evolutionary game** in oncology, and why is the physician the leader?
A: The physician chooses the treatment to optimize a patient-level objective, and the cancer cells respond. The physician leads because resistance cannot evolve to a therapy not yet applied, so the cells can only adapt to conditions already imposed.
See: Thread B: Stackelberg evolutionary games

Q: How does the follower in a Stackelberg *evolutionary* game differ from a classical Stackelberg follower?
A: It is not a rational optimizer. The cell population reaches an evolutionarily stable or eco-evolutionary equilibrium given the treatment, rather than computing a best response.
See: Thread B: Stackelberg evolutionary games

Q: In current oncology Stackelberg models, what is the follower side mathematically, and what is missing?
A: Usually a replicator or Lotka–Volterra ODE, or a static response. A rigorous mean-field (PDE-level) limit with a value function is missing.
See: Thread B: Stackelberg evolutionary games

Q: How can the payoff matrix of a game between cancer cell types be measured experimentally?
A: Co-culture the cell types at several initial proportions, measure each type's growth rate, and fit growth rate as a function of frequency. The fitted coefficients form the payoff matrix.
See: Thread B: Stackelberg evolutionary games

Q: In the mechanical tumor model $\partial_t n - \operatorname{div}(n\nabla p) = nG(p)$, $p = n^\gamma$, what is the limit as $\gamma\to\infty$?
A: A Hele-Shaw free-boundary problem: $n = 1$ on $\{p > 0\}$, where $-\Delta p = G(p)$. This is the incompressible limit.
See: Thread D: mechanical tumor growth and gradient flows

Q: Why is the mechanical tumor-growth model not a plain $W_2$ gradient flow, and what is it without growth?
A: The growth term $nG(p)$ changes total mass, which $W_2$ cannot handle, so unbalanced transport or splitting is needed. With $G = 0$ it is the $W_2$ gradient flow of $\int n^{\gamma+1}/(\gamma+1)$, a porous-medium equation.
See: Thread D: mechanical tumor growth and gradient flows

Q: What research niche did the August 2026 survey suggest for a PDE/MFG mathematician?
A: A mean-field Stackelberg game: the physician as major player, with a value function on $\mathcal P(\mathbb R^d)$ (an HJ equation on Wasserstein space), and the tumor as a continuum following selection–mutation dynamics with constrained-HJ concentration.
See: The proposed niche

## Quiz

Q: In oncology Stackelberg games, why does the physician move first?
- [x] Resistance cannot evolve to a therapy that has not yet been applied
- [ ] Cancer cells are rational and prefer to respond second
- [ ] The physician's objective is zero-sum with the tumor's
- [ ] Simultaneous-move games have no equilibria
E: The leader–follower order is biological: the tumor can only adapt to selection pressures already present. Note also that the follower is evolutionary, not rational.
See: Thread B: Stackelberg evolutionary games

Q: In the incompressible ($\gamma \to \infty$) limit of $\partial_t n - \operatorname{div}(n\nabla p) = nG(p)$, the pressure satisfies on $\{p > 0\}$…
- [x] $-\Delta p = G(p)$
- [ ] $\Delta p = 0$
- [ ] $\partial_t p = \Delta p$
- [ ] $-\Delta p = n\,G(p)$ with $n$ free
E: In the limit $n = 1$ on $\{p>0\}$, so $\partial_t n = 0$ there and the equation reduces to $-\Delta p = G(p)$. Harmonic pressure ($\Delta p = 0$) would be the classical Hele-Shaw problem without a source.
See: Thread D: mechanical tumor growth and gradient flows

Q: Which tool fits the mechanical tumor-growth model *with* proliferation, but not plain $W_2$?
- [x] Unbalanced optimal transport, e.g. Wasserstein–Fisher–Rao, because mass changes
- [ ] The Hopf–Cole transform, because the equation is linear
- [ ] Replicator dynamics, because cell types compete
- [ ] Pontryagin's maximum principle, because there is a dose
E: $W_2$ compares measures of equal mass, and the growth term $nG(p)$ creates mass. Without growth, the model is a $W_2$ gradient flow.
See: Thread D: mechanical tumor growth and gradient flows
