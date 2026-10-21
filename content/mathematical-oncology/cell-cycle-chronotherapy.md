---
title: "Cell-cycle models, Floquet versus Perron, and chronotherapy"
tags: [cancer, age-structured-models, floquet-theory, chronotherapy, periodic-control, monotone-systems]
created: 2026-10-21
related: [chemotherapy-optimal-control-origins, space-and-trait-models, bang-bang-singular-metronomic, pouchol-optimal-control-ide, persisters-phenotypic-switching, kill-laws-and-scheduling-principles, radiotherapy-fractionation-control, tumor-growth-laws]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

The age-structured half of this chapter is linear. Cells move through cycle phases, drugs act on death or transition rates, and the question of chronotherapy, when during the day to deliver a drug, becomes a question about the growth exponent of a periodically forced linear renewal equation. The answer is a Floquet eigenvalue, and the mathematical content is whether periodic forcing grows faster or slower than its time average.

### Age-structured multi-phase models

The models of Clairambault, Michel and Perthame (2006) are McKendrick-type systems over cycle phases $i=1,\dots,I$ with densities $n_i(t,a)$ in phase age $a$ [paraphrased from the abstracts; the full texts were not read for this survey]:
$$
\partial_tn_i+\partial_an_i+\big[d_i(t,a)+K_{i\to i+1}(t,a)\big]n_i=0,\qquad n_{i+1}(t,0)=\int_0^\infty K_{i\to i+1}(t,a)\,n_i(t,a)\,da,
$$
with the last phase feeding $n_1(t,0)=2\int K_{I\to1}n_I\,da$ (division doubles). Death rates $d_i$ and transition rates $K_{i\to i+1}$ are $T$-periodic in $t$, the circadian control. Older precursors exist: Gyllenberg and Webb (1990) is a nonlinear structured model of tumour growth with quiescence (only the bibliographic record was verified for this survey; the description of its proliferating/quiescent structure is from memory), and Basse et al. (2003) fit an age/DNA-content structured cell-cycle model to flow-cytometry data (record only).

### Floquet versus Perron

For a $T$-periodic linear system the population grows like $e^{\lambda_{per}t}$ where $\lambda_{per}$ is the **first Floquet eigenvalue**, $\frac1T$ times the log of the spectral radius of the monodromy operator. Replace every coefficient by its time average and the growth exponent becomes the **Perron eigenvalue** $\lambda_{avg}$ of an autonomous positive system. Results: if only the apoptosis rates $d_i$ are periodically modulated, $\lambda_{per}>\lambda_{avg}$ (2006, direct proof); if the transition rates are modulated, numerics show no natural ordering without further hypotheses. Clairambault, Gaubert and Perthame (2007) prove, for monotone (cooperative) linear periodic ODE systems and for the age-structured cell cycle, that the Perron eigenvalue of a suitable **arithmetico-geometric** time average of the coefficients is at most the Floquet eigenvalue; Clairambault, Gaubert and Lepoutre (2009, 2011) compare systematically, including cases where periodic control slows growth (records only). The motivating biology, from the review of Lévi, Okyar, Dulong, Innominato and Clairambault (2010), is that circadian disruption accelerates tumour growth in mice; the inequality was proposed as a model of "cancer cells losing circadian rhythm grow faster".

A toy computed for this note: $\dot n=A(t)n$ with $A(t)=\begin{pmatrix}-1-d(t)&2\\1&-1\end{pmatrix}$, $d(t)=1+\cos2\pi t$ (periodic death in compartment 1 only, cooperative off-diagonals). The averaged matrix has Perron eigenvalue $0$, while the Floquet exponent of the periodic system is $\approx0.0069>0$: the same direction as the 2006 result. For a scalar equation $\dot n=(r-d(t))n$ the two coincide, so the inequality is a structure effect of age or compartment coupling, not of the forcing alone.

### Which drug acts on which rate

Billy and Clairambault (2013) set out which model target each drug class should act on: cytotoxic agents on death rates, cytostatic agents on phase-transition (notably G1/S) rates, and others on differentiation; they list open control problems for cell-cycle PDEs. The linear precursor of all of this is the bilinear cell-cycle control of Swierniak, Polanski and Kimmel (1996), in the [origins chapter](#/note/chemotherapy-optimal-control-origins):
$$
\dot N=\Big(A+\sum_iu_iB_i\Big)N,\qquad J=pN(T)+\int_0^T\big(qN+b\,u\big)dt,
$$
with compartments $N\in\mathbb R^n$ and $u_i\in[0,1]$ the fraction killed or blocked. The maximum principle gives bang-bang extremals with possible singular arcs; the abstract states that "periodic chemotherapy protocols are close to the optimum for a wide class of models". Fister and Panetta (2000) prove existence and characterise optimal controls for cycle-specific models with bone marrow. Chronotherapy adds a periodic clock to this bilinear structure, and the objective becomes $\lambda_{per}$ of the controlled, periodically forced system: an **optimal periodic control of a linear renewal equation**.

### Chronotherapy in the clinic, and what the models are not

The chronotherapeutics programme (Lévi et al. 2010; Ballesta, Innominato, Dallmann, Rand and Lévi 2017, "systems chronotherapeutics") moved toward pharmacokinetic–pharmacodynamic and data-driven models rather than PDE control. Altinok, Lévi and Goldbeter (2007) use a cell-cycle automaton coupled to the circadian clock to test 5-FU and oxaliplatin schedules. Hill, Innominato, Lévi and Ballesta (2020) is a pharmacokinetic study of chronomodulated hepatic-artery infusion (a pump-to-patient transport equation plus compartmental PK, with patient clustering), **not** a cell-cycle optimisation; a brief that attributes one to it is wrong.

### The link to the nonlinear chapter

Floquet-versus-average is also the mechanism of [Figueroa Iglesias–Mirrahimi (2018)](#/note/space-and-trait-models), where the constrained HJ limit of a periodically forced selection equation replaces the fitness by its time average and extinction is decided by a periodic principal eigenvalue. The two literatures have not been combined: a phenotype-structured, cell-phase-structured model with periodic drug delivery, where one would optimise a periodic schedule against a nonlinear selection equation, does not exist in the sources surveyed. The persister models of the [next note](#/note/persisters-phenotypic-switching) have the same linear-growth-rate structure with a dose-dependent generator, and Gunnarsson et al. (2025) find that fast alternation between maximal dose and none is optimal in one regime, a Floquet-type statement.

## Cards

Q: Why is the growth rate of a periodically forced linear cell-population model a Floquet eigenvalue?
A: The system is linear with $T$-periodic coefficients, so solutions grow like the spectral radius of the monodromy operator over one period: $\lambda_{per}=\frac1T\ln\operatorname{rad}(M_T)$.
See: Floquet versus Perron

Q: What is compared with the Floquet eigenvalue in the chronotherapy models, and what is the 2006 result?
A: The Perron eigenvalue $\lambda_{avg}$ of the system with time-averaged coefficients. If only apoptosis rates are periodically controlled, $\lambda_{per}>\lambda_{avg}$ (Clairambault–Michel–Perthame 2006).
See: Floquet versus Perron

Q: What does the Clairambault–Gaubert–Perthame (2007) inequality say, and for which systems?
A: For monotone (cooperative) linear periodic systems and the age-structured cell cycle, the Perron eigenvalue of an arithmetico-geometric time average of the coefficients is at most the Floquet eigenvalue.
See: Floquet versus Perron

Q: Is there a universal ordering between Floquet and Perron eigenvalues when transition rates are periodically controlled?
A: No. Clairambault et al. (2006, 2009) report no natural hierarchy without further hypotheses; periodic control of transitions can slow or speed growth.
See: Floquet versus Perron

Q: Why does the Floquet-versus-Perron gap vanish for a scalar equation $\dot n=(r-d(t))n$?
A: The solution is $n_0\exp\int(r-d)$, so the exponent is exactly the time average; the inequality is a coupling effect of age or compartment structure.
See: Floquet versus Perron

Q: In cell-cycle models, which rates do cytotoxic and cytostatic drugs act on (Billy–Clairambault 2013)?
A: Cytotoxic drugs on death rates; cytostatic drugs on phase-transition rates (G1/S); other agents on differentiation.
See: Which drug acts on which rate

Q: What is the structure of the Swierniak–Polanski–Kimmel bilinear cell-cycle control problem, and what do its extremals look like?
A: $\dot N=(A+\sum u_iB_i)N$ with an $L^1$ control cost; the maximum principle gives bang-bang controls with possible singular arcs, and periodic protocols are reported close to optimal.
See: Which drug acts on which rate

Q: What is Hill et al. (2020) about, and what is it not?
A: A pharmacokinetic model of chronomodulated hepatic-artery infusion (pump-to-patient transport plus compartmental PK, patient clustering). It is not a cell-cycle or circadian optimisation.
See: Chronotherapy in the clinic, and what the models are not

## Quiz

Q: If only the apoptosis rates of an age-structured cell-cycle model are periodically modulated, then…
- [x] $\lambda_{per}>\lambda_{avg}$: the periodic population grows faster than the time-averaged one
- [ ] $\lambda_{per}<\lambda_{avg}$
- [ ] $\lambda_{per}=\lambda_{avg}$ always
- [ ] the ordering depends on the phase of the forcing
E: This is the 2006 result with a direct proof; the ordering is lost when transition rates are controlled.
See: Floquet versus Perron

Q: For the monotone periodic systems of Clairambault–Gaubert–Perthame (2007), the Floquet eigenvalue is bounded below by the Perron eigenvalue of…
- [x] an arithmetico-geometric time average of the coefficients
- [ ] the coefficients at their maximum over the period
- [ ] the arithmetic average of all coefficients
- [ ] the harmonic average of the coefficients
E: The plain arithmetic average gives no universal ordering once off-diagonal (transition) terms vary; the mixed average does.
See: Floquet versus Perron

Q: Chronotherapy as a control problem on the cell-cycle PDE is…
- [x] optimal periodic control of a linear renewal equation with the Floquet eigenvalue as objective
- [ ] a state-constrained nonlinear problem with Lagrange multipliers
- [ ] a stochastic control problem on a branching process
- [ ] an HJB equation on the space of measures
E: The model is linear; periodicity of the control makes the growth exponent a Floquet eigenvalue. The nonlinear selection version is not in the literature surveyed.
See: The link to the nonlinear chapter
