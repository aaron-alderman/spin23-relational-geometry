# A Negative-Square Orientation Is a Complex Structure, Not Yet a Spin\((2,3)\) Derivation

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B08, B09 and B11  
**Claim status:** exact real \(2\times2\) orbit and centralizer classification; physical Furey/family/carrier intertwiner remains open

## 1. What the recovered matrix proves

The shared localization calculation produces a real matrix \(M\) satisfying

\[
M^2=-g^2I,
\qquad g>0.
\]

This makes

\[
K=\frac{M}{g}
\]

a complex structure on a real two-dimensional plane:

\[
K^2=-I.
\]

That is exact and basis independent.

## 2. Complete real classification

Choose any nonzero real vector \(v\). Since \(K\) has no real eigenvectors, \(v\) and \(Kv\) are linearly independent. In the basis

\[
S=(v,-Kv),
\]

one has

\[
\boxed{
M=gSJS^{-1},
\qquad
J=
\begin{pmatrix}
0&1\\
-1&0
\end{pmatrix}.}
\]

Thus every real negative-square \(2\times2\) matrix lies in the single \(GL(2,\mathbb R)\) conjugacy orbit of \(gJ\), for fixed scale and chosen orientation.

Equivalently,

\[
\operatorname{tr}M=0,
\qquad
\det M=g^2>0.
\]

## 3. Centralizer

The real matrices commuting with \(M\) form

\[
\operatorname{Cent}_{M_2(\mathbb R)}(M)
=\{aI+bM:a,b\in\mathbb R\}.
\]

This is a two-real-dimensional algebra isomorphic to \(\mathbb C\). Its invertible part is \(\mathbb C^\times\).

The recovered orientation therefore canonically equips the displacement plane with complex scalar multiplication, but it does not select a preferred real basis within that complex line.

## 4. Relation to \(H_2(\mathbb R)\)

The canonical \(J\) is antisymmetric and is **not** itself an element of the Jordan algebra

\[
H_2(\mathbb R)=\{X=X^T\}.
\]

It instead generates rotations

\[
R(\theta)=e^{\theta J}
\]

acting on the Jordan cone by congruence:

\[
X\longmapsto R(\theta)XR(\theta)^T.
\]

This preserves:

- real symmetry of \(X\);
- positive definiteness;
- \(\det X\).

It is therefore a legitimate compact one-parameter subgroup of the real cone automorphism action, which sits inside the larger \(Sp(4,\mathbb R)\) conformal/Jordan group.

## 5. Why this is not yet Spin\((2,3)\)

Any oriented real two-plane admits such a complex structure. Finding \(M^2<0\) in flavor localization does not by itself prove that:

- the plane is the external two-face Jordan carrier;
- \(M\) is a Furey weak-block operator;
- the full ten-generator \(Sp(4,\mathbb R)\) action is realized;
- the local system has Spin\((2,3)\) spacetime meaning.

An explicit intertwiner is required:

\[
I:\mathbb R^2_{\rm family\ displacement}
\longrightarrow
\mathbb R^2_{\rm Furey/carrier}
\]

such that

\[
IMI^{-1}=gJ_{\rm source}
\]

and the remaining gauge, Yukawa and response operations transform consistently.

Without \(I\), the match is a shared orbit type, not a shared physical operator.

## 6. A sharper Furey test

The Furey cyclic orientation branch should now answer:

1. which real two-plane carries its orientation operator;
2. whether that operator has negative-square form;
3. whether its centralizer is exactly the allowed complex coefficient algebra;
4. whether one source-derived map identifies it with the localization \(M\);
5. whether this identification reduces parameters or merely changes basis.

A canonical answer would turn the holonomy flux scale \(g=2\kappa\sigma^2\) into an algebraically selected quantity or orbit.

## 7. Stop-everything and falsification gates

**Intertwiner trigger:** a source-native Furey map identifies its cyclic orientation with the recovered \(M\) and simultaneously respects the Higgs/Yukawa incidence maps.

**Group trigger:** translations, congruences, inversion and the orientation generator close into the required \(Sp(4,\mathbb R)\) action on the same response space.

**Parameter trigger:** the identification fixes \(g\) or profile geometry rather than adding an arbitrary conjugating matrix.

**Falsifier:** generic \(M^2=-g^2I\) is presented as evidence for Spin\((2,3)\) without an explicit carrier intertwiner and the remaining group generators.

## 8. Certificate

The [negative-square complex-structure certificate](../../../verification/verify/verify_negative_square_complex_structure_classification.mjs) constructs the conjugating basis explicitly, verifies the two-dimensional centralizer and confirms that the canonical rotation acts by determinant-preserving congruence on \(H_2(\mathbb R)\).

## Companion documents

- [Shared-left magnitude/phase identity](248_shared_left_geometry_links_flux_phases_to_magnitude_cross_ratios.md)
- [Stacked singular orientation recovery](249_stacked_pseudoinverse_recovers_shared_orientation_from_singular_sectors.md)
- [Furey weak Jordan ladder](../0000-0099/69_furey_weak_jordan_ladder_spin23.md)
- [Exact Jordan triple to \(Sp(4,\mathbb R)\)](../0000-0099/42_jordan_triple_to_sp4r_determination.md)
