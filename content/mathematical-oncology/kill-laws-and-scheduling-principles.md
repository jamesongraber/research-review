---
title: "Log-kill, Norton–Simon and the first scheduling disputes"
tags: [cancer, chemotherapy, log-kill, norton-simon, dose-scheduling]
created: 2026-10-21
related: [tumor-growth-laws, chemotherapy-optimal-control-origins, pre-existing-resistance, adaptive-therapy-control, branching-process-resistance, evolutionary-steering-collateral-sensitivity, bang-bang-singular-metronomic, adaptive-therapy-trials-evidence]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

A growth law $\dot N = f(N)$ says nothing about treatment until a **kill law** is chosen: how a dose rate $u(t)$ enters the equation.
Two kill laws dominate the clinical literature, and the choice between them is a modelling decision that the
[optimal-control literature](#/note/chemotherapy-optimal-control-origins) almost never varies.

### Skipper's log-kill hypothesis

Skipper, Schabel and Wilcox (1964, 1965) titrated L1210 leukaemia in mice and found that a given dose kills a fixed *fraction* of the cells
present, independent of their number. In ODE form (paraphrased; the 111-page report is not online)
$$
\dot N = rN - k\,u(t)\,N ,
$$
so each identical course removes the same number of "logs": a course that kills 99.9% takes $10^{12}$ cells to $10^9$, and $10^3$ cells to one.
Hence a fixed number of courses is needed from any burden, and cure means killing the last cell.
Simon and Norton (2006) state that the law "failed when applied to human and experimental
solid tumors in which tumor size approached a plateau level", the [Gompertzian case](#/note/tumor-growth-laws).

### The Norton–Simon hypothesis

Norton and Simon (1977; restated 1986 and 2006) proposed instead that chemotherapy produces a rate of regression proportional to the growth rate
an unperturbed tumour of that size would have. The transcription used here (the 1977 paper has no online abstract; this is the verbal
statement of Simon–Norton 2006 written as an ODE) is
$$
\text{log-kill: } \dot N = f(N) - k u N, \qquad \text{Norton–Simon: } \dot N = f(N)\,(1 - k u),
$$
with $f$ Gompertz. Under Norton–Simon the drug multiplies the *whole* growth term. Since the per-capita Gompertz rate is largest for small
tumours, a small residual tumour regresses fastest per capita under therapy and regrows fastest without it. Simon–Norton
(2006) conclude: maximise the chance of eradication "by delivering the most effective dose level of drug over as short a time as possible",
**dose density** (shorter intervals) rather than dose escalation. CALGB 9741 (Citron et al. 2003, as reported by Simon–Norton 2006) compared
two-week with three-week intervals in breast cancer and found the annual odds of recurrence reduced by 26% and of death by 31% ($P = 0.01$).
The hypothesis is phenomenological; Norton's 1988 Gompertz fit of human breast data was disputed (Retsky et al. 1989, not read) and
Talkington–Durrett (2015) find the same data inconsistent with it.

### A one-line computation

Write $y = \ln(K/N) \ge 0$ for a Gompertz tumour, so that $\dot N = \beta N y$ and larger $y$ means a smaller tumour. Then

- log-kill: $\dot y = -\beta y + k u$, so $y(T) = y_0 e^{-\beta T} + k\int_0^T e^{-\beta(T-s)}u(s)\,ds$;
- Norton–Simon: $\dot y = -\beta y (1 - k u)$, so $y(T) = y_0 \exp\!\big(-\beta T + \beta k \textstyle\int_0^T u\big)$.

Under log-kill with Gompertz growth the effect of a dose decays like $e^{-\beta(T-s)}$: the tumour "forgets" early doses by regrowing, and for a
fixed total dose and horizon the terminal size is smallest when the dose is given last. Under the Norton–Simon transcription $N(T)$ depends on
the schedule only through the total dose: compressing the same dose into a shorter course does not change the size
at a fixed later date, but gives a deeper **nadir** at the end of the shorter course ($y$ is larger at $T_1 < T_2$). In this
reading dose density is about eradication (nadir below a cure threshold), not about the burden at a fixed date. The numbers below use
$\beta = 0.0792$/day, $K = 1.19\times10^4$, $N_0 = 100$, $k = 0.5$, three two-day pulses at full dose within 42 days (same total dose).

| schedule | log-kill $N(42)$ | Norton–Simon $N(42)$ |
|---|---|---|
| days 0, 2, 4 | 8706 | 9545 |
| days 0, 14, 28 | 5975 | 9545 |
| days 0, 21, 40 | 3105 | 9545 |
| days 36, 38, 40 | 918 | 9545 |

### Goldie–Coldman versus Day

Goldie and Coldman (1979) brought resistance in: if each division produces a resistant mutant with probability $\alpha$, the chance that a
tumour of $N$ cells has none falls from near one to near zero over a short interval around $N \sim 1/\alpha$ (see
[pre-existing resistance](#/note/pre-existing-resistance)). Their 1982 simulation paper concludes: treat early, and for two non-cross-resistant
drugs *alternate* them as rapidly as possible. Day (1986) showed by simulation that this is an artefact of symmetry: when the two drugs differ
in effectiveness, non-alternating schedules usually do better, his "worst drug rule" (precise content not reproduced here). The Bonadonna
trial, sequential (four cycles of A then eight of CMF) against alternating CMF/A, favoured sequential, as the Norton–Simon model predicted and
contrary to Goldie–Coldman (Simon–Norton 2006). The modern version of the dispute is
[evolutionary steering](#/note/evolutionary-steering-collateral-sensitivity).

### What the kill law does to a control problem

Both laws are affine in $u$, so Pontryagin's principle gives bang-bang and singular candidates either way (see
[the switching-function analysis](#/note/chemotherapy-optimal-control-origins)). But the field multiplied by $u$ differs,
$g = -kN$ for log-kill and $g = -k f(N)$ for Norton–Simon, so the Lie brackets $[f, g]$ that locate switches and singular arcs differ.
In the $y$ variable the Norton–Simon system $\dot y = -\beta y + \beta k\, y u$ is *bilinear*, the "multiplicative control
system" class of Bahrami–Kim (1975), while log-kill is linear with additive control. Every classical optimal-control paper (Swan, Murray,
Martin, Swierniak, Ledzewicz–Schättler) uses log-kill; as of 2026 no Pontryagin or HJB analysis of the Norton–Simon kill law with a toxicity
state constraint was found, so whether dose density is *optimal* in that model is an open and tractable question.

## Cards

Q: What does Skipper's log-kill hypothesis assert, and from what data did it come?
A: A given dose kills a fixed *fraction* of the tumour cells present, whatever their number: $\dot N = rN - kuN$. From in vivo titration of L1210 leukaemia in mice (Skipper, Schabel, Wilcox 1964–65).
See: Skipper's log-kill hypothesis

Q: Why, according to Simon and Norton (2006), did the log-kill model fail for solid tumours?
A: It worked for experimental leukaemia because the growth kinetics were constant (exponential) during observation; it failed for human and experimental solid tumours whose size approaches a plateau, the Gompertzian case.
See: Skipper's log-kill hypothesis

Q: State the Norton–Simon hypothesis and its ODE transcription.
A: Therapy causes a rate of regression proportional to the growth rate of an unperturbed tumour of that size: $\dot N = f(N)(1 - ku)$, with $f$ Gompertz. The ODE form is a transcription of the verbal statement in Simon–Norton (2006).
See: The Norton–Simon hypothesis

Q: Why does the Norton–Simon hypothesis lead to dose *density* rather than dose escalation?
A: Small residual tumours have the largest per-capita Gompertz rate, so they regress fastest under drug and regrow fastest between doses. The lever is the time between doses, not the dose level: give the effective dose over as short a time as possible.
See: The Norton–Simon hypothesis

Q: What did CALGB 9741 show, as reported by Simon and Norton (2006)?
A: In breast cancer, two-week instead of three-week intervals (same drugs) reduced the annual odds of recurrence by 26% and of death by 31% ($P = 0.01$), the dose-density prediction.
See: The Norton–Simon hypothesis

Q: For a Gompertz tumour with $y = \ln(K/N)$, write the $y$-equations under log-kill and under Norton–Simon kill, and say what each implies about schedule dependence of $N(T)$.
A: Log-kill: $\dot y = -\beta y + ku$, so $y(T) = y_0e^{-\beta T} + k\int_0^T e^{-\beta(T-s)}u\,ds$ and late doses count more. Norton–Simon: $\dot y = -\beta y(1 - ku)$, so $y(T) = y_0\exp(-\beta T + \beta k\int_0^T u)$ depends only on the total dose.
See: A one-line computation

Q: What did Goldie and Coldman (1982) recommend for two non-cross-resistant drugs, and what was Day's (1986) objection?
A: Alternate them as rapidly as possible. Day showed by simulation that this relies on the drugs being symmetric; with unequal drugs non-alternating schedules usually do better.
See: Goldie–Coldman versus Day

Q: Why does the Ledzewicz–Schättler bang-bang/singular analysis for log-kill models not transfer to the Norton–Simon kill law?
A: The control-multiplied field changes from $g = -kN$ to $g = -kf(N)$, so the Lie brackets $[f,g]$ and $[g,[f,g]]$ that locate switches and singular arcs change. No Pontryagin or HJB treatment of the Norton–Simon law was found (open as of 2026).
See: What the kill law does to a control problem

## Quiz

Q: Under log-kill, a course that kills 99.9% of cells is applied to a tumour of $10^9$ cells. It leaves about…
- [x] $10^6$ cells
- [ ] $10^3$ cells
- [ ] $9.99 \times 10^8$ cells
- [ ] no cells
E: Fractional kill removes three logs: $10^9 \times 10^{-3} = 10^6$. Killing 99.9% is removing a fraction, not a fixed number, of cells.
See: Skipper's log-kill hypothesis

Q: In the Norton–Simon transcription $\dot N = f(N)(1 - ku)$ with Gompertz $f$, the same total dose is delivered either over 8 weeks or over 12 weeks. The model predicts…
- [x] the same size at week 12, but a deeper nadir at the end of the 8-week course
- [ ] a smaller tumour at week 12 under the 8-week course
- [ ] the same nadir, reached earlier under the 8-week course
- [ ] a larger tumour at week 12 under the 8-week course, because of the longer regrowth
E: $y(T) = y_0\exp(-\beta T + \beta k\int_0^T u)$ depends only on $T$ and the total dose, so $N(12\text{ wk})$ coincides; but $y$ at week 8 is larger under the dense course, so its nadir is lower. Dose density is about eradication.
See: A one-line computation

Q: Under log-kill with Gompertz growth, fixed total dose and fixed horizon $T$, the terminal size $N(T)$ is smallest when the dose is…
- [x] given as late as possible
- [ ] given as early as possible
- [ ] spread uniformly
- [ ] independent of timing
E: $y(T) = y_0e^{-\beta T} + k\int_0^T e^{-\beta(T-s)}u(s)\,ds$ weights a dose at time $s$ by $e^{-\beta(T-s)}$, increasing in $s$. With exponential growth instead, timing would be irrelevant.
See: A one-line computation

Q: Which trial outcome is predicted by the Norton–Simon model but not by Goldie–Coldman (Simon–Norton 2006)?
- [x] Sequential A then CMF beats alternating CMF/A
- [ ] Alternating drugs beats sequential
- [ ] Dose escalation beats dose density
- [ ] Three-week intervals beat two-week intervals
E: Goldie–Coldman's symmetric resistance model favours rapid alternation; the Bonadonna trial favoured the sequential schedule, in line with Norton–Simon and with Day's asymmetry critique.
See: Goldie–Coldman versus Day
