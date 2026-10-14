---
title: Evolutionarily stable strategies
tags: [evolutionary-game-theory, ess, stability, hawk-dove]
created: 2026-07-22
related: [replicator-dynamics, two-strategy-games, ess-refinements, replicator-kl-lyapunov]
source: "Claude conversation: Daily evolutionary game theory course (2026-07), part 1: foundations"
---

## Article

Part 1 of the evolutionary game theory course, after [replicator dynamics](#/note/replicator-dynamics). Write $u(x,y) = x^\top A y$ for the payoff of strategy $x$ against $y$.

### Definition

A population state $x^*$ is an **ESS** (Maynard Smith–Price, 1973) if for every mutant $y \neq x^*$, either

1. $u(x^*,x^*) > u(y,x^*)$, or
2. $u(x^*,x^*) = u(y,x^*)$ and $u(x^*,y) > u(y,y)$.

Condition 1 says the mutant does strictly worse against the resident. Condition 2 is the **tiebreaker**: if the mutant ties against the resident, the resident must do better against the mutant than the mutant does against itself. The definition is static: no dynamics are involved. Every ESS is a symmetric Nash equilibrium, and every strict Nash equilibrium is an ESS.

### Where the tiebreaker comes from

Let a mutant $y$ enter at frequency $\varepsilon$, so the population is $(1-\varepsilon)x^* + \varepsilon y$. By linearity,

$$
\begin{aligned}
u\big(x^*, (1-\varepsilon)x^*+\varepsilon y\big) &= (1-\varepsilon)\,u(x^*,x^*) + \varepsilon\,u(x^*,y),\\
u\big(y, (1-\varepsilon)x^*+\varepsilon y\big) &= (1-\varepsilon)\,u(y,x^*) + \varepsilon\,u(y,y).
\end{aligned}
$$

The resident must do strictly better for all small $\varepsilon > 0$. The order-1 terms decide unless they tie, and then the order-$\varepsilon$ terms decide. That is exactly the definition. Mutants are rare but not infinitely rare, so they occasionally meet each other. The resident wins if it exploits a mutant better than the mutant exploits its own kind.

### Mixed ESS: only the tiebreaker matters

At a mixed Nash equilibrium every pure strategy in the support earns the same payoff against $x^*$ (the **indifference principle**). So for every $y$ supported there, $u(y,x^*) = u(x^*,x^*)$, and condition 1 never applies. For an interior $x^*$ the ESS condition is just $u(x^*,y) > u(y,y)$ for all $y \ne x^*$. In matrix form this says $A$ is negative definite on the tangent space of the simplex (see [the KL Lyapunov function](#/note/replicator-kl-lyapunov)).

### Worked example: Hawk–Dove

Animals contest a resource of value $V$, and fighting costs $C > V$. Hawks escalate and Doves retreat.

| | Hawk | Dove |
|---|---|---|
| Hawk | $(V-C)/2$ | $V$ |
| Dove | $0$ | $V/2$ |

Neither pure state is Nash: Doves invade all-Hawk since $0 > (V-C)/2$, and Hawks invade all-Dove since $V > V/2$. Setting $f_H = f_D$ gives the unique ESS, with Hawk frequency $p^* = V/C$.

With $V = 2$ and $C = 4$: the payoffs are $-1, 2, 0, 1$, and $p^* = 1/2$. Both pure strategies earn $0.5$ against $x^*$, a tie. Tiebreaker against a Hawk invader: $u(x^*,H) = \tfrac12(-1) + \tfrac12(0) = -0.5 > u(H,H) = -1$. Against a Dove invader: $u(x^*,D) = \tfrac12(2)+\tfrac12(1) = 1.5 > u(D,D) = 1$. So $p^*$ is an ESS, entirely because of the second-order condition.

### ESS and the dynamics

$$
\text{ESS} \implies \text{asymptotically stable rest point of the replicator dynamics} \implies \text{Nash equilibrium}.
$$

Neither arrow reverses in general. With two strategies, ESS and asymptotic stability coincide, so counterexamples to the first converse need at least three strategies. The $\varepsilon$-argument is local: an ESS gives local stability, not global (an interior ESS is the exception and attracts every interior orbit).

## Cards

Q: Define an **evolutionarily stable strategy** $x^*$.
A: For all $y \ne x^*$: either $y^\top A x^* < x^{*\top}Ax^*$, or equality holds and $x^{*\top}Ay > y^\top A y$.
See: Definition

Q: Where does the ESS tiebreaker $u(x^*,y) > u(y,y)$ come from?
A: Expand payoffs in the post-invasion population $(1-\varepsilon)x^*+\varepsilon y$. If $u(x^*,x^*) = u(y,x^*)$, the order-1 terms cancel and the order-$\varepsilon$ terms decide: the resident wins for small $\varepsilon$ iff $u(x^*,y) > u(y,y)$.
See: Where the tiebreaker comes from

Q: Why is the tiebreaker the only condition that matters when checking a mixed ESS?
A: At a mixed Nash equilibrium every pure strategy in the support earns the same payoff against $x^*$ (indifference principle). So $u(y,x^*) = u(x^*,x^*)$ for those $y$, and only the second-order condition can discriminate.
See: Mixed ESS: only the tiebreaker matters

Q: What is the ESS of Hawk–Dove with resource value $V$ and fight cost $C > V$?
A: The mixed state with hawk frequency $p^* = V/C$, found by equating $f_H = p\frac{V-C}{2} + (1-p)V$ and $f_D = (1-p)\frac V2$.
See: Worked example: Hawk–Dove

Q: Hawk–Dove with $V=2$, $C=4$: check the ESS tiebreaker against a Hawk invader.
A: $p^* = 1/2$. $u(x^*,H) = \tfrac12(-1)+\tfrac12(0) = -0.5$, which beats $u(H,H) = -1$. So the resident exploits Hawks better than Hawks exploit each other.
See: Worked example: Hawk–Dove

Q: What is the chain of implications among ESS, replicator stability and Nash equilibrium?
A: ESS $\Rightarrow$ asymptotically stable rest point $\Rightarrow$ Nash equilibrium. Neither arrow reverses in general. With two strategies, ESS and asymptotic stability coincide.
See: ESS and the dynamics

Q: Is every strict Nash equilibrium an ESS? Is every ESS strict?
A: Every strict Nash equilibrium is an ESS, since condition 1 holds for every $y$. Not every ESS is strict: the mixed Hawk–Dove ESS relies on the tiebreaker.
See: Definition

## Quiz

Q: In Hawk–Dove with $V = 2$ and $C = 8$, what fraction of the population plays Hawk at the ESS?
- [ ] $1/2$
- [x] $1/4$
- [ ] $3/4$
- [ ] $0$, because Doves take over when $C > V$
E: $p^* = V/C = 2/8 = 1/4$.
See: Worked example: Hawk–Dove

Q: For an **interior** state $x^*$ that is a Nash equilibrium, $x^*$ is an ESS if and only if…
- [x] $u(x^*,y) > u(y,y)$ for all $y \ne x^*$
- [ ] $u(x^*,x^*) > u(y,x^*)$ for all $y \ne x^*$
- [ ] $u(y,x^*) = u(x^*,x^*)$ for all $y$
- [ ] $u(x^*,y) \ge u(y,y)$ for all $y$
E: Interior equilibria tie against every $y$, so the strict first-order condition is impossible and only the tiebreaker remains. The weak inequality defines a *neutrally* stable strategy, which is weaker.
See: Mixed ESS: only the tiebreaker matters

Q: Which implication holds in general for the replicator dynamics?
- [x] ESS $\Rightarrow$ asymptotically stable
- [ ] asymptotically stable $\Rightarrow$ ESS
- [ ] Nash equilibrium $\Rightarrow$ asymptotically stable
- [ ] rest point $\Rightarrow$ Nash equilibrium
E: Asymptotic stability does not imply ESS once there are three or more strategies, Nash equilibria can be repellers, and vertices are rest points without being Nash.
See: ESS and the dynamics
