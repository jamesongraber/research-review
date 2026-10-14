---
title: An HJB equation on Wasserstein space for transformer training
tags: [transformers, hamilton-jacobi, wasserstein-space, lions-derivative, mean-field-control, semiconcavity]
created: 2026-05-29
related: [transformer-training-as-control, adjoint-backpropagation, transformer-mckean-vlasov-model, weak-kam-wasserstein]
source: "Claude conversation: Transformers as McKean–Vlasov equations (2026-05). I wanted the Hamilton–Jacobi equation on the space of measures, and asked whether value-function regularity explains why backprop works."
---

## Article

The control problem from [the training-as-control note](#/note/transformer-training-as-control) has a value functional on $\mathcal P(\mathcal M)$, with $\mathcal M = S^{d-1}$:

$$
U(s,\mu) = \inf_{\theta(\cdot)}\Big\{\int_s^TR(\theta_t)\,dt + \ell(\mu_T) \;:\; \mu_s = \mu\Big\}, \qquad U(T,\cdot) = \ell .
$$

### Calculus on measures

- **Flat derivative** $\frac{\delta U}{\delta\mu}(\mu)(x)$, defined up to a constant by $\frac{d}{d\epsilon}\big|_0U(\mu+\epsilon(\nu-\mu)) = \int\frac{\delta U}{\delta\mu}(\mu)(x)\,d(\nu-\mu)(x)$.
- **Intrinsic (Lions/Wasserstein) gradient** $\nabla_\mu U(\mu)(x) = \nabla_x\frac{\delta U}{\delta\mu}(\mu)(x)\in T_x\mathcal M$, the Riemannian gradient on the sphere ($P^\perp_x$ applied to the ambient gradient).
- **Chain rule:** if $\mu_t$ moves with velocity $w_t$, then
  $$
  \frac{d}{dt}U(t,\mu_t) = \partial_tU(t,\mu_t) + \int\big\langle\nabla_\mu U(t,\mu_t)(x),\,w_t(x)\big\rangle\,d\mu_t(x).
  $$

### The HJB equation

Dynamic programming plus the chain rule give

$$
-\partial_sU(s,\mu) = \inf_{\theta}\Big\{R(\theta) + \int\big\langle\nabla_\mu U(s,\mu)(x),\,v[\mu](x;\theta)\big\rangle\,d\mu(x)\Big\}.
$$

$\nabla_\mu U(s,\mu_s)(x)$ is the costate field: along an optimal path, $p_s(x) = \nabla_\mu U(s,\mu_s)(x)$ (verification). With attention, the pairing is a double integral,

$$
\int\langle P, v[\mu]\rangle\,d\mu = \iint a_\theta(x,y)\,\langle P(x), P^\perp_xVy\rangle\,d\mu(y)\,d\mu(x),
$$

with $a_\theta(x,y) = e^{\langle x,Dy\rangle}/\!\int e^{\langle x,Dy'\rangle}d\mu$.

- **The Hamiltonian is not linear in $\mu$**, unlike mean-field control with a given drift. The chat said "quadratic in $\mu$". That is exact only for unnormalized attention. With softmax, $a_\theta$ itself depends on $\mu$ through its denominator.
- **No symmetry is needed:** any $D$ and $V$ work.
- With $R = \frac\lambda2\|\theta\|^2$, the Hamiltonian is linear in $V$, so the infimum over $V$ is an explicit quadratic minimization. The infimum over $D$ (inside the softmax) is nonconvex.

### Lifting to the data distribution

With a law $m\in\mathcal P(\mathcal P(\mathcal M))$ of input clouds and **one open-loop control shared by all clouds**, the value $\mathcal U(s,m)$ satisfies an HJB whose Hamiltonian is the $m$-average of the single-cloud one, under a **single** $\inf_\theta$: the infimum of an average. If the control could depend on each cloud (feedback $\theta = \Theta(t,\mu)$), the problem would split into separate single-cloud problems: the average of infima. (The chat said feedback would bring in a second-order "Lions Hessian" term. For these deterministic dynamics it would not. Second-order terms on $\mathcal P(\mathcal P)$ come from common noise.)

Well-posedness needs viscosity solutions on Wasserstein space, since $U$ is rarely smooth. On the compact sphere the softmax field is bounded and Lipschitz in $\mu$, which is the favorable case.

### Does value-function regularity explain why backprop works?

My idea: for semiconcave value functions in finite dimension, $U$ is differentiable outside a countably $(n-1)$-rectifiable set (Alberti–Ambrosio–Cannarsa). In standard problems, at points of differentiability the optimal trajectory is unique. So generically the costate that backprop computes would be a genuine single-valued gradient.

What this does and does not give:

- **(A) The gradient is well-posed.** Yes, plausibly: generic states avoid the singular set. Compare ReLU networks, where autodiff returns a subgradient on a null set of kinks.
- **(B) Descent reaches a good minimum.** No. (1) Regularity of $U$ in **state** space is not regularity of $J$ in **parameter** space: the link runs through $\partial_\theta v$, integrated over $t$ and the data. (2) Differentiability is necessary but not sufficient: nonconvex descent can still stall or generalize badly. (3) Semiconcavity on Wasserstein space must be proved under hypotheses, not assumed.

The real open question is the **transfer**: when does state-space regularity of $U$ say something about the parameter landscape that descent actually sees?

## Cards

Q: Define the intrinsic (Lions/Wasserstein) gradient $\nabla_\mu U$ and state the chain rule it satisfies.
A: $\nabla_\mu U(\mu)(x) = \nabla_x\frac{\delta U}{\delta\mu}(\mu)(x)$. If $\mu_t$ moves with velocity $w_t$, then $\frac{d}{dt}U(t,\mu_t) = \partial_tU + \int\langle\nabla_\mu U(t,\mu_t)(x),w_t(x)\rangle\,d\mu_t(x)$.
See: Calculus on measures

Q: Write the HJB equation on $\mathcal P(S^{d-1})$ for the transformer control problem.
A: $-\partial_sU(s,\mu) = \inf_\theta\{R(\theta) + \int\langle\nabla_\mu U(s,\mu)(x), v[\mu](x;\theta)\rangle\,d\mu(x)\}$, with $U(T,\cdot) = \ell$.
See: The HJB equation

Q: How is the costate field of the mean-field adjoint related to the HJB value functional?
A: Along an optimal path, $p_s(x) = \nabla_\mu U(s,\mu_s)(x)$. This verification identity is what links the HJB to backprop.
See: The HJB equation

Q: Why is the transformer HJB Hamiltonian not linear in $\mu$?
A: The attention velocity depends on $\mu$ (McKean–Vlasov), so the pairing $\int\langle P,v[\mu]\rangle\,d\mu$ is a double integral against $\mu$. With softmax, the weights also depend on $\mu$ through the denominator.
See: The HJB equation

Q: With one open-loop control shared by all inputs, how does the HJB lifted to the data law $m$ differ from the per-cloud HJB?
A: Its Hamiltonian is the $m$-average of the per-cloud Hamiltonian under a single $\inf_\theta$ (the infimum of an average). Per-cloud feedback would give the average of the infima instead, i.e. decoupled problems.
See: Lifting to the data distribution

Q: Semiconcave value functions are differentiable off a small set. What does that imply about backprop, and what does it not imply?
A: It suggests the costate backprop computes is generically a genuine single-valued gradient (the gradient is well-posed). It does not explain why descent finds good minima: state-space regularity of $U$ is not parameter-space regularity of $J$, and differentiability is necessary, not sufficient.
See: Does value-function regularity explain why backprop works?

## Quiz

Q: In finite dimensions, what is the size of the set where a semiconcave function fails to be differentiable?
- [ ] It can have positive Lebesgue measure
- [x] It is countably $(n-1)$-rectifiable, hence Lebesgue-null
- [ ] It is always finite
- [ ] It is empty if the function is Lipschitz
E: Rademacher already gives a Lebesgue-null set for Lipschitz functions. Semiconcavity gives the stronger structure of a countable union of Lipschitz hypersurfaces. Lipschitz alone does not make it empty (think of $|x|$).
See: Does value-function regularity explain why backprop works?

Q: In the transformer control problem, which object is computed during actual training?
- [ ] The value functional $U(s,\mu)$ on all of $\mathcal P(S^{d-1})$
- [x] The adjoint (costate) field along the current trajectory, for the current parameters
- [ ] The viscosity solution of the lifted HJB
- [ ] A Bellman recursion over layers
E: Gradient training is the Pontryagin route. The HJB characterizes the problem but is never solved, since dynamic programming over a space of measures is intractable. Only at an optimum does the costate coincide with $\nabla_\mu U$ along the path.
See: The HJB equation

Q: Which is the main gap in "semiconcavity of $U$ explains why gradient descent succeeds"?
- [ ] Semiconcave functions can be nowhere differentiable
- [x] Regularity of $U$ in state (measure) space does not transfer automatically to the landscape of $J$ in parameter space
- [ ] The HJB has no value function when $D$ is non-symmetric
- [ ] Backprop does not compute a costate
E: The parameter gradient is $\int(\partial_\theta v)^\top p\,d\mu$, integrated over depth and data. Its landscape depends on how $\theta$ enters $v$, which state-space regularity does not control.
See: Does value-function regularity explain why backprop works?
