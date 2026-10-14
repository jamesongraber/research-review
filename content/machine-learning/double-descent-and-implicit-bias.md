---
title: Double descent, benign overfitting and implicit bias
tags: [generalization, double-descent, implicit-bias, overparameterization, pac-bayes]
created: 2025-12-01
related: [deep-learning-theory-overview, polyak-lojasiewicz-inequality, neural-tangent-kernel-and-mean-field, entropy-solutions-physical-entropy]
source: "Claude conversation: Mathematical theory of deep learning (2025-12)."
---

## Article

Generalization is the widest gap between deep-learning practice and classical theory. Modern networks have far more parameters than training points and fit the data exactly, yet they predict well.

### The classical prediction

Uniform convergence bounds control the worst case over the class. For a loss in $[0,1]$, with probability $1-\delta$, every $f\in\mathcal F$ satisfies
$R(f)\le \hat R_n(f) + 2\,\mathfrak R_n(\mathcal F) + \sqrt{\log(1/\delta)/(2n)}$, where $\mathfrak R_n$ is the Rademacher complexity. Zhang et al. (2017) showed that standard image networks can fit the training set **with random labels** perfectly. So the class they search is rich enough to fit noise, its complexity is essentially maximal, and these bounds are vacuous. Yet with true labels the same networks generalize. **Any explanation must depend on the data and the training algorithm, not on the class alone.**

### Double descent

Plot test error against model size. Classically it is U-shaped: underfitting, then overfitting. Past the **interpolation threshold**, where the model can just fit the $n$ training points, the error peaks and then **falls again** as size grows. This is double descent.

It is not specific to neural networks. It already happens for minimum-norm least squares with $p$ features and $n$ samples. At $p=n$ the design matrix is square, and its smallest singular value is typically near $0$. The interpolant $\hat\theta = X^+ y$ amplifies label noise by roughly $1/\sigma_{\min}(X)$. For $p>n$ there are many interpolants, and the minimum-norm one gets smaller and more stable as $p$ grows. A quick simulation (isotropic Gaussian features, $n=30$, signal spread over 120 features, noise s.d. $0.5$) gave median test error about $1.4$ at $p=5$, about $80$ at $p=30$, and about $1.1$ at $p=120$.

### Benign overfitting

Interpolating noisy labels does not have to hurt. In linear regression, the minimum-norm interpolant can have near-optimal test error when the feature covariance has a few strong directions that carry the signal plus very many weak directions. The noise is then fitted by a spiky component spread across the weak directions, which barely affects predictions on new points. Bartlett–Long–Lugosi–Tsigler (2020) characterize this through effective-rank conditions on the covariance.

### Implicit bias of gradient descent

When there are many global minimizers, the algorithm picks one. **The optimizer is the regularizer.**

- **Least squares.** Gradient descent on $\frac12\|A\theta-b\|^2$, with $A$ wide and of full row rank and step $<2/\lambda_{\max}(A^\top A)$, changes $\theta$ only within the row space of $A$. From $\theta_0$ it converges to $A^+b + (I-A^+A)\theta_0$. **From $\theta_0=0$ it converges to the minimum-norm interpolant.**
- **Logistic regression on separable data.** The loss has no minimizer. $\|w_t\|\to\infty$, but $w_t/\|w_t\|$ converges to the **hard-margin SVM direction**, at the slow rate $1/\log t$ (Soudry et al., 2018).
- **Homogeneous networks.** The analogous result is directional convergence to a KKT point of a margin-maximization problem (Lyu–Li, 2020, and Ji–Telgarsky).

For a PDE analyst this is a selection principle, much like vanishing viscosity selecting the entropy solution among many weak solutions.

### Other threads

- **Flat minima.** SGD tends to find flat minima, and flatness correlates with generalization. But sharpness is not invariant under reparameterizations that leave the function unchanged. For ReLU nets, scaling one layer by $c$ and the next by $1/c$ changes the Hessian but not the function (Dinh et al., 2017). So flatness alone cannot be the explanation.
- **PAC-Bayes.** For a prior $P$ fixed before seeing data and any posterior $Q$ over weights, with probability $1-\delta$,
  $\mathbb E_Q R\le \mathbb E_Q\hat R_n + \sqrt{\big(\mathrm{KL}(Q\|P)+\log(2\sqrt n/\delta)\big)/(2n)}$. The complexity term is a KL divergence rather than a parameter count, and such bounds have been made non-vacuous for some real networks.
- **Grokking.** On some tasks, test accuracy jumps long after training loss has reached near zero. The chat said this delayed generalization also occurs outside neural networks (unverified).

## Cards

Q: Why do random-label experiments undercut classical uniform-convergence explanations of generalization?
A: Networks fit random labels perfectly, so the class they search has near-maximal complexity and Rademacher/VC bounds are vacuous. Yet with real labels they generalize, so the explanation must involve the data and the algorithm, not just the class.
See: The classical prediction

Q: What is double descent?
A: Test error vs model size first follows the classical U-curve, peaks at the interpolation threshold (the model just fits the $n$ points), then decreases again in the overparameterized regime.
See: Double descent

Q: In minimum-norm least squares, why does test error spike at $p=n$?
A: The square design matrix typically has smallest singular value near $0$, so the interpolant $X^+y$ amplifies noise by about $1/\sigma_{\min}(X)$. For $p>n$, extra directions make the minimum-norm interpolant smaller and more stable.
See: Double descent

Q: What is **benign overfitting** in linear regression?
A: Exact interpolation of noisy labels with near-optimal test error. It happens when the covariance has a few strong signal directions plus many weak ones that absorb the noise harmlessly.
See: Benign overfitting

Q: Gradient descent on underdetermined least squares, started at $0$: where does it converge, and why?
A: To the minimum-norm interpolant $A^+b$. The gradient $A^\top(A\theta-b)$ lies in the row space of $A$, so the iterates never leave it, and the only interpolant in the row space is the minimum-norm one.
See: Implicit bias of gradient descent

Q: Gradient descent on logistic loss with linearly separable data: what happens to $w_t$?
A: $\|w_t\|\to\infty$ (there is no finite minimizer), but the direction $w_t/\|w_t\|$ converges to the hard-margin SVM (max-margin) direction, at rate $1/\log t$.
See: Implicit bias of gradient descent

Q: Why can't "SGD finds flat minima" be the whole explanation of generalization?
A: Sharpness is not reparameterization invariant. In a ReLU net, scaling one layer by $c$ and the next by $1/c$ leaves the function unchanged but changes the Hessian arbitrarily.
See: Other threads

Q: What plays the role of model complexity in a PAC-Bayes bound?
A: $\mathrm{KL}(Q\|P)$ between the posterior over weights and a data-independent prior, in a term like $\sqrt{(\mathrm{KL}(Q\|P)+\log(2\sqrt n/\delta))/(2n)}$, rather than a parameter count.
See: Other threads

## Quiz

Q: Gradient descent (small enough step) on $\frac12\|A\theta-b\|^2$, with $A$ wide and of full row rank, started at $\theta_0$, converges to…
- [x] $A^+b+(I-A^+A)\theta_0$
- [ ] $A^+b$ regardless of $\theta_0$
- [ ] $\theta_0 + A^+b$
- [ ] nothing: it diverges because minimizers are not unique
E: The component of $\theta_0$ in the null space of $A$ is never touched. Only the row-space part is driven to $A^+b$. The limit is the minimum-norm interpolant only when $\theta_0=0$, or more generally when $\theta_0$ lies in the row space.
See: Implicit bias of gradient descent

Q: In the double-descent curve, the test-error peak sits…
- [ ] at the bias–variance optimum
- [x] at the interpolation threshold, where the model can just fit the training data
- [ ] where the number of parameters is $\sqrt n$
- [ ] only in the limit of infinitely many parameters
E: For least squares the peak is at $p=n$, where the design matrix is square and badly conditioned.
See: Double descent

Q: For gradient descent on logistic loss with separable data, which statement is true?
- [ ] $w_t$ converges to the max-margin vector
- [x] $w_t/\|w_t\|$ converges to the max-margin direction
- [ ] $w_t$ converges to a finite minimizer of the loss
- [ ] $w_t/\|w_t\|$ converges to the least-squares direction
E: The loss is driven to $0$ only as $\|w\|\to\infty$, so only the direction converges. It does so slowly, at rate $1/\log t$.
See: Implicit bias of gradient descent
