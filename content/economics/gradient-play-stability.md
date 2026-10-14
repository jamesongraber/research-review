---
title: "Gradient play: Nash equilibria vs. stable equilibria"
tags: [learning-in-games, continuous-games, nash-equilibrium, monotone-operators]
created: 2026-08-07
related: [nash-stability-across-literatures, potential-games, adaptive-learning-e-stability, replicator-kl-lyapunov, replicator-microfoundations]
source: "Claude conversation: MFG without rational expectations, et al (2026-08). The owner's question: call a Nash equilibrium stable if it is a stable point of the players' gradient flow."
---

## Article

The owner's idea: in an $N$-player game where player $i$ picks $x_i$ in a continuous space with payoff $J_i(x_1,\dots,x_N)$, let each player follow their own gradient, $\dot x_i = \partial_i J_i(x)$, and call a Nash equilibrium *stable* if it is a stable rest point of this flow. This has a long history.

### Pseudo-gradient and Rosen's theorem

$F(x) = (\partial_1 J_1(x), \dots, \partial_N J_N(x))$ is the **pseudo-gradient** (Rosen, *Econometrica* 1965). The flow $\dot x = F(x)$ is called **gradient play**, individual gradient ascent or naive learning. Rosen's hypothesis is **diagonal strict concavity (DSC)**:
$$
\langle F(x) - F(y),\, x - y\rangle < 0 \quad (x \ne y),
$$
i.e. $-F$ is strictly monotone. Under DSC the Nash equilibrium is unique and globally asymptotically stable for the (projected) gradient flow. Rosen allowed weighted fields $(r_i\,\partial_i J_i)_i$; the weights matter (see below).

### Differential Nash and stable differential Nash

Ratliff–Burden–Sastry (Allerton 2013; *IEEE TAC* 2016): a **differential Nash equilibrium** has $\partial_i J_i = 0$ and $\partial_i^2 J_i \prec 0$ for every $i$. It is **stable** if in addition the Jacobian $DF(x^*)$ is Hurwitz. That is the owner's definition exactly.

$DF$ has blocks $\partial_j\partial_i J_i$. It is **not symmetric and not a Hessian**, so the Nash condition (on the diagonal blocks) and the stability condition (on the spectrum) are **logically independent**. Mazumdar–Ratliff–Sastry (*SIAM J. Math. Data Sci.* 2020) show that gradient learning can converge to non-Nash points and be repelled from Nash points. So the refinement should be stated as a conjunction (Nash **and** Hurwitz).

### Two examples

Take $J_1 = -\tfrac a2 x^2 + bxy$ and $J_2 = -\tfrac c2 y^2 + dxy$, so $DF = \begin{pmatrix} -a & b \\ d & -c \end{pmatrix}$.

- $a = c = 1$, $b = d = 2$: each payoff is strictly concave in the player's own variable and the best responses $x = 2y$, $y = 2x$ meet only at $0$, so the origin is the unique Nash equilibrium. But the eigenvalues are $1$ and $-3$: **Nash, unstable.**
- $a = -1$, $c = 3$, $b = 1$, $d = -4$: trace $-2$ and determinant $1$, so the eigenvalues are $-1, -1$ and the origin attracts. But $\partial_1^2 J_1 = 1 > 0$: player 1 sits at a local *minimum* of their own payoff. **Stable, not Nash.**

### Symmetric and antisymmetric parts

Balduzzi et al. (ICML 2018) split $DF = S + A$ into symmetric and antisymmetric parts.

- **$A = 0$: potential games.** $F = \nabla\Phi$ ([potential games](#/note/potential-games)), and the flow is gradient ascent of $\Phi$. Stability means $\Phi$ has a nondegenerate strict local max. That implies the diagonal blocks are negative definite, so **stable implies Nash** here. The converse fails: a Nash point can be a **saddle** of $\Phi$. The first example above is of this kind. It has $b = d$, so it is a potential game with $\Phi = -\tfrac12 x^2 - \tfrac12 y^2 + 2xy$, and its instability is a saddle of $\Phi$, not rotation.
- **$S = 0$: Hamiltonian games.** Then $\frac{d}{dt}\tfrac12|F|^2 = F^\top DF\,F = F^\top A F = 0$: $|F|$ is conserved and trajectories cycle instead of converging. Example: $J_1 = xy$, $J_2 = -xy$ gives $F = (y, -x)$, whose orbits are circles.

The rotational part is what Symplectic Gradient Adjustment corrects. Earlier, imaginary parts of eigenvalues were used to explain oscillation in GAN training (Mescheder–Nowozin–Geiger; Nagarajan–Kolter, both 2017).

### Learning rates matter

Stability is a property of the learning rule, not just of the game. Rescaling to $\dot x_i = \tau_i\,\partial_i J_i$ multiplies $DF$ by $\operatorname{diag}(\tau)$, which can flip stability. For **two** scalar players at a differential Nash point it cannot: the trace of $\operatorname{diag}(\tau)DF$ stays negative and the sign of its determinant is unchanged. With **three** players it can. With $J_i = -\tfrac12 x_i^2 + x_i\sum_{j\ne i} M_{ij}x_j$ and
$$
M = \begin{pmatrix} -1 & 5 & 3 \\ -4 & -1 & 3 \\ 1 & 0 & -1 \end{pmatrix},
$$
$DF = M$ is Hurwitz (eigenvalues $\approx -1.42 \pm 4.19i$ and $-0.15$). But with $\tau = (1,1,100)$ the eigenvalues are $\approx 0.40 \pm 1.66i$ and $-102.8$: unstable.

### The variational-inequality view

For games where each $J_i$ is concave in $x_i$ on convex strategy sets, $x^*$ is a Nash equilibrium iff $\langle F(x^*), x - x^*\rangle \le 0$ for all feasible $x$. This is a variational inequality for the monotone-operator setting (Facchinei–Pang). For gradient play: strong monotonicity of $-F$ gives exponential convergence. Mere monotonicity allows cycling (the Hamiltonian example), but averaged iterates and extragradient methods still converge. The Lasry–Lions monotonicity condition is the mean-field analogue of Rosen's DSC and plays the same role: uniqueness, plus convergence of learning.

## Cards

Q: What is Rosen's **diagonal strict concavity** for the pseudo-gradient $F = (\partial_i J_i)_i$, and what does it give?
A: $\langle F(x) - F(y), x - y\rangle < 0$ for $x \ne y$, i.e. $-F$ strictly monotone. It gives a unique Nash equilibrium that is globally asymptotically stable for (projected) gradient play. It is the finite-player ancestor of Lasry–Lions monotonicity.
See: Pseudo-gradient and Rosen's theorem

Q: Define a (stable) differential Nash equilibrium.
A: $\partial_i J_i(x^*) = 0$ and $\partial_i^2 J_i(x^*) \prec 0$ for every $i$. It is stable if, in addition, $DF(x^*)$ is Hurwitz.
See: Differential Nash and stable differential Nash

Q: Why are "differential Nash" and "stable under gradient play" independent conditions?
A: Nash constrains only the diagonal blocks $\partial_i^2 J_i$; stability constrains the spectrum of the whole $DF$, whose off-diagonal blocks $\partial_j\partial_i J_i$ make it non-symmetric and not a Hessian.
See: Differential Nash and stable differential Nash

Q: Give a 2-player example that is Nash but unstable under gradient play.
A: $J_1 = -\tfrac12 x^2 + 2xy$, $J_2 = -\tfrac12 y^2 + 2xy$. Each payoff is concave in the player's own variable and the origin is the unique Nash equilibrium, but $DF = \begin{pmatrix} -1 & 2 \\ 2 & -1\end{pmatrix}$ has eigenvalue $1$. It is a potential game, and the origin is a saddle of $\Phi$.
See: Two examples

Q: Give a 2-player example that is stable under gradient play but not Nash.
A: $J_1 = \tfrac12 x^2 + xy$, $J_2 = -\tfrac32 y^2 - 4xy$: $DF = \begin{pmatrix} 1 & 1 \\ -4 & -3\end{pmatrix}$ has eigenvalues $-1, -1$, but $\partial_1^2 J_1 = 1 > 0$, so player 1 is at a local minimum.
See: Two examples

Q: In a potential game ($DF$ symmetric), how are stability and Nash related?
A: Stable means a nondegenerate strict local max of $\Phi$, which implies Nash. A Nash point can be unstable, though: a saddle of $\Phi$ that is a maximum in each player's own coordinates.
See: Symmetric and antisymmetric parts

Q: Why does gradient play cycle in a Hamiltonian game ($DF$ antisymmetric)?
A: $\frac{d}{dt}\tfrac12|F|^2 = F^\top DF\, F = 0$, so $|F|$ is conserved along trajectories and they cannot approach a rest point (e.g. circles for $J_1 = xy$, $J_2 = -xy$).
See: Symmetric and antisymmetric parts

Q: Can player-specific learning rates $\dot x_i = \tau_i \partial_i J_i$ change whether a differential Nash equilibrium is stable?
A: Not for two scalar players (the trace stays negative and the determinant keeps its sign). Yes from three players on: $\operatorname{diag}(\tau)DF$ can lose the Hurwitz property.
See: Learning rates matter

## Quiz

Q: The game $J_1 = -\tfrac12 x^2 + 2xy$, $J_2 = -\tfrac12 y^2 + 2xy$. At the origin…
- [x] it is the unique Nash equilibrium, but gradient play is unstable there
- [ ] it is stable but not Nash
- [ ] it is a stable Nash equilibrium
- [ ] it is not an equilibrium of any kind
E: $DF = \begin{pmatrix}-1&2\\2&-1\end{pmatrix}$ has eigenvalues $1, -3$. The game is a potential game, and the origin is a saddle of $\Phi = -\tfrac12x^2 - \tfrac12y^2 + 2xy$.
See: Two examples

Q: In an exact potential game with smooth payoffs, which implication holds for gradient play?
- [ ] Nash $\Rightarrow$ stable
- [x] stable (nondegenerate) $\Rightarrow$ Nash
- [ ] Nash $\Leftrightarrow$ stable
- [ ] neither direction holds
E: A Hurwitz Hessian of $\Phi$ has negative definite diagonal blocks. A saddle of $\Phi$ can still be Nash, so the converse fails.
See: Symmetric and antisymmetric parts

Q: What does $DF$ antisymmetric (a Hamiltonian game) imply for gradient play?
- [ ] convergence to the unique Nash equilibrium
- [ ] divergence to infinity
- [x] conservation of $|F|^2$, so trajectories cycle
- [ ] the game is a potential game
E: $F^\top A F = 0$ for antisymmetric $A$, so $\frac{d}{dt}|F|^2 = 0$.
See: Symmetric and antisymmetric parts
