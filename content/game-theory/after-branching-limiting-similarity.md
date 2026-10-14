---
title: "After branching: coexistence and limiting similarity"
tags: [evolutionary-game-theory, adaptive-dynamics, evolutionary-branching, competitive-exclusion]
created: 2026-07-22
related: [singular-strategies-branching, adaptive-dynamics, replicator-dynamics, replicator-lotka-volterra, cancer-somatic-evolution]
source: "Claude conversation: Daily evolutionary game theory course (2026-07), part 7: adaptive dynamics"
---

## Article

Part 7 of the evolutionary game theory course, after [evolutionary branching](#/note/singular-strategies-branching). Once the population splits, there are two residents, and the monomorphic framework no longer applies.

### The dimorphic regime

Two residents $z_1, z_2$ coexist at densities $\hat n_1, \hat n_2$, which solve the joint ecological equilibrium $\sum_j \alpha(z_i - z_j)\hat n_j = K(z_i)$ in the Dieckmann–Doebeli model. A mutant feels competition from both:

$$
s_{(z_1,z_2)}(z') = 1 - \frac{\alpha(z'-z_1)\,\hat n_1 + \alpha(z'-z_2)\,\hat n_2}{K(z')}.
$$

Each branch has its own selection gradient, $D_i = \partial_{z'}s_{(z_1,z_2)}(z')\big|_{z'=z_i}$, and its own canonical equation, coupled through $\hat n_j$ and $\alpha(z_1 - z_2)$.

Right after the split the branches are close, so they compete almost maximally ($\alpha(z_1-z_2) \approx 1$), and each gradient points *away* from the other branch: the lineages repel. As they separate, competition weakens and the repulsion fades. They settle at a dimorphic singular point where $D_1 = D_2 = 0$, the two-dimensional analogue of a singular strategy. The more $\sigma_K$ exceeds $\sigma_\alpha$, the farther apart they end up (character displacement).

### Can it branch again?

At the dimorphic singular point, one can test each branch for evolutionary stability, treating the other as fixed. The original chat said that branching "typically halts after one split" in this model. That is wrong for the Gaussian model. Numerically, with $\sigma_\alpha = 0.6$ and $\sigma_K = 1$, the symmetric dimorphic singular point is at $z = \pm 0.52$, and each branch is again evolutionarily unstable. The reason is a degeneracy. If $\sigma_\alpha < \sigma_K$, a *continuous* Gaussian trait distribution with variance $\sigma_K^2 - \sigma_\alpha^2$ (suitably scaled) satisfies $\int\alpha(z - y)\,n(y)\,dy = K(z)$ for all $z$, since Gaussian convolution adds variances. Then $s(z') \equiv 0$ for every mutant. The model has no finite stable endpoint, and branching can keep going.

Richer resource landscapes, or several trait axes evolving together, can produce cascades of branching. This is the adaptive-dynamics account of **adaptive radiation**: many specialized types from one ancestor, driven by frequency-dependent competition alone.

### Limiting similarity

How much splitting is possible? The classical **competitive exclusion principle** (Volterra, Gause, MacArthur–Levins) says the number of stably coexisting species cannot exceed the number of independent limiting resources. The modern version, often called **limiting similarity** or the **generalized competitive exclusion principle** (Meszéna, Gyllenberg, Metz and coauthors, mid-2000s; exact citation unverified), says: generically, a coexistence equilibrium is structurally stable only if the number of coexisting types is at most the number of independent **regulating variables** (resources, predators, other density-dependent feedbacks). With more types, an arbitrarily small change to the model destroys coexistence.

This is a generic, structural-stability statement, not an unconditional theorem, and its precise formulation across model classes is still being worked out. The Gaussian model above is exactly the kind of non-generic exception it allows: a continuum of types can coexist only because the model is fine-tuned.

### Handing back to replicator dynamics

Once a set of types $\{z_1^*, z_2^*\}$ is in place, the fast dynamics of their *frequencies* is ordinary [replicator](#/note/replicator-dynamics) (or [Lotka–Volterra](#/note/replicator-lotka-volterra)) dynamics. Adaptive dynamics explains where the strategy set comes from, and replicator dynamics governs frequencies once the set is fixed. The two work on different timescales.

The course then applied all of this to [cancer as somatic evolution](#/note/cancer-somatic-evolution).

## Cards

Q: Right after an evolutionary branching event in the Dieckmann–Doebeli model, why do the two branches move apart?
A: They are close, so they compete almost maximally ($\alpha(z_1-z_2)\approx1$). Each branch's selection gradient points away from the other, by the same disruptive selection that caused the branching.
See: The dimorphic regime

Q: Where do the two branches settle after branching?
A: At a dimorphic singular point $(z_1^*, z_2^*)$ where both selection gradients vanish, $D_1 = D_2 = 0$. Separation grows with how much $\sigma_K$ exceeds $\sigma_\alpha$.
See: The dimorphic regime

Q: Write the invasion fitness of a mutant against two residents in the Dieckmann–Doebeli model.
A: $s_{(z_1,z_2)}(z') = 1 - \big[\alpha(z'-z_1)\hat n_1 + \alpha(z'-z_2)\hat n_2\big]/K(z')$, with $\hat n_1, \hat n_2$ the joint equilibrium densities.
See: The dimorphic regime

Q: Why is the Gaussian–Gaussian Dieckmann–Doebeli model degenerate when $\sigma_\alpha < \sigma_K$?
A: A continuous Gaussian trait distribution with variance $\sigma_K^2 - \sigma_\alpha^2$ makes $\int\alpha(z-y)n(y)\,dy = K(z)$ for all $z$, so every mutant has $s \equiv 0$. Branching need not stop after one split.
See: Can it branch again?

Q: What is the generalized competitive-exclusion (limiting-similarity) bound, and what is its epistemic status?
A: Generically, the number of coexisting types cannot exceed the number of independent regulating variables (resources, predators, other feedbacks), or coexistence is structurally unstable. It is a generic structural-stability statement, not an unconditional theorem.
See: Limiting similarity

Q: How do adaptive dynamics and replicator dynamics fit together?
A: They act on different timescales. Adaptive dynamics (slow) explains where the set of strategies comes from. Once the set is fixed, replicator dynamics (fast) governs their frequencies.
See: Handing back to replicator dynamics

## Quiz

Q: The generalized competitive exclusion principle says that, generically, the number of stably coexisting types is at most…
- [x] the number of independent regulating variables
- [ ] two, after any branching event
- [ ] the dimension of the trait space
- [ ] the number of singular strategies
E: Regulating variables are the resources, predators and other density-dependent feedbacks through which types affect each other's growth. Exceeding that number makes coexistence structurally unstable.
See: Limiting similarity

Q: In the Gaussian Dieckmann–Doebeli model with $\sigma_\alpha < \sigma_K$, which continuous trait distribution makes every mutant neutral?
- [x] a Gaussian with variance $\sigma_K^2 - \sigma_\alpha^2$
- [ ] a Gaussian with variance $\sigma_K^2 + \sigma_\alpha^2$
- [ ] a Gaussian with variance $\sigma_\alpha^2$
- [ ] two point masses at $\pm\sigma_K$
E: Convolving with the competition kernel adds $\sigma_\alpha^2$ to the variance, which must give the carrying capacity's $\sigma_K^2$.
See: Can it branch again?
