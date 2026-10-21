---
title: Adaptive therapy as optimal control
tags: [cancer, optimal-control, pontryagin, lotka-volterra, drug-resistance]
created: 2026-07-22
related: [pre-existing-resistance, cancer-somatic-evolution, mathematical-oncology-landscape, replicator-lotka-volterra, adaptive-therapy-trials-evidence, field-open-questions, chemotherapy-optimal-control-origins, kill-laws-and-scheduling-principles, immunotherapy-optimal-control]
source: "Claude conversation: Daily evolutionary game theory course (2026-07)"
---

## Article

**Adaptive therapy** (proposed by Gatenby and colleagues) deliberately does *not* maximize the kill rate. It keeps a population of drug-sensitive cells alive so that they competitively suppress the resistant ones. Here is the standard toy model and what can actually be proved in it.

### The model

Let $n_S, n_R$ be the sensitive and resistant populations, $n = n_S + n_R$, and let $u(t) \in [0,1]$ be the dose, with $u = 1$ the maximum tolerated dose (MTD). Then
$$
\dot n_S = n_S\big(r_S - \delta u - \beta n\big), \qquad \dot n_R = n_R\big(r_R - \beta n\big).
$$
Here $r_i = b_i - d_i$ are net growth rates, $\delta$ is the extra death rate of sensitive cells at full dose, and $\beta$ is the strength of competition for shared resources. Alone, type $i$ has carrying capacity $K_i = r_i/\beta$. A **cost of resistance** means $r_R < r_S$. This is a competitive Lotka–Volterra system in which both types feel the same total burden $n$.

### Two identities

Subtracting the per-capita rates eliminates the competition term:
$$
\frac{d}{dt}\ln\frac{n_R}{n_S} = (r_R - r_S) + \delta u .
$$
So the **composition** is driven by the dose alone. Drug pushes it toward resistance. Treatment holidays ($u = 0$) push it back toward sensitivity, provided resistance is costly.

The resistant cells never see the drug directly:
$$
\frac{d}{dt}\ln n_R = r_R - \beta n .
$$
**The only lever on $n_R$ is the total burden $n$**, that is, how many sensitive cells you leave alive. If $\beta = 0$ there is no lever, and adaptive therapy loses its rationale.

### Why maximum dose backfires

MTD ($u \equiv 1$) greedily minimizes the instantaneous burden. If $r_S - \delta < 0$, $n_S \to 0$, $n$ drops, and $n_R$ grows at nearly its full rate $r_R$. This is **competitive release**: killing the sensitive cells frees their share of the carrying capacity for the resistant clone. The tumor relapses fully resistant. The relapse time is set by the resistant population at the moment of clearance (see [pre-existing resistance](#/note/pre-existing-resistance)) and by $r_R$.

The chat claimed that MTD is *optimal* for objectives like $\min \int_0^T n\,dt$. That is not justified in general, since $\int n$ also counts the resistant regrowth that MTD accelerates. MTD is the myopic choice, not a proven optimum.

### Time to failure, and a provable bound

A better objective is the **time to treatment failure**: maximize $T(u) = \inf\{t : n(t) > n_{crit}\}$. Suppose $n_{crit} < K_R = r_R/\beta$. While the constraint holds, $\dot n_R \ge n_R(r_R - \beta n_{crit}) > 0$, and failure is unavoidable once $n_R$ alone reaches $n_{crit}$. Hence every dosing policy satisfies
$$
T \;\le\; \frac{1}{r_R - \beta n_{crit}}\,\ln\frac{n_{crit}}{n_R(0)} .
$$
The bound is nearly attained by **containment**. Let the tumor grow to $n_{crit}$, then dose to hold $n \equiv n_{crit}$, which requires
$$
u = \frac{n_S(r_S - \beta n_{crit}) + n_R(r_R - \beta n_{crit})}{\delta\, n_S}.
$$
This keeps resistant growth at its slowest possible rate. It fails when the required $u$ exceeds $1$, shortly before $n_R = n_{crit}$. Containment **slows but cannot stop** resistant growth in this regime.

A numerical illustration with made-up parameters (not from the literature): $r_S = 0.3$, $r_R = 0.2$, $\beta = 10^{-3}$, $\delta = 1$, $n_{crit} = 100$, starting from $(n_S, n_R) = (90, 1)$. Failure times: MTD $\approx 27$, on/off (stop at half the initial size, resume at the initial size) $\approx 34.5$, containment $\approx 45$. The bound is $\approx 46.1$.

If instead $n_{crit} \ge K_R$ and $0 \le r_S - r_R \le \delta$, the dose $u = (r_S - r_R)/\delta$ with $n = K_R$ makes both populations stationary, so the model tumor can be held indefinitely. Only in this regime can therapy hold $\dot n_R = 0$, as the chat's "singular arc" story described. The general version of "containment maximizes time to failure" is the comparison theorem of Viossat and Noble (2021), in [containment theorems](#/note/tumour-containment-theory).

### Pontryagin structure

With costates $\lambda_S, \lambda_R$,
$$
H = \lambda_S n_S(r_S - \delta u - \beta n) + \lambda_R n_R(r_R - \beta n),
$$
$$
\dot\lambda_S = -\lambda_S(r_S - \delta u - \beta n - \beta n_S) + \beta\lambda_R n_R, \qquad
\dot\lambda_R = -\lambda_R(r_R - \beta n - \beta n_R) + \beta\lambda_S n_S .
$$
The cross terms come from each population entering the other's competition term. $H$ is **linear in $u$**, with switching function $\varphi = \partial H/\partial u = -\delta\lambda_S n_S$. Maximizing $H$ gives $u^* = 1$ where $\varphi > 0$ and $u^* = 0$ where $\varphi < 0$: **bang-bang**. If $\varphi \equiv 0$ on an interval, the arc is **singular**, and $u$ is found by differentiating $\varphi$ until $u$ appears (generalized Legendre–Clebsch conditions). With the state constraint $n \le n_{crit}$ there are also **boundary arcs** $n \equiv n_{crit}$, on which $u$ is the containment dose above.

### Clinical status

The best-known trial is Zhang et al. (2017), a small pilot study in metastatic castration-resistant prostate cancer with abiraterone. It used an on/off rule: stop dosing once PSA fell substantially (about 50% from baseline), and resume when it returned to baseline. The trial, its 2022 update and the critiques are in [the trials note](#/note/adaptive-therapy-trials-evidence). The on/off design is a feedback heuristic, so it is **not evidence** that the Pontryagin solution is bang-bang. Patient parameters ($r_S, r_R, \beta, \delta$) are hard to estimate, so the model gives qualitative structure rather than patient-specific switching times. Adaptive therapy is active research, not settled protocol.

## Cards

Q: In the sensitive/resistant competition model with dose $u$, how does the drug affect the resistant population?
A: Only indirectly, through the shared competition term: $\frac{d}{dt}\ln n_R = r_R - \beta n$. The dose changes $n_S$ and hence the total burden $n$.
See: Two identities

Q: In the model $\dot n_S = n_S(r_S - \delta u - \beta n)$, $\dot n_R = n_R(r_R - \beta n)$, what is $\frac{d}{dt}\ln(n_R/n_S)$, and what does it say?
A: $(r_R - r_S) + \delta u$. The competition term cancels, so the dose alone drives the composition: drug favors resistance, and holidays favor sensitivity if resistance is costly ($r_R < r_S$).
See: Two identities

Q: What is **competitive release**, and why does maximum-dose therapy risk it?
A: Killing the sensitive cells frees the carrying capacity they occupied, so the resistant clone grows at nearly its full rate $r_R$. MTD clears the sensitive cells fastest and therefore releases the resistant cells soonest.
See: Why maximum dose backfires

Q: Why does adaptive therapy require competition ($\beta > 0$) between sensitive and resistant cells?
A: Without it, $\dot n_R = r_R n_R$ regardless of the dose or of $n_S$. Keeping sensitive cells alive then only adds burden and gives no control over the resistant clone.
See: Two identities

Q: If $n_{crit} < r_R/\beta$, what upper bound holds on the time to failure, and which policy nearly attains it?
A: $T \le \frac{1}{r_R - \beta n_{crit}}\ln\frac{n_{crit}}{n_R(0)}$, since $n_R$ grows at least at rate $r_R - \beta n_{crit}$ while $n \le n_{crit}$. Containment (holding $n \equiv n_{crit}$) nearly attains it.
See: Time to failure, and a provable bound

Q: When can the competition model hold the tumor forever?
A: When $n_{crit} \ge K_R = r_R/\beta$ and $0 \le r_S - r_R \le \delta$. With $n = K_R$ and $u = (r_S - r_R)/\delta$ both populations are stationary. Otherwise containment only slows resistant growth.
See: Time to failure, and a provable bound

Q: Why does Pontryagin's principle give bang-bang or singular dosing in the S/R model?
A: The dose enters only through $-\delta u$ in $\dot n_S$, so $H$ is linear in $u$. Then $u^*$ is set by the sign of the switching function $\varphi = -\delta\lambda_S n_S$; if $\varphi \equiv 0$ on an interval, the arc is singular.
See: Pontryagin structure

Q: With the state constraint $n \le n_{crit}$, what besides bang-bang and singular arcs can appear in the optimal dosing?
A: Boundary arcs $n \equiv n_{crit}$, on which the dose is whatever keeps the burden on the constraint. This is the containment strategy.
See: Pontryagin structure

## Quiz

Q: In the regime $n_{crit} < r_R/\beta$, holding the burden at $n \equiv n_{crit}$ (containment)…
- [x] slows resistant growth to rate $r_R - \beta n_{crit}$ but cannot stop it
- [ ] holds the resistant population exactly constant
- [ ] eliminates the resistant population if held long enough
- [ ] makes the resistant population grow faster than under MTD
E: $\frac{d}{dt}\ln n_R = r_R - \beta n \ge r_R - \beta n_{crit} > 0$. Stopping resistant growth needs $n \ge K_R = r_R/\beta$, which the constraint forbids.
See: Time to failure, and a provable bound

Q: With $H = \lambda_S n_S(r_S - \delta u - \beta n) + \lambda_R n_R(r_R - \beta n)$ maximized over $u \in [0,1]$, on an interval where $\lambda_S < 0$ and $n_S > 0$ the optimal dose is…
- [x] $u^* = 1$
- [ ] $u^* = 0$
- [ ] singular, determined by higher derivatives of the switching function
- [ ] $u^* = 1/2$
E: $\varphi = \partial H/\partial u = -\delta\lambda_S n_S > 0$, and $H$ is maximized at $u = 1$. A singular arc needs $\varphi \equiv 0$ on an interval.
See: Pontryagin structure

Q: An adaptive-therapy trial used on/off dosing. What does this show about the optimal control problem?
- [x] Nothing directly: the on/off rule was a design choice, not a computed Pontryagin solution
- [ ] It confirms that the optimal control is bang-bang
- [ ] It shows that singular arcs never occur
- [ ] It shows that $\beta = 0$ in patients
E: The protocol is a feedback heuristic based on a tumor marker. The theory predicts bang-bang, singular or boundary arcs, but the trial design does not test that prediction.
See: Clinical status
