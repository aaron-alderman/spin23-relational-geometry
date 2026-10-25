# Frontier Wave 7.185: Complete 24-Mode Quartic Second Order

**Date:** 25 October 2026

**Status:** exact finite second-order quartic sum; sextic order completion open

**Evidence:** [24-mode second-order record](../../../../evidence/data/leech-24mode-quartic-second-order-v1.json)

**Certificate:** [sparse reachable-state reconstruction verifier](../../../../verification/verify/verify_leech_24mode_quartic_second_order.mjs)

## The omitted-mode tail becomes a finite calculation

The active-space ladder leaves virtual excitations of omitted modes open. At
quartic second order, however, no infinite Hilbert-space extrapolation is
needed. Starting from the vacuum, $V_4=-(u/24)\sum_i\theta_i^4$ reaches only
the two- and four-quantum sectors. Starting from the softest one-quantum state,
it reaches only the one-, three- and five-quantum sectors.

The executable calculation applies each compact-coordinate operator as four
sparse ladder steps in the complete 24-mode normal basis. It enumerates 17,851
states in the ground calculation and 20,174 states in the excited calculation,
then sums every nondegenerate energy denominator.

## Result

At fixed $u=1$, the transition through quartic second order is

\[
 \Delta=0.21209815255\sqrt U
 -0.04764668731 U
 -0.02362012282 U^{3/2}+O(U^2).
\]

| $U/u$ | harmonic gap | first-order quartic | second-order quartic | second order / harmonic |
|---:|---:|---:|---:|---:|
| $10^{-4}$ | 0.00212098153 | $-4.7647\times10^{-6}$ | $-2.3620\times10^{-8}$ | $-1.11\times10^{-5}$ |
| $10^{-3}$ | 0.00670713250 | $-4.7647\times10^{-5}$ | $-7.4693\times10^{-7}$ | $-1.11\times10^{-4}$ |
| $10^{-2}$ | 0.02120981525 | $-4.7647\times10^{-4}$ | $-2.3620\times10^{-5}$ | $-1.11\times10^{-3}$ |

The Wave 7.181 first-order coefficient is reproduced exactly at recorded
precision. The dominant second-order gap contribution is the difference
between the excited three-quantum and ground two-quantum channels, not the
near-degenerate one-quantum mixing.

## Epistemic boundary

This is the complete all-24-mode second-order sum for the quartic perturbation.
It is not yet the complete full-cosine answer at order $U^{3/2}$: the sextic
term contributes at first order with the same scaling. That term must be added
before using the small second-order number as a controlled remainder estimate.
Compact tunnelling, dissipation and the thermodynamic bulk remain later gates.

[Wave 7.186](frontier_wave7_186_leech_24mode_full_cosine_order_three_halves.md)
adds that mandatory sextic term and closes the full-cosine expansion through
absolute order $U^{3/2}$.

## Corpus links

- [Full-cosine active-mode ladder](frontier_wave7_184_leech_full_cosine_active_mode_ladder.md)
- [One-quantum quartic mixing](frontier_wave7_182_leech_one_quantum_quartic_mixing.md)
- [Coupled anharmonic spectroscopy](frontier_wave7_181_leech_coupled_anharmonic_spectroscopy.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
- [Full-cosine order completion](frontier_wave7_186_leech_24mode_full_cosine_order_three_halves.md)
