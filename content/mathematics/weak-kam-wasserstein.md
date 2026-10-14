---
title: Weak KAM theory on Wasserstein space
tags: [weak-kam, hamilton-jacobi, wasserstein-space, mean-field-games, ergodic-problems]
created: 2026-10-09
related: [hj-wasserstein-applications, bounded-support-topology, potential-games, discounted-stationary-mfg]
source: "Claude conversation: KAM theory for HJ equations (2026-10). A literature map as of October 2026."
---

## Article

Is there a weak KAM theory for HJ equations whose state variable is a measure? Partly. The **weak KAM theorem** itself (a critical value, and a solution of the cell problem that is a fixed point of Lax–Oleinik) is proved intrinsically on $\mathcal P(\mathbb T^d)$. The rest of Fathi's theory (Aubry set, Mather measures, uniqueness sets, convergence of the semigroup) is much thinner. What exists lives mostly on a Hilbert-space lift or inside potential MFG. The literature reading below comes from abstracts and introductions, so check the papers before citing details.

### The finite-dimensional checklist

For a Tonelli Lagrangian $L$ on a compact manifold $M$ there is a unique **critical value** $c$ such that the cell problem $H(x,Du)=c$ has a global viscosity solution. A **weak KAM solution** $u$ satisfies two things:

- **Domination** $u\prec L+c$: $u(\gamma(b))-u(\gamma(a))\le\int_a^b L(\gamma,\dot\gamma)\,dt+c(b-a)$ for every curve.
- **Calibration**: every $x$ is the endpoint of a curve $\gamma:(-\infty,0]\to M$ with equality on every interval.

Equivalently, $T^-_t u + ct = u$ for all $t\ge0$, where $T^-_t u(x)=\inf_{\gamma(t)=x}\{u(\gamma(0))+\int_0^t L(\gamma,\dot\gamma)\,ds\}$ is the Lax–Oleinik semigroup. The rest of the theory adds the Aubry set, Mather measures, the Mather set as a uniqueness set, and Fathi's convergence of $T^-_tu+ct$ as $t\to\infty$.

### Intrinsic results on the Wasserstein torus

Gangbo and Tudorascu take $L(\mu,v)=\tfrac12\int|v|^2\,d\mu-\mathcal W(\mu)$ on curves in $\mathcal P(\mathbb T^d)$, with $v_t$ the velocity field of minimal norm.

- **$d=1$** (Adv. Math. 2010, unverified): uses the isometric identification of one-dimensional measures with a subset of $L^2(0,1)$. On $\mathbb R$ this is the quantile map: $W_2(\mu,\nu)=\|F_\mu^{-1}-F_\nu^{-1}\|_{L^2(0,1)}$, with image the closed convex cone of nondecreasing functions. A Fathi-type argument then runs on a Hilbert-space "infinite-dimensional torus".
- **Any $d\ge1$** (CPAM 2014, "Weak KAM theory on the Wasserstein torus with multidimensional underlying space"): no such isometric identification is known for $d>1$, so they work intrinsically on $\mathcal P(\mathbb T^d)$ and prove a weak KAM theorem there. The abstract also mentions the asymptotic behavior and invariant measures of minimizing trajectories for a class of Lagrangians. Whether a full intrinsic Aubry–Mather theory for $d>1$ follows is unclear from the abstract.

The associated viscosity notions come from Gangbo–Nguyen–Tudorascu (2008) and Gangbo–Tudorascu (JMPA 2019) (both unverified).

### The Hilbert-space lift

Gomes–Nurbekyan ("An infinite-dimensional weak KAM theory via random variables", arXiv 2015) work on $L^2$, treating configurations as random variables rather than laws. They prove that the cell problem has a viscosity solution that is a fixed point of Lax–Oleinik, and that invariant minimizing measures and calibrated curves defined on all of $\mathbb R$ exist. They allow general Tonelli-type Lagrangians, not only kinetic minus potential (unverified). The price: getting back to $\mathcal P(\mathbb T^d)$ needs rearrangement invariance, and a solution on the lift need not descend (point made in arXiv 1609.08386, unverified).

### Potential MFG: weak KAM *for* MFG vs *on* measures

- **Cardaliaguet (Dyn. Games Appl. 2013)** studies the long-time average of first-order MFG with smoothing coupling. The ergodic MFG system uses **finite-dimensional** weak KAM on $\mathbb T^d$ with the measure frozen. The stationary measure sits on the projected Mather set, where the corrector's derivative exists and does not depend on the solution, and uniqueness of the constant uses monotonicity (details unverified). This is weak KAM *for* MFG, not *on* $\mathcal P$.
- **Masoero (arXiv 2018)** and **Cardaliaguet–Masoero ("Weak KAM theory for potential MFG", arXiv 2019)** make the measure the state. The value of the time-dependent potential MFG minimization converges to an ergodic constant $-\lambda$, and the value function on the space of measures has a limit as $T\to\infty$. Masoero gives examples where the **stationary** MFG minimization has value strictly greater than $-\lambda$. So the trajectories of the time-dependent MFG system **do not converge to static equilibria**.

### Why that gap needs a non-convex potential

Write the first-order potential problem in Benamou–Brenier variables $(m,w=m\alpha)$, with constraint $\partial_tm+\operatorname{div}w=0$ and cost $\int\!\!\int m\,L(x,w/m)+\int\mathcal F(m_t)\,dt$. The perspective $(m,w)\mapsto m\,L(x,w/m)$ is jointly convex when $L$ is convex in $\alpha$. If $\mathcal F$ is also convex, time-averaging a trajectory over $[0,T]$ gives a pair $(\bar m,\bar w)$ with $\operatorname{div}\bar w=(m_0-m_T)/T=O(1/T)$ and average cost no larger, by Jensen. So the best stationary cost equals the ergodic constant. A strict gap requires $\mathcal F$ non-convex, which is to say the coupling is not Lasry–Lions monotone. (This argument is a sketch, not from the chat.)

### Gaps (as of the chat)

- An intrinsic Aubry set and Mather measures on $\mathcal P(\mathbb T^d)$, $d>1$, and the Mather set as a uniqueness set.
- **Convergence**, not just boundedness, of Lax–Oleinik on $\mathcal P(\mathbb T^d)$, i.e. Fathi-type large-time asymptotics.
- How weak KAM solutions relate to the various intrinsic viscosity notions (Gangbo–Tudorascu, Gangbo–Święch metric solutions, Lions-derivative definitions).
- Non-compact base $\mathcal P_2(\mathbb R^d)$, which is not locally compact. Note: $\mathcal P(\mathbb T^d)$ with $W_2$ *is* compact (hence locally compact), and sublevel sets of the kinetic action are compact in $C([0,T];\mathcal P(\mathbb T^d))$ by Arzelà–Ascoli. There the obstacle is the lack of smooth structure, not compactness.
- Intrinsic results for Hamiltonians not of kinetic-minus-potential form.

A related 2025 preprint (arXiv 2504.17958, unverified) constructs, by vanishing discount, an ergodic constant and a viscosity solution of a second-order ergodic HJB on Wasserstein space for McKean–Vlasov control. That is a critical value, not weak KAM: there are no calibrated curves or Mather measures.

## Cards

Q: What does the weak KAM theorem assert for a Tonelli Lagrangian $L$ with critical value $c$, in Lax–Oleinik form?
A: There is a $u$ with $T^-_tu+ct=u$ for all $t\ge0$. Equivalently, $u\prec L+c$ (domination), and every point is the end of a calibrated curve on $(-\infty,0]$. Such a $u$ is a viscosity solution of $H(x,Du)=c$.
See: The finite-dimensional checklist

Q: Why is weak KAM on $\mathcal P(\mathbb T^d)$ much easier when $d=1$?
A: One-dimensional measures embed isometrically in $L^2(0,1)$ via quantile functions, $W_2(\mu,\nu)=\|F_\mu^{-1}-F_\nu^{-1}\|_{L^2}$. A Hilbert-space Fathi argument then applies. No such isometric identification is known for $d>1$.
See: Intrinsic results on the Wasserstein torus

Q: What did Gangbo–Tudorascu (CPAM 2014) prove about weak KAM on $\mathcal P(\mathbb T^d)$?
A: A weak KAM theorem on $\mathcal P(\mathbb T^d)$ for every $d\ge1$, by an approach intrinsic to Wasserstein space, which avoids the $d=1$ Hilbert identification. The Lagrangian is kinetic energy minus a potential on measures.
See: Intrinsic results on the Wasserstein torus

Q: In the random-variable ($L^2$-lift) approach to infinite-dimensional weak KAM, what do you gain and what is the price?
A: Gain: Hilbert-space tools, which give a Lax–Oleinik fixed point plus invariant minimizing measures and calibrated curves on $\mathbb R$ (Gomes–Nurbekyan). Price: results live on random variables, not laws. Descending to $\mathcal P(\mathbb T^d)$ needs rearrangement invariance.
See: The Hilbert-space lift

Q: In potential MFG, can solutions of the time-dependent system fail to converge to stationary equilibria as $T\to\infty$?
A: Yes. The time-averaged value converges to an ergodic constant $-\lambda$, and there are examples where every stationary MFG configuration costs strictly more than $-\lambda$. Then time-dependent trajectories do strictly better per unit time and cannot settle on a static equilibrium.
See: Potential MFG: weak KAM for MFG vs on measures

Q: Why can a gap between the ergodic constant and the best stationary cost occur only if the MFG potential $\mathcal F$ is non-convex?
A: In variables $(m,w=m\alpha)$ the kinetic cost is jointly convex. If $\mathcal F$ is convex, the time average of a long trajectory is an almost-stationary competitor with no larger average cost (Jensen). So the stationary value equals the ergodic constant.
See: Why that gap needs a non-convex potential

Q: How does weak KAM in Cardaliaguet's 2013 long-time analysis of first-order MFG differ from weak KAM *on* Wasserstein space?
A: It is the finite-dimensional theory on $\mathbb T^d$, applied to the individual agent's HJ equation with the measure frozen. The state variable is $x$, not the measure.
See: Potential MFG: weak KAM for MFG vs on measures

Q: For weak KAM on $\mathcal P(\mathbb T^d)$, is the lack of (local) compactness the main obstacle?
A: No. $(\mathcal P(\mathbb T^d),W_2)$ is compact, and kinetic-action sublevel sets of curves are compact by Arzelà–Ascoli. The difficulty is the lack of a smooth (manifold) structure. Compactness becomes the issue on $\mathcal P_2(\mathbb R^d)$, which is not locally compact.
See: Gaps (as of the chat)

## Quiz

Q: A weak KAM solution $u$ at critical value $c$ satisfies, for the Lax–Oleinik semigroup $T^-_t$,…
- [x] $T^-_tu + ct = u$ for all $t \ge 0$
- [ ] $T^-_tu = u$ for all $t\ge0$
- [ ] $T^-_tu - ct = u$ for all $t \ge 0$
- [ ] $T^-_tu \to u$ as $t\to\infty$, without a correction term
E: Domination $u\prec L+c$ gives $u\le T^-_tu+ct$, and calibrated curves give equality. Without the $ct$ shift, $T^-_tu$ drifts linearly in $t$.
See: The finite-dimensional checklist

Q: Masoero's examples, where trajectories of the time-dependent potential MFG system do not converge to static equilibria, require…
- [ ] monotone (Lasry–Lions) coupling
- [x] a non-convex potential $\mathcal F$
- [ ] a non-compact state space
- [ ] second-order (diffusive) dynamics
E: With a convex potential, time-averaging an optimal trajectory gives a stationary competitor that is at least as good, so the stationary value equals the ergodic constant. The examples are on the torus and first order.
See: Why that gap needs a non-convex potential

Q: Which part of Fathi's weak KAM theory is established intrinsically on $\mathcal P(\mathbb T^d)$ for all $d$, according to this literature map?
- [x] existence of the critical value and a weak KAM solution (Lax–Oleinik fixed point)
- [ ] convergence of $T^-_tu+ct$ as $t\to\infty$
- [ ] the Mather set as a uniqueness set for the critical equation
- [ ] equivalence of weak KAM solutions with every intrinsic viscosity notion
E: The other three are listed as open or available only on the $L^2$ lift.
See: Gaps (as of the chat)
