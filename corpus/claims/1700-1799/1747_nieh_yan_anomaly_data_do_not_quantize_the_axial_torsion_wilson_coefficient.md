# Nieh--Yan Anomaly Data Do Not Quantize the Axial Torsion Wilson Coefficient

**Date:** 23 October 2026

**Status:** exact differential-form, dimensional and counterterm audit of the named torsional-anomaly selector

**Depends on:** [the conformal/topological selector audit](1743_conformal_enlargement_and_topological_quantization_do_not_select_the_axial_torsion_coefficient.md), [the fixed-point boundary](1746_the_fixed_point_escape_is_reduced_to_a_complete_beta_and_matching_packet.md), and [the exact Nieh--Yan torsion decomposition](../1600-1699/1655_nieh_yan_allows_only_axial_trace_and_tensor_square_connection_mixings.md)

**Evidence:** [anomaly-selector ledger](../../../evidence/data/spin23-nieh-yan-axial-selector-no-go-v1.json) and [verifier](../../../verification/verify/verify_spin23_nieh_yan_axial_selector_no_go.mjs)

## Result

The most relevant named anomaly does not select the dimensionless coefficient
of

\[
 \mathcal O_A=S_\mu\bar\psi\gamma^\mu\gamma_5\psi.
\]

The Nieh--Yan form obeys

\[
 \mathcal N=d(e_a\wedge T^a)
 =T_a\wedge T^a-e_a\wedge e_b\wedge R^{ab}.
\]

On a compact smooth manifold without boundary, with globally defined
\(e_a\wedge T^a\), Stokes' theorem gives

\[
 \int_M\mathcal N=0.
\]

With a boundary, the integral becomes

\[
 \int_M\mathcal N=\int_{\partial M}e_a\wedge T^a,
\]

so the nonzero datum is a boundary condition or boundary response.  Neither
case produces a discrete allowed set for the bulk Wilson coefficient \(\eta\).

## The dimensional obstruction

Unlike the four-dimensional Pontryagin densities, the Nieh--Yan density has
mass dimension two in the standard gravitational counting.  Its contribution
to a four-dimensional anomaly therefore carries a coefficient with mass
dimension two.  Explicit Pauli--Villars calculations find a regulator-mass
squared coefficient; other settings replace that scale by curvature,
temperature or another infrared/ultraviolet scale.

The coefficient \(\eta\) multiplying \(\mathcal O_A\) is dimensionless.
Equating the two coefficients is therefore not even dimensionally meaningful
without importing a scale and a normalization rule.  Such a rule would be new
dynamics, not anomaly quantization.

## The counterterm obstruction

Let \(\widetilde A^\mu\) be the axial-torsion vector dual to
\(e_a\wedge T^a\).  Since it is local-Lorentz invariant, the axial current can
be redefined locally by

\[
 J_5^\mu\longmapsto J_5^\mu+c\widetilde A^\mu.
\]

Its divergence then shifts by \(c\mathcal N\).  Modern heat-kernel analyses
make this explicit by constructing local counterterms that cancel the
Nieh--Yan anomaly terms; the remaining nonthermal coefficients depend on
renormalization conditions.  A continuously shiftable anomaly coefficient
cannot quantize \(\eta\) or single out \(1/8\).

This does not erase all torsional anomaly physics.  Boundaries, singular
geometries and thermal states can support finite torsional transport.  Those
observables depend on boundary, state and scale data and therefore belong to
a response programme, not to a bulk minimal-coupling selection theorem.

## Why anomaly cancellation does not help

The axial torsion vector is a Lorentz-invariant composite, not a new gauged
axial connection whose charge is fixed by gauge-anomaly cancellation.  Local
Lorentz invariance can remain nonanomalous while the global axial current has
a torsional divergence.  Hence cancelling gauge anomalies in the fermion
spectrum does not impose \(\eta=1/8\).

The anomaly branch could reopen coefficient selection only if a specific UV
theory supplied all of the following: a compactly normalized torsional gauge
charge, a non-shiftable anomaly class, a Ward identity relating that charge to
\(\eta\), and a threshold proof preserving the relation.  None is present in
the declared Spin(2,3) action.

## Sources

- C. Soo, [*Adler--Bell--Jackiw Anomaly, the Nieh--Yan Form, and Vacuum Polarization*](https://arxiv.org/abs/hep-th/9805090), for the regulator-mass-squared term and the local current redefinition.
- J. Erdmenger, I. Matthaiakakis, R. Meyer and D. Vassilevich, [*The Chiral Torsional Anomaly and the Nieh--Yan Invariant with and without Boundaries*](https://arxiv.org/abs/2409.06766), for the closed-manifold index boundary and counterterm dependence.
- I. M. Rasulian and M. Torabian, [*On Torsion Contribution to Chiral Anomaly via Nieh--Yan Term*](https://arxiv.org/abs/2308.00578), for singular, curvature-scale and thermal qualifications.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_nieh_yan_axial_selector_no_go.mjs
~~~
