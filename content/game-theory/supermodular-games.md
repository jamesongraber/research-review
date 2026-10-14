---
title: Supermodular and submodular games
tags: [supermodular-games, strategic-complements, lattices, mean-field-games, equilibrium-selection]
created: 2026-10-14
related: [potential-games]
source: "Claude conversation: Submodular games (2026-10), about an MFG equilibrium-selection paper"
---

## Article

"Submodular game" means different things in economics and in computer science, and in economics the sign convention depends on whether $u$ is a payoff or a cost. That trap came up while reading an MFG paper.

### Strategic complements and substitutes

Each player's strategy set is a lattice (e.g. an interval of $\mathbb R$), and $u_i(x_i, x_{-i})$ is a payoff. The game is **supermodular** (Topkis; Milgrom–Roberts) if $u_i$ has **increasing differences**: for $x_i' \ge x_i$ and $x_{-i}' \ge x_{-i}$,

$$
u_i(x_i', x_{-i}') - u_i(x_i, x_{-i}') \ \ge\ u_i(x_i', x_{-i}) - u_i(x_i, x_{-i}).
$$

In the smooth case this is $\partial^2 u_i/\partial x_i\partial x_j \ge 0$ for $j \ne i$. Others raising their actions raises your marginal gain from raising yours: **strategic complements**, and best replies are increasing (Topkis). With standard compactness and continuity assumptions, Tarski's fixed-point theorem applied to the monotone best-reply map gives a nonempty set of pure equilibria with a **smallest and a largest** equilibrium.

A **submodular** game in this sense has decreasing differences ($\partial^2 u_i/\partial x_i\partial x_j \le 0$): **strategic substitutes**, decreasing best replies. Cournot competition (e.g. with linear demand) is the standard example: when rivals produce more, the price falls, and so does your marginal revenue from extra output.

### Two players versus three

With **two players**, substitutes can be turned into complements: reverse the order on player 2's strategy set ($y_2 = -x_2$). Both cross-partials change sign, so the game becomes supermodular and the lattice results apply.

With **three or more players** this fails. Reversing one player's order flips the sign of the interactions involving that player, i.e. two edges of a triangle of players. The product of the three pairwise signs around the triangle is unchanged, and for pure substitutes it is $(-)(-)(-) = -$. So no choice of reversals makes all pairs complements, and there is no general lattice theory. Extra structure, such as aggregative games like Cournot, is needed.

### Costs flip the sign

If $\Phi$ is a **cost** to be minimized, decreasing differences of $\Phi$ means increasing differences of the payoff $-\Phi$, so a "submodular" cost game is a game of **strategic complements**. The MFG paper defines $\Phi(x,m)$ to be submodular if, for $x' \ge x$ and $m' \ge_{\text{st}} m$ (first-order stochastic dominance),

$$
\Phi(x', m') - \Phi(x, m') \ \le\ \Phi(x', m) - \Phi(x, m).
$$

When the population shifts right, the marginal cost of moving right falls, so best responses move right with the crowd. The first answer in the chat described this as strategic substitutes, which was the wrong sign for a cost.

Example: $G(m) = G_0(\bar m)$, a function of the mean $\bar m$. Its first variation is the coupling $g(x,m) = G_0'(\bar m)\,x$, and $g(x',m') - g(x,m') = G_0'(\bar m')(x'-x)$. So $g$ is submodular iff $G_0'$ is decreasing, i.e. iff $G_0$ is concave. According to the paper, for potential MFGs submodularity is equivalent to $D_{mm}F \le 0$ and $D_{mm}G \le 0$ (not checked).

### What the paper used it for

The question was which MFG equilibrium the $N$-player Nash equilibria select when the MFG has several. As summarized in the chat (from the pasted text; proofs not checked): the conjecture is that the minimizer of the mean field control (potential) problem is selected. Submodularity gives the $N$-player Nash system a coordinate-wise monotone (comparison-principle) structure, which yields a convergence rate. The lattice structure itself is not used. In the paper's example the selected equilibrium is the potential minimizer, which is neither consistently the largest nor the smallest equilibrium.

### Submodular set functions in computer science

There, players choose elements or subsets of a ground set, and welfare is a **submodular set function**: $f(A\cup\{e\}) - f(A) \ge f(B\cup\{e\}) - f(B)$ for $A \subseteq B$ (diminishing returns). Vetta's (2002) **valid utility games**: if welfare is monotone submodular, each player's utility is at least its marginal contribution to welfare, and total utility is at most welfare, then every Nash equilibrium achieves at least half the optimal welfare (price of anarchy at most 2).

## Cards

Q: Define a supermodular game and give the smooth test.
A: Payoffs have increasing differences in $(x_i, x_{-i})$: raising others' actions raises your marginal gain from raising yours (strategic complements). Smooth test: $\partial^2u_i/\partial x_i\partial x_j \ge 0$ for $j\ne i$.
See: Strategic complements and substitutes

Q: Why does a supermodular game have a smallest and a largest pure equilibrium?
A: Increasing differences make best replies increasing (Topkis). Tarski's fixed-point theorem for monotone maps on a complete lattice then gives a nonempty lattice of fixed points, with least and greatest elements (under standard compactness and continuity assumptions).
See: Strategic complements and substitutes

Q: Why is Cournot competition a game of strategic substitutes?
A: With linear demand, when rivals produce more the price falls, and so does your marginal revenue from extra output. So $\partial^2 u_i/\partial q_i\partial q_j \le 0$ and best replies decrease.
See: Strategic complements and substitutes

Q: How can a two-player game of strategic substitutes be made supermodular?
A: Reverse the order on one player's strategy set, $y_2 = -x_2$. Both cross-partials change sign, so substitutes become complements.
See: Two players versus three

Q: Why does the order-reversal trick fail for three players with pairwise strategic substitutes?
A: Reversing a player flips the sign of its two interactions. The product of the three pairwise signs around the triangle is invariant, and $(-)^3 = -$, so all three pairs can never become complements.
See: Two players versus three

Q: In an MFG where players **minimize** a coupling cost $\Phi(x,m)$ that is submodular, are actions strategic complements or substitutes?
A: Complements. Decreasing differences of a cost are increasing differences of the payoff $-\Phi$: when the population moves right, moving right becomes cheaper.
See: Costs flip the sign

Q: For $G(m) = G_0(\bar m)$ with coupling $g(x,m) = G_0'(\bar m)\,x$, when is $g$ submodular?
A: Iff $G_0'$ is decreasing, i.e. $G_0$ is concave, since $g(x',m') - g(x,m') = G_0'(\bar m')(x'-x)$ must decrease as $\bar m$ increases.
See: Costs flip the sign

Q: What price-of-anarchy bound holds for valid utility games with monotone submodular welfare?
A: Every Nash equilibrium achieves at least half the optimal welfare (price of anarchy at most 2).
See: Submodular set functions in computer science

## Quiz

Q: A game where each player **minimizes** a cost with decreasing differences in (own action, population state) is a game of…
- [x] strategic complements
- [ ] strategic substitutes
- [ ] neither, without more structure
- [ ] complements only if there are two players
E: Decreasing differences of a cost are increasing differences of the payoff, so best responses increase with the population.
See: Costs flip the sign

Q: Three firms play Cournot with pairwise strategic substitutes. Reversing the order on some firms' strategy sets can…
- [x] never make the game supermodular
- [ ] always make it supermodular
- [ ] make it supermodular if you reverse exactly one firm
- [ ] make it supermodular if you reverse all three firms
E: Each reversal flips the signs of two pairwise interactions, so the product of the three signs stays negative.
See: Two players versus three
