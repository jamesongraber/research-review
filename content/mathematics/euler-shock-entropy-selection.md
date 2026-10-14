---
title: "Euler shocks: entropy picks compression over expansion"
tags: [conservation-laws, entropy-solutions, gas-dynamics, shocks]
created: 2026-07-18
related: [entropy-solutions-physical-entropy]
source: "Claude conversation: Entropy solutions and physical entropy in nonlinear PDEs (2026-07). Worked example."
---

## Article

This is the concrete case behind [entropy solutions and physical entropy](#/note/entropy-solutions-physical-entropy). Conservation alone admits a shock and its exact reverse, and the second law throws one of them out.

### Rankine–Hugoniot for a stationary shock

Take 1D Euler for an ideal gas, $E=\frac{p}{\gamma-1}+\frac12\rho u^2$:

$$
\rho_t+(\rho u)_x=0,\quad (\rho u)_t+(\rho u^2+p)_x=0,\quad E_t+(u(E+p))_x=0.
$$

In the shock frame, with state 1 upstream (left) and state 2 downstream (right), the fluxes must match:

$$
\rho_1u_1=\rho_2u_2,\qquad \rho_1u_1^2+p_1=\rho_2u_2^2+p_2,\qquad u_1\Big(\tfrac{\gamma p_1}{\gamma-1}+\tfrac12\rho_1u_1^2\Big)=u_2\Big(\tfrac{\gamma p_2}{\gamma-1}+\tfrac12\rho_2u_2^2\Big).
$$

For a given upstream state there are two solutions: no jump, and one genuine jump. Eliminating velocities gives the **Hugoniot relation**, with $r=\rho_2/\rho_1$:

$$
\frac{p_2}{p_1}=\frac{(\gamma+1)r-(\gamma-1)}{(\gamma+1)-(\gamma-1)r}.
$$

### The jump conditions are symmetric

All three conditions are symmetric under swapping states 1 and 2. Equivalently, replacing $r$ by $1/r$ inverts $p_2/p_1$. So if $1\to2$ is a weak solution, so is $2\to1$ with the same flow direction. **Conservation cannot tell compression from expansion.**

### Numbers for Mach 2

In terms of the upstream Mach number $M_1$:

$$
\frac{\rho_2}{\rho_1}=\frac{(\gamma+1)M_1^2}{(\gamma-1)M_1^2+2},\qquad \frac{p_2}{p_1}=\frac{2\gamma M_1^2-(\gamma-1)}{\gamma+1},\qquad M_2^2=\frac{(\gamma-1)M_1^2+2}{2\gamma M_1^2-(\gamma-1)}.
$$

With $\gamma=1.4$ and $M_1=2$:

- **Compression (A):** $\rho_2/\rho_1=8/3\approx2.667$, $p_2/p_1=4.5$, $u_2/u_1=3/8$, $M_2=1/\sqrt3\approx0.577$. Supersonic to subsonic.
- **Expansion (B), the reverse jump:** upstream is the subsonic state $M\approx0.577$ and downstream is the Mach-2 state. Then $\rho$ ratio $=0.375$, $p$ ratio $=2/9\approx0.222$. Subsonic to supersonic.

Note: the original chat said Case B has $M_2=1/0.577$ with upstream Mach 2. That is wrong. The reverse jump starts subsonic and ends at Mach 2.

The density ratio is bounded: as $M_1\to\infty$, $\rho_2/\rho_1\to(\gamma+1)/(\gamma-1)=6$ for $\gamma=1.4$.

### The entropy check

For an ideal gas, $s=c_v\ln(p/\rho^\gamma)+\text{const}$. The shock is adiabatic but irreversible, so the second law requires $s_2\ge s_1$:

$$
\frac{s_2-s_1}{c_v}=\ln\frac{p_2}{p_1}-\gamma\ln\frac{\rho_2}{\rho_1}.
$$

- Case A: $\ln4.5-1.4\ln(8/3)\approx1.504-1.373=0.131>0$. **Admissible.**
- Case B: by symmetry, $-0.131<0$. **Forbidden.** Expansion shocks do not occur in a simple gas. That side resolves into a smooth rarefaction fan.

Along the Hugoniot curve, $\ln(p_2/p_1)-\gamma\ln r$ is increasing in $r$ (checked numerically for several $\gamma$), so **admissible means compressive**: $\rho_2>\rho_1$ and $p_2>p_1$. For weak shocks the entropy jump is third order in the shock strength.

### Lax's shock condition

Lax's condition is the kinematic shadow of entropy increase. For an $i$-shock of speed $\sigma$, $\lambda_i(U_L)>\sigma>\lambda_i(U_R)$: characteristics of that family run **into** the shock from both sides. Here $\sigma=0$, and the shock belongs to the family $\lambda=u-c$. In case A, $u_1-c_1>0>u_2-c_2$, which is $M_1>1>M_2$. Kruzhkov-style theory replaces $s$ by an arbitrary convex $\eta$ with $\eta_t+q_x\le0$, and this example is the picture it is built to reproduce.

## Cards

Q: Euler shocks: why can conservation of mass, momentum and energy alone not distinguish a compression shock from an expansion shock?
A: The Rankine–Hugoniot conditions are symmetric in the two states. Equivalently, the Hugoniot relation $p_2/p_1=\frac{(\gamma+1)r-(\gamma-1)}{(\gamma+1)-(\gamma-1)r}$, $r=\rho_2/\rho_1$, is invariant under $r\mapsto1/r$, $p_2/p_1\mapsto p_1/p_2$. So the reverse of any admissible jump is also a weak solution.
See: The jump conditions are symmetric

Q: Normal shock with $\gamma=1.4$ and upstream Mach 2: give the density ratio, pressure ratio and downstream Mach number.
A: $\rho_2/\rho_1=8/3\approx2.667$, $p_2/p_1=4.5$, $M_2=1/\sqrt3\approx0.577$.
See: Numbers for Mach 2

Q: For the $\gamma=1.4$, Mach-2 compression shock ($\rho$ ratio $8/3$, $p$ ratio $4.5$), what is the entropy change, and is it admissible?
A: With $s=c_v\ln(p/\rho^\gamma)$: $(s_2-s_1)/c_v=\ln4.5-1.4\ln(8/3)\approx0.13>0$. Entropy increases, so it is admissible.
See: The entropy check

Q: Describe the reverse (expansion) jump of the Mach-2 shock and why it is excluded.
A: It goes from the subsonic state ($M\approx0.577$) to the Mach-2 state, with $\rho$ ratio $0.375$ and $p$ ratio $2/9$. It satisfies all jump conditions but lowers entropy by $\approx0.13\,c_v$, so the second law forbids it.
See: Numbers for Mach 2

Q: State Lax's shock condition. What does it mean for a stationary gas-dynamic shock?
A: For an $i$-shock of speed $\sigma$: $\lambda_i(U_L)>\sigma>\lambda_i(U_R)$, so characteristics run into the shock. For a stationary shock in the $u-c$ family it says $u_1-c_1>0>u_2-c_2$, i.e. supersonic upstream and subsonic downstream.
See: Lax's shock condition

Q: For an ideal-gas shock, how are "entropy increases" and "compressive" related?
A: They are equivalent. Along the Hugoniot curve the entropy jump is increasing in $r=\rho_2/\rho_1$ and vanishes at $r=1$. So $s_2>s_1$ iff $\rho_2>\rho_1$ (and $p_2>p_1$).
See: The entropy check

## Quiz

Q: In the reverse (expansion) jump of a $\gamma=1.4$, Mach-2 normal shock, the upstream and downstream Mach numbers are…
- [x] $\approx0.577$ upstream, $2$ downstream
- [ ] $2$ upstream, $\approx1.732$ downstream
- [ ] $2$ upstream, $\approx0.577$ downstream
- [ ] $\approx1.732$ upstream, $\approx0.577$ downstream
E: Reversing the jump swaps the states, so the flow enters at the subsonic state and leaves at Mach 2. "$1/0.577$" was an error in the original chat. The third option is the admissible compression shock.
See: Numbers for Mach 2

Q: For an ideal gas, the physical entropy condition across a stationary shock is…
- [ ] $\ln(p_2/p_1)-\gamma\ln(\rho_2/\rho_1)\le0$
- [x] $\ln(p_2/p_1)-\gamma\ln(\rho_2/\rho_1)\ge0$
- [ ] $\ln(\rho_2/\rho_1)-\gamma\ln(p_2/p_1)\ge0$
- [ ] $p_2/p_1\ge(\rho_2/\rho_1)^{1/\gamma}$
E: $s=c_v\ln(p/\rho^\gamma)$, so $s_2\ge s_1$ iff $p_2/p_1\ge(\rho_2/\rho_1)^\gamma$. The first option has the sign flipped (it would keep the expansion shock). The third swaps the roles of $p$ and $\rho$, and would forbid the Mach-2 compression shock.
See: The entropy check

Q: As the upstream Mach number $M_1\to\infty$ with $\gamma=1.4$, the density ratio across a normal shock…
- [ ] grows without bound
- [x] tends to $6$
- [ ] tends to $\gamma=1.4$
- [ ] tends to $8/3$
E: $\rho_2/\rho_1=\frac{(\gamma+1)M_1^2}{(\gamma-1)M_1^2+2}\to\frac{\gamma+1}{\gamma-1}=6$. The pressure ratio does grow without bound. $8/3$ is the Mach-2 value.
See: Numbers for Mach 2
