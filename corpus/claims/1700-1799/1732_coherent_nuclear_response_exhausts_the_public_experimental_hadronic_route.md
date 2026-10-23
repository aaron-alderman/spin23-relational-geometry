# Coherent Nuclear Response Exhausts the Public Experimental-Hadronic Route

**Date:** 23 October 2026

**Status:** scoped exhaustion certificate with a corrected likelihood interpretation

**Depends on:** [the proton reconstruction](1729_the_xu_proton_point_is_analytically_recoverable_but_weaker_than_the_neutron_point.md), [the joint Xu response](1730_the_xu_neutron_and_proton_curves_are_one_nuclear_projection_not_two_measurements.md), and [the two-isotope assessment](1731_ne21_and_xe129_can_span_nucleon_space_but_form_a_fragile_flavor_tomograph.md)

**Evidence:** [path-selection ledger](../../../evidence/data/spin23-experimental-hadronic-path-selection-v5.json), [path-selection note](../../programmes/closure/spin23-gravity-route/global-path-selection-v5.md), and [verifier](../../../verification/verify/verify_spin23_experimental_hadronic_path_selection_v5.mjs)

## Result

The published proton curve has been recovered without pixel digitization, but
it is not a second measurement.  The same \(^{21}\mathrm{Ne}\) signal
constrains one coherent proton-neutron combination and admits an exact
cancellation line.  This corrects the naive interpretation of separate
one-coupling exclusion curves as independent flavor tomography.

Adding the public \(^{129}\mathrm{Xe}\) target can make the nucleon response
formally rank two, but its response direction lies only \(2.204^\circ\) from
the neon direction.  The resulting condition number is 52.38 before unequal
experimental errors and nuclear-spin uncertainty.  A precision inversion
therefore requires the experiments' numerical joint response information and
a nuclear-theory covariance, not just plotted upper limits.

The public route has reached its proper boundary:

- one \(^{21}\mathrm{Ne}\) likelihood gives one nuclear projection;
- neon plus xenon could determine two nucleon coefficients, poorly;
- no pair of proton/neutron projections determines three light-quark
  coefficients; and
- none of these data derives the Spin(2,3) Wilson coefficients.

Remaining progress is tied to identifiable new inputs: joint likelihoods,
better-separated nuclear targets, a third quark-level observable, or UV
matching.  No further algebra on the published one-coupling curves can replace
those inputs.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_experimental_hadronic_path_selection_v5.mjs
~~~
