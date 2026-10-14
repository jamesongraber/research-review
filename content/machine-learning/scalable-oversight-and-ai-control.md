---
title: "Scalable oversight: debate and AI control"
tags: [alignment, debate, complexity-theory, ai-control, game-theory]
created: 2026-08-17
related: [reward-incentives-and-agency, reasoning-models-and-test-time-compute, rlhf-and-rlaif]
source: "Claude conversation: Mathematical foundations of AI alignment and behavior (2026-08). I argued that a smarter agent's tasks can never be fully verified."
---

## Article

RL can only reinforce what the overseer can evaluate. My worry: intelligence just *is* the ability to do things that less capable observers cannot fully understand, so as models get stronger, verification must fail. That assumption is exactly what the **scalable oversight** literature tests, and it is the most mathematical corner of alignment.

### Verification asymmetry

Checking can be far easier than doing. That is the content of NP: a short certificate is easy to verify even when it is hard to find. AlphaZero reached superhuman play while trained against a "verifier" that cannot play at all: the rules of the game, which only decide who won. So the asymmetry sometimes favors the weaker party. The question is which tasks have such structure, and whether it can be manufactured for tasks that don't.

### AI safety via debate

Irving, Christiano and Amodei (2018): two copies of a strong model argue opposite sides, and a weak judge (a human, modeled as a polynomial-time verifier) decides who won. The intuition is that the honest debater need not convince the judge of everything. It only has to point at the single step where the opponent's argument fails, and the judge checks that one step. The complexity-theoretic analogy:

- a judge checking one answer plus a certificate can decide NP;
- debate with polynomially many rounds and optimal play can decide **PSPACE** (alternating polynomial time);
- adding cross-examination reaches NEXP, analogous to multi-prover interactive proofs (credited in the chat to Barnes–Christiano; unverified).

### Doubly-efficient debate

The original analysis allows the debaters unbounded computation, and the honest side may need exponential work. Brown-Cohen, Irving and Piliouras (*Scalable AI Safety via Doubly-Efficient Debate*, 2023) give protocols for verifying computations, including stochastic ones the judge cannot run itself. In them **the honest debater needs only polynomially many steps**, while the dishonest debater gains nothing even from exponentially many.

### The obfuscated-arguments problem

A dishonest debater can present a long argument with a flaw hidden somewhere among many plausible steps. The honest debater may know the argument is wrong (for example, by knowing the conclusion is false) yet be unable to *locate* the flawed step efficiently, so the judge sees no refutation. This is my "can't verify a smarter agent" intuition in rigorous form, and as of 2026 it is open. Proposed fixes include "prover–estimator debate" (2025, unverified), which adds a stability condition on arguments.

### Eliciting latent knowledge

*Eliciting Latent Knowledge* (Christiano, Cotra, Xu, 2021) asks how to train a model to report what it internally "knows" when that differs from what a human observer would conclude. Its method will feel familiar: propose a training strategy, construct a pathological model that defeats it, and iterate.

### AI control: when verification fails anyway

**AI control** (Greenblatt et al., 2024) does not assume the model is aligned. It assumes the model **may be actively trying to subvert** its overseers, and asks for deployment protocols that remain safe anyway. Example protocols:

- **Trusted monitoring**: a weaker but trusted model scores each action for suspicion, and the most suspicious ones go to a limited budget of human audits.
- **Trusted editing**: the trusted model rewrites suspicious outputs.
- **Untrusted monitoring**: another copy of the strong model monitors, with safeguards against collusion.

Safety is evaluated as a red-team versus blue-team game. It has been formalized as a partially observable stochastic game. As of 2026 the open problems are game-theoretic: collusion between untrusted monitors, steganographic signaling, and equilibrium analysis of when to attack.

## Cards

Q: Give an example where a weak verifier successfully trained a superhuman system.
A: AlphaZero. Its only training signal came from the game rules deciding who won, a "verifier" that cannot play at all. Checking an outcome can be much easier than producing it.
See: Verification asymmetry

Q: Why can debate let a weak judge supervise strong debaters?
A: The honest debater only needs to point to the single step where the opponent's argument fails, and the judge checks just that step instead of the whole argument.
See: AI safety via debate

Q: What complexity class does debate with a polynomial-time judge and optimal play capture, versus direct judging?
A: Polynomial-round debate captures PSPACE (alternating polynomial time). A judge checking a single answer with a certificate captures only NP.
See: AI safety via debate

Q: What does **doubly-efficient** debate guarantee?
A: The honest debater wins using only polynomially many steps of computation, while the dishonest debater gains no advantage even from exponentially many steps.
See: Doubly-efficient debate

Q: What is the **obfuscated-arguments problem**?
A: A dishonest debater hides a flaw among many plausible steps. The honest debater may know the argument is wrong but cannot efficiently find the flawed step, so the judge sees no refutation.
See: The obfuscated-arguments problem

Q: How does the AI-control agenda differ from alignment?
A: It does not try to make the model's goals good. It assumes the model may be intentionally adversarial and designs deployment protocols (monitoring, auditing, editing) that are safe anyway, evaluated by red-team versus blue-team games.
See: AI control: when verification fails anyway

Q: What is **trusted monitoring** in AI control?
A: A weaker, trusted model scores each action of the strong untrusted model for suspicion, and the most suspicious actions are sent to a limited budget of human audits.
See: AI control: when verification fails anyway

## Quiz

Q: With optimal play and a polynomial-time judge, polynomial-round debate can decide problems in…
- [ ] P
- [ ] NP
- [x] PSPACE
- [ ] all decidable problems
E: Alternating moves between two adversarial provers give alternating polynomial time, which equals PSPACE. A single prover with a certificate gives NP.
See: AI safety via debate

Q: The AI-control agenda's core assumption is that…
- [ ] the model's goals have been verified to be aligned
- [x] the model may be intentionally trying to subvert oversight
- [ ] humans can audit every action
- [ ] the trusted monitor is at least as capable as the untrusted model
E: Control aims for safety even against an adversarial model, using weaker trusted monitors and limited audits.
See: AI control: when verification fails anyway

Q: The obfuscated-arguments problem arises because…
- [x] the honest debater may be unable to locate the flawed step efficiently
- [ ] the judge cannot check any single step
- [ ] debates must last exponentially many rounds
- [ ] the dishonest debater always has more compute
E: Each step is checkable. The difficulty is finding which step to challenge in a long, plausible argument.
See: The obfuscated-arguments problem
