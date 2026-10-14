---
title: Where the replicator equation comes from
tags: [evolutionary-game-theory, replicator-dynamics, learning, bounded-rationality]
created: 2026-04-02
related: [replicator-dynamics, evolutionarily-stable-strategies, stag-hunt-risk-dominance]
source: "Claude conversation: Evolutionary game theory and Nash equilibrium limits (2026-04)"
---

## Article

The question was whether the [replicator equation](#/note/replicator-dynamics) is a "myopic limit" of Nash play, for example of a differential game. Partly. The replicator equation is one of several myopic population dynamics. Which one you get depends on what the agents are myopic *about*, so it is not a single $\varepsilon \to 0$ reduction of Nash reasoning. Nash equilibrium assumes full rationality and no dynamics. The replicator equation assumes no rationality and well-defined dynamics. The two share their rest points, but they come from opposite idealizations.

### Revision protocols

Sandholm's framework (*Population Games and Evolutionary Dynamics*): agents in a large population occasionally revise their strategy according to a **revision protocol**, and as $N \to \infty$ the population state follows a deterministic **mean dynamic**. Write $\pi_i = (Ax)_i$ and $\bar\pi = x^\top A x$.

- **Pairwise proportional imitation** (Schlag 1998). A reviser samples a random agent and switches to its strategy with probability proportional to the payoff difference, if positive. The flow from $j$ to $i$ is $x_j x_i[\pi_i - \pi_j]_+$ and the flow back is $x_i x_j[\pi_j-\pi_i]_+$, so the net inflow into $i$ is $\sum_j x_i x_j(\pi_i - \pi_j) = x_i(\pi_i - \bar\pi)$. That is the replicator equation. No reproduction is needed.
- **Reinforcement learning.** Payoff-proportional reinforcement of one's own actions (Bush–Mosteller / Cross-type rules) also gives the replicator equation in the continuous-time limit (Börgers–Sarin 1997).
- **Best response.** Revisers switch to a best reply to the current state, which gives $\dot x \in \mathrm{BR}(x) - x$. This is a different dynamic.
- **Logit (smoothed best response).** Replacing $\mathrm{BR}$ by a softmax with noise level $\eta$ gives the logit dynamic. As $\eta \to 0$ it tends to the **best-response dynamic, not the replicator**.
- Others include the Brown–von Neumann–Nash (BNN), Smith and projection dynamics.

### Exponential weights

Smoothing does give the replicator equation if it is applied to *cumulative* payoffs rather than current ones. Let $y_i(t) = \int_0^t \pi_i(x(s))\,ds$ and $x = \operatorname{softmax}(y)$. Then

$$
\dot x_i = x_i\Big(\dot y_i - \sum_j x_j \dot y_j\Big) = x_i(\pi_i - \bar\pi).
$$

So the replicator equation is continuous-time **exponential weights** (Hedge), or mirror ascent with the entropy regularizer. This is also why the relative entropy is its natural [Lyapunov function](#/note/replicator-kl-lyapunov).

### What the replicator equation says about Nash equilibria

- Nash equilibria are rest points, and a convergent interior orbit has a Nash limit.
- Nash equilibria are **not** attractors in general. Only an [ESS](#/note/evolutionarily-stable-strategies) is guaranteed to be asymptotically stable, and some Nash equilibria are repellers, such as the mixed equilibrium of the [Stag Hunt](#/note/stag-hunt-risk-dominance).
- Strictly dominated strategies are eliminated asymptotically.
- Outcomes are path-dependent: the initial state decides which equilibrium is reached.

So the replicator equation does not "converge to Nash". Where it converges from the interior, it picks out a Nash equilibrium, and the stable ones satisfy something stronger.

### The differential-game route

The chat also suggested that an $N$-player stochastic differential game, taken to its MFG limit and then made myopic (discount rate $r \to \infty$, no diffusion), reduces the HJB–Fokker–Planck system to the replicator equation. This could not be verified and is doubtful as stated: a myopic optimizer naturally produces a best-response-type dynamic, and getting the replicator requires an imitation or reinforcement protocol (unverified).

## Cards

Q: How can the replicator equation arise without biological reproduction?
A: From imitation. Agents meet others and switch to their strategy with probability proportional to how much better it pays (Schlag's proportional imitation rule).
See: Revision protocols

Q: Derive the replicator equation from pairwise proportional imitation.
A: Net inflow into $i$ is $\sum_j x_i x_j\big([\pi_i-\pi_j]_+ - [\pi_j-\pi_i]_+\big) = x_i\sum_j x_j(\pi_i-\pi_j) = x_i(\pi_i - \bar\pi)$.
See: Revision protocols

Q: As the noise goes to $0$, what does the logit (smoothed best-response) dynamic tend to?
A: The best-response dynamic $\dot x \in \mathrm{BR}(x) - x$, not the replicator equation.
See: Revision protocols

Q: How do you get the replicator equation from a softmax?
A: Apply the softmax to *cumulative* payoffs: $x = \operatorname{softmax}(y)$ with $\dot y_i = \pi_i(x)$. Then $\dot x_i = x_i(\pi_i - \bar\pi)$ exactly. It is continuous-time exponential weights.
See: Exponential weights

Q: Are Nash equilibria attractors of the replicator dynamics?
A: Not in general. They are rest points, but only an ESS is guaranteed to be asymptotically stable, and some Nash equilibria are repellers (the mixed Stag Hunt equilibrium). Strictly dominated strategies are eliminated.
See: What the replicator equation says about Nash equilibria

Q: Why is "the replicator equation is the myopic limit of Nash play" too simple?
A: You must specify what agents are myopic about. Imitation and reinforcement give the replicator equation; best response, logit, BNN, Smith and projection protocols give different dynamics with the same Nash rest points.
See: Revision protocols

## Quiz

Q: Which revision protocol yields the replicator equation as its mean dynamic?
- [x] Pairwise proportional imitation
- [ ] Switching to a best response to the current state
- [ ] Logit choice on current payoffs with noise tending to $0$
- [ ] Brown–von Neumann–Nash excess-payoff switching
E: Imitation with switching probability proportional to the payoff difference gives $x_i(\pi_i - \bar\pi)$. Logit on current payoffs tends to best response as the noise vanishes.
See: Revision protocols

Q: If $x(t) = \operatorname{softmax}\big(\int_0^t Ax(s)\,ds\big)$, then $x$ solves…
- [x] the replicator equation
- [ ] the best-response dynamic
- [ ] the logit dynamic
- [ ] the projection dynamic
E: Differentiating the softmax gives $\dot x_i = x_i\big((Ax)_i - x^\top Ax\big)$. The logit dynamic applies the softmax to current payoffs, not cumulative ones.
See: Exponential weights
