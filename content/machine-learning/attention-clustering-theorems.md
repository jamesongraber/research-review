---
title: Token clustering in self-attention dynamics
tags: [transformers, attention, clustering, consensus, kuramoto, metastability]
created: 2026-05-29
related: [attention-gradient-flow-energy, transformer-mckean-vlasov-model, transformer-head-measure, polyak-lojasiewicz-inequality]
source: "Claude conversation: Transformers as McKean–Vlasov equations (2026-05). Theorem statements checked against Geshkovski–Letrouit–Polyanskiy–Rigollet, 'A mathematical perspective on Transformers' (arXiv 2312.10794)."
---

## Article

Because attention climbs an aggregation energy (see [the gradient-flow note](#/note/attention-gradient-flow-energy)), the particles tend to **clump**. The precise theorems have narrow hypotheses, and those hypotheses matter.

### The standard setting

Geshkovski, Letrouit, Polyanskiy and Rigollet (GLPR) study the single-head dynamics on $S^{d-1}$ with **$Q = K = V = I$** and inverse temperature $\beta \ge 0$:

$$
\dot x_i = P^\perp_{x_i}\Big(\frac{1}{Z_i}\sum_j e^{\beta\langle x_i,x_j\rangle}x_j\Big), \qquad Z_i = \sum_k e^{\beta\langle x_i,x_k\rangle}
$$

("SA"), and the unnormalized variant with $Z_i$ replaced by $n$ ("USA"). The weights are **the same at every depth** (an autonomous system), and the statements are about $t\to\infty$, i.e. infinite depth.

### What is proved (as stated in the GLPR survey)

- **$d\ge3$, any $\beta\ge0$, any $n\ge2$:** for Lebesgue-almost every initial configuration, all tokens converge to a single common point. GLPR credit this to Markdahl–Thunberg–Gonçalves (2017) and Criscitiello–Rebjock–McRae–Boumal (2024). The idea: the energy is analytic, so trajectories converge to a critical point by Łojasiewicz, and the non-consensus critical points are strict saddles, so by a stable-manifold argument they attract only a null set of initial data.
- **"Almost every" cannot be dropped.** There are non-clustered equilibria where the attention forces cancel, e.g. two antipodal tokens $x_2 = -x_1$. They are unstable, but they exist.
- **$d \ge n$, i.i.d. uniform initialization, $\beta>0$:** almost surely there is **exponential** convergence to one point, $|x_i(t)-x^*|\le Ce^{-\lambda t}$. This extends to arbitrary $Q,K$ with $V = I$. Mechanism: points inside an open hemisphere collapse ("cone collapse"), and by Wendel's theorem $n\le d$ uniform points lie in an open hemisphere almost surely. The rate is poor for large $\beta$, roughly $\lambda \sim e^{-\beta}$.
- **$d=2$ (the circle):** in angles, USA reads $\dot\theta_i = -\frac1n\sum_j e^{\beta\cos(\theta_i-\theta_j)}\sin(\theta_i-\theta_j)$. At $\beta = 0$ this is the **Kuramoto model** of identical oscillators. In the survey, consensus for a.e. initial data on the circle is proved only for small $\beta$ ($\beta \lesssim 1$) or large $\beta$ ($\beta \gtrsim n^2$). Later work may have closed this gap.

### Metastability: the time scale that matters

For large $\beta$, simulations show **two time scales**. A few clusters form quickly, then they merge pairwise over very long times. In a quick simulation made for this note ($d=3$, $n=16$, $\beta=9$), 16 tokens became 7 clusters by $t\approx5$ and 3 by $t\approx100$, and there were still 3 at $t = 8000$. A real network has finite depth, so the **metastable multi-cluster state** may be more relevant than eventual consensus. GLPR list a rigorous account of metastability as an open problem. Later work studies it in the mean-field PDE near uniform initial data, where $\beta$ sets the cluster structure (e.g. Bruno–Pasqualotto–Agazzi, arXiv 2410.23228).

### Other geometries

Without normalization, in $\mathbb{R}^d$ with time-rescaled dynamics, earlier GLPR work finds other limit shapes. With $V = I$ and $Q^\top K \succ 0$, tokens go to the vertices of a convex polytope. If the top eigenvalue of $V$ is positive and simple (plus a sign condition on $Q$ and $K$), they cluster on parallel hyperplanes.

### When clustering fails

The theorems assume **shared, depth-independent weights**, no MLP, and no causal mask. Massucco et al. (arXiv 2605.18870) let weights vary with depth. When the weights settle down, with $\int_0^\infty|\dot\Theta_t|\,dt<\infty$, limit points are stationary for the limiting weights. Their numerics (as described in the chat) show relaxation for mean-reverting (Ornstein–Uhlenbeck) weights and **no persistent clustering for oscillating weights**. Causal masking also changes the picture. So **collapse is a property of autonomous, symmetric idealizations, not something deep attention must do.**

## Cards

Q: In the clustering theorems for self-attention on the sphere, what is assumed about the weights across layers?
A: They are the same at every depth (an autonomous system), usually $Q=K=V=I$ with inverse temperature $\beta$, and the conclusions concern $t\to\infty$.
See: The standard setting

Q: State the clustering result for self-attention ($Q=K=V=I$) on $S^{d-1}$ with $d\ge3$.
A: For any $n\ge2$ and any $\beta\ge0$, for almost every initial configuration, all tokens converge to a single common point as $t\to\infty$. This holds for both the normalized and the unnormalized dynamics.
See: What is proved (as stated in the GLPR survey)

Q: Why is "almost every initial configuration" needed in the consensus theorem?
A: Non-clustered equilibria exist, e.g. two antipodal tokens, where the attention forces cancel. They are unstable critical points (strict saddles) of the energy, so they attract only a null set.
See: What is proved (as stated in the GLPR survey)

Q: What is the proof strategy for convergence to consensus for a.e. initial data?
A: The energy is analytic and increases along the flow, so by Łojasiewicz each trajectory converges to a critical point. Non-consensus critical points are strict saddles, so the set of initial data converging to them has measure zero.
See: What is proved (as stated in the GLPR survey)

Q: Why does clustering happen with probability one when $d \ge n$ and the tokens start i.i.d. uniform on $S^{d-1}$?
A: By Wendel's theorem, $n\le d$ uniform points lie in an open hemisphere almost surely. Points in an open hemisphere collapse to one point under the dynamics, at an exponential rate.
See: What is proved (as stated in the GLPR survey)

Q: What classical model is self-attention on the circle ($d=2$) at $\beta = 0$?
A: The Kuramoto model of identical oscillators: $\dot\theta_i = -\frac1n\sum_j\sin(\theta_i-\theta_j)$. For $\beta>0$ each coupling carries the weight $e^{\beta\cos(\theta_i-\theta_j)}$.
See: What is proved (as stated in the GLPR survey)

Q: Why is metastability arguably more relevant to real transformers than eventual consensus?
A: For large $\beta$, a few clusters form quickly and then merge only over very long times. A network of finite depth sees the multi-cluster metastable state, not the $t\to\infty$ limit.
See: Metastability: the time scale that matters

## Quiz

Q: Which hypothesis is **not** needed for the "a.e. initial data converges to one cluster" theorem on $S^{d-1}$?
- [ ] $d \ge 3$
- [ ] Weights constant in depth
- [x] Small inverse temperature $\beta$
- [ ] $Q = K = V = I$
E: For $d\ge3$ the result holds for every $\beta\ge0$. Restrictions on $\beta$ appear on the circle ($d=2$) and in the rate estimates.
See: What is proved (as stated in the GLPR survey)

Q: With depth-dependent weights that oscillate persistently, what did the time-dependent model (Massucco et al.) observe numerically?
- [ ] Faster collapse to a single cluster
- [x] No relaxation and no persistent clustering
- [ ] Clustering onto parallel hyperplanes
- [ ] Blow-up of the tokens off the sphere
E: Relaxation (and clustering) was seen for mean-reverting Ornstein–Uhlenbeck weights. Persistent oscillation in the weights prevented it, so collapse is not inevitable once weights vary with depth.
See: When clustering fails

Q: For large $\beta$, what does the self-attention flow typically do on realistic time scales?
- [ ] Converges to the uniform measure
- [ ] Collapses to one point in time $O(1/\beta)$
- [x] Quickly forms a few clusters that persist for a very long time before merging
- [ ] Oscillates periodically
E: This is the metastability picture. The uniform measure minimizes the energy, while the dynamics climbs it.
See: Metastability: the time scale that matters
