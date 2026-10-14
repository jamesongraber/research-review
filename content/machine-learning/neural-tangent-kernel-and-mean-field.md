---
title: "Infinite-width limits: neural tangent kernel vs mean field"
tags: [ntk, mean-field, wasserstein-gradient-flow, lazy-training, feature-learning]
created: 2025-12-01
related: [polyak-lojasiewicz-inequality, deep-learning-theory-overview, double-descent-and-implicit-bias, transformer-mckean-vlasov-model, transformer-head-measure]
source: "Claude conversation: Mathematical theory of deep learning (2025-12). The NTK and the 'lazy training regime' came up there, and the mean-field limit is the standard contrast."
---

## Article

Take a two-layer network with $m$ hidden units,

$$
f(x;\theta) = \alpha_m\sum_{j=1}^m a_j\,\sigma(w_j\cdot x),\qquad \theta=(a_j,w_j)_{j\le m},
$$

trained by gradient flow on the squared loss $\mathcal L=\frac12\sum_{i=1}^n (f(x_i)-y_i)^2$. As $m\to\infty$ the choice of scaling $\alpha_m$ gives two qualitatively different limits.

### The neural tangent kernel

Define the **neural tangent kernel** $\Theta_\theta(x,x') = \langle\nabla_\theta f(x;\theta),\nabla_\theta f(x';\theta)\rangle$. By the chain rule, gradient flow $\dot\theta = -\nabla\mathcal L$ moves the function as

$$
\partial_t f_t(x) = -\sum_{i=1}^n \Theta_{\theta_t}(x,x_i)\,\big(f_t(x_i)-y_i\big).
$$

On the training set, with $u_t = (f_t(x_i))_i$ and Gram matrix $K_t = (\Theta_{\theta_t}(x_i,x_j))_{ij}$, this reads $\dot u = -K_t(u-y)$.

### Lazy training under NTK scaling

With $\alpha_m = 1/\sqrt m$ and i.i.d. initialization, Jacot–Gabriel–Hongler (2018) showed that as $m\to\infty$, on a fixed time horizon and under standard assumptions (smooth Lipschitz activation), $\Theta_{\theta_t}$ converges to a **deterministic kernel that does not change during training**. The dynamics become linear:

$$
u_t - y = e^{-tK}(u_0-y),
$$

which converges exponentially if $K\succ0$, at rate $\lambda_{\min}(K)$. This is PL with the NTK Gram matrix (see [Polyak–Łojasiewicz](#/note/polyak-lojasiewicz-inequality/overparameterized-networks)). The trained network is kernel regression with the NTK, added to the random initial function.

The reason is that each weight moves only $O(1/\sqrt m)$. The hidden features $\sigma(w_j\cdot x)$ are effectively frozen, so the network behaves like its linearization around initialization. This is **lazy training**: there is no **feature learning**. Relatedly, at initialization the random function $f(\cdot;\theta_0)$ converges to a Gaussian process (the **NNGP**) by the central limit theorem.

### Mean-field scaling

With $\alpha_m = 1/m$, write the network as an integral against the empirical measure of neurons $\rho = \frac1m\sum_j\delta_{(a_j,w_j)}$:

$$
f_\rho(x) = \int a\,\sigma(w\cdot x)\,d\rho(a,w).
$$

The risk $R(\rho) = \frac12\mathbb E\big(f_\rho(x)-y\big)^2$ is **convex in $\rho$** (a convex function of a linear functional). With time rescaled by $m$, each neuron follows $\dot\theta_j = -\nabla_\theta \frac{\delta R}{\delta\rho}(\rho_t)(\theta_j)$. As $m\to\infty$, $\rho_t$ solves

$$
\partial_t\rho_t = \nabla_\theta\cdot\Big(\rho_t\,\nabla_\theta\frac{\delta R}{\delta\rho}(\rho_t)\Big),
$$

the **Wasserstein gradient flow** of $R$ (Mei–Montanari–Nguyen; Chizat–Bach; Rotskoff–Vanden-Eijnden; Sirignano–Spiliopoulos; all 2018). It is a nonlinear continuity equation whose velocity depends on $\rho$ itself, i.e. of McKean–Vlasov type. Neurons move $O(1)$, so **features are learned**.

### Convergence in the mean-field regime

Convexity in $\rho$ is in the flat (linear) sense, not displacement convexity, so global convergence is not automatic. A continuity equation transports mass but cannot create it where there is none. Chizat–Bach proved that for homogeneous activations (e.g. ReLU) and an initialization whose support separates the parameter space suitably, **if $\rho_t$ converges, its limit is a global minimizer**.

Adding Gaussian noise to the particle dynamics (Langevin) adds an entropy term, $R(\rho)+\beta^{-1}\int\rho\log\rho$, and a Laplacian, giving a Fokker–Planck equation. The minimizer then has Gibbs form, and a uniform log-Sobolev inequality gives exponential convergence. This is the mean-field Langevin setting, the same mechanism as the entropic neural-ODE PL result.

### Which limit describes real networks?

The NTK gives clean, quantitative convergence guarantees but no feature learning. Real networks do learn features, and finite-width corrections to NTK predictions matter. The mean-field limit captures feature learning, but quantitative theory is harder, and it is cleanest for two layers. Practical networks sit somewhere in between, and understanding feature learning beyond the lazy regime is a central open problem.

## Cards

Q: Define the neural tangent kernel.
A: $\Theta_\theta(x,x')=\langle\nabla_\theta f(x;\theta),\nabla_\theta f(x';\theta)\rangle$, the Gram kernel of parameter gradients. Under gradient flow on squared loss, $\partial_t f_t(x) = -\sum_i\Theta(x,x_i)(f_t(x_i)-y_i)$.
See: The neural tangent kernel

Q: In the infinite-width NTK limit, how does the vector of training-set outputs $u_t$ evolve?
A: $\dot u=-K(u-y)$ with a fixed deterministic Gram matrix $K$, so $u_t-y=e^{-tK}(u_0-y)$. The convergence is exponential at rate $\lambda_{\min}(K)$ if $K\succ0$.
See: Lazy training under NTK scaling

Q: Why is the NTK regime called **lazy**, and what does it fail to capture?
A: With $1/\sqrt m$ output scaling each weight moves only $O(1/\sqrt m)$, so the network stays at its linearization around initialization and the hidden features are frozen. It does not capture feature learning.
See: Lazy training under NTK scaling

Q: What output scalings give the NTK and the mean-field limits of a two-layer network?
A: NTK: $\frac{1}{\sqrt m}\sum_j a_j\sigma(w_j\cdot x)$. Mean field: $\frac1m\sum_j a_j\sigma(w_j\cdot x)=\int a\sigma(w\cdot x)\,d\rho$, with $\rho$ the empirical measure of neurons.
See: Mean-field scaling

Q: Which PDE does the neuron distribution $\rho_t$ solve in the mean-field limit?
A: The Wasserstein gradient flow of the risk: $\partial_t\rho=\nabla_\theta\cdot\big(\rho\,\nabla_\theta\frac{\delta R}{\delta\rho}(\rho)\big)$. It is a McKean–Vlasov continuity equation on parameter space.
See: Mean-field scaling

Q: The mean-field risk $R(\rho)$ is convex in $\rho$. Why is global convergence of its Wasserstein gradient flow still nontrivial?
A: The convexity is flat (linear), not displacement convexity along Wasserstein geodesics, and a continuity equation cannot create mass where $\rho$ has none. Chizat–Bach need homogeneity plus a support condition on the initialization, and they conclude only that if $\rho_t$ converges, the limit is global.
See: Convergence in the mean-field regime

Q: What does adding noise to mean-field training do to the PDE and to the minimizer?
A: It adds entropy, $R+\beta^{-1}\int\rho\log\rho$, and a Laplacian, giving a Fokker–Planck (mean-field Langevin) equation. The minimizer has Gibbs form, and a uniform log-Sobolev inequality gives exponential convergence.
See: Convergence in the mean-field regime

Q: What is the NNGP?
A: The Gaussian process that a randomly initialized network converges to as width $\to\infty$, by the central limit theorem over i.i.d. hidden units.
See: Lazy training under NTK scaling

## Quiz

Q: Which infinite-width regime exhibits feature learning?
- [ ] the NTK (lazy) regime
- [x] the mean-field regime
- [ ] both
- [ ] neither: features are frozen in any infinite-width limit
E: In the NTK limit the weights barely move, so the features stay fixed. In the mean-field limit neurons move $O(1)$ and their distribution evolves.
See: Which limit describes real networks?

Q: In the mean-field limit, the evolution of the neuron distribution is…
- [x] $\partial_t\rho=\nabla\cdot\big(\rho\nabla\frac{\delta R}{\delta\rho}\big)$
- [ ] $\partial_t\rho=-\frac{\delta R}{\delta\rho}$
- [ ] $\partial_t\rho=\Delta\rho$
- [ ] a backward HJB equation for $\frac{\delta R}{\delta\rho}$
E: Particles follow the gradient of the first variation, which gives the Wasserstein ($W_2$) gradient flow. The second option is the flat $L^2$ gradient flow, which does not conserve mass and is not what particle dynamics produce.
See: Mean-field scaling

Q: In the NTK limit, the training residual $u_t-y$ equals…
- [x] $e^{-tK}(u_0-y)$
- [ ] $e^{-tK^{-1}}(u_0-y)$
- [ ] $(I+tK)^{-1}(u_0-y)$
- [ ] $e^{-t\lambda_{\max}(K)}(u_0-y)$
E: $\dot u=-K(u-y)$ with $K$ constant is a linear ODE. The slowest mode decays at rate $\lambda_{\min}(K)$, not $\lambda_{\max}$.
See: Lazy training under NTK scaling
