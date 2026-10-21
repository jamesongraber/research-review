---
title: "Glioma as Fisher–KPP: the D–ρ model and patient-specific calibration"
tags: [cancer, glioma, fisher-kpp, reaction-diffusion, inverse-problems, hamilton-jacobi]
created: 2026-10-21
related: [digital-twins-oncology, invasion-and-angiogenesis-models, radiotherapy-fractionation-control, selection-mutation-hamilton-jacobi, space-and-trait-models, hele-shaw-limit-tumour-growth, mathematical-oncology-landscape, field-open-questions]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

Gliomas infiltrate the brain diffusely: the visible lesion on MRI is the dense core of a cell-density profile whose tail extends centimetres beyond it. The most clinically used PDE in oncology describes exactly this with two numbers per patient.

### The D–ρ model

Tracqui et al. (1995) fitted a reaction–diffusion equation to serial CT scans of one patient; Swanson, Alvord and Murray (2000) made the diffusion coefficient depend on tissue, faster in white than in grey matter, on a brain atlas. In the form used by Rockne et al. (2010), with cell density $c(x,t)$,
$$
\partial_t c=\nabla\cdot\big(D(x)\nabla c\big)+\rho\,c\Big(1-\frac{c}{k}\Big),\qquad \mathbf n\cdot\nabla c=0\ \text{ on the skull},
$$
where $D$ (mm²/yr) is the net invasion rate, $\rho$ (1/yr) the net proliferation rate and $k$ the carrying capacity ($\approx10^8$ cells/mm³); Harpold, Alvord and Swanson (2007) review the history. No mechanics, no vasculature, no necrosis: the point is that two parameters are identifiable from routine imaging.

### Front speed: the Fisher–KPP dispersion relation

Linearise at the leading edge, $c\ll k$: $\partial_t c=Dc_{xx}+\rho c$. A travelling exponential $c=e^{-\lambda(x-vt)}$ solves it iff $\lambda v=D\lambda^2+\rho$, so
$$
v(\lambda)=D\lambda+\frac{\rho}{\lambda},\qquad \min_{\lambda>0}v(\lambda)=2\sqrt{D\rho}\quad\text{at }\lambda^*=\sqrt{\rho/D}.
$$
The classical theorem (Kolmogorov–Petrovskii–Piskunov; Aronson–Weinberger) is that compactly supported initial data spread at exactly the minimal speed $2\sqrt{D\rho}$: the front is *pulled* by its linear tail. Two consequences for the clinic: the radius of any density threshold grows linearly in time at rate $2\sqrt{D\rho}$, and the tail decays on the length scale $1/\lambda^*=\sqrt{D/\rho}$. Doubling $D$ and halving $\rho$ leaves the speed unchanged but doubles the invisible decay length.

### Two scans, two parameters

Two parameters need two measurements, and the clinical pipeline supplies exactly two.

- **Speed.** Two pre-treatment MRIs give the radial growth rate of the visible lesion, hence $v=2\sqrt{D\rho}$.
- **Shape.** On one time point, the T1-gadolinium abnormality (dense tumour) and the T2/FLAIR abnormality (oedema and infiltration) are two level sets of the same profile. Their separation depends only on the profile shape, i.e. on $\sqrt{D/\rho}$.

Then $D=\tfrac v2\sqrt{D/\rho}$ and $\rho=\tfrac v2\sqrt{\rho/D}$. Worked example: a lesion radius growing at $30$ mm/yr and a level-set separation implying $D/\rho=4$ mm² give $D=30$ mm²/yr, $\rho=7.5$/yr (check: $2\sqrt{30\times7.5}=30$) and a decay length of $2$ mm. Exactly two scalars are identifiable, which is why the clinical line never grew the model.

What the two numbers bought: Swanson, Rostomily and Alvord (2008) built a "virtual control" for each of 70 glioblastoma patients from pre-operative $D,\rho$ and matched survival after biopsy or subtotal resection; Wang et al. (2009) showed the kinetics are prognostic. Rockne et al. (2010) added [radiotherapy](#/note/radiotherapy-fractionation-control) through the linear–quadratic survival $S=e^{-\alpha d-\beta d^2}$ ($\alpha/\beta=10$ Gy) as a cell-kill term $-(1-S)\,c(1-c/k)$ during each fraction, and found in nine patients that the fitted radiosensitivity $\alpha$ correlates with $\rho$ ($r=0.89$) and not with $D$ ($r=-0.35$): response to radiation tracks proliferation, not invasion.

### The invisible margin as an eikonal equation

Konukoglu et al. (2010) extrapolate the infiltration beyond the visible contour from a single MRI by replacing the parabolic equation with its travelling-front approximation and derive patient-specific irradiation margins instead of the standard uniform 2 cm. For a reader of Hamilton–Jacobi equations this is the Freidlin / Evans–Souganidis large-deviation limit of KPP. Rescale $c^\varepsilon(t,x)=c(t/\varepsilon,x/\varepsilon)$ and set $c^\varepsilon=e^{-Z^\varepsilon/\varepsilon}$; then
$$
\partial_tZ^\varepsilon+D|\nabla Z^\varepsilon|^2+\rho(1-c^\varepsilon)=\varepsilon D\Delta Z^\varepsilon,
$$
and as $\varepsilon\to0$, $Z$ is the viscosity solution of $\min\{\partial_tZ+D|\nabla Z|^2+\rho,\ Z\}=0$: the tumour occupies $\{Z=0\}$, and ahead of it $Z$ solves a first-order HJ equation. For a point source, $Z=\max\{0,\ |x|^2/(4Dt)-\rho t\}$, whose zero set is the ball of radius $2\sqrt{D\rho}\,t$ (check: $\partial_tZ=-|x|^2/(4Dt^2)-\rho$ and $D|\nabla Z|^2=|x|^2/(4Dt^2)$). The stationary version is the eikonal equation for the arrival time, $4\rho\,\nabla T^{\!\top}D\nabla T=1$ with a tensor $D$, i.e. normal speed $2\sqrt{\rho\,\mathbf n^{\!\top}D\mathbf n}$, solvable by fast marching. This is the same Hopf–Cole mechanism as in [Dirac concentration](#/note/selection-mutation-hamilton-jacobi), applied in space instead of trait space.

### Anisotropy from DTI

Diffusion tensor imaging measures water-diffusion anisotropy, a proxy for fibre-tract orientation. Jbabdi et al. (2005) first put a DTI-derived tensor into the glioma equation. Painter and Hillen (2013) derive the macroscopic tensor instead of postulating it: a mesoscopic transport equation whose turning kernel is a (bimodal von Mises–Fisher) fibre-orientation distribution read from DTI, scaled to a macroscopic equation. Engwer, Hillen, Knappitsch and Surulescu (2015) add adhesion to tract-bound matrix; after scaling, both the diffusion tensor and a drift velocity depend on tract orientation and binding kinetics, and the binding produces the finger-like spread. Swan et al. (2018) calibrate such a model to ten patients.

### Inverse problems from one scan

Hogea, Davatzikos and Biros (2008) posed the calibration as PDE-constrained optimisation, solved with the adjoint method, for a reaction–diffusion equation coupled to piecewise linear elasticity (mass effect: the tumour pushes the brain). The single-time-point problem is harder, since one image gives level sets but no speed. Lipková et al. (2019) make it Bayesian: T1Gd and FLAIR segmentations are super-level sets of the density, FET-PET uptake is taken proportional to density, and $(D,\rho,$ origin, time since onset$)$ are sampled; radiotherapy plans drawn from posterior iso-contours spared more healthy tissue at comparable accuracy in an initial clinical study. Subramanian et al. (2020) and Scheufele et al. (2021) recover the tumour *origin* as a sparse, ill-posed reconstruction, automated on 206 patients. Ezhov et al. (2023) replace sampling by a learned inverse that runs in minutes; Balcerak et al. (2025) minimise a discrete loss with data and Fisher–Kolmogorov residual as soft constraints and report better recurrence prediction on 152 patients than uniform margins.

### What is open

There is no identifiability theorem for the full model: which functionals of $(D(x),\rho,c_0)$ two level-set observations determine. The mechanics-coupled versions used in [digital twins](#/note/digital-twins-oncology) add parameters that volume data seem unable to separate, and the model has no phenotypes; see [space and trait models](#/note/space-and-trait-models).

## Cards

Q: Why is the front speed of $\partial_t c=Dc_{xx}+\rho c(1-c/k)$ equal to $2\sqrt{D\rho}$?
A: In the linearised tail, $c=e^{-\lambda(x-vt)}$ requires $v(\lambda)=D\lambda+\rho/\lambda$, minimised at $\lambda^*=\sqrt{\rho/D}$ with $v=2\sqrt{D\rho}$. Compactly supported data spread at this minimal speed (KPP; Aronson–Weinberger): the front is pulled by its linear tail.
See: Front speed: the Fisher–KPP dispersion relation

Q: In the clinical glioma pipeline, which two measurements identify $D$ and $\rho$?
A: Two scans give the speed $v=2\sqrt{D\rho}$ of the visible radius; the separation of the T1Gd and T2/FLAIR level sets at one time gives the profile shape, i.e. $\sqrt{D/\rho}$. Then $D=\tfrac v2\sqrt{D/\rho}$, $\rho=\tfrac v2\sqrt{\rho/D}$.
See: Two scans, two parameters

Q: If $D$ is doubled and $\rho$ halved in the glioma model, what changes and what does not?
A: The speed $2\sqrt{D\rho}$ is unchanged; the tail decay length $\sqrt{D/\rho}$ doubles, so the invisible infiltration beyond any threshold is twice as deep.
See: Front speed: the Fisher–KPP dispersion relation

Q: In Rockne et al. (2010), did the fitted radiosensitivity $\alpha$ track $D$ or $\rho$, and what does that suggest?
A: $\rho$ ($r=0.89$, $n=9$), not $D$ ($r=-0.35$): response to radiation tracks net proliferation, not invasiveness. A pilot study, spherically symmetric model.
See: Two scans, two parameters

Q: How does Konukoglu's eikonal extrapolation of the glioma margin relate to the WKB limit of KPP?
A: With $c=e^{-Z/\varepsilon}$ and parabolic rescaling, $Z$ converges to the viscosity solution of $\min\{\partial_tZ+D|\nabla Z|^2+\rho,\,Z\}=0$ (Freidlin; Evans–Souganidis). The stationary version is the eikonal equation $4\rho\,\nabla T^{\!\top}D\nabla T=1$ for the arrival time, which is what is solved to extrapolate beyond the visible contour.
See: The invisible margin as an eikonal equation

Q: In the DTI-based glioma models of Painter–Hillen (2013) and Engwer et al. (2015), where does the macroscopic diffusion tensor come from?
A: From the parabolic scaling of a mesoscopic transport equation whose turning kernel is the fibre-orientation distribution read from DTI. Engwer et al. add adhesion binding, which also yields a drift term and produces finger-like spread.
See: Anisotropy from DTI

Q: Why can the glioma model not be calibrated from a single MRI alone, and what did Lipková et al. (2019) add?
A: One image gives level sets but no speed, so $(D,\rho)$ and time since onset are confounded. They add FET-PET (uptake proportional to density) and priors, and infer $(D,\rho,$ origin, onset time$)$ by Bayesian sampling with credible intervals.
See: Inverse problems from one scan

## Quiz

Q: Which first-order equation does the WKB limit $Z$ of the KPP glioma model satisfy ahead of the front?
- [x] $\partial_tZ+D|\nabla Z|^2+\rho=0$
- [ ] $\partial_tZ-D|\nabla Z|^2=\rho$
- [ ] $\partial_tZ=D\Delta Z+\rho Z$
- [ ] $|\nabla Z|=\rho/D$
E: Substituting $c=e^{-Z/\varepsilon}$ into the rescaled equation gives $\partial_tZ+D|\nabla Z|^2+\rho(1-c)=\varepsilon D\Delta Z$; in the limit the Laplacian disappears and the logistic factor is $1$ where $c\to0$. The point-source solution $|x|^2/(4Dt)-\rho t$ vanishes on the ball of radius $2\sqrt{D\rho}\,t$.
See: The invisible margin as an eikonal equation

Q: Why do the T1Gd and T2/FLAIR abnormalities at one time point determine $D/\rho$?
- [x] They are two level sets of one travelling profile whose decay length is $\sqrt{D/\rho}$, so their separation depends only on that ratio
- [ ] T1Gd measures $D$ directly and T2 measures $\rho$ directly
- [ ] The ratio of the two volumes equals $D/\rho$
- [ ] Their separation gives the speed $2\sqrt{D\rho}$
E: Speed needs two time points. One time point gives shape, and the shape of a KPP front is set by $\sqrt{D/\rho}$.
See: Two scans, two parameters

Q: A patient's lesion radius grows at $30$ mm/yr and the level-set separation implies $D/\rho=4$ mm². Then
- [x] $D=30$ mm²/yr and $\rho=7.5$/yr
- [ ] $D=7.5$ mm²/yr and $\rho=30$/yr
- [ ] $D=60$ mm²/yr and $\rho=15$/yr
- [ ] $D=15$ mm²/yr and $\rho=3.75$/yr
E: $D=\tfrac v2\sqrt{D/\rho}=15\times2=30$ and $\rho=\tfrac v2/\sqrt{D/\rho}=15/2=7.5$; check $2\sqrt{30\times7.5}=30$. The second option swaps the roles; the third and fourth forget the factor $\tfrac12$ or apply it twice.
See: Two scans, two parameters
