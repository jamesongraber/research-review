---
title: "Adaptive therapy by dynamic programming: HJB on the simplex"
tags: [cancer, hjb, dynamic-programming, adaptive-therapy, viscosity-solutions]
created: 2026-10-21
related: [adaptive-therapy-control, adaptive-therapy-origins, tumour-containment-theory, multidrug-adaptive-scheduling, cancer-public-goods-games, bang-bang-singular-metronomic, mean-field-games-in-oncology, numerical-optimal-control-methods, replicator-dynamics, hj-wasserstein-applications]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

The Pontryagin picture of adaptive therapy is in [adaptive therapy as optimal control](#/note/adaptive-therapy-control). This note is the **feedback** picture: solve a Hamilton–Jacobi–Bellman equation on the state space and read the dose off the gradient of the value function.

### The game and the reduced state

Gluzman, Scott and Vladimirsky (2020, *Proc. R. Soc. B* 287:20192454) take the Kaznatcheev et al. (2017) three-strategy "double goods" game — glycolytic (GLY), vascular-overproducer (VOP) and defector (DEF) cells, see [public-goods games in tumours](#/note/cancer-public-goods-games) — and reduce the simplex to two coordinates, $q = x_V/(x_V+x_D)$ (the VOP share among aerobic cells) and $p = x_G$ (the glycolytic fraction):
$$
\dot q = q(1-q)\Big[\frac{b_v}{n+1}\sum_{k=0}^{n} p^{k} - c\Big], \qquad
\dot p = p(1-p)\Big[\frac{b_a}{n+1} - (b_v-c)\,q - d(t)\Big],
$$
with the GLY-targeting dose $d(t)\in[0,d_{\max}]$. In the heterogeneous regime $b_a/(n+1) < b_v-c < cn$ the untreated system cycles. The process stops on the terminal set $\Delta = \{p<r_b\}\cup\{p>1-f_b\}$: recovery or failure.

### The HJB equation and why the control is bang-bang

The cost of a policy is
$$
J = \int_0^T\big(d(s)+\sigma\big)\,ds + g\big(q(T),p(T)\big),
$$
with $T$ the hitting time of $\Delta$, $g=0$ on recovery and $g=+\infty$ on failure. The time penalty $\sigma>0$ is not cosmetic: minimising drug alone has an infimum that is not attained. The value function $u$ solves
$$
\min_{d\in[0,d_{\max}]}\Big\{\nabla u\cdot\big(\dot q,\dot p\big) + d + \sigma\Big\} = 0 \quad\text{on } [0,1]^2\setminus\Delta,
\qquad u=0 \text{ on } \{p<r_b\},\quad u=+\infty \text{ on } \{p>1-f_b\} .
$$
This is a first-order exit-time HJB with $+\infty$ boundary data on the failure set. The dose enters the dynamics only through $-d\,p(1-p)$ in $\dot p$, so the bracket is **affine in $d$** with slope $1 - u_p\,p(1-p)$, and the minimiser is bang-bang:
$$
d^* = d_{\max} \iff 1 - u_p\,p(1-p) < 0, \qquad d^* = 0 \text{ otherwise}
$$
(their Eq. 17). Treat exactly when the marginal value of pushing $p$ down exceeds the marginal cost of drug. The resulting feedback is a partition of the square by **switching curves**, with several alternating on/off regimes along a single optimal trajectory.

### What the feedback law buys

With $b_a=2.5$, $b_v=2$, $c=1$, $n=4$, $d_{\max}=3$, $\sigma=0.01$, $r_b=f_b=10^{-1.5}$, starting from $(x_D,x_G,x_V)=(0.04,0.9,0.06)$: MTD recovers in total time $1.81$ at cost $5.45$, while the optimal policy takes total time $11.56$ (switching at $10.86$) at cost $2.25$ — far slower, far less drug. In a second parameter set ($b_a=4$, $d_{\max}=0.3$, $\sigma=0.03$) MTD produces a periodic trajectory, hence infinite cost, while an on/off policy still recovers: the set of **MTD-incurable** states is much larger than the set of states incurable under the optimal feedback. The computation is a first-order semi-Lagrangian discretisation on a triangular mesh solved by Gauss–Seidel fast sweeping.

### Pontryagin versus dynamic programming

This is the cleanest cautionary example in the field. The value function is **non-smooth**: there are shocklines across which $\nabla u$ jumps, and from a point on one (around $(x_D,x_G,x_V)\approx(0.417,0.311,0.272)$) two distinct optimal trajectories have the same cost $2.764$. Perturbing to $(0.35,0.3,0.35)$, the maximum principle returns either of two locally optimal extremals depending on the initial guess, one of them strictly inferior. PMP gives necessary conditions and open-loop trajectories; HJB gives a globally optimal feedback at the price of a grid. For a reader used to viscosity solutions the moral is familiar: non-uniqueness of extremals is exactly the shock structure of the value function, and rigorous existence/uniqueness for this state-constrained exit-time problem with $+\infty$ boundary data has not been written down.

### Threshold-awareness: a stochastic HJB

Wang, Scott and Vladimirsky (2024, *PLoS Comput. Biol.* 20:e1012165) replace the replicator ODE by a replicator **SDE**, $dX = a(X,d)\,dt + \Sigma(X,d)\,dW$, and change the objective from expected cost to a probability. With running cost $K = d+\delta$ and a remaining budget $s$ obeying $ds/dt = -K$, the value $v(\xi,\bar s) = \sup_{d(\cdot)}\mathbb{P}(J \le \bar s)$ solves
$$
\max_{d\in D}\Big\{-\frac{\partial v}{\partial s}K(\xi,d) + \nabla v\cdot a(\xi,d) + \tfrac12\sum_{i,j}\frac{\partial^2 v}{\partial\xi_i\partial\xi_j}B_{ij}(\xi,d)\Big\} = 0, \qquad B = \Sigma\Sigma^{\top},
$$
with $v=1$ on the success set, $v=0$ on the failure set and $v(\xi,0)=0$ elsewhere. It is a degenerate second-order equation in $(q,p,s)$, parabolic only through the budget variable, and one solve yields optimal policies for *all* thresholds at once. Being threshold-aware matters a lot: from $(0.27,0.4)$ the probability of succeeding within budget $\bar s=4.71$ rises from about 50 per cent under the deterministic-optimal policy to **63.7 per cent**; at $\bar s=4.35$ from under 10 per cent to 45.6 per cent. On the Carrère sensitive/resistant model from $(0.45,0.9)$: 50 per cent to 67.4 per cent at threshold 69.45.

### Closed-form HJB, and Pontryagin on the clinical model

Akhmetzhanov et al. (2019, *J. Theor. Biol.* 474:88–102) solve an HJB *analytically by characteristics*, for a reversible proliferative/quiescent two-state model with the objective of minimising the log fold change of tumour size at a six-month horizon. The solution has a switching curve and a **chattering** (singular) trajectory. Fold changes: MTD $2.13\times$, best static dose $1.48\times$, best periodic $1.30\times$, optimal control $1.24\times$. Notably the optimal schedule initially does *worse* than static dosing, which would trigger a RECIST-type stopping rule.

Cunningham et al. (2018, *J. Theor. Biol.* 459:67–78; 2020, *PLoS ONE* 15:e0243386) do the Pontryagin side on the clinical three-type prostate model of [the first trial](#/note/adaptive-therapy-origins): minimise $\int_0^{t_f}\lVert x(t)-x^*\rVert^2dt$ toward a chosen stable Lotka–Volterra equilibrium over $t_f=10^4$ days, under a **viability cap** of 9000 on the total burden, solved by the forward–backward sweep and then translated into titration rules. The result is that the optimal dose is usually a **monotone increasing titration** starting low, not an on/off cycle: of 10,000 virtual patients, MTD breached viability in 100 per cent (mean 667 time units), the trial's adaptive rule in 88.61 per cent (816), the best titration rule in only 34.45 per cent (1108), so **65.55 per cent were controlled to the end of the simulation versus 0 per cent under MTD**. Larger, sensitive-dominated tumours were easier to stabilise, suggesting that delaying the start helps.

### Viability: what can be controlled at all

Logically prior to optimising is asking what is reachable. Carrère and Zidani (2020, *Optim. Control Appl. Methods* 41:1678–1704) characterise, via a Hamilton–Jacobi approach with uncertainties treated as an adversary, the sets of initial states from which the population can be kept below a threshold or steered to a target — the viability/reachability viewpoint of Aubin–Frankowska–Zidani, the natural rigorous home for "containment". Thomsen and Dubbeldam (2025, arXiv:2503.07533) do it geometrically for a slow–fast population/trait model affine in the control: their Theorems 1.1–1.3 construct **explicit controllable sets** bounded by orbits and stable/unstable manifolds of the extremal vector fields $f(\cdot,a_\pm)$ and enclosing components of the equilibrium manifold, and Theorem 2 says every trajectory that cannot be cured converges to one of them. These are the rigorous version of the "incurable regions" that Gluzman et al. see numerically.

## Cards

Q: Why is the optimal dose in the Gluzman–Scott–Vladimirsky HJB bang-bang, and what is the switching criterion?
A: The dose enters only through $-d\,p(1-p)$ in $\dot p$, so the HJB bracket is affine in $d$ with slope $1-u_p p(1-p)$. Hence $d^*=d_{\max}$ iff $u_p\,p(1-p) > 1$, and $d^*=0$ otherwise.
See: The HJB equation and why the control is bang-bang

Q: Write the exit-time HJB of Gluzman et al. with its boundary data.
A: $\min_{d\in[0,d_{\max}]}\{\nabla u\cdot(\dot q,\dot p)+d+\sigma\}=0$ off the terminal set, with $u=0$ on the recovery set $\{p<r_b\}$ and $u=+\infty$ on the failure set $\{p>1-f_b\}$.
See: The HJB equation and why the control is bang-bang

Q: Why does the cost functional of Gluzman et al. need a strictly positive time penalty $\sigma$?
A: Minimising cumulative drug alone has an infimum that is not attained — one can always dose a little more slowly. The term $\sigma\,T$ makes the problem well posed.
See: The HJB equation and why the control is bang-bang

Q: What is the authors' argument for solving the HJB rather than the Pontryagin system in this problem?
A: The value function is non-smooth (shocklines, two trajectories of equal cost 2.764), and from a nearby state PMP returns either of two locally optimal extremals, one inferior. HJB gives a global feedback law.
See: Pontryagin versus dynamic programming

Q: In the Wang–Scott–Vladimirsky formulation, what is the objective and what makes the HJB parabolic?
A: Maximise $\mathbb{P}(J\le\bar s)$, the probability of success within a drug-plus-time budget. The remaining budget $s$ is a third state with $ds/dt = -K$, and the equation is parabolic in $s$ only — it is degenerate second-order in $(q,p)$.
See: Threshold-awareness: a stochastic HJB

Q: Quantitatively, what does threshold-awareness buy in Wang et al. (2024)?
A: On the game model from $(0.27,0.4)$, success within budget $\bar s=4.71$ rises from about 50 per cent (deterministic-optimal policy) to 63.7 per cent; at the tighter budget 4.35, from under 10 per cent to 45.6 per cent.
See: Threshold-awareness: a stochastic HJB

Q: Cunningham et al. (2020) solve a Pontryagin problem on the clinical prostate model. What is the objective, the constraint, and the surprising structure of the answer?
A: Minimise the time-integrated squared distance to a chosen stable equilibrium, subject to a viability cap on total burden. The optimum is usually a *monotone increasing dose titration*, not an on/off cycle.
See: Closed-form HJB, and Pontryagin on the clinical model

Q: What do controllable sets (Thomsen–Dubbeldam) and reachability value functions (Carrère–Zidani) contribute that an optimal-control solution does not?
A: They say which states can be controlled at all under a dose cap — the "incurable regions" — which is logically prior to optimising within the controllable ones.
See: Viability: what can be controlled at all

Q: What is odd, clinically, about the optimal schedule found by Akhmetzhanov et al. (2019)?
A: It initially performs *worse* than a static dose (fold change at six months $1.24\times$ optimal versus $1.48\times$ best static), so a RECIST-style early-progression rule would abandon it before the benefit appears.
See: Closed-form HJB, and Pontryagin on the clinical model

## Quiz

Q: In the Gluzman et al. HJB, the optimal dose is bang-bang because
- [x] the Hamiltonian is affine in $d$, since $d$ enters only linearly in $\dot p$ and in the running cost
- [ ] the value function is smooth
- [ ] the running cost is quadratic in $d$
- [ ] the terminal cost takes the value $+\infty$ on failure
E: Affine dependence on the control forces a corner minimiser, exactly as a linear-in-$u$ Hamiltonian forces bang-bang arcs under the maximum principle. A quadratic running cost would instead give an interior dose.
See: The HJB equation and why the control is bang-bang

Q: The $+\infty$ boundary datum on the failure set in Gluzman et al. encodes
- [x] a hard constraint: policies reaching failure are inadmissible
- [ ] a soft penalty tuned by $\sigma$
- [ ] the viability cap on total tumour burden
- [ ] the terminal time of the problem
E: Failure is treated as absolutely forbidden, so the value function blows up near it and the feedback is defined only on the complement; $\sigma$ is the separate time penalty that makes the drug-minimisation well posed.
See: The HJB equation and why the control is bang-bang

Q: Cunningham et al.'s in-silico comparison on 10,000 virtual patients found that
- [x] the best titration rule controlled 65.55 per cent to the end, against 0 per cent under MTD
- [ ] MTD and titration performed about equally
- [ ] the trial's adaptive rule outperformed titration
- [ ] no policy avoided breaching the viability cap
E: MTD breached viability in 100 per cent of cases, the trial's adaptive rule in 88.61 per cent, the best titration rule in 34.45 per cent. So the deployed rule is not optimal even for the model that motivated it.
See: Closed-form HJB, and Pontryagin on the clinical model

Q: Which pair correctly matches a method to what it delivers?
- [x] HJB: globally optimal state feedback; PMP: necessary conditions along open-loop extremals
- [ ] HJB: necessary conditions only; PMP: global optimality
- [ ] HJB: cheaper in high dimension; PMP: cursed by dimension
- [ ] Both deliver the same trajectories whenever the value function is non-smooth
E: HJB costs a grid, hence suffers the curse of dimensionality, but returns feedback and global optimality; PMP is cheap but can converge to inferior local extremals, which is exactly what happens here across a shockline.
See: Pontryagin versus dynamic programming
