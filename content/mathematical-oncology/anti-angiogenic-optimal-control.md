---
title: Anti-angiogenic therapy as a geometric optimal control problem
tags: [cancer, optimal-control, geometric-control, singular-arcs, angiogenesis]
created: 2026-10-21
related: [bang-bang-singular-metronomic, numerical-optimal-control-methods, radiotherapy-fractionation-control, chemotherapy-optimal-control-origins, kill-laws-and-scheduling-principles, tumor-growth-laws, invasion-and-angiogenesis-models]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

Anti-angiogenic therapy starves a tumour by attacking its blood supply rather than the tumour cells. Because the drug acts on a *second* state variable, the resulting control problem has enough structure to be solved completely — this is the one place in mathematical oncology where a full **synthesis of optimal controls** (which protocol is optimal from which initial state) is a theorem.

### The Hahnfeldt dynamic carrying capacity

Hahnfeldt, Panigrahy, Folkman and Hlatky (1999) let the Gompertzian carrying capacity become a state. With $p$ the tumour volume, $q$ the "effective vascular support", $u \in [0,a]$ the inhibitor dose rate:
$$
\dot p = -\xi\, p \ln\frac{p}{q}, \qquad \dot q = b p - d\,p^{2/3} q - \mu q - \gamma q u .
$$
Stimulation $bp$ is produced by the tumour; endogenous inhibition $d p^{2/3} q$ carries the exponent $2/3$ because a diffusion–consumption calculation for the inhibitor makes its action scale like the tumour radius squared, i.e. like $V^{2/3}$; $\mu$ is spontaneous vascular loss and $\gamma$ the inhibitor's potency. Fitted to mouse data (endostatin, angiostatin, TNP-470) they obtained $\xi = 0.192\,\mathrm{d}^{-1}$ in base-10 logarithms (so $\xi = 0.192/\ln 10 \approx 0.084$ with natural logs), $b = 5.85\,\mathrm{d}^{-1}$, $d = 0.00873\,\mathrm{d}^{-1}\mathrm{mm}^{-2}$, $\mu \approx 0$. Untreated, the system has a globally attracting equilibrium on the diagonal $p = q$ at
$$
\bar p = \Big(\frac{b-\mu}{d}\Big)^{3/2} \approx 1.7\times 10^{4}\ \mathrm{mm}^3 ,
$$
the "set point" where stimulation and inhibition balance; treatment lowers it. d'Onofrio and Gandolfi (2004) proved global stability for this family of models and gave conditions for eradication under periodic anti-angiogenic therapy (their eradication theorem is quoted here from the journal abstract only).

### The control problem and its singular arcs

Ergun, Camphausen and Wein (2003) were first to optimize: minimize $p(T)$ with free terminal time, a fixed inhibitor budget $\int_0^T u \le A$ (so add $\dot y = u$, $y(T)\le A$), and $u\in[0,a]$. The system is **control-affine**, $\dot z = f(z) + u\,g(z)$ with $g = (0,-\gamma q,1)^{\!\top}$, so with $H$ written to be minimized the dose enters only through the **switching function**
$$
\Phi = \langle \lambda, g\rangle = \lambda_3 - \gamma q \lambda_2, \qquad
\dot\Phi = \langle\lambda,[f,g]\rangle, \qquad
\ddot\Phi = \langle\lambda,[f,[f,g]]\rangle + u\,\langle\lambda,[g,[f,g]]\rangle .
$$
Optimal controls are $u=0$ where $\Phi>0$ and $u=a$ where $\Phi<0$. An arc with $\Phi\equiv 0$ is **singular**: differentiate until $u$ appears. If $u$ first appears in $\Phi^{(2k)}$ the arc has **order $k$**, and the generalized **Legendre–Clebsch condition** $(-1)^k\,\partial_u \Phi^{(2k)} \ge 0$ is necessary for optimality (strict = strengthened). Order $1$ therefore needs $\partial_u\ddot\Phi = \langle\lambda,[g,[f,g]]\rangle \le 0$, and a nonvanishing $[g,[f,g]]$ is exactly what makes a partial-dose arc possible.

### Why the variant matters: $S = bp$ versus $S = bq$

Replacing the stimulation term $bp$ by $bq$ (the d'Onofrio–Gandolfi variant) changes the answer qualitatively. A direct computation gives, for $S=bq$,
$$
[f,g] = \xi\gamma p\,\partial_p, \qquad [g,[f,g]] \equiv 0, \qquad
[f,[f,g]] = \xi\gamma\big(\xi p,\ \tfrac23 d\,q\,p^{2/3},\ 0\big)^{\!\top},
$$
so $\dot\Phi = \xi\gamma p\lambda_1$ and $\ddot\Phi = \xi\gamma(\xi p \lambda_1 + \tfrac23 d q p^{2/3}\lambda_2)$ — the dose never appears. On a candidate singular arc $\dot\Phi = 0$ forces $\lambda_1 = 0$, then $\ddot\Phi = 0$ forces $\lambda_2 = 0$, and $\Phi = 0$ then forces $\lambda_3 = 0$, contradicting nontriviality of the multiplier. This is Ledzewicz–Schättler's Proposition 4.2, and it yields **Theorem 4.1**: optimal controls are bang-bang with at most two switchings, of the form **0a0**; the whole budget is spent on the $a$-arc; from $p_0 > q_0$ the full dose is applied immediately until the inhibitors are exhausted, after which $u=0$ until the trajectory reaches the diagonal $p=q$, where (because $\dot p = 0$ exactly on the diagonal — the "after-effect") $p$ attains its minimum. The conclusion is independent of the parameter values given $\gamma a > b - \mu > 0$.

For the original $S = bp$ dynamics the same computation gives $[g,[f,g]] = (0,-\gamma^2 b p,0)^{\!\top} \ne 0$, so $\partial_u \ddot\Phi = -\gamma^2 b p \lambda_2$ can be negative and an order-1 singular arc is admissible. Ledzewicz and Schättler (SIAM J. Control Optim. 2007) proved the full synthesis: optimal controls are concatenations of at most **0asa0**, the singular arc lies on an explicit curve in the $(p,q)$ plane with a feedback singular control $u_{\mathrm{sing}}(p,q)$, the strengthened Legendre–Clebsch condition holds, and the singular control **saturates** at $u=a$ at a computable point of that curve, after which the control is bang again. For medically typical initial data the protocol reduces to "bang, then singular, then off". The synthesis is a theorem; the switching times for given data are numerical.

### Realizable protocols and robustness

A state-feedback partial dose is not administrable. Ledzewicz and Schättler (J. Theor. Biol. 2008) replaced the singular arc by piecewise-constant doses with a few switchings and lost less than a percent of the optimal value. Schättler, Ledzewicz and Cardwell (2011) ran the analysis across the Hahnfeldt, Ergun and interpolating vascular dynamics and found the syntheses qualitatively equivalent, "an optimal singular arc is the defining element" — robustness of *structure*, not of numbers. A numerical caveat from the same group: repeating a fixed on/rest ratio lets the tumour regrow by the fifth period unless the rest intervals are progressively shortened. The objective here is a single course with a fixed budget, with no resistance, toxicity or pharmacokinetics; those enter in [bang-bang versus singular arcs](#/note/bang-bang-singular-metronomic) and [drug-induced resistance](#/note/drug-induced-resistance-control).

## Cards

Q: In the Hahnfeldt model, what plays the role of the carrying capacity and what makes the model two-dimensional?
A: The "effective vascular support" $q$ is a state, not a constant: $\dot p = -\xi p\ln(p/q)$ with $\dot q = bp - dp^{2/3}q - \mu q - \gamma q u$. The drug acts on $q$, not on $p$.
See: The Hahnfeldt dynamic carrying capacity

Q: Why does the endogenous-inhibition term in the Hahnfeldt model carry the exponent $2/3$?
A: A diffusion–consumption balance for the inhibitor makes its action scale with the square of the tumour radius, i.e. with $V^{2/3}$.
See: The Hahnfeldt dynamic carrying capacity

Q: What is the untreated equilibrium of the Hahnfeldt model, and what is it called?
A: $\bar p = \bar q = ((b-\mu)/d)^{3/2}$, about $1.7\times 10^4\ \mathrm{mm}^3$ for the fitted mouse parameters: the "set point" where angiogenic stimulation and inhibition balance.
See: The Hahnfeldt dynamic carrying capacity

Q: Define the **order** of a singular arc and state the generalized Legendre–Clebsch condition.
A: If the control first appears in the $2k$-th derivative of the switching function $\Phi = \partial H/\partial u$, the arc has order $k$; with $H$ minimized, optimality requires $(-1)^k\partial_u\Phi^{(2k)} \ge 0$ (strengthened if strict).
See: The control problem and its singular arcs

Q: For the variant $\dot q = bq - dp^{2/3}q - \mu q - \gamma qu$, which Lie bracket vanishes, and what does that rule out?
A: $[g,[f,g]]\equiv 0$, so the dose never appears in $\ddot\Phi$. Together with $\dot\Phi = \xi\gamma p\lambda_1$ and $\ddot\Phi \propto \xi p\lambda_1 + \tfrac23 dqp^{2/3}\lambda_2$, this forces $\lambda \equiv 0$ on a singular arc: no singular arcs exist.
See: Why the variant matters: $S = bp$ versus $S = bq$

Q: What are the two syntheses for anti-angiogenic therapy, and which model variant gives which?
A: The original stimulation term $bp$ gives at most **0asa0** with an order-1 singular arc (Ledzewicz–Schättler 2007); the variant $bq$ gives bang-bang **0a0** with at most two switchings (their Theorem 4.1).
See: Why the variant matters: $S = bp$ versus $S = bq$

Q: In the bang-bang ($S=bq$) synthesis, why does the optimal trajectory end on the diagonal $p = q$?
A: Because $\dot p = -\xi p \ln(p/q)$ vanishes exactly there, so after the inhibitors are exhausted the tumour keeps shrinking under $u=0$ until $p=q$ — the minimum of $p$ is attained by this after-effect.
See: Why the variant matters: $S = bp$ versus $S = bq$

Q: Singular controls are state-feedback partial doses, so not administrable. What did Ledzewicz–Schättler (2008) show about that?
A: Piecewise-constant protocols with a few switchings approximate the singular protocol to within a fraction of a percent of the optimal value.
See: Realizable protocols and robustness

## Quiz

Q: A singular arc of order 1 is possible in a control-affine system only if…
- [x] $\langle\lambda,[g,[f,g]]\rangle \ne 0$ along the arc
- [ ] $\langle\lambda,[f,[f,g]]\rangle \ne 0$ along the arc
- [ ] $[f,g] \equiv 0$
- [ ] the Hamiltonian is strictly convex in $u$
E: $\ddot\Phi = \langle\lambda,[f,[f,g]]\rangle + u\langle\lambda,[g,[f,g]]\rangle$, so the control appears in $\ddot\Phi$ exactly when the second bracket pairs nontrivially with $\lambda$. Strict convexity in $u$ would remove bang-bang structure altogether.
See: The control problem and its singular arcs

Q: Changing the vascular stimulation term from $bp$ to $bq$ in the Hahnfeldt model…
- [x] destroys the singular arc, making optimal controls bang-bang of type 0a0
- [ ] leaves the synthesis 0asa0 unchanged
- [ ] makes the singular arc of order 2 instead of order 1
- [ ] violates the Legendre–Clebsch condition along the bang arcs
E: With $S=bq$ one computes $[g,[f,g]]\equiv 0$ and shows $\dot\Phi$, $\ddot\Phi$ cannot vanish together with a nontrivial multiplier. Legendre–Clebsch is a condition on singular, not bang, arcs.
See: Why the variant matters: $S = bp$ versus $S = bq$

Q: Schättler, Ledzewicz and Cardwell's 2011 robustness result says that across Hahnfeldt-type vascular dynamics…
- [x] the syntheses are qualitatively equivalent, with the singular arc as the defining element
- [ ] the optimal switching times are insensitive to the parameters
- [ ] the optimal protocol is always bang-bang
- [ ] the fitted mouse parameters transfer to patients
E: The claim is structural: the same qualitative synthesis, not the same numbers. Parameters are murine and the authors themselves flag that it is unclear how far they transfer between variants.
See: Realizable protocols and robustness
