---
title: "Resistance as a continuous trait: the Lorz–Clairambault model"
tags: [cancer, drug-resistance, integro-differential-equations, phenotype-structured, gaussian-solutions]
created: 2026-10-21
related: [selection-mutation-hamilton-jacobi, constrained-hj-uniqueness-regularity, pouchol-optimal-control-ide, space-and-trait-models, persisters-phenotypic-switching, pre-existing-resistance, adaptive-therapy-control, drug-induced-resistance-control, bang-bang-singular-metronomic, adaptive-dynamics, g-functions-darwinian-dynamics]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

Lorz, Lorenzi, Hochberg, Clairambault and Perthame (2013) transplanted the [constrained Hamilton–Jacobi machinery](#/note/selection-mutation-hamilton-jacobi) into oncology. The trait $x\ge0$ is a level of expression of a resistance phenotype, not a genotype; the model is an integro-differential equation (IDE) for healthy and cancer cells, and the drug enters the fitness. This note states the model, the theorems, the constant-dose trade-off, and the Gaussian exact solutions of the follow-up papers.

### The model

Healthy cells $n_H(x,t)$ and cancer cells $n_C(x,t)$, dose $c(t)$, $\rho=\rho_H+\rho_C$ with $\rho_i=\int n_i$ [verbatim]:
$$
\begin{aligned}
\partial_t n_H&=\Big[\frac{1-\theta_H}{(1+\rho)^\beta}r(x)-d(x)-c(t)\mu_H(x)\Big]n_H+\frac{\theta_H}{(1+\rho)^\beta}\int r(y)M_{\sigma_H}(y,x)n_H(y,t)\,dy,\\
\partial_t n_C&=\big[(1-\theta_C)r(x)-d(x)-c(t)\mu_C(x)\big]n_C+\theta_C\int r(y)M_{\sigma_C}(y,x)n_C(y,t)\,dy .
\end{aligned}
$$
The hypotheses are the biology: $r'<0$, $r(\infty)=0$ (resistance costs proliferation), $d'>0$, $r(0)>d(0)>0$; $\mu_{H,C}>0$ decreasing to $0$ (fully resistant cells are insensitive), $\mu_H<\mu_C$; $r(0)-d(0)-c\,\mu_C(0)<0$ (the drug kills sensitive cancer cells); $\theta\in[0,1)$ is the fraction of divisions that mutate, $M_\sigma(y,\cdot)$ a probability kernel with mean jump $\sigma$, $\sigma_C>\sigma_H$. Only healthy tissue is homeostatic: the factor $(1+\rho)^{-\beta}$ caps its proliferation, whereas $n_C$ grows exponentially, so for cancer the object analysed is the normalised density $p=n_C/\rho_C$, whose multiplier is $I(t)=\int p\,(r-d)$.

### What is proved

Without mutations ($\theta=0$, Lemmas 2.1–2.3): $n_H\to\bar\rho_{H,\infty}\delta_0$ with $r(0)/(1+\bar\rho_{H,\infty})^\beta=d(0)$, and $n_C/\rho_C\to\delta_0$ without therapy or $\to\delta_{x_c}$ under constant therapy. With small mutations ($M_\sigma(y,x)=\varepsilon^{-1}\tilde M(y,(y-x)/\varepsilon)$, $u_\varepsilon=\varepsilon\ln n$) the limit for healthy cells is
$$
\partial_t u=\frac{1-\theta_H}{(1+\rho_H)^\beta}r(x)-d(x)+\frac{\theta_H}{(1+\rho_H)^\beta}H(x,\nabla u),\qquad \max_{x\ge0}u=0,
$$
with $H(x,p)=r(x)\int\tilde M(x,z)e^{p z}dz$ (convex, $H(x,0)=r$, $H_p(x,0)=0$) and $\rho_H(t)$ as multiplier. Theorem 3.1 (healthy cells, Lipschitz data) is proved: monoclonal concentration $n_{H,\varepsilon}\to\bar\rho_H(t)\delta(x-\bar x(t))$ with $\bar x\to0$, via Hopf–Cole, BV and Lipschitz bounds. Theorem 3.2 (cancer, no therapy) is proved likewise. Theorem 3.3 (cancer under therapy, concentration with $\bar x\to x_c$) is stated with the proof "analogous" and omitted. The two-drug model of Section 6 (cytotoxic $c_1$, cytostatic $c_2$, fitness $R_H=\frac{r_H(1-\theta_M)}{1+\alpha_Hc_2}-d_HI_H-\mu_Hc_1$ with linear competition $I_H=a_{HH}\rho_H+a_{HC}\rho_C$) is numerical only; it shows eradication of cancer with about half the healthy cells surviving at combined doses lower than the single-drug doses that fail.

### The constant-dose trade-off, worked

Section 4 of the paper takes, with $\alpha^2=c$ the dose,
$$
R_c(x)=\frac{r_0^2}{1+x^2}-d-\frac{\alpha^2}{a^2+x^2},\qquad 0<a<1 .
$$
Setting $R_c'=0$ gives $\frac{r_0}{1+x^2}=\frac{\alpha}{a^2+x^2}$, i.e. $x_*^2=\frac{\alpha-a^2r_0}{r_0-\alpha}$, which is positive exactly for $a^2r_0<\alpha<r_0$. Substituting, $1+x_*^2=\frac{r_0(1-a^2)}{r_0-\alpha}$ and $a^2+x_*^2=\frac{\alpha(1-a^2)}{r_0-\alpha}$, so the fitness of the selected resistant trait is
$$
\overline{R_c}=\frac{(r_0-\alpha)^2}{1-a^2}-d
$$
(recomputed here; it matches the paper's formula). Both facts of the trade-off are visible: $x_*$ increases with the dose (a higher dose selects a more resistant phenotype) while $\overline{R_c}$ decreases with it. If $\alpha\ge r_0$ then $R_c\le-d$ everywhere and no resistant state exists; if $\alpha\le a^2r_0$ the maximum is at $x=0$ with $R_c(0)=r_0^2-d-\alpha^2/a^2$, negative once $\alpha^2\ge a^2(r_0^2-d)$. Within this **constant-dose, single cytotoxic drug, no healthy-cell constraint** setting the paper concludes that the maximal tolerated dose is the best constant therapy. The authors list time-modulated dosing as future work; [Pouchol et al. (2018)](#/note/pouchol-optimal-control-ide) show that with time dependence, a healthy-cell constraint and a cytostatic drug the conclusion reverses.

### Gaussian exact solutions (Lorenzi–Chisholm–Clairambault 2016)

With a quadratic fitness and diffusive epimutations the problem is linear–quadratic and solvable for every mutation rate, not only as $\varepsilon\to0$ [verbatim]:
$$
\partial_tn=\beta\,\partial_{xx}n+\big[\gamma-\eta x^2-d\rho(t)-c(t)(x-1)^2\big]n,\qquad x\in\mathbb R,\ \rho=\int n .
$$
Theorem 1 ($c=0$): if $\gamma\le\sqrt{\beta\eta}$ then $\rho\to0$; otherwise
$$
\rho\to\bar\rho=\frac{\gamma-\sqrt{\beta\eta}}{d},\qquad n\to\bar\rho\,\frac{(\eta/\beta)^{1/4}}{\sqrt{2\pi}}\,e^{-\frac12\sqrt{\eta/\beta}\,x^2},
$$
a Gaussian of variance $\sqrt{\beta/\eta}$. The reason is a closed Gaussian ansatz: with $n=\rho\sqrt{v/2\pi}\,e^{-v(x-\mu)^2/2}$ the inverse variance obeys the Riccati equation $v'=2\eta-2\beta v^2$, so $v\to\sqrt{\eta/\beta}$, and the mean fitness is $\gamma-\eta(\sigma^2+\mu^2)-d\rho$, which at $\sigma^2=\sqrt{\beta/\eta}$, $\mu=0$ gives $\bar\rho$ (the term $\sqrt{\beta\eta}$ is the mutation load). Theorem 2 ($c\equiv C$): completing the square, $\gamma-\eta x^2-C(x-1)^2=\gamma_c-\eta_c(x-\bar x_c)^2$ with
$$
\eta_c=\eta+C,\qquad \bar x_c=\frac{C}{\eta+C},\qquad \gamma_c=\gamma-\frac{\eta C}{\eta+C},
$$
so the same statements hold with centre $\bar x_c$: the dose pulls the selected phenotype toward full resistance and lowers the carrying capacity. (Numerical check: $\gamma=1,\eta=2,\beta=0.01,d=0.5$ gives $\bar\rho=1.717$ and the stated Gaussian solves the equation to $10^{-8}$.) The MTD-versus-metronomic comparison in that paper is numerical and has no healthy-cell toxicity.

### Persisters and the Levy school

Chisholm et al. (2015) add to selection a non-genetic instability (epimutation diffusion) and a stress-induced adaptation (an advection of the trait toward tolerance under drug), in an individual-based model and an IDE, to reproduce the reversible drug-tolerant persisters of Sharma et al. (2010); the equations themselves were not verified for this survey (only the abstract), so see [persisters](#/note/persisters-phenotypic-switching) for the status. In parallel, Lavi, Gottesman and Levy (2012) reviewed resistance models from a continuous-trait viewpoint; Greene, Lavi, Gottesman and Levy (2014) added density dependence and mutations, finding convergence to one or several resistance levels; Cho and Levy (2017, 2018) added space with cell diffusion and multi-dimensional traits for multidrug resistance.

## Cards

Q: In the Lorz et al. (2013) model, what biology do the sign hypotheses $r'<0$, $d'>0$, $\mu$ decreasing to $0$, $\mu_H<\mu_C$ encode?
A: Resistance costs proliferation and raises death (cost of resistance); fully resistant cells are insensitive to the drug; the drug hits cancer cells harder than healthy cells.
See: The model

Q: Why do healthy cells carry the factor $(1+\rho)^{-\beta}$ while cancer cells do not, and what replaces the multiplier for cancer?
A: Only healthy tissue is homeostatic; $n_C$ grows exponentially, so one studies the normalised density $p=n_C/\rho_C$, whose constraint is enforced by $I(t)=\int p\,(r-d)$.
See: The model

Q: Which of Theorems 3.1–3.3 of Lorz et al. (2013) are proved in the paper?
A: 3.1 (healthy cells concentrate, $\bar x\to0$) and 3.2 (cancer without therapy) are proved by Hopf–Cole, BV and Lipschitz bounds; 3.3 (cancer under constant therapy, $\bar x\to x_c$) is stated with the proof omitted as "analogous".
See: What is proved

Q: For $R_c(x)=\frac{r_0^2}{1+x^2}-d-\frac{\alpha^2}{a^2+x^2}$, where is the selected resistant trait and what is its fitness?
A: $x_*^2=\frac{\alpha-a^2r_0}{r_0-\alpha}$ for $a^2r_0<\alpha<r_0$, and $\overline{R_c}=\frac{(r_0-\alpha)^2}{1-a^2}-d$: a larger dose selects a more resistant trait with lower fitness.
See: The constant-dose trade-off, worked

Q: Under what restrictions does Lorz et al. (2013) conclude that the maximal tolerated dose is optimal?
A: Constant dose, a single cytotoxic drug, and no healthy-cell constraint. With time-dependent doses, a healthy-cell constraint and a cytostatic drug (Pouchol et al. 2018) the conclusion reverses.
See: The constant-dose trade-off, worked

Q: Why does quadratic fitness plus diffusion give exact Gaussian solutions, and what is the steady variance?
A: The Gaussian ansatz closes: the inverse variance solves the Riccati equation $v'=2\eta-2\beta v^2$, so $v\to\sqrt{\eta/\beta}$ and the variance is $\sqrt{\beta/\eta}$.
See: Gaussian exact solutions (Lorenzi–Chisholm–Clairambault 2016)

Q: In Lorenzi–Chisholm–Clairambault (2016), what is the extinction threshold and the steady mass without drug?
A: Extinction iff $\gamma\le\sqrt{\beta\eta}$; otherwise $\bar\rho=(\gamma-\sqrt{\beta\eta})/d$, the term $\sqrt{\beta\eta}$ being the mutation load.
See: Gaussian exact solutions (Lorenzi–Chisholm–Clairambault 2016)

Q: How does a constant dose $C$ change the Gaussian steady state in Lorenzi–Chisholm–Clairambault (2016)?
A: Complete the square: centre $\bar x_c=C/(\eta+C)$ (toward full resistance), selection strength $\eta_c=\eta+C$, and $\gamma_c=\gamma-\eta C/(\eta+C)$.
See: Gaussian exact solutions (Lorenzi–Chisholm–Clairambault 2016)

## Quiz

Q: In $\partial_tn=\beta n_{xx}+(\gamma-\eta x^2-d\rho)n$, the population goes extinct iff…
- [x] $\gamma\le\sqrt{\beta\eta}$
- [ ] $\gamma\le\beta\eta$
- [ ] $\gamma\le\beta/\eta$
- [ ] $\gamma\le\eta$
E: The mean fitness at the Gaussian steady state is $\gamma-\eta\sigma^2-d\rho$ with $\sigma^2=\sqrt{\beta/\eta}$, so the net growth at $\rho=0$ is $\gamma-\sqrt{\beta\eta}$.
See: Gaussian exact solutions (Lorenzi–Chisholm–Clairambault 2016)

Q: In the constant-dose example, raising the dose $\alpha$ within $(a^2r_0,r_0)$…
- [x] moves the selected trait $x_*$ up and lowers its fitness $\overline{R_c}$
- [ ] moves $x_*$ down and lowers $\overline{R_c}$
- [ ] leaves $x_*$ fixed and lowers $\overline{R_c}$
- [ ] moves $x_*$ up and raises $\overline{R_c}$
E: $x_*^2=(\alpha-a^2r_0)/(r_0-\alpha)$ is increasing in $\alpha$ and $\overline{R_c}=(r_0-\alpha)^2/(1-a^2)-d$ is decreasing on $\alpha<r_0$.
See: The constant-dose trade-off, worked

Q: For cancer cells in Lorz et al. (2013), the Lagrange multiplier enforcing $\max u=0$ is…
- [x] $I(t)=\int p\,(r-d)$ with $p=n_C/\rho_C$ the normalised density
- [ ] the total mass $\rho_C$
- [ ] the healthy mass $\rho_H$
- [ ] the dose $c(t)$
E: $\rho_C$ grows exponentially, so the constraint can only be imposed on the normalised density; its mean fitness is the multiplier.
See: The model
