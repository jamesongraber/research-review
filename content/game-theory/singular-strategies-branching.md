---
title: Singular strategies, CSS and evolutionary branching
tags: [evolutionary-game-theory, adaptive-dynamics, evolutionary-branching, stability]
created: 2026-07-22
related: [adaptive-dynamics, after-branching-limiting-similarity, evolutionarily-stable-strategies]
source: "Claude conversation: Daily evolutionary game theory course (2026-07), part 7: adaptive dynamics"
---

## Article

Part 7 of the evolutionary game theory course, after [invasion fitness and the canonical equation](#/note/adaptive-dynamics). A **singular strategy** is a trait $z^*$ with $D(z^*) = 0$, where the canonical equation $\dot z = k(z)D(z)$ stops. Like a critical point of a function, it can be of several kinds.

### Two kinds of stability

Write $s(z,z') = s_z(z')$.

- **Convergence stable** (does evolution get there?): $z^*$ is an attracting rest point of $\dot z = k D$, i.e. $D'(z^*) < 0$.
- **Evolutionarily stable** (once there, can it be invaded?): $z^*$ is a local maximum of the invasion fitness against it, $\partial^2_{z'} s(z^*,z')\big|_{z'=z^*} < 0$. This is the continuous-trait ESS.

Since $D(z) = \partial_{z'}s(z,z)$, we get $D'(z^*) = \partial^2_{z'z'}s + \partial^2_{z z'}s$. The mixed partial is what lets the two conditions disagree. The four combinations:

| | evolutionarily stable | not evolutionarily stable |
|---|---|---|
| **convergence stable** | **CSS** (continuously stable strategy): evolution arrives and stays | **branching point**: evolution arrives, then the population splits |
| **not convergence stable** | "Garden of Eden": uninvadable but repelling | repeller |

### When the conditions cannot disagree

If $s_z(z') = g(z') - g(z)$, as when mutant and resident share the same density-dependent competition, then $\partial^2_{zz'}s = 0$ and both conditions reduce to $g''(z^*) < 0$. No branching is possible.

Example: $b(z) = 2\sqrt z$ and $\mu(z) = \mu_0 + z$, so $g(z) = 2\sqrt z - z - \mu_0$ (viable if $\mu_0 < 1$). Then $D(z) = z^{-1/2} - 1$, so $z^* = 1$, and $D'(1) = g''(1) = -\tfrac12 < 0$: a CSS.

### The Dieckmann–Doebeli model

Branching needs invasion fitness that depends on resident and mutant separately, typically because similar phenotypes compete harder. Dieckmann and Doebeli (1999) take a carrying capacity and a competition kernel

$$
K(z) = K_0\, e^{-z^2/2\sigma_K^2}, \qquad \alpha(z'-z) = e^{-(z'-z)^2/2\sigma_\alpha^2},
$$

with logistic invasion fitness

$$
s_z(z') = 1 - \frac{\alpha(z'-z)\,K(z)}{K(z')}.
$$

Since $\alpha(0) = 1$ and $\alpha'(0) = 0$, the selection gradient is $D(z) = K'(z)/K(z) = (\ln K)'(z)$: the trait climbs toward the resource peak, and $z^* = 0$.

- **Convergence stability:** $D'(0) = K''(0)/K(0) = -1/\sigma_K^2 < 0$, always.
- **Evolutionary stability:** $s_0(z') = 1 - e^{z'^2(1/2\sigma_K^2 - 1/2\sigma_\alpha^2)} \approx z'^2\big(\tfrac{1}{2\sigma_\alpha^2} - \tfrac{1}{2\sigma_K^2}\big)$, so $\partial^2_{z'}s_0(0) = 1/\sigma_\alpha^2 - 1/\sigma_K^2$.

So $z^* = 0$ is a CSS if $\sigma_\alpha > \sigma_K$, and a **branching point** if $\sigma_\alpha < \sigma_K$.

### Why branching happens

If competition is narrower than the resource curve ($\sigma_\alpha < \sigma_K$), individuals that sit on top of everyone else compete hardest, while the resource landscape is broad. Once the population has converged to the peak, being slightly different in *either* direction pays. Selection becomes disruptive, even though $K$ has a single peak: the clustering itself creates the pressure that splits the cluster. The population becomes dimorphic, and the two branches diverge ([what happens next](#/note/after-branching-limiting-similarity)).

## Cards

Q: What are convergence stability and evolutionary stability of a singular strategy $z^*$?
A: Convergence stable: $D'(z^*) < 0$, so the canonical equation is attracted to $z^*$. Evolutionarily stable: $\partial^2_{z'}s_{z^*}(z') < 0$ at $z' = z^*$, so no nearby mutant invades. The two are logically independent.
See: Two kinds of stability

Q: What do the four combinations of convergence stability and evolutionary stability give?
A: Both: a CSS. Convergence stable only: evolutionary branching. Evolutionarily stable only: a repelling "Garden of Eden" point. Neither: a repeller.
See: Two kinds of stability

Q: Why can convergence stability and evolutionary stability disagree?
A: $D'(z^*) = \partial^2_{z'z'}s + \partial^2_{zz'}s$, while evolutionary stability looks only at $\partial^2_{z'z'}s$. The mixed partial (how the resident changes the mutant's landscape) makes the difference.
See: Two kinds of stability

Q: When invasion fitness has the form $s_z(z') = g(z') - g(z)$, why can the two stability conditions never disagree?
A: Then $D = g'$, so $D'(z^*) = g''(z^*)$, and $\partial^2_{z'}s = g''(z^*)$ too. No branching is possible: it needs invasion fitness depending on resident and mutant separately.
See: When the conditions cannot disagree

Q: Body-size example $b(z) = 2\sqrt z$, $\mu(z) = \mu_0 + z$: find the singular strategy and classify it.
A: $g = 2\sqrt z - z - \mu_0$ and $D = g' = z^{-1/2} - 1$, so $z^* = 1$. $D'(1) = g''(1) = -1/2 < 0$, so it is convergence stable and evolutionarily stable: a CSS.
See: When the conditions cannot disagree

Q: Dieckmann–Doebeli model: what is the selection gradient, and where is the singular strategy?
A: With $s_z(z') = 1 - \alpha(z'-z)K(z)/K(z')$ and $\alpha'(0) = 0$, $D(z) = K'(z)/K(z) = (\ln K)'(z)$. The singular strategy is the resource peak $z^* = 0$.
See: The Dieckmann–Doebeli model

Q: Dieckmann–Doebeli model: when does evolution branch?
A: $z^* = 0$ is always convergence stable ($D'(0) = -1/\sigma_K^2$). $\partial^2_{z'}s_0(0) = 1/\sigma_\alpha^2 - 1/\sigma_K^2$, so it branches iff $\sigma_\alpha < \sigma_K$: competition narrower than the resource curve.
See: The Dieckmann–Doebeli model

Q: Intuitively, why does a population branch when $\sigma_\alpha < \sigma_K$?
A: Near the peak everyone is similar and competes intensely, but resources are broad. So deviating slightly in either direction pays: disruptive selection generated by the clustering itself.
See: Why branching happens

## Quiz

Q: A singular strategy is convergence stable but not evolutionarily stable. What happens?
- [x] The population evolves to it and then splits into two diverging branches.
- [ ] The population evolves to it and stays there.
- [ ] The population evolves away from it, although it cannot be invaded.
- [ ] The trait oscillates around it.
E: This is evolutionary branching. "Arrives and stays" is a CSS, and "uninvadable but repelling" is a Garden of Eden point.
See: Two kinds of stability

Q: Dieckmann–Doebeli model with $\sigma_\alpha = 0.5$ and $\sigma_K = 1$. The resource peak $z^* = 0$ is…
- [x] a branching point
- [ ] a CSS
- [ ] a Garden of Eden point
- [ ] a repeller
E: It is always convergence stable, and $1/\sigma_\alpha^2 - 1/\sigma_K^2 = 4 - 1 = 3 > 0$, so it is not evolutionarily stable.
See: The Dieckmann–Doebeli model

Q: In the Dieckmann–Doebeli model, the convergence stability of $z^* = 0$…
- [x] holds for all $\sigma_\alpha, \sigma_K$
- [ ] holds only if $\sigma_\alpha > \sigma_K$
- [ ] holds only if $\sigma_\alpha < \sigma_K$
- [ ] never holds
E: $D(z) = (\ln K)'(z)$ does not involve $\alpha$, and $D'(0) = -1/\sigma_K^2 < 0$. Only evolutionary stability depends on $\sigma_\alpha$.
See: The Dieckmann–Doebeli model
