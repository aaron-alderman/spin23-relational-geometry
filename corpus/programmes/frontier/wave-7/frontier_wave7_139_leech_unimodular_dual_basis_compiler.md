# Frontier Wave 7.139: Unimodular Dual-Basis Compiler for the Leech Edge

**Date:** 25 October 2026

**Status:** exact continuum simplification; microscopic locality still platform-dependent

**Evidence:** [dual-basis record](../../../../evidence/data/leech-unimodular-dual-basis-compiler-v1.json)

**Certificate:** [exact integral-basis verifier](../../../../verification/verify/verify_leech_unimodular_dual_basis_compiler.mjs)

## Result

The apparent 12–22-field complexity of every Wave 7.138 interwire cosine is
not invariant. It is a basis artifact at the compact-boson level.

Write the 24 interaction columns as \(L=K\). Since the explicit Leech matrix
is integral and \(\det K=1\), its inverse is also integral. The change of
compact-boson basis

\[
\phi=K^{-1}\phi'
\]

is therefore in \(GL(24,\mathbb Z)\), not a real-valued relaxation. Under it,

\[
K'=K^{-T}KK^{-1}=K^{-1},\qquad
L'=K^{-T}L=I_{24}.
\]

Every neighboring-wire term becomes

\[
H_{\rm gap}=-\sum_{y,I}u_I
\cos(\phi_{R,y}^{\prime I}+\phi_{L,y+1}^{\prime I}).
\]

The certificate computes \(K^{-1}\) with exact rational elimination, proves
that all its entries are integers, and verifies both matrix identities. The
interaction support falls from 12–22 fields to exactly one field per chirality
per channel.

## Implication

At the effective-field-theory level, gate A does not require native 22-body
vertex interactions. It requires 24 ordinary channel-matched tunnelling or
backscattering terms, while the Leech structure moves into the integral
kinetic/commutation matrix \(K^{-1}\). This is a substantially cleaner
experimental compilation target.

The qualification matters. A \(GL(24,\mathbb Z)\) relabelling is local in the
internal topological field theory, but a particular chip or material may
realize the original fields as spatially distinct channels. The basis change
then becomes a 24-channel integer mixing network, and the engineering burden
has moved rather than vanished. The next test is platform-specific: produce
that mixing network or realize \(K^{-1}\) directly, then verify that disorder
and unwanted tunnelling do not spoil the null-vector gap.

Wave 7.157 closes the first half of that request on a digital surrogate:
modulo 853, the mixer compiles into 24 single-register scales and 531
two-register controlled additions per chiral block. Continuum convergence and
physical locality remain open.

## Corpus links

- [Explicit Leech interaction matrix](frontier_wave7_138_explicit_leech_k_matrix_interaction_compiler.md)
- [Coupled-wire blueprint](frontier_wave7_131_leech_coupled_wire_null_vector_blueprint.md)
- [Laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
- [Finite-qudit channel mixer](frontier_wave7_157_leech_finite_qudit_channel_mixer.md)
- [Passive-capacitance sign no-go](frontier_wave7_169_leech_passive_capacitance_sign_no_go.md)
