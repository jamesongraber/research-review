---
title: "Containment theorems: when keeping sensitive cells alive wins"
tags: [cancer, adaptive-therapy, comparison-theorems, gompertz, drug-resistance]
created: 2026-10-21
related: [adaptive-therapy-control, adaptive-therapy-origins, adaptive-therapy-dynamic-programming, extinction-therapy-two-strikes, adaptive-therapy-trials-evidence, pre-existing-resistance, bang-bang-singular-metronomic, stackelberg-evolutionary-games, replicator-lotka-volterra]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

Containment is the theorem-level backbone of adaptive therapy: it says what the optimal policy is without ever writing a Hamiltonian. The toy model and the Pontryagin picture are in [adaptive therapy as optimal control](#/note/adaptive-therapy-control); here the arguments are **comparison theorems** for ODEs.

### The two policies

Hansen, Woods and Read (2017, *PLoS Biology* 15:e2001110) set up the dichotomy sharply, for an infection but with the same mathematics. **Aggressive treatment** removes the entire sensitive density as fast as possible, so that sensitive cells cannot mutate to resistance. **Containment** maintains the largest clinically acceptable sensitive population, to maximise competitive suppression of the resistant one. Neither is a universal default: which wins depends on the acceptable burden $P_{\max}$, the current resistant density, and a threshold.

### Hansen–Woods–Read: the balance threshold

Write $R$ for the resistant density, $P_{\max}$ for the maximum tolerated total burden, $r$ for the intrinsic replication rate, $\delta$ for the competition coefficient, $\mu$ for removal (immunity plus baseline death) and $\varepsilon$ for the fraction of sensitive progeny acquiring full resistance. Under containment the sensitive density is $P_{\max}-R$, and (their Eq. 2, no fitness cost, paraphrased from a garbled rendering)
$$
\dot R = rR(1-\delta R) - \mu R \;\underbrace{-\; rR\,\delta(P_{\max}-R)}_{\text{suppression: the benefit}} \;+\; \underbrace{\varepsilon r (P_{\max}-R)(1-\delta P_{\max})}_{\text{mutational input: the cost}} .
$$
Sensitive cells both suppress resistant growth and manufacture resistance. Setting the two bracketed terms equal gives the **balance threshold**: $rR\delta = \varepsilon r(1-\delta P_{\max})$, so
$$
R_{\mathrm{balance}} = \frac{\varepsilon\,(1-\delta P_{\max})}{\delta}
$$
(their Eq. 4 with both fitness-cost parameters set to zero; with costs $c_I, c_C$ the denominator becomes $(1-c_I)(1+c_C)\delta$). Above $R_{\mathrm{balance}}$ maximising sensitive density helps; below it sensitive cells are a net liability. Their Eq. 5, the **burden condition** $P_{\max} > \varepsilon/[\delta(\varepsilon + (1-c_I)(1+c_C))]$, says when containment is worth considering at all. Two things to keep: **no fitness cost is required** ($c_I=c_C=0$ leaves the analysis intact), and containment "can more than double" the time to failure — they report more than 2.5-fold at $P_{\max}$ equal to 80 per cent of the self-limiting density $1/\delta$, and more than 1.5-fold above 60 per cent.

### Viossat–Noble: the comparison theorem

Viossat and Noble (2021, *Nature Ecology & Evolution* 5:826–835) prove the general statement. Their Model 1 is
$$
\dot S = g_s(S,R,C)\,S, \qquad \dot R = g_r(S,R)\,R,
$$
with the dose $C(t)\le C_{\max}$, $g_s$ non-increasing in $C$, $g_r$ independent of $C$ (resistance is complete), and the hypothesis that carries everything:
$$
\partial_S g_r \le 0 .
$$
**Ideal containment at $N_0$** holds $N=S+R$ at its initial value as long as $S>0$; **ideal MTD** sets $S(t)=0$ for $t>0$; progression is the first time $N$ exceeds $N_0$. Their results: ideal containment at any $N^*\ge N_0$ maximises the time until $N$ exceeds $N^*$, and ideal MTD is the worst policy for that criterion.

The engine is a pointwise comparison, worth re-deriving. Let $C(\cdot)$ be any dose path with trajectory $(S,R)$ and let $t_{\mathrm{alt}}$ be its progression time, so $N(t)\le N_0$ for $t\le t_{\mathrm{alt}}$. Both policies start at $R_0$. At a first time $t_0 \le t_{\mathrm{alt}}$ where $R_{\mathrm{cont}}(t_0)=R(t_0)$, containment has $S_{\mathrm{cont}}(t_0) = N_0 - R_{\mathrm{cont}}(t_0) \ge N(t_0) - R(t_0) = S(t_0)$, and since the two $R$ values agree, $\partial_S g_r\le0$ gives $g_r(S_{\mathrm{cont}},R_{\mathrm{cont}}) \le g_r(S,R)$, hence $\dot R_{\mathrm{cont}}(t_0)\le \dot R(t_0)$. So $R_{\mathrm{cont}}$ never crosses above $R$: the resistant population is **pointwise smallest under ideal containment**, up to the alternative's own progression time. Containment progresses only when $R_{\mathrm{cont}}$ itself reaches $N_0$ (that is when $S$ is exhausted), and $R_{\mathrm{cont}}\le R\le N\le N_0$ until $t_{\mathrm{alt}}$, so containment has not progressed yet. Numerically, on the Gompertz model below, $\max_t (R_{\mathrm{cont}}-R_{\mathrm{alt}})$ over $[0,t_{\mathrm{alt}}]$ is zero (attained only at $t=0$) for constant, bang-bang and ramped dose paths alike.

### The Gompertz formulas

Their Model 3 makes everything explicit: $\dot S = \rho\ln(K/N)(1-\lambda C)S$, $\dot R = \rho\ln(K/N)R$, $N=S+R$. Put
$$
x = \frac{\ln(N_0/R_0)}{\ln(K/N_0)} .
$$
Ideal containment freezes $N\equiv N_0$, so $R$ grows exponentially at rate $\rho\ln(K/N_0)$ and progression is at $t = \ln(N_0/R_0)/(\rho\ln(K/N_0)) = x/\rho$. Ideal MTD leaves pure Gompertz growth of $R$ from $R_0$, for which $\ln(K/R(t)) = \ln(K/R_0)e^{-\rho t}$, so progression at $N_0$ is at $t = \ln\!\big(\ln(K/R_0)/\ln(K/N_0)\big)/\rho = \ln(1+x)/\rho$. Hence
$$
t_{\mathrm{prog}}(\mathrm{idCont}) = \frac{x}{\rho}, \qquad t_{\mathrm{prog}}(\mathrm{idMTD}) = \frac{\ln(1+x)}{\rho}, \qquad \frac{t_{\mathrm{prog}}(\mathrm{idCont})}{t_{\mathrm{prog}}(\mathrm{idMTD})} = \frac{x}{\ln(1+x)} .
$$
The relative benefit is **independent of $\rho$**, tends to $1$ as $x\to0$, and increases in $x$: $1.44$ at $x=1$, $1.82$ at $x=2$, $2.79$ at $x=5$. Since $x$ grows with $N_0/K$ and with the rarity of resistance, containment pays most for a *large* tumour with *rare* resistance — the opposite of clinical intuition. Again, no cost of resistance is assumed; the key assumption is only that extra sensitive cells slow resistant growth.

### How much dose does containment need

Holding $N\equiv N_0$ in Model 3 requires $\dot S+\dot R=0$, i.e. $(1-\lambda C)S + R = 0$, so the containment dose is
$$
C = \frac{N_0}{\lambda S},
$$
which is admissible ($C\le1$) only while $S \ge N_0/\lambda$ and blows up as $S\to0$: ideal containment is infeasible near the end, exactly as in the boundary-arc picture. Note also that the constant dose $C=1/\lambda$ makes $\dot S\equiv0$ identically, so all growth comes from $R$ — which is why Viossat and Noble find the optimal constant dose slightly above $1/\lambda$ and report that $C=1/\lambda$ holds the burden near $N_0$ for nearly as long as containment when resistance is rare. Intermittent containment is close to continuous containment provided $N_{\min}$ is a large fraction of $N_{\max}$; whether continuous low dose or intermittent high dose is better remains unsettled.

### Turnover, cost of resistance, and triggers

Strobl et al. (2021, *Cancer Research* 81:1135–1147) make the cost-of-resistance question quantitative in a two-ODE logistic competition model with a density-independent **turnover** rate $d_T$ equal for both types, and a Norton–Simon kill acting on dividing cells only. The cost is modelled solely as $r_R<r_S$, and the turnover defines an effective capacity $K_{\mathrm{eff}} = (1-d_T/r_R)K$. Their conclusion: adaptive therapy can beat continuous therapy with **no cost at all** when the tumour is near carrying capacity and resistance is rare; far from capacity a cost may be needed; and high turnover both amplifies the benefit and amplifies the effect of a cost, so the tumour need not sit at capacity. Without turnover they report TTP gains of 3–104 days at a 1 per cent resistant fraction, 19–211 days at 0.1 per cent, and no benefit at 10 per cent. Hansen and Read (2020, *Cancers* 12:3556) attack the *trigger* instead: in the Zhang model, invert it — start treatment when the burden rises about 10 per cent above baseline and stop when it returns to baseline — and, if safe, delay the start so the baseline itself is 10–25 per cent higher. Both changes raise the burden, hence the competition, and lengthen control in simulation.

### Alvarez–Viossat: dropping two hypotheses

Alvarez and Viossat (2024, *J. Math. Biol.* 88:41; arXiv:2211.17041, "Tumor containment for Norton–Simon models") generalise the theory in the two places it was weakest: they allow **mutations from sensitive to resistant** and they drop the assumption that $g_s$ is non-increasing in $R$. The trick is to compare tumour sizes across treatments as functions of the **resistant population size** rather than of time — a change of independent variable that makes the monotone comparison work again.

## Cards

Q: What single hypothesis on the growth rates carries the Viossat–Noble containment theorems, and what does it *not* require?
A: $\partial_S g_r \le 0$: extra sensitive cells slow resistant growth. It does **not** require a fitness cost of resistance ($g_r$ may exceed $g_s$).
See: Viossat–Noble: the comparison theorem

Q: Sketch the comparison argument showing ideal containment at $N_0$ keeps $R$ pointwise smallest.
A: At a first touching time $R_{\mathrm{cont}}=R_{\mathrm{alt}}$, containment has $S_{\mathrm{cont}} = N_0-R \ge N_{\mathrm{alt}}-R = S_{\mathrm{alt}}$ (since $N_{\mathrm{alt}}\le N_0$ before progression), so $\partial_S g_r\le0$ gives $\dot R_{\mathrm{cont}}\le\dot R_{\mathrm{alt}}$. Hence no crossing.
See: Viossat–Noble: the comparison theorem

Q: In the Gompertz containment model, give $t_{\mathrm{prog}}$ under ideal containment and ideal MTD, and the relative benefit.
A: With $x=\ln(N_0/R_0)/\ln(K/N_0)$: $x/\rho$ for containment and $\ln(1+x)/\rho$ for ideal MTD, so the benefit is $x/\ln(1+x)$ — independent of $\rho$.
See: The Gompertz formulas

Q: When is the containment benefit $x/\ln(1+x)$ largest, and why is that counter-intuitive?
A: When $x$ is large, i.e. $N_0$ close to $K$ and resistance rare. A *large* tumour with *little* resistance gains most from being held rather than shrunk.
See: The Gompertz formulas

Q: In the Gompertz model $\dot S = \rho\ln(K/N)(1-\lambda C)S$, what dose holds $N$ constant, and when does it fail?
A: $C = N/(\lambda S)$, from $(1-\lambda C)S+R = 0$. It exceeds the cap once $S < N_0/\lambda$, so ideal containment is infeasible as the sensitive cells run out.
See: How much dose does containment need

Q: What is special about the constant dose $C = 1/\lambda$ in the Gompertz containment model?
A: It makes $\dot S \equiv 0$ exactly, so the whole burden increase comes from $R$. Hence it approximates containment well while resistance is rare, and the optimal constant dose is slightly above it.
See: How much dose does containment need

Q: In Hansen–Woods–Read, what is the balance threshold and what does it balance?
A: $R_{\mathrm{balance}} = \varepsilon(1-\delta P_{\max})/\delta$ (no cost): the resistant density at which the competitive suppression supplied by sensitive cells exactly cancels the resistant mutants they generate. Above it, keep sensitive cells; below it, they are a liability.
See: Hansen–Woods–Read: the balance threshold

Q: According to Strobl et al. (2021), when is a cost of resistance dispensable for adaptive therapy, and what substitutes for it?
A: Near carrying capacity with rare resistance no cost is needed; far from capacity one may be. High **turnover** $d_T$ amplifies both the benefit of adaptive therapy and the effect of any cost.
See: Turnover, cost of resistance, and triggers

Q: What two hypotheses do Alvarez and Viossat (2024) remove, and by what device?
A: They allow sensitive-to-resistant mutations and drop the monotonicity of $g_s$ in $R$, by comparing tumour sizes across treatments as functions of $R$ instead of $t$.
See: Alvarez–Viossat: dropping two hypotheses

## Quiz

Q: In the Gompertz containment model with $x = \ln(N_0/R_0)/\ln(K/N_0)$, the ratio of progression times $t_{\mathrm{prog}}(\mathrm{idCont})/t_{\mathrm{prog}}(\mathrm{idMTD})$ equals
- [x] $x/\ln(1+x)$
- [ ] $\ln(1+x)/x$
- [ ] $\rho\,x/\ln(1+x)$
- [ ] $x\ln(1+x)$
E: Containment gives $x/\rho$, ideal MTD gives $\ln(1+x)/\rho$, and $\rho$ cancels. Since $x > \ln(1+x)$ for $x>0$, the ratio exceeds 1, and the inverse option is the sign error to avoid.
See: The Gompertz formulas

Q: Viossat and Noble's optimality of containment relies on
- [x] a monotone comparison argument using $\partial_S g_r \le 0$
- [ ] Pontryagin's maximum principle with a state constraint
- [ ] a verification theorem for a viscosity solution of an HJB equation
- [ ] a fitness cost of resistance, $g_r < g_s$
E: No Hamiltonian appears; the policy is defined pathwise and compared by ODE comparison. The missing link between this and the PMP/HJB formulations (where containment is a boundary arc) is an acknowledged open problem.
See: Viossat–Noble: the comparison theorem

Q: In Hansen–Woods–Read's containment equation, the sensitive population enters $\dot R$ with
- [x] a negative suppression term and a positive mutational-input term
- [ ] only a negative suppression term
- [ ] only a positive mutational-input term
- [ ] no direct effect, since the drug acts on $S$ alone
E: Sensitive cells suppress resistant growth through competition, $-rR\delta(P_{\max}-R)$, and also generate resistant mutants, $+\varepsilon r(P_{\max}-R)(1-\delta P_{\max})$. The balance threshold is where the two cancel.
See: Hansen–Woods–Read: the balance threshold

Q: Hansen and Read (2020) propose inverting the trial's trigger. Their rule is to
- [x] start treatment when the burden rises about 10 per cent above baseline and stop when it returns to baseline
- [ ] stop at a 10 per cent decline and restart at a 50 per cent decline
- [ ] treat continuously until the burden stops falling
- [ ] stop treatment permanently once the burden reaches baseline
E: Their aim is to keep the burden, and hence the competition, as high as is tolerable; raising the baseline by delaying the start does the same. The original rule drives the burden down to half of baseline, which weakens suppression.
See: Turnover, cost of resistance, and triggers
