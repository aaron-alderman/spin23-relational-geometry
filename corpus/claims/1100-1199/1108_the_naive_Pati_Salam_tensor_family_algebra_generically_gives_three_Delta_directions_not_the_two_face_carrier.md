# The Naïve Pati–Salam Tensor Family Algebra Generically Gives Three \(\Delta\) Directions, Not the Two-Face Carrier

**Date:** 18 October 2026  
**Branches:** family-extended represented one-forms, Pati–Salam tensor product, scalar multiplicity, two-face carrier, normalizer alternative  
**Claim status:** exact minimal tensor-product obstruction under full Majorana-block support; complete noncommutative calculus still open  
**Certificate:** [prove_naive_tensor_family_extension_has_three_Delta_directions.mjs](../../../verification/prove/prove_naive_tensor_family_extension_has_three_Delta_directions.mjs)

## Executive result

Document 1107 found the unique minimal charge alphabet

\[
\{\Delta_0,\Delta_{-3}\}
\]

whose quadratic products cover the three family Majorana sectors.

The most obvious implementation is to tensor the Pati–Salam finite algebra
with

\[
\mathcal A_{\rm fam}=\mathbb C\oplus\mathbb C
\]

acting on the selected-family line \(P\mathbb C^3\) and the rank-two
complement \(Q\mathbb C^3\).

That implementation generically produces too many linear scalar directions.
For a full-support Majorana coefficient \(K\), the family projectors isolate

\[
PKP,\qquad PKQ,\qquad QKP,\qquad QKQ.
\]

These have disjoint matrix support and are linearly independent. Majorana
symmetry/reality pairs the two cross blocks, leaving

\[
\boxed{
PKP,\qquad PKQ+QKP,\qquad QKQ
}
\]

as three independent self-adjoint directions:

- one selected-family neutral direction;
- one charged cross direction;
- one rank-two-complement neutral direction.

Thus the naïve tensor product gives

\[
\boxed{
2\text{ neutral }\Delta\text{ directions}
+
1\text{ charged }\Delta\text{ direction},
}
\]

not one neutral plus one charged face.

## 1. Family projectors

Let

\[
P=
\begin{pmatrix}
1&0&0\\
0&0&0\\
0&0&0
\end{pmatrix},
\qquad
Q=I-P.
\]

The represented family algebra is

\[
\pi_{\rm fam}(z,w)=zP+wQ.
\]

Because \(P,Q\) belong to the algebra, tensoring them with Pati–Salam
elements allows a one-form calculation to isolate each source/target family
sector.

For a symmetric generation-space Majorana coefficient \(K=K^T\), decompose

\[
K=PKP+PKQ+QKP+QKQ.
\]

## 2. Directed represented-one-form support

In the diagonal family abstraction, the four blocks lie in the four
bimodules

\[
\operatorname{Hom}(P,P),\quad
\operatorname{Hom}(Q,P),\quad
\operatorname{Hom}(P,Q),\quad
\operatorname{Hom}(Q,Q).
\]

Their matrix supports are disjoint:

\[
\langle E_rKE_s,E_uKE_v\rangle_{\rm HS}=0
\]

whenever \((r,s)\ne(u,v)\).

If every block of \(K\) is nonzero, their directed span therefore has
dimension four.

This is not a numerical accident. The algebra idempotents themselves
separate the blocks.

## 3. Reality and Majorana symmetry

For \(K=K^T\),

\[
(PKQ)^T=QKP.
\]

The charged orientations are conjugate and form one complex scalar direction,
or one self-adjoint combination plus its phase.

The two diagonal blocks satisfy

\[
(PKP)^T=PKP,\qquad(QKQ)^T=QKQ
\]

independently. Reality does not identify them.

The self-adjoint support is therefore

\[
\mathcal V_{\Delta}^{\rm sa}
=
\operatorname{span}_{\mathbb R}
\{PKP,\ PKQ+QKP,\ QKQ\},
\]

with

\[
\boxed{\dim_{\mathbb R}\mathcal V_{\Delta}^{\rm sa}=3}
\]

for a generic full-support \(K\).

## 4. Why all three directions are needed in the naïve model

The desired complete Majorana texture has:

- a selected/selected entry;
- selected/other entries;
- an unrestricted symmetric other/other block.

These require respectively:

\[
PKP\ne0,\qquad
PKQ\ne0,\qquad
QKQ\ne0.
\]

Deleting one neutral block reduces the scalar count but also removes one
required sector:

- \(PKP=0\) deletes the exceptional selected Majorana entry;
- \(QKQ=0\) deletes all unselected-family Majorana masses;
- \(PKQ=0\) deletes selected/unselected Majorana mixing.

Therefore a texture zero cannot repair the multiplicity while preserving the
full target.

## 5. Relation to the two-face charge alphabet

The charge classification of document 1107 remains correct. The three
self-adjoint directions fall into only two family-charge types:

\[
\begin{array}{c|c}
\text{direction}&\text{family transition}\\ \hline
PKP&\text{neutral diagonal}\\
QKQ&\text{neutral diagonal}\\
PKQ,\ QKP&\text{charged cross pair}.
\end{array}
\]

The issue is **multiplicity inside the neutral charge sector**.

Charge data alone sees

\[
\{0,-3\},
\]

while the tensor-product calculus sees

\[
\{0_P,0_Q,-3_{PQ}\}.
\]

This is exactly why charge support could not prove the physical two-face
model.

## 6. What would reduce three directions to two

The neutral blocks must be tied by structure not present in the naïve tensor
product. Possibilities include:

1. a normalizer action that supplies the charged cross direction while the
   original Pati–Salam algebra supplies one common neutral \(\Delta\);
2. a crossed-product or linking algebra whose relations identify the two
   diagonal coefficients;
3. a junk relation eliminating the neutral difference \(PKP-QKQ\);
4. a symmetry of the finite Dirac data forcing one common neutral fluctuation;
5. a dynamical heavy combination, provided the third field exists
   kinematically but decouples with a controlled low-energy error.

Only the first two would realize exactly two faces at the represented
one-form level.

## 7. Why a simple tensor restriction does not help

One might retain only

\[
\mathcal A_{\rm PS}\otimes1
\quad\text{and}\quad
1\otimes\mathcal A_{\rm fam}.
\]

But the unital algebra generated by these commuting subalgebras contains
their products

\[
a_{\rm PS}\otimes P,\qquad
a_{\rm PS}\otimes Q.
\]

These products again isolate the two neutral blocks. Avoiding them means the
family operation is not an ordinary additional algebra factor; it must be an
external normalizer, category action or constrained linking construction.

## 8. Stop-everything and falsification criteria

**Tensor-product stop:** do not claim
\(\mathcal A_{\rm PS}\otimes(\mathbb C\oplus\mathbb C)\) produces exactly
\(\Delta_0,\Delta_{-3}\) for generic full Majorana support.

**Charge-count stop:** two charge values do not imply two scalar copies.

**Texture stop:** removing \(PKP\), \(PKQ\) or \(QKQ\) to reduce multiplicity
also removes a required Majorana sector.

**Algebra-closure stop:** a proposed “restricted tensor algebra” must be
checked for closure; commuting generators recreate their products.

**Positive trigger:** a represented normalizer/linking construction retains
one common neutral \((2_R,4)\) direction and one charged cross direction while
supporting all three Majorana matrix sectors after quadratic composition.

## 9. Verdict

The simplest family algebra extension fails the exact two-face target:

\[
\boxed{
\mathcal A_{\rm PS}\otimes(\mathbb C\oplus\mathbb C)
\quad\Longrightarrow\quad
\dim\mathcal V_{\Delta}^{\rm sa}=3
}
\]

under generic full-support Majorana data.

This does not kill the two-face carrier. It identifies its proper
mathematical home: the charge-three face should arise from a normalizer or
linking operation acting on one common Pati–Salam carrier, rather than from a
freely tensor-factorized family algebra.

## Position in the corpus

- [two \(\Delta\) faces and three Majorana charge sectors](1107_two_Pati_Salam_Delta_faces_with_charges_zero_and_minus_three_are_the_unique_minimal_quadratic_alphabet_for_the_full_family_Majorana_texture.md)
- [Pati–Salam Majorana \(\Delta^2\) gauge/family separation](1106_the_Pati_Salam_Majorana_block_is_a_genuine_diagonal_A2_defect_but_its_Delta_square_is_gauge_not_family_structure.md)
- [coarse incidence cannot fix one-form multiplicity](../1000-1099/1077_coarse_Furey_arrow_incidence_cannot_determine_the_represented_one_form_or_S1_copy_number.md)
- [family two-point algebra](1100_the_minimal_two_point_family_algebra_produces_the_A2_vertex_by_unimodularity_and_a_charge_three_one_form_but_its_full_NCG_embedding_remains_open.md)
- [population-normal Jordan repair and \(Spin(2,3)\) bridge](1109_the_population_normal_Jordan_selector_removes_the_extra_neutral_Delta_and_recovers_Spin23_but_charge_six_lives_in_an_external_symmetric_square.md)
