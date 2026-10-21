---
title: "Optimal control of the phenotype-structured system (Pouchol et al.)"
tags: [cancer, optimal-control, lyapunov-functions, state-constraints, integro-differential-equations, pontryagin]
created: 2026-10-21
related: [lorz-clairambault-resistance-model, constrained-hj-uniqueness-regularity, selection-mutation-hamilton-jacobi, adaptive-therapy-control, bang-bang-singular-metronomic, drug-induced-resistance-control, numerical-optimal-control-methods, hj-wasserstein-applications, mean-field-games-in-oncology, control-of-evolving-populations, tumour-containment-theory]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

Pouchol, Clairambault, Lorz and Trélat (2018, J. Math. Pures Appl.) is the one place in the phenotype-structured literature where a nontrivial optimal-control theorem is proved on the infinite-dimensional (trait-structured) state. Its structure, induce concentration on a sensitive phenotype and then strike, is the PDE form of [adaptive therapy](#/note/adaptive-therapy-control). The proof is Pontryagin on a reduced ODE plus a Lyapunov concentration argument; dynamic programming on the IDE is untouched.

### The controlled system

Traits $x\in[0,1]$, masses $\rho_i=\int_0^1n_i$, a cytotoxic control $0\le u_1\le u_1^{max}$ and a cytostatic control $0\le u_2\le u_2^{max}$ [verbatim]:
$$
\partial_tn_H=R_H\,n_H,\quad \partial_tn_C=R_C\,n_C,\qquad
R_H=\frac{r_H(x)}{1+\alpha_Hu_2}-d_H(x)I_H-u_1\mu_H(x),\quad
R_C=\frac{r_C(x)}{1+\alpha_Cu_2}-d_C(x)I_C-u_1\mu_C(x),
$$
with linear competition $I_H=a_{HH}\rho_H+a_{HC}\rho_C$, $I_C=a_{CH}\rho_H+a_{CC}\rho_C$, $\alpha_H<\alpha_C$, $0<a_{HC}<a_{HH}$, $0<a_{CH}<a_{CC}$ (intraspecific competition dominates). There is no mutation term; the PDE version with epimutations is only discussed. The cytostatic drug divides proliferation, the cytotoxic one adds a trait-dependent death rate.

### Theorem 1: convergence and concentration under BV controls

For controls in $BV(0,\infty)$ with limits $(\bar u_1,\bar u_2)$, Lipschitz rates and positive continuous initial data, $(\rho_H,\rho_C)$ converges to an explicitly computable equilibrium and each $n_i$ concentrates on the maximisers of its limiting fitness (Dirac masses if these are unique). For constant controls the rate is $O((\ln t/t)^{1/2})$. The tool is the relative-entropy Lyapunov functional of Pouchol and Trélat (2018, J. Biol. Dyn.) for $N$ species $\partial_tn_i=(r_i(x)+d_i(x)\sum_ja_{ij}\rho_j)n_i$:
$$
V_i=\int m_i\Big[n_i^\infty\ln\frac1{n_i}+(n_i-n_i^\infty)\Big],\qquad m_i=\frac1{d_i},
$$
with $n_i^\infty$ any measure of mass $\rho_i^\infty$ supported on the fitness maximisers. If the coexistence state $A\rho^\infty+I^\infty=0$ has a positive solution and some positive diagonal $D$ makes $DA$ symmetric negative definite (for $N=2$: $\det A>0$, which the inequalities above guarantee), then $\rho^\infty$ is globally asymptotically stable with the same $(\ln t/t)^{1/2}$ rate, "nearly optimal" since $V$ itself cannot converge while $n_i$ concentrates. The derivative of $V=\sum\lambda_iV_i$ is a negative quadratic form in $\rho-\rho^\infty$ plus nonpositive terms. The authors state that mutation or advection terms "remain elusive" for this method, and that for general competitive coupling convergence is "completely open".

### The state-constrained problem

Minimise the cancer mass at a fixed horizon, $C_T(u_1,u_2)=\rho_C(T)$, over BV controls subject to
$$
\frac{\rho_H(t)}{\rho_H(t)+\rho_C(t)}\ge\theta_{HC},\qquad \rho_H(t)\ge\theta_H\,\rho_H(0),
$$
a proportion constraint and a healthy-cell floor, $0<\theta_{HC},\theta_H<1$. The horizon is fixed because $T\mapsto\inf\rho_C(T)$ is decreasing, so the free-time problem has no solution. Why constant high doses fail here: if $\mu_C$ vanishes near $x=1$, a constant maximal dose selects the fully resistant phenotype, against which the cytotoxic drug does nothing (Theorem 1 says where the population ends up).

### Theorem 2: a long low-dose phase, then a short strike

Define a two-phase control: on $(0,T-T_2)$ constant doses $(\bar u_1^{opt},\bar u_2^{opt})$ chosen so that both populations concentrate on sensitive phenotypes $(x_H^{opt},x_C^{opt})$; on $(T-T_2,T)$ the optimal control of the reduced two-dimensional ODE for $(\rho_H,\rho_C)$ with Dirac densities, which has at most three arcs: a boundary arc along the proportion constraint, a free arc with $u_1=u_1^{max}$, $u_2=u_2^{max}$, and a boundary arc along the floor with $u_2=u_2^{max}$. Under the technical conditions of the paper's Proposition 2 and for $T_2$ small, the theorem states that along a subsequence of horizons
$$
\lim_{T\to\infty}\Big(C_T(u_1,u_2)-\inf_{\mathcal B_T}C_T\Big)=0,
$$
"quasi-optimality" over the admissible class $\mathcal B_T$ of the theorem (read as the two-phase class with a constant first phase). The mechanism: once both populations sit on sensitive traits, maximal doses kill proportionally more cancer than healthy cells, so the ODE end-game is nearly optimal for the IDE. In the numerics ($\theta_{HC}=0.4$, $\theta_H=0.6$, $T=60$) the first phase has $u_1=0$ and $u_2$ nearly constant on a boundary arc, the strike reaches $\rho_C(60)\approx10^{-5}$, while a quasi-periodic drug-holiday protocol leaves $\rho_C\approx1$ and is called "far from being optimal".

### Why Pontryagin on an ODE and not HJB

The proof never writes a value function on $(n_H,n_C)$. It uses Theorem 1 to replace the IDE by the ODE in the first phase and the maximum principle with state constraints on the ODE in the second. This is characteristic of the field: an HJB equation on the infinite-dimensional state, a verification theorem, or even existence and a maximum principle for the state-constrained IDE problem, are absent. Olivier and Pouchol (2018) compute the problem numerically by direct methods with homotopy continuation. Almeida, Bagnerini, Fabrini, Hughes and Lorenzi (2019) solve the Gaussian model of [Lorenzi et al. (2016)](#/note/lorz-clairambault-resistance-model) exactly under time-dependent dose and find numerically that a continuous low dose is near-optimal for the average burden, a compatible conclusion. Compare the ODE results of the [control chapter](#/note/bang-bang-singular-metronomic), where metronomic arcs appear as singular controls.

### Open problems, as stated and as seen from HJ theory

Stated by the authors: convergence for general competitive systems; asymptotics of the PDE with epimutations even without control; whether optimal controls of that PDE converge to the IDE ones as the epimutation rates vanish; optimality of Dirac initial states beyond short times. From the reader's side: existence and a maximum principle for the state-constrained PDE problem; a dynamic-programming formulation on $\mathcal P([0,1])^2$ (see [HJ on Wasserstein space](#/note/hj-wasserstein-applications)); and control of the limiting constrained HJ system, where the dose enters $R(x,I,u)$ and the state is itself a viscosity solution. The clinician-versus-tumour structure is Stackelberg-like (the controller moves first, selection responds), but no paper formulates it as a game; see [mean field games in oncology](#/note/mean-field-games-in-oncology).

## Cards

Q: What is the Lyapunov functional behind convergence of the trait-structured Lotka–Volterra system, and what structural condition does it need?
A: $V=\sum\lambda_i\int m_i[n_i^\infty\ln(1/n_i)+(n_i-n_i^\infty)]$, $m_i=1/d_i$, a relative entropy with $n_i^\infty$ supported on the fitness maximisers; it needs a positive diagonal $D$ with $DA$ symmetric negative definite (for $N=2$, $\det A>0$).
See: Theorem 1: convergence and concentration under BV controls

Q: Why is the convergence rate $O((\ln t/t)^{1/2})$ in Pouchol–Trélat called nearly optimal?
A: The Lyapunov functional itself cannot converge, because $n_i$ concentrates to a Dirac and $\ln(1/n_i)$ blows up; only the masses converge.
See: Theorem 1: convergence and concentration under BV controls

Q: Why is the horizon $T$ fixed in the Pouchol et al. optimal control problem?
A: $T\mapsto\inf\rho_C(T)$ is decreasing, so the free-time problem has no solution.
See: The state-constrained problem

Q: Why does a constant maximal cytotoxic dose fail in the long run in the Pouchol et al. model?
A: If $\mu_C$ vanishes near $x=1$, Theorem 1 says the cancer population concentrates on the fully resistant trait, where the drug has no effect.
See: The state-constrained problem

Q: Describe the quasi-optimal two-phase control of Pouchol et al. (2018) and the sense in which it is optimal.
A: A long constant low-dose phase that concentrates both populations on sensitive traits, then a short phase that is the state-constrained ODE optimum (at most three arcs, with a maximal-dose free arc). Quasi-optimal: $C_T-\inf C_T\to0$ as $T\to\infty$ along a subsequence, within the theorem's admissible class.
See: Theorem 2: a long low-dose phase, then a short strike

Q: Why can the end-game be computed on a two-dimensional ODE?
A: After concentration both densities are Dirac masses, so the IDE reduces to the ODE for $(\rho_H,\rho_C)$, and maximal doses then kill proportionally more cancer than healthy cells.
See: Theorem 2: a long low-dose phase, then a short strike

Q: Which optimal-control tools are used in Pouchol et al. (2018), and which are absent?
A: Used: Pontryagin with state constraints on the reduced ODE, plus Lyapunov concentration. Absent: any HJB/value function on the infinite-dimensional state, a verification theorem, or existence and a maximum principle for the state-constrained IDE problem.
See: Why Pontryagin on an ODE and not HJB

Q: What do Pouchol et al. list as open about the PDE with epimutations?
A: Its asymptotics even without control, and whether its optimal controls converge to the IDE ones as the epimutation rates tend to zero.
See: Open problems, as stated and as seen from HJ theory

## Quiz

Q: For $N=2$ competitive species, the Pouchol–Trélat global stability condition reduces to…
- [x] $\det A>0$, i.e. intraspecific competition dominates interspecific
- [ ] $\operatorname{tr}A<0$
- [ ] $A$ symmetric
- [ ] $a_{HC}=a_{CH}$
E: One needs a positive diagonal $D$ with $DA$ symmetric negative definite; for $2\times2$ competitive matrices this is $\det A>0$, which $a_{HC}<a_{HH}$, $a_{CH}<a_{CC}$ give.
See: Theorem 1: convergence and concentration under BV controls

Q: The optimality statement of Theorem 2 in Pouchol et al. (2018) is…
- [x] quasi-optimality: the gap to the infimum tends to $0$ as $T\to\infty$ along a subsequence
- [ ] exact optimality for every finite $T$
- [ ] optimality among constant controls only
- [ ] optimality of the maximal tolerated dose
E: The two-phase control is shown to be asymptotically optimal for large horizons under technical conditions, not optimal for fixed $T$.
See: Theorem 2: a long low-dose phase, then a short strike

Q: In the second phase of the quasi-optimal control, the arcs are…
- [x] a boundary arc on the proportion constraint, a free arc at maximal doses, a boundary arc on the healthy-cell floor
- [ ] a singular arc at an intermediate dose throughout
- [ ] drug holidays alternating with maximal doses
- [ ] a single free arc with $u_1=u_2=0$
E: With concentrated sensitive populations the ODE optimum is bang-bang with state-constraint boundary arcs; the drug-holiday protocol is the one the authors call far from optimal.
See: Theorem 2: a long low-dose phase, then a short strike
