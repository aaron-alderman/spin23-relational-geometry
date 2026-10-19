# A Universal Flavor Real Structure Stabilizes Only an Orthogonal Subgroup and Forces the Jarlskog Invariant to Vanish

**Date:** 17 October 2026  
**Branches:** B01, B03, B06, B08 and B11  
**Claim status:** exact normalizer and CP no-go theorem; sector-dependent real-structure dynamics remain open

## 1. The covariance problem

The graded-real entangler split

\[
\operatorname{Herm}_3^0(\mathbb C)
=\operatorname{Sym}_3^0(\mathbb R)
\oplus i\operatorname{Alt}_3(\mathbb R)
\]

is defined relative to coefficient conjugation

\[
K_f:v\mapsto\bar v
\]

on flavor space. The question is which flavor-basis transformations preserve this real structure and its 5+3 decomposition.

## 2. Normalizer of the flavor real algebra

Let \(U\in U(3)\). Requiring conjugation by \(U\) to preserve all real matrices,

\[
U M U^\dagger\in M_3(\mathbb R)
\qquad
\text{for every }M\in M_3(\mathbb R),
\]

forces

\[
\boxed{
U=e^{i\theta}O,
\qquad O\in O(3).
}

Equivalently, the normalizer of the standard real matrix algebra in \(U(3)\) is

\[
N_{U(3)}(M_3(\mathbb R))=U(1)\cdot O(3).
\]

The central phase drops out of conjugation, so the effective stabilizer is projective orthogonal.

This subgroup preserves real-symmetric and imaginary-antisymmetric flavor coefficients separately. A generic complex \(U(3)\) rotation mixes the two sectors.

## 3. Universal antiunitary no-go for CP

Suppose one antiunitary \(J_f\) with

\[
J_f^2=1
\]

fixes both Hermitian flavor spurions:

\[
J_fH_uJ_f^{-1}=H_u,
\qquad
J_fH_dJ_f^{-1}=H_d.
\]

Choose a basis in which \(J_f=K_f\). Then both \(H_u,H_d\) are real symmetric. Their commutator is real antisymmetric, and

\[
\operatorname{Tr}[H_u,H_d]^3=0.
\]

Equivalently, the CP-odd invariant reverses sign under \(J_f\) while the fixed pair leaves it unchanged, so it must vanish:

\[
\boxed{
J_f\text{ fixes both sectors}
\Longrightarrow
\operatorname{ImTr}[H_u,H_d]^3=0.
}

Every projector quadrilateral imaginary part vanishes as well.

## 4. Each sector separately has a real structure

For a nondegenerate Hermitian matrix

\[
H=VDV^\dagger,
\qquad D\text{ real diagonal},
\]

define

\[
J_H=VKV^\dagger.
\]

As an antiunitary,

\[
J_H^2=1,
\qquad
J_HHJ_H^{-1}=H.
\]

Thus each Yukawa/mass-squared sector separately admits a real structure. Flavor CP arises because the two sector real structures generally do not coincide.

The relative product

\[
R_{ud}=J_uJ_d
\]

is unitary. It records the mismatch between the two real forms and is built from the same relative eigenframes that define CKM/PMNS mixing.

This suggests a better interpretation:

\[
\boxed{
\text{physical flavor complexity is mismatch of sector real structures, not absence of all reality.}
}

## 5. Implication for the graded-real parent

The full \(H_6(\mathbb R)\) graded-real parent can be used in a fixed flavor real structure, but if that structure is imposed as an exact universal antiunitary symmetry of every physical Yukawa sector, it kills observed flavor CP.

To retain CP, at least one of the following must occur:

1. the graded real structure is only a response-coordinate choice, not a symmetry of both spurions;
2. different sectors carry different real structures whose mismatch is physical;
3. the antiunitary is spontaneously or explicitly broken by the Yukawa background;
4. the full interacting parent is complex, with only the external face marginal real;
5. a graded antiunitary acts jointly on face and flavor without fixing each flavor spurion separately.

Each option requires a separate dynamical construction.

## 6. Relation to the projector quadrilateral

The alternating projector invariant

\[
\mathcal B_{ik;j\ell}
=\operatorname{Tr}(P_i^uP_j^dP_k^uP_\ell^d)
\]

is real if one common antiunitary fixes both projector families. A nonzero imaginary part is therefore a direct obstruction to a universal flavor real structure.

This makes the projector quadrilateral an operational gate for any graded-real proposal:

- if \(\operatorname{Im}\mathcal B\ne0\), the chosen real structure cannot fix both sectors;
- it may still fix the combined response through a sector-exchanging or graded action;
- the exact action must be written rather than inferred from matrix reality.

## 7. Finite witness

The certificate constructs:

- a complex CKM-type \(H_d\) with \(H_u\) diagonal;
- a nonzero commutator cubic and projector quartet;
- the sector antiunitaries \(J_u,J_d\), each squaring to one and fixing its own spurion;
- a nontrivial relative unitary \(J_uJ_d\);
- a generic complex flavor rotation that mixes the 5- and 3-dimensional entangler sectors;
- a real orthogonal rotation that preserves them.

## 8. Branch decision

- **Closed:** the stabilizer of the standard flavor real algebra inside \(U(3)\) is \(U(1)\cdot O(3)\).
- **Closed:** a generic \(U(3)\) flavor rotation mixes the symmetric and imaginary-antisymmetric entangler sectors.
- **Closed:** one universal antiunitary fixing both Hermitian spurions forces every Jarlskog-type invariant to vanish.
- **Closed:** each nondegenerate sector separately admits a real structure.
- **Closed:** their relative product is a unitary mismatch carrying flavor-frame information.
- **Open:** a source principle selecting sector-dependent or graded real structures without arbitrary choices.
- **Open:** radiative closure of such mismatched structures on the combined response.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** derive sector real structures from Furey/ex-ceptional data whose relative product reproduces CKM/PMNS invariants while their joint graded action preserves the external \(H_2(\mathbb R)\) response.

**CP falsifier:** a universal involutive antiunitary fixes both nondegenerate flavor spurions while their commutator cubic remains nonzero.

**Normalizer falsifier:** find a generic non-orthogonal complex unitary whose conjugation preserves the full real matrix algebra.

**Graded-real falsifier:** impose one universal flavor conjugation on observed Yukawas and still claim unexplained nonzero Jarlskog CP.

**Sector-real warning:** the existence of a separate eigenbasis conjugation for each Hermitian matrix is kinematic and does not derive its physical relation to another sector.

## 10. Certificate

The [flavor-real-structure stabilizer certificate](scripts/verify_universal_flavor_real_structure_kills_jarlskog_and_sector_mismatch_survives.mjs) verifies orthogonal preservation versus generic complex mixing, sector antiunitary involutions, nontrivial relative mismatch and the incompatibility of a universal fixed real structure with the nonzero CP invariants.

## Companion documents

- [Marginal-safe entangler split](440_marginal_safe_sigma_y_entanglers_split_exactly_into_graded_real_and_genuinely_complex_parent_sectors.md)
- [Projector-quadrilateral holonomy](438_projector_quadrilateral_holonomy_recovers_the_jarlskog_quartet_without_extending_rank_deficient_polar_transport.md)
- [Real-selector flavor-CP obstruction](74_real_selector_cp_violation_obstruction.md)
- [Inverse-closed graded-real parent](289_the_inverse_closed_graded_real_escape_is_the_full_combined_real_symmetric_algebra.md)
