---
title: "Stem-cell hierarchies and clonal selection in leukaemia"
tags: [cancer, leukaemia, stem-cells, delay-equations, hopf-bifurcation]
created: 2026-10-21
related: [cml-dynamics-treatment-free-remission, immunotherapy-optimal-control, selection-mutation-hamilton-jacobi, constrained-hj-uniqueness-regularity, cancer-somatic-evolution, branching-process-resistance, lorz-clairambault-resistance-model, control-of-evolving-populations, adaptive-dynamics]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

Blood is a hierarchy: a few stem cells feed progenitors that feed mature cells, with feedback from the mature compartment back to the top. Leukaemia models are compartment models of this hierarchy with a second, malignant chain competing for the same niche or signal. Three mathematical ideas organise the literature: feedback on the self-renewal fraction, selection among clones by self-renewal rather than speed, and delays (or compartment depth) producing oscillations.

### Therapy must hit the stem cells

Dingli and Michor (2006) made the simplest point with a stem/progenitor model: a therapy that kills progenitors and differentiated cells but spares the cancer stem cells only delays relapse, because the stem compartment regenerates the chain. This is the deterministic side of the [CML stem-cell debate](#/note/cml-dynamics-treatment-free-remission).

### Feedback on the self-renewal fraction

Marciniak-Czochra, Stiehl, Ho, Jäger and Wagner (2009) proposed that regulation acts on the **fraction of self-renewing divisions** rather than on the division rate. In the two-compartment version (dividing cells $c_1$, mature cells $c_2$; the same equations appear verbatim in Busse, Gwiazda and Marciniak-Czochra 2016):
$$
c_1' = \big(2a\,s - 1\big)\,p\,c_1,\qquad c_2' = 2\big(1-a\,s\big)\,p\,c_1 - d\,c_2,\qquad s = \frac{1}{1+k\,c_2},
$$
where $a\in(0,1)$ is the maximal self-renewal fraction, $p$ the proliferation rate, $d$ the death rate of mature cells and $s$ the feedback signal, which falls as mature cells accumulate. A division produces two daughters; a fraction $as$ of them stay in the dividing pool, so the pool grows iff $2as>1$. At equilibrium $s^*=1/(2a)$, which requires $a>1/2$, and then
$$
c_2^* = \frac{2a-1}{k},\qquad c_1^* = \frac{d}{p}\,c_2^* .
$$
The mature count is set by self-renewal and feedback strength alone; the proliferation rate only sets how many dividing cells are needed to maintain it and how fast the system gets there. If $a\le1/2$ the population dies out.

### Leukaemic takeover and clonal selection

Stiehl and Marciniak-Czochra (2012) add a leukaemic chain with its own $(a_l,p_l)$ reading the same signal $s$. At the healthy equilibrium the leukaemic dividing cells obey $l_1' = (2a_l s^* - 1)\,p_l\,l_1 = p_l\,\frac{a_l - a}{a}\,l_1$, so a leukaemic clone invades iff its self-renewal fraction exceeds the healthy one, $a_l>a$, whatever its proliferation rate; $p_l$ sets only the speed. This is their condition for takeover in terms of self-renewal, and the stability of the healthy, leukaemic and coexistence states is worked out as functions of $a$ and $p$. Stiehl, Baran, Ho and Marciniak-Czochra (2014, J. R. Soc. Interface, not Cancer Research) run several leukaemic clones against each other in two variants, Model 1 with shared feedback and Model 2 in which leukaemic cells ignore the feedback and die when the marrow is overcrowded, with chemotherapy killing in proportion to proliferation. Simulations calibrated to two patients' clone sizes show that fast-proliferating, highly self-renewing clones dominate at diagnosis, whereas relapse after therapy is driven mostly by highly self-renewing but slowly proliferating clones; fast clones with low self-renewal were never seen at relapse, and Model 1 is incompatible with remissions shorter than 150 days. These are simulation results; the analytic content is the 2012 two-population case.

### Trait-structured limits and concentration

Replacing finitely many clones by a continuum of self-renewal traits $x$ turns the clone competition into a selection equation, the leukaemia instance of [Dirac concentration](#/note/selection-mutation-hamilton-jacobi). Busse, Gwiazda and Marciniak-Czochra (2016) prove, for $u_1(t,x)$, $u_2(t,x)$ with the feedback $s=1/(1+K\rho_2)$ through the total mature mass $\rho_2$, that if $a$ has a unique maximiser $\bar x$ with $\bar a>1/2$ then $(u_1,u_2)\to(c_1,c_2)\delta_{\bar x}$ in the flat (bounded-Lipschitz) metric with $c_2=(2\bar a-1)/K$ and $c_1=\frac dp c_2$, the equilibrium of the finite-dimensional model above; if $\bar a\le1/2$ the population goes extinct, and two maxima give two Diracs with weights depending on the initial data. The Lyapunov function comes from the ODE model, and there is no mutation term (its inclusion is stated as open), so this is concentration outside the Hopf–Cole paradigm of the [constrained Hamilton–Jacobi theory](#/note/constrained-hj-uniqueness-regularity). Lorenzi, Marciniak-Czochra and Stiehl (2019) extend the structured model to multiple maturation stages and prove selection results there.

### Delays and periodic disease

The older hematopoiesis line (Mackey's $G_0$ model of 1978, cited from memory and unverified; reviewed in Haurie, Dale and Mackey 1998 and Foley and Mackey 2009) replaces compartments by a cell-cycle delay $\tau$ and reads periodic blood diseases as Hopf bifurcations of delayed feedback, "dynamical diseases". Adimy, Crauste and Ruan (2005) use a distributed delay (cell-cycle durations spread over an interval) and in 2006 add growth-factor feedback as three delay equations; both give a Hopf bifurcation at the positive steady state with long-period oscillations relevant to periodic CML. Colijn and Mackey (2005) couple the stem-cell delay equation to three mature lineages and fit eleven periodic-CML patients: the oscillations require simultaneous changes in stem-cell apoptosis, differentiation and amplification, with apoptosis the most sensitive. Knauer, Stiehl and Marciniak-Czochra (2020) show that delay is not necessary: a three-stage ODE with self-renewal feedback has a supercritical Hopf bifurcation with an explicit formula, while the two-stage model does not. Oscillations need either delay or enough compartment depth.

### Lyapunov–Krasovskii conditions and control

Djema, Bonnet, Mazenc, Clairambault, Fridman, Hirsch and Delhommeau (2018) start from age-structured healthy and mutated stem cells, integrate along characteristics to get a delay plus differential-difference system, include an immunoediting parameter, and give Lyapunov–Krasovskii conditions under which the mutated population is held dormant or eradicated; Özbay, Bonnet, Benjelloun and Clairambault (2012) had given small-gain stability conditions for distributed-delay AML models. On the control side, Sharp et al. (2019) apply Pontryagin to an AML model with an immune term and Mazel, Grognard, Stiehl, Rapaport and Djema (2026) analyse a healthy/leukaemic model under chemotherapy with a turnpike property; see [immunotherapy control](#/note/immunotherapy-optimal-control). Pre-existing resistant mutants in the stem compartment are the subject of [branching-process resistance](#/note/branching-process-resistance).

## Cards

Q: In the Marciniak-Czochra feedback model $c_1'=(2as-1)pc_1$, $s=1/(1+kc_2)$, what is the equilibrium mature-cell count and what does it depend on?
A: $c_2^*=(2a-1)/k$: it depends on the self-renewal fraction $a$ and feedback strength $k$ only, not on the proliferation rate $p$, which enters only $c_1^*=(d/p)\,c_2^*$.
See: Feedback on the self-renewal fraction

Q: Why does the hematopoietic feedback model need $a>1/2$?
A: A fraction $as$ of the two daughters of each division stays in the dividing pool, so the pool is maintained iff $2as^*=1$, which needs $s^*=1/(2a)\le1$, that is $a\ge1/2$; for $a\le1/2$ the population dies out.
See: Feedback on the self-renewal fraction

Q: In Stiehl and Marciniak-Czochra's (2012) model, when does a leukaemic clone invade the healthy equilibrium, and what role does its proliferation rate play?
A: Iff its self-renewal fraction exceeds the healthy one, $a_l>a$: the invasion rate is $p_l(a_l-a)/a$, so $p_l$ sets only the speed, not the sign.
See: Leukaemic takeover and clonal selection

Q: Which clones dominate at diagnosis and which at relapse in Stiehl et al. (2014)?
A: Fast-proliferating, highly self-renewing clones at diagnosis; highly self-renewing but slowly proliferating clones at relapse, because chemotherapy kills in proportion to proliferation. Fast, low-self-renewal clones never appear at relapse.
See: Leukaemic takeover and clonal selection

Q: What do Busse, Gwiazda and Marciniak-Czochra (2016) prove for the self-renewal-structured leukaemia model, and in what topology?
A: With a unique maximiser $\bar x$ of $a$ and $\bar a>1/2$, the solution converges to $(c_1,c_2)\delta_{\bar x}$ in the flat (bounded-Lipschitz) metric, with $c_2=(2\bar a-1)/K$; no mutation term, Lyapunov function from the ODE model.
See: Trait-structured limits and concentration

Q: Does a hematopoiesis model need a delay to oscillate?
A: No. Knauer, Stiehl and Marciniak-Czochra (2020) show a three-stage ODE with self-renewal feedback has a supercritical Hopf bifurcation while the two-stage one does not; delay or compartment depth both work.
See: Delays and periodic disease

Q: How do Djema et al. (2018) get from an age-structured stem-cell model to conditions for dormancy or eradication?
A: Integrating along characteristics turns the PDE into a delay plus differential-difference system, on which Lyapunov–Krasovskii functionals give sufficient conditions for the mutated population to stay dormant or be eradicated.
See: Lyapunov–Krasovskii conditions and control

## Quiz

Q: Two leukaemic clones compete under shared feedback: clone 1 has $(a_l,p_l)=(0.7,\,2p)$ and clone 2 has $(0.9,\,p/2)$, against healthy $a=0.8$. In the long run
- [x] clone 2 takes over; clone 1 cannot even invade
- [ ] clone 1 takes over, since it divides four times faster
- [ ] both coexist, since they differ in both traits
- [ ] neither invades, since the healthy population is at equilibrium
E: Invasion needs $a_l>a$; clone 1 has $a_l=0.7<0.8$ and dies out regardless of speed, while clone 2 invades at rate $p_l(0.9-0.8)/0.8$.
See: Leukaemic takeover and clonal selection

Q: In the self-renewal-structured model of Busse et al. (2016), the limit is a single Dirac at the maximal self-renewal trait because
- [x] all traits read the same feedback signal $s$, and only the largest $a$ keeps $2a(x)s>1$ as $s$ settles to $1/(2\bar a)$
- [ ] a small mutation term is sent to zero, as in the Hopf–Cole limit
- [ ] the fastest-proliferating trait outgrows the others
- [ ] the flat metric forces measure-valued limits to be atomic
E: Selection is through the common signal: at the limiting $s^*=1/(2\bar a)$ every trait with $a(x)<\bar a$ has negative growth. There is no mutation term, and the flat metric is only the right topology for the result.
See: Trait-structured limits and concentration

Q: Colijn and Mackey (2005) fitted a delay model to eleven periodic-CML patients and concluded that the oscillations
- [x] require simultaneous changes in stem-cell apoptosis, differentiation and amplification, with apoptosis the most sensitive
- [ ] arise from the immune window of the Clapp model
- [ ] arise from imatinib pharmacokinetics
- [ ] arise from a change in a single lineage's feedback gain
E: The oscillation is a Hopf bifurcation of the coupled delayed feedback; it needs several stem-cell parameters to move together. Whether low-level BCR-ABL fluctuations under therapy are delay-induced or immune-induced is undecided.
See: Delays and periodic disease
