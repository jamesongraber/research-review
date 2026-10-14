---
title: When self-attention is a gradient flow
tags: [transformers, attention, wasserstein-gradient-flow, interaction-energy, mckean-vlasov]
created: 2026-05-29
related: [transformer-mckean-vlasov-model, attention-query-key-value, attention-clustering-theorems, transformer-head-measure, replicator-dynamics, polyak-lojasiewicz-inequality]
source: "Claude conversation: Transformers as McKean–Vlasov equations (2026-05). Formulas checked against Geshkovski–Letrouit–Polyanskiy–Rigollet, 'A mathematical perspective on Transformers' (arXiv 2312.10794), §3."
---

## Article

The attention continuity equation $\partial_t\mu + \operatorname{div}(\mu\, v[\mu]) = 0$ holds for any $D$ and $V$. Under the **tied, symmetric** condition $V = D = D^\top$ it has extra structure: it climbs an interaction energy. This is where the long-time (clustering) theory comes from.

### The interaction energy

For symmetric $D$ define

$$
E[\mu] = \tfrac12 \iint e^{\langle x, Dy\rangle}\, d\mu(x)\, d\mu(y), \qquad
\frac{\delta E}{\delta\mu}(x) = \int e^{\langle x, Dy\rangle}\,d\mu(y) =: Z_\mu(x).
$$

The first variation is exactly the **softmax partition function** $Z_\mu(x)$. Symmetry of $D$ is needed for this, since otherwise $\delta E/\delta\mu$ averages $D$ and $D^\top$. Geshkovski et al. take $Q=K=V=I$ with an inverse temperature $\beta$ in the score, so $D = \beta I$ and $V = I = D/\beta$. This is the tied case up to rescaling time by $\beta$, and the matching energy is $E_\beta[\mu] = \frac{1}{2\beta}\iint e^{\beta\langle x,y\rangle}d\mu\,d\mu$.

### Softmax attention: gradient flow with a mobility

With $V = D$, the attention velocity is

$$
v[\mu](x) = P^\perp_x\,\frac{\int e^{\langle x,Dy\rangle}\,Dy\,d\mu(y)}{\int e^{\langle x,Dy\rangle}\,d\mu(y)} = \nabla_{S^{d-1}} \log Z_\mu(x),
$$

since $\nabla_x e^{\langle x,Dy\rangle} = e^{\langle x,Dy\rangle}Dy$. This identity holds for any $D$. If $D$ is symmetric, $v = \nabla\frac{\delta E}{\delta\mu}\big/\frac{\delta E}{\delta\mu}$. That is a gradient flow of $E$ **for a weighted Wasserstein metric with mobility $1/Z_\mu$**, not for the standard $W_2$ metric. Along the flow

$$
\frac{d}{dt}E[\mu_t] = \int \Big\langle \nabla\frac{\delta E}{\delta\mu}, v\Big\rangle d\mu_t = \int Z_{\mu_t}(x)\,|v[\mu_t](x)|^2\,d\mu_t(x) \;\ge\; 0.
$$

At the particle level, $\dot X = n\,\nabla E_n(X)$ in the metric $\langle a,b\rangle_X = \sum_i Z_i(X)\langle a_i,b_i\rangle$.

### Unnormalized attention: a plain W2 gradient flow

Replacing the softmax denominator by a constant (Geshkovski et al.'s "USA" surrogate, $Z_i \to n$) gives $v = \nabla_{S^{d-1}}\frac{\delta E}{\delta\mu}$. This is an honest **Wasserstein gradient ascent** of $E$, with $\frac{d}{dt}E = \int|\nabla\frac{\delta E}{\delta\mu}|^2\,d\mu \ge 0$.

### What the energy says

For $D = \beta I$ on $S^{d-1}$, $d\ge2$, the global maximizers of $E_\beta$ are **Dirac masses** (all tokens equal), and the unique global minimizer is the **uniform measure**. Attention climbs the energy, so it is an **aggregation** dynamics, and tokens are pushed together. With $V = -I$ the sign flips and the dynamics is repulsive.

(Checked numerically when this note was written: for random symmetric $D$ with $V = D$, $E$ increased at every step. For non-symmetric $D$ with $V = D$, $E$ built from the symmetric part did not.)

### Why this is fragile

The structure needs **both** $V = D$ (payload tied to routing) **and** $D = D^\top$ (no directionality). Trained transformers satisfy neither, so for general weights attention is a McKean–Vlasov continuity equation but not a gradient flow of this energy. In the optimal-control view of training, none of this is needed.

## Cards

Q: Under what conditions on the weights is softmax self-attention on the sphere a gradient flow of an interaction energy?
A: $V = D$ (tied payload and routing) and $D = Q^\top K$ symmetric. Then it climbs $E[\mu] = \frac12\iint e^{\langle x,Dy\rangle}d\mu\,d\mu$.
See: Softmax attention: gradient flow with a mobility

Q: What is the first variation of $E[\mu] = \frac12\iint e^{\langle x,Dy\rangle}d\mu\,d\mu$ for symmetric $D$, and what is it in attention terms?
A: $\frac{\delta E}{\delta\mu}(x) = \int e^{\langle x,Dy\rangle}d\mu(y) = Z_\mu(x)$, the softmax partition function (denominator) seen by a query at $x$.
See: The interaction energy

Q: With $V = D$, write the softmax attention velocity as a gradient.
A: $v[\mu](x) = \nabla_{S^{d-1}}\log Z_\mu(x)$ with $Z_\mu(x) = \int e^{\langle x,Dy\rangle}d\mu(y)$, because $\nabla_x e^{\langle x,Dy\rangle} = e^{\langle x,Dy\rangle}Dy$.
See: Softmax attention: gradient flow with a mobility

Q: Why is normalized (softmax) attention not a gradient flow for the standard Wasserstein metric, even when $V = D$ is symmetric?
A: Its velocity is $\nabla\frac{\delta E}{\delta\mu}$ divided by $Z_\mu(x) = \frac{\delta E}{\delta\mu}(x)$. The extra factor $1/Z_\mu$ is a state-dependent mobility, so the flow is a gradient flow for a weighted Wasserstein metric. Replacing $Z$ by a constant (unnormalized attention) gives a plain $W_2$ gradient flow.
See: Softmax attention: gradient flow with a mobility

Q: Along softmax attention with $V = D$ symmetric, what is $\frac{d}{dt}E[\mu_t]$?
A: $\int Z_{\mu_t}(x)\,|v[\mu_t](x)|^2\,d\mu_t(x) \ge 0$. The energy increases, and it is stationary exactly where $v = 0$ $\mu_t$-a.e.
See: Softmax attention: gradient flow with a mobility

Q: For $Q=K=V=I$ on $S^{d-1}$, what are the global maximizers and the global minimizer of $E_\beta[\mu] = \frac{1}{2\beta}\iint e^{\beta\langle x,y\rangle}d\mu\,d\mu$?
A: The maximizers are Dirac masses (all tokens at one point). The unique minimizer is the uniform measure. Attention climbs $E_\beta$, so it aggregates tokens.
See: What the energy says

## Quiz

Q: Self-attention with $V = D$ but $D$ **not** symmetric is…
- [ ] still the Wasserstein gradient flow of $\frac12\iint e^{\langle x,Dy\rangle}d\mu\,d\mu$
- [x] still of the form $v = \nabla\log Z_\mu$, but no longer a gradient flow of that interaction energy
- [ ] no longer a continuity equation
- [ ] equivalent to setting $D = 0$
E: $v = \nabla\log Z_\mu$ holds for any $D$, but $\delta E/\delta\mu = Z_\mu$ requires symmetry: otherwise the first variation involves both $D$ and $D^\top$. The continuity equation holds regardless.
See: Softmax attention: gradient flow with a mobility

Q: The "unnormalized" surrogate replaces the softmax denominator $Z_i$ by $n$. With $V = D = D^\top$, the resulting dynamics is…
- [x] a Wasserstein gradient ascent of $E$, with $\frac{d}{dt}E = \int|\nabla\frac{\delta E}{\delta\mu}|^2d\mu$
- [ ] a gradient flow for the metric weighted by $Z_\mu$
- [ ] energy-decreasing
- [ ] a Fokker–Planck equation with diffusion $1/n$
E: Without the denominator the velocity is exactly $\nabla\frac{\delta E}{\delta\mu}$, so there is no mobility factor. The $1/n$ is just the empirical-measure normalization.
See: Unnormalized attention: a plain W2 gradient flow
