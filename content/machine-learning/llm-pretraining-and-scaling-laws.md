---
title: LLM pretraining and scaling laws
tags: [llm, pretraining, scaling-laws, cross-entropy]
created: 2026-03-11
related: [rlhf-and-rlaif, reasoning-models-and-test-time-compute]
source: "Claude conversation: Beyond next-token prediction in modern LLMs (2026-03). I asked what's new beyond 'a transformer predicting the next token'."
---

## Article

A modern LLM is still, at its base, a **next-token predictor** built on the transformer (2017). The architecture has changed relatively little. What has changed is how much it is trained and what is layered on afterwards (see [RLHF](#/note/rlhf-and-rlaif) and [reasoning models](#/note/reasoning-models-and-test-time-compute)).

### Next-token prediction is maximum likelihood

The model factorizes a sequence autoregressively, $p_\theta(x_1,\dots,x_T)=\prod_t p_\theta(x_t\mid x_{<t})$, using causal masking so that position $t$ sees only earlier tokens. Training minimizes the cross-entropy

$$
\mathcal L(\theta) = -\,\mathbb E_{x\sim p_{\text{data}}}\sum_t \log p_\theta(x_t\mid x_{<t}),
$$

which is maximum likelihood. Equivalently it minimizes $\mathrm{KL}(p_{\text{data}}\,\|\,p_\theta)$, since the two differ by the entropy of the data, which does not depend on $\theta$. The labels are the text itself, so training is **self-supervised** and scales to essentially all available text.

### Why prediction is not shallow

The loss is minimized by the true conditional distribution. Predicting text well therefore requires modeling whatever generates it. To predict what follows `def sort(arr):` reliably, a model needs something like the concept of sorting. The empirical lesson of the last decade is that prediction pressure alone produces rich internal representations, including program semantics.

### Scaling laws

Kaplan et al. (2020) found that the pretraining loss follows **power laws** in parameter count $N$, data $D$ (tokens) and compute $C$, smoothly over many orders of magnitude, as long as no other factor is the bottleneck. Training compute is about $C\approx 6ND$ FLOPs (roughly $2$ per parameter per token forward and $4$ backward). Labs could then forecast a model's loss before training it.

Hoffmann et al. (2022, "Chinchilla") fitted

$$
L(N,D) = E + \frac{A}{N^{\alpha}} + \frac{B}{D^{\beta}},
$$

where $E$ is the irreducible loss (the entropy of text). Minimizing at fixed $C\propto ND$ with a Lagrange multiplier gives

$$
N_{\text{opt}}\propto C^{\beta/(\alpha+\beta)},\qquad D_{\text{opt}}\propto C^{\alpha/(\alpha+\beta)} .
$$

Their fits ($\alpha\approx0.34$, $\beta\approx0.28$) and two other methods put both exponents near $\frac12$: **parameters and tokens should grow together**, at roughly 20 tokens per parameter. Earlier models had grown $N$ much faster than $D$ and were **undertrained**. Chinchilla (70B parameters, 1.4T tokens) beat Gopher (280B, about 300B tokens) at the same compute.

### Emergence, with a caveat

Wei et al. (2022) reported abilities, including benefiting from chain-of-thought prompting, that appear abruptly once models pass a certain scale. Later work (Schaeffer–Miranda–Koyejo, 2023) argued that much of this abruptness comes from discontinuous metrics such as exact-match accuracy. Measured with continuous metrics, improvement is often smooth. "Emergence" is partly a property of how we score.

### The modern pipeline

As of 2026, a frontier model typically goes through:

1. pretraining (next-token prediction on huge corpora);
2. supervised instruction tuning on demonstrations;
3. reinforcement learning from human or AI preferences;
4. reinforcement learning on verifiable tasks for reasoning, with synthetic data filtered by verification.

Each stage closes part of the gap between plausible continuation and doing the task.

## Cards

Q: Why is minimizing next-token cross-entropy the same as minimizing $\mathrm{KL}(p_{\text{data}}\|p_\theta)$?
A: $\mathrm{KL}(p_{\text{data}}\|p_\theta)=-\mathbb E\log p_\theta - H(p_{\text{data}})$, and the entropy term does not depend on $\theta$. Cross-entropy minimization is maximum likelihood.
See: Next-token prediction is maximum likelihood

Q: Why can pretraining use essentially unlimited data without human labeling?
A: It is self-supervised. The target at each position is the next token of the text itself, so every document supplies its own labels.
See: Next-token prediction is maximum likelihood

Q: Why should a good next-token predictor have to "understand" its domain?
A: The loss is minimized by the true conditional distribution, so predicting well requires modeling whatever generates the text. For code, that means something like program semantics.
See: Why prediction is not shallow

Q: Approximately how much compute does training a dense transformer with $N$ parameters on $D$ tokens take?
A: $C\approx 6ND$ FLOPs: about $2ND$ for the forward pass and $4ND$ for the backward pass.
See: Scaling laws

Q: With $L=E+AN^{-\alpha}+BD^{-\beta}$ and compute $C\propto ND$, how do the compute-optimal $N$ and $D$ scale?
A: $N_{\text{opt}}\propto C^{\beta/(\alpha+\beta)}$ and $D_{\text{opt}}\propto C^{\alpha/(\alpha+\beta)}$. Chinchilla's fits put both exponents near $\frac12$: grow parameters and tokens together.
See: Scaling laws

Q: What did the Chinchilla paper conclude about earlier large models?
A: They were undertrained: too many parameters for their data. At fixed compute a smaller model trained on more tokens (about 20 per parameter) does better, e.g. Chinchilla 70B/1.4T beat Gopher 280B.
See: Scaling laws

Q: Why is "emergent abilities at scale" partly a measurement artifact?
A: Thresholded metrics like exact match turn smoothly improving per-token probabilities into sudden jumps. With continuous metrics, the improvement is often smooth.
See: Emergence, with a caveat

## Quiz

Q: For $L=E+AN^{-\alpha}+BD^{-\beta}$ at fixed $C\propto ND$, the compute-optimal $N$ scales as…
- [x] $C^{\beta/(\alpha+\beta)}$
- [ ] $C^{\alpha/(\alpha+\beta)}$
- [ ] $C^{1/2}$ regardless of $\alpha,\beta$
- [ ] $C$
E: Setting $\partial_N$ of $AN^{-\alpha}+B(C/N)^{-\beta}$ to zero gives $N^{\alpha+\beta}\propto C^{\beta}$. A larger data exponent $\beta$ shifts compute toward parameters.
See: Scaling laws

Q: In the Chinchilla fit, the constant $E$ represents…
- [x] the irreducible loss: the entropy of the text distribution
- [ ] the loss of a model with zero parameters
- [ ] the optimization error of SGD
- [ ] the compute budget
E: As $N,D\to\infty$ the cross-entropy approaches the entropy of the data, which no model can beat.
See: Scaling laws

Q: Compared with the earlier Kaplan et al. recommendation, Chinchilla advised…
- [ ] spending extra compute mostly on more parameters
- [x] scaling parameters and training tokens roughly equally
- [ ] spending extra compute mostly on more tokens with a fixed model size
- [ ] stopping training early to save compute
E: Kaplan's analysis favored growing $N$ faster than $D$. Chinchilla found both exponents near $\frac12$.
See: Scaling laws
