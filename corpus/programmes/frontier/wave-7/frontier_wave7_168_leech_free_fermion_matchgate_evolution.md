# Frontier Wave 7.168: Exact Free-Fermion Evolution for the Leech Stress Lane

**Date:** 25 October 2026

**Status:** exact compilation of the ideal selected-subspace chain; calibration null, not Monster evidence

**Evidence:** [matchgate evolution ledger](../../../../evidence/data/leech-free-fermion-matchgate-evolution-v1.json)

**Certificate:** [sine-diagonalization and resource verifier](../../../../verification/verify/verify_leech_free_fermion_matchgate_evolution.mjs)

> **Scope notice (Wave 7.190).** The free-fermion solution remains an exact
> logical calibration null.  It is evidence for the joined carrier only after
> a coupled-cell two-state dictionary and its physical exchange operator have
> been certified; its old local compiler cost does not transport.

## The selected lane is exactly soluble

The transition-selective two-level chain from Wave 7.166 is a hard-core
nearest-neighbour hopping model. Jordan--Wigner maps it to number-conserving
free fermions. For an open chain of (M) cells, the discrete sine transform

\[
 S_{jk}=\sqrt{2\over M+1}\sin{(j+1)(k+1)\pi\over M+1}
\]

diagonalizes the hopping matrix, with

\[
 \epsilon_k=\Delta+2t\cos{(k+1)\pi\over M+1},\qquad
 U(T)=S\,\mathrm{diag}(e^{-iT\epsilon_k})S^T.
\]

This is exact at the logical model level. Unlike the first-order brickwork of
Wave 7.167, it has no product-formula error and its gate count does not grow
with simulated time.

## Explicit logical upper bound

A generic real orthogonal transform uses at most (M(M-1)/2) Givens
rotations. Applying the sine transform, (M) mode phases and its inverse
therefore costs at most (M^2) logical mode gates. Adding the exact pendulum
eigenbasis input and output transforms from Wave 7.166 gives (M^2+144M):

| cells (M) | mode evolution | basis I/O | total logical gates |
|---:|---:|---:|---:|
| 24 | 576 | 3,456 | 4,032 |
| 72 | 5,184 | 10,368 | 15,552 |
| 168 | 28,224 | 24,192 | 52,416 |
| 744 | 553,536 | 107,136 | 660,672 |

This is a conservative logical-connectivity count, not a hardware count. A
structured sine-transform circuit may improve it; restricted connectivity,
finite-precision synthesis and swaps may worsen it.

## Crossover selected by the previous result

For 744 cells, one Trotter step uses 743 exchange gates. The exact compiler
beats first-order brickwork once the latter requires at least 746 steps. Thus
the short (T\Delta=1,t/\Delta=0.45) commissioning point still favours 21-step
brickwork: 122,739 total logical gates versus 660,672. At
(T\Delta=10,t/\Delta=0.45), exact compilation uses 2.44 times fewer gates
than the 2,025-step first-order bound: 660,672 versus 1,611,711.

## Why classical simulability helps the physics case

This lane is not the Monster. That is precisely why it is useful. Site-resolved
complex amplitudes have a parameter-free ideal prediction after (Delta,t,T)
are calibrated. The free-fermion solution is a hard null against which to
separate ordinary propagation, preparation error, multilevel leakage,
disorder and edge effects. A putative Leech or moonshine signature must first
survive this exact baseline and then pass the rootlessness, 24-channel edge,
defect and trace gates elsewhere in the promotion DAG.

Disagreement beyond the declared preparation, synthesis and measurement
envelopes falsifies the implemented selected-subspace hopping model. It does
not, by itself, establish new physics. Agreement commissions Gate A's dynamic
readout without promoting the carrier beyond Gate A.

## Boundary

The construction is exact only inside the ideal selected two-level,
nearest-neighbour model. It does not include multilevel pendulum leakage,
finite-precision synthesis, routing, disorder or hardware noise. Matchgate
simulability is a validation asset, not quantum advantage and not evidence of
the Leech lattice or Monster.

## Sources and corpus links

- Knill, [*Fermionic Linear Optics and Matchgates*](https://arxiv.org/abs/quant-ph/0108033).
- Jozsa and Miyake, [*Matchgates and classical simulation*](https://arxiv.org/abs/0804.4050).
- [Selective-exchange Trotter budget](frontier_wave7_167_leech_selective_exchange_trotter_budget.md)
- [Transition-selective exchange compiler](frontier_wave7_166_leech_transition_selective_exchange_compiler.md)
- [Excitation-hopping stress lane](frontier_wave7_164_leech_pendulum_excitation_hopping_stress_lane.md)
- [Product-to-coupled dependency audit](frontier_wave7_190_leech_product_to_coupled_dependency_audit.md)
