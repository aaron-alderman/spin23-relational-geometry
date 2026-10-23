# Parent Covariance Does Not Rescue Minimal Torsion Flavor and the Protection Graph Is Exhausted

**Date:** 23 October 2026

**Status:** global exhaustion of the locally constructible torsion-flavor protection graph

**Depends on:** [the UV flavor boundary](1735_the_uv_torsion_flavor_route_terminates_at_an_unprotected_minimal_slice_and_missing_threshold_action.md) and [the parent operator lift](1736_the_spin23_compensator_lifts_the_nonminimal_axial_torsion_operator_and_closes_the_parent_symmetry_escape.md)

**Evidence:** [path ledger](../../../evidence/data/spin23-uv-torsion-flavor-path-selection-v7.json), [path note](../../programmes/closure/spin23-gravity-route/global-path-selection-v7.md), and [verifier](../../../verification/verify/verify_spin23_uv_torsion_flavor_path_selection_v7.mjs)

## Result

The last symmetry-only escape has failed constructively.  The compensator that
defines the broken \(Spin(2,3)\) geometry also supplies an explicit covariant
four-form whose physical-gauge reduction is \(S_\mu J_5^\mu\).  Full parent
covariance therefore permits the independent nonminimal coefficient; parity
permits it as well.

Together with claims 1733 and 1735, the path-selection result is now:

- minimal Dirac coupling fixes \(|c_f|=1/8\) universally at tree level;
- flavor rotations preserve that identity-valued point;
- E6 and residual \(Z_3\) do not eliminate family Wilson directions;
- ordinary EFT counterterms do not protect minimality; and
- unbroken-parent \(Spin(2,3)\) covariance does not forbid the operator.

No locally executable symmetry or representation branch remains.  The route
can be reopened only by adding a new exact selection law that forbids the
displayed parent invariant without removing the required fermion action, and
then specifying the complete heavy spectrum and threshold/anomaly matching.

This strengthens the standard-versus-new-physics verdict.  Universal
\(c_f=1/8\) is standard minimal torsion geometry.  A protected, calculable
departure—or a proof that no departure occurs after matching—would be the new
physics.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_uv_torsion_flavor_path_selection_v7.mjs
~~~
