---
title: Where the word "martingale" comes from
tags: [history-of-mathematics, probability, martingales, etymology]
created: 2026-03-18
related: [bayesian-credences]
source: "Claude conversation: History of the martingale term (2026-03). Checked against Mansuy, 'The origins of the word martingale' (JEHPS 2009), as far as I could."
---

## Article

The probabilists' "martingale" was borrowed from gamblers. The gamblers' word is old French slang whose deeper origin is genuinely obscure. The main secondary source is Roger Mansuy's article "The origins of the word 'martingale'" (Journal Électronique d'Histoire des Probabilités et de la Statistique, 2009). Most colorful details below are flagged because they could not be checked against it directly.

### In probability: Lévy, Ville, Doob

- **Paul Lévy** studied the underlying concept in the 1930s, in his work on sums of dependent random variables, but did not use the name.
- **Jean Ville** introduced the word into probability in his 1939 thesis *Étude critique de la notion de collectif*, a critique of von Mises' frequency-based "collectives". His chapter V has the definition, the name and an almost-sure limit theorem together. Further claims are unverified: that he first wrote "game system or martingale" before keeping only "martingale", that he extended the notion to continuous time, and that he had met gamblers with "winning" roulette systems.
- **Joseph Doob** developed most of the theory, starting with a 1940 paper that cites Ville's thesis. He took the name from Ville. Mansuy reports Doob's anecdote: his former student Paul Halmos mailed him a long leather strap that forks at one end, which is how Doob learned that a martingale is also a piece of horse tack.

The link to gambling is substantive. A mathematical martingale is the fortune of a gambler in a **fair game**: $\mathbb E[X_{n+1}\mid\mathcal F_n]=X_n$. In Ville's setting, martingales are capital processes of betting strategies, and they test whether a sequence is random.

### The gambling system

As a betting system, "martingale" was current in 18th-century France. The fourth edition (1762) of the Académie française dictionary says that playing the martingale means always staking everything one has lost. The best-known version is **doubling after each loss** on an even-money bet. Mansuy notes that the historical record does not make clear exactly which strategy the word first named. Earlier dictionary entries, around 1750, are reported (unverified).

### Why doubling does not beat a fair game

On a fair coin, stake $1,2,4,\dots$ until the first win. After $k$ losses and then a win, the net gain is $2^k-(2^k-1)=+1$. The first win time $T$ is a.s. finite, so the strategy wins $1$ almost surely. Yet the fortune $X_n$ is a martingale, so how can $\mathbb E[X_T]=X_0+1$?

Optional stopping fails. $T$ is unbounded, the stakes are unbounded, and the stopped process is not uniformly integrable. The drawdown before the win is $2^{T-1}-1$, with $\mathbb E[2^{T-1}]=\sum_{k\ge1}2^{k-1}2^{-k}=\infty$. With a credit limit of $N$ doublings, you win $1$ with probability $1-2^{-N}$ and lose $2^N-1$ with probability $2^{-N}$. The expectation is exactly $0$.

### Other meanings and the etymology

Established senses include a horse-tack strap (running from the girth between the forelegs to the reins or noseband, to stop the horse from raising its head too high), a stay in a sailing ship's rigging under the jib-boom, and a half-belt on the back of a coat.

On the origin, Mansuy calls the trail very slim. It leads to the Provençal expression *jouga a la martegalo*, "to play in an absurd, incomprehensible way", plausibly tied to the town of **Martigues**, whose inhabitants had a reputation for naïveté. Rabelais mentions breeches *à la martingale* (with a rear flap, said to come from Martigues). Further claims are unverified: an Arabic source *al-marta'a* ("the fastening") for the harness sense, a 17th-century prophetess who called herself "La Martingale", a slang sense "courtesan", and the dating of the equestrian sense to the late 1500s. The honest summary is that **the etymology is obscure**, and the Provençal/Martigues hypothesis is the best but unproven candidate.

## Cards

Q: Who introduced the word "martingale" into probability theory, and where?
A: Jean Ville, in his 1939 thesis *Étude critique de la notion de collectif* (a critique of von Mises' collectives). He took it from gamblers' vocabulary.
See: In probability: Lévy, Ville, Doob

Q: What were Lévy's and Doob's roles in the history of martingales?
A: Lévy studied the concept in the 1930s (sums of dependent variables) without naming it. Doob developed most of the theory, from 1940 on, and took the name from Ville's thesis.
See: In probability: Lévy, Ville, Doob

Q: What did "jouer à la martingale" mean in 18th-century French gambling?
A: Always staking everything you have lost. In its best-known form, you double the bet after each loss so the first win recovers all losses plus the original stake.
See: The gambling system

Q: The doubling strategy on a fair coin wins $+1$ almost surely. Why doesn't this contradict $X_n$ being a martingale?
A: Optional stopping fails. $T$ (the first win) is unbounded, the stakes are unbounded, and the stopped process is not uniformly integrable. The expected drawdown $\mathbb E[2^{T-1}]-1$ is infinite.
See: Why doubling does not beat a fair game

Q: With a credit limit of $N$ doublings, what is the doubling strategy's outcome distribution on a fair coin?
A: Win $+1$ with probability $1-2^{-N}$, lose $2^N-1$ with probability $2^{-N}$. The mean is exactly $0$.
See: Why doubling does not beat a fair game

Q: How did Doob learn that a martingale is also a piece of horse tack?
A: Halmos, his former student, mailed him a long leather strap that forks at one end, an equestrian martingale. It stops a horse from raising its head too high.
See: In probability: Lévy, Ville, Doob

Q: What is the state of knowledge on the deeper etymology of "martingale"?
A: Obscure. The best but slim lead is Provençal *jouga a la martegalo* ("to play absurdly"), possibly tied to the town of Martigues and its reputation for naïveté.
See: Other meanings and the etymology

## Quiz

Q: The term "martingale" entered probability theory through…
- [ ] Lévy's 1934 work on dependent sums
- [x] Ville's 1939 thesis on von Mises' collectives
- [ ] Doob's 1953 book *Stochastic Processes*
- [ ] Kolmogorov's 1933 *Grundbegriffe*
E: Lévy had the concept without the name. Doob developed and popularized the theory, taking the name from Ville.
See: In probability: Lévy, Ville, Doob

Q: Which hypothesis of the optional stopping theorem does the doubling strategy (stop at the first win) violate?
- [ ] $T<\infty$ almost surely
- [ ] $\mathbb E[T]<\infty$
- [x] boundedness of $T$ or uniform integrability of the stopped process
- [ ] the martingale property of the fortune
E: $T$ is geometric, so $T<\infty$ a.s. and $\mathbb E[T]=2$. But the increments are unbounded, so the "$\mathbb E[T]<\infty$ plus bounded increments" version does not apply either, and $X_{T\wedge n}$ is not UI.
See: Why doubling does not beat a fair game

Q: Which statement about the origin of the word "martingale" is best supported?
- [ ] It comes from the Arabic *al-marta'a*, "the fastening"
- [ ] It was coined by Ville for the equestrian strap
- [x] Its etymology is obscure, with a slim Provençal/Martigues lead
- [ ] It was named after a 17th-century prophetess called La Martingale
E: The Arabic and prophetess stories circulate but could not be verified. Ville borrowed a gambling term, and Doob learned of the equestrian sense only later.
See: Other meanings and the etymology
