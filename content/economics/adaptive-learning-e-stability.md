---
title: Adaptive learning and E-stability
tags: [learning, rational-expectations, stochastic-approximation, equilibrium-selection, temporary-equilibrium]
created: 2026-08-07
related: [learning-without-replays, moll-ryzhik-learning-mfg, discounted-stationary-mfg, gradient-play-stability, master-equation-and-rational-expectations]
source: "Claude conversation: MFG without rational expectations, et al (2026-08). Expanded 2026-10-19: why the gain is 1/t, what shocks do, where PLMs come from, related frameworks."
---

## Article

Adaptive learning is macroeconomics' answer to the question "how could agents come to have rational expectations?" Standard references: Marcet–Sargent (*J. Econ. Theory* 1989) and Evans–Honkapohja, *Learning and Expectations in Macroeconomics* (Princeton, 2001).

### PLM, ALM and the T-map

Agents don't know the equilibrium law of motion. They posit a **perceived law of motion (PLM)** with parameter $\phi$ (e.g. a regression of prices on past data), act optimally given it, and update $\phi$ by **recursive least squares** as data arrive. Their behavior generates an **actual law of motion (ALM)**; write $T(\phi)$ for the parameter of the ALM, projected back onto the PLM class. A **rational expectations equilibrium (REE)** is a fixed point,
$$
T(\phi^*) = \phi^*.
$$
In MFG terms: the PLM is a parametric guess about the path of the mean field (or the aggregate prices it determines), the ALM is what the Fokker–Planck equation actually produces when everyone optimizes against that guess, and an REE is an MFG equilibrium, provided the PLM class contains it.

### Where perceived laws of motion come from

The PLM is a **modeling choice**: an econometric forecasting model that the modeler hands the agents. It is not estimated from any economy's data, though it can be disciplined by data (below). Evans and Honkapohja state the guiding rule as the **cognitive consistency principle**: model agents as roughly as sophisticated as the economists studying them, so they run the kind of regressions an econometrician would.

- **Default: the REE's own functional form.** Take the regressors to be the state variables that appear in the REE you are asking about (in linear models, the *minimal state variable* (MSV) solution). Then the PLM is correctly specified at the REE, the REE is a fixed point of $T$, and the only question is whether learning finds it.
- **Overparameterized PLMs.** Agents may include extra regressors that don't appear in the REE, such as additional lags or a sunspot variable. An REE that remains E-stable against such PLMs is called **strongly E-stable**.
- **Misspecified (underparameterized) PLMs.** If agents omit a relevant variable, the fixed point of the projected $T$ is not an REE. It is a **restricted perceptions equilibrium**: beliefs are the best forecast *within the agents' class*, so forecast errors are orthogonal to the regressors they use but not to the ones they omit. A close relative is the **self-confirming equilibrium** of game theory (Fudenberg–Levine): beliefs agree with everything observed on the equilibrium path but may be wrong off it.
- **Empirical discipline.** In applied macro the PLM (often a small VAR) and the gain are chosen or estimated so that model expectations match survey measures of expectations. That is a calibration of the PLM, not a derivation of it.

#### A worked example: the cobweb model

Producers choose supply a period ahead based on the expected price, and demand clears the market. Solving market clearing for the price gives
$$
p_t = \mu + \alpha\,E^*_{t-1}p_t + \delta\,w_{t-1} + \eta_t,
$$
with $w_{t-1}$ an observed exogenous variable (say, weather), $\eta_t$ unforecastable noise, and $\alpha < 0$ (expecting a higher price raises supply, which lowers the price). The MSV PLM is $p_t = a + b\,w_{t-1} + \eta_t$. Plugging the forecast $E^*_{t-1}p_t = a + b\,w_{t-1}$ into the model gives the ALM $p_t = (\mu + \alpha a) + (\delta + \alpha b)w_{t-1} + \eta_t$, so
$$
T(a,b) = (\mu + \alpha a,\ \delta + \alpha b), \qquad (a^*, b^*) = \Big(\frac{\mu}{1-\alpha}, \frac{\delta}{1-\alpha}\Big).
$$
Here $DT = \alpha I$, so the REE is E-stable iff $\alpha < 1$, which always holds in the cobweb model. Compare **naive expectations** $E^*_{t-1}p_t = p_{t-1}$, the classic cobweb: there $p_t = \mu + \alpha p_{t-1} + \dots$ is stable only if $|\alpha| < 1$, i.e. supply less elastic than demand. With $\alpha = -1.5$, naive expectations oscillate explosively, while least-squares learners converge to the REE. Both facts were checked by simulation when this section was written.

### The E-stability principle

Recursive least squares with decreasing gain is a stochastic approximation scheme. By Ljung's ODE method its asymptotics are governed by
$$
\frac{d\phi}{d\tau} = T(\phi) - \phi.
$$
An REE is **E-stable** if it is a locally asymptotically stable rest point of this ODE. The linearization is $DT(\phi^*) - I$, so the condition is
$$
\operatorname{spec} DT(\phi^*) \subset \{\operatorname{Re}\lambda < 1\},
$$
which for a scalar parameter is just $T'(\phi^*) < 1$. The **E-stability principle**: E-stability governs whether real-time least-squares learning converges locally to the REE.

E-stable equilibria form a subset of the REE, so E-stability is an **equilibrium selection** criterion. It has long been used to choose among multiple REE, including sunspot and indeterminate equilibria. It is the macro counterpart of asking that a Nash equilibrium be stable under a learning flow ([gradient play](#/note/gradient-play-stability)).

### Why the gain is 1/t

Suppose agents believe the price is a constant plus noise and estimate it by the **sample mean of everything observed so far**, $\hat p_t = \frac1t\sum_{s=1}^t p_s$. Written recursively,
$$
\hat p_t = \hat p_{t-1} + \frac1t\,(p_t - \hat p_{t-1}).
$$
The newest observation gets weight $1/t$ because it is one of $t$ equally weighted data points. That is the whole origin of the gain. Equal weighting is the right thing for someone who believes the parameter is **constant**: the sample mean (more generally, OLS) is then consistent, and with Gaussian noise and a flat prior it is the Bayesian posterior mean. In continuous time, $\hat p_t = \frac1t\int_0^t p_s\,ds$ satisfies $\dot{\hat p} = \frac1t(p_t - \hat p_t)$.

For a regression $y_t = \phi^\top x_{t-1} + \text{noise}$, ordinary least squares on all data so far is (up to initialization) the same recursion in matrix form:
$$
\phi_t = \phi_{t-1} + \tfrac1t R_t^{-1}x_{t-1}\big(y_t - \phi_{t-1}^\top x_{t-1}\big), \qquad R_t = R_{t-1} + \tfrac1t\big(x_{t-1}x_{t-1}^\top - R_{t-1}\big).
$$

The twist that makes this interesting: the data are **self-referential**, since $p_t$ depends on $\hat p_{t-1}$ through $T$. The sample mean chases a target that moves with it, which is why convergence needs a condition (E-stability) at all.

In stochastic approximation terms, a gain sequence $\gamma_t$ needs $\sum\gamma_t = \infty$ (to travel any distance) and $\sum\gamma_t^2 < \infty$ (so noise averages out). The ODE time is $\tau_t = \sum_{s\le t}\gamma_s$, which for $\gamma_t = 1/t$ is $\approx \log t$. That is where the next section's $\tau = \log t$ comes from.

### Fictitious time lives in the proof

The ODE has an auxiliary time $\tau$, but it is a device in the *proof*, not in the *model*: agents live one history. With a gain of $1/t$, e.g. $\dot{\hat p}_t = \frac1t (p_t - \hat p_t)$, the substitution $\tau = \log t$ gives exactly
$$
\frac{d\hat p}{d\tau} = t\,\frac{d\hat p}{dt} = p_t - \hat p_t,
$$
so $\tau$ is a reparametrization of calendar time. Fictitious play in MFG puts the same fictitious time into the *model* as replays. That is the whole difference, and it is a modeling choice.

**Rate without shocks.** If convergence in $\tau$ is exponential at rate $1 - \max \operatorname{Re}\lambda(DT)$, then in calendar time it is only **polynomial**, $|\hat p_t - \phi^*| \sim t^{-(1-\max\operatorname{Re}\lambda)}$. For example, in the deterministic model with $T(p) = 0.5 - 0.8p$ the error decays like $t^{-1.8}$.

**Rate with shocks.** Each period's shock enters with weight $1/t$, and these accumulate into an error of order $t^{-1/2}$, the central limit theorem for the sample mean. The actual rate is therefore
$$
|\hat p_t - \phi^*| \sim t^{-\min(1 - \max\operatorname{Re}\lambda,\ 1/2)}.
$$
So learning is $\sqrt t$-consistent iff $\max\operatorname{Re}\lambda(DT) < 1/2$, which is stricter than E-stability. Between $1/2$ and $1$ it still converges, but more slowly than $t^{-1/2}$. Simulated (200 runs each): with $T(p) = 0.5 - 0.8p$ the error decays like $t^{-1/2}$, not $t^{-1.8}$; with $T(p) = 0.5 + 0.8p$ it decays like $t^{-0.2}$.

### Decreasing vs. constant gain

With a **constant gain** $\kappa$, beliefs are updated by $\phi_t = \phi_{t-1} + \kappa(p_t - \phi_{t-1})$. Without shocks, the mean dynamics $\dot\phi = \kappa(T(\phi) - \phi)$ converge **exponentially** to an E-stable REE, faster than with $1/t$. So any failure to converge comes from the shocks. The convergence statement has to be read correctly: the *distribution* of beliefs converges exponentially, but the *path* never settles.

#### What the shocks do

Take the scalar case $p_t = T(\phi_{t-1}) + \sigma\varepsilon_t$ with i.i.d. standard shocks, and write $e_t = \phi_t - \phi^*$ and $c = 1 - T'(\phi^*) > 0$ (E-stability). Linearizing,
$$
e_t = (1 - \kappa c)\,e_{t-1} + \kappa\sigma\,\varepsilon_t,
$$
an AR(1). The mean decays like $(1-\kappa c)^t \approx e^{-\kappa c t}$, which is the ODE's exponential convergence. But every period injects fresh noise of size $\kappa\sigma$, and the gain never shrinks to damp it. The variance converges to
$$
\operatorname{Var}(e_\infty) = \frac{\kappa\sigma^2}{c\,(2 - \kappa c)} \approx \frac{\kappa\sigma^2}{2c}.
$$
Beliefs fluctuate forever in a band of width $O(\sqrt\kappa)$ around $\phi^*$. Contrast the $1/t$ gain: the shock at time $t$ enters with size $\sigma/t$, and $\sum 1/t^2 < \infty$, so the total injected noise is finite and dies out. The variance formula was checked by simulation for $\kappa = 0.1$ and $\kappa = 0.02$.

**Diffusion approximation.** In the slow time $\tau = \kappa t$ and for small $\kappa$, beliefs follow
$$
d\phi = \big(T(\phi) - \phi\big)\,d\tau + \sqrt{\kappa}\,\sigma\,dW_\tau,
$$
whose law satisfies $\partial_\tau\rho = -\partial_\phi\big[(T(\phi)-\phi)\rho\big] + \tfrac{\kappa\sigma^2}{2}\partial_{\phi\phi}\rho$. In the scalar case, with $U'(\phi) = \phi - T(\phi)$, the invariant density is
$$
\rho_\infty(\phi) \propto \exp\!\Big(-\frac{2U(\phi)}{\kappa\sigma^2}\Big).
$$
It concentrates at the E-stable REE (the minima of $U$) as $\kappa \to 0$. For linear $T$ it is the Gaussian with the variance above.

#### Rare escapes

If $T$ is nonlinear, with several REE or a bounded basin of attraction, small-noise large deviations (Freidlin–Wentzell; in one dimension, Kramers' formula) take over. The mean exit time from the basin of $\phi^*$ is of order $\exp\big(2\Delta U/(\kappa\sigma^2)\big)$ in $\tau$-units, where $\Delta U$ is the potential barrier (in higher dimensions, the quasipotential). That time is exponentially long but finite, so escapes **recur**, and they follow the most likely exit path, the minimizer of the Freidlin–Wentzell action.

Cho–Williams–Sargent, "Escaping Nash inflation" (*Rev. Econ. Stud.* 2002), is the standard example. A government learns a Phillips curve with constant gain. The mean dynamics lead to a self-confirming equilibrium with high ("Nash") inflation, but rare sequences of shocks occasionally convince it that the trade-off is unexploitable, and it escapes toward the low-inflation Ramsey outcome. The mean dynamics then pull it back. The economy spends most of its time near the stable point, punctuated by recurrent, predictable-in-shape escapes. So "stable under learning" and "where the economy spends its time" can differ.

#### Why constant gain at all

An agent who suspects the parameters **drift** should not weight 1950s data like yesterday's. A constant gain is exponentially discounted least squares: an observation $k$ periods old gets weight $\propto (1-\kappa)^k$, so the effective memory is about $1/\kappa$ periods. This is a tracking rule rather than an estimation rule, and it fits survey expectations better than $1/t$. Summary: for a convergence theorem, use $1/t$. To explain data and persistent fluctuations, constant gain is the interesting case, and E-stability still governs where the invariant law concentrates.

### Related frameworks

#### Temporary equilibrium

The idea goes back to Hicks (*Value and Capital*, 1939) and was formalized by Grandmont (survey: *Econometrica* 1977).

- **Setup.** At date $t$ the economy has a history $h_{t-1}$ of past prices and quantities, and agents carry over holdings from the past. Agent $i$ has an **expectation function** $\psi_i$ that maps observed data, the current price $p_t$ and the history $h_{t-1}$, to a forecast of future prices (a point forecast or a probability distribution).
- **Each agent's choice.** Given the forecast, agent $i$ solves its full intertemporal problem but executes only the date-$t$ part of the plan. Its current excess demand is $z_i\big(p_t;\psi_i(p_t, h_{t-1})\big)$.
- **Definition.** A **temporary equilibrium** at date $t$ is a current price $p_t^*$ with
$$
\sum_i z_i\big(p_t^*;\ \psi_i(p_t^*, h_{t-1})\big) = 0.
$$

Three features matter:
1. **Only current markets clear.** Agents' plans for the future need not be consistent with one another, and need not be carried out.
2. **Expectations are primitives.** The functions $\psi_i$ are part of the model's specification, functions of observed data, not equilibrium objects.
3. **Dynamics are a sequence of temporary equilibria.** The realized $p_t^*$ joins the history, forecasts are revised, and a new temporary equilibrium forms at $t+1$.

A **perfect-foresight or rational expectations equilibrium** is a sequence of temporary equilibria whose expectation functions happen to be correct, the intertemporal fixed point that temporary equilibrium deliberately does not impose. Adaptive learning is temporary equilibrium with $\psi_i$ given by an estimated PLM updated by least squares. Existence is not automatic, because $\psi_i$ can depend on the current price. Roughly, expectations must not react too strongly to current prices (Grandmont's analysis of monetary economies; details unverified).

**MFG translation.** At each $t$ agents solve the HJB on $[t, \infty)$ against a *forecast* $m^e$ of the future mean field built from data. The actual $m$ evolves by Fokker–Planck under the resulting controls. The rational-expectations MFG imposes $m^e = m$; temporary equilibrium does not. The quasi-stationary MFG ([Learning in calendar time](#/note/learning-without-replays)) is a temporary equilibrium with the forecast "the environment stays as it is now".

#### Anticipated utility

Kreps (1998). An agent with current belief $\phi_t$ acts on the policy that would be optimal if $\phi_t$ were the **true and permanent** parameter. Next period the agent updates to $\phi_{t+1}$ and re-solves.

A fully Bayesian agent instead carries the posterior $\pi_t$ as a state variable. Its value function is $V(x,\pi)$, with $\pi_{t+1}$ given by Bayes' rule, so its decisions price in parameter uncertainty and the value of information (experimentation). Anticipated utility drops both:
- it plugs in a point estimate, so it does not hedge parameter uncertainty;
- it ignores the fact that its own beliefs will move, so it does no experimentation.

This is internally inconsistent, since the agent updates every period but plans as if it never will. It is tractable, though: each date is an ordinary known-parameter problem. Cogley and Sargent argue that it is often a close approximation to Bayesian decision-making (details unverified).

What agents must forecast depends on how the decision rule is written:
- With **Euler-equation learning**, agents forecast only next period's variables in their first-order condition, e.g. $E^*_t c_{t+1}$.
- With **infinite-horizon learning** (Preston 2005), anticipated-utility agents forecast the whole future path that enters their intertemporal budget.

Under rational expectations the two are equivalent, by iterated expectations and transversality. Under learning they are not, and E-stability conditions (e.g. for monetary policy rules) can differ (unverified).

#### Sunspots and growth cycles

Learning does not always select "fundamental" equilibria. Woodford, "Learning to believe in sunspots" (*Econometrica* 1990), showed that stationary sunspot equilibria can be stable under adaptive learning: agents whose PLM includes an extrinsic variable can converge to an equilibrium in which it really matters.

Evans–Honkapohja–Romer, "Growth cycles" (*AER* 1998), apply this to endogenous growth. Complementarities among capital goods create both a high-growth and a low-growth steady state, and there are stationary sunspot equilibria that switch randomly between the two regimes. Those equilibria can be stable under learning, so growth fluctuations can arise without fundamental shocks (details unverified).

## Cards

Q: Define PLM, ALM, the T-map and a rational expectations equilibrium in adaptive learning.
A: Agents hold a perceived law of motion with parameter $\phi$ and act on it. Their actions generate an actual law of motion, with parameter $T(\phi)$. An REE is a fixed point $T(\phi^*) = \phi^*$.
See: PLM, ALM and the T-map

Q: In adaptive-learning models, where does the PLM come from? Is it empirical or theoretical?
A: Theoretical: it is a forecasting model the modeler gives agents, usually with the same functional form as the REE (the MSV solution), so it is correctly specified at the REE. The guiding rule is the "cognitive consistency principle" (agents are as sophisticated as economists). Data enter only as discipline, e.g. calibrating the PLM and gain to survey expectations.
See: Where perceived laws of motion come from

Q: What is a **restricted perceptions equilibrium**?
A: The fixed point of the T-map when the PLM omits relevant variables. Beliefs are the best forecast within the agents' class, so forecast errors are orthogonal to the regressors they use but not to the omitted ones. It is not an REE.
See: Where perceived laws of motion come from

Q: What does it mean for an REE to be **strongly E-stable**?
A: It remains E-stable when agents use an overparameterized PLM, e.g. one with extra lags or a sunspot variable that doesn't appear in the REE.
See: Where perceived laws of motion come from

Q: Cobweb model $p_t = \mu + \alpha E^*_{t-1}p_t + \delta w_{t-1} + \eta_t$ with PLM $p_t = a + b w_{t-1}$: what are the T-map and the E-stability condition?
A: $T(a,b) = (\mu + \alpha a, \delta + \alpha b)$, with REE $(\mu, \delta)/(1-\alpha)$. $DT = \alpha I$, so it is E-stable iff $\alpha < 1$, which always holds since $\alpha < 0$. Naive expectations ($E^*_{t-1}p_t = p_{t-1}$) need $|\alpha| < 1$ instead.
See: A worked example: the cobweb model

Q: What is the E-stability condition at an REE $\phi^*$?
A: $\phi^*$ is asymptotically stable for $d\phi/d\tau = T(\phi) - \phi$, i.e. $\operatorname{spec} DT(\phi^*) \subset \{\operatorname{Re}\lambda < 1\}$. In the scalar case, $T'(\phi^*) < 1$.
See: The E-stability principle

Q: Why does the ODE $d\phi/d\tau = T(\phi) - \phi$ govern real-time least-squares learning?
A: Decreasing-gain recursive least squares is a stochastic approximation algorithm, and Ljung's ODE method says its asymptotic behavior follows the mean ODE, run in the time $\tau_t = \sum_{s \le t}\gamma_s$.
See: The E-stability principle

Q: Why is the standard learning gain $1/t$?
A: Agents who believe the parameter is constant weight all past data equally (sample mean, or OLS). Written recursively, $\hat p_t = \hat p_{t-1} + \frac1t(p_t - \hat p_{t-1})$: the newest of $t$ equally weighted observations gets weight $1/t$.
See: Why the gain is 1/t

Q: For a general gain sequence $\gamma_t$, what conditions does stochastic approximation need, and what is the ODE time?
A: $\sum\gamma_t = \infty$ (to travel any distance) and $\sum\gamma_t^2 < \infty$ (so noise averages out). The ODE time is $\tau_t = \sum_{s\le t}\gamma_s$, which is $\approx \log t$ for $\gamma_t = 1/t$.
See: Why the gain is 1/t

Q: With learning rule $\dot{\hat p} = \frac1t (p - \hat p)$, why is the E-stability time "not fictitious"?
A: Setting $\tau = \log t$ gives exactly $d\hat p/d\tau = p - \hat p$. The ODE time is a reparametrization of calendar time along one history, not a count of replays.
See: Fictitious time lives in the proof

Q: Under $1/t$-gain learning, how fast does an E-stable equilibrium attract in calendar time?
A: Without shocks, like $t^{-(1-\max\operatorname{Re}\lambda)}$ ($\lambda$ the eigenvalues of $DT$), since exponential decay in $\tau = \log t$ is a power of $t$. With shocks, like $t^{-\min(1-\max\operatorname{Re}\lambda,\ 1/2)}$: the noise contributes a CLT error $t^{-1/2}$, so learning is $\sqrt t$-consistent iff $\max\operatorname{Re}\lambda < 1/2$.
See: Fictitious time lives in the proof

Q: Constant-gain vs. decreasing-gain learning: what changes?
A: The mean dynamics converge in both cases (exponentially with constant gain). With $1/t$ gain the injected noise is summable, so beliefs converge. With constant gain $\kappa$ every shock enters at full size $\kappa\sigma$, so beliefs fluctuate forever in an $O(\sqrt\kappa)$ band, and with nonlinearity there are recurrent rare escapes (Cho–Williams–Sargent).
See: Decreasing vs. constant gain

Q: Constant gain $\kappa$, scalar, near an E-stable REE with $c = 1 - T'(\phi^*)$ and shock size $\sigma$: what is the long-run variance of beliefs?
A: Linearized, $e_t = (1-\kappa c)e_{t-1} + \kappa\sigma\varepsilon_t$ is an AR(1), so $\operatorname{Var}(e_\infty) = \frac{\kappa\sigma^2}{c(2-\kappa c)} \approx \frac{\kappa\sigma^2}{2c}$. The mean converges exponentially, but the spread never vanishes.
See: What the shocks do

Q: Small constant gain $\kappa$: what diffusion approximates the beliefs, and how long until an escape from the basin of an E-stable REE?
A: $d\phi = (T(\phi)-\phi)\,d\tau + \sqrt\kappa\,\sigma\,dW_\tau$ with $\tau = \kappa t$. In the scalar case the invariant density is $\propto e^{-2U/(\kappa\sigma^2)}$ with $U' = \phi - T(\phi)$, and the mean exit time is of order $e^{2\Delta U/(\kappa\sigma^2)}$ (Kramers / Freidlin–Wentzell).
See: Rare escapes

Q: Why would agents use a constant gain instead of $1/t$?
A: If they suspect the parameters drift, old data should count less. Constant gain is exponentially discounted least squares (weight $\propto (1-\kappa)^k$ on data $k$ periods old, memory $\approx 1/\kappa$ periods). It also fits survey expectations better.
See: Why constant gain at all

Q: How is E-stability like the "stable Nash equilibrium" refinement in games?
A: Both keep only the equilibria that are attractors of a learning vector field, here $T(\phi) - \phi$. E-stability has long been used to select among multiple (including sunspot) REE.
See: The E-stability principle

Q: What is Grandmont's **temporary equilibrium**?
A: At each date, agents form forecasts of future prices from observed data (including the current price) through given expectation functions, solve their intertemporal problems, and execute only today's part of the plan. A temporary equilibrium is a current price $p_t^*$ at which today's markets clear: $\sum_i z_i(p_t^*;\psi_i(p_t^*, h_{t-1})) = 0$. Forecasts are revised next period. No intertemporal fixed point (rational expectations) is imposed.
See: Temporary equilibrium

Q: How are temporary equilibrium, rational expectations and adaptive learning related?
A: An REE is a sequence of temporary equilibria whose expectation functions happen to be correct. Adaptive learning is a sequence of temporary equilibria whose expectation functions come from a PLM re-estimated by least squares. In MFG terms, temporary equilibrium drops the condition that the forecast mean field equals the actual one.
See: Temporary equilibrium

Q: Compared with a fully Bayesian learner, what two things does an anticipated-utility agent ignore?
A: Parameter uncertainty (it plugs in its current point estimate as if it were true) and its own future learning (it plans as if beliefs will never change, so it does no experimentation). The payoff is tractability: each date is an ordinary known-parameter problem.
See: Anticipated utility

Q: What is the difference between Euler-equation learning and infinite-horizon learning?
A: In Euler-equation learning, agents forecast only next period's variables in their first-order condition. In infinite-horizon learning, anticipated-utility agents forecast the whole future path in their intertemporal budget. They are equivalent under rational expectations but not under learning, where stability conditions can differ.
See: Anticipated utility

Q: Can adaptive learning converge to a sunspot equilibrium?
A: Yes. Stationary sunspot equilibria can be E-stable, so agents whose PLM includes an extrinsic variable may learn to coordinate on it. E-stability does not always select fundamental equilibria; e.g. learning-stable sunspot switching between high- and low-growth regimes can generate growth cycles.
See: Sunspots and growth cycles

## Quiz

Q: The E-stability ODE is $\dot\phi = T(\phi) - \phi$. Which condition on $DT(\phi^*)$ makes $\phi^*$ E-stable?
- [ ] all eigenvalues have $\operatorname{Re}\lambda < 0$
- [x] all eigenvalues have $\operatorname{Re}\lambda < 1$
- [ ] all eigenvalues have $|\lambda| < 1$
- [ ] $DT(\phi^*)$ is symmetric negative definite
E: The linearization is $DT - I$, which is Hurwitz iff every eigenvalue of $DT$ has real part below $1$. $|\lambda|<1$ is the condition for the discrete iteration $\phi \mapsto T(\phi)$, a different scheme (compare naive expectations in the cobweb model).
See: The E-stability principle

Q: Under constant-gain learning near an E-stable equilibrium, one should expect…
- [ ] convergence at rate $t^{-1}$
- [ ] convergence, but more slowly than with $1/t$ gain
- [x] no convergence of beliefs: shocks keep them fluctuating, though their distribution settles near the equilibrium
- [ ] divergence to infinity
E: Without shocks the mean dynamics would converge exponentially. With shocks, each period injects noise of size $\kappa\sigma$ that the constant gain never damps, so beliefs follow a stationary process with spread $O(\sqrt\kappa)$. With nonlinear $T$, rare shock sequences also cause recurrent escapes ("Escaping Nash inflation"), at rates given by large deviations.
See: What the shocks do

Q: Learning rule $\dot{\hat p} = (T(\hat p) - \hat p)/t$ with $T(p) = 0.5 - 0.8p$. How does $|\hat p_t - p^*|$ decay?
- [ ] like $e^{-1.8t}$
- [x] like $t^{-1.8}$
- [ ] like $t^{-0.8}$
- [ ] like $t^{-1/2}$
E: In $\tau = \log t$ the error decays like $e^{-(1 - T')\tau} = e^{-1.8\tau} = t^{-1.8}$. This ODE has no shocks. With shocks the CLT error $t^{-1/2}$ dominates, and the answer would be $t^{-1/2}$.
See: Fictitious time lives in the proof

Q: Same model, $T(p) = 0.5 - 0.8p$, but now the observed price has i.i.d. shocks: $p_t = T(\hat p_{t-1}) + \sigma\varepsilon_t$, with $1/t$-gain learning. How does the error decay?
- [x] like $t^{-1/2}$
- [ ] like $t^{-1.8}$
- [ ] like $e^{-1.8t}$
- [ ] it does not converge
E: The rate is $t^{-\min(1-T',\,1/2)} = t^{-\min(1.8,\,1/2)} = t^{-1/2}$. The deterministic contraction is faster than the CLT error from averaging the shocks, so the noise sets the rate.
See: Fictitious time lives in the proof

Q: Cobweb model with $\alpha = -1.5$ (supply more elastic than demand). Which expectation scheme converges to the REE?
- [x] least-squares learning, but not naive expectations $E^*_{t-1}p_t = p_{t-1}$
- [ ] naive expectations, but not least-squares learning
- [ ] both
- [ ] neither
E: E-stability needs $\alpha < 1$, which holds. Naive expectations give $p_t = \mu + \alpha p_{t-1} + \dots$, which needs $|\alpha| < 1$ and oscillates explosively here.
See: A worked example: the cobweb model

Q: In a temporary equilibrium at date $t$, which condition is imposed?
- [x] markets for date-$t$ goods clear, given agents' forecasts
- [ ] agents' forecasts of future prices are correct
- [ ] agents' plans for future dates are mutually consistent
- [ ] future markets will clear at the planned quantities
E: Only current markets must clear. Forecasts are primitive functions of observed data, and correctness of forecasts is exactly the rational-expectations fixed point that temporary equilibrium does not impose.
See: Temporary equilibrium
