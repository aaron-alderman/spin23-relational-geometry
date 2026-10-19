# The \(B-L\) Ward-Compatible Algebra Preserves a Maximal Null Plane and Is Affine, Not Full \(Spin(2,3)\)

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B07, B08, B11, B13, B14 and the Ward-compatible conformal branch  
**Claim status:** exact projection of the previously derived Ward subalgebra into the five-dimensional vector representation; contact-term interpretation remains conditional  
**Certificate:** [project_bl_ward_subalgebra_to_spin23_and_classify_invariant_null_flag.mjs](scripts/project_bl_ward_subalgebra_to_spin23_and_classify_invariant_null_flag.mjs)

## Executive result

Document 657 found that exact preservation of the Ward-normalized \(B-L\) autocorrelator leaves four TKK generators:

\[
A_{11},\quad A_{12},\quad B_{11},\quad B_{12}^{\rm sym}.
\]

Their intrinsic TKK grade content is

\[
\boxed{
2\text{ upper translations}
+2\text{ middle structure generators}
+0\text{ lower special-conformal generators}.
}
\]

Projecting these generators into the primitive-two-form \((2,3)\) representation gives a four-dimensional solvable algebra preserving a maximal totally isotropic two-plane.

It acts affinely on the Jordan/Minkowski patch. It cannot supply inversion, special-conformal transformations, or a transitive full conformal action inside one fixed Ward-normalized theory.

## 1. Exact null plane

In the primitive coordinate order

\[
(T_1,T_2,X_1,X_2,X_3)
\]

with metric \(2\operatorname{diag}(+,+,-,-,-)\), the invariant plane is spanned by

\[
\ell_1=(-1,0,0,1,0),
\qquad
\ell_2=(0,-1,0,0,1).
\]

It is totally null:

\[
\langle\ell_i,\ell_j\rangle=0
\qquad(i,j=1,2).
\]

Because the Witt index of signature \((2,3)\) is two, this plane is maximal isotropic.

The two surviving translations annihilate it. The two surviving middle generators preserve it. The Ward algebra therefore fixes a projective null flag rather than acting transitively on the conformal compactification.

## 2. Solvable structure

The executable derived series has dimensions

\[
\boxed{
4\longrightarrow3\longrightarrow1\longrightarrow0.
}
\]

Hence the algebra is solvable. Its absence of a lower TKK wing is structural, not a basis artifact.

In the fractional action

\[
\delta Z=B+AZ+ZA^T-ZCZ,
\]

the Ward conditions force \(C=0\). Therefore no Riccati/special-conformal term survives.

## 3. Meaning in the conformal patch

The surviving transformations are restricted affine maps:

\[
\delta Z=B+AZ+ZA^T.
\]

They can translate selected response coordinates and apply selected linear source transformations. They preserve the conformal point/flag at infinity selected by the protected source frame.

Full \(Spin_0(2,3)\) would also contain the opposite translation wing. Those transformations move the chosen infinity data and inevitably alter the globally protected \(B-L\) response somewhere on the domain.

## 4. Relation to the linear-section split

Relative to the illustrative linear \((1,2)\) section of document 746, the four Ward generators have projection ranks

\[
2\text{ stabilizer}+2\text{ mixing}.
\]

This does not restore the missing six-dimensional symmetric-space tangent. Projection rank depends on the chosen linear section. The intrinsic statement is the TKK grade content \((2,2,0)\) and preservation of the maximal null plane.

## 5. Symmetry, duality and theory space

The result sharpens three possible interpretations:

1. **fixed-theory symmetry:** at most the four-dimensional Ward algebra, and possibly only the one-dimensional contact translation after stronger row protection;
2. **response duality:** a larger transformation may relate differently normalized response problems;
3. **theory-space map:** full \(Sp(4,\mathbb R)\) may act only if Ward sources and subtraction data transform along with the theory.

Calling all three “the symmetry” hides the key physical distinction.

## 6. Effect of Majorana breaking

If Majorana terms break continuous \(B-L\), the exact Ward constraint disappears. This removes the reason for the four-dimensional restriction, but it does not automatically make all ten transformations symmetries. Fixed ultraviolet data, mass thresholds and action covariance remain independent gates.

Thus breaking the current removes an obstruction; it does not prove the full group.

## 7. Stop-everything criteria

Stop calling the Ward-compatible remnant \(Spin(2,3)\); it is four-dimensional and solvable.

Stop inserting special-conformal generators while demanding fixed \(B-L\) normalization over the full response domain.

Stop inferring full conformal mobility from nonzero projection onto two linear-section mixing directions.

Stop treating contact translations as observable symmetries without a subtraction prescription.

Stop claiming Majorana breaking restores the group unless the remaining UV and dynamical covariance gates are passed.

## 8. Highest-value next calculations

1. Project the Ward-plus-UV intersection of document 658 into the primitive representation.
2. Determine the parabolic flag preserved after stronger full-row protection.
3. Add Majorana breaking and classify the enlarged but UV-fixed algebra.
4. Test whether Furey conjugation preserves, exchanges or destroys the Ward null plane.
5. Compute actual spectral functions to decide whether the full TKK carrier is accessible before imposing Ward protection.

## Companion documents

- [Original Ward-compatible subalgebra classification](657_bl_ward_normalization_reduces_the_generated_sp4_to_a_four_dimensional_solvable_subalgebra.md)
- [TKK/primitive representation reconciliation](748_the_tkk_algebra_already_induces_all_spin23_directions_and_the_jordan_carrier_embeds_projectively_in_the_null_cone.md)
- [Primitive two-form vector representation](745_the_primitive_two_forms_of_a_symplectic_four_space_give_the_genuine_five_dimensional_spin23_module.md)
