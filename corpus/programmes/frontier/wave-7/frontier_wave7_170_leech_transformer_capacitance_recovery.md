# Frontier Wave 7.170: Exact Transformer Recovery of the Dual Leech Metric

**Date:** 25 October 2026

**Status:** exact ideal-network synthesis; layout, parasitics and infrared phase open

**Evidence:** [transformer-capacitance synthesis](../../../../evidence/data/leech-transformer-capacitance-recovery-v1.json)

**Certificate:** [exact rational (LDL^T) verifier](../../../../verification/verify/verify_leech_transformer_capacitance_recovery.mjs)

## The no-go has a passive recovery

Wave 7.169 rules out identifying the Leech (K) directly with the node
capacitance matrix of a positive-capacitor network. It does not require active
energy injection. Exact rational elimination gives

\[
 K=L D L^T,
\]

where (L) is unit lower triangular and every entry of (D) is positive.
If an ideal lossless signed transformer exposes capacitor coordinates
(x=L^T\phi), then

\[
 {1\over2}\dot x^T D\dot x
 ={1\over2}\dot\phi^T K\dot\phi.
\]

Thus 24 positive diagonal capacitors behind a signed mode-mixing network
realize (C=K), and their charging Hamiltonian realizes the desired
(n^TK^{-1}n/2) form.

## The exact ratios are unexpectedly mild

In the recorded channel order,

\[
D=\operatorname{diag}\left(
4,3,{8\over3},2,2,{3\over2},2,{3\over2},{3\over2},{4\over3},1,
{7\over6},{15\over14},{9\over10},{3\over4},{3\over4},{20\over27},
{28\over45},{15\over28},{7\over15},{8\over21},{3\over8},{1\over3},{1\over4}
\right).
\]

The positive capacitances span only a factor of 16. All nontrivial
transformer coefficients have magnitude at most (1/2); their reduced
numerators are at most 9 and denominators at most 28. This removes coefficient
blow-up as the immediate obstruction.

The cost is density: 242 of the 276 strict-lower-triangular coefficients are
nonzero, with 34 distinct signed values. The algebraic synthesis is therefore
benign in dynamic range but severe in connectivity.

## A measurable hardware gate

Before Josephson nonlinearities or edge claims are added, measure the full
24-port small-signal capacitance or admittance matrix. Fit one positive global
scale and compare every residual entry with (K) under a preregistered matrix
norm and fabrication-error envelope. Failure means the downstream pendulum
model does not inherit Leech provenance. Passing establishes the quadratic
network only; the bulk gap, edge chirality, rootlessness and orbifold gates
remain separate tests.

## Boundary

This is an exact algebraic network synthesis, not a fabricated device. The
ideal signed multiport transformer is an additional physical resource. No
planar local layout, finite-bandwidth transformer, parasitic/noise budget or
proof of flow from the complete Josephson array to the Leech edge is supplied.

## Corpus links

- [Passive-capacitance sign no-go](frontier_wave7_169_leech_passive_capacitance_sign_no_go.md)
- [Unimodular dual-basis compiler](frontier_wave7_139_leech_unimodular_dual_basis_compiler.md)
- [Rotor-native pendulum gap](frontier_wave7_160_leech_rotor_native_pendulum_gap.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
- [Conditioning and tolerance audit](frontier_wave7_171_leech_transformer_conditioning_tolerance.md)
