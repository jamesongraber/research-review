---
title: Uniform convergence on bounded-support measures
tags: [wasserstein-space, topology, optimal-transport, function-spaces]
created: 2026-10-07
related: [weak-kam-wasserstein, hj-wasserstein-applications, master-equation-and-rational-expectations, transformer-hjb-wasserstein]
source: "Claude conversation: Wasserstein space topology (2026-10). Came up while writing a talk abstract."
---

## Article

Let $\mathcal P_2 = \mathcal P_2(\mathbb R^d)$ carry the metric $W_2$, and let $\mathcal P_{2,R}$ be the measures supported in the **closed** ball $\overline B_R(0)$. On $C_b(\mathcal P_2)$ put the seminorms

$$
p_R(g) = \sup_{m \in \mathcal P_{2,R}} |g(m)|, \qquad R > 0.
$$

### The construction

No standard name for this topology turned up. It is a special case of Bourbaki's **$\mathfrak S$-topology**: the topology of uniform convergence on the sets of a family $\mathfrak S$, here $\mathfrak S = \{\mathcal P_{2,R} : R>0\}$. Since it is defined by seminorms, it is **locally convex**.

Each $\mathcal P_{2,R}$ is **$W_2$-compact**. The family is tight, so Prokhorov gives weak compactness, and the set is weakly closed because $\overline B_R$ is closed. On measures supported in one fixed compact set, $W_2$ convergence is the same as weak convergence, since the second moments are uniformly bounded and uniformly integrable. With the open ball the set would not be closed: $\delta_{x_n}$ with $|x_n|\uparrow R$ escapes.

### Why it is Hausdorff

The seminorms separate points. The compactly supported measures $\bigcup_R \mathcal P_{2,R}$ are $W_2$-dense in $\mathcal P_2$: push $\mu$ forward by the projection onto $\overline B_R$, which costs $W_2^2 \le \int_{|x|>R}|x|^2\,d\mu \to 0$. So if $p_R(g)=0$ for every $R$, the continuous function $g$ vanishes on a dense set, and $g=0$.

### Strictly coarser than compact-open

The compact-open topology uses uniform convergence on **all** $W_2$-compact sets. Not every compact set lies in some $\mathcal P_{2,R}$. With $e_1$ a unit vector,

$$
\mu_n = (1-n^{-3})\,\delta_0 + n^{-3}\,\delta_{n e_1} \xrightarrow{W_2} \delta_0,
$$

because moving the mass $n^{-3}$ a distance $n$ costs $W_2^2(\mu_n,\delta_0) = n^{-3}\cdot n^2 = 1/n$. So $K=\{\mu_n\}\cup\{\delta_0\}$ is compact, but its supports are unbounded. The family $\{\mathcal P_{2,R}\}$ is therefore not cofinal among compact sets.

The topologies really differ. Take $\psi_k\in C_b(\mathbb R^d)$ with $0\le\psi_k\le1$, $\psi_k=0$ on $\overline B_{k-1}$ and $\psi_k=1$ off $B_k$, and set $g_k(\mu)=\min\{1,\,k^3\!\int\psi_k\,d\mu\}$. Then $p_R(g_k)=0$ once $k\ge R+1$, so $g_k\to0$ in the $\mathfrak S$-topology. But $g_k(\mu_k)=1$, so $g_k$ does not converge to $0$ uniformly on $K$.

### Why the exhaustion is not enough: no local compactness

If $\mathcal P_2$ were **hemicompact**, with every compact set inside some $\mathcal P_{2,R}$, the two topologies would agree. It is not. A metrizable hemicompact space is locally compact, and $\mathcal P_2$ is not: for any $r>0$,

$$
\nu_n = (1-n^{-2})\,\delta_0 + n^{-2}\,\delta_{n r e_1}
$$

has $W_2(\nu_n,\delta_0)=r$ for every $n$, and $\nu_n\to\delta_0$ weakly. A $W_2$-limit of a subsequence would have to be $\delta_0$, which is at distance $r$. So no closed $W_2$-ball is compact. Compare the two sequences. Mass $n^{-3}$ at distance $n$ has second moment $1/n\to0$. Mass $n^{-2}$ at distance $nr$ keeps second moment $r^2$, which escapes to infinity and breaks uniform integrability.

### Related topologies

- **Buck's strict topology** uses seminorms $\sup|\phi g|$ with weights $\phi$ vanishing at infinity, rather than sups over a fixed family. It is a different construction.
- Adding a global bound $\sup_n\|g_n\|_\infty<\infty$ to uniform convergence on compacts gives the "buc" convergence of Feng–Kurtz. The *mixed topology* (Wiweger) is a locally convex version of the same idea. (Both attributions unverified.)

### How to say it in an abstract

The safest phrasing is "the topology of uniform convergence on measures with uniformly bounded support". If notation is available, write "uniform convergence on the sets $\mathcal P_2(\overline B_R)$, $R>0$". Avoid "compact-open" or "locally uniform" without a qualifier. Readers will take them to mean uniform convergence on all $W_2$-compact sets, which is strictly finer. If there is room, add "(strictly coarser than compact-open)".

## Cards

Q: On $C_b(\mathcal P_2)$, what is the topology given by the seminorms $\sup_{m\in\mathcal P_{2,R}}|g(m)|$, $R>0$, as a general construction? Does it have a standard name?
A: No standard name was found. It is Bourbaki's $\mathfrak S$-topology (uniform convergence on the sets of a family $\mathfrak S$) with $\mathfrak S=\{\mathcal P_{2,R}\}$. It is locally convex.
See: The construction

Q: Why is $\mathcal P_{2,R}$ (measures supported in $\overline B_R$) compact in $W_2$?
A: It is tight, so Prokhorov gives weak compactness, and it is weakly closed. With supports in one compact set, second moments are uniformly bounded and uniformly integrable, so $W_2$ convergence equals weak convergence there.
See: The construction

Q: Why is the topology of uniform convergence on the $\mathcal P_{2,R}$ Hausdorff?
A: Compactly supported measures are $W_2$-dense in $\mathcal P_2$. So a continuous $g$ vanishing on every $\mathcal P_{2,R}$ is identically zero, and the seminorms separate points.
See: Why it is Hausdorff

Q: Is uniform convergence on the $\mathcal P_{2,R}$ the same as the compact-open topology on $C_b(\mathcal P_2)$? Give the key counterexample.
A: No, it is strictly coarser. $\mu_n=(1-n^{-3})\delta_0+n^{-3}\delta_{n}$ converges to $\delta_0$ in $W_2$, so $\{\mu_n\}\cup\{\delta_0\}$ is compact. Its supports are unbounded, so it lies in no $\mathcal P_{2,R}$.
See: Strictly coarser than compact-open

Q: Show that $\mu_n=(1-n^{-3})\delta_0+n^{-3}\delta_n$ converges to $\delta_0$ in $W_2$.
A: The only coupling with $\delta_0$ moves the mass $n^{-3}$ a distance $n$. So $W_2^2(\mu_n,\delta_0)=n^{-3}\cdot n^2=1/n\to0$.
See: Strictly coarser than compact-open

Q: Why is $(\mathcal P_2(\mathbb R^d),W_2)$ not locally compact?
A: $\nu_n=(1-n^{-2})\delta_0+n^{-2}\delta_{nre_1}$ stays at distance exactly $r$ from $\delta_0$ but converges weakly to $\delta_0$. So it has no $W_2$-convergent subsequence, and no closed ball is compact. The second moment escapes to infinity.
See: Why the exhaustion is not enough: no local compactness

Q: How do you describe this topology briefly in a talk abstract without misleading, and which phrases should you avoid?
A: Say "the topology of uniform convergence on measures with uniformly bounded support". Avoid an unqualified "compact-open" or "locally uniform", which suggest uniform convergence on all $W_2$-compacts, a strictly finer topology. If there is room, add "(strictly coarser than compact-open)".
See: How to say it in an abstract

## Quiz

Q: Which sequence converges to $\delta_0$ in $W_2$ on $\mathbb R$?
- [ ] $(1-n^{-2})\delta_0+n^{-2}\delta_n$
- [x] $(1-n^{-3})\delta_0+n^{-3}\delta_n$
- [ ] $(1-n^{-1})\delta_0+n^{-1}\delta_n$
- [ ] $(1-n^{-1})\delta_0+n^{-1}\delta_{n^2}$
E: $W_2^2$ to $\delta_0$ is the second moment: $1/n$, $1$, $n$ and $n^3$ respectively. All four converge weakly to $\delta_0$, but only the first's second moment tends to $0$.
See: Strictly coarser than compact-open

Q: Compared with the compact-open topology on $C_b(\mathcal P_2)$, uniform convergence on the sets $\mathcal P_{2,R}$ is…
- [x] strictly coarser
- [ ] strictly finer
- [ ] the same, because each $\mathcal P_{2,R}$ is compact and they exhaust a dense set
- [ ] not comparable
E: Each $\mathcal P_{2,R}$ is compact, so every $p_R$ is a compact-open seminorm, giving "coarser". Equality would need every compact set to sit inside some $\mathcal P_{2,R}$, and $\{(1-n^{-3})\delta_0+n^{-3}\delta_n\}\cup\{\delta_0\}$ does not.
See: Strictly coarser than compact-open

Q: The exhaustion $\{\mathcal P_{2,R}\}$ fails to give the compact-open topology because $(\mathcal P_2, W_2)$ is not…
- [ ] separable
- [ ] complete
- [x] hemicompact (indeed not locally compact)
- [ ] a geodesic space
E: $\mathcal P_2$ is a complete separable geodesic space. It is not locally compact, and a metrizable hemicompact space would be.
See: Why the exhaustion is not enough: no local compactness
