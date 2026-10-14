---
title: Singular learning theory and the learning coefficient
tags: [singular-learning-theory, bayesian, algebraic-geometry, interpretability, phase-transitions]
created: 2026-08-17
related: [reward-incentives-and-agency, double-descent-and-implicit-bias, neural-tangent-kernel-and-mean-field]
source: "Claude conversation: Mathematical foundations of AI alignment and behavior (2026-08), on the most mathematical branch of 'AI neuroscience'."
---

## Article

Most mechanistic interpretability (circuits, superposition, sparse autoencoders) is linear algebra plus careful experiment. **Singular learning theory** (Sumio Watanabe; monograph 2009) is the branch with deep mathematics: algebraic geometry, resolution of singularities, and the statistical physics of Bayesian learning.

### Regular vs singular models

A parametric model $p(y\mid x,w)$, $w\in W\subset\mathbb R^d$, is **regular** if $w\mapsto p(\cdot\mid\cdot,w)$ is one-to-one and the Fisher information matrix is positive definite at the true parameter. Classical asymptotics then hold: the posterior is asymptotically Gaussian, and BIC charges $\frac d2\log n$ for complexity.

Neural networks are **singular**. Permuting hidden units, rescaling a ReLU unit's incoming weights by $c>0$ and its outgoing weights by $1/c$, and dead or duplicate units all give many parameters for the same function. The set of true parameters $W_0$ is an analytic variety with singularities, the Fisher information is degenerate there, and Laplace/BIC asymptotics fail.

### The learning coefficient

Let $K(w)\ge0$ be the KL divergence from the truth to $p_w$ (zero exactly on $W_0$), let $L_n$ be the empirical negative log-likelihood, and let $\varphi$ be a prior. Watanabe's free-energy asymptotic is

$$
F_n = -\log\!\int e^{-nL_n(w)}\varphi(w)\,dw = nL_n(w_0) + \lambda\log n - (m-1)\log\log n + O_p(1).
$$

Here $\lambda$ is the **real log canonical threshold (RLCT)**, or learning coefficient, and $m$ is its multiplicity. Equivalently, $\lambda$ and $m$ describe how the volume of near-optimal parameters scales:

$$
\operatorname{vol}\{w: K(w)<\varepsilon\}\sim c\,\varepsilon^{\lambda}\,(\log 1/\varepsilon)^{m-1}\qquad(\varepsilon\to0).
$$

For regular models $\lambda=d/2$, which recovers BIC. In general $\lambda\le d/2$. The Bayes generalization error is $\mathbb E[G_n]=\lambda/n+o(1/n)$. So **$\lambda$, not the parameter count, measures effective complexity**. Singular models are simpler than they look. This is a degenerate Laplace method, and resolution of singularities is what reduces $K$ to a normal-crossing form $w_1^{2k_1}\cdots w_d^{2k_d}$ where the integral can be computed.

### Worked example

Take $y=abx+\text{noise}$ with true $ab=0$, so $K(a,b)\propto a^2b^2$, with $d=2$ and a uniform prior on $[-1,1]^2$. With $s=\sqrt\varepsilon$,

$$
\operatorname{vol}\{a^2b^2<\varepsilon\} = 4s\,(1+\log(1/s)) = 4\sqrt\varepsilon\,\big(1+\tfrac12\log(1/\varepsilon)\big),
$$

so $\lambda=\frac12$ and $m=2$. A regular two-parameter model would have $\lambda=1$. (Checked numerically by Monte Carlo.)

### Phase transitions and developmental interpretability

The posterior concentrates on the region of parameter space that minimizes the local free energy, roughly $nL_n+\lambda\log n$. That is a tradeoff between fit and complexity. As $n$ grows, the minimizing region can switch abruptly from a simple, worse-fitting region to a complex, better-fitting one: a **Bayesian phase transition**. **Developmental interpretability** (Timaeus and collaborators) hypothesizes that SGD training passes through analogous stage-wise transitions. It tracks them with the **local learning coefficient (LLC)**, estimated by SGLD sampling of a tempered posterior localized at the trained weights (Lau et al.). As of 2026 this is an active research program. The correspondence between Bayesian and SGD transitions is a hypothesis, not a theorem.

## Cards

Q: What makes a statistical model **singular**?
A: The parameter-to-distribution map is not one-to-one, and the Fisher information is degenerate at the true parameters. The true set $W_0$ is a singular analytic variety rather than a point.
See: Regular vs singular models

Q: Why are neural networks singular models?
A: Many parameters give the same function: permutations of hidden units, ReLU rescalings ($c$ on incoming weights, $1/c$ on outgoing), and dead or duplicate units.
See: Regular vs singular models

Q: State Watanabe's free-energy asymptotic and name $\lambda$.
A: $F_n=nL_n(w_0)+\lambda\log n-(m-1)\log\log n+O_p(1)$. $\lambda$ is the real log canonical threshold (learning coefficient), with multiplicity $m$. For regular models $\lambda=d/2$ (BIC).
See: The learning coefficient

Q: How is the learning coefficient $\lambda$ characterized by volumes?
A: $\operatorname{vol}\{w:K(w)<\varepsilon\}\sim c\,\varepsilon^{\lambda}(\log1/\varepsilon)^{m-1}$ as $\varepsilon\to0$, where $K$ is the KL divergence to the truth. Smaller $\lambda$ means more near-optimal volume, i.e. a simpler model.
See: The learning coefficient

Q: What is the Bayes generalization error in terms of $\lambda$?
A: $\mathbb E[G_n]=\lambda/n+o(1/n)$. Effective complexity is $\lambda$, not $d/2$.
See: The learning coefficient

Q: What is the learning coefficient of $K(a,b)=a^2b^2$ (two parameters), and why?
A: $\lambda=\frac12$ with multiplicity $2$: $\operatorname{vol}\{a^2b^2<\varepsilon\}\approx 2\sqrt\varepsilon\log(1/\varepsilon)$. A regular two-parameter model would have $\lambda=1$.
See: Worked example

Q: What is a Bayesian phase transition in singular learning theory?
A: As $n$ grows, the posterior's dominant region switches abruptly, because the local free energy $\approx nL_n+\lambda\log n$ trades fit against complexity. Developmental interpretability looks for analogs during SGD using the local learning coefficient.
See: Phase transitions and developmental interpretability

## Quiz

Q: For $K(a,b)=a^2b^2$ near the origin, the learning coefficient $\lambda$ is…
- [x] $\frac12$
- [ ] $1$
- [ ] $2$
- [ ] $\frac14$
E: The volume of $\{a^2b^2<\varepsilon\}$ scales like $\sqrt\varepsilon\log(1/\varepsilon)$, so $\lambda=\frac12$ with multiplicity $2$. The value $1=d/2$ would be the regular answer.
See: Worked example

Q: For a regular model with $d$ parameters, the learning coefficient is…
- [ ] $d$
- [x] $d/2$
- [ ] $\frac12$
- [ ] $\log d$
E: This recovers the BIC penalty $\frac d2\log n$. Singular models have $\lambda\le d/2$.
See: The learning coefficient

Q: Which of these is **not** a source of singularity in a ReLU network?
- [ ] permuting hidden units
- [ ] scaling a unit's incoming weights by $c>0$ and its outgoing weights by $1/c$
- [ ] a hidden unit that is never active on the data
- [x] Gaussian noise in the labels
E: Singularity is a property of the parameter-to-function map: non-identifiability and degenerate Fisher information. Label noise is part of the data model.
See: Regular vs singular models
