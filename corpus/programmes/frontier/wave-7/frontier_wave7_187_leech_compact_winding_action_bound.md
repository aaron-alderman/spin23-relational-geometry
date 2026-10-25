# Frontier Wave 7.187: Compact-Winding Action Bound

**Date:** 25 October 2026

**Status:** exact Euclidean action floor; tunnelling prefactor open

**Evidence:** [compact-winding bound](../../../../evidence/data/leech-compact-winding-action-bound-v1.json)

**Certificate:** [exact inverse and action verifier](../../../../verification/verify/verify_leech_compact_winding_action_bound.mjs)

## Compactness is not left as a verbal caveat

For the joined rotor Hamiltonian,

\[
 H={U\over2}n^TG^{-1}n+u\sum_i(1-\cos\theta_i),
\]

the Euclidean kinetic metric is $G/U$. Fixing one coordinate velocity and
minimizing over all other velocities gives the exact Schur-complement bound

\[
 \dot\theta^TG\dot\theta\ge
 {\dot\theta_i^2\over(G^{-1})_{ii}}.
\]

The exact unimodular inverse has diagonal

\[
 (8,22,4,14,10,4,6,6,4,4,6,4,4,4,4,6,4,4,4,4,4,4,4,4).
\]

Hence the weakest effective coordinate mass is $1/22$. Any nonzero integer
winding has at least one coordinate that traverses a full period. Combining
the Schur bound, $V\ge u(1-\cos\theta_i)$ and the Euclidean AM--GM inequality
gives the theorem

\[
 S_E\ge8\sqrt{u\over22U}.
\]

## Operating window

| $U/u$ | rigorous action floor | $e^{-S_{\min}}$ |
|---:|---:|---:|
| $10^{-4}$ | 170.561 | $8.44\times10^{-75}$ |
| $10^{-3}$ | 53.936 | $3.77\times10^{-24}$ |
| $10^{-2}$ | 17.056 | $3.91\times10^{-8}$ |

The exponential column is the largest bare semiclassical factor consistent
with the action theorem. It is not a rigorous amplitude bound because the
fluctuation determinant and multi-instanton prefactor are not bounded here.
A straight coordinate path has action $16\sqrt{u/U}$, furnishing a trial upper
action but not the minimizing instanton.

## Experimental discriminator

Offset-charge or twisted-boundary spectroscopy can isolate compact charge
dispersion. It should lie parametrically below the perturbative anharmonic
shift and fall exponentially with $1/\sqrt{U/u}$. A larger or nonexponential
signal rejects the ideal joined Hamiltonian or reveals uncontrolled phase
slips, dissipation or ultraviolet junction structure.

[Wave 7.188](frontier_wave7_188_leech_nonlinear_commissioning_packet.md)
combines this offset-phase control with the harmonic and anharmonic
fingerprints in one finite same-carrier protocol.

## Corpus links

- [All-24-mode full-cosine order completion](frontier_wave7_186_leech_24mode_full_cosine_order_three_halves.md)
- [Full-cosine active-mode ladder](frontier_wave7_184_leech_full_cosine_active_mode_ladder.md)
- [Coupled-metric gap audit](frontier_wave7_180_leech_coupled_metric_pendulum_gap_audit.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
- [Nonlinear commissioning packet](frontier_wave7_188_leech_nonlinear_commissioning_packet.md)
