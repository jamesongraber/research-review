---
title: "Computing optimal schedules: direct, indirect, HJB and learning"
tags: [cancer, optimal-control, hjb, numerical-methods, gamma-convergence]
created: 2026-10-21
related: [bang-bang-singular-metronomic, anti-angiogenic-optimal-control, drug-induced-resistance-control, radiotherapy-fractionation-control, adaptive-therapy-dynamic-programming, pouchol-optimal-control-ide, control-of-evolving-populations, transformer-training-as-control]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

Almost every therapy-scheduling paper ends in a computation, and the choice of method decides what kind of statement comes out: an open-loop schedule from one initial condition, or a feedback law on a whole region of state space.

### Pontryagin versus dynamic programming

The Pontryagin maximum principle gives **necessary** conditions along a single trajectory. It is cheap, it scales to many state variables, and it reveals structure (bang, singular, boundary arcs), but its solutions are local and open-loop. The HJB equation gives the **value function** on the whole state space, hence a globally optimal feedback law, at the cost of a grid — the curse of dimensionality.

Gluzman, Scott and Vladimirsky (2020) show why this matters in practice rather than in principle. On their three-strategy tumour game, the value function is non-smooth (there are switching curves and "incurable" regions where no policy recovers), and Pontryagin shooting from one initial state converged to **two** locally optimal trajectories, one of them clearly inferior. Their argument for dynamic programming is exactly that: with a non-smooth value function, local necessary conditions do not identify the optimum.

### Direct transcription

Direct methods discretise first and optimise second: the schedule becomes a finite-dimensional vector and the state equations become equality constraints in a nonlinear program. Engelhart, Lebiedz and Sager (2011) used direct **multiple shooting** across four ODE therapy models and several objectives; Cunningham et al. (2018) solved abiraterone scheduling as a constrained nonlinear optimisation. Direct methods handle state constraints comfortably and need no costate guess, but they return a discretised control and no certificate about its structure.

### Indirect methods and the forward–backward sweep

The standard indirect method for these models is the **forward–backward sweep** (FBSM), a fixed-point iteration on the control. Given $u_k$: solve the state equation forwards, solve the costate equation backwards, and set
$$
u_{k+1} = (1-\omega)\,u_k + \omega\,\Theta(u_k), \qquad \Theta(u) = \arg\min_{v} H\big(x[u],\lambda[u],v\big),
$$
with damping $\omega\in(0,1]$. Nothing makes $\Theta$ a contraction, and Sharp et al. (2019) report, on an acute myeloid leukaemia model, that convergence depends on the update rule. Sharp, Burrage and Simpson (2021) therefore treat the sweep explicitly as a fixed-point problem and apply **Wegstein**, **Aitken–Steffensen** and **Anderson acceleration** to it, with released code. This is a pleasant translation: the whole convergence question becomes one about accelerating a fixed-point map, not about optimal control.

Olivier and Pouchol (2019) add the other standard trick, **homotopy**. In the phenotype-structured chemotherapy problem with epimutation diffusion, direct transcription alone fails; they solve a decoupled, constraint-free sub-problem exactly with an infinite-dimensional Pontryagin principle (bang-bang, at most one switch per control) and use that as the seed for a continuation in the model parameters, carried out in AMPL/IPOPT. The analysis supplies the initial guess that the solver cannot find by itself.

### HJB on grids

Gluzman et al. (2020) discretise a first-order HJB equation on the two-dimensional simplex with a semi-Lagrangian scheme (about $3.8\times 10^7$ mesh points) and solve it by Gauss–Seidel **fast sweeping** (62 sweeps to a $10^{-5}$ residual). Because the Hamiltonian is affine in the dose, the resulting feedback is bang-bang with explicit switching curves; in their example the optimal policy costs $2.25$ against $5.45$ for MTD. Wang, Scott and Vladimirsky (2024) extend this to a **stochastic** problem: replicator SDEs, the objective being the probability of success within a drug budget, giving a degenerate second-order HJB in three variables $(q,p,s)$ that is parabolic only in the budget $s$ — one solve returns policies for every budget threshold at once, raising success from about 50 % to 63.7 % in their example. Both papers flag dimensionality as the limit and suggest sparse grids, tensor methods or neural networks beyond two or three subpopulations.

### Robustness over parameters, and explicit formulas

Scagliotti et al. (arXiv 2503.08927; Bull. Math. Biol. 2026) ask for one open-loop control that works for a *distribution* of parameters: the **ensemble** cost $J(u) = \int_\Theta\int_0^T \ell(N^\theta_u(t))\,dt\,d\mu(\theta)$. They prove existence of a minimizer by weak-$L^2$ compactness (the control-affine structure being essential) and $\Gamma$-convergence as empirical measures $\mu_k \rightharpoonup^* \mu$, which is what justifies replacing the parameter distribution by a finite sample; the gradient comes from a backward adjoint and is used in a projected-gradient scheme. Martina-Perez et al. (2025) go the other way and obtain an explicit formula for $u^*$ in a multi-population, multi-drug model with synergy terms whenever the relevant Hessian block is invertible, solving the remaining boundary-value problem by collocation. Gallagher et al. (2024) train a deep reinforcement-learning policy on a calibrated prostate Lotka–Volterra model and report an interpretable single-threshold policy; the details of that paper were not verified for this survey.

### What actually limits these computations

Not the solvers. Two things dominate. First, the **objective functional**: terminal burden, integral burden, time to failure, probability of success within a budget, or distance to a target equilibrium give different optima on the same model, and no verified work settles which is clinically right. Second, **identifiability**: the parameters that decide the structure — the competition coefficient, the induced-resistance rate, the cost of resistance — are the ones least constrained by data. Ensemble control and chance-constrained design answer this by averaging; identifiability-aware control, which would choose doses partly because they are informative, does not yet exist in this literature.

## Cards

Q: What does Pontryagin's principle give that dynamic programming does not, and conversely?
A: PMP gives cheap, structure-revealing necessary conditions along one trajectory (open-loop, local). HJB gives a globally optimal feedback law on the whole state space, at the cost of a grid and the curse of dimensionality.
See: Pontryagin versus dynamic programming

Q: What concrete evidence do Gluzman, Scott and Vladimirsky give for preferring HJB over Pontryagin shooting?
A: On their tumour game the value function is non-smooth, and shooting from one initial state produced two locally optimal trajectories, one clearly inferior — local necessary conditions did not identify the optimum.
See: Pontryagin versus dynamic programming

Q: Write the forward–backward sweep as a fixed-point iteration, and say what is not guaranteed.
A: $u_{k+1} = (1-\omega)u_k + \omega\Theta(u_k)$ with $\Theta(u) = \arg\min_v H(x[u],\lambda[u],v)$, the state solved forwards and the costate backwards. Nothing makes $\Theta$ a contraction, so convergence is not guaranteed.
See: Indirect methods and the forward–backward sweep

Q: Which accelerations did Sharp, Burrage and Simpson (2021) bring to the forward–backward sweep, and why is this the natural framing?
A: Wegstein, Aitken–Steffensen and Anderson acceleration — because the sweep is a fixed-point map, so its convergence is a fixed-point acceleration problem rather than an optimal-control problem.
See: Indirect methods and the forward–backward sweep

Q: How did Olivier and Pouchol (2019) make a direct method work on a phenotype-structured chemotherapy problem?
A: They solved a decoupled, constraint-free sub-problem exactly with an infinite-dimensional Pontryagin principle (bang-bang, at most one switch per control) and used it as the seed for a homotopy continuation in the model parameters.
See: Indirect methods and the forward–backward sweep

Q: Why is the HJB feedback in Gluzman et al. (2020) bang-bang, and how was the equation solved?
A: The Hamiltonian is affine in the dose, so the minimizer is at an endpoint, with explicit switching curves. The equation was discretised semi-Lagrangian on the simplex and solved by Gauss–Seidel fast sweeping.
See: HJB on grids

Q: In Wang et al. (2024), which variable makes the HJB equation parabolic, and what is the practical payoff?
A: The remaining drug budget $s$ (the objective is the probability of success within budget). One solve therefore returns the optimal policy for every budget threshold at once.
See: HJB on grids

Q: In ensemble optimal control, what does $\Gamma$-convergence buy you?
A: It justifies replacing the parameter distribution $\mu$ by a finite empirical sample: minimizers of the sampled problems converge to minimizers of the ensemble problem as $\mu_k\rightharpoonup^*\mu$ (Scagliotti et al.).
See: Robustness over parameters, and explicit formulas

Q: What are the two real bottlenecks in computing optimal cancer therapy schedules?
A: The choice of objective functional (terminal versus integral burden versus time to failure versus probability of success) and the identifiability of the parameters that decide the structure. Not the numerical solvers.
See: What actually limits these computations

## Quiz

Q: A model has a non-smooth value function with several locally optimal schedules. Which approach is most likely to return the true optimum?
- [x] solving the HJB equation on a grid for the feedback law
- [ ] Pontryagin shooting from several initial costate guesses
- [ ] direct multiple shooting with a fine time grid
- [ ] a forward–backward sweep with Anderson acceleration
E: PMP-based methods — shooting, transcription, sweeps — all return extremals satisfying necessary conditions, and with a non-smooth value function there can be several. Dynamic programming computes the global value directly. This was Gluzman et al.'s explicit argument.
See: Pontryagin versus dynamic programming

Q: The forward–backward sweep is best understood as…
- [x] a fixed-point iteration on the control, whose convergence can be accelerated by Wegstein or Anderson methods
- [ ] a gradient descent on the objective, with the costate giving the gradient
- [ ] a semi-Lagrangian discretisation of the HJB equation
- [ ] a nonlinear program in the discretised control
E: Each sweep maps a control to the minimizer of the Hamiltonian along the resulting state and costate; it is a fixed-point map with no contraction guarantee, which is why damping and acceleration are needed. The last two options describe HJB grid methods and direct transcription.
See: Indirect methods and the forward–backward sweep

Q: Why is the control-affine structure essential in Scagliotti et al.'s ensemble existence proof?
- [x] it gives weak-$L^2$ compactness of the admissible controls together with convergence of the states, so the cost is weakly lower semicontinuous
- [ ] it makes the optimal control bang-bang, hence a finite-dimensional object
- [ ] it makes the ensemble cost convex in the control
- [ ] it allows the adjoint equation to be solved in closed form
E: Affineness in $u$ is what lets a weakly convergent sequence of controls pass to the limit in the state equation; existence then follows from compactness, not from convexity of the cost or from bang-bang structure (their remark notes singular arcs remain possible).
See: Robustness over parameters, and explicit formulas
