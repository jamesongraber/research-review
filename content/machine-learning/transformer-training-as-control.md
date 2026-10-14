---
title: Training a transformer as mean-field optimal control
tags: [transformers, optimal-control, mean-field-control, pontryagin, adjoint-method, mckean-vlasov]
created: 2026-05-29
related: [adjoint-backpropagation, transformer-hjb-wasserstein, transformer-mckean-vlasov-model, transformer-head-measure, potential-games, master-equation-and-rational-expectations, adaptive-therapy-control]
source: "Claude conversation: Transformers as McKean–Vlasov equations (2026-05). My framing: once the transformer is a McKean–Vlasov equation, the parameters are the control and the loss is the objective."
---

## Article

Forget the gradient-flow structure. Once the forward pass is a controlled McKean–Vlasov equation, **training is a mean-field optimal control problem**.

### The dictionary

- **State:** the token measure of one input, $\mu_t\in\mathcal P(S^{d-1})$, with $\mu_0 = \mu^{\text{input}}$ and
  $\partial_t\mu_t + \operatorname{div}\big(\mu_t\,v[\mu_t](\cdot;\theta_t)\big) = 0$. The velocity is attention plus the MLP drift.
- **Control:** the parameter path $t\mapsto\theta_t = (D_t, V_t, \text{MLP}_t)$. It is **open-loop and shared by every input**: one network for all data.
- **Cost:**
  $$
  J(\theta) = \mathbb{E}_{(\mu^{\text{input}},y^\star)\sim\mathcal D}\big[\ell(\mu_T;y^\star)\big] + \int_0^T R(\theta_t)\,dt.
  $$
  The terminal loss reads out $\mu_T$. Weight decay $R = \frac\lambda2\|\theta\|^2$ is the classical $L^2$ control cost.

### Two mean-field levels

1. **Tokens, within one sample.** Even a single training example is a McKean–Vlasov control problem, steering a probability measure whose velocity depends on itself.
2. **Data, across samples.** One control must steer a whole distribution of initial clouds, i.e. a law on $\mathcal P(S^{d-1})$. Because the control cannot be tailored to each trajectory, generalization questions enter here.

SGD handles level 2 by Monte Carlo sampling. Level 1 is handled exactly by the adjoint field.

### The mean-field adjoint

For one sample the costate is a **vector field** $p_t(x)$, with $p_T = \nabla_\mu\ell(\mu_T)$ (the Wasserstein gradient of the terminal loss). Along a token trajectory $X_t$,

$$
\frac{d}{dt}p_t(X_t) = -\big(\partial_xv[\mu_t](X_t)\big)^\top p_t(X_t) \;-\; \int \nabla_y\Big\langle \frac{\delta v[\mu_t](z)}{\delta\mu}(y),\, p_t(z)\Big\rangle\Big|_{y=X_t}\, d\mu_t(z),
$$

and the parameter gradient is $\frac{\delta J}{\delta\theta_t} = \int(\partial_\theta v[\mu_t](x;\theta_t))^\top p_t(x)\,d\mu_t(x) + \nabla R(\theta_t)$. The first term is the usual one. The second is the **mean-field term**: moving the mass at $X_t$ changes everyone's velocity. Note $\nabla_y$ of the flat derivative, i.e. a Lions derivative. (The chat wrote the flat derivative without $\nabla_y$, and wrote $\partial_tp_t(x)$ instead of the derivative along the flow.)

For softmax attention, $\frac{\delta v(z)}{\delta\mu}(y) = a(z,y)\,(Vy - \bar v(z))$, where $a(z,y) = e^{\langle z,Dy\rangle}/\!\int e^{\langle z,Dy'\rangle}d\mu(y')$ and $\bar v(z) = \int a(z,y')\,Vy'\,d\mu(y')$ (before projection). Its $y$-gradient paired with $p$ is $a(z,y)\big[V^\top p(z) + \langle Vy-\bar v(z),p(z)\rangle\,D^\top z\big]$. So:

- **term 1:** the token acting as a **query** (through its own attention weights);
- **term 2:** the token acting as a **value** (payload $V^\top p$) and as a **key** in everyone else's softmax.

The chat matched term 1 to "values" and term 2 to "attention weights". That is not right: values appear only in term 2, and routing appears in both. The formula above was checked numerically against the exact particle chain rule and agrees to $10^{-9}$.

### Why this framing fits real transformers better

Pontryagin and HJB do not care about symmetry. $D$ need not be symmetric, $V\ne D$ is fine, and the adjoint kernel is simply the transpose of the forward one. The gradient-flow theory needs $V = D = D^\top$. So the control framing is the more faithful one.

### Questions it opens, and caveats

- Existence, uniqueness and regularity in $t$ of optimal controls (is smooth depth dependence natural?).
- **Turnpike** behavior: in long-horizon optimal control, optimal trajectories stay near a static optimum for most of the time. For very deep models this would suggest that most layers do nearly the same thing. This is a speculative prediction.
- When does the mean-field term in the adjoint matter, and when do tokens behave like independent particles?

Caveats: real training is the discrete-depth problem, and the gap to the continuum is the Euler error again. Real training also learns the embedding and readout maps, and the data are finite.

## Cards

Q: Training a transformer as optimal control of a McKean–Vlasov equation: what are the state, the control, and the cost?
A: State: the token measure $\mu_t$, solving the attention continuity equation. Control: the parameter path $\theta_t$, open-loop and shared by all inputs. Cost: $\mathbb{E}_{\mathcal D}[\ell(\mu_T;y^\star)] + \int_0^TR(\theta_t)\,dt$, with weight decay as an $L^2$ control cost.
See: The dictionary

Q: What are the two distinct mean-field aspects of transformer training as control?
A: (1) Tokens: within one sample the state is a measure whose velocity depends on itself (McKean–Vlasov). (2) Data: one shared control must steer a whole distribution of initial token clouds.
See: Two mean-field levels

Q: How does the mean-field adjoint differ from the finite-dimensional adjoint $\dot p = -(\partial_xf)^\top p$?
A: The costate is a field $p_t(x)$. Along a trajectory there is an extra term $-\int\nabla_y\langle\frac{\delta v(z)}{\delta\mu}(y),p_t(z)\rangle|_{y=X_t}\,d\mu_t(z)$, because moving mass at $X_t$ changes every token's velocity.
See: The mean-field adjoint

Q: In the mean-field adjoint for attention, what do the local term and the mean-field term correspond to?
A: Local term: the token as a **query**, through its own attention weights. Mean-field term: the token as a **value** (payload, $V^\top p$) and as a **key** in other tokens' softmax.
See: The mean-field adjoint

Q: For $v[\mu](z) = \int a(z,y)Vy\,d\mu(y)$ with softmax weights $a$, what is the flat derivative $\frac{\delta v(z)}{\delta\mu}(y)$?
A: $a(z,y)\,(Vy - \bar v(z))$ with $\bar v(z) = \int a(z,y')Vy'\,d\mu(y')$. The $-\bar v$ comes from differentiating the softmax denominator.
See: The mean-field adjoint

Q: Does the optimal-control view of transformer training need $D$ symmetric or $V = D$? Why does that matter?
A: No. Pontryagin and HJB work for any $D,V$; the adjoint kernel is just the transpose of the forward one. So this framing covers real, untied, directional attention, unlike the gradient-flow theory.
See: Why this framing fits real transformers better

## Quiz

Q: In the mean-field adjoint for softmax attention, which term carries the gradient flowing through the **value** vectors $Vx_j$?
- [ ] Only the local term $(\partial_xv)^\top p$
- [x] Only the mean-field (interaction) term
- [ ] Both equally
- [ ] Neither; values only affect $\partial_\theta v$
E: The local term differentiates $v[\mu](x)$ in the query position $x$, where $V$ acts on the other tokens. Moving a token as a value is an interaction effect, and it produces the $V^\top p$ part of the mean-field term.
See: The mean-field adjoint

Q: What makes transformer training a control problem with a *distribution* of initial conditions?
- [ ] The softmax normalization
- [ ] Layer normalization
- [x] One open-loop parameter path must work for every input in the data distribution
- [ ] The MLP acting on each token separately
E: Classical mean-field control usually has one initial measure. Here there is a law over initial token clouds and a single shared control.
See: Two mean-field levels
