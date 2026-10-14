---
title: Backpropagation is the discrete adjoint equation
tags: [backpropagation, optimal-control, pontryagin, adjoint-method, neural-ode, sgd]
created: 2026-05-29
related: [transformer-training-as-control, transformer-hjb-wasserstein, deep-learning-theory-overview]
source: "Claude conversation: Transformers as McKean–Vlasov equations (2026-05). I asked to see precisely why the backward adjoint is backpropagation, starting from a simple control example."
---

## Article

Take a neural-ODE control problem: state $x_t\in\mathbb{R}^d$, control $\theta_t$, dynamics $\dot x_t = f(x_t,\theta_t)$ with $x_0 = \xi$ fixed, and cost $J(\theta) = \ell(x_T)$. We want the gradient of $J$ with respect to the whole path $\theta(\cdot)$.

### The continuous adjoint

Add the constraint with a multiplier $p_t$:
$\mathcal L = \ell(x_T) - \int_0^T\langle p_t, \dot x_t - f(x_t,\theta_t)\rangle\,dt$, which equals $J$ for any $p$. Perturb $\theta \to \theta + \delta\theta$, which induces $\delta x$ with $\delta x_0 = 0$, and integrate $\langle p,\tfrac{d}{dt}\delta x\rangle$ by parts:

$$
\delta\mathcal L = \langle\nabla\ell(x_T) - p_T,\delta x_T\rangle + \int_0^T\langle\dot p_t + (\partial_xf)^\top p_t,\delta x_t\rangle\,dt + \int_0^T\langle(\partial_\theta f)^\top p_t,\delta\theta_t\rangle\,dt.
$$

Choose $p$ to kill the $\delta x$ terms:

$$
\dot p_t = -(\partial_x f(x_t,\theta_t))^\top p_t, \qquad p_T = \nabla\ell(x_T), \qquad\text{so}\qquad \frac{\delta J}{\delta\theta_t} = (\partial_\theta f(x_t,\theta_t))^\top p_t.
$$

As an algorithm: integrate the state forward, integrate the costate backward from $T$, then read off the gradient. $p_t$ is the **sensitivity of the final loss to the state at time $t$**. With the Hamiltonian $H(x,p,\theta) = \langle p, f(x,\theta)\rangle$ these are Pontryagin's state and costate equations.

### Discretize: backprop appears

A residual network $x_{\ell+1} = x_\ell + h f(x_\ell,\theta_\ell)$ with $J = \ell(x_L)$. Set $p_\ell := \partial J/\partial x_\ell$. The chain rule gives

$$
p_\ell = \big(I + h\,\partial_xf(x_\ell,\theta_\ell)\big)^\top p_{\ell+1}, \qquad p_L = \nabla\ell(x_L), \qquad \frac{\partial J}{\partial\theta_\ell} = h\,(\partial_\theta f(x_\ell,\theta_\ell))^\top p_{\ell+1}.
$$

That recursion **is** the backward pass: multiply by transposed layer Jacobians from the output back. Rearranged, $(p_{\ell+1}-p_\ell)/h = -(\partial_xf)^\top p_{\ell+1}$ is a discretization of the adjoint ODE. (The weight-gradient formula was checked against finite differences on a small tanh residual net.)

| control | network |
|---|---|
| state $x_t$, forward ODE | activations, forward pass |
| costate $p_t$ | $\partial J/\partial x_\ell$ |
| $p_T=\nabla\ell(x_T)$ | seed backprop at the loss |
| adjoint ODE | backward pass |
| $(\partial_\theta f)^\top p_t$ | weight gradient |

**Backprop is the discretized adjoint equation**, and reverse-mode automatic differentiation is the general name for "multiply by transposed Jacobians backward". The identity in $I + h\,\partial_xf$ is the skip connection passing the gradient straight through, so $\|p_\ell\|$ is not forced to shrink with depth.

### What "stochastic" means in SGD

The real objective averages over data: $J(\theta) = \mathbb{E}_{(\xi,y^\star)\sim\mathcal D}[\ell(x_T^\xi;y^\star)]$, with one control $\theta$ shared by all inputs. So $\nabla_\theta J = \mathbb{E}_{\mathcal D}[\nabla_\theta\ell(x_T^\xi;y^\star)]$, and **each term is a deterministic forward/adjoint solve for one input**. SGD replaces the expectation by a minibatch average, an unbiased Monte Carlo estimate. The randomness is only in which data are sampled, not in the dynamics, the adjoint or the chain rule.

Keep two clocks apart: **depth time** $t$ (forward state and backward costate inside the network) and **optimization time** $\tau$ (parameter updates). A heuristic diffusion approximation treats SGD as an SDE in $\tau$: gradient flow plus noise whose covariance comes from the per-sample gradient covariance, scaled by the learning rate. Some implicit-regularization arguments (a bias toward flat minima) start from this approximation.

### Pontryagin, not Bellman

Training follows the **Pontryagin** side of optimal control (forward state, backward costate, gradient step). It does **not** do dynamic programming, which would need the value function on the entire state space. The HJB equation characterizes the optimal control problem. Its link to backprop is the verification identity $p_t = \nabla_xU(t,x_t)$ along optimal paths.

## Cards

Q: For $\dot x = f(x,\theta)$, $J = \ell(x_T)$, state the adjoint equation, its terminal condition, and the gradient formula.
A: $\dot p_t = -(\partial_xf)^\top p_t$, $p_T = \nabla\ell(x_T)$, and $\delta J/\delta\theta_t = (\partial_\theta f)^\top p_t$.
See: The continuous adjoint

Q: In the derivation of the adjoint equation, what is the key step, and how is $p$ chosen?
A: Integrate $\langle p,\frac{d}{dt}\delta x\rangle$ by parts to move the time derivative onto $p$. Then choose $p$ so that the coefficients of $\delta x_t$ and $\delta x_T$ vanish, which leaves only the $\delta\theta$ term.
See: The continuous adjoint

Q: For a residual net $x_{\ell+1} = x_\ell + hf(x_\ell,\theta_\ell)$, write the backward recursion for $p_\ell = \partial J/\partial x_\ell$ and the weight gradient.
A: $p_\ell = (I + h\,\partial_xf)^\top p_{\ell+1}$ with $p_L = \nabla\ell(x_L)$, and $\partial J/\partial\theta_\ell = h\,(\partial_\theta f)^\top p_{\ell+1}$. This is backprop, and its continuum limit is the adjoint ODE.
See: Discretize: backprop appears

Q: In adjoint terms, why do residual connections help gradients propagate?
A: The backward map is $(I + h\,\partial_xf)^\top$. The identity passes $p_{\ell+1}$ straight through, so $\|p_\ell\|$ is not forced to shrink geometrically with depth.
See: Discretize: backprop appears

Q: What exactly is stochastic in stochastic gradient descent, in the control picture?
A: Only the Monte Carlo estimate of the data expectation: $\mathbb{E}_{\mathcal D}[\nabla_\theta\ell]$ is replaced by a minibatch average. Each term is a deterministic forward/adjoint solve for one input.
See: What "stochastic" means in SGD

Q: Does training a network use dynamic programming?
A: No. Gradient training is the Pontryagin route: forward state, backward costate, gradient step. Dynamic programming would need the value function on the whole state space, which is intractable. The HJB characterizes the problem, and along optimal paths the costate equals the gradient of the value function.
See: Pontryagin, not Bellman

## Quiz

Q: In the analogy between optimal control and backprop, the costate $p_t$ corresponds to…
- [ ] the weight gradient $\partial J/\partial\theta_\ell$
- [x] the gradient of the loss with respect to the activations, $\partial J/\partial x_\ell$
- [ ] the learning rate
- [ ] the value function $U(t,x)$ itself
E: The costate is the sensitivity of the loss to the state. Weight gradients are obtained from it as $(\partial_\theta f)^\top p$. It equals $\nabla_xU$ (not $U$) along optimal trajectories.
See: Discretize: backprop appears

Q: An SGD step on a minibatch of size $B$ performs…
- [x] $B$ deterministic forward/adjoint solves whose parameter gradients are averaged
- [ ] one stochastic adjoint solve driven by Brownian noise
- [ ] a Bellman backup on the minibatch states
- [ ] a forward pass only, with gradients estimated by finite differences
E: The noise in SGD is sampling noise in estimating $\mathbb{E}_{\mathcal D}$. The adjoint for each sample is exact and deterministic.
See: What "stochastic" means in SGD

Q: The time variable in the adjoint equation of a neural ODE is…
- [x] depth, run backward from the output layer to the input
- [ ] optimization time (training iterations)
- [ ] wall-clock time of the forward pass
- [ ] position in the input sequence
E: Depth time $t$ carries the forward state and the backward costate. Optimization time $\tau$ indexes the parameter updates, and it is where SGD noise lives.
See: What "stochastic" means in SGD
