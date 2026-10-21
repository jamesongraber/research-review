---
title: G-functions, Darwinian dynamics and the evolutionary double bind
tags: [cancer, g-function, darwinian-dynamics, ess, drug-resistance, optimal-control]
created: 2026-10-21
related: [adaptive-dynamics, evolutionarily-stable-strategies, singular-strategies-branching, selection-mutation-hamilton-jacobi, stackelberg-evolutionary-games, tomlinson-matrix-games, adaptive-therapy-origins, multidrug-adaptive-scheduling, evolutionary-steering-collateral-sensitivity, cancer-somatic-evolution]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

The continuous-trait pole of cancer game theory is the **G-function** school of Vincent and Brown (book, 2005), brought into oncology by Gatenby and Vincent (2003). Where [matrix games](#/note/tomlinson-matrix-games) fix the phenotypes in advance, here a heritable trait $u$ (a resistance level, an investment in motility) moves on a fitness landscape that the population itself reshapes. Every Stackelberg evolutionary game of cancer treatment is a G-function model with a dose added, so this is the machinery to know.

### The fitness-generating function

Let $\mathbf x=(x_1,\dots,x_n)$ be the densities of $n$ populations with trait values $\mathbf u=(u_1,\dots,u_n)$. A **fitness-generating function** $G(v,\mathbf u,\mathbf x)$ gives the per-capita growth rate of a focal individual using strategy $v$ in that environment. Each population's own growth rate is $G$ evaluated at its own trait, $v=u_i$. One function generates the fitness of every resident and of every possible mutant, which is why the ESS question (can a rare $v$ invade?) and the dynamics question (how do $\mathbf x$ and $\mathbf u$ move?) share the same object.

### Darwinian dynamics

Following Bukkuri and Brown (2021), who restate the book,
$$
\frac{dx_i}{dt}=x_i\,G(v,\mathbf u,\mathbf x)\Big|_{v=u_i},\qquad
\frac{du_i}{dt}=\sigma_i^2\,\frac{\partial G}{\partial v}\Big|_{v=u_i}.
$$
The first line is ecology; the second is evolution, with $\sigma_i^2$ a measure of heritable (additive genetic) variance, in the spirit of Fisher's fundamental theorem and Lande's equation: the mean trait climbs the selection gradient at a speed set by the variance. Note what this is and is not. For fixed $(\mathbf u,\mathbf x)$ the trait equation is Euclidean gradient ascent of $v\mapsto G(v,\mathbf u,\mathbf x)$, but the landscape moves with the climber, so the coupled system is not a gradient flow and can have cycles. The derivation is mean-field and assumes large populations, small mutational steps and reversible evolution (Bukkuri and Brown say so explicitly and point to agent-based or trait-structured models otherwise). Unlike [adaptive dynamics](#/note/adaptive-dynamics), no separation of ecological and evolutionary time scales is assumed: $\mathbf x$ and $\mathbf u$ move together. If one does assume ecological equilibrium $\mathbf x^*(\mathbf u)$, then $s_{\mathbf u}(v)=G(v,\mathbf u,\mathbf x^*(\mathbf u))$ is exactly the invasion fitness of adaptive dynamics, and $\dot u=\sigma^2\partial_vG$ is its canonical equation with $k(u)=\sigma^2$.

### The ESS maximum principle and convergence stability

At an eco-evolutionary equilibrium $(\mathbf u^*,\mathbf x^*)$ no mutant can grow, so
$$
G(v,\mathbf u^*,\mathbf x^*)\le0\ \text{for all }v,\qquad G(u_i^*,\mathbf u^*,\mathbf x^*)=0 .
$$
Each resident trait sits on a *peak* of the landscape it creates: $\partial_vG=0$ and $\partial_v^2G<0$ at $v=u_i^*$ (a "valley" with $\partial_v^2G>0$ is a minimum and invadable from both sides). This is the **ESS maximum principle** of Vincent and Brown. It is necessary, not sufficient: it is the static [ESS](#/note/evolutionarily-stable-strategies) notion (unbeatable once there), and it must be paired with **convergence stability** (the trait dynamics actually approach $u^*$ from nearby), checked by simulating Darwinian dynamics or by Eshel-type second-derivative criteria. The two can fail independently, exactly as for [singular strategies](#/note/singular-strategies-branching) in adaptive dynamics, where an evolutionary branching point is convergence stable but not an ESS.

**Worked example.** A resistant population with trait $v\ge0$ under constant dose $m$ (the model of Stein et al. 2023 and Salvioli et al. 2025, single-population version):
$$
G(v,u,x,m)=r_{\max}e^{-gv}\Big(1-\frac xK\Big)-d-\frac{m}{k+bv}.
$$
Resistance costs growth ($e^{-gv}$) and buys protection ($m/(k+bv)$). At an eco-evolutionary equilibrium $G=0$ gives $r_{\max}e^{-gu}(1-x/K)=d+m/(k+bu)$, and substituting into $\partial_vG=0$ eliminates the ecology entirely: with $w=k+bu$,
$$
-g\Big(d+\frac mw\Big)+\frac{mb}{w^2}=0\iff gd\,w^2+gm\,w-mb=0 ,
$$
so
$$
u^*(m)=\max\Big\{0,\ -\frac kb-\frac{m}{2bd}+\sqrt{\frac{m^2}{4b^2d^2}+\frac{m}{bdg}}\Big\}.
$$
With the published parameters ($g=0.8$, $d=0.01$, $k=2$, $b=10$) this gives $u^*(0.3)\approx0.75$, $u^*(0.5)\approx0.84$, $u^*(1)\approx0.92$: the ESS resistance level increases with dose, and $\partial_v^2G<0$ there. The same formula holds with a second, sensitive population and competition coefficients, because $G=0$ absorbs the competition term whatever it is. That curve $m\mapsto u^*(m)$ is the "follower's best response" of the [Stackelberg evolutionary game](#/note/stackelberg-evolutionary-games).

### Carcinogenesis on a ridge (Gatenby and Vincent 2003)

In the Cancer Research model, normal cells occupy "a ridge-shaped maximum" of a tissue fitness landscape: a coexistence state constrained by tissue control that is not an ESS and can be invaded by fitter mutants. Carcinogenesis is then a sequence of invasions, and crowding or nutrient competition selects angiogenic and glycolytic traits. Vincent and Gatenby (2008) reproduced initiation, promotion and progression as successive changes of the adaptive landscape in simulations. The companion paper in Molecular Cancer Therapeutics (2003) drew the therapeutic moral: a therapy that perturbs one parameter of the dynamics has theoretical limits, because the population re-evolves around it.

### The evolutionary double bind

Gatenby, Brown and Vincent (2009) borrowed from pest control: pair two therapies so that adapting to one increases vulnerability to the other. In G-function language the trait is a vector. Bukkuri and Brown (2021) write $\mathbf u=(u_1,u_2)$ for resistance to two drugs with a covariance matrix $C=\begin{pmatrix}\sigma_1^2&\delta_1^2\\ \delta_2^2&\sigma_2^2\end{pmatrix}$, so $\dot u_1=\sigma_1^2\partial_{v_1}G+\delta_1^2\partial_{v_2}G$: off-diagonal $\delta^2>0$ is cross-resistance, $\delta^2<0$ a double bind, $\delta^2=0$ independence. In their simulated sequential dosing the double bind sensitises the tumour to the second drug and drives extinction, cross-resistance blunts it. Orlando, Gatenby and Brown (2012) made the oncologist an optimiser over this: a logistic tumour whose strategy is total resistance investment $v_1$ (costing carrying capacity, $K(v_1)=K_{\max}e^{-v_1^2/2\sigma_k^2}$) and a share $v_2$ allocated to drug 1, with a trade-off curve deciding whether hedging between drugs is penalised (specialists favoured) or rewarded (generalists favoured). The optimal delivery schedules (numerical, pseudospectral GPOPS, open-loop on a known model) are: for the linear and generalist trade-offs, effectively static dosing of both drugs at near-equal levels; for the specialist trade-off, dynamic dosing with concentrations that negatively covary, drug 1 then drug 2, a double bind in time. This is the first explicit "oncologist as controller, tumour as Darwinian dynamics" formulation.

### Toward the PDE

Darwinian dynamics is the mean-trait reduction of a trait-structured population equation. The constrained Hamilton–Jacobi route to [Dirac concentration](#/note/selection-mutation-hamilton-jacobi) gives the dominant trait the canonical equation $\dot{\bar x}=(-D^2u)^{-1}\nabla_xR(\bar x,I)$, with $R(x,I)$ playing the role of $G$ at the current environment $I$ and $(-D^2u)^{-1}$ the role of $\sigma^2$: there the "variance" is an output of the limit rather than a parameter. No cancer paper derives $\dot u=\sigma^2\partial_vG$ as a moment closure with error bounds, or compares G-function conclusions against a trait-structured PDE (open as of 2026).

## Cards

Q: What is a fitness-generating function $G(v,\mathbf u,\mathbf x)$, and why is one function enough?
A: The per-capita growth rate of an individual using strategy $v$ in a population with traits $\mathbf u$ and densities $\mathbf x$. Residents' growth rates are $G$ at $v=u_i$ and a mutant's invasion rate is $G$ at the mutant $v$, so the same function serves ecology, evolution and the ESS test.
See: The fitness-generating function

Q: Write Darwinian dynamics and say what $\sigma_i^2$ is.
A: $\dot x_i=x_iG|_{v=u_i}$ and $\dot u_i=\sigma_i^2\,\partial_vG|_{v=u_i}$. $\sigma_i^2$ measures heritable (additive genetic) variance and sets the speed of evolution, as in Lande's equation; it does not change the direction.
See: Darwinian dynamics

Q: How does the G-function approach differ from adaptive dynamics, and when do they coincide?
A: Darwinian dynamics evolves densities and traits together, without assuming ecological equilibrium. If one imposes $\mathbf x=\mathbf x^*(\mathbf u)$, then $G(v,\mathbf u,\mathbf x^*(\mathbf u))$ is the invasion fitness and $\dot u=\sigma^2\partial_vG$ is the canonical equation.
See: Darwinian dynamics

Q: State the ESS maximum principle and say why it is not sufficient for an ESS to be reached.
A: At an eco-evolutionary equilibrium $G(v,\mathbf u^*,\mathbf x^*)\le0$ with equality at each $u_i^*$, so $\partial_vG=0$ and $\partial_v^2G<0$ there (each resident on a peak). It is a static unbeatability condition; convergence stability (the trait dynamics approach $u^*$) is separate, as at evolutionary branching points.
See: The ESS maximum principle and convergence stability

Q: For $G=r_{\max}e^{-gv}(1-x/K)-d-m/(k+bv)$, why does the ESS resistance level $u^*(m)$ not depend on $K$ or on competition from other types?
A: At equilibrium $G=0$ gives $r_{\max}e^{-gu}(1-x/K)=d+m/(k+bu)$; substituting into $\partial_vG=0$ eliminates the ecological factor, leaving the quadratic $gd\,w^2+gm\,w-mb=0$ in $w=k+bu$.
See: The ESS maximum principle and convergence stability

Q: Is the trait equation $\dot u=\sigma^2\partial_vG(v,u,x)|_{v=u}$ a gradient flow?
A: Only instantaneously: for frozen $(u,x)$ it is Euclidean gradient ascent of $v\mapsto G$. The landscape moves with $(u,x)$, so the coupled system is not a gradient flow and can cycle, unlike the symmetric-game replicator equation.
See: Darwinian dynamics

Q: What is an evolutionary double bind, and how does it appear in a vector-valued G-function model?
A: Two therapies paired so that adapting to one increases vulnerability to the other (Gatenby, Brown and Vincent 2009). With resistance traits $(u_1,u_2)$ and covariance matrix $C$, a negative off-diagonal $\delta^2<0$ means climbing resistance to drug 1 lowers resistance to drug 2; $\delta^2>0$ is cross-resistance.
See: The evolutionary double bind

Q: In Orlando, Gatenby and Brown (2012), which trade-off makes the numerically optimal two-drug schedule dynamic rather than static?
A: The specialist trade-off, where hedging resistance between drugs is penalised: the optimal doses then negatively covary in time (drug 1, then drug 2). With linear or generalist trade-offs both drugs are given at near-equal constant levels. Numerical result, not a theorem.
See: The evolutionary double bind

## Quiz

Q: In the worked example, as the constant dose $m$ increases the ESS resistance level $u^*(m)$…
- [x] increases, since the protection term $m/(k+bv)$ grows while the cost $e^{-gv}$ does not depend on $m$
- [ ] decreases, since higher dose lowers $1-x/K$
- [ ] is unchanged, since $G=0$ at equilibrium
- [ ] jumps to its maximum at any $m>0$
E: Recomputed values: $u^*(0.3)\approx0.75$, $u^*(0.5)\approx0.84$, $u^*(1)\approx0.92$. The density drops out of the ESS condition, so the second option's mechanism cannot act.
See: The ESS maximum principle and convergence stability

Q: A trait value $u^*$ at which $\partial_vG=0$ and $\partial_v^2G>0$ is…
- [x] a fitness minimum: invadable by mutants on both sides, not an ESS
- [ ] an ESS, since the first-order condition holds
- [ ] convergence stable by the maximum principle
- [ ] an eco-evolutionary equilibrium with $G<0$
E: The maximum principle needs a peak. A minimum is the G-function analogue of an evolutionary branching point if it is convergence stable, which the second-derivative sign alone does not decide.
See: The ESS maximum principle and convergence stability

Q: Compared with the canonical equation obtained from the constrained Hamilton–Jacobi limit, Darwinian dynamics $\dot u=\sigma^2\partial_vG$…
- [x] treats the mobility $\sigma^2$ as a parameter, where the HJ limit produces $(-D^2u)^{-1}$ from the solution
- [ ] has the opposite sign, descending the landscape
- [ ] requires time-scale separation, which the HJ limit does not
- [ ] cannot represent frequency dependence
E: Both climb the selection gradient. In the HJ limit the weighting matrix is the curvature of the limiting solution; in Darwinian dynamics it is an input.
See: Toward the PDE
