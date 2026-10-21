---
title: Public goods among cancer cells
tags: [cancer, public-goods-games, cooperation, replicator-dynamics, hamiltonian-systems]
created: 2026-10-21
related: [tomlinson-matrix-games, spatial-games-in-tumours, measuring-the-game, potential-games, replicator-dynamics, adaptive-therapy-dynamic-programming, tumor-growth-laws, mathematical-oncology-landscape]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

Growth factors, VEGF, acid from glycolysis, matrix-degrading enzymes: much of what a cancer cell secretes diffuses and benefits neighbours that did not pay for it. Why do producers persist? Pairwise matrix games ([Tomlinson and Bodmer](#/note/tomlinson-matrix-games)) answer with a linear benefit. Archetti (2013, 2014, 2015) reframed the question as an $N$-player public goods game (PGG) with a *nonlinear* benefit, and that nonlinearity is what makes coexistence generic.

### From pairwise to N-player: the diffusion range sets the group

A diffusible good is shared within a neighbourhood of $n$ cells set by its diffusion range. A producer pays $c>0$; every cell in the group receives a benefit $b(j)$ that depends on the number $j$ of producers among its $n-1$ partners. Archetti (2013) takes a logistic benefit
$$
b(j)=\frac{1}{1+e^{s(k-j)}}\quad\text{(normalised to }b(0)=0,\ b(n)=1\text{)},
$$
with inflection $k=hn$ and steepness $s$: $s\to\infty$ is a threshold good, $s\to0$ a linear one. In a well-mixed population with producer fraction $x$ (total density constant), the producers' fitness advantage is $\beta(x)-c$ with
$$
\beta(x)=\sum_{j=0}^{n-1}\binom{n-1}{j}x^j(1-x)^{n-1-j}\,\Delta b_j,\qquad \Delta b_j=b(j+1)-b(j),
$$
the Bernstein polynomial of the increments, and the replicator equation is $\dot x\propto x(1-x)\big(\beta(x)-c\big)$.

### Why a sigmoid benefit gives coexistence

Read the regimes off the endpoints and the shape of $\beta$. Since $\beta(0)=\Delta b_0$ and $\beta(1)=\Delta b_{n-1}$: producers invade a non-producing population iff $\Delta b_0>c$, and non-producers invade an all-producer population iff $\Delta b_{n-1}<c$. For a sigmoid $b$ the increments rise then fall, so $\beta$ is hump-shaped with maximum $\beta^*$ at some $x^\dagger$; interior rest points are the roots of $\beta(x)=c$, and the one on the descending branch ($x>x^\dagger$) is stable because there the advantage of producers decreases with their frequency. So a stable mixed population needs $\Delta b_{n-1}<c<\beta^*$; it attracts everything if also $\Delta b_0>c$, and otherwise coexists with the stable extinction state $x=0$ (bistability). With a linear good the increments are constant, $\beta\equiv\Delta b$, and the only outcomes are all-or-nothing; this is the tragedy of the commons, and the sigmoid rescues cooperation without kin, space or memory. Archetti's five regimes (2013) are the cases of this bookkeeping.

A recomputed example (Archetti's $n=50$, $s=0.2$, $c=0.01$): at $h=0.1$, $\Delta b_0\approx0.056>c$ and $\Delta b_{49}\approx4\cdot10^{-5}<c$, with a single stable interior point at $x\approx0.44$. Therapy that impairs the growth factor is modelled as raising $h$. At $h=0.98$ the picture is reversed, $\Delta b_0<c<\Delta b_{49}$, with $x=0$ and $x=1$ both stable and an unstable interior point at $x\approx0.61$. A jump to $h=0.98$ from below $0.61$ sends producers extinct, but a slow increase lets the population track the stable branch (at $h=0.5$ the stable point is $x\approx0.81$) and producers re-equilibrate. Archetti's conclusion: therapy must be large *and* fast. The experiment of Archetti, Ferraro and Christofori (PNAS 2015) tested the prediction in insulinoma cells with and without IGF-II production: non-producers grow slowly alone but gain in mixtures, the good acts as a nonlinear public good, and the resulting negative frequency dependence maintains coexistence. It remains one of the few cancer games whose parameters were estimated (Wölfl et al. 2022). Archetti and Pienta (2019) review the programme and its therapeutic reading ("evolution-proof" therapies that exploit free-riding).

### Two goods, one cycle (Kaznatcheev, Vander Velde, Scott and Basanta 2017)

Linear goods can still give sustained heterogeneity if two goods with different club structure interact. Strategies: GLY (glycolytic, produces acid), VOP (aerobic, over-produces VEGF at cost $c$), DEF (aerobic free-rider). Acid (benefit $b_a$) is a public good shared by all $n+1$ cells of a group; oxygen (benefit $b_v$) is a club good shared only among the aerobic members. With $p$ the GLY fraction and $q$ the VOP fraction among aerobic cells, averaging over binomial group compositions gives
$$
\dot p=p(1-p)\Big(\frac{b_a}{n+1}-q\,(b_v-c)\Big),\qquad
\dot q=q(1-q)\Big(\frac{b_v}{n+1}\sum_{k=0}^{n}p^k-c\Big).
$$
(The $q$-equation uses $\mathbb E[1/(n_A+1)]$ for a binomial count $n_A$ of aerobic partners, which is $\frac{1-p^{n+1}}{(n+1)(1-p)}$.) Three regimes: all-GLY if $b_a/(n+1)>b_v-c$; all-VOP if $\max\{b_a/(n+1),cn\}<b_v-c$; and polyclonal if $b_a/(n+1)<b_v-c<cn$, with interior rest point $q^*=\frac{b_a}{(b_v-c)(n+1)}$ and $p^*$ the root of $\sum_{k=0}^np^k=c(n+1)/b_v$. Because $\dot p$ depends on $q$ only and $\dot q$ on $p$ only, dividing time by $p(1-p)q(1-q)$ makes the system Hamiltonian, and the interior point is a centre surrounded by closed orbits (the paper's Appendix E; checked numerically here). Consequences drawn in the paper: the *timing* of an anti-glycolytic drug along the cycle decides between relapse to all-GLY and collapse to all-DEF, and the *order* of vascular normalisation and buffer therapy matters. This is the model that [dynamic programming](#/note/adaptive-therapy-dynamic-programming) later put under an HJB equation.

### What replicator dynamics throws away (Gerlee and Altrock 2017, 2019)

Replicator dynamics assume constant total size. Gerlee and Altrock (2017) start from birth–death dynamics of two types with frequency-dependent birth rates $f_1,f_2$, death rate $\mu$ and a shared carrying capacity. Far from capacity the frequency $u$ obeys $\dot u=u(1-u)(f_1-f_2)$ with the death terms dropped; an expansion in $\mu$ gives an invariant manifold along which frequency dynamics carry a prefactor proportional to $\mu$ and inversely proportional to total fitness. The time to near-extinction of producers scales like $\mu^{-1}$, and the replicator time scale is recovered only when death and average birth rates are comparable, which they estimate holds in vivo (birth/death $\approx1$) but not in vitro ($\approx10$). Their 2019 follow-up lets the good diffuse and decay in space; producer persistence then depends on diffusion and decay constants through the Fourier modes of the density, with a finite-cell-size correction, so the effective benefit-to-cost ratio is not a cell property alone.

### Potential or Hamiltonian?

For a single good the replicator equation is one-dimensional, hence the gradient flow of $\Phi(x)=\int_0^x(\beta(s)-c)\,ds$: the population climbs a [potential](#/note/potential-games), equilibria are its critical points, and there are no cycles. The double-goods game is the opposite extreme: a conserved quantity, no Lyapunov function, and orbits that never settle. Both are structurally special. Any density or turnover term of the Gerlee–Altrock kind breaks the Hamiltonian symmetry, and whether the timing conclusions survive as damped oscillations or a limit cycle has not been tested (open as of 2026).

## Cards

Q: In Archetti's $N$-player public goods game, what is the producers' fitness advantage, and what equation do frequencies follow?
A: $\beta(x)-c$, where $\beta(x)=\sum_j\binom{n-1}{j}x^j(1-x)^{n-1-j}\Delta b_j$ is the Bernstein polynomial of the benefit increments $\Delta b_j=b(j+1)-b(j)$ and $c$ the cost; $\dot x\propto x(1-x)(\beta(x)-c)$.
See: From pairwise to N-player: the diffusion range sets the group

Q: Why does a sigmoid (rather than linear) benefit let producers and free-riders coexist in a well-mixed public goods game?
A: With a sigmoid benefit the gain function $\beta$ is hump-shaped. On its descending branch the producers' advantage falls with their frequency (negative frequency dependence), so a root of $\beta(x)=c$ there is a stable interior point. With a linear good $\beta$ is constant and only all-or-nothing outcomes exist.
See: Why a sigmoid benefit gives coexistence

Q: In a public goods game with gain function $\beta$, when can producers invade a non-producing population, and when can free-riders invade an all-producer one?
A: Producers invade iff $\beta(0)=\Delta b_0>c$. Free-riders invade iff $\beta(1)=\Delta b_{n-1}<c$.
See: Why a sigmoid benefit gives coexistence

Q: Why did Archetti conclude that anti-growth-factor therapy must be "large and fast"?
A: Therapy raises the inflection point $h$ of the benefit. A large sudden rise puts the producer fraction below an unstable interior point and producers go extinct; a slow rise lets the population track the moving stable branch and re-equilibrate.
See: Why a sigmoid benefit gives coexistence

Q: In the double-goods game, what distinguishes the acid benefit from the oxygen benefit, and what does the difference produce?
A: Acid is a public good shared by all cells in a group; oxygen (via VEGF) is a club good shared only among aerobic cells. Two linear goods with different club structure give a polyclonal regime whose interior point is a centre with closed orbits.
See: Two goods, one cycle (Kaznatcheev, Vander Velde, Scott and Basanta 2017)

Q: Why is the double-goods system $\dot p=p(1-p)f(q)$, $\dot q=q(1-q)g(p)$ Hamiltonian, and what does that imply?
A: Each equation depends only on the other variable. Dividing time by $p(1-p)q(1-q)$ gives $\dot p=f(q)/(q(1-q))$, $\dot q=g(p)/(p(1-p))$, which is Hamiltonian with $H=\int\frac{g(p)}{p(1-p)}dp-\int\frac{f(q)}{q(1-q)}dq$; time rescaling preserves orbits, so the original orbits are level sets of $H$: a centre, no attractor, and the timing of a perturbation matters.
See: Two goods, one cycle (Kaznatcheev, Vander Velde, Scott and Basanta 2017)

Q: What do Gerlee and Altrock (2017) say replicator dynamics gets wrong, and when is it acceptable?
A: It drops birth–death turnover, so extinction times are wrong by a factor of order $\mu^{-1}$ (death rate) and the time scale is right only when death and average birth rates are comparable, roughly the in vivo regime but not in vitro where birth/death is about 10.
See: What replicator dynamics throws away (Gerlee and Altrock 2017, 2019)

Q: Contrast the variational structure of a one-good PGG with the double-goods game.
A: One good: a 1-D replicator equation, the gradient flow of $\Phi(x)=\int_0^x(\beta-c)$; no cycles. Double goods: a conserved quantity and closed orbits; no Lyapunov function. Both are fragile to added density or turnover terms.
See: Potential or Hamiltonian?

## Quiz

Q: For Archetti's example ($n=50$, $s=0.2$, $c=0.01$) at $h=0.98$ one finds $\Delta b_0<c<\Delta b_{49}$ and one interior root of $\beta=c$. The phase line is…
- [x] $x=0$ and $x=1$ both stable, interior point unstable (bistability)
- [ ] a single stable interior coexistence point
- [ ] $x=0$ unstable, $x=1$ stable, no interior point
- [ ] $x=1$ unstable, $x=0$ stable, interior point stable
E: $\Delta b_0<c$ makes $x=0$ stable and $\Delta b_{49}>c$ makes $x=1$ stable; a single interior root between two stable endpoints must be unstable.
See: Why a sigmoid benefit gives coexistence

Q: In the double-goods game, the polyclonal (cyclic) regime requires…
- [x] $b_a/(n+1)<b_v-c<cn$
- [ ] $b_a/(n+1)>b_v-c$
- [ ] $b_v-c>cn$
- [ ] $b_a>b_v$
E: $q^*=b_a/((b_v-c)(n+1))<1$ needs the left inequality; $p^*\in(0,1)$ needs $1<c(n+1)/b_v<n+1$, i.e. $b_v-c<cn$. The other options give all-GLY or all-VOP.
See: Two goods, one cycle (Kaznatcheev, Vander Velde, Scott and Basanta 2017)

Q: According to Gerlee and Altrock (2017), the time for producers to go nearly extinct in a public goods game with turnover scales like…
- [x] $\mu^{-1}$, inversely with the death rate
- [ ] $\mu$, proportionally to the death rate
- [ ] independently of $\mu$, as in replicator dynamics
- [ ] $\beta^{-1}$, inversely with the good's production/removal ratio
E: The replicator limit hides a prefactor proportional to $\mu$ on the frequency dynamics; the extinction time is independent of the ratio $\beta=\rho/\delta$ of the good's kinetics.
See: What replicator dynamics throws away (Gerlee and Altrock 2017, 2019)
