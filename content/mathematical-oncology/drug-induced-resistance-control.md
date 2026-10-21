---
title: Drug-induced resistance changes the optimal control
tags: [cancer, optimal-control, drug-resistance, identifiability, state-constraints]
created: 2026-10-21
related: [bang-bang-singular-metronomic, adaptive-therapy-control, tumour-containment-theory, pre-existing-resistance, persisters-phenotypic-switching, lorz-clairambault-resistance-model, numerical-optimal-control-methods]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

If resistance arises spontaneously, the dose affects only how fast sensitive cells die. If the drug itself *induces* resistance — by mutagenesis, by selecting for a tolerant phenotype, or by triggering a switch — then the dose also controls the rate at which resistant cells are created, and the optimal control changes qualitatively. Two lines of work make this precise.

### The Greene–Gevertz–Sontag model

In nondimensional form, with sensitive $S$, resistant $R$ and dose $u\in[0,M]$:
$$
\dot S = \big(1-(S+R)\big)S - (\varepsilon + \alpha u)S - d\,u\,S, \qquad
\dot R = p_r\big(1-(S+R)\big)R + (\varepsilon + \alpha u)S ,
$$
with $0\le p_r<1$ (resistance is costly), $\varepsilon$ the spontaneous transition rate, $\alpha$ the **drug-induced** rate and $d$ the kill rate; the drug does not act on $R$. The two mechanisms are structurally different: $\varepsilon$ is a constant leak, $\alpha u$ is a leak the controller opens by dosing.

Greene, Gevertz and Sontag (2019) showed that this distinction reverses therapeutic rankings. In their simulations with $\alpha = 0$, constant dosing far outperforms pulsed dosing (time to a critical volume $\approx 90$ versus $14$); with $\alpha = 10^{-2}$ the order flips (pulsed $61$ versus constant $45$). Since the two models can be fitted equally well to the same tumour-volume data, the practical question is whether $\alpha$ can be identified: they prove it is **structurally identifiable** from total volume measurements under several input protocols, with a closed-form expression for $\alpha$ obtained from Lie derivatives of the output. They also prove (2019, Thm 2) that under *any* regimen the state tends to $(S,R)\to(0,1)$: in this model resistance is eventual, so the only sensible objective is to delay it.

### Bang arcs and boundary arcs, not singular arcs

Greene, Sanchez-Tapia and Sontag (2020) take exactly that objective: maximize $t_c$, the first time the total volume $S+R$ reaches a critical value $V_c$ (assuming $V_c < 1-\varepsilon$), subject to the **path constraint** $S+R\le V_c$. Their results:

- if $\alpha = 0$ there are no singular arcs (Thm 13);
- with $\alpha>0$, singular arcs exist as candidates but **violate the Legendre–Clebsch condition**, so they are never locally optimal (Thm 16);
- consequently the optimal control is a concatenation of bang arcs $u\in\{0,M\}$ together with a **boundary control** $u_p$ that slides along $S+R = V_c$ (Thm 17);
- the supremum of $t_c$ is finite and is attained (Thms 19, 22), the resistant equilibrium lying outside the admissible region.

This is the cleanest available contrast with the chemotherapy syntheses of [bang-bang versus singular arcs](#/note/bang-bang-singular-metronomic). There, heterogeneity makes a singular arc optimal and the medical reading is "metronomic". Here the sign of the Legendre–Clebsch quantity goes the other way, the interior arc is excluded, and the medical reading is "containment": ride the constraint $S+R = V_c$. The structure of the optimum is decided by that sign, not by the biology of the drug.

### Interior optimal doses from stochastic rescue

Kuosmanen et al. (2021) change what is being optimized. Sensitive cells grow logistically with a Hill-type kill term and mutate to resistance at rate $\mu(u) = \mu_0 + \alpha u$; resistant lineages are founded by single cells with a fixed establishment probability, so the probability of rescue is $1-\exp(-\text{cumulative mutation intensity})$ and the cure probability is its complement. They solve the deterministic control problem by the Pontryagin principle (forward–backward sweep) and also obtain a dose-as-a-function-of-population-size rule from an HJB stationarity condition, then validate with Gillespie simulations. Numerically, the cure probability is **non-monotone in the dose with an interior maximum** (around $u\approx 104.5$ in their units) strictly below the dose of maximal population decay; a mutation-rate fold change of ten or less already suffices to make MTD harmful; and minimizing the expected size of the rescued population instead gives a still lower optimum ($u\approx 60$). The objective, again, moves the answer.

### Related lines

Carrère (2017) fitted a sensitive/resistant Lotka–Volterra model to in vitro data and designed controls that shrink the tumour while deliberately preserving sensitive cells; Carrère and Zidani (2020) recast the same model as a Hamilton–Jacobi reachability and viability problem under uncertainty. Gunnarsson, Magnússon and Foo (2025) treat drug-induced *plasticity* and report that the optimal dose steers the population to an equilibrium mixture of sensitive and tolerant cells, continuous low dosing or intermittent maximum dosing being preferred according to how fast tolerance is induced — a stabilization-to-a-manifold statement rather than a burden minimization. Akhmetzhanov et al. (2019) solve the HJB equation of a reversible proliferative/quiescent model analytically by characteristics, obtaining a switching curve and a chattering (singular) trajectory; over six months the optimal schedule gives a fold change of $1.24$ against $1.30$ for the best periodic, $1.48$ for the best static and $2.13$ for MTD, and it *initially* performs worse than static treatment — which would trigger early termination under conventional response criteria.

## Cards

Q: In the Greene–Sontag model, how do spontaneous and drug-induced resistance enter, and why does that matter for control?
A: As $\varepsilon$ and $\alpha u$ in the transition term $(\varepsilon + \alpha u)S$. The induced part is a leak the controller opens by dosing, so the dose trades killing against creating resistance.
See: The Greene–Gevertz–Sontag model

Q: Greene, Gevertz and Sontag (2019) found that constant and pulsed dosing can swap places. What drives the flip?
A: The induced-resistance rate $\alpha$: with $\alpha = 0$ constant dosing is far better (time to critical volume $\approx 90$ vs $14$), with $\alpha = 10^{-2}$ pulsed wins ($61$ vs $45$).
See: The Greene–Gevertz–Sontag model

Q: Why is the structural identifiability of $\alpha$ the crux of the Greene–Sontag analysis?
A: Models with and without induced resistance can fit the same volume data while giving opposite recommendations. They prove $\alpha$ is identifiable from total volume under several inputs, with a closed form from Lie derivatives of the output.
See: The Greene–Gevertz–Sontag model

Q: What is the optimal control structure for maximizing the time to reach a critical volume $V_c$ in the Greene–Sontag model?
A: A concatenation of bang arcs ($u\in\{0,M\}$) and boundary arcs that ride the path constraint $S+R = V_c$ with a boundary control $u_p$. Singular arcs violate the Legendre–Clebsch condition.
See: Bang arcs and boundary arcs, not singular arcs

Q: Same models, opposite advice: what distinguishes "metronomic" from "containment" in Pontryagin terms?
A: Metronomic dosing is an interior singular arc; containment is a boundary arc of a state constraint. Which one is optimal is decided by the sign of the Legendre–Clebsch quantity on the candidate singular arc.
See: Bang arcs and boundary arcs, not singular arcs

Q: In Kuosmanen et al. (2021), why is the cure probability maximized at an interior dose?
A: Because the mutation rate is $\mu(u) = \mu_0 + \alpha u$: raising the dose kills faster but raises the cumulative mutation intensity, and the rescue probability $1-e^{-\text{intensity}}$ grows with it. The optimum lies below the dose of maximal decay.
See: Interior optimal doses from stochastic rescue

Q: In Kuosmanen et al. (2021), how much induced mutagenesis is needed to make MTD harmful, and what happens if the objective is changed?
A: A mutation-rate fold change of ten or less suffices. Minimizing the expected rescued population size instead of maximizing cure probability moves the optimum lower still ($u\approx 60$ versus $\approx 104.5$).
See: Interior optimal doses from stochastic rescue

Q: What is clinically awkward about the optimal schedule found by Akhmetzhanov et al. (2019)?
A: It initially performs *worse* than static treatment (though best over six months: fold change $1.24$ vs $1.48$ static and $2.13$ MTD), so standard response-based stopping rules would abandon it early.
See: Related lines

## Quiz

Q: In the Greene–Sontag resistance model with $\alpha > 0$, singular arcs…
- [x] exist as candidates but violate the Legendre–Clebsch condition, so are never locally optimal
- [ ] are optimal once the resistant fraction is large
- [ ] do not exist because the relevant Lie bracket vanishes
- [ ] coincide with the boundary arcs of the constraint $S+R\le V_c$
E: Their Thm 16 computes the Legendre–Clebsch quantity and finds the wrong sign; the interior arc is replaced by a boundary arc on $S+R=V_c$ (Thm 17). The vanishing-bracket mechanism is what happens in the $S=bq$ anti-angiogenic variant instead.
See: Bang arcs and boundary arcs, not singular arcs

Q: Suppose a tumour's resistance is entirely spontaneous ($\alpha = 0$) but a modeller wrongly fits $\alpha > 0$. Based on the 2019 simulations, the likely consequence is…
- [x] recommending pulsed dosing where constant dosing would have been markedly better
- [ ] recommending MTD where a holiday schedule would have been better
- [ ] no change, since the two models are observationally indistinguishable
- [ ] overestimating the time to the critical volume under either schedule
E: With $\alpha=0$ constant dosing reached the critical volume at $t\approx 90$ versus $14$ for pulsed. The models are *not* indistinguishable: $\alpha$ is structurally identifiable from volume data under several inputs.
See: The Greene–Gevertz–Sontag model

Q: Kuosmanen et al. compute the optimal dose both by Pontryagin's principle and from an HJB stationarity condition. What does the HJB route add?
- [x] a dose expressed as a function of the current population size, i.e. a feedback rule
- [ ] a proof that the optimal control is bang-bang
- [ ] an existence proof for the optimal control
- [ ] the structural identifiability of the mutation-rate slope $\alpha$
E: Pontryagin gives an open-loop schedule along one trajectory; dynamic programming gives the dose as a function of state. Existence and identifiability come from elsewhere (Greene–Sontag 2020 proves existence in their own model).
See: Interior optimal doses from stochastic rescue
