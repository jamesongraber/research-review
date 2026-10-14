---
title: Reasoning models, test-time compute and neuro-symbolic AI
tags: [llm, chain-of-thought, reinforcement-learning, test-time-compute, neuro-symbolic]
created: 2026-03-11
related: [llm-pretraining-and-scaling-laws, rlhf-and-rlaif, scalable-oversight-and-ai-control]
source: "Claude conversations: Beyond next-token prediction in modern LLMs (2026-03) and LLMs and symbolic reasoning in AGI development (2026-06)."
---

## Article

Why can a "next-token predictor" write good code? Part of the answer is scale (see [pretraining](#/note/llm-pretraining-and-scaling-laws)). The rest is a family of techniques that let a model spend computation on reasoning and that train it on signals that can be checked.

### Chain of thought

Prompting a model to write out intermediate steps before answering ("let's think step by step") sharply improves multi-step reasoning (Wei et al., 2022). One standard explanation: a transformer does a bounded amount of computation per generated token, fixed by its depth. Writing intermediate tokens lets the total computation grow with the length of the output, with the written text acting as a scratchpad.

### Reasoning models and verifiable rewards

A **reasoning model** is trained with RL to produce a long reasoning trace before its final answer. Two kinds of reward signal:

- **Outcome reward**: score only the final answer.
- **Process reward model (PRM)**: score each intermediate step. Lightman et al. (2023) found that process supervision beat outcome supervision for picking the best of many sampled solutions on competition math.

**RL with verifiable rewards (RLVR)** uses an outcome reward that can be computed automatically: does the final answer match, does the code pass its tests, does the proof check. No human or learned judge is needed, so the signal is cheap and plentiful. It is harder to fool than a learned judge, but not impossible: a weak test suite can be passed by special-casing the tests, a form of reward hacking.

*Correction to the chat:* it named DeepSeek-R1 as an example of process reward models. The R1 paper reports the opposite: it used rule-based outcome rewards (answer correctness plus format), and its authors found PRMs impractical at scale because of labeling cost and reward hacking.

### Why coding benefits most

Coding is **verifiable**. A pipeline can generate problems, sample solutions, run tests, and keep what passes. This produces training signal and filtered **synthetic data** without a human in the loop. Checking is easier than generating, and that asymmetry is what makes the loop work. Creative writing has no comparable checker.

### Test-time compute

**Test-time (inference-time) compute** means spending more computation per query to get better answers, a scaling axis separate from parameters and pretraining data. Ways to spend it:

- longer reasoning traces;
- **self-consistency**: sample many chains of thought and take a majority vote over the final answers;
- **best-of-$N$**: sample $N$ answers and keep the one a verifier or reward model scores highest;
- tree search over partial solutions.

### Is this neuro-symbolic?

**Neuro-symbolic AI** combines learned neural components (statistical pattern recognition) with symbolic ones (explicit rules, logic, search, programs). The classic example is AlphaGo: neural policy and value networks guiding Monte Carlo tree search. An LLM that calls a code interpreter or a proof checker is another.

There are two broad positions on how symbolic reasoning should enter. One is an **explicitly engineered hybrid**, with symbolic modules built in by design (the chat associated this with Gary Marcus). The other expects a better *learned* architecture to acquire symbolic reasoning as an **emergent** ability (the chat associated this with Yann LeCun). Reasoning models with search, tools and verifiers blur the line: they add structured deliberation without hand-built symbolic modules. As of 2026, whether this suffices for robust reasoning (for instance, whether it eliminates confident fabrication, i.e. hallucination) is an open empirical question.

## Cards

Q: Give one standard explanation of why chain-of-thought helps a transformer.
A: Per generated token a transformer does a bounded, depth-limited amount of computation. Writing intermediate steps lets total computation grow with output length, with the text as a scratchpad.
See: Chain of thought

Q: What is the difference between an outcome reward and a process reward model?
A: An outcome reward scores only the final answer. A process reward model scores each intermediate reasoning step.
See: Reasoning models and verifiable rewards

Q: What is RL with verifiable rewards (RLVR), and why does it scale?
A: RL where the reward is computed by an automatic checker (answer match, unit tests, proof checker). No human or learned judge is needed, so the signal is cheap and plentiful, and harder to game than a learned reward model (though weak tests can still be gamed).
See: Reasoning models and verifiable rewards

Q: Why is coding unusually well suited to RL and synthetic data?
A: It is verifiable. Generated solutions can be run against tests, which provides automatic reward and quality filtering. Checking is easier than generating.
See: Why coding benefits most

Q: What is **self-consistency** decoding?
A: Sample many independent chains of thought and output the majority-vote final answer. It is one way of spending test-time compute.
See: Test-time compute

Q: What does "neuro-symbolic" mean? Give a canonical example.
A: A system combining learned neural components with explicit symbolic ones (rules, logic, search, programs). Example: AlphaGo, where neural policy and value networks guide Monte Carlo tree search.
See: Is this neuro-symbolic?

Q: What are the two broad views on how symbolic reasoning should enter AI systems?
A: An explicitly engineered hybrid with symbolic modules built in by design, versus a learned architecture that acquires symbolic reasoning as an emergent ability.
See: Is this neuro-symbolic?

## Quiz

Q: In RLVR on math problems, the reward is typically…
- [x] whether the final answer matches a checkable ground truth
- [ ] a learned model of human preferences
- [ ] human labels on every reasoning step
- [ ] the log-likelihood of the reference solution
E: That is what "verifiable" means. A learned preference model is RLHF, and per-step human labels are process supervision.
See: Reasoning models and verifiable rewards

Q: Which is **not** a way of spending test-time compute?
- [ ] sampling many answers and majority voting
- [ ] best-of-$N$ with a verifier
- [x] training on more pretraining tokens
- [ ] generating a longer reasoning trace
E: More pretraining data is training-time scaling. Test-time compute is spent per query, at inference.
See: Test-time compute

Q: Which system is the textbook example of a neuro-symbolic architecture?
- [x] AlphaGo: neural networks guiding Monte Carlo tree search
- [ ] a plain feedforward image classifier
- [ ] a pure rule-based expert system
- [ ] a $k$-means clusterer
E: It combines a learned evaluation with explicit search. The expert system is purely symbolic, and the classifier is purely neural.
See: Is this neuro-symbolic?
