---
title: "Skip connections: ResNet, Highway, DenseNet, U-Net"
tags: [architectures, resnet, skip-connections, vanishing-gradients]
created: 2026-05-07
related: [deep-learning-theory-overview, score-based-diffusion, transformer-token-lanes, adjoint-backpropagation]
source: "Claude conversation: Skip connections in neural networks (2026-05). I asked whether linking non-adjacent layers had been tried."
---

## Article

In a plain feedforward network each layer feeds only the next: $x_{\ell+1} = F_\ell(x_\ell)$. Connecting non-adjacent layers is a well-explored idea, and some of the most important architectures are built on it.

### ResNet: add the input back

A **residual block** (He et al., 2015) computes

$$
x_{\ell+1} = x_\ell + F_\ell(x_\ell),
$$

so the block learns a correction to the identity. The motivation was the **degradation problem**: deeper plain networks had *higher training error* than shallower ones. That is an optimization failure, not overfitting, since a deeper net could in principle copy the shallow one and set its extra layers to the identity. A residual block represents the identity trivially ($F_\ell = 0$), so adding blocks should not make things worse. ResNets trained well at depths of hundreds of layers.

### Why gradients survive

The backward pass multiplies Jacobians. In a plain network,

$$
\frac{\partial x_L}{\partial x_\ell} = \prod_{k=\ell}^{L-1} DF_k,
$$

which tends to shrink or blow up exponentially in depth (vanishing or exploding gradients). In a ResNet each factor is $I + DF_k$. Expanding the product gives the identity plus higher-order terms, so there is always a direct path along which the gradient passes unchanged: a "gradient highway".

The same update reads as one explicit Euler step of $\dot x = F_t(x)$, the neural-ODE view of depth as time.

### Highway networks: gated skips

Highway networks (Srivastava et al., 2015) put a learned gate $T(x)=\mathrm{sigmoid}(W_Tx+b_T)$ on the skip:

$$
y = T(x)\odot H(x) + \big(1-T(x)\big)\odot x .
$$

With $T\equiv 0$ the layer is the identity, and with $T\equiv1$ it is a plain layer. A ResNet is the ungated version, with both paths always open and added.

### DenseNet: concatenate everything

In a **DenseNet** block (Huang et al., 2017) layer $\ell$ receives the **concatenation** of the feature maps of all earlier layers, $x_\ell = H_\ell([x_0,x_1,\dots,x_{\ell-1}])$. A block with $L$ layers has $L(L+1)/2$ direct connections, which is $O(L^2)$. Because later layers can reuse earlier features rather than relearn them, each layer can be thin. DenseNets matched or beat deeper ResNets with substantially fewer parameters. This is the "fewer layers, just as many connections" idea made concrete. Note the difference: ResNet **adds** (feature dimension fixed), while DenseNet **concatenates** (feature dimension grows).

### U-Net: long skips across scales

A **U-Net** is an encoder–decoder: it downsamples to coarse resolution, then upsamples back. Each encoder level is connected directly to the decoder level of the same resolution. Fine spatial detail, lost at the bottleneck, is passed across. This is essential for segmentation, and U-Nets are a common denoiser backbone in [diffusion models](#/note/score-based-diffusion).

### Connectivity is not just a count

Depth itself carries an inductive bias toward compositional, hierarchical features, so it is not purely a matter of counting connections. In a transformer every attention and MLP sublayer is residual, and attention adds *data-dependent* connectivity across tokens rather than a fixed wiring across layers.

## Cards

Q: Write the ResNet block update. What does the block learn?
A: $x_{\ell+1}=x_\ell+F_\ell(x_\ell)$. The block learns a correction $F_\ell$ to the identity map.
See: ResNet: add the input back

Q: What was the **degradation problem** that motivated ResNets, and why is it an optimization failure?
A: Deeper plain networks had higher *training* error than shallower ones. A deeper network could represent the shallow one exactly (extra layers set to the identity), so the failure is in optimization, not capacity or overfitting.
See: ResNet: add the input back

Q: Why do skip connections help gradients flow, in terms of Jacobians?
A: Plain nets backpropagate through $\prod_k DF_k$, which can vanish or explode exponentially with depth. With residual blocks each factor is $I+DF_k$, so the product contains the identity: a direct path for the gradient.
See: Why gradients survive

Q: How does a Highway layer differ from a residual block?
A: It gates the two paths: $y=T(x)\odot H(x)+(1-T(x))\odot x$ with a learned sigmoid gate $T$. A residual block is the ungated version, $x+F(x)$.
See: Highway networks: gated skips

Q: How is a DenseNet block wired, and why can it use fewer parameters?
A: Each layer takes the concatenation of all earlier layers' feature maps, giving $L(L+1)/2$ connections in an $L$-layer block. Features are reused rather than relearned, so each layer can be thin.
See: DenseNet: concatenate everything

Q: What do the skip connections in a U-Net connect, and why?
A: Each encoder level connects to the decoder level at the same spatial resolution. They carry fine detail lost at the coarse bottleneck, which is essential for segmentation and diffusion denoisers.
See: U-Net: long skips across scales

## Quiz

Q: How many direct connections does a DenseNet block with $L$ layers have?
- [ ] $L$
- [ ] $2L$
- [x] $L(L+1)/2$
- [ ] $2^L$
E: Each layer connects to every earlier layer (including the block input), which is quadratic in $L$. A plain chain has $L$.
See: DenseNet: concatenate everything

Q: The degradation problem in very deep plain networks was…
- [x] higher training error than shallower networks
- [ ] lower training error but higher test error (overfitting)
- [ ] exploding parameter counts
- [ ] lack of translation equivariance
E: Training error itself went up with depth, even though the deep network could represent the shallow one. This pointed to optimization, which residual connections fix.
See: ResNet: add the input back

Q: A Highway layer $y=T\odot H(x)+(1-T)\odot x$ with gate $T\equiv0$ computes…
- [x] the identity
- [ ] the plain layer $H(x)$
- [ ] the residual block $x+H(x)$
- [ ] zero
E: The gate closes the transform path. With $T\equiv1$ it is a plain layer, and a ResNet adds both paths without a gate.
See: Highway networks: gated skips
