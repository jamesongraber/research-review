---
title: Spatial structure in tumour games
tags: [cancer, spatial-games, evolutionary-graph-theory, pair-approximation, tumour-heterogeneity]
created: 2026-10-21
related: [evolutionary-graph-theory, tomlinson-matrix-games, cancer-public-goods-games, measuring-the-game, moran-fixation-probability, space-and-trait-models, tumour-containment-theory, adaptive-therapy-trials-evidence, hele-shaw-limit-tumour-growth]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

A tumour is not well mixed: cells sit in a tissue, interact with neighbours, and meet boundaries (vessels, basement membranes, organ capsules). In the theory of [cooperation on graphs](#/note/evolutionary-graph-theory), structure can rescue cooperation (the $b/c>k$ rule). The recurring finding in oncology is that it does not do so reliably, and that what structure mainly does is change *which effective game* is being played, with different games at the edge and in the bulk.

### Lattice games: space does not rescue producers (Bach et al. 2003)

Bach, Sumpter, Alsner and Loeschcke (2003) put the [Tomlinson–Bodmer angiogenesis game](#/note/tomlinson-matrix-games) on a lattice (described by Basanta and Deutsch 2008 as $100\times100$ with competition for vacant sites). The spatial results differ from the mean-field prediction, and, in contrast with the Nowak–May lattice Prisoner's Dilemma, space does *not* significantly favour the cooperating (producing) phenotype. Archetti (2016) reached the same conclusion for public goods on Voronoi networks: with diffusible goods, results on irregular (Voronoi) tessellations resemble those on regular lattices rather than scale-free graphs, and the *shape of the nonlinear benefit* dominates the network geometry. In cancer the "cooperation" is a diffusible molecule shared over a neighbourhood anyway, so the well-mixed [public goods game](#/note/cancer-public-goods-games) with the right group size already captures most of what space contributes. Mansury, Diggory and Deisboeck (2006) embedded go-vs-grow payoffs in an agent-based glioma model and found tumour expansion non-monotone in the payoff to stationary cells. You et al. (2017) compared an agent-based model with its ODE counterpart for the three-type prostate cancer model behind the first adaptive-therapy trial; the comparison is numerical.

### Edge effects via the Ohtsuki–Nowak transform (Kaznatcheev, Scott and Basanta 2015)

Ohtsuki and Nowak (2006) showed that on a $k$-regular graph with death–birth updating, in the limit of large populations and weak selection, the pair-approximation dynamics of a matrix game $A$ equal the *well-mixed replicator dynamics of a transformed matrix*. In the form used by Kaznatcheev et al. (verified from the paper),
$$
\mathrm{ON}_k(A)=A+\frac{1}{k-2}\big(\Delta\mathbf 1^\top-\mathbf 1\Delta^\top\big)+\frac{1}{(k+1)(k-2)}\big(A-A^\top\big),
$$
where $\Delta$ is the vector of diagonal entries $a_{ii}$. Entrywise the correction is $b_{ij}=\frac{a_{ii}-a_{jj}}{k-2}+\frac{a_{ij}-a_{ji}}{(k+1)(k-2)}$: a local-dispersal term (offspring land next to parents, so a type interacts more with itself) and a finite-sampling term; both vanish as $k\to\infty$, recovering the inviscid game. Pair approximation is exact on Bethe lattices (infinite regular trees) and accurate on $k$-regular random graphs; the transform is a weak-selection result and no error estimate exists for strong selection or irregular geometries (open as of 2026).

Apply it to go-vs-grow with INV (motile) and AG (proliferative) strategies, $a_{II}=b-c/2$, $a_{IA}=b-c$, $a_{AI}=b$, $a_{AA}=b/2$. The inviscid game has a stable polyclonal equilibrium with motile fraction $(b-2c)/(b-c)$ when $c<b/2$ and is all-AG otherwise. On a graph the Hawk–Dove window becomes $\frac{k+1}{k^2+1}<\frac cb<\frac{k+1}{2k+1}$, and inside it the stable proportion of invasive cells is
$$
p^*_k=\frac{b-2c}{b-c}+\frac{1}{k-2}-\frac{1}{(k+1)(k-2)}\cdot\frac{2c}{b-c},
$$
larger than the inviscid value for every finite $k$: spatial structure favours the invasive strategy here. Below the window all cells become INV, above it all AG.

Now the edge. A cell at a static boundary has fewer neighbours than a cell in the bulk; Kaznatcheev et al. take $k=8$ in the bulk and $k=5$ at the edge as illustrative values (a convex boundary should reduce $k$ more than a concave one). Since the transform depends on $k$, bulk and edge play different effective games. Recomputed example with $c/b=0.535$: the bulk window ends at $9/17\approx0.529$, so the bulk is all proliferative; the edge window extends to $6/11\approx0.545$, and $p^*_5\approx0.055$. A tumour with no invasive cells in its bulk has a polyclonal rim with about 5% invasive cells. The paper illustrates this on a prostate adenocarcinoma metastasis in bone marrow and concludes that pathology which does not separate edge from bulk cells can underestimate invasive cells. Applying a single-$k$ transform separately to the boundary region is a modelling assumption, not a derived result.

### Reductive and effective, again

The transform is also the clearest instance of the distinction in [measuring the game](#/note/measuring-the-game): $A$ is the reductive (contact-level) game and $\mathrm{ON}_k(A)$ the effective game. Measured payoff matrices are effective ones; to recover $A$ one must invert the transform under its hypotheses, and Kaznatcheev (2018) notes that this fails when spatial effects are slow and time-dependent. Hernández-Rivera et al. (2026) and Muros et al. (2017) use spatial game models inside model predictive control of treatment (listed, not examined here).

### Space and adaptive therapy

The spatial question returns in chapter 4 with a different object: not cooperation but competitive suppression of resistant cells by sensitive ones, which is a local phenomenon. Agent-based studies of adaptive therapy (Bacevic et al. 2017; Gallaher et al. 2018; Strobl et al. 2022) ask whether resistant cells trapped inside a sensitive mass are suppressed more or less than the well-mixed model predicts; those results are discussed in [tumour containment theory](#/note/tumour-containment-theory) and [the trial evidence](#/note/adaptive-therapy-trials-evidence). The free-boundary formulation of a spatial game (a moving tumour front instead of a static edge) does not exist in this literature; the mechanical models of [Hele-Shaw type](#/note/hele-shaw-limit-tumour-growth) have fronts but no game.

## Cards

Q: What does the Ohtsuki–Nowak transform do, and under what hypotheses?
A: It maps a matrix game $A$ on a $k$-regular graph to a matrix $\mathrm{ON}_k(A)$ whose well-mixed replicator dynamics approximate the graph dynamics (pair approximation, exact on Bethe lattices) under death–birth updating, large populations and weak selection.
See: Edge effects via the Ohtsuki–Nowak transform (Kaznatcheev, Scott and Basanta 2015)

Q: Write the Ohtsuki–Nowak correction to a payoff entry and name its two terms.
A: $b_{ij}=\dfrac{a_{ii}-a_{jj}}{k-2}+\dfrac{a_{ij}-a_{ji}}{(k+1)(k-2)}$: a local-dispersal term (offspring near parents, so types self-interact more) and a finite-sampling term. Both vanish as $k\to\infty$.
See: Edge effects via the Ohtsuki–Nowak transform (Kaznatcheev, Scott and Basanta 2015)

Q: Why can a tumour whose bulk has no invasive cells have invasive cells at a static boundary (Kaznatcheev, Scott and Basanta 2015)?
A: Cells at a boundary have fewer neighbours (smaller $k$), and the transformed game depends on $k$. With $c/b$ just above the bulk's Hawk–Dove window but inside the edge's, the bulk is all proliferative while the rim has a polyclonal equilibrium.
See: Edge effects via the Ohtsuki–Nowak transform (Kaznatcheev, Scott and Basanta 2015)

Q: In the transformed go-vs-grow game, how does the invasive fraction compare with the well-mixed value?
A: $p^*_k=\frac{b-2c}{b-c}+\frac1{k-2}-\frac{2c}{(k+1)(k-2)(b-c)}$ exceeds the inviscid $\frac{b-2c}{b-c}$ for every finite $k$: spatial structure favours the motile strategy in this game.
See: Edge effects via the Ohtsuki–Nowak transform (Kaznatcheev, Scott and Basanta 2015)

Q: Does spatial structure rescue cooperation (growth-factor production) among cancer cells, as it does in the lattice Prisoner's Dilemma?
A: Not reliably. Bach et al. (2003) found no significant advantage to producers on a lattice; Archetti (2016) found that on Voronoi networks the shape of the nonlinear benefit matters more than the geometry. Diffusible goods are already shared over a neighbourhood, which the well-mixed PGG with the right group size captures.
See: Lattice games: space does not rescue producers (Bach et al. 2003)

Q: In what sense is $A\mapsto\mathrm{ON}_k(A)$ the reductive-to-effective map?
A: $A$ is the contact-level (reductive) game and $\mathrm{ON}_k(A)$ the population-level (effective) game whose non-spatial dynamics reproduce the spatial process. Measured matrices are effective; recovering $A$ means inverting the transform under its hypotheses.
See: Reductive and effective, again

Q: What is missing from the theory of spatial tumour games from a PDE point of view?
A: Error estimates for the pair-approximation transform outside weak selection and regular graphs, and any free-boundary formulation with a moving tumour front instead of a static edge.
See: Space and adaptive therapy

## Quiz

Q: Go-vs-grow on a 5-regular graph with $c/b=0.4$: the transformed stable invasive fraction is about…
- [x] $0.59$, versus $0.33$ well mixed
- [ ] $0.33$, unchanged by structure
- [ ] $0.17$, lower than well mixed
- [ ] $0$, since $c/b$ is above the Hawk–Dove window
E: $0.4$ lies in the window $(6/26,6/11)\approx(0.23,0.55)$. $p^*_5=\frac13+\frac13-\frac{1}{18}\cdot\frac{0.8}{0.6}\approx0.593$.
See: Edge effects via the Ohtsuki–Nowak transform (Kaznatcheev, Scott and Basanta 2015)

Q: As the degree $k\to\infty$, the Ohtsuki–Nowak transformed game…
- [x] tends to the original well-mixed game
- [ ] becomes a pure coordination game
- [ ] favours the invasive strategy ever more strongly
- [ ] loses its interior equilibrium
E: Both correction terms carry a factor $1/(k-2)$ and vanish; a graph with infinitely many neighbours is well mixed.
See: Edge effects via the Ohtsuki–Nowak transform (Kaznatcheev, Scott and Basanta 2015)

Q: The Ohtsuki–Nowak transform is a result valid…
- [x] under weak selection on regular graphs (pair approximation), with no published error bound for strong selection or Voronoi geometries
- [ ] for arbitrary selection strength on any graph
- [ ] only on square lattices
- [ ] only for symmetric payoff matrices
E: Pair approximation is exact on Bethe lattices and accurate on $k$-regular random graphs; the strong-selection, irregular-geometry case used in simulations has no estimate.
See: Edge effects via the Ohtsuki–Nowak transform (Kaznatcheev, Scott and Basanta 2015)
