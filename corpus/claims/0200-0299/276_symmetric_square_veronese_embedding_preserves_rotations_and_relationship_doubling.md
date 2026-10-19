# The Symmetric-Square Veronese Embedding Preserves Rotations and Relationship Doubling

**Date:** 17 October 2026  
**Branches:** B01, B04, B07, B08, B09, B10 and B11  
**Claim status:** exact representation-theoretic and bundle construction; its realization by Furey/Standard-Model operators remains open

## 1. The better replacement for \(z\mapsto z^2\)

The degree-two self-map of the sphere reproduced the desired Chern number but broke ordinary rotational equivariance. The error was demanding that a quadratic relationship live in the same representation space as a face direction.

Let

\[
V=\mathbb C^2
\]

carry the fundamental spin-
\(\tfrac12\) representation of \(SU(2)\). Its symmetric square

\[
\operatorname{Sym}^2V\cong\mathbb C^3
\]

carries the spin-one representation. The quadratic Veronese embedding is

\[
\nu_2:\mathbb P(V)\longrightarrow\mathbb P(\operatorname{Sym}^2V),
\]

\[
\boxed{
[u:v]
\longmapsto
[u^2:\sqrt2uv:v^2].}
\]

## 2. Exact \(SU(2)\) equivariance

For every \(g\in SU(2)\),

\[
\nu_2(g\cdot[\psi])
=
\operatorname{Sym}^2(g)\cdot\nu_2([\psi]).
\]

This is full rotational equivariance, not merely axial covariance. The target transforms in the appropriate quadratic representation.

The image is the nonsingular conic

\[
Z_1^2=2Z_0Z_2
\]

inside \(\mathbb CP^2\). As a map from \(\mathbb CP^1\) onto this conic, \(\nu_2\) is an embedding and a degree-one homeomorphism. There are no branch points.

The number two moves from the degree of the **base self-map** to the degree of the **ambient relationship line**.

## 3. The Chern-two line remains

Let \(\mathcal O_{\mathbb CP^2}(1)\) be the hyperplane line bundle. The Veronese pullback is

\[
\boxed{
\nu_2^*\mathcal O_{\mathbb CP^2}(1)
\cong
\mathcal O_{\mathbb CP^1}(2).}
\]

A hyperplane section restricts to a homogeneous quadratic polynomial in \((u,v)\), so it has two zeros counted with multiplicity. Thus the pulled-back line has

\[
c_1=2.
\]

This achieves the fermion-relationship Chern class without a branched degree-two self-map or a preferred axis.

## 4. Phase doubling is representation weight

Under a scalar face phase

\[
\psi\mapsto e^{i\alpha}\psi,
\]

the symmetric tensor transforms as

\[
\psi\odot\psi
\mapsto
e^{2i\alpha}(\psi\odot\psi).
\]

The doubled angle is therefore the natural weight of a quadratic relationship. It need not be interpreted as a spatial direction winding twice around another spatial sphere.

Taking the fourth tensor power of this relationship line gives weight and Chern number eight:

\[
\mathcal O(2)^{\otimes4}\cong\mathcal O(8).
\]

The fermion-two/stress-eight ladder survives intact.

## 5. Real form and the two-face Jordan carrier

Restricting from \(\mathbb C^2\) to \(\mathbb R^2\) gives

\[
\operatorname{Sym}^2(\mathbb R^2)
\cong
H_2(\mathbb R)
\]

by

\[
(x,y)\odot(x,y)
\longleftrightarrow
\begin{pmatrix}x^2&xy\\xy&y^2\end{pmatrix}.
\]

The real Veronese conic is precisely the projectivized rank-one/null boundary of the Jordan cone. Its three ambient real coordinates are the three relationships

\[
x^2,\qquad\sqrt2xy,\qquad y^2.
\]

This identifies the real carrier not merely by dimension but as the real symmetric-square representation underlying the same quadratic construction.

## 6. Rotation group versus \(Spin(2,3)\)

The compact \(SU(2)\) discussion controls rotations and helicity bundle geometry. The full conformal group of the real Jordan algebra is

\[
Sp(4,\mathbb R)\cong Spin_0(2,3).
\]

The Veronese boundary supplies the null/projective rays on which the real group acts, but \(SU(2)\) equivariance alone does not derive the noncompact conformal dynamics. It solves the rotational compatibility problem at the boundary representation level.

The logical chain is now:

\[
\text{two-face amplitude}
\xrightarrow{\operatorname{Sym}^2}
\text{three-relationship Jordan carrier}
\xrightarrow{\text{conformal completion}}
Spin_0(2,3).
\]

The second arrow still needs physical response/sewing dynamics.

## 7. Field-operator statistics caveat

The symmetric-square construction is a statement about representation and line bundles. It does not authorize the coincident product of two identical fermion field operators in a symmetric state; Grassmann statistics may make such an operator vanish.

A physical realization could instead use:

- a fermion and its reflected/conjugate response amplitude;
- distinct flavor, color or spacetime labels;
- a bosonic bilinear with the required spinor-helicity weight;
- a stress form factor whose momentum spinors supply the symmetric square.

The actual operator must be written and checked for nonvanishing, locality, gauge neutrality and statistics.

## 8. Consequences for the base-map branch

The branched map \(z\mapsto z^2\) remains a valid abstract clutching model but is no longer the preferred rotational construction. The preferred architecture is:

1. keep the base celestial sphere unchanged;
2. embed its face line equivariantly into the projective spin-one relationship representation;
3. obtain Chern two from the ambient hyperplane line;
4. take the fourth tensor power for the stress relationship.

This removes the need for a degree-two physical map between two ordinary direction spheres.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** the Furey/Lorentz-completed response functor realizes \(\psi\mapsto\psi\odot\psi\) as a nonzero gauge-neutral operator or spectral residue and its real form is the same \(H_2(\mathbb R)\) carrier used by Schur sewing.

**Stress trigger:** a local stress form factor implements the fourth tensor power with the correct little-group weight and normalization.

**Statistics falsifier:** the only proposed operator is a coincident symmetric product of an identical Grassmann field and vanishes.

**Carrier falsifier:** the physical real structure selected by the Standard Model is incompatible with \(\operatorname{Sym}^2(\mathbb R^2)\).

**Dynamics gate:** representation equivariance is cited as proof of full \(Spin(2,3)\) symmetry without an open response cone or conformal group closure.

## 10. Certificate

The [symmetric-square Veronese certificate](../../../verification/verify/verify_symmetric_square_veronese_equivariance.mjs) verifies full \(SU(2)\) equivariance, the conic equation, norm identity, phase doubling, degree-two hyperplane restriction and fourth-power weight eight.

## Companion documents

- [Degree-two base-map obstruction](275_degree_two_base_map_matches_chern_class_but_breaks_full_rotation_equivariance.md)
- [Three relationship rays span the Jordan space](272_three_relationship_rays_span_the_two_face_jordan_space.md)
- [Stress relationship is the fourth tensor power](224_stress_relationship_is_fourth_tensor_power_of_fermion_relationship.md)
- [Unique \(M_2(\mathbb C)\) linking factor to \(H_2(\mathbb R)\)](../0100-0199/116_unique_m2_linking_factor_to_h2r_spin23.md)
