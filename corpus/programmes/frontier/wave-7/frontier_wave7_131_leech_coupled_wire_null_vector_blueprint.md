# Frontier Wave 7.131: A Coupled-Wire Blueprint for the Leech Edge

**Date:** 25 October 2026

**Status:** continuum-local Leech-edge construction; local Monster orbifold Hamiltonian open

**Evidence:** [coupled-wire blueprint](../../../../evidence/data/leech-coupled-wire-null-vector-blueprint-v1.json)

**Certificate:** [null-vector and mode-count verifier](../../../../verification/verify/verify_leech_coupled_wire_null_vector_blueprint.mjs)

## Result

The microscopic problem separates cleanly. A local coupled-wire architecture
for the Leech edge follows from the standard null-vector construction; the
unresolved step is the inversion orbifold and twisted-sector extension.

Let \(K\) be a Leech Gram matrix. Give every wire a counterpropagating pair
with

\[
K_{\rm wire}=K\oplus(-K).
\]

Between wire \(y\) and \(y+1\), add 24 cosine interactions labelled by the
standard basis vectors \(e_I\):

\[
H_{\rm gap}=-\sum_{y,I}u_I
\cos\!\left[(Ke_I)\cdot\phi_{R,y}+(Ke_I)\cdot\phi_{L,y+1}\right].
\]

Every pair obeys the Haldane null condition,

\[
(Ke_I)^TK^{-1}(Ke_J)-(Ke_I)^TK^{-1}(Ke_J)=0.
\]

The cosines can therefore be simultaneously pinned. Because \(\det K=1\),
each column \(Ke_I\) is primitive. For \(N_y\) open wires there are
\(24(N_y-1)\) independent null vectors, gapping \(48(N_y-1)\) modes and
leaving exactly 24 chiral modes on each of the two opposite boundaries.
Each interaction touches only neighboring wires.

The matrix is no longer merely existential: [Wave 7.138](frontier_wave7_138_explicit_leech_k_matrix_interaction_compiler.md)
records a sourced \(24\times24\) Leech Gram matrix, verifies its determinant
and positive definiteness exactly, and compiles its columns into the 24
integer interaction vectors on every bond.

## 1. What this closes

This is an explicit local continuum Hamiltonian architecture for the
pre-orbifold \(V_\Lambda\) carrier. It upgrades “a Leech \(K\)-matrix is
physical” to a spatial construction with a bulk gap and separated chiral
edges. The argument is independent of the basis chosen for \(K\).

It does not yet identify a convenient microscopic channel—spin, boson,
superconducting, photonic or otherwise—whose bare interactions generate the
24-component Leech matrix. That is an engineering compilation problem rather
than an ambiguity in the target field theory.

## 2. The remaining orbifold gate

The Monster step requires two operations on one edge:

1. impose the inversion projection \(\phi\mapsto-\phi\); and
2. include the projected twisted module whose extension completes
   \(V_\Lambda^+\) to \(V^\natural\).

In physical language this requires dynamical branch cuts or a \(\mathbb Z_2\)
gauge field, followed by the correct integer-spin extension/condensation. A
naive projection without twist sectors is inconsistent; ordinary
\(\mathbb Z_2\) gauging without the final extension generally leaves
nontrivial topological sectors. The exact target is fixed by the \(J\)
character, but a stable local Hamiltonian implementing it was not located in
the reviewed literature.

## 3. P3 staging

| stage | target | status |
|---|---|---|
| P3A | Leech coupled-wire edge | continuum blueprint complete |
| P3B | local inversion projection | coherent 24-channel continuum gauge coupling complete; microscopic/IR certification open |
| P3C | projected twisted-sector extension | multiplication/stability open |
| P3D | zero-current, sector-split and marked-defect readout | protocol specified |

This makes the next research question narrow and falsifiable. The local P3B
module of [Wave 7.141](frontier_wave7_141_local_inversion_gauge_and_twist_module.md)
is coupled coherently to all 24 Leech channels in
[Wave 7.142](frontier_wave7_142_gauged_leech_dual_basis_null_vector_array.md).
A microscopic implementation must now reproduce its infrared orbifold sectors;
then P3C must be constructed without closing the edge gap incorrectly, followed by the
\(744\to24\to0\) current ladder and \(98580+98304\) sector split.

## Sources and corpus links

- Kane and Stern, [*Coupled Wire Model of \(Z_4\) Orbifold Quantum Hall States*](https://arxiv.org/abs/1804.02177).
- Tam, Hu and Kane, [*Coupled Wire Model of \(\mathbb Z_2\times\mathbb Z_2\) Orbifold Quantum Hall States*](https://arxiv.org/abs/1912.01034).
- Huang, [*A nonmeromorphic extension of the moonshine module vertex operator algebra*](https://arxiv.org/abs/hep-th/9406190).
- [Leech-edge orbifold proof](frontier_wave7_129_leech_edge_orbifold_proves_formal_monster_physics.md)
- [Current-ladder detector](frontier_wave7_130_c24_current_ladder_and_monster_detector.md)
