---
title: "Controlling evolution: stochastic control, monitoring and counterdiabatic driving"
tags: [cancer, stochastic-control, wright-fisher, counterdiabatic-driving, fokker-planck, partial-observation]
created: 2026-10-21
related: [mean-field-games-in-oncology, evolutionary-steering-collateral-sensitivity, adaptive-therapy-dynamic-programming, adaptive-therapy-control, pre-existing-resistance, cancer-somatic-evolution, field-open-questions, hj-wasserstein-applications, weak-kam-wasserstein, transformer-hjb-wasserstein, moran-fixation-probability, mathematical-oncology-landscape]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

A thread parallel to adaptive therapy, in the language of population genetics: treat an evolving population as a controlled stochastic process. It starts with a Bellman equation on a Wright–Fisher chain and ends with a control problem on a space of measures that nobody has written down.

### To control, one must monitor

Fischer, Vázquez-García and Mustonen (PNAS 2015) pose the warm-up problem. A bi-allelic population of fixed size $N$ evolves by Wright–Fisher resampling; allele $A$ has scaled selective advantage $\sigma=N(f_A-f_B)\gg1$ and will fix. The controller adds $u_t\in[-u_c,0]$ to the selection coefficient and wants to keep the polymorphism alive as long as possible. The cost-to-go $J(x,t)$ obeys the backward recursion $J(x_t,t)=\min_{u_t}\sum_{x'}J(x',t+1)\,W(x'\mid x_t;u_t)$ with absorbing data $J(0,t)=J(1,t)=T-t$. In the diffusion limit it is the HJB equation
$$
-\partial_\tau J=\min_{u}\;x(1-x)\Big[(\sigma+u)\,\partial_x+\tfrac12\,\partial_x^2\Big]J ,
$$
the generator of the Wright–Fisher diffusion with controlled drift. The control enters linearly, so the optimum is **bang-bang**: $u=0$ below a critical frequency $x_c$ and $u=-u_c$ above it, which makes the effective selection $\sigma+\bar u$ change sign at $x_c$. With strong selection the polymorphism survives for very long times.

### Playing to win versus playing not to lose

Now suppose $x$ is measured only every $\Delta$ generations. Applying the perfect-information feedback $\bar u(x_i)$ until the next measurement is wrong: it does not anticipate that $x$ will cross $x_c$ in between, so the population overshoots and fluctuations are amplified. The authors instead pre-compute a **pre-emptive** protocol: start with $u=0$ or $-u_c$, switch at a time $\tau_c(x_i,\Delta)$ to the neutral setting $u=-\sigma$, and park the population. As $\Delta$ grows the safe parking position moves from near the boundary towards $x=0.5$. Their slogan: under perfect information one plays to win; under sparse monitoring one plays not to lose. Nothing here uses POMDP theory; it is a numerical study of a finite-resolution observation.

### The cancer model and the risk-sensitive objective

Their minimal resistance model has sensitive and resistant cells $n_s,n_r$ with birth rates regulated by a carrying capacity $K$, mutation at rate $\mu_0$ between types, and drug-dependent death rates $D_i=n_i(1+F_i(u))$ with $F_s=uf_s$, $F_r=(1-u)f_r$, $u\in\{0,1\}$; a resistant cell with $f_r>g$ is **drug-addicted** and thrives only under treatment. The objective is the probability that no "driver" event (metastasis, rate $\nu_0$ per cell per generation) has occurred by $T$,
$$
\bar u_{0:T}=\arg\max_{u_{0:T}}\ \exp\Big(-\nu_0\sum_{t=0}^T(n_{st}+n_{rt})\Big),
$$
a nonlinear functional of the whole path, hence a **risk-sensitive** control problem; its recursion is $J(n_s,n_r,t)=e^{-\nu_0(n_s+n_r)}\max_{u\in\{0,1\}}\langle J(t+1;u)\rangle$. When only the total size $N$ is observed, an effective propagator conditioned on the last two observations and the last control makes the policy a function of $(N_{\tau-\Delta\tau},u_{\tau-\Delta\tau},N_\tau)$: keep the regimen while the tumour shrinks, switch at the first sign of reversal. That is a stochastic-control reading of Gatenby's on/off rule, and the stochastic sequel to the [two-population control model](#/note/adaptive-therapy-control).

### Predictability first

Lässig, Mustonen and Walczak (2017, *Nat Ecol Evol*) state the programme: control presupposes prediction, and evolution is predictable only where selection dominates drift and the landscape is known. Lässig and Mustonen (PNAS 2020) then set up "eco-evolutionary control" of pathogens with a payoff combining fitness, regulation cost and forecasting, and report an analytic optimal dose with an error-threshold phase diagram (abstract only; equations not checked).

### Counterdiabatic driving: control of a Fokker–Planck density

Iram et al. (*Nat Phys* 2021, with Scott and Hinczewski) control the **distribution** rather than the state. For $M$ genotypes with frequencies $x$, selection coefficients $s(\lambda(t))$ set by a control parameter $\lambda$ (drug concentration), fixed $N$ and mutation matrix $m$, the genotype-frequency distribution obeys a Wright–Fisher Fokker–Planck equation $\partial_tp=\mathcal L(\lambda(t))\,p$. For frozen $\lambda$ it relaxes to the instantaneous equilibrium $\rho(x;\lambda)$, $\mathcal L(\lambda)\rho=0$, the analogue of a ground state. Slow driving keeps $p$ on $\rho(x;\lambda(t))$ (an adiabatic theorem); finite-time driving makes $p$ lag. Counterdiabatic driving, imported from shortcuts to adiabaticity, replaces $\mathcal L$ by an operator $\tilde{\mathcal L}(\lambda,\dot\lambda)$ with
$$
\partial_t\rho(x;\lambda(t))=\tilde{\mathcal L}\big(\lambda,\dot\lambda\big)\,\rho(x;\lambda(t)),\qquad \tilde{\mathcal L}(\lambda,0)=\mathcal L(\lambda),
$$
so that the prescribed path $\rho(\cdot;\lambda(t))$ is an exact solution. In general this needs frequency-dependent selection, but in the frequent-mutation regime $\mu N\gg1$ they give the approximation
$$
\tilde s_i(\lambda,\dot\lambda)\approx s_i(\lambda)+\frac{d}{dt}\ln\frac{\bar x_i(\lambda(t))}{\bar x_M(\lambda(t))},\qquad i=1,\dots,M-1,
$$
with $\bar x(\lambda)$ the mean of $\rho(\cdot;\lambda)$. For two genotypes this is transparent: the Wright–Fisher drift is $x(1-x)s$, so moving the mean at speed $\dot{\bar x}$ needs extra drift $\dot{\bar x}$, i.e. extra selection $\dot{\bar x}/(\bar x(1-\bar x))=\frac{d}{dt}\ln\frac{\bar x}{1-\bar x}$ (this heuristic is not from the paper). The control is a transient overshoot of the drug concentration, and the KL divergence between $p$ and $\rho$ drops by orders of magnitude. On a 16-genotype pyrimethamine landscape with the dose capped at $10^{-2}$ M, the lag to the new equilibrium shrinks by 1210 generations (656 with a $5\times10^{-4}$ M cap). It is an inverse problem (prescribe the path, solve for the control), not an optimal one.

### Policies from data

Three descendants, all discrete: Beckman, Schemmann and Yeang (PNAS 2012) and Yeang and Beckman (2016) compare myopic with non-myopic multi-step "evolutionary control" strategies on branching models of resistance; Weaver, King, Maltas and Scott (PNAS 2024) learn drug-cycling policies by reinforcement learning on empirical landscapes under noisy, delayed and limited observation, approaching the optimal policy with up to 1024 genotypes; Chen, Pachter, Scott and Hinczewski (bioRxiv 2026, "SHEPHERD") combine Wright–Fisher dynamics with a Markov decision process beyond the strong-selection weak-mutation regime, beating every periodic one- or two-drug regimen on synthetic landscapes, since empirical data outside that regime do not exist. The steering question itself is in [evolutionary steering](#/note/evolutionary-steering-collateral-sensitivity). Carrère and Zidani (2020) add the one Hamilton–Jacobi treatment of **reachability under uncertainty** for a sensitive/resistant model, with parameter uncertainty as an adversarial input.

### The open formulation: control on a space of measures

Every item above is finite-state (Bellman on a chain, MDP) or an inverse problem. The natural continuum object is missing: a value function $V(t,p)$ on the probability measures over the genotype simplex, with the Wright–Fisher Fokker–Planck operator as dynamics and the drug as control,
$$
-\partial_tV(t,p)=\inf_{\lambda}\Big\{\ell(\lambda,p)+\Big\langle\frac{\delta V}{\delta p}(t,p),\ \mathcal L(\lambda)\,p\Big\rangle\Big\},
$$
which needs only the flat derivative because the dynamics are linear in $p$. Its Benamou–Brenier version asks for the cheapest path from $\rho(\cdot;\lambda_0)$ to $\rho(\cdot;\lambda_f)$ in time $t_f$, the optimal counterpart of counterdiabatic driving. No viscosity theory exists. It is the analogue of the [HJB on Wasserstein space](#/note/hj-wasserstein-applications) with the control acting through a bilinear term $\mathcal L(\lambda)p$ rather than a transport velocity; the ergodic version would be a [weak KAM](#/note/weak-kam-wasserstein) question on $\mathcal P(\Delta_{M-1})$, and the same structure, one parameter path steering a measure, appears in the [transformer HJB](#/note/transformer-hjb-wasserstein).

## Cards

Q: In Fischer, Vázquez-García and Mustonen (2015), why is the optimal control of the Wright–Fisher polymorphism bang-bang?
A: The control $u$ enters the HJB $-\partial_\tau J=\min_u x(1-x)[(\sigma+u)\partial_x+\frac12\partial_x^2]J$ linearly, through the drift only, so the minimum is at an endpoint of $[-u_c,0]$ and switches at a critical frequency $x_c$.
See: To control, one must monitor

Q: What does "playing to win versus playing not to lose" mean in Fischer et al. (2015)?
A: With continuous observation the optimal feedback is aggressive ($x_c$ near a boundary). With measurements only every $\Delta$ generations, the pre-emptive protocol parks the population near $x=0.5$, further from the boundaries as $\Delta$ grows.
See: Playing to win versus playing not to lose

Q: Why is the cancer objective of Fischer et al. (2015), $\max\exp(-\nu_0\sum_t(n_{st}+n_{rt}))$, called risk-sensitive?
A: It is a nonlinear (exponential) functional of the whole trajectory, the probability that no driver mutation has occurred by $T$, rather than an additive cost; its Bellman recursion carries the factor $e^{-\nu_0(n_s+n_r)}$.
See: The cancer model and the risk-sensitive objective

Q: What is counterdiabatic driving in the evolutionary setting of Iram et al. (2021)?
A: Replace the Fokker–Planck operator $\mathcal L(\lambda)$ by $\tilde{\mathcal L}(\lambda,\dot\lambda)$ chosen so that the instantaneous equilibrium $\rho(x;\lambda(t))$ is an exact solution, so the genotype distribution follows the prescribed path with no lag.
See: Counterdiabatic driving: control of a Fokker–Planck density

Q: Write the approximate counterdiabatic selection coefficient of Iram et al. (2021) in the frequent-mutation regime.
A: $\tilde s_i\approx s_i(\lambda)+\frac{d}{dt}\ln\frac{\bar x_i(\lambda(t))}{\bar x_M(\lambda(t))}$, the original coefficient plus the log-rate of change of the target mean frequency relative to the wild type.
See: Counterdiabatic driving: control of a Fokker–Planck density

Q: Why is counterdiabatic driving an inverse problem rather than an optimal control problem?
A: The path of distributions is prescribed and the control is solved for; nothing is minimised. The optimal version (cheapest path between two equilibria) is a Benamou–Brenier-type problem that has not been formulated.
See: The open formulation: control on a space of measures

Q: Why does the candidate HJB for controlling a Wright–Fisher density need only the flat derivative $\delta V/\delta p$, not the Lions derivative?
A: The dynamics $\partial_tp=\mathcal L(\lambda)p$ are linear in $p$ (the control enters bilinearly), so the chain rule pairs $\delta V/\delta p$ with $\mathcal L(\lambda)p$ directly; no transport velocity field appears.
See: The open formulation: control on a space of measures

## Quiz

Q: In Fischer et al. (2015), what happens if the perfect-information feedback $\bar u(x_i)$ is applied unchanged between sparse measurements?
- [ ] It remains optimal because the HJB solution is stationary
- [x] It overshoots the switching frequency and amplifies fluctuations, so control is lost
- [ ] It is optimal only for large $\Delta$
- [ ] It converges to the neutral setting $u=-\sigma$
E: The feedback does not anticipate that $x$ crosses $x_c$ before the next measurement. It is correct only in the limit $\Delta\to0$; the fix is a pre-emptive protocol that parks the population.
See: Playing to win versus playing not to lose

Q: For two genotypes, the counterdiabatic correction to the selection coefficient is $\frac{d}{dt}\ln\frac{\bar x}{1-\bar x}$. Where does the factor $1/(\bar x(1-\bar x))$ come from?
- [x] The Wright–Fisher drift is $x(1-x)s$, so moving the mean at speed $\dot{\bar x}$ needs selection $\dot{\bar x}/(\bar x(1-\bar x))$
- [ ] The diffusion coefficient $x(1-x)/N$ must be cancelled
- [ ] The KL divergence has that Hessian at $\bar x$
- [ ] Mutation rates scale with $x(1-x)$
E: Differentiate $\ln(\bar x/(1-\bar x))$: you get $\dot{\bar x}/(\bar x(1-\bar x))$, the extra drift needed divided by the drift coefficient of selection. The diffusion term is untouched.
See: Counterdiabatic driving: control of a Fokker–Planck density

Q: Which statement about the "control of evolving populations" thread is correct as of 2026?
- [ ] Chen et al. (2026) prove a viscosity-solution theory for the measure-valued problem
- [ ] Weaver et al. (2024) solve an HJB on Wasserstein space
- [x] All existing results are finite-state (Bellman on a chain, MDP, RL) or inverse problems; the HJB on measures has not been formulated
- [ ] Iram et al. (2021) minimise the drug dose along the counterdiabatic path
E: Fischer–Mustonen, Weaver, Chen are discrete; Iram prescribes the path and solves for the control. The continuum control problem is the open formulation.
See: The open formulation: control on a space of measures
