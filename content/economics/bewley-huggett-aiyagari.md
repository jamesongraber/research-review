---
title: "Bewley–Huggett–Aiyagari: stationary MFG in macroeconomics"
tags: [heterogeneous-agents, mean-field-games, state-constraints, steady-state]
created: 2026-08-05
related: [econ-vocabulary-for-mfg, master-equation-and-rational-expectations, infinite-horizon-vs-steady-state, moll-ryzhik-learning-mfg]
source: "Claude conversations: Economics for mean field games researchers; MFG without rational expectations, et al (2026-08)"
---

## Article

If an economist mentions MFG, the literature they most likely have in mind is heterogeneous-agent macroeconomics. Its basic models are stationary MFG systems, found independently by economists: Bewley (1986), Huggett (1993) and Aiyagari (1994) all predate Lasry–Lions (2006–07) by more than a decade.

### The model

A continuum of agents are identical ex ante but heterogeneous ex post, because each receives a different history of **idiosyncratic** income shocks. Insurance markets are incomplete. The only way to self-insure is to save in one risk-free asset, subject to a **borrowing limit** $a \ge \underline a$. There is no aggregate shock, so in MFG terms there is no common noise.

In the continuous-time version of Achdou–Han–Lasry–Lions–Moll (AHLLM, *Review of Economic Studies* 2022), with income $z_j$ switching between two values at Poisson rates $\lambda_j$:

$$
\rho v_j(a) = \max_c \{u(c) + v_j'(a)(z_j + ra - c)\} + \lambda_j\,(v_{-j}(a) - v_j(a)),
$$
$$
0 = -\frac{d}{da}\big[s_j(a)\,g_j(a)\big] - \lambda_j g_j(a) + \lambda_{-j}\, g_{-j}(a),
$$

where $s_j(a) = z_j + ra - c_j(a)$ is optimal saving and $g_j$ the stationary wealth density of type $j$. The first line is the HJB, the second the stationary Fokker–Planck (Kolmogorov forward) equation. A market clearing condition determines $r$, closing the fixed point. AHLLM is the paper that joins the two literatures: it writes the model explicitly as HJB + KFE with a state constraint and gives finite-difference schemes. Moll's lecture notes are the economists' own entry point to this machinery.

### What clears the market: Huggett vs. Aiyagari

- **Huggett:** an endowment economy where the asset is a bond in zero net supply. Equilibrium requires $\sum_j \int a\, g_j(a)\,da = 0$.
- **Aiyagari:** a production economy where the asset is capital. Aggregate capital is $K = \sum_j \int a\, g_j(a)\,da$, and factor prices are marginal products, $r = F_K(K, L) - \delta$, $w = F_L(K, L)$.

A standard result (Aiyagari; also in AHLLM): in a stationary equilibrium **$r < \rho$**. If $r \ge \rho$, precautionary saving makes individual wealth grow without bound, so aggregate asset supply diverges as $r \uparrow \rho$ and no stationary distribution exists.

### The borrowing constraint is a state constraint

The borrowing limit is not a Neumann or reflecting condition. In AHLLM it is a **state constraint**: the HJB holds in the constrained viscosity sense, which here amounts to
$$
v_j'(\underline a) \ge u'(z_j + r\underline a),
$$
so optimal saving at the limit is nonnegative and the drift never points out of the domain. In the Poisson-income case, low-income agents dissave at a positive rate, reach $\underline a$ in finite time and stay there until their income switches. Since wealth has no diffusion, **the stationary distribution has an atom at the borrowing limit**.

### What a steady state means

A stationary equilibrium is a **steady state**: aggregates (prices, the cross-sectional distribution) are constant in time while individuals move around underneath. Each household's wealth keeps changing as income shocks hit, but the wealth distribution is invariant. Hopenhayn's firm-dynamics model has the same structure, with entry and exit: firms are born, grow and die while the size distribution stays fixed. The economic content is **individual mobility with aggregate constancy**, which is a substantive and testable claim.

Macroeconomists compute steady states for three reasons:
1. they **calibrate** to long-run averages in the data;
2. they do **comparative statics**, such as how the stationary wealth distribution changes under a capital tax;
3. a steady state is the **linearization point** for dynamics, e.g. aggregate fluctuations around it.

This rests on assuming that transients have died out, which is a turnpike assumption. See [Infinite horizon is not stationary](#/note/infinite-horizon-vs-steady-state).

### Status in the literature (as of 2026-08)

The stationary case is now standard machinery in heterogeneous-agent macro, which is why new macro papers rarely cite Lasry–Lions: the tools have been absorbed. The live questions concern aggregate risk (see [the master equation note](#/note/master-equation-and-rational-expectations)). HANK models (heterogeneous-agent New Keynesian) add nominal rigidities and monetary policy to this framework and are what many monetary macroeconomists work on.

## Cards

Q: What is a Bewley–Huggett–Aiyagari model, in MFG terms?
A: A stationary MFG with no common noise. A continuum of agents with idiosyncratic income shocks save in one risk-free asset under a borrowing limit. HJB for the savings policy + stationary Fokker–Planck for the wealth distribution + market clearing for the interest rate.
See: The model

Q: Huggett vs. Aiyagari: what pins down the interest rate?
A: Huggett: bonds are in zero net supply, so $\int a\,dm = 0$. Aiyagari: capital $K = \int a\,dm$ and $r = F_K(K,L) - \delta$ (marginal product net of depreciation).
See: What clears the market: Huggett vs. Aiyagari

Q: In a stationary Bewley–Huggett–Aiyagari equilibrium, how does $r$ compare with $\rho$, and why?
A: $r < \rho$. If $r \ge \rho$, precautionary saving makes wealth grow without bound, so asset supply diverges and there is no stationary distribution.
See: What clears the market: Huggett vs. Aiyagari

Q: What boundary condition does the borrowing limit $a \ge \underline a$ impose on the HJB in AHLLM?
A: A state constraint, not a Neumann condition: $v'(\underline a) \ge u'(z + r\underline a)$, i.e. optimal saving at the limit is $\ge 0$, so the drift never exits the domain.
See: The borrowing constraint is a state constraint

Q: Why can the stationary wealth distribution have an atom at the borrowing limit?
A: Low-income agents dissave at a positive rate, hit $\underline a$ in finite time and stay until income switches. Wealth has no diffusion term to smooth the mass out.
See: The borrowing constraint is a state constraint

Q: What is the economic content of a stationary equilibrium?
A: Individual mobility with aggregate constancy: each agent's wealth keeps moving while the distribution and prices stay fixed. Hopenhayn's firm dynamics is the same, with entry and exit.
See: What a steady state means

Q: Why do macroeconomists compute steady states?
A: To calibrate to long-run averages, to do comparative statics across policies, and as the linearization point for dynamics. All three assume transients have died out.
See: What a steady state means

## Quiz

Q: In the Huggett model, the equilibrium condition that closes the fixed point is…
- [x] $\int a\, dm(a,z) = 0$ (bonds in zero net supply)
- [ ] $r = F_K(K,L) - \delta$ with $K = \int a\,dm$
- [ ] $r = \rho$
- [ ] $v'(\underline a) = u'(z + r\underline a)$
E: The capital-market condition is Aiyagari's. $r = \rho$ is impossible in a stationary equilibrium, and the last is the boundary condition, not market clearing.
See: What clears the market: Huggett vs. Aiyagari

Q: In the AHLLM formulation, the borrowing limit enters the HJB as…
- [ ] a homogeneous Neumann condition $v'(\underline a) = 0$
- [ ] a Dirichlet condition $v(\underline a) = 0$
- [x] a state constraint: saving at $\underline a$ must be nonnegative
- [ ] a reflecting boundary for a diffusion in wealth
E: The constraint is $v'(\underline a) \ge u'(z + r\underline a)$. The wealth distribution can then have an atom at the limit.
See: The borrowing constraint is a state constraint

Q: Why do new heterogeneous-agent macro papers rarely cite Lasry–Lions for the stationary case?
- [ ] Economists reject the HJB/Fokker–Planck formulation.
- [x] The stationary machinery has been absorbed into the standard toolkit.
- [ ] Stationary models were abandoned after Krusell–Smith.
- [ ] The economics models are not actually MFG systems.
E: Steady-state HJB + KFE computation is now routine. The live debate concerns aggregate risk and the master equation.
See: Status in the literature (as of 2026-08)
