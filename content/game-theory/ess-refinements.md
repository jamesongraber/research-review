---
title: ESS and trembling-hand refinements
tags: [evolutionary-game-theory, ess, equilibrium-refinements, perfect-equilibrium]
created: 2026-07-22
related: [evolutionarily-stable-strategies, replicator-dynamics, stag-hunt-risk-dominance]
source: "Claude conversation: Daily evolutionary game theory course (2026-07), part 3: refinements"
---

## Article

Part 3 of the evolutionary game theory course: how the [ESS](#/note/evolutionarily-stable-strategies) compares with the classical Nash refinements. An ESS is a single-population notion. To compare, view $x^*$ as the symmetric profile $(x^*,x^*)$ of the two-player symmetric game with payoff matrices $A$ and $A^\top$.

### Perfect and proper equilibria

- **Trembling-hand perfect** (Selten): $x^*$ is a best reply to each element of some sequence of completely mixed strategies $x^\varepsilon \to x^*$. The equilibrium survives small mistakes by the opponent.
- **Proper** (Myerson): $x^*$ is a limit, as $\varepsilon \to 0$, of completely mixed $\varepsilon$-proper profiles, in which each player plays a worse reply with probability at most $\varepsilon$ times that of a better one. Costlier mistakes are much rarer.

### ESS implies proper implies perfect

$$
\text{ESS} \implies \text{proper} \implies \text{perfect} \implies \text{Nash} \qquad (\text{van Damme, 1987}).
$$

Intuition: a mutant invasion and an opponent's tremble are both perturbations of the strategy profile away from $x^*$, and the ESS asks that the resident win strictly against such perturbations. ESS also implies asymptotic stability under the replicator dynamics. So ESS sits above two different routes to Nash equilibrium: a static one (proper, perfect) and a dynamic one (replicator-stable). That is part of why it is the central refinement in evolutionary game theory.

### The converse fails

Take the zero matrix $A = 0$. Every strategy is a best reply to everything, including every tremble sequence, so every $x^*$ is perfect and proper. But $u(x^*,y) = 0 = u(y,y)$ for all $y$, so the tiebreaker never holds strictly and **no ESS exists**. Perfection only asks that trembles do not strictly hurt you, while ESS asks that invaders be strictly punished.

### An ESS is isolated

If $x^*$ is an ESS, then $u(x^*,y) > u(y,y)$ for all $y \ne x^*$ near $x^*$ (this "local superiority" is an equivalent form of the definition). If such a $y$ were itself a symmetric Nash equilibrium, $y$ would be a best reply to itself, so $u(y,y) \ge u(x^*,y)$, a contradiction. So an ESS is isolated among symmetric Nash equilibria. A game with a continuum of equilibria (for example, with a duplicated strategy) can have perfect and proper equilibria all along the continuum, but none of its points is an ESS.

## Cards

Q: How do ESS, proper equilibrium and trembling-hand perfection relate?
A: ESS $\Rightarrow$ proper $\Rightarrow$ perfect $\Rightarrow$ Nash, for the symmetric equilibrium $(x^*,x^*)$ of the two-player symmetric game. None of these arrows reverses in general.
See: ESS implies proper implies perfect

Q: Give a game showing that a proper equilibrium need not be an ESS.
A: The zero payoff matrix. Every strategy is a best reply to every tremble, so all are perfect and proper, but $u(x^*,y) = u(y,y)$ always, so the strict tiebreaker never holds and there is no ESS.
See: The converse fails

Q: What does trembling-hand perfection require, and what does properness add?
A: Perfect: $x^*$ is a best reply to each element of some sequence of completely mixed strategies converging to $x^*$. Proper: $x^*$ is a limit, as $\varepsilon \to 0$, of completely mixed profiles in which worse replies have probability at most $\varepsilon$ times that of better ones.
See: Perfect and proper equilibria

Q: Why is an ESS isolated among symmetric Nash equilibria?
A: An ESS satisfies $u(x^*,y) > u(y,y)$ for all nearby $y \ne x^*$. A nearby equilibrium $y$ would be a best reply to itself, giving $u(y,y) \ge u(x^*,y)$, a contradiction.
See: An ESS is isolated

Q: An ESS implies two different refinements of Nash equilibrium. Which?
A: A static one, proper (hence perfect) equilibrium, and a dynamic one, asymptotic stability under the replicator dynamics. Both imply Nash.
See: ESS implies proper implies perfect

## Quiz

Q: In the game with zero payoff matrix, which statement is true?
- [x] Every strategy is a proper equilibrium, and there is no ESS.
- [ ] Every strategy is an ESS.
- [ ] Only the uniform mixture is an ESS.
- [ ] No strategy is trembling-hand perfect.
E: Indifference everywhere makes every strategy a best reply to any tremble, but the ESS tiebreaker $u(x^*,y) > u(y,y)$ never holds strictly.
See: The converse fails

Q: Which property does an ESS **not** necessarily have?
- [x] being a strict Nash equilibrium
- [ ] being a proper equilibrium
- [ ] being isolated among symmetric Nash equilibria
- [ ] being asymptotically stable under the replicator dynamics
E: The mixed Hawk–Dove ESS is not strict: every strategy in its support earns the same payoff against it.
See: ESS implies proper implies perfect
