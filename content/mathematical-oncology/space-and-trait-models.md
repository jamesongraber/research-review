---
title: "Space and trait together: spheroids, invasion fronts and fluctuating environments"
tags: [cancer, phenotype-structured, spatial-models, invasion-fronts, periodic-environments, hamilton-jacobi]
created: 2026-10-21
related: [selection-mutation-hamilton-jacobi, constrained-hj-uniqueness-regularity, lorz-clairambault-resistance-model, cell-cycle-chronotherapy, hele-shaw-limit-tumour-growth, glioma-reaction-diffusion-personalisation, invasion-and-angiogenesis-models, spatial-games-in-tumours, greenspan-free-boundary-models, weak-kam-wasserstein]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

Tumours are not well mixed: nutrient and drug arrive from the rim or from vessels, so different places select different phenotypes. Adding a space variable $y$ to the [trait-structured models](#/note/lorz-clairambault-resistance-model) is easy to simulate and hard to analyse. This note collects the spheroid models, the two rigorous concentration theorems with space, the invasion-front model that joins this chapter to the [Hele-Shaw limit](#/note/hele-shaw-limit-tumour-growth), and the time-periodic environments that join it to chronotherapy.

### The spheroid model and what simulations show

Lorz, Lorenzi, Clairambault, Escargueil and Perthame (2015): radius $r\in[0,1]$, resistance $x\in[0,1]$, nutrient $s$, cytotoxic $c_1$, cytostatic $c_2$ [verbatim]:
$$
\partial_tn=\Big[\frac{p(x)}{1+\mu_2c_2}\,s-d(x)\varrho-\mu_1(x)c_1\Big]n,\qquad \varrho=\int_0^1n\,dx,
$$
$$
-\sigma_s\Delta s+\Big[\gamma_s+\int_0^1p\,n\,dx\Big]s=0,\qquad -\sigma_c\Delta c_1+\Big[\gamma_c+\int_0^1\mu_1n\,dx\Big]c_1=0,\qquad -\sigma_c\Delta c_2+[\gamma_c+\mu_2\varrho]c_2=0,
$$
Neumann at the centre, Dirichlet at the rim ($s=0.3$, $c_i=C_i(t)$), $p(x)=0.1+(1-x)$, $d(x)=3+1.5(1-x)^2$, $\mu_1(x)=0.01+(1-x)^2$, $\mu_2=10$; no mutation. Fields are quasi-static because diffusion of molecules is fast compared with cell division. Formally the selected trait $\bar X(r)$ solves $R=0$, a quadratic in $x$ with coefficients depending on the stationary fields. Everything else is numerical: nutrient gradients alone produce spatial polymorphism (different resistance at different radii); cytotoxic drugs raise mean resistance and shrink its variance; cytostatic drugs slow evolution without selecting resistance; at equal total dose, constant simultaneous cytotoxic plus cytostatic delivery extinguishes the population while bang-bang delivery and cytotoxic-only protocols relapse. Cho and Levy (2017) add cell diffusion and density-dependent permeability; Lorenzi, Venkataraman, Lorz and Chaplain (2018) move to 3D and CT-reconstructed geometry where oxygen gradients create niches; Villa, Chaplain and Lorenzi (2021) add explicit vessel networks and epimutations, with formal asymptotics and numerics, and find that hypoxia pre-selects chemoresistance.

### Rigorous concentration with space

Mirrahimi and Perthame (2015) prove the first concentration theorem with space, for the mutation-free version [verbatim]:
$$
\varepsilon\,\partial_tn_\varepsilon=\big[r(x)c_\varepsilon-d(x)(1+\varrho_\varepsilon)\big]n_\varepsilon,\qquad
\partial_tc_\varepsilon-\Delta_yc_\varepsilon+(\varrho_\varepsilon+\lambda)c_\varepsilon=\lambda c_B,
$$
with $r$ concave, $d$ convex (derivatives to order 3 bounded), $n^0_\varepsilon=e^{u^0_\varepsilon/\varepsilon}$ uniformly concave in $x$, initial mass between positive constants (which needs $\lambda,c_B$ large). Theorem 1.1: $\varrho_\varepsilon\to\varrho$ a.e., $c_\varepsilon\to c$ locally uniformly, and $n_\varepsilon\rightharpoonup\varrho(y,t)\,\delta\big(x-X(y,t)\big)$ with $X$ Lipschitz, where $r(X)c-d(X)(1+\varrho)=0$ and $\dot X=(-\partial_{xx}u)^{-1}\big(r'(X)c-d'(X)(1+\varrho)\big)$. The difficulty is that $\varrho_\varepsilon(y,t)$ has no compactness in $(y,t)$; it is overcome by the Hopf–Cole change and the uniqueness of the limiting constrained problem, which upgrades subsequences to full convergence. The authors state that for the elliptic-nutrient variant only weak-* limits are available and that there is "no general compactness method" for nonlinear growth $R(y,c,\varrho)$ or trait-dependent dispersal. Jabin and Schram (2023) add mutations $\varepsilon^2\partial_{xx}n_\varepsilon$ with an elliptic nutrient and prove concentration under a smallness condition $\int|\varrho^0-\bar\varrho^0|^2dy<\Lambda$ (closeness to the frozen-trait steady state), by comparison with "meta-stable states" through a Lyapunov-type estimate; they say only local stability is proved and the final viscosity passage is "skipped". Mirrahimi (2017) treats two habitats coupled by migration and uses the constrained HJ equation to obtain the dominant terms of the trait distribution beyond the vanishing-mutation limit, with criteria for monomorphism versus dimorphism (from the abstract).

### Invasion fronts with heterogeneous mobility

Lorenzi, Perthame and Ruan (2022) couple trait and pressure-driven motion, a glioma-type go-or-grow model [verbatim]: phenotype $y\in(0,Y)$, space $x\in\mathbb R$, $\rho=\int_0^Yn\,dy$, mobility $\mu(y)$ increasing, $r'<0$,
$$
\partial_tn-\alpha\,\mu(y)\,\partial_x\big(n\,\partial_x\rho\big)=R(y,\rho)\,n+\beta\,\partial^2_{yy}n,\qquad R=r(y)-\rho .
$$
With $\alpha=\varepsilon$, $\beta=\varepsilon^2$, $t\mapsto t/\varepsilon$ and $n_\varepsilon=e^{u_\varepsilon/\varepsilon}$, the formal limit is an HJ equation in the trait with transport in space and a constraint only on the support of $\rho$:
$$
\partial_tu-\mu(y)\,\partial_x\rho\,\partial_xu=R(y,\rho)+(\partial_yu)^2,\qquad \max_yu=u(t,x,\bar y(t,x))=0\ \text{ on }\operatorname{supp}\rho,
$$
so $\rho=r(\bar y)$ and the dominant trait obeys a generalised Burgers equation $\partial_t\bar y-\mu(\bar y)\partial_x\rho\,\partial_x\bar y=\frac{\partial_yR(\bar y,\rho)}{-\partial^2_{yy}u}$. Travelling waves have $\bar y'>0$, $\rho'<0$: mobile cells at the edge, proliferative cells behind, with the formal bound $c^*\ge\sup_z2|r'(\bar y)|\sqrt{\mu(\bar y)/|\partial^2_{yy}u|}$ and acceleration if $|r'(Y)|\sqrt{\mu(Y)}$ is unbounded. Only the scheme's properties are proved; the HJ limit, the Burgers equation and the speed are formal, the fronts numerical. Open: existence for the nonlocal PDE, the rigorous limit, several dimensions, and the incompressible limit toward the free-boundary models.

### Fluctuating environments: Floquet enters the HJ equation

Figueroa Iglesias and Mirrahimi (2018) take $\partial_tn-\sigma\Delta n=n[a(t,x)-\rho(t)]$ with $a$ periodic of period $T$ and $\bar a=\frac1T\int_0^Ta$ having a unique nondegenerate maximiser $x_m$. For $\sigma>0$ the principal periodic eigenvalue decides extinction versus convergence to a unique periodic solution. Theorem 4, with $\sigma=\varepsilon^2$: $n_\varepsilon(t)-\tilde\varrho(t)\delta_{x_m}\rightharpoonup0$ and the Hopf–Cole phase converges to the solution of the **time-averaged constrained HJ equation**
$$
-|\nabla u|^2=\frac1T\int_0^T\big(a(t,x)-\tilde\varrho(t)\big)dt,\qquad \max_xu=u(x_m)=0 .
$$
In one dimension this is explicit: $u(x)=-\big|\int_{x_m}^x\sqrt{\bar\varrho-\bar a(x')}\,dx'\big|$ with $\bar\varrho=\bar a(x_m)$, since at the maximiser $0=\bar a(x_m)-\bar\varrho$. So the time-averaged multiplier equals the time-averaged fitness at the dominant trait, and the shape of $u$ is a distance for the metric $\sqrt{\bar\varrho-\bar a}$, as in weak KAM. Ardaševa, Gatenby, Anderson, Byrne, Maini and Lorenzi (2020) compare two populations with epimutation rates $\beta_H>\beta_L$ sharing the fitness $R=\gamma g(S)-\gamma(x-\varphi(S))^2-d\rho$ under a periodic nutrient $S(t)$. Gaussian data stay Gaussian with $v_i'=2(\gamma-\beta_iv_i^2)$, $\mu_i'=\frac{2\gamma}{v_i}(\varphi-\mu_i)$, $\rho_i'=(F_i-d\rho)\rho_i$, $F_i=\gamma g-\gamma/v_i-\gamma(\mu_i-\varphi)^2$ (recomputed). Theorem 3 (constant $S$): the low-epimutation population wins, $\rho_L\to\frac{\sqrt\gamma}{d}(\sqrt\gamma\,\bar g-\sqrt{\beta_L})$, unless $\sqrt{\beta_L}\ge\sqrt\gamma\,\bar g$ (both die). Theorem 4 (periodic $S$): with $\Lambda_i=\sqrt{\beta_i}+\frac{\sqrt\gamma}{T}\int_0^T(u_i-\varphi)^2$, $u_i$ the periodic solution of the mean equation, the population with the smaller $\Lambda_i$ survives and the other dies, both dying if $\min\Lambda_i\ge\frac{\sqrt\gamma}T\int_0^Tg$. Fast, large oscillations let the high-epimutation population win because its mean tracks $\varphi(S(t))$ more closely. See [cell-cycle models](#/note/cell-cycle-chronotherapy) for the linear, age-structured version of Floquet-versus-average.

## Cards

Q: Why are nutrient and drug fields in the Lorz et al. (2015) spheroid model elliptic rather than parabolic?
A: Molecular diffusion is fast compared with cell division, so the fields are quasi-static: $-\sigma\Delta s+[\gamma_s+\int p\,n\,dx]s=0$ with uptake by the cells as a sink.
See: The spheroid model and what simulations show

Q: Which conclusions of the spheroid model are numerical only?
A: All of them: spatial polymorphism from nutrient gradients, cytotoxic drugs raising mean resistance and shrinking its variance, cytostatic drugs slowing evolution, and constant combined delivery beating bang-bang delivery at equal total dose.
See: The spheroid model and what simulations show

Q: What is the main difficulty in proving concentration with space, and how do Mirrahimi–Perthame (2015) get around it?
A: $\varrho_\varepsilon(y,t)$ has no compactness in $(y,t)$. The Hopf–Cole change plus uniqueness of the limiting constrained problem gives full convergence without extracting subsequences.
See: Rigorous concentration with space

Q: What do the two rigorous trait-plus-space concentration theorems require?
A: Mirrahimi–Perthame (2015): no mutation, concave $r$, convex $d$, concave initial phase. Jabin–Schram (2023): mutations allowed but initial data close to the frozen-trait steady state ($\int|\varrho^0-\bar\varrho^0|^2<\Lambda$), and only local stability.
See: Rigorous concentration with space

Q: What new type of constrained HJ problem appears in the Lorenzi–Perthame–Ruan (2022) invasion model?
A: HJ in the trait, transport in space by $-\mu(y)\partial_x\rho\,\partial_xu$, and the constraint $\max_yu=0$ imposed only on $\operatorname{supp}\rho$; the dominant trait solves a generalised Burgers equation. All formal.
See: Invasion fronts with heterogeneous mobility

Q: In a periodic environment, what replaces the fitness in the limiting constrained HJ equation (Figueroa Iglesias–Mirrahimi 2018)?
A: Its time average: $-|\nabla u|^2=\frac1T\int_0^T(a-\tilde\varrho)\,dt$ with $\max u=u(x_m)=0$, so $\bar\varrho=\bar a(x_m)$ and in 1D $u(x)=-|\int_{x_m}^x\sqrt{\bar\varrho-\bar a}|$.
See: Fluctuating environments: Floquet enters the HJ equation

Q: In Ardaševa et al. (2020), who wins under a periodic nutrient and why can the high-epimutation population win?
A: The population with the smaller $\Lambda_i=\sqrt{\beta_i}+\frac{\sqrt\gamma}T\int_0^T(u_i-\varphi)^2$. Large epimutation costs $\sqrt{\beta_i}$ but lets the mean track the moving optimum $\varphi(S(t))$, which wins under fast, large oscillations.
See: Fluctuating environments: Floquet enters the HJ equation

## Quiz

Q: In Ardaševa et al. (2020) with constant nutrient, the surviving population is…
- [x] the one with the lower epimutation rate, with mass $\frac{\sqrt\gamma}{d}(\sqrt\gamma\,\bar g-\sqrt{\beta_L})$
- [ ] the one with the higher epimutation rate
- [ ] both coexist at masses proportional to $\beta_i$
- [ ] the one with the larger initial mass
E: In a fixed environment phenotypic variation is pure mutation load $\sqrt{\beta_i\gamma}$; only under oscillations does tracking the optimum pay.
See: Fluctuating environments: Floquet enters the HJ equation

Q: Mirrahimi–Perthame (2015) obtain full convergence of $n_\varepsilon$ (not along subsequences) because…
- [x] the limiting constrained problem is unique, so every subsequence has the same limit
- [ ] $\varrho_\varepsilon$ is compact in $(y,t)$ by the BV bound
- [ ] the nutrient equation is elliptic
- [ ] the initial data are Gaussian
E: There is no compactness in $(y,t)$ for $\varrho_\varepsilon$; uniqueness of the limit is what removes the extraction.
See: Rigorous concentration with space

Q: In the Lorenzi–Perthame–Ruan travelling wave, along the front…
- [x] the dominant trait increases toward the edge (mobile cells) and $\rho$ decreases
- [ ] the dominant trait is constant in space
- [ ] proliferative cells sit at the edge
- [ ] $\rho$ increases toward the edge
E: Go-or-grow spatial sorting: $\bar y'>0$, $\rho'<0$ in the wave variable, with $\rho=r(\bar y)$ and $r$ decreasing.
See: Invasion fronts with heterogeneous mobility
