---
title: "Adaptive dynamics: invasion fitness and the canonical equation"
tags: [evolutionary-game-theory, adaptive-dynamics, invasion-fitness, timescale-separation]
created: 2026-07-22
related: [singular-strategies-branching, evolutionarily-stable-strategies, after-branching-limiting-similarity, replicator-dynamics, selection-mutation-hamilton-jacobi]
source: "Claude conversation: Daily evolutionary game theory course (2026-07), part 7: adaptive dynamics"
---

## Article

Part 7 of the evolutionary game theory course changes framework. So far the strategy set was fixed and frequencies evolved. In **adaptive dynamics** the strategy is a continuous trait $z \in \mathbb R$ (body size, virulence, an allocation fraction), and evolution proceeds by rare, small mutations that selection accepts or rejects. What moves is the trait value itself. This is where new strategies can appear, through [evolutionary branching](#/note/singular-strategies-branching), which fixed-strategy replicator dynamics can never produce.

### Vocabulary

- **Resident**: the trait value $z$ that (essentially) everyone currently has. It plays the role of $x^*$ in the ESS definition.
- **Mutant**: a rare new trait value $z'$ that may invade or die out.
- **Monomorphic**: all individuals share one trait value. **Polymorphic**: several coexist, which is what branching produces.
- **Ecological dynamics**: how population *size* $n$ changes for a fixed trait, through births, deaths and competition. **Ecological equilibrium**: the resident's density has settled, $\dot n = 0$.
- **Evolutionary dynamics**: how the *trait* changes through mutation and selection, on a slower timescale.
- **Timescale separation**: ecology is fast and evolution slow, so each mutant meets a resident already at its ecological equilibrium.
- **Malthusian fitness**: the per-capita growth rate $\frac{1}{n}\frac{dn}{dt}$. A population that doubles per unit time has Malthusian fitness $\ln 2$, whatever its size.

### Invasion fitness and the selection gradient

The **invasion fitness** of a mutant $z'$ in a resident population $z$ is its per-capita growth rate while rare:

$$
s_z(z') = \left.\frac{1}{n'}\frac{dn'}{dt}\right|_{n' \to 0},
$$

computed in the environment set by the resident at its ecological equilibrium. A resident neither grows nor shrinks against itself, so $s_z(z) = 0$. The **selection gradient** is the slope at the resident:

$$
D(z) = \left.\frac{\partial s_z(z')}{\partial z'}\right|_{z' = z}.
$$

If $D(z) > 0$, slightly larger mutants can invade and the trait moves up; if $D(z) < 0$, it moves down.

### The canonical equation

For rare mutations of small effect (Dieckmann–Law 1996),

$$
\dot z = k(z)\,D(z),
$$

for the expected trait, where $k(z) > 0$ bundles the mutation rate, the mutational variance and the equilibrium population size. $k$ sets the speed and $D$ the direction. It looks like gradient ascent, but the landscape $s_z(\cdot)$ moves with the resident $z$: frequency dependence, not a fixed potential. Points with $D(z^*) = 0$ are **singular strategies** (next note). A PDE route to the same picture, with a trait-structured density concentrating on Dirac masses, is in [constrained Hamilton–Jacobi equations](#/note/selection-mutation-hamilton-jacobi).

### Worked example: body size without a singular strategy

Birth rate $b(z) = 1/z$ (growth costs fecundity) and mortality $\mu(z) = \mu_0 + \alpha/z$ (size protects), with density-dependent death $\beta n$:

$$
\frac{1}{n}\frac{dn}{dt} = b(z) - \mu(z) - \beta n, \qquad \hat n(z) = \frac{b(z) - \mu(z)}{\beta}.
$$

A rare mutant feels the resident's crowding $\beta\hat n(z)$, so

$$
s_z(z') = b(z') - \mu(z') - \beta\hat n(z) = g(z') - g(z), \qquad g(z) = b(z) - \mu(z) = \frac{1-\alpha}{z} - \mu_0.
$$

The competition term cancels because mutant and resident feel the same crowding. Then $D(z) = g'(z) = -(1-\alpha)/z^2$. If $\alpha < 1$, smaller is always better and $z$ shrinks without bound; if $\alpha > 1$, it grows without bound; if $\alpha = 1$, every trait is singular. There is no isolated interior singular strategy, and a saturating trade-off is needed for one (see [singular strategies](#/note/singular-strategies-branching)).

## Cards

Q: Define invasion fitness $s_z(z')$ and state its basic property.
A: The per-capita growth rate of a rare mutant with trait $z'$ in a resident population with trait $z$ at its ecological equilibrium. $s_z(z) = 0$: a resident neither grows nor shrinks against itself.
See: Invasion fitness and the selection gradient

Q: What are the selection gradient and the canonical equation of adaptive dynamics?
A: $D(z) = \partial_{z'} s_z(z')\big|_{z'=z}$. Under rare, small mutations, $\dot z = k(z)D(z)$ with $k(z) > 0$ (mutation rate, mutational variance, equilibrium density). $k$ sets only the speed.
See: The canonical equation

Q: What is the timescale-separation assumption of adaptive dynamics, and why is it needed?
A: Ecological dynamics (population sizes) are fast and evolutionary dynamics (traits) are slow, so each mutant meets a resident already at ecological equilibrium. That makes $s_z(z')$ a growth rate against a fixed environment.
See: Vocabulary

Q: What do "resident", "mutant" and "monomorphic" mean in adaptive dynamics?
A: Resident: the trait value essentially everyone has (the analogue of $x^*$ in the ESS definition). Mutant: a rare new trait that may invade. Monomorphic: one trait value in the population.
See: Vocabulary

Q: How is the canonical equation of adaptive dynamics unlike gradient ascent on a fixed potential?
A: The landscape $s_z(\cdot)$ depends on the resident $z$, so it moves as the trait evolves. Fitness is frequency-dependent.
See: The canonical equation

Q: In the body-size model with $s_z(z') = b(z')-\mu(z')-\beta\hat n(z)$, why does the competition term cancel?
A: Mutant and resident feel the same crowding $\beta\hat n(z)$, and at equilibrium $\beta\hat n(z) = b(z)-\mu(z)$. So $s_z(z') = g(z') - g(z)$ with $g = b - \mu$.
See: Worked example: body size without a singular strategy

## Quiz

Q: In the body-size model $b(z) = 1/z$, $\mu(z) = \mu_0 + \alpha/z$ with $\alpha = 1/2$, the canonical equation drives the trait…
- [x] toward smaller $z$, without bound
- [ ] toward larger $z$, without bound
- [ ] to an interior singular strategy
- [ ] nowhere, since every $z$ is singular
E: $D(z) = -(1-\alpha)/z^2 < 0$ for $\alpha < 1$, so smaller mutants always invade.
See: Worked example: body size without a singular strategy

Q: If a population doubles every unit of time, its Malthusian fitness is…
- [x] $\ln 2$
- [ ] $2$
- [ ] $1$
- [ ] $1/2$
E: Malthusian fitness is the per-capita exponential rate: $n(t) = n_0e^{rt}$ with $e^r = 2$.
See: Vocabulary
