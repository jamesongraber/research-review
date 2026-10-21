---
title: "Mean field games in oncology: what exists and what a formulation needs"
tags: [cancer, mean-field-games, stackelberg-games, major-minor-players, adaptive-therapy, monotonicity]
created: 2026-10-21
related: [mathematical-oncology-landscape, control-of-evolving-populations, stackelberg-evolutionary-games, adaptive-therapy-dynamic-programming, adaptive-therapy-control, pouchol-optimal-control-ide, selection-mutation-hamilton-jacobi, constrained-hj-uniqueness-regularity, tumour-growth-unbalanced-transport, field-open-questions, discounted-stationary-mfg, master-equation-and-rational-expectations, hj-wasserstein-applications, replicator-dynamics, adaptive-dynamics]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

The [landscape note](#/note/mathematical-oncology-landscape) sketched a niche: physician as major player, tumour as a continuum of minor players. This note records what the literature contains as of October 2026, what can be imported, and what a formulation must settle before any theorem is possible.

### The negative finding (as of 2026)

A systematic search (arXiv, OpenAlex, Europe PMC) for "mean field game" with cancer, tumour, chemotherapy or immunotherapy returns **no peer-reviewed paper** coupling an HJB equation to a Fokker–Planck equation for tumour cells. The single match is an abstract: Mehrjou, "Stackelberg mean-field games for adaptive cancer therapy" (ICML 2026 workshop *New Frontiers in Game-Theoretic Learning*, poster). It claims: clinician as Stackelberg leader choosing a dosing schedule; tumour as a mean-field equilibrium described by HJB and Fokker–Planck equations; existence under a "monotonicity condition on competition"; Stackelberg optimality conditions; an $O(N^{-1/2})$ finite-player approximation; a finite-type ODE reduction; simulations beating MTD and heuristic adaptive therapy with less drug. No full text was accessible, so every claim is unverified.

### What else carries the name "mean field"

- **Deterministic limits.** Akhmetzhanov and Hochberg (2014) take the large-population limit of a birth–death tumour model; Newton's seminar series "evolutionary mean field games" means the replicator ODE limit of a Moran process under optimal or adaptive control (Dua–Ma–Newton 2021; Park–Newton 2023). No individual-level HJB appears.
- **Expository preprints.** Farinacci (2024) and Sonith (2024) invoke McKean–Vlasov dynamics and path-integral control for tumour-growth SDEs, with no theorem.

### Games that do exist

- **[Stackelberg evolutionary games](#/note/stackelberg-evolutionary-games)** (Stein et al. 2023; Salvioli et al. 2025; Ganzfried 2024; Romano, Borri and Di Benedetto 2024): leader chooses a dose, follower is a population at eco-evolutionary equilibrium whose trait follows Darwinian dynamics $\dot u = \sigma^2\partial_u G$, a gradient ascent, not a backward equation.
- **Differential games.** Alajmi and Roy (2024) compute Nash and Stackelberg equilibria of a differential game between antibodies and signalling pathways in oesophageal cancer, Stackelberg doing better. Sun et al. (2023) and Liu et al. (2024, both IEEE Trans. Cybern.) write the coupled Hamilton–Jacobi equations of nonzero-sum games (tumour vs immune system; two drug channels) and approximate them by adaptive dynamic programming with Lyapunov guarantees. These are the only cancer papers with coupled HJ equations, and their "players" are modelling devices with quadratic costs.

### Bridges that can be imported

Major–minor and Stackelberg MFG theory is mature elsewhere: Bensoussan, Chau and Yam (2015); Carmona and Zhu (2016, conditional McKean–Vlasov FBSDE, approximate Nash for finite games); Lasry and Lions (2018) and Cardaliaguet, Cirant and Porretta (2018/20, master equation, convergence of the $N$-minor Nash system). The epidemic line is the closest template: Aurell, Carmona, Dayanıklı and Laurière (2022) have a principal steering a finite-state mean field of agents who control their transition rates; Hubert et al. (2022) do the moral-hazard version; Dayanıklı and Laurière (2023) penalise the bi-level problem into a single-level mean-field control problem, with convergence. Barreiro-Gomez and Park (2025) and Pedroso et al. (2025) derive replicator-type dynamics from finite-state MFGs, so a replicator follower is already a degenerate MFG.

### A target formulation (proposal, not a result)

Take a resistance trait $x\in\mathbb R^d$, mutation noise $\sqrt{2\sigma}\,dW$, a cell "control" $\alpha$ on its trait drift at cost $L(x,\alpha)$, the physician's dose $d_t$, net fitness $R(x,I,d)$ with competition pressure $I_t=\int\psi\,dm_t$ as in [Dirac concentration](#/note/selection-mutation-hamilton-jacobi), and $H(x,p)=\sup_\alpha\{-\alpha\cdot p-L(x,\alpha)\}$. The candidate system is
$$
-\partial_t u-\sigma\Delta u+H(x,\nabla u)=-R(x,I_t,d_t),\qquad
\partial_t m-\sigma\Delta m-\operatorname{div}\big(m\,\partial_pH(x,\nabla u)\big)=m\,R(x,I_t,d_t),
$$
with the leader minimising $\int_0^T(d_t+\sigma_0)\,dt+\Phi(m_T)$ (Gluzman's cost) or maximising a probability of success under a budget (Wang–Scott–Vladimirsky 2024). Drop the right side of the second equation and this is a standard Lasry–Lions system with a parameter $d$. Keep it and $m_t$ is no longer a probability measure, which is the first open question below.

**Monotonicity for competition kernels.** In cost convention the Lasry–Lions condition is $\int(F(x,m)-F(x,m'))\,d(m-m')\ge0$. For $F(x,m)=\beta\int K(x-y)\,m(dy)$ it reads $\beta\iint K(x-y)\,d\nu(x)\,d\nu(y)\ge0$ for $\nu=m-m'$, which holds for all signed $\nu$ iff $K$ is positive definite ($\hat K\ge0$). A Gaussian kernel is monotone; a top-hat kernel is not (its Fourier transform is a sinc; $\nu=\cos(4.5x)e^{-x^2/8}$ gives a negative value numerically). Coupling through total mass alone, $F=\beta\int m$, gives $\beta(M-M')^2\ge0$: monotone but degenerate, vanishing between probability measures. This is presumably what Mehrjou's "monotonicity condition on competition" means (unverified).

### Six ingredients, what exists and what is missing

1. **Cell state and objective.** Continuous trait (Pouchol et al. 2018; Salvioli 2025) or finite types (Kaznatcheev–Gluzman; Cunningham). Exists: the forward selection–mutation equation and its concentration theory. Missing: any biological derivation of a *forward-looking* cell objective; Darwinian dynamics is myopic. So far "mean field game" is a metaphor here, not a model.
2. **Information structure.** Open-loop leader commitment (Bensoussan–Chau–Yam; Aurell et al.; Mehrjou) versus a feedback major player (Lasry–Lions 2018; Cardaliaguet–Cirant–Porretta). No cancer paper has the latter.
3. **The equations.** Nonlocal coupling through $I_t$ and the growth term $mR$: monotonicity is only partial and the mass is unbalanced; see [unbalanced transport](#/note/tumour-growth-unbalanced-transport).
4. **$N$-player justification versus mean-field control.** $O(N^{-1/2})$ approximate-Nash rates exist generically, but are cells players at all? The honest alternative is **mean-field control**: one controller steering a McKean–Vlasov population, an [HJB on Wasserstein space](#/note/hj-wasserstein-applications). Scagliotti et al. (2026, ensemble control) and Roy, Pan and Pal (2022, Fokker–Planck control) are half-steps without interaction.
5. **Common noise and partial observation.** Patient-level growth-rate fluctuations are a [common noise](#/note/master-equation-and-rational-expectations); PSA is a scalar observation of $m_t$. Gluzman et al. (2020) and Wang et al. (2024) both list partial observability as open.
6. **Numerics.** Finite-type reductions and finite-state MFG solvers exist; none has been run on a calibrated tumour model.

### Three open questions

- **A. Birth and death.** An MFG or MFC whose forward equation has a source term lives on nonnegative measures, with the Hellinger–Kantorovich metric (Di Marino–Chizat 2020 write the Hele-Shaw tumour model as a gradient flow for it). No HJB theory on that cone exists, and the EVI structure of the follower dynamics has never been used in a leader's uniqueness argument.
- **B. Partially observed and robust versions.** Model and measurement error as an adversary gives a Hamilton–Jacobi–Isaacs equation; the only cancer paper in this spirit is Carrère–Zidani (2020), reachability under uncertainty, not a game.
- **C. Dynamic Stackelberg.** Stein et al. (2023) ask for the move from equilibrium SEG to dynamic leader–follower interaction. Existence of an open-loop Stackelberg equilibrium (leader commits to a dose path, follower trait follows Darwinian dynamics) has not been written down, and Sun et al. (2025) show the time-to-progression optimum can require infinitely many holidays, so a relaxed-control or dwell-time formulation comes first. Compare the one-player [dynamic-programming treatment](#/note/adaptive-therapy-dynamic-programming).

## Cards

Q: As of 2026, what does the peer-reviewed literature contain on Lasry–Lions mean field games for cancer?
A: Nothing: no journal paper couples an HJB to a Fokker–Planck equation for tumour cells. The only match is Mehrjou's 2026 ICML workshop abstract (Stackelberg MFG for adaptive therapy), whose theorems are unverified.
See: The negative finding (as of 2026)

Q: What does "mean field" usually mean in cancer papers such as Akhmetzhanov–Hochberg (2014) or Newton's "evolutionary mean field games"?
A: The deterministic large-population limit of a stochastic cell model (e.g. the replicator ODE of a Moran process), possibly under optimal control. There is no individual-level HJB, so it is not an MFG.
See: What else carries the name "mean field"

Q: Which cancer papers literally write coupled Hamilton–Jacobi equations, and what is their limitation?
A: Sun et al. (2023) and Liu et al. (2024, IEEE Trans. Cybern.): nonzero-sum differential games (tumour vs immune; two drug channels) solved by adaptive dynamic programming. The players are modelling devices with quadratic costs, not biologically motivated agents.
See: Games that do exist

Q: Why is the epidemic Stackelberg MFG of Aurell, Carmona, Dayanıklı and Laurière (2022) the closest template for adaptive therapy?
A: It has exactly the needed architecture: a principal (regulator) steering a finite-state mean field of agents who control their transition rates. Replace regulator by physician and compartments by phenotypes.
See: Bridges that can be imported

Q: For a competition coupling $F(x,m)=\beta\int K(x-y)\,m(dy)$, when is the Lasry–Lions monotonicity condition satisfied?
A: Exactly when $K$ is a positive-definite kernel ($\hat K\ge0$), since the condition becomes $\beta\iint K(x-y)\,d\nu\,d\nu\ge0$ for $\nu=m-m'$. Gaussian kernels qualify; top-hat kernels do not.
See: A target formulation (proposal, not a result)

Q: Why does the growth term $m\,R$ in the Fokker–Planck equation break the standard MFG framework?
A: The mass of $m_t$ changes, so $m_t$ is not the law of a representative player. One needs nonnegative measures with a Hellinger–Kantorovich geometry, for which no HJB theory exists.
See: Three open questions

Q: Why is mean-field *control* a more defensible formulation of adaptive therapy than a mean field *game*?
A: Cells have no forward-looking objective; Darwinian dynamics is a myopic gradient ascent. With a single controller (the physician) over a McKean–Vlasov population, no cell-level HJB is needed.
See: Six ingredients, what exists and what is missing

## Quiz

Q: Mehrjou (2026) claims existence under a "monotonicity condition on competition". What is the status of that claim?
- [ ] A theorem in a SIAM journal paper
- [x] A claim in an ICML workshop abstract whose full text could not be checked
- [ ] A numerical observation in Gluzman et al. (2020)
- [ ] A corollary of Carmona–Zhu (2016)
E: Only the abstract was accessible. The hypothesis is plausible (positive-definite competition kernels are monotone) but the statement is unverified.
See: The negative finding (as of 2026)

Q: In a Stackelberg evolutionary game (Stein et al. 2023), how does the follower respond to the dose?
- [x] Its trait follows Darwinian dynamics $\dot u=\sigma^2\partial_uG$ and settles at an eco-evolutionary equilibrium
- [ ] It solves a backward HJB anticipating the dose schedule
- [ ] It plays a Nash equilibrium against the physician
- [ ] It follows a Fokker–Planck equation with common noise
E: The follower is a gradient ascent at equilibrium, not an optimiser. The whole "backward half" of an MFG is absent, which is the distance to a Lasry–Lions formulation.
See: Games that do exist

Q: Which coupling is Lasry–Lions monotone but tells you nothing about uniqueness between probability measures?
- [x] Coupling through total mass only, $F=\beta\int m$
- [ ] A Gaussian competition kernel
- [ ] A top-hat competition kernel
- [ ] A local coupling $F=\beta m(x)$
E: $\int(F(m)-F(m'))\,d(m-m')=\beta(M-M')^2$, which is zero whenever both measures have the same mass. The Gaussian kernel is strictly useful; the top-hat kernel fails monotonicity.
See: A target formulation (proposal, not a result)
