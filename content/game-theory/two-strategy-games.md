---
title: Symmetric 2×2 games under the replicator dynamics
tags: [evolutionary-game-theory, replicator-dynamics, prisoners-dilemma, classification]
created: 2026-07-22
related: [replicator-dynamics, evolutionarily-stable-strategies, stag-hunt-risk-dominance, evolutionary-graph-theory]
source: "Claude conversation: Daily evolutionary game theory course (2026-07), part 2: classic games"
---

## Article

Part 2 of the evolutionary game theory course covered the classic examples: Hawk–Dove ([ESS note](#/note/evolutionarily-stable-strategies)), the Stag Hunt ([its own note](#/note/stag-hunt-risk-dominance)), the Prisoner's Dilemma (below) and Rock–Paper–Scissors ([three strategies](#/note/replicator-kl-lyapunov)). Every two-strategy game fits one picture.

### Reduction to one ODE

Take the payoff matrix $\begin{pmatrix} a & b\\ c & d\end{pmatrix}$, rows for the focal strategy, and let $x$ be the frequency of strategy 1. The [replicator equation](#/note/replicator-dynamics) becomes

$$
\dot x = x(1-x)\,\Delta(x), \qquad \Delta(x) = u(1,x) - u(2,x) = (a-c)\,x + (b-d)(1-x).
$$

Subtracting $c$ from column 1 and $b$ from column 2 does not change the dynamics, so the game is equivalent to $\operatorname{diag}(a-c,\; d-b)$. Only the two numbers $\alpha = a-c$ and $\beta = d-b$ matter. $\Delta$ is linear, with $\Delta(1) = \alpha$ and $\Delta(0) = -\beta$.

### Four generic cases

- **Dominance** ($\alpha$ and $\beta$ of opposite signs). One strategy is better against everything, and it takes over from every interior state. If $\alpha > 0 > \beta$ strategy 1 wins, and if $\alpha < 0 < \beta$ strategy 2 wins. Example: the Prisoner's Dilemma.
- **Coordination** ($\alpha > 0$, $\beta > 0$). Both pure states are strict Nash equilibria, hence ESS, and both are stable. The interior equilibrium $x^* = \dfrac{d-b}{(a-c)+(d-b)}$ is unstable and separates the two basins. Example: the Stag Hunt.
- **Coexistence** or anti-coordination ($\alpha < 0$, $\beta < 0$). Each strategy can invade the other, and the same formula gives a globally stable interior ESS. Example: Hawk–Dove, where $\alpha = (V-C)/2$ and $\beta = -V/2$ give $x^* = V/C$.
- The degenerate cases $\alpha = 0$ or $\beta = 0$ are not generic.

### The Prisoner's Dilemma

Take $\begin{pmatrix} 3 & 0\\ 5 & 1\end{pmatrix}$ with rows Cooperate, Defect (mutual cooperation 3, sucker 0, temptation 5, mutual defection 1). Then $\Delta(x) = 3x - (4x+1) = -x - 1 < 0$. Defect strictly dominates, all-Defect is the unique ESS, and it attracts every interior state. Selection in a well-mixed population cannot save cooperation.

This stark negative result motivates the whole evolution-of-cooperation literature: repeated interaction, spatial or network structure ([cooperation on graphs](#/note/evolutionary-graph-theory)), kin selection, group selection and punishment. The Prisoner's Dilemma models *temptation*. The Stag Hunt models *trust*: there cooperation is an equilibrium, but a risky one.

## Cards

Q: Write the replicator equation for a symmetric game with two strategies.
A: With $x$ the frequency of strategy 1, $\dot x = x(1-x)\big[u(1,x) - u(2,x)\big]$. The bracket is affine in $x$.
See: Reduction to one ODE

Q: Why does a symmetric $2\times2$ game $\begin{pmatrix} a&b\\c&d\end{pmatrix}$ depend only on $a-c$ and $d-b$ under the replicator dynamics?
A: Adding a constant to a column does not change the dynamics. Subtracting $c$ from column 1 and $b$ from column 2 gives $\operatorname{diag}(a-c,\,d-b)$.
See: Reduction to one ODE

Q: In a symmetric $2\times 2$ coordination game ($a > c$, $d > b$), where is the interior equilibrium and what is its stability?
A: $x^* = (d-b)/[(a-c)+(d-b)]$ (frequency of strategy 1). It is unstable and separates the basins of the two pure ESS.
See: Four generic cases

Q: What happens in a symmetric $2\times2$ game with $a < c$ and $d < b$?
A: Coexistence: each strategy invades the other, and the interior point $x^* = (d-b)/[(a-c)+(d-b)]$ is a globally stable ESS. Hawk–Dove is the example.
See: Four generic cases

Q: What does the replicator dynamics do in the Prisoner's Dilemma, and why does it matter?
A: Defect strictly dominates, so all-Defect is the unique ESS and attracts every interior start. This negative result motivates the evolution-of-cooperation literature (repetition, network structure, kin selection, punishment).
See: The Prisoner's Dilemma

Q: What different questions do the Prisoner's Dilemma and the Stag Hunt model?
A: The Prisoner's Dilemma models temptation: cooperating is never a best reply. The Stag Hunt models trust: cooperating is an equilibrium, but it pays only if enough others cooperate.
See: The Prisoner's Dilemma

## Quiz

Q: A symmetric $2\times2$ game has $a - c < 0$ and $d - b < 0$. Under the replicator dynamics…
- [x] there is a globally stable interior equilibrium
- [ ] both pure states are stable and an interior point separates their basins
- [ ] one strategy takes over from every interior state
- [ ] interior orbits are periodic
E: Both signs negative means each strategy does better when rare: anti-coordination, as in Hawk–Dove. Both positive would be coordination.
See: Four generic cases

Q: In the coordination game $\begin{pmatrix} 4 & 0\\ 1 & 2\end{pmatrix}$, where is the unstable interior equilibrium?
- [x] $x^* = 2/5$
- [ ] $x^* = 3/5$
- [ ] $x^* = 1/2$
- [ ] $x^* = 2/3$
E: $x^* = (d-b)/[(a-c)+(d-b)] = 2/(3+2) = 2/5$. Above it the population goes to all-strategy-1, so strategy 1 has the larger basin.
See: Four generic cases
