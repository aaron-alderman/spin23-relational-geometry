# The Six Missing \(Spin(2,3)\) Generators Are Three Rotations and Three Boosts with Explicit \(Sp(4,\mathbb R)\) Lifts

**Date:** 17 October 2026  
**Branches:** B03, B04, B05, B08, B09, B11, B13, B14 and the Jordan-closure-test branch  
**Claim status:** exact generator decomposition and executable lifts; realization by the programme's Jordan triple operators remains open  
**Certificate:** [derive_six_spin23_carrier_complement_mixing_generators_and_sp4_lifts.mjs](scripts/derive_six_spin23_carrier_complement_mixing_generators_and_sp4_lifts.mjs)

> **Representation note added after the TKK audit:** “missing” here means outside the stabilizer of one chosen linear \((1,2)\) section. A complete TKK algebra already contains these directions after passage to the five-dimensional representation. They are not extra generators beyond TKK, and the linear-section \(4+6\) split is not the intrinsic TKK \(3+4+3\) grading. See [the representation reconciliation](748_the_tkk_algebra_already_induces_all_spin23_directions_and_the_jordan_carrier_embeds_projectively_in_the_null_cone.md).

## Executive result

Fix primitive-form coordinates

\[
(T_1,T_2,X_1,X_2,X_3)
\]

with metric

\[
G=\operatorname{diag}(+,+,-,-,-).
\]

Choose the \(H_2(\mathbb R)\) carrier section

\[
W=\operatorname{span}\{T_1,X_1,X_2\}
\]

and complement

\[
W^\perp=\operatorname{span}\{T_2,X_3\}.
\]

The four section-preserving generators form

\[
\mathfrak h
=\mathfrak{so}(1,2)\oplus\mathfrak{so}(1,1).
\]

The remaining six-dimensional space \(\mathfrak m\) consists exactly of one generator for each carrier/complement coordinate pair.

## 1. The six generators

Let \(M_{AB}\) denote the metric-skew generator mixing coordinates \(A\) and \(B\). Then

| Generator | Pair type | Character |
|---|---|---|
| \(M_{T_1T_2}\) | positive–positive | compact rotation |
| \(M_{T_1X_3}\) | positive–negative | noncompact boost |
| \(M_{X_1T_2}\) | negative–positive | noncompact boost |
| \(M_{X_1X_3}\) | negative–negative | compact rotation |
| \(M_{X_2T_2}\) | negative–positive | noncompact boost |
| \(M_{X_2X_3}\) | negative–negative | compact rotation |

Thus the missing directions split as three compact and three noncompact generators.

## 2. Explicit symplectic lifts

Use

\[
\omega=e_1\wedge e_2+e_3\wedge e_4,
\qquad
X=-JS,
\qquad S=S^T.
\]

Let \(S_{ii}\) be the elementary diagonal symmetric matrix, and for \(i<j\), let \(S_{ij}\) have ones in positions \((i,j)\) and \((j,i)\). The six primitive-form generators lift from:

\[
\begin{array}{c|l}
\text{generator}&S\\ \hline
M_{T_1T_2}&\tfrac12(S_{11}+S_{22}+S_{33}+S_{44})\\
M_{T_1X_3}&\tfrac12(-S_{11}+S_{22}+S_{33}-S_{44})\\
M_{X_1T_2}&\tfrac12(S_{14}+S_{23})\\
M_{X_1X_3}&\tfrac12(-S_{14}+S_{23})\\
M_{X_2T_2}&\tfrac12(S_{11}-S_{22}+S_{33}-S_{44})\\
M_{X_2X_3}&\tfrac12(-S_{11}-S_{22}+S_{33}+S_{44}).
\end{array}
\]

The certificate constructs each \(X=-JS\), verifies

\[
X^TJ+JX=0,
\]

and checks that its induced primitive-two-form action is exactly the requested \(M_{AB}\).

## 3. Symmetric-pair structure

The decomposition

\[
\mathfrak{so}(2,3)=\mathfrak h\oplus\mathfrak m
\]

obeys

\[
[\mathfrak h,\mathfrak h]\subset\mathfrak h,
\qquad
[\mathfrak h,\mathfrak m]\subset\mathfrak m,
\qquad
[\mathfrak m,\mathfrak m]\subset\mathfrak h.
\]

All three inclusions are checked executablely. The carrier-section orbit is therefore a symmetric homogeneous space, and the six mixing generators are its tangent directions at the chosen section.

This clarifies the role of recursion. The four stabilizer generators describe transformations already visible after a section is selected. The six \(\mathfrak m\) directions move between embeddings and are the genuinely missing operations required for full \(Spin(2,3)\).

## 4. Concrete Jordan-triple closure test

For proposed triple operators \(D(a,b)\), perform the following:

1. identify a real four-dimensional carrier \(V\) and alternating form \(J\);
2. express every \(D(a,b)|_V\) as a \(4\times4\) real matrix;
3. reject any operator violating \(D^TJ+JD=0\);
4. induce its action on \(\Lambda_0^2V^*\);
5. project that action onto \(\mathfrak h\oplus\mathfrak m\);
6. compute the Lie closure of all induced operators;
7. require closure dimension ten and nonzero coverage of the mixing sector.

A closure confined to \(\mathfrak h\) preserves one carrier section and proves only the smaller symmetry. A closure of dimension below ten is not \(\mathfrak{sp}(4,\mathbb R)\).

## 5. Relation to “one carrier, two faces, three relationships”

The chosen decomposition has:

- one three-coordinate Lorentz carrier \(W\);
- one two-coordinate complementary face plane \(W^\perp\);
- six pairwise mixing relations \(W\otimes W^\perp\).

The phrase “three relationships” might correspond to the three coordinate directions of \(W\), or to one of the two three-dimensional weight sectors obtained after diagonalizing the complementary \(SO(1,1)\) boost. Neither identification is automatic. The explicit matrices now make both proposals testable.

## 6. Falsification criteria

Stop the Jordan-to-\(Spin(2,3)\) implication if every derived triple operator preserves \(W\) and has zero projection onto all six \(M_{AB}\).

Stop if the induced closure has dimension less than ten after all proposed generators are included.

Stop if closure reaches ten only after adjoining arbitrary matrices not generated by the Jordan product or physical response maps.

Stop if the four-dimensional lifts fail the symplectic condition or depend on a degenerate alternating form.

Stop interpreting one mixing operator as the full enlargement until its Lie closure with the stabilizer has been computed.

## 7. Highest-value next calculations

1. Insert the actual candidate Jordan triple derivations from the corpus into the closure pipeline.
2. Diagonalize the complementary \(SO(1,1)\) action and split \(\mathfrak m\) into its two three-dimensional weight sectors.
3. Test Furey conjugation on the six explicit lifts.
4. Determine whether a Lagrangian-pair involution selects the carrier section and exchanges the weight sectors.
5. Search for the smallest subset of triple operators whose Lie closure reaches all ten generators.

## Companion documents

- [Carrier-section stabilizer and six-dimensional orbit](746_an_h2r_carrier_embeds_as_a_signature12_section_of_the_spin23_module_but_leaves_a_six_parameter_embedding_degeneracy.md)
- [Primitive two-forms and the genuine Spin(2,3) module](745_the_primitive_two_forms_of_a_symplectic_four_space_give_the_genuine_five_dimensional_spin23_module.md)
- [Jordan selection axioms](44_jordan_selection_axioms_and_spin24_to_spin23_descent.md)
