# The Minimal Gauge-Neutral Cross Stress Is Yukawa-Dressed but Not Independently Conserved

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B06, B08 and B11  
**Claim status:** exact Standard-Model charge and operator-dimension classification; conservation, correlator normalization and Furey uniqueness beyond the usual Yukawa pattern remain open

## 1. The off-diagonal gauge problem

The face-valued stress proposal needs an off-diagonal relation between left- and right-handed matter. Bare bilinears are not electroweak singlets because the two chiralities carry different representations.

At lowest operator dimension, the relation must be Higgs dressed. For one generation the four possibilities are

\[
\mathcal O_d=\bar Q_L H d_R,
\qquad
\mathcal O_u=\bar Q_L\widetilde H u_R,
\]

\[
\mathcal O_e=\bar L_L H e_R,
\qquad
\mathcal O_\nu=\bar L_L\widetilde H\nu_R,
\]

when a Dirac right-handed neutrino exists.

Each has engineering dimension

\[
\frac32+1+\frac32=4.
\]

## 2. Hypercharge fixes \(H\) versus \(\widetilde H\)

Using \(Y(H)=+\tfrac12\) and \(Y(\widetilde H)=-\tfrac12\), the neutral sums are

\[
-\frac16+\frac12-\frac13=0
\qquad(d),
\]

\[
-\frac16-\frac12+\frac23=0
\qquad(u),
\]

\[
+\frac12+\frac12-1=0
\qquad(e),
\]

\[
+\frac12-\frac12+0=0
\qquad(\nu).
\]

Replacing \(H\) by \(\widetilde H\), or conversely, makes each sum nonzero. Thus gauge neutrality reproduces exactly the Standard-Model up/down Higgs orientation that also appears in the Furey cyclic-Yukawa branch.

This agreement is real. It is not yet evidence that Furey uniquely predicts the dressing, because ordinary gauge representation theory already enforces it.

## 3. What stress tensor it actually produces

The Yukawa Lagrangian contains

\[
\mathcal L_Y=-y_f\mathcal O_f-y_f^*\mathcal O_f^\dagger.
\]

Because this interaction contains no explicit metric contraction beyond the volume density, its Hilbert-stress contribution is

\[
\boxed{T_{Y,f}^{\mu\nu}=-g^{\mu\nu}\mathcal L_{Y,f}}
\]

up to the global sign convention for \(T^{\mu\nu}\).

The Hermitian and anti-Hermitian quadratures of \(y_f\mathcal O_f\) can populate the \(\sigma_x\) and \(\sigma_y\) relationship channels of a source-response matrix. But they are not two separately conserved stress tensors. Energy–momentum exchange with fermion kinetic and Higgs sectors is essential.

Therefore the correct object is a matrix of stress **responses or insertions**, obeying Ward identities only after all sectors and contact terms are included—not three independent Noether tensors.

## 4. One classical Yukawa background is insufficient to select a plane

Let

\[
y_f\mathcal O_f=X+iY.
\]

The two metric-proportional relationship tensors are

\[
T_x^{\mu\nu}\propto g^{\mu\nu}X,
\qquad
T_y^{\mu\nu}\propto g^{\mu\nu}Y.
\]

Their classical Gram block is proportional to

\[
\begin{pmatrix}X^2&XY\\XY&Y^2\end{pmatrix},
\]

which has rank one. A single background therefore selects one relationship quadrature but leaves an orthogonal degeneracy when combined with no further channel data.

For one fermion species, a chiral phase redefinition rotates \((X,Y)\). The absolute relationship-plane direction is not physical unless additional interactions, multiple flavors, boundary probes or CP invariants fix the relative phases.

## 5. Where a nontrivial selector could arise

The promising object is the connected matrix of source derivatives or spectral densities,

\[
\rho_{ab}(p)
\sim
\langle\mathcal O_a(p)\mathcal O_b(-p)\rangle_c,
\qquad
a,b\in\{x,y,z\},
\]

including:

- the two Yukawa relationship quadratures;
- the left–right kinetic/population difference;
- Higgs and gauge contact terms required by Ward identities;
- flavor matrices for three generations.

Its Lorentz-scalar moments can form the \(Q_{ab}\) selector Gram. This formulation can preserve a Lorentz-invariant vacuum because it uses correlators rather than a nonzero tensor one-point function.

## 6. Furey’s role after the charge calculation

Furey’s cyclic orientation may still add information if it does more than reproduce hypercharge neutrality. It would need to select:

1. which allowed Higgs copy enters each cross channel;
2. the relative normalization and phase of the block maps;
3. the cyclic closure relating up, down and lepton sectors;
4. a common source basis for the Pauli stress matrix;
5. a selector eigenline stable under flavor and gauge renormalization.

If it supplies none of these, the agreement is a repackaging of the Standard-Model Yukawa table rather than a prediction.

## 7. Stop-everything and falsification gates

**Stop-everything trigger:** the Furey cyclic action uniquely fixes the same gauge-neutral dressed cross operators, their normalization and a nondegenerate correlator Gram eigenline.

**Correlator trigger:** the full Ward-completed three-channel spectral matrix has an isolated, scale-stable selector projector.

**Conservation falsifier:** a Yukawa quadrature is called an independently conserved stress tensor.

**Uniqueness falsifier:** the \(H/\widetilde H\) pattern is claimed as a Furey prediction when only ordinary hypercharge neutrality was used.

**Phase falsifier:** a one-generation removable Yukawa phase is treated as the physical real-form director.

## 8. Certificate

The [Yukawa-dressed cross-stress gate certificate](../../../verification/verify/verify_yukawa_dressed_cross_stress_gate.mjs) checks all four hypercharge-neutral dressings, operator dimension, rank-one classical relationship Gram and one-species phase-axis noncanonicity.

## Companion documents

- [Face-valued stress Pauli triplet](../0200-0299/299_left_right_and_cross_stress_form_a_triplet_only_as_the_pauli_part_of_a_face_matrix.md)
- [Cyclic Yukawa topology selection](../0100-0199/111_furey_cyclic_yukawa_topology_selection.md)
- [Gauge-covariant null-walk Higgs coin](../0100-0199/148_gauge_covariant_null_walk_higgs_coin.md)
- [Factor-local selector and complete Yukawa operator](../0200-0299/255_factor_local_selector_commutes_with_full_one_generation_yukawa_operator.md)
