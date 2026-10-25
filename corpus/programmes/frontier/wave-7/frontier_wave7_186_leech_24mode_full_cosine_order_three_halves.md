# Frontier Wave 7.186: All-24-Mode Full-Cosine Order Completion

**Date:** 25 October 2026

**Status:** full cosine complete through absolute order $U^{3/2}$; remainder bound open

**Evidence:** [order-consistent 24-mode record](../../../../evidence/data/leech-24mode-full-cosine-order-three-halves-v1.json)

**Certificate:** [sextic moment and coefficient verifier](../../../../verification/verify/verify_leech_24mode_full_cosine_order_three_halves.mjs)

## Closing the order-counting gap

Wave 7.185 summed the complete second-order quartic contribution. The sextic
cosine term contributes at first order with the same $U^{3/2}$ scaling and
must therefore be included before the result is order consistent.

For coordinate variance $v_i$ and soft-mode variance $s_0$, the oscillator
moment identity

\[
 \langle1_0|\theta_i^6|1_0\rangle-
 \langle0|\theta_i^6|0\rangle
 =90O_{i0}^2s_0v_i^2
\]

gives

\[
 \delta\Delta_6={u\over8}s_0\sum_iO_{i0}^2v_i^2.
\]

The executable certificate independently checks the underlying single-
oscillator sixth moments, 15 and 105.

## Result

At fixed $u=1$, the complete one-well full-cosine expansion through absolute
order $U^{3/2}$ is

\[
 \Delta=0.21209815255\sqrt U
 -0.04764668731U
 -0.01140367653U^{3/2}+O(U^2).
\]

The positive sextic term cancels 51.72% of the negative quartic second-order
coefficient. The net $U^{3/2}$ correction is only $-5.38\times10^{-5}$ of the
harmonic gap at $U/u=10^{-3}$ and $-5.38\times10^{-4}$ at $10^{-2}$.

The order-consistent predictions differ from the eight-mode full-cosine gaps
by 0.0081% and 0.0818%, respectively. That agreement is evidence that the two
independent approximation ladders are meeting; it is not used as a fitted
normalization.

## Boundary

This completes all 24 normal modes through relative order $U/u$ in the
one-well expansion. It does not bound the $U^2$ remainder. That order contains
quartic third order, mixed quartic--sextic second order and octic first order,
and it needs consistent treatment of near-degenerate subspaces. Compact
interwell tunnelling and the thermodynamic bulk are also outside this proof.

[Wave 7.187](frontier_wave7_187_leech_compact_winding_action_bound.md)
controls the missing compact sector at the exponent level: every nontrivial
winding has $S_E\ge8\sqrt{u/(22U)}$. Its fluctuation prefactor remains open.

## Corpus links

- [Complete quartic second order](frontier_wave7_185_leech_24mode_quartic_second_order.md)
- [Full-cosine active-mode ladder](frontier_wave7_184_leech_full_cosine_active_mode_ladder.md)
- [Coupled anharmonic spectroscopy](frontier_wave7_181_leech_coupled_anharmonic_spectroscopy.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
- [Compact-winding action bound](frontier_wave7_187_leech_compact_winding_action_bound.md)
