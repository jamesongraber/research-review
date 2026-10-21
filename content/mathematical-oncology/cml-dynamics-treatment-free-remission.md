---
title: "Chronic myeloid leukaemia: compartments, immune windows and stopping therapy"
tags: [cancer, leukaemia, bistability, identifiability, treatment-free-remission]
created: 2026-10-21
related: [leukaemia-stem-cell-models, kuznetsov-tumour-immune-model, pre-existing-resistance, branching-process-resistance, cancer-somatic-evolution, adaptive-therapy-trials-evidence, immunotherapy-optimal-control, digital-twins-oncology]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

Chronic myeloid leukaemia (CML) is the best-measured cancer in mathematical oncology: a single marker (the BCR-ABL transcript ratio in blood) sampled for years in hundreds of patients on tyrosine kinase inhibitors (TKIs, imatinib first). Twenty years of modelling turned on three questions: what the two slopes of the decline mean, whether the stem cells are being killed, and who can stop treatment.

### Michor's four compartments and the biphasic decline

Michor, Hughes, Iwasa, Branford, Shah, Sawyers and Nowak (2005) used a linear chain of leukaemic compartments (stem $y_0$, progenitors $y_1$, differentiated $y_2$, terminally differentiated $y_3$), structure paraphrased:
$$
y_0' = (r_y-d_0)\,y_0,\quad y_1' = a_y y_0 - d_1 y_1,\quad y_2' = b_y y_1 - d_2 y_2,\quad y_3' = c_y y_2 - d_3 y_3 ,
$$
with healthy and resistant copies of the chain. Imatinib is modelled as a large reduction of the differentiation rates $a_y, b_y$ (factors not verified here), so it acts below the stem compartment. Fitted to 169 patients, the model reads the **biphasic** exponential decline as two turnover rates: $0.05$/day for differentiated cells and $0.008$/day for progenitors, that is half-lives $\ln2/0.05\approx14$ and $\ln2/0.008\approx87$ days, or $0.65$ and $0.10$ $\log_{10}$ units per month. In a linear cascade with collapsed inputs each compartment decays at its own rate until it reaches the level sustained by the residual upstream input, then tracks the slower upstream compartment; an illustrative simulation with $d_2=0.05$, $d_1=0.008$ and inputs cut a hundredfold gives slope $-0.050$ for four months and $-0.008$ after eight. Because transcript levels rebound above baseline when therapy stops, the paper concluded that imatinib does not deplete leukaemic stem cells; the same model gave estimates of [pre-existing resistance](#/note/pre-existing-resistance).

### The Roeder dispute and the ten-year test

Roeder, Horn, Glauche, Hochhaus, Mueller and Loeffler (2006) fitted an agent-based model instead: stem cells switch between a quiescent and a cycling context, and imatinib kills proliferating BCR-ABL-positive cells, stem cells included, whenever they cycle. Both models reproduce the first year. Glauche, Horn and Roeder (2007, letter) pointed out that with stem cells untouched and "continuing to expand exponentially", the Michor model inevitably predicts relapse after about 1.5 years under continuing imatinib, whereas 69 German IRIS patients followed for 5.5 years kept declining. Tang et al. (2011), with ten-year data, found a **triphasic** decline, slopes $-0.052\pm0.018$ and $-0.0057\pm0.0038$ per day followed by a third slope that is negative in most patients: slow depletion of the stem-like compartment, revising the 2005 claim. Two cautions: Komarova and Wodarz (2007) showed that quiescence alone also produces biphasic and reverse-biphasic declines, so the curve's shape does not identify the mechanism; and neither model has an immune compartment, which the next generation needed to explain why anyone stays in remission after stopping.

### The immune window

Clapp et al. (2015) added autologous immune effectors to a CML compartment model with recruitment active only in an intermediate range of leukaemic load, the **immune window**: too little tumour does not stimulate, too much suppresses. The window explains the BCR-ABL oscillations seen in well-responding imatinib patients. Besse et al. (2018) reduced the model to three compartments (stem, mature leukaemic, immune) and did a full codimension-one bifurcation analysis for general suppression functions, finding a stable low-disease, treatment-free steady state: remission is a genuine attractor of the untreated system. Fassoni, Diaz, de Carvalho Braga and Santos (2024) proved the transcritical and Hopf bifurcations in a version with an optimal response window, computed Lyapunov coefficients, and read low-level BCR-ABL fluctuations as periodic orbits.

### Scenarios and what tumour load cannot tell you

Fassoni, Roeder and Glauche (2019) made this systematic. With quiescent stem cells $X$, proliferating stem cells $Y$ (the TKI kills only $Y$) and immune cells $Z$ (structure paraphrased),
$$
X' = -p_{XY}X + p_{YX}Y,\qquad
Y' = p_{XY}X - p_{YX}Y + p_Y Y\Big(1-\frac{Y}{T_Y}\Big) - e_{\mathrm{TKI}}(t)\,Y - m_K Z\,F(Y),\qquad
Z' = p_Z - d_Z Z + m_R Z\,G(Y),
$$
they tried 20 pairs of killing and recruitment functions $(F,G)$ and classified each sub-model by its attractors: scenario I, only the disease state $E_H$ is stable (relapse always); II, $E_H$ and a cure state $E_0$; III, $E_H$ and an immune-controlled remission $E_L$; IV and V, three stable states. Nine sub-models survive qualitative criteria, since fit quality alone cannot pick a model. Two conclusions matter here. The parameters that decide the outcome of stopping are **not identifiable from tumour-load data alone**: under full dose the decline is a bi-exponential $\log_{10}(Ae^{\alpha t}+Be^{\beta t})$ in every scenario. And an over-treatment paradox: a very long or intense treatment can push the state out of the basin of $E_L$, since the immune cells lose their stimulus, and cause relapse on cessation.

### Stopping therapy

Horn et al. (2013) turned patient-specific fits of seven-year IRIS data into a relapse-risk predictor for timing the stop. Hähnel et al. (2020) classified 21 patients from European discontinuation studies into class A (6: only the relapse state exists), B (8: strong immune control, all in treatment-free remission) and C (7: narrow window; 4 relapsed, 3 did not). Pre-cessation covariates did not differ between relapsing and non-relapsing patients, generic immune parameters predicted only 8 of 21, and the immune parameters became identifiable only from post-cessation data. The proposed rule is a perturbation experiment: halve the dose for twelve months and read the slope of $\log$ BCR-ABL; a pronounced increase means class A or C, and the patient should not stop. Fassoni, Yong, Clark, Roeder and Glauche (2025) tested this on the DESTINY cohort (75 patients: full dose, twelve months at half dose, stop) with NK-cell time courses for eight patients and a quasi-steady-state reduction of the fast immune dynamics: the information needed to predict remission is not in the full-dose time courses, immune changes are detectable within three months of dose reduction, and functional immune-cell losses above 20% associate with relapse. This is the cleanest case in oncology of bistability turned into a protocol, and of non-identifiability answered by a designed perturbation rather than by more data of the same kind.

## Cards

Q: What do the two slopes of the biphasic BCR-ABL decline mean in Michor et al. (2005), and what are the corresponding half-lives?
A: $0.05$/day is the turnover of differentiated leukaemic cells (half-life about 14 days); $0.008$/day is the turnover of progenitors (about 87 days).
See: Michor's four compartments and the biphasic decline

Q: Why does a linear compartment cascade with suddenly reduced inputs show a biphasic log-decline?
A: Each compartment decays at its own death rate until it reaches the level maintained by the residual upstream input, after which it tracks the slower upstream compartment; the slopes are the successive turnover rates.
See: Michor's four compartments and the biphasic decline

Q: What was Glauche, Horn and Roeder's (2007) objection to the Michor model, and what data settled it?
A: With stem cells expanding untouched, the model predicts relapse after about 1.5 years under continuing imatinib; 5.5-year IRIS data showed continued decline, and Tang et al. (2011) found a third, negative slope in ten-year data.
See: The Roeder dispute and the ten-year test

Q: Why does the shape of the BCR-ABL decline not identify whether stem cells are spared?
A: Komarova and Wodarz (2007) showed quiescence alone also gives biphasic and reverse-biphasic declines; different mechanisms produce the same bi-exponential curve.
See: The Roeder dispute and the ten-year test

Q: What is the "immune window" in CML models, and what dynamical structure does it create?
A: Immune recruitment is active only at intermediate leukaemic load (not stimulated at very low load, suppressed at high load); it creates bistability between relapse and an immune-controlled, treatment-free remission state.
See: The immune window

Q: Why are the immune parameters of the Fassoni–Roeder–Glauche model not identifiable from tumour load under full-dose therapy?
A: Under full dose the decline is a bi-exponential in every scenario; the attractor structure after stopping depends on the immune parameters, which only show up once the stimulus changes (dose reduction or cessation).
See: Scenarios and what tumour load cannot tell you

Q: What is the over-treatment paradox of Fassoni, Roeder and Glauche (2019)?
A: A very long or intense treatment can push the state out of the basin of the immune-controlled remission state (the immune response loses its stimulus), so stopping then leads to relapse.
See: Scenarios and what tumour load cannot tell you

Q: What is the Hähnel et al. (2020) rule for deciding who may stop TKI therapy?
A: Reduce the dose by half for twelve months and read the slope of log BCR-ABL; a pronounced increase indicates class A or C (no or narrow immune control), and such patients should not stop.
See: Stopping therapy

## Quiz

Q: A patient's BCR-ABL falls at $0.05$/day for four months and then at $0.008$/day. In Michor's reading, the second phase reflects
- [x] the turnover of leukaemic progenitors, now cut off from most of their stem-cell input
- [ ] the turnover of terminally differentiated cells
- [ ] the death rate of leukaemic stem cells under imatinib
- [ ] the growth of a resistant clone
E: The slow slope is the progenitor compartment draining; stem cells were assumed untouched, which is what Tang et al. (2011) later revised with a third slope.
See: Michor's four compartments and the biphasic decline

Q: In Besse et al. (2018), treatment-free remission is
- [x] a stable low-disease steady state of the untreated model, reachable for general suppression functions
- [ ] a transient near a saddle, necessarily ending in relapse
- [ ] a limit cycle created by the immune window
- [ ] the cure state $E_0$ with no leukaemic cells
E: The window gives a bistable untreated system with a stable low-disease state; Wilkie–Hahnfeldt's dormancy saddle is a different model. The low-level oscillations of Fassoni et al. (2024) are a separate, Hopf-born feature.
See: The immune window

Q: Hähnel et al. (2020) found that pre-cessation covariates did not separate relapsing from non-relapsing patients. Their response was to
- [x] perturb the system with a twelve-month half-dose period and read the slope of the response
- [ ] fit longer full-dose time courses to tighten the immune parameters
- [ ] use the biphasic slopes to classify patients into A, B and C
- [ ] measure NK cells at diagnosis
E: Non-identifiability from full-dose data cannot be fixed by more of it; a designed dose reduction changes the stimulus and exposes the immune parameters. Fassoni et al. (2025) added NK data on top of the dose-reduction response.
See: Stopping therapy
