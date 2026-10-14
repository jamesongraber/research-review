---
title: Aggregate risk, the master equation, and Moll's critique of rational expectations
tags: [rational-expectations, master-equation, common-noise, heterogeneous-agents]
created: 2026-08-05
related: [bewley-huggett-aiyagari, moll-ryzhik-learning-mfg, adaptive-learning-e-stability, econ-vocabulary-for-mfg]
source: "Claude conversations: Economics for mean field games researchers; MFG without rational expectations, et al (2026-08)"
---

## Article

### Rational expectations

**Rational expectations** (Muth, 1961) means that agents' subjective beliefs about the variables they forecast coincide with the model's own predictions. In an MFG this is built in without being named: each agent optimizes against the *true* flow of measures $(m_t)$, or with common noise against its true conditional law. Every standard MFG is a rational-expectations model.

### Aggregate shocks make the distribution a state variable

Without aggregate shocks (as in [Bewley–Huggett–Aiyagari](#/note/bewley-huggett-aiyagari)) the distribution path is deterministic, and agents only need to know the price path. Add an **aggregate shock** $Z_t$, which is **common noise**, and the distribution $m_t$ becomes random. Prices are functionals of $m_t$, so under rational expectations an agent who wants to forecast the interest rate must forecast the whole cross-sectional distribution. The agent's value then depends on $(x, Z, m)$ with $m \in \mathcal P(\mathbb R^n)$, and the HJB becomes a PDE on Wasserstein space: the **master equation**. Moll notes that this name and formalism came from the MFG literature (Cardaliaguet–Delarue–Lasry–Lions) and recently migrated into economics.

### Krusell–Smith: approximate aggregation

Krusell–Smith (1998) is the aggregate-shock version of Aiyagari. Their numerical workaround: agents forecast prices using only a few moments of the distribution, typically mean capital, through a simple (log-linear) forecasting rule. The rule's coefficients are iterated until the rule is consistent with the simulated economy. They found the fit was very good ("approximate aggregation"). In MFG terms this is a finite-dimensional closure of the master equation.

### Moll's critique

Moll, "The Trouble with Rational Expectations in Heterogeneous Agent Models: A Challenge for Macroeconomics" (*Economic Journal* 136, 2026; arXiv 2508.20571), argues:

- Rational expectations require forecasting equilibrium prices by forecasting cross-sectional distributions. This is an **extreme curse of dimensionality**: Bellman equations with the whole distribution as state (the "Master equation", which he also calls the "**Monster equation**").
- Frontier computational methods struggle with these equations, so it is **implausible that real households and firms solve them**. Too much effort goes into solving an unrealistically complex problem.
- Methods that linearize in aggregate states, or use one-time "MIT shocks", avoid the problem but cannot handle questions where **aggregate nonlinearities** matter, such as financial crises.
- Replacements should meet three criteria: **computational tractability**, **consistency with empirical evidence** (e.g. survey expectations), and **(some) immunity to the Lucas critique**, meaning beliefs respond to changes in the economic environment.
- Promising directions: temporary-equilibrium approaches, survey expectations, least-squares learning, and reinforcement learning.

The critique is aimed squarely at the MFG-derived master-equation apparatus, not at some economics-native competitor. Follow-ups: Moll–Ryzhik, "Mean Field Games without Rational Expectations" ([separate note](#/note/moll-ryzhik-learning-mfg)), and Yang–Wang–Schaab–Moll, "Structural reinforcement learning for heterogeneous agent macroeconomics" (arXiv 2512.18892).

### Where MFG stands in economics

As of mid-2026 the picture was:
- **Stationary case** (idiosyncratic risk only): absorbed into the standard toolkit.
- **Aggregate-risk case**: the live debate is not "should we use MFG" but whether the common-noise/master-equation extension is the wrong direction, and what should replace it. AHLLM (2022) is the established result, not the frontier.
- **Outside macro**: MFG applications continue in spatial economics, green-technology adoption, price formation and systemic risk. (One spatial example the chat cited, Bahlali–Boucekkine–Petit 2025, "When Lions meets Krugman", is unverified.)

## Cards

Q: What does "rational expectations" mean, and where is it hidden in a standard MFG?
A: Agents' beliefs coincide with the model's true law of motion. In an MFG each agent optimizes against the true flow of measures (or its true conditional law under common noise).
See: Rational expectations

Q: Why does an aggregate shock force the master equation under rational expectations?
A: With common noise $m_t$ is random and prices depend on it. To forecast prices an agent must forecast $m_t$, so the value function depends on $(x, Z, m)$: a PDE on the space of measures.
See: Aggregate shocks make the distribution a state variable

Q: What was Krusell–Smith's workaround for the distribution as a state variable?
A: Agents forecast prices from a few moments (mean capital) with a simple log-linear rule whose coefficients are iterated to consistency. It fit very well ("approximate aggregation"): a finite-dimensional closure of the master equation.
See: Krusell–Smith: approximate aggregation

Q: What is Moll's core objection to rational expectations in heterogeneous-agent models?
A: Agents would have to forecast prices by forecasting the whole cross-sectional distribution, solving infinite-dimensional Bellman ("Monster") equations. Even frontier numerical methods struggle with these, so real agents can't be solving them.
See: Moll's critique

Q: Why isn't linearizing in aggregate states (or using MIT shocks) an adequate escape from the master equation?
A: It discards aggregate nonlinearities, which are the point of questions like financial crises.
See: Moll's critique

Q: What three criteria does Moll propose for replacements of rational expectations?
A: Computational tractability, consistency with empirical evidence (e.g. survey expectations), and some immunity to the Lucas critique (beliefs respond to changes in the environment).
See: Moll's critique

Q: Talking to a heterogeneous-agent macroeconomist in 2026, what is the live MFG question?
A: Not whether to use MFG (the stationary case is standard), but whether the common-noise/master-equation extension is the wrong direction and what should replace rational expectations.
See: Where MFG stands in economics

## Quiz

Q: In which situation does a rational-expectations heterogeneous-agent model require the master equation?
- [ ] Whenever agents face idiosyncratic income risk
- [x] When there are aggregate shocks (common noise), so prices depend on a random distribution
- [ ] Whenever there is a borrowing constraint
- [ ] Only in finite-horizon problems
E: With idiosyncratic risk alone the distribution path is deterministic and a stationary or time-dependent HJB–FP system suffices.
See: Aggregate shocks make the distribution a state variable

Q: Which of these is NOT among the directions Moll proposes to replace rational expectations?
- [ ] Least-squares learning
- [ ] Reinforcement learning
- [ ] Using survey expectations
- [x] Solving the master equation with better numerical methods
E: Better master-equation solvers are exactly what he argues against: too much effort spent on an unrealistically complex problem.
See: Moll's critique

Q: Krusell–Smith's "approximate aggregation" is, in MFG terms…
- [ ] an exact solution of the master equation
- [x] a closure replacing the distribution by a few moments in the forecasting rule
- [ ] the ergodic limit of the MFG
- [ ] a potential MFG formulation
E: Agents' forecasts depend on mean capital rather than on the full measure; the rule is iterated to self-consistency.
See: Krusell–Smith: approximate aggregation
