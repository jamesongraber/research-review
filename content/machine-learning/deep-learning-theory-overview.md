---
title: "Deep learning theory: approximation, optimization, generalization"
tags: [deep-learning-theory, universal-approximation, inductive-bias, depth]
created: 2025-12-01
related: [double-descent-and-implicit-bias, neural-tangent-kernel-and-mean-field, polyak-lojasiewicz-inequality, residual-and-dense-connections]
source: "Claude conversations: Mathematical theory of deep learning (2025-12) and Skip connections in neural networks (2026-05), on whether anyone knows why architectures work."
---

## Article

The mathematical theory of deep learning is usually organized into three pillars, and the honest summary is that they are understood very unevenly.

### The error decomposition

Let $f^*$ be the best possible predictor, $f_{\mathcal F}$ the best predictor in the model class $\mathcal F$, $\hat f$ the empirical risk minimizer, and $\tilde f$ what training actually returns. Then

$$
R(\tilde f)-R(f^*) = \underbrace{R(f_{\mathcal F})-R(f^*)}_{\text{approximation}} + \underbrace{R(\hat f)-R(f_{\mathcal F})}_{\text{estimation}} + \underbrace{R(\tilde f)-R(\hat f)}_{\text{optimization}}.
$$

Approximation theory studies the first term, statistical learning theory the second, and optimization theory the third. Deep learning puzzles about all three.

### Approximation: universality and depth

**Universal approximation** (Leshno–Lin–Pinkus–Schocken, 1993): for a continuous activation $\sigma$, networks with one hidden layer, $x\mapsto\sum_j a_j\sigma(w_j\cdot x+b_j)$, are dense in $C(K)$ in the uniform norm for every compact $K\subset\mathbb R^d$ **if and only if $\sigma$ is not a polynomial**. A polynomial activation of degree $k$ only produces polynomials of degree $\le k$.

Universality says nothing about **efficiency**: the number of units may be astronomically large. Depth-separation results show that depth can be exponentially more efficient. The cleanest example is in 1D. The tent map $t(x)=2\,\mathrm{ReLU}(x)-4\,\mathrm{ReLU}(x-\tfrac12)$ on $[0,1]$ uses two ReLUs, and its $k$-fold composition is a sawtooth with $2^k$ linear pieces, built from $2k$ units in $k$ layers. A one-hidden-layer ReLU network with $m$ units is piecewise linear with at most $m+1$ pieces, so it needs at least $2^k-1$ units to represent the sawtooth exactly. Telgarsky (2016) proved the approximation version.

These are worst-case expressivity statements. They do not say that training finds such functions.

### Inductive bias: why architectures differ

The qualitative answer to "why does architecture X work better on Y?" is **inductive bias**: the architecture encodes assumptions about the data.

- **Convolution**: locality and translation equivariance (shifting the input shifts the feature map). This is a natural prior for images.
- **Recurrence**: sequential dependence, with the same update applied at each step.
- **Attention**: permutation equivariance over tokens (without positional encodings) and arbitrary data-dependent pairwise interactions.

On this view "works better" means "has biases better matched to the data-generating process". The idea is persuasive but hard to make quantitative.

### Optimization and generalization

Training losses are nonconvex, yet SGD finds good minima reliably. Landscape results ("no bad local minima") need strong assumptions such as infinite width, linear networks or special data. PL-type conditions explain linear convergence in overparameterized regimes (see [Polyak–Łojasiewicz inequality](#/note/polyak-lojasiewicz-inequality)). Generalization is the biggest gap: classical capacity bounds predict that huge networks overfit, and they don't (see [double descent and implicit bias](#/note/double-descent-and-implicit-bias)).

### Where theory stands

Most architectural innovations (ResNets, attention) were found by intuition and experiment and theorized afterwards. Theory fits known results but predicts poorly. Infinite-width limits (NTK, mean field; see [this note](#/note/neural-tangent-kernel-and-mean-field)) are tractable, but finite-width effects and **feature learning** beyond the lazy regime matter a great deal. As of 2025–26, the main open fronts are feature learning, theory for transformers and in-context learning, and reconciling classical learning theory with practice. Newer tools include PAC-Bayes and compression bounds, which can be non-vacuous, and algebraic methods (invariant theory) for symmetric architectures on graphs and point clouds.

## Cards

Q: What are the three terms in the error decomposition of a trained model, and which theory studies each?
A: Approximation error (best in class vs best overall): approximation theory. Estimation error (empirical minimizer vs best in class): statistical learning theory. Optimization error (what training returns vs the empirical minimizer): optimization theory.
See: The error decomposition

Q: For a continuous activation $\sigma$, when are one-hidden-layer networks dense in $C(K)$ for every compact $K$?
A: Exactly when $\sigma$ is not a polynomial (Leshno–Lin–Pinkus–Schocken). A polynomial activation of degree $k$ gives only polynomials of degree $\le k$.
See: Approximation: universality and depth

Q: What does universal approximation fail to tell you?
A: How many units are needed (efficiency), whether training finds the approximant, and how it generalizes. It is a density statement only.
See: Approximation: universality and depth

Q: Why does a one-hidden-layer ReLU network need about $2^k$ units to represent the $k$-fold composition of the tent map?
A: The composition is a sawtooth with $2^k$ linear pieces. A one-hidden-layer ReLU net in 1D with $m$ units has at most $m+1$ pieces. A deep net builds it with $2k$ units in $k$ layers.
See: Approximation: universality and depth

Q: What inductive bias does a convolutional layer encode?
A: Locality, and translation equivariance: shifting the input shifts the output feature map in the same way.
See: Inductive bias: why architectures differ

Q: What inductive bias does self-attention (without positional encoding) encode?
A: Permutation equivariance over tokens, plus arbitrary data-dependent pairwise interactions between them.
See: Inductive bias: why architectures differ

Q: Which part of deep-learning theory is best understood, and how were most architectures found?
A: Expressivity (approximation) is best understood. Optimization and generalization are only partly understood. Most architectures were found by experiment and theorized afterwards, and theory has weak predictive power.
See: Where theory stands

## Quiz

Q: For which continuous activation are one-hidden-layer networks **not** universal approximators?
- [ ] ReLU
- [ ] sigmoid
- [x] $\sigma(t)=t^3$
- [ ] $\tanh$
E: Any polynomial activation gives only polynomials of bounded degree, which are not dense in $C(K)$. Every non-polynomial continuous activation is universal.
See: Approximation: universality and depth

Q: How many linear pieces does the $k$-fold composition of the tent map on $[0,1]$ have?
- [ ] $k+1$
- [ ] $2k$
- [x] $2^k$
- [ ] $k^2$
E: Each composition doubles the number of pieces. This is the standard example where depth beats width exponentially.
See: Approximation: universality and depth

Q: Self-attention without positional encoding, viewed as a map from a sequence of tokens to a sequence of tokens, is…
- [x] permutation equivariant
- [ ] permutation invariant
- [ ] translation equivariant in the token index
- [ ] causal
E: Permuting the input tokens permutes the outputs in the same way. Invariance would hold only after pooling over tokens, and causality comes from masking.
See: Inductive bias: why architectures differ
