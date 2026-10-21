---
title: "The first cancer games: matrix games and replicator dynamics (1997–2012)"
tags: [cancer, evolutionary-game-theory, replicator-dynamics, tumour-heterogeneity]
created: 2026-10-21
related: [replicator-dynamics, evolutionarily-stable-strategies, two-strategy-games, cancer-public-goods-games, spatial-games-in-tumours, measuring-the-game, g-functions-darwinian-dynamics, cancer-somatic-evolution, mathematical-oncology-landscape]
source: "Literature survey for the guided tour 'Cancer through games, control and PDEs' (2026-10)."
---

## Article

The first fifteen years of evolutionary game theory in oncology are pairwise matrix games. Phenotypes are strategies, a payoff matrix $A$ encodes who benefits from whom, and heterogeneity is a mixed equilibrium of the [replicator equation](#/note/replicator-dynamics). This note collects the founding models and the critiques that eventually pushed the field toward measurement, density and space.

### Phenotypes as strategies

Tomlinson (1997) made the canonical move: cancer cells in a tumour play a game whose payoffs are growth rates. His first game has three strategies, cells that secrete a cytotoxin (at a cost), cells resistant to it (at a cost) and cells doing neither; depending on costs and benefits, each type can spread or persist in a polymorphism, and the paper notes that tumour regression is theoretically possible. The point was conceptual: frequency-dependent fitness means the fate of a clone depends on who else is present, so the tumour need not be a sequence of ever-fitter clonal sweeps (compare [somatic evolution](#/note/cancer-somatic-evolution)).

### Angiogenesis as a shared benefit (Tomlinson and Bodmer 1997)

Cells of type $A^+$ secrete an angiogenic factor at cost $i$; any interaction involving an $A^+$ cell gives benefit $j$ to both partners. The payoff matrix reproduced by Basanta and Deutsch (2008; the original text was not checked, so the matrix is from this secondary source) is
$$
\begin{array}{c|cc} & A^+ & A^- \\ \hline A^+ & 1-i+j & 1-i+j \\ A^- & 1+j & 1 \end{array}
$$
With $p$ the frequency of $A^+$, $W_{A^+}=1-i+j$ and $W_{A^-}=1+pj$, so $W_{A^+}-W_{A^-}=j-i-pj$ is decreasing in $p$ and vanishes at
$$
p^*=1-\frac{i}{j},
$$
which lies in $(0,1)$ exactly when the benefit exceeds the cost, $j>i$. Producers are favoured when rare and penalised when common: negative frequency dependence, hence a stable polymorphism. This is the paper's stated conclusion (both strategies persist when $j>i$). Its second game contrasts autocrine (self-only) with paracrine (neighbours-only) anti-apoptotic factors; purely paracrine production is altruistic and never selected, so no polymorphism arises there. Bach et al. (2001) extended the angiogenesis game to three players (benefit only if at least two of three produce, as reported by the same secondary source) and found that the angiogenic strategy can be lost even when $i<j$, depending on initial frequencies.

### Go versus grow (Basanta, Hatzikirou and Deutsch 2008)

The most reused matrix in the field. Proliferative cells share resources when they meet; motile cells pay a cost $c$ to move away. Payoff to the row player, with $b$ the base payoff:
$$
\begin{array}{c|cc} & \text{Proliferative} & \text{Motile}\\ \hline \text{Proliferative} & b/2 & b \\ \text{Motile} & b-c & b-c/2 \end{array}
$$
Let $x$ be the motile fraction. Then $W_P=(1-x)\tfrac b2+xb$ and $W_M=(1-x)(b-c)+x(b-\tfrac c2)$, so the replicator equation $\dot x=x(1-x)(W_M-W_P)$ has gain function
$$
W_M-W_P=\Big(\frac b2-c\Big)-x\,\frac{b-c}{2}.
$$
If $c<b/2$ the gain is positive at $x=0$ and equals $-c/2<0$ at $x=1$, so the interior zero
$$
x^*=\frac{b-2c}{b-c}
$$
is the unique stable rest point (a Hawk–Dove structure). With $b=1$, $c=0.2$: $x^*=0.75$. The motile fraction decreases in $c$ and vanishes at $c=b/2$; for $c\ge b/2$ the tumour is all proliferative. The therapeutic reading is to raise the cost of motility. A companion paper (Basanta, Simon, Hatzikirou and Deutsch 2008) added a glycolytic strategy (AG/GLY/INV) and found that invasiveness emerges more readily once glycolysis has appeared. The cellular-automaton version in the same paper, and the spatial transforms applied to it later, are in [spatial games](#/note/spatial-games-in-tumours).

### Normal cells as players (Dingli et al. 2009; Basanta et al. 2012)

Dingli, Chalub, Santos, Van Segbroeck and Pacheco (2009) put osteoclasts (OC), osteoblasts (OB) and myeloma cells (MM) in a $3\times3$ replicator game whose entries summarise cytokine exchanges, then reduce to two effective parameters: $\beta$, the net benefit OC gain from MM relative to OB, and $\delta$, the harm MM do to OB. Linear stability on the simplex gives: all monomorphic states unstable; the OB–OC (healthy) edge equilibrium stable iff $\beta<1$; the OC–MM (disease) edge equilibrium stable iff $\beta>1$, or $\beta<1$ and $\beta+\delta>1$, in which case an interior saddle makes the outcome depend on initial conditions. The clinical lesson follows from the structure of the replicator equation: rest points and their stability depend only on $A$, not on the population size. A therapy that only reduces the MM burden moves the state along the simplex but leaves the attractor in place; only changing $\beta$ or $\delta$ (blocking a cytokine) changes the game. Basanta, Scott, Fishman, Ayala, Hayward and Anderson (2012) did the same for prostate cancer with stroma as a third player (strategies S, D, I), finding three-type coexistence for intermediate parameter ranges and using the model to discuss timing of stroma-directed therapy.

### The critiques

Three objections were made early and shaped what came next.

1. **Payoffs are assigned, not measured.** McEvoy's letter (2009) on the myeloma game: fitness values are postulated, inferring them from observed ratios was beyond the technology, and cells are not rational players. Basanta and Deutsch (2008) list the same limitations: phenotypes must be known a priori, analysis is equilibria-only, and nothing mechanistic underlies the entries. The answer, a decade later, is the [game assay](#/note/measuring-the-game).
2. **No density.** The replicator equation tracks frequencies at fixed total size. Gerlee and Altrock (2017) show that dropping birth–death turnover changes time scales by a factor of order (death rate)$^{-1}$, so a replicator model can be right about equilibria and wrong about when they are reached. See [public goods games](#/note/cancer-public-goods-games).
3. **No space and only pairwise interactions.** Bach et al. (2003) found that a lattice version of the angiogenesis game behaves differently from the mean field, and Archetti (2013) that replacing the linear benefit by a sigmoid one gives several regimes instead of one.

What survives is the method: write a gain function, find where it changes sign, and ask which model parameter a therapy actually moves.

## Cards

Q: In the go-vs-grow game with base payoff $b$ and motility cost $c<b/2$, what is the stable motile fraction, and why is it stable?
A: $x^*=(b-2c)/(b-c)$. The gain function $W_M-W_P=(b/2-c)-x(b-c)/2$ is positive at $x=0$ and negative at $x=1$, so motile cells are favoured when rare and penalised when common (Hawk–Dove structure).
See: Go versus grow (Basanta, Hatzikirou and Deutsch 2008)

Q: What happens to the go-vs-grow equilibrium when the cost of motility reaches $c\ge b/2$?
A: The interior rest point leaves $(0,1)$ and the tumour becomes all proliferative. This is the model's therapeutic suggestion: raise the cost of motility.
See: Go versus grow (Basanta, Hatzikirou and Deutsch 2008)

Q: When does the Tomlinson–Bodmer angiogenesis game have a stable polymorphism of producers and non-producers, and why?
A: When the benefit $j$ of the shared factor exceeds its cost $i$. Producers are then favoured when rare and penalised when common (negative frequency dependence); the gain function is decreasing in the producer frequency.
See: Angiogenesis as a shared benefit (Tomlinson and Bodmer 1997)

Q: In Dingli et al.'s myeloma replicator game, when is the disease (OC–MM) state stable?
A: Iff $\beta>1$, or $\beta<1$ with $\beta+\delta>1$ (then an interior saddle makes the outcome depend on initial conditions). Here $\beta$ is the net benefit osteoclasts gain from myeloma cells relative to osteoblasts and $\delta$ the harm to osteoblasts.
See: Normal cells as players (Dingli et al. 2009; Basanta et al. 2012)

Q: Why, in a replicator-dynamics model of a tumour, does a therapy that only reduces the tumour burden not change the long-run outcome?
A: Rest points and their stability depend only on the payoff matrix, not on population size. Removing cells moves the state along the simplex but leaves the attractor in place. Only changing payoff entries (the game) changes the outcome.
See: Normal cells as players (Dingli et al. 2009; Basanta et al. 2012)

Q: What were the three early objections to matrix-game models of cancer?
A: Payoffs are assigned rather than measured (McEvoy 2009; Basanta and Deutsch 2008); the replicator equation ignores density and turnover, so time scales are wrong (Gerlee and Altrock 2017); interactions are pairwise and well mixed, whereas space and nonlinear benefits change the regimes (Bach 2003; Archetti 2013).
See: The critiques

Q: What can a fixed-matrix replicator model of a tumour never produce, that a continuous-trait model can?
A: New strategies. The phenotype set is fixed a priori and faces of the simplex are invariant, so nothing appears that was not there at the start. Continuous-trait models (G-functions, adaptive dynamics) let the trait itself move.
See: The critiques

## Quiz

Q: Go-vs-grow with $b=1$ and $c=0.2$: the stable motile fraction is…
- [x] $0.75$
- [ ] $0.8$
- [ ] $0.25$
- [ ] $0$, since motility is costly
E: $x^*=(b-2c)/(b-c)=(1-0.4)/(0.8)=0.75$. The distractor $0.8$ is $1-c/b$, which ignores the factor 2 from resource sharing.
See: Go versus grow (Basanta, Hatzikirou and Deutsch 2008)

Q: In the myeloma game with $\beta>1$, chemotherapy that kills most myeloma cells but changes no payoff…
- [x] delays relapse but leaves the OC–MM state as the only stable outcome
- [ ] restores the healthy OB–OC equilibrium if the burden falls below a threshold
- [ ] makes the interior point a stable coexistence
- [ ] changes the sign of $\beta$
E: For $\beta>1$ the OC–MM equilibrium is the only stable state regardless of $\delta$. Burden reduction moves the state but not the attractor; "resetting the clock" is the authors' phrase.
See: Normal cells as players (Dingli et al. 2009; Basanta et al. 2012)

Q: In the Tomlinson–Bodmer angiogenesis game the producers' fitness advantage over non-producers is $j-i-pj$. The interior equilibrium is…
- [x] $p^*=1-i/j$, stable, existing iff $j>i$
- [ ] $p^*=i/j$, stable, existing iff $j>i$
- [ ] $p^*=1-i/j$, unstable, existing iff $j>i$
- [ ] $p^*=j/i$, existing iff $i>j$
E: Set $j-i-pj=0$. The advantage decreases in $p$, so producers gain when rare and lose when common: stable.
See: Angiogenesis as a shared benefit (Tomlinson and Bodmer 1997)
