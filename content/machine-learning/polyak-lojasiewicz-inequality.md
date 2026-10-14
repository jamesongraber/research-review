---
title: Polyak–Łojasiewicz inequality
tags: [optimization, gradient-descent, nonconvex, log-sobolev, overparameterization]
created: 2026-07-03
related: [neural-tangent-kernel-and-mean-field, deep-learning-theory-overview, double-descent-and-implicit-bias]
source: "Claude conversation: Polyak–Łojasiewicz inequality explained (2026-07), prompted by a paper on PL inequalities for entropic mean-field neural ODEs."
---

## Article

Let $f:\mathbb R^n\to\mathbb R$ be differentiable with $f^* = \inf f > -\infty$. It satisfies the **Polyak–Łojasiewicz (PL) inequality** with constant $\mu>0$ if

$$
\tfrac12\|\nabla f(x)\|^2 \;\ge\; \mu\,\big(f(x)-f^*\big)\qquad\text{for all } x.
$$

The gradient controls the suboptimality gap. Wherever $f$ is far from optimal the gradient is large, so descent cannot stall, and **every critical point is a global minimizer**.

### Linear convergence without convexity

*Gradient flow.* Along $\dot x = -\nabla f(x)$,
$\frac{d}{dt}\big(f(x_t)-f^*\big) = -\|\nabla f\|^2 \le -2\mu\,(f(x_t)-f^*)$, so by Grönwall $f(x_t)-f^* \le e^{-2\mu t}(f(x_0)-f^*)$.

*Gradient descent.* If $\nabla f$ is $L$-Lipschitz, the step $x_{k+1} = x_k - \frac1L\nabla f(x_k)$ satisfies the descent lemma $f(x_{k+1}) \le f(x_k) - \frac{1}{2L}\|\nabla f(x_k)\|^2$. PL turns this into $f(x_{k+1})-f^* \le (1-\mu/L)(f(x_k)-f^*)$, hence

$$
f(x_k)-f^* \le \Big(1-\frac{\mu}{L}\Big)^k\big(f(x_0)-f^*\big).
$$

This is the strongly convex rate, obtained with no convexity. (The descent lemma also gives $\frac{1}{2L}\|\nabla f\|^2 \le f-f^*$, so automatically $\mu\le L$.)

### PL is weaker than strong convexity

Strong convexity with modulus $\mu$ implies PL with the same $\mu$. The converse fails in two ways.

- **Minimizers need not be unique.** Take $f(\theta) = \|A\theta-b\|^2$ with $A\in\mathbb R^{m\times n}$, $m<n$, of full row rank. The minimizers form an affine subspace of dimension $n-m$. With $r = A\theta-b$, $\nabla f = 2A^\top r$ and $\frac12\|\nabla f\|^2 = 2\|A^\top r\|^2 \ge 2\lambda_{\min}(AA^\top)\|r\|^2$. So PL holds **globally** with $\mu = 2\lambda_{\min}(AA^\top) = 2\sigma_{\min}(A)^2$. Note $AA^\top$, not $A^\top A$, which is singular here.
- **$f$ need not be convex.** For $f(x,y) = (y-\sin x)^2$ one computes $\frac12\|\nabla f\|^2 = 2(1+\cos^2 x)\,f \ge 2f$. This is PL with $\mu=2$, nonconvex, with minimizers forming the curve $y=\sin x$. A one-dimensional example is $x^2+3\sin^2 x$: nonconvex ($f''$ reaches $-4$), unique minimizer, PL (numerically the best $\mu$ is about $0.18$).

### Where PL sits among other conditions

**PL implies quadratic growth**: $f(x)-f^*\ge \frac{\mu}{2}\operatorname{dist}(x,X^*)^2$, where $X^*$ is the set of minimizers. Proof: along gradient flow, $\frac{d}{dt}\sqrt{f-f^*} = -\frac{\|\nabla f\|^2}{2\sqrt{f-f^*}} \le -\sqrt{\mu/2}\,\|\nabla f\|$. So the flow from $x$ has length at most $\sqrt{2/\mu}\,\sqrt{f(x)-f^*}$, and it ends in $X^*$.

Karimi, Nutini and Schmidt (2016) order the standard conditions for $L$-smooth $f$: strong convexity ⇒ essential strong convexity ⇒ weak strong convexity ⇒ restricted secant inequality ⇒ error bound ⇔ PL ⇒ quadratic growth. For convex $f$ the last four are all equivalent.

### Łojasiewicz exponents and log-Sobolev

Łojasiewicz's gradient inequality says a real-analytic $f$ satisfies $\|\nabla f(x)\| \ge c\,|f(x)-f(\bar x)|^\theta$ near any critical point $\bar x$, for some $\theta\in[\frac12,1)$. PL is the global case $\theta = \frac12$, which is exactly what gives exponential rather than polynomial rates.

The PDE version is familiar. The Fokker–Planck equation $\partial_t\rho = \Delta\rho + \nabla\cdot(\rho\nabla V)$ is the Wasserstein gradient flow of $\mathrm{KL}(\rho\,\|\,\pi)$ with $\pi\propto e^{-V}$. Its dissipation is the relative Fisher information $I(\rho\,|\,\pi) = \int|\nabla\log(\rho/\pi)|^2\,d\rho$, which is the squared Wasserstein gradient norm. A **log-Sobolev inequality** $\mathrm{KL}\le \frac{1}{2\lambda} I$ is therefore PL in Wasserstein space, and it gives $\mathrm{KL}(\rho_t\|\pi)\le e^{-2\lambda t}\,\mathrm{KL}(\rho_0\|\pi)$.

### Overparameterized networks

For a training loss $\mathcal L(w) = \frac12\|F(w)-y\|^2$ with $F:\mathbb R^p\to\mathbb R^n$ and $p\gg n$,
$\frac12\|\nabla\mathcal L\|^2 = \frac12 r^\top K(w)\,r \ge \lambda_{\min}(K(w))\,\mathcal L(w)$, where $r=F(w)-y$ and $K = DF\,DF^\top$ is the $n\times n$ neural tangent kernel Gram matrix. So **PL holds wherever $K(w)$ is uniformly positive definite**. For wide networks $K$ stays close to its initial value on a ball containing the training path, which gives local PL and linear convergence to zero loss. The global minimizers form a manifold (generically of dimension $p-n$), so strong convexity is impossible, but PL is natural.

The paper that prompted the chat, *Genericity of Polyak–Łojasiewicz inequalities for entropic mean-field neural ODEs*, says (per Claude's reading of it) that for generic data (an open dense set of initial conditions $(t_0,\gamma_0)$ in $[0,T]\times\mathcal P_3$) the entropically regularized training problem has a unique, stable minimizer, and that PL holds **locally** near it, measured in relative entropy. The PL comes from a log-Sobolev inequality for the Gibbs-form optimal control, so entropic regularization is essential, with no threshold on its size. Genericity comes from a "discriminating property" tied to universal approximation, plus a no-conjugate-point argument. The result gives exponential convergence of gradient flow only when started near the minimizer. Global convergence is left as a conjecture (LaSalle plus local PL).

## Cards

Q: State the PL inequality and the rate it gives for gradient descent.
A: $\frac12\|\nabla f(x)\|^2\ge\mu(f(x)-f^*)$ for all $x$. If $\nabla f$ is $L$-Lipschitz, step $1/L$ gives $f(x_k)-f^*\le(1-\mu/L)^k(f(x_0)-f^*)$: linear convergence without convexity.
See: Linear convergence without convexity

Q: Why does PL give exponential decay of $f-f^*$ along gradient flow?
A: $\frac{d}{dt}(f-f^*) = -\|\nabla f\|^2\le -2\mu(f-f^*)$, so Grönwall gives $e^{-2\mu t}$.
See: Linear convergence without convexity

Q: Why does PL force every critical point to be a global minimizer?
A: At a critical point the left side $\frac12\|\nabla f\|^2$ is $0$, so $\mu(f(x)-f^*)\le 0$, i.e. $f(x)=f^*$.

Q: $f(\theta)=\|A\theta-b\|^2$ with $A\in\mathbb R^{m\times n}$ of full row rank, $m<n$. Why is it PL even though its minimizers are not unique, and with what constant?
A: $\frac12\|\nabla f\|^2 = 2\|A^\top r\|^2\ge 2\lambda_{\min}(AA^\top)\|r\|^2$ with $r=A\theta-b$. So $\mu = 2\lambda_{\min}(AA^\top)=2\sigma_{\min}(A)^2$, globally. The minimizers form an affine subspace of dimension $n-m$.
See: PL is weaker than strong convexity

Q: What geometric growth condition does PL imply, and how is it proved?
A: Quadratic growth: $f(x)-f^*\ge\frac{\mu}{2}\operatorname{dist}(x,X^*)^2$. Along gradient flow $\frac{d}{dt}\sqrt{f-f^*}\le-\sqrt{\mu/2}\,\|\nabla f\|$, which bounds the length of the flow path from $x$ to $X^*$ by $\sqrt{2/\mu}\sqrt{f(x)-f^*}$.
See: Where PL sits among other conditions

Q: In what sense is a log-Sobolev inequality a PL inequality?
A: Fokker–Planck is the Wasserstein gradient flow of $\mathrm{KL}(\rho\|\pi)$, and the squared gradient norm is the Fisher information $I$. LSI, $\mathrm{KL}\le\frac{1}{2\lambda}I$, is PL for $\mathrm{KL}$ in Wasserstein space, and gives $\mathrm{KL}(\rho_t\|\pi)\le e^{-2\lambda t}\mathrm{KL}(\rho_0\|\pi)$.
See: Łojasiewicz exponents and log-Sobolev

Q: For $\mathcal L(w)=\frac12\|F(w)-y\|^2$, why is PL the natural condition for overparameterized networks?
A: $\frac12\|\nabla\mathcal L\|^2 = \frac12 r^\top K r\ge\lambda_{\min}(K)\,\mathcal L$, with $K=DF\,DF^\top$ the NTK Gram matrix. PL holds wherever $K$ is uniformly positive definite, while the minimizers form a manifold, which rules out strong convexity.
See: Overparameterized networks

Q: What does the "genericity of PL for entropic mean-field neural ODEs" result give, and what does it not give?
A: For generic data (an open dense set) there is a unique stable minimizer, and PL holds locally near it, via a log-Sobolev inequality from the entropic regularization. So gradient flow converges exponentially if started nearby. Global convergence from arbitrary initialization is only conjectured.
See: Overparameterized networks

## Quiz

Q: Which property does every PL function have?
- [ ] a unique minimizer
- [ ] convexity
- [x] every stationary point is a global minimizer
- [ ] a positive definite Hessian at each minimizer
E: Setting $\nabla f=0$ in PL forces $f=f^*$. The least-squares example has non-unique minimizers and a singular Hessian, and $(y-\sin x)^2$ is nonconvex.
See: PL is weaker than strong convexity

Q: For $f(\theta)=\|A\theta-b\|^2$ with $A$ wide and of full row rank, the best PL constant is…
- [x] $2\lambda_{\min}(AA^\top)$
- [ ] $2\lambda_{\min}(A^\top A)$
- [ ] $2\sigma_{\min}(A)$
- [ ] $\lambda_{\max}(AA^\top)$
E: The residual $r$ ranges over all of $\mathbb R^m$, and $\|A^\top r\|^2\ge\lambda_{\min}(AA^\top)\|r\|^2$. $A^\top A$ is singular when $A$ is wide, and $\sigma_{\min}(A)$ must be squared.
See: PL is weaker than strong convexity

Q: A log-Sobolev inequality for $\pi\propto e^{-V}$ is the PL inequality for…
- [x] $\mathrm{KL}(\cdot\,\|\,\pi)$ along its Wasserstein gradient flow (Fokker–Planck)
- [ ] $\mathrm{KL}(\cdot\,\|\,\pi)$ along its $L^2$ gradient flow
- [ ] the Fisher information along the heat flow
- [ ] the Wasserstein distance $W_2(\cdot,\pi)$ along geodesics
E: The Wasserstein gradient norm squared of $\mathrm{KL}$ is the relative Fisher information. LSI bounds $\mathrm{KL}$ by it, which is exactly PL.
See: Łojasiewicz exponents and log-Sobolev
