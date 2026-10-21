---
title: Persisters and phenotypic switching
tags: [cancer, drug-tolerance, phenotypic-plasticity, branching-processes, optimal-dosing]
created: 2026-10-21
related: [lorz-clairambault-resistance-model, cell-cycle-chronotherapy, constrained-hj-uniqueness-regularity, branching-process-resistance, pre-existing-resistance, drug-induced-resistance-control, evolutionary-steering-collateral-sensitivity, adaptive-therapy-control, field-open-questions, control-of-evolving-populations]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

Not all resistance is genetic. Some cells survive a drug by entering a reversible, slowly dividing tolerant state and come back sensitive when the drug is removed. This note records the experiment, the two mathematical ways of modelling it, and what the models say about dosing. The mathematics is simpler than the rest of this chapter, finite-dimensional linear or bilinear growth, but it is the regime in which the usual "resistance is pre-existing and irreversible" assumptions of [Luria–Delbrück](#/note/pre-existing-resistance) fail.

### The experiment

Sharma et al. (2010, Cell) found in drug-sensitive cancer cell lines a small subpopulation of **drug-tolerant persisters**, over 100-fold less sensitive, maintained by IGF-1R signalling and a chromatin state depending on the histone demethylase KDM5A; the state is entered and left at low frequency and can be eliminated by IGF-1R inhibitors or chromatin-modifying agents. The two facts that matter for modelling are reversibility and non-genetic origin.

### The modelling fork

Two formalisms coexist. **Discrete switching**: a sensitive type and a tolerant type with switching rates, as a multitype branching process or its mean ODE (Gunnarsson and coauthors). **Continuous trait with advection**: an integro-differential equation in which the drug pushes the trait toward tolerance (Chisholm et al.). The first is linear and gives explicit growth rates and extinction probabilities; the second lives in the [constrained HJ world](#/note/constrained-hj-uniqueness-regularity) but with an asymmetric Hamiltonian, where the pessimization principle no longer applies.

Chisholm, Lorenzi, Lorz, Larsen, Almeida, Escargueil and Clairambault (2015) combine three ingredients: selection, non-genetic instability (an epimutation diffusion in trait space), and stress-induced adaptation (an advection toward the tolerant trait under drug), in an individual-based model and an IDE. They reproduce the transient drug-tolerant state that reverses after washout and suggest that stem-like traits prolong it. Only the abstract was verified for this survey; the equations are not reproduced here.

### Switching alone can sustain a tumour (Gunnarsson, De, Leder, Foo 2020)

Type 0 (sensitive) cells divide at $r_0$, die at $d_0$ and switch to type 1 at rate $\mu$; type 1 (tolerant) cells divide at $r_1$, die at $d_1$ and revert at rate $\nu$; $\lambda_i=r_i-d_i$. Under drug, $\lambda_0<0<\lambda_1$ (tolerant cells grow slowly). The core model is a two-type continuous-time branching process whose mean obeys $\dot m=mA$ with
$$
A=\begin{pmatrix}\lambda_0-\mu&\mu\\ \nu&\lambda_1-\nu\end{pmatrix}.
$$
The population can survive iff the Perron eigenvalue $\sigma$ of $A$ is positive. Since $\operatorname{tr}A>0$ with $\det A\ge0$ is impossible when $\lambda_0<0<\lambda_1$, this is $\det A<0$, i.e.
$$
\nu\lambda_0+\mu\lambda_1>\lambda_0\lambda_1 ,
$$
and a sufficient condition is $\lambda_1\ge\nu$: the retention time $1/\nu$ of the tolerant state exceeds its doubling-type time $1/\lambda_1$ (the paper calls $1/\nu$ phenotypic memory). Hence long-term resistance needs no genetic mechanism: either long retention or fast enough switching $\mu$ suffices. Near the critical $\nu$ a small change in retention flips certain failure into certain success, which is where an epigenetic drug should act. Among the tested schedules, giving the epigenetic drug concurrently with the cytotoxic one did best and pretreating with it did worst (sensitive cells expand off-drug and tolerance is acquired quickly on-drug). Stably resistant cells (type 2, by reprogramming or mutation) are in the full model but set aside in the analysis.

### Steering to an equilibrium mixture (Gunnarsson, Magnússon, Foo 2025)

Now the dose $c$ **induces** tolerance: $d_0(c)=d_0+(d_{max}-d_0)\frac{c}{c+1}$ (dose scaled by the EC$_{50}$), and either linear induction $\mu(c)=\mu_0+kc$, $\nu(c)=\nu_0-mc$, or uniform induction ($\mu=\mu_{max}$, $\nu=\nu_{min}$ for any $c>0$). The mean dynamics
$$
\dot n_0=(\lambda_0(c)-\mu(c))n_0+\nu(c)n_1,\qquad \dot n_1=(\lambda_1-\nu(c))n_1+\mu(c)n_0
$$
reduce to one equation for the sensitive fraction $f_0=n_0/(n_0+n_1)$,
$$
\dot f_0=(\lambda_1-\lambda_0(c))f_0^2-(\lambda_1-\lambda_0(c)+\mu(c)+\nu(c))f_0+\nu(c)
$$
(recomputed), with growth rate under constant dose $\sigma(c)=\tfrac12\big[\lambda_0-\mu+\lambda_1-\nu+\sqrt{(\lambda_0-\mu-\lambda_1+\nu)^2+4\mu\nu}\big]$ and equilibrium fraction $\bar f_0(c)=\nu/(\sigma-\lambda_0+\mu+\nu)$ (both checked against the eigenproblem). Objectives: the total count at $T$, or the long-run growth rate. The stated structure of the optimum, with proofs in a supplement not read here: a transient that steers $f_0$ to a target composition, then a constant dose $c^*$ holding it, the tumour "steered to a fixed equilibrium composition between sensitive and tolerant cells". Under linear induction $c^*=\arg\min\sigma(c)$ is a **continuous low dose** (a check computed for this note: with $b_0=0.6$, $d_0=0.2$, $d_{max}=1.4$, $\lambda_1=-0.02$, $\mu_0=0.01$, $k=0.3$, $\nu=0.05$, $\sigma$ is minimised at $c^*\approx1.6$ with $\sigma(c^*)\approx-0.039$, below both $\sigma(0)=0.39$ and $\sigma(20)=-0.025$). Under uniform induction the long-run optimum is continuous maximal dose if the drug only raises $\mu$, and arbitrarily fast alternation of $c_{max}$ and $0$ if it also lowers $\nu$; halving the cycle length never hurts. He, McCoy, Riggins, Beckman and Yeang (2025) extend the evolutionary-control strategies of the [steering chapter](#/note/evolutionary-steering-collateral-sensitivity) to reversible resistance (record only).

### The open question, and the structure

West et al. (2023, eLife), open question 3: drug holidays can reverse switching and resensitise cells, but the benefit depends jointly on the switching rate and the sensitive growth rate; plasticity may be a continuum of traits, multidimensional for several drugs; and the open problem is **how to identify plasticity in a specific tumour before choosing a strategy**. Report-level gaps: no model combines a Luria–Delbrück mutation layer with a fast reversible switching layer and derives the optimal schedule, although the clinical question (does a persister population buy time for a permanent mutation?) is exactly about the coupling.

For the reader: the discrete model is bilinear control of a positive linear system, $\dot n=A(c)n$, with the Perron eigenvalue of $A(c)$ as the long-run objective, the same object as in the [cell-cycle chapter](#/note/cell-cycle-chronotherapy); the fast-alternation optimum is a Floquet statement. The continuous model is the constrained HJ problem with a drift $v(c)\partial_xu$ added to the Hamiltonian: still convex in $p$, so Calvez–Lam's hypotheses allow it for a fixed dose, but $\partial_pH(I,x,0)\neq0$, so $I(t)$ need not be monotone and the "environment only worsens" intuition fails. A time-dependent dose takes it outside the stated uniqueness theorems altogether.

## Cards

Q: Which two properties of drug-tolerant persisters (Sharma et al. 2010) drive the modelling?
A: Reversibility (the state is entered and left at low frequency, lost after drug removal) and non-genetic, chromatin-mediated origin (KDM5A, IGF-1R signalling).
See: The experiment

Q: What are the two formalisms for phenotypic switching, and what mathematics does each lead to?
A: Discrete sensitive/tolerant types with switching rates (branching process or linear ODE: Perron eigenvalues, extinction probabilities), or a continuous trait with epimutation diffusion plus drug-induced advection (IDE, constrained HJ with an asymmetric Hamiltonian).
See: The modelling fork

Q: In Gunnarsson et al. (2020), when can switching alone sustain the population under drug ($\lambda_0<0<\lambda_1$)?
A: Iff the Perron eigenvalue of $A=\begin{pmatrix}\lambda_0-\mu&\mu\\ \nu&\lambda_1-\nu\end{pmatrix}$ is positive, i.e. $\nu\lambda_0+\mu\lambda_1>\lambda_0\lambda_1$; sufficient: $\lambda_1\ge\nu$ (retention time $1/\nu\ge1/\lambda_1$).
See: Switching alone can sustain a tumour (Gunnarsson, De, Leder, Foo 2020)

Q: Why does the survival condition reduce to $\det A<0$ when $\lambda_0<0<\lambda_1$?
A: $\sigma>0$ with $\det A\ge0$ would need $\operatorname{tr}A>0$, which forces $\mu<0$; so $\sigma>0$ iff $\det A<0$.
See: Switching alone can sustain a tumour (Gunnarsson, De, Leder, Foo 2020)

Q: Which ordering of an epigenetic drug and a cytotoxic drug did best and worst in Gunnarsson et al. (2020)?
A: Concurrent administration best; epigenetic pretreatment worst, because sensitive cells expand off-drug and tolerance is then acquired quickly on-drug.
See: Switching alone can sustain a tumour (Gunnarsson, De, Leder, Foo 2020)

Q: What is the structure of the optimal dose under drug-induced plasticity (Gunnarsson–Magnússon–Foo 2025)?
A: A transient that steers the sensitive fraction $f_0$ to a target, then a constant dose $c^*$ that holds the tumour at an equilibrium sensitive/tolerant mixture; under linear induction $c^*=\arg\min_c\sigma(c)$, a continuous low dose.
See: Steering to an equilibrium mixture (Gunnarsson, Magnússon, Foo 2025)

Q: When is fast alternation between maximal dose and no dose optimal in Gunnarsson–Magnússon–Foo (2025)?
A: Under uniform induction (any positive dose switches the rates to $\mu_{max},\nu_{min}$) when the drug also suppresses reversion $\nu$; if it only raises $\mu$, continuous maximal dose is optimal.
See: Steering to an equilibrium mixture (Gunnarsson, Magnússon, Foo 2025)

Q: Why does drug-induced advection in the continuous-trait model break the pessimization principle?
A: The drift adds a term linear in $p$ to the Hamiltonian, so $\partial_pH(I,x,0)\neq0$; Calvez–Lam's monotonicity of $I(t)$ needs $\partial_pH(I,x,0)=0$ (a symmetric kernel).
See: The open question, and the structure

## Quiz

Q: In the two-type switching model under drug, a sufficient condition for the tumour to survive is…
- [x] $\lambda_1\ge\nu$: tolerant cells grow faster than they revert
- [ ] $\mu\ge\nu$
- [ ] $\lambda_0+\lambda_1>0$
- [ ] $\mu\lambda_0>\nu\lambda_1$
E: Then the diagonal entry $\lambda_1-\nu\ge0$ already forces the Perron eigenvalue of the Metzler matrix $A$ to be nonnegative; the exact criterion is $\nu\lambda_0+\mu\lambda_1>\lambda_0\lambda_1$.
See: Switching alone can sustain a tumour (Gunnarsson, De, Leder, Foo 2020)

Q: In Gunnarsson–Magnússon–Foo (2025) with linear dose-induced switching, the long-run optimal schedule is…
- [x] a continuous dose $c^*$ minimising the growth rate $\sigma(c)$, generally low
- [ ] the maximal tolerated dose continuously
- [ ] alternating maximal dose and holidays as fast as possible
- [ ] no treatment, since the drug induces tolerance
E: Higher doses kill more sensitive cells but induce more tolerance; $\sigma(c)$ has an interior minimum. Fast alternation is the uniform-induction answer when the drug also suppresses reversion.
See: Steering to an equilibrium mixture (Gunnarsson, Magnússon, Foo 2025)

Q: Which structural feature of the continuous-trait persister model takes it outside the "environment only worsens" monotonicity of $I(t)$?
- [x] the drug-induced advection, which makes $\partial_pH(I,x,0)\neq0$
- [ ] the epimutation diffusion
- [ ] the competition term $d\rho$
- [ ] the boundedness of the trait interval
E: Diffusion with a symmetric kernel keeps $\partial_pH(0)=0$; it is the drift toward tolerance that breaks the symmetry.
See: The open question, and the structure
