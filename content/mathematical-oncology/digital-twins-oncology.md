---
title: "Digital twins: calibrating PDE tumour models from imaging"
tags: [cancer, digital-twins, bayesian-calibration, identifiability, radiotherapy, inverse-problems]
created: 2026-10-21
related: [glioma-reaction-diffusion-personalisation, radiotherapy-fractionation-control, numerical-optimal-control-methods, adaptive-therapy-trials-evidence, field-open-questions, mathematical-oncology-landscape, tumor-growth-laws, phase-field-and-mixture-models, metastasis-models]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

A digital twin is a patient-specific model that is calibrated to that patient's data, predicts their future, and is used to choose their treatment. In oncology the word arrived around 2020, but the programme is older: Yankeelov et al. (2013) stated it as "initialise and calibrate PDE growth models from quantitative imaging". This note is about what is actually estimated from what data.

### The programme and its framework

Wu et al. (2022) give the framework as a decision network: physical state $S$, observational data $O$, control inputs $U$ (therapy), digital state $D$, quantities of interest $Q$, rewards $R$, iterated as data arrive. Five design questions precede any model: what the twin is for; how much complexity that needs; whether a mechanism-based model exists; what data are available; whether the uncertainty can be characterised. Their limitations list: simplification across scales, sparse and coarse data (a voxel holds millions of cells), cost of repeated solves, model selection and validation, and uncertainty of measurement, model form, numerics and inter-patient variability. One sentence to remember: pre-treatment images give initial conditions, and **at least one follow-up imaging session is needed to calibrate parameters**.

### What is estimated from what data

The Yankeelov group's breast protocol (Jarrett et al. 2018, 2021) uses a mechanically coupled reaction–diffusion model: cell density from diffusion-weighted MRI (the apparent diffusion coefficient maps cellularity), vascular and drug-delivery properties from dynamic contrast-enhanced MRI, proliferation $k(x)$ and diffusion $D$ calibrated per patient, diffusion damped by mechanical stress through a linear-elasticity equation (in the form recalled by the survey, $D=D_0e^{-\gamma\sigma_{vm}}$, unverified), chemotherapy as concentration-dependent death. The protocol needs coregistered MRI from at least two visits and about 10 hours of calibration and prediction per patient, and forecasts the spatial response to neoadjuvant therapy. For glioma the twin is the [D–ρ model](#/note/glioma-reaction-diffusion-personalisation) with radiotherapy as linear–quadratic cell kill; Hormuth et al. (2021, 2022) add imaging-derived vasculature. The rule across all of these: one parameter per independent imaging observable per patient, nothing more.

### Model selection: OPAL

Which model? Lima et al. (2017) apply the Occam Plausibility Algorithm (Farrell, Oden and Faghihi 2015) to 39 candidate models derived from mixture theory, with radiotherapy and simple mechanical deformation, on MRI of a rat glioma followed for about three weeks with radiation at day 14.5. OPAL calibrates each model by Bayesian inference, ranks models within each class by posterior plausibility, picks the simplest plausible one (Occam) and tests it for inadequacy by statistical validation on held-out time points, with finite elements for the forward problem and MCMC for the posteriors. This is model selection, not identifiability: a plausible model can still have unidentifiable parameters.

### From calibration to decision: Chaudhuri 2023

Chaudhuri et al. (2023) close the loop for high-grade glioma: priors on the mechanistic parameters from population data in the literature; Bayesian calibration to each patient's MRI; then a multi-objective, **risk-aware** optimisation of the radiotherapy regimen under the posterior uncertainty, trading the risk of tumour-volume growth against toxicity, which yields a Pareto set of patient-specific regimens. On an in-silico cohort of 100 virtual patients: at the standard total dose, median time to progression improved by about six days; at the standard level of control, median total dose fell by $16.7\%$ (10 Gy of the 60 Gy standard); and for aggressive tumours the optimiser proposed higher doses. The decision step is static optimisation; the dynamic-programming version, re-optimising after each scan, is the natural extension (see [numerical methods](#/note/numerical-optimal-control-methods) and [fractionation](#/note/radiotherapy-fractionation-control)).

### The lean alternative: Enderling's PSI

Enderling's group asks how little a model can be. Prokopiou et al. (2015) use logistic growth $\dot V=\lambda V(1-V/K)$ and define the **proliferation saturation index** $\mathrm{PSI}=V_0/K$, the filled fraction of the host-supported carrying capacity, estimated from two routine pre-radiotherapy CT scans; in four lung-cancer patients PSI varied widely and was inversely related to volumetric response. Note the arithmetic: two volumes give one ratio, so $\lambda$ and $K$ cannot both be identified; one comes from a population value and PSI is what is identified. (Check: $V_0=10$ and $V=23.96$ thirty days later are produced by $(\lambda,K)=(0.05,40)$ and by $(0.0347,100)$.) Sunassee et al. (2019) put PSI in an adaptive Bayesian scheme; Zahid et al. (2021) derive a dynamics-adapted dose from early volume dynamics in 39 head-and-neck patients (unconstrained doses ranged 8–186 Gy, so a constrained version was tested); Brüningk et al. (2021) fit 16 recurrent-glioma patients and find intermittent high-dose radiotherapy matches or beats the standard schedule in 15 of 16 in silico; Barrett et al. (2026) validate PSI externally on 71 lung-cancer patients, $R^2$ rising from 0.81 to 0.94 as three to five early scans are used. Compare the [growth laws](#/note/tumor-growth-laws).

### Requirements and gaps

West et al. (2023), question 9, state the pipeline as calibrate, validate, test sensitivity and identifiability, then predict, with two rules: **correlated parameters must not be estimated jointly**, and **a model that cannot fit the data must not be used to predict**. Question 11 proposes "Phase i" virtual trials, calibrated virtual cohorts matched to individual patients, insists on rigorous uncertainty quantification, and notes that clinical data are collected at times of little value to modellers (scans 6–12 weeks into therapy) whereas models need data before progression. Hormuth and coauthors' essay in the 2019 roadmap (Rockne et al.) asks which models predict outcomes best, how to quantify prediction uncertainty and how to use noisy limited data, and proposes families of models calibrated per patient and selected by Bayesian methods, as in weather forecasting.

The identifiability gap is the sharpest. The glioma line calibrates two scalars from two scans; the mechanics-coupled twins add a stress-dependent diffusion and an elastic coupling that act on the observed volumes through the same channel, and the survey's assessment is that these are structurally non-identifiable from volume data alone. OPAL does not test this, and no theorem says which functionals of the coefficients two imaging observations determine. See the [open questions](#/note/field-open-questions) and the [landscape](#/note/mathematical-oncology-landscape).

## Cards

Q: In Wu et al.'s (2022) digital-twin framework, what are the pre-treatment images used for, and what is the minimum data to calibrate?
A: Pre-treatment images give the initial condition; at least one follow-up imaging session is needed to calibrate parameters. Jarrett's protocol likewise requires coregistered MRI from at least two visits.
See: The programme and its framework

Q: What does the Occam Plausibility Algorithm do in Lima et al. (2017), and what does it not do?
A: Bayesian calibration of 39 candidate models on rat-glioma MRI, ranking by posterior plausibility within classes, choice of the simplest plausible model and validation on held-out time points. It selects models; it does not test parameter identifiability.
See: Model selection: OPAL

Q: Describe the three stages of Chaudhuri et al.'s (2023) glioma digital twin and the headline in-silico results.
A: Population priors, Bayesian calibration to the patient's MRI, then multi-objective risk-aware optimisation of radiotherapy (growth risk vs toxicity). On 100 virtual patients: about six days more median time to progression at equal dose, or $16.7\%$ (10 Gy) less dose at equal control.
See: From calibration to decision: Chaudhuri 2023

Q: What is the proliferation saturation index, and why can two scans not identify both $\lambda$ and $K$ in the logistic model?
A: $\mathrm{PSI}=V_0/K$, the filled fraction of the carrying capacity. Two volumes give one ratio, so the pair $(\lambda,K)$ is a one-parameter family; one must be fixed from the population and PSI is what is identified.
See: The lean alternative: Enderling's PSI

Q: What are the two rules of West et al. (2023, question 9) for real-time patient prediction?
A: Correlated parameters must not be estimated jointly, and a model that cannot fit the data must not be used to predict. The pipeline is calibrate, validate, test sensitivity and identifiability, then predict.
See: Requirements and gaps

Q: What is a "Phase i" virtual trial (West et al. 2023, question 11)?
A: A calibrated virtual cohort matched to individual patients, used to test a protocol in silico with uncertainty analysis before a clinical trial. The requirement attached: predictions must carry rigorous uncertainty quantification.
See: Requirements and gaps

Q: Why are mechanics-coupled tumour twins harder to identify than the two-parameter glioma model?
A: Stress-dependent diffusion and the elastic coupling both act on the observed volumes through the same channel, so volume data alone cannot separate them (the survey's assessment); the glioma model has exactly two parameters for two observables.
See: Requirements and gaps

## Quiz

Q: According to Wu et al. (2022), calibrating a digital twin's parameters requires
- [x] at least one follow-up imaging session after the pre-treatment images
- [ ] a single pre-treatment multiparametric scan
- [ ] population-average parameters, since patient data are too sparse
- [ ] a biopsy-derived proliferation index
E: The pre-treatment images fix the initial condition; a dynamic model needs a second time point to constrain rates. Single-scan calibration exists for glioma only with extra modalities and priors.
See: The programme and its framework

Q: In Chaudhuri et al.'s (2023) in-silico cohort, at the standard level of tumour control the median total dose dropped by
- [x] $16.7\%$, i.e. 10 Gy of the 60 Gy standard
- [ ] $50\%$, i.e. 30 Gy
- [ ] 6 Gy, matching the six-day gain
- [ ] nothing; only time to progression changed
E: Two separate results: six more days at equal dose, or 10 Gy less at equal control. Both are on 100 simulated patients, not a trial.
See: From calibration to decision: Chaudhuri 2023

Q: West et al. (2023) say that parameters found to be correlated
- [x] should not be estimated together
- [ ] should be estimated jointly with a correlated prior
- [ ] show that the model is wrong and must be replaced
- [ ] should be set equal to each other
E: The rule is about identifiability, not model form: fix or combine correlated parameters before fitting, otherwise the fit is non-unique and predictions are meaningless.
See: Requirements and gaps
