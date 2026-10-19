# A Degree-Two Base Map Matches the Chern Class but Breaks Full Rotation Equivariance

**Date:** 17 October 2026  
**Branches:** B04, B06, B07, B08, B09, B10 and B11  
**Claim status:** exact rational-map and equivariance obstruction; a physical response-to-celestial base map remains open

## 1. The explicit candidate

The projector clutching phase can be extended from the equator to a map between spheres by identifying each sphere with \(\mathbb CP^1\) and taking

\[
F:\mathbb CP^1\longrightarrow\mathbb CP^1,
\qquad
F(z)=z^2.
\]

On the equator \(z=e^{i\theta}\),

\[
F(e^{i\theta})=e^{2i\theta},
\]

exactly reproducing the doubled-angle phase of the rank-one real projector.

The map is holomorphic of degree two. A generic target point has two simple preimages, and \(F\) branches at \(0\) and \(\infty\).

## 2. Pullback of the Hopf line

Let \(L_1\to\mathbb CP^1\) be a unit-Chern Hopf line. Then

\[
c_1(F^*L_1)
=
\deg(F)c_1(L_1)
=2.
\]

Thus \(F^*L_1\) is topologically isomorphic to the magnitude-two fermion relationship line. Its fourth tensor power has Chern number eight.

This supplies the concrete base map that the clutching document left abstract.

## 3. Full rotational equivariance is impossible

The price is symmetry. Under an axial rotation

\[
R_\alpha:z\mapsto e^{i\alpha}z,
\]

one has

\[
F(R_\alpha z)=e^{2i\alpha}F(z),
\]

not \(e^{i\alpha}F(z)\). The map is equivariant only if the target circle action carries doubled weight.

More strongly, no degree-two map \(S^2\to S^2\) is equivariant under the same standard \(SO(3)\) action on source and target. To see this, let \(n\) be the north pole. Its stabilizer is \(SO(2)\), whose only fixed points on the target sphere are \(n\) and \(-n\). Equivariance forces

\[
F(n)=n\quad\text{or}\quad F(n)=-n.
\]

Transitivity then forces

\[
F(x)=x\quad\text{or}\quad F(x)=-x
\]

for all \(x\). These maps have degree \(+1\) and \(-1\), not two.

Therefore a physical degree-two response-to-celestial map must do at least one of the following:

- use different source and target group actions;
- preserve only an axial subgroup;
- depend on an additional field selecting an axis;
- be a branched/dynamical configuration rather than a Lorentz-equivariant background map.

## 4. Chern equality is weaker than Berry-connection equality

The pullback of the unit Hopf curvature by \(z^2\) has stereographic radial density proportional to

\[
\frac{4|z|^2}{(1+|z|^4)^2}.
\]

It vanishes at the branch points. By contrast, a rotationally invariant charge-two monopole connection has density proportional to

\[
\frac{2}{(1+|z|^2)^2},
\]

which is nonzero at the pole.

Both integrate to Chern number two, but their curvatures are not equal pointwise. A gauge transformation cannot repair this, because gauge transformations leave curvature unchanged.

The connections can be deformed into one another through connections on the same topological line bundle, since their curvature difference has zero total integral. Such a deformation is additional geometric/dynamical data, not a consequence of the Chern match.

## 5. Interpretation of the doubled action

The failure of ordinary axial equivariance is also informative. The relationship observable is quadratic in a face vector, so it naturally transforms with twice the face angle. The target doubled-weight action is therefore correct for a relationship phase.

What fails is identifying that doubled-weight relationship sphere directly with an ordinary spatial-direction sphere carrying the standard action.

This suggests that the response-defect sphere should be interpreted as an internal/projective relationship sphere first. A separate soldering map would then be required to relate it to celestial momentum directions.

## 6. Consequence for the \(Spin(2,3)\) pole picture

The degree-two map supports a local-to-global ladder but rules out the simplest fully isotropic identification. The central \(Spin(2,3)\) carrier may be:

- an internal response geometry with doubled projective action;
- locally soldered to spacetime or the null sphere by a dynamical field;
- globally embedded in the twisted \(H_2(\mathbb C)\) carrier.

This is closer to a tetrad/soldering architecture than to declaring the internal Jordan cone identical to spacetime momentum space.

## 7. Pinned dependency

The base-map branch is now pinned at a precise choice:

1. derive a physical axis/soldering field and accept spontaneous or background symmetry reduction;
2. find a source sphere carrying the doubled action from the outset;
3. abandon direct base identification and keep only the abstract bundle-class match.

No option is selected by topology alone.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** a Standard-Model/Furey response variable naturally transforms under the doubled target action and supplies \(F(z)=z^2\) or an equivalent degree-two map without an arbitrary axis.

**Soldering trigger:** a dynamical field relates the response sphere to the celestial sphere and its stress tensor accounts consistently for the symmetry breaking.

**Connection trigger:** the physical Berry curvature is derived and agrees with the pulled-back connection after an allowed dynamical deformation.

**Equivariance falsifier:** the programme asserts that a degree-two map is equivariant under identical standard \(SO(3)\) actions.

**Connection falsifier:** equality of Chern numbers is cited as equality of Berry connections or local holonomies.

## 9. Certificate

The [degree-two base-map certificate](scripts/verify_degree_two_base_map_obstruction.mjs) verifies equatorial doubling, two generic preimages, ordinary axial non-equivariance, doubled-weight equivariance and the pointwise curvature-profile mismatch.

## Companion documents

- [Projector defect clutching ladder](274_projector_defect_clutches_to_the_fermion_two_and_stress_eight_ladder.md)
- [Stress relationship is the fourth tensor power](224_stress_relationship_is_fourth_tensor_power_of_fermion_relationship.md)
- [Furey hypercharge does not cancel celestial Chern eight](218_furey_hypercharge_does_not_automatically_cancel_celestial_chern_eight.md)
- [Twisted \(H_2(\mathbb C)\) carrier](219_twisted_helicity_carrier_glues_as_h2c_spin24_before_spin23_reduction.md)
