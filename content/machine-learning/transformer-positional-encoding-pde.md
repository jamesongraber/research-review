---
title: Positional information in mean-field transformer models
tags: [transformers, positional-encoding, rope, mean-field, symmetry]
created: 2026-05-29
related: [transformer-mckean-vlasov-model, transformer-token-lanes]
source: "Claude conversation: Transformers as McKean–Vlasov equations (2026-05). My question: can positional embeddings be encoded in a PDE model?"
---

## Article

The token measure $\mu_t = \frac1n\sum_i\delta_{x_i(t)}$ records only how many tokens sit near each point. It has forgotten which token is which, and so it has forgotten their order. The mean-field limit rests on **exchangeability**, and positional information is exactly what breaks it. Encoding position means choosing *how* to break that symmetry. There are three natural options.

### Option 1: absolute position as a frozen coordinate

Give each particle a label $s \in [0,1]$ that rides along unchanged. The state is $(x,s) \in S^{d-1}\times[0,1]$, and $\mu_t$ is a measure on the product. The score gets a position bias:

$$
\langle x, Dy\rangle + \beta(s,s'), \qquad \dot x = v[\mu_t](x,s), \quad \dot s = 0.
$$

This is still a transport equation, $\partial_t\mu_t + \operatorname{div}_x(\mu_t v) = 0$, with no flux in $s$. Exchangeability survives only among particles with the same $s$. This is the PDE analogue of **learned absolute position embeddings**.

### Option 2: relative position (RoPE)

What often matters is the gap $s - s'$, so take $\beta = \beta(s-s')$. The dynamics is then **invariant under translating all positions**.

**RoPE** gets this through rotations. Let $R_\phi$ rotate each of $k/2$ coordinate planes by angles proportional to $\phi$, so that $R_\phi^\top R_\psi = R_{\psi-\phi}$. RoPE rotates the query and key *after* projection:

$$
\langle R_{s} Qx,\; R_{s'} Ky\rangle = \langle Qx,\; R_{s'-s}\, Ky\rangle,
$$

which depends on positions only through $s' - s$, with no condition on $Q$ or $K$. Position becomes a **phase**, and tokens interact through phase differences. (The chat rotated the content $x$ *before* applying $D$. Then $\langle R_s x, D R_{s'}y\rangle$ is relative only if $D$ commutes with the rotations, which is why real RoPE rotates after the projections.)

### Option 3: position as a spatial variable

The most PDE-native option is to let the sequence become a continuum $s\in[0,1]$ carrying a content vector $x(s) \in S^{d-1}$. Attention becomes a **nonlocal integral operator along the sequence axis**, evolving in depth $t$:

$$
\partial_t x(s) = P^\perp_{x(s)}\int_0^1 a(s,s')\,V x(s')\,ds', \qquad
a(s,s') = \frac{e^{\langle x(s), Dx(s')\rangle + \beta(s-s')}}{\int_0^1 e^{\langle x(s), Dx(s'')\rangle + \beta(s-s'')}\,ds''}.
$$

Here $\beta(s-s')$ plays the role of a translation-invariant interaction kernel, as in aggregation or nonlocal diffusion equations. A finite transformer is a discretization in $s$.

### The organizing principle

**Encoding position in a PDE model means deciding which symmetry the dynamics has along the sequence axis.** With no encoding the dynamics has full permutation symmetry (the mean-field default). Absolute encodings break it with fixed labels. Relative encodings keep only translations. Which one is right depends on what you believe is invariant in the data, which is a modeling question.

## Cards

Q: Why does adding positional information conflict with the token mean-field limit?
A: The limit uses exchangeability: $\mu_t$ forgets which token is which, and therefore their order. Positional information is exactly a label that breaks exchangeability.

Q: How can absolute positional embeddings be put into a mean-field transformer model?
A: Augment each particle's state with a frozen coordinate $s$ ($\dot s = 0$). Let the velocity depend on $s$, e.g. through a score bias $\beta(s,s')$. The continuity equation then lives on $S^{d-1}\times[0,1]$ with no flux in $s$.
See: Option 1: absolute position as a frozen coordinate

Q: Why does RoPE make attention scores depend only on relative position?
A: RoPE rotates queries and keys by position-dependent rotations with $R_s^\top R_{s'} = R_{s'-s}$. So $\langle R_sQx, R_{s'}Ky\rangle = \langle Qx, R_{s'-s}Ky\rangle$ depends only on $s'-s$.
See: Option 2: relative position (RoPE)

Q: What does a relative (translation-covariant) positional encoding preserve as a symmetry of the dynamics?
A: Invariance under shifting every token's position by the same constant. The interaction depends only on $s - s'$.
See: Option 2: relative position (RoPE)

Q: In the "sequence as a continuum" PDE model, what kind of operator is attention?
A: A nonlocal integral operator in the sequence variable $s$, with a softmax kernel $a(s,s')$ that includes a translation-invariant bias $\beta(s-s')$, as in aggregation or nonlocal diffusion equations. Depth is the evolution time.
See: Option 3: position as a spatial variable

## Quiz

Q: In RoPE, the score between a query at position $s$ and a key at $s'$ is $\langle R_sQx, R_{s'}Ky\rangle$. On what does its position dependence rest?
- [ ] On $s$ and $s'$ separately, unless $Q = K$
- [x] Only on $s' - s$, for any $Q$ and $K$
- [ ] Only on $s' - s$, provided $Q^\top K$ commutes with the rotations
- [ ] On $s + s'$
E: The rotations are applied after the projections, and $R_s^\top R_{s'} = R_{s'-s}$. A commutation condition would be needed only if the content were rotated before applying $D$.
See: Option 2: relative position (RoPE)

Q: A mean-field transformer model has no positional encoding. Which symmetry does its dynamics have?
- [ ] Translation invariance in position only
- [x] Full permutation symmetry of the tokens
- [ ] Rotation invariance on the sphere for any $D$
- [ ] None
E: Without positions the tokens are exchangeable. Rotation invariance would require $D$ and $V$ to commute with the rotations.
See: The organizing principle
