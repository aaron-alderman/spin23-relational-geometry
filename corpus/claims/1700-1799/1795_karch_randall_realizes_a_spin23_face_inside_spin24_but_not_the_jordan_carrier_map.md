# Karch--Randall Realizes a Spin(2,3) Face inside Spin(2,4) but Not the Jordan Carrier Map

**Date:** 29 October 2026

**Status:** exact model-local geometry and spectral mechanism; corpus
intertwiner absent

**Depends on:** [the boundary/defect selector](../0000-0099/53_boundary_defect_selector_branch.md),
[the twisted \(H_2(\mathbb C)\) carrier](../0200-0299/219_twisted_helicity_carrier_glues_as_h2c_spin24_before_spin23_reduction.md),
[the conformal-parent gate](../1500-1599/1578_four_dimensional_conformal_cyclic_cosmology_requires_a_spin24_parent_not_spin23_alone.md),
and [the oriented AdS4 twistor reconstruction](../1600-1699/1630_twistor_data_can_reconstruct_oriented_ads4_but_do_not_select_physical_chirality.md)

**Evidence:** [warped-face crosswalk](../../../evidence/data/randall-warped-face-crosswalk-v1.json)
and [deterministic verifier](../../../verification/verify/verify_randall_warped_face_crosswalk.mjs)

## Result

Karch--Randall locally localized gravity supplies a concrete physical model in
which a selected four-dimensional face has the exact group placement

\[
AdS_4\subset AdS_5,
\qquad
SO_0(2,3)\subset SO_0(2,4),
\qquad
Spin_0(2,3)\subset Spin_0(2,4).
\]

The lower-dimensional gravitational response is not obtained by naming the
subgroup. It follows from the brane embedding, junction data and the
brane-to-brane spin-2 spectral measure. A light massive bound graviton
dominates an intermediate four-dimensional regime while higher bulk modes
control corrections. This is an exact example of the corpus grammar

\[
\text{ambient carrier}
\longrightarrow
\text{selected face}
\longrightarrow
\text{retained spectrum}
\longrightarrow
\text{detector response}.
\]

It does **not** identify the corpus's independent

\[
H_2(\mathbb C)\longrightarrow H_2(\mathbb R)
\]

real-form descent with the brane construction. Equal symmetry groups do not
identify carrier, representation, source type, positivity structure or
observable action.

## Three warped mechanisms that must remain distinct

1. In the compact two-brane Randall--Sundrum model, the hierarchy is primarily
   an exponential redshift of local mass scales,
   \[
   m_{\mathrm{IR}}=e^{-kL}m_{\mathrm{UV}}.
   \]
   Obtaining a \(10^{-16}\) hierarchy requires \(kL=16\log 10\approx36.84\).
2. In the noncompact one-brane model, a massless graviton zero mode is
   localized near the brane despite an infinite fifth direction.
3. In Karch--Randall, an \(AdS_4\) brane in \(AdS_5\) supports effective
   four-dimensional gravity through a light massive bound graviton.

The popular phrase “gravity leaks into the extra dimension and is
exponentially diluted” conflates these three statements.

## Dynamics and stabilization

The separation of two branes is a modulus unless a stabilizing sector is
supplied. Goldberger--Wise stabilization uses a bulk scalar and boundary
potentials to generate a radion potential. The radion is therefore a
fluctuation of the selector geometry, not merely an auxiliary label.

Recent stabilized effective-field-theory work sharpens a corpus-wide lesson:
local stress on one face may require a distributed bulk and stabilizer response
before a common lower-dimensional curvature is recovered. A quotient is
dynamically autonomous only when it retains enough constraint data to predict
that response.

Finite-temperature transitions add another gate. The low-temperature warped
phase and a high-temperature black-brane phase need not be connected by the
naive four-dimensional radion potential alone. Nucleation, reheating,
backreaction and the range of effective-theory validity must be carried
together.

## The missing intertwiner

A substantive bridge must provide a typed map from the corpus carrier and
selector to the warped construction that preserves:

1. dimension and real form;
2. the relevant invariant bilinear or Jordan product;
3. positivity and admissible sources;
4. the induced \(Spin(2,3)\) action;
5. the pole and continuum data seen by a declared detector.

Without that map, Karch--Randall is an independent realization and a hostile
control. It establishes that the group ladder is geometrically natural, not
that the two theories are the same.

## Research gates

- **Carrier gate:** construct or rule out an intertwiner between the
  \(H_2(\mathbb C)\to H_2(\mathbb R)\) selection and declared brane/bulk data.
- **Spectrum gate:** compare the induced \(Spin(2,3)\) representations with the
  localized spin-2 spectral resolution, including residues.
- **Selector gate:** determine whether a corpus selector has a fluctuation
  corresponding to a healthy radion-like mode and a derived stabilizing
  potential.
- **Detector gate:** produce a normalized response that distinguishes this
  construction from generic boundary effective field theory.
- **Long-range gate:** retain or explicitly reconstruct every bulk constraint
  required for lower-dimensional gravitational response.

## Sources

- L. Randall and R. Sundrum, [*A Large Mass Hierarchy from a Small Extra Dimension*](https://arxiv.org/abs/hep-ph/9905221).
- L. Randall and R. Sundrum, [*An Alternative to Compactification*](https://arxiv.org/abs/hep-th/9906064).
- W. D. Goldberger and M. B. Wise, [*Modulus Stabilization with Bulk Fields*](https://arxiv.org/abs/hep-ph/9907447).
- A. Karch and L. Randall, [*Locally Localized Gravity*](https://arxiv.org/abs/hep-th/0011156).
- A. Karch and L. Randall, [*Localized Gravity in String Theory*](https://arxiv.org/abs/hep-th/0105108).
- I. I. Kogan, S. Mouslopoulos and A. Papazoglou, [*The \(m\to0\) limit for massive graviton in \(dS_4\) and \(AdS_4\)*](https://arxiv.org/abs/hep-th/0106261), including the Karch--Randall discontinuity comparison.
- L. Randall and G. Servant, [*Gravitational Waves from Warped Spacetime*](https://arxiv.org/abs/hep-ph/0607158).
- L. Randall and R. Rattazzi, [*A More Effective Theory of Randall--Sundrum Models*](https://arxiv.org/abs/2510.11771).

## Reproduction

~~~powershell
node verification/verify/verify_randall_warped_face_crosswalk.mjs
~~~
