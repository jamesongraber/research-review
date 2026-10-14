---
title: "Transformer anatomy: token lanes coupled by attention"
tags: [transformers, attention, architecture, interacting-particles]
created: 2026-05-29
related: [attention-query-key-value, transformer-mckean-vlasov-model, transformer-positional-encoding-pde]
source: "Claude conversation: Transformers as McKean–Vlasov equations (2026-05). The architecture picture needed before the PDE model makes sense."
---

## Article

The usual picture of a neural network is a ResNet: **one vector** flows through the layers, and each layer remixes its coordinates with a dense weight matrix. A transformer is different. It processes a **set of $n$ vectors**, one per token, $x_1,\dots,x_n \in \mathbb{R}^d$, and keeps them separate all the way through.

### Parallel lanes with shared weights

Think of a transformer as **$n$ parallel residual lanes, one per token, that share their weights** and can talk to each other only through attention. One layer is two residual sublayers:

$$
x_i' = x_i + \operatorname{Attn}_i(x_1,\dots,x_n), \qquad x_i'' = x_i' + \operatorname{MLP}(x_i'),
$$

with a normalization wrapped around each sublayer. There are two kinds of mixing:

- **Within a token (across coordinates):** the MLP, and the $Q,K,V$ projections. This is the ResNet picture applied to each lane separately, with the same weights in every lane.
- **Across tokens (between lanes):** attention, which has no ResNet analogue. Token $i$ is updated by a weighted average of all tokens' value vectors,
  $\operatorname{Attn}_i = \sum_j a_{ij}\, V x_j$ with $a_{ij} = \operatorname{softmax}_j \langle Q x_i, K x_j\rangle$.

In short, **attention moves information between tokens, and the MLP computes within each token.** Attention is linear in the values $Vx_j$, with the coupling hidden in the weights $a_{ij}$. The MLP is nonlinear but local in the token index.

Three refinements to keep in mind:

1. The maps are **residual** ($x \mapsto x + \text{correction}$). That is what makes the depth-as-time ODE reading possible.
2. Attention is **permutation-equivariant**: shuffling the inputs shuffles the outputs. Order enters only through positional encodings.
3. Each layer has its own weights, so the dynamical system is **non-autonomous**.

### The MLP

The feed-forward block is a map $\mathbb{R}^d \to \mathbb{R}^d$ applied to each token independently:

$$
\operatorname{MLP}(x) = W_2\,\sigma(W_1 x + b_1) + b_2, \qquad W_1 \in \mathbb{R}^{m\times d},\ W_2 \in \mathbb{R}^{d\times m},
$$

usually with $m = 4d$ (e.g. $d = 768$, $m = 3072$). The nonlinearity $\sigma$ was originally ReLU and is now usually GELU or a gated variant. **SwiGLU**, used in many recent LLMs, is $W_2\big(\operatorname{Swish}(W_a x) \odot W_b x\big)$, a multiplicative gate between two projections. The MLP holds much of the parameter count. A common interpretation is that it stores "facts" as an associative memory keyed by the token's representation, while attention decides which representations to combine.

### No architectural maximum on the number of tokens

No weight has a dimension that depends on $n$: $Q, K, V$ and the MLP act on one $d$-vector at a time. The same weights process 5 tokens or 5,000. (Contrast an MLP or CNN classifier, whose input size is fixed in layer 1.) This is why the limit $n \to \infty$ in the mean-field model is meaningful.

Practical limits come from elsewhere:

- **Positional encodings.** A learned absolute-position table of size $L_{\max}$ is a hard cap. Relative schemes (RoPE, ALiBi) have no built-in cap but degrade beyond the context length seen in training.
- **Cost.** The attention matrix is $n\times n$, so compute and memory grow like $O(n^2)$.

The mean-field model discards exactly these two things: it has no positions (tokens are exchangeable), and an integral against $\mu_t$ has no "size".

## Cards

Q: What is the right mental picture of a transformer, compared with a ResNet?
A: $n$ parallel residual lanes, one per token, with **shared weights**. The MLP acts on each lane separately (the ResNet-like part), and attention is the only operation that couples the lanes.
See: Parallel lanes with shared weights

Q: In one transformer layer, which sublayer couples different tokens, and which acts on each token alone?
A: Attention couples tokens: token $i$ gets $\sum_j a_{ij} V x_j$. The MLP is the same map $\mathbb{R}^d\to\mathbb{R}^d$ applied to each token independently.
See: Parallel lanes with shared weights

Q: Why must the transformer's sublayers be *residual* for the ODE (depth-as-time) picture to work?
A: The update $x \mapsto x + h F(x)$ is one explicit Euler step of $\dot x = F(x)$. Without the "$x +$" there is only a sequence of unrelated maps, not a flow.
See: Parallel lanes with shared weights

Q: Write the standard transformer MLP and its shapes.
A: $\operatorname{MLP}(x) = W_2\sigma(W_1x+b_1)+b_2$ with $W_1 \in \mathbb{R}^{m\times d}$, $W_2\in\mathbb{R}^{d\times m}$, typically $m = 4d$. It expands $d \to m$, applies a coordinate-wise nonlinearity, and contracts back to $d$.
See: The MLP

Q: Does a transformer's architecture fix a maximum number of tokens $n$? Why or why not?
A: No. $Q$, $K$, $V$ and the MLP act on one $d$-vector at a time, so no weight depends on $n$. Limits come from positional encodings (fixed tables, or degradation beyond the trained context length) and from the $O(n^2)$ cost of attention.
See: No architectural maximum on the number of tokens

Q: Is self-attention (without positional encoding) permutation-invariant or permutation-equivariant?
A: Equivariant: permuting the input tokens permutes the outputs in the same way. This exchangeability is what the mean-field limit uses, and positional encodings are what break it.
See: Parallel lanes with shared weights

## Quiz

Q: Which component of a transformer layer is the *only* place where different tokens exchange information?
- [ ] The MLP
- [x] Attention
- [ ] Layer normalization
- [ ] The residual connection
E: The MLP and normalization act token by token, and the residual connection adds a lane to itself. Only attention forms averages over other tokens.
See: Parallel lanes with shared weights

Q: What sets the practical maximum context length of a trained transformer with RoPE?
- [ ] The dimension of $Q$ and $K$, which scales with $n$
- [ ] The width $m$ of the MLP
- [x] The lengths seen in training (performance degrades beyond them), plus the $O(n^2)$ cost of attention
- [ ] A fixed lookup table of positions
E: RoPE has no table, so there is no hard cap, but the model has only learned to handle positions up to its training length. Learned absolute embeddings would give a hard cap.
See: No architectural maximum on the number of tokens
