# Weak Isospin Squared Supplies the Exact Topology Parity, and \(\nu^c\) Puncturing Breaks the Pauli Pair

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B07, B08, B09, B11, B12 and the two-doubling intertwiner branch  
**Claim status:** exact theorem on the complete sixteen-weight \(SO(10)\)/Furey support; physical gauging or dissipation of the grading remains open  
**Certificate:** [verify_weak_isospin_square_supplies_topology_parity.mjs](../../../verification/verify/verify_weak_isospin_square_supplies_topology_parity.mjs)

## Executive result

The missing topology parity in the doubled completely positive selector is already present in the five-bit Standard-Model generation.

It is not the weak-isospin linking row \(2T_{3L}\) itself. It is the difference of its left and right squared projectors:

\[
\boxed{
Z_{\rm chir}
=(2T_{3R})^2-(2T_{3L})^2
=q_4q_5.
}
\]

On the complete sixteen-state generation, the Dirac Weyl exchange

\[
S:\ (q_1,q_2,q_3,q_4,q_5)
\mapsto(-q_1,-q_2,-q_3,q_4,-q_5)
\]

satisfies

\[
\boxed{
S^2=I,
\qquad Z_{\rm chir}^2=I,
\qquad \{S,Z_{\rm chir}\}=0.
}
\]

Thus the two operations are exactly the Pauli \(X\) and \(Z\) of an eightfold-degenerate topology qubit:

\[
\mathbb C^{16}
\cong
\mathbb C^2_{\rm topology}\otimes\mathbb C^8_{\rm Dirac\ pair}.
\]

This closes the algebraic part of the “two doublings” intertwiner.

Puncturing \(\nu^c\) to form the Prakash–Ramya fifteen-state code removes one member of the \(\nu^c\leftrightarrow\nu\) topology pair. The retained code is therefore not closed under \(S\). The logical coordinate is exactly the missing state needed to restore the complete Pauli pair.

## 1. Left and right projectors from the five-bit weights

The \(SO(10)\) conventions are

\[
2T_{3L}=\frac{q_4-q_5}{2},
\qquad
2T_{3R}=\frac{q_4+q_5}{2}.
\]

Because \(q_4,q_5\in\{\pm1\}\), exactly one of these two quantities is nonzero on every spinor weight. Therefore

\[
(2T_{3L})^2+(2T_{3R})^2=1.
\]

Define

\[
P_L=(2T_{3L})^2,
\qquad
P_R=(2T_{3R})^2.
\]

Then

\[
P_L=\frac{1-q_4q_5}{2},
\qquad
P_R=\frac{1+q_4q_5}{2}.
\]

These are exact complementary projectors distinguishing weak doublet components from weak singlet conjugates.

The topology parity is

\[
Z_{\rm chir}=P_R-P_L=q_4q_5.
\]

It has eight \(+1\) and eight \(-1\) states.

## 2. Dirac exchange anticommutes with the parity

The internal Dirac involution leaves \(q_4\) fixed and flips \(q_5\). Hence

\[
Z_{\rm chir}(Sq)
=q_4(-q_5)
=-Z_{\rm chir}(q).
\]

In matrix form this is

\[
SZ_{\rm chir}S^{-1}=-Z_{\rm chir},
\]

or

\[
\{S,Z_{\rm chir}\}=0.
\]

Every Dirac pair therefore supplies one two-dimensional Pauli module. The eight pairs are

\[
(\nu^c,\nu),
(e^c,e),
(u_i^c,u_i),
(d_i^c,d_i).
\]

This is not an analogy to a topology qubit. It is an exact tensor-factor decomposition of the finite generation space after a choice of one representative from each pair.

## 3. Relation to the Prakash–Ramya linker

In the doubled-code presentation, the first seven-state face contains \(u^c,d^c,e^c\), the second contains \(u,d,e\), and \(\nu\) is the seed whose partner \(\nu^c\) is punctured.

The linking row is \(2T_{3L}\). Before the column-sign normalization is undone, it appears as zero on the first face and one on the second face plus the seed. Physically its signs distinguish the two members of each weak doublet.

Squaring removes that internal isospin sign:

\[
(2T_{3L})^2=P_L.
\]

Therefore:

- \(2T_{3L}\) carries both face support and weak-isospin orientation;
- \((2T_{3L})^2\) remembers only face support;
- \(Z_{\rm chir}=I-2(2T_{3L})^2\) is the topology parity.

The CP selector needs the squared grading, while the chiral Standard Model needs the unsquared linker. This is a precise way for the Jordan observable algebra to retain the face division while the oriented TRO retains the weak-isospin sign.

## 4. What puncturing \(\nu^c\) does

The complete sixteen-state space has balanced parity:

\[
\dim P_R=8,
\qquad
\dim P_L=8.
\]

The punctured state is

\[
\nu^c=(+,+,+,+,+),
\qquad Z_{\rm chir}(\nu^c)=+1.
\]

Its Dirac partner is

\[
\nu=(-,-,-,+,-),
\qquad Z_{\rm chir}(\nu)=-1.
\]

After removing \(\nu^c\), the retained space has multiplicities

\[
7\oplus8
\]

and is not invariant under \(S\), because \(S\nu=\nu^c\) leaves the code coordinates.

This yields a new interpretation of the logical coordinate:

> The punctured logical \(\nu^c\) is precisely the environmental or logical completion required to close the topology Pauli algebra.

The statement is algebraic. It does not yet prove that \(\nu^c\) is literally an environment state in nature.

## 5. Consequence for the completely positive selector

Documents 688–692 introduced topology Pauli operators \(S\) and \(Z\) as abstract dilation data. They are now identified on the complete generation:

\[
S=\text{Dirac Weyl face exchange},
\qquad
Z=Z_{\rm chir}=q_4q_5.
\]

Their group twirl erases the topology qubit while preserving the eight-dimensional multiplicity space. On appropriately paired Hermitian carrier observables, that is the real-structure projection already certified.

The construction therefore no longer needs an arbitrary topology parity. It inherits one from weak chirality.

## 6. Gauge and Yukawa implications

The grading is constant on every irreducible Standard-Model weak multiplet:

- weak doublets have \(Z_{\rm chir}=-1\);
- weak singlet conjugates have \(Z_{\rm chir}=+1\).

It therefore commutes with the unbroken Standard-Model gauge representation.

Yukawa couplings connect the two parity sectors. They are parity-even only if the Higgs insertion carries odd grading. Thus the natural next test is not whether Yukawa interactions commute with \(Z_{\rm chir}\) on fermions alone; they do not. It is whether the completed fermion–Higgs vertex preserves a total graded parity and the conjugate-paired subspace.

## 7. Relation to \(Spin(2,3)\)

This result supplies the discrete two-face algebra needed before the \(H_2(\mathbb R)\) carrier can be selected:

\[
\text{Dirac exchange }S
+\text{ chirality parity }Z
\longrightarrow
\text{Pauli topology factor}
\longrightarrow
\text{fixed real observable carrier}.
\]

It still does not derive \(Sp(4,\mathbb R)\) from the code. The \(Spin(2,3)\) step continues to require the rank-two Jordan response and its symplectic conformal action.

What has changed is that the “two faces” entering that response are no longer an external doubling choice at the finite matter-support level.

## 8. Stop-everything and falsification criteria

Stop this identification if:

1. the physical coefficient-level Dirac lift does not implement the certified support exchange;
2. the Higgs/Yukawa sector cannot be consistently graded;
3. the topology twirl removes chiral observables required in the physical S-matrix;
4. reinstating \(\nu^c\) produces an unwanted propagating mirror rather than a logical, sterile or boundary completion;
5. the complete generation cannot be embedded into the same response space as the \(H_2(\mathbb R)\) carrier.

A stop-everything positive result would derive the total fermion–Higgs grading, show that the paired sector is invariant under all Standard-Model vertices, and recover the CP selector as the reduced dynamics of the completed sixteen-state module.

## 9. Next gates

1. Assign and verify the grading of the Higgs/Furey scalar sector.
2. Check every one-generation Yukawa monomial under total \(Z_{\rm chir}\).
3. Determine whether the topology Lindblad jumps can be gauge covariant and compatible with those vertices.
4. Interpret punctured \(\nu^c\) as logical, sterile, boundary or environmental data without adding a mirror generation.
5. Restrict the exact Pauli factor to the rank-two Jordan response and identify its multiplicity quotient.

## Reproducibility

    node scripts\verify_weak_isospin_square_supplies_topology_parity.mjs

## Companion documents

- [Dirac doubling is an internal Weyl face exchange](../0400-0499/414_dirac_doubling_is_an_internal_weyl_face_exchange_while_charge_conjugation_requires_the_opposite_spinor.md)
- [Prakash–Ramya at the current frontier](689_prakash_ramya_at_the_current_frontier_two_doublings_one_cubic_residue_and_the_missing_intertwiner.md)
- [Dirac face exchange at the Hermitian seam](690_dirac_face_exchange_becomes_the_cp_topology_real_structure_only_on_hermitian_observables.md)
- [Topology Pauli Lindbladian](691_the_topology_pauli_lindbladian_converges_exactly_to_the_cp_selector_but_depolarizes_the_topology_qubit.md)

## Revisit after the Clifford typing audit

The exact matter decomposition \(\mathbb C^{16}\cong\mathbb C^2_{\rm Dirac\ topology}\otimes\mathbb C^8_{\rm Dirac\ pair}\) is not yet an identification with the \(2\times8\) Clifford response dilation. In particular, applying the response multiplicity depolarizer directly to the eight Dirac-pair labels would erase non-scalar Standard-Model matter observables. A gauge-compatible response intertwiner is required before the equal dimensions can be promoted to a synthesis. See [the typed topology/Clifford audit](../0700-0799/708_the_topology_face_and_clifford_carrier_must_be_separately_typed_or_the_joint_selector_collapses_to_scalars.md).
