---
title: What does a 90% credence mean?
tags: [bayesian-epistemology, subjective-probability, philosophy-of-probability, dutch-book]
created: 2026-03-16
related: [martingale-word-history, adaptive-learning-e-stability]
source: "Claude conversation: Interpreting subjective probability in Bayesian epistemology (2026-03). Steelmanning Bayesians against my skepticism."
---

## Article

**The objection.** A frequentist probability has practical meaning: repeat the experiment, and everyone agrees whether the coin landed heads. A statement like "I am 90% confident global warming is man-made" seems to attach a precise number to a vague feeling. Bayes' rule then looks like an overly rigorous restatement of "update when you learn things". What is the strongest Bayesian reply, and where does it run out?

### The betting interpretation

Ramsey and de Finetti made credence **operational**. A credence of $0.9$ in $P$ means you regard as exactly fair a bet that wins \$1 if $P$ and loses \$9 if not, since $0.9\cdot1-0.1\cdot9=0$. The number becomes a behavioral commitment. If you profess 90% but bet like someone at 50% when real stakes are on the table, the stated credence is insincere or confused.

### Coherence and Dutch books

The key constraint is **coherence**. If your betting rates violate the probability axioms, a bookie can sell you a set of bets, each fair by your own lights, that loses money in every outcome (a **Dutch book**). Example: credence $0.6$ in $P$ and $0.6$ in $\neg P$. You pay $0.6$ for each \$1 ticket, $1.20$ in total, and exactly one ticket pays \$1, so you lose \$0.20 for sure. Conversely, coherent (probabilistic) rates admit no Dutch book. This is a consistency constraint with practical teeth. It does not tell you *which* numbers to hold.

### Bayes' rule as a corrective, not a novelty

The Bayesian concedes that updating is common sense. The point is that people do it badly, in systematic ways: they neglect base rates, and they confuse $P(E\mid H)$ with $P(H\mid E)$ (the prosecutor's fallacy). Standard example: a disease with 1% prevalence and a test with 90% sensitivity and a 9% false-positive rate. Then

$$
P(D\mid +)=\frac{0.01\cdot0.9}{0.01\cdot0.9+0.99\cdot0.09}\approx0.09,
$$

not 90%. The formalism earns its keep by diagnosing such errors.

### Washing out of priors, and when it fails

Convergence results ("washing out of priors"; formally, Doob's consistency theorem and Blackwell–Dubins merging of opinions) say that agents with different priors who see the **same growing stream of evidence**, and share a model of how the evidence bears on the hypotheses, come to agree. In merging, the key hypothesis is that the agents agree on which events have probability zero. This is what disciplines subjectivity for the coin: likelihoods are anchored by repeatable trials, and the data overwhelm the prior.

For one-off questions (did Caesar cross the Rubicon? P(doom)?) the mechanism is missing. The evidence is finite, and the **likelihoods themselves**, such as $P(\text{this archaeological find}\mid\text{crossed})$, are judgment calls. Two Bayesians with the same evidence can therefore disagree forever. The framework then supplies the *form* of rigorous reasoning without the substance, and can launder intuitions into numbers that look derived. That Bayesianism is underspecified about where priors and likelihoods come from is a standard criticism in philosophy of science (associated with John Earman; unverified).

### Where the debate settles

- Bayesian epistemology is a defensible **logic of consistency**: if you have credences, they should cohere and update by conditionalization. It is not a **source** of meaningful values for singular events.
- The Bayesian rejoinder: dropping the numbers doesn't remove the subjectivity. A historian weighing sources is doing implicit probabilistic aggregation, and the formalism makes it explicit and criticizable. Wildly divergent P(doom) estimates are themselves informative: they show the question is prior-dominated.
- The skeptic's rejoinder: probability language for non-repeatable events is at best a metaphor for "degree of confidence". The intersubjective test that gives a coin's 50% its meaning is absent.
- Rejecting quantification is not the same as rejecting rational inquiry. Careful and careless reasoning about Caesar still differ even if neither yields a number.

### Practical upshot for news

You don't need to compute anything to use the core idea. Evidence $E$ moves you only through the **likelihood ratio** $P(E\mid H)/P(E\mid\neg H)$. A headline that the source would publish whether or not $H$ is true (a brand built on one view) has ratio near $1$ and is nearly weightless. Ask what would change the author's mind. If nothing would, it is advocacy, not evidence. And ask whether the question bears on any decision you face.

## Cards

Q: On the betting interpretation (Ramsey, de Finetti), what does "credence 0.9 in $P$" mean operationally?
A: You regard as exactly fair a bet that wins \$1 if $P$ is true and loses \$9 if it is false. The expected value at $0.9$ is $0.9-0.9=0$.
See: The betting interpretation

Q: What is a Dutch book, and what does the Dutch book argument establish?
A: A set of bets, each fair by your own credences, that loses money in every outcome. One exists iff your credences violate the probability axioms. So it enforces **coherence**, not any particular numbers.
See: Coherence and Dutch books

Q: Build a Dutch book against someone with credence 0.6 in $P$ and 0.6 in $\neg P$.
A: Sell them a \$1-if-$P$ ticket and a \$1-if-$\neg P$ ticket at \$0.60 each. They pay \$1.20, and exactly one ticket pays \$1, so they lose \$0.20 whatever happens.
See: Coherence and Dutch books

Q: Prevalence 1%, sensitivity 90%, false-positive rate 9%. Roughly what is $P(\text{disease}\mid+)$, and what fallacy does the naive answer commit?
A: About 9%: $0.009/(0.009+0.0891)$. Answering 90% confuses $P(+\mid D)$ with $P(D\mid +)$ and neglects the base rate (the prosecutor's fallacy).
See: Bayes' rule as a corrective, not a novelty

Q: What does "washing out of priors" require, and why does it fail for "Did Caesar cross the Rubicon?"
A: It requires a growing stream of shared evidence, with likelihoods anchored by a shared model (agents agreeing on what is impossible). For Caesar the evidence is finite and the likelihoods are themselves subjective judgments, so agents with the same evidence need not converge.
See: Washing out of priors, and when it fails

Q: What is the fairest one-line verdict on Bayesian epistemology for one-off events?
A: It is a logic of consistency (coherence plus conditionalization), not a source of meaningful probability values. For singular events the numbers rest on judgments with no intersubjective test.
See: Where the debate settles

Q: In Bayesian terms, why is a headline from a source that would publish it regardless of the facts nearly worthless as evidence?
A: Its likelihood ratio $P(E\mid H)/P(E\mid\neg H)$ is close to $1$, and only that ratio moves a posterior.
See: Practical upshot for news

## Quiz

Q: The Dutch book argument shows that a rational agent's credences must…
- [ ] match long-run frequencies
- [x] satisfy the probability axioms
- [ ] converge to the truth as evidence accumulates
- [ ] equal those of other agents with the same evidence
E: It is a coherence constraint only. Convergence and agreement are what the washing-out results add, under extra hypotheses. Matching frequencies is calibration, a different requirement.
See: Coherence and Dutch books

Q: Two Bayesians see the same evidence about a one-off historical event and never converge. The most basic reason is that…
- [ ] one of them is incoherent
- [ ] Bayes' rule does not apply to historical events
- [x] their likelihoods for the evidence are themselves subjective and differ
- [ ] their priors are both non-zero on each hypothesis
E: Coherent agents can disagree indefinitely when the likelihoods are not anchored by a shared model and the evidence stream is finite. Non-zero priors on each hypothesis are a precondition for convergence, not an obstacle to it.
See: Washing out of priors, and when it fails

Q: A credence of $0.75$ in $P$ makes which bet exactly fair?
- [ ] win \$1 if $P$, lose \$1 if not
- [x] win \$1 if $P$, lose \$3 if not
- [ ] win \$3 if $P$, lose \$1 if not
- [ ] win \$1 if $P$, lose \$4 if not
E: $0.75\cdot1-0.25\cdot3=0$. In general, at credence $c$, risking $c$ to win $1-c$ is fair. Scaled to win \$1, you risk $c/(1-c)$.
See: The betting interpretation
