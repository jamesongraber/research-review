---
title: Attention heads as a measure, with depth-dependent weights
tags: [transformers, multi-head-attention, mean-field, fokker-planck, non-autonomous]
created: 2026-05-29
related: [transformer-mckean-vlasov-model, attention-gradient-flow-energy, attention-clustering-theorems, transformer-training-as-control, neural-tangent-kernel-and-mean-field]
source: "Claude conversation: Transformers as McKean–Vlasov equations (2026-05), on Massucco–Del Grande–Carioni–Brune–Schönlieb, 'Multi-Headed Transformer Architectures as Time-dependent Wasserstein Gradient Flows' (arXiv 2605.18870)."
---

## Article

The paper discussed in the chat (Massucco et al., 2026) extends the earlier single-head, fixed-weight theory in two ways. It treats the **heads as a measure**, and it lets that measure **depend on depth**. These are three ideas under one notation, and they are best kept apart.

### 1. The head measure is a rewriting

A layer with $H$ heads, head $h$ having parameters $\theta^{(h)}$ (its $D^{(h)}, V^{(h)}$), has velocity $\frac1H\sum_h \operatorname{attn}_{\theta^{(h)}}(x)$. With

$$
\Theta = \frac1H\sum_{h=1}^H \delta_{\theta^{(h)}} \in \mathcal P(\mathbb{R}^\alpha),
$$

this is $\int \operatorname{attn}_\theta(x)\,d\Theta(\theta)$. Nothing new has been assumed. It is the **histogram of the head parameters**. A single head is $\Theta = \delta_{\bar\theta}$. Heads have no intrinsic order, and the measure forgets the labels, so it **quotients out the permutation symmetry of the heads**, just as $\mu_t$ does for tokens.

### 2. A general measure is the infinite-head limit

Now let $\Theta$ be any probability measure on parameter space. This is a **mean-field limit in the heads**, parallel to the one in tokens:

| object | finite | mean-field |
|---|---|---|
| tokens | $n$ vectors $x_i$ | $\mu_t\in\mathcal P(S^{d-1})$ |
| heads | $H$ parameters $\theta^{(h)}$ | $\Theta_t\in\mathcal P(\mathbb{R}^\alpha)$ |

It is the same move as the mean-field limit of two-layer networks over neurons. Real layers are the empirical case, and approximating a continuous $\Theta$ by $H$ atoms ($\Theta^H \rightharpoonup \Theta$) is controlled by the paper's stability and $\Gamma$-convergence results. In the limit, $H$ no longer appears: it was only the number of atoms. (The chat said $H$ "becomes the mass of the measure". That holds only for the unnormalized sum $\sum_h$, which is in fact what real multi-head attention computes, since the output projection adds the heads. The model's $\frac1H$ makes $\Theta$ a probability measure.)

### 3. Dependence on t means per-layer weights

$\Theta_t$ varies with depth because **each layer has its own weights**. That makes the vector field non-autonomous, unlike the earlier analyses with frozen weights. The paper generates $t\mapsto\Theta_t$ as the law of a weight SDE $d\tilde\theta_t = f\,dt + g\,dW_t$, intended to cover random initialization and noise injection. The law then solves a Fokker–Planck equation, and the full **Transformer PDE** is

$$
\begin{aligned}
&\partial_t\mu_t + \operatorname{div}_x\Big(\mu_t\int V[\mu_t](x;\theta)\,d\Theta_t(\theta)\Big) = 0,\\
&\partial_t\Theta_t + \operatorname{div}_\theta(\Theta_t f) - \operatorname{div}_\theta\operatorname{div}_\theta(\Theta_t G) = 0,\qquad G = \tfrac12 gg^\top .
\end{aligned}
$$

The coupling is **one-way**: $\Theta_t$ is determined by the weight SDE alone and then drives the tokens. The only noise in the model is in the weights. The SDE models how weights vary with depth, **not training**.

### What the paper shows (from its abstract and introduction)

- The tokens follow a time-dependent gradient flow of $\mathcal E(\mu,t) = \frac12\iiint \mathcal K(x,y,\theta)\,d\mu\,d\mu\,d\Theta_t$, with a kernel symmetric in $x,y$. Softmax attention is recovered for $\mathcal K = e^{\langle x,D(\theta)y\rangle}$ with $V(\theta) = D(\theta)$. The effective mobility is the **$\Theta_t$-harmonic mean of the per-head mobilities**.
- If $\int_0^\infty|\dot\Theta_t|\,dt<\infty$, the $\omega$-limit points of $\mu_t$ are stationary for a limiting head distribution.
- Stability in the input is governed by $M_\theta(t) = \int_0^t\!\int\|D(\theta)\|^2\,d\Theta_\tau\,d\tau$. A weight normalization by $t\sqrt H$ keeps it independent of depth. The chat related this to standard weight-scaling practice, which is a heuristic link.
- Numerics: with Ornstein–Uhlenbeck (mean-reverting) weights the cloud relaxes and clusters, and a gradient quantity decays like $O(1/H)$. With oscillating weights there is no relaxation and no persistent clustering.

### For a control formulation

If parameters are the control, the head measure makes the control **measure-valued**: $t\mapsto\Theta_t$, a measure controlling a measure. This is natural for well-posedness (compactness, symmetry already quotiented out), but then one owes a convergence statement back to finite $H$. $\Gamma$-convergence of the *control problem* in the head measure was flagged in the chat as an open direction.

## Cards

Q: At the most literal level, what is the head measure $\Theta$ in a multi-head attention layer?
A: The empirical measure of the heads' parameters, $\Theta = \frac1H\sum_h\delta_{\theta^{(h)}}$, so the head average becomes $\int\operatorname{attn}_\theta\,d\Theta(\theta)$. It is a rewriting that also quotients out the permutation symmetry of the heads.
See: 1. The head measure is a rewriting

Q: What does a general (non-atomic) head measure $\Theta$ correspond to?
A: An idealized layer with infinitely many heads distributed according to $\Theta$: a mean-field limit in the heads, parallel to $n\to\infty$ in the tokens. Real $H$-head layers are the empirical case $\Theta^H\rightharpoonup\Theta$.
See: 2. A general measure is the infinite-head limit

Q: In the Transformer PDE, what does the $t$-dependence of $\Theta_t$ represent?
A: Different weights in each layer, so the token dynamics is non-autonomous. Earlier clustering analyses froze the weights across depth.
See: 3. Dependence on t means per-layer weights

Q: In the Transformer PDE with a weight SDE $d\tilde\theta = f\,dt + g\,dW$, which equation does $\Theta_t$ solve, and how is it coupled to the tokens?
A: The Fokker–Planck equation $\partial_t\Theta + \operatorname{div}_\theta(\Theta f) - \operatorname{div}_\theta\operatorname{div}_\theta(\Theta G) = 0$ with $G = \frac12gg^\top$. The coupling is one-way: $\Theta_t$ drives $\mu_t$ but does not feel it.
See: 3. Dependence on t means per-layer weights

Q: Does the weight SDE in the Transformer PDE model training?
A: No. It models how weights vary with depth (e.g. random initialization, noise injection). The whole model describes the forward pass. Training would act on the weights from outside, as a control.
See: 3. Dependence on t means per-layer weights

Q: In the time-dependent multi-head model, how does the long-time behavior depend on the weight dynamics?
A: Mean-reverting (Ornstein–Uhlenbeck) weights give relaxation and clustering. Persistently oscillating weights give no relaxation and no persistent clustering. Theoretically, if $\int_0^\infty|\dot\Theta_t|dt<\infty$, limit points are stationary for a limiting head distribution.
See: What the paper shows (from its abstract and introduction)

## Quiz

Q: Which feature of a real transformer does making $\Theta_t$ depend on $t$ capture?
- [ ] Multiple heads per layer
- [x] Different weights in different layers
- [ ] Training by gradient descent
- [ ] Positional encoding
E: Multiple heads are captured by $\Theta$ being a measure, at any fixed $t$. The $t$-dependence is per-layer weights. Training is not modeled.
See: 3. Dependence on t means per-layer weights

Q: In the Transformer PDE, where does stochasticity enter?
- [ ] In the tokens, through a Laplacian in $x$
- [x] Only in the weights, through the SDE whose law $\Theta_t$ solves a Fokker–Planck equation
- [ ] In the softmax sampling
- [ ] Nowhere; both equations are first order
E: The token equation is pure transport. The second-order term $\operatorname{div}_\theta\operatorname{div}_\theta(\Theta G)$ lives in parameter space.
See: 3. Dependence on t means per-layer weights
