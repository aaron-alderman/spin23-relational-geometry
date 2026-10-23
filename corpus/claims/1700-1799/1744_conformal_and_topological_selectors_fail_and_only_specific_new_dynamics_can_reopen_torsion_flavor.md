# Conformal and Topological Selectors Fail and Only Specific New Dynamics Can Reopen Torsion Flavor

**Date:** 23 October 2026

**Status:** terminal exhaustion certificate for generic model-extension labels

**Depends on:** [the current-field grading closure](1742_the_commuting_uv_grading_class_is_closed_and_every_surviving_flavor_selector_changes_the_model.md) and [the conformal/topological no-go](1743_conformal_enlargement_and_topological_quantization_do_not_select_the_axial_torsion_coefficient.md)

**Evidence:** [path ledger](../../../evidence/data/spin23-uv-torsion-flavor-path-selection-v10.json), [path note](../../programmes/closure/spin23-gravity-route/global-path-selection-v10.md), and [verifier](../../../verification/verify/verify_spin23_uv_torsion_flavor_path_selection_v10.mjs)

## Result

The two remaining generic extension labels do not select the coefficient.
The axial torsion-current density is Weyl invariant, so conformal enlargement
does not forbid it.  It is a continuously variable local matter interaction,
not a characteristic class, so topology does not quantize it.

Every surviving route is now specific rather than categorical:

- an explicit enlarged algebra and action with a new Ward identity;
- a named anomaly polynomial or topological theorem that actually constrains
  this matter coefficient; or
- a computed interacting fixed point with a complete matching trajectory.

Without one of those objects there is no further calculation to perform on
the coefficient-selection branch.  The generic labels “larger symmetry,”
“conformal,” “topological” and “RG” have each been reduced to an explicit
failure or a missing concrete model.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_uv_torsion_flavor_path_selection_v10.mjs
~~~
