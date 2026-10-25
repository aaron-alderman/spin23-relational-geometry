# Frontier Wave 7.138: Explicit Leech \(K\)-Matrix Interaction Compiler

**Date:** 25 October 2026

**Status:** exact 24-channel continuum interaction schedule; microscopic channel technology open

**Evidence:** [explicit matrix and compilation record](../../../../evidence/data/leech-explicit-k-matrix-v1.json)

**Certificate:** [exact matrix verifier](../../../../verification/verify/verify_leech_explicit_k_matrix.mjs)

## Result

Wave 7.131 no longer needs the placeholder “let \(K\) be a Leech Gram
matrix.” The corpus now carries the explicit integer \(24\times24\) Gram
matrix published in the Nebe--Sloane Catalogue of Lattices. The certificate
uses fraction-free exact arithmetic to verify:

- symmetry and integral entries;
- even diagonal;
- all 24 positive leading principal minors;
- \(\det K=1\);
- 406 nonzero matrix entries, with \(\max|K_{ij}|=4\); and
- 24 primitive interaction columns, each supported on 12–22 fields and with
  maximum coefficient \(\ell_1\)-weight 39.

The catalogue identifies this exact form as the Leech lattice and records
minimum norm 4 and kissing number 196560. The arithmetic certificate does not
silently re-prove that classification datum; it verifies the matrix properties
used by the physical construction and retains the source boundary explicitly.

## Compiled Hamiltonian

For every bond \((y,y+1)\) and column \(I\) of the recorded matrix, the
interaction is now completely specified:

\[
H_{y,I}=-u_I\cos\left[
\sum_{J=1}^{24}K_{JI}\phi_{R,y}^{J}+
\sum_{J=1}^{24}K_{JI}\phi_{L,y+1}^{J}
\right].
\]

There are exactly 24 such terms per neighboring-wire bond. Their mutual
Haldane-null relation follows from using the identical column on the two
opposite chiralities, and unimodularity makes every column primitive. The
output is therefore an explicit integer coupling schedule that can be handed
to a bosonized simulator or further decomposed into lower-body controls.

## What became real, and what did not

The continuum carrier has advanced from an existence statement to a finite
bill of interactions. This is enough to simulate the null-vector gap and edge
spectrum without choosing a basis later. It is not yet a microscopic qubit,
spin, electronic, photonic or superconducting Hamiltonian: a column supported
on up to 22 bosonic fields is a high-body vertex interaction. The next
engineering problem is to compile those 24 vertex terms into ancilla-mediated
few-body interactions while retaining their commutativity and gap, or to find
a platform in which the multi-field cosine is native.

[Wave 7.139](frontier_wave7_139_leech_unimodular_dual_basis_compiler.md)
sharpens that boundary: the exact \(GL(24,\mathbb Z)\) change
\(\phi=K^{-1}\phi'\) diagonalizes all 24 cosine vectors. The high-body burden
is therefore not invariant; it can be traded for a denser integer kinetic and
channel-mixing matrix.

## Sources and corpus links

- Nebe and Sloane, [Catalogue entry for the Leech lattice](https://www.math.rwth-aachen.de/~Gabriele.Nebe/LATTICES/Leech.b.html).
- [Coupled-wire null-vector blueprint](frontier_wave7_131_leech_coupled_wire_null_vector_blueprint.md)
- [Laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
