---
title: "Query, key and value: what D = QᵀK and V do"
tags: [transformers, attention, low-rank]
created: 2026-05-29
related: [transformer-token-lanes, transformer-mckean-vlasov-model, attention-gradient-flow-energy]
source: "Claude conversation: Transformers as McKean–Vlasov equations (2026-05). My question: Q and K only appear as QᵀK, so why define them separately?"
---

## Article

One attention head updates token $i$ by

$$
x_i \;\leftarrow\; \sum_j a_{ij}\, V x_j, \qquad a_{ij} = \frac{e^{\langle Q x_i, K x_j\rangle}}{\sum_p e^{\langle Q x_i, K x_p\rangle}}.
$$

(Implementations divide the score by $\sqrt{k}$, and mathematical models put an inverse temperature $\beta$ there. Both can be absorbed into $Q$ or $K$.)

### Routing and payload

Since $\langle Qx_i, Kx_j\rangle = \langle x_i, Q^\top K\, x_j\rangle$, self-attention depends on $Q$ and $K$ only through the bilinear form $D = Q^\top K$. Mathematical models (including the McKean–Vlasov model) therefore work with $D$ directly. The two matrices $D$ and $V$ have different jobs:

- $D$ sits **inside** the softmax and only produces scalars $a_{ij}$: **how much** token $i$ listens to token $j$ (the *routing*).
- $V$ sits **outside** the softmax and acts on vectors: **what** is passed once $j$ is selected (the *payload*).

Slogan: **$D$ decides who talks to whom, and $V$ decides what they say.** In practice $V$ is also low rank: per head it factors as $W_O W_V$ through dimension $k$.

### Why Q and K are separate anyway

1. **Low rank.** $Q, K \in \mathbb{R}^{k\times d}$ with $k \ll d$ (e.g. $d = 768$, $k = 64$). So $\operatorname{rank} D \le k$, using $2kd$ parameters instead of $d^2$. The factorization is a built-in low-rank parameterization.
2. **Asymmetry (directionality).** $D = Q^\top K$ is generally not symmetric, so "how much $i$ attends to $j$" differs from "how much $j$ attends to $i$". Tying $Q = K$ would force $D = Q^\top Q$, symmetric positive semidefinite, and every relation would be mutual.
3. **Cross-attention.** In $\langle Q x_i, K y_j\rangle$ the queries come from one sequence and the keys from another (decoder state vs encoder output, text vs image). Then $Q$ and $K$ act on different spaces and cannot be merged into one operator on a single space.

Interpretation: $Qx$ is what a token is **looking for**, and $Kx$ is what it **advertises** as a match target. Attention is large when a request matches an advertisement.

### Symmetry and rank are independent

Low rank and asymmetry are two separate constraints. A symmetric matrix can be low rank: $D = \sum_{m=1}^k \lambda_m u_m u_m^\top$. Imposing $D = D^\top$ (as the gradient-flow theory and some numerics do) removes **directionality**, not the rank constraint. A symmetric $D$ scores pairs by their alignment along a few signed axes $u_m$, which is symmetric in $i \leftrightarrow j$. A general $D$ has different left and right singular vectors, and that left/right difference is the directionality.

### The tied case V = D

The clean gradient-flow (energy) theory of attention needs $V = D$, and $D$ symmetric for $E$ to be an honest interaction energy (see [the gradient-flow note](#/note/attention-gradient-flow-energy)). This ties the payload to the routing: the matrix that decides who is relevant also decides what content moves. No trained transformer satisfies this, so results that need it describe a special subfamily.

## Cards

Q: In self-attention, $Q$ and $K$ enter only through $D = Q^\top K$. What does $D$ control, and what does $V$ control?
A: $D$ (inside the softmax) sets the weights $a_{ij}$, i.e. how much token $i$ listens to token $j$. $V$ (outside the softmax) sets the content $Vx_j$ that flows once $j$ is selected. Routing vs payload.
See: Routing and payload

Q: Give the **low-rank** reason for factoring $D = Q^\top K$.
A: $Q, K \in \mathbb{R}^{k\times d}$ with $k \ll d$, so $\operatorname{rank} D \le k$ with $2kd$ parameters instead of $d^2$.
See: Why Q and K are separate anyway

Q: Give the **directionality** reason for having independent $Q$ and $K$.
A: $Q^\top K$ is generally non-symmetric, so $i$ attending to $j$ can differ from $j$ attending to $i$. Tying $Q = K$ makes $D = Q^\top Q$ symmetric PSD, and every relation becomes mutual.
See: Why Q and K are separate anyway

Q: Why can't $Q$ and $K$ be merged into a single $D$ in cross-attention?
A: Queries come from one sequence and keys from another, $\langle Qx_i, Ky_j\rangle$. $Q$ and $K$ project different inputs, so there is no single operator on one space to replace them.
See: Why Q and K are separate anyway

Q: Does requiring $D$ to be symmetric also remove the low-rank constraint? What exactly does symmetry cost?
A: No. Symmetry and rank are independent: $D = \sum_{m\le k}\lambda_m u_m u_m^\top$ is symmetric and has rank at most $k$. Symmetry costs only directionality: every score $\langle x_i, Dx_j\rangle$ becomes mutual.
See: Symmetry and rank are independent

Q: What does the tied condition $V = D$ give up, in routing/payload terms?
A: The payload is no longer independent of the routing: the matrix that decides who is relevant also decides what content moves. The gradient-flow structure of attention needs this tie.
See: The tied case V = D

## Quiz

Q: Which constraint does the factorization $D = Q^\top K$ with $Q,K \in \mathbb{R}^{k\times d}$, $k<d$, impose on $D$ by construction?
- [ ] $D$ is symmetric
- [x] $\operatorname{rank} D \le k$
- [ ] $D$ is positive semidefinite
- [ ] $D$ is orthogonal
E: Independent $Q$ and $K$ give a general, typically non-symmetric matrix of rank at most $k$. Symmetry and positive semidefiniteness appear only if $Q = K$.
See: Why Q and K are separate anyway

Q: A model of attention imposes $D = D^\top$ but keeps $\operatorname{rank} D \le k$. Relative to real attention, what has it lost?
- [x] Directionality: scores become mutual, $\langle x_i, Dx_j\rangle = \langle x_j, Dx_i\rangle$
- [ ] The low-rank structure
- [ ] The softmax normalization
- [ ] The ability to have negative scores
E: Symmetric matrices can be low rank and can have negative eigenvalues. What symmetry removes is the difference between $i \to j$ and $j \to i$.
See: Symmetry and rank are independent
