---
title: RLHF and RLAIF
tags: [llm, rlhf, reinforcement-learning, kl-regularization, alignment]
created: 2026-03-11
related: [llm-pretraining-and-scaling-laws, reasoning-models-and-test-time-compute, reward-incentives-and-agency, replicator-microfoundations]
source: "Claude conversation: Beyond next-token prediction in modern LLMs (2026-03)."
---

## Article

A pretrained base model is good at *continuing* text, not at *doing what it is asked*. Post-training closes that gap. The InstructGPT paper (Ouyang et al., 2022) made the recipe standard. Labelers preferred the outputs of a 1.3B-parameter InstructGPT model to those of the 175B GPT-3. Usefulness came from training, not size.

### The three stages

1. **Supervised fine-tuning (SFT).** Fine-tune on human-written demonstrations of good responses. This gives the reference policy $\pi_{\text{ref}}$.
2. **Reward model.** Humans *compare* or rank several responses to the same prompt. Pairwise judgments are more reliable than absolute scores. A network $r_\phi(x,y)$ is fit to these comparisons.
3. **RL fine-tuning.** Optimize the policy against $r_\phi$ (InstructGPT used PPO), with a KL penalty keeping it near $\pi_{\text{ref}}$.

### The Bradley–Terry reward model

Preferences are modeled as

$$
\mathbb P(y_1\succ y_2\mid x) = \mathrm{sigmoid}\big(r(x,y_1)-r(x,y_2)\big),
$$

and $r_\phi$ is trained by maximum likelihood, i.e. logistic loss on the reward difference. Only differences matter, so $r$ is identified only up to an additive function $c(x)$ of the prompt.

### The KL-regularized objective and its Gibbs solution

The RL stage maximizes

$$
J(\pi)=\mathbb E_{x}\Big[\mathbb E_{y\sim\pi(\cdot|x)}\,r(x,y) - \beta\,\mathrm{KL}\big(\pi(\cdot|x)\,\|\,\pi_{\text{ref}}(\cdot|x)\big)\Big].
$$

The KL term keeps the policy where the reward model was trained and is trustworthy, and it preserves the fluency of the base model. By the Gibbs variational principle (Donsker–Varadhan), the maximizer is

$$
\pi^*(y\mid x)=\frac{1}{Z(x)}\,\pi_{\text{ref}}(y\mid x)\,e^{r(x,y)/\beta}.
$$

This is the same entropic structure as entropic optimal transport, or the Gibbs minimizers of entropy-regularized mean-field problems. As $\beta\to\infty$, $\pi^*\to\pi_{\text{ref}}$. As $\beta\to0$, $\pi^*$ concentrates on the reward maximizers within the support of $\pi_{\text{ref}}$.

**DPO** (direct preference optimization) uses this closed form to skip the RL step. It inverts it, $r=\beta\log(\pi^*/\pi_{\text{ref}})+\beta\log Z(x)$, and substitutes into Bradley–Terry. $Z(x)$ cancels in the difference, which leaves a logistic loss directly on the policy's log-ratios.

### RLAIF

Human labels are slow and expensive. **RL from AI feedback (RLAIF)** gets the preference labels from a model instead. In **Constitutional AI** (Bai et al., 2022) a model critiques and revises its own outputs according to a written list of principles, and AI-generated preference labels then train the preference model for RL. This scales oversight cheaply, but the result can be no better than the labeling model's judgment and the principles it is given.

### The proxy problem

The reward model is a learned proxy for what people want. Optimizing a proxy hard enough exploits its errors (**Goodhart's law**). This is **reward hacking**, or overoptimization: the proxy reward keeps rising while true quality falls. The KL penalty, early stopping and better reward models are partial defenses (see [reward and agency](#/note/reward-incentives-and-agency)).

## Cards

Q: What are the three stages of RLHF?
A: (1) Supervised fine-tuning on demonstrations, which gives $\pi_{\text{ref}}$. (2) A reward model fit to human pairwise comparisons. (3) RL (e.g. PPO) against the reward model, with a KL penalty to $\pi_{\text{ref}}$.
See: The three stages

Q: What is the Bradley–Terry model used for RLHF reward models?
A: $\mathbb P(y_1\succ y_2\mid x)=\mathrm{sigmoid}(r(x,y_1)-r(x,y_2))$, fit by maximum likelihood (logistic loss). Only reward differences are identified.
See: The Bradley–Terry reward model

Q: Why does the RLHF objective include $-\beta\,\mathrm{KL}(\pi\|\pi_{\text{ref}})$?
A: The reward model is reliable only near the distribution it was trained on. The KL term keeps the policy close to the SFT model, which limits reward hacking and preserves fluency.
See: The KL-regularized objective and its Gibbs solution

Q: What policy maximizes $\mathbb E_\pi[r]-\beta\,\mathrm{KL}(\pi\|\pi_{\text{ref}})$, and why?
A: $\pi^*\propto\pi_{\text{ref}}\,e^{r/\beta}$, a Gibbs tilt of the reference. This is the Gibbs (Donsker–Varadhan) variational principle, the same structure as entropic OT and entropy-regularized mean-field problems.
See: The KL-regularized objective and its Gibbs solution

Q: How does DPO avoid running RL?
A: It inverts the Gibbs solution, $r=\beta\log(\pi/\pi_{\text{ref}})+\beta\log Z(x)$, and plugs it into Bradley–Terry. $Z(x)$ cancels in reward differences, so the preference likelihood becomes a logistic loss directly on the policy.
See: The KL-regularized objective and its Gibbs solution

Q: What is RLAIF, and what does Constitutional AI add?
A: RLAIF gets preference labels from an AI model instead of humans. Constitutional AI has the model critique and revise outputs against written principles, then uses AI preference labels to train the preference model.
See: RLAIF

Q: What is reward hacking in RLHF?
A: The policy exploits errors in the learned reward model, so proxy reward rises while true quality falls. It is Goodhart's law for a learned proxy.
See: The proxy problem

## Quiz

Q: The maximizer of $\mathbb E_{y\sim\pi}[r(y)]-\beta\,\mathrm{KL}(\pi\|\pi_{\text{ref}})$ is…
- [x] $\pi_{\text{ref}}\,e^{r/\beta}/Z$
- [ ] $\pi_{\text{ref}}\,e^{\beta r}/Z$
- [ ] the point mass at $\arg\max r$
- [ ] $\pi_{\text{ref}}+r/\beta$, renormalized
E: A large KL weight $\beta$ should keep $\pi$ near $\pi_{\text{ref}}$, so $r$ is divided by $\beta$. The point mass is only the $\beta\to0$ limit.
See: The KL-regularized objective and its Gibbs solution

Q: In a Bradley–Terry reward model, replacing $r(x,y)$ by $r(x,y)+c(x)$…
- [x] leaves all predicted preferences unchanged
- [ ] makes responses to prompts with larger $c(x)$ preferred
- [ ] changes the optimal KL-regularized policy
- [ ] is ruled out by the logistic loss
E: Only differences of rewards for the same prompt enter. The Gibbs policy is unchanged too, since $e^{c(x)/\beta}$ is absorbed into $Z(x)$.
See: The Bradley–Terry reward model

Q: Why does DPO not need to estimate the partition function $Z(x)$?
- [ ] It assumes $Z(x)=1$
- [x] $Z(x)$ cancels in the reward difference that Bradley–Terry depends on
- [ ] It estimates $Z$ by Monte Carlo
- [ ] It uses absolute ratings, not comparisons
E: Both responses share the same prompt $x$, so $\beta\log Z(x)$ appears in both rewards and drops out.
See: The KL-regularized objective and its Gibbs solution
