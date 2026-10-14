---
title: Transformers as McKean–Vlasov equations
tags: [transformers, mckean-vlasov, mean-field, continuity-equation, interacting-particles]
created: 2026-05-29
related: [transformer-token-lanes, attention-query-key-value, transformer-head-measure, attention-gradient-flow-energy, attention-clustering-theorems, transformer-positional-encoding-pde]
source: "Claude conversation: Transformers as McKean–Vlasov equations (2026-05), reading Massucco–Del Grande–Carioni–Brune–Schönlieb (arXiv 2605.18870) and the Geshkovski–Letrouit–Polyanskiy–Rigollet line of work."
---

## Article

The modeling chain from a real transformer to a PDE has four steps. Each one costs something different.

### Step 1: depth becomes time

A residual update $x_i^{\ell} = x_i^{\ell-1} + h\,F^\ell(x_i^{\ell-1}; x_{1:n}^{\ell-1})$ is one explicit Euler step of

$$
\dot x_i(t) = F_t\big(x_i(t); x_{1:n}(t)\big), \qquad t \in [0,T].
$$

This is the **neural-ODE** reading of a ResNet. Real transformers have about 12–100 layers with sizeable per-layer changes, so the Euler error is not small. **The continuum limit is a modeling choice, not a theorem about GPT.** Layer-dependent weights make $F_t$ depend on $t$ (non-autonomous).

### Step 2: normalization becomes the sphere

Tokens live on $S^{d-1}$, and every velocity is projected onto the tangent space by $P^\perp_x y = y - \langle x,y\rangle x$. This models RMS normalization (with its learned gain set to the identity): if $|x| = 1$, then

$$
\frac{x + hF}{|x + hF|} = x + h\,P^\perp_x F + O(h^2),
$$

so "Euler step then normalize" is, to first order, the projected flow. Caveat (standard architecture fact, not from the chat): this matches normalizing the residual stream after each update (**post-norm**). Most modern LLMs are **pre-norm**, $x \leftarrow x + F(\operatorname{norm}(x))$, where the stream's own norm is not fixed.

### Step 3: the particle system

Drop the MLP and keep multi-head attention with $D^{(h)} = Q^{(h)\top}K^{(h)}$:

$$
\dot x_i = P^\perp_{x_i}\Big(\frac1H\sum_{h=1}^H \sum_{j=1}^n \frac{e^{\langle x_i, D^{(h)} x_j\rangle}}{\sum_p e^{\langle x_i, D^{(h)} x_p\rangle}}\, V^{(h)} x_j\Big).
$$

The velocity of token $i$ is exactly a multi-head self-attention output, kept tangent to the sphere.

The MLP is easy to add back. It touches only $x_i$, so it is a **single-particle drift** $P^\perp_x b_t(x)$ (an external field), not an interaction. Models drop it to keep the interaction structure clean, not because the mathematics forbids it.

### Step 4: tokens become a measure

Let $\mu_t = \frac1n\sum_i \delta_{x_i(t)}$. The system is equivalent to the continuity equation on $S^{d-1}$

$$
\partial_t\mu_t + \operatorname{div}\big(\mu_t\, v[\mu_t]\big) = 0, \qquad
v[\mu](x) = P^\perp_x \int \frac{e^{\langle x, Dy\rangle}}{\int e^{\langle x, Dy'\rangle}\,d\mu(y')}\, V y\, d\mu(y)
$$

(single head). This holds for any $n$, and it makes sense for any probability measure $\mu_t$. **The velocity depends on the law $\mu_t$ itself, through the softmax average and its denominator. That self-consistent drift is the McKean–Vlasov structure.** It is deterministic: there is no diffusion in the tokens. An entropy penalty $\varepsilon\int\mu\log\mu$ would add one ("noisy transformer").

The limit $n\to\infty$ is rigorous on the compact sphere. The velocity is Lipschitz in $W_1$, and Geshkovski et al. note a Dobrushin-type estimate $W_1(\mu^n_t,\mu_t) \le e^{Ct}\,W_1(\mu^n_0,\mu_0)$. The constant grows exponentially in time, and i.i.d. sampling of $\mu_0^n$ converges only slowly in $W_1$ in high dimension.

### What the model leaves out

- the **MLP** (much of the parameters and computation);
- **causal masking** (all-to-all attention, while GPT-style models are autoregressive, and masking is known to change the clustering behavior);
- **positional encoding**: tokens must be exchangeable for $\mu_t$ to make sense;
- **finite-$n$ effects** (real contexts are finite);
- independent, low-rank, non-symmetric $Q, K, V$: the general continuity equation allows them, but the **gradient-flow theory needs $V = D$ with $D$ symmetric**;
- **training**: the model describes the forward pass at fixed weights.

So there are two tiers: the **continuity-equation model** (any $D, V$, close to a real attention stack) and the **gradient-flow model** (tied, symmetric weights, where the energy and clustering theorems live).

### What a continuous PDE can tell us

Mechanism-level insight, not quantitative prediction. It isolates what attention plus normalization does on its own, proves things about that (energy monotonicity, stability in the input, clustering), and suggests hypotheses about real networks. It cannot predict accuracy, the features a network learns, or anything the MLP computes.

## Cards

Q: How does the McKean–Vlasov model of a transformer represent layer normalization?
A: Tokens live on the unit sphere $S^{d-1}$, and velocities are projected by $P^\perp_x y = y - \langle x,y\rangle x$. To first order, an Euler step followed by normalization is a step of the projected flow.
See: Step 2: normalization becomes the sphere

Q: Why is "Euler step then normalize" equal to the projected flow to first order?
A: If $|x|=1$, then $|x+hF| = 1 + h\langle x,F\rangle + O(h^2)$, so $(x+hF)/|x+hF| = x + h(F - \langle x,F\rangle x) + O(h^2) = x + hP^\perp_xF + O(h^2)$.
See: Step 2: normalization becomes the sphere

Q: What makes the token continuity equation a **McKean–Vlasov** equation rather than a linear transport equation?
A: The velocity $v[\mu_t](x)$ depends on the law $\mu_t$ itself: it is a softmax-weighted average against $\mu_t$, normalized by $\int e^{\langle x,Dy\rangle}d\mu_t(y)$. Each token's drift depends on where the population is.
See: Step 4: tokens become a measure

Q: How does the MLP enter the mean-field transformer model, if one keeps it?
A: As a single-particle drift $P^\perp_x b_t(x)$, with $b_t(x) = W_2\sigma(W_1x+b_1)+b_2$. It is an external field, not an interaction term, because it depends only on the token's own state.
See: Step 3: the particle system

Q: Is the depth-to-time limit (layers to ODE) a theorem about real transformers?
A: No, it is a modeling choice. A residual layer is one Euler step, but with 12–100 layers and large per-layer changes the Euler error is not small.
See: Step 1: depth becomes time

Q: Which parts of a real transformer does the attention-on-the-sphere McKean–Vlasov model leave out?
A: The MLP, causal masking, positional encoding, finite-$n$ effects, general untied non-symmetric $Q,K,V$ (needed only for the gradient-flow theory), and training. It models the forward pass of attention plus normalization.
See: What the model leaves out

Q: What are the two tiers of the mean-field attention model?
A: (1) The continuity-equation model, valid for any $D, V$, which is the one that resembles real attention. (2) The gradient-flow model, which needs $V = D$ with $D$ symmetric and is where the energy and clustering theory lives.
See: What the model leaves out

## Quiz

Q: In the model $\partial_t\mu_t + \operatorname{div}(\mu_t v[\mu_t]) = 0$ of self-attention, where does randomness (diffusion) in the tokens come from?
- [ ] From the softmax, which samples tokens at random
- [x] Nowhere: the token dynamics is deterministic transport (an entropy term would be needed to add diffusion)
- [ ] From the $O(1/\sqrt n)$ fluctuations, which give a Laplacian in the limit
- [ ] From layer normalization
E: The softmax is a deterministic weighting. With deterministic particles and a Lipschitz field, the mean-field limit is a pure continuity equation with no second-order term.
See: Step 4: tokens become a measure

Q: Most modern LLMs use pre-norm blocks $x \leftarrow x + F(\operatorname{norm}(x))$. How does this relate to the sphere model?
- [ ] It matches exactly: tokens stay on the sphere
- [x] Imperfectly: the residual stream's norm is not fixed, while the sphere model normalizes the stream itself (post-norm style)
- [ ] The sphere model corresponds to having no normalization
- [ ] Pre-norm forces tokens onto a hyperplane rather than a sphere
E: Normalizing after each update, $x \leftarrow \operatorname{norm}(x + F(x))$, gives the projected flow to first order. Pre-norm normalizes only the input of $F$.
See: Step 2: normalization becomes the sphere

Q: Which statement about the token mean-field limit is correct?
- [ ] It requires the gradient-flow condition $V = D$
- [ ] It holds only for a single head
- [x] The empirical measure of the particle system solves the same continuity equation, and Lipschitz dependence on $\mu$ gives a Dobrushin stability estimate in $W_1$
- [ ] It requires the MLP to be removed, because single-particle drifts break the limit
E: The continuity equation holds for any $D, V$ and any number of heads, and a single-particle drift is harmless. Symmetry and tying matter only for the energy structure.
See: Step 4: tokens become a measure
