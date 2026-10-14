---
title: Adaptive learning and E-stability
tags: [learning, rational-expectations, stochastic-approximation, equilibrium-selection]
created: 2026-08-07
related: [learning-without-replays, moll-ryzhik-learning-mfg, discounted-stationary-mfg, gradient-play-stability, master-equation-and-rational-expectations]
source: "Claude conversation: MFG without rational expectations, et al (2026-08)"
---

## Article

Adaptive learning is macroeconomics' answer to the question "how could agents come to have rational expectations?" Standard references: Marcet–Sargent (*J. Econ. Theory* 1989) and Evans–Honkapohja, *Learning and Expectations in Macroeconomics* (Princeton, 2001).

### PLM, ALM and the T-map

Agents don't know the equilibrium law of motion. They posit a **perceived law of motion (PLM)** with parameter $\phi$ (e.g. a regression of prices on past data), act optimally given it, and update $\phi$ by **recursive least squares** as data arrive. Their behavior generates an **actual law of motion (ALM)**; write $T(\phi)$ for the parameter of the ALM, projected back onto the PLM class. A **rational expectations equilibrium (REE)** is a fixed point,
$$
T(\phi^*) = \phi^*.
$$

### The E-stability principle

Recursive least squares with decreasing gain is a stochastic approximation scheme. By Ljung's ODE method its asymptotics are governed by
$$
\frac{d\phi}{d\tau} = T(\phi) - \phi.
$$
An REE is **E-stable** if it is a locally asymptotically stable rest point of this ODE. The linearization is $DT(\phi^*) - I$, so the condition is
$$
\operatorname{spec} DT(\phi^*) \subset \{\operatorname{Re}\lambda < 1\},
$$
which for a scalar parameter is just $T'(\phi^*) < 1$. The **E-stability principle**: E-stability governs whether real-time least-squares learning converges locally to the REE.

E-stable equilibria form a subset of the REE, so E-stability is an **equilibrium selection** criterion. It has long been used to choose among multiple REE, including sunspot and indeterminate equilibria. It is the macro counterpart of asking that a Nash equilibrium be stable under a learning flow ([gradient play](#/note/gradient-play-stability)).

### Fictitious time lives in the proof

The ODE has an auxiliary time $\tau$, but it is a device in the *proof*, not in the *model*: agents live one history. With a gain of $1/t$, e.g. $\dot{\hat p}_t = \frac1t (p_t - \hat p_t)$, the substitution $\tau = \log t$ gives exactly
$$
\frac{d\hat p}{d\tau} = t\,\frac{d\hat p}{dt} = p_t - \hat p_t,
$$
so $\tau$ is a reparametrization of calendar time. Fictitious play in MFG puts the same fictitious time into the *model* as replays. That is the whole difference, and it is a modeling choice.

A consequence: if convergence in $\tau$ is exponential at rate $1 - \max \operatorname{Re}\lambda(DT)$, then in calendar time it is only **polynomial**, $|\hat p_t - \phi^*| \sim t^{-(1-\max\operatorname{Re}\lambda)}$. For example, with $T(p) = 0.5 - 0.8p$ the error decays like $t^{-1.8}$. Slow learning is intrinsic to the $1/t$ gain.

### Decreasing vs. constant gain

With **constant gain**, $\dot{\hat p} = \kappa(p - \hat p)$ (adaptive expectations), agents never stop learning, so you should not expect convergence even when E-stability holds. Cho–Williams–Sargent, "Escaping Nash inflation" (*Rev. Econ. Stud.* 2002), show that rare sequences of shocks repeatedly push the system far from the stable equilibrium, with an escape rate governed by a large-deviations rate function. The invariant distribution concentrates near the E-stable point, but sample paths don't settle there. So "stable under learning" and "where the economy spends its time" can differ. For a convergence theorem, use $1/t$. To explain data, constant gain is the interesting case.

### Related frameworks

- **Temporary equilibrium** (Grandmont, *Econometrica* 1977): markets clear each period given point forecasts formed from past data, forecasts are revised, and no intertemporal fixed point is imposed.
- **Growth with learning:** the chat cited Evans–Honkapohja–Romer, "Growth cycles" (*AER* 1998), as an endogenous growth model where adaptive learning makes the economy switch between growth regimes (details unverified).
- **Anticipated utility** (Kreps) supplies the decision rule: optimize over the lifetime as if current beliefs were permanent. See [Learning in calendar time](#/note/learning-without-replays).

## Cards

Q: Define PLM, ALM, the T-map and a rational expectations equilibrium in adaptive learning.
A: Agents hold a perceived law of motion with parameter $\phi$ and act on it. Their actions generate an actual law of motion, with parameter $T(\phi)$. An REE is a fixed point $T(\phi^*) = \phi^*$.
See: PLM, ALM and the T-map

Q: What is the E-stability condition at an REE $\phi^*$?
A: $\phi^*$ is asymptotically stable for $d\phi/d\tau = T(\phi) - \phi$, i.e. $\operatorname{spec} DT(\phi^*) \subset \{\operatorname{Re}\lambda < 1\}$. In the scalar case, $T'(\phi^*) < 1$.
See: The E-stability principle

Q: Why does the ODE $d\phi/d\tau = T(\phi) - \phi$ govern real-time least-squares learning?
A: Decreasing-gain recursive least squares is a stochastic approximation algorithm, and Ljung's ODE method says its asymptotic behavior follows the mean ODE.
See: The E-stability principle

Q: With learning rule $\dot{\hat p} = \frac1t (p - \hat p)$, why is the E-stability time "not fictitious"?
A: Setting $\tau = \log t$ gives exactly $d\hat p/d\tau = p - \hat p$. The ODE time is a reparametrization of calendar time along one history, not a count of replays.
See: Fictitious time lives in the proof

Q: Under $1/t$-gain learning, how fast does an E-stable equilibrium attract in calendar time?
A: Only polynomially: like $t^{-(1-\max\operatorname{Re}\lambda)}$ with $\lambda$ the eigenvalues of $DT$, since exponential decay in $\tau = \log t$ is a power of $t$.
See: Fictitious time lives in the proof

Q: Constant-gain vs. decreasing-gain learning: what changes?
A: Decreasing gain can converge (governed by E-stability). Constant gain never stops learning: rare shock sequences repeatedly push the system away from the stable point, with escape rates from large deviations (Cho–Williams–Sargent).
See: Decreasing vs. constant gain

Q: How is E-stability like the "stable Nash equilibrium" refinement in games?
A: Both keep only the equilibria that are attractors of a learning vector field, here $T(\phi) - \phi$. E-stability has long been used to select among multiple (including sunspot) REE.
See: The E-stability principle

Q: What is Grandmont's **temporary equilibrium**?
A: Markets clear each period given forecasts formed from past data; forecasts are then revised. No intertemporal fixed point (rational expectations) is imposed.
See: Related frameworks

## Quiz

Q: The E-stability ODE is $\dot\phi = T(\phi) - \phi$. Which condition on $DT(\phi^*)$ makes $\phi^*$ E-stable?
- [ ] all eigenvalues have $\operatorname{Re}\lambda < 0$
- [x] all eigenvalues have $\operatorname{Re}\lambda < 1$
- [ ] all eigenvalues have $|\lambda| < 1$
- [ ] $DT(\phi^*)$ is symmetric negative definite
E: The linearization is $DT - I$, which is Hurwitz iff every eigenvalue of $DT$ has real part below $1$. $|\lambda|<1$ is the condition for the discrete iteration $\phi \mapsto T(\phi)$, a different scheme.
See: The E-stability principle

Q: Under constant-gain learning near an E-stable equilibrium, one should expect…
- [ ] convergence at rate $t^{-1}$
- [ ] convergence, but more slowly than with $1/t$ gain
- [x] no convergence: recurrent escapes driven by rare shocks, with the invariant law concentrated near the equilibrium
- [ ] divergence to infinity
E: This is the "Escaping Nash inflation" phenomenon. The escape rate is governed by a large-deviations rate function.
See: Decreasing vs. constant gain

Q: Learning rule $\dot{\hat p} = (T(\hat p) - \hat p)/t$ with $T(p) = 0.5 - 0.8p$. How does $|\hat p_t - p^*|$ decay?
- [ ] like $e^{-1.8t}$
- [x] like $t^{-1.8}$
- [ ] like $t^{-0.8}$
- [ ] like $t^{-1/2}$
E: In $\tau = \log t$ the error decays like $e^{-(1 - T')\tau} = e^{-1.8\tau} = t^{-1.8}$.
See: Fictitious time lives in the proof
