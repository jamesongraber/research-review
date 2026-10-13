---
title: Score-based diffusion models
tags: [generative-models, sde, fokker-planck]
created: 2026-10-13
related: [potential-games]
source: "Sample note. The PDE view of how diffusion models generate data."
---

## Article

Diffusion models generate data by **reversing a noising process**. The framework of Song et al. (2021) makes this an SDE problem, which a PDE analyst can read directly.

### Forward process

Start from data $X_0 \sim p_0$ and run

$$
dX_t = f(X_t,t)\,dt + g(t)\,dW_t, \qquad t\in[0,T].
$$

A standard choice is the variance-preserving SDE $dX = -\tfrac12\beta(t)X\,dt + \sqrt{\beta(t)}\,dW$, an Ornstein–Uhlenbeck process. Its marginals approach $\mathcal N(0,I)$ for large $T$. The densities $p_t$ solve the Fokker–Planck equation

$$
\partial_t p = -\nabla\cdot(f\,p) + \tfrac12 g^2\,\Delta p.
$$

### Reverse process

Anderson (1982) showed that the time-reversed process is again a diffusion:

$$
dX_t = \big[f(X_t,t) - g(t)^2\,\nabla\log p_t(X_t)\big]dt + g(t)\,d\bar W_t,
$$

run backward from $t=T$ to $t=0$. The only unknown is the **score** $\nabla \log p_t$. To sample, draw from $\mathcal N(0,I)$ and integrate this SDE backward with a learned score $s_\theta(x,t)\approx\nabla\log p_t(x)$.

Since $\tfrac12 g^2\Delta p = \nabla\cdot(\tfrac12 g^2 p\nabla\log p)$, the Fokker–Planck equation is also the continuity equation for the deterministic **probability-flow ODE**

$$
\dot x = f(x,t) - \tfrac12 g(t)^2\,\nabla\log p_t(x),
$$

which has the same marginals $p_t$. This ODE is the basis for fast samplers and exact likelihoods.

### Learning the score

$\nabla\log p_t$ cannot be computed, because $p_0$ is unknown. The transition kernel $p_{t|0}$ is Gaussian, however: $X_t = \alpha_t X_0 + \sigma_t\varepsilon$. **Denoising score matching** (Vincent 2011) minimizes

$$
\mathbb E_{t,X_0,\varepsilon}\,\lambda(t)\,\big\|s_\theta(X_t,t) - \nabla_{x}\log p_{t|0}(X_t\mid X_0)\big\|^2,
\qquad \nabla_x\log p_{t|0} = -\varepsilon/\sigma_t.
$$

This works because $\nabla\log p_t(x) = \mathbb E[\nabla\log p_{t|0}(x\mid X_0)\mid X_t=x]$, and least squares recovers conditional expectations. As a result, **predicting the noise $\varepsilon$** (as in DDPM, Ho et al. 2020) is the same as learning the score: $s = -\hat\varepsilon/\sigma_t$.

The same identity gives **Tweedie's formula**, $\mathbb E[\alpha_t X_0\mid X_t = x] = x + \sigma_t^2\nabla\log p_t(x)$. The score is the direction toward the denoised estimate.

### Things to remember

- If the data lies on a low-dimensional manifold, the score blows up as $t\to0$, so sampling stops at a small $t=\epsilon$.
- Diffusion models are closely related to **Schrödinger bridges** and stochastic optimal control. Generation can be posed as steering a Fokker–Planck equation between two marginals, which connects to mean field games.

## Cards

Q: Write the reverse-time SDE for $dX = f\,dt + g\,dW$.
A: $dX = \big[f - g^2\nabla\log p_t(X)\big]dt + g\,d\bar W$, integrated backward from $T$ to $0$ (Anderson 1982).

Q: What is the probability-flow ODE, and why does it have the same marginals as the SDE?
A: $\dot x = f - \tfrac12 g^2\nabla\log p_t$. Since $\tfrac12 g^2\Delta p = \nabla\cdot(\tfrac12 g^2 p\nabla\log p)$, Fokker–Planck becomes a continuity equation with this velocity field.

Q: Why can the intractable score be learned from the *conditional* score $\nabla\log p_{t|0}$?
A: $\nabla\log p_t(x) = \mathbb E[\nabla\log p_{t|0}(x\mid X_0)\mid X_t = x]$. An $L^2$ regression onto the conditional score therefore has the true score as its minimizer.

Q: How does noise prediction (DDPM) relate to the score?
A: With $X_t = \alpha_tX_0 + \sigma_t\varepsilon$, the conditional score is $-\varepsilon/\sigma_t$, so $s_\theta = -\hat\varepsilon_\theta/\sigma_t$.

Q: State Tweedie's formula for $X_t = \alpha_t X_0 + \sigma_t\varepsilon$.
A: $\mathbb E[\alpha_tX_0\mid X_t=x] = x + \sigma_t^2\nabla\log p_t(x)$.

## Quiz

Q: In the reverse-time SDE, the drift correction involving the score has coefficient…
- [ ] $-\tfrac12 g^2$
- [x] $-g^2$
- [ ] $+g^2$
- [ ] $-2g^2$
E: The reverse SDE drift is $f - g^2\nabla\log p_t$. The factor $\tfrac12$ appears in the probability-flow **ODE**, which carries no noise.

Q: Why does sampling usually stop at a small time $\epsilon>0$ instead of $t=0$?
- [ ] The Fokker–Planck equation is ill-posed at $t=0$.
- [x] For data on a low-dimensional manifold the score blows up as $t\to0$.
- [ ] The forward SDE has no strong solution at $t=0$.
- [ ] Tweedie's formula fails at $t=0$.
E: $p_0$ has no density with respect to Lebesgue measure, so $\nabla\log p_t$ becomes singular as $t\downarrow 0$.

Q: Which object must be learned to sample with the probability-flow ODE?
- [ ] The density $p_t$ itself
- [ ] The drift $f$
- [x] The score $\nabla\log p_t$
- [ ] The Brownian path $\bar W$
E: $f$ and $g$ are chosen by the designer. Only the score depends on the unknown data distribution.
