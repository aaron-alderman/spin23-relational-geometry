# Opposite-Anchor Typing Splits the \(Sp(6)\) Envelope into Two Local \(Spin(2,3)\) Relational Wheels

**Date:** 18 October 2026  
**Replacement target:** derive the sector typing that preserves the null mask inside the nested family commutant  
**Branches:** sector-dependent Krajewski anchors, relational carrier, typed Jordan composition  
**Claim status:** exact finite-label and Jordan-block theorem; preservation by physical one-forms and junk remains open  
**Certificate:** [prove_opposite_anchor_typing_splits_H3_envelope_into_two_H2_wheels.mjs](../../../verification/prove/prove_opposite_anchor_typing_splits_H3_envelope_into_two_H2_wheels.mjs)

## Executive result

The sector-dependent opposite anchors found in the null-mask construction are exactly the missing type data needed to prevent the two local \(Spin(2,3)\) wheels from closing into the \(Sp(6,\mathbb R)\) envelope.

At the coarse family-label level, the Dirac and Majorana relations appear to share the same carrier \(P\):

\[
P\leftrightarrow I,
\qquad
P\leftrightarrow N.
\]

That coarse identification produces

\[
X_{PI}\circ X_{PN}=\frac12X_{IN}
\]

and hence the full \(H_3(\mathbb R)\) closure established in [1126](1126_two_overlapping_H2R_null_mask_wheels_generate_H3R_and_raise_Spin23_to_Sp6.md).

But the complete bimodule labels are

\[
D_P=(P,N),
\qquad
D_I=(I,N),
\]

for the Dirac wheel, and

\[
M_P=(P,I),
\qquad
M_N=(N,I),
\]

for the Majorana wheel.

The two apparent copies of \(P\) are different relationship states because their opposite anchors differ:

\[
(P,N)\ne(P,I).
\]

On the full relationship carrier, the two edge operators occupy orthogonal blocks. Therefore

\[
X_DX_M=X_MX_D=0,
\qquad
X_D\circ X_M=0.
\]

The typed Jordan closure is

\[
\boxed{
H_2(\mathbb R)_D\oplus H_2(\mathbb R)_M,
}
\]

with local conformal algebra

\[
\boxed{
\mathfrak{spin}(2,3)_D\oplus\mathfrak{spin}(2,3)_M.
}
\]

The \(H_3/Sp(6)\) envelope is not fundamental. It is produced by coarse-graining away the opposite-anchor label.

## 1. The carrier was never only \(P\)

The earlier phrase “one carrier, two faces” used the left family label alone. The complete Krajewski state contains two labels:

\[
(\text{left character},\text{opposite character}).
\]

The Dirac and Majorana sectors lift the same visible left character \(P\) to different relational carriers:

\[
P_D=(P,N),
\qquad
P_M=(P,I).
\]

Thus the correct statement is:

\[
\boxed{
\text{one observed carrier label, two relational lifts, two local wheels}.
}
\]

This is the Russian-doll structure in exact finite-algebra form. The inner opposite-anchor label is invisible if one records only family charge, but it controls which relationships compose.

## 2. The typed carrier

Use the ordered basis

\[
\bigl(D_P,D_I,M_P,M_N\bigr)
=\bigl((P,N),(I,N),(P,I),(N,I)\bigr).
\]

Define

\[
X_D=E_{D_PD_I}+E_{D_ID_P},
\]

and

\[
X_M=E_{M_PM_N}+E_{M_NM_P}.
\]

The support projectors satisfy

\[
\Pi_D\Pi_M=0.
\]

Consequently

\[
X_D=\Pi_DX_D\Pi_D,
\qquad
X_M=\Pi_MX_M\Pi_M,
\]

and every mixed associative or Jordan product vanishes.

The two wheels may share an external interpretation of \(P\), but they do not share a composable relationship-state vector.

## 3. The typed Jordan closure

Include the four population projectors

\[
E_{D_PD_P},\ E_{D_ID_I},\ E_{M_PM_P},\ E_{M_NM_N}
\]

together with \(X_D,X_M\). Their Jordan closure is six-dimensional:

\[
J_{\rm typed}
=H_2(\mathbb R)_D\oplus H_2(\mathbb R)_M.
\]

Each block has its own determinant cone and conformal algebra:

\[
\mathfrak{conf}(J_{\rm typed})
=\mathfrak{sp}_4(\mathbb R)_D
\oplus
\mathfrak{sp}_4(\mathbb R)_M.
\]

Using the accidental isomorphism in each block,

\[
\mathfrak{sp}_4(\mathbb R)
\cong
\mathfrak{spin}(2,3),
\]

the typed system contains two local \(Spin(2,3)\) wheels rather than one global \(Sp(6)\) wheel.

## 4. Coarse-graining creates the larger envelope

Let a coarse map forget the opposite character:

\[
q:(i,j)\mapsto i.
\]

Then

\[
q(D_P)=q(M_P)=P.
\]

The two orthogonal carrier lifts are identified. Their edge operators descend to \(X_{PI}\) and \(X_{PN}\) on one three-state space, where

\[
2(X_{PI}\circ X_{PN})=X_{IN}.
\]

Thus:

\[
\boxed{
\text{forget opposite anchor}
\Longrightarrow
H_2\oplus H_2
\longrightarrow
H_3.
}
\]

The apparent \(Sp(6)\) symmetry is the closure symmetry of the coarse quotient, not necessarily the symmetry of the fully typed physical relation space.

## 5. Why this is “relational carrier”

The carrier of a relation is not merely the particle label on its left. It is the full bimodule position determining both how the algebra acts and which maps are composable.

The opposite anchor therefore behaves as a relationship type:

- equal opposite anchors permit a horizontal first-order edge;
- different opposite anchors separate relationship sectors;
- retaining the anchor prevents cross-sector Jordan composition;
- forgetting it produces an emergent larger closure.

This gives a precise mathematical meaning to “relational-carrier and Jordan-triple composition.” The middle datum of a triple product is not decorative. It determines whether two apparent relations share a genuine composable carrier.

## 6. What remains physically open

The label-level result is exact, but a physical model can still destroy the separation.

The next calculations must determine whether:

1. the particle/conjugate Hilbert representation contains orthogonal projectors onto the two anchor sectors;
2. the finite Dirac operator respects those projectors except for the intended edges;
3. represented one-forms preserve the block separation;
4. the junk quotient removes or retains mixed products consistently;
5. reality pairs the two blocks without identifying them;
6. symmetry breaking or radiative corrections generate an operator between \(P_D\) and \(P_M\).

Any physical operator identifying the two lifts recreates the coarse three-state carrier and can regenerate the \(I/N\) relation.

## 7. Stop-everything criteria

**Coarse-label stop:** never infer Jordan closure from left family labels alone when opposite anchors differ.

**Single-carrier stop:** \(D_P\) and \(M_P\) are not the same relationship state merely because both project to \(P\).

**Mixing stop:** a nonzero physical map \(P_D\leftrightarrow P_M\) can reactivate the \(H_3/Sp(6)\) envelope.

**Junk stop:** block separation must be tested after represented forms and junk, not only on the bare Dirac matrix.

**Positive trigger:** the complete real-even physical representation retains orthogonal opposite-anchor projectors through one-form formation, junk reduction and symmetry breaking.

## 8. Verdict

The sector-dependent Krajewski anchor is more than a first-order selection trick. It is the precise relational typing needed by the nested Jordan construction:

\[
\boxed{
\text{opposite-anchor memory}
\Longrightarrow
H_2(\mathbb R)_D\oplus H_2(\mathbb R)_M,
}
\]

whereas

\[
\boxed{
\text{opposite-anchor erasure}
\Longrightarrow
H_3(\mathbb R)\text{ and }Sp(6,\mathbb R).
}
\]

This is a substantial convergence: the incidence mask, the Jordan wheels and the need for typed relational composition are now the same mathematical statement viewed at three resolutions.

## Corpus position

- [overlapping \(H_2\) wheels and the coarse \(H_3/Sp(6)\) envelope](1126_two_overlapping_H2R_null_mask_wheels_generate_H3R_and_raise_Spin23_to_Sp6.md)
- [Ophanim nested-commutant/Jordan-triple branch](1125_ophanim_wheels_within_wheels_as_a_nested_commutant_and_Jordan_triple_research_branch.md)
- [sector-dependent Krajewski null mask](1120_a_sector_dependent_Krajewski_anchor_mask_allows_Majorana_null_sewing_while_forbidding_Dirac_null_leakage.md)
- [three as the minimal Möbius gear cycle and third relation](1128_three_is_the_minimal_Mobius_gear_cycle_and_the_third_relation_of_the_typed_twin_wheels.md)
