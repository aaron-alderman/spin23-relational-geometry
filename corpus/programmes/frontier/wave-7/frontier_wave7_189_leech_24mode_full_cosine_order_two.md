# Frontier Wave 7.189: All-24-Mode Full-Cosine Order Two

**Date:** 25 October 2026

**Status:** full cosine complete through absolute order $U^2$; rigorous remainder open

**Evidence:** [order-two 24-mode record](../../../../evidence/data/leech-24mode-full-cosine-order-two-v1.json)

**Certificate:** [sparse third-order and mixed-term verifier](../../../../verification/verify/verify_leech_24mode_full_cosine_order_two.mjs)

## The apparently prohibitive third order is matrix free

Let $|y_n\rangle=R_nV_4|n\rangle$, where $R_n$ is the reduced harmonic
resolvent. The quartic third-order energy can be written

\[
 E_n^{(3)}[V_4]=\langle y_n|V_4|y_n\rangle
 -V_{4,nn}\langle y_n|y_n\rangle.
\]

Because $V_4=-\sum_i\theta_i^4/24$, its first term is
$-\sum_i\|\theta_i^2y_n\|^2/24$. No dense three-index virtual-state tensor is
needed. The mixed quartic--sextic term similarly becomes an overlap of
$\theta_i^2y_n$ with $\theta_i^4|n\rangle$. The largest sparse intermediate
maps contain 492,871 ground-sector and 575,924 excited-sector states.

## Order-consistent coefficient

At absolute order $U^2$, the three required terms are

| contribution | coefficient |
|---|---:|
| quartic third order | -0.02593630759 |
| mixed quartic--sextic second order | +0.02142431012 |
| octic first order | -0.002431312667 |
| **sum** | **-0.006943310131** |

The octic moment check uses
$\langle1|x^8|1\rangle-\langle0|x^8|0\rangle=945-105=840$.
The large individual pieces cancel, so the complete $U^2$ term is only
$3.27\times10^{-5}$ of the harmonic gap at $U/u=10^{-2}$ and smaller at the
other declared ratios.

The full one-well expansion is now

\[
 \Delta=0.21209815255\sqrt U-0.04764668731U
 -0.01140367653U^{3/2}-0.00694331013U^2+O(U^{5/2})
\]

for $u=1$. The prediction remains within 0.0852% of the independent eight-
mode full-cosine result at the strongest operating ratio.

## Boundary

This is an order-complete asymptotic coefficient, not a rigorous convergence
or remainder theorem. Order $U^{5/2}$, the compact winding prefactor,
dissipation and the thermodynamic coupled-wire limit remain outside it.

## Corpus links

- [Order-$U^{3/2}$ completion](frontier_wave7_186_leech_24mode_full_cosine_order_three_halves.md)
- [Compact-winding action bound](frontier_wave7_187_leech_compact_winding_action_bound.md)
- [Nonlinear commissioning packet](frontier_wave7_188_leech_nonlinear_commissioning_packet.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
