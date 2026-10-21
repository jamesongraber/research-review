---
title: "Stackelberg evolutionary games: physician as leader"
tags: [cancer, stackelberg-games, g-function, bilevel-optimisation, adaptive-therapy]
created: 2026-10-21
related: [mathematical-oncology-landscape, g-functions-darwinian-dynamics, measuring-the-game, adaptive-therapy-control, adaptive-therapy-origins, tumour-containment-theory, adaptive-therapy-dynamic-programming, mean-field-games-in-oncology, control-of-evolving-populations, selection-mutation-hamilton-jacobi, evolutionarily-stable-strategies, discounted-stationary-mfg]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

The [landscape note](#/note/mathematical-oncology-landscape) sketches the idea: the physician leads, the tumour follows by evolution rather than by optimisation. This note gives the actual mathematics as of 2026: the static Stackelberg evolutionary game (SEG) of Stein et al. (2023), its one theorem, the worked example of Salvioli et al. (2025), and the bilevel structure that makes it both tractable and limited.

### The asymmetry

Staňková, Brown, Dalton and Gatenby (2019) state it for clinicians: the physician is the only rational player and moves first; the cancer's "response" is evolutionary, so the solution concept is Stackelberg, not Nash. Fixed-dose-until-progression protocols "cede leadership" by reacting to the tumour's evolution after the fact. The idea descends from Vincent and Brown's chapter on managing evolving systems (2005), the [double bind](#/note/g-functions-darwinian-dynamics) and Orlando et al. (2012); the fisheries version (Salvioli et al. 2021) came first.

### The static SEG (Stein et al. 2023)

The leader chooses a *constant* action $m$ (dose) to maximise $Q(m,\mathbf u,\mathbf x)$. Followers obey Darwinian dynamics driven by $G(v,\mathbf u,\mathbf x,m)$: $\dot x_i=x_iG|_{v=u_i}$, $\dot u_i=\sigma_i\,\partial_vG|_{v=u_i}$. Three nested equilibrium notions:

- **Ecological equilibrium** $\mathbf x^*(m,\mathbf u)$: $G=0$ for every positive density.
- **ESS curve** $\mathbf u^*(m)$: $u_i^*(m)=\arg\max_vG\big(v,\mathbf u^*(m),\mathbf x^*(m,\mathbf u^*(m)),m\big)$, the maximum principle of the [G-function note](#/note/g-functions-darwinian-dynamics). Together, $(\mathbf u^*,\mathbf x^*)$ is the eco-evolutionary equilibrium under dose $m$.
- Three leader strategies. **Naive**: constant aggressive $m=m_{\max}$ (MTD). **Nash** ("ecologically enlightened"): $m^*(\mathbf u)=\arg\max_mQ(m,\mathbf u,\mathbf x^*(m,\mathbf u))$ with the trait held fixed; the Nash pair $(m_N,\mathbf u_N)$ is where the leader's best-response curve meets the ESS curve. **Stackelberg** ("evolutionarily enlightened"): $m_S=\arg\max_mQ\big(m,\mathbf u^*(m),\mathbf x^*(m,\mathbf u^*(m))\big)$, optimising *along* the ESS curve.

Since the Nash pair lies on the ESS curve, over which the Stackelberg leader optimises, $Q_S\ge Q_N$ by construction; Stein et al. state this ("can never perform worse") rather than prove it, and Nash beating naive is shown in examples. The one theorem (4.1) compares first-order conditions. Along the ESS curve,
$$
\frac{d}{dm}Q\big(m,u^*(m),x^*(m,u^*(m))\big)=\underbrace{\Big[Q_m+Q_x\,\partial_mx^*\Big]}_{=0\text{ at Nash}}+\Big[Q_u+Q_x\,\partial_ux^*\Big]\frac{du^*}{dm}.
$$
So, assuming both solutions are characterised by first-order conditions, Nash and Stackelberg coincide if (a) $du^*/dm=0$ (the leader's action does not move the trait), or (b) $Q_u=0$ and either $Q_x=0$ or $\partial_ux^*=0$ (the objective ignores the trait, and the trait does not feed back on the burden). Otherwise the whole difference between the two therapies is the term $du^*/dm$: how much resistance the dose breeds. That is the quantity the [game assay](#/note/measuring-the-game) does not measure.

Cancer example in Stein et al.: sensitive cells with $u_S=0$ fixed, resistant cells with evolving $u_R$, Lotka–Volterra competition, $Q=Q_{\max}-c_1(x^*/K)^2-c_2u_R^2-c_3m^2$ on the stabilisation region $0<x^*\le\delta K$. For their parameters MTD progresses while Nash and Stackelberg stabilise, Stackelberg with lower dose and lower resistance; with $c_2=0$ (quality of life ignores resistance) case (b) applies and the two coincide.

### A worked SEG (Salvioli et al. 2025)

The model, with $r(v)=r_{\max}e^{-gv}$:
$$
G(v,\mathbf u,\mathbf x,m)=r(v)\Big(1-\frac{\alpha_{RS}x_S+\alpha_{RR}x_R}{K}\Big)-d-\frac{m}{k+bv},\qquad
\dot x_S=x_S\Big(r(0)\Big(1-\frac{\alpha_{SS}x_S+\alpha_{SR}x_R}{K}\Big)-d-\frac mk\Big),
$$
$\dot x_R=x_RG|_{v=u_R}$, $\dot u_R=\sigma\partial_vG|_{v=u_R}$, $m\in[0,1]$, with asymmetric competition ($\alpha_{SR}=0.15$, $\alpha_{RS}=0.9$: sensitive cells hurt resistant ones more than conversely) and the same $Q$ with $c_1+c_2+c_3=1$. Because $G=0$ at equilibrium absorbs the competition term, the ESS curve is closed-form and independent of $x_S$:
$$
u_R^*(m)=\max\Big\{0,\,-\frac kb-\frac{m}{2bd}+\sqrt{\frac{m^2}{4b^2d^2}+\frac{m}{bdg}}\Big\},
$$
increasing in $m$ (derived in the G-function note; $u^*(0.3)\approx0.75$, $u^*(1)\approx0.92$). The ecological equilibria are piecewise closed-form (branches with $x_S=0$ once the dose exceeds what sensitive cells tolerate); the leader's best response $m^*(u_R)$ is closed-form because $Q$ is concave in $m$; Nash is the intersection of the two curves and Stackelberg a one-dimensional maximisation along the ESS curve. Reported outcome with $c=(0.5,0.25,0.25)$: $Q_S=0.457$, $Q_N=0.434$, $Q_{MTD}=0.392$, Nash dose $m_N=0.723$; Stackelberg has the lowest dose and the lowest resistance, MTD the worst of all three. A recomputation from the published parameters (with $Q_{\max}=1$) reproduces $Q_{MTD}\approx0.391$ and $Q_S\approx0.458$ at $m_S\approx0.60$, with $m_N\approx0.72$, but gives $Q_N\approx0.453$ rather than $0.434$; the ordering $Q_S>Q_N>Q_{MTD}$ and $m_S<m_N<1$ is unaffected. In the recomputation the sensitive population is extinct at equilibrium for $m\gtrsim0.8$, and the resistant burden is *larger* there than at the Nash dose: competitive release, seen at equilibrium rather than in time. Two cautions from the authors: the Stackelberg dose can sit on the boundary of the stabilisation region (fragile to parameter error, hence a case for titration), and nothing proves that trajectories stay in that region for all parameterisations. Phan et al. (2024, arXiv) combine a Stackelberg framing with Bayesian optimisation of an adaptive abiraterone policy and recommend start/stop biomarker triggers that are both high and close together ("high-level tight control"; not examined here).

### Bilevel structure: the follower is a gradient flow

Classically a Stackelberg follower *optimises*. Here the lower level is a stationarity condition, $\partial_vG(v,\mathbf u,\mathbf x^*,m)=0$ at $v=u$ with $\partial_v^2G<0$, reached by the gradient flow $\dot u=\sigma\partial_vG$: the tumour maximises $G$ only in the ESS sense, locally and myopically, as in the [replicator](#/note/replicator-dynamics) comparison with MFGs. Formally the SEG is an optimistic bilevel programme whose lower level is a variational condition rather than an argmax. Three consequences: the ESS curve can bifurcate (Stein et al.'s fisheries example: raising the harvest splits the ESS into two coexisting strategies, after which Nash and Stackelberg differ), so "the" follower response needs a selection rule and branching requires [adaptive dynamics](#/note/adaptive-dynamics); with vector-valued strategies and life-history traits (Kleshnina, Streipert, Brown and Staňková 2023) the problem is solved numerically (Ganzfried 2024, preprint); and convergence stability and mutual invasibility of the follower equilibrium were, by the authors' own account, not fully analysed.

### What is open

1. **Dynamic SEG.** Everything above is constant-dose with the tumour at equilibrium (no time-scale justification is given). With a dose $m(\cdot)$ against the ODE $\dot x=xG$, $\dot u=\sigma\partial_vG$ the follower is a known dynamical system, so the leader's problem is standard optimal control (Pontryagin, as in Orlando 2012 and Li, Tan and Yu 2025; or HJB, as in [dynamic programming](#/note/adaptive-therapy-dynamic-programming) for a replicator model). No existence theory, necessary conditions or feedback characterisation exists for the G-function model.
2. **Identifiability of $G$**, in particular of $\partial_v\partial_mG$, from assay data (see [measuring the game](#/note/measuring-the-game)); and of the leader's weights $c_i$, which decide whether Nash equals Stackelberg.
3. **Stochastic and spatial versions.** All SEG work is deterministic; the cure region $x^*\le0$ is where deterministic models are least reliable.
4. **Mean-field formulation.** Cells are a continuum of minor players whose aggregate $(\mathbf u,\mathbf x)$ enters $G$; the physician is a major player; the natural object is a major–minor or Stackelberg MFG with a trait-structured follower (compare [Dirac concentration](#/note/selection-mutation-hamilton-jacobi)). The cancer-EGT literature did not use this language until 2026; a first Stackelberg mean-field game for adaptive therapy (Mehrjou, ICML 2026, HJB–Fokker–Planck follower, existence under a monotonicity condition, finite-type reduction to ODEs) is discussed in [mean field games in oncology](#/note/mean-field-games-in-oncology).

## Cards

Q: In a Stackelberg evolutionary game, what are the naive, Nash and Stackelberg leader strategies?
A: Naive: constant aggressive action (MTD). Nash: maximise $Q(m,\mathbf u,\mathbf x^*(m,\mathbf u))$ with the trait $\mathbf u$ held fixed, the pair lying on the ESS curve. Stackelberg: maximise $Q(m,\mathbf u^*(m),\mathbf x^*(m,\mathbf u^*(m)))$ along the ESS curve, anticipating the evolutionary response.
See: The static SEG (Stein et al. 2023)

Q: Why can the Stackelberg leader never do worse than the Nash leader at equilibrium?
A: The Nash pair $(m_N,\mathbf u_N)$ lies on the follower's ESS curve, and the Stackelberg leader maximises over that whole curve, so $Q_S\ge Q_N$ by construction (stated by Stein et al. 2023, not a published theorem).
See: The static SEG (Stein et al. 2023)

Q: Under what conditions do Nash and Stackelberg therapies coincide (Stein et al. 2023, Theorem 4.1)?
A: Assuming first-order characterisations: (a) $du^*/dm=0$, or (b) $\partial_uQ=0$ and either $\partial_xQ=0$ or $\partial_ux^*=0$. The Stackelberg first-order condition differs from Nash's by the term $(Q_u+Q_x\partial_ux^*)\,du^*/dm$.
See: The static SEG (Stein et al. 2023)

Q: Which single quantity carries the whole difference between an ecologically and an evolutionarily enlightened therapy?
A: $du^*/dm$, the sensitivity of the ESS resistance level to the dose, which depends on the cross-derivative $\partial_v\partial_mG$. It is not measured by the game assay.
See: The static SEG (Stein et al. 2023)

Q: In Salvioli et al. (2025), what is the ranking of MTD, Nash and Stackelberg therapy, and in which three quantities?
A: Stackelberg beats Nash beats MTD in the objective $Q$; Stackelberg also has the lowest constant dose and the lowest equilibrium resistance level, MTD the highest of both. A recomputation confirms the ordering (with a different Nash value).
See: A worked SEG (Salvioli et al. 2025)

Q: How does the follower of a Stackelberg evolutionary game differ from a classical Stackelberg follower, in bilevel terms?
A: The lower level is a stationarity condition $\partial_vG=0$ (with $\partial_v^2G<0$) reached by the gradient flow $\dot u=\sigma\partial_vG$, not an argmax over a payoff. The tumour is unbeatable locally (ESS), not optimal, and the ESS curve can bifurcate.
See: Bilevel structure: the follower is a gradient flow

Q: Why is the "dynamic Stackelberg evolutionary game" with a time-varying dose really an optimal control problem?
A: The follower is a known ODE ($\dot x=xG$, $\dot u=\sigma\partial_vG$) with no optimisation of its own, so the leader's problem is open-loop or feedback control of that system (Pontryagin or HJB). The static SEG is the special case of constant dose and equilibrated follower.
See: What is open

Q: What would a mean-field formulation of the physician–tumour game look like, and did one exist before 2026?
A: The physician as major player and cells as a continuum of minor players with a trait distribution, a major–minor or Stackelberg MFG whose follower is a trait-structured (HJB–Fokker–Planck or constrained-HJ) system. The cancer-EGT literature did not use it; a first Stackelberg MFG for adaptive therapy appeared in 2026.
See: What is open

## Quiz

Q: Quality of life is $Q=Q_{\max}-c_1(x^*/K)^2-c_3m^2$ (no resistance term), and the equilibrium burden does not depend on the trait. Then…
- [x] Nash and Stackelberg therapies coincide (case (b) of Theorem 4.1)
- [ ] Stackelberg still strictly beats Nash because $du^*/dm>0$
- [ ] MTD is optimal
- [ ] the ESS curve is flat
E: $Q_u=0$ and $\partial_ux^*=0$ kill the extra Stackelberg term whatever $du^*/dm$ is. In Salvioli et al. the burden does depend on $u_R$, so only $c_2=0$ with that feedback absent gives equality.
See: The static SEG (Stein et al. 2023)

Q: In the Salvioli et al. model, the ESS resistance curve $u_R^*(m)$ is independent of the sensitive population because…
- [x] the equilibrium condition $G=0$ is used to eliminate the competition factor before solving $\partial_vG=0$
- [ ] the competition coefficients are symmetric
- [ ] sensitive cells have $u_S=0$
- [ ] the cost of resistance is linear in $v$
E: The competition term multiplies $r(v)$ in both $G$ and $\partial_vG$; dividing out via $G=0$ leaves a quadratic in $k+bv$ with coefficients $g,d,m,b$ only.
See: A worked SEG (Salvioli et al. 2025)

Q: The published SEG results for cancer (Stein 2023; Salvioli 2025) assume…
- [x] a constant dose with the tumour at eco-evolutionary equilibrium
- [ ] a time-varying dose solved by Pontryagin's principle
- [ ] a stochastic finite tumour population
- [ ] a spatially structured tumour
E: Both papers list the transient/dynamic version, stochasticity and space as open. The constant-dose, equilibrated-follower setting is what makes the problem a one-dimensional maximisation along the ESS curve.
See: What is open
