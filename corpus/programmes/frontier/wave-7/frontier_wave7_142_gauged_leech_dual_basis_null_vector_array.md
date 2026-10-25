# Frontier Wave 7.142: Gauged Leech Dual-Basis Null-Vector Array

**Date:** 25 October 2026

**Status:** coherent continuum P3B construction; microscopic/IR certification open

**Evidence:** [gauged array record](../../../../evidence/data/leech-gauged-dual-basis-null-vector-array-v1.json)

**Certificate:** [gauge-invariance and null-vector verifier](../../../../verification/verify/verify_leech_gauged_dual_basis_null_vector_array.mjs)

## Result

The finite inversion gauge module and the explicit Leech edge now join without
introducing 24 unrelated gauge fields. In the integral dual basis of Wave
7.139, put one dynamical sign \(s_y=\pm1\) on each neighboring-wire bond and
use

\[
H_{\rm gap}=-\sum_{y,I=1}^{24}u_I
\cos\!\left(\phi_{L,y+1}^{\prime I}
-s_y\phi_{R,y}^{\prime I}\right).
\]

The same sign acts on all 24 channels. This coherence is essential: separate
per-channel signs would gauge \(\mathbb Z_2^{24}\), not the diagonal inversion
automorphism of the Leech theory.

## Exact checks

The transformed chiral matrix is \(K^{-1}\), so its inverse in the null-vector
test is the explicit Leech matrix \(K\). For

\[
\lambda_{I,s}=(-s e_I,+e_I),
\]

the mutual null pairing is

\[
\lambda_{I,s}^{T}\bigl(K\oplus(-K)\bigr)\lambda_{J,s}
=(s^2-1)K_{IJ}=0.
\]

The verifier checks all \(2\times24^2=1152\) pairings. A gauge transformation
at one endpoint flips all 24 fields there and the adjacent link sign. The
cosine argument is either unchanged or negated, so the Hamiltonian is exactly
invariant. The \(s=+1\) sector gives ordinary channel matching; \(s=-1\) is a
physical inversion branch cut; a link-electric term lets it fluctuate.

## Boundary

This closes the continuum-local coupling problem left by Wave 7.141: one
dynamical inversion field acts coherently on the full Leech carrier without
spoiling the commuting null-vector gap. Two nontrivial gates remain. A
microscopic platform must realize the mixed kinetic matrix and gauge controls,
and sector/modular tomography must show that the infrared theory is the full
\(V_\Lambda^+\) orbifold rather than another gauge-invariant phase. Only then
does twisted-\(m\) condensation attempt the Moonshine extension.

## Corpus links

- [Dual-basis compiler](frontier_wave7_139_leech_unimodular_dual_basis_compiler.md)
- [Local inversion gauge module](frontier_wave7_141_local_inversion_gauge_and_twist_module.md)
- [Leech–Monster condensation fork](frontier_wave7_132_leech_monster_toric_code_condensation_fork.md)
- [Laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
