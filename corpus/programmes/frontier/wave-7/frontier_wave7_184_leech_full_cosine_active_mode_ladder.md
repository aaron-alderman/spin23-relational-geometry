# Frontier Wave 7.184: Full-Cosine Active-Mode Ladder

**Date:** 25 October 2026

**Status:** six-mode convergence and eight-mode reconnaissance; 24-mode tail open

**Evidence:** [active-mode ladder](../../../../evidence/data/leech-full-cosine-active-mode-ladder-v1.json)

**Certificate:** [expensive-rung recomputation and ladder verifier](../../../../verification/verify/verify_leech_full_cosine_active_mode_ladder.mjs)

## The second convergence axis

Wave 7.183 converged the harmonic excitation cutoff for four active modes.
Wave 7.184 enlarges the same full-cosine, Debye--Waller-projected Hamiltonian
through two, four, six and eight soft modes. Each rung preserves parity and
uses the same measured Gram-first eigenvectors; no mode-dependent parameter is
refitted.

The six-mode rung is independently converged through total excitation cutoff
eight, with 1897 even and 1106 odd states. The eight-mode cutoff-six rung has
2083 even and 920 odd states and is retained as reconnaissance because its
next cutoff would exceed the present dense solver's practical scale.

## Result

| $U/u$ | 2-mode gap | 4-mode gap | 6-mode gap | 8-mode cutoff-6 gap |
|---:|---:|---:|---:|---:|
| $10^{-3}$ | 0.006659698084 | 0.006659691057 | 0.006659671831 | 0.006659662451 |
| $10^{-2}$ | 0.02074000244 | 0.02073979017 | 0.02073919616 | 0.02073890315 |

Every first excitation is odd and every gap remains positive. Each two-mode
enlargement changes the gap by less than $3\times10^{-5}$ relative through
the declared ladder. The six-mode cutoff-6-to-8 changes are
$9.90\times10^{-12}$ and $1.79\times10^{-9}$ relative, so the six-mode values
are numerically converged in excitation count.

The active-mode increments are not monotone. Therefore the small observed
drift is evidence of stability, not a certified extrapolation or tail bound.

## Computational frontier

Eight modes at cutoff six already require 3003 parity-split basis states.
The full cosine is dense in the Fock basis, so storing and multiplying a dense
matrix becomes the bottleneck before the physics does. The next solver must
apply the tensor-product cosine on demand inside a parity-preserving Krylov or
tensor-network method. It must reproduce every frozen 2--8-mode rung before
being trusted toward 24 modes.

Until that tail is controlled, the corpus has a strongly stable finite-mode
nonlinear gap, not a proof of the full 24-mode or thermodynamic bulk gap.

Waves 7.185--186 attack the tail independently by summing every all-24-mode
quartic virtual state and adding the same-order sextic term. Their order-
consistent prediction agrees with this eight-mode ladder within 0.0818% at
the strongest declared ratio, while still withholding a rigorous remainder
bound.

## Corpus links

- [Four-mode full-cosine active space](frontier_wave7_183_leech_four_mode_full_cosine_active_space.md)
- [One-quantum quartic mixing audit](frontier_wave7_182_leech_one_quantum_quartic_mixing.md)
- [Coupled-metric gap audit](frontier_wave7_180_leech_coupled_metric_pendulum_gap_audit.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
- [Complete 24-mode quartic second order](frontier_wave7_185_leech_24mode_quartic_second_order.md)
- [All-24-mode full-cosine order completion](frontier_wave7_186_leech_24mode_full_cosine_order_three_halves.md)
