# A metric three-defect triangle plus one loop phase matches the CKM parameter count, but predicts no values

**Date:** 20 October 2026

**Gates:** A5 and A6

**Status:** exact parameter-count match; typed flavour ansatz; no numerical prediction

**Depends on:** [the bidirectional three-family middle](1473_top_down_defect_geometry_and_bottom_up_family_space_meet_in_one_plus_a2_but_three_points_have_no_flavour_modulus.md) and [the explicit length-three defect](1472_a_nonzero_o3_sewing_has_a_length_three_defect_cokernel_but_not_yet_three_physical_fermion_families.md)

**Evidence:** [machine-readable parameter audit](../../../evidence/data/spin23-decorated-defect-triangle-flavour-count.json) and [executable verifier](../../../verification/verify/verify_spin23_decorated_defect_triangle_flavour_count.mjs)

> **Subsequent spectral quotient (claim 1475).** The raw (3+1) middle count does not survive as four independent mixing parameters for one minimal triangle operator: overall edge scale leaves eigenvectors unchanged, and one shared generator cannot produce a nonzero Jarlskog commutator. The count remains a useful ansatz signal, not a CKM construction.

## Result

Claim 1473 proves that three bare projective points have no cross-ratio. The top-down geometry, however, carries more than a projective structure: once (mathbb{CP}^1) is equipped with its Fubini--Study metric, the symmetry reduces from (PGL(2,mathbb C)) to (PSU(2)cong SO(3)). A generic ordered triple then has three real shape invariants, which may be taken as its pairwise geodesic distances:

\[
(d_{12},d_{23},d_{31}).
\]

If the three defect fibers are joined by a (U(1)) connection on the triangle graph, vertex rephasings remove all edge phases except one Wilson-loop phase,

\[
\delta=\arg(U_{12}U_{23}U_{31}).
\]

Therefore the minimally decorated middle has

\[
\boxed{3\text{ shape parameters}+1\text{ loop phase}=4\text{ invariants}.}
\]

This exactly matches the parameter count of a three-generation CKM-like unitary mixing matrix: three angles and one Dirac CP phase. It does not derive their values or prove that the geometric quantities are the physical mixing parameters.

## 1. Top-down count

Three points on the round two-sphere carry six real coordinates. Quotienting a generic configuration by the three-dimensional rotation group leaves

\[
6-3=3
\]

real shape parameters. Equivalently, the Gram matrix of their three unit Bloch vectors has fixed diagonal and three off-diagonal entries

\[
G_{ij}=\cos d_{ij}.
\]

Positive semidefiniteness restricts the allowed region but does not reduce its generic dimension.

For a connected triangle graph,

\[
b_1=E-V+1=3-3+1=1.
\]

An Abelian connection therefore has exactly one gauge-invariant cycle phase after independent vertex rephasings.

## 2. Bottom-up count

For three generations, a unitary quark mixing matrix has

\[
\frac{3(3-1)}2=3
\]

physical rotation angles and

\[
\frac{(3-1)(3-2)}2=1
\]

Dirac CP phase. The middle and bottom therefore agree on a (3+1) decomposition, not only a total dimension.

The match also applies to the Dirac part of PMNS mixing. It does not include the two additional Majorana phases that arise when neutrinos are Majorana particles.

## 3. Explicit nondegenerate triangle

The previous real cubic placed its zeros on one great circle. A nondegenerate representative is

\[
s=z_1(z_0-z_1)(iz_0-z_1),
\]

with zeros

\[
[1:0],\qquad[1:1],\qquad[1:i].
\]

Their normalized Bloch vectors point along three mutually orthogonal axes, so every pair has dot product zero. This is a symmetric reference triangle, not a fit to measured flavour.

## 4. The missing map

A parameter-count match does not supply a physical law. A serious realization must derive functions such as

\[
\theta_{ij}=F_{ij}(d_{12},d_{23},d_{31}),
\qquad
\delta_{\rm CP}=G(\operatorname{Hol}_\triangle),
\]

from one coupled Dirac/Yukawa operator. Allowing arbitrary functions (F_{ij}) and (G) would make the ansatz unfalsifiable.

The smallest promotion test is therefore:

1. freeze the Fubini--Study normalization and connection action;
2. solve for the three localized mode profiles;
3. compute their overlap matrix without independent edge fits;
4. extract its mixing angles and loop phase;
5. predict a held-out invariant such as the Jarlskog combination.

The ansatz fails if the angles or phase remain freely adjustable, if the overlap matrix is basis-equivalent to an arbitrary (U(3)), or if radiative corrections destroy the four-parameter closure.

## 5. Convergence reading

This is a stronger convergence signal than numerical coincidence because both sides split four into the same roles:

\[
\text{three real relational magnitudes}\quad+\quad\text{one orientation-sensitive cycle phase}.
\]

It remains a signpost until the same operator computes both. Beauty has selected a small target; it has not supplied evidence for the target's physical truth.

## Verdict

\[
\boxed{
\text{parameter roles and count: exact match},\qquad
\text{mixing values and physical map: open}.}
\]

## Reproduction

~~~powershell
node verification/verify/verify_spin23_decorated_defect_triangle_flavour_count.mjs
~~~
