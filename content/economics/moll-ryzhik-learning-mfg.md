---
title: "MFG without rational expectations: learning with low-dimensional coupling"
tags: [mean-field-games, rational-expectations, learning, misspecification, berk-nash]
created: 2026-08-07
related: [master-equation-and-rational-expectations, adaptive-learning-e-stability, learning-without-replays, discounted-stationary-mfg, infinite-horizon-vs-steady-state, bewley-huggett-aiyagari]
source: "Claude conversation: MFG without rational expectations, et al (2026-08), discussing Moll–Ryzhik, arXiv 2506.11838"
---

## Article

Moll–Ryzhik, "Mean Field Games without Rational Expectations" (arXiv 2506.11838; *Commun. Contemp. Math.* 2026), show how to write MFGs in which agents forecast with non-rational beliefs instead of solving the master equation. The paper says its focus is on modeling, not on mathematical analysis. Its learning section (Section 7) gives well-posed systems but **no asymptotic theory**: no theorem and no conjecture about whether learning converges, or to what.

### Low-dimensional coupling

An MFG has **low-dimensional coupling** if each agent's running reward depends on the population only through finitely many functionals,
$$
R(x, \alpha, p), \qquad p = P^*(m) \in \mathbb R^\ell,
$$
e.g. prices such as the interest rate in [Aiyagari](#/note/bewley-huggett-aiyagari). Agents then need forecasts of $p$, not of $m$. That is what makes it plausible to replace rational expectations by a simple belief about $p$.

### The simplest learning system

The paper works on $[0,T]$ with a terminal condition, where long-time questions are not well posed. The chat therefore reformulated it with an infinite horizon and $\rho > 0$, using the simplest belief: agents think the price will stay at its current estimate $\hat p_t$ forever, and update the estimate with decreasing gain. Let $\hat u(\cdot\,; p)$ solve the stationary HJB $\rho \hat u = H(x, \nabla\hat u, p) + \nu\Delta\hat u$, with policy $\pi(\cdot\,; p)$. Then
$$
\partial_t m_t = -\operatorname{div}\big(\pi(\cdot\,;\hat p_t)\, m_t\big) + \nu\Delta m_t, \qquad p_t = P^*(m_t), \qquad \dot{\hat p}_t = \tfrac1t (p_t - \hat p_t).
$$
The policy in the Fokker–Planck equation uses the **belief** $\hat p_t$, but the price agents observe comes from the **actual** measure $m_t$. That mismatch is the content of the model.

### Two timescales and the T-map

The belief moves slowly (gain $1/t$) and $m$ relaxes fast. Freeze $\hat p = p$ and let $m^\infty(p)$ be the stationary measure of the frozen Fokker–Planck equation. Define
$$
T(p) := P^*\big(m^\infty(p)\big).
$$
A fixed point $T(\bar p) = \bar p$ is exactly a **stationary MFG equilibrium**, and E-stability means $\operatorname{spec} DT(\bar p) \subset \{\operatorname{Re}\lambda < 1\}$ (see [E-stability](#/note/adaptive-learning-e-stability)).

Why a theorem looks reachable: the **slow variable lives in $\mathbb R^\ell$**. Ljung's ODE method and Benaïm's stochastic-approximation theory need a finite-dimensional slow variable. The infinite-dimensional part, $m$, only has to be contracted (ergodicity with a spectral gap uniform in $p$), not tracked as a flow on Wasserstein space. A perceived *master field* $\hat U(t,x,m)$ would put the slow variable in infinite dimensions, where none of this applies.

Aiyagari heuristic: a higher perceived interest rate leads to more saving, hence more capital, hence a lower marginal product and a lower actual rate. If aggregate asset supply increases with $r$, then $T' < 0 < 1$ and the equilibrium is E-stable. The chat conjectured that Lasry–Lions monotonicity always gives this. **That conjecture is false**: see [Discounted stationary MFG](#/note/discounted-stationary-mfg). The analysis above also presumes that the economy settles to a steady state, which is questioned in [Infinite horizon is not stationary](#/note/infinite-horizon-vs-steady-state).

### Misspecification: Berk–Nash, not Nash

With richer parametric beliefs, $\dot p = \mu_p(p, \theta)$ with $\theta \in \mathbb R^d$ fitted by least squares, the paper itself notes that the true price $p_t$ is **not Markov**: only $(m_t, Z_t)$ is, and $p_t$ is a nonlinear functional of that state. The perceived class is Markov in $p$, so **it cannot contain the truth**. This is deliberate, since it is what avoids the master equation.

With a misspecified belief class, the fixed point of $T$ is not the rational-expectations equilibrium. It is a **restricted perceptions equilibrium** (Evans–Honkapohja), formalized as a **Berk–Nash equilibrium** (Esponda–Pouzo, *Econometrica* 2016): beliefs are the Kullback–Leibler projection of the true process onto the model class, and actions are optimal given those beliefs. Agents are right about what they can see and wrong about the rest, and they never find out. Berk (1966) is the underlying result: misspecified Bayesian posteriors concentrate on the KL-closest models. Fudenberg–Lanzani–Strack (*Econometrica* 2021) characterize which Berk–Nash equilibria are stable limits of learning (a uniform strictness condition), which is the same move as E-stability in the misspecified setting.

So the honest expectation is: **the limit, if any, is a Berk–Nash equilibrium**. It coincides with the MFG Nash equilibrium only if the realized price path lies in the belief class.

### Open: belief heterogeneity

If agents hold different beliefs $\theta$, the measure lives on $(x, \theta)$-space and has a transport term $-\operatorname{div}_\theta(L\,m)$, coupled only through $p_t = P^*(m_t)$. Whether the $\theta$-marginal collapses to a point mass or disagreement persists is open. Persistent disagreement would be the interesting answer, since observed disagreement in expectations is part of the motivation.

## Cards

Q: What is an MFG with **low-dimensional coupling**, and why does it matter for expectations?
A: The reward depends on $m$ only through finitely many functionals $p = P^*(m) \in \mathbb R^\ell$ (e.g. prices). Agents then need forecasts of $p$, not of the whole distribution, so simple non-rational beliefs about $p$ are plausible.
See: Low-dimensional coupling

Q: In the Moll–Ryzhik constant-belief learning system, which price enters the policy and which is observed?
A: The policy in the Fokker–Planck equation uses the belief $\hat p_t$. The observed price $p_t = P^*(m_t)$ comes from the actual distribution, and $\hat p$ is updated by $\dot{\hat p} = (p - \hat p)/t$.
See: The simplest learning system

Q: Define the T-map for the constant-belief learning MFG. What are its fixed points?
A: $T(p) = P^*(m^\infty(p))$, where $m^\infty(p)$ is the stationary measure when everyone acts on belief $p$. Its fixed points are exactly the stationary MFG equilibria.
See: Two timescales and the T-map

Q: Why can two-timescale (Ljung/Benaïm) arguments plausibly work for Moll–Ryzhik learning but not for a perceived master field?
A: The slow variable (the belief) lives in $\mathbb R^\ell$; the infinite-dimensional $m$ only needs to be contracted. A perceived master field makes the slow variable infinite-dimensional, where those theories don't apply.
See: Two timescales and the T-map

Q: Why can't learning with a parametric price model $\dot p = \mu_p(p,\theta)$ converge to the rational-expectations MFG equilibrium in general?
A: The true price is a nonlinear functional of the Markov state $(m_t, Z_t)$ and is not itself Markov, while the belief class is Markov in $p$. The class cannot contain the truth.
See: Misspecification: Berk–Nash, not Nash

Q: What is a **Berk–Nash equilibrium**?
A: Actions are optimal given beliefs, and beliefs are the KL projection of the true process (induced by those actions) onto the agent's misspecified model class. Agents are right about what they observe, wrong about the rest, and never learn otherwise.
See: Misspecification: Berk–Nash, not Nash

Q: Aiyagari learning heuristic: why is $T'(r) < 0$ plausible?
A: Higher perceived $r$ means more saving, more capital, a lower marginal product, so a lower actual $r$. This holds if asset supply increases with $r$, and then $T' < 0 < 1$ gives E-stability.
See: Two timescales and the T-map

## Quiz

Q: In the constant-belief learning MFG, fixed points of $T(p) = P^*(m^\infty(p))$ are…
- [x] stationary MFG equilibria
- [ ] Berk–Nash equilibria that are never Nash
- [ ] solutions of the master equation with common noise
- [ ] always E-stable under Lasry–Lions monotonicity
E: With constant beliefs and a fixed point, the belief is correct in the steady state. Monotonicity does not imply E-stability (see the discounted stationary MFG note).
See: Two timescales and the T-map

Q: With a parametric perceived law $\dot p = \mu_p(p,\theta)$, the natural limit object of learning is…
- [ ] the MFG Nash equilibrium
- [x] a restricted perceptions / Berk–Nash equilibrium
- [ ] the ergodic MFG
- [ ] a correlated equilibrium
E: The belief class is Markov in $p$ but the true price is not, so beliefs converge, at best, to the KL projection of the truth.
See: Misspecification: Berk–Nash, not Nash

Q: What does the Moll–Ryzhik paper prove about long-time convergence of its learning dynamics?
- [ ] Global convergence under monotonicity
- [ ] Local convergence at E-stable equilibria
- [x] Nothing: it focuses on modeling and states no asymptotic theorem or conjecture
- [ ] Non-convergence due to escape dynamics
E: The paper says its focus is modeling, not analysis. The convergence questions are open.
