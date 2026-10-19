# Gauge Covariance Preserves the Deck Lift, but Yukawa Transport Controls Kernel Factorization

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08 and B11  
**Claim status:** exact gauge-equivariance and covariant-square identities; full electroweak defect index with dynamical gauge and Higgs fields remains open

## 1. Two separate gauge questions

The joint wall–Yukawa construction introduces two different structures:

1. the unitary selector deck transition \(g=\sigma_x\);
2. the internal Yukawa endomorphism \(H_Y(\Phi)\).

They face different gauge tests. The deck transition can commute with gauge symmetry even when transport of the Yukawa background destroys the simple kernel-factorization proof.

## 2. The unitary deck lift is gauge-equivariant

Let \(R\) be the complete 15-state chiral gauge representation and suppose the wall/survivor factor carries two identical copies:

\[
\rho_{\rm dup}(h)=I_2\otimes\rho_R(h).
\]

The unitary deck transition is

\[
G_{\rm deck}=\sigma_x\otimes I_{15}.
\]

Then

\[
\boxed{
[G_{\rm deck},\rho_{\rm dup}(h)]=0}
\]

for every Standard-Model gauge transformation \(h\).

Thus the unitary exchange needed for the selector bundle is not obstructed by gauge charge, provided it exchanges genuinely identical gauge representations. The same statement holds if the \(\sigma_x\) factor is a spacetime wall-spinor factor rather than an internal copy.

## 3. The antiunitary exchange still fails on same-charge states

For comparison,

\[
\Theta_{\rm ex}=(\sigma_x\otimes I)K
\]

conjugates a gauge phase:

\[
e^{iq\phi}\longmapsto e^{-iq\phi}.
\]

Swapping two supports with the same charge \(q\) does not repair this. Unless \(q=0\) or the target support carries the conjugate representation,

\[
\Theta_{\rm ex}\rho(h)\Theta_{\rm ex}^{-1}\ne\rho(h).
\]

This confirms the earlier distinction:

- unitary \(\sigma_x\) can be a gauge-equivariant deck transition;
- antiunitary \(\sigma_xK\) is a response selector, not the charged CAR adjoint.

The bundle branch therefore survives the previous gauge obstruction precisely because it needs the unitary factor alone.

## 4. Covariant joint operator

Let

\[
D_{\rm w,A}
=-i\sigma_x\nabla_x+m(x)\sigma_z,
\qquad
C_{\rm w}=\sigma_y,
\]

where \(\nabla_x=\partial_x+A_x\) acts on the internal gauge bundle. Let the Yukawa operator be the gauge-covariant Higgs-dependent endomorphism

\[
H_Y(x)=H_Y(\Phi(x)).
\]

Define

\[
\mathcal D_A
=D_{\rm w,A}+C_{\rm w}H_Y(x).
\]

The algebraic anticommutation of the wall Clifford matrices still cancels all derivatives acting directly on the fermion. But the derivative can act on \(H_Y\) itself. Direct expansion gives

\[
\boxed{
\mathcal D_A^2
=D_{\rm w,A}^2+H_Y^2
+\sigma_z\,\nabla_xH_Y,}
\]

up to the sign convention chosen for \(\nabla_x\), where

\[
\nabla_xH_Y
=\partial_xH_Y+[A_x,H_Y].
\]

The important invariant statement is the presence of the Clifford-weighted covariant derivative of the Yukawa background.

## 5. Exact factorization criterion

The positive-square kernel proof survives exactly when

\[
\boxed{\nabla_xH_Y=0.}
\]

This includes:

- a constant Higgs/Yukawa background with no gauge field;
- parallel transport by an unbroken gauge connection commuting with the Higgs vacuum;
- a gauge in which a covariantly constant Higgs background is spatially constant.

It generally excludes:

- an independent Higgs texture across the selector wall;
- electroweak gauge transport that rotates the Higgs orientation;
- a selector–Higgs locking field whose interpolation changes \(H_Y\);
- generic charged gauge backgrounds with \([A_x,H_Y]\ne0\).

When \(\nabla_xH_Y\ne0\), the three localized modes may still be protected by an index, but their existence no longer follows from the elementary sum-of-squares theorem.

## 6. Electroweak interpretation

Before symmetry breaking, the Yukawa expression is gauge-covariant only when the Higgs field is included. A fixed neutral Higgs expectation value selects the unbroken electromagnetic subgroup. Gauge connections in that stabilizer commute with the vacuum mass operator, whereas broken-direction \(W^\pm\) and neutral electroweak transport can rotate it.

Therefore the joint zero-mode theorem is automatically compatible with unbroken electromagnetic transport but not automatically with arbitrary electroweak backgrounds.

This is the correct level of the claim:

\[
\text{gauge-equivariant deck lift}
\quad\not\Rightarrow\quad
\text{gauge-independent kernel factorization}.
\]

## 7. Consequences for the Furey bridge

The result improves the common-carrier picture in two ways.

First, it removes one suspected obstruction: the unitary survivor exchange can act as the selector deck transition without reversing charges.

Second, it identifies the next obstruction as dynamical rather than representational. The decisive datum is whether Furey source multiplication and the Higgs background are parallel under the same connection:

\[
\nabla H_Y\stackrel{?}=0.
\]

If the answer is forced to be yes on the unmatched neutrino sector, the three localized zeros survive. If not, the programme must calculate spectral flow or an index in the full textured background.

## 8. Open branches

- compute \(\nabla H_Y\) for the explicit Furey Higgs/Yukawa intertwiners;
- distinguish electromagnetic, neutral-current and charged-current backgrounds;
- formulate the full Callias/APS-type defect operator and its index;
- determine whether selector–Higgs locking forces or forbids covariant constancy;
- test whether only the neutrino kernel remains parallel while charged modes acquire nonzero transport;
- include flavor mixing and ask whether the parallel kernel is a rank-three vector bundle with nontrivial Berry holonomy.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** the Furey-derived connection makes the unmatched neutrino kernel covariantly constant while fixing the selector deck lift, yielding a gauge-consistent rank-three localized bundle.

**Index trigger:** a full defect-index theorem preserves the three modes even when \(\nabla H_Y\ne0\).

**Gauge trigger:** the same unitary \(\sigma_x\) is derived as a source operation commuting with all 15-state gauge generators.

**Antiunitary falsifier:** gauge equivariance of unitary \(\sigma_x\) is used to claim equivariance of \(\sigma_xK\).

**Square falsifier:** the positive-square kernel factorization is used in a background with \(\nabla_xH_Y\ne0\).

**Higgs falsifier:** a fixed Higgs vacuum is called fully electroweak invariant rather than invariant only under its stabilizer.

**Localization falsifier:** three internal zero vectors are called three localized modes without verifying the spatial operator’s domain and decay.

## 10. Certificate

The [gauge-covariant wall–Yukawa gate certificate](../../../verification/verify/verify_gauge_covariant_joint_wall_yukawa_gate.mjs) checks unitary deck equivariance, same-charge antiunitary failure, the covariantly constant square identity and the nonparallel Yukawa cross term.

## Companion documents

- [Joint graded wall–Yukawa kernel](318_the_graded_wall_yukawa_sum_localizes_exactly_one_forced_zero_per_generation.md)
- [Selector fermion-bundle lifts](317_the_selector_great_circle_has_a_unique_exchange_bundle_lift_but_full_rp2_requires_doubling.md)
- [Response selector versus CAR adjoint](307_the_response_selector_and_the_car_adjoint_are_two_distinct_antiunitaries.md)
- [Furey cyclic Yukawa topology selection](../0100-0199/111_furey_cyclic_yukawa_topology_selection.md)
- [Massless Clifford neutrino cone](313_the_yukawa_zero_mode_extends_to_a_massless_dirac_type_cone.md)
